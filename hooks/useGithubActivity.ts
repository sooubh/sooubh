import { useCallback, useEffect, useMemo, useState } from 'react';

const GITHUB_EVENTS_URL = 'https://api.github.com/users/sooubh/events';
const CACHE_KEY = 'sooubh-github-events-v1';
const CACHE_TTL = 1000 * 60 * 5;

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

const normalizeEvent = (event: any): GithubEventItem => {
  const commits = event?.payload?.commits ?? [];
  return {
    id: event.id,
    type: event.type,
    repo: event?.repo?.name ?? 'unknown/repo',
    commitMessage: commits[0]?.message ?? event?.payload?.action ?? 'Repository activity updated',
    commitCount: commits.length,
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
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

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
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch GitHub activity',
      }));
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
