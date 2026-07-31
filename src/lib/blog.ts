import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { codeToHtml } from "shiki";

/**
 * Build-time blog layer.
 *
 * Posts are markdown files in `content/blog/`. Adding a file and rebuilding is
 * the entire publishing flow — `generateStaticParams` reads this directory, so
 * a new post becomes a new statically exported route with no code change.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

function readDir(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

function parseFile(file: string) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  // ~200 wpm, rounded up, floor of 1.
  const words = content.trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));

  const meta: PostMeta = {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "1970-01-01",
    description: typeof data.description === "string" ? data.description : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    readingMinutes,
  };

  return { meta, content };
}

/** Drafts are excluded from production builds but visible in `next dev`. */
function isVisible(meta: PostMeta) {
  return !meta.draft || process.env.NODE_ENV === "development";
}

export function getAllPosts(): PostMeta[] {
  return readDir()
    .map((f) => parseFile(f).meta)
    .filter(isVisible)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!readDir().includes(file)) return null;

  const { meta, content } = parseFile(file);
  if (!isVisible(meta)) return null;

  return { ...meta, html: await renderMarkdown(content) };
}

/**
 * Markdown → HTML with build-time syntax highlighting.
 *
 * Shiki emits both palettes as CSS custom properties (`defaultColor: false`)
 * so globals.css can select one per `data-theme` — two of our four themes are
 * light grounds and two are dark, and that is not a prefers-color-scheme
 * decision. Highlighting happens at build time, so shiki never ships to the
 * browser.
 */
export async function renderMarkdown(md: string): Promise<string> {
  const highlighted = new Map<string, string>();

  // A dedicated Marked instance per render, with `async` set at construction.
  // Mutating the shared `marked` singleton via setOptions().use() did not
  // reliably enable async walkTokens once bundled, so the highlighter's
  // promises never resolved before the renderer ran and every block silently
  // fell back to a plain <pre>. A fresh instance also keeps extensions from
  // accumulating across posts.
  const instance = new Marked({ gfm: true, breaks: false, async: true });

  instance.use({
    async: true,
    walkTokens: async (token) => {
      if (token.type !== "code") return;
      const lang = (token.lang || "").split(/\s/)[0] || "text";
      try {
        highlighted.set(
          token.raw,
          await codeToHtml(token.text, {
            lang,
            themes: { light: "github-light", dark: "github-dark" },
            defaultColor: false,
          }),
        );
      } catch (err) {
        // Fall through to an escaped <pre>, but never silently: a highlighter
        // that stops working should show up in the build log, not just look
        // slightly worse on the page.
        console.warn(
          `[blog] highlight failed (lang=${lang}): ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    },
    renderer: {
      code(token) {
        const pre = highlighted.get(token.raw);
        if (pre) return pre;
        const escaped = token.text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<pre><code>${escaped}</code></pre>`;
      },
    },
  });

  return instance.parse(md) as Promise<string>;
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
