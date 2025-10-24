import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    ignores: [
      "eslint.config.js",
      "commitlint.config.js",
      "vite.config.ts",
      "dist",
    ],
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-explicit-any': 'error',
    }
  },
  tseslint.configs.recommended,
]);
