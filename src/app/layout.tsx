import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import ThemeScript from "./components/ThemeScript";
import { profile } from "@/data/site";

const SITE_URL = "https://www.nitrotap.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.lede,
  keywords: [
    "Kartik Jevaji",
    "Full Stack AI Engineer",
    "neurosymbolic AI",
    "formal verification",
    "Kani",
    "Rust",
    "ontologies",
    "LLM evaluation",
    "TypeDB",
    "statistics",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.lede,
    url: SITE_URL,
    siteName: profile.name,
    type: "website",
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
