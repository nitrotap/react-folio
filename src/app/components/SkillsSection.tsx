import React from "react";
import type { Section } from "@/data/types";

interface SkillsSectionProps {
  section: Section;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ section }) => (
  <section className="py-10 md:py-16 max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-coyote-700 tracking-tight">{section.title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {section.lists?.map((list, i) => (
        <ul key={i} className="list-disc list-inside text-cadet_gray-800 text-base md:text-lg space-y-1">
          {list.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      ))}
    </div>
  </section>
);

export default SkillsSection; 