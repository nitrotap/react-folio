import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work — verified numerics in Rust, ontology-driven code generation, model fine-tuning and evaluation, and production platform engineering.",
};

export default function ProjectsPage() {
  return (
    <div className="w-full">
      <PageHeader
        eyebrow="§ Selected work"
        title="Projects"
        lede="Public artefacts are linked. Private work is described but not linked — the capability is the claim, not the repository."
      />

      <div className="max-w-4xl mx-auto pb-16">
        <ul className="flex flex-col gap-5">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="surface-interactive p-7 block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <span className="text-xs" style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}>
                    {p.period}
                    {p.status === "private" && " · private"}
                  </span>
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--accent)" }}>
                  {p.tagline}
                </p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                  {p.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 6).map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1"
                      style={{
                        color: "var(--muted)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--kj-radius-sm)",
                        fontFamily: "var(--font-code)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
