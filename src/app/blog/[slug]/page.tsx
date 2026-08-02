import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider } from "@astryxdesign/core/Divider";
import BlogOutline from "../../components/BlogOutline";
import TopicLink from "../../components/TopicLink";
import { ArrowLeft, ArrowRight } from "../../components/Icons";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { pageMetadata, breadcrumbSchema, blogPostingSchema } from "@/lib/seo";
import JsonLd from "../../components/JsonLd";

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
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
    keywords: post.tags,
  });
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

  /*
    Every band of a post — header, body, divider, post nav, back link — shares
    this wrapper so they all start on the same left edge.

    They did not. The header was `max-w-3xl mx-auto` (a 48rem column centred in
    the page) while the body row was `max-w-6xl mx-auto … justify-center` (a
    72rem box holding prose + gap + a 14rem contents rail, centred as a group).
    Two different centrings, so above the `xl` breakpoint the title sat several
    rem to the right of the paragraph under it.

    The fix is one box for all of them — 72rem at `xl` — with the right-hand
    24rem reserved for the gap and the contents rail. That leaves every band
    exactly 48rem wide and flush left against the prose, which is also why the
    body row is `justify-start` at `xl` rather than `justify-center`: centring
    the row inside its own box would reintroduce the offset it just lost.
  */
  const band = "mx-auto w-full max-w-3xl xl:max-w-6xl xl:pr-96";

  return (
    <article className="w-full">
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <header className={`${band} pt-10 pb-10`}>
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
          <nav aria-label="Topics" className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <TopicLink key={t} tag={t} />
            ))}
          </nav>
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
      <div className="mx-auto w-full max-w-3xl xl:max-w-6xl flex gap-12 justify-center xl:justify-start pb-14">
        <div
          className="prose-body min-w-0 max-w-3xl"
          style={{ color: "var(--muted)" }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <BlogOutline items={post.outline} />
      </div>

      <div className={band}>
        <Divider variant="subtle" />
      </div>

      <nav
        aria-label="Post navigation"
        className={`${band} pb-16 pt-8 flex flex-wrap gap-4 justify-between`}
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div>
          {older && (
            <Link
              href={`/blog/${older.slug}`}
              className="text-sm inline-flex items-baseline gap-2"
              style={{ color: "var(--accent)" }}
            >
              <ArrowLeft size="1em" className="kj-icon-inline" />
              {older.title}
            </Link>
          )}
        </div>
        <div className="text-right">
          {newer && (
            <Link
              href={`/blog/${newer.slug}`}
              className="text-sm inline-flex items-baseline gap-2"
              style={{ color: "var(--accent)" }}
            >
              {newer.title}
              <ArrowRight size="1em" className="kj-icon-inline" />
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
