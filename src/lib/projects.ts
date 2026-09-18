/**
 * Projects Data
 * Centralized data for all personal projects displayed in the Personal Projects section.
 */

import type { BadgeColor } from "./badge-colors.ts";

export interface Project {
  /** Repository name (used in GitHub URL) */
  name: string;
  /** Primary programming language */
  language: string;
  /** Badge color for the language (matches Badge.astro color variants) */
  languageColor: BadgeColor;
  /** GitHub stars count */
  stars?: number;
  /** GitHub forks count */
  forks?: number;
  /** Whether the project is in active development */
  inDevelopment?: boolean;
  /** i18n key for project description (looked up in personalProjects.descriptions) */
  descriptionKey: string;
  /** GitHub repository URL */
  repoUrl: string;
}

/**
 * Complete projects inventory.
 * Description keys correspond to personalProjects.descriptions in i18n dictionaries.
 */
export const PROJECTS: Project[] = [
  {
    name: "utopia",
    language: "Rust",
    languageColor: "orange",
    stars: 1,
    inDevelopment: true,
    descriptionKey: "utopia",
    repoUrl: "https://github.com/mknnjp/utopia",
  },
  {
    name: "xiangke",
    language: "Rust",
    languageColor: "orange",
    stars: 1,
    forks: 1,
    inDevelopment: true,
    descriptionKey: "xiangke",
    repoUrl: "https://github.com/mknnjp/xiangke",
  },
  {
    name: "pr-agent-runner",
    language: "TypeScript",
    languageColor: "blue",
    descriptionKey: "pr-agent-runner",
    repoUrl: "https://github.com/mknnjp/pr-agent-runner",
  },
];
