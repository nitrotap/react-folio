/**
 * SEO layer: canonical URLs, per-page metadata, and JSON-LD.
 *
 * Everything here is derived from `src/data/site.ts` and `content/blog/` rather
 * than written out a second time. That is deliberate: metadata that restates
 * content by hand drifts away from it silently, and a description that used to
 * be true is worse than no description at all. If a claim cannot be sourced
 * from the data files, it is omitted rather than guessed — there is no Twitter
 * handle, so `twitter.creator` is absent; posts carry no modification date, so
 * `dateModified` is absent.
 */

import type { Metadata } from "next";
import {
  profile,
  pillars,
  skillGroups,
  education,
  experience,
  type Project,
} from "@/data/site";
import type { PostMeta } from "@/lib/blog";

export const SITE_URL = "https://www.nitrotap.dev";
export const SITE_LOCALE = "en_US";

/**
 * The Open Graph card. It is a committed PNG under the `opengraph-image.png`
 * file convention rather than a `next/og` `ImageResponse` route, and that is a
 * deliberate reversal of the obvious choice.
 *
 * `ImageResponse` *does* prerender under `output: "export"` — it needs
 * `export const dynamic = "force-static"` and then emits a valid 1200×630 PNG.
 * The problem is the filename: the route is `/opengraph-image`, so the export
 * writes `out/opengraph-image` with no extension, and a plain static host has
 * nothing to infer a type from. Serving `out/` and requesting that path returns
 * a 200 with no `Content-Type` header at all, which most link unfurlers treat
 * as not-an-image. The static convention writes `out/opengraph-image.png`
 * instead, and every host on earth types that correctly.
 */
export const OG_IMAGE_PATH = "/opengraph-image.png";
export const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.role}. ${profile.focus}.`,
} as const;

/** Portrait used on the About page and as `Person.image`. 460×460. */
export const PORTRAIT_PATH = "/images/kartik.webp";
export const PORTRAIT_FALLBACK_PATH = "/images/kartik.jpg";
export const PORTRAIT_SIZE = 460;

/** Stable JSON-LD node identifiers, so cross-references resolve by `@id`. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/* ------------------------------------------------------------------ *
 * Metadata
 * ------------------------------------------------------------------ */

export interface PageMetadataInput {
  /** Page-scoped title. The root layout's `%s | Kartik Jevaji` template applies. */
  title: string;
  /** Bypasses the layout template. Used by the home page only. */
  absoluteTitle?: string;
  description: string;
  /** Route path, e.g. `/projects/stats-claw`. Becomes the canonical URL. */
  path: string;
  keywords: string[];
  type?: "website" | "article" | "profile";
  /** ISO date, article pages only. */
  publishedTime?: string;
  /** Article tags, article pages only. */
  tags?: string[];
}

/**
 * One place that knows the shape of a page's metadata, so no route can quietly
 * ship without a canonical URL or an Open Graph block.
 */
export function pageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    absoluteTitle,
    description,
    path,
    keywords,
    type = "website",
    publishedTime,
    tags,
  } = input;

  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ?? `${title} | ${profile.name}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      url,
      title: socialTitle,
      description,
      siteName: profile.name,
      locale: SITE_LOCALE,
      // Declaring `openGraph` at all suppresses the `opengraph-image.png` file
      // convention that the root segment would otherwise contribute — verified
      // against the built HTML, where every page with its own openGraph block
      // shipped with no og:image at all. Stating it here is what keeps the card
      // on all 60 pages rather than only the ones that never set openGraph.
      images: [OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags && tags.length > 0 ? { tags } : {}),
    },
    twitter: {
      // No X/Twitter account exists for this site, so `creator` is deliberately
      // absent rather than guessed.
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

/* ------------------------------------------------------------------ *
 * JSON-LD
 * ------------------------------------------------------------------ */

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdNode
  | JsonLdValue[];

export interface JsonLdNode {
  "@type"?: string;
  "@id"?: string;
  [key: string]: JsonLdValue | undefined;
}

export interface JsonLdDocument extends JsonLdNode {
  "@context": "https://schema.org";
  "@type": string;
}

const CONTEXT = "https://schema.org" as const;

/**
 * Languages named on the skills page, split out of the "A / B" pairs it uses
 * for display. Intersecting a project's stack with this set is what lets
 * `programmingLanguage` stay honest: "Docker" and "Kani" are in the stack but
 * are not languages, so they land in `keywords` instead.
 */
const LANGUAGE_NAMES = new Set(
  (skillGroups.find((g) => g.slug === "languages")?.items ?? []).flatMap((i) =>
    i.split(" / ").map((s) => s.trim()),
  ),
);

/**
 * Every term here is a pillar name, a skill-group name, or a skill listed on
 * the skills page. Nothing is added for search value that is not already a
 * claim made on the site.
 */
export const knowsAbout: string[] = [
  ...new Set([
    ...pillars.map((p) => p.name),
    ...skillGroups.map((g) => g.name),
    ...skillGroups.flatMap((g) => g.items),
  ]),
];

/** Self-contained author reference: resolvable standalone, linked by `@id`. */
export function authorNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    url: `${SITE_URL}/`,
  };
}

