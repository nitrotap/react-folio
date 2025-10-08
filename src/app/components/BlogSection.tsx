import React from "react";
import Link from "next/link";
import type { Section } from "@/data/types";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
}

export interface BlogSectionType extends Section {
  type: "blog";
  posts: BlogPost[];
}

interface BlogSectionProps {
  section: BlogSectionType;
  variant?: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({ section }) => {
  return (
    <section id={section.id} className="py-12 w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-coyote-700 mb-4">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="text-lg text-gray-600">{section.subtitle}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {section.posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <h3 className="text-2xl font-bold text-coyote-700 mb-3">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
            )}
            <div className="mt-4 text-cerulean-700 font-semibold hover:underline">
              Read more →
            </div>
          </Link>
        ))}
      </div>

      {section.posts.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No blog posts available yet.
        </div>
      )}
    </section>
  );
};

export default BlogSection;
