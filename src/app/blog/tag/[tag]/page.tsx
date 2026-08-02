import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import { pageMetadata, collectionPageSchema, breadcrumbSchema } from "@/lib/seo";
import { profile } from "@/data/site";
import PageHeader from "../../../components/PageHeader";
import PostCard from "../../../components/PostCard";
import TopicLink from "../../../components/TopicLink";
import { ArrowLeft, Tag } from "../../../components/Icons";
import { getAllTagSummaries, getPostsByTagSlug, getTagBySlug } from "@/lib/blog";

/**
 * Topic pages.
 *
 * URL shape: `/blog/tag/<slug>`, nested under the section whose content it
 * indexes. A top-level `/topics/<slug>` would read as a site-wide taxonomy, and
 * there isn't one — projects carry a stack, skills carry groups, and neither
 * vocabulary is this one. Nesting also means `SiteNav`'s existing
 * `pathname.startsWith('/blog/')` test already marks Writing as the current
 * section here, with no change to the nav.
 *
 * `tag` rather than a bare `/blog/<slug>` sibling because posts already own
 * that namespace: without the segment, a post slugged `rust` and a topic named
 * `rust` would collide, and which one won would depend on file ordering.
 *
 * Static export means every one of these is a real prerendered page — the whole
 * point of `generateStaticParams` here — so a topic URL is shareable and
 * crawlable rather than a client-side filter that only exists after JS runs.
 */
export function generateStaticParams() {
  return getAllTagSummaries().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const topic = getTagBySlug(tag);
  if (!topic) return {};
  const posts = getPostsByTagSlug(topic.slug);
  // Naming the posts makes the description specific to this topic rather than
  // a template with a number swapped in. Max count is 3, so it stays short.
  return pageMetadata({
    title: `${topic.tag} — writing`,
    description: `${topic.count} post${topic.count === 1 ? "" : "s"} tagged ${topic.tag}: ${posts
      .map((p) => p.title)
      .join("; ")}.`,
    path: `/blog/tag/${topic.slug}`,
    keywords: [topic.tag, profile.name, "writing"],
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const topic = getTagBySlug(tag);
  if (!topic) notFound();

  const posts = getPostsByTagSlug(topic.slug);
  const others = getAllTagSummaries().filter((t) => t.slug !== topic.slug);

  return (
    <div className="w-full">
      <JsonLd
        data={[
          collectionPageSchema({
            name: `Posts tagged ${topic.tag}`,
            description: `Every post tagged ${topic.tag}.`,
            path: `/blog/tag/${topic.slug}`,
            items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: topic.tag, path: `/blog/tag/${topic.slug}` },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="§ Topic"
        title={topic.tag}
        lede={`${topic.count} post${topic.count === 1 ? "" : "s"} tagged ${topic.tag}.`}
      />

      <div className="max-w-4xl mx-auto pb-16">
        <ul className="flex flex-col gap-5 mb-12">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} currentTagSlug={topic.slug} />
          ))}
        </ul>

        <nav aria-label="Other topics" className="mb-10">
          <h2
            className="inline-flex items-center gap-2 text-xs uppercase mb-4"
            style={{
              color: "var(--muted)",
              letterSpacing: "0.14em",
              fontFamily: "var(--font-code)",
            }}
          >
            <Tag size={14} />
            Other topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {others.map((t) => (
              <TopicLink key={t.slug} tag={t.tag} count={t.count} variant="teal" />
            ))}
          </div>
        </nav>

        <Link
          href="/blog"
          className="text-sm inline-flex items-center gap-2"
          style={{ color: "var(--accent)" }}
        >
          <ArrowLeft size="1em" className="kj-icon-inline" />
          All writing
        </Link>
      </div>
    </div>
  );
}
