/**
 * Icon set.
 *
 * One family, drawn flat, on a 16-unit grid. Nothing here is themed — the
 * geometry is identical in all four themes and only the *treatment* changes,
 * exactly the way `.surface` works. Stroke weight, cap, join, and rasterisation
 * come from `--kj-icon-*` (set per theme in globals.css) via the `.kj-icon`
 * class, so a glyph reads as a soft extruded mark in Neumorphism, a hairline in
 * Blueprint, a firm rule in Swiss, and a chunky aliased block in 8-bit — from
 * the same path data. Drawing four sets would have meant four sets to keep in
 * sync and four chances to get one wrong.
 *
 * Colour: `currentColor` for structure and `var(--kj-icon-accent)` for the one
 * detail worth picking out. That indirection exists so a context can override
 * the accent — Astryx's Badge carries its own tinted background and forces dark
 * text, and a theme accent inside it fights the tint, so badges flatten the
 * glyph to `currentColor` (see globals.css).
 *
 * Everything here is decorative: `aria-hidden`, `focusable="false"`, no title,
 * no accessible name. Every placement keeps a text label beside it, so meaning
 * survives with images off. Nothing is the sole carrier of a status.
 *
 * Coordinates are hard-coded, and children never set `stroke-width` — the
 * theme token is inherited from the root `<svg>`, and a child attribute would
 * silently win over it for that shape only.
 */

import type { CSSProperties, ReactNode } from "react";

export interface IconProps {
  className?: string;
  /** Rendered edge length. A number is px; a string passes through ("1em"). */
  size?: number | string;
  style?: CSSProperties;
}

