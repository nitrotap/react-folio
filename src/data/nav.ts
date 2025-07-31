import { siteData } from "./siteData";

export interface NavLink {
  name: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}

export function getNavLinks(): NavLink[] {
  return siteData.pages.map(page => ({
    name: page.title,
    href: page.slug === "home" ? "/" : `/${page.slug}`,
  }));
}