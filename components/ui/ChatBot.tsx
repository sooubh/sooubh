import React, { useState, useEffect, useRef, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff, Sparkles, Volume2, VolumeX, Radio, RotateCcw } from 'lucide-react';
import { WebLLMService } from '../../services/WebLLMService';
import { ChatMessage } from '../../types';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { VoiceVisualizer } from './VoiceVisualizer';
import { ChatParticles } from './ChatParticles';
import { AnimatedBackground } from './AnimatedBackground';

// Reducer for complex state management
type ChatState = {
  isOpen: boolean;
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
  isVoiceEnabled: boolean;
  isLiveMode: boolean;
  isLiveConnected: boolean;
  error: string | null;
};

type ChatAction = 
  | { type: 'TOGGLE_OPEN' }
  | { type: 'SET_INPUT', payload: string }
  | { type: 'ADD_MESSAGE', payload: ChatMessage }
  | { type: 'UPDATE_LAST_MESSAGE', payload: string }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string | null }
  | { type: 'TOGGLE_VOICE' }
  | { type: 'TOGGLE_LIVE', payload?: boolean }
  | { type: 'SET_LIVE_CONNECTED', payload: boolean }
  | { type: 'CLEAR_MESSAGES' };

const initialState: ChatState = {
  isOpen: false,
  messages: [],
  inputValue: '',
  isLoading: false,
  isVoiceEnabled: false,
  isLiveMode: false,
  isLiveConnected: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'TOGGLE_OPEN':
      return { ...state, isOpen: !state.isOpen, error: null };
    case 'SET_INPUT':
      return { ...state, inputValue: action.payload, error: null };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload], error: null };
    case 'UPDATE_LAST_MESSAGE':
      const newMessages = [...state.messages];
      if (newMessages.length > 0) {
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'assistant' || lastMsg.role === 'model') {
              newMessages[newMessages.length - 1] = { ...lastMsg, text: action.payload };
          }
      }
      return { ...state, messages: newMessages };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'TOGGLE_VOICE':
      return { ...state, isVoiceEnabled: !state.isVoiceEnabled, isLiveMode: false, isLiveConnected: false, error: null };
    case 'TOGGLE_LIVE':
      const newLiveMode = action.payload !== undefined ? action.payload : !state.isLiveMode;
      return { 
        ...state, 
        isLiveMode: newLiveMode, 
        isVoiceEnabled: false, // Mutual exclusion
        isLiveConnected: false,
        error: null 
      };
    case 'SET_LIVE_CONNECTED':
      return { ...state, isLiveConnected: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [], error: null };
    default:
      return state;
  }
}

