import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@astryxdesign/core/Badge";
import { Divider } from "@astryxdesign/core/Divider";
import PageHeader from "../../components/PageHeader";
import { projects, getProject } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="w-full">
      <PageHeader
        eyebrow={`${project.period}${project.status === "private" ? " · private" : ""}`}
        title={project.name}
        lede={project.summary}
      >
        <p className="mt-4 text-base" style={{ color: "var(--accent)" }}>
          {project.tagline}
        </p>
      </PageHeader>

      <div className="max-w-4xl mx-auto pb-16">
        {project.highlights && project.highlights.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-3 mb-12">
            {project.highlights.map((h) => (
              <div key={h.label} className="surface p-5">
                <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-code)" }}>
                  {h.value}
                </p>
                <p className="text-xs mt-1.5" style={{ color: "var(--muted)" }}>
                  {h.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5">Detail</h2>
          <ul className="flex flex-col gap-4">
            {project.detail.map((d, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden style={{ color: "var(--accent)" }}>
                  ·
                </span>
                <span style={{ color: "var(--muted)" }}>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <Divider variant="subtle" />

        <section className="mb-12 mt-12">
          <h2 className="text-xl font-bold mb-5">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s} variant="blue" label={s} />
            ))}
          </div>
        </section>

        {project.links.length > 0 ? (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-5">Links</h2>
            <div className="flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="control px-4 py-2.5 text-sm"
                >
                  {l.label} <span className="kj-arrow">↗</span>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <div className="surface-inset p-5 mb-12">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              This work is in a private repository. Happy to talk through the architecture.
            </p>
          </div>
        )}

        <Link href="/projects" className="text-sm" style={{ color: "var(--accent)" }}>
          ← All projects
        </Link>
      </div>
    </div>
  );
}
