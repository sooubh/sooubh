import React from 'react';
import { motion } from 'framer-motion';

interface ChatParticlesProps {
  count?: number;
}

export const ChatParticles: React.FC<ChatParticlesProps> = ({ count = 20 }) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      targetX: Math.random() * 20 - 10,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(66, 133, 244, 0.8) 0%, rgba(155, 114, 203, 0.4) 50%, transparent 100%)`,
            boxShadow: '0 0 10px rgba(66, 133, 244, 0.5)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.targetX, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
