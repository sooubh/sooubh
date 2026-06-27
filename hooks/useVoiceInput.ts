import { useState, useEffect, useCallback, useRef } from 'react';

interface UseVoiceInputReturn {
    isListening: boolean;
    transcript: string;
    startListening: () => void;
    stopListening: () => void;
    resetTranscript: () => void;
    error: string | null;
}

export const useVoiceInput = (): UseVoiceInputReturn => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // @ts-ignore - webkitSpeechRecognition is not in standard types
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false; // Chat-style: stop after one utterance
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onstart = () => {
                    console.log("useVoiceInput: Speech recognition started.");
                    setIsListening(true);
                    setError(null);
                };

                recognitionRef.current.onend = () => {
                    console.log("useVoiceInput: Speech recognition ended.");
                    setIsListening(false);
                };

                recognitionRef.current.onresult = (event: any) => {
                    let currentTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        currentTranscript += event.results[i][0].transcript;
                    }
                    if (currentTranscript.trim()) {
                        setTranscript(currentTranscript);
                    }
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("useVoiceInput: Speech recognition error", event.error);
                    if (event.error === 'no-speech') {
                        setError('No speech detected. Please try again.');
                    } else if (event.error === 'network') {
                        setError('Network error. Check your connection.');
                    } else if (event.error === 'not-allowed') {
                        setError('Microphone permission denied.');
                    } else {
                        setError(`Speech recognition error: ${event.error}`);
                    }
                    setIsListening(false);
                };
            } else {
                console.warn("useVoiceInput: Browser does not support SpeechRecognition.");
                setError('Speech recognition not supported in this browser.');
            }
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.abort();
                } catch (_) {}
                recognitionRef.current.onstart = null;
                recognitionRef.current.onend = null;
                recognitionRef.current.onresult = null;
                recognitionRef.current.onerror = null;
            }
        };
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                setError(null);
                setTranscript('');
                recognitionRef.current.start();
            } catch (e) {
                console.error("Error starting speech recognition:", e);
                // If native engine is already active but React state is out of sync, force stop and restart
                try {
                    recognitionRef.current.stop();
                } catch (_) {}
                setTimeout(() => {
                    try {
                        recognitionRef.current.start();
                    } catch (_) {}
                }, 200);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            try {
                recognitionRef.current.stop();
            } catch (_) {}
        }
    }, [isListening]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        error,
    };
};
