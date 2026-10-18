# IMAGES.md — AI-generated images for citata.ai

Status: v1, 2026-10-18. Owner: Tao. Parent: [`DESIGN.md`](DESIGN.md) → Imagery.

This file holds the image style, the prompt blocks and the process. Use it for every cover, hero, OG and social image. Copy the style block word for word, so all images look like one family.

## 1. Reference: every.to, October 2026

We studied the covers on the every.to home page on 2026-10-18 ("Codex's Comeback Up Close", "Context Engineering", "How Codex Happened", "Compound Engineering").

What makes them work:

| Trait | every.to does | Our first images (v1) did |
|---|---|---|
| Texture | One black-and-white photo halftone for all things, also the modern object | Grey statue plus flat cartoon objects in color |
| Scene | Full frame: ground, horizon, sky, buildings | One cut-out on an empty background |
| Edges | No outline; parts meet like a photo montage | White sticker border around each cut-out |
| Color | One flat, bright field (sky or background); the rest is greyscale. Sometimes a duotone: a statue printed in one ink on a field of another color | Many colors on the objects |
| Subject | One old thing and one modern thing in one calm, centered scene (a CRT computer in the Acropolis) | Statue holds a modern prop |
| Mood | Calm, editorial, a little strange | Pop, playful |

## 2. Hero and footer: T · Three-ink stamp engraving (current, since 2026-10-18)

The owner chose this over E: more color, same engraving. Options shown: Botticelli tempera, hand-colored engraving, fresco, three-ink stamp; the stamp won.

- Line engraving in three inks on clean white paper: lapis blue, minium orange-red (roofs, stone, the toga), dark green (trees). No gray, no gradients.
- The sky is clean white paper: no lines, no clouds, no birds. The text sits on it in ink. No guilloche rings on the hero or footer (rings are for stamps only).
- No sea in the hero. No fade at the bottom: the scene ends on paved ground, so no object is cut by the edge.
- On the site the image has `mix-blend-mode: multiply`, so the white paper becomes the page color. Do not put `isolate` on its parent, or the blend stops.
- From 1280 px the text sits in the empty sky over the image; below that, text first and the image after it.
- Footer easter egg: St Joseph, patron of home owners, landlords and realtors, in the "no room at the inn" scene with Mary (see the table).

**Style block T** (use as is, then upscale ×4 with Real-ESRGAN; no recolor):

```text
Style: a vintage postage-stamp line engraving printed in three inks on clean white paper: deep lapis blue, minium orange-red for roofs and stone, dark green for trees and cypresses; crisp engraved lines and cross-hatching, no gray, no gradients. The sky is pure clean white paper: no lines, no hatching, no clouds, no birds, no texture, completely empty. No text, no letters, no numbers, no logos, no watermark, no frame, no border line around the picture.
```

| Image | Scene (add block T) |
|---|---|
| `hero-v7` (current) | Edit of the chosen option-4 picture: crane and scaffolding over tiled houses and an arcade (left), a large temple with cypresses (right), a small temple with a glowing door, the man in the orange toga with the key walking toward us in the exact center. Sky made clean, sea and boats replaced by a paved plaza to the bottom edge, no fade. White margins cropped so the scene runs edge to edge. |
| `footer-v7` (current) | Easter egg made open (owner, 2026-10-18): "no room at the inn". Evening street in Bethlehem: an innkeeper with a lantern turns travelers away; Joseph with a staff leads a donkey with Mary; both have thin engraved halos; they head to a lit cave stable with a manger and an ox. Message for landlords and realtors: Joseph knows the stress of searching, refusals and finding a place. Upper 55 % empty sky. |
| `hero-v6`, `footer-v6` (old) | Vignette hero with a faded bottom; hill-town footer with Joseph as a carpenter. |

## 2a. Old: E · Two-tone engraving (hero-v5, footer-v5)

The owner chose this style for the hero and the footer after the halftone versions looked low-quality when upscaled. References: a two-tone engraved footer (ink sky, cream land) and an engraved postage stamp.

- Crisp line engraving, two colors only: minium ink `#C1410B` on parchment `#F5EFE3`. No gray, no halftone dots.
- Compose the art AROUND the text (owner, 2026-10-18): tall things on the left and right edges up to the top, the skyline low in the middle, an empty ink-color sky where the text goes. From 1280 px wide the image fills the block and the text sits in that empty sky; below 1280 px the text comes first and the whole image follows. Text never sits on the art, and the art is never cut.

**Style block E** (generate in black and white; the script recolors it):

```text
Style: fine line engraving illustration like a banknote or a vintage postage stamp engraving, crisp black ink lines, cross-hatching and stipple on clean white paper, high detail, sharp and clean, only pure black and pure white, no gray wash, no color. The upper 50 percent of the image is a perfectly flat, solid, pure black sky with no stars, no clouds, no texture and no gradient; the skyline meets the black sky with a clean edge. No text, no letters, no numbers, no logos, no watermark, no frame, no border.
```

