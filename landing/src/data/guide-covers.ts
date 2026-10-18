/** Cover image per guide (style P, brand/IMAGES.md). Key: the guide slug. Prompts: public/img/prompts.toml. */
export const guideCovers: Record<string, { img: string; alt: string }> = {
  "why-owner-leads-are-dropping": {
    img: "guide-leads",
    alt: "A Roman landlord statue sits on temple steps with a silent rotary phone; an empty letterbox stands beside him.",
  },
  "how-owners-choose-a-property-manager-with-ai": {
    img: "guide-owners-ai",
    alt: "An old computer on a stone altar between columns, like an oracle; a statue holds a small model house.",
  },
  "geo-agencies-for-property-management": {
    img: "guide-agencies",
    alt: "Five Roman busts on pedestals in a row, with a brass balance scale in front of them.",
  },
  "track-ai-traffic-property-management": {
    img: "guide-track",
    alt: "A statue looks through a brass telescope at paper planes that fly toward a temple; a tally counter rests nearby.",
  },
  "ai-search-checklist-property-management-website": {
    img: "guide-checklist",
    alt: "An architect statue with a blueprint and a plumb line in front of a temple in scaffolding; an old computer on a workbench.",
  },
};

export const coverSrcset = (img: string) =>
  [640, 720, 960, 1280].map((w) => `/img/${img}-${w}.webp ${w}w`).join(", ");
