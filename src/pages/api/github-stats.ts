import type { APIContext } from "astro";
import {
  buildActivityStats,
  fetchRecentEvents,
  fetchTopRepos,
  TOP_REPOS_LIMIT,
} from "../../lib/github-client.ts";
import { USERNAME } from "../../lib/site.ts";

// Rendered on demand by the Cloudflare adapter (see astro.config.ts).
export const prerender = false;

const CACHE_TTL_SECONDS = 3600;

const jsonResponse = (
  body: unknown,
  status: number,
  headers: Record<string, string> = {},
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

const getCache = (context: APIContext): Cache | undefined =>
  context.locals?.runtime?.caches?.default as unknown as Cache | undefined;

const getCacheKey = (context: APIContext, path: string): Request => {
  const url = new URL(context.request.url);
  return new Request(`${url.origin}${path}`);
};

const serveCachedOrFetch = async (
  context: APIContext,
  path: string,
  fetcher: (token?: string) => Promise<unknown>,
): Promise<Response> => {
  const token = context.locals?.runtime?.env?.GITHUB_TOKEN;
  const cache = getCache(context);
  const cacheKey = getCacheKey(context, path);

  // Only serve edge cache to avoid leaking authenticated responses across users.
  // Without a token the upstream is the public rate-limited API, so skip cache.
  if (token) {
    const cached = await cache?.match(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const data = await fetcher(token);
    const response = jsonResponse(data, 200, {
      "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
    });

    if (token && cache) {
      const put = cache.put(cacheKey, response.clone());
      const ctx = context.locals?.runtime?.ctx;
      if (ctx) {
        ctx.waitUntil(put);
      } else {
        await put;
      }
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
};

export const GET = async (context: APIContext): Promise<Response> => {
  const kind = new URL(context.request.url).searchParams.get("kind");

  if (kind === "top-repos") {
    return serveCachedOrFetch(context, "/api/github-stats?kind=top-repos", (token) =>
      fetchTopRepos(TOP_REPOS_LIMIT, token),
    );
  }

  return serveCachedOrFetch(context, "/api/github-stats", async (token) => {
    const events = await fetchRecentEvents(USERNAME, 7, token);
    return buildActivityStats(events);
  });
};
