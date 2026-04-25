import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Stars, Environment, Html } from '@react-three/drei';
import { Starfield } from './Starfield';
import { Planet } from './Planet';
import { content } from '../../lib/content';

export const GalaxyScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#050510]"> {/* Deep space background */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true }} dpr={[1, 2]}>
        <Suspense fallback={null}>
            <fog attach="fog" args={['#050510', 5, 30]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4285F4" /> {/* Accent Blue */}
            <pointLight position={[-10, -5, -10]} intensity={1} color="#DB4437" /> {/* Accent Red */}
            
            <Starfield />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* ScrollControls will wrap the content */}
            <ScrollControls pages={4} damping={0.3}>
                 {/* 
                    Scene Content 
                    We place objects at different Z depths.
                    Camera moves from 0 to -30 approx.
                 */}
                 
                 {/* Hero Section (Start) */}
                 <Html position={[0, 0, 0]} center zIndexRange={[100, 0]}>
                    <div className="text-center w-screen">
                        <h1 className="text-6xl md:text-9xl font-bold text-white mb-4 tracking-tighter">
                            SOURABH <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">SINGH</span>
                        </h1>
                        <p className="text-cyan-200 text-xl md:text-2xl font-light tracking-widest uppercase">
                            AI Builder • Web Innovator
                        </p>
                    </div>
                 </Html>

                 {/* About Planet */}
                 <Planet 
                    position={[2, -1, -10]} 
                    color="#4285F4" 
                    label="About Me" 
                    onClick={() => console.log('Open About')} 
                    scale={1.5}
                 />
                 <Html position={[-3, 0, -10]} transform>
                    <div className="bg-black/80 p-8 rounded-2xl border border-blue-500/30 w-[400px] text-white">
                        <h2 className="text-3xl font-bold mb-4 text-blue-400">About Me</h2>
                        <p className="text-gray-300">
                             Computer Engineering student passionate about AI and bridging the gap between students and technology.
                        </p>
                    </div>
                 </Html>

                 {/* Projects Planet */}
                 <Planet 
                    position={[-2, 2, -20]} 
                    color="#F4B400" 
                    label="Projects" 
                    onClick={() => console.log('Open Projects')} 
                    scale={1.2}
                 />
                 
                 {/* Contact Planet */}
                 <Planet 
                    position={[0, -2, -30]} 
                    color="#0F9D58" 
                    label="Contact" 
                    onClick={() => console.log('Open Contact')} 
                    scale={2}
                 />
                 
            </ScrollControls>
            
            <Environment preset="city" />
        </Suspense>
      </Canvas>
      
      {/* 2D Overlay (Header, etc) can go here or outside */}
    </div>
  );
};
