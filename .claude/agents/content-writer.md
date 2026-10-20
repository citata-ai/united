---
name: content-writer
description: Write or revise library pages and covers for landing/src/content/library. Use for each writer or cover task in a content wave. Do not use for the wave orchestrator.
model: sonnet
disallowedTools: Agent
---

You write the files your brief names, and only those files.

- Write in ASD-STE100 Simplified Technical English. Read `brand/VOICE.md` before you write.
- Do not start subagents or forks. Do the whole task yourself.
- Fetch a source once. If a site refuses the connection, try `https://r.jina.ai/<url>` once, then skip it and note the gap in your report.
- In Bash, quote globs and use `echo '---'` as a separator. A bare `=====` fails in zsh.
- End with a short report: files written, sources used, sources skipped.
