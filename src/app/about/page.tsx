import Link from "next/link";
import Image from "next/image";
import PageHeader from "../components/PageHeader";
import JsonLd from "../components/JsonLd";
import { External } from "../components/Icons";
import { profile, pillars } from "@/data/site";
import {
  pageMetadata,
  breadcrumbSchema,
  profilePageSchema,
  PORTRAIT_PATH,
  PORTRAIT_SIZE,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  // Not `profile.lede` — that is the root layout's default description, which
  // the 404 page also falls back to, and three pages sharing a description is
  // exactly the drift this file exists to avoid.
  description:
    "A master's in statistics, Epic from 2011 to 2013, a long way round, and now ontologies, reasoning agents, and the proofs and evaluations that say whether any of it works.",
  path: "/about",
  type: "profile",
  keywords: [
    profile.name,
    profile.handle,
    profile.role,
    profile.location,
    ...pillars.map((p) => p.name),
  ],
});

export default function AboutPage() {
  return (
    <div className="w-full">
      <JsonLd
        data={[
          profilePageSchema("/about"),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <PageHeader eyebrow={`${profile.role} · ${profile.location}`} title="About" lede={profile.thesis} />

      <div className="max-w-4xl mx-auto pb-16">
        <section className="mb-14 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
          {/* `surface` so the frame re-themes with everything else — extruded
              under Neumorphism, hairline under Blueprint, hard-offset under
              8-bit. The radius comes from a token for the same reason: Swiss
              squares its corners and a hardcoded value would ignore that.
              `unoptimized` is set globally in next.config.ts, so the source is
              already at its display size and only ever scales down. */}
          <div
            className="surface p-2 shrink-0 mx-auto sm:mx-0"
            style={{ borderRadius: "var(--kj-radius-lg)" }}
          >
            <Image
              src={PORTRAIT_PATH}
              alt={`${profile.name}, ${profile.role}`}
              width={PORTRAIT_SIZE}
              height={PORTRAIT_SIZE}
              sizes="(max-width: 640px) 60vw, 220px"
              priority
              className="w-[180px] sm:w-[220px] h-auto"
              style={{ borderRadius: "var(--kj-radius-lg)" }}
            />
          </div>
          <div className="prose-body" style={{ color: "var(--muted)" }}>
            {profile.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-8">Things I work on</h2>
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
                className="control px-4 py-2.5 text-sm inline-flex items-center gap-2"
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {l.label}
                <External size="1em" className="kj-arrow kj-icon-inline" />
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
