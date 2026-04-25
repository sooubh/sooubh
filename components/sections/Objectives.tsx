import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Target, Zap, Globe, Cpu, Users, Layers, TrendingUp } from 'lucide-react';

const stats = [
    { label: "Students Mentored", value: 500, suffix: "+", icon: Users },
    { label: "Projects Built", value: 20, suffix: "+", icon: Layers },
    { label: "Tech Workshops", value: 15, suffix: "+", icon: Cpu },
    { label: "Focus on GenAI", value: 100, suffix: "%", icon: Zap },
];

const cards = [
    {
        title: "The Mission",
        icon: Target,
        description: "To bridge the gap between complex AI theories and practical, human-centric applications. Building software that not only functions but impacts.",
        color: "text-blue-400",
        gradient: "from-blue-500/20 to-transparent"
    },
    {
        title: "The Vision",
        icon: Globe,
        description: "A world where technology amplifies human potential. Democratizing access to advanced AI tools through education and open-source contribution.",
        color: "text-purple-400",
        gradient: "from-purple-500/20 to-transparent"
    },
    {
        title: "The Strategy",
        icon: TrendingUp,
        description: "Continuous learning, rapid prototyping, and community engagement. Leveraging the modern AI ecosystem to stay at the bleeding edge of innovation.",
        color: "text-green-400",
        gradient: "from-green-500/20 to-transparent"
    }
];

const Counter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    useEffect(() => {
        if (!isInView) return;

        const duration = 2000; // ms
        const steps = 60;
        const interval = duration / steps;
        const stepValue = value / steps;
        
        let current = 0;
        const timer = setInterval(() => {
            current += stepValue;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, interval);
        
        return () => clearInterval(timer);
    }, [value, isInView]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export const Objectives: React.FC = () => {
  return (
    <section className="min-h-screen py-24 relative z-10 flex flex-col justify-center overflow-hidden">
        
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-8 bg-google-blue/50" />
                    <span className="text-xs font-mono text-google-blue uppercase tracking-widest">Mission Control</span>
                    <div className="h-px w-8 bg-google-blue/50" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">Objectives</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Aligning technical expertise with community growth to drive meaningful innovation.
                </p>
            </motion.div>

            {/* Strategic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 backdrop-blur-sm overflow-hidden"
                    >
                        {/* Hover Gradient Border */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        <div className="relative h-full bg-black/40 rounded-xl p-8 flex flex-col items-start gap-6 hover:bg-black/30 transition-colors">
                            <div className={`p-4 rounded-xl bg-white/5 border border-white/10 ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon className="w-8 h-8" />
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {card.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Impact Metrics Strip */}
            <div className="border-t border-white/10 pt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            className="flex flex-col items-center text-center"
                        >
                            <stat.icon className="w-6 h-6 text-gray-500 mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <span className="text-xs font-mono uppercase tracking-widest text-google-blue">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    </section>
  );
};
