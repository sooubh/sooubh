import { useState, useEffect, useRef, useCallback } from 'react';
import { AudioRecorder } from '../utils/audioRecorder';
import { AudioStreamPlayer } from '../utils/audioStreamPlayer';

const MODEL = 'models/gemini-3.1-flash-live-preview';
const WS_URL = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=`;

export const useGeminiLive = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const recorderRef = useRef<AudioRecorder | null>(null);
    const playerRef = useRef<AudioStreamPlayer | null>(null);

    const connect = useCallback(() => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) return;

        const ws = new WebSocket(WS_URL + apiKey);
        wsRef.current = ws;

        ws.onopen = async () => {
            console.log("Connected to Gemini Live");
            setIsConnected(true);

            // Send Setup Message
            const setupMsg = {
                setup: {
                    model: MODEL,
                    generationConfig: {
                        responseModalities: ["AUDIO"],
                        speechConfig: {
                            voiceConfig: {
                                prebuiltVoiceConfig: {
                                    voiceName: "Zephyr"
                                }
                            }
                        },
                        contextWindowCompression: {
                            triggerTokens: 104857,
                            slidingWindow: { targetTokens: 52428 }
                        }
                    }
                }
            };
            ws.send(JSON.stringify(setupMsg));

            // Start Recording
            recorderRef.current = new AudioRecorder();
            playerRef.current = new AudioStreamPlayer();

            await recorderRef.current.start((data) => {
                // Send Audio Input
                if (ws.readyState === WebSocket.OPEN) {
                    const base64Audio = btoa(
                        String.fromCharCode(...new Uint8Array(data))
                    );
                    ws.send(JSON.stringify({
                        realtime_input: {
                            media_chunks: [{
                                mime_type: "audio/pcm",
                                data: base64Audio
                            }]
                        }
                    }));
                }
            });
        };

        ws.onmessage = async (event) => {
            let data;
            if (event.data instanceof Blob) {
                data = JSON.parse(await event.data.text());
            } else {
                data = JSON.parse(event.data);
            }

            // Handle Audio Output
            if (data.serverContent?.modelTurn?.parts) {
                for (const part of data.serverContent.modelTurn.parts) {
                    if (part.inlineData && part.inlineData.mimeType.startsWith('audio/pcm')) {
                        // Play Audio
                        const audioData = Uint8Array.from(atob(part.inlineData.data), c => c.charCodeAt(0)).buffer;
                        playerRef.current?.add16BitPCM(audioData);
                        setIsSpeaking(true);
                    }
                }
            }

            // Handle Turn Complete (stop speaking indicator eventually)
            if (data.serverContent?.turnComplete) {
                // setIsSpeaking(false); // Maybe prompt queue empty?
            }
        };

        ws.onclose = () => {
            console.log("Disconnected setupGemini");
            setIsConnected(false);
            cleanup();
        };
    }, []);

    const disconnect = useCallback(() => {
        wsRef.current?.close();
        cleanup();
    }, []);

    const cleanup = () => {
        recorderRef.current?.stop();
        playerRef.current?.stop();
    };

    useEffect(() => {
        return () => disconnect();
    }, [disconnect]);

    return { connect, disconnect, isConnected, isSpeaking };
};
