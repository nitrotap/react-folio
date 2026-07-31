import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { getAllPosts, getAllTags, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on formal verification, ontology-driven code generation, model fine-tuning, and evaluation.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="w-full">
      <PageHeader
        eyebrow="§ Writing"
        title="Writing"
        lede="Notes on proving things about numeric code, generating code from ontologies, and measuring what models produce."
      />

      <div className="max-w-4xl mx-auto pb-16">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map(({ tag, count }) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1.5"
                style={{
                  color: "var(--muted)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--kj-radius-sm)",
                  fontFamily: "var(--font-code)",
                }}
              >
                {tag} · {count}
              </span>
            ))}
          </div>
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
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="surface-interactive p-7 block">
                  <p
                    className="text-xs mb-3"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}
                  >
                    {formatDate(post.date)} · {post.readingMinutes} min read
                    {post.draft && " · draft"}
                  </p>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span key={t} className="text-xs" style={{ color: "var(--accent)" }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
