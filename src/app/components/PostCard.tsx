import Link from "next/link";
import TopicLink from "./TopicLink";
import { formatDate, tagSlug, type PostMeta } from "@/lib/blog";

/**
 * A post in a list, with its topics as links.
 *
 * The card used to be a single `<Link>` wrapping everything. Topics inside it
 * have to be links too, and an `<a>` inside an `<a>` is not valid HTML — the
 * parser closes the outer one, so the markup the browser builds is not the
 * markup written here. So the anchor shrinks to the title and regains the
 * whole card as a target through `.kj-card-link::after`, a transparent overlay
 * stretched across the nearest positioned ancestor. The topic row sits above it
 * on `.kj-card-above`, which is the only reason those clicks reach the topics
 * rather than the overlay.
 *
 * The visible consequence is that keyboard focus lands on the title rather than
 * ringing the entire card, which is the better of the two anyway: the ring now
 * marks what activating will open.
 */
export default function PostCard({
  post,
  currentTagSlug,
}: {
  post: PostMeta;
  /** On a topic page, that topic is shown flat rather than linked to itself. */
  currentTagSlug?: string;
}) {
  return (
    <li className="surface-interactive p-7 kj-reveal relative">
      <p className="text-xs mb-3" style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}>
        {formatDate(post.date)} · {post.readingMinutes} min read
        {post.draft && " · draft"}
      </p>
      <h2 className="text-xl font-semibold mb-2">
        <Link href={`/blog/${post.slug}`} className="kj-card-link">
          {post.title}
        </Link>
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 kj-card-above">
          {post.tags.map((t) => (
            <TopicLink key={t} tag={t} isCurrent={tagSlug(t) === currentTagSlug} />
          ))}
        </div>
      )}
    </li>
  );
}
