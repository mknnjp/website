import type { Cache, Response as CfResponse } from "@cloudflare/workers-types";

/**
 * Thin wrapper around the Cloudflare Workers edge cache.
 *
 * The Workers runtime exposes a global `caches` object whose `default` cache
 * uses the Cloudflare-specific `Cache` type, while the DOM `CacheStorage`
 * interface that TypeScript resolves for `caches` does not declare it. The
 * conversion is isolated here so the API routes can keep using the standard
 * DOM `Response` type without repeating the cast.
 */
const cloudflareCache = caches as unknown as { default: Cache };

/** Read a cached response, or `undefined` when the entry is missing. */
export const getCached = async (
  key: string,
): Promise<Response | undefined> => {
  const cached = await cloudflareCache.default.match(key);
  return cached as Response | undefined;
};

/** Store a response in the edge cache. */
export const putCached = async (
  key: string,
  response: Response,
): Promise<void> => {
  await cloudflareCache.default.put(
    key,
    response.clone() as unknown as CfResponse,
  );
};
