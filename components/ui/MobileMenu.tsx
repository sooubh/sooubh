import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const pageItems = [
  { path: '/', label: 'Home', desc: 'Main Portfolio' },
  { path: '/services', label: 'AI Services', desc: 'Prompt Playground' },
  { path: '/contact', label: 'Contact', desc: 'Get In Touch' },
];

const navItems = [
  { id: 'section-s', label: 'Story', desc: 'Journey & Education' },
  { id: 'section-o', label: 'Objectives', desc: 'Mission & Vision' },
  { id: 'section-u', label: 'Universe', desc: 'Technical Skills' },
  { id: 'section-r', label: 'Real Projects', desc: 'Case Studies' },
  { id: 'section-a', label: 'Achievements', desc: 'Awards & Recognition' },
  { id: 'section-b', label: 'Building', desc: 'Blogs & Writes' },
  { id: 'section-h', label: 'Human Connect', desc: 'Contact Me' },
];

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleNavigation = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    }, 300); // Wait for close animation
  };

  const handleRoute = (path: string) => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Trigger Button - Mobile Only caused by the hidden md:block on Navbar, 
          but here we use md:hidden to show only on mobile */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-6 right-6 z-[60] p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 md:hidden hover:bg-white/10 active:scale-95 transition-all text-white shadow-lg shadow-black/20"
        onClick={() => setIsOpen(true)}
        aria-label="Open Menu"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
                <span className="text-sm font-bold text-white tracking-widest uppercase">Menu</span>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Pages</span>
                {pageItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleRoute(item.path)}
                    className="w-full group text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-3xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
                        {item.label}
                      </span>
                      <ArrowRight className="w-5 h-5 text-google-blue opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    <span className="text-xs font-mono text-gray-600 uppercase tracking-widest group-hover:text-google-blue/80 transition-colors">
                      {item.desc}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Home Sections</span>
                {navItems.map((item, index) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (pageItems.length + index) * 0.05 }}
                        onClick={() => handleNavigation(item.id)}
                        className="w-full group text-left"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-3xl font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
                                {item.label}
                            </span>
                            <ArrowRight className="w-5 h-5 text-google-blue opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                        <span className="text-xs font-mono text-gray-600 uppercase tracking-widest group-hover:text-google-blue/80 transition-colors">
                            {item.desc}
                        </span>
                    </motion.button>
                ))}
                    </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 text-center">
                 <p className="text-xs text-gray-600 font-mono">
                    © 2024 Sourabh Singh.
                 </p>
                 <div className="flex justify-center gap-4 mt-4">
                     {/* Socials can go here if needed, but keeping it clean */}
                 </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
