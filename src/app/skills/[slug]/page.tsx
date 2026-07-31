import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../components/PageHeader";
import { skillGroups, getSkillGroup } from "@/data/site";

export function generateStaticParams() {
  return skillGroups.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const group = getSkillGroup(slug);
  if (!group) return {};
  return {
    title: group.name,
    description: group.summary,
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = getSkillGroup(slug);
  if (!group) notFound();

  const others = skillGroups.filter((g) => g.slug !== slug);

  return (
    <div className="w-full">
      <PageHeader eyebrow="§ Capabilities" title={group.name} lede={group.summary} />

      <div className="max-w-4xl mx-auto pb-16">
        <ul className="grid gap-2.5 sm:grid-cols-2 mb-14">
          {group.items.map((item) => (
            <li key={item} className="surface p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>

        <nav aria-label="Other skill areas">
          <h2 className="text-xs uppercase mb-4" style={{ letterSpacing: "0.16em", color: "var(--muted)" }}>
            Other areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={`/skills/${g.slug}`}
                className="text-xs px-3 py-2"
                style={{
                  color: "var(--muted)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--kj-radius-sm)",
                }}
              >
                {g.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
