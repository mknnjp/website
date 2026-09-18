/**
 * Badge Color Types
 * Shared type for Badge.astro color variants.
 * Used by Badge.astro, TechBadge.astro, and projects.ts
 */

export type BadgeColor =
  | "blue"
  | "orange"
  | "green"
  | "purple"
  | "cyan"
  | "yellow"
  | "red"
  | "indigo"
  | "pink"
  | "gray";

/**
 * Badge size variants
 */
export type BadgeSize = "sm" | "md";

/**
 * Badge color class mapping - single source of truth
 */
export const BADGE_COLORS: Record<BadgeColor, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  green: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",
  yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  red: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
  pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
  gray: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
};

/**
 * Badge size class mapping
 */
export const BADGE_SIZES: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-xs font-medium rounded",
  md: "px-4 py-2 rounded-lg font-medium",
};
