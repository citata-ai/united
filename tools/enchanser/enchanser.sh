#!/usr/bin/env bash
#
# enchanser — thin wrapper over the upstream `noai-watermark` CLI.
#
# Removes AI provenance marks from images YOU generated yourself:
#   - invisible pixel watermarks (SynthID-class) via diffusion regeneration
#   - AI metadata (C2PA, EXIF, XMP, PNG text)
#
# This is a privacy/hygiene tool for content you own. It does NOT make a file
# stop being AI-generated: pixel classifiers and forensic analysis read the
# pixels themselves and are unaffected, and the generator may keep a server-side
# record. See tools/enchanser/README.md.
#
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV="$HERE/.venv"
NOAI="$VENV/bin/noai-watermark"
NOAI_DEVICE="${NOAI_DEVICE:-auto}"   # auto | cpu | mps | cuda
NOAI_STRENGTH="${NOAI_STRENGTH:-}"   # optional 0.0-1.0; empty = tool default (0.15)

# --- sanity -----------------------------------------------------------------
if [[ ! -x "$NOAI" ]]; then
  echo "enchanser: noai-watermark not found at $NOAI" >&2
  echo "  Install it:  python3 -m venv $VENV && $VENV/bin/pip install noai-watermark" >&2
  exit 1
fi

usage() {
  cat <<'EOF'
enchanser — strip AI provenance marks from images you own.

Usage:
  enchanser.sh identify <path>              Report AI metadata (no changes).
  enchanser.sh clean    <path> [-o out]     Remove AI metadata only (lossless).
  enchanser.sh full     <path> [-o out]     Regenerate pixels + strip metadata.
  enchanser.sh batch    <dir>   [-o outdir] Run "full" on every image in a folder.
  enchanser.sh version                      Show tool version.

How it works (single engine: noai-watermark):
  - "clean" -> --metadata --remove-ai. Lossless; strips C2PA/EXIF/XMP only, no
               pixel change, so the invisible mark survives it.
  - "full"  -> pixel regeneration (removes the invisible SynthID-class mark) and
               also strips AI metadata. Lossy: it re-renders pixels.
  - device defaults to "auto" (CUDA > MPS > CPU). Override: NOAI_DEVICE=cpu.
  - strength defaults to the tool's 0.15. Override: NOAI_STRENGTH=0.3.

Notes:
  - Removal cannot be auto-verified here (no public SynthID detector API).
    Verify by hand with Google's SynthID Detector.
EOF
}

# --- arg helpers ------------------------------------------------------------
MODE="${1:-}"
shift || true
SRC=""
OUT=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    -o|--output) OUT="$2"; shift 2 ;;
    -*) echo "enchanser: unknown flag $1" >&2; exit 2 ;;
    *)  SRC="$1"; shift ;;
  esac
done

default_out() { # <src> -> <src>_enchansed.<ext>
  local dir base ext
  dir="$(dirname "$SRC")"; base="$(basename "$SRC")"; ext="${SRC##*.}"
  echo "$dir/${base%.*}_enchansed.$ext"
}

regen() { # <in> <out> — pixel regeneration + AI-metadata strip
  local in="$1" out="$2"
  local args=("$in" -o "$out" --device "$NOAI_DEVICE" -y)
  [[ -n "$NOAI_STRENGTH" ]] && args+=(--strength "$NOAI_STRENGTH")
  "$NOAI" "${args[@]}"
}

case "$MODE" in
  version)
    v="$("$NOAI" --help 2>&1 | grep -oE 'v\.[0-9]+(\.[0-9]+)*' | head -1 || true)"
    echo "noai-watermark ${v:-unknown} ($NOAI)"
    ;;

  identify)
    [[ -n "$SRC" ]] || { usage; exit 2; }
    exec "$NOAI" "$SRC" --metadata --check-ai
    ;;

  clean)
    [[ -n "$SRC" ]] || { usage; exit 2; }
    ARGS=("$SRC" --metadata --remove-ai)
    [[ -n "$OUT" ]] && ARGS+=(-o "$OUT")
    exec "$NOAI" "${ARGS[@]}"
    ;;

  full)
    [[ -n "$SRC" ]] || { usage; exit 2; }
    FINAL="${OUT:-$(default_out)}"
    regen "$SRC" "$FINAL"
    echo "enchanser: wrote $FINAL"
    ;;

  batch)
    [[ -n "$SRC" ]] || { usage; exit 2; }
    OUTDIR="${OUT:-$SRC}"
    mkdir -p "$OUTDIR"
    n=0
    shopt -s nullglob
    for f in "$SRC"/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WebP}; do
      regen "$f" "$OUTDIR/$(basename "$f")"
      n=$((n + 1))
    done
    shopt -u nullglob
    echo "enchanser: processed $n image(s) into $OUTDIR"
    ;;

  *)
    usage
    exit 2
    ;;
esac
