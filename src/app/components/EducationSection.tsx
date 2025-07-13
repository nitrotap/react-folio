import React from "react";
import type { EducationSection, Education } from "@/data/types";

interface EducationSectionProps {
  section: EducationSection;
}

const EducationSection: React.FC<EducationSectionProps> = ({ section }) => (
  <section className="py-10 md:py-16 max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-coyote-700 tracking-tight">{section.title}</h2>
    <ul className="space-y-6">
      {section.education?.map((edu: Education, i: number) => (
        <li key={i} className="bg-wheat-50 rounded-xl p-6 shadow-md">
          <div className="font-bold text-lg md:text-xl text-rich_black-500">{edu.degree}</div>
          <div className="text-cadet_gray-700 text-base md:text-lg">{edu.institution} ({edu.year})</div>
        </li>
      ))}
    </ul>
  </section>
);

export default EducationSection; 