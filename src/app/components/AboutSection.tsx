import React from "react";
import type { Section } from "@/data/types";

interface AboutSectionProps {
  section: Section;
}

const AboutSection: React.FC<AboutSectionProps> = ({ section }) => (
  <section className="py-10 md:py-16 max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-coyote-700 tracking-tight">{section.title}</h2>
    {section.paragraphs?.map((p, i) => (
      <p key={i} className="mb-4 text-lg md:text-xl text-cadet_gray-800 leading-relaxed">{p}</p>
    ))}
  </section>
);

export default AboutSection; 