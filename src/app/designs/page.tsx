import { Badge } from "@astryxdesign/core/Badge";
import { Divider } from "@astryxdesign/core/Divider";
import PageHeader from "../components/PageHeader";
import JsonLd from "../components/JsonLd";
import DesignPreview from "../components/DesignPreview";
import { designs, designSystemNotes } from "@/data/designs";
import { profile } from "@/data/site";
import { pageMetadata, breadcrumbSchema, collectionPageSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Designs",
  description:
    "The four themes this site ships in — neumorphism, blueprint, Swiss, and 8-bit — what each does, where it comes from, and the contrast corrections each needed to pass WCAG AA.",
  path: "/designs",
  keywords: [
    profile.name,
    "design system",
    "theming",
    "accessibility",
    "WCAG",
    ...designs.map((d) => d.name),
  ],
});

export default function DesignsPage() {
  return (
    <div className="w-full">
      <JsonLd
        data={[
          collectionPageSchema({
            name: "Designs",
            description:
              "The four themes this site ships in, documented: origin, characteristics, tokens, and measured contrast.",
            path: "/designs",
            items: designs.map((d) => ({ name: d.name, path: "/designs" })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Designs", path: "/designs" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="§ Design system"
        title="Four ways to draw the same page"
        lede="This site ships in four themes, one picked at random each visit. They change surface treatment, radius, type, and pattern — never layout, never copy. Here is what each one is, where it comes from, and what it cost to make it readable."
      />

      <div className="max-w-4xl mx-auto pb-16">
        {/* How the system works */}
        <section className="surface p-7 mb-16">
          <h2 className="text-lg font-bold mb-5">How it works</h2>
          <ul className="flex flex-col gap-3">
            {designSystemNotes.map((note, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden style={{ color: "var(--accent)" }}>
                  ·
                </span>
                <span style={{ color: "var(--muted)" }}>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        {designs.map((d, i) => (
          <article key={d.id} className="mb-20 kj-reveal">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
              <h2 className="text-3xl font-bold tracking-tight">{d.name}</h2>
              <span
                className="text-sm"
                style={{ color: "var(--accent)", fontFamily: "var(--font-code)" }}
              >
                {d.tagline}
              </span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start mt-7">
              <div>
                <h3 className="text-xs uppercase mb-3" style={sectionLabel}>
                  What it does
                </h3>
                <ul className="flex flex-col gap-3 mb-9">
                  {d.what.map((t, n) => (
                    <li key={n} className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {t}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xs uppercase mb-3" style={sectionLabel}>
                  Where it comes from
                </h3>
                <ul className="flex flex-col gap-3 mb-9">
                  {d.origin.map((t, n) => (
                    <li key={n} className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {t}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xs uppercase mb-3" style={sectionLabel}>
                  Characteristics
                </h3>
                <div className="flex flex-wrap gap-2 mb-9">
                  {d.characteristics.map((c) => (
                    <Badge key={c} variant="blue" label={c} />
                  ))}
                </div>

                <h3 className="text-xs uppercase mb-3" style={sectionLabel}>
                  The trade-off
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {d.tradeoff}
                </p>
              </div>

              {/* Live specimen, rendered in this theme whatever the page is in */}
              <div className="lg:sticky lg:top-28">
                <DesignPreview theme={d.id} name={d.name} />
                <p
                  className="text-xs mt-3 text-center"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}
                >
                  live specimen — real tokens, not a mockup
                </p>
              </div>
            </div>

            {/* Tokens and measured contrast */}
            <div className="grid gap-5 md:grid-cols-2 mt-10">
              <div className="surface p-6">
                <h3 className="text-xs uppercase mb-4" style={sectionLabel}>
                  Tokens
                </h3>
                <dl className="flex flex-col gap-2">
                  {d.tokens.map((t) => (
                    <div key={t.label} className="flex items-baseline justify-between gap-4 text-sm">
                      <dt style={{ color: "var(--muted)" }}>{t.label}</dt>
                      <dd
                        className="text-right"
                        style={{ fontFamily: "var(--font-code)", color: "var(--ink)" }}
                      >
                        {t.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="surface p-6">
                <h3 className="text-xs uppercase mb-4" style={sectionLabel}>
                  Measured contrast
                </h3>
                <dl className="flex flex-col gap-2">
                  {d.ratios.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-4 text-sm">
                      <dt style={{ color: "var(--muted)" }}>{r.label}</dt>
                      <dd className="text-right whitespace-nowrap">
                        <span style={{ fontFamily: "var(--font-code)", color: "var(--ink)" }}>
                          {r.value}
                        </span>
                        {r.note && (
                          <span className="ml-2 text-xs" style={{ color: "var(--accent)" }}>
                            {r.note}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>
                  Measured in a browser against this theme&rsquo;s own ground, not computed from
                  the hex values.
                </p>
              </div>
            </div>

            {/* What had to change, and why */}
            {d.corrections.length > 0 && (
              <div className="surface-inset p-6 mt-5">
                <h3 className="text-xs uppercase mb-4" style={sectionLabel}>
                  Corrected from the source palette
                </h3>
                <ul className="flex flex-col gap-4">
                  {d.corrections.map((c) => (
                    <li key={c.token}>
                      <p className="text-sm flex flex-wrap items-baseline gap-2">
                        <span style={{ color: "var(--ink)" }}>{c.token}</span>
                        <span
                          style={{ fontFamily: "var(--font-code)", color: "var(--muted)" }}
                        >
                          {c.from} ({c.fromRatio})
                        </span>
                        <span aria-hidden style={{ color: "var(--muted)" }}>
                          →
                        </span>
                        <span style={{ fontFamily: "var(--font-code)", color: "var(--accent)" }}>
                          {c.to} ({c.toRatio})
                        </span>
                      </p>
                      <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                        {c.why}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {i < designs.length - 1 && (
              <div className="mt-16">
                <Divider variant="subtle" />
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

const sectionLabel: React.CSSProperties = {
  letterSpacing: "0.16em",
  color: "var(--muted)",
  fontFamily: "var(--font-code)",
};
