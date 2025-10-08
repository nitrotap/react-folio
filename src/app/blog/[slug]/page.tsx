import { getBlogPostBySlug, getAllBlogPosts } from "@/data/blogUtils";
import BlogPostSection from "@/app/components/BlogPostSection";
import Footer from "@/app/components/Footer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Blog`,
    description: post.excerpt || `Read ${post.title} on Kartik Jevaji's blog`,
    keywords: ["Blog", "Article", post.title],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on Kartik Jevaji's blog`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostSection title={post.title} content={post.content} />
      <Footer />
    </>
  );
}
