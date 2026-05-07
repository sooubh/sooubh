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
    <section className="mt-16 space-y-6" id="github-live-activity">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(counters).map(([key, value]) => (
          <motion.div key={key} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="rounded-lg border border-white/10 bg-black/40 p-3">
            <div className="text-xs uppercase tracking-widest text-gray-400">{key}</div>
            <div className="text-xl font-bold text-cyan-300">{value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="rounded-xl border border-cyan-500/20 bg-black/50 p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-sm uppercase tracking-[0.25em] text-cyan-300 flex items-center gap-2"><Activity className="w-4 h-4" />Contribution Activity</h5>
          <button onClick={() => refresh()} className="text-xs text-gray-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"><RefreshCcw className="w-3 h-3" />Sync</button>
        </div>
        <img src="https://ghchart.rshah.org/00ffff/sooubh" alt="GitHub contribution heatmap" loading="lazy" className="w-full rounded-lg border border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.12)] hover:shadow-[0_0_35px_rgba(0,255,255,0.35)] transition-shadow duration-300" />
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse border border-white/10" />) : renderedEvents.map((event, index) => <ActivityCard key={event.id} event={event} index={index} />)}
          {error ? <p className="text-xs text-red-400">GitHub activity unavailable: {error}</p> : null}
        </div>

        <div className="lg:col-span-5 rounded-xl border border-white/10 bg-black/70 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-300">dev-terminal://live-feed</span>
            <span className="text-xs text-green-300 inline-flex items-center gap-1"><CircleDot className="w-3 h-3 animate-pulse" />{statusLabels[statusIndex]}</span>
          </div>
          <div className="p-4 font-mono text-sm space-y-2">
            <motion.div key={logIndex} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-green-400">
              &gt; {terminalLogs[logIndex]}<span className="inline-block w-2 h-4 bg-cyan-300 ml-1 animate-pulse align-middle" />
            </motion.div>
            <div className="pt-2 border-t border-white/10 text-xs text-gray-400">Active repositories: {activeRepos.join(' • ') || 'loading...'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
