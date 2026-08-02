import type { JsonLdDocument } from "@/lib/seo";

/**
 * Emits one `<script type="application/ld+json">` per document.
 *
 * `<` is escaped to its JSON `<` form. Every value here is first-party
 * build-time content so nothing hostile can reach it today, but a stray `</script>`
 * inside a project tagline or post title would silently truncate the block, and
 * that failure is invisible until a crawler reports missing structured data.
 */
export default function JsonLd({
  data,
}: {
  data: JsonLdDocument | JsonLdDocument[];
}) {
  const documents = Array.isArray(data) ? data : [data];
  return (
    <>
      {documents.map((doc, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(doc).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
