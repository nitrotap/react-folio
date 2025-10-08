'use client';

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostSectionProps {
  title: string;
  content: string;
}

const BlogPostSection: React.FC<BlogPostSectionProps> = ({ title, content }) => {
  return (
    <article className="py-12 w-full max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-coyote-700 mb-8">
          {title}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-coyote-700 mt-8 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-coyote-700 mt-6 mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-bold text-coyote-700 mt-5 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="ml-4">{children}</li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-cerulean-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-gray-100 text-cerulean-700 px-2 py-1 rounded text-sm">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={`${className} block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm`}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="mb-4 overflow-x-auto">{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-cerulean-700 pl-4 italic text-gray-600 my-4">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-coyote-700">
                  {children}
                </strong>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default BlogPostSection;
