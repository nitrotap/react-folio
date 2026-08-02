import Link from "next/link";
import { profile, pillars, projects, verification, skillGroups } from "@/data/site";
import { getAllPosts, formatDate } from "@/lib/blog";
import { pageMetadata, personSchema, websiteSchema } from "@/lib/seo";
import JsonLd from "./components/JsonLd";
import { NormalCurve } from "./components/Glyphs";
import { Crab } from "./components/Crab";
import {
  Agent,
  ArrowRight,
  Dataset,
  Graph,
  IconChip,
  Layers,
  Lock,
  Measure,
  Proof,
  type IconProps,
} from "./components/Icons";

/**
 * The home page carries the site-level `Person` and `WebSite` nodes. Every
 * other page's structured data references them by `@id`, and each reference
 * also carries enough inline detail to stand on its own.
 */
export const metadata = pageMetadata({
  // Absolute, so this does not collide with the root layout's default title —
  // which is what the 404 page falls back to.
  absoluteTitle: `${profile.name} — ${profile.focus}`,
  title: profile.name,
  description:
    "Kani proof harnesses over Rust numerics, a TypeDB ontology compiled into a Rust type layer, fine-tuned small models and the evaluation harnesses that measure them.",
  path: "/",
  keywords: [
    profile.name,
    profile.handle,
    ...pillars.map((p) => p.name),
    ...projects.map((p) => p.name),
    ...skillGroups.slice(0, 3).map((g) => g.name),
  ],
});

/**
 * One glyph per pillar, and they are all different — that is the only reason
 * they earn the space. A repeated marker on every card would be decoration.
 * Keyed by slug so a content change surfaces as a missing icon rather than a
 * silently wrong one.
 */
const PILLAR_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  "formal-verification": Proof,
  "ai-security-and-evaluation": Measure,
  "symbolic-grounding": Graph,
  "agents-and-harnesses": Agent,
  "data-mining": Dataset,
  platforms: Layers,
};

export default function Home() {
  const featured = projects.filter((p) =>
    ["stats-claw", "yee-claw", "cobol-coder", "coboleval"].includes(p.slug),
  );
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <JsonLd data={[personSchema(), websiteSchema()]} />

      {/* Hero */}
      <section className="pt-14 pb-16 md:pt-24 md:pb-24 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
        <p
          className="text-xs uppercase mb-6 kj-rule kj-enter"
          style={{
            color: "var(--accent)",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-code)",
          }}
        >
          {profile.role} · {profile.location}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-balance kj-enter kj-enter-1">
          {profile.thesis}
        </h1>
        <p
          className="mt-5 text-xl md:text-2xl kj-enter kj-enter-2"
          style={{ color: "var(--accent)" }}
        >
          {profile.tagline}
        </p>
        <p
          className="mt-7 text-lg md:text-xl leading-relaxed max-w-2xl kj-enter kj-enter-3"
          style={{ color: "var(--muted)" }}
        >
          {profile.lede}
        </p>
        <div className="mt-10 flex flex-wrap gap-3 kj-enter kj-enter-4">
          <Link href="/verification" className="control px-5 py-3 text-sm font-medium">
            See the proofs{" "}
            <ArrowRight size="1em" className="kj-arrow kj-icon-inline" />
          </Link>
          <Link href="/projects" className="kj-link px-5 py-3 text-sm" style={{ color: "var(--muted)" }}>
            Selected work
          </Link>
        </div>
        </div>
        <Crab className="hidden lg:block w-[280px] h-auto shrink-0" />
      </section>

      {/* Pillars */}
      <section className="py-14" style={{ borderTop: "1px solid var(--color-border)" }}>
        <h2 className="text-sm uppercase mb-8" style={{ letterSpacing: "0.16em", color: "var(--muted)" }}>
          What I work on
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p) => {
            const PillarIcon = PILLAR_ICONS[p.slug];
            return (
            <article key={p.slug} className="surface p-6 kj-reveal">
              {PillarIcon && (
                <IconChip className="mb-4">
                  <PillarIcon />
                </IconChip>
              )}
              <p
                className="text-xs uppercase mb-3"
                style={{ color: "var(--accent)", letterSpacing: "0.14em", fontFamily: "var(--font-code)" }}
              >
                {p.kicker}
              </p>
              <h3 className="text-xl font-semibold mb-3">{p.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {p.summary}
              </p>
            </article>
            );
          })}
        </div>
      </section>

      {/* Verification teaser */}
      <section className="py-14" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="surface p-8 md:p-10">
          <p
            className="text-xs uppercase mb-4"
            style={{ color: "var(--accent)", letterSpacing: "0.16em", fontFamily: "var(--font-code)" }}
          >
            Formal verification
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 max-w-xl text-balance">
            {verification.harnessCount} proof harnesses, across {verification.fileCount} files.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-7" style={{ color: "var(--muted)" }}>
            {verification.summary}
          </p>
          <ul className="grid gap-2 mb-8 scroll-x">
            {verification.proofs.slice(0, 4).map((proof) => (
              <li key={proof.name} className="text-sm">
                <code
                  style={{
                    fontFamily: "var(--font-code)",
                    color: "var(--ink)",
                  }}
                >
                  {proof.name}
                </code>
                <span style={{ color: "var(--muted)" }}> — {proof.establishes}</span>
              </li>
            ))}
          </ul>
          <Link href="/verification" className="control px-4 py-2.5 text-sm inline-block">
            All {verification.proofs.length} shown{" "}
            <ArrowRight size="1em" className="kj-arrow kj-icon-inline" />
          </Link>
        </div>
      </section>

      {/* Selected work */}
      <section className="py-14" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-sm uppercase" style={{ letterSpacing: "0.16em", color: "var(--muted)" }}>
            Selected work
          </h2>
          <Link href="/projects" className="text-sm" style={{ color: "var(--accent)" }}>
            All projects <ArrowRight size="1em" className="kj-arrow kj-icon-inline" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="surface-interactive p-6 block kj-reveal">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {/* The word carries the status; the padlock only reinforces it,
                    so nothing is lost with images off. */}
                {p.status === "private" && (
                  <span
                    className="text-xs inline-flex items-center gap-1.5"
                    style={{ color: "var(--muted)" }}
                  >
                    <Lock size={13} />
                    private
                  </span>
                )}
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--accent)" }}>
                {p.tagline}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {p.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <NormalCurve className="w-full max-w-md mx-auto opacity-70 kj-reveal" />

      {/* Writing */}
      {posts.length > 0 && (
        <section className="py-14" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-sm uppercase" style={{ letterSpacing: "0.16em", color: "var(--muted)" }}>
              Writing
            </h2>
            <Link href="/blog" className="text-sm" style={{ color: "var(--accent)" }}>
              All posts <ArrowRight size="1em" className="kj-arrow kj-icon-inline" />
            </Link>
          </div>
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="surface-interactive p-5 block kj-reveal">
                  <p className="text-xs mb-2" style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}>
                    {formatDate(post.date)} · {post.readingMinutes} min
                  </p>
                  <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
