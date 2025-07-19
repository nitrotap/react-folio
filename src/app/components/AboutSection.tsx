import React from "react";
import type { Section } from "@/data/types";

interface AboutSectionProps {
  section: Section & { highlights?: string[] };
  variant?: string;
}

function getHighlights(section: Section & { highlights?: string[] }): string[] {
  if (Array.isArray(section.highlights)) {
    return section.highlights;
  }
  return [];
}

const AboutSection: React.FC<AboutSectionProps> = ({ section, variant }) => {
  const description = section.metadata?.description;
  const highlights = getHighlights(section);
  const selectedVariant = variant || section.variant || 'classic';

  if (selectedVariant === 'classic') {
    return (
      <section id={section.id} className="py-16 md:py-24 max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-coyote-700 tracking-tight leading-tight">{section.title}</h2>
        {description && <p className="mb-8 text-lg text-cadet_gray-700 max-w-2xl font-sans">{description}</p>}
        {section.paragraphs?.map((p, i) => (
          <p key={i} className="mb-5 text-lg md:text-xl text-cadet_gray-800 leading-relaxed font-sans">{p}</p>
        ))}
      </section>
    );
  }

  if (selectedVariant === 'card') {
    return (
      <section id={section.id} className="py-16 md:py-24 flex justify-center bg-white/50">
        <div className="bg-surface border border-border rounded-xl shadow-md p-10 max-w-2xl w-full">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-coyote-700 tracking-tight leading-tight">{section.title}</h2>
          {description && <p className="mb-8 text-lg text-cadet_gray-700 max-w-2xl font-sans">{description}</p>}
          {section.paragraphs?.map((p, i) => (
            <p key={i} className="mb-5 text-lg md:text-xl text-cadet_gray-800 leading-relaxed font-sans">{p}</p>
          ))}
          {highlights.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((h, i) => (
                <span key={i} className=" text-coyote-700 px-4 py-2 rounded-full text-base font-medium shadow">{h}</span>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Variant 3: Split Layout
  if (selectedVariant === 'split') {
    return (
      <section id={section.id} className="py-16 md:py-24 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-coyote-700 tracking-tight leading-tight">{section.title}</h2>
            {description && <p className="mb-8 text-lg text-cadet_gray-700 max-w-2xl font-sans">{description}</p>}
            {section.paragraphs?.map((p, i) => (
              <p key={i} className="mb-5 text-lg md:text-xl text-cadet_gray-800 leading-relaxed font-sans">{p}</p>
            ))}
          </div>
          {highlights.length > 0 && (
            <div className="flex-1  border border-border rounded-xl shadow-md p-8 bg-white/50">
              <h3 className="font-heading text-2xl font-semibold text-coyote-700 mb-6 ">Highlights</h3>
              <ul className="space-y-4">
                {highlights.map((h, i) => (
                  <li key={i} className="text-cadet_gray-900 text-lg leading-snug font-sans before:content-['•'] before:mr-2 before:text-cerulean-700">{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Fallback
  return null;
};

export default AboutSection; 