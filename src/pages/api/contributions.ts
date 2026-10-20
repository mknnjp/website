import type { APIContext } from "astro";
import { getSecret } from "astro:env/server";
import { getCached, putCached } from "../../lib/edge-cache.ts";
import { fetchContributions } from "../../lib/github-client.ts";
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

export const GET = async (context: APIContext): Promise<Response> => {
  const token = getSecret("GITHUB_TOKEN");

  if (!token) {
    return jsonResponse({ error: "GitHub token not configured" }, 503);
  }

  // Cache the upstream GraphQL result at the edge so the public endpoint does
  // not consume the token's rate limit on every request.
  const url = new URL(context.request.url);
  const cacheKey = `${url.origin}/api/contributions`;

  const cached = await getCached(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const data = await fetchContributions(token, USERNAME);
    const response = jsonResponse(data, 200, {
      "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
    });

    const put = putCached(cacheKey, response);
    const ctx = context.locals?.cfContext;
    if (ctx) {
      ctx.waitUntil(put);
    } else {
      await put;
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
};
