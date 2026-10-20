import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Injected at build time via Cloudflare Pages build environment variable SITE_URL.
  // .env files are not loaded inside astro.config.ts, so we read process.env directly.
  site: process.env.SITE_URL,
  // Static by default. The /api/contributions endpoint opts into on-demand
  // rendering with `export const prerender = false` and is served by the
  // Cloudflare adapter as a Pages Function.
  output: 'static',
  adapter: cloudflare(),
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