**Process:** `ESRGAN_DIR=… brand/engrave.sh <in.png> <name-vN> <crop_top_fraction>` upscales ×4 (Real-ESRGAN), crops part of the sky, maps black → minium and white → parchment exactly, and writes WebP 640–3840 + OG. Reject images with a frame or border.

| Image | Scene |
|---|---|
| `hero-v5` | U-shape: temple in scaffolding with a treadwheel crane (left), finished columns and cypresses (right), a town being built along the bottom, a man with a key on the road. Frame cropped 3 %. |
| `footer-v5` | V-shape: olive tree (left), hill with a temple (right), harbor town low in the middle. Frame cropped 3–4 %. |
| `hero-v4` (old) | An ancient Greek city being built: a temple in scaffolding, a treadwheel crane, stone houses, cypress trees; a stone road leads a man in a toga with a big key to the temple. Crop 0.22. |
| `footer-v4` (old) | An ancient Greco-Roman harbor town across calm water: tiled roofs, an aqueduct, a temple on the hill, square-sail boats, an olive tree at the left. Crop 0.32. |

## 2b. Steps: S · Engraved postage stamp (since 2026-10-18)

The owner asked for postage-stamp elements in the same engraving technique, with other scenes and colors. Used for the 01 Track / 02 Fix / 03 Report strip under the hero (`landing/src/components/Stamps.astro`).

- Same engraving as style E, but each stamp has its own ink on paper `#FBF7EE`: lapis `#1E3A7B` (Track), minium `#C1410B` (Fix), green `#2F6B5C` (Report).
- Portrait 3:4. The subject stands in the lower right and is cut by the bottom edge; the upper left is empty for the title. A few birds in the sky.
- The title, number and vertical side text are HTML. The perforation is a CSS mask. A round postmark (SVG, "MON 09:00") sits on the last stamp.
- On phones the stamps are a swipe row.

**Style block S** (generate in black and white; recolor with ffmpeg `lutrgb`, black → ink, white → paper):

```text
Style: fine line engraving illustration like a vintage postage stamp or banknote engraving, crisp black ink lines, cross-hatching and stipple on clean white paper, high detail, sharp and clean, only pure black and pure white, no gray wash, no color. Composition like a postage stamp: portrait 3:4, the subject stands in the lower right two thirds and is cut by the bottom edge; the upper left third is empty plain white paper for a title. A few small birds fly across the white sky as solid black silhouettes. No text, no letters, no numbers, no logos, no watermark, no frame, no border, no perforation.
```

| Image | Scene | Ink |
|---|---|---|
| `stamp-track-v1` | An ancient lighthouse (Pharos) on a rocky harbor point, fire on top, two square-sail boats, stone houses on the quay. Left 9 % cropped (hard edge). | Lapis |
| `stamp-fix-v1` | A Roman stone arch under repair: scaffolding, a ladder, a mallet and chisel on a cut block, a cypress. | Minium |
| `stamp-report-v1` | A small round temple (tholos) with a bronze bell under the dome, on a hill with olive trees and a stone road. | Green |

## 2c. Figure: the citation engine (engraving theme)

The animated figure (`landing/scripts/mechanism/build.mjs`, run `bun run mechanism`) uses the same engraving look: ink lines, shading as line hatch (SVG patterns `ce-h0`–`ce-h3`, step 0 is a cross-hatch) on parchment faces, no blur shadow. Like every.to, it sits on its own color plate: sun yellow `#F2C230` (`--ce-field`), so it does not repeat the minium of the hero and footer.

## 3. Covers: P · Press collage

Use P for post covers, guide covers, the hero, OG images and social cards. Styles A, B and C in `DESIGN.md` stay for special cases (A for older images, B for small figures, C for diagrams).

**Style block P** (copy exactly):

```text
Style: black-and-white high-contrast photographic halftone collage like a 1960s newspaper print or stipple engraving, deep blacks and fine dot grain; every element, including the modern object, printed in the same grayscale halftone texture; full-bleed cinematic scene with a low horizon, no white cut-out borders, no cartoon or vector shapes; the sky is one flat saturated [FIELD] color field with a few white halftone clouds; calm, editorial, magazine cover feel.
```

**Field colors** (pick one per image; vary across a page):

