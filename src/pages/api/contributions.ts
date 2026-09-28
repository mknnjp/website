import type { APIContext } from "astro";
import { fetchContributions } from "../../lib/github-client.ts";
import { USERNAME } from "../../lib/site.ts";

export const prerender = false;

export async function GET(context: APIContext) {
  const token = context.locals?.runtime?.env?.GITHUB_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({ error: "GitHub token not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const data = await fetchContributions(USERNAME, token);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
