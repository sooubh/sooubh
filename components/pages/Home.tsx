import React, { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ChatBot } from '../ui/ChatBot';
import { GeminiOrb } from '../GeminiOrb';
import { Particles } from '../ui/Particles';
import { FloatingNavbar } from '../ui/FloatingNavbar';
import { HeaderLogo } from '../ui/HeaderLogo';
import { MobileMenu } from '../ui/MobileMenu';

// Sections
import { Hero } from '../sections/Hero';
import { Story } from '../sections/Story';
import { Objectives } from '../sections/Objectives';
import { Universe } from '../sections/Universe';
import { RealProjects } from '../sections/RealProjects';
import { Achievements } from '../sections/Achievements';
import { Building } from '../sections/Building';
import { Contact } from '../sections/Contact';
import { Footer } from '../ui/Footer';

import { Preloader } from '../ui/Preloader';
import { AnimatePresence } from 'framer-motion';

export const Home: React.FC = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (location.state && (location.state as any).scrollTo) {
            const scrollToId = (location.state as any).scrollTo;
            const element = document.getElementById(scrollToId);
            if (element) {
                // Small delay to ensure rendering
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                // Clear state to prevent scroll on refresh (optional but good practice)
                window.history.replaceState({}, document.title);
            }
        }
    }, [location]);

  return (
    <main className="bg-black text-white selection:bg-google-blue selection:text-white relative w-full overflow-x-hidden min-h-screen">
      
      <AnimatePresence mode="wait">
        {isLoading && (
            <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
         <>
          {/* 2D CONTENT LAYER */}
      <div className="relative z-10">
        {/* Background - Original Ambience */}
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
            {!isMobile ? (
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#DB4437" />
                    <Suspense fallback={null}>
                        <GeminiOrb />
                    </Suspense>
                </Canvas>
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-blue-900/20 relative overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-google-blue/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                </div>
            )}
        </div>
        
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
            <Particles />
        </div>

        <Hero />

        <div id="section-s"><Story /></div>
        <div id="section-o"><Objectives /></div>
        <div id="section-u"><Universe /></div>
        <div id="section-r"><RealProjects /></div>
        <div id="section-a"><Achievements /></div>
        <div id="section-b"><Building /></div>
        <div id="section-h"><Contact /></div>
        
        <Footer />

      </div>

      <FloatingNavbar />
      <HeaderLogo />
      <MobileMenu />
      <ChatBot />
         </>
      )}
    </main>
  );
};
