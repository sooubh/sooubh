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

// --- Types ---
interface SceneProps {
  scrollYProgress: MotionValue<number>;
}

interface StarProps {
  count: number;
  radius: number;
  depth?: number;
  factor?: number;
  saturation?: number;
  fade?: boolean;
  speed?: number;
}

// --- 3D Components ---
const SceneContent: React.FC<SceneProps> = ({ scrollYProgress }) => {
  const groupRef = React.useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      const progress = scrollYProgress.get();
      groupRef.current.rotation.y = progress * Math.PI * 2;
      groupRef.current.position.y = -progress * 5;
      const s = 1 + Math.sin(progress * Math.PI) * 0.5;
      groupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#ffffff"
            speed={3}
            distort={0.4}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#1a1a1a"
          />
        </Sphere>
      </Float>

      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[
            Math.sin(i) * 4,
            Math.cos(i) * 4,
            Math.sin(i * 0.5) * 2
          ]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} emissive="#333333" />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const Stars: React.FC<StarProps> = ({ count, radius, speed = 1 }) => {
  const mesh = React.useRef<THREE.Points>(null!);
  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;
    }
    return pos;
  });

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0005 * speed;
      mesh.current.rotation.x += 0.0002 * speed;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const Interactive3DScene: React.FC<SceneProps> = ({ scrollYProgress }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]} // Added for crisper rendering on high DPI screens
      className="fixed inset-0 z-0 pointer-events-none"
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <SceneContent scrollYProgress={scrollYProgress} />
      <Stars count={1000} radius={100} depth={50} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  );
};

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
    title: "Lovyn",
    role: "Full-Stack Developer",
    description: "A modern dating platform architected with Flutter for a fluid mobile experience and Firebase for real-time data synchronization and backend scalability.",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"]
  },
  {
    title: "LedgerShield",
    role: "Team Gen(AI)tics",
    description: "Developed for the Microsoft Imagine Cup 2026. A security-focused AI implementation demonstrating advanced protective measures.",
    tags: ["GenAI", "Microsoft", "Security", "Hackathon"]
  },
  {
    title: "StockHealth AI",
    role: "AI Engineer",
    description: "An intelligent prototype leveraging the Snowflake Data Cloud and Cortex AI to process, analyze, and demystify complex data health metrics.",
    tags: ["Snowflake", "Cortex AI", "Data Cloud"]
  }
];

const techStack = [
  { icon: <Smartphone className="w-6 h-6" />, name: "Mobile", tools: "Flutter, Dart" },
  { icon: <Globe className="w-6 h-6" />, name: "Web", tools: "React, Next.js, Tailwind CSS" },
  { icon: <Database className="w-6 h-6" />, name: "Backend", tools: "Firebase, Node.js" },
  { icon: <Code2 className="w-6 h-6" />, name: "AI/Data", tools: "Gemini API, Snowflake, DSA" }
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
      <Interactive3DScene scrollYProgress={smoothProgress} />

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

        <div className="relative z-20 max-w-5xl w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/70">Google Gemini Campus Partner</span>
          </motion.div>

          <div ref={heroRef} className="relative group flex flex-col items-center justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ WebkitMaskImage: inverseRevealMask, maskImage: inverseRevealMask }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setSpotlightSize(350)}
              onMouseLeave={() => setSpotlightSize(24)}
              className="font-geminiDisplay text-6xl md:text-8xl lg:text-[10rem] font-medium leading-[0.85] tracking-tighter text-center"
            >
              SOURABH <br /> <span className="text-white/20 uppercase">SINGH</span>
            </motion.h1>

            <motion.h1 
              style={{ WebkitMaskImage: revealMask, maskImage: revealMask }}
              className="absolute inset-0 flex flex-col items-center justify-center font-geminiDisplay text-6xl md:text-8xl lg:text-[10rem] font-medium leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-600 z-10 pointer-events-none text-center"
            >
              GEMINI <br /> AMBASSADOR
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-xl text-lg md:text-xl text-white/50 font-light leading-relaxed"
          >
            {geminiContent.hero?.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to={geminiContent.hero?.cta?.primary?.href || "#"}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium transition-all hover:scale-105"
            >
              {geminiContent.hero?.cta?.primary?.label || "Explore"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to={geminiContent.hero?.cta?.secondary?.href || "#"}
              className="px-8 py-4 border border-white/20 hover:bg-white/5 rounded-full font-medium transition-all"
            >
              {geminiContent.hero?.cta?.secondary?.label || "Learn More"}
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Explore Journey</span>
          <ChevronDown className="h-4 w-4 text-white/30 animate-bounce" />
        </motion.div>
      </section>

      {/* Metrics Section */}
      <section 
        className="relative z-10 py-32 px-6"
        onMouseEnter={() => setSpotlightSize(250)}
        onMouseLeave={() => setSpotlightSize(24)}
      >
        <SectionWrapper>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 text-center">
              {geminiContent.metrics?.items?.map((stat, idx) => (
                <div key={stat.label} className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">{stat.label}</span>
                  <div className="text-6xl md:text-8xl font-geminiDisplay font-medium tracking-tighter text-white">
                    {stat.value === 'TBD' ? '0' + (idx + 1) : stat.value}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed max-w-[200px] mx-auto">{stat.detail}</p>
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
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Innovations</span>
              <h2 className="font-geminiDisplay text-5xl md:text-8xl font-medium tracking-tighter leading-none">
                BUILT <br /> <span className="text-white/20">PROJECTS</span>
              </h2>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsData.map((project, idx) => (
              <SectionWrapper key={project.title} delay={idx * 0.1}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="h-full p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all flex flex-col justify-between group backdrop-blur-sm"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform">
                        <Code2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-white/40">{project.role}</span>
                    </div>
                    <h3 className="text-2xl font-medium mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-8">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-[9px] uppercase tracking-wider text-white/60 group-hover:border-white/30 group-hover:text-white/80 transition-colors">
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

      {/* NEW: Tech Stack Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Arsenal</span>
                <h2 className="font-geminiDisplay text-5xl md:text-7xl font-medium tracking-tighter leading-[0.9]">
                  TECHNICAL <br /> <span className="text-white/20">STACK</span>
                </h2>
              </div>
              <p className="max-w-sm text-white/50 text-right font-light">
                Full-stack expertise powering next-generation mobile and web applications.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <SectionWrapper key={tech.name} delay={idx * 0.05}>
                <div className="p-8 rounded-[1.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 hover:border-white/20 transition-all flex flex-col items-center text-center gap-4 group">
                  <div className="text-white/40 group-hover:text-white transition-colors group-hover:scale-110 duration-300">
                    {tech.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">{tech.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">{tech.tools}</p>
                  </div>
                </div>
              </SectionWrapper>
            ))}
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

            <div className="lg:col-span-7 space-y-6">
              {geminiContent.tasks?.items?.map((task, idx) => (
                <SectionWrapper key={task.title} delay={idx * 0.1}>
                  <div className="p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all group flex flex-col md:flex-row justify-between gap-8 backdrop-blur-sm">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`h-1 w-1 rounded-full ${task.status === 'Mandatory' ? 'bg-white' : 'bg-white/20'}`} />
                        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">{task.status}</span>
                      </div>
                      <h3 className="text-2xl font-medium group-hover:text-white transition-colors">{task.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed max-w-md">{task.description}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowUpRight className="h-5 w-5" />
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