import React from "react";
import type { Section, SkillGroup } from "@/data/types";

interface SkillsSectionProps {
  section: Section;
  variant?: string;
}

function isSkillGroupArray(arr: unknown[]): arr is SkillGroup[] {
  return arr.length > 0 && typeof (arr[0] as SkillGroup).title === 'string' && Array.isArray((arr[0] as SkillGroup).items);
}
function isStringArrayArray(arr: unknown[]): arr is string[][] {
  return arr.length > 0 && Array.isArray(arr[0]) && typeof arr[0][0] === 'string';
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ section, variant }) => {
  const groups = Array.isArray(section.lists) && isSkillGroupArray(section.lists) ? section.lists : [];
  const description = section.metadata?.description;
  const selectedVariant = variant || section.variant || 'card';

  // Variant: Project Badges (shields.io)
  if (
    selectedVariant === 'project-badges' &&
    Array.isArray((section as Section & { projects?: { name: string; techStack?: string[] }[] }).projects)
  ) {
    const projects = (section as Section & { projects?: { name: string; techStack?: string[] }[] }).projects!;
    // Helper to generate shields.io badge URL for a given tech
    const getBadgeUrl = (tech: string) => {
      // Map tech to shields.io params (add more as needed)
      const badgeMap: Record<string, { label: string; color: string; logo?: string }> = {
        'MongoDB': { label: 'MongoDB', color: '4EA94B', logo: 'MongoDB' },
        'Express.js': { label: 'Express.js', color: '000000', logo: 'Express' },
        'React': { label: 'React', color: '61DAFB', logo: 'react' },
        'Node.js': { label: 'Node', color: '339933', logo: 'Node.js' },
        'Apollo Server': { label: 'ApolloServer', color: '311C87' },
        'GraphQL': { label: 'GraphQL', color: 'E10098', logo: 'GraphQL' },
        'Chart.js': { label: 'Chart.js', color: 'FF6384', logo: 'Chart.js' },
        'Material UI': { label: 'MaterialUI', color: '0081CB', logo: 'Material-UI' },
        'Heroku': { label: 'Heroku', color: '430098', logo: 'heroku' },
        'bcrypt': { label: 'bcrypt', color: '5A6E9C' },
        'JSON Web Tokens': { label: 'JSONWebTokens', color: '000000', logo: 'jsonwebtokens' },
        'MariaDB': { label: 'MariaDB', color: '003545', logo: 'MariaDB' },
        'PHP': { label: 'PHP', color: '777BB4', logo: 'php' },
        'Apache Server': { label: 'Apache', color: 'D22128', logo: 'apache' },
        'Angular': { label: 'Angular', color: 'DD0031', logo: 'angular' },
        'Ionic': { label: 'Ionic', color: '3880FF', logo: 'ionic' },
        'Capacitor': { label: 'Capacitor', color: '119EFF', logo: 'capacitor' },
        'Cordova': { label: 'Cordova', color: 'E8E8E8', logo: 'apachecordova' },
        'Ubuntu Linux': { label: 'Ubuntu', color: 'E95420', logo: 'ubuntu' },
      };
      const badge = badgeMap[tech] || { label: tech, color: 'gray' };
      const logo = badge.logo ? `&logo=${encodeURIComponent(badge.logo)}` : '';
      return `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${badge.color}?style=for-the-badge${logo}&logoColor=white`;
    };
    return (
      <section className="py-12 md:py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-coyote-700 tracking-tight">{section.title}</h2>
        {description && <p className="mb-8 text-lg text-cadet_gray-700 max-w-2xl">{description}</p>}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <div key={i} className="bg-wheat-50 border border-wheat-200 rounded-2xl shadow-md p-6">
              <div className="text-xl font-semibold text-coyote-700 mb-3">{project.name}</div>
              {Array.isArray(project.techStack) && (
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, j) => (
                    <img
                      key={j}
                      src={getBadgeUrl(tech)}
                      alt={`${tech} Badge`}
                      style={{ margin: '2px', height: '32px' }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Variant 1: Card Grid with Badges
  if (selectedVariant === 'card') {
    return (
      <section className="py-12 md:py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-coyote-700 tracking-tight">{section.title}</h2>
        {description && <p className="mb-8 text-lg text-cadet_gray-700 max-w-2xl">{description}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((group, i) => (
            <div key={i} className="bg-wheat-50 border border-wheat-200 rounded-2xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-lg">
              <div className="text-lg md:text-xl font-semibold text-coyote-700 mb-3">{group.title}</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {group.items.map((item, j) => (
                  <span key={j} className="bg-cerulean-50 text-cerulean-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-cerulean-100 transition-colors">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Variant 2: Minimalist Table
  if (selectedVariant === 'table') {
    return (
      <section className="py-12 md:py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-coyote-700 tracking-tight">{section.title}</h2>
        {description && <p className="mb-8 text-lg text-cadet_gray-700 max-w-2xl">{description}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <tbody>
              {groups.map((group, i) => (
                <tr key={i} className="align-top">
                  <td className="pr-6 py-2 text-coyote-700 font-semibold whitespace-nowrap text-base md:text-lg">{group.title}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, j) => (
                        <span key={j} className="bg-wheat-100 text-cadet_gray-900 px-3 py-1 rounded-full text-sm font-medium shadow-sm">{item}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  // Fallback: old list style (string[][])
  if (Array.isArray(section.lists) && isStringArrayArray(section.lists)) {
    const lists = section.lists;
    return (
      <section className="py-10 md:py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-coyote-700 tracking-tight">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lists.map((list: string[], i: number) => (
            <ul key={i} className="list-disc list-inside text-cadet_gray-800 text-base md:text-lg space-y-1">
              {list.map((item: string, j: number) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>
    );
  }
  return null;
};

export default SkillsSection; 