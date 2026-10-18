# tools/

External tools we use in this repo. Each subfolder documents one tool, how to
install it, and how we call it.

| Tool | Folder | Purpose |
| ---- | ------ | ------- |
| enchanser | `tools/enchanser/` | Remove visible and invisible AI watermarks and AI metadata from images and video. Wraps [`wiltodelta/remove-ai-watermarks`](https://github.com/wiltodelta/remove-ai-watermarks) (Apache 2.0) for visible marks + metadata, and [`mertizci/noai-watermark`](https://github.com/mertizci/noai-watermark) for invisible (SynthID-class) removal on MPS/CPU. |

## Rules

- Tools here are **external dependencies**, not our code. We do not vendor them by
  default; we document how to install them and pin a version.
- Anything we commit under `tools/` must be our own glue (scripts, config,
  wrappers), never a copy of an upstream project. Upstream code lives in its own
  repo and is installed via `pip`/`uv`/`git clone`.
- Before you use a tool to alter content that will be published, read the tool's
  own license and the platform's AI-disclosure rules. Removing a watermark does
  not change what a file is, and it does not remove server-side records.