# enchanser

"Enhancer" wrapper over [`mertizci/noai-watermark`](https://github.com/mertizci/noai-watermark).

enchanser removes AI provenance marks from images **you generated yourself**:

- invisible pixel watermarks (SynthID-class) via diffusion regeneration;
- AI metadata (C2PA, EXIF, XMP, IPTC).

It is a privacy/hygiene tool for content you own. It is **not** a guarantee that
a file will stop being identified as AI-generated: statistical AI classifiers
and forensic analysis read the pixels themselves and are unaffected by watermark
removal, and the service that generated the file may still hold a server-side
record.

## Install

enchanser is not vendored here. We pin the upstream version in a local venv
(gitignored):

```bash
python3 -m venv tools/enchanser/.venv
tools/enchanser/.venv/bin/pip install noai-watermark
```

Pinned at install time to `noai-watermark 0.1.33`. The engine picks a device by
itself (CUDA > MPS > CPU); on Apple silicon it runs on MPS. Override with the
`NOAI_DEVICE` env var (e.g. `NOAI_DEVICE=cpu`) and tune regeneration strength
with `NOAI_STRENGTH` (default `0.15`).

## Our wrapper: `enchanser.sh`

`enchanser.sh` is our own thin glue (bash) over the upstream CLI. It locates the
venv, runs the right mode, and exposes a small, stable interface:

```bash
tools/enchanser/enchanser.sh identify <path>        # report AI metadata
tools/enchanser/enchanser.sh clean <path> -o out    # AI metadata only (lossless)
tools/enchanser/enchanser.sh full  <path> -o out    # regenerate pixels + strip metadata
tools/enchanser/enchanser.sh batch <dir> -o outdir  # run "full" on every image in a folder
```

- **`clean`** → `--metadata --remove-ai`. Lossless: strips C2PA/EXIF/XMP only, no
  pixel change, so the invisible mark survives it.
- **`full`** → pixel regeneration (removes the invisible SynthID-class mark) and
  also strips AI metadata. This is the path that removes the invisible mark.
- **`batch`** is the "generate, then clean" step: point your generator's output
  folder at it after you export images you own.

## LIMITS (verified on this machine)

- The regeneration is **lossy** (it re-renders pixels; ~0.5–1% of pixels change
  at the default low strength, visually near-identical) and **seed-dependent**.
- There is **no local SynthID pixel decoder** and **no public detector API**, so
  removal **cannot be auto-verified** here. `identify` reading "no signal" only
  means no *AI metadata* was found — it does not prove a file is
  watermark-free. Verify by hand with Google's SynthID Detector (manual,
  account-gated, ~10 checks/day).
- Removal does not defeat **statistical pixel classifiers** or forensic analysis,
  and it does not erase the generator's **server-side record**.

## Basic use (upstream CLI)

```bash
# regenerate pixels (removes invisible watermark, lossy) + strip AI metadata
tools/enchanser/.venv/bin/noai-watermark image.png -o clean.png --device mps -y

# check for AI metadata (no changes)
tools/enchanser/.venv/bin/noai-watermark image.png --metadata --check-ai

# strip AI metadata only (lossless, no pixel change)
tools/enchanser/.venv/bin/noai-watermark image.png --metadata --remove-ai -o clean.png
```

## License

See [`noai-watermark`](https://github.com/mertizci/noai-watermark)'s repo for its
license. This folder contains only our own glue (the wrapper script and docs) —
no upstream code is vendored here.
