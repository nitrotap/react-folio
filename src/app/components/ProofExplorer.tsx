"use client";

import { useMemo, useState } from "react";
import { TabList, Tab } from "@astryxdesign/core/TabList";
import { Badge } from "@astryxdesign/core/Badge";
import { HoverCard } from "@astryxdesign/core/HoverCard";
import { Divider } from "@astryxdesign/core/Divider";
import { useToast } from "@astryxdesign/core/Toast";
import type { Proof } from "@/data/site";

const ALL = "all";

export default function ProofExplorer({ proofs }: { proofs: Proof[] }) {
  const areas = useMemo(() => [...new Set(proofs.map((p) => p.area))], [proofs]);
  const [area, setArea] = useState<string>(ALL);
  const showToast = useToast();

  const shown = area === ALL ? proofs : proofs.filter((p) => p.area === area);

  async function copyName(name: string) {
    try {
      await navigator.clipboard.writeText(name);
      showToast({ body: `Copied ${name}`, uniqueID: "copy-proof" });
    } catch {
      showToast({ body: "Could not copy to clipboard", type: "error", uniqueID: "copy-proof" });
    }
  }

  return (
    <div>
      <div className="scroll-x">
        <TabList value={area} onChange={setArea} size="sm" hasDivider>
          <Tab value={ALL} label={`All ${proofs.length}`} />
          {areas.map((a) => (
            <Tab key={a} value={a} label={a} />
          ))}
        </TabList>
      </div>

      <ul className="flex flex-col gap-3 mt-7">
        {shown.map((proof) => (
          <li key={proof.name} className="surface p-5 kj-reveal">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
              {/*
                HoverCard, not a tooltip: the bound is a real caveat a reader may
                want to dwell on, and it is block content. Wrapped in a div
                because HoverCard renders inline and block content inside a <p>
                would be reparented by the browser.
              */}
              <HoverCard
                placement="above"
                alignment="start"
                label={`About ${proof.name}`}
                content={
                  <div className="max-w-xs p-1">
                    <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
                      {proof.area} · Kani harness
                    </p>
                    <p className="text-sm leading-relaxed mb-3">{proof.establishes}</p>
                    {proof.bound ? (
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                        Checked over <strong style={{ color: "var(--accent)" }}>{proof.bound}</strong>.
                        CBMC is a bounded model checker — scalar domains are exhaustive, but
                        size-parameterised properties are proven at small fixed sizes.
                      </p>
                    ) : (
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                        Bound not published for this harness.
                      </p>
                    )}
                  </div>
                }
              >
                <button
                  type="button"
                  onClick={() => copyName(proof.name)}
                  className="kj-proof text-sm font-semibold text-left"
                  style={{ fontFamily: "var(--font-code)", color: "var(--ink)" }}
                  title="Copy harness name"
                >
                  {proof.name}
                </button>
              </HoverCard>

              <Badge variant="teal" label={proof.area} />
              {proof.bound && <Badge variant="purple" label={proof.bound} />}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {proof.establishes}
            </p>
          </li>
        ))}
      </ul>

      <Divider variant="subtle" xstyle={undefined} />

      <p className="text-xs mt-6" style={{ color: "var(--muted)" }}>
        Showing {shown.length} of {proofs.length} named harnesses. Hover a name for its bound;
        click to copy it.
      </p>
    </div>
  );
}
