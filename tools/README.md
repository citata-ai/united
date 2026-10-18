# enchanser

`enchanser` removes AI watermarks and AI metadata from images that we generated
ourselves. It is our own glue — a wrapper script plus docs — not a vendored copy
of any upstream project.

- Wrapper: [`enchanser.sh`](enchanser/enchanser.sh)
- Full docs, install steps and verified limits: [`enchanser/README.md`](enchanser/README.md)

## What it wraps

[`mertizci/noai-watermark`](https://github.com/mertizci/noai-watermark), installed
into a local venv (gitignored). It removes invisible (SynthID-class) watermarks by
regenerating pixels on MPS/CPU/CUDA and strips AI metadata (C2PA, EXIF, XMP).

`enchanser.sh` exposes a small interface over it: `identify` (report AI metadata),
`clean` (strip metadata only, lossless), `full` (regenerate pixels + strip
metadata), and `batch` (run `full` over a folder).

## Limits

Removal is lossy and is not a guarantee that a file stops reading as AI-generated.
Detectors read the pixels themselves, not just the watermark, and the service that
generated the file may keep a server-side record. Before you alter content that
you will publish, check the tool's license and the platform's AI-disclosure rules.
