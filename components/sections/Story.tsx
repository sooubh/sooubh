import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Award, Rocket, Code, Brain } from 'lucide-react';

const timelineData = [
  {
    year: '2024 - 2028',
    title: 'B.Tech in Computer Engineering',
    institution: "Sandip Foundation's SITRC",
    description: 'Pursuing a comprehensive degree with a focus on Artificial Intelligence, Machine Learning, and Full-Stack Development. Building a strong foundation in algorithms and system design.',
    icon: GraduationCap,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    glowClass: 'from-blue-500/30',
    badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  },
  {
    year: '2023',
    title: 'Full-Stack Evolution',
    institution: 'Self-Driven Learning',
    description: 'Learning the MERN stack, cloud platforms, and modern web technologies (React, TypeScript, Next.js). Started building complex projects and exploring the open-source ecosystem.',
    icon: Code,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    glowClass: 'from-purple-500/30',
    badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  },
  {
    year: '2024 - Present',
    title: 'AI Builder & Developer',
    institution: 'Student Developer Community',
    description: 'Selected to represent AI technologies on campus. Leading workshops on GenAI, mentoring students, and organizing tech events to foster a culture of innovation.',
    icon: Award,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    glowClass: 'from-yellow-500/30',
    badgeClass: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  },
  {
    year: 'Future',
    title: 'AI Innovator',
    institution: 'Vision',
    description: 'Aiming to build scalable AI solutions that solve real-world problems. Passionate about bridging the gap between theoretical research and practical application.',
    icon: Rocket,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    glowClass: 'from-red-500/30',
    badgeClass: 'text-red-400 bg-red-500/10 border-red-500/20'
  }
];

export const Story: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="min-h-screen py-24 relative z-10 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Ambient Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-google-blue/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-sm md:text-base font-bold text-google-blue uppercase tracking-[0.3em]">
                    01 — The Journey
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    Crafting my <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Story</span>.
                </h3>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
                    From writing my first line of code to leading communities as an AI Builder, my path is defined by a relentless curiosity and a drive to build.
                </p>
            </motion.div>

            {/* Timeline Container */}
            <div className="relative">
                {/* Central Line (Desktop) */}
                <div className="absolute left-8 md:left-1/2 top-4 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 origin-top md:block hidden">
                    <motion.div 
                        style={{ scaleY }}
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-google-blue via-purple-500 to-google-red origin-top h-full"
                    />
                </div>
                 {/* Central Line (Mobile - Left aligned) */}
                 <div className="absolute left-8 top-4 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 origin-top md:hidden block">
                    <motion.div 
                        style={{ scaleY }}
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-google-blue via-purple-500 to-google-red origin-top h-full"
                    />
                </div>

                <div className="space-y-12 md:space-y-24">
                    {timelineData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Empty spacer for alternating layout */}
                            <div className="flex-1 md:block hidden" />

                            {/* Timeline Point */}
                            <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-black z-20 ${item.bgColor} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>

                            {/* Content Card */}
                            <div className="flex-1 pl-16 md:pl-0 w-full">
                                <motion.div 
                                    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
                                    className={`
                                        p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group
                                        ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}
                                    `}
                                >
                                    {/* Hover Glow */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${item.glowClass} to-transparent`} />
                                    
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 ${item.badgeClass}`}>
                                        {item.year}
                                    </span>
                                    
                                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-google-blue transition-colors">
                                        {item.title}
                                    </h4>
                                    
                                    <h5 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2 md:justify-start">
                                        {/* Alignment hack: on right aligned cards, we might want to justify-end, but simplify for now */}
                                        <span className={index % 2 !== 0 ? 'md:ml-auto md:order-last' : ''}>{item.institution}</span>
                                    </h5>
                                    
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Resume CTA (Optional integrated mini-section) */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 text-center"
            >
                <button 
                  onClick={() => window.open('/assets/Sourabh_Singh_Resume-3.pdf', '_blank')}
                  className="px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all inline-flex items-center gap-2"
                >
                   <Brain className="w-4 h-4" />
                   View Full Resume
                </button>
            </motion.div>

        </div>
    </section>
  );
};
