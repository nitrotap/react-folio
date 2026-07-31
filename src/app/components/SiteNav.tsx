"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, profile } from "@/data/site";
import ThemeSwitcher from "./ThemeSwitcher";
import SiteSearch from "./SiteSearch";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav aria-label="Primary" className="w-full">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          {profile.name}
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="px-3 py-2 text-sm inline-block"
                style={{
                  color: isActive(link.href) ? "var(--accent)" : "var(--muted)",
                  fontWeight: isActive(link.href) ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* One SiteSearch for the whole page, and outside the collapsible menu
            at every width. It registers the global ⌘K/Ctrl-K handler, so a
            second instance for the mobile layout would mean two listeners and
            two dialogs opening on one keypress; and search is the fastest route
            to anything here, which burying it behind a second tap would undo. */}
        <div className="flex items-center gap-2 md:gap-3">
          <SiteSearch />
          <div className="hidden lg:block">
            <ThemeSwitcher />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="primary-menu"
            className="control px-3 py-2 text-sm md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div id="primary-menu" className="md:hidden mt-4 surface p-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="block px-2 py-2 text-sm"
                  style={{
                    color: isActive(link.href) ? "var(--accent)" : "var(--ink)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
