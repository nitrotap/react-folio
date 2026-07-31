/**
 * Theme registry.
 *
 * Each theme is a set of CSS custom property overrides applied via a
 * `data-theme` attribute on <html> — the customization path Astryx documents,
 * so nothing here forks a component.
 *
 * All four palettes are checked to WCAG AA (4.5:1) for body text and muted
 * text against their own ground. Where the source palette in the Design Style
 * Library failed, the value was darkened (or lightened, on dark grounds) until
 * it passed; the original is kept only for decorative use. See globals.css for
 * the measured ratios.
 */

export const THEMES = [
  {
    id: "neumorphism",
    name: "Neumorphism",
    description: "Soft extruded dual-shadow",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    description: "Cyan-on-navy drafting",
  },
  {
    id: "swiss",
    name: "Swiss",
    description: "Strict grid, red accent",
  },
  {
    id: "pixel",
    name: "8-bit",
    description: "Chunky pixels, limited palette",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_IDS = THEMES.map((t) => t.id) as readonly ThemeId[];
export const DEFAULT_THEME: ThemeId = "neumorphism";

export const STORAGE_KEY = "kj-theme";
