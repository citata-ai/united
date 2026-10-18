---
version: alpha
name: Citata — Aetas Aurea
description: >
  Visual identity for citata.ai. A new Renaissance: AI brings our clients and
  humanity into a new golden age of productivity, prosperity and spiritual
  growth. Editorial layout after every.to, Cal Sans type from the MyRemotely
  web-app, parchment and minium-orange palette with pop accents, neo-Renaissance
  engraved images.
colors:
  # Light theme: "Vellum"
  background: "#F5EFE3"        # parchment
  surface: "#FBF7EE"           # fresh page, cards
  surface-sunken: "#ECE3D2"    # aged page, wells, code
  on-surface: "#1C1712"        # iron-gall ink
  on-surface-muted: "#5C5145"  # faded ink
  outline: "#D9CDB6"           # hairline rule
  outline-strong: "#B8A88C"
  primary: "#1E3A7B"           # lapis lazuli (ultramarine)
  on-primary: "#FBF7EE"
  primary-hover: "#162C5E"
  secondary: "#1C1712"         # ink button
  on-secondary: "#F5EFE3"
  gold: "#B8892B"              # gold leaf: ornament only, never small text
  gold-ink: "#7A5A14"          # gold that passes contrast for text
  minium: "#C1410B"            # red lead (minium): logo quotes, drop caps, citations
  verdigris: "#2F6B5C"         # success
  ochre: "#9A6A00"             # warning
  # Pop accents (since 2026-10-18): section panels, stat cards, chips, images
  coral: "#FF6B5B"
  sun: "#F2C230"
  sky: "#2FA7E0"
  mint: "#8FE2C5"
  lilac: "#B79CFF"
  cobalt: "#1F57FF"
  error: "#C1410B"
  on-error: "#FBF7EE"
  # Dark theme: "Studiolo" (a scholar's study by candlelight)
  dark-background: "#14110E"
  dark-surface: "#1E1A15"
  dark-surface-sunken: "#0F0D0B"
  dark-on-surface: "#EDE4D3"
  dark-on-surface-muted: "#A89B88"
  dark-outline: "#3A332A"
  dark-primary: "#8EA8E6"
  dark-on-primary: "#14110E"
  dark-gold: "#D4A84B"
  dark-minium: "#F08A4B"
typography:
  display-xl:
    fontFamily: Cal Sans
    fontSize: 56px
    fontWeight: "600"
    lineHeight: 1.02
  display-lg:
    fontFamily: Cal Sans
    fontSize: 44px
    fontWeight: "600"
    lineHeight: 1.05
  headline-lg:
    fontFamily: Cal Sans
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 1.1
  headline-md:
    fontFamily: Cal Sans
    fontSize: 24px
    fontWeight: "500"
    lineHeight: 1.2
  title:
    fontFamily: Cal Sans
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 1.2
  body-lg:
    fontFamily: Cal Sans
    fontSize: 19px
    fontWeight: "400"
    lineHeight: 1.5
  body-md:
    fontFamily: Cal Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.5
  dek:
    fontFamily: Cal Sans
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 1.45
  ui-md:
    fontFamily: Cal Sans
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  ui-label:
    fontFamily: Cal Sans
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 18px
  label-mono:
    fontFamily: Paper Mono
    fontSize: 11px
    fontWeight: "400"
    lineHeight: 16px
    letterSpacing: 0.06em
  mono:
    fontFamily: Paper Mono
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 20px
rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 8px
  lg: 10px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  2xl: 96px
  measure: 66ch
  gutter: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-ink:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 40px
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.ui-md}"
    rounded: "{rounded.sm}"
    height: 36px
  badge-cited:
    backgroundColor: "{colors.verdigris}"
    textColor: "{colors.on-primary}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.full}"
  badge-missing:
    backgroundColor: "{colors.minium}"
    textColor: "{colors.on-error}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.full}"
  post-card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
  post-kicker:
    textColor: "{colors.minium}"
    typography: "{typography.label-mono}"
  column-band:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.headline-lg}"
    rounded: "{rounded.md}"
    padding: 40px
  quote:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-md}"
    padding: 24px
---

# Citata — Aetas Aurea

Status: v2, 2026-10-18 — "neo-Renaissance pop" (owner: fresh, playful, vivid, like every.to). Visual style sheet: [`sample/style.html`](sample/style.html). Live reference: the home page on stage. Images: [`IMAGES.md`](IMAGES.md), current files in [`art/current/`](art/current/).

## Overview

**Idea.** *Citata* is Latin: "things cited". Our product makes AI assistants cite our clients. Our story is bigger: AI starts a new golden age (*aetas aurea*) of productivity, prosperity and spiritual growth. The Renaissance is the model. Old knowledge came back, printing spread it, and people grew.

**Motto.** *Aetas aurea redit* — "the golden age returns" (after Virgil, *Eclogue IV*).

**Feel.** A modern editorial site, like every.to: clear and exact, but fresh and playful. The Renaissance lives in the **images** (engraved ancient towns, togas, temples, in bright pop color) and in the **parchment** page. Pop color blocks (coral, sun, sky, mint, lilac) give each section its own color. The type is clean and modern. The clash of old art and new type is the message.

**One look for all surfaces.**

| Surface | Built with |
|---|---|
| Landing, blog, case studies, newsletter, social | Astro 7 + Tailwind 4 (`/landing`) |
| Web app (`app.citata.ai`) | Foldkit + `@foldkit/ui`, web-app components (`/frontend`) |

Both use the same fonts (Cal Sans, Paper Mono) and the same tokens. The app has less art and more density.

**Logo.**
- **Icon:** two curly quote pairs, `“` top-left and `”` bottom-right, parchment on a minium-orange square (22% corner radius). Quotes are cut from **DM Serif Display**: round ball terminals with a mid-century feel. The quotes say "cited". Never crop them; keep 7% padding (favicon) or 12% (icon).
- **Wordmark:** `Citata` with a capital C, in **Fraunces 600** (SOFT 100, opsz 144), ink. A minium `“` sits high before the C and a minium `”` sits low after the last a, so the quotes "hold" the name.
- **Files:** `/brand/` — `icon.svg`, `icon-dark.svg`, `favicon.svg` (bigger quotes for 16–32 px), `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`, `wordmark.svg`, `wordmark-dark.svg`. All text is outlined to paths. Rebuild: `uv run --with fonttools --with uharfbuzz python -I brand/build.py <font-dir> brand` (fonts: `DMSerifDisplay.ttf`, `Fraunces.ttf` variable, from google/fonts).
- **Domain** stays lowercase in text: `citata.ai`.

## Colors

The palette comes from Renaissance pigments and materials.

- **Parchment** `#F5EFE3` (background) and **Fresh page** `#FBF7EE` (surface). Warm, never pure white.
- **Iron-gall ink** `#1C1712` (on-surface). Text, rules, the dark column band. Never pure black.
- **Minium** `#C1410B`. Red lead, a deep orange pigment; the word "miniature" comes from it. Logo, kickers, label dots, author avatars, links, errors. Dark theme: `#F08A4B`.
- **Lapis lazuli** `#1E3A7B`. Image palette only (backgrounds of AI images). Not for buttons or UI since 2026-10-18.
- **Gold leaf** `#B8892B`. Ornament only. For gold text use **gold-ink** `#7A5A14`.
- **Verdigris** `#2F6B5C`. Success, "cited" state in the app.

**Dark theme "Studiolo".** `#14110E` background, `#EDE4D3` ink, lapis `#8EA8E6`, gold `#D4A84B`, minium `#F08A4B`. Tokens use the `dark-` prefix.

