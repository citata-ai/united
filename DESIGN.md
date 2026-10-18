---
version: alpha
name: citata — Aetas Aurea
description: >
  Visual identity for citata.ai. A new Renaissance: AI brings our clients and
  humanity into a new golden age of productivity, prosperity and spiritual
  growth. Parchment, iron-gall ink, lapis and gold leaf on the landing pages;
  the MyRemotely web-app component set, in the same palette, for the app.
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
  rubric: "#A8321F"            # vermilion: drop caps, manicules, citations
  verdigris: "#2F6B5C"         # success
  ochre: "#9A6A00"             # warning
  error: "#A8321F"
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
  dark-rubric: "#E07A5F"
typography:
  display-xl:
    fontFamily: Cormorant Garamond
    fontSize: 80px
    fontWeight: "500"
    lineHeight: 1.02
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Cormorant Garamond
    fontSize: 56px
    fontWeight: "500"
    lineHeight: 1.05
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Cormorant Garamond
    fontSize: 40px
    fontWeight: "600"
    lineHeight: 1.1
  headline-md:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: "500"
    lineHeight: 1.2
  body-lg:
    fontFamily: EB Garamond
    fontSize: 21px
    fontWeight: "400"
    lineHeight: 1.55
  body-md:
    fontFamily: EB Garamond
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 1.55
  marginalia:
    fontFamily: IM Fell English
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.4
    fontFeature: '"liga", "dlig"'
  smallcaps:
    fontFamily: EB Garamond
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 1.3
    letterSpacing: 0.12em
    fontFeature: '"smcp", "c2sc"'
  ui-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  ui-label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 18px
  ui-heading:
    fontFamily: EB Garamond
    fontSize: 22px
    fontWeight: "600"
    lineHeight: 28px
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
    backgroundColor: "{colors.rubric}"
    textColor: "{colors.on-error}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.full}"
  drop-cap:
    textColor: "{colors.rubric}"
    typography: "{typography.display-lg}"
  marginal-note:
    textColor: "{colors.gold-ink}"
    typography: "{typography.marginalia}"
  quote:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-md}"
    padding: 24px
---

# citata — Aetas Aurea

## Overview

**Idea.** *Citata* is Latin: "things cited". Our product is to make AI assistants cite our clients. Our story is bigger: AI starts a new golden age (*aetas aurea*) of productivity, prosperity and spiritual growth. The Renaissance is the model. Old knowledge came back, printing spread it, and people grew.

