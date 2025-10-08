import { getAllBlogPosts } from "@/data/blogUtils";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Kartik Jevaji",
  description: "Read articles about web development, technology, and software engineering.",
  keywords: ["Blog", "Articles", "Web Development", "Technology", "Software Engineering"],
  openGraph: {
    title: "Blog - Kartik Jevaji",
    description: "Read articles about web development, technology, and software engineering.",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const blogSection = {
    id: "blog",
    type: "blog" as const,
    title: "Blog",
    subtitle: "Thoughts, tutorials, and insights on web development",
    posts: posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
    })),
  };

  return (
    <>
      <BlogSection section={blogSection} />
      <Footer />
    </>
  );
}