**Pop accents (since 2026-10-18).** Coral `#FF6B5B`, sun `#F2C230`, sky `#2FA7E0`, mint `#8FE2C5`, lilac `#B79CFF`, cobalt `#1F57FF`. Tailwind: `bg-coral`, `bg-sun/25` and so on.
- **Full color** for small, loud things: stat cards (ink text on coral, sun, sky), chapter chips, guide chips, the open FAQ button.
- **Tints** for big areas: page header panels and case-study panel `/20–/30`, cards `/15–/35`. One color per block; neighbors differ.
- Per page: home uses all; property management = sun header; case study = coral; about = mint; guides = sky; guide pages = sun header, mint short answer; the final call to action = lilac on every page.
- Ink text on all of them. Never parchment text on a pop color.

**Rules.**
- Buttons use minium only: primary = filled minium (`#C1410B`, hover `#9E350A`, parchment text), secondary = minium outline. No lapis or ink buttons (owner decision, 2026-10-18).
- Selected tabs and toggles: minium fill. Proof bands: light (`surface` + hairline), not dark ink.
- Minium is the accent for buttons and links. Pop colors carry the blocks; images carry the rest.
- Status colors in the app: verdigris = cited, ochre = mentioned without link, minium = not found.

## Typography

Two families, both OFL, both already in the MyRemotely web-app. Files: `/brand/fonts/CalSansVF.woff2`, `/brand/fonts/PaperMono-Regular.woff2`. Self-host; no font CDN at runtime.

| Role | Face | Use |
|---|---|---|
| Everything readable | **Cal Sans** 400–600 | Headlines, titles, body, nav, buttons |
| Labels, meta | **Paper Mono** 400, uppercase, 0.06–0.08em tracking | Kickers, dates, section labels, code, data |
| Logo only | Fraunces + DM Serif Display (outlined in SVG) | Never as live text |

**Rules.**
- Headlines: Cal Sans 600, letter-spacing 0. Do not track Cal Sans tight; letters collide.
- Cal Sans has no italic. Do not fake one; use minium color for emphasis instead.
- Meta line under an image: `KICKER · DATE` in Paper Mono, kicker in minium.
- Body measure 60–70 characters.

## Layout

**Home page** (since 2026-10-18), top to bottom:

1. **Nav**: wordmark left, 7 links (from 768 px), one minium button right. Sticky, hairline below. The bar stays still between pages (cross-document view transition).
2. **Hero**: full-width engraving (style T) with the headline and 2 buttons in its empty sky (≥1280 px); below that, text first, image after.
3. **AI platform ribbon**: "Where your buyers ask AI", slow logo loop.
4. **Stamps**: 01 Track, 02 Fix, 03 Report as 3 engraved postage stamps (style S); a swipe row on phones.
5. **Chapters 01–07**, each with a chapter chip: 01 The problem (image + 3 stat cards), 02 How it works (tinted band: 3 stage cards, the animated figure, "Your first month" steps + image), 03 Try it now (prompt tester), 04 Case study (sun panel, 3 numbers), 05 Who it is for, 06 Pricing (tinted band), 07 Questions (accordion).
6. **Final call to action** (`AuditCta`): lilac panel + image, on every page.
7. **Footer art** (style T, "no room at the inn"): links, © with ☀ before the motto, "Ask AI about Citata.ai" row, all in the image's empty sky.

**Other pages**: a colored header panel (rounded, tinted), then chapters with chips, tinted cards, accordions, and the same final call to action and footer.

**Text**: say a thing once. Prefer a number, an image or a card over a paragraph.

**Grid.** Max width 1280px (1440px from 1536px screens), side padding 32px (40px wide), gutter 28px. Sections divided by 1px `outline` hairlines, 56px vertical space.

**Chapter chip.** A 34px round chip in a pop color with the number (`01`), then the name in Paper Mono uppercase (`.chapter`, `--chip` sets the color). Colors rotate coral, sky, mint, sun, lilac. The old 8px minium square label (`.label`) is for small labels only.

**App.** The web-app layout: left nav, top bar, content at 8px rhythm. Same fonts.

## Elevation & Depth

