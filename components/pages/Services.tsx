import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, ArrowRight, Brain, Zap, Shield, ChevronDown } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const Services: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelUsed, setModelUsed] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse('');
    setModelUsed(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setResponse("Error: API Key not found.");
      setLoading(false);
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      // Try with Pro model first
      const model = 'gemini-1.5-pro';
      const result = await ai.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      setResponse(result.text);
      setModelUsed('AI Pro Model');
    } catch (proError) {
      console.warn("Pro model failed, switching to fallback...", proError);
      try {
        // Fallback to Flash model
        const fallbackModel = 'gemini-1.5-flash';
        const result = await ai.models.generateContent({
            model: fallbackModel,
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });
        setResponse(result.text);
        setModelUsed('AI Fast Model (Fallback)');
      } catch (flashError) {
        console.error("All models failed", flashError);
        setResponse("I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-20">
        <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-google-blue via-purple-500 to-google-red mb-4">
                AI Services
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Experience the power of AI. Ask anything, and let our advanced models assist you.
            </p>
        </header>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-google-blue/50 transition-colors">
                <Brain className="w-8 h-8 text-google-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Advanced Reasoning</h3>
                <p className="text-sm text-gray-400">Powered by AI 1.5 Pro for complex problem solving.</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                <Zap className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Performance</h3>
                <p className="text-sm text-gray-400">Optimized responses with fallback to a fast AI model.</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-google-red/50 transition-colors">
                <Shield className="w-8 h-8 text-google-red mb-4" />
                <h3 className="text-xl font-semibold mb-2">Reliable AI</h3>
                <p className="text-sm text-gray-400">Built with robust error handling and model redundancy.</p>
             </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-google-blue to-google-red flex items-center justify-center">
                    <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Ask AI</h2>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        {loading ? 'Thinking...' : modelUsed ? `Responded with ${modelUsed}` : 'Ready to help'}
                    </p>
                </div>
            </div>

            <div className="mb-6 space-y-4">
                <div className="bg-black/40 rounded-xl p-4 min-h-[150px] border border-white/5 text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {response || <span className="text-gray-600 italic">Your AI response will appear here...</span>}
                </div>
            </div>

            <div className="flex gap-2 relative">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask about code, events, or anything else..."
                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-google-blue/50 transition-colors resize-none h-[60px]"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleGenerate();
                        }
                    }}
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className="absolute right-2 top-2 bottom-2 aspect-square bg-white/10 hover:bg-white/20 text-google-blue rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Sparkles className="animate-spin" /> : <ArrowRight />}
                </button>
            </div>
        </div>

        <div className="mt-8 text-center">
            <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                Back to Home
            </a>
        </div>
    </div>
  );
};