**Motto.** *Aetas aurea redit* — "the golden age returns" (after Virgil, *Eclogue IV*; Lorenzo de' Medici used *Le temps revient*).

**Feel.** A scholar's manuscript that is also a modern product. Calm, warm, exact. Never kitsch, never "fantasy game". Think every.to "neoclassical pop" mixed with a printed Aldine book of 1500.

**Two surfaces, one family.**

| Surface | Look | Built with |
|---|---|---|
| Landing pages, blog, case studies, social | Full Renaissance: serif type, parchment, art, drop caps, marginalia | Astro 7 + Tailwind 4 (`/landing`) |
| Web app (`app.citata.ai`) | Quiet tool: sans UI type, the MyRemotely web-app components, Renaissance only in color, headings and empty states | Foldkit + `@foldkit/ui` (`/frontend`) |

**Brand mark.** The *manicule* ☞ — the pointing hand that Renaissance readers drew in margins to mark a passage worth citing. It means "this was cited". Use it as logo glyph, list bullet, and "cited" status icon. Wordmark: `citata` in Cormorant Garamond 500, lowercase, ink; the manicule sits before it in rubric red.

## Colors

The palette comes from real Renaissance pigments and materials.

- **Parchment** `#F5EFE3` (background) and **Fresh page** `#FBF7EE` (surface). Warm, never pure white.
- **Iron-gall ink** `#1C1712` (on-surface). Text, rules, ink buttons. Never pure black.
- **Lapis lazuli** `#1E3A7B` (primary). The most costly pigment of the time; painters kept it for the Virgin's robe. We keep it for the one main action on a screen.
- **Gold leaf** `#B8892B` (gold). Ornament only: rules, frames, the halo behind a hero image, large display words. It fails contrast for small text. For gold text use **gold-ink** `#7A5A14`.
- **Vermilion / rubric** `#A8321F`. Scribes wrote headings and initials in red ("rubrics"). We use it for drop caps, the manicule, citation marks, and errors.
- **Verdigris** `#2F6B5C`. Success, "cited" state in the app.

**Dark theme "Studiolo".** Candlelit study: `#14110E` background, `#EDE4D3` ink, softer lapis `#8EA8E6`, warmer gold `#D4A84B`. Tokens use the `dark-` prefix.

**Rules.**
- One lapis action per view. Second actions use ink or ghost buttons.
- Gold covers at most ~5% of a page. More gold looks cheap.
- Status colors in the app: verdigris = cited, ochre = mentioned without link, rubric = not found.

## Typography

| Role | Face | Why |
|---|---|---|
| Display, headlines | **Cormorant Garamond** 500–600 | Garamond's 16th-century forms, cut for large sizes |
| Long text | **EB Garamond** 400 | True Garamond for reading; has small caps and old-style figures |
| Marginal notes, captions | **IM Fell English** italic | Real 17th-century Fell types; our "hand" (like Every's Palmer script) |
| App UI | **Inter** 400–500 | Clear at 13–14px in dense tools |
| Code, data | **Paper Mono** (from the web-app, OFL) | Same mono as MyRemotely |

All faces are open source (OFL). Self-host the `woff2` files; do not call Google Fonts at runtime.

**Rules.**
- Use old-style figures (`onum`) in prose, lining tabular figures (`lnum`, `tnum`) in tables and the app.
- Section labels: small caps with 0.12em tracking and a Roman numeral, e.g. `I · THE PROBLEM`.
- Long text measure: 60–70 characters (`spacing.measure`).
- First paragraph of an article starts with a 3-line rubric drop cap.
- Pull quotes are real citations: quote, then `— Source` in small caps.

## Layout

**Landing.** A book page, not a dashboard.
- 12-column grid, max width 1200px, gutter 24px. Text column 7 columns; marginalia column 3 columns at its right.
- Generous space between sections (`spacing.2xl`, 96px). Each section opens with a gold hairline rule and a Roman-numeral label.
- Hero: big Cormorant headline left, one framed artwork right (or full width, 16:9). One lapis button.
- Case studies read like a folio: number, title, the citation proof (screenshot of the AI answer that cites the client), then the story.

**App.** Use the web-app layout: left nav, top bar, content at 8px rhythm (`spacing.sm`), max density. No marginalia, no drop caps.

## Elevation & Depth

Paper does not float. No drop shadows on the landing.
- Depth comes from tone: `surface-sunken` below, `surface` above, `background` between.
- Separate with 1px hairlines in `outline`; frame artwork with a 1px gold rule inset 6px (a "passe-partout").
- App: popovers, menus and dialogs may use one soft shadow `0 8px 24px rgb(28 23 18 / 0.12)`, as the web-app does. Nothing else.

## Shapes

- Landing: square or `rounded.xs` (2px) corners. Arches (`border-radius: 50% 50% 0 0 / 30% 30% 0 0`) frame portrait art like a Renaissance niche — at most one per page.
- App: `rounded.sm` (4px) on controls, `rounded.md` (8px) on dialogs and cards, `rounded.full` on badges and avatars. This is tighter than the web-app's 10px on purpose.
- Lines: 1px hairlines. Ornament: simple fleurons (❦ ❧) and the manicule ☞, never heavy baroque scrolls.

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
| `--destructive` | `#A8321F` | `#E07A5F` |
| `--radius` | `0.25rem` | `0.25rem` |

**Brand components (landing).**
- **Drop cap**: first letter, Cormorant, 3 lines tall, rubric red.
- **Marginal note**: IM Fell italic, gold-ink, in the right column, with a small ☞.
- **Citation card**: a framed quote of what ChatGPT / Gemini / Claude said about the client, the engine named in small caps, our client's name in rubric. This is the proof object of the brand.
- **Folio label**: `II · FOUND` — small caps, Roman numeral, gold rule above.
- **Framed artwork**: image + 1px gold inset rule + IM Fell caption with "Made with AI" credit.

**App empty states** may show one small engraving (see Imagery) and one line of copy. That is the only art inside the app.

## Do's and Don'ts

**Do**
- Do mix old and new on purpose: a marble bust with a laptop glow, a fresco of people with phones. The clash is the message.
- Do keep the app plain. The brand lives in color and type there.
- Do show proof: real citations, real numbers, in citation cards.
- Do label AI images "Made with AI" in the caption or credits.
- Do check contrast: gold on parchment is decoration only.

**Don't**
- Don't use pure white `#FFFFFF` or pure black `#000000`.
- Don't use more than one lapis button per view.
- Don't use blackletter / Gothic type, fake torn paper, or "Ye Olde" copy.
- Don't put drop caps, marginalia or arches in the app.
- Don't render text inside generated images; set text in HTML.
- Don't remove SynthID or C2PA marks from AI images (see Imagery → Rules).

## Imagery

Three art styles. Pick one per piece; don't mix inside one image.

| Style | Use | Look |
|---|---|---|
| **A · Fresco** | Hero images, case-study covers, OG images | Raphael / Botticelli painting, warm light, gold leaf details, one modern object |
| **B · Engraving** | Blog figures, icons, app empty states, social | Dürer-style copperplate: black ink cross-hatching on parchment, rubric red as the only color |
| **C · Codex** | Diagrams that explain (GEO stages, how AI cites) | Leonardo notebook: sepia ink sketch, geometric construction lines, on aged paper |

**Sizes.** Hero 16:9 (2400×1350), OG 1.91:1 (1200×630), square 1:1 (1080) for social, portrait 4:5 for case-study covers, wide 16:5 for section banners.

### Prompt template

Fill the slots. Keep the style block word for word so every image looks like one family.

```text
[SUBJECT], [MODERN ELEMENT], [COMPOSITION].
Style: [STYLE BLOCK].
Palette: parchment cream #F5EFE3, iron-gall ink #1C1712, lapis blue #1E3A7B,
gold leaf #B8892B, vermilion #A8321F. Muted, warm, no neon.
Aspect ratio [RATIO]. No text, no letters, no logos, no watermark, no frame.
```

**Style blocks**

- **A · Fresco**: `Italian High Renaissance fresco in the manner of Raphael and Botticelli, tempera on plaster, soft sfumato light, gold leaf halos and details, subtle craquelure, calm dignified figures, museum quality`
- **B · Engraving**: `16th-century copperplate engraving in the manner of Albrecht Dürer, fine black ink cross-hatching on cream parchment, high contrast, single accent of vermilion red, clean white space around the subject`
- **C · Codex**: `page from Leonardo da Vinci's notebook, sepia iron-gall ink sketch on aged paper, geometric construction lines, compass arcs, light wash shading, studious and precise`

### Sample prompts

1. **Hero — "The golden age returns" (A)**
   `A Renaissance studio of scholars and merchants gathered around a glowing glass tablet that casts warm gold light on their faces; a lapis-blue drape; an open ledger and an armillary sphere on the table; composition after Raphael's School of Athens, wide arches behind. Style: A · Fresco. Aspect ratio 16:9.`

2. **The idea of citation (B)**
   `A large hand with a pointing index finger (a manicule) emerging from a cloud, pointing at one open book among many on a shelf; small rays of light around the chosen book. Style: B · Engraving. Aspect ratio 1:1.`

3. **Three stages: Indexed → Found → Mentioned (C)**
   `Three connected circles drawn with a compass, a small sketch of a library index card in the first, a magnifying lens in the second, a speaking mouth with a laurel in the third, construction lines linking them left to right. Style: C · Codex. Aspect ratio 16:5.`

4. **Prosperity (A)**
   `Allegory of Abundance: a calm woman in a lapis robe holding a cornucopia that spills gold coins and small glowing data points onto a Florentine market table; merchants in the background. Style: A · Fresco. Aspect ratio 4:5.`

5. **Spiritual growth (A)**
   `A figure in quiet meditation under a laurel tree at dawn, a soft golden halo, a closed laptop resting on the grass beside them, Tuscan hills behind. Style: A · Fresco. Aspect ratio 16:9.`

6. **Property management vertical (B)**
   `A Renaissance palazzo facade with many windows, a key and a small glowing smartphone in the foreground on a stone ledge. Style: B · Engraving. Aspect ratio 4:5.`

7. **Social / quote card background (C)**
   `Study of a marble bust of a philosopher in three-quarter view, with geometric proportion lines and a small sketched chat bubble near the mouth. Style: C · Codex. Aspect ratio 1:1.`

8. **App empty state "No citations yet" (B)**
   `A single small empty scroll on a wooden lectern, a quill resting beside it, lots of empty space. Style: B · Engraving. Aspect ratio 1:1.`

**Negative list** (add when the model accepts it): `text, letters, captions, signatures, logos, watermark, modern UI screenshots, plastic 3D render, neon, cyberpunk, fantasy armor, extra fingers, distorted faces`.

### Tools

- **Gemini (Nano Banana / Imagen)** — default. Generate through the Gemini API or AI Studio with the team account where we can; test once whether that output has the visible sparkle mark.
- Fix text, faces and hands by hand or with an edit pass. Never ship an image with garbled letters.
- Keep a `prompts.toml` next to each image set: prompt, model, date, seed if any. Then we can make more of the same family.

### Rules for AI images

- **Visible Gemini sparkle.** Avoid it at the source: AI Ultra plan, the "Media watermark" setting where Gemini offers it, or the API. If an image still has it, the open-source tools (`journey-ad/gemini-watermark-remover`, `allenk/GeminiWatermarkTool`, MIT) remove it locally. Check Google's terms first.
- **Invisible SynthID and C2PA.** Keep them. Do not try to remove them. From 2 Aug 2026 the EU AI Act (Art. 50) asks for machine-readable marks on AI content. Removal can breach Google's terms too.
- **Disclose.** Caption or credit: "Made with AI". Our brand says AI brings the golden age, so we show it with pride, not hide it.
- **AI detectors** (Hive, Sightengine, AI or Not, …) are not reliable on new models. Do not tune images to pass them. Google's own check (ask Gemini "is this AI-made?") reads SynthID and says yes for our images, as it should.
- **Realistic people.** No photo-real fake people or fake "customers". Painted and engraved styles only.

## Voice

Plain, warm, exact (ASD-STE100 for docs). One Latin phrase per page at most, always with its English meaning next to it. Good: *Aetas aurea redit* — the golden age returns. Bad: Latin in buttons or errors.
