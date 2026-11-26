import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    ignores: ["dist/", ".astro/", ".wrangler/", "node_modules/"],
  },
  {
    // Root config files run in Node (they read DEPLOY_TARGET & co. from the env).
    files: ["*.config.{js,mjs,ts}"],
    languageOptions: { globals: { process: "readonly" } },
  },
);
