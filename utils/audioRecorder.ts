export class AudioRecorder {
    stream: MediaStream | null = null;
    audioContext: AudioContext | null = null;
    source: MediaStreamAudioSourceNode | null = null;
    processor: ScriptProcessorNode | null = null;

    onDataAvailable: (data: ArrayBuffer) => void = () => { };

    constructor() { }

    async start(onData: (data: ArrayBuffer) => void) {
        this.onDataAvailable = onData;

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
                sampleRate: 24000, // Gemini prefers 16k or 24k
            });

            this.source = this.audioContext.createMediaStreamSource(this.stream);
            this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

            this.processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                // Convert Float32 to Int16 PCM
                const pcmData = this.floatTo16BitPCM(inputData);
                this.onDataAvailable(pcmData);
            };

            this.source.connect(this.processor);
            this.processor.connect(this.audioContext.destination);
        } catch (error) {
            console.error("Error starting audio recording:", error);
            throw error;
        }
    }

    stop() {
        if (this.processor) {
            this.processor.onaudioprocess = null;
            this.processor.disconnect();
            this.processor = null;
        }
        if (this.source) {
            this.source.disconnect();
            this.source = null;
        }
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }

    private floatTo16BitPCM(input: Float32Array): ArrayBuffer {
        const output = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i]));
            output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        return output.buffer;
    }
}
