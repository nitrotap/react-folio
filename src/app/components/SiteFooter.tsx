import Link from "next/link";
import { External } from "./Icons";
import { profile, navLinks } from "@/data/site";

/**
 * Evaluated once at build time, not per request — this is a static export, so
 * a client-side `new Date()` would be the only way to track the viewing year.
 * The build year is the honest value: it says when this content was last
 * published, which is what a copyright line is for.
 */
const BUILD_YEAR = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="w-full mt-20" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="container mx-auto px-4 py-10 flex flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            {profile.role} · {profile.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "var(--muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/education" style={{ color: "var(--muted)" }}>
                  Education
                </Link>
              </li>
            </ul>
          </nav>

          {/* Every link in this column leaves the site, and the column beside
              it is internal navigation — so the arrow is the one thing that
              tells the two apart at a glance. It is still only a reinforcement:
              the labels (GitHub, LinkedIn, Email) already say so. */}
          <ul className="flex flex-col gap-2 text-sm">
            {profile.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex items-center gap-1.5"
                  style={{ color: "var(--muted)" }}
                  {...(l.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  {l.label}
                  <External size="0.85em" className="kj-icon-inline" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="container mx-auto px-4 py-6 flex flex-wrap gap-x-6 gap-y-2 justify-between text-xs"
        style={{ borderTop: "1px solid var(--color-border)", color: "var(--muted)" }}
      >
        <p>
          © {BUILD_YEAR} {profile.name}. All rights reserved.
        </p>
        <p style={{ fontFamily: "var(--font-code)" }}>Built in Rust-adjacent spirit, in Minnesota.</p>
      </div>
    </footer>
  );
}