export function personSchema(): JsonLdDocument {
  const [locality, region] = profile.location.split(",").map((s) => s.trim());
  const email = profile.links.find((l) => l.href.startsWith("mailto:"));
  // "Present" in the period string is the only marker of a current role.
  const current = experience.find((r) => /present/i.test(r.period));

  return {
    "@context": CONTEXT,
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    alternateName: profile.handle,
    url: `${SITE_URL}/`,
    jobTitle: profile.role,
    description: profile.lede,
    image: `${SITE_URL}${PORTRAIT_PATH}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: region,
      addressCountry: "US",
    },
    ...(email ? { email: email.href.replace(/^mailto:/, "") } : {}),
    ...(current
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
    // Degrees and certifications are both credentials; typing them uniformly
    // avoids miscasting CompTIA as a school the way `alumniOf` would.
    hasCredential: education.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.award,
      recognizedBy: { "@type": "Organization", name: c.institution },
    })),
    knowsAbout,
    // `profile.links` is the authority. mailto: is excluded — it is not a profile.
    sameAs: profile.links
      .filter((l) => l.href.startsWith("http"))
      .map((l) => l.href),
  };
}

export function websiteSchema(): JsonLdDocument {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: profile.name,
    alternateName: "nitrotap.dev",
    description: profile.lede,
    inLanguage: "en",
    author: authorNode(),
    publisher: { "@id": PERSON_ID },
    // No `potentialAction: SearchAction` — the site has no query-string search
    // endpoint a crawler could actually call.
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLdDocument {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function profilePageSchema(path: string): JsonLdDocument {
  return {
    "@context": CONTEXT,
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(path)}#profilepage`,
    url: absoluteUrl(path),
    name: `About ${profile.name}`,
    description: profile.lede,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export interface CollectionEntry {
  name: string;
  path: string;
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  items: CollectionEntry[];
}): JsonLdDocument {
  const url = absoluteUrl(input.path);
  return {
    "@context": CONTEXT,
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: authorNode(),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function blogSchema(input: {
  path: string;
  name: string;
  description: string;
  posts: PostMeta[];
}): JsonLdDocument {
  const url = absoluteUrl(input.path);
  return {
    "@context": CONTEXT,
    "@type": "Blog",
    "@id": `${url}#blog`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: authorNode(),
    blogPost: input.posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(`/blog/${p.slug}`)}#post`,
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: absoluteUrl(`/blog/${p.slug}`),
    })),
  };
}

export function blogPostingSchema(post: PostMeta): JsonLdDocument {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    // No `dateModified`: posts carry a single frontmatter date and nothing
    // records revisions, so asserting one would be a fabrication.
    keywords: post.tags,
    inLanguage: "en",
    // Derived from the same ~200wpm estimate shown on the page.
    timeRequired: `PT${post.readingMinutes}M`,
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    author: authorNode(),
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/**
 * Projects are typed `SoftwareSourceCode` rather than the looser `CreativeWork`.
 * All seven are software: each has a stack, five name a programming language
 * the skills page also claims, and the public ones have a repository. That is
 * exactly what `SoftwareSourceCode` adds over `CreativeWork` — `codeRepository`
 * and `programmingLanguage` — so the more specific type carries real
 * information instead of being a guess. Private projects simply omit
 * `codeRepository`, which is the honest encoding of "described, not linked".
 */
export function projectSchema(project: Project): JsonLdDocument {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const languages = project.stack.filter((s) => LANGUAGE_NAMES.has(s));
  const repo = project.links.find((l) => l.href.includes("github.com"));

  return {
    "@context": CONTEXT,
    "@type": "SoftwareSourceCode",
    "@id": `${url}#project`,
    url,
    name: project.name,
    alternativeHeadline: project.tagline,
    description: project.summary,
    inLanguage: "en",
    keywords: project.stack,
    ...(languages.length > 0 ? { programmingLanguage: languages } : {}),
    ...(repo ? { codeRepository: repo.href } : {}),
    author: authorNode(),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
