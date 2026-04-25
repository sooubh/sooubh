import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Lightbulb } from 'lucide-react';
import { SectionReveal } from '../ui/SectionReveal';

export const WhatIsGemini: React.FC = () => {
  const cards = [
    { icon: <Brain className="w-6 h-6 text-google-blue" />, title: "AI Collaborator", text: "Your personal study buddy that adapts to your learning style." },
    { icon: <Zap className="w-6 h-6 text-google-yellow" />, title: "Productivity", text: "Automate mundane tasks and focus on what truly matters." },
    { icon: <Lightbulb className="w-6 h-6 text-google-green" />, title: "Creativity", text: "Brainstorm ideas, generate art, and write code instantly." },
  ];

  return (
    <section className="min-h-screen bg-transparent text-white flex items-center py-20 relative z-10">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
              >
                Not just a chatbot.<br/>
                A <span className="text-google-blue">superpower</span>.
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-lg md:text-xl mb-10"
              >
                AI is a multimodal AI that can understand text, images, video, and audio. It helps students study smarter, not harder.
              </motion.p>
              
              <div className="flex flex-col gap-6">
                {cards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/10 hover:bg-white/5 transition-colors backdrop-blur-sm"
                  >
                    <div className="p-3 rounded-lg bg-white/5">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                      <p className="text-gray-400 text-sm">{card.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 backdrop-blur-md">
               {/* Abstract UI Representation */}
               <div className="absolute inset-0 flex flex-col p-8">
                  <div className="flex gap-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-google-red"></div>
                    <div className="w-3 h-3 rounded-full bg-google-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-google-green"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "60%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-4 bg-white/20 rounded w-3/4" 
                    />
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "40%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-4 bg-white/20 rounded w-1/2" 
                    />
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "80%" }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="h-32 bg-google-blue/10 border border-google-blue/30 rounded-xl mt-8 flex items-center justify-center text-google-blue/50" 
                    >
                      Analyzing...
                    </motion.div>
                  </div>
               </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};