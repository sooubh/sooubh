import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Mail } from 'lucide-react';
import { SectionReveal } from '../ui/SectionReveal';

export const Ambassador: React.FC = () => {
  return (
    <section className="py-24 bg-transparent border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 text-center">
        <SectionReveal>
          <motion.div 
             className="inline-block p-1 rounded-full bg-gradient-to-r from-google-blue via-google-red to-google-yellow mb-8"
          >
             <div className="bg-black rounded-full px-8 py-3 flex items-center gap-2">
                <ShieldCheck className="text-google-green" />
                <span className="font-bold tracking-widest text-sm uppercase">Official Partner</span>
             </div>
          </motion.div>
          
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
              Sourabh Singh <span className="hidden md:inline text-gray-500 mx-2 font-light">|</span> <span className="block md:inline mt-2 md:mt-0 bg-gradient-to-r from-google-blue via-purple-500 to-google-red bg-clip-text text-transparent">AI Builder & Developer</span>
            </h2>
          </div>
          
          <div className="inline-block relative group mb-16">
              <div className="absolute inset-0 bg-google-blue/20 blur-xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative bg-black/80 border border-google-blue/50 rounded-2xl px-12 py-8 backdrop-blur-xl shadow-[0_0_50px_rgba(66,133,244,0.15)] overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-google-blue to-transparent opacity-50"></div>
                  <p className="font-mono text-google-blue tracking-[0.2em] text-sm mb-4 uppercase font-bold">Official Partner ID</p>
                  <p className="font-mono text-5xl md:text-7xl font-black text-white tracking-widest drop-shadow-2xl uppercase">
                    12115
                  </p>
              </div>
          </div>
          
          <div className="max-w-2xl mx-auto text-gray-400 text-lg mb-16">
             <p className="mb-8 leading-relaxed">
                "Partnering with leading communities to empower students with AI. My mission is to bridge the gap between technology and education, helping you create, innovate, and succeed in the AI era."
             </p>
             <div className="flex justify-center items-center gap-2">
               <Award className="w-6 h-6 text-yellow-500" />
               <p className="text-sm font-bold text-white">Verified Partner • 2024 Cohort</p>
             </div>
          </div>

          {/* Partners & Supporters Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-t border-white/10 pt-12 max-w-4xl mx-auto"
          >
            <p className="text-sm font-mono text-gray-500 mb-8 uppercase tracking-widest">Supported By</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12">
              
              {/* SITRC Logo */}
              <div className="bg-white p-4 rounded-xl h-24 w-64 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-[0_0_30px_rgba(66,133,244,0.3)]">
                 <img 
                   src="/assets/sitrc-logo.png" 
                   alt="Sandip Foundation's SITRC - Educational Institution and Partner supporting Sourabh Singh's AI Builder & Developer initiatives" 
                   className="h-full w-full object-contain hover:scale-105 transition-transform"
                   loading="lazy"
                 />
              </div>

              {/* Student Ambassador Logo Construction */}
              <div className="bg-white p-4 rounded-xl h-24 w-64 flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-[0_0_30px_rgba(219,68,55,0.3)]">
                 <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
                   alt="Student Ambassador Program - Official Partner Logo" 
                   className="h-8 object-contain"
                   loading="lazy"
                 />
                 <div className="h-8 w-px bg-gray-300 mx-1"></div>
                 <div className="flex flex-col items-start leading-none">
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Student</span>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Ambassador</span>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Program</span>
                 </div>
              </div>

            </div>

            {/* New Ecosystem Subsection */}
            <div className="relative pt-10 mb-16">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
               <p className="text-xs font-mono text-gray-600 mb-6 uppercase tracking-widest">Tech Ecosystem</p>
               <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                   {[
                     { name: 'Cloud Platform', url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
                     { name: 'TensorFlow', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg' },
                     { name: 'Firebase', url: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg' },
                     { name: 'Developer Tools', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Google_Developers_logo.svg' }
                   ].map((logo, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="bg-white px-5 py-2 rounded-lg h-12 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-default hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        title={logo.name}
                      >
                         <img src={logo.url} alt={`${logo.name} - technology used by Sourabh Singh`} className="h-5 w-auto object-contain" loading="lazy" />
                      </motion.div>
                   ))}
               </div>
            </div>
            
            {/* Contact Button */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
               <a
                  href="mailto:sourabh3527@gmail.com"
                  className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-google-blue/50 transition-all duration-300 backdrop-blur-md cursor-pointer"
               >
                  <div className="p-2 rounded-full bg-google-blue/20 text-google-blue group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <span className="font-medium text-gray-200 group-hover:text-white">Contact Sourabh</span>
               </a>
            </motion.div>

          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
};