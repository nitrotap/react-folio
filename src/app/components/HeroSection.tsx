import React from "react";
import type { HeroSection as HeroSectionType } from "@/data/types";
import Link from "next/link";

interface HeroSectionProps {
  section: HeroSectionType;
  variant?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ section, variant }) => {
  const selectedVariant = variant || section.variant || "minimal";

  // Variant 1: Minimal (current, improved)
  if (selectedVariant === "minimal") {
    return (
      <section className="relative py-16 md:py-28 flex flex-col items-center justify-center text-center bg-gradient-to-br from-wheat-100 via-cadet_gray-100 to-wheat-300 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%" className="opacity-10 animate-pulse" style={{ position: 'absolute', top: 0, left: 0 }}>
            <circle cx="50%" cy="50%" r="180" fill="#4281a4" />
            <circle cx="80%" cy="20%" r="60" fill="#7a542e" />
            <circle cx="20%" cy="80%" r="40" fill="#9cafb7" />
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold mb-4 text-coyote-700 drop-shadow-lg tracking-tight animate-fade-in">
            {section.title}
          </h1>
          {section.subtitle && <h2 className="text-2xl md:text-3xl mb-8 text-cadet_gray-700 font-semibold animate-slide-up" style={{ animationDelay: '0.2s' }}>{section.subtitle}</h2>}
          {Array.isArray(section.highlights) && (
            <ul className="space-y-2 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {section.highlights.map((h: string, i: number) => (
                <li key={i} className="text-lg md:text-xl text-cadet_gray-700 font-medium animate-slide-up" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>{h}</li>
              ))}
            </ul>
          )}
          {/* My Image */}
          <img
            src="/images/kj-img.jpg"
            alt="KJ smiling by a lake"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg object-cover mx-auto mb-6 border-4 border-white"
            style={{ animationDelay: '0.5s' }}
          />
          {/* Animated Hero Art */}
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-cerulean-700 animate-bounce shadow-lg mx-auto mt-4" />
        </div>
      </section>
    );
  }

  // Variant 2: Split Layout
  if (selectedVariant === "split") {
    return (
      <section className="py-20 md:py-32 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 bg-gradient-to-r from-wheat-100 via-surface to-wheat-100">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start md:items-start text-left z-10">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 text-coyote-700 drop-shadow-lg tracking-tight animate-fade-in">
            {section.title}
          </h1>
          {section.subtitle && <h2 className="text-2xl md:text-3xl mb-8 text-cadet_gray-700 font-semibold animate-slide-up" style={{ animationDelay: '0.2s' }}>{section.subtitle}</h2>}
          {Array.isArray(section.highlights) && (
            <ul className="space-y-2 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {section.highlights.map((h: string, i: number) => (
                <li key={i} className="text-lg md:text-xl text-cadet_gray-700 font-medium animate-slide-up" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>{h}</li>
              ))}
            </ul>
          )}
        </div>
        {/* Right: Animated Art + My Image */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <img
            src="/images/kj-img.jpg"
            alt="KJ smiling by a lake"
            className="w-40 h-40 md:w-64 md:h-64 rounded-full shadow-lg object-cover mb-6 border-4 border-white"
            style={{ animationDelay: '0.5s' }}
          />
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cerulean-700 via-wheat-100 to-coyote-700 shadow-lg animate-bounce-slow flex items-center justify-center">
            <svg width="120" height="120" className="opacity-80 animate-spin-slow" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" stroke="#2B6CB0" strokeWidth="8" fill="none" />
              <circle cx="60" cy="60" r="30" stroke="#F6E05E" strokeWidth="6" fill="none" />
              <circle cx="60" cy="60" r="10" fill="#1A365D" />
            </svg>
          </div>
        </div>
      </section>
    );
  }

  // Variant 3: Showcase (visually appealing, modern)
  if (selectedVariant === "showcase") {
    // NOTE: For real icons, install lucide-react and import { ArrowRight, Play, Star } from 'lucide-react'.
    // The SVGs below are inline for portability.

    // Fix: section.badge and section.stats do not exist on type 'HeroSection'.
    // Use fallback values directly, or extend the type if needed.
    const badge: { label: string; icon?: string } = { label: "Featured Project", icon: "Star" };
    const stats: { label: string; value: string }[] = [
      { label: "Years Experience", value: "2+" },
      { label: "Projects", value: "25+" },
      { label: "Certifications", value: "5" },
    ];
    // Lucide icons import
    // import { ArrowRight, Play, Star } from 'lucide-react';
    // But for dynamic import, use require or dynamic import if SSR
    // For now, assume static import at top of file:
    // import { ArrowRight, Play, Star } from 'lucide-react';
    // If not present, user should add it.
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-wheat-100 via-white to-cadet_gray-100 flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cerulean-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-coyote-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-wheat-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* My Image */}
            <img
              src="/images/kj-img.jpg"
              alt="KJ smiling by a lake"
              className="w-40 h-40 md:w-56 md:h-56 rounded-full shadow-lg object-cover mx-auto mb-8 border-4 border-white"
              style={{ animationDelay: '0.5s' }}
            />
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-cadet_gray-200 mb-8 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Star icon */}
              <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.755l6.914-1.004L12 2.5l3.086 6.251L22 9.755l-5.007 4.367 1.179 6.873z" /></svg>
              <span className="text-sm font-medium text-cadet_gray-700"><Link href="/projects">{badge.label}</Link></span>
            </div>
            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-coyote-900 mb-6 leading-tight">
              {section.title || "Build Something"}
              <span className="text-3xl block bg-gradient-to-r from-cerulean-700 to-coyote-700 bg-clip-text">
                {section.subtitle || "Amazing"}
              </span>
            </h1>
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-cadet_gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              {"Transform your ideas into reality with cutting-edge web and AI solutions. Experience the future of digital innovation today."}
            </p>
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/experience" className="group bg-coyote-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-coyote-800 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Experience
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>

              </Link>
              <Link href="/projects" className="group bg-white/80 backdrop-blur-sm text-coyote-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-all duration-300 flex items-center border border-cadet_gray-200 shadow-sm hover:shadow-md">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Projects
              </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat: { label: string; value: string }, i: number) => (
                <div key={i} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-cadet_gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-3xl font-bold text-coyote-900 mb-2">{stat.value}</div>
                  <div className="text-cadet_gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-cerulean-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-10 w-6 h-6 bg-coyote-400 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-wheat-400 rounded-full animate-bounce animation-delay-2000"></div>
      </section>
    );
  }


  // Fallback
  return null;
};

export default HeroSection; 