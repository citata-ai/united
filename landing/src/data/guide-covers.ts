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
};

export const coverSrcset = (img: string) =>
  [640, 720, 960, 1280, 1920, 2560].map((w) => `/img/${img}-${w}.webp ${w}w`).join(", ");
