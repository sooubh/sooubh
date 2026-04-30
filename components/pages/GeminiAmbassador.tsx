import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import {
  ArrowUpRight,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  Play,
  ExternalLink,
  ChevronDown,
  Code2,
  Smartphone,
  Database,
  Globe
} from 'lucide-react';
import { geminiContent } from '../../lib/geminiContent';
import { 
  useScroll, 
  useTransform, 
  useSpring, 
  motion, 
  useMotionValue, 
  useMotionTemplate,
  MotionValue
} from 'framer-motion';

// Removed 3D components for maximum cleanliness and performance

// --- Utilities & Wrappers ---
const SectionWrapper: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        opacity,
        scale,
        perspective: "1200px",
        willChange: "transform, opacity"
      }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// --- Local Content Additions ---
const projectsData = [
  {
    title: "AI Peer Learning Labs",
    role: "Campus Workshop",
    description: "Hands-on sessions demystifying Google Gemini. Teaching peers how to leverage AI for coding, research, and creative problem-solving.",
    tags: ["Education", "Prompt Engineering", "Community"]
  },
  {
    title: "Prompt Battle Royales",
    role: "Interactive Event",
    description: "High-energy campus events where students compete to generate the best AI outputs, fostering rapid skill development and product adoption.",
    tags: ["Event Management", "GenAI", "Engagement"]
  },
  {
    title: "Adoption & Analytics",
    role: "Growth Strategy",
    description: "Driving active student sign-ups and usage. Tracking engagement metrics to provide actionable feedback directly to the Google Gemini team.",
    tags: ["Growth", "Analytics", "Feedback Loop"]
  }
];

const techStack = [
  { icon: <Sparkles className="w-6 h-6" />, name: "AI Evangelism", tools: "Public Speaking, Product Demos" },
  { icon: <Globe className="w-6 h-6" />, name: "Community", tools: "Discord, Campus Networks" },
  { icon: <Code2 className="w-6 h-6" />, name: "API Integration", tools: "Gemini API, Webhooks" },
  { icon: <Database className="w-6 h-6" />, name: "Data Feedback", tools: "User Metrics, Reporting" }
];

