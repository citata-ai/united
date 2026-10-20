#!/bin/bash
# Make style-N covers for the next drafts in publish order (brand/IMAGES.md section 7, docs/content-library.md).
# launchd runs it every 2 hours. It keeps schedule.toml [covers] buffer_days of publishing ahead and stops on quota.
# It commits to stage but does not push: publish.sh pushes. The night check looks at each new cover.
# Test: COVERS_FORCE=1 tools/library/covers.sh makes 1 cover now, buffer or not.
JOB=covers
source "$(dirname "$0")/common.sh"
lock
sync_stage
slugs=$(python3 tools/library/library.py need-covers)
[ -z "$slugs" ] && { log "buffer full, nothing to do"; exit 0; }
printf 'generate_image:\n  enabled: true\n' > /tmp/omp-img.yml
refs=(guide-agencies-v2 guide-appfolio-buildium-v1 guide-leads-v2 guide-checklist-v2)
made=0; fails=0
for slug in $slugs; do
  d=/tmp/img-$slug; rm -rf "$d"; mkdir -p "$d"
  meta=$(python3 tools/library/library.py meta "$slug")
  sky=$(python3 tools/library/library.py sky)
  skyword=$(echo "$sky" | awk '{print $(NF-1)}')
  ref=${refs[$(( RANDOM % 4 ))]}
  ffmpeg -loglevel error -y -i "brand/art/current/$ref.webp" "$d/ref.png"
  style="Use the image $d/ref.png as the style reference: same neo-Renaissance pop engraving (crisp engraved line work and cross-hatching like a vintage postage stamp, one flat saturated sky color with no gradient, buildings and objects recolored in a fresh pop palette of pink, coral, lilac, mint, cobalt blue and cream). The sky is one flat $sky field, no clouds. Aspect ratio 16:9. No text, no letters, no numbers, no logos, no watermark, no frame, no border."
  ask="You make one cover picture for this article: $meta
Steps:
1. Write one scene (1-2 sentences) that shows the article's one idea as a Roman scene: a man in an orange toga is the landlord or property manager; add one modern object (a CRT computer, a rotary phone, a key, a letterbox) and one property detail (small tiled houses, a two-flat). No text, no signs, no screens with UI, no brand names. Save the scene to $d/scene.txt.
2. Write alt text: one sentence that starts 'A pop engraving under a $skyword sky: ' and describes the scene. Save it to $d/alt.txt.
3. Use the generate_image tool once with this prompt: '$style New scene: <your scene>'. Save the image as $d/$slug.png.
Reply only with the image path."
  timeout -k 10 600 omp -p --no-session --config /tmp/omp-img.yml --auto-approve --max-time 8m --model gemini-3-flash "$ask" > "$d/log.txt" 2>&1
  if [ ! -s "$d/$slug.png" ] || [ ! -s "$d/alt.txt" ]; then
    fails=$((fails + 1)); log "FAIL $slug ($(grep -oE '429|RESOURCE_EXHAUSTED|quota' "$d/log.txt" | head -1))"
    [ $fails -ge 2 ] && { log "2 fails in a row, stop (quota?)"; break; }
    continue
  fi
  fails=0
  img="guide-$slug-v1"
  brand/cover.sh "$d/$slug.png" "$img" >/dev/null || { log "cover.sh failed $slug"; continue; }
  python3 tools/library/library.py add-cover "$slug" "$img" "$(tr -d '\n' < "$d/alt.txt")" "$style New scene: $(tr -d '\n' < "$d/scene.txt")"
  git add "landing/public/img/$img"-*.webp "landing/public/og/$img.jpg" "brand/art/current/$img.webp" \
    landing/src/data/guide-covers.ts landing/public/img/prompts.toml
  made=$((made + 1)); log "OK $slug -> $img ($sky)"
done
[ $made -eq 0 ] && exit 0
bunx vitest run landing/guide-covers.test.ts >/dev/null 2>&1 || { log "cover test failed, not committed"; exit 1; }
git commit -qm "covers: $made library covers (style N, tools/library/covers.sh)" && log "committed $made covers"
