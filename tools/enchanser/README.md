# enchanser

"Enhancer" wrapper over two upstream tools:

- [`wiltodelta/remove-ai-watermarks`](https://github.com/wiltodelta/remove-ai-watermarks) —
  visible marks + AI metadata. Its invisible pipeline is **CUDA-only**.
- [`mertizci/noai-watermark`](https://github.com/mertizci/noai-watermark) —
  invisible pixel marks (SynthID-class) via diffusion regeneration on
  **MPS/CPU/CUDA**. This is the fallback that works on Apple silicon.

enchanser removes AI provenance marks from images and video **you generated
yourself**:

- visible marks (Gemini sparkle logo, Veo text, NotebookLM logo);
- invisible pixel watermarks (SynthID-class) via diffusion regeneration;
- AI metadata (C2PA, EXIF, XMP, IPTC).

It is a privacy/hygiene tool for content you own. It is **not** a guarantee that
a file will stop being identified as AI-generated: statistical AI classifiers
and forensic analysis read the pixels themselves and are unaffected by watermark
removal, and the service that generated the file may still hold a server-side
record.

## Install

enchanser is not vendored here. We pin upstream versions in two local venvs
(both gitignored). On macOS you need **both**; the second provides the
MPS/CPU invisible-removal engine.

```bash
# 1) visible marks + metadata + torch-free detector (no GPU)
python3 -m venv tools/enchanser/.venv
tools/enchanser/.venv/bin/pip install "remove-ai-watermarks[visible,detect]"

# 2) invisible (SynthID-class) regeneration on MPS/CPU (macOS/Windows/Linux)
#    Kept in a SEPARATE venv so its bundled pure-Python c2pa.py is not shadowed
#    by c2pa-python from the first venv.
python3 -m venv tools/enchanser/.venv-noai
tools/enchanser/.venv-noai/bin/pip install noai-watermark
```

Pinned at install time to `remove-ai-watermarks 0.46.0` and
`noai-watermark 0.1.33`. If MPS is unavailable, set `NOAI_DEVICE=cpu` when
running `full`.

## Our wrapper: `enchanser.sh`

`enchanser.sh` is our own thin glue (bash) over the upstream CLI. It locates the
venv, runs the right subcommand, and prints an honest warning when a step is
unavailable on this machine.

```bash
tools/enchanser/enchanser.sh identify <path>        # report provenance signals
tools/enchanser/enchanser.sh clean <path> -o out    # visible marks + metadata
tools/enchanser/enchanser.sh full  <path> -o out    # + invisible + metadata
tools/enchanser/enchanser.sh batch <dir> -o outdir  # every image in a folder
```

`full` picks its engine automatically:

- **CUDA GPU present** → `remove-ai-watermarks all` (native invisible pipeline).
- **No CUDA (macOS)** → `remove-ai-watermarks visible`, then `noai-watermark`
  pixel regeneration on MPS (set `NOAI_DEVICE=cpu` to force CPU). This is the
  path that actually removes the invisible mark on Apple silicon.

`batch` is the "generate, then clean" step: point your generator's output folder
at it after you export images you own.

## LIMITS (verified on this machine)

- `remove-ai-watermarks`' own **invisible** step is **CUDA-only** (no CPU/MPS
  profile). On macOS, `enchanser.sh full` therefore falls back to
  `noai-watermark` for that step. The regeneration is **lossy** (it re-renders
  pixels; ~0.5–1% of pixels change at the default low strength, visually
  near-identical) and **seed-dependent**.
- There is **no local SynthID pixel decoder** and **no public detector API**, so
  removal **cannot be auto-verified** here. `identify` reading "no signal" only
  means no *metadata proxy* was found — it does not prove a file is
  watermark-free. Verify by hand with Google's SynthID Detector (manual,
  account-gated, ~10 checks/day).
- Removal does not defeat **statistical pixel classifiers** or forensic analysis,
  and it does not erase the generator's **server-side record**.

## Basic use (upstream CLI)

```bash
# inspect provenance signals (no changes)
remove-ai-watermarks identify image.png

# remove visible marks + metadata
remove-ai-watermarks visible image.png -o clean.png

# remove invisible watermark (lossy, needs GPU)
remove-ai-watermarks invisible image.png -o clean.png

# full pipeline (CUDA only)
remove-ai-watermarks all image.png -o clean.png
```

`noai-watermark` (the MPS/CPU invisible engine), used directly:

```bash
tools/enchanser/.venv-noai/bin/noai-watermark image.png -o clean.png --device mps -y
```

## What we do NOT build here

We do not ship a "generate then auto-clean" pipeline whose purpose is to make
AI-generated images pass as human-made. That would be content laundering, and
it does not work reliably anyway (see limitations above). enchanser is used
manually, on files we own, when we have a legitimate privacy/hygiene reason.

If you need to verify whether an image carries a SynthID mark, use Google's
official SynthID Detector (manual, account-gated, ~10 checks/day) — there is no
public API for it. See `docs/` and the upstream repo for details.

## License

`remove-ai-watermarks` is Apache License 2.0; check `noai-watermark`'s repo for
its license. This folder contains only our own glue (the wrapper script and
docs) — no upstream code is vendored here.