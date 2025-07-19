import { siteData } from "@/data/siteData";
import Section from "./components/Section";
import Footer from "./components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteData.pages[0].metadata.title,
  description: siteData.pages[0].metadata.description,
  keywords: siteData.pages[0].metadata.keywords,
  openGraph: {
    title: siteData.pages[0].metadata.title,
    description: siteData.pages[0].metadata.description,
    images: siteData.pages[0].metadata.image ? [siteData.pages[0].metadata.image] : undefined,
  },
};

export async function generateStaticParams() {
  // Exclude 'home' from the slugs for dynamic pages
  return siteData.pages
    .filter(page => page.slug !== "home")
    .map(page => ({ slug: page.slug }));
}

export default function Home() {
  const page = siteData.pages[0];
  return (
    <>
      {page.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
      <Footer />
    </>
  );
}
