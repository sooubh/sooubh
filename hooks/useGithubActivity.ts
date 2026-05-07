import { useCallback, useEffect, useMemo, useState } from 'react';

const GITHUB_EVENTS_URL = 'https://api.github.com/users/sooubh/events';
const CACHE_KEY = 'sooubh-github-events-v3';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes to stay safe from rate limits

export type GithubEventItem = {
  id: string;
  type: string;
  repo: string;
  commitMessage: string;
  commitCount: number;
  branch: string;
  timestamp: string;
};

type GithubState = {
  events: GithubEventItem[];
  activeRepos: string[];
  loading: boolean;
  error: string | null;
  lastSynced: number | null;
};

const MOCK_EVENTS: GithubEventItem[] = [
  {
    id: 'mock-1',
    type: 'PushEvent',
    repo: 'sooubh/portfolio',
    commitMessage: 'Refined terminal interactivity and real-time logs',
    commitCount: 1,
    branch: 'main',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    type: 'CreateEvent',
    repo: 'sooubh/neural-search',
    commitMessage: 'Created repository: neural-search',
    commitCount: 1,
    branch: 'main',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  }
];

const normalizeEvent = (event: any): GithubEventItem => {
  const commits = event?.payload?.commits ?? [];
  let message = 'Activity updated';
  
  if (event.type === 'PushEvent') {
    message = commits[0]?.message ?? 'Pushed changes';
  } else if (event.type === 'PullRequestEvent') {
    message = `${event.payload.action} PR: ${event.payload.pull_request.title}`;
  } else if (event.type === 'IssuesEvent') {
    message = `${event.payload.action} issue: ${event.payload.issue.title}`;
  } else if (event.type === 'CreateEvent') {
    message = `Created ${event.payload.ref_type}: ${event.payload.ref || event.repo.name}`;
  } else if (event.type === 'WatchEvent') {
    message = `Starred repository`;
  } else if (event.type === 'ForkEvent') {
    message = `Forked repository`;
  }

  return {
    id: event.id,
    type: event.type,
    repo: event?.repo?.name ?? 'unknown/repo',
    commitMessage: message,
    commitCount: commits.length || 1,
    branch: event?.payload?.ref?.split('/').pop() ?? 'main',
    timestamp: event.created_at,
  };
};

export const useGithubActivity = () => {
  const [state, setState] = useState<GithubState>({
    events: [],
    activeRepos: [],
    loading: true,
    error: null,
    lastSynced: null,
  });

  const fetchGithubEvents = useCallback(async (silent = false) => {
    if (!silent) setState((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(GITHUB_EVENTS_URL, {
        headers: { 
          'Accept': 'application/vnd.github+json',
        },
        signal: AbortSignal.timeout(5000) 
      });

      if (response.status === 403 || response.status === 429) {
        throw new Error('rate_limit');
      }

      if (!response.ok) throw new Error(`api_err_${response.status}`);

      const payload = await response.json();
      const normalized = payload.slice(0, 12).map(normalizeEvent);
      const activeRepos = Array.from(new Set(normalized.map((item: GithubEventItem) => item.repo))).slice(0, 6);
      const now = Date.now();

      localStorage.setItem(CACHE_KEY, JSON.stringify({ now, normalized, activeRepos }));

      setState({
        events: normalized,
        activeRepos,
        loading: false,
        error: null,
        lastSynced: now,
      });
    } catch (error: any) {
      console.warn('GitHub Sync:', error.message);
      
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setState({
          events: parsed.normalized,
          activeRepos: parsed.activeRepos,
          loading: false,
          error: 'cached',
          lastSynced: parsed.now,
        });
      } else {
        setState({
          events: MOCK_EVENTS,
          activeRepos: ['sooubh/portfolio', 'sooubh/neural-search'],
          loading: false,
          error: 'offline',
          lastSynced: Date.now(),
        });
      }
    }
  }, []);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.now < CACHE_TTL) {
        setState({
          events: parsed.normalized,
          activeRepos: parsed.activeRepos,
          loading: false,
          error: null,
          lastSynced: parsed.now,
        });
      }
    }

    fetchGithubEvents(true);
    const interval = setInterval(() => fetchGithubEvents(true), CACHE_TTL);
    return () => clearInterval(interval);
  }, [fetchGithubEvents]);

  const counters = useMemo(() => {
    return {
      pushes: state.events.filter((e) => e.type === 'PushEvent').length,
      prs: state.events.filter((e) => e.type === 'PullRequestEvent').length,
      updates: state.events.length,
      commits: state.events.reduce((sum, event) => sum + event.commitCount, 0),
    };
  }, [state.events]);

  return { ...state, counters, refresh: fetchGithubEvents };
};
