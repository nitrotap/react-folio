import type { ThemeId } from "@/lib/themes";

/**
 * Documentation for the four themes.
 *
 * Written to be checkable. Every ratio below was measured in a browser against
 * that theme's own ground, not estimated from the hex values, and every
 * correction records what the source palette actually was — a design system
 * that hides its own compromises is not much of a system.
 */

export interface Correction {
  token: string;
  from: string;
  fromRatio: string;
  to: string;
  toRatio: string;
  why: string;
}

export interface Design {
  id: ThemeId;
  name: string;
  tagline: string;
  /** What it does on this site, mechanically. */
  what: string[];
  /** Where the style comes from, historically. */
  origin: string[];
  /** The rules that define it. */
  characteristics: string[];
  /** Measured against this theme's own ground. */
  ratios: { label: string; value: string; note?: string }[];
  tokens: { label: string; value: string }[];
  /** Where the source palette had to be changed to reach AA. */
  corrections: Correction[];
  /** The honest weakness. */
  tradeoff: string;
}

export const designs: Design[] = [
  {
    id: "neumorphism",
    name: "Neumorphism",
    tagline: "Soft extruded dual-shadow",
    what: [
      "Every surface is the same colour as the page. Depth comes entirely from a pair of shadows offset in opposite directions — a dark one down-right, a light one up-left — which reads as a single light source above and to the left.",
      "There are no borders anywhere. An element is raised, inset, or pressed, and that is the whole vocabulary; the pressed state is the same shadow pair turned inward.",
      "Radius is the largest of the four themes at 22px on containers, because a soft extrusion needs a soft edge to sit on.",
    ],
    origin: [
      "Named around 2019–2020, when designers started pushing back on a decade of flat design by reintroducing depth — but depth rendered in a single flat colour rather than with the textures and gradients of the skeuomorphic era it descends from.",
      "The underlying trick is much older: it is the same shading that made physical buttons on interfaces before 2013 look pressable.",
    ],
    characteristics: [
      "One ground colour for page and surfaces alike",
      "Paired light/dark shadows, generous blur",
      "No borders, no dividers between surfaces",
      "System sans; large radii; round stroke terminals",
    ],
    ratios: [
      { label: "Body text on ground", value: "7.97:1", note: "AAA" },
      { label: "Muted text on ground", value: "4.70:1", note: "AA" },
      { label: "Accent on ground", value: "4.79:1", note: "AA" },
    ],
    tokens: [
      { label: "Ground", value: "#e0e5ec" },
      { label: "Ink", value: "#3a4252" },
      { label: "Muted", value: "#5a6478" },
      { label: "Accent", value: "#4553d6" },
      { label: "Shadow pair", value: "#bec3c9 / #ffffff" },
      { label: "Radius", value: "8 / 14 / 22px" },
    ],
    corrections: [
      {
        token: "Muted text",
        from: "#8a94a6",
        fromRatio: "2.40:1",
        to: "#5a6478",
        toRatio: "4.70:1",
        why: "Failed AA by a wide margin. Every secondary paragraph on the site uses this token.",
      },
      {
        token: "Accent",
        from: "#6a7bff",
        fromRatio: "2.81:1",
        to: "#4553d6",
        toRatio: "4.79:1",
        why: "The original is kept as a decorative glow, but never carries text.",
      },
    ],
    tradeoff:
      "Neumorphism's central idea is that everything is the same colour, which means contrast has nowhere to come from. It is the least accessible of the four by construction, and the only one where reaching AA required changing the palette rather than just choosing carefully within it.",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    tagline: "Cyan-on-navy drafting",
    what: [
      "A drafting grid is drawn across the page from the accent colour at low alpha, so every surface sits on measured paper rather than on a blank field.",
      "There is no raised state. A surface is a one-pixel ring in the accent at 28% opacity — the same weight as the grid behind it, so panels read as drawn rather than stacked.",
      "Everything is monospaced, including body copy, and radius is close to zero.",
    ],
    origin: [
      "The cyanotype, a photographic printing process invented by John Herschel in 1842, which reproduces a drawing as white lines on Prussian blue.",
      "It became the standard way to copy architectural and engineering drawings because it was cheap and needed no darkroom — the print is exposed in sunlight and washed in water. The process was obsolete by the mid-20th century, but the look outlived it, which is why we still say 'blueprint' for a plan.",
    ],
    characteristics: [
      "Luminous line on a dark ground, not ink on paper",
      "Uniform hairline weight for rules, borders, and glyphs",
      "A visible measuring grid",
      "Monospace throughout; mitred corners; near-zero radius",
    ],
    ratios: [
      { label: "Body text on ground", value: "12.48:1", note: "AAA" },
      { label: "Muted text on ground", value: "7.14:1", note: "AAA" },
      { label: "Accent on ground", value: "8.85:1", note: "AAA" },
    ],
    tokens: [
      { label: "Ground", value: "#0b2545" },
      { label: "Ink", value: "#dce8ff" },
      { label: "Muted", value: "#8fb4de" },
      { label: "Accent", value: "#6ad0ff" },
      { label: "Grid", value: "accent @ 9%" },
      { label: "Radius", value: "2 / 3 / 4px" },
    ],
    corrections: [],
    tradeoff:
      "Setting body copy in a monospace face costs reading speed at length. It suits a page of proof names and file paths and works against a long essay, which is why the prose pages are the ones to check this theme against.",
  },
  {
    id: "swiss",
    name: "Swiss",
    tagline: "Strict grid, red accent",
    what: [
      "Radius is zero everywhere — containers, controls, code blocks, badges. Nothing on the page is rounded.",
      "A surface is a single black hairline. There is no shadow, no fill change, and no elevation; separation comes from the rule and from space.",
      "One accent colour, used sparingly, against otherwise black-on-near-white.",
    ],
    origin: [
      "The International Typographic Style, developed in Switzerland through the 1950s at the design schools in Basel and Zürich — Josef Müller-Brockmann, Armin Hofmann, and Emil Ruder among its principal teachers.",
      "Its programme was that design should communicate rather than express: a mathematical grid, asymmetric composition, flush-left ragged-right setting, objective photography over illustration, and sans-serif type — Akzidenz-Grotesk first, then Helvetica after 1957.",
    ],
    characteristics: [
      "Zero radius, zero ornament, zero shadow",
      "Hairline rules doing the work of borders and dividers",
      "Grotesque sans throughout, tight and flush-left",
      "A single accent, held back for emphasis",
    ],
    ratios: [
      { label: "Body text on ground", value: "17.15:1", note: "AAA" },
      { label: "Muted text on ground", value: "6.77:1", note: "AAA" },
      { label: "Accent on ground", value: "5.10:1", note: "AA" },
    ],
    tokens: [
      { label: "Ground", value: "#f4f4f2" },
      { label: "Ink", value: "#111111" },
      { label: "Muted", value: "#555555" },
      { label: "Accent", value: "#d10510" },
      { label: "Surface", value: "1px solid #111" },
      { label: "Radius", value: "0" },
    ],
    corrections: [
      {
        token: "Accent",
        from: "#e30613",
        fromRatio: "4.47:1",
        to: "#d10510",
        toRatio: "5.10:1",
        why: "Under AA by 0.03 — close enough to look fine and still fail an audit, which is the most common way this happens.",
      },
    ],
    tradeoff:
      "The style is unforgiving of weak content. With no ornament, no colour, and no elevation to lean on, everything depends on the writing and the spacing, and a slack paragraph has nowhere to hide.",
  },
  {
    id: "pixel",
    name: "8-bit",
    tagline: "Chunky pixels, limited palette",
    what: [
      "Shadows have zero blur and integer offsets — a hard block displaced four pixels down and right, plus a two-pixel outline. Nothing is soft.",
      "Icons render with antialiasing off, so a diagonal stroke shows its staircase instead of smoothing it.",
      "A faint one-pixel lattice runs across the page at 3% white, the scan of a display that never quite resolved.",
    ],
    origin: [
      "The home computers and consoles of roughly 1983 to 1990, where the look was not a style but a consequence of hardware: fixed palettes held in ROM, a hard cap on colours per sprite and per scanline, no antialiasing, and an integer pixel grid with no subpixel positioning.",
      "What reads today as a deliberate aesthetic was, at the time, simply the only thing the machine could draw.",
    ],
    characteristics: [
      "Hard offset shadows, zero blur, integer displacement",
      "Antialiasing disabled on glyphs and icons",
      "Zero radius; two-pixel strokes; square terminals",
      "Small, high-contrast palette; monospace throughout",
    ],
    ratios: [
      { label: "Body text on ground", value: "14.78:1", note: "AAA" },
      { label: "Muted text on ground", value: "5.29:1", note: "AA" },
      { label: "Accent on ground", value: "11.43:1", note: "AAA" },
    ],
    tokens: [
      { label: "Ground", value: "#1a1c2c" },
      { label: "Ink", value: "#f0f0f0" },
      { label: "Muted", value: "#8b8fa8" },
      { label: "Accent", value: "#ffcd75" },
      { label: "Shadow", value: "4px 4px 0 #0f1119" },
      { label: "Radius", value: "0" },
    ],
    corrections: [],
    tradeoff:
      "Disabling antialiasing is honest to the reference and slightly worse to read at small sizes on a high-density display, where the hardware is perfectly capable of smoothing the edge and is being told not to.",
  },
];

/** Applies to all four, so it belongs beside them rather than inside each. */
export const designSystemNotes = [
  "A theme changes surface treatment, radius, type, and pattern. It never changes layout, spacing, or copy — the page is the same page in all four, which is the only reason four of them is maintainable.",
  "Each theme is a set of CSS custom property overrides under a `data-kj-theme` attribute. No component is forked, and adding a fifth theme means adding one block, not touching any component.",
  "`.surface` is the single themed primitive. Each theme decides what raised *means* — an extrusion, a hairline ring, a black rule, or a hard offset block — and every card on the site inherits that decision.",
  "One theme is chosen at random on each visit and held for the session. Choosing one explicitly pins it.",
  "All four were audited in a browser across every text element on seven pages: 0 failures against WCAG AA.",
];
