"use client";

import Link from "next/link";
import { Collapsible, CollapsibleGroup } from "@astryxdesign/core/Collapsible";
import { Badge } from "@astryxdesign/core/Badge";
import {
  Agent,
  Browser,
  Code,
  Dataset,
  Distribution,
  Graph,
  IconChip,
  Layers,
  Proof,
  type IconProps,
} from "./Icons";
import type { SkillGroup } from "@/data/site";

/**
 * One glyph per group, all eight distinct.
 *
 * With an accordion every glyph is on screen at once in the trigger rows, so
 * the set now works as a legend for the whole page rather than a marker for
 * whichever panel happens to be open. Each is still paired with its group name
 * in text — the icon never carries the meaning alone.
 */
const GROUP_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  verification: Proof,
  "ai-engineering": Agent,
  "symbolic-ai": Graph,
  languages: Code,
  web: Browser,
  data: Dataset,
  infrastructure: Layers,
  statistics: Distribution,
};

/**
 * Skill groups as an accordion.
 *
 * `type="multiple"` rather than `"single"`: these are capability areas someone
 * would reasonably want to compare side by side — a reader checking whether the
 * verification and AI-engineering claims line up shouldn't have one snap shut
 * to open the other.
 *
 * The first group opens by default so the page never presents as eight closed
 * rows with nothing to read. That has to come from the group's `defaultValue`,
 * not each item's `defaultIsOpen` — inside a CollapsibleGroup the group owns
 * the open set, so per-item defaults are ignored.
 */
export default function SkillsAccordion({ groups }: { groups: SkillGroup[] }) {
  return (
    <CollapsibleGroup type="multiple" defaultValue={[groups[0].slug]} hasDividers>
      {groups.map((group) => {
        const GroupIcon = GROUP_ICONS[group.slug];
        return (
          <Collapsible
            key={group.slug}
            value={group.slug}
            trigger={
              <span className="flex items-center gap-3 text-left">
                {GroupIcon && (
                  <IconChip>
                    <GroupIcon />
                  </IconChip>
                )}
                <span className="font-semibold">{group.name}</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {group.items.length}
                </span>
              </span>
            }
          >
            <div className="pb-2">
              <p
                className="text-sm leading-relaxed max-w-2xl mb-5"
                style={{ color: "var(--muted)" }}
              >
                {group.summary}
              </p>

              <ul className="flex flex-wrap gap-2 mb-5">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge variant="blue" label={item} />
                  </li>
                ))}
              </ul>

              <Link
                href={`/skills/${group.slug}`}
                className="kj-link text-sm"
                style={{ color: "var(--accent)" }}
              >
                Permalink
              </Link>
            </div>
          </Collapsible>
        );
      })}
    </CollapsibleGroup>
  );
}
