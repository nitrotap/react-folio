import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@astryxdesign/core/Badge";
import { Divider } from "@astryxdesign/core/Divider";
import PageHeader from "../../components/PageHeader";
import JsonLd from "../../components/JsonLd";
import TopicLink from "../../components/TopicLink";
import { ArrowLeft, External, Lock } from "../../components/Icons";
import { projects, getProject } from "@/data/site";
import { getAllTagSummaries, tagSlug } from "@/lib/blog";
import { pageMetadata, breadcrumbSchema, projectSchema } from "@/lib/seo";

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
  return pageMetadata({
    title: project.name,
    // The tagline is the one-line claim and the summary is the evidence for it;
    // together they read as a real sentence and stay unique per project.
    description: `${project.tagline}. ${project.summary}`,
    path: `/projects/${project.slug}`,
    type: "article",
    keywords: [project.name, project.tagline, ...project.stack],
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  /*
    A stack entry becomes a link only when a post is actually filed under it.
    The two vocabularies overlap but are not the same list — "Rust" and "Kani"
    are both, "SplitMix64" and "Ansible" are only ever stack entries — so
    linking every chip would produce dead ends, and linking none would hide a
    real route from a project to the writing about it. Matched on the tag slug
    so "TypeDB" finds `typedb` without either side having to be respelled.
  */
  const topicBySlug = new Map(getAllTagSummaries().map((t) => [t.slug, t]));
  const stack = project.stack.map((entry) => ({
    entry,
    topic: topicBySlug.get(tagSlug(entry)) ?? null,
  }));
  const linkedCount = stack.filter((s) => s.topic).length;

  return (
    <div className="w-full">
      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.name, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
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
            {stack.map(({ entry, topic }) =>
              topic ? (
                <TopicLink key={entry} tag={topic.tag} text={entry} variant="blue" />
              ) : (
                <Badge key={entry} variant="blue" label={entry} />
              ),
            )}
          </div>
          {linkedCount > 0 && (
            <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
              Underlined entries link to the writing on that topic.
            </p>
          )}
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
                  {l.label} <External size="1em" className="kj-arrow kj-icon-inline" />
                </a>
              ))}
            </div>
          </section>
        ) : (
          <div className="surface-inset p-5 mb-12 flex items-start gap-3">
            <Lock className="mt-0.5" style={{ color: "var(--muted)" }} />
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              This work is in a private repository. Happy to talk through the architecture.
            </p>
          </div>
        )}

        <Link
          href="/projects"
          className="text-sm inline-flex items-center gap-2"
          style={{ color: "var(--accent)" }}
        >
          <ArrowLeft size="1em" className="kj-icon-inline" />
          All projects
        </Link>
      </div>
    </div>
  );
}
