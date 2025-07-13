import React from "react";
import type { ProjectSection, Project } from "@/data/types";

interface ProjectSectionProps {
  section: ProjectSection;
  variant?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ section }) => (
  <section className="py-10 md:py-16 max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-coyote-700 tracking-tight">{section.title}</h2>
    <div className="grid md:grid-cols-2 gap-10">
      {section.projects?.map((project: Project, i: number) => (
        <div key={i} className="bg-wheat-100 rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105">
          {project.screenshot && (
            <img src={project.screenshot} alt={project.name} className="w-full h-44 object-cover rounded mb-4" />
          )}
          <h3 className="text-2xl font-bold mb-2 text-rich_black-500">{project.name}</h3>
          <p className="mb-3 text-cadet_gray-700 text-base md:text-lg text-center">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.techStack?.map((tech: string, j: number) => (
              <span key={j} className="bg-cadet_gray-200 text-xs px-2 py-1 rounded">{tech}</span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.url && <a href={project.url} target="_blank" rel="noopener" className="text-cerulean-600 hover:underline">Live</a>}
            {project.github && <a href={project.github} target="_blank" rel="noopener" className="text-cerulean-600 hover:underline">GitHub</a>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProjectSection; 