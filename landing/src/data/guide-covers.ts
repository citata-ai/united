/** Cover image per guide (style N, brand/IMAGES.md). Key: the guide slug. Prompts: public/img/prompts.toml. */
export const guideCovers: Record<string, { img: string; alt: string }> = {
  "why-owner-leads-are-dropping": {
    img: "guide-leads-v2",
    alt: "A pop engraving under a coral sky: a landlord in an orange toga sits on temple steps with a silent rotary phone; an empty letterbox stands beside him.",
  },
  "how-owners-choose-a-property-manager-with-ai": {
    img: "guide-owners-ai-v2",
    alt: "A pop engraving under a yellow sky: an old computer smokes on a stone altar like an oracle; a homeowner in an orange toga holds a small model house.",
  },
  "geo-agencies-for-property-management": {
    img: "guide-agencies-v2",
    alt: "A pop engraving under a cyan sky: Roman busts on pedestals in a row and a brass balance scale; a man in an orange toga judges them.",
  },
  "track-ai-traffic-property-management": {
    img: "guide-track-v2",
    alt: "A pop engraving under a lilac sky: a man in an orange toga looks through a brass telescope at colorful paper planes; a tally counter rests nearby.",
  },
  "ai-search-checklist-property-management-website": {
    img: "guide-checklist-v2",
    alt: "A pop engraving under a coral sky: an architect in an orange toga with a blueprint and a plumb line before a temple in scaffolding; an old computer on a workbench.",
  },
  "appfolio-vs-buildium": {
    img: "guide-appfolio-buildium-v1",
    alt: "A pop engraving under a yellow sky: a landlord in an orange toga weighs model houses against a coin purse on a brass scale between two market stalls with old computers.",
  },
  "appfolio-alternatives": {
    img: "guide-appfolio-alts-v1",
    alt: "A pop engraving under a cyan sky: a landlord in an orange toga with a brass compass stands at a crossroads between four colored temples, each with an old computer.",
  },
  "best-property-management-software-50-200-doors": {
    img: "guide-best-software-v1",
    alt: "A pop engraving under a coral sky: a landlord in an orange toga carries an old computer up a hill road lined with more and more colorful houses.",
  },
  "california-eviction-process": {
    img: "guide-ca-eviction-v1",
    alt: "A pop engraving under a lilac sky: a landlord in an orange toga climbs courthouse steps with a sealed scroll past a big brass hourglass; a pink house and palm trees behind.",
  },
  "california-security-deposit-law": {
    img: "guide-ca-deposit-v1",
    alt: "A pop engraving under a yellow sky: a landlord in an orange toga hands a coin purse back to a leaving tenant at the door of a pink house with palm trees.",
  },
  "can-a-landlord-refuse-section-8": {
    img: "guide-s8-refuse-v1",
    alt: "A pop engraving under a coral sky: a landlord in an orange toga welcomes a family with a sealed scroll at a red-brick two-flat, beside a brass scale of justice.",
  },
  "directories-ai-cites-property-management": {
    img: "guide-ai-directories-v1",
    alt: "A pop engraving under a cyan sky: a landlord in an orange toga pulls one scroll from colorful library shelves beside a marble bust and an old computer.",
  },
  "google-ai-overviews-property-management": {
    img: "guide-ai-overviews-v1",
    alt: "A pop engraving under a yellow sky: a lighthouse with an old computer on top shines one beam on a colorful house where a landlord in an orange toga holds a key.",
  },
  "how-to-become-a-section-8-landlord": {
    img: "guide-s8-become-v1",
    alt: "A pop engraving under a lilac sky: a landlord in an orange toga climbs the steps of a red-brick two-flat where a family waits at the open door.",
  },
  "how-to-get-recommended-by-chatgpt-property-management": {
    img: "guide-chatgpt-named-v1",
    alt: "A pop engraving under a coral sky: an old computer on an oracle altar sends a trail of smoke to a landlord in an orange toga with a key at his office door.",
  },
  "how-to-switch-property-management-software": {
    img: "guide-switch-software-v1",
    alt: "A pop engraving under a cyan sky: a landlord in an orange toga carries a crate of scrolls over a bridge from an old cracked temple to a new mint one.",
  },
};

export const coverSrcset = (img: string) =>
  [640, 720, 960, 1280, 1920, 2560].map((w) => `/img/${img}-${w}.webp ${w}w`).join(", ");
