import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CircleDot, GitBranch, Github, RefreshCcw } from 'lucide-react';
import { GithubEventItem, useGithubActivity } from '../../../hooks/useGithubActivity';

const statusLabels = ['BUILDING', 'DEPLOYING', 'TRAINING', 'ACTIVE', 'ONLINE'];

const getTimeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.floor(diff / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const terminalLogs = [
  'syncing github activity...',
  'latest push detected',
  'deployment completed',
  'neural-search-v2 updated',
  'training models...',
  'commit received from main branch',
];

const ActivityCard: React.FC<{ event: GithubEventItem; index: number }> = ({ event, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ delay: index * 0.06, duration: 0.45, ease: 'easeOut' }}
    whileHover={{ y: -6, scale: 1.01 }}
    className="relative rounded-xl border border-cyan-300/20 bg-white/5 backdrop-blur-md p-4 overflow-hidden group"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10" />
    <div className="relative z-10 space-y-2">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="inline-flex items-center gap-2"><Github className="w-3.5 h-3.5" /> {event.repo}</span>
        <span>{getTimeAgo(event.timestamp)}</span>
      </div>
      <p className="text-sm text-gray-200">{event.commitMessage}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded border border-white/10 bg-black/30 text-cyan-300">{event.type.replace('Event', '')}</span>
        <span className="px-2 py-1 rounded border border-white/10 bg-black/30 text-purple-300">{event.commitCount} commits</span>
        <span className="px-2 py-1 rounded border border-white/10 bg-black/30 text-emerald-300 inline-flex items-center gap-1"><GitBranch className="w-3 h-3" />{event.branch}</span>
      </div>
    </div>
  </motion.div>
);

export const GitHubActivityPanel: React.FC = () => {
  const { events, counters, activeRepos, loading, error, refresh } = useGithubActivity();
  const [statusIndex, setStatusIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const statusTimer = setInterval(() => setStatusIndex((prev) => (prev + 1) % statusLabels.length), 2200);
    const logTimer = setInterval(() => setLogIndex((prev) => (prev + 1) % terminalLogs.length), 1700);
    return () => {
      clearInterval(statusTimer);
      clearInterval(logTimer);
    };
  }, []);

  const renderedEvents = useMemo(() => events.slice(0, 6), [events]);

  return (
    <section className="mt-20 space-y-8" id="github-live-activity">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <h4 className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
            <Github className="w-4 h-4" />
            Github Engineering Feed
        </h4>
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(counters).map(([key, value]) => (
          <motion.div 
            key={key} 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="group relative rounded-xl border border-white/5 bg-white/5 p-4 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{key}</div>
                <div className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }}
        className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-24 h-24 text-cyan-300" />
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3">
                <h5 className="text-lg font-bold text-white">
                    Contribution Heatmap
                </h5>
                {error && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border ${
                        error === 'cached' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    } uppercase font-bold tracking-tighter`}>
                        {error === 'cached' ? 'Data Cached' : 'Offline Preview'}
                    </span>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-1 font-mono">Real-time git activity visualization</p>
          </div>
          <button 
            onClick={() => refresh()} 
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 hover:text-cyan-300 transition-all flex items-center gap-2"
          >
            <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            Sync Feed
          </button>
        </div>
        
        <div className="relative rounded-lg border border-white/5 bg-black/20 p-4 overflow-hidden">
            <img 
                src="https://ghchart.rshah.org/00ffff/sooubh" 
                alt="GitHub contribution heatmap" 
                loading="lazy" 
                className="w-full h-auto min-h-[100px] object-contain filter drop-shadow-[0_0_15px_rgba(0,255,255,0.1)]" 
            />
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="w-4 h-4 text-purple-400" />
            <h6 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Latest Commits</h6>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {loading ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse border border-white/10" />
            )) : renderedEvents.slice(0, 4).map((event, index) => (
                <ActivityCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
           <div className="flex items-center gap-3 mb-4">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h6 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Status</h6>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden h-[calc(100%-2rem)] flex flex-col">
            <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Status Monitor</span>
                <span className="text-[10px] text-cyan-300 font-mono inline-flex items-center gap-1.5 bg-cyan-300/10 px-2 py-0.5 rounded-full border border-cyan-300/20">
                    <CircleDot className="w-2.5 h-2.5 animate-pulse" />
                    {statusLabels[statusIndex]}
                </span>
            </div>
            <div className="p-5 font-mono text-xs md:text-sm flex-grow">
                <div className="space-y-3">
                    <motion.div 
                        key={logIndex} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        className="text-cyan-400 flex items-start gap-2"
                    >
                        <span className="text-gray-600">$</span>
                        <span>{terminalLogs[logIndex]}</span>
                    </motion.div>
                    <div className="h-px bg-white/5 my-4" />
                    <div className="space-y-2">
                        <div className="text-gray-500 text-[10px] uppercase">Active Nodes</div>
                        <div className="flex flex-wrap gap-2">
                            {activeRepos.slice(0, 3).map(repo => (
                                <span key={repo} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">
                                    {repo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-white/5 border-t border-white/5">
                 <div className="flex items-center justify-between text-[10px] font-mono text-gray-600">
                    <span>UPTIME: 99.9%</span>
                    <span>LATENCY: 42ms</span>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
