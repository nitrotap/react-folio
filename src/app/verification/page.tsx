import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { verification, pillars } from "@/data/site";

export const metadata: Metadata = {
  title: "Verification",
  description:
    "Formal verification of numeric code with Kani — proof harnesses over index bounds, totality, and structural invariants, backed by Miri and reference-equivalence testing.",
};

export default function VerificationPage() {
  const pillar = pillars.find((p) => p.slug === "formal-verification")!;
  const areas = [...new Set(verification.proofs.map((p) => p.area))];

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
            Names are quoted verbatim from the source. Each states an invariant the checker
            establishes over all inputs in its bounded space.
          </p>

          <div className="flex flex-col gap-10">
            {areas.map((area) => (
              <div key={area}>
                <h3
                  className="text-xs uppercase mb-4"
                  style={{
                    letterSpacing: "0.16em",
                    color: "var(--accent)",
                    fontFamily: "var(--font-code)",
                  }}
                >
                  {area}
                </h3>
                <ul className="flex flex-col gap-3">
                  {verification.proofs
                    .filter((p) => p.area === area)
                    .map((proof) => (
                      <li key={proof.name} className="surface p-5">
                        <p className="scroll-x">
                          <code
                            className="text-sm font-semibold"
                            style={{ fontFamily: "var(--font-code)", color: "var(--ink)" }}
                          >
                            {proof.name}
                          </code>
                        </p>
                        <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                          {proof.establishes}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

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
