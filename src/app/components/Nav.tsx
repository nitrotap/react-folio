"use client";
import Link from "next/link";
import { nav } from "@/data/nav";

const Nav = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
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
