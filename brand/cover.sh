#!/bin/bash
# Turn a generated style-N cover (brand/IMAGES.md, section 7) into site images:
# upscale x4 (Real-ESRGAN), write WebP 640–2560 to landing/public/img, an OG JPG 1200x630 to
# landing/public/og, and the 2560 master to brand/art/current. No recolor.
# Usage: brand/cover.sh <in.png> <name-vN>    (run from the repo root)
# Needs cwebp and ffmpeg (brew install webp ffmpeg). Downloads Real-ESRGAN v0.2.5.0 to
# ESRGAN_DIR (default /tmp/esrgan) when it is missing.
set -euo pipefail
in=$1; name=$2
ESRGAN_DIR=${ESRGAN_DIR:-/tmp/esrgan}
if [ ! -x "$ESRGAN_DIR/realesrgan-ncnn-vulkan" ]; then
  mkdir -p "$ESRGAN_DIR"
  curl -sL -o "$ESRGAN_DIR/r.zip" \
    https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-macos.zip
  unzip -oq "$ESRGAN_DIR/r.zip" -d "$ESRGAN_DIR"
  chmod u+x "$ESRGAN_DIR/realesrgan-ncnn-vulkan"
fi
tmp=$(mktemp -d)
"$ESRGAN_DIR/realesrgan-ncnn-vulkan" -i "$in" -o "$tmp/x4.png" -n realesrgan-x4plus -m "$ESRGAN_DIR/models" >/dev/null 2>&1
for w in 640 720 960 1280 1920 2560; do
  cwebp -quiet -q 82 -resize $w 0 "$tmp/x4.png" -o "landing/public/img/$name-$w.webp"
done
cp "landing/public/img/$name-2560.webp" "brand/art/current/$name.webp"
ffmpeg -loglevel error -y -i "$tmp/x4.png" \
  -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -q:v 3 "landing/public/og/$name.jpg"
sips -g pixelWidth -g pixelHeight "$tmp/x4.png" | awk '/pixel/{printf "%s ", $2} END{print ""}'
rm -rf "$tmp"
