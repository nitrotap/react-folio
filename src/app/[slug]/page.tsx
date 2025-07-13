import { siteData } from "@/data/siteData";
import Section from "../components/Section";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { fetchGithubProjects } from "@/data/fetchGithubProjects";
import type { Project } from "@/data/types";

export async function generateStaticParams() {
  return siteData.pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = siteData.pages.find(async (p) => p.slug === (await params).slug);
  if (!page) return {};
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      images: page.metadata.image ? [page.metadata.image] : undefined,
    },
  };
}

const GITHUB_USERNAME = "nitrotap";

export default async function Page({ params }: { params: { slug: string } }) {
  const page = siteData.pages.find((p) => p.slug === params.slug);
  if (!page) return <div className="text-center py-20">Page not found.</div>;

  // If this is the projects page, fetch GitHub projects and inject them
  if (params.slug === "projects") {
    let githubProjects: Project[] = [];
    try {
      const ghProjects = (await fetchGithubProjects(GITHUB_USERNAME)).sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
      githubProjects = ghProjects.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.homepage || repo.html_url,
        github: repo.html_url,
        techStack: repo.topics,
        // No screenshot available from GitHub API
      }));
    } catch {
      const projectSection = page.sections.find((section) => section.type === "project");
      githubProjects = projectSection && 'projects' in projectSection ? (projectSection.projects as Project[]) : [];
    }

    // Define pinned project repo names (case-insensitive)
    const pinnedNames = [
      "city-code-assistant",
      "brain-lift",
      "mental-health-check",
      "ionic-poetry-masher",
    ];
    const pinnedProjects = githubProjects.filter(p => pinnedNames.includes(p.name.toLowerCase()));
    const unpinnedProjects = githubProjects.filter(p => !pinnedNames.includes(p.name.toLowerCase()));

    // Prepare sections: pinned first, then the rest
    const pinnedSection = {
      ...page.sections[0],
      id: "pinned-projects",
      title: "Pinned Projects",
      projects: pinnedProjects
    };
    const mainSection = {
      ...page.sections[0],
      id: "all-projects",
      title: "All Projects",
      projects: unpinnedProjects
    };
    const dynamicPage = {
      ...page,
      sections: [pinnedSection, mainSection]
    };
    return (
      <>
        <main>
          {dynamicPage.sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </main>
        <Footer />
      </>
    );
  }

  // Default: static rendering
  return (
    <>
      <main>
        {page.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </main>
      <Footer />
    </>
  );
}