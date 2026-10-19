// Content library: articles in src/content/library/<slug>.md, served at /guides/<slug>.
// Agents write many drafts; a page builds only when `visible: true` (docs/content-library.md).
// Drafts are not built, so they are not in the sitemap, RSS, llms-full.txt or /guides.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const library = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/library" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    headline: z.string(),
    dek: z.string(),
    published: z.string(),
    updated: z.string(),
    answer: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    sources: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
    /** false = draft (not built). Flip with `mise run publish:library`. */
    visible: z.boolean().default(false),
    /** Topic cluster id from business/marketing/content-plan.toml. */
    cluster: z.string(),
    kind: z.string(),
    /** Publish order inside the queue. Lower goes first. */
    priority: z.number().default(5),
    /** Competitor page that showed demand for the topic, if any. */
    inspired_by: z.string().optional(),
    /** schema.org Article "about". */
    about: z.array(z.string()).optional(),
  }),
});

export const collections = { library };
