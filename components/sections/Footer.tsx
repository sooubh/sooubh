import React from 'react';
import { Link } from 'react-router-dom';
import { LINKEDIN_URL } from '../../lib/content';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-8 bg-black/80 backdrop-blur-md border-t border-white/5">
      <div className="flex gap-6 text-gray-600 text-sm justify-center items-center flex-wrap">
          <span>© 2024 AI Student Program</span>
          <span className="hidden sm:inline">•</span>
          <span className="font-medium text-google-blue">Ambassador ID: 12115</span>
          <span className="hidden sm:inline">•</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-google-blue transition-colors">LinkedIn</a>
          <span>•</span>
          <a href="https://www.instagram.com/sourabh_singg" target="_blank" rel="noopener noreferrer" className="hover:text-google-blue transition-colors">Instagram</a>
          <span className="hidden sm:inline">•</span>
          <Link to="/services" className="hover:text-google-blue transition-colors">AI Services</Link>
          <span className="hidden sm:inline">•</span>
          <span>Privacy Policy</span>
          <span className="hidden sm:inline">•</span>
          <span>Terms</span>
      </div>
    </footer>
  );
};
