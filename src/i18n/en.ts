import type { Dictionary } from "./dictionary.ts";

export const en: Dictionary = {
  meta: {
    title: "Makie - Portfolio",
    description:
      "Makie - Software Engineer based in Tokyo, focusing on web development with TypeScript, Rust, and Node.js.",
  },
  nav: {
    about: "About",
    tech: "Tech Stack",
    personalProjects: "Personal Projects",
    stats: "Stats",
  },
  header: {
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
    navLabel: "Site navigation",
    toggleThemeLabel: "Toggle theme",
  },
  languageLabel: "Language",
  hero: {
    subtitle:
      "Software Engineer based in Tokyo, focusing on web and mobile application development.",
    avatarAlt: "Makie",
  },
  about: {
    title: "About Me",
    greetingTemplate: "Hi! I'm {name}, a Software Engineer based in Tokyo.",
    paragraphs: [
      "I mainly develop Node.js backend services in TypeScript for work.",
      "In personal projects, I develop personal finance tools and 2D games.",
      "My development style is specification-driven with AI agents—though I never lose the joy of writing code myself.",
    ],
  },
  tech: {
    title: "Tech Stack",
    categories: {
      languages: "Languages",
      frameworksTools: "Frameworks & Tools",
      infrastructures: "Infrastructures",
      other: "Other",
    },
  },
  personalProjects: {
    title: "Personal Projects",
    descriptions: {
      utopia:
        "Lightweight, self-hostable personal finance API with partial Firefly III compatibility; Rust.",
      xiangke:
        "Xiangke (相剋, xiāngkè): command turn-based battle game inspired by Romance of the Three Kingdoms.",
      "pr-agent-runner":
        "AI-powered PR review automation on OpenCodeReview (OCR); TypeScript CLI for GitHub @mention responses.",
    },
    viewOnGitHubTemplate: "View {name} on GitHub",
    inDevelopment: "In Development",
  },
  stats: {
    title: "GitHub Stats",
    recentPushes: "Recent pushes",
    pushesSuffix: "pushes in the last 7 days",
    activity: "Activity",
    topRepos: "Top Repositories",
    loadingPushes: "Loading recent pushes…",
    loadingActivity: "Loading activity…",
    loadingTopRepos: "Loading top repositories…",
    loadError: "Could not load GitHub activity. Please try again later.",
    topReposLoadError: "Could not load top repositories. Please try again later.",
    labels: {
      commits: "Commits",
      pullRequests: "Pull Requests",
      codeReview: "Code Reviews",
      issues: "Issues",
    },
  },
  footer: {
    rightsSuffix: "All rights reserved.",
    licensesButton: "Third-party licenses",
  },
  licensesModal: {
    title: "Third-party licenses",
    description:
      "This site is built with open-source software. Thanks to the maintainers and contributors of these projects.",
    closeLabel: "Close third-party licenses dialog",
    categories: {
      runtime: "Runtime",
      buildTooling: "Build tooling",
      fonts: "Fonts",
      icons: "Icons",
    },
  },
  qqModal: {
    openLabel: "Show QQ QR code",
    closeLabel: "Close QQ QR code dialog",
    qrAlt: "QQ QR code",
  },
  emailModal: {
    openLabel: "Show email address",
    title: "Email",
    description: "Feel free to reach out via email.",
    closeLabel: "Close email dialog",
    addressLabel: "Email address",
    copyLabel: "Copy",
    copiedLabel: "Copied!",
    composeLabel: "Compose email",
  },
};
