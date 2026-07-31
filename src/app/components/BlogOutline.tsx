"use client";

import { Outline } from "@astryxdesign/core/Outline";
import type { OutlineItem } from "@/lib/blog";

/**
 * Table of contents for a post. Sticky on wide screens, hidden on narrow ones
 * where it would push the article below the fold.
 *
 * `offset` matches the sticky header height so a heading lands below the header
 * rather than underneath it, and so scroll-spy activates at the same line.
 */
export default function BlogOutline({ items }: { items: OutlineItem[] }) {
  if (items.length < 3) return null; // A two-item contents list is just noise.

  return (
    <nav
      aria-label="On this page"
      className="hidden xl:block sticky top-28 self-start w-56 shrink-0"
    >
      <p
        className="text-xs uppercase mb-3"
        style={{
          color: "var(--muted)",
          letterSpacing: "0.16em",
          fontFamily: "var(--font-code)",
        }}
      >
        On this page
      </p>
      <Outline items={items} density="compact" label="On this page" offset={92} />
    </nav>
  );
}
