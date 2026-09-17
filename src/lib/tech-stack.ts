/**
 * Tech Stack Data
 * Centralized data for all technologies displayed in the Tech Stack section.
 * Icons use Iconify identifiers: simple-icons:* (CC0) preferred, lucide:* as fallback.
 */

export type TechCategory = "languages" | "frameworksTools" | "infrastructures" | "other";

export interface TechItem {
  /** Display label (kept in English as industry standard) */
  label: string;
  /** Iconify icon identifier (e.g., "simple-icons:typescript") */
  icon: string;
  /** Category for grouping */
  category: TechCategory;
  /** Semantic color for the badge (matches Badge.astro color variants) */
  color: "blue" | "purple" | "green" | "orange" | "red" | "cyan" | "indigo" | "pink" | "yellow";
}

/**
 * Complete tech stack inventory.
 * Icons verified against @iconify-json/simple-icons v1.2.95 and @iconify-json/lucide v1.2.130.
 */
export const TECH_STACK: TechItem[] = [
  // Languages
  { label: "Bash", icon: "simple-icons:gnubash", category: "languages", color: "green" },
  { label: "GDScript", icon: "simple-icons:godotengine", category: "languages", color: "blue" },
  { label: "Python", icon: "simple-icons:python", category: "languages", color: "blue" },
  { label: "Rust", icon: "simple-icons:rust", category: "languages", color: "orange" },
  { label: "Swift", icon: "simple-icons:swift", category: "languages", color: "orange" },
  { label: "TypeScript", icon: "simple-icons:typescript", category: "languages", color: "blue" },

  // Frameworks & Tools
  { label: "Ajv", icon: "simple-icons:ajv", category: "frameworksTools", color: "cyan" },
  { label: "Astro", icon: "simple-icons:astro", category: "frameworksTools", color: "purple" },
  { label: "AWS", icon: "simple-icons:amazonwebservices", category: "infrastructures", color: "orange" },
  { label: "Axum", icon: "simple-icons:rust", category: "frameworksTools", color: "orange" },
  { label: "Docker", icon: "simple-icons:docker", category: "infrastructures", color: "blue" },
  { label: "ESLint", icon: "simple-icons:eslint", category: "frameworksTools", color: "indigo" },
  { label: "Fastify", icon: "simple-icons:fastify", category: "frameworksTools", color: "indigo" },
  { label: "GitHub Actions", icon: "simple-icons:githubactions", category: "infrastructures", color: "blue" },
  { label: "Godot", icon: "simple-icons:godotengine", category: "frameworksTools", color: "blue" },
  { label: "Hono", icon: "simple-icons:hono", category: "frameworksTools", color: "orange" },
  { label: "Jest", icon: "simple-icons:jest", category: "frameworksTools", color: "red" },
  { label: "Just", icon: "simple-icons:just", category: "frameworksTools", color: "indigo" },
  { label: "Node.js", icon: "simple-icons:nodedotjs", category: "frameworksTools", color: "green" },
  { label: "Oxc", icon: "simple-icons:oxc", category: "frameworksTools", color: "cyan" },
  { label: "Postgres", icon: "simple-icons:postgresql", category: "infrastructures", color: "blue" },
  { label: "Prisma", icon: "simple-icons:prisma", category: "frameworksTools", color: "indigo" },
  { label: "Pulumi", icon: "simple-icons:pulumi", category: "infrastructures", color: "purple" },
  { label: "SwiftUI", icon: "simple-icons:swift", category: "frameworksTools", color: "blue" },
  { label: "Traefik", icon: "simple-icons:traefikproxy", category: "infrastructures", color: "red" },
  { label: "Vitest", icon: "simple-icons:vitest", category: "frameworksTools", color: "green" },
  { label: "Vue.js", icon: "simple-icons:vuedotjs", category: "frameworksTools", color: "green" },
  { label: "Zod", icon: "simple-icons:zod", category: "frameworksTools", color: "blue" },

  // Other (currently empty - reserved for future use)
  // Example: { label: "Example", icon: "lucide:box", category: "other", color: "pink" },
];

/**
 * Get tech items filtered by category
 */
export const getTechByCategory = (category: TechCategory): TechItem[] => {
  return TECH_STACK.filter((item) => item.category === category);
};

/**
 * Get all unique categories present in the tech stack
 */
export const getTechCategories = (): TechCategory[] => {
  const categories = new Set<TechCategory>();
  TECH_STACK.forEach((item) => categories.add(item.category));
  return Array.from(categories);
};
