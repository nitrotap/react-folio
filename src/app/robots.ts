import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// `output: "export"` has no server, so every route handler must be prerenderable.
// Next generates robots.txt as a route handler and refuses to collect it without
// this opt-in.
export const dynamic = "force-static";

/**
 * Nothing on this site is private, so nothing is disallowed. `/_next/` holds
 * hashed build assets that carry no indexable content and only waste crawl
 * budget; the RSC payload sidecars Next writes next to each page (`*.txt`) are
 * likewise machine artefacts rather than pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
