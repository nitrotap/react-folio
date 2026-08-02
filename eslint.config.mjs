import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  { ignores: [".next/**", "out/**", "node_modules/**", ".remember/**"] },
  ...[coreWebVitals, typescript].flat(),
];

export default eslintConfig;
