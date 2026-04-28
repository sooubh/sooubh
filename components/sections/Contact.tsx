import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Linkedin, Github, Instagram, Twitter, Copy, Check, Sparkles } from 'lucide-react';
import { LINKEDIN_URL } from '../../lib/content';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormState('sent');
      } else {
        setFormState('idle');
        setError(result?.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setFormState('idle');
      setError('Network error. Please try again.');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('sourabh3527@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="min-h-screen py-24 relative z-10 flex items-center justify-center overflow-hidden">
        
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-blue-900/10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-google-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* LEFT: Text & Holographic Info */}
            <div className="space-y-12 text-center lg:text-left">
                <div>
                     <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center justify-center lg:justify-start gap-2">
                        <span className="w-8 h-px bg-gray-500"></span>
                        07 — Human Connect
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Let's <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Collaborate.</span>
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        Got a vision for the next big thing? Or just want to talk about the future of AI? My inbox is always open (and my agents are listening).
                    </p>
                </div>

                {/* Email Chip */}
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyEmail}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-google-blue/50 transition-all cursor-pointer group"
                >
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-google-blue transition-colors" />
                    <span className="text-gray-200 font-mono">sourabh3527@gmail.com</span>
                    <div className="w-px h-4 bg-white/10 ml-2" />
                    {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />}
                </motion.div>

                {/* Social Orbit */}
                <div className="flex justify-center lg:justify-start gap-4">
                    <SocialOrb href={LINKEDIN_URL} icon={Linkedin} color="hover:text-blue-500 hover:border-blue-500/50" delay={0} />
                    <SocialOrb href="https://github.com/sooubh" icon={Github} color="hover:text-white hover:border-white/50" delay={0.1} />
                    <SocialOrb href="https://instagram.com/sourabh_singg" icon={Instagram} color="hover:text-pink-500 hover:border-pink-500/50" delay={0.2} />
                    <SocialOrb href="https://twitter.com/sourabh_singgh" icon={Twitter} color="hover:text-sky-400 hover:border-sky-400/50" delay={0.3} />
                </div>
            </div>

            {/* RIGHT: Holographic Contact Form */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                {/* Glass Card */}
                <div className="relative p-8 md:p-10 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl">
                    
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-google-blue/50 rounded-tl-xl -mt-1 -ml-1" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-google-blue/50 rounded-br-xl -mb-1 -mr-1" />

                    <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-google-blue" />
                        Initialize Handshake
                    </h4>

                    {formState === 'sent' ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-500/20 mx-auto flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-green-400" />
                            </div>
                            <h5 className="text-xl font-bold text-white mb-2">Message Transmitted</h5>
                            <p className="text-gray-400">I'll get back to you at lightspeed.</p>
                             <button 
                                onClick={() => {
                                    setFormState('idle');
                                    setError(null);
                                    setFormData({ name: '', email: '', message: '' });
                                }}
                                className="mt-8 text-sm text-google-blue hover:underline"
                            >
                                Send another transmission
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSend} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase tracking-wider ml-1">Identity</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-google-blue/50 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase tracking-wider ml-1">Coordinates</label>
                                <input 
                                    type="email" 
                                    required
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-google-blue/50 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase tracking-wider ml-1">Transmission</label>
                                <textarea 
                                    rows={4}
                                    required
                                    placeholder="Your Message..."
                                    value={formData.message}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-google-blue/50 focus:bg-white/10 transition-all font-medium resize-none"
                                />
                            </div>

                            {error && <p className="text-red-400 text-sm">{error}</p>}

                            <motion.button 
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,1)" }}
                                whileTap={{ scale: 0.98 }}
                                disabled={formState === 'sending'}
                                className={`
                                    w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all
                                    ${formState === 'sending' ? 'bg-gray-600 cursor-wait' : 'bg-white text-black hover:shadow-google-blue/20'}
                                `}
                            >
                                {formState === 'sending' ? (
                                    <span className="animate-pulse">Transmitting...</span>
                                ) : (
                                    <>Send Transmission <Send className="w-5 h-5" /></>
                                )}
                            </motion.button>
                        </form>
                    )}
                </div>
            </motion.div>

        </div>
        
        {/* Footer Integration */}
        <div className="mt-32 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Sourabh Singh. Engineered with React & AI.</p>
            <div className="flex gap-6 mt-4 md:mt-0 font-mono">
                <a href="/assets/Sourabh_Singh_Resume-3.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-google-blue transition-colors">Resume</a>
                <a href="#" className="hover:text-google-blue transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-google-blue transition-colors">Terms</a>
            </div>
        </div>

      </div>
    </section>
  );
};

const SocialOrb: React.FC<{ href: string; icon: any; color: string; delay: number }> = ({ href, icon: Icon, color, delay }) => (
    <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className={`
            w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
            text-gray-400 transition-all duration-300 ${color} hover:shadow-[0_0_20px_currentColor]
        `}
    >
        <Icon className="w-5 h-5" />
    </motion.a>
);
