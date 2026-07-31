import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import ThemeScript from "./components/ThemeScript";
import { profile, pillars, skillGroups } from "@/data/site";
import { OG_IMAGE } from "@/lib/seo";

const SITE_URL = "https://www.nitrotap.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.lede,
  // Derived, not restated: the hardcoded list here still said "Full Stack AI
  // Engineer" and "neurosymbolic AI" long after the positioning changed.
  keywords: [
    profile.name,
    profile.handle,
    ...pillars.map((p) => p.name),
    ...skillGroups.map((g) => g.name),
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${profile.name} | ${profile.role}`,
    description: profile.lede,
    siteName: profile.name,
    locale: "en_US",
    // Declaring `openGraph` at all suppresses the inherited opengraph-image
    // file convention, so the image has to be named explicitly here.
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.lede,
    images: [OG_IMAGE],
    // No X/Twitter account exists, so `creator` is deliberately absent.
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          {/* This link sits outside header/main/footer, so the `color: var(--ink)`
              rule on those three landmarks never reaches it and it inherits
              Astryx's near-black default instead. Invisible while sr-only, but
              the moment a keyboard user focuses it, it paints #171717 on the
              dark grounds — 1.17:1 on Blueprint, 1.06:1 on 8-bit. Stated
              explicitly here. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:px-4 focus:py-2 surface"
            style={{ color: "var(--ink)" }}
          >
            Skip to content
          </a>
          <header className="w-full py-5 sticky top-0 z-30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <SiteNav />
            </div>
          </header>
          <main id="main" className="flex-1 container mx-auto px-4 w-full">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
