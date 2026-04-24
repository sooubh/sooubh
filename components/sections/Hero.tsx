import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/sooubh", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/sourabh-singh", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/sourabh_singgh", label: "Twitter" },
    { icon: Mail, href: "mailto:sourabh3527@gmail.com", label: "Email" },
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-12 md:pt-20">
      
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 max-w-6xl mx-auto">
            
            {/* Left Content (Text) */}
            <motion.div 
               style={{ y, opacity }}
               className="flex-1 text-center lg:text-left space-y-6 md:space-y-8"
            >
                {/* Role Label */}
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-block"
                >
                     <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm font-medium tracking-widest uppercase text-google-blue backdrop-blur-sm shadow-[0_0_15px_rgba(66,133,244,0.3)]">
                        Full Stack Developer • Google Ambassador
                     </span>
                </motion.div>

                {/* Name Animation */}
                <div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
                        {['S', 'O', 'U', 'R', 'A', 'B', 'H'].map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: 0.3 + (index * 0.05),
                                    type: "spring",
                                    stiffness: 50,
                                    damping: 20
                                }}
                                className="inline-block hover:text-google-blue transition-colors cursor-default"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-gray-400 leading-[0.9] mt-2 group">
                        {['S', 'I', 'N', 'G', 'H'].map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: 0.6 + (index * 0.05),
                                    type: "spring",
                                    stiffness: 50,
                                    damping: 20
                                }}
                                className="inline-block group-hover:text-white transition-colors duration-300 cursor-default"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>
                </div>
                
                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    className="space-y-4"
                >
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Building digital experiences that <span className="text-google-blue font-medium">inspire</span> and <span className="text-google-red font-medium">innovate</span>.
                    </p>
                    <p className="text-sm md:text-base text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Specializing in scalable web applications, AI integration, and intuitive user interfaces.
                    </p>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="flex items-center justify-center lg:justify-start gap-4 pt-4"
                >
                    {socialLinks.map((link, index) => (
                        <a 
                            key={index} 
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 hover:border-google-blue/50 transition-all duration-300 hover:scale-110 group"
                            aria-label={link.label}
                        >
                            <link.icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        </a>
                    ))}
                    <Link 
                        to="/contact" 
                        className="px-6 py-3 ml-2 bg-google-blue hover:bg-google-blue/90 text-white font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,133,244,0.4)] hover:-translate-y-1"
                    >
                        Let's Connect
                    </Link>
                </motion.div>
            </motion.div>

            {/* Right Content (Profile Photo) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 30 }}
                className="relative flex-none"
            >
                {/* Glow Behind */}
                <div className="absolute inset-0 bg-gradient-to-tr from-google-blue/30 to-purple-500/30 rounded-full blur-[80px] scale-110 animate-pulse-slow" />
                
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-google-blue/10 rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] bg-black/20">
                    <img 
                        src="/assets/hero1.webp" 
                        alt="Sourabh Singh - Google Gemini Ambassador and Full Stack Developer specializing in AI integration and modern web development" 
                        className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
                    />
                    
                    {/* Inner Texture/Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 ring-1 ring-white/20 rounded-[inherit] pointer-events-none" />
                </div>

                {/* Decorative Elements */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl hidden lg:block"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-white/90">Open to work</span>
                    </div>
                </motion.div>
            </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:text-google-blue transition-colors"
            onClick={() => {
                const storySection = document.getElementById('section-s');
                if (storySection) storySection.scrollIntoView({ behavior: 'smooth' });
            }}
        >
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-google-blue/50 to-transparent relative overflow-hidden">
                <motion.div 
                    animate={{ y: [-50, 50] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-google-blue to-transparent w-full h-1/2"
                />
            </div>
        </motion.div>
      </div>

      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px]" />
          <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-google-red/5 rounded-full blur-[100px]" />
      </div>

    </section>
  );
};
