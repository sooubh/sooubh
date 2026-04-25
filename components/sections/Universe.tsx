import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Cpu, Terminal, Layers, Layout, Server, Brain, Cloud, Globe, List, Box } from 'lucide-react';

// Skill Data Structure
const orbits = [
    {
        name: "Core",
        radius: 0,
        speed: 0,
        items: [
            { name: "Sourabh", description: "The central intelligence.", icon: Brain, color: "text-white" }
        ]
    },
    {
        name: "Languages",
        radius: 120,
        speed: 20, // seconds for full rotation
        items: [
            { name: "TypeScript", description: "Typed superset of JavaScript.", icon: Code, color: "text-blue-400" },
            { name: "JavaScript", description: "Language of the web.", icon: Terminal, color: "text-yellow-400" },
            { name: "Python", description: "AI & Scripting powerhouse.", icon: Code, color: "text-green-400" },
            { name: "HTML/CSS", description: "Structural foundation.", icon: Layout, color: "text-orange-400" },
        ]
    },
    {
        name: "Frameworks",
        radius: 220,
        speed: 30,
        items: [
            { name: "React", description: "UI Library.", icon: Cpu, color: "text-blue-300" },
            { name: "Next.js", description: "React Framework.", icon: Layers, color: "text-white" },
            { name: "Node.js", description: "JS Runtime.", icon: Server, color: "text-green-500" },
            { name: "Tailwind", description: "Utility-first CSS.", icon: Layout, color: "text-cyan-400" },
            { name: "Express", description: "Web Framework.", icon: Server, color: "text-gray-400" },
        ]
    },
    {
        name: "Ecosystem",
        radius: 340,
        speed: 45,
        items: [
            { name: "AI Assistant", description: "Generative AI Integration.", icon: Brain, color: "text-purple-400" },
            { name: "GCP", description: "Cloud Platform.", icon: Cloud, color: "text-blue-400" },
            { name: "Firebase", description: "Backend-as-a-Service.", icon: Database, color: "text-orange-500" },
            { name: "Docker", description: "Containerization.", icon: Cloud, color: "text-blue-500" },
            { name: "Git", description: "Version Control.", icon: Globe, color: "text-red-400" },
            { name: "Three.js", description: "3D Web Graphics.", icon: Layers, color: "text-white" },
            { name: "Figma", description: "Design Tool.", icon: Layout, color: "text-pink-400" },
        ]
    }
];

