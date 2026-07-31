"use client";

import { useState } from "react";
import { TabList, Tab } from "@astryxdesign/core/TabList";
import { CodeBlock } from "@astryxdesign/core/CodeBlock";
import { Badge } from "@astryxdesign/core/Badge";
import { Bound } from "./Icons";
import type { Harness } from "@/data/harnesses";
import type { Proof } from "@/data/site";

/**
 * Browser for the real harnesses.
 *
 * The doc comment above each one is kept deliberately — it is where the
 * reasoning for the bound lives ("`N = 4` keeps the three symbolic swaps
 * tractable"), and that reasoning is the substance. Stripping it to show only
 * the assertions would leave the most interesting part on the floor.
 */
export default function HarnessBrowser({
  harnesses,
  proofs,
}: {
  harnesses: Harness[];
  proofs: Proof[];
}) {
  const [active, setActive] = useState(harnesses[0]?.name ?? "");
  const harness = harnesses.find((h) => h.name === active) ?? harnesses[0];
  const proof = proofs.find((p) => p.name === harness?.name);

  if (!harness) return null;

  // Long snake_case names would blow out the tab row; the area reads better.
  const labelFor = (name: string) =>
    proofs.find((p) => p.name === name)?.area ?? name.split("_")[0];

  return (
    <div>
      <div className="scroll-x">
        <TabList value={active} onChange={setActive} size="sm" hasDivider>
          {harnesses.map((h) => (
            <Tab key={h.name} value={h.name} label={labelFor(h.name)} />
          ))}
        </TabList>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6 mb-4">
        <code
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-code)", color: "var(--ink)" }}
        >
          {harness.name}
        </code>
        {/* The bound is the one thing on this row that qualifies the claim, so
            it gets the only glyph — a bounded region inside a larger space.
            The badge label still states the bound in words. */}
        {proof?.bound && (
          <Badge variant="purple" label={proof.bound} icon={<Bound size={13} />} />
        )}
        <Badge variant="teal" label="verbatim" />
      </div>

      {proof && (
        <p className="text-sm leading-relaxed max-w-2xl mb-6" style={{ color: "var(--muted)" }}>
          {proof.establishes}
        </p>
      )}

      <CodeBlock
        code={harness.code}
        language="rust"
        title={harness.file}
        hasLineNumbers
        maxHeight={480}
      />
    </div>
  );
}
