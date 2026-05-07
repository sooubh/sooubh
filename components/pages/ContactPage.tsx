import React, { useState, Suspense, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { 
    Mail, Calendar as CalendarIcon, MessageCircle, ChevronDown, 
    Send, Check, Linkedin, Github, Twitter, Instagram, 
    ChevronLeft, ChevronRight, Clock, AlertCircle
} from 'lucide-react';
import { FloatingNavbar } from '../ui/FloatingNavbar';
import { ChatBot } from '../ui/ChatBot';
import { GeminiOrb } from '../GeminiOrb';
import { Particles } from '../ui/Particles';
import { HeaderLogo } from '../ui/HeaderLogo';
import { LINKEDIN_URL } from '../../lib/content';

export const ContactPage: React.FC = () => {
    const [selectedBooking, setSelectedBooking] = useState<{date: Date, slot: string} | null>(null);

    useEffect(() => {
        document.title = "Contact | Sourabh Singh";
        return () => {
            document.title = "Sourabh Singh | AI Builder & Developer";
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
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        Available for new projects
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-purple-500">Connect</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Have a groundbreaking idea or a complex problem? Let's build something extraordinary together.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    
                    {/* LEFT COLUMN: Contact Form & Socials */}
                    <div className="lg:col-span-7 space-y-12">
                        
                        {/* Contact Form */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-google-blue/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
                                <MessageCircle className="w-6 h-6 text-google-blue" />
                                Drop a Message
                            </h3>
                            
                            <ContactForm selectedBooking={selectedBooking} />
                        </div>

                        {/* Social Presence */}
                        <div className="relative z-10">
                             <h3 className="text-sm font-bold mb-6 text-gray-500 uppercase tracking-[0.3em]">Digital Presence</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <SocialCard href={LINKEDIN_URL} icon={Linkedin} label="LinkedIn" handle="@sooubh" color="hover:border-blue-500 hover:text-blue-500" />
                                <SocialCard href="https://github.com/sooubh" icon={Github} label="GitHub" handle="@sooubh" color="hover:border-white hover:text-white" />
                                <SocialCard href="https://twitter.com/sourabh_singgh" icon={Twitter} label="Twitter / X" handle="@sourabh_singgh" color="hover:border-sky-400 hover:text-sky-400" />
                                <SocialCard href="https://instagram.com/sourabh_singg" icon={Instagram} label="Instagram" handle="@sourabh_singg" color="hover:border-pink-500 hover:text-pink-500" />
                             </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Calendar & FAQ */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        {/* Interactive Calendar */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                    <CalendarIcon className="w-6 h-6 text-purple-400" />
                                    Book a Call
                                </h3>
                                <p className="text-gray-400 text-sm mb-8">
                                    Select a date and time for a 30-min discovery session.
                                </p>
                                
                                <InteractiveCalendar onSelect={setSelectedBooking} />
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="relative z-10">
                             <h3 className="text-sm font-bold mb-6 text-gray-500 uppercase tracking-[0.3em]">F.A.Q</h3>
                             <div className="space-y-4">
                                <FaqItem q="Are you available for freelance?" a="Yes! I'm currently open to new projects, especially those involving AI integration, Full-stack development and system architecture." />
                                <FaqItem q="What is your typical turnaround?" a="For small projects, 1-2 weeks. Larger systems depend on scope, but I prioritize clear milestones and rapid prototyping." />
                                <FaqItem q="Do you do mentorship?" a="Absolutely. I love giving back to the community. You can book a call or DM me on LinkedIn for mentorship queries." />
                             </div>
                        </div>

                    </div>

                </div>

                <div className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
                        Available for new opportunities
                    </div>
                    <div>© {new Date().getFullYear()} Sourabh Singh. Built with Google Gemini.</div>
                </div>

            </div>
            
            <ChatBot />
        </div>
    );
};

// --- Subcomponents ---

const ContactForm: React.FC<{selectedBooking: {date: Date, slot: string} | null}> = ({ selectedBooking }) => {
    const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState('sending');
        setError(null);

        const bookingString = selectedBooking 
            ? `\n\n[BOOKING REQUESTED: ${selectedBooking.date.toLocaleDateString()} at ${selectedBooking.slot}]`
            : '';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || (selectedBooking ? 'Meeting Request' : 'Contact Form'),
                    message: formData.message + bookingString,
                    from_name: 'Portfolio Contact',
                }),
            });

            const result = await response.json();
            if (result.success) {
                setState('sent');
            } else {
                setState('idle');
                setError(result?.message || 'Failed to send. Please try again.');
            }
        } catch {
            setState('idle');
            setError('Network error. Check your connection.');
        }
    };

    if (state === 'sent') {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                 <div className="w-20 h-20 rounded-full bg-google-green/20 mx-auto flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-google-green" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Transmission Received!</h4>
                <p className="text-gray-400">I've received your message and will get back to you shortly.</p>
                <button
                    onClick={() => {
                        setState('idle');
                        setError(null);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-8 px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                >
                    Send Another
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue/20 focus:outline-none transition-all placeholder:text-gray-700"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue/20 focus:outline-none transition-all placeholder:text-gray-700"
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                <input
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue/20 focus:outline-none transition-all placeholder:text-gray-700"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue/20 focus:outline-none transition-all resize-none placeholder:text-gray-700"
                />
            </div>

            <AnimatePresence>
                {selectedBooking && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3 text-purple-300 text-sm"
                    >
                        <Clock className="w-5 h-5" />
                        <span>Booking attached: <b>{selectedBooking.date.toLocaleDateString()}</b> at <b>{selectedBooking.slot}</b></span>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}
            
            <button 
                disabled={state === 'sending'} 
                className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-google-blue hover:text-white transition-all disabled:opacity-50 group"
            >
                {state === 'sending' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Transmitting...</>
                ) : (
                    <>Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
            </button>
        </form>
    );
};

const InteractiveCalendar: React.FC<{ onSelect: (b: {date: Date, slot: string}) => void }> = ({ onSelect }) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const handleMonthChange = (dir: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1));
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    const isDateSelectable = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()) && date.getDay() !== 0 && date.getDay() !== 6;
    };

    useEffect(() => {
        if (selectedDate && selectedSlot) {
            onSelect({
                date: new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate),
                slot: selectedSlot
            });
        }
    }, [selectedDate, selectedSlot, currentDate, onSelect]);

    return (
        <div className="space-y-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-200">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h4>
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleMonthChange(-1)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => handleMonthChange(1)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="bg-black/40 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                        <div key={d} className="text-[10px] font-bold text-gray-600 text-center py-2">{d}</div>
                    ))}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const selectable = isDateSelectable(day);
                        const isSelected = selectedDate === day;
                        return (
                            <button
                                key={day}
                                disabled={!selectable}
                                onClick={() => {
                                    setSelectedDate(day);
                                    setSelectedSlot(null);
                                }}
                                className={`
                                    aspect-square rounded-xl text-xs font-medium transition-all flex items-center justify-center
                                    ${isSelected ? 'bg-google-blue text-white shadow-lg shadow-google-blue/40 scale-110 z-10' : 
                                      selectable ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 opacity-20 cursor-not-allowed'}
                                `}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {selectedDate && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-4 border-t border-white/5 space-y-4"
                        >
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Available Slots</div>
                            <div className="flex flex-wrap gap-2">
                                {timeSlots.map(slot => (
                                    <button
                                        key={slot}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`
                                            px-3 py-2 rounded-lg text-[10px] font-bold transition-all border
                                            ${selectedSlot === slot 
                                                ? 'bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/20' 
                                                : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'}
                                        `}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {!selectedDate && (
                <div className="text-[10px] text-gray-500 italic text-center">
                    Select a weekday to see available times
                </div>
            )}
        </div>
    );
};

const SocialCard: React.FC<{ href: string; icon: any; label: string; handle: string; color: string }> = ({ href, icon: Icon, label, handle, color }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 transition-all group ${color} hover:bg-white/10`}
    >
        <div className="p-2.5 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5" />
        </div>
        <div className="overflow-hidden">
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">{label}</div>
            <div className="text-sm text-gray-300 font-mono truncate">{handle}</div>
        </div>
    </a>
);

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 group">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-bold text-gray-200 group-hover:text-white transition-colors">{q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-5">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Loader2 = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);
