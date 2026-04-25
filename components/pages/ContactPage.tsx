import React, { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Mail, Calendar, MessageCircle, ChevronDown, Send, Check, Linkedin, Github, Twitter, Instagram } from 'lucide-react';
import { FloatingNavbar } from '../ui/FloatingNavbar';
import { ChatBot } from '../ui/ChatBot';
import { GeminiOrb } from '../GeminiOrb';
import { Particles } from '../ui/Particles';
import { HeaderLogo } from '../ui/HeaderLogo';
import { LINKEDIN_URL } from '../../lib/content';

export const ContactPage: React.FC = () => {
    useEffect(() => {
        document.title = "Contact | Sourabh Singh";
        return () => {
            document.title = "Sourabh Singh | AI Builder & Developer"; // Restore on unmount
        };
    }, []);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-google-blue selection:text-white pb-20 relative w-full overflow-x-hidden">
            
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#DB4437" />
                    <Suspense fallback={null}>
                        <GeminiOrb />
                    </Suspense>
                </Canvas>
            </div>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
                <Particles />
            </div>

            <FloatingNavbar />
            <HeaderLogo />
            
            <div className="pt-32 container mx-auto px-6 max-w-6xl relative z-10">
                
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-purple-500">Touch</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto"
                    >
                        Whether you have a question, a project idea, or just want to say hi, I'm always open to connecting.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* LEFT COLUMN: Contact Form & Socials */}
                    <div className="lg:col-span-7 space-y-12">
                        
                        {/* Contact Form */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <MessageCircle className="w-6 h-6 text-google-blue" />
                                Send a Message
                            </h3>
                            <ContactForm />
                        </div>

                        {/* Social Presence */}
                        <div>
                             <h3 className="text-xl font-bold mb-6 text-gray-400 uppercase tracking-widest text-sm">Or find me on</h3>
                             <div className="grid grid-cols-2 gap-4">
                                <SocialCard href={LINKEDIN_URL} icon={Linkedin} label="LinkedIn" handle="@sooubh" color="hover:border-blue-500 hover:text-blue-500" />
                                <SocialCard href="https://github.com/sooubh" icon={Github} label="GitHub" handle="@sooubh" color="hover:border-white hover:text-white" />
                                <SocialCard href="https://twitter.com/sourabh_singgh" icon={Twitter} label="Twitter / X" handle="@sourabh_singgh" color="hover:border-sky-400 hover:text-sky-400" />
                                <SocialCard href="https://instagram.com/sourabh_singg" icon={Instagram} label="Instagram" handle="@sourabh_singg" color="hover:border-pink-500 hover:text-pink-500" />
                             </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Calendar & FAQ */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        {/* Mock Calendar */}
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-google-blue/10 to-purple-500/10 border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-32 bg-google-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 relative z-10">
                                <Calendar className="w-6 h-6 text-purple-400" />
                                Book a Call
                            </h3>
                            <p className="text-gray-400 mb-6 relative z-10">
                                Want to discuss a project in real-time? Schedule a 30-min discovery chat.
                            </p>
                            
                            {/* Mock Calendar Grid */}
                            <div className="bg-black/40 rounded-xl p-4 border border-white/5 backdrop-blur-sm relative z-10">
                                <div className="flex justify-between items-center mb-4 text-sm font-bold text-gray-300">
                                    <span>December 2024</span>
                                    <div className="flex gap-2">
                                        <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 cursor-pointer">←</div>
                                        <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 cursor-pointer">→</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-500 mb-2">
                                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 31 }).map((_, i) => (
                                        <div key={i} className={`
                                            aspect-square rounded flex items-center justify-center text-xs cursor-pointer transition-colors
                                            ${[10, 15, 20, 22].includes(i+1) ? 'bg-google-blue text-white shadow-lg shadow-google-blue/20 hover:scale-110' : 'hover:bg-white/10 text-gray-400'}
                                        `}>
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 py-2 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">
                                    View Available Slots
                                </button>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div>
                             <h3 className="text-xl font-bold mb-6 text-gray-400 uppercase tracking-widest text-sm">Frequently Asked Questions</h3>
                             <div className="space-y-4">
                                <FaqItem q="Are you available for freelance?" a="Yes! I'm currently open to new projects, especially those involving AI integration and React." />
                                <FaqItem q="What is your tech stack?" a="My core stack includes React, TypeScript, Node.js, and AI API. I also work with Flutter for mobile." />
                                <FaqItem q="Do you do mentorship?" a="I actively mentor students and love helping others. Feel free to reach out!" />
                             </div>
                        </div>

                    </div>

                </div>

                <div className="mt-20 border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} Sourabh Singh.
                </div>

            </div>
            
            <ChatBot />
        </div>
    );
};

// --- Subcomponents ---

const ContactForm = () => {
    const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setState('sending');
        setTimeout(() => setState('sent'), 1500);
    };

    if (state === 'sent') {
        return (
            <div className="text-center py-12">
                 <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                <p className="text-gray-400 mt-2">I'll get back to you shortly.</p>
                <button onClick={() => setState('idle')} className="mt-6 text-google-blue text-sm hover:underline">Send another</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Name" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-google-blue/50 focus:outline-none transition-colors" />
                <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-google-blue/50 focus:outline-none transition-colors" />
            </div>
            <input required placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-google-blue/50 focus:outline-none transition-colors" />
            <textarea required rows={5} placeholder="Message" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-google-blue/50 focus:outline-none transition-colors resize-none" />
            
            <button disabled={state === 'sending'} className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50">
                {state === 'sending' ? 'Sending...' : <>Send Message <Send className="w-4 h-4" /></>}
            </button>
        </form>
    );
};

const SocialCard: React.FC<{ href: string; icon: any; label: string; handle: string; color: string }> = ({ href, icon: Icon, label, handle, color }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 transition-colors group ${color}`}
    >
        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <div className="text-xs text-gray-500 uppercase font-bold">{label}</div>
            <div className="text-sm text-gray-300 font-mono">{handle}</div>
        </div>
    </a>
);

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-medium text-white">{q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: 'auto' }} 
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
