import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Stray lockfiles exist in ~ and ~/Code; without this Turbopack infers the
  // wrong workspace root and resolves modules from there.
  turbopack: { root: __dirname },
  // `output: "export"` has no server, so there is nothing to run the image
  // optimiser at request time. Sources are pre-sized and converted to WebP at
  // author time instead (the crab went 4.6MB PNG -> 58KB WebP that way).
  images: { unoptimized: true },
};

export default nextConfig;