Flat. Depth comes from images and pop color blocks, not shadows. One exception: the postage stamps have a soft paper shadow and a slight tilt.
- Separate with 1px `outline` hairlines.
- Cards have no border on the landing; image + text is the card. Product cards use `surface` + hairline.
- Image hover: scale 1.03 inside its frame, 0.4s.
- App: popovers, menus and dialogs may use one soft shadow `0 8px 24px rgb(28 23 18 / 0.12)`.

## Shapes

- Images: 16:9, `rounded.sm` (4px).
- Buttons, inputs: `rounded.sm`. Cards `rounded-md` (6px), panels `rounded-lg` (8px). Chips, avatars, badges, pill toggles: `rounded.full`.
- Stamps: perforated edge (CSS mask), guilloche rings over the paper.
- Product icon tiles: the logo icon shape (22% radius).

## Components

**App components come from the MyRemotely web-app** (`my-remotely/web-app`, `src/core/front/ui/`). That code is already Foldkit: `@foldkit/ui` headless parts styled by the shadcn class tables in `classes.ts`. We copy the code and change only the tokens. There is no "foldcn" package yet; this copy is how it starts.

| Need | `@foldkit/ui` part | web-app source |
|---|---|---|
| Button | `button` | `classes.ts` button |
| Text field, search | `input`, `textarea` | input, inputGroup, searchField |
| Check, switch | `checkbox`, `switch` | checkbox, switch |
| Tabs | `tabs` | tabsList / tabsTrigger, `tab-panel.ts` |
| Select, combobox | `select`, `listbox`, `combobox` | select, `search-select/` |
| Dialog, sheet, drawer | `dialog` | dialog, alertDialog, sheet, drawer |
| Popover, tooltip, menu | `popover`, `tooltip`, `menu` | popover, tooltip, `menu/` |
| Date picker | `datePicker`, `calendar` | `date-time-picker/` |
| Card, badge, alert, table, skeleton, empty | CSS only | `classes.ts` |

Token mapping into the web-app CSS variables (`src/styles/globals.css` names):

| web-app var | citata light | citata dark |
|---|---|---|
| `--background` | `#F5EFE3` | `#14110E` |
| `--card` | `#FBF7EE` | `#1E1A15` |
| `--foreground` | `#1C1712` | `#EDE4D3` |
| `--muted-foreground` | `#5C5145` | `#A89B88` |
| `--primary` | `#1E3A7B` | `#8EA8E6` |
| `--border` | `#D9CDB6` | `#3A332A` |
| `--ring` | `#1E3A7B` at 55% | `#8EA8E6` at 60% |
| `--destructive` | `#C1410B` | `#F08A4B` |
| `--radius` | `0.25rem` | `0.25rem` |
| `--font-sans`, `--font-heading` | Cal Sans | Cal Sans |
| `--font-mono` | Paper Mono | Paper Mono |

**Landing components (since 2026-10-18).**
- **Chapter chip** `.chapter` — see Layout.
- **Stat card**: big number (52–60px) + one line + source link, on a full pop color.
- **Stamp** (`Stamps.astro`): engraving in one ink, title + number in HTML, vertical side text, CSS perforation, guilloche rings, postmark "MON 09:00" on the last one.
- **FAQ accordion** `.faq-item`: native `<details name>` (one open at a time), "+" turns to "×" on a sun circle, smooth open. Text stays in the HTML and the FAQPage schema.
- **AuditCta** (`AuditCta.astro`): lilac panel, headline, one line, minium button, the "knock" image.
- **Citation engine figure** (`scripts/mechanism/build.mjs`): isometric, each group its own pop tint — client site cobalt, Citata frame orange, AI engines mint, gears lilac, bench sun. No corner labels.
- **Ask AI row** (footer): 5 round engine icons; each opens the engine with a ready question about Citata.ai, the current page and `llms.txt`.

