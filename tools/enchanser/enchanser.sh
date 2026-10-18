#!/usr/bin/env bash
#
# enchanser — thin wrapper over two upstream CLIs:
#   - `remove-ai-watermarks` (wiltodelta)  -> visible marks + AI metadata
#   - `noai-watermark`        (mertizci)   -> invisible pixel marks (MPS/CPU/CUDA)
#
# Removes AI provenance marks from images and video YOU generated yourself:
#   - visible marks (Gemini sparkle, Veo text, NotebookLM logo)
#   - AI metadata (C2PA, EXIF, XMP, PNG text)
#   - invisible pixel watermarks (SynthID-class)
#
# On a CUDA box the invisible step runs in remove-ai-watermarks. On macOS/CPU
# (no CUDA) we fall back to noai-watermark, which regenerates pixels on MPS/CPU.
#
# This is a privacy/hygiene tool for content you own. It does NOT make a file
# stop being AI-generated: pixel classifiers and forensic analysis read the
# pixels themselves and are unaffected, and the generator may keep a server-side
# record. See tools/enchanser/README.md.
#
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV="$HERE/.venv"
NOAI_VENV="$HERE/.venv-noai"
CLI="$VENV/bin/remove-ai-watermarks"
NOAI="$NOAI_VENV/bin/noai-watermark"
NOAI_DEVICE="${NOAI_DEVICE:-mps}"   # set NOAI_DEVICE=cpu if MPS is unavailable

# --- sanity -----------------------------------------------------------------
if [[ ! -x "$CLI" ]]; then
  echo "enchanser: upstream CLI not found at $CLI" >&2
  echo "  Install it:  python3 -m venv $VENV && $VENV/bin/pip install 'remove-ai-watermarks[visible,detect]'" >&2
  exit 1
fi

have_cuda() {
  # remove-ai-watermarks' invisible pipeline is CUDA-only upstream.
  command -v nvidia-smi >/dev/null 2>&1
}

have_noai() { [[ -x "$NOAI" ]]; }

usage() {
  cat <<'EOF'
enchanser — strip AI provenance marks from media you own.

Usage:
  enchanser.sh identify <path>              Report provenance signals (no changes).
  enchanser.sh clean    <path> [-o out]     Remove visible marks + metadata (no GPU).
  enchanser.sh full     <path> [-o out]     Visible + invisible + metadata.
  enchanser.sh batch    <dir>   [-o outdir] Process every image in a directory.
  enchanser.sh version                      Show upstream versions.

How "full" picks its engine:
  - CUDA GPU present  -> remove-ai-watermarks all (native invisible pipeline).
  - No CUDA (macOS)   -> remove-ai-watermarks visible, then noai-watermark
                         pixel regeneration on MPS (NOAI_DEVICE=cpu to force CPU).

Notes:
  - "clean" only strips visible marks + metadata; the invisible mark survives.
  - "full" is lossy where the invisible step runs (regeneration changes pixels).
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

case "$MODE" in
  version)
    "$CLI" --version
    have_noai && "$NOAI" --help >/dev/null 2>&1 && echo "noai-watermark: present ($NOAI)"
    ;;

  identify)
    [[ -n "$SRC" ]] || { usage; exit 2; }
    exec "$CLI" identify "$SRC"
    ;;

  clean)
    [[ -n "$SRC" ]] || { usage; exit 2; }
    ARGS=(visible "$SRC")
    [[ -n "$OUT" ]] && ARGS+=(-o "$OUT")
    exec "$CLI" "${ARGS[@]}"
    ;;

  full)
    [[ -n "$SRC" ]] || { usage; exit 2; }
    if have_cuda; then
      ARGS=(all "$SRC")
      [[ -n "$OUT" ]] && ARGS+=(-o "$OUT")
      exec "$CLI" "${ARGS[@]}"
    fi

    # No CUDA: visible+metadata via remove-ai-watermarks, invisible via noai.
    FINAL="${OUT:-$(default_out)}"
    echo "enchanser: no CUDA GPU. Step 1/2 remove-ai-watermarks visible -> step 2/2 noai-watermark ($NOAI_DEVICE)."
    WORKDIR="$(mktemp -d)"
    trap 'rm -rf "$WORKDIR"' EXIT
    MID="$WORKDIR/mid.png"
    # Visible-mark removal is best-effort: upstream writes output only when it
    # actually finds a mark, so tolerate a no-op and fall back to the source.
    "$CLI" visible "$SRC" -o "$MID" >/dev/null 2>&1 || true
    INPUT="$SRC"
    [[ -f "$MID" ]] && INPUT="$MID"

    if have_noai; then
      "$NOAI" "$INPUT" -o "$FINAL" --device "$NOAI_DEVICE" -y
      echo "enchanser: wrote $FINAL"
    else
      echo "enchanser: noai-watermark not found at $NOAI" >&2
      echo "  Install it (separate venv, so its bundled c2pa.py is not shadowed):" >&2
      echo "    python3 -m venv $NOAI_VENV && $NOAI_VENV/bin/pip install noai-watermark" >&2
      echo "  Copying input as-is (invisible mark NOT removed)." >&2
      cp "$INPUT" "$FINAL"
      echo "enchanser: wrote $FINAL"
    fi
    ;;

  batch)
    [[ -n "$SRC" ]] || { usage; exit 2; }
    ARGS=(batch "$SRC")
    [[ -n "$OUT" ]] && ARGS+=(-o "$OUT")
    exec "$CLI" "${ARGS[@]}"
    ;;

  *)
    usage
    exit 2
    ;;
esac
