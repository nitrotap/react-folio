import PageHeader from "../components/PageHeader";
import JsonLd from "../components/JsonLd";
import { pageMetadata, blogSchema, breadcrumbSchema } from "@/lib/seo";
import { profile } from "@/data/site";
import PostCard from "../components/PostCard";
import TopicLink from "../components/TopicLink";
import { Tag } from "../components/Icons";
import { getAllPosts, getAllTagSummaries } from "@/lib/blog";

const BLOG_DESCRIPTION =
  "Notes on formal verification, ontology-driven code generation, model fine-tuning, and evaluation.";

export const metadata = pageMetadata({
  title: "Writing",
  description: BLOG_DESCRIPTION,
  path: "/blog",
  keywords: [profile.name, "writing", ...getAllTagSummaries().map((t) => t.tag)],
});

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTagSummaries();

  return (
    <div className="w-full">
      <JsonLd
        data={[
          blogSchema({ path: "/blog", name: "Writing", description: BLOG_DESCRIPTION, posts }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="§ Writing"
        title="Writing"
        lede="Notes on proving things about numeric code, generating code from ontologies, and measuring what models produce."
      />

      <div className="max-w-4xl mx-auto pb-16">
        {tags.length > 0 && (
          /* The badge row had no label at all. One glyph and one word fix that
             — and because the word is there, the glyph stays decorative and
             the row is still labelled with images off. Per-post metadata gets
             nothing: an icon repeated on every row is decoration, not
             information. */
          <nav aria-label="Topics" className="flex flex-wrap items-center gap-2 mb-10">
            <span
              className="inline-flex items-center gap-2 text-xs uppercase mr-1"
              style={{
                color: "var(--muted)",
                letterSpacing: "0.14em",
                fontFamily: "var(--font-code)",
              }}
            >
              <Tag size={14} />
              Topics
            </span>
            {tags.map(({ slug, tag, count }) => (
              <TopicLink key={slug} tag={tag} count={count} variant="teal" />
            ))}
          </nav>
        )}

        {posts.length === 0 ? (
          <div className="surface-inset p-8">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Nothing published yet. Drop a markdown file into{" "}
              <code style={{ fontFamily: "var(--font-code)" }}>content/blog/</code> and rebuild.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-5">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
