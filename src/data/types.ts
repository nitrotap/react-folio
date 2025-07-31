// Base Section interface
export interface Section {
  id: string;
  type: string;
  title: string;
  variant?: string;
  subtitle?: string;
  paragraphs?: string[];
  media?: string[];
  lists?: (string[] | SkillGroup[]);
  extras?: unknown[];
  metadata?: SectionMetadata;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SectionMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

export interface HeroSection extends Section {
  type: 'hero';
  highlights: string[];
  animation?: string;
}

export interface ProjectSection extends Section {
  type: 'project';
  projects: Project[];
}

export interface ExperienceSection extends Section {
  type: 'experience';
  experiences: Experience[];
}

export interface EducationSection extends Section {
  type: 'education';
  education: Education[];
}

export interface ContactSection extends Section {
  type: 'contact';
  contactMethods: ContactMethod[];
}

export interface Page {
  slug: string;
  title: string;
  sections: Section[];
  metadata: PageMetadata;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  github?: string;
  techStack?: string[];
  screenshot?: string;
}

export interface Experience {
  company: string;
  title: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  highlights?: string[];
}

export interface ContactMethod {
  type: string;
  value: string;
  url?: string;
}

