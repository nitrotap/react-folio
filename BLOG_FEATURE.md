# Blog Feature Documentation

## Overview

The website now includes a blog feature that automatically parses markdown files (`.md`) from the `md/` folder and displays them as blog posts on the website.

## How to Add a New Blog Post

1. Create a new `.md` file in the `md/` folder at the root of the project
2. Write your content in markdown format
3. The first `# Heading` in the file will be used as the blog post title
4. The file name (without `.md`) will be used as the URL slug

### Example

Create a file `md/my-new-post.md`:

```markdown
# My New Blog Post

This is the introduction paragraph that will be used as an excerpt.

## Section 1

Your content here...

## Section 2

More content...
```

The post will automatically be available at `/blog/my-new-post`

## Supported Markdown Features

- **Headings**: `#`, `##`, `###` for h1, h2, h3
- **Paragraphs**: Regular text separated by blank lines
- **Lists**: 
  - Unordered lists with `-` or `*`
  - Ordered lists with `1.`, `2.`, etc.
- **Code**:
  - Inline code with \`backticks\`
  - Code blocks with triple backticks
- **Links**: `[text](url)`
- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Blockquotes**: `> quote text`

## File Structure

```
react-folio/
├── md/                          # Blog posts directory
│   ├── welcome.md              # Sample post
│   ├── nextjs-tips.md          # Sample post
│   └── tailwind-design.md      # Sample post
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Individual blog post page
│   │   └── components/
│   │       ├── BlogSection.tsx      # Blog cards component
│   │       └── BlogPostSection.tsx  # Markdown renderer
│   └── data/
│       └── blogUtils.ts        # Markdown parsing utilities
```

## Technical Details

### Dependencies

- `react-markdown`: Converts markdown to React components
- `remark-gfm`: GitHub Flavored Markdown support

### Static Generation

All blog posts are statically generated at build time using Next.js `generateStaticParams`. This means:
- Fast page loads
- No runtime markdown parsing
- SEO-friendly

### Adding/Removing Posts

Simply add or remove `.md` files from the `md/` folder and rebuild:

```bash
npm run build
```

The build process will automatically detect and generate pages for all markdown files.

## Styling

Blog posts use Tailwind CSS for styling with a custom markdown component configuration that provides:
- Proper typography hierarchy
- Code syntax highlighting
- Responsive design
- Consistent spacing

You can customize the styling by editing `src/app/components/BlogPostSection.tsx`.