**Editorial components (blog, later).**
- **Post card**: 16:9 image → meta line (`KICKER · DATE`, Paper Mono) → title (Cal Sans 20px) → optional dek (15px, muted) → author row (24px minium avatar with initials + name).
- **Featured post**: same parts, headline 56px, dek 19px.
- **Column band**: ink background, parchment text, minium kickers.
- **Product card**: icon tile 64px + title 22px + one line.
- **Citation card**: what ChatGPT / Gemini / Claude said about the client, engine and date in Paper Mono, client name in minium. The proof object of the brand.

## Do's and Don'ts

**Do**
- Do mix old and new on purpose: marble statues, temples and busts with laptops, phones, charts, in bright pop color.
- Do give each section its own pop color block; keep text short inside it.
- Do show proof: real citations, real numbers.
- Do not add a visible "Made with AI" label (owner decision, 2026-10-18). Keep the SynthID and C2PA marks in the files.

**Don't**
- Don't use pure white `#FFFFFF` or pure black `#000000`.
- Don't use lapis or ink for buttons. One filled minium button per view; others are outlines.
- Don't use serif or script faces for live text; serif is only in the outlined logo.
- Don't track Cal Sans tight or fake its italic.
- Don't render text inside generated images; set text in HTML.
- Don't ship third-party images. Every's covers in `/brand/sample/blog.html` are a local test only.
- Don't remove SynthID or C2PA marks from AI images (see Imagery → Rules).

## Imagery

**Current styles (2026-10-18), read [`IMAGES.md`](IMAGES.md) first:** T · three-ink stamp engraving with pop accents (hero, footer), S · one-ink engraved stamp (steps), N · neo-Renaissance pop (all images inside pages: flat pop sky, engraved lines, the man in the orange toga). Current files: [`art/current/`](art/current/). Styles A, B, C and P below are old.

Older main style: **neoclassical pop** (our first take on the every.to cover style). Classical subjects — marble statues, busts, Greek temples, Renaissance figures — printed with halftone dots and flat, bright color, mixed with one modern object.

| Style | Use | Look |
|---|---|---|
| **A · Neoclassical pop** | Post covers, hero, OG, social | Halftone statue or temple, flat bright background, one modern object |
| **B · Engraving** | Blog figures, app empty states, icons | Copperplate cross-hatching, ink on parchment, minium as the only color |
| **C · Codex** | Diagrams that explain (GEO stages, how AI cites) | Leonardo notebook: sepia ink sketch, construction lines |

**Sizes.** Covers and hero 16:9 (2880×1620), OG 1.91:1 (1200×630), social 1:1 (1080).

### Prompt template

Fill the slots. Keep the style block word for word so every image looks like one family.

```text
[SUBJECT], [MODERN ELEMENT], [COMPOSITION].
Style: [STYLE BLOCK].
Aspect ratio [RATIO]. No text, no letters, no logos, no watermark, no frame.
```

**Style blocks**

- **A · Neoclassical pop**: `neoclassical pop art collage: classical marble sculpture or Greek architecture printed as coarse black halftone, cut out and placed on a flat bold background color, risograph texture, slight misregistration, two to three flat spot colors from: minium orange #C1410B, lapis blue #1E3A7B, sky cyan #2FA7E0, sun yellow #F2C230, parchment #F5EFE3, deep ink #1C1712; graphic, witty, clean composition with lots of negative space`
- **B · Engraving**: `16th-century copperplate engraving in the manner of Albrecht Dürer, fine black ink cross-hatching on cream parchment #F5EFE3, high contrast, single accent of minium orange #C1410B, clean empty space around the subject`
- **C · Codex**: `page from Leonardo da Vinci's notebook, sepia iron-gall ink sketch on aged paper, geometric construction lines, compass arcs, light wash shading, studious and precise`

### Sample prompts

1. **Hero — "The golden age returns" (A)**
   `A marble bust of a Renaissance scholar wearing modern wireless earbuds, gazing at a glowing laptop; behind him a sun of halftone dots rising over a Greek temple. Flat minium orange background. Style: A · Neoclassical pop. Aspect ratio 16:9.`

