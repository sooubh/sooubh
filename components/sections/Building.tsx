import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, ArrowRight, BookOpen, Clock, Zap, GitCommit } from 'lucide-react';

const articles = [
    {
        title: "The Future of Agentic Workflows",
        desc: "Exploring how autonomous agents are reshaping software development and meaningful automation.",
        date: "Dec 15, 2024",
        readTime: "5 min read",
        tags: ["AI", "Agents"],
        link: "#"
    },
    {
        title: "Optimizing RAG Pipelines",
        desc: "A deep dive into vector database sharding and semantic reranking strategies for better context retrieval.",
        date: "Nov 28, 2024",
        readTime: "8 min read",
        tags: ["LLM", "Engineering"],
        link: "#"
    },
    {
        title: "Building Scalable Real-time Systems",
        desc: "Lessons learned from scaling WebSocket connections to 10k+ concurrent users on a single node.",
        date: "Oct 10, 2024",
        readTime: "6 min read",
        tags: ["System Design", "Node.js"],
        link: "#"
    }
];

const TerminalLine = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayed, setDisplayed] = useState("");
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(text.substring(0, i + 1));
                i++;
                if (i > text.length) clearInterval(interval);
            }, 30); // Typing speed
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <div className="font-mono text-xs md:text-sm text-green-400 mb-2 break-all">
            <span className="text-blue-400 mr-2">➜</span>
            <span className="text-purple-400 mr-2">~</span>
            {displayed}
        </div>
    );
};

import { ComingSoonModal } from '../ui/ComingSoonModal';
import { GitHubActivityPanel } from './github/GitHubActivityPanel';

export const Building: React.FC = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <section className="min-h-screen py-24 relative z-10 bg-transparent flex flex-col justify-center">
      
      {/* Background Decor */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-google-green/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="mb-20 md:flex md:items-end md:justify-between">
            <div>
                 <h2 className="text-sm font-bold text-google-green uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-google-green"></span>
                    06 — Building & Blogs
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-green to-emerald-400">Lab</span>
                </h3>
            </div>
            <p className="text-gray-400 max-w-md text-right mt-4 md:mt-0 leading-relaxed">
                A glimpse into my current experiments, engineering thoughts, and open-source contributions.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: Editorial / Blogs */}
            <div className="lg:col-span-7 space-y-8">
                <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-8">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    Latest Writings
                </h4>
                
                {articles.map((article, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                        onClick={() => setIsComingSoonOpen(true)}
                        className="block group border-b border-white/5 pb-8 last:border-0 cursor-pointer"
                    >
                        <div className="flex items-center gap-3 text-xs font-mono text-gray-500 mb-2">
                            <span>{article.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                        </div>
                        
                        <h5 className="text-2xl font-bold text-white mb-3 group-hover:text-google-green transition-colors">
                            {article.title}
                        </h5>
                        
                        <p className="text-gray-400 leading-relaxed mb-4 max-w-2xl">
                            {article.desc}
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                {article.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span className="flex items-center gap-1 text-sm text-google-green opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                                Read Article <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* RIGHT COLUMN: Active Development / Terminal */}
            <div className="lg:col-span-5">
                 <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-8">
                    <Terminal className="w-5 h-5 text-gray-400" />
                    Active Development
                </h4>

                <div className="rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl h-full min-h-[400px]">
                    {/* Terminal Header */}
                    <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="ml-4 text-xs font-mono text-gray-500 flex items-center gap-2">
                            <GitCommit className="w-3 h-3" />
                            origin/main
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 font-mono text-sm space-y-4">
                        <TerminalLine text="cd /workspace/sourabh/lab" delay={500} />
                        <TerminalLine text="npm run list-experiments" delay={1500} />
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3 }}
                            className="mt-4 space-y-4"
                        >
                            <div className="text-gray-400 mb-2">Current Active Experiments:</div>
                            
                            {/* Experiment 1 */}
                            <div className="p-3 bg-white/5 rounded border-l-2 border-yellow-500">
                                <div className="flex justify-between text-white mb-1">
                                    <span>Auth-Zero-Trust</span>
                                    <span className="text-yellow-500 text-xs flex items-center gap-1"><Zap className="w-3 h-3" /> Building</span>
                                </div>
                                <div className="text-gray-500 text-xs">Rust-based authentication microservice.</div>
                            </div>

                            {/* Experiment 2 */}
                             <div className="p-3 bg-white/5 rounded border-l-2 border-blue-500">
                                <div className="flex justify-between text-white mb-1">
                                    <span>Neural-Search-v2</span>
                                    <span className="text-blue-500 text-xs flex items-center gap-1"><Cpu className="w-3 h-3" /> Training</span>
                                </div>
                                <div className="text-gray-500 text-xs">Fine-tuning Llama-3 on engineering docs.</div>
                            </div>

                        </motion.div>

                        <GitHubActivityPanel compact />

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 4 }}
                            className="text-green-400 mt-4 animate-pulse"
                        >
                            <span className="text-blue-400 mr-2">➜</span>
                            <span className="text-purple-400 mr-2">~</span>
                            <span className="w-2 h-4 bg-green-400 inline-block align-middle ml-1" />
                        </motion.div>
                    </div>
                </div>

                            </div>

        </div>

      </div>


      <ComingSoonModal 
        isOpen={isComingSoonOpen} 
        onClose={() => setIsComingSoonOpen(false)} 
      />
    </section>
  );
};
