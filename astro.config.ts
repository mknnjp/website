import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Injected at build time via the Cloudflare Workers build environment variable SITE_URL.
  // .env files are not loaded inside astro.config.ts, so we read process.env directly.
  site: process.env.SITE_URL,
  // Static by default. The /api/contributions and /api/github-stats endpoints opt
  // into on-demand rendering with `export const prerender = false` and are served by
  // the Cloudflare adapter as Worker routes.
  output: 'static',
  adapter: cloudflare({
    // The v14 default is 'cloudflare-binding', which requires the Cloudflare Images
    // binding to be provisioned. Keep build-time image optimization so the
    // deployment stays self-contained.
    imageService: 'compile',
  }),
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
