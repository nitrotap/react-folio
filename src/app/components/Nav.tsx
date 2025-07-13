"use client";
import Link from "next/link";
import { getNavLinks } from "@/data/nav";

const Nav = () => {
  const navLinks = getNavLinks();
  return (
    <nav className="w-full py-4 bg-rich_black-500 shadow flex items-center justify-between px-8">
      {/* Branding/Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-coyote-600 font-extrabold text-2xl tracking-tight hover:text-coyote-700 transition-colors">
        </Link>
      </div>
      {/* Navigation Links */}
      <ul className="flex space-x-8">
        {navLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-wheat-500 hover:text-cerulean-500 font-semibold transition-colors duration-200 px-2 py-1 rounded hover:bg-coyote-100"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
