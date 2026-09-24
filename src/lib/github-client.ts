import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { RequestError } from "@octokit/request-error";
import { USERNAME } from "./site.ts";

export const USER_AGENT = "mknnjp-website-build";
export const PER_PAGE = 100;
export const MAX_PAGES = 10;
export const RECENT_DAYS = 7;
export const CACHE_KEY = "github-activity-stats-v1";
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const TOP_REPOS_LIMIT = 4;
export const TOP_REPOS_CACHE_KEY = "github-top-repos-v1";
export const FALLBACK_LANGUAGE = "—";

export interface EventResponse {
  type: string;
  created_at: string;
}

export interface ActivitySlice {
  label: string;
  percent: number;
}

export interface ActivityStats {
  recentPushes: number;
  eventsTotal: number;
  activity: ActivitySlice[];
}

export interface EventCounts {
  commits: number;
  pullRequests: number;
  codeReviews: number;
  issues: number;
}

const INITIAL_COUNTS: EventCounts = {
  commits: 0,
  pullRequests: 0,
  codeReviews: 0,
  issues: 0,
};

/** Calculate the date N days ago in ISO 8601 format (UTC) */
export const getDaysAgo = (days: number = RECENT_DAYS): string => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

export const countEvents = (events: EventResponse[]): EventCounts => {
  return events.reduce<EventCounts>(
    (counts, event) => {
      switch (event.type) {
        case "PushEvent":
          counts.commits += 1;
          break;
        case "PullRequestEvent":
          counts.pullRequests += 1;
          break;
        case "PullRequestReviewEvent":
        case "PullRequestReviewCommentEvent":
          counts.codeReviews += 1;
          break;
        case "IssuesEvent":
        case "IssueCommentEvent":
          counts.issues += 1;
          break;
      }
      return counts;
    },
    { ...INITIAL_COUNTS },
  );
}

/** Aggregate filtered events into display-ready activity stats */
export const buildActivityStats = (events: EventResponse[]): ActivityStats => {
  const { commits, pullRequests, codeReviews, issues } = countEvents(events);
  const total = commits + pullRequests + codeReviews + issues;
  const toPercent = (count: number): number =>
    total === 0 ? 0 : Math.round((count / total) * 100);

  return {
    recentPushes: commits,
    eventsTotal: events.length,
    activity: [
      { label: "Commits", percent: toPercent(commits) },
      { label: "Pull Requests", percent: toPercent(pullRequests) },
      { label: "Code Reviews", percent: toPercent(codeReviews) },
      { label: "Issues", percent: toPercent(issues) },
    ],
  };
}

/** Shared Octokit client (unauthenticated; browser safe) */
const OctokitWithPaginate = Octokit.plugin(paginateRest).defaults({
  userAgent: USER_AGENT,
});

export const octokit = new OctokitWithPaginate();

/** Normalize Octokit RequestError into the plain-error contract used by callers */
const toFailure = (error: unknown): Error => {
  if (error instanceof RequestError) {
    const remaining = error.response?.headers["x-ratelimit-remaining"];
    return new Error(
      `GitHub API request failed: ${error.status} ${error.message}` +
      (remaining !== undefined ? ` (rate-limit remaining: ${remaining})` : ""),
    );
  }
  return error instanceof Error ? error : new Error(String(error));
};

/** Fetch public events within the recent window using pagination (browser safe) */
export const fetchRecentEvents = async (
  username: string = USERNAME,
  days: number = RECENT_DAYS,
): Promise<EventResponse[]> => {
  const cutoff = getDaysAgo(days);
  const allEvents: EventResponse[] = [];
  let page = 0;

  try {
    const iterator = octokit.paginate.iterator(
      "GET /users/{username}/events/public",
      { username, per_page: PER_PAGE },
    );

    for await (const response of iterator) {
      page += 1;
      const events = (response.data ?? []).map((event) => ({
        type: event.type ?? "Unknown",
        created_at: event.created_at ?? "",
      }));
      if (events.length === 0) {
        break;
      }

      const recentEvents = events.filter(
        (event) => event.created_at >= cutoff,
      );
      allEvents.push(...recentEvents);
      if (recentEvents.length === 0 || page >= MAX_PAGES) {
        break;
      }
    }
  } catch (error) {
    throw toFailure(error);
  }

  return allEvents;
}

interface CachedActivity {
  fetchedAt: number;
  stats: ActivityStats;
}

/** Load cached activity stats when still fresh, otherwise null */
export const loadCachedActivity = (
  now: number = Date.now(),
  key: string = CACHE_KEY,
): ActivityStats | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    const cached = JSON.parse(raw) as CachedActivity;
    if (now - cached.fetchedAt > CACHE_TTL_MS) {
      return null;
    }
    return cached.stats;
  } catch {
    return null;
  }
}

/** Persist activity stats with a fetch timestamp */
export const saveCachedActivity = (
  stats: ActivityStats,
  now: number = Date.now(),
  key: string = CACHE_KEY,
): void => {
  try {
    const payload: CachedActivity = { fetchedAt: now, stats };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Ignore storage errors (private mode, quota exceeded)
  }
}

/** Fetch fresh activity stats and update the cache */
export const fetchActivityStats = async (
  username: string = USERNAME,
  days: number = RECENT_DAYS,
): Promise<ActivityStats> => {
  const events = await fetchRecentEvents(username, days);
  const stats = buildActivityStats(events);
  saveCachedActivity(stats);
  return stats;
}

export interface TopRepo {
  name: string;
  htmlUrl: string;
  language: string;
}

interface CachedTopRepos {
  fetchedAt: number;
  repos: TopRepo[];
}

export const fetchTopRepos = async (
  limit: number = TOP_REPOS_LIMIT,
): Promise<TopRepo[]> => {
  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username: USERNAME,
      per_page: PER_PAGE,
      type: "owner",
      sort: "pushed",
      direction: "desc",
    });
    return response.data
      .filter((repo) => !repo.fork)
      .sort((a, b) =>
        (b.pushed_at ?? "").localeCompare(a.pushed_at ?? ""),
      )
      .slice(0, limit)
      .map((repo) => ({
        name: repo.name,
        htmlUrl: repo.html_url,
        language: repo.language ?? FALLBACK_LANGUAGE,
      }));
  } catch (error) {
    throw toFailure(error);
  }
};

export const loadCachedTopRepos = (
  now: number = Date.now(),
  key: string = TOP_REPOS_CACHE_KEY,
): TopRepo[] | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedTopRepos;
    if (now - cached.fetchedAt > CACHE_TTL_MS) return null;
    return cached.repos;
  } catch {
    return null;
  }
}

export const saveCachedTopRepos = (
  repos: TopRepo[],
  now: number = Date.now(),
  key: string = TOP_REPOS_CACHE_KEY,
): void => {
  try {
    const payload: CachedTopRepos = { fetchedAt: now, repos };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Ignore storage errors
  }
}

export const fetchTopReposWithCache = async (
  limit: number = TOP_REPOS_LIMIT,
): Promise<TopRepo[]> => {
  const cached = loadCachedTopRepos();
  if (cached) return cached;
  const repos = await fetchTopRepos(limit);
  saveCachedTopRepos(repos);
  return repos;
}
