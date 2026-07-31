import Link from "next/link";
import { profile, pillars, projects, verification } from "@/data/site";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function Home() {
  const featured = projects.filter((p) =>
    ["stats-claw", "yee-claw", "cobol-coder", "coboleval"].includes(p.slug),
  );
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Hero */}
      <section className="pt-14 pb-16 md:pt-24 md:pb-24">
        <p
          className="text-xs uppercase mb-6"
          style={{
            color: "var(--accent)",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-code)",
          }}
        >
          {profile.role} · {profile.location}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-balance">
          {profile.thesis}
        </h1>
        <p
          className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ color: "var(--muted)" }}
        >
          {profile.lede}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/verification" className="control px-5 py-3 text-sm font-medium">
            See the proofs →
          </Link>
          <Link href="/projects" className="px-5 py-3 text-sm" style={{ color: "var(--muted)" }}>
            Selected work
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-14" style={{ borderTop: "1px solid var(--color-border)" }}>
        <h2 className="text-sm uppercase mb-8" style={{ letterSpacing: "0.16em", color: "var(--muted)" }}>
          What I work on
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.slug} className="surface p-6">
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
          ))}
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
            All {verification.proofs.length} shown →
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
            All projects →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="surface-interactive p-6 block">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.status === "private" && (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
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

      {/* Writing */}
      {posts.length > 0 && (
        <section className="py-14" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-sm uppercase" style={{ letterSpacing: "0.16em", color: "var(--muted)" }}>
              Writing
            </h2>
            <Link href="/blog" className="text-sm" style={{ color: "var(--accent)" }}>
              All posts →
            </Link>
          </div>
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="surface-interactive p-5 block">
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