2. **Get cited (A)**
   `A classical marble hand with a pointing index finger aimed at one open book on a shelf of many; a small chat bubble above the chosen book. Flat lapis blue background, yellow book. Style: A · Neoclassical pop. Aspect ratio 16:9.`

3. **Vibe Check column (A)**
   `Two marble discus throwers in a race, one holding a smartphone; lane lines drawn in flat cyan; halftone sky. Style: A · Neoclassical pop. Aspect ratio 16:9.`

4. **Property management vertical (A)**
   `A Roman apartment block (insula) of marble with many windows, one window lit in yellow with a laptop inside; a classical statue holding a big brass key in front. Flat sky cyan background. Style: A · Neoclassical pop. Aspect ratio 16:9.`

5. **Prosperity (A)**
   `Statue of Abundance holding a cornucopia that spills gold coins and small bar charts; flat sun yellow background, minium shadows. Style: A · Neoclassical pop. Aspect ratio 1:1.`

6. **Three stages: Indexed → Found → Mentioned (C)**
   `Three connected circles drawn with a compass, a library index card in the first, a magnifying lens in the second, a speaking mouth with a laurel in the third, construction lines linking them left to right. Style: C · Codex. Aspect ratio 16:9.`

7. **App empty state "No citations yet" (B)**
   `A single small empty scroll on a wooden lectern, a quill resting beside it, lots of empty space. Style: B · Engraving. Aspect ratio 1:1.`

8. **Case study cover (A)**
   `A Chicago brownstone facade with a classical Corinthian column in front, a marble bust looking at a phone that shows a map pin. Flat minium orange background, lapis halftone. Style: A · Neoclassical pop. Aspect ratio 16:9.`

**Negative list** (add when the model accepts it): `text, letters, captions, signatures, logos, watermark, UI screenshots, plastic 3D render, photorealistic people, gradient mesh, neon glow, extra fingers, distorted faces`.

### Tools

- **omp (oh-my-pi), headless** — what we used on 2026-10-18. Its `generate_image` tool calls `google-antigravity/gemini-3-pro-image` and rotates the logged-in accounts. Turn it on with a config overlay, one empty temp dir per image:
  `printf 'generate_image:\n  enabled: true\n' > /tmp/omp-img.yml && omp -p --no-session --config /tmp/omp-img.yml --auto-approve --max-time 8m --model gemini-3-flash "Use the generate_image tool once to create: <prompt>. Save the image into <dir> as <name>.png."`
  Fallback: `agy -p "Use the image-generator subagent ..."` (one account; its quota runs out fast).
- **Gemini (Nano Banana / Imagen)** — default. Generate through the Gemini API or AI Studio where we can; test once whether that output has the visible sparkle mark.
- Fix text, faces and hands by hand or with an edit pass. Never ship an image with garbled letters.
- Keep a `prompts.toml` next to each image set: prompt, model, date, seed if any.

### Rules for AI images

- **Visible Gemini sparkle.** Avoid it at the source: AI Ultra plan, the "Media watermark" setting where Gemini offers it, or the API. If an image still has it, the open-source tools (`journey-ad/gemini-watermark-remover`, `allenk/GeminiWatermarkTool`, MIT) remove it locally. Check Google's terms first.
- **Invisible SynthID and C2PA.** Keep them. Do not try to remove them. From 2 Aug 2026 the EU AI Act (Art. 50) asks for machine-readable marks on AI content. Removal can breach Google's terms too.
- **Disclose.** Caption or credit: "Made with AI". Our brand says AI brings the golden age, so we show it with pride.
- **AI detectors** (Hive, Sightengine, AI or Not, …) are not reliable on new models. Do not tune images to pass them.
- **Realistic people.** No photo-real fake people or fake "customers". Statues, engravings and halftone only.

## Voice

See `/brand/VOICE.md`. Plain, warm, exact. One Latin phrase per page at most, always with its English meaning next to it. Good: *Aetas aurea redit* — the golden age returns. Bad: Latin in buttons or errors.
