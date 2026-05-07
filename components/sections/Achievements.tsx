import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, GraduationCap, Trophy, Star, Medal, Crown, Bookmark, ThumbsUp, ExternalLink } from 'lucide-react';

export const Achievements: React.FC = () => {
  const achievements = [
    // Hero Item (Span 2x2)
    {
       id: "google-ambassador",
       size: "large", // col-span-2 row-span-2
       year: "2024",
       title: "AI Builder & Developer",
       icon: <ShieldCheck className="w-8 h-8 text-google-blue" />,
       desc: "Selected as a global student ambassador in the AI ecosystem. Leading workshops, building AI-first solutions, and mentoring peers in GenAI technologies.",
       color: "bg-google-blue/10 border-google-blue/20",
       glow: "shadow-[0_0_50px_rgba(66,133,244,0.2)]"
    },
    {
       id: "hackathon-winner",
       size: "wide", // col-span-2
       year: "2024",
       title: "2x Hackathon Winner",
       icon: <Trophy className="w-6 h-6 text-google-yellow" />,
       desc: "Emerging victorious in multiple national-level hackathons, including GenAI Exchange. Specialized in rapid prototyping and high-performance AI integration.",
       color: "bg-google-yellow/10 border-google-yellow/20"
    },
    {
       id: "playstore",
       size: "tall", // row-span-2
       year: "2024",
       title: "Play Store Publisher",
       icon: <Award className="w-6 h-6 text-google-green" />,
       desc: "Successfully engineered and published 2 applications on Google Play Store with thousands of active users.",
       links: [
         { name: "Gully Cricket", url: "https://play.google.com/store/apps/details?id=com.sooubh.gullycricket" },
         { name: "LovinGo", url: "https://play.google.com/store/apps/details?id=com.sooubh.lovingo" }
       ],
       color: "bg-google-green/10 border-google-green/20"
    },
    {
       id: "community-host",
       size: "standard",
       year: "2024",
       title: "Community Host",
       icon: <Medal className="w-6 h-6 text-orange-400" />,
       desc: "Hosting and leading a thriving tech community with 100+ active members.",
       color: "bg-orange-500/10 border-orange-500/20"
    },
    {
       id: "btech",
       size: "standard",
       year: "2024-28",
       title: "B.Tech Computer Engg.",
       icon: <GraduationCap className="w-6 h-6 text-google-blue" />,
       desc: "AI/ML Specialization. Consistent academic performer and research enthusiast.",
       color: "bg-google-blue/10 border-google-blue/20"
    },
    {
       id: "opensource",
       size: "standard",
       year: "2023",
       title: "Open Source",
       icon: <Star className="w-6 h-6 text-purple-400" />,
       desc: "Active contributor to major React & AI repositories on GitHub.",
       color: "bg-purple-500/10 border-purple-500/20"
    },
    {
       id: "writer",
       size: "standard",
       year: "2024",
       title: "Tech Writer",
       icon: <Bookmark className="w-6 h-6 text-cyan-400" />,
       desc: "Writing deep dives into GenAI and system architecture.",
       color: "bg-cyan-500/10 border-cyan-500/20"
    },
    {
       id: "learner",
       size: "standard",
       year: "2024",
       title: "Continuous Learner",
       icon: <ThumbsUp className="w-6 h-6 text-white" />,
       desc: "Constantly exploring new tech stacks and building projects.",
       color: "bg-white/10 border-white/20"
    }
  ];

  return (
    <section className="min-h-screen py-24 relative z-10 bg-transparent">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.05),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="mb-20 text-center">
             <h2 className="text-sm md:text-base font-bold text-google-yellow uppercase tracking-[0.2em] mb-4">
                05 — Achievements
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-yellow to-orange-500">Excellence</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
                A chronicle of milestones, recognitions, and contributions to the world of technology.
            </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
            {achievements.map((item, index) => {
                // Determine span classes based on size
                let spanClasses = "";
                if (item.size === "large") spanClasses = "md:col-span-2 md:row-span-2";
                else if (item.size === "wide") spanClasses = "md:col-span-2";
                else if (item.size === "tall") spanClasses = "md:row-span-2";
                
                return (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`
                            group relative p-6 rounded-3xl backdrop-blur-md border overflow-hidden flex flex-col justify-between
                            ${item.color} ${spanClasses} ${item.glow || ''}
                            hover:shadow-2xl hover:shadow-white/5 transition-all duration-300
                        `}
                    >
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-black/20 backdrop-blur-sm`}>
                                    {item.icon}
                                </div>
                                <span className="text-xs font-mono opacity-60 bg-black/20 px-2 py-1 rounded-full">
                                    {item.year}
                                </span>
                            </div>
                            
                            <h4 className={`font-bold text-white mb-2 ${item.size === 'large' ? 'text-3xl' : 'text-xl'}`}>
                                {item.title}
                            </h4>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                {item.desc}
                            </p>

                            {item.links && (
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {item.links.map((link, i) => (
                                        <a 
                                            key={i} 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-google-green hover:text-white transition-colors bg-google-green/10 px-2 py-1 rounded border border-google-green/20"
                                        >
                                            {link.name} <ExternalLink className="w-2.5 h-2.5" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Decorative Icon Background */}
                        <div className="absolute -bottom-4 -right-4 opacity-5 transform rotate-[-15deg] scale-150 pointer-events-none group-hover:scale-175 transition-transform duration-700">
                             {item.icon}
                        </div>
                    </motion.div>
                );
            })}
        </div>

      </div>
    </section>
  );
};
