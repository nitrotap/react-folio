import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Nav from "./components/Nav";

const SITE_URL = "https://www.nitrotap.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kartik Jevaji | Full Stack AI Engineer",
  description:
    "Kartik Jevaji builds neurosymbolic AI systems and formally verified software. Ontologies, automated-reasoning agents, and the statistics underneath — in Rust.",
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
  authors: [{ name: "Kartik Jevaji", url: SITE_URL }],
  creator: "Kartik Jevaji",
  openGraph: {
    title: "Kartik Jevaji | Full Stack AI Engineer",
    description:
      "Neurosymbolic AI systems and formally verified software. Ontologies, automated-reasoning agents, and the statistics underneath — in Rust.",
    url: SITE_URL,
    siteName: "Kartik Jevaji",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <header className="w-full py-6 sticky top-0 z-30">
            <div className="container mx-auto px-4 flex items-center justify-between">
              <Nav />
            </div>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center w-full">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
