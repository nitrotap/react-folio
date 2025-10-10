import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
}

const MD_DIRECTORY = path.join(process.cwd(), 'md');

export function getAllBlogPosts(): BlogPost[] {
  try {
    // Check if md directory exists
    if (!fs.existsSync(MD_DIRECTORY)) {
      return [];
    }

    const filenames = fs.readdirSync(MD_DIRECTORY);
    const mdFiles = filenames.filter(file => file.endsWith('.md'));

    const posts = mdFiles.map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(MD_DIRECTORY, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract title from first heading
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : slug;
      
      // Create excerpt from first paragraph
      const paragraphMatch = content.match(/\n\n([\s\S]+?)(?:\n\n|$)/);
      const excerpt = paragraphMatch ? paragraphMatch[1].substring(0, 150) + '...' : '';

      return {
        slug,
        title,
        content,
        excerpt,
      };
    });

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(MD_DIRECTORY, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title from first heading
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    
    // Create excerpt from first paragraph
    const paragraphMatch = content.match(/\n\n([\s\S]+?)(?:\n\n|$)/);
    const excerpt = paragraphMatch ? paragraphMatch[1].substring(0, 150) + '...' : '';

    return {
      slug,
      title,
      content,
      excerpt,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}
