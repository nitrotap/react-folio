import {
  SEARCH_INDEX_VERSION,
  type SearchDoc,
  type SearchIndex,
} from "@/lib/search";
import {
  formatDate,
  getAllPostsWithText,
  getAllTagSummaries,
  tagSlug,
} from "@/lib/blog";
import { projects, skillGroups } from "@/data/site";

/**
 * The search index, as a static file.
 *
 * Why a route handler and not a module the client imports: this is a static
 * export, so a GET handler with no request access is rendered once at build
 * time and written to `out/search-index.json`. That gets us a build-time index
 * — the posts are read off disk with the same `getAllPostsWithText()` the pages
 * use, so it cannot drift from what is published — without a separate
 * generator script, a prebuild step, or a second copy of the frontmatter
 * parser.
 *
 * Why a separate file rather than inlining it: the index carries the prose of
 * every post, and post prose is the majority of the site's text. Inlining it
 * would put ~50 kB of body copy into the shared JS chunk of *every* page, paid
 * by every visitor on first load, to serve a feature most visitors never open.
 * As a file it is fetched once, on first interaction with the search UI, and
 * then sits in the HTTP cache. The whole reason this is affordable at all is
 * that the corpus is small enough to ship and scan whole; the day it isn't, the
 * answer is a real inverted index, not a bigger inline blob.
 */
export const dynamic = "force-static";

function postDocs(): SearchDoc[] {
  return getAllPostsWithText().map((post) => ({
    id: `post:${post.slug}`,
    kind: "post" as const,
    title: post.title,
    description: post.description,
    href: `/blog/${post.slug}`,
    terms: post.tags,
    body: post.text,
    date: post.date,
    meta: `${formatDate(post.date)} · ${post.readingMinutes} min`,
  }));
}

function projectDocs(): SearchDoc[] {
  return projects.map((project) => ({
    id: `project:${project.slug}`,
    kind: "project" as const,
    title: project.name,
    description: project.summary,
    href: `/projects/${project.slug}`,
    terms: project.stack,
    // The tagline and the detail bullets are the project's prose. Joined rather
    // than kept structured because nothing renders them from here.
    body: [project.tagline, ...project.detail].join(" "),
    meta: project.status === "private" ? `${project.period} · private` : project.period,
  }));
}

function skillDocs(): SearchDoc[] {
  return skillGroups.map((group) => ({
    id: `skill:${group.slug}`,
    kind: "skill" as const,
    title: group.name,
    description: group.summary,
    href: `/skills/${group.slug}`,
    // The individual skills are the searchable content of a group: someone
    // typing "Kani" wants the verification group, and "Kani" appears nowhere in
    // its name or summary.
    terms: group.items,
    meta: `${group.items.length} listed`,
  }));
}

function topicDocs(): SearchDoc[] {
  return getAllTagSummaries().map(({ slug, tag, count }) => ({
    id: `topic:${slug}`,
    kind: "topic" as const,
    title: tag,
    description: `${count} post${count === 1 ? "" : "s"} tagged ${tag}`,
    href: `/blog/tag/${tagSlug(tag)}`,
    terms: [],
    meta: `${count} post${count === 1 ? "" : "s"}`,
  }));
}

export function GET() {
  const index: SearchIndex = {
    version: SEARCH_INDEX_VERSION,
    docs: [...postDocs(), ...projectDocs(), ...skillDocs(), ...topicDocs()],
  };

  return new Response(JSON.stringify(index), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
