import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import { experience } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Software engineering at Phase Change Software, instructional work at edX, web development at ATHENA Consulting, and healthcare software implementation at Epic.",
};

export default function ExperiencePage() {
  return (
    <div className="w-full">
      <PageHeader
        eyebrow="§ Experience"
        title="Where I've worked"
        lede="Statistics, then enterprise healthcare software, then a decade elsewhere, then back to engineering — and now AI."
      />

      <div className="max-w-4xl mx-auto pb-16">
        <ol className="flex flex-col gap-5">
          {experience.map((role) => (
            <li key={`${role.company}-${role.period}`} className="surface p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                <h2 className="text-xl font-semibold">{role.company}</h2>
                <span
                  className="text-xs"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}
                >
                  {role.period}
                </span>
              </div>
              <p className="text-sm mb-1" style={{ color: "var(--accent)" }}>
                {role.title}
              </p>
              <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>
                {role.location}
                {role.arrangement && ` · ${role.arrangement}`}
              </p>
              <ul className="flex flex-col gap-2.5">
                {role.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden style={{ color: "var(--accent)" }}>
                      ·
                    </span>
                    <span style={{ color: "var(--muted)" }}>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
