import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { GeminiService } from '../../services/GeminiService';
import { ChatMessage } from '../../types';

export const GeminiAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', text: 'Greetings, Traveler! I am Gem, your guide to this galaxy. Ask me anything about Sourabh or navigation!' }
    ]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Voice Support
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            // @ts-ignore
            recognitionRef.current = new window.webkitSpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            
            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                handleSend(transcript);
            };

            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;
        
        const userMsg: ChatMessage = { role: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await GeminiService.streamResponse(messages, text);
            // @ts-ignore - Handle SDK version differences
            const iterable = result.stream || result;
            let fullResponse = '';
            
            setMessages(prev => [...prev, { role: 'assistant', text: '' }]);

            for await (const chunk of iterable) {
                const chunkText = chunk.text();
                fullResponse += chunkText;
                setMessages(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].text = fullResponse;
                    return newHistory;
                });
            }
            
            // Text to Speech
            speak(fullResponse);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', text: 'I seem to be having trouble reaching the stellar network.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <>
            {/* Floating Trigger */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 bg-google-blue p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
            >
                <div className="relative">
                    <MessageSquare className="w-6 h-6 text-white" />
                    {/* Pulsing ring */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                </div>
            </motion.button>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-96 h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
                            <div className="flex items-center gap-2">
                                <span className="text-google-blue font-bold">AI Assistant</span>
                                <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">Beta</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                        msg.role === 'user' 
                                            ? 'bg-google-blue text-white rounded-br-none' 
                                            : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                            <div className="flex gap-2">
                                <button 
                                    onClick={toggleListening}
                                    className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-400 hover:text-white'}`}
                                >
                                    <Mic className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder-gray-500"
                                />
                                <button 
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    className="text-google-blue disabled:opacity-50 hover:text-blue-400"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
