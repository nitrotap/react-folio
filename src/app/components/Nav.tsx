"use client";
import Link from "next/link";
import { getNavLinks } from "@/data/nav";
import { useState } from "react";

const Nav = () => {
  const navLinks = getNavLinks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 bg-rich_black-500 flex items-center justify-between px-4 md:px-8">
      {/* Branding/Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-coyote-600 font-extrabold text-2xl tracking-tight hover:text-coyote-700 transition-colors"
          aria-label="Home">
          Kartik Jevaji
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-wheat-500 hover:text-cerulean-500"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Navigation Links - Desktop */}
      <ul className="hidden md:flex space-x-8">
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

      {/* Navigation Links - Mobile */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white p-4 md:hidden">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-wheat-500 hover:text-cerulean-500 font-semibold transition-colors duration-200 block px-2 py-1 rounded hover:bg-coyote-100"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={"Navigate to " + item.name}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
