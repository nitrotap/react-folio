import Link from "next/link";
import { Divider } from "@astryxdesign/core/Divider";
import PageHeader from "../components/PageHeader";
import JsonLd from "../components/JsonLd";
import ProofExplorer from "../components/ProofExplorer";
import HarnessBrowser from "../components/HarnessBrowser";
import { BoundedSpace } from "../components/Glyphs";
import { ArrowRight, Files, IconChip, Proof, Shield } from "../components/Icons";
import { verification, pillars } from "@/data/site";
import { harnesses } from "@/data/harnesses";
import {
  pageMetadata,
  breadcrumbSchema,
  authorNode,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Verification",
  description: `${verification.harnessCount} Kani proof harnesses across ${verification.fileCount} files, over index bounds, totality, and structural invariants — with Miri as the undefined-behaviour backstop and scipy-referenced golden fixtures for the numerics.`,
  path: "/verification",
  keywords: [
    "Kani",
    "Miri",
    "bounded model checking",
    "formal verification",
    "Rust",
    ...pillars
      .filter((p) => p.slug === "formal-verification")
      .map((p) => p.name),
    ...[...new Set(verification.proofs.map((p) => p.area))],
  ],
});

export default function VerificationPage() {
  const pillar = pillars.find((p) => p.slug === "formal-verification")!;

  return (
    <div className="w-full">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${SITE_URL}/verification#article`,
            url: `${SITE_URL}/verification`,
            headline: "Proof, where proof is possible",
            description: verification.summary,
            inLanguage: "en",
            author: authorNode(),
            isPartOf: { "@id": WEBSITE_ID },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_URL}/verification`,
            },
            about: [...new Set(verification.proofs.map((p) => p.area))],
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verification", path: "/verification" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="§ Formal verification"
        title="Proof, where proof is possible."
        lede={verification.summary}
      />

      <div className="max-w-4xl mx-auto pb-16">
        {/* Headline figures */}
        <div className="grid gap-4 sm:grid-cols-3 mb-14">
          {/* Three figures, three different glyphs — what is being counted
              differs in each case, so the marker carries something. */}
          {[
            { value: String(verification.harnessCount), label: "Kani proof harnesses", Icon: Proof },
            { value: String(verification.fileCount), label: "Files under proof", Icon: Files },
            { value: "0", label: "Unsafe blocks", Icon: Shield },
          ].map((stat) => (
            <div key={stat.label} className="surface p-6">
              <IconChip className="mb-4">
                <stat.Icon />
              </IconChip>
              <p className="text-4xl font-bold" style={{ fontFamily: "var(--font-code)" }}>
                {stat.value}
              </p>
              <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Why */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-5">Why model checking</h2>
          <div className="prose-body" style={{ color: "var(--muted)" }}>
            <p>
              A unit test tells you the function was right for the inputs you thought of. A bounded
              model checker tells you it is right for <em>every</em> input in a bounded space — or
              hands you the counterexample. For numeric code, where the failures live in index
              arithmetic and float edge cases nobody writes a test for, that difference is the whole
              argument.
            </p>
          </div>
          <div className="surface p-7 my-8 flex flex-wrap items-center gap-8 justify-center">
            <BoundedSpace className="w-[250px] h-auto" />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>
              Everything inside the dashed box is proven — every input, not a sample of them.
              The dots continuing past it are what the bound does not reach. Naming that edge is
              the difference between a proof and a claim.
            </p>
          </div>

          <ul className="flex flex-col gap-3 mt-6">
            {verification.notes.map((note, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden style={{ color: "var(--accent)" }}>
                  ·
                </span>
                <span style={{ color: "var(--muted)" }}>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* The proofs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2">Selected harnesses</h2>
          <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
            Names are quoted verbatim from the source. Filter by area, hover a name for the
            bounded space it is checked over, and click to copy it.
          </p>
          <ProofExplorer proofs={verification.proofs} />
        </section>

        {/* Real harnesses */}
        <section className="mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h2 className="text-2xl font-bold">What a harness looks like</h2>
          </div>
          <p className="text-sm mb-7 max-w-2xl" style={{ color: "var(--muted)" }}>
            Quoted verbatim, doc comments included — that is where the reasoning for each bound
            lives, and it is the part worth reading. Every one of these carves through to the
            published crate, so it can be checked rather than taken on trust.
          </p>
          <HarnessBrowser harnesses={harnesses} proofs={verification.proofs} />
        </section>

        <Divider variant="subtle" label="in practice" />

        {/* Practice */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5">In practice</h2>
          <ul className="flex flex-col gap-3">
            {pillar.detail.map((d, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden style={{ color: "var(--accent)" }}>
                  ·
                </span>
                <span style={{ color: "var(--muted)" }}>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="surface p-6 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            The suite lives in the yee-claw workspace; {verification.publicHarnessCount} of the{" "}
            {verification.harnessCount} harnesses carve through to the published stats-claw crate,
            where they are checkable.
          </p>
          <Link href="/projects/stats-claw" className="control px-4 py-2.5 text-sm">
            stats-claw <ArrowRight size="1em" className="kj-arrow kj-icon-inline" />
          </Link>
        </div>
      </div>
    </div>
  );
}
