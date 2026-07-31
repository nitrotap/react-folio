import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? all[index - 1] : null;
  const older = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  return (
    <article className="w-full">
      <header className="max-w-3xl mx-auto pt-10 pb-10">
        <p
          className="text-xs mb-5"
          style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}
        >
          {formatDate(post.date)} · {post.readingMinutes} min read
          {post.draft && " · draft"}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">{post.title}</h1>
        {post.description && (
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="text-xs" style={{ color: "var(--accent)" }}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </header>

      {/*
        Trust boundary: `post.html` is compiled at build time from markdown in
        `content/blog/`, which is first-party content committed to this repo and
        reviewed like any other source. No request data, user input, or remote
        content reaches this string, and nothing is fetched at runtime — the
        static export ships the already-rendered HTML. Were posts ever sourced
        from a CMS, an external feed, or untrusted contributors, this would need
        sanitising before render.
      */}
      <div
        className="prose-body max-w-3xl mx-auto pb-14"
        style={{ color: "var(--muted)" }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <nav
        aria-label="Post navigation"
        className="max-w-3xl mx-auto pb-16 pt-8 flex flex-wrap gap-4 justify-between"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div>
          {older && (
            <Link href={`/blog/${older.slug}`} className="text-sm" style={{ color: "var(--accent)" }}>
              ← {older.title}
            </Link>
          )}
        </div>
        <div className="text-right">
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="text-sm" style={{ color: "var(--accent)" }}>
              {newer.title} →
            </Link>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto pb-16">
        <Link href="/blog" className="text-sm" style={{ color: "var(--muted)" }}>
          All writing
        </Link>
      </div>
    </article>
  );
}
