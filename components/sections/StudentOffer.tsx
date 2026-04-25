import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export const StudentOffer: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const benefits = [
    "Advanced AI Model",
    "2TB Cloud Storage",
    "Python Coding in Canvas",
    "Context-Aware Homework Help",
    "Deep Research Capabilities"
  ];

  return (
    // Changed bg-black to bg-transparent (or minimal opacity) to see the Orb
    <section ref={containerRef} className="min-h-[150vh] relative bg-transparent">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Glow Background - Reduced opacity to blend with Orb */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-google-blue/5 to-black/80 pointer-events-none" />

        <motion.div 
          style={{ scale, opacity }}
          className="relative z-10 p-10 md:p-16 rounded-3xl border border-white/20 bg-black/60 backdrop-blur-xl max-w-4xl w-full mx-4 shadow-[0_0_100px_rgba(66,133,244,0.1)]"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Unlock Premium AI</h2>
            <div className="flex items-center justify-center gap-4 text-4xl md:text-7xl font-mono font-bold">
              <span className="text-gray-500 line-through decoration-red-500">₹19,500</span>
              <span className="text-white">→</span>
              <span className="text-google-green">FREE</span>
            </div>
            <p className="mt-4 text-gray-400">Exclusive 12-month access for Student Ambassadors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5"
              >
                <CheckCircle className="text-google-green w-6 h-6 flex-shrink-0" />
                <span className="text-lg font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-google-blue text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-google-blue/30"
             >
                Claim Offer Now
             </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};