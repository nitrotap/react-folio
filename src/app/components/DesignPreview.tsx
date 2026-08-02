import { Proof } from "./Icons";
import type { ThemeId } from "@/lib/themes";

/**
 * A miniature of the site rendered in one theme, regardless of which theme the
 * page itself is in.
 *
 * `data-kj-preview` mirrors that theme's token block onto this element, so the
 * preview is the real thing — the same `.surface` primitive, the same radius
 * and shadow tokens, the same type — rather than a hand-drawn approximation
 * that could drift from the implementation.
 */
export default function DesignPreview({
  theme,
  name,
}: {
  theme: ThemeId;
  name: string;
}) {
  return (
    <div
      data-kj-preview={theme}
      role="img"
      aria-label={`Preview of the ${name} theme: a heading, body text, a card, and a button.`}
      className="p-6 overflow-hidden"
      style={{ borderRadius: "var(--kj-radius-lg)", border: "1px solid var(--color-border)" }}
    >
      <p
        className="text-[10px] uppercase mb-3"
        style={{
          color: "var(--accent)",
          letterSpacing: "0.2em",
          fontFamily: "var(--font-code)",
        }}
      >
        § Specimen
      </p>
      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--ink)" }}>
        Proof, not sampling
      </h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
        A test tells you the function was right for the inputs you thought of.
      </p>

      <div className="surface p-4 mb-4 flex items-start gap-3">
        <span className="icon-chip shrink-0">
          <Proof />
        </span>
        <div className="min-w-0">
          <p
            className="text-xs font-semibold truncate"
            style={{ color: "var(--ink)", fontFamily: "var(--font-code)" }}
          >
            moments_variance_non_negative
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Welford&rsquo;s update can never yield a negative variance.
          </p>
        </div>
      </div>

      <span className="control inline-block px-3 py-2 text-xs" style={{ color: "var(--ink)" }}>
        See the proofs
      </span>
    </div>
  );
}
