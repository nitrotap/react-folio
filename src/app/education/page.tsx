import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import { education } from "@/data/site";

export const metadata: Metadata = {
  title: "Education",
  description:
    "MS and BS in Statistics from the University of Pittsburgh, web development certificates from Regis University and the University of Minnesota, and CompTIA A+.",
};

export default function EducationPage() {
  return (
    <div className="w-full">
      <PageHeader
        eyebrow="§ Education"
        title="Education & certifications"
        lede="A statistics degree in 2010, a return to software in 2022, and the certifications along the way."
      />

      <div className="max-w-4xl mx-auto pb-16">
        <ol className="flex flex-col gap-4">
          {education.map((c) => (
            <li key={`${c.institution}-${c.award}`} className="surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-lg font-semibold">{c.institution}</h2>
                <span
                  className="text-xs"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-code)" }}
                >
                  {c.period}
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: "var(--accent)" }}>
                {c.award}
              </p>
              {c.note && (
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {c.note}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
