/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<{
  GITHUB_TOKEN?: string;
}>;

declare namespace App {
  interface Locals extends Runtime { }
}
