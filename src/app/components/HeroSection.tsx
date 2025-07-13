import React from "react";
import type { HeroSection as HeroSectionType } from "@/data/types";

interface HeroSectionProps {
  section: HeroSectionType;
}

const HeroSection: React.FC<HeroSectionProps> = ({ section }) => (
  <section className="relative py-12 md:py-20 flex flex-col items-center justify-center text-center bg-gradient-to-br from-wheat-100 via-cadet_gray-100 to-wheat-300 overflow-hidden">
    {/* Animated background pattern */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" className="opacity-10 animate-pulse" style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx="50%" cy="50%" r="180" fill="#4281a4" />
        <circle cx="80%" cy="20%" r="60" fill="#7a542e" />
        <circle cx="20%" cy="80%" r="40" fill="#9cafb7" />
      </svg>
    </div>
    <div className="relative z-10">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-rich_black-500 drop-shadow-lg tracking-tight animate-fade-in">
        {section.title}
      </h1>
      {section.subtitle && <h2 className="text-2xl md:text-3xl mb-8 text-coyote-600 font-semibold animate-slide-up" style={{ animationDelay: '0.2s' }}>{section.subtitle}</h2>}
      {Array.isArray(section.highlights) && (
        <ul className="space-y-2 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {section.highlights.map((h: string, i: number) => (
            <li key={i} className="text-lg md:text-xl text-cadet_gray-700 font-medium animate-slide-up" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>{h}</li>
          ))}
        </ul>
      )}
      {/* Example animation placeholder */}
      <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-cerulean-500 animate-bounce shadow-lg mx-auto mt-4" aria-label="Animated Hero Art" />
    </div>
  </section>
);

export default HeroSection; 