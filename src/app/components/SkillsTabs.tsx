"use client";

import { useState } from "react";
import Link from "next/link";
import { TabList, Tab } from "@astryxdesign/core/TabList";
import { Badge } from "@astryxdesign/core/Badge";
import type { SkillGroup } from "@/data/site";

/**
 * Skill groups as tabs rather than eight stacked cards. The grouping is the
 * argument — these are capabilities organised by what they're for — and tabs
 * make that structure legible without a page of scrolling.
 */
export default function SkillsTabs({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState(groups[0].slug);
  const group = groups.find((g) => g.slug === active) ?? groups[0];

  return (
    <div>
      <div className="scroll-x">
        <TabList value={active} onChange={setActive} size="md" hasDivider>
          {groups.map((g) => (
            <Tab key={g.slug} value={g.slug} label={g.name} />
          ))}
        </TabList>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
          <h2 className="text-2xl font-bold">{group.name}</h2>
          <Link
            href={`/skills/${group.slug}`}
            className="kj-link text-sm"
            style={{ color: "var(--accent)" }}
          >
            Permalink
          </Link>
        </div>
        <p className="text-sm leading-relaxed max-w-2xl mb-7" style={{ color: "var(--muted)" }}>
          {group.summary}
        </p>

        <ul className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li key={item} className="kj-reveal">
              <Badge variant="blue" label={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
