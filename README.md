# me.mknn.jp

[me.mknn.jp](https://me.mknn.jp) is the personal portfolio website of Makinon, a software engineer based in Tokyo. The site is built with Astro and is available in English, Japanese, and Simplified Chinese.

## Features

- Profile, technical stack, personal projects, and GitHub activity sections
- English, Japanese, and Simplified Chinese locales with locale persistence
- Recent GitHub pushes, activity breakdown, and top repositories from the public GitHub API
- Client-side caching for GitHub data with a 24-hour retention period
- Third-party license dialog covering dependencies, fonts, and icons
- Production security and asset caching headers for Cloudflare Workers static assets

## Technology

- [Astro](https://astro.build/) 7
- TypeScript
- Tailwind CSS with the Vite integration
- [astro-icon](https://github.com/natemoo-re/astro-icon) with Lucide and Simple Icons

## Project Routes

| Locale | Path |
| --- | --- |
| English | `/` |
| Japanese | `/ja/` |
| Simplified Chinese | `/zh-cn/` |

## Requirements

- Node.js 22.12.0 or later
- pnpm

## Development

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

The site is served at `http://localhost:4321` by default.

## Build

Set the public site origin when creating a production build so canonical and Open Graph URLs are generated correctly:

```sh
SITE_URL=https://mknn.jp pnpm build
```

Preview the production build locally (serves `dist/` with the Cloudflare Workers runtime, including the `/api/contributions` and `/api/github-stats` endpoints):

```sh
pnpm preview
```

### Environment variables

| Variable | Description |
| --- | --- |
| `SITE_URL` | Public origin of the deployed site, including the scheme, such as `https://me.mknn.jp`. Set this in the build environment. |
| `GITHUB_TOKEN` | GitHub token used by the `/api/contributions` and `/api/github-stats` endpoints to query the GraphQL API. Set it as a Worker secret. |

Most GitHub data (recent pushes, activity, and top repositories) is fetched from public, unauthenticated endpoints in the browser. The contribution graph is different: it is rendered on demand by a Cloudflare Worker route that calls the GitHub GraphQL API with `GITHUB_TOKEN`, so the token is never exposed to the client.

For local development, create a `.dev.vars` file in the project root (it is git-ignored) so the Cloudflare Workers runtime exposes the token to the API routes:

```sh
GITHUB_TOKEN=ghp_your_token_here
```

### Deployment

The site is deployed to Cloudflare Workers with static assets. `wrangler.jsonc` holds the
Worker configuration.

Regenerate the Worker type declarations after changing `wrangler.jsonc`:

```sh
pnpm types
```

Store the GitHub token as a Worker secret:

```sh
pnpm wrangler secret put GITHUB_TOKEN
```

Deploy the site:

```sh
SITE_URL=https://mknn.jp pnpm build
pnpm deploy
```

Deployments to the `main` branch are handled by the GitHub Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which requires the
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

## Project Structure

```text
.
├── public/                 # Static assets and Cloudflare Workers headers
├── src/
│   ├── components/         # Reusable Astro components
│   ├── i18n/               # Locale definitions and translations
│   ├── layouts/            # Site layout and document metadata
│   ├── lib/                # GitHub, site, social, and license utilities
│   ├── pages/              # English, Japanese, and Chinese pages
│   └── styles/             # Global styles
├── astro.config.ts         # Astro, Tailwind CSS, and site configuration
├── wrangler.jsonc          # Cloudflare Workers configuration
└── package.json
```

## Commands

All commands run from the repository root:

| Command | Description |
| --- | --- |
| `pnpm install` | Install project dependencies |
| `pnpm dev` | Start the development server at `http://localhost:4321` |
| `pnpm build` | Create a production build in `dist/` |
| `pnpm preview` | Preview the production build locally with the Cloudflare Workers runtime |
| `pnpm types` | Regenerate the Worker type declarations in `worker-configuration.d.ts` |
| `pnpm deploy` | Deploy the Worker to Cloudflare |
| `pnpm astro check` | Run Astro and TypeScript checks |

## License

This project is licensed under the [BSD 3-Clause License](LICENSE).
