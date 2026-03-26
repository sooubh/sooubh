import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ExternalLink, Award, GraduationCap } from 'lucide-react';
import { SectionReveal } from '../ui/SectionReveal';
import profileImage from '../../assets/profile-ambassador.png';

export const AboutMe: React.FC = () => {
  return (
    <section className="min-h-screen bg-transparent text-white flex items-center py-20 relative z-10" id="about-me">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionReveal>
          {/* Layout: Mobile (Image Top, Text Bottom) | Desktop (Text Left, Image Right) */}
          {/* We use flex-col-reverse effectively or order utilities. */}
          {/* Let's stick to simple ordering: DOM = Text, Image. Mobile = flex-col-reverse? */}
          {/* User requested Mobile: Image first. Desktop: Text left. */}
          {/* DOM: [Image, Text] -> Mobile col: Image, Text. Desktop row-reverse: Text, Image. */}
          
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
            
            {/* Image Column */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-sm md:max-w-md"
                >
                    {/* Professional Glass Frame - Matches Galaxy Theme */}
                    <div className="relative group">
                        {/* Background Ambient Glow (Subtle Blue) */}
                        <div className="absolute inset-0 bg-google-blue/20 blur-[80px] rounded-full -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        {/* Glass Container */}
                        <div className="relative rounded-[24px] p-2 bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-md shadow-2xl">
                            <div className="relative rounded-[20px] overflow-hidden bg-black/40">
                                <img 
                                  src={profileImage} 
                                  alt="Sourabh Singh - B.Tech Computer Engineering Student, Google Gemini Ambassador, and Full Stack AI Developer" 
                                  className="w-full h-auto object-contain transform transition-transform duration-700 hover:scale-105"
                                  loading="lazy"
                                />
                                
                                {/* Professional Vignette Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            </div>
                        </div>

                        {/* Minimalist Tech Accents */}
                        <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-[28px] -z-10" />
                        <div className="absolute -bottom-1 -left-1 w-20 h-20 bg-gradient-to-tr from-google-blue/20 to-transparent rounded-bl-[28px] -z-10" />
                    </div>
                </motion.div>
            </div>

            {/* Content Column */}
            <div className="w-full md:w-1/2 text-left">
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Sourabh Singh
                  </h2>
                  
                  <p className="text-gray-400 text-sm md:text-base font-medium mb-8 leading-relaxed uppercase tracking-wide">
                    B.Tech Computer Engineering Student | AI & Full-Stack Developer | Google Student Ambassador
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    I am a Computer Engineering undergraduate with a strong interest in Artificial Intelligence and modern web development. I enjoy building user-centric, high-performance applications and learning through hands-on projects, hackathons, and experimentation.
                  </p>

                  {/* Education Timeline */}
                  <div className="relative border-l-2 border-white/10 pl-8 ml-4 mb-12 space-y-10">
                    {[
                      {
                        year: '2022 - 2026 (Expected)',
                        title: 'B.Tech in Computer Engineering',
                        institution: "Sandip Foundation's SITRC",
                        desc: 'Specializing in AI/ML and Full Stack Development.'
                      },
                      {
                        year: '2024 - Present',
                        title: 'Google Gemini Ambassador',
                        institution: 'Google Student Developer Clubs',
                        desc: 'Leading AI workshops and community tech events.'
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative"
                      >
                        <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-google-blue bg-black z-10"></div>
                        <span className="text-xs font-mono text-google-blue uppercase tracking-widest mb-1 block">{item.year}</span>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                           <GraduationCap className="w-3 h-3" />
                           {item.institution}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Google Student Ambassador Highlight Block */}
                  <div className="bg-white/5 border-l-4 border-google-blue rounded-r-xl p-6 mb-10 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                          <Award className="w-5 h-5 text-google-blue" />
                          <h3 className="text-white font-bold text-lg">Google Student Ambassador</h3>
                      </div>
                      <ul className="space-y-2 text-gray-400 text-sm">
                          <li className="flex items-start gap-2">
                              <span className="text-google-blue">•</span>
                              Represent Google technologies on campus
                          </li>
                          <li className="flex items-start gap-2">
                              <span className="text-google-blue">•</span>
                              Promote Google AI, Gemini, and developer tools
                          </li>
                          <li className="flex items-start gap-2">
                              <span className="text-google-blue">•</span>
                              Conduct tech sessions and mentor students
                          </li>
                      </ul>
                  </div>
                  
                  {/* Action Elements */}
                  <div className="flex flex-wrap gap-4">
                      <a 
                        href="#" 
                        className="px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2"
                      >
                          <Download className="w-4 h-4" />
                          Download Resume
                      </a>
                      
                      <a 
                        href="#contact" 
                        className="px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-all backdrop-blur-sm flex items-center gap-2"
                      >
                          <Mail className="w-4 h-4" />
                          Contact Me
                      </a>
                  </div>
              </motion.div>

            </div>
            
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

