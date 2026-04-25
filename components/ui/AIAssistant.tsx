import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mic, Send, X, Sparkles, ChevronDown, User, Bot, Loader2, ExternalLink, MapPin, Volume2, VolumeX } from 'lucide-react';
import { GeminiService } from '../../services/GeminiService';
import { VoiceVisualizer } from './VoiceVisualizer';

// Types for chat messages
interface Message {
  role: 'user' | 'model';
  text: string;
  groundingSources?: { title: string; uri: string }[];
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Gem, your guide. Ask me about the Ambassador program, features, or I can take you anywhere on the page!" }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isThinking]);

  // Handle Scroll Tool with Highlight
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Add temporary highlight
      element.classList.add('transition-all', 'duration-500', 'ring-4', 'ring-google-blue', 'rounded-xl', 'bg-white/5');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-google-blue', 'bg-white/5');
      }, 2500);

      return `Scrolled to section: ${sectionId}`;
    }
    return `Could not find section: ${sectionId}`;
  };

  const speakText = (text: string) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;

    // Simple cleanup to avoid reading markdown
    const cleanText = text.replace(/[*#_`]/g, '');

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };



  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsThinking(true);

    try {
      stopSpeaking();
      
      // Use the GeminiService to get the response stream
      const responseStream = await GeminiService.streamResponse(messages, userMsg);

      let fullText = "";
      let toolResponseText = "";
      let functionCalls: any[] = [];
      let groundingSources: { title: string; uri: string }[] = [];
      
      // Initialize a new empty message for the model
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        // Collect Text
        if (chunk.text) {
          fullText += chunk.text;
          // Update the last message with the current accumulated text
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], text: fullText };
            return newArr;
          });
        }

        // Collect Function Calls (usually in the last chunk or distinct chunks)
        if (chunk.functionCalls) {
           functionCalls = [...functionCalls, ...chunk.functionCalls];
        }

        // Collect Grounding Metadata
        if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
          const chunks = chunk.candidates[0].groundingMetadata.groundingChunks;
          chunks.forEach((c: any) => {
            if (c.web?.uri && c.web?.title) {
              groundingSources.push({ title: c.web.title, uri: c.web.uri });
            }
          });
        }
      }
      
      if (fullText) {
          speakText(fullText);
      }

      // Handle Function Calls (Executed after stream to prevent UI jumping)
      if (functionCalls.length > 0) {
        for (const call of functionCalls) {
          if (call.name === 'scrollToSection') {
            // @ts-ignore
            scrollToSection(call.args.sectionId);
            if (!fullText) toolResponseText = `Taking you to the ${call.args.sectionId} section...`;
          }
        }
        
        // If there was no text from the model (only tool use), show a confirmation
        if (!fullText && toolResponseText) {
           setMessages(prev => {
              const newArr = [...prev];
              newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], text: toolResponseText };
              return newArr;
           });
           speakText(toolResponseText);
        }
      }

      // Update sources if found
      if (groundingSources.length > 0) {
        setMessages(prev => {
          const newArr = [...prev];
          // Deduplicate sources
          const uniqueSources = Array.from(new Set(groundingSources.map(s => s.uri)))
             .map(uri => groundingSources.find(s => s.uri === uri)!);
          
          newArr[newArr.length - 1] = { 
            ...newArr[newArr.length - 1], 
            groundingSources: uniqueSources 
          };
          return newArr;
        });
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => {
         // If the last message was the empty loading one, replace it. Otherwise append.
         const lastMsg = prev[prev.length - 1];
         if (lastMsg.role === 'model' && lastMsg.text === '') {
             const newArr = [...prev];
             newArr[newArr.length - 1] = { role: 'model', text: "I'm having trouble connecting right now. Please try again." };
             return newArr;
         } else {
             return [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again." }];
         }
      });
    } finally {
      setIsThinking(false);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        stopSpeaking();
      };
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Small delay to allow user to see text before sending
        setTimeout(() => {
            // Check if input was updated (a bit hacky in React state, but sufficient for simple voice command)
            // Ideally we'd call handleSendMessage directly but input state might not be updated yet in closure.
            // For now, we just set input. User can hit send.
        }, 500);
      };
      recognition.onerror = (event: any) => {
         console.error("Speech recognition error", event.error);
         setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert("Voice input is not supported in this browser.");
    }
  };
  
  // Draggable constraints (optional, can be removed for full freedom)
  const constraintsRef = useRef(null);

  return (
    <>
      <motion.div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50">
        <motion.div
          drag
          dragMomentum={false}
          initial={{ x: window.innerWidth - 100, y: window.innerHeight - 100 }}
          className="pointer-events-auto absolute"
          style={{ touchAction: "none" }}
        >
          <div className="relative">
             {/* Floating Orb / Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(66,133,244,0.6)] border border-white/20 backdrop-blur-md overflow-hidden transition-all duration-300 ${isOpen ? 'bg-black/80' : 'bg-gradient-to-tr from-google-blue via-purple-500 to-google-red'}`}
            >
                 {/* Internal Orb Animation */}
                 {!isOpen && (
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full"
                        />
                    </div>
                 )}
                
                {isOpen ? (
                    <ChevronDown className="text-white relative z-10" />
                ) : (
                    <Sparkles className="text-white relative z-10 animate-pulse" />
                )}
            </motion.button>
            
            {/* Draggable Chat Window (Anchored to the button) */}
            <AnimatePresence>
                {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20, x: 0 }}
                    animate={{ opacity: 1, scale: 1, y: -520, x: -340 }} // Position relative to the button (bottom-right origin assumption)
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="absolute w-[90vw] md:w-[400px] h-[500px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right"
                >
                     {/* Header */}
                    <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between cursor-move" onPointerDownCapture={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-google-blue to-google-red flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        <Bot size={18} className="text-white relative z-10" />
                        </div>
                        <div>
                        <h3 className="font-bold text-white text-sm">AI Companion</h3>
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-gray-400">AI Fast Model</span>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => {
                                setSoundEnabled(!soundEnabled);
                                if(soundEnabled) stopSpeaking();
                            }} 
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                    </div>

                    {/* Messages */}
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-google-blue text-white rounded-tr-none' 
                            : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                        }`}>
                            {msg.text}
                        </div>
                        
                        {/* Grounding Sources Display */}
                        {msg.groundingSources && msg.groundingSources.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2 max-w-[85%]">
                                {msg.groundingSources.map((source, idx) => (
                                    <a 
                                    key={idx} 
                                    href={source.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[10px] flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-gray-400 hover:text-google-blue"
                                    >
                                        <ExternalLink size={10} />
                                        <span className="truncate max-w-[100px]">{source.title}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                        </div>
                    ))}
                    {isThinking && messages[messages.length - 1]?.role === 'user' && (
                        <div className="flex justify-start">
                            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-black/20">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-google-blue/50 transition-colors">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask AI..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
                        />
                        <button 
                            onClick={startListening}
                            className={`p-2 rounded-full transition-colors relative ${isListening ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-white'}`}
                        >
                            {isListening ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                </div>
                            ) : null}
                            <Mic size={18} className="relative z-10" />
                        </button>
                        <button 
                            onClick={handleSendMessage}
                            disabled={!input.trim() || isThinking}
                            className="p-2 bg-white/10 rounded-full text-google-blue hover:bg-white/20 transition-colors disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    </div>
                    
                    {/* Voice Visualizer Indicator */}
                    <AnimatePresence>
                        {(isListening || isSpeaking) && (
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: 40 }}
                                exit={{ height: 0 }}
                                className="bg-black/40 border-t border-white/10 flex items-center justify-center overflow-hidden"
                            >
                                <VoiceVisualizer isActive={isListening || isSpeaking} mode={isListening ? 'listening' : 'speaking'} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};