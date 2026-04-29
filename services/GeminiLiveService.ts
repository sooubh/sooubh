import { GoogleGenAI, LiveServerMessage, MediaResolution, Modality } from "@google/genai";

// Infer LiveSession type as it's not exported directly
type LiveSession = Awaited<ReturnType<InstanceType<typeof GoogleGenAI>["live"]["connect"]>>;

// --- Audio Encoding/Decoding Helpers ---

function encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}


// --- Main Service Class ---

export interface LiveCallbacks {
    onOpen: () => void;
    onMessage: (message: LiveServerMessage) => void;
    onError: (error: unknown) => void;
    onClose: (event: CloseEvent) => void;
}

export class GeminiLiveService {
    private ai: GoogleGenAI;
    private session: LiveSession | null = null;

    private responseQueue: LiveServerMessage[] = [];
    private isClosed = false;
    private turnLoopRunning = false;

    private inputAudioContext: AudioContext;
    private outputAudioContext: AudioContext;
    private mediaStream: MediaStream | null = null;
    private scriptProcessor: ScriptProcessorNode | null = null;
    private mediaStreamSource: MediaStreamAudioSourceNode | null = null;

    private nextStartTime = 0;
    private audioPlaybackSources = new Set<AudioBufferSourceNode>();
    private sessionPromise: Promise<LiveSession> | null = null;

    constructor() {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Gemini API key not found. Please configure it in Settings.");
        }
        this.ai = new GoogleGenAI({ apiKey });
        // @ts-ignore
        this.inputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        // @ts-ignore
        this.outputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    }

    public async startSession(systemInstruction: string, callbacks: LiveCallbacks): Promise<void> {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // @ts-ignore - The SDK types for live.connect might vary by version
        this.sessionPromise = this.ai.live.connect({
            model: 'models/gemini-3.1-flash-live-preview',
            callbacks: {
                onopen: () => {
                    console.log("GeminiLiveService: WebSocket connection opened.");
                    this.isClosed = false;
                    this.setupMicrophone();
                    callbacks.onOpen();
                    void this.runTurnLoop(callbacks);
                },
                onmessage: async (message: LiveServerMessage) => {
                    this.responseQueue.push(message);
                },
                onerror: (e) => {
                    console.error("GeminiLiveService: WebSocket Error", e);
                    callbacks.onError(e);
                },
                onclose: (e: any) => {
                    console.log("GeminiLiveService: WebSocket connection closed.");
                    this.isClosed = true;
                    this.cleanup();
                    callbacks.onClose(e);
                },
            },
            config: {
                // @ts-ignore - responseModalities type might be looser in some versions
                responseModalities: [Modality.AUDIO],
                // @ts-ignore - mediaResolution may be missing in older SDK types
                mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                },
                // @ts-ignore - contextWindowCompression may be missing in older SDK types
                contextWindowCompression: {
                    triggerTokens: "104857",
                    slidingWindow: { targetTokens: "52428" },
                },
                systemInstruction: { parts: [{ text: systemInstruction }] },
            },
        });
        this.session = await this.sessionPromise;
        console.log("GeminiLiveService: Session connected successfully.");
    }

    private async runTurnLoop(callbacks: LiveCallbacks): Promise<void> {
        if (this.turnLoopRunning) return;
        this.turnLoopRunning = true;

        try {
            while (!this.isClosed) {
                const turn = await this.handleTurn(callbacks);
                if (turn.length === 0) break;
            }
        } finally {
            this.turnLoopRunning = false;
        }
    }

    private async handleTurn(callbacks: LiveCallbacks): Promise<LiveServerMessage[]> {
        const turn: LiveServerMessage[] = [];
        let done = false;

        while (!done && !this.isClosed) {
            const message = await this.waitMessage();
            if (!message) break;

            turn.push(message);
            callbacks.onMessage(message);

            if (message.serverContent?.interrupted) {
                this.stopAllPlayback();
            }

            if (message.serverContent?.turnComplete) {
                done = true;
            }
        }

        return turn;
    }

    private async waitMessage(): Promise<LiveServerMessage | null> {
        while (!this.isClosed) {
            const message = this.responseQueue.shift();
            if (message) return message;
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        return null;
    }

    private setupMicrophone(): void {
        if (!this.mediaStream || !this.inputAudioContext) {
            console.error("GeminiLiveService: MediaStream or AudioContext missing for mic setup.");
            return;
        }
        console.log("GeminiLiveService: Setting up microphone stream...");
        this.mediaStreamSource = this.inputAudioContext.createMediaStreamSource(this.mediaStream);
        this.scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

        this.scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
            const pcmBlob = createBlob(inputData);
            if (this.sessionPromise) {
                this.sessionPromise.then((session) => {
                    session.sendRealtimeInput({ media: pcmBlob });
                }).catch(e => console.error("GeminiLiveService: Failed to send audio input", e));
            }
        };

        this.mediaStreamSource.connect(this.scriptProcessor);
        this.scriptProcessor.connect(this.inputAudioContext.destination);
    }

    public async playAudio(base64Audio: string): Promise<void> {
        this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
        const audioBuffer = await decodeAudioData(
            decode(base64Audio),
            this.outputAudioContext,
            24000,
            1,
        );
        const source = this.outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.outputAudioContext.destination);
        source.addEventListener('ended', () => {
            this.audioPlaybackSources.delete(source);
        });

        source.start(this.nextStartTime);
        this.nextStartTime += audioBuffer.duration;
        this.audioPlaybackSources.add(source);
        console.log("GeminiLiveService: Queued audio chunk for playback.");
    }

    private stopAllPlayback(): void {
        for (const source of this.audioPlaybackSources.values()) {
            source.stop();
            this.audioPlaybackSources.delete(source);
        }
        this.nextStartTime = 0;
    }

    private cleanup(): void {
        this.stopAllPlayback();
        this.responseQueue = [];
        this.mediaStream?.getTracks().forEach(track => track.stop());
        this.scriptProcessor?.disconnect();
        this.mediaStreamSource?.disconnect();
        this.session = null;
        this.sessionPromise = null;
        this.mediaStream = null;
        this.scriptProcessor = null;
        this.mediaStreamSource = null;
    }

    public stopSession(): void {
        this.isClosed = true;
        if (this.session) {
            this.session.close();
        }
        this.cleanup();
    }
}
