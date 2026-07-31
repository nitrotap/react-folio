import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { projects, skillGroups } from "@/data/site";
import { getAllPosts, getAllTagSummaries } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap for the static export.
 *
 * Every dynamic section is enumerated from the same module the corresponding
 * page's `generateStaticParams` reads, so a new project, skill group, or
 * markdown file cannot appear as a route without appearing here too.
 *
 * `lastModified` is the build timestamp for pages generated from `site.ts`.
 * That is the literal truth for a static export — every one of those files is
 * rewritten on every build. Blog posts are the exception: they carry a real
 * publication date in frontmatter, so that is used instead.
 */

// See robots.ts: metadata route handlers must be prerenderable under static export.
export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

/** Tag routes are a separate concern; only list them if the route exists. */
const TAG_ROUTE_DIR = path.join(process.cwd(), "src", "app", "blog", "tag");
const hasTagRoutes = fs.existsSync(TAG_ROUTE_DIR);

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();
  const posts = getAllPosts();
  const newestPost = posts[0]?.date ? new Date(`${posts[0].date}T00:00:00Z`) : buildTime;

  const staticPages: Entry[] = [
    { url: absoluteUrl("/"), lastModified: buildTime, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/verification"), lastModified: buildTime, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projects"), lastModified: buildTime, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), lastModified: newestPost, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: buildTime, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/skills"), lastModified: buildTime, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/experience"), lastModified: buildTime, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/education"), lastModified: buildTime, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: buildTime, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectPages: Entry[] = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: buildTime,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const skillPages: Entry[] = skillGroups.map((g) => ({
    url: absoluteUrl(`/skills/${g.slug}`),
    lastModified: buildTime,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const postPages: Entry[] = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(`${p.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const tagPages: Entry[] = hasTagRoutes
    ? // The slug comes from `getAllTagSummaries()`, the same function
      // `generateStaticParams` uses, rather than being re-derived here. A tag is
      // free text in frontmatter and the URL segment is `slugify`d, so
      // `encodeURIComponent` would agree only by luck — it happens to for every
      // current tag, and would stop the first time one is written with a
      // capital letter.
      getAllTagSummaries().map(({ slug }) => ({
        url: absoluteUrl(`/blog/tag/${slug}`),
        lastModified: newestPost,
        changeFrequency: "monthly",
        priority: 0.4,
      }))
    : [];

  return [...staticPages, ...projectPages, ...skillPages, ...postPages, ...tagPages];
}