| Field | Hex | Use |
|---|---|---|
| Minium orange | `#C1410B` | Default. Hero and most covers. |
| Sun yellow | `#F2C230` | Guides about money, leads, pricing |
| Sky cyan | `#2FA7E0` | Guides about tools and measurement. Not for the hero (owner's rule, 2026-10-18: no blue on the hero). |
| Parchment | `#F5EFE3` | Quiet covers; the halftone carries the image |

**Duotone variant P2** (for a strong single subject, like a bust): `the subject printed as a single-ink halftone in lapis blue #1E3A7B on a flat minium orange #C1410B field, rough risograph misregistration` — replace the last two clauses of block P.

**Style block F · Footer engraving** (wide panoramas at the bottom of a page, like an old print):

```text
Style: fine 18th-century copperplate engraving and etching, printed in one ink, deep ink #1C1712, on warm parchment paper #F5EFE3; cross-hatching, stipple and line work, paper grain visible; a few small accents in minium orange #C1410B on some roofs, one boat and the leaves of a tree; calm, detailed, an art print.
```

After you generate it: crop the empty top and the plate edges, lift the paper to white (`ffmpeg … colorlevels`), and show it with `mix-blend-mode: multiply` so the paper becomes the page color.

**Hero layout.** The hero image is full-bleed. Ask for "the upper half and the center are open sky for a headline" and put the small focal point (a lit doorway, a statue) low in the middle. The text sits in the sky in parchment color.

## 4. Prompt template

```text
[SCENE: one old thing + one modern thing + a property-management detail], [COMPOSITION: centered, low horizon, where the eye goes].
[STYLE BLOCK P with the FIELD color filled in]
Aspect ratio 16:9. No text, no letters, no numbers, no logos, no watermark, no frame.
```

Subject rules for our niche:

- One classical figure or building: a Roman statue, a bust, a temple, columns, an aqueduct.
- One modern object, old enough to be warm: a CRT computer, a rotary phone, a letterbox, a brass key, a desk lamp, a paper map.
- One property-management detail: a row of houses on the horizon, a two-flat, a porch, a door with a number plate (no digits shown).
- People only as statues. No photo-real faces.
- No screens with UI, no brand logos, no text. Put words in HTML, never in the image.

## 5. Process

1. Write the prompt from the template. One concept per image.
2. Generate with omp (rotates the logged-in Antigravity accounts; see `DESIGN.md` → Tools):

   ```sh
   printf 'generate_image:\n  enabled: true\n' > /tmp/omp-img.yml
   mkdir -p /tmp/img-<slug> && omp -p --no-session --config /tmp/omp-img.yml --auto-approve \
     --max-time 8m --model gemini-3-flash \
     "Use the generate_image tool once to create: <prompt>. Save the image into /tmp/img-<slug> as <slug>.png. Reply only with the path."
   ```

   Up to 3 in parallel work. One image takes about 1–2 minutes.
3. Look at the image. Reject it for: letters or fake text, extra fingers, a cartoon object, a white sticker edge, more than one color field. Generate again with the fix in the prompt.
4. Convert to WebP at 640, 720, 960 and 1280 px wide, and a 1200×630 JPG for OG. Put them in `landing/public/img/` and `landing/public/og/`.
5. Put a version in the file name (`hero-v3-1280.webp`). The site caches images for 30 days, so a new image under an old name stays hidden from repeat visitors.
6. Add an entry to `landing/public/img/prompts.toml`: file, prompt, model, date.
7. No visible "made with AI" label on the site (owner decision, 2026-10-18). Do not remove SynthID or C2PA marks.

## 6. Approved prompts

| Image | Prompt (scene part; add block P) | Field |
|---|---|---|
| Style test, 2026-10-18 | A vintage cathode-ray desktop computer stands in the middle of a ruined Greek temple; a marble statue of a Roman landlord stands beside it holding a big old key; a small row of suburban houses on the horizon. | Minium |
| Guide: owner leads drop | A marble statue of a Roman landlord sits alone on the wide steps of a ruined temple, holding a silent old rotary telephone in his lap; an empty brass letterbox stands on a broken column beside him; a long row of suburban houses lies far away on the low horizon. | Minium |
| Guide: owners choose with AI | An oracle scene: a vintage cathode-ray computer sits on a stone tripod altar between temple columns, thin smoke rising from it like the Oracle of Delphi; a marble statue of a homeowner stands before it holding a small model of a two-flat house in both hands. | Sun yellow |
| Guide: agencies compared | Five marble busts of different Roman men stand in a row on stone pedestals of different heights, like candidates in a contest, on a temple terrace; a large antique brass balance scale stands in front of them; a few suburban rooftops on the low horizon. | Sky cyan |
| Guide: track AI traffic | A marble statue of an ancient astronomer on a temple terrace looks through a big brass telescope at a flock of paper airplanes flying in toward the temple door from the horizon; a vintage mechanical tally counter rests on the stone balustrade. | Minium |
| Guide: AI search checklist | A temple under construction with wooden scaffolding; a marble statue of an architect stands in front holding an unrolled blueprint scroll and a brass plumb line; a vintage cathode-ray computer sits on a stonemason's workbench beside him; small houses on the low horizon. | Sun yellow |

Small brass accents (letterbox, plumb line, scale) come through in color. We keep them: they are small and warm. If an image shows more color than that, generate again.

