import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import logo from '@/public/assets/logo.svg';

export const HeaderLogo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-6 left-6 md:top-8 md:left-8 z-50 cursor-pointer flex items-center gap-3 group"
      onClick={() => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {/* Logo Image */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div
          className={[
            'absolute inset-0 rounded-xl rotate-3 backdrop-blur-sm',
            'bg-gradient-to-br from-google-blue/20 to-purple-500/10',
            'border border-google-blue/40',
            'shadow-[0_0_18px_rgba(66,133,244,0.15)]',
            'transition-all duration-300',
            'group-hover:rotate-0 group-hover:border-google-blue/60',
            'group-hover:shadow-[0_0_28px_rgba(66,133,244,0.3)]',
          ].join(' ')}
        />

        <img
          src={logo}
          alt="Sourabh Singh logo"
          className="w-11 h-11 object-contain relative z-10"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold text-white tracking-wider uppercase">
          Sourabh
        </span>
        <span className="text-[10px] text-google-blue/70 font-mono tracking-widest mt-1">
          Singh
        </span>
      </div>
    </motion.div>
  );
};