import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="w-full max-w-4xl mx-auto pt-10 pb-8">
      {eyebrow && (
        <p
          className="text-xs uppercase mb-4"
          style={{
            color: "var(--accent)",
            letterSpacing: "0.18em",
            fontFamily: "var(--font-code)",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">{title}</h1>
      {lede && (
        <p className="mt-5 text-lg leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
          {lede}
        </p>
      )}
      {children}
    </header>
  );
}
