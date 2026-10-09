import type { APIContext } from "astro";
import { fetchContributions } from "../../lib/github-client.ts";
import { USERNAME } from "../../lib/site.ts";

// Rendered on demand by the Cloudflare adapter (see astro.config.ts).
export const prerender = false;

const CACHE_TTL_SECONDS = 3600;
const CACHE_KEY = "https://internal.mknn.jp/api/contributions";

const jsonResponse = (
  body: unknown,
  status: number,
  headers: Record<string, string> = {},
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

export const GET = async (context: APIContext): Promise<Response> => {
  const token = context.locals?.runtime?.env?.GITHUB_TOKEN;

  if (!token) {
    return jsonResponse({ error: "GitHub token not configured" }, 503);
  }

  // Cache the upstream GraphQL result at the edge so the public endpoint does
  // not consume the token's rate limit on every request. The adapter types
  // `caches` with @cloudflare/workers-types, whose Request/Response differ from
  // the DOM lib types; the runtime objects are compatible, so narrow to Cache.
  const cache = context.locals?.runtime?.caches?.default as unknown as
    | Cache
    | undefined;
  const cacheKey = new Request(CACHE_KEY);

  const cached = await cache?.match(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const data = await fetchContributions(token, USERNAME);
    const response = jsonResponse(data, 200, {
      "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
    });

    if (cache) {
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