export const Universe: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'orbit' | 'list'>('orbit');
  const [isCoreHovered, setIsCoreHovered] = useState(false);

  return (
    <section className="min-h-[120vh] py-24 relative z-10 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.05),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10 md:mb-16 relative z-20 pointer-events-none"
            >
                <h2 className="text-sm md:text-base font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">
                    03 — Universe
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Technical Galaxy
                </h3>
            </motion.div>

            {/* View Toggle / Core Button */}
            <div className="relative z-30 flex justify-center mb-12 md:hidden">
                 {/* Mobile toggle logic if needed, but the main toggle is inside the core for desktop */}
            </div>

            <div className="relative w-full min-h-[600px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* ORBIT VIEW (Desktop Default) */}
                    {viewMode === 'orbit' && (
                        <motion.div 
                            key="orbit"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="hidden md:flex items-center justify-center relative h-[800px] w-full perspective-1000"
                        >
                            {orbits.map((orbit, orbitIndex) => {
                                if (orbit.radius === 0) {
                                    // CORE - Toggle Button - REDESIGNED
                                    return (
                                    <div key={orbitIndex} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group">
                                        
                                        {/* Core Orb Container */}
                                        <motion.div 
                                            className="relative w-16 h-16 rounded-full flex items-center justify-center" // Reduced size
                                            onHoverStart={() => setIsCoreHovered(true)}
                                            onHoverEnd={() => setIsCoreHovered(false)}
                                            onClick={() => setViewMode('list')}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {/* Glow Layer */}
                                            <div className="absolute inset-0 bg-google-blue/20 rounded-full blur-xl group-hover:bg-google-blue/40 transition-colors duration-500" />
                                            
                                            {/* Main Orb Body */}
                                            <div className="absolute inset-0 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                                                
                                                {/* Animated Icons */}
                                                <AnimatePresence mode="wait">
                                                    {!isCoreHovered ? (
                                                        <motion.div
                                                            key="brain"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <Brain className="text-white w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="list"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="flex flex-col items-center"
                                                        >
                                                            <List className="text-white w-5 h-5 mb-0.5" />
                                                            <span className="text-[8px] font-bold text-white tracking-wider uppercase">List</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Rotating Ring (Decor) */}
                                            <div className="absolute inset-[-4px] rounded-full border border-google-blue/30 border-t-transparent border-l-transparent animate-spin-slow pointer-events-none" />
                                        </motion.div>
                                        
                                    </div> 
                                    );
                                }

                                return (
                                    <div key={orbitIndex} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 pointer-events-none" // ADDED pointer-events-none
                                        style={{ width: orbit.radius * 2, height: orbit.radius * 2 }}
                                    >
                                        {/* Orbit Track */}
                                        <div className="w-full h-full rounded-full border border-white/5 opacity-50" />
                                        
                                        {/* Rotating Container */}
                                        <motion.div 
                                            className="absolute inset-0 w-full h-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: orbit.speed, repeat: Infinity, ease: "linear" }}
                                        >
                                            {orbit.items.map((item, itemIndex) => {
                                                const angle = (itemIndex / orbit.items.length) * 360;
                                                return (
                                                    <div 
                                                        key={itemIndex}
                                                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center pointer-events-auto" // ADDED pointer-events-auto
                                                        style={{ 
                                                            transform: `rotate(${angle}deg) translateY(-${orbit.radius}px) rotate(-${angle}deg)` 
                                                        }}
                                                    >
                                                        <motion.div
                                                            whileHover={{ scale: 1.2 }}
                                                            onMouseEnter={() => setHoveredSkill(item.name)}
                                                            onMouseLeave={() => setHoveredSkill(null)}
                                                            className="relative group cursor-pointer"
                                                        >
                                                            {/* Planet/Icon */}
                                                            <div className={`
                                                                w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/80 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg transition-colors duration-300
                                                                ${hoveredSkill === item.name ? 'border-google-blue bg-white/10' : 'hover:border-white/30'}
                                                            `}>
                                                                <motion.div 
                                                                    animate={{ rotate: -360 }}
                                                                    transition={{ duration: orbit.speed, repeat: Infinity, ease: "linear" }}
                                                                >
                                                                    <item.icon className={`w-5 h-5 md:w-7 md:h-7 ${item.color}`} />
                                                                </motion.div>
                                                            </div>

                                                            {/* Detailed Popup Card */}
                                                            <AnimatePresence>
                                                                {hoveredSkill === item.name && (
                                                                    <motion.div 
                                                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-black/90 border border-white/20 rounded-xl p-4 backdrop-blur-xl shadow-2xl z-50 pointer-events-none"
                                                                    >
                                                                        <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                                                                            <item.icon className={`w-4 h-4 ${item.color}`} />
                                                                            <span className="font-bold text-white text-sm">{item.name}</span>
                                                                        </div>
                                                                        <p className="text-xs text-gray-300 leading-snug">
                                                                            {item.description}
                                                                        </p>
                                                                        {/* Arrow */}
                                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/20" />
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </motion.div>
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* LIST VIEW (Toggleable on Desktop, Default on Mobile) */}
                    {(viewMode === 'list' || window.innerWidth < 768) && (
                         <motion.div 
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="hidden md:block w-full max-w-4xl mx-auto"
                        >
                            {/* Toggle Back Button (Desktop only) */}
                            <div className="hidden md:flex justify-center mb-12">
                                <button 
                                    onClick={() => setViewMode('orbit')}
                                    className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center gap-2 transition-all hover:scale-105"
                                >
                                    <Box className="w-4 h-4" />
                                    Switch to Galaxy View
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {orbits.slice(1).map((orbit, i) => (
                                    <div key={i} className="space-y-4 bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
                                        <h4 className="text-lg font-bold text-gray-200 border-b border-white/10 pb-3 flex items-center justify-between">
                                            {orbit.name}
                                            <span className="text-xs text-gray-500 font-mono italic">{orbit.items.length} skills</span>
                                        </h4>
                                        <div className="space-y-3">
                                            {orbit.items.map((item, j) => (
                                                <div key={j} className="flex items-center gap-3 group">
                                                    <div className="p-2 rounded-lg bg-black/40 border border-white/5 group-hover:border-google-blue/30 transition-colors">
                                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-white group-hover:text-google-blue transition-colors">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 line-clamp-1">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                 {/* Mobile-only fallback to ensure list always shows on mobile regardless of state */}
                 <div className="md:hidden w-full space-y-8">
                    {orbits.slice(1).map((orbit, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1 }}
                        >
                             <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-2">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
                                <h4 className="text-sm font-bold text-google-blue uppercase tracking-[0.2em] shadow-google-blue/50 drop-shadow-sm">
                                    {orbit.name}
                                </h4>
                                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {orbit.items.map((item, j) => (
                                    <div 
                                        key={j} 
                                        className="relative group overflow-hidden rounded-xl bg-white/5 border border-white/10 active:scale-[0.98] transition-all duration-200"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-active:opacity-100 transition-opacity" />
                                        
                                        <div className="flex items-start gap-4 p-4 relative z-10">
                                            <div className={`p-2.5 rounded-xl bg-black/40 border border-white/5 shadow-inner ${item.color.replace('text-', 'shadow-')}/20`}>
                                                <item.icon className={`w-6 h-6 ${item.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h5 className="font-bold text-gray-100 text-base">{item.name}</h5>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                                                </div>
                                                <p className="text-xs text-gray-400 leading-relaxed font-light border-l-2 border-white/5 pl-2">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                 </div>
            </div>

        </div>
    </section>
  );
};
