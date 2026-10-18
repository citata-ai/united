/**
 * Import direction for the workspace (docs/architecture.md, section 1):
 *
 *   backend ──▶ business ◀── frontend        landing: standalone
 *
 * business/ is the domain core. It never imports backend, frontend, landing,
 * Cloudflare, Alchemy, HTTP or UI code. Only alchemy.run.ts (the composition
 * root) may join the packages together.
 */
import { expect, it } from "@effect/vitest";
import { glob, readFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const packages = ["business", "backend", "frontend", "landing"] as const;
type Package = (typeof packages)[number];

/** The sibling packages each package may import. */
const allowed: Record<Package, ReadonlyArray<Package>> = {
  business: [],
  backend: ["business"],
  frontend: ["business"],
  landing: [],
};

const importPattern = /\b(?:from\s*|import\s*(?:\(\s*)?)["']([^"']+)["']/g;

const sourceFiles = async (pkg: Package): Promise<ReadonlyArray<string>> => {
  const files: Array<string> = [];
  for await (const path of glob("**/*.{ts,mts,js,mjs,astro}", {
    cwd: resolve(root, pkg),
    exclude: (name) => name === "node_modules" || name === "dist" || name === ".astro",
  })) {
    files.push(path);
  }
  return files;
};

const importsOf = async (pkg: Package, path: string): Promise<ReadonlyArray<string>> => {
  const source = await readFile(resolve(root, pkg, path), "utf8");
  return [...source.matchAll(importPattern)].flatMap((match) =>
    match[1] === undefined ? [] : [match[1]],
  );
};

/** The workspace package a specifier points into, if any. */
const targetPackage = (pkg: Package, path: string, specifier: string): string | undefined => {
  const scoped = /^@citata\/([^/]+)/.exec(specifier);
  if (scoped) return scoped[1];
  if (!specifier.startsWith(".")) return undefined;
  const target = relative(root, resolve(root, pkg, dirname(path), specifier));
  return target.startsWith("..") ? "<outside repo>" : (target.split(sep)[0] ?? undefined);
};

it("each package imports only the sibling packages it may use", async () => {
  const violations: Array<string> = [];
  for (const pkg of packages) {
    for (const path of await sourceFiles(pkg)) {
      for (const specifier of await importsOf(pkg, path)) {
        const target = targetPackage(pkg, path, specifier);
        if (target === undefined || target === pkg) continue;
        if (!(allowed[pkg] as ReadonlyArray<string>).includes(target)) {
          violations.push(`${pkg}/${path}: ${specifier}`);
        }
      }
    }
  }
  expect(violations).toEqual([]);
});

it("business/ stays free of platform, HTTP and UI code", async () => {
  const runtime = /^(?:effect(?:\/|$)|smol-toml$)/;
  // Tests may also use the test runner, Node built-ins and the Node FileSystem layer.
  const testOnly = /^(?:@effect\/vitest$|@effect\/platform-node$|node:)/;
  const forbiddenEffect = /^effect\/(?:http|unstable)/;
  const violations: Array<string> = [];
  for (const path of await sourceFiles("business")) {
    for (const specifier of await importsOf("business", path)) {
      if (specifier.startsWith(".")) continue;
      const ok =
        (runtime.test(specifier) && !forbiddenEffect.test(specifier)) ||
        (path.endsWith(".test.ts") && testOnly.test(specifier));
      if (!ok) violations.push(`business/${path}: ${specifier}`);
    }
  }
  expect(violations).toEqual([]);
});