// --- Main Page Component ---
export const GeminiAmbassador: React.FC = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [isHovering, setIsHovering] = useState(true);
  const [hasMoved, setHasMoved] = useState(false);
  const [spotlightSize, setSpotlightSize] = useState(12);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroX = useMotionValue(0);
  const heroY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const updateHeroPos = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        heroX.set(rect.left);
        heroY.set(rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', updateHeroPos);
    window.addEventListener('resize', updateHeroPos);
    updateHeroPos();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updateHeroPos);
      window.removeEventListener('resize', updateHeroPos);
    };
  }, [mouseX, mouseY, hasMoved, heroX, heroY]);

  const spotlightSizeMotion = useSpring(spotlightSize, { stiffness: 400, damping: 30 });
  
  useEffect(() => {
    spotlightSizeMotion.set(spotlightSize);
  }, [spotlightSize, spotlightSizeMotion]);

  const revealMask = useMotionTemplate`radial-gradient(circle at ${useTransform([mouseX, heroX], ([x, hx]) => (x as number) - (hx as number))}px ${useTransform([mouseY, heroY], ([y, hy]) => (y as number) - (hy as number))}px, black ${spotlightSizeMotion}px, transparent ${spotlightSizeMotion}px)`;
  const inverseRevealMask = useMotionTemplate`radial-gradient(circle at ${useTransform([mouseX, heroX], ([x, hx]) => (x as number) - (hx as number))}px ${useTransform([mouseY, heroY], ([y, hy]) => (y as number) - (hy as number))}px, transparent ${spotlightSizeMotion}px, black ${spotlightSizeMotion}px)`;

  const videoShowcases = geminiContent.video?.showcases ?? [];
  
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Google Gemini Ambassador | Sourabh Singh';
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main 
      ref={containerRef} 
      className="relative min-h-[300vh] bg-[#050505] text-white font-geminiBody selection:bg-white selection:text-black overflow-x-hidden cursor-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      {/* Custom Orb Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ x: mouseX, y: mouseY }}
      >
        <motion.div
          className="rounded-full border border-white/30 mix-blend-difference"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            width: spotlightSizeMotion,
            height: spotlightSizeMotion,
            backdropFilter: spotlightSize > 20 ? 'contrast(1.2) brightness(1.2) blur(2px)' : 'none',
            background: spotlightSize > 20 ? 'rgba(255,255,255,0.03)' : 'white',
            willChange: "width, height"
          }}
          animate={{
            opacity: hasMoved ? (isHovering ? 1 : 0) : 0,
            scale: hasMoved ? (isHovering ? 1 : 0.8) : 0.8
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.2 }}
        />
      </motion.div>

      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 mix-blend-difference">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <motion.div 
              className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20 transition-transform group-hover:scale-110"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img
                src="/assets/geminiLogo/Google Logo.png"
                alt="Google"
                className="h-full w-full object-contain p-1 invert"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-geminiDisplay text-xs uppercase tracking-[0.3em] text-white">Ambassador</span>
              <span className="text-[10px] text-white/50 tracking-widest uppercase">Sourabh Singh</span>
            </div>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link to="/services" className="hidden md:block text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Services</Link>
            <Link 
              to="/contact" 
              className="px-6 py-2 rounded-full border border-white/20 bg-white/5 text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Connect
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/60 to-[#050505] z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover scale-105 blur-[2px] opacity-40"
          >
            <source src={geminiContent.video?.fileUrl || "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-animation-1559-large.mp4"} type="video/mp4" />
          </video>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full flex justify-center z-0 overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="font-geminiDisplay text-[25vw] font-bold leading-none text-white/[0.015] whitespace-nowrap"
          >
            GEMINI
          </motion.span>
        </div>

        <div className="relative z-20 max-w-5xl w-full text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/80 font-bold">Google Gemini Campus Partner</span>
          </motion.div>

          <div ref={heroRef} className="relative group flex flex-col items-center justify-center">
            {/* Base Layer */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ WebkitMaskImage: inverseRevealMask, maskImage: inverseRevealMask }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setSpotlightSize(600)}
              onMouseLeave={() => setSpotlightSize(12)}
              className="font-geminiDisplay font-medium leading-[0.85] tracking-tighter text-center flex flex-col items-center"
            >
              <span className="text-7xl md:text-[11rem] lg:text-[13rem]">SOURABH</span>
              <span className="text-7xl md:text-[11rem] lg:text-[13rem] text-white/20 uppercase">SINGH</span>
            </motion.h1>

            {/* Reveal Layer */}
            <motion.h1 
              style={{ WebkitMaskImage: revealMask, maskImage: revealMask }}
              className="absolute inset-0 flex flex-col items-center justify-center font-geminiDisplay font-medium leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-700 z-10 pointer-events-none text-center"
            >
              <span className="text-7xl md:text-[11rem] lg:text-[13rem]">GEMINI</span>
              <span className="text-4xl md:text-[6rem] lg:text-[8rem] uppercase">AMBASSADOR</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-xl md:text-2xl text-white/50 font-light leading-relaxed tracking-wide"
          >
            {geminiContent.hero?.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link
              to={geminiContent.hero?.cta?.primary?.href || "#"}
              className="group flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-[0.3em] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              {geminiContent.hero?.cta?.primary?.label || "Explore"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to={geminiContent.hero?.cta?.secondary?.href || "#"}
              className="px-10 py-5 border border-white/20 hover:bg-white/10 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] transition-all"
            >
              {geminiContent.hero?.cta?.secondary?.label || "Learn More"}
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer z-20"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">Scroll to explore</span>
        </motion.div>
      </section>

      {/* NEW: Infinite Marquee Banner */}
      <div className="relative z-20 border-y border-white/5 bg-[#020202] py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          className="flex gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-sm font-geminiDisplay uppercase tracking-[0.5em] text-white/60">Google Gemini Ambassador</span>
              <Sparkles className="h-4 w-4 text-white/20" />
              <span className="text-sm font-geminiDisplay uppercase tracking-[0.5em] text-white/60">AI Visionary</span>
              <Sparkles className="h-4 w-4 text-white/20" />
              <span className="text-sm font-geminiDisplay uppercase tracking-[0.5em] text-white/60">Campus Evangelist</span>
              <Sparkles className="h-4 w-4 text-white/20" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Metrics Section - REDESIGNED */}
      <section 
        className="relative z-10 py-32 px-6 border-b border-white/5"
        onMouseEnter={() => setSpotlightSize(250)}
        onMouseLeave={() => setSpotlightSize(12)}
      >
        <SectionWrapper>
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {geminiContent.metrics?.items?.map((stat, idx) => (
                <div key={stat.label} className="flex-1 w-full flex flex-col items-center text-center pt-8 md:pt-0">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-6">{stat.label}</span>
                  <div className="text-7xl md:text-[8rem] font-geminiDisplay font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 leading-none mb-6">
                    {stat.value === 'TBD' ? '0' + (idx + 1) : stat.value}
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed max-w-[240px] font-light">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* NEW: Groundbreaking Projects Section */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionWrapper>
            <div className="mb-20 space-y-6 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Ambassador Initiatives</span>
              <h2 className="font-geminiDisplay text-5xl md:text-8xl font-medium tracking-tighter leading-none">
                CAMPUS <br /> <span className="text-white/20">MISSIONS</span>
              </h2>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((project, idx) => (
              <SectionWrapper key={project.title} delay={idx * 0.1}>
                <motion.div 
                  className="relative h-[450px] p-10 rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group overflow-hidden"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="h-14 w-14 rounded-2xl border border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-md group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
                        <Code2 className="h-6 w-6" />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-4">{project.role}</span>
                    <h3 className="text-3xl font-medium mb-4 tracking-tight group-hover:text-white transition-colors">{project.title}</h3>
                    <p className="text-base text-white/50 font-light leading-relaxed mb-8">{project.description}</p>
                  </div>
                  
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-[9px] uppercase tracking-[0.2em] text-white/60 bg-black/40 backdrop-blur-sm group-hover:border-white/30 group-hover:text-white transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Tech Stack Section - BENTO GRID */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-[#030303]">
        <div className="mx-auto max-w-7xl">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Core Responsibilities</span>
                <h2 className="font-geminiDisplay text-5xl md:text-8xl font-medium tracking-tighter leading-[0.85]">
                  AMBASSADOR <br /> <span className="text-white/20">TOOLKIT</span>
                </h2>
              </div>
              <p className="max-w-md text-white/50 text-left md:text-right font-light text-lg">
                The essential skills and strategies used to foster AI awareness and adoption among undergraduate students.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured AI Card */}
            <div className="md:col-span-8">
              <SectionWrapper delay={0.1}>
                <div className="h-full p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group overflow-hidden relative">
                  <Sparkles className="absolute top-12 right-12 h-32 w-32 text-white/5 group-hover:text-white/10 transition-colors duration-700 group-hover:rotate-12" />
                  <div>
                    <div className="h-16 w-16 rounded-2xl bg-white text-black flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      <Database className="h-8 w-8" />
                    </div>
                    <h4 className="text-3xl font-medium mb-4">Gemini API Advocacy</h4>
                    <p className="text-lg text-white/50 max-w-md font-light leading-relaxed">Acting as the primary technical point of contact, helping peers integrate Google's Generative AI models into their own applications and hackathon projects.</p>
                  </div>
                </div>
              </SectionWrapper>
            </div>

            {/* Side Cards */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {techStack.slice(0, 2).map((tech, idx) => (
                <SectionWrapper key={tech.name} delay={0.2 + (idx * 0.1)}>
                  <div className="h-full p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col gap-6 group">
                    <div className="h-12 w-12 rounded-xl bg-black border border-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
                      {tech.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">{tech.name}</h4>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{tech.tools}</p>
                    </div>
                  </div>
                </SectionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionWrapper>
            <div 
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
              onMouseEnter={() => setSpotlightSize(250)}
              onMouseLeave={() => setSpotlightSize(24)}
            >
              <div className="space-y-6 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Interactive Showcase</span>
                <h2 className="font-geminiDisplay text-5xl md:text-8xl font-medium tracking-tighter leading-none">
                  VISUAL <br /> <span className="text-white/20">EVIDENCE</span>
                </h2>
              </div>
              <p className="max-w-md text-lg text-white/40 font-light text-center md:text-right">
                A collection of real-world impact captured through Google-led initiatives and campus demos.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {videoShowcases.map((video, idx) => (
              <SectionWrapper key={video.title} delay={idx * 0.1}>
                <motion.div 
                  whileHover={{ y: -10, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl"
                  style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                >
                  <motion.img
                    src={video.thumbnail}
                    alt={video.title}
                    initial={{ opacity: 0.4, scale: 1 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
                    loading="lazy"
                    decoding="async"
                    style={{ willChange: "transform, opacity" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-widest">{video.type}</span>
                        <span className="text-[10px] text-white/40 font-mono tracking-widest">{video.duration}</span>
                      </div>
                      <h3 className="text-3xl font-medium tracking-tight group-hover:text-white transition-colors duration-500">{video.title}</h3>
                      <p className="text-sm text-white/40 line-clamp-2 max-w-sm group-hover:text-white/70 transition-colors duration-500">{video.description}</p>
                      <div className="pt-6">
                        <button className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white group/btn">
                          <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300">
                            <Play className="h-3 w-3 fill-current" />
                          </div>
                          Play Showcase
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives - STAGGERED LIST */}
      <section className="relative z-10 py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
              <SectionWrapper>
                <div className="space-y-8 sticky top-32">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Strategic Pillars</span>
                  <h2 className="font-geminiDisplay text-5xl md:text-7xl font-medium tracking-tighter leading-[0.9]">
                    THE <br /> <span className="text-white/20">PLAYBOOK</span>
                  </h2>
                  <p className="text-white/50 text-lg font-light leading-relaxed">
                    Systematic growth through creator-led content, campus workshops, and deep product understanding.
                  </p>
                  <div className="pt-8">
                    <Link to="/contact" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-white">
                      <span className="border-b border-white pb-1 group-hover:text-white/60 group-hover:border-white/60 transition-all">Collaborate</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </SectionWrapper>
            </div>

            <div className="lg:col-span-7 space-y-8">
              {geminiContent.tasks?.items?.map((task, idx) => (
                <SectionWrapper key={task.title} delay={idx * 0.1}>
                  <div className="relative p-12 md:p-16 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group overflow-hidden">
                    {/* Giant Background Number */}
                    <div className="absolute -right-8 -top-8 font-geminiDisplay text-[15rem] font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-500 pointer-events-none select-none leading-none">
                      0{idx + 1}
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
                      <div className="space-y-6 flex-1">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-md">
                          <div className={`h-1.5 w-1.5 rounded-full ${task.status === 'Mandatory' ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/20'}`} />
                          <span className="text-[9px] uppercase tracking-[0.4em] text-white/70">{task.status}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight group-hover:text-white transition-colors">{task.title}</h3>
                        <p className="text-base text-white/50 leading-relaxed font-light max-w-lg">{task.description}</p>
                      </div>
                    </div>
                  </div>
                </SectionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section - BLACK ON WHITE (INVERTED) */}
      <section className="relative z-10 py-32 px-6 bg-white text-black rounded-[4rem] mx-4 md:mx-12 mb-32 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 h-96 w-96 bg-black/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
        />
        <div className="mx-auto max-w-7xl relative z-10">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-black/30">Authority</span>
                <h2 className="font-geminiDisplay text-5xl md:text-8xl font-medium tracking-tighter leading-[0.85]">
                  OFFICIAL <br /> VERIFICATION
                </h2>
              </div>
              <p className="max-w-md text-xl text-black/60 font-light leading-relaxed">
                Authorized credentials verifying active participation in the Google Gemini Campus Ambassador program.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {geminiContent.proof?.items?.map((item, idx) => (
              <SectionWrapper key={item.title} delay={idx * 0.1}>
                <div className="h-full p-10 rounded-[2.5rem] border border-black/10 bg-black/[0.01] hover:bg-black/5 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                      <BadgeCheck className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-3">{item.detail}</h4>
                    <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                    <p className="text-sm text-black/50 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-10">
                    <a href={item.link.href} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold border-b-2 border-black pb-1 hover:text-black/60 hover:border-black/60 transition-all">
                      Confirm <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - GRAND FINALE */}
      <section className="relative z-10 py-48 px-6 text-center">
        <SectionWrapper>
          <div className="mx-auto max-w-5xl space-y-16">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.6em] text-white/30">The Future is Generative</span>
              <h2 className="font-geminiDisplay text-6xl md:text-[10rem] font-medium tracking-tighter leading-[0.85]">
                BUILD WITH <br /> <span className="text-white/10">SOURABH</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link
                to={geminiContent.cta?.primary?.href || "#"}
                className="w-full sm:w-auto px-16 py-8 bg-white text-black rounded-full font-bold text-sm uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
              >
                {geminiContent.cta?.primary?.label || "Collaborate"}
              </Link>
              <a
                href={geminiContent.cta?.secondary?.href || "#"}
                className="w-full sm:w-auto px-16 py-8 border border-white/20 rounded-full font-bold text-sm uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
              >
                Direct Inquiry
              </a>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/5 mx-6 md:mx-12 mt-32">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <img src="/assets/geminiLogo/Google Logo.png" alt="Google" className="h-5 invert opacity-20" />
            <div className="h-4 w-px bg-white/10" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Sourabh Singh</p>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">Gemini Campus Ambassador © 2026</p>
            </div>
          </div>
          <div className="flex gap-12">
            <Link to="/" className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">Home</Link>
            <Link to="/services" className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">Services</Link>
            <Link to="/contact" className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
};