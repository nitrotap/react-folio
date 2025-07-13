import { siteData } from "@/data/siteData";
import Section from "../components/Section";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return siteData.pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = siteData.pages.find((p) => p.slug === params.slug);
  if (!page) return {};
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      images: page.metadata.image ? [page.metadata.image] : undefined,
    },
  };
}

const Page = ({ params }: { params: { slug: string } }) => {
  const page = siteData.pages.find((p) => p.slug === params.slug);
  if (!page) return <div className="text-center py-20">Page not found.</div>;
  return (
    <>
      <main>
        {page.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Page;