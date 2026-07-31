import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Stray lockfiles exist in ~ and ~/Code; without this Turbopack infers the
  // wrong workspace root and resolves modules from there.
  turbopack: { root: __dirname },
};

export default nextConfig;