export const ChatBot: React.FC = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Standard Hooks
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useVoiceInput();
  const { speak, stop: stopSpeaking, isSpeaking: isTtsSpeaking, supported: ttsSupported } = useTextToSpeech();

  // Connect/Disconnect Local Live Service based on mode
  useEffect(() => {
    if (state.isLiveMode && !state.isLiveConnected && state.isOpen) {
        connectLive();
    } else if ((!state.isLiveMode || !state.isOpen) && state.isLiveConnected) {
        disconnectLive();
    }
  }, [state.isLiveMode, state.isOpen, state.isLiveConnected]);

  const connectLive = async () => {
      try {
        dispatch({ type: 'SET_LIVE_CONNECTED', payload: true });
        startListening();
      } catch (e) {
          console.error("Failed to connect live", e);
          dispatch({ type: 'SET_ERROR', payload: "Failed to initialize local voice engine." });
          dispatch({ type: 'TOGGLE_LIVE', payload: false });
      }
  };

  const disconnectLive = () => {
      stopListening();
      stopSpeaking();
      dispatch({ type: 'SET_LIVE_CONNECTED', payload: false });
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isLoading, state.error]);

  // Voice loop: when TTS finishes, start listening again in live voice mode
  useEffect(() => {
    if (state.isLiveMode && !isTtsSpeaking && state.isOpen && !state.isLoading && state.isLiveConnected) {
      const timer = setTimeout(() => {
        startListening();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isTtsSpeaking, state.isLiveMode, state.isOpen, state.isLoading, state.isLiveConnected]);

  // Handle voice transcript (Standard & Live Mode)
  useEffect(() => {
    if (transcript && state.isOpen) {
      if (state.isLiveMode) {
        // Handled by the auto-send effect below
      } else {
        dispatch({ type: 'SET_INPUT', payload: transcript });
      }
    }
  }, [transcript, state.isLiveMode, state.isOpen]);

  useEffect(() => {
    if (!isListening && transcript && state.isLiveMode && state.isOpen && !state.isLoading) {
      const userMsg = transcript;
      resetTranscript();
      handleSend(userMsg);
    }
  }, [isListening, transcript, state.isLiveMode, state.isOpen, state.isLoading]);

  // Send Message Logic
  const handleSend = async (msgOverride?: string) => {
    const userMsg = (msgOverride || state.inputValue).trim();
    if (!userMsg || state.isLoading) return;

    dispatch({ type: 'SET_INPUT', payload: '' });
    resetTranscript();
    if (isListening) stopListening();

    dispatch({ type: 'ADD_MESSAGE', payload: { role: 'user', text: userMsg } });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      stopSpeaking();

      // Check if WebLLM is loaded
      if (!WebLLMService.isLoaded()) {
        dispatch({ type: 'ADD_MESSAGE', payload: { role: 'assistant', text: 'Initializing local LLM on WebGPU...' } });
        
        await WebLLMService.initEngine((report) => {
          dispatch({ 
            type: 'UPDATE_LAST_MESSAGE', 
            payload: `Local AI: ${report.text}` 
          });
        });
      }

      // Add thinking placeholder
      dispatch({ type: 'ADD_MESSAGE', payload: { role: 'assistant', text: 'Thinking...' } });

      let fullResponse = '';
      
      await WebLLMService.streamResponse(
        state.messages.map(m => ({ role: m.role, text: m.text })),
        userMsg,
        (chunkText) => {
          fullResponse = chunkText;
          
          // Check for scroll commands
          // e.g. [SCROLL:sectionId]
          const scrollMatch = chunkText.match(/\[SCROLL:([^\]]+)\]/);
          if (scrollMatch) {
            const sectionId = scrollMatch[1].trim();
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            fullResponse = chunkText.replace(/\[SCROLL:[^\]]+\]/g, "");
          }

          dispatch({ type: 'UPDATE_LAST_MESSAGE', payload: fullResponse || 'Thinking...' });
        }
      );

      // TTS if enabled or in voice mode
      if ((state.isVoiceEnabled || state.isLiveMode) && fullResponse) {
        speak(fullResponse);
      }

    } catch (error: any) {
      console.error("ChatBot Error:", error);
      dispatch({ type: 'SET_ERROR', payload: `Failed to load WebGPU local model. Ensure WebGPU is enabled. (Error: ${error.message || error})` });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // UI Handlers
  const toggleListeningHandler = () => {
      if (isListening) {
          stopListening();
      } else {
          stopSpeaking(); // Stop TTS before listening
          startListening();
      }
  };

  // Track mouse position for magnetic effect
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && !state.isOpen) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 150) {
          const magnetStrength = (150 - distance) / 150;
          setMousePos({
            x: distanceX * magnetStrength * 0.3,
            y: distanceY * magnetStrength * 0.3,
          });
        } else {
          setMousePos({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [state.isOpen]);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <AnimatePresence>
          {!state.isOpen && (
            <motion.div className="relative">
              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(66, 133, 244, 0.4) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
              
              {/* Main button */}
              <motion.button
                ref={buttonRef}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  x: mousePos.x,
                  y: mousePos.y,
                }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(66, 133, 244, 0.6), 0 0 60px rgba(155, 114, 203, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'TOGGLE_OPEN' })}
                className="relative bg-gradient-to-r from-google-blue via-purple-600 to-google-blue bg-[length:200%_100%] p-3 sm:p-4 rounded-full shadow-lg text-white transition-all duration-300 touch-manipulation"
                style={{
                  backgroundPosition: '0% 50%',
                  boxShadow: '0 0 20px rgba(66, 133, 244, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3)',
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <MessageCircle size={24} className="sm:w-7 sm:h-7" />
                </motion.div>
                
                {/* Sparkle effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  whileHover={{
                    background: [
                      'conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      'conic-gradient(from 360deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotateX: 0,
            }}
            exit={{ opacity: 0, y: 50, scale: 0.8, rotateX: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 sm:bottom-4 sm:right-4 sm:left-auto z-50 w-full sm:w-96 sm:max-w-[calc(100vw-32px)] h-[100dvh] sm:h-[600px] sm:max-h-[85vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              background: 'rgba(17, 24, 39, 0.95)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 60px rgba(66, 133, 244, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Animated Background */}
            <AnimatedBackground isActive={state.isLiveConnected || state.isLoading} />
            
            {/* Particles - reduce count on mobile */}
            <ChatParticles count={typeof window !== 'undefined' && window.innerWidth < 640 ? 8 : 15} />
            {/* Header */}
            <motion.div 
              className="p-3 sm:p-4 bg-white/5 border-b border-white/10 flex justify-between items-center shrink-0 relative z-10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="text-yellow-400 shrink-0" size={18} />
                <h3 className="font-bold text-white text-sm sm:text-base truncate">THE SOOUBH ASSISTANT</h3>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                 <button 
                    onClick={() => dispatch({ type: 'TOGGLE_LIVE' })}
                    className={`p-1.5 sm:p-2 rounded-full transition-colors touch-manipulation ${state.isLiveMode ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'}`}
                    title="Toggle AI Voice"
                  >
                    <Radio size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>

                {!state.isLiveMode && ttsSupported && (
                  <button 
                    onClick={() => dispatch({ type: 'TOGGLE_VOICE' })}
                    className={`p-1.5 sm:p-2 rounded-full transition-colors touch-manipulation ${state.isVoiceEnabled ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white'}`}
                    title="Toggle Text-to-Speech"
                  >
                    {state.isVoiceEnabled ? <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" /> : <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" />}
                  </button>
                )}
                
                <button 
                  onClick={() => dispatch({ type: 'TOGGLE_OPEN' })}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors touch-manipulation"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            {state.error && (
                <div className="bg-red-500/20 border-l-4 border-red-500 p-2 text-red-200 text-xs text-center shrink-0">
                    {state.error}
                </div>
            )}

            {/* Content Area */}
            <div className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col ${state.isLiveMode ? 'justify-center items-center' : ''}`}>
              
              {state.isLiveMode ? (
                  <div className="text-center space-y-4 sm:space-y-6 px-4">
                      {/* Enhanced animated orb */}
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
                          {/* Outer pulsing rings */}
                          <motion.div 
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-google-blue to-purple-600"
                            animate={{
                              scale: state.isLiveConnected ? [1, 1.2, 1] : 1,
                              opacity: state.isLiveConnected ? [0.5, 0.8, 0.5] : 0.3,
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            style={{ filter: 'blur(20px)' }}
                          />
                          
                          {/* Middle ring */}
                          <motion.div 
                            className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
                            animate={{
                              scale: state.isLiveConnected ? [1, 1.15, 1] : 1,
                              opacity: state.isLiveConnected ? [0.4, 0.6, 0.4] : 0.2,
                              rotate: 360,
                            }}
                            transition={{
                              scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                              opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                              rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                            }}
                            style={{ filter: 'blur(15px)' }}
                          />
                          
                          {/* Core orb */}
                          <motion.div 
                            className="absolute inset-4 rounded-full bg-gradient-to-br from-google-blue via-purple-600 to-pink-500 flex items-center justify-center relative overflow-hidden"
                            animate={{
                              boxShadow: state.isLiveConnected 
                                ? [
                                    '0 0 20px rgba(66, 133, 244, 0.5)',
                                    '0 0 40px rgba(155, 114, 203, 0.8)',
                                    '0 0 20px rgba(66, 133, 244, 0.5)',
                                  ]
                                : '0 0 10px rgba(66, 133, 244, 0.3)',
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                            <Sparkles size={36} className="sm:w-12 sm:h-12 text-white relative z-10" />
                          </motion.div>
                      </div>
                      
                      <div>
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-2">AI Voice</h4>
                          <motion.p 
                            className="text-gray-400 text-sm max-w-[200px] mx-auto"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                              {state.isLiveConnected ? "Listening..." : "Connecting..."}
                          </motion.p>
                      </div>
                      <VoiceVisualizer isActive={true} mode={state.isLiveConnected ? 'speaking' : 'idle'} />
                  </div>
              ) : (
                  <>
                    {state.messages.length === 0 && (
                        <div className="text-center text-gray-400 mt-6 sm:mt-10 px-4">
                        <div className="inline-block p-3 sm:p-4 rounded-full bg-white/5 mb-3 sm:mb-4">
                            <Sparkles size={28} className="sm:w-8 sm:h-8 text-google-blue" />
                        </div>
                        <p className="text-xs sm:text-sm">Hi! I'm your assistant. Ask me anything!</p>
                        </div>
                    )}
                    
                    {state.messages.map((msg, idx) => (
                        <motion.div 
                          key={idx} 
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            type: 'spring',
                            damping: 20,
                            stiffness: 300,
                            delay: idx * 0.05,
                          }}
                        >
                        <motion.div 
                          className={`max-w-[85%] p-3 rounded-2xl text-sm break-words ${
                            msg.role === 'user' 
                            ? 'bg-gradient-to-br from-google-blue to-blue-600 text-white rounded-tr-sm shadow-lg' 
                            : 'bg-white/10 text-gray-200 rounded-tl-sm backdrop-blur-sm'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          style={{
                            boxShadow: msg.role === 'user' 
                              ? '0 4px 15px rgba(66, 133, 244, 0.3)'
                              : '0 4px 15px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                            {msg.text}
                        </motion.div>
                        </motion.div>
                    ))}
                    
                    {state.isLoading && (
                        <motion.div 
                          className="flex justify-start"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                        <div className="bg-gradient-to-r from-white/10 to-white/5 px-4 py-3 rounded-full rounded-tl-sm flex gap-1.5 items-center backdrop-blur-sm relative overflow-hidden">
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.span 
                              className="w-2 h-2 rounded-full relative z-10"
                              style={{ background: 'linear-gradient(135deg, #4285F4, #9B72CB)' }}
                              animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 1, 0.6],
                              }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.span 
                              className="w-2 h-2 rounded-full relative z-10"
                              style={{ background: 'linear-gradient(135deg, #DB4437, #F4B400)' }}
                              animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 1, 0.6],
                              }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.span 
                              className="w-2 h-2 rounded-full relative z-10"
                              style={{ background: 'linear-gradient(135deg, #0F9D58, #4285F4)' }}
                              animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 1, 0.6],
                              }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                        </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
              )}
            </div>

            {/* Input Area */}
            {!state.isLiveMode && (
                <motion.div 
                  className="p-3 sm:p-4 bg-white/5 border-t border-white/10 relative shrink-0 safe-bottom"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                {state.isVoiceEnabled && (
                    <div className="absolute top-0 left-0 w-full -translate-y-full bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent p-1 sm:p-2 flex justify-center pointer-events-none">
                        <VoiceVisualizer 
                          isActive={isListening || isTtsSpeaking} 
                          mode={isListening ? 'listening' : isTtsSpeaking ? 'speaking' : 'idle'} 
                        />
                    </div>
                )}
                
                {/* Transcript Preview if listening */}
                {isListening && (
                    <motion.div 
                      className="text-xs text-google-blue mb-2 ml-1 sm:ml-2 truncate"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                         <motion.span
                           animate={{ opacity: [0.5, 1, 0.5] }}
                           transition={{ duration: 1, repeat: Infinity }}
                         >
                           Listening: {transcript || "..."}
                         </motion.span>
                    </motion.div>
                )}

                <motion.div 
                  className="flex items-center gap-1.5 sm:gap-2 rounded-full p-1 pl-3 sm:pl-4 border transition-all duration-300"
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                  whileFocus={{
                    borderColor: 'rgba(66, 133, 244, 0.5)',
                    boxShadow: '0 0 20px rgba(66, 133, 244, 0.3)',
                  }}
                >
                    <input
                      type="text"
                      value={state.inputValue}
                      onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
                      onKeyDown={handleKeyDown}
                      placeholder={isListening ? "Listening..." : "Ask me anything..."}
                      className="bg-transparent flex-1 text-white text-xs sm:text-sm focus:outline-none placeholder:text-gray-500 min-w-0"
                      disabled={state.isLoading}
                    />
                    
                    <motion.button
                      onClick={toggleListeningHandler}
                      className="p-1.5 sm:p-2 rounded-full transition-all relative overflow-hidden touch-manipulation"
                      style={{
                        background: isListening 
                          ? 'rgba(239, 68, 68, 0.2)' 
                          : 'transparent',
                        color: isListening ? '#EF4444' : '#9CA3AF',
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Toggle Microphone"
                    >
                      {isListening && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                          style={{ background: 'rgba(239, 68, 68, 0.5)' }}
                        />
                      )}
                      {isListening ? <MicOff size={16} className="sm:w-[18px] sm:h-[18px] relative z-10" /> : <Mic size={16} className="sm:w-[18px] sm:h-[18px] relative z-10" />}
                    </motion.button>

                    <motion.button
                      onClick={() => handleSend()}
                      disabled={!state.inputValue.trim() || state.isLoading}
                      className="p-1.5 sm:p-2 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden touch-manipulation"
                      style={{
                        background: 'linear-gradient(135deg, #4285F4, #9B72CB)',
                      }}
                      whileHover={{ 
                        scale: !state.inputValue.trim() ? 1 : 1.1,
                        boxShadow: '0 0 20px rgba(66, 133, 244, 0.5)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      title="Send Message"
                    >
                      {/* Ripple effect on click */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white"
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileTap={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      <Send size={16} className="sm:w-[18px] sm:h-[18px] relative z-10" />
                    </motion.button>
                </motion.div>
                </motion.div>
            )}
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
