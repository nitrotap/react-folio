export interface GithubProject {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  pushed_at: string;
}

export async function fetchGithubProjects(username: string): Promise<GithubProject[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: {
      Accept: "application/vnd.github.mercy-preview+json", // for topics
    },
    // Optionally add Authorization header for higher rate limits
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  const data = await res.json();
  return (data as unknown[]).map((repo) => {
    const r = repo as Record<string, unknown>;
    return {
      name: r.name as string,
      description: r.description as string,
      html_url: r.html_url as string,
      homepage: (r.homepage as string) || null,
      language: (r.language as string) || null,
      topics: (r.topics as string[]) || [],
      pushed_at: r.pushed_at as string,
    };
  });
} 