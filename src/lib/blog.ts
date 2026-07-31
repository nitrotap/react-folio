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

export interface OutlineItem {
  id: string;
  label: string;
  level: number;
}

export interface Post extends PostMeta {
  html: string;
  outline: OutlineItem[];
}

/**
 * The entity references marked emits, turned back into characters.
 *
 * Only needed where rendered HTML is downgraded to plain text — the outline
 * labels and the ids derived from them. `&amp;` is decoded last so `&amp;lt;`
 * ends up as the literal `&lt;` rather than as `<`.
 */
function decodeEntities(html: string): string {
  return html
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** GitHub-style heading slug: lowercase, punctuation dropped, spaces hyphenated. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
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

/* ---------------------------------------------------------------------------
   Tags as routes.

   A tag is authored as free text in frontmatter, so the URL segment is derived
   rather than authored: `tagSlug` reuses the same `slugify` the heading anchors
   use, which keeps one definition of "what a slug is" in this file.
   --------------------------------------------------------------------------- */

export interface TagSummary {
  /** URL segment. */
  slug: string;
  /** The tag as written in frontmatter — what a reader sees. */
  tag: string;
  count: number;
}

export function tagSlug(tag: string): string {
  return slugify(tag);
}

/**
 * Every tag with its slug and post count, most-used first.
 *
 * Two differently-written tags can collapse to the same slug ("Fine Tuning"
 * and "fine-tuning"). That is a content bug, not a routing one — the route
 * would then serve one page for two topics — so it is reported at build time
 * rather than silently resolved. The first spelling wins, which is stable
 * because `getAllPosts()` is sorted.
 */
export function getAllTagSummaries(): TagSummary[] {
  const bySlug = new Map<string, TagSummary>();
  for (const { tag, count } of getAllTags()) {
    const slug = tagSlug(tag);
    const existing = bySlug.get(slug);
    if (existing) {
      if (existing.tag !== tag) {
        console.warn(
          `[blog] tags "${existing.tag}" and "${tag}" both slugify to "${slug}"; ` +
            `they will share one page. Pick one spelling.`,
        );
      }
      existing.count += count;
      continue;
    }
    bySlug.set(slug, { slug, tag, count });
  }
  return [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  );
}

export function getTagBySlug(slug: string): TagSummary | null {
  return getAllTagSummaries().find((t) => t.slug === slug) ?? null;
}

/** Posts carrying a tag, newest first. Matched on slug so spelling drifts. */
export function getPostsByTagSlug(slug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.some((t) => tagSlug(t) === slug));
}

/**
 * Markdown reduced to prose, for the search index.
 *
 * Deliberately lossy and deliberately not a markdown parse: the index only
 * needs a bag of words to substring-match against, and running the real
 * renderer here would pull shiki into the index build for output that is then
 * thrown away. Code fences go entirely — a search for "fn" should not match
 * every Rust snippet on the site — while inline code keeps its text, because
 * that is where type and API names live in a sentence.
 */
export function toPlainText(md: string): string {
  return md
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>#|]/g, " ")
    .replace(/^\s*[-+]\s+/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Post metadata plus its prose, used only to build the search index. */
export function getAllPostsWithText(): (PostMeta & { text: string })[] {
  return readDir()
    .map((f) => {
      const { meta, content } = parseFile(f);
      return { ...meta, text: toPlainText(content) };
    })
    .filter(isVisible)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!readDir().includes(file)) return null;

  const { meta, content } = parseFile(file);
  if (!isVisible(meta)) return null;

  const { html, outline } = await renderMarkdown(content);
  return { ...meta, html, outline };
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
export async function renderMarkdown(
  md: string,
): Promise<{ html: string; outline: OutlineItem[] }> {
  const highlighted = new Map<string, string>();
  const outline: OutlineItem[] = [];
  const usedIds = new Set<string>();

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

      /**
       * Headings carry a stable id so Astryx's Outline has something to anchor
       * to and scroll-spy against. Collisions get a numeric suffix — two
       * sections legitimately called "Why" would otherwise both claim `#why`
       * and the second would be unreachable.
       */
      heading(token) {
        const text = this.parser.parseInline(token.tokens);
        // Stripping tags leaves entity references behind, and the outline label
        // is rendered by React as text — so a heading containing an apostrophe
        // reached the contents list as the literal "What I&#39;d actually pick".
        // The id was wrong for the same reason: `slugify` dropped `&`, `#`, and
        // `;` and kept the digits, yielding `what-i39d-actually-pick`. Decoding
        // before both uses fixes the label and the anchor together, which is why
        // it happens here rather than at the point of render.
        const plain = decodeEntities(text.replace(/<[^>]+>/g, "")).trim();
        const base = slugify(plain) || `section-${outline.length + 1}`;
        let id = base;
        let n = 2;
        while (usedIds.has(id)) id = `${base}-${n++}`;
        usedIds.add(id);

        // h2 and h3 make a useful table of contents; deeper levels are noise.
        if (token.depth >= 2 && token.depth <= 3) {
          outline.push({ id, label: plain, level: token.depth });
        }
        return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`;
      },
    },
  });

  const html = (await instance.parse(md)) as string;
  return { html, outline };
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
