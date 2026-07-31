import Link from "next/link";
import { Badge } from "@astryxdesign/core/Badge";
import { tagSlug } from "@/lib/blog";

/**
 * A topic, as a link to everything under it.
 *
 * The chip is an Astryx Badge inside a Link rather than a restyled anchor. The
 * badge's tint and its forced dark text are already contrast-checked in all
 * four themes (see the Badge rules in globals.css), so wrapping it keeps that
 * work and adds only the affordances a link needs: the shared focus ring, and a
 * hover ring drawn in the theme accent. Colouring the badge myself would have
 * meant re-deriving four palettes for no gain.
 *
 * The badge text is the whole accessible name when no count is shown; with a
 * count, "agents · 4" is cryptic read aloud, so an explicit label spells it out.
 * The visible word is a prefix of that label, so WCAG 2.5.3 still holds.
 */
export default function TopicLink({
  tag,
  count,
  variant = "purple",
  isCurrent = false,
  text,
}: {
  tag: string;
  count?: number;
  variant?: "purple" | "teal" | "blue" | "neutral";
  /** The topic whose page we are already on: shown, but not a link to itself. */
  isCurrent?: boolean;
  /**
   * Display text, when the caller's word for the topic differs from the tag's.
   * A project's stack says "Rust" and "TypeDB"; the tags are `rust` and
   * `typedb`. The link resolves through the tag, but the chip keeps the
   * spelling the page authored — rewriting a stack list into lowercase to match
   * a slug would be the tail wagging the dog.
   */
  text?: string;
}) {
  const shown = text ?? tag;
  const label = count == null ? shown : `${shown} · ${count}`;

  if (isCurrent) {
    return (
      <span className="kj-topic kj-topic-current" aria-current="page">
        <Badge variant={variant} label={label} />
      </span>
    );
  }

  return (
    <Link
      href={`/blog/tag/${tagSlug(tag)}`}
      className="kj-topic"
      aria-label={
        count == null ? undefined : `${shown} — ${count} post${count === 1 ? "" : "s"}`
      }
    >
      <Badge variant={variant} label={label} />
    </Link>
  );
}
