import Link from "next/link";
import { profile, navLinks } from "@/data/site";

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

          <ul className="flex flex-col gap-2 text-sm">
            {profile.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{ color: "var(--muted)" }}
                  {...(l.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
