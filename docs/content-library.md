# Content library

Status: v1, 2026-10-19. Owner: Tao. Goal: a big stock of draft articles that we publish at a steady speed.

## How it works

- Articles live in `landing/src/content/library/<slug>.md`. URL: `/guides/<slug>`.
- `visible: false` (default) = draft. A draft does not build. It is not in the sitemap, RSS, `llms-full.txt` or `/guides`.
- `visible: true` = live on the next deploy. The cover rule applies (`landing/guide-covers.test.ts`, `brand/IMAGES.md` section 7).
- The topic plan is `business/marketing/content-plan.toml` (one `[[topic]]` per article, with its cluster and status).
- `landing/library.test.ts` checks every file, drafts too: frontmatter keys, 600+ body words, 3+ FAQ items, 1+ source, no H1.

## Frontmatter

Same keys as the guides in `landing/src/pages/guides/*.md` (see `business/marketing/content-batch-1.md`), but no `layout`, plus:

| Key | Value |
|---|---|
| `visible` | `false` until we publish it |
| `cluster` | cluster id from `content-plan.toml` |
| `kind` | `guide`, `how-to`, `comparison`, `checklist`, `glossary`, `template`, `data`, `local` |
| `priority` | 1 (publish first) to 9 (last). Default 5 |
| `inspired_by` | competitor URL that showed the demand (optional) |
| `about` | schema.org Article `about` list (optional) |

## Publish

1. Make covers for the next articles (`brand/IMAGES.md` section 7).
2. `mise run publish:library -- 10` makes the next 10 drafts with a cover visible and sets their dates to today. `--no-cover` skips the cover check (the test then fails until covers exist). `--dry` only lists them.
3. `mise run check`, commit, merge into `stage`, check, then publish under `docs/growth-loop.md`.

Speed: Google treats a flood of new pages as a risk ("scaled content abuse"). Publish about 3 to 10 articles a day, not hundreds.
