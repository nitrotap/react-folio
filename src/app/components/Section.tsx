import React from "react";
import type {
  Section as SectionType,
  HeroSection as HeroSectionType,
  ProjectSection as ProjectSectionType,
  ExperienceSection as ExperienceSectionType,
  EducationSection as EducationSectionType,
  ContactSection as ContactSectionType
} from "@/data/types";
import HeroSectionComponent from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectSectionComponent from "./ProjectSection";
import ExperienceSectionComponent from "./ExperienceSection";
import EducationSectionComponent from "./EducationSection";
import ContactSectionComponent from "./ContactSection";

interface SectionProps {
  section: SectionType;
}

const Section: React.FC<SectionProps> = ({ section }) => {
  switch (section.type) {
    case "hero":
      return <HeroSectionComponent section={section as HeroSectionType} variant={section.variant} />;
    case "about":
      return <AboutSection section={section} variant={section.variant} />;
    case "skills":
      return <SkillsSection section={section} variant={section.variant} />;
    case "project":
      return <ProjectSectionComponent section={section as ProjectSectionType} variant={section.variant} />;
    case "experience":
      return <ExperienceSectionComponent section={section as ExperienceSectionType} variant={section.variant} />;
    case "education":
      return <EducationSectionComponent section={section as EducationSectionType} variant={section.variant} />;
    case "contact":
      return <ContactSectionComponent section={section as ContactSectionType} variant={section.variant} />;
    default:
      return null;
  }
};

export default Section;
