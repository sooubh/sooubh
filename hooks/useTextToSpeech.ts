import { useState, useCallback, useEffect, useRef } from 'react';

interface UseTextToSpeechReturn {
    speak: (text: string) => void;
    stop: () => void;
    isSpeaking: boolean;
    supported: boolean;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            setSupported(true);
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (!supported) {
            console.warn("useTextToSpeech: Speech not supported");
            return;
        }

        console.log("useTextToSpeech: Speaking text:", text.substring(0, 50) + "...");
        // Cancel any current speaking
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;
        utterance.lang = 'en-US';
        utterance.rate = 1; // Normal speed
        utterance.pitch = 1;

        utterance.onstart = () => {
            console.log("useTextToSpeech: Started speaking");
            setIsSpeaking(true);
        };
        utterance.onend = () => {
            console.log("useTextToSpeech: Finished speaking");
            setIsSpeaking(false);
            utteranceRef.current = null;
        };
        utterance.onerror = (e) => {
            console.error("useTextToSpeech: Error speaking", e);
            setIsSpeaking(false);
            utteranceRef.current = null;
        };

        window.speechSynthesis.speak(utterance);
    }, [supported]);

    const stop = useCallback(() => {
        if (!supported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, [supported]);

    // Cleanup on unmount
    useEffect(() => () => {
        if (supported) {
            window.speechSynthesis.cancel();
        }
    }, [supported]);

    return {
        speak,
        stop,
        isSpeaking,
        supported
    };
};
