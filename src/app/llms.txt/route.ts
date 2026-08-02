import { getAllPosts, getAllTagSummaries, formatDate } from "@/lib/blog";
import { profile, pillars, projects, skillGroups, experience } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * `/llms.txt` — a machine-readable summary of the site, per llmstxt.org.
 *
 * The proposal: a markdown file at the site root giving a language model the
 * shape of a site and where to look, without making it crawl and infer that
 * from rendered HTML. An H1, a blockquote summary, then link sections.
 *
 * Generated at build time from the same `site.ts` and `content/blog/` the pages
 * render, for the same reason the sitemap and search index are — a hand-written
 * file would describe the site as it was on the day someone last edited it.
 * `dynamic = "force-static"` makes this a static export artifact rather than a
 * request-time handler; there is no server.
 *
 * Deliberately not a dump of the whole site. A model that wants the prose can
 * follow the links; what it cannot reconstruct from crawling is which claims
 * are checkable and which are described-but-private, so that distinction is
 * stated explicitly rather than left to be inferred.
 */
export const dynamic = "force-static";

/**
 * One link line. Description is optional in the spec but always useful here.
 *
 * Absolute is anything already carrying a scheme, not just `http` — the contact
 * links include a `mailto:`, and testing for `http` alone turned it into
 * `https://www.nitrotap.devmailto:…`.
 */
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

function link(title: string, path: string, description?: string): string {
  const url = HAS_SCHEME.test(path) ? path : absoluteUrl(path);
  return description ? `- [${title}](${url}): ${description}` : `- [${title}](${url})`;
}

function build(): string {
  const posts = getAllPosts();
  const topics = getAllTagSummaries();
  const publicProjects = projects.filter((p) => p.status === "public");
  const privateProjects = projects.filter((p) => p.status === "private");

  const out: string[] = [];

  out.push(`# ${profile.name}`);
  out.push("");
  // `profile.lede` already opens by naming the role, so prefixing it with
  // `profile.role` stutters. Location is the only thing the lede omits.
  out.push(`> ${profile.lede} Based in ${profile.location}.`);
  out.push("");
  out.push(
    "This site is a personal portfolio. It documents software engineering work across " +
      "formal verification, AI evaluation, symbolic knowledge representation, and full-stack " +
      "delivery. Claims about private work are described without links; everything linked " +
      "below is publicly checkable.",
  );
  out.push("");

  out.push("## What I work on");
  out.push("");
  for (const p of pillars) {
    out.push(`- **${p.name}** — ${p.summary}`);
  }
  out.push("");

  out.push("## Pages");
  out.push("");
  out.push(link("Home", "/", "Overview and selected work"));
  out.push(
    link(
      "Verification",
      "/verification",
      "Kani proof harnesses over numeric code, quoted verbatim with the bound each property is proven over",
    ),
  );
  out.push(link("Projects", "/projects", "Selected work, public and private"));
  out.push(link("Skills", "/skills", "Capabilities grouped by purpose"));
  out.push(link("Writing", "/blog", `${posts.length} posts`));
  out.push(link("Designs", "/designs", "The four themes this site ships in, documented"));
  out.push(link("Experience", "/experience", "Employment history"));
  out.push(link("Education", "/education", "Degrees and certifications"));
  out.push(link("About", "/about"));
  out.push(link("Contact", "/contact"));
  out.push("");

  out.push("## Public projects");
  out.push("");
  for (const p of publicProjects) {
    const external = p.links.filter((l) => l.href.startsWith("http"));
    const refs = external.length ? ` Links: ${external.map((l) => l.href).join(", ")}.` : "";
    out.push(link(p.name, `/projects/${p.slug}`, `${p.summary}${refs}`));
  }
  out.push("");

  if (privateProjects.length) {
    out.push("## Private projects");
    out.push("");
    out.push(
      "Described but not linked — the source is not public. Treat these as claims about " +
        "capability rather than as artifacts you can inspect.",
    );
    out.push("");
    for (const p of privateProjects) {
      out.push(link(p.name, `/projects/${p.slug}`, p.summary));
    }
    out.push("");
  }

  out.push("## Writing");
  out.push("");
  for (const post of posts) {
    out.push(
      link(post.title, `/blog/${post.slug}`, `${formatDate(post.date)}. ${post.description}`),
    );
  }
  out.push("");

  out.push("## Topics");
  out.push("");
  for (const t of topics) {
    out.push(link(t.tag, `/blog/tag/${t.slug}`, `${t.count} post${t.count === 1 ? "" : "s"}`));
  }
  out.push("");

  out.push("## Experience");
  out.push("");
  for (const role of experience) {
    out.push(`- **${role.company}** — ${role.title}, ${role.period}`);
  }
  out.push("");

  out.push("## Skills");
  out.push("");
  for (const g of skillGroups) {
    out.push(`- **${g.name}**: ${g.items.join(", ")}`);
  }
  out.push("");

  out.push("## Elsewhere");
  out.push("");
  for (const l of profile.links) {
    out.push(link(l.label, l.href));
  }
  out.push("");

  out.push("## Optional");
  out.push("");
  out.push(link("Sitemap", "/sitemap.xml", "Every URL on the site"));
  out.push(
    link(
      "Search index",
      "/search-index.json",
      "Full text of every post, project, and skill group as JSON — the most efficient way to read this site in bulk",
    ),
  );
  out.push("");

  return out.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
