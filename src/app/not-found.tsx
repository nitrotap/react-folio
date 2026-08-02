import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl mx-auto py-24">
      <p
        className="text-xs uppercase mb-5"
        style={{ color: "var(--accent)", letterSpacing: "0.2em", fontFamily: "var(--font-code)" }}
      >
        404
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
        No route matches that path.
      </h1>
      <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
        The page you asked for does not exist — or it moved and nothing redirected you here.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="control px-5 py-3 text-sm">
          Home
        </Link>
        <Link href="/projects" className="px-5 py-3 text-sm" style={{ color: "var(--muted)" }}>
          Projects
        </Link>
        <Link href="/blog" className="px-5 py-3 text-sm" style={{ color: "var(--muted)" }}>
          Writing
        </Link>
      </div>
    </div>
  );
}
