import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "business",
          root: "business",
          include: ["src/**/*.test.ts"],
          environment: "node",
        },
      },
      {
        test: {
          name: "backend",
          root: "backend",
          include: ["src/**/*.test.ts"],
          environment: "node",
        },
      },
      {
        test: {
          name: "landing",
          root: "landing",
          include: ["*.test.ts"],
          environment: "node",
        },
      },
      {
        resolve: {
          alias: { "@/": fileURLToPath(new URL("./frontend/src/", import.meta.url)) },
          dedupe: ["effect", "foldkit"],
        },
        test: {
          name: "frontend",
          root: "frontend",
          include: ["src/**/*.test.ts"],
          environment: "node",
        },
      },
    ],
  },
});
