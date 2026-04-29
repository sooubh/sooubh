import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import { LINKEDIN_URL } from '../../lib/content';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Gemini Ambassador', href: '/gemini', internal: false },
    { name: 'Story', href: '#section-s', internal: true },
    { name: 'Objectives', href: '#section-o', internal: true },
    { name: 'Skills', href: '#section-u', internal: true },
    { name: 'Projects', href: '#section-r', internal: true },
    { name: 'Achievements', href: '#section-a', internal: true },
    { name: 'Contact', href: '/contact', internal: false },
  ];

  const resources = [
    { name: 'AI Builder Program', href: 'https://ai.google.dev/gemini-api', external: true },
    { name: 'Developer Resources', href: 'https://developers.google.com/', external: true },
    { name: 'Sitemap', href: '/sitemap.xml', external: false },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sooubh', label: 'GitHub' },
    { icon: Linkedin, href: LINKEDIN_URL, label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/sourabh_singgh', label: 'Twitter' },
    { icon: Mail, href: 'mailto:sourabh3527@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-black/40 backdrop-blur-md border-t border-white/10 text-white py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-google-blue via-google-red to-google-yellow bg-clip-text text-transparent">
              Sourabh Singh
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Official AI Builder & Developer specializing in AI integration and full-stack development.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Available for collaboration</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.internal && link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-google-blue transition-colors text-sm flex items-center gap-1"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-google-blue transition-colors text-sm flex items-center gap-1"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-google-blue transition-colors text-sm flex items-center gap-1"
                  >
                    {link.name}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 hover:border-google-blue/50 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="mailto:sourabh3527@gmail.com"
              className="text-sm text-gray-400 hover:text-google-blue transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              sourabh3527@gmail.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} Sourabh Singh. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span>Powered by</span>
              <span className="text-google-blue font-semibold">AI Assistant</span>
            </p>
          </div>
        </div>

        {/* SEO Keywords Footer (Hidden but indexed) */}
        <div className="sr-only">
          Sourabh Singh | sourabh | AI Builder & Developer | Student Ambassador | 
          AI Developer | Full Stack Developer | React Developer | SITRC | Computer Engineering | 
          AI Integration | AI Tools | AI Assistant | Student Developer | Tech Ambassador
        </div>
      </div>
    </footer>
  );
};
