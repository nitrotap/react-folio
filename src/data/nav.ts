export interface NavLink {
  name: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}


export const nav: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Resume",
    href: "/resume",
  },
];