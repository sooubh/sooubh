import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, ArrowRight, BookOpen, Clock, Zap, GitCommit, Activity, ChevronRight, Hash, Loader2, ShieldCheck, Server, Globe } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useGithubActivity } from '../../hooks/useGithubActivity';
import { blogData } from '../../lib/blogData';
import { ComingSoonModal } from '../ui/ComingSoonModal';
import { GitHubActivityPanel } from './github/GitHubActivityPanel';

const InteractiveTerminal = () => {
    const { events, loading, activeRepos } = useGithubActivity();
    const [history, setHistory] = useState<{ type: 'cmd' | 'resp' | 'log' | 'sys', text: any }[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lastEventId = useRef<string | null>(null);

    const addLine = useCallback((line: { type: 'cmd' | 'resp' | 'log' | 'sys', text: any }) => {
        setHistory(prev => [...prev.slice(-20), line]); // Keep last 20 lines
    }, []);

    // Random System Tasks
    const systemTasks = [
        () => {
            addLine({ type: 'cmd', text: 'system-health --check' });
            setTimeout(() => addLine({ type: 'sys', text: <div className="text-[10px] text-emerald-500/80 flex items-center gap-2"><ShieldCheck className="w-3 h-3"/> All systems operational. CPU: 12% | RAM: 4.2GB</div> }), 800);
        },
        () => {
            addLine({ type: 'cmd', text: 'network --status' });
            setTimeout(() => addLine({ type: 'sys', text: <div className="text-[10px] text-blue-400/80 flex items-center gap-2"><Globe className="w-3 h-3"/> Edge nodes: 12 online | Latency: 24ms</div> }), 600);
        },
        () => {
            addLine({ type: 'cmd', text: 'ls /workspace/active-projects' });
            setTimeout(() => addLine({ type: 'resp', text: <div className="text-[10px] text-gray-500">{activeRepos.slice(0, 3).join('  ')}</div> }), 500);
        }
    ];

    // Initial sequence
    useEffect(() => {
        const init = async () => {
            setIsProcessing(true);
            await new Promise(r => setTimeout(r, 500));
            addLine({ type: 'cmd', text: 'whoami' });
            await new Promise(r => setTimeout(r, 400));
            addLine({ type: 'resp', text: 'sourabh-singh // full-stack-engineer' });
            await new Promise(r => setTimeout(r, 600));
            addLine({ type: 'cmd', text: 'cd /labs && status --live' });
            setIsProcessing(false);
        };
        init();
    }, [addLine]);

    // Handle new GitHub events as they happen
    useEffect(() => {
        if (events.length > 0) {
            const latest = events[0];
            if (latest.id !== lastEventId.current) {
                lastEventId.current = latest.id;
                
                const processEvent = async () => {
                    setIsProcessing(true);
                    await new Promise(r => setTimeout(r, 1000));
                    addLine({ type: 'cmd', text: `git fetch origin ${latest.branch}` });
                    await new Promise(r => setTimeout(r, 800));
                    addLine({ type: 'log', text: `Receiving objects: 100% (12/12), 4.2 KiB | 4.2 MiB/s` });
                    await new Promise(r => setTimeout(r, 500));
                    addLine({ type: 'sys', text: (
                        <div className="p-2 bg-google-green/5 border border-google-green/10 rounded my-2">
                            <div className="flex items-center gap-2 text-google-green text-[10px] font-bold mb-1">
                                <GitCommit className="w-3 h-3" /> NEW {latest.type.replace('Event', '').toUpperCase()} IN {latest.repo.toUpperCase()}
                            </div>
                            <div className="text-gray-300 text-[11px] font-mono leading-tight italic">"{latest.commitMessage}"</div>
                        </div>
                    )});
                    setIsProcessing(false);
                };
                processEvent();
            }
        }
    }, [events, addLine]);

    // Background noise / loop
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isProcessing && Math.random() > 0.7) {
                const task = systemTasks[Math.floor(Math.random() * systemTasks.length)];
                task();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [isProcessing, systemTasks]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className="rounded-xl bg-[#080808] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl h-[calc(100%-4rem)] min-h-[500px] flex flex-col font-mono text-xs md:text-sm relative">
            
            {/* Terminal Glow */}
            <div className="absolute inset-0 bg-google-green/5 pointer-events-none" />

            {/* Header */}
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between shrink-0 relative z-10">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] font-mono text-gray-500 flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <Server className="w-3 h-3" />
                        node-01.lab.io
                    </div>
                    <div className="flex items-center gap-1.5 text-google-green">
                        <Activity className="w-3 h-3 animate-pulse" />
                        CONNECTED
                    </div>
                </div>
            </div>

            {/* Terminal Content */}
            <div 
                ref={scrollRef}
                className="p-6 flex-grow overflow-y-auto custom-scrollbar bg-black/40 space-y-4 relative z-10"
            >
                <AnimatePresence mode="popLayout">
                    {history.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`${
                                line.type === 'cmd' ? 'text-google-green font-bold' : 
                                line.type === 'log' ? 'text-gray-500 text-[10px]' : 
                                line.type === 'sys' ? 'text-white' : 
                                'text-gray-400'
                            }`}
                        >
                            {line.type === 'cmd' && (
                                <span className="flex items-start gap-2">
                                    <span className="text-blue-400 shrink-0">➜</span>
                                    <span className="text-purple-400 shrink-0">~</span>
                                    <span className="break-all">{line.text}</span>
                                </span>
                            )}
                            {(line.type === 'resp' || line.type === 'log' || line.type === 'sys') && (
                                <div className="pl-8">
                                    {line.text}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {isProcessing && (
                    <div className="flex items-center gap-2 text-gray-600 italic text-[10px] pl-8">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Processing...
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <span className="text-blue-400">➜</span>
                    <span className="text-purple-400">~</span>
                    <span className="w-2 h-4 bg-google-green animate-pulse" />
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="bg-white/5 px-4 py-2 border-t border-white/5 text-[9px] text-gray-600 flex justify-between relative z-10">
                <span>UTF-8 // LF</span>
                <span>Active Experiments: {activeRepos.length}</span>
            </div>
        </div>
    );
};

export const Building: React.FC = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const navigate = useNavigate();
  const recentPosts = blogData.slice(0, 3);

  return (
    <section className="py-24 relative z-10 bg-transparent">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-google-green/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20 md:flex md:items-end md:justify-between md:gap-8">
            <div>
                 <h2 className="text-sm font-bold text-google-green uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-google-green"></span>
                    06 — Building & Blogs
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-green to-emerald-400">Lab</span>
                </h3>
            </div>
            <p className="text-gray-400 max-w-md md:ml-auto md:text-right mt-4 md:mt-0 leading-relaxed">
                A glimpse into my current experiments, engineering thoughts, and open-source contributions.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                        Latest Writings
                    </h4>
                    <Link to="/blog" className="text-sm text-google-green hover:underline flex items-center gap-1 font-bold">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                
                {recentPosts.map((post, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-google-green/30 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-google-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.date}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-700" />
                                <span>{post.readTime}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-700" />
                                <span className={post.type === 'vlog' ? 'text-red-400 font-bold' : 'text-google-green font-bold'}>{post.type.toUpperCase()}</span>
                            </div>
                            <h5 className="text-xl font-bold text-white mb-3 group-hover:text-google-green transition-colors">
                                {post.title}
                            </h5>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {post.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5 uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="flex items-center gap-1 text-sm text-google-green opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                                    {post.type === 'vlog' ? 'Watch Vlog' : 'Read Article'} <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="lg:col-span-5 h-full">
                 <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-8">
                    <Terminal className="w-5 h-5 text-gray-400" />
                    Active Development
                </h4>
                <InteractiveTerminal />
            </div>
        </div>

        <GitHubActivityPanel />
      </div>

      <ComingSoonModal 
        isOpen={isComingSoonOpen} 
        onClose={() => setIsComingSoonOpen(false)} 
      />
    </section>
  );
};
