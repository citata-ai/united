#!/bin/bash
# Turn a black-and-white engraving (style E, brand/IMAGES.md) into site images:
# upscale x4 (Real-ESRGAN), crop part of the empty sky, map black → minium and white → parchment,
# then write WebP sizes 640–3840 and an OG JPG.
# Usage: brand/engrave.sh <in.png> <name> <crop_top_fraction> [out_dir]
# Needs ESRGAN_DIR with realesrgan-ncnn-vulkan and models/ (github.com/xinntao/Real-ESRGAN, v0.2.5.0).
set -euo pipefail
in=$1; name=$2; crop=$3; out=${4:-landing/public}
tmp=$(mktemp -d)
"$ESRGAN_DIR/realesrgan-ncnn-vulkan" -i "$in" -o "$tmp/x4.png" -n realesrgan-x4plus -m "$ESRGAN_DIR/models" >/dev/null 2>&1
# Ink #C1410B (193,65,11), paper #F5EFE3 (245,239,227). Gray 0 → ink, 255 → paper. Curves push near-black
# and near-white to pure ink and paper, so the sky is one flat color.
ffmpeg -loglevel error -y -i "$tmp/x4.png" -vf "crop=iw:ih*(1-$crop):0:ih*$crop,format=gray,curves=all='0/0 0.18/0 0.82/1 1/1',format=rgb24,lutrgb=r='193+(245-193)*val/255':g='65+(239-65)*val/255':b='11+(227-11)*val/255'" "$tmp/master.png"
for w in 640 960 1280 1920 2560 3840; do cwebp -quiet -q 80 -resize $w 0 "$tmp/master.png" -o "$out/img/$name-$w.webp"; done
ffmpeg -loglevel error -y -i "$tmp/master.png" -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630:(iw-1200)/2:ih-630" -q:v 3 "$out/og/$name.jpg"
cp "$tmp/master.png" "/tmp/$name-master.png"
sips -g pixelWidth -g pixelHeight "$tmp/master.png" | awk '/pixel/{printf "%s ", $2} END{print ""}'
rm -rf "$tmp"
