import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Layers, Terminal, Sparkles } from 'lucide-react';

const projects = [
    {
        id: "01",
        title: "LegalEase AI — Legal Document Analyzer",
        category: "Portfolio Project",
        github: "https://github.com/genaitics/legalDoc",
        link: "https://github.com/genaitics/legalDoc",
        techStack: ["React", "TypeScript", "Firebase", "Gemini AI"],
        features: [
            "Upload contracts and get AI summaries and risk highlights",
            "Bilingual output in English and Hindi",
            "AI chat for document-based questions",
            "Lawyer suggestion based on context"
        ],
        color: "from-green-400 to-emerald-600",
        shadow: "shadow-green-500/20"
    },
    {
        id: "02",
        title: "Student Financial OS — College Finance Manager",
        category: "Portfolio Project",
        github: "https://github.com/genaitics/summer-hacks-v2",
        link: "https://github.com/genaitics/summer-hacks-v2",
        techStack: ["Flutter", "Firebase", "Riverpod", "Gemini AI"],
        features: [
            "Expense tracking and bill splitting",
            "AI spending insights",
            "Automated monthly reports and notifications",
            "Award: 1st Runner-Up at SummerHacks"
        ],
        color: "from-blue-400 to-purple-600",
        shadow: "shadow-blue-500/20"
    },
    {
        id: "03",
        title: "CARE-AI — AI Parenting Companion",
        category: "Portfolio Project",
        github: "https://github.com/sooubh/Care-Ai",
        link: "https://github.com/sooubh/Care-Ai",
        techStack: ["Flutter", "Firebase", "Gemini AI"],
        features: [
            "AI-based therapy guidance chat",
            "Medication reminders",
            "Doctor–parent connection",
            "Works offline-first"
        ],
        color: "from-pink-400 to-rose-600",
        shadow: "shadow-pink-500/20"
    },
    {
        id: "04",
        title: "KumbhSaathi — Pilgrim Safety App",
        category: "Portfolio Project",
        github: "https://github.com/genaitics/kumbhSaathi",
        link: "https://github.com/genaitics/kumbhSaathi",
        techStack: ["Flutter", "Firebase", "OpenStreetMap", "Gemini AI"],
        features: [
            "AI voice assistant with multilingual support",
            "SOS alerts and live tracking",
            "Crowd heatmaps",
            "Works in low network conditions"
        ],
        color: "from-orange-400 to-amber-600",
        shadow: "shadow-orange-500/20"
    }
];

import { ComingSoonModal } from '../ui/ComingSoonModal';

export const RealProjects: React.FC = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = React.useState(false);

  return (
    <section className="min-h-screen py-16 md:py-32 relative z-10 bg-transparent overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-24 md:flex md:items-end md:justify-between border-b border-white/10 pb-8 md:pb-12"
        >
            <div className="max-w-2xl">
                <h2 className="text-xs md:text-sm font-bold text-google-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-google-blue"></span>
                    04 — Real Projects
                </h2>
                <h3 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                    Architecting <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Digital Solutions</span>
                </h3>
            </div>
            <div className="hidden md:block">
                <p className="text-gray-400 max-w-xs text-right text-sm leading-relaxed">
                    Selected works showcasing full-stack capabilities, AI integration, and user-centric design.
                </p>
            </div>
        </motion.div>

        {/* Projects Stack */}
        <div className="flex flex-col gap-16 md:gap-32">
            {projects.map((project, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="group"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* 1. Project Visual / Preview Card */}
                        <div className={`lg:col-span-7 relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                             <div className={`
                                relative rounded-3xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/10 
                                group-hover:border-white/20 transition-all duration-500 shadow-2xl ${project.shadow}
                             `}>
                                 {/* Placeholder/Gradient Content */}
                                 <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                                 
                                 {/* "Mockup" Elements */}
                                 <div className="absolute inset-x-8 top-8 bottom-0 bg-white/5 rounded-t-xl border-t border-l border-r border-white/10 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         <div className="text-center">
                                             <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                                                 <Layers className="text-white w-8 h-8" />
                                             </div>
                                             <span className="text-white/40 font-mono text-sm uppercase tracking-widest">
                                                 Project Preview
                                             </span>
                                         </div>
                                     </div>
                                 </div>

                                 {/* Hover Overlay */}
                                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                     <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all transform scale-90 group-hover:scale-100 duration-300">
                                         <Github size={24} />
                                     </a>
                                     <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all transform scale-90 group-hover:scale-100 duration-300 delay-75">
                                         <ExternalLink size={24} />
                                     </a>
                                 </div>
                             </div>
                        </div>

                        {/* 2. Project Details */}
                        <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                            <div className={`flex items-center gap-4 mb-6 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                                <span className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${project.color} opacity-30`}>
                                    {project.id}
                                </span>
                                <span className="h-px w-12 bg-white/10"></span>
                                <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>
                            
                            <h3 className="text-4xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                                {project.title}
                            </h3>
                            
                            <div className="mb-8 space-y-6">
                                <div>
                                    <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3 ${index % 2 === 1 ? 'text-right' : ''}`}>
                                        Tech Stack
                                    </p>
                                    <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                                        {project.techStack.map((stack, stackIndex) => (
                                            <span key={`${project.id}-stack-${stackIndex}`} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                                                {stack}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3 ${index % 2 === 1 ? 'text-right' : ''}`}>
                                        Key Features
                                    </p>
                                    <ul className="space-y-2 text-gray-400 text-lg leading-relaxed">
                                        {project.features.map((feature, featureIndex) => (
                                            <li key={`${project.id}-feature-${featureIndex}`} className="flex gap-3">
                                                <span className="mt-1 text-gray-500" aria-hidden="true">&bull;</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className={`flex items-center gap-6 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-google-blue transition-colors group/link"
                                >
                                    <Github className="w-4 h-4" />
                                    <span className="border-b border-transparent group-hover/link:border-google-blue">GitHub</span>
                                </a>
                                <a 
                                    href={project.link} 
                                    onClick={(e) => { e.preventDefault(); setIsComingSoonOpen(true); }}
                                    aria-label="View Live (coming soon)"
                                    title="Coming soon"
                                    className="flex items-center gap-2 text-white hover:text-google-blue transition-colors group/link cursor-pointer"
                                >
                                    <span className="border-b border-transparent group-hover/link:border-google-blue">View Live</span>
                                    <ArrowUpRight className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                    </div>
                </motion.div>
            ))}
        </div>

        <div className="mt-40 text-center">
            <a href="https://github.com/sooubh" target="_blank" rel="noreferrer" className="inline-flex flex-col items-center gap-4 group cursor-pointer">
                <span className="text-gray-500 text-sm tracking-widest uppercase group-hover:text-white transition-colors">See more archives</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <Github className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </div>
            </a>
        </div>

        <ComingSoonModal 
            isOpen={isComingSoonOpen} 
            onClose={() => setIsComingSoonOpen(false)} 
        />

      </div>
    </section>
  );
};
