import Link from "next/link";
import { Badge } from "@astryxdesign/core/Badge";
import PageHeader from "../components/PageHeader";
import JsonLd from "../components/JsonLd";
import { Lock } from "../components/Icons";
import { projects } from "@/data/site";
import { pageMetadata, breadcrumbSchema, collectionPageSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected work — verified numerics in Rust, ontology-driven code generation, model fine-tuning and evaluation, and production platform engineering.",
  path: "/projects",
  keywords: [
    ...projects.map((p) => p.name),
    ...[...new Set(projects.flatMap((p) => p.stack))],
  ],
});

export default function ProjectsPage() {
  return (
    <div className="w-full">
      <JsonLd
        data={[
          collectionPageSchema({
            name: "Projects",
            description:
              "Selected work — verified numerics in Rust, ontology-driven code generation, model fine-tuning and evaluation, and production platform engineering.",
            path: "/projects",
            items: projects.map((p) => ({
              name: p.name,
              path: `/projects/${p.slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="§ Selected work"
        title="Projects"
        lede="Public artefacts are linked. Private work is described but not linked — the capability is the claim, not the repository."
      />

      <div className="max-w-4xl mx-auto pb-16">
        <ul className="flex flex-col gap-5">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="surface-interactive p-7 block kj-reveal">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <span className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}>
                      {p.period}
                    </span>
                    {/* Only the private ones are badged — a "public" badge on
                        every other row would be noise, and the padlock sits
                        beside the word rather than replacing it. */}
                    {p.status === "private" && (
                      <Badge variant="neutral" label="private" icon={<Lock size={13} />} />
                    )}
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
                    <Badge key={s} variant="blue" label={s} />
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
