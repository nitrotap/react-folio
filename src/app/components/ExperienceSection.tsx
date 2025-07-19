import React from "react";
import type { ExperienceSection, Experience } from "@/data/types";

interface ExperienceSectionProps {
  section: ExperienceSection;
  variant?: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ section }) => (
  <section className="py-10 md:py-16 max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-coyote-700 tracking-tight">{section.title}</h2>
    <div className="space-y-8">
      {section.experiences?.map((exp: Experience, i: number) => (
        <div key={i} className=" rounded-xl p-6 shadow- bg-white/80">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <span className="font-bold text-lg md:text-xl text-rich_black-500">{exp.title}</span>
            <span className="text-cadet_gray-600 text-base md:text-lg">{exp.company} | {exp.period}</span>
          </div>
          <ul className="list-disc list-inside ml-4 text-cadet_gray-700 text-base md:text-lg space-y-1">
            {exp.highlights.map((h: string, j: number) => <li key={j}>{h}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection; 