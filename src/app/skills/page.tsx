import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { skillGroups } from "@/data/site";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Verification, AI engineering, symbolic knowledge representation, languages, web, data, infrastructure, and statistics.",
};

export default function SkillsPage() {
  return (
    <div className="w-full">
      <PageHeader
        eyebrow="§ Capabilities"
        title="Skills"
        lede="Grouped by what they are for rather than listed alphabetically — the grouping is the point."
      />

      <div className="max-w-4xl mx-auto pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g) => (
            <Link key={g.slug} href={`/skills/${g.slug}`} className="surface-interactive p-6 block">
              <h2 className="text-lg font-semibold mb-2">{g.name}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {g.summary}
              </p>
              <p className="text-xs" style={{ color: "var(--accent)", fontFamily: "var(--font-code)" }}>
                {g.items.length} items →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
