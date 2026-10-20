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

## Publish (automatic since 2026-10-20)

Scripts do the daily work. An agent only checks the result once a night.

| Job | When | Does |
|---|---|---|
| `tools/library/covers.sh` | every 2 h (launchd) | Covers for the next drafts in publish order, until 3 days of publishing have covers. One variant, style N, via omp. Stops after 2 fails (quota). Commits on `stage`, no push. |
| `tools/library/publish.sh` | 06:00, 14:00, 22:00 (launchd) | Makes the next drafts with a cover visible, tests, builds, pushes `stage`, waits for the deploy, checks 200, merges `stage` into `main`, waits, checks 200. Logs to `business/marketing/content-plan/publish-log.tsv`. |
| Night check (T3 scheduled agent) | 04:00 | Reads the logs, looks at each new cover, removes bad ones, fixes a failed run, checks review notes for the next drafts. |

- Speed: `tools/library/schedule.toml`. From 2026-10-20: 4 a day for 7 days, 8 a day for 21 days, then 16 a day. Change the file to change the speed.
- Both jobs run in the worktree `/Users/admin/.t3/worktrees/citata.ai/library-publisher` on branch `stage`. A lock (`/tmp/citata-library.lock`) keeps them apart.
- Logs: `~/Library/Logs/citata-library/{covers,publish}.log`.
- Install: copy `tools/library/launchd/*.plist` to `~/Library/LaunchAgents/` and `launchctl load` them. Stop: `launchctl unload` the same files.
- A script never resets the tree. A dirty tree or a failed run stops the next runs until the night check fixes it.
- Google treats a flood of new pages as a risk ("scaled content abuse"). Do not go above 16 a day. Slow down if Search Console shows many "Crawled, not indexed" pages.

By hand: `mise run publish:library -- 10` (`--dry` to list, `--no-cover` to skip the cover check).
