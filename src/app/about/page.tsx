import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { profile, pillars } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: profile.lede,
};

export default function AboutPage() {
  return (
    <div className="w-full">
      <PageHeader eyebrow={`${profile.role} · ${profile.location}`} title="About" lede={profile.thesis} />

      <div className="max-w-4xl mx-auto pb-16">
        <section className="prose-body mb-14" style={{ color: "var(--muted)" }}>
          {profile.summary.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-8">Three things I work on</h2>
          <div className="flex flex-col gap-5">
            {pillars.map((p) => (
              <article key={p.slug} className="surface p-7">
                <p
                  className="text-xs uppercase mb-3"
                  style={{
                    color: "var(--accent)",
                    letterSpacing: "0.14em",
                    fontFamily: "var(--font-code)",
                  }}
                >
                  {p.kicker}
                </p>
                <h3 className="text-xl font-semibold mb-3">{p.name}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                  {p.summary}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {p.detail.map((d, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span aria-hidden style={{ color: "var(--accent)" }}>
                        ·
                      </span>
                      <span style={{ color: "var(--muted)" }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Elsewhere</h2>
          <div className="flex flex-wrap gap-3">
            {profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="control px-4 py-2.5 text-sm"
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm" style={{ color: "var(--muted)" }}>
            Also:{" "}
            <Link href="/experience" style={{ color: "var(--accent)" }}>
              experience
            </Link>
            {", "}
            <Link href="/education" style={{ color: "var(--accent)" }}>
              education
            </Link>
            {", and "}
            <Link href="/skills" style={{ color: "var(--accent)" }}>
              skills
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
