import { defineConfig } from "oxlint";
import effect from "@mpsuesser/oxlint-plugin-effect";
import foldkit from "@foldkit/oxlint-plugin";

export default defineConfig({
  ignorePatterns: [
    "**/dist/**",
    "**/.astro/**",
    "**/.alchemy/**",
    "patches/**",
    // Vendored anatomy kit and the generated citation engine (landing/scripts/mechanism).
    "landing/vendor/**",
    "landing/public/mechanism/**",
  ],
  jsPlugins: [...effect.configs.recommended.jsPlugins, ...foldkit.configs.recommended.jsPlugins],
  rules: {
    "effect/avoid-non-null-assertion": "error",
    "effect/no-chained-type-assertions": "error",
    "effect/no-module-mocking": "error",
  },
  overrides: [
    { files: ["frontend/src/**/*.ts"], rules: foldkit.configs.recommended.rules },
    ...foldkit.configs.recommended.overrides,
  ],
});
