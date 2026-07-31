import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@astryxdesign/core/CodeBlock";
import { Divider } from "@astryxdesign/core/Divider";
import { Badge } from "@astryxdesign/core/Badge";
import PageHeader from "../components/PageHeader";
import ProofExplorer from "../components/ProofExplorer";
import { BoundedSpace } from "../components/Glyphs";
import { verification, pillars } from "@/data/site";

/**
 * Representative of the harness shape, not a verbatim quote from the source —
 * the crate is public, so an invented-but-plausible snippet presented as real
 * would be checkable and wrong. This shows the pattern the suite uses.
 */
const HARNESS = `#[cfg(kani)]
mod verification {
    use super::*;

    #[kani::proof]
    fn resampling_permutation_is_bijection() {
        let n: usize = kani::any();
        kani::assume(n > 0 && n <= 4);

        let idx = permutation_indices(n, &mut seeded_rng());

        // Every position is hit exactly once.
        let mut seen = [false; 4];
        for &i in idx.iter() {
            assert!(i < n);
            assert!(!seen[i]);
            seen[i] = true;
        }
    }
}`;

export const metadata: Metadata = {
  title: "Verification",
  description:
    "Formal verification of numeric code with Kani — proof harnesses over index bounds, totality, and structural invariants, backed by Miri and reference-equivalence testing.",
};

export default function VerificationPage() {
  const pillar = pillars.find((p) => p.slug === "formal-verification")!;

  return (
    <div className="w-full">
      <PageHeader
        eyebrow="§ Formal verification"
        title="Proof, where proof is possible."
        lede={verification.summary}
      />

      <div className="max-w-4xl mx-auto pb-16">
        {/* Headline figures */}
        <div className="grid gap-4 sm:grid-cols-3 mb-14">
          {[
            { value: String(verification.harnessCount), label: "Kani proof harnesses" },
            { value: String(verification.fileCount), label: "Files under proof" },
            { value: "0", label: "Unsafe blocks" },
          ].map((stat) => (
            <div key={stat.label} className="surface p-6">
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

        {/* What one looks like */}
        <section className="mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h2 className="text-2xl font-bold">What a harness looks like</h2>
            <Badge variant="neutral" label="representative" />
          </div>
          <p className="text-sm mb-6 max-w-2xl" style={{ color: "var(--muted)" }}>
            The bound is the honest part. Four elements is a small space — but it is{" "}
            <em>every</em> arrangement of four, which is a different kind of statement from a
            thousand random draws of a hundred.
          </p>
          <CodeBlock
            code={HARNESS}
            language="rust"
            title="resampling/verification.rs"
            hasLineNumbers
            maxHeight={420}
          />
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
            stats-claw →
          </Link>
        </div>
      </div>
    </div>
  );
}