function Icon({
  children,
  className = "",
  size = 20,
  style,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      style={style}
      className={`kj-icon ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      /* Fallback only — `.kj-icon` overrides it with the per-theme token, and a
         CSS declaration outranks a presentation attribute. */
      strokeWidth="1.25"
    >
      {children}
    </svg>
  );
}

const ACCENT = "var(--kj-icon-accent)";

/**
 * Turnstile and check: `⊢ ✓`, the sequent notation for "this is derivable".
 * A bare tick would say "done"; the turnstile says "proved", which is the whole
 * distinction this site is built on.
 */
export function Proof(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 2.5V13.5M3.5 8H6.5" />
      <path d="M8 9.1L10.1 11.6L14.2 4.2" stroke={ACCENT} />
    </Icon>
  );
}

/**
 * A bounded region inside a larger space — the small-format restatement of the
 * BoundedSpace figure. The dashed edge is the claim's boundary and the dots
 * outside it are the inputs the bound does not reach, so the glyph marks a
 * bounded proof rather than a universal one.
 */
export function Bound(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="1.75" y="2.25" width="8" height="8" strokeDasharray="2 1.5" stroke={ACCENT} />
      <g fill="currentColor" stroke="none">
        <rect x="11.4" y="3" width="1.6" height="1.6" />
        <rect x="11.4" y="6.6" width="1.6" height="1.6" />
        <rect x="11.4" y="10.2" width="1.6" height="1.6" />
        <rect x="7.8" y="12.4" width="1.6" height="1.6" />
        <rect x="4.2" y="12.4" width="1.6" height="1.6" />
      </g>
    </Icon>
  );
}

/**
 * Bars against a dashed threshold. Not a plain bar chart: the threshold line is
 * the point — evaluation is measurement against a bar you set in advance, and
 * exactly one bar clears it.
 */
export function Measure(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 13.5H14" />
      <path d="M4.75 13.5V9.5M8 13.5V5.25M11.25 13.5V11" />
      <path d="M2 7.6H14" stroke={ACCENT} strokeDasharray="2 1.5" />
    </Icon>
  );
}

/**
 * A root entity with two subtypes. Squares rather than circles, and a strict
 * hierarchy rather than a mesh, because the thing being drawn is an ontology —
 * a lattice a reasoner walks — not a neural net.
 */
export function Graph(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5.25L4 10.9M8 5.25L12 10.9" />
      <rect x="6.5" y="2.15" width="3" height="3" fill={ACCENT} />
      <rect x="2.5" y="10.9" width="3" height="3" />
      <rect x="10.5" y="10.9" width="3" height="3" />
    </Icon>
  );
}

/** Head, antenna, two lit eyes. The one glyph in the set allowed a character. */
export function Agent(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5.4V3.4" />
      <rect x="7" y="1.5" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="2.9" y="5.4" width="10.2" height="8.1" />
      <g fill={ACCENT} stroke="none">
        <rect x="5.3" y="8.1" width="1.7" height="2.1" />
        <rect x="9" y="8.1" width="1.7" height="2.1" />
      </g>
    </Icon>
  );
}

/** Two sheets, the front one ruled. Files, in the "files under proof" sense. */
export function Files(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.6 4.1V2.4H13.6V11.4H12" />
      <rect x="2.4" y="4.4" width="9.6" height="9.2" />
      <path d="M4.9 7.6H9.5M4.9 10.4H9.5" stroke={ACCENT} />
    </Icon>
  );
}

/**
 * Shield with a check. Hexagonal rather than the usual curved crest — a curve
 * would be the only one in the set, and it survives 8-bit rasterisation badly.
 */
export function Shield(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 1.8L13.4 4.1V8.5L8 14.1L2.6 8.5V4.1L8 1.8Z" />
      <path d="M5.7 8L7.3 9.6L10.4 6.1" stroke={ACCENT} />
    </Icon>
  );
}

/** `< / >`. Source, in any of them. */
export function Code(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.3 4.4L1.8 8L5.3 11.6M10.7 4.4L14.2 8L10.7 11.6" />
      <path d="M9.3 3L6.7 13" stroke={ACCENT} />
    </Icon>
  );
}

/** A framed panel with a chrome bar. Application surface, i.e. the web work. */
export function Browser(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="1.8" y="2.6" width="12.4" height="10.8" />
      <path d="M1.8 6H14.2" />
      <rect x="3.3" y="3.7" width="1.6" height="1.6" fill={ACCENT} stroke="none" />
    </Icon>
  );
}

/** A ruled table with the first cell filled. Rows, columns, and a key. */
export function Dataset(props: IconProps) {
  return (
    <Icon {...props}>
      {/* First cell, drawn under the rules so the grid stays on top of it. */}
      <rect x="2" y="2.6" width="4.4" height="3.6" fill={ACCENT} stroke="none" />
      <rect x="2" y="2.6" width="12" height="10.8" />
      <path d="M2 6.2H14M2 9.8H14M6.4 2.6V13.4" />
    </Icon>
  );
}

/** Three plates, the top one live. Environments stacked under a deployment. */
export function Layers(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="2.3" width="12" height="3.2" fill={ACCENT} />
      <rect x="2" y="6.4" width="12" height="3.2" />
      <rect x="2" y="10.5" width="12" height="3.2" />
    </Icon>
  );
}

/**
 * A normal density on an axis with one tail cut off. The dashed rule is a
 * critical value — the line every hypothesis test is arguing about — which is
 * what makes this statistics rather than a generic "chart" glyph.
 */
export function Distribution(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1 13.4H15" />
      <path d="M2 13.4C5 13.4 5 3.4 8 3.4C11 3.4 11 13.4 14 13.4" />
      <path d="M11 13.4V8.4" stroke={ACCENT} strokeDasharray="2 1.5" />
    </Icon>
  );
}

/** Closed padlock. Private work — described, not linked. */
export function Lock(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.3 6.9V4.8C5.3 3.3 6.5 2.1 8 2.1C9.5 2.1 10.7 3.3 10.7 4.8V6.9" />
      <rect x="2.8" y="6.9" width="10.4" height="6.9" />
      <rect x="7.1" y="9" width="1.8" height="2.7" fill={ACCENT} stroke="none" />
    </Icon>
  );
}

/** Tag with an eyelet. Topics, not statuses. */
export function Tag(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.4 2.7H8.8L13.7 8L8.8 13.3H2.4Z" />
      <rect x="4.4" y="7" width="2" height="2" fill={ACCENT} stroke="none" />
    </Icon>
  );
}

/**
 * Lens and handle. The one round shape in the set after `Distribution`'s curve,
 * and for the same reason: the circle is what makes the glyph a magnifier
 * rather than a lollipop, so recognisability wins over the flat-sided rule the
 * Shield follows. 8-bit renders it `crispEdges`, which stair-steps the ring —
 * that is the theme working, not the glyph failing. The handle is drawn from
 * the rim outward so the two strokes meet rather than overlap, which keeps the
 * join clean at the 2px weight.
 */
export function Search(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="6.9" cy="6.9" r="4.4" />
      <path d="M10.2 10.2L13.8 13.8" stroke={ACCENT} />
    </Icon>
  );
}

/**
 * Inline direction glyphs. These replace the literal `→ ↗ ←` characters that
 * used to sit in link text: two themes set a monospace body font and two a
 * proportional one, and the arrow characters render at visibly different
 * weights and baselines between them. A drawn arrow is the same arrow
 * everywhere and picks up the theme's stroke weight like the rest of the set.
 * They carry no accent — they live inside coloured link text.
 */
export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 8H13M9.2 4.2L13 8L9.2 11.8" />
    </Icon>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13.5 8H3M6.8 4.2L3 8L6.8 11.8" />
    </Icon>
  );
}

/** Arrow leaving the frame: this link goes off-site. */
export function External(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.4 11.6L11.8 4.2M6.2 4.2H11.8V9.8" />
    </Icon>
  );
}

/**
 * The themed container. This is where neumorphism actually happens: the chip
 * takes the same `--surface-raised-sm` and `--kj-radius-sm` that buttons do, so
 * it extrudes on the soft theme, becomes a hairline square on Swiss, a thin
 * cyan rule on Blueprint, and a hard offset block on 8-bit — while the glyph
 * inside it never changes.
 */
export function IconChip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`icon-chip ${className}`.trim()} aria-hidden="true">
      {children}
    </span>
  );
}
