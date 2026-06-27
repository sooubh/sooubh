import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mic, Send, X, Sparkles, ChevronDown, User, Bot, Loader2, ExternalLink, MapPin, Volume2, VolumeX } from 'lucide-react';
import { WebLLMService } from '../../services/WebLLMService';
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
    { role: 'model', text: "Hi! I'm Gem, your local AI guide. Ask me about Sourabh's projects, skills, or experience!" }
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

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isThinking) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);

    try {
      stopSpeaking();

      // Check if WebLLM is loaded
      if (!WebLLMService.isLoaded()) {
        setMessages(prev => [...prev, { role: 'model', text: 'Initializing local LLM on WebGPU...' }]);
        
        await WebLLMService.initEngine((report) => {
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], text: `Local AI: ${report.text}` };
            return newArr;
          });
        });
      }

      // Now create a new response placeholder
      setMessages(prev => [...prev, { role: 'model', text: 'Thinking...' }]);

      let fullText = "";
      
      await WebLLMService.streamResponse(
        messages.map(m => ({ role: m.role, text: m.text })),
        userMsg,
        (chunkText) => {
          setIsThinking(false);
          fullText = chunkText;
          
          // Check for scroll commands
          // e.g. [SCROLL:sectionId]
          const scrollMatch = chunkText.match(/\[SCROLL:([^\]]+)\]/);
          if (scrollMatch) {
            const sectionId = scrollMatch[1].trim();
            scrollToSection(sectionId);
            fullText = chunkText.replace(/\[SCROLL:[^\]]+\]/g, "");
          }

          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], text: fullText || 'Thinking...' };
            return newArr;
          });
        }
      );

      if (fullText) {
        speakText(fullText);
      }
    } catch (error: any) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: `Failed to load WebGPU local model. Ensure WebGPU is enabled in your browser. (Error: ${error.message || error})` }]);
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
          initial={{ 
            x: typeof window !== 'undefined' ? window.innerWidth - 100 : 0, 
            y: typeof window !== 'undefined' ? window.innerHeight - 100 : 0 
          }}
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