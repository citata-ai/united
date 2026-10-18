/**
 * Builds the citation engine figure (anatomy skill, light theme on parchment).
 *
 *   node scripts/mechanism/build.mjs          writes the two generated files
 *   node scripts/mechanism/build.mjs --page   also writes a standalone test page
 *
 * Outputs (committed, so the Astro build does not run this):
 *   src/components/mechanism/figure.generated.html   static figure + SVG
 *   public/mechanism/live.js                          kit runtime + model + motion
 *
 * The loop, left to right: your site -> the citata workshop (Indexed, Found,
 * Mentioned) -> AI engines -> buyers ride back to your site and go in.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../../vendor/anatomy/iso-kit.mjs";
import * as G from "../../vendor/anatomy/lathe.mjs";
import { LOGOS } from "./logos.mjs";
import * as M from "./model.mjs";

const { depthOf } = k;
/** Facet cap for small turned parts: keeps the inline SVG light. */
const LOW = { steps: 24 };

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const strip = (path) => readFileSync(path, "utf8").replace(/^export /gm, "");

const WORDMARK = (() => {
  const svg = readFileSync(join(ROOT, "public/wordmark.svg"), "utf8");
  const [x, y, w, h] = svg
    .match(/viewBox="([^"]+)"/)[1]
    .split(/\s+/)
    .map(Number);
  const paths = svg.match(/<path[^>]*\/>/g).join("");
  return { x, y, w, h, paths };
})();

const WIDTH = 900;
const HEIGHT = 470;
const AZIMUTH = 58;

// ---------------------------------------------------------------------------
// World plan
// ---------------------------------------------------------------------------
const BENCH = { x: -300, y: -100, w: 604, d: 146, r: 8 };
const BENCH_H = 12;
const FOOT_H = 6;

// Your site: a storefront at the left. Pages leave through the outlet on its
// right face; buyers come back in through the door below it.
const HOUSE = { x: -290, y: -82, w: 68, d: 66, r: 1 };
const HOUSE_H = 68;
const DOOR_Y = M.RETURN_Y;

// The citata workshop: plinth, frame, three stations behind the upper belt.
const SB = 5;
const PLINTH = { x: -180, y: -98, w: 196, d: 62, r: 2 };
const FRAME_X = [-174, 10];
const FRAME_Y = [-92, -38];
const FRAME_TOP = 116;

const CABINET = { x: -162, y: -92, w: 44, d: 28, r: 1.5 };
const CABINET_H = 58;
const STAMP = [M.STATIONS[0].x, M.BELT_Y];
const STAMP_REST = 52;
const STAMP_DOWN = 5;

const LENS_POST = [M.STATIONS[1].x + 22, -80];
const LENS_Z = 64;
const LENS_ARM = Math.hypot(22, -80 - M.BELT_Y);
const LENS_R = 7.5;
const REST = 1.5;

const HORN = { x: M.STATIONS[2].x, y: -88 };
const HORN_Z = 66;
const HORN_AXIS = [0, 0.94, 0.34];

// AI engine receivers: bins with funnels down to the belt and a spout forward.
const BIN = 26;
const BIN_Z0 = 74;
const BIN_Z1 = 94;
const GANTRY_Y = -76;
const BEAM_Z = 98;

// Front: counter dial by the door, the gear train and the bell.
const DIAL = [-262, 18];
const DIAL_Z = 18;
const DIAL_R = 12;
const DIAL_TOP = DIAL_Z + 6;

const TOOTH = 2.6;
const GEAR_Z = 16;
const GEAR_H = 4;
const FLY = [44, 14];
const FLY_R = 24;
const FLY_TEETH = 36;
const IDLER_R = 7;
const IDLER_TEETH = 11;
const IDLER = [
  FLY[0] + (FLY_R + IDLER_R + TOOTH) * Math.cos(0.18),
  FLY[1] + (FLY_R + IDLER_R + TOOTH) * Math.sin(0.18),
];
const ESCAPE_R = 12;
const TEETH = 12;
const ESCAPE = [
  IDLER[0] + (IDLER_R + ESCAPE_R + TOOTH) * Math.cos(-0.25),
  IDLER[1] + (IDLER_R + ESCAPE_R + TOOTH) * Math.sin(-0.25),
];
const ANCHOR = [ESCAPE[0] + ESCAPE_R + 14, ESCAPE[1]];
const BED = {
  x: FLY[0] - FLY_R - 8,
  y: FLY[1] - FLY_R - 7,
  w: ANCHOR[0] + 10 - (FLY[0] - FLY_R - 8),
  d: FLY_R * 2 + 14,
  r: 3,
};

const BELL = [214, 22];
const BELL_Z = 28;

const P = k.fitProjection(
  [
    ...k.boxCorners(BENCH, -BENCH_H - FOOT_H, 0),
    [M.ENGINE_X[0] - 30, GANTRY_Y, BEAM_Z + 8],
    [FRAME_X[0], FRAME_Y[0], FRAME_TOP + 2],
    [HOUSE.x, HOUSE.y, HOUSE_H + 20],
  ],
  WIDTH,
  HEIGHT,
  { pad: 10, azimuth: AZIMUTH },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const up = (x, y, z) => G.frameOf([x, y, z], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
let parts = 0;
const count = (n = 1) => {
  parts += n;
  return "";
};
const rivets = (w, h, m = 1.6) =>
  [
    [m, m],
    [w - m, m],
    [m, h - m],
    [w - m, h - m],
  ]
    .map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="0.5" class="ce-rivet"/>`)
    .join("");

// ---------------------------------------------------------------------------
// Bench
// ---------------------------------------------------------------------------
function bench() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BENCH, -BENCH_H - FOOT_H, BENCH_H, P)}"/>`];
  for (const [x, y] of k.corners(BENCH, 24)) {
    out.push(S(k.cylinder(x, y, 8, -BENCH_H - FOOT_H, 1.8, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 6, -BENCH_H - FOOT_H + 1.8, FOOT_H - 1.8, P, 28), { tone: "mid" }));
    count(2);
  }
  out.push(S(k.slabOf(BENCH, -BENCH_H, BENCH_H, P, 8, 1.4), { tone: "mid" }), count());
  out.push(L(k.planOutline(k.insetPlan(BENCH, 6), 0, P), { tone: "faint" }));
  const screws = k.corners(BENCH, 11);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(
    D(
      screws.map(([x, y]) => at([x, y, 0])),
      { size: 0.55 },
    ),
  );
  const strip = { x: -180, y: BENCH.y + BENCH.d - 15, w: 170, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }), count());
  const ticks = k.topTicks(
    strip.x + 4,
    strip.x + strip.w - 4,
    5,
    5,
    strip.y + 0.8,
    0.6,
    [2, 3.8],
    P,
  );
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(
    D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], {
      size: 0.45,
    }),
  );
  return out.join("");
}

// ---------------------------------------------------------------------------
// Your site
// ---------------------------------------------------------------------------
function house() {
  const out = [`<path class="iso-halo" d="${k.haloOf(HOUSE, 0, HOUSE_H, P)}"/>`];
  out.push(S(k.slabOf(k.insetPlan(HOUSE, -2), 0, 4, P, 3, 0.5), { tone: "lo" }));
  out.push(
    S(k.slabOf(HOUSE, 4, HOUSE_H - 4, P, 3, 0.6), {
      tone: "mid",
      inner: L(k.sideSeam(HOUSE, 36, P, 3), { tone: "faint" }),
    }),
  );
  out.push(S(k.slabOf(k.insetPlan(HOUSE, -2.5), HOUSE_H, 3, P, 3, 0.5), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(HOUSE, 2), HOUSE_H + 3, 4, P, 3, 0.4), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(HOUSE, 5), HOUSE_H + 7, P, 3), { tone: "faint" }));
  count(4);
  const chimney = { x: HOUSE.x + 9, y: HOUSE.y + 9, w: 9, d: 9, r: 0.6 };
  out.push(S(k.slabOf(chimney, HOUSE_H + 7, 9, P, 2, 0.3), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(chimney, -1), HOUSE_H + 16, 1.6, P, 2, 0.3), { tone: "mid" }));
  count(2);
  // Front (+y) face: two shop windows and the sign.
  const fy = HOUSE.y + HOUSE.d;
  const front = (x, z) => k.sideMatrix([x, fy], z, P, "left");
  for (const wx of [HOUSE.x + 6, HOUSE.x + 37]) {
    out.push(
      `<g transform="${front(wx, 30)}"><rect x="0" y="0" width="24" height="18" rx="0.6" class="iso-line" data-tone="mid"/><path class="iso-line" data-tone="lo" d="M8 0V18M16 0V18M0 9H24"/></g>`,
    );
    count();
  }
  out.push(
    `<g transform="${front(HOUSE.x + 9, HOUSE_H - 6)}"><rect x="0" y="0" width="50" height="11" rx="0.8" class="iso-line" data-tone="mid"/>${rivets(50, 11)}<text x="25" y="7.2" class="ce-sign" text-anchor="middle">YOUR SITE</text></g>`,
  );
  count();
  // Right (+x) face: page outlet up top, the door below, a window between.
  const sx = HOUSE.x + HOUSE.w;
  const side = (y, z) => k.sideMatrix([sx, y], z, P, "right");
  out.push(
    `<g transform="${side(DOOR_Y - 7, 32)}"><rect x="0" y="0" width="14" height="28" rx="0.6" class="iso-line" data-tone="hi"/><rect x="2.2" y="2.6" width="9.6" height="10" class="iso-line" data-tone="lo"/><rect x="2.2" y="14.6" width="9.6" height="10" class="iso-line" data-tone="lo"/><circle cx="2.6" cy="15" r="0.8" class="ce-rivet"/></g>`,
  );
  out.push(
    `<g transform="${side(HOUSE.y + 6, 30)}"><rect x="0" y="0" width="14" height="16" rx="0.6" class="iso-line" data-tone="mid"/><path class="iso-line" data-tone="lo" d="M7 0V16M0 8H14"/></g>`,
  );
  count(2);
  // Awning over the door and a step.
  out.push(
    S(k.slabOf({ x: sx, y: DOOR_Y - 9, w: 6, d: 18, r: 0.6 }, 34, 2, P, 2, 0.3), { tone: "mid" }),
  );
  count();
  // Outlet: a hood on the right face where pages come out onto the belt.
  const hood = { x: sx, y: M.BELT_Y - 8, w: 8, d: 16, r: 1 };
  out.push(S(k.slabOf(hood, M.BELT_TOP + 9, 4, P, 2, 0.4), { tone: "mid" }));
  out.push(
    S(k.slabOf({ x: sx, y: M.BELT_Y - 8, w: 2.4, d: 16, r: 0.4 }, M.BELT_TOP - 3, 12, P, 2), {
      tone: "mid",
      crease: "none",
    }),
  );
  count(2);
  return out.join("");
}

// ---------------------------------------------------------------------------
// citata workshop
// ---------------------------------------------------------------------------
function plinth() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLINTH, 0, SB, P)}"/>`];
  out.push(S(k.slabOf(PLINTH, 0, SB, P, 3, 0.8), { tone: "lo", crease: "mid" }), count());
  out.push(L(k.planOutline(k.insetPlan(PLINTH, 4), SB, P, 3), { tone: "mid" }));
  out.push(
    D(
      k.corners(PLINTH, 2.2).map(([a, b]) => at([a, b, SB])),
      { size: 0.5, tone: "hi" },
    ),
  );
  const face = PLINTH.y + PLINTH.d;
  for (const st of M.STATIONS) {
    const w = 30;
    const m = k.sideMatrix([st.x - w / 2, face], SB - 0.6, P, "left");
    out.push(
      `<g transform="${m}"><rect x="0" y="0" width="${w}" height="3.8" rx="0.4" class="ce-plate"/><text x="${w / 2}" y="2.8" class="ce-plate-text" text-anchor="middle">${st.name.toUpperCase()}</text></g>`,
    );
    count();
  }
  return out.join("");
}

function post(x, y) {
  const out = [];
  out.push(
    S(k.slabOf({ x: x - 5, y: y - 5, w: 10, d: 10, r: 1 }, SB, 3, P, 3, 0.4), { tone: "mid" }),
  );
  out.push(
    S(
      k.slabOf(
        { x: x - 3, y: y - 3, w: 6, d: 6, r: 0.8 },
        SB + 3,
        FRAME_TOP - 8 - SB - 3,
        P,
        3,
        0.4,
      ),
      {
        tone: "mid",
      },
    ),
  );
  out.push(D([at([x, y, SB + 3])], { size: 0.45 }));
  count(2);
  return out.join("");
}

function frameBack() {
  const out = [];
  for (const x of FRAME_X) out.push(post(x, FRAME_Y[0]));
  const beam = {
    x: FRAME_X[0] - 3.5,
    y: FRAME_Y[0] - 3.5,
    w: FRAME_X[1] - FRAME_X[0] + 7,
    d: 7,
    r: 1,
  };
  out.push(
    S(k.slabOf(beam, FRAME_TOP - 22, 22, P, 3, 0.6), {
      tone: "mid",
      inner: L(k.sideSeam(beam, FRAME_TOP - 3, P, 3), { tone: "faint" }),
    }),
    count(),
  );
  const cx = (FRAME_X[0] + FRAME_X[1]) / 2;
  const pw = 78;
  const m = k.sideMatrix([cx - pw / 2, beam.y + beam.d], FRAME_TOP - 4, P, "left");
  const scale = 58 / WORDMARK.w;
  out.push(
    `<g transform="${m}"><rect x="0" y="0" width="${pw}" height="15" rx="1" class="ce-nameplate"/>${rivets(pw, 15, 2)}<g transform="translate(${(pw - 58) / 2} ${7.5 - (WORDMARK.h * scale) / 2}) scale(${scale.toFixed(4)}) translate(${-WORDMARK.x} ${-WORDMARK.y})">${WORDMARK.paths}</g></g>`,
  );
  count();
  return out.join("");
}

function cabinet() {
  const out = [];
  out.push(S(k.slabOf(k.insetPlan(CABINET, -1.5), SB, 4, P, 3, 0.4), { tone: "lo" }));
  out.push(S(k.slabOf(CABINET, SB + 4, CABINET_H - SB - 4, P, 3, 0.6), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(CABINET, -1.2), CABINET_H, 2.5, P, 3, 0.5), { tone: "mid" }));
  count(3);
  const face = CABINET.y + CABINET.d;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      const m = k.sideMatrix(
        [CABINET.x + 3 + col * 19.5, face],
        CABINET_H - 5 - row * 16,
        P,
        "left",
      );
      out.push(
        `<g transform="${m}"><rect x="0" y="0" width="18" height="13" rx="0.6" class="iso-line" data-tone="mid"/><rect x="5.5" y="2.4" width="7" height="3.4" class="iso-line" data-tone="lo"/><circle cx="9" cy="9" r="1.2" class="iso-line" data-tone="mid"/></g>`,
      );
      count();
    }
  }
  const arm = { x: STAMP[0] - 5, y: CABINET.y + 6, w: 10, d: STAMP[1] - CABINET.y - 6 + 6, r: 1.5 };
  out.push(S(k.slabOf(arm, CABINET_H + 2.5, 5, P, 3, 0.5), { tone: "mid" }), count());
  out.push(
    S(k.cylinder(STAMP[0], STAMP[1], 5, CABINET_H - 3, 5.5, P, 24), { tone: "mid" }),
    count(),
  );
  out.push(D([at([arm.x + 5, arm.y + 4, CABINET_H + 7.5])], { size: 0.5 }));
  return out.join("");
}

function stamp() {
  const [x, y] = STAMP;
  count(2);
  return [
    S(k.cylinder(x, y, 1.6, STAMP_REST + 2, CABINET_H - 3 - STAMP_REST - 2 + 4, P, 16), {
      tone: "hi",
      crease: "none",
    }),
    S(k.cylinder(x, y, 4.6, STAMP_REST, 2.2, P, 24, 0.4), { tone: "hi" }),
  ].join("");
}

function lensPost() {
  const [x, y] = LENS_POST;
  count(3);
  return [
    S(k.cylinder(x, y, 7, SB, 3, P, 28, 0.4), { tone: "lo" }),
    S(k.cylinder(x, y, 2.6, SB + 3, LENS_Z - SB - 3, P, 20), { tone: "mid", crease: "none" }),
    L([22, 38, 52].map((z) => k.sideArc(x, y, 2.6, z, P, 12)).join(""), { tone: "faint" }),
    S(k.cylinder(x, y, 4.2, LENS_Z - 6, 5, P, 24, 0.4), { tone: "mid" }),
    L(k.knurl(x, y, 4.2, LENS_Z - 6, LENS_Z - 1, 20, P), { tone: "lo" }),
  ].join("");
}

/** The lens on its arm at swing angle `a` (0 = over the belt). Also built live. */
function lensAt(a) {
  const [px, py] = LENS_POST;
  const base = Math.atan2(M.BELT_Y - py, M.STATIONS[1].x - px);
  const t = base + a;
  const cx = px + Math.cos(t) * LENS_ARM;
  const cy = py + Math.sin(t) * LENS_ARM;
  const nx = -Math.sin(t) * 1.6;
  const ny = Math.cos(t) * 1.6;
  const ex = px + Math.cos(t) * (LENS_ARM - LENS_R);
  const ey = py + Math.sin(t) * (LENS_ARM - LENS_R);
  const bar = [
    [px + nx, py + ny],
    [ex + nx, ey + ny],
    [ex - nx, ey - ny],
    [px - nx, py - ny],
  ];
  return [
    k.solidSvg(k.extrude(bar, LENS_Z, 2.4, P), { tone: "mid" }),
    k.solidSvg(k.cylinder(px, py, 3.4, LENS_Z, 3.4, P, 20, 0.3), { tone: "mid" }),
    k.solidSvg(k.cylinder(cx, cy, LENS_R + 1.2, LENS_Z, 2.4, P, 40, 0.3), { tone: "mid" }),
    k.lineSvg(k.ring(cx, cy, LENS_R, LENS_Z + 2.4, P, 40), { tone: "hi" }),
    k.lineSvg(k.ring(cx, cy, LENS_R - 2.2, LENS_Z + 2.4, P, 32), { tone: "faint" }),
  ].join("");
}

const hornFrame = () => G.frameAlong([HORN.x, HORN.y + 2, HORN_Z - 4], HORN_AXIS);

function horn() {
  const out = [];
  out.push(S(k.cylinder(HORN.x, HORN.y, 8, SB, 3, P, 28, 0.4), { tone: "lo" }));
  out.push(
    S(k.cylinder(HORN.x, HORN.y, 2.4, SB + 3, HORN_Z - SB - 13, P, 20), {
      tone: "mid",
      crease: "none",
    }),
  );
  out.push(S(k.cylinder(HORN.x, HORN.y, 4, HORN_Z - 12, 3, P, 24), { tone: "mid" }));
  count(3);
  const box = G.frameAlong([HORN.x, HORN.y - 4, HORN_Z - 4], [0, 1, 0]);
  out.push(S(G.disc(0, 6, 8, box, P, LOW), { tone: "mid" }), count());
  out.push(L(G.circleOf(box, 6, 5.4, P), { tone: "lo" }));
  const F = hornFrame();
  const len = 34;
  const radius = (s) => 2.2 + 14.8 * (s / len) ** 2.6;
  const slope = (s) => (14.8 * 2.6 * (s / len) ** 1.6) / len;
  const profile = [];
  for (let i = 0; i <= 24; i++) profile.push([(i / 24) * len, radius((i / 24) * len), 1]);
  out.push(
    S(
      G.lathe(profile, F, P, {
        smooth: { slope, radius },
        rims: "last",
        hole: [len, radius(len) - 1.1],
      }),
      {
        tone: "hi",
      },
    ),
    count(),
  );
  out.push(
    L(G.arcOf(F, len * 0.55, radius(len * 0.55), P, { slope: slope(len * 0.55) }), {
      tone: "faint",
    }),
  );
  out.push(L(G.circleOf(F, len, radius(len) - 2.4, P), { tone: "lo" }));
  return out.join("");
}

function hornWaves() {
  const F = hornFrame();
  return [0, 1, 2]
    .map(
      (i) =>
        `<path data-part="wave" class="iso-line" data-tone="mid" data-free="both" d="${G.arcOf(F, 38 + i * 5, 15 + i * 3, P, { least: -1, from: Math.PI * 0.15, to: Math.PI * 0.85 })}" opacity="0"/>`,
    )
    .join("");
}

// ---------------------------------------------------------------------------
// Belts
// ---------------------------------------------------------------------------
/** Cleats (cups) across the upper belt; they move with it. Also built live. */
function cleatsAt(t) {
  let d = "";
  const shift = (((M.SPEED * t) % M.CUP) + M.CUP) % M.CUP;
  for (let x = M.BELT_FROM + 8 + shift; x < M.BELT_TO - 8; x += M.CUP) {
    d += k.lineOnTop([x, M.BELT_Y - 5], [x, M.BELT_Y + 5], M.BELT_TOP, P);
  }
  return d;
}

/** Cleats on the lower belt, moving the other way. Also built live. */
function backCleatsAt(t) {
  let d = "";
  const shift = (((-M.RETURN_SPEED * t) % M.CUP) + M.CUP) % M.CUP;
  for (let x = M.RETURN_FROM + 8 + shift; x < M.RETURN_TO - 8; x += M.CUP) {
    d += k.lineOnTop([x, M.RETURN_Y - 5], [x, M.RETURN_Y + 5], M.RETURN_TOP, P);
  }
  return d;
}

/** One belt: body, belt surface, the back crease, cleats, two lips, end pulleys. */
function belt({ y, top, from, to, legs, cleats, part }) {
  const out = [];
  const y0 = y - 7;
  for (const x of legs) {
    const z0 = x > PLINTH.x && x < PLINTH.x + PLINTH.w && y < PLINTH.y + PLINTH.d ? SB : 0;
    out.push(S(k.cylinder(x, y, 5, z0, 2, P, 20, 0.3), { tone: "lo" }));
    const leg = { x: x - 1.6, y: y - 1.6, w: 3.2, d: 3.2, r: 0.6 };
    out.push(S(k.slabOf(leg, z0 + 2, top - 9 - z0, P, 2), { tone: "mid", crease: "none" }));
    count(2);
  }
  const body = { x: from, y: y0, w: to - from, d: 14, r: 2 };
  const z0 = Math.max(0, top - 7);
  out.push(
    S(k.slabOf(body, z0, top - 2 - z0, P, 3, 0.4), {
      tone: "mid",
      inner: top - 2 - z0 > 3 ? L(k.sideSeam(body, z0 + 2.5, P, 3), { tone: "faint" }) : "",
    }),
    count(),
  );
  out.push(
    S(k.slabOf({ x: from + 2, y: y0 + 2.5, w: body.w - 4, d: 9, r: 1 }, top - 2, 2, P, 2), {
      tone: "lo",
      crease: "none",
    }),
    count(),
  );
  out.push(L(k.lineOnTop([from, y - 5], [to, y - 5], top, P), { tone: "faint" }));
  out.push(`<path data-part="${part}" class="iso-line" data-tone="mid" d="${cleats(0)}"/>`);
  for (const ly of [y0, y0 + 12]) {
    out.push(
      S(k.slabOf({ x: from, y: ly, w: body.w, d: 2, r: 0.6 }, top - 2, 3.4, P, 2), {
        tone: "mid",
        crease: "none",
      }),
    );
    count();
  }
  for (const x of [from + 1, to - 1]) {
    const F = G.frameAlong([x, y0 - 0.5, top - 3], [0, 1, 0]);
    out.push(S(G.disc(0, 15, Math.min(4.2, top - 3), F, P, LOW), { tone: "mid" }), count());
  }
  return out.join("");
}

const upperBelt = () =>
  belt({
    y: M.BELT_Y,
    top: M.BELT_TOP,
    from: M.BELT_FROM,
    to: M.BELT_TO,
    legs: [-196, -152, -112, -56, -4, 44, 112, 180, 226],
    cleats: cleatsAt,
    part: "cleats",
  });

/** The lower (return) belt plus the queue rail that runs on to the door. */
function lowerBelt() {
  const out = [
    belt({
      y: M.RETURN_Y,
      top: M.RETURN_TOP,
      from: M.RETURN_FROM,
      to: M.RETURN_TO,
      legs: [],
      cleats: backCleatsAt,
      part: "backcleats",
    }),
  ];
  const x0 = HOUSE.x + HOUSE.w;
  const x1 = M.RETURN_FROM;
  const body = { x: x0, y: M.RETURN_Y - 7, w: x1 - x0, d: 14, r: 1.5 };
  out.push(S(k.slabOf(body, 0, M.RETURN_TOP, P, 3, 0.4), { tone: "mid" }), count());
  for (const y of [M.RETURN_Y - 7, M.RETURN_Y + 5]) {
    out.push(
      S(k.slabOf({ x: x0, y, w: x1 - x0, d: 2, r: 0.6 }, M.RETURN_TOP, 2.4, P, 2), {
        tone: "mid",
        crease: "none",
      }),
    );
    count();
  }
  const ticks = k.topTicks(
    M.DOOR_X + M.SLOT / 2,
    x1 - 2,
    M.SLOT,
    1,
    M.RETURN_Y + 5,
    M.RETURN_TOP + 2.4,
    [1.4, 1.4],
    P,
  );
  out.push(L(ticks.major, { tone: "lo" }));
  return out.join("");
}

function gate() {
  const plan = { x: HOUSE.x + HOUSE.w, y: DOOR_Y - 7, w: 1.6, d: 14, r: 0.4 };
  return S(k.slabOf(plan, M.RETURN_TOP + 0.5, 10, P, 2, 0.3), { tone: "hi" });
}

// ---------------------------------------------------------------------------
// AI engines
// ---------------------------------------------------------------------------
function gantry() {
  const out = [];
  const x0 = M.ENGINE_X[0] - 24;
  const x1 = M.ENGINE_X[M.ENGINE_X.length - 1] + 24;
  for (const x of [x0, x1]) {
    out.push(
      S(k.slabOf({ x: x - 7, y: GANTRY_Y - 7, w: 14, d: 14, r: 1.5 }, 0, 3, P, 3, 0.4), {
        tone: "mid",
      }),
    );
    out.push(
      S(k.slabOf({ x: x - 3.5, y: GANTRY_Y - 3.5, w: 7, d: 7, r: 1 }, 3, BEAM_Z - 3, P, 3, 0.4), {
        tone: "mid",
      }),
    );
    out.push(
      D(
        k.corners({ x: x - 7, y: GANTRY_Y - 7, w: 14, d: 14 }, 2).map(([a, b]) => at([a, b, 3])),
        { size: 0.45 },
      ),
    );
    count(2);
  }
  const beam = { x: x0 - 4, y: GANTRY_Y - 4, w: x1 - x0 + 8, d: 8, r: 1 };
  out.push(
    S(k.slabOf(beam, BEAM_Z, 7, P, 3, 0.5), {
      tone: "mid",
      inner: L(k.sideSeam(beam, BEAM_Z + 3.5, P, 3), { tone: "faint" }),
    }),
    count(),
  );
  const m = k.sideMatrix([(x0 + x1) / 2 - 24, beam.y + beam.d], BEAM_Z + 6, P, "left");
  out.push(
    `<g transform="${m}"><text x="24" y="3.6" class="ce-sign" text-anchor="middle">AI ENGINES</text></g>`,
  );
  return out.join("");
}

function receivers() {
  return M.ENGINE_X.map((x, i) => {
    const out = [];
    const y = M.BELT_Y;
    const plan = { x: x - BIN / 2, y: y - BIN / 2, w: BIN, d: BIN, r: 1.2 };
    out.push(
      S(
        k.slabOf(
          { x: x - 3, y: GANTRY_Y + 4, w: 6, d: plan.y - GANTRY_Y - 4, r: 0.6 },
          BEAM_Z - 2,
          4,
          P,
          2,
        ),
        { tone: "mid", crease: "none" },
      ),
    );
    const F = up(x, y, M.MOUTH_Z);
    out.push(
      S(
        G.solidOf(
          [
            [0, 6],
            [2, 6],
            [BIN_Z0 - M.MOUTH_Z, 9.5],
          ],
          F,
          P,
          LOW,
        ),
        { tone: "mid" },
      ),
    );
    out.push(L(G.arcOf(F, 2, 6, P), { tone: "lo" }));
    out.push(
      S(k.slabOf(plan, BIN_Z0, BIN_Z1 - BIN_Z0, P, 3, 0.5), {
        tone: "mid",
        inner: L(k.sideSeam(plan, BIN_Z0 + 3, P, 3), { tone: "faint" }),
      }),
    );
    out.push(S(k.slabOf(k.insetPlan(plan, -1), BIN_Z1, 1.6, P, 3, 0.4), { tone: "mid" }));
    out.push(L(k.planOutline(k.insetPlan(plan, 3), BIN_Z1 + 1.6, P, 3), { tone: "lo" }));
    const m = k.sideMatrix([x - 11, plan.y + plan.d], BIN_Z1 - 1.5, P, "left");
    out.push(
      `<g transform="${m}"><rect x="0" y="0" width="22" height="17" rx="0.8" class="ce-logo-plate"/>${rivets(22, 17, 1.4)}<path class="ce-logo" transform="translate(4.25 1.75) scale(0.5625)" d="${LOGOS[i].d}"/></g>`,
    );
    count(5);
    return `<g data-part="receiver" data-engine="${i}">${out.join("")}</g>`;
  }).join("");
}

/** The spout on each receiver's front: out over the belt, then down. */
function spouts() {
  return M.ENGINE_X.map((x) => {
    const y0 = M.BELT_Y + BIN / 2;
    const z = BIN_Z0 + 4;
    const run = G.frameAlong([x, y0, z], [0, 1, 0]);
    const len = M.RETURN_Y - y0;
    const drop = G.frameAlong([x, M.RETURN_Y, z], [0, 0, -1]);
    count(3);
    return [
      S(G.disc(0, len, 4.4, run, P, LOW), { tone: "mid" }),
      S(G.sphereOf([x, M.RETURN_Y, z], 5, P, { steps: 20 }), { tone: "mid" }),
      S(G.disc(0, z - M.SPOUT_Z, 4.4, drop, P, LOW), { tone: "mid" }),
      S(G.ringBand(z - M.SPOUT_Z - 1.6, z - M.SPOUT_Z, 4.4, 5.8, drop, P, LOW), { tone: "mid" }),
    ].join("");
  }).join("");
}

/** Glass drop tubes from each spout down to the lower belt. Front glass only. */
function dropTubes() {
  const r = 5;
  const z0 = M.RETURN_TOP + 9;
  const z1 = M.SPOUT_Z - 1.6;
  return M.ENGINE_X.map((x) => {
    const F = up(x, M.RETURN_Y, z0);
    count(2);
    return [
      `<path class="iso-line" data-tone="lo" d="${G.silhouetteOf(
        [
          [0, r],
          [z1 - z0, r],
        ],
        F,
        P,
      )}"/>`,
      L(G.arcOf(F, (z1 - z0) / 2, r, P), { tone: "faint" }),
      S(G.ringBand(0, 1.6, r, r + 1.2, F, P, LOW), { tone: "mid" }),
    ].join("");
  }).join("");
}

function hitOf(i) {
  const x = M.ENGINE_X[i];
  const y = M.BELT_Y;
  const pts = [
    [x - BIN / 2 - 2, y - BIN / 2, BIN_Z1 + 2],
    [x + BIN / 2 + 2, y - BIN / 2, BIN_Z1 + 2],
    [x + BIN / 2 + 2, y + BIN / 2, BIN_Z1 + 2],
    [x + BIN / 2 + 2, y + BIN / 2, M.MOUTH_Z - 2],
    [x - BIN / 2 - 2, y + BIN / 2, M.MOUTH_Z - 2],
    [x - BIN / 2 - 2, y + BIN / 2, BIN_Z1 + 2],
  ].map(at);
  return `<path class="ce-hit" data-engine="${i}" d="M${pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join("L")}Z"><title>Send a page to ${LOGOS[i].label}</title></path>`;
}

// ---------------------------------------------------------------------------
// Tokens: the buyer ball and the page card (drawn through <use>, so inline colour)
// ---------------------------------------------------------------------------
const inline = (svg, ink) =>
  svg.replace(/class="(iso-[a-z]+)"/g, (all, name) =>
    ink[name] ? `${all} style="${ink[name]}"` : all,
  );

function ball() {
  return inline(S(G.sphereOf([0, 0, 0], M.BALL_R, P), { tone: "hi", lit: true }), {
    "iso-fill": "fill:#c1410b;stroke:#8f2f07;stroke-width:.6",
    "iso-shade": "fill:#c1410b;stroke:#c1410b;stroke-width:.4",
    "iso-top": "fill:#e8743f;stroke:#e8743f;stroke-width:.4",
  });
}

function page() {
  const card = { x: -5.5, y: -4, w: 11, d: 8, r: 0.6 };
  const body = inline(S(k.slabOf(card, 0, 1.2, P, 2, 0.3), { tone: "hi" }), {
    "iso-fill": "fill:#fbf7ee",
    "iso-shade": "fill:#e8dfcc",
    "iso-top": "fill:#fffdf8",
    "iso-edge": "fill:none;stroke:#7a6b58;stroke-width:.6",
    "iso-crease": "fill:none;stroke:#d3c5aa;stroke-width:.5",
  });
  const rule =
    k.lineOnTop([-3.5, -1.6], [2, -1.6], 1.2, P) + k.lineOnTop([-3.5, 0.4], [3.5, 0.4], 1.2, P);
  const tick = k.onTop(
    [
      [1.4, 2.2],
      [2.4, 3.1],
      [4.2, 0.9],
    ],
    1.2,
    P,
  );
  return `${body}<path d="${rule}" style="fill:none;stroke:#ad9c7e;stroke-width:.5;stroke-linecap:round" data-free="both"/><path d="${tick}" style="fill:none;stroke:#c1410b;stroke-width:1;stroke-linecap:round;stroke-linejoin:round" data-free="both"/>`;
}

// ---------------------------------------------------------------------------
// Front: gear train, bell, dial
// ---------------------------------------------------------------------------
function drive() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BED, 0, 3, P)}"/>`];
  out.push(S(k.slabOf(BED, 0, 3, P, 4, 0.6), { tone: "mid" }), count());
  out.push(L(k.planOutline(k.insetPlan(BED, 3), 3, P), { tone: "faint" }));
  out.push(
    D(
      k.corners(BED, 3.4).map(([a, b]) => at([a, b, 3])),
      { size: 0.45 },
    ),
  );
  for (const [[x, y], r] of [
    [FLY, 9],
    [IDLER, 5],
    [ESCAPE, 6],
  ]) {
    out.push(S(k.cylinder(x, y, r, 3, 3, P, 28, 0.4), { tone: "lo" }));
    out.push(
      S(k.cylinder(x, y, r > 6 ? 3.4 : 2.2, 6, GEAR_Z - 6, P, 18), { tone: "mid", crease: "none" }),
    );
    count(2);
  }
  out.push(`<g data-part="train">${trainAt(0)}</g>`);
  count(3);
  out.push(S(k.cylinder(ANCHOR[0], ANCHOR[1], 4.5, 3, 3, P, 24, 0.3), { tone: "lo" }));
  out.push(
    S(k.cylinder(ANCHOR[0], ANCHOR[1], 1.8, 6, GEAR_Z - 6 + 0.5, P, 16), {
      tone: "mid",
      crease: "none",
    }),
  );
  out.push(`<g data-part="anchor">${anchorAt(0)}</g>`);
  count(3);
  return out.join("");
}

function gearSvg(cx, cy, r, n, phase, saw, z, h, tone) {
  const w = (Math.PI * 2) / n;
  const centre = depthOf([cx, cy, z], P);
  const back = [];
  const front = [];
  for (let i = 0; i < n; i++) {
    const t = phase + i * w;
    const pt = (a, rr) => [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
    const ring = saw
      ? [pt(t, r - 0.4), pt(t + w * 0.62, r + TOOTH + 0.6), pt(t + w * 0.7, r - 0.4)]
      : [
          pt(t, r - 0.4),
          pt(t + w * 0.16, r + TOOTH),
          pt(t + w * 0.42, r + TOOTH),
          pt(t + w * 0.58, r - 0.4),
        ];
    const svg = k.solidSvg(k.extrude(ring, z, h, P), { tone, crease: "none" });
    (depthOf([...pt(t + w * 0.3, r), z], P) < centre ? back : front).push(svg);
  }
  return (
    back.join("") +
    k.solidSvg(k.cylinder(cx, cy, r, z, h, P, Math.max(24, n * 2), 0.3), { tone }) +
    front.join("")
  );
}

function trainAt(e) {
  const great = -e * (ESCAPE_R / FLY_R);
  const pinion = e * (ESCAPE_R / IDLER_R);
  const z = GEAR_Z;
  const h = GEAR_H;
  const top = z + h;
  let spokes = "";
  for (let i = 0; i < 6; i++) {
    const t = great + (i / 6) * Math.PI * 2;
    spokes += k.lineOnTop(
      [FLY[0] + Math.cos(t) * 9, FLY[1] + Math.sin(t) * 9],
      [FLY[0] + Math.cos(t) * (FLY_R - 4), FLY[1] + Math.sin(t) * (FLY_R - 4)],
      top,
      P,
    );
  }
  return [
    gearSvg(FLY[0], FLY[1], FLY_R, FLY_TEETH, great, false, z, h, "hi"),
    k.lineSvg(
      k.ring(FLY[0], FLY[1], FLY_R - 4, top, P, 72) + k.ring(FLY[0], FLY[1], 9, top, P, 28),
      { tone: "lo" },
    ),
    k.lineSvg(spokes, { tone: "mid" }),
    k.solidSvg(k.cylinder(FLY[0], FLY[1], 5, top, 4, P, 24, 0.4), { tone: "mid" }),
    gearSvg(IDLER[0], IDLER[1], IDLER_R, IDLER_TEETH, pinion, false, z, h, "mid"),
    k.lineSvg(k.ring(IDLER[0], IDLER[1], 3, top, P, 20), { tone: "lo" }),
    gearSvg(ESCAPE[0], ESCAPE[1], ESCAPE_R, TEETH, -e, true, z, h - 1, "hi"),
    k.lineSvg(
      k.ring(ESCAPE[0], ESCAPE[1], ESCAPE_R - 4, top - 1, P, 40) +
        k.ring(ESCAPE[0], ESCAPE[1], 3, top - 1, P, 20),
      {
        tone: "lo",
      },
    ),
  ].join("");
}

/** The anchor: a solid fork on its post, pointing at the escape wheel, rocking `rock`. */
function anchorAt(rock) {
  const [ax, ay] = ANCHOR;
  const z = GEAR_Z + 0.5;
  const t = Math.PI + rock;
  const P2 = (a, r) => [ax + Math.cos(t + a) * r, ay + Math.sin(t + a) * r];
  const fork = [
    P2(-0.58, 14),
    P2(-0.5, 11.5),
    P2(0, 3.5),
    P2(0.5, 11.5),
    P2(0.58, 14),
    P2(0.66, 12),
    P2(0.35, 3),
    P2(Math.PI - 0.3, 5.5),
    P2(Math.PI, 7),
    P2(Math.PI + 0.3, 5.5),
    P2(-0.35, 3),
    P2(-0.66, 12),
  ];
  return [
    k.solidSvg(k.extrude(fork, z, 2, P, { convex: false }), { tone: "hi" }),
    k.solidSvg(k.cylinder(ax, ay, 2.6, z, 2.6, P, 16, 0.3), { tone: "mid" }),
  ].join("");
}

function bell() {
  const [x, y] = BELL;
  count(4);
  return [
    S(k.cylinder(x, y, 6.5, 0, 3, P, 24, 0.4), { tone: "lo" }),
    S(k.cylinder(x, y, 1.8, 3, BELL_Z + 12 - 3, P, 16), { tone: "mid", crease: "none" }),
    S(k.cylinder(x - 19, y + 2, 4, 0, 3, P, 20, 0.3), { tone: "lo" }),
    S(k.cylinder(x - 19, y + 2, 1.5, 3, BELL_Z - 7, P, 14), { tone: "mid", crease: "none" }),
  ].join("");
}

function bellDome() {
  const [x, y] = BELL;
  const F = up(x, y, BELL_Z);
  const h = 12;
  const radius = (s) => 3 + 7.5 * Math.cos((s / h) * (Math.PI / 2)) ** 0.8;
  const profile = [];
  for (let i = 0; i <= 16; i++) profile.push([(i / 16) * h, radius((i / 16) * h), 1]);
  profile[0] = [0, 10.5];
  return [
    S(G.solidOf(profile, F, P), { tone: "hi" }),
    L(G.arcOf(F, 1.6, radius(1.6), P), { tone: "faint" }),
    S(G.sphereOf([x, y, BELL_Z + h + 1], 1.8, P), { tone: "mid" }),
  ].join("");
}

function hammerAt(swing) {
  const [x, y] = BELL;
  const pivot = [x - 19, y + 2, BELL_Z - 4];
  const head = [x - 15.5 + swing * 2.6, y + 2, BELL_Z + 4];
  return [
    k.lineSvg(k.segment(pivot, head, P), { tone: "hi" }),
    k.solidSvg(k.cylinder(head[0], head[1], 2.8, head[2] - 2.6, 5.2, P, 20, 0.3), { tone: "mid" }),
    k.dotsSvg([at(pivot)], { size: 0.9, tone: "mid" }),
  ].join("");
}

function dial() {
  const [x, y] = DIAL;
  const ticks = k.radialTicks(x, y, DIAL_R - 2.6, 40, 5, DIAL_TOP, [1.2, 2.4], P);
  count(3);
  return [
    S(k.cylinder(x, y, 7, 0, 3, P, 24, 0.4), { tone: "lo" }),
    S(k.cylinder(x, y, 2.4, 3, DIAL_Z - 3, P, 16), { tone: "mid", crease: "none" }),
    S(k.cylinder(x, y, DIAL_R, DIAL_Z, DIAL_TOP - DIAL_Z, P, 56, 0.6), {
      tone: "hi",
      crease: "lo",
    }),
    L(k.knurl(x, y, DIAL_R, DIAL_TOP - 2.6, DIAL_TOP, 52, P, 0.3), { tone: "lo" }),
    L(k.ring(x, y, DIAL_R - 2, DIAL_TOP, P, 56), { tone: "lo" }),
    L(ticks.minor, { tone: "lo" }),
    L(ticks.major, { tone: "mid" }),
    L(k.ring(x, y, 1.4, DIAL_TOP, P, 16), { tone: "mid" }),
  ].join("");
}

function needleAt(turn) {
  const a = turn * Math.PI * 2;
  const [x, y] = DIAL;
  return k.lineOnTop(
    [x - Math.sin(a) * 3, y + Math.cos(a) * 3],
    [x + Math.sin(a) * (DIAL_R - 4), y - Math.cos(a) * (DIAL_R - 4)],
    DIAL_TOP + 0.2,
    P,
  );
}

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------
const PAGES = 14;
const BALLS = 16;
const pagePool = Array.from(
  { length: PAGES },
  () => `<use data-part="page" href="#ce-page" opacity="0"/>`,
).join("");
const ballPool = Array.from(
  { length: BALLS },
  () => `<use data-part="ball" href="#ce-ball" opacity="0"/>`,
).join("");
count(2);
const DOLLAR_AT = at([HOUSE.x + HOUSE.w / 2, HOUSE.y + HOUSE.d / 2, HOUSE_H + 24]);
const dollars = Array.from(
  { length: 4 },
  () =>
    `<text data-part="dollar" class="ce-dollar" x="${DOLLAR_AT[0].toFixed(1)}" y="${DOLLAR_AT[1].toFixed(1)}" text-anchor="middle" opacity="0" visibility="hidden" aria-hidden="true">$</text>`,
).join("");

/** Hotspots in story order: world points on key parts, with the step we do there. */
const SPOTS = [
  {
    p: [HOUSE.x + HOUSE.w / 2, HOUSE.y + HOUSE.d / 2, HOUSE_H + 9],
    title: "Your site",
    text: "We start with your website: its pages, your listings and the facts about you.",
  },
  {
    p: [CABINET.x + 10, CABINET.y + CABINET.d - 2, 30],
    title: "Indexed",
    text: "We make sure search engines and AI crawlers can read every page: sitemaps, crawl errors, speed.",
  },
  {
    p: [LENS_POST[0], LENS_POST[1], LENS_Z + 7],
    title: "Found",
    text: "We write exact answers to the questions your buyers ask, and fix weak pages.",
  },
  {
    p: [HORN.x + 34, HORN.y + 30, HORN_Z + 4],
    title: "Mentioned",
    text: "We fix your listings and profiles, so AI engines can name you, with a link.",
  },
  {
    p: [M.ENGINE_X[2], M.BELT_Y, BIN_Z1 + 10],
    title: "AI engines",
    text: "ChatGPT, Gemini, Claude, Perplexity and Google read those pages. Every week we check which ones name you.",
  },
  {
    p: [M.DOOR_X + M.SLOT * 3, M.RETURN_Y, M.BALL_Z + 10],
    title: "Buyers come back",
    text: "Buyers follow the link back to your site. We report citations and leads, not promises.",
  },
  {
    p: [ESCAPE[0], ESCAPE[1], GEAR_Z + 10],
    title: "One checked change a day",
    text: "Agents draft it. A person checks it before it ships.",
  },
  {
    p: [BELL[0], BELL[1], BELL_Z + 28],
    title: "Monday report",
    text: "Which engines named you, for which questions, and what we changed.",
  },
];
const spotsHtml = SPOTS.map((spot, i) => {
  const [sx, sy] = at(spot.p);
  return `<button type="button" class="ce-spot" data-spot="${i}" style="left:${((sx / WIDTH) * 100).toFixed(2)}%;top:${((sy / HEIGHT) * 100).toFixed(2)}%" aria-label="${spot.title}: ${spot.text}" aria-expanded="false"><span aria-hidden="true"></span></button>`;
}).join("");
const tipHtml = `<div class="ce-tip" role="tooltip" hidden><strong></strong><span></span></div>`;

if (process.argv.includes("--sizes")) {
  const named = {
    bench,
    gantry,
    plinth,
    frameBack,
    cabinet,
    lensPost,
    horn,
    house,
    upperBelt,
    receivers,
    spouts,
    lowerBelt,
    dropTubes,
    drive,
    bell,
    dial,
  };
  for (const [n, f] of Object.entries(named)) console.log(n, (f().length / 1024).toFixed(1));
  console.log(
    "page",
    (page().length / 1024).toFixed(1),
    "ball",
    (ball().length / 1024).toFixed(1),
    "train",
    (trainAt(0).length / 1024).toFixed(1),
  );
}
const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A brass machine on a bench that shows how citata works, as a loop. On the left is a small storefront: your site. It prints pages onto an upper belt. The pages pass through a frame with the citata name plate, where three stations act on each page: a card-index cabinet stamps it (Indexed), a lens swings over it (Found), and a horn speaks (Mentioned). On the right, five receivers, one for each AI engine (ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews), take the pages in. Each receiver then sends a buyer, a small ball, down onto a lower belt that runs back to your site. The buyers wait in a line at the door and go in one by one. A dollar sign rises each time, and a counter dial moves. A gear train drives the belts, and a bell rings for every seventh buyer: the Monday report.",
  body: [
    bench(),
    gantry(),
    plinth(),
    frameBack(),
    cabinet(),
    lensPost(),
    horn(),
    house(),
    upperBelt(),
    receivers(),
    `<defs><g id="ce-page">${page()}</g><g id="ce-ball">${ball()}</g></defs>`,
    pagePool,
    `<g data-part="stamp">${stamp()}</g>`,
    `<g data-part="lens">${lensAt(REST)}</g>`,
    hornWaves(),
    spouts(),
    lowerBelt(),
    `<g data-part="gate">${gate()}</g>`,
    ballPool,
    dropTubes(),
    drive(),
    bell(),
    `<g data-part="bell">${bellDome()}</g>`,
    `<g data-part="hammer">${hammerAt(0)}</g>`,
    dial(),
    `<path data-part="needle" class="iso-line" data-tone="hi" data-free="start" d="${needleAt(0)}" style="stroke-width:1.1"/>`,
    dollars,
    M.ENGINE_X.map((_, i) => hitOf(i)).join(""),
  ],
});
count(9);

const CSS = `
.iso.ce[data-theme="light"]{--anatomy-page:#f5efe3;--anatomy-card:#f5efe3;--anatomy-text:#5c5145;--anatomy-strong:#1c1712;--anatomy-muted:#5c5145;
--anatomy-paper:#fbf7ee;--anatomy-face:#fffdf8;--anatomy-top:#fbf6ec;
--anatomy-shade-0:#d2c4a8;--anatomy-shade-1:#ddd1b9;--anatomy-shade-2:#e8dfcc;--anatomy-shade-3:#f1eadb;
--anatomy-lit-top:#e8743f;--anatomy-lit-shade:#c1410b;
--anatomy-hi:#1c1712;--anatomy-mid:#7a6b58;--anatomy-lo:#ad9c7e;--anatomy-faint:#d3c5aa;--anatomy-lit:#8f2f07;
--anatomy-halo:#7a6a50;--anatomy-halo-opacity:.26;--anatomy-dot:#3a2f25;
--anatomy-mono:"Paper Mono",ui-monospace,monospace;--anatomy-weight:.6px}
.ce .iso-figure{margin:0}
.ce .iso-plate{background:transparent;box-shadow:none;border-radius:0;padding:34px 0 40px;--anatomy-paper:#fbf7ee}
.ce .iso-plate-corners{inset:0}
.ce .iso-plate-corner{font-size:11px}
.ce .iso-plate-corner[data-corner="fig"],.ce .iso-plate-corner[data-corner="title"]{color:#c1410b}
.ce .iso-legend{color:var(--anatomy-text);font-size:14px}
.ce .ce-logo{fill:#1c1712}
.ce .ce-logo-plate{fill:#fffdf8;stroke:var(--anatomy-mid);stroke-width:.5}
.ce .ce-rivet{fill:var(--anatomy-mid);stroke:none}
.ce .ce-hit{fill:transparent;stroke:none;cursor:pointer;pointer-events:all}
.ce .ce-hit:hover{fill:#c1410b;fill-opacity:.06}
.ce .iso-stage{position:relative;width:100%;aspect-ratio:${WIDTH}/${HEIGHT};outline:none;touch-action:manipulation}
.ce .iso-stage>svg{position:absolute;inset:0;width:100%;height:100%}
.ce .iso-stage:focus-visible{box-shadow:0 0 0 2px #c1410b;border-radius:4px}
.ce .ce-small{display:block;margin-top:2px;font-size:12px;color:var(--anatomy-muted)}
.ce .ce-plate{fill:var(--anatomy-top);stroke:var(--anatomy-mid);stroke-width:.25}
.ce .ce-plate-text{font-family:var(--anatomy-mono);font-size:2.3px;letter-spacing:.12em;fill:var(--anatomy-hi)}
.ce .ce-nameplate{fill:#fbf7ee;stroke:#c1410b;stroke-width:.5}
.ce .ce-sign{font-family:var(--anatomy-mono);font-size:3.8px;letter-spacing:.12em;fill:var(--anatomy-hi)}
.ce .ce-dollar{font-family:"Cal Sans",ui-sans-serif,system-ui,sans-serif;font-weight:600;font-size:22px;fill:#2f6b5c;pointer-events:none}
.ce .ce-spot{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;z-index:2}
.ce .ce-spot span{position:absolute;inset:7px;border-radius:50%;background:#fbf7ee;border:1.5px solid #c1410b}
.ce .ce-spot span::after{content:"";position:absolute;inset:3.5px;border-radius:50%;background:#c1410b}
.ce .ce-spot::before{content:"";position:absolute;inset:2px;border-radius:50%;border:1.5px solid #c1410b;opacity:.55;animation:ce-pulse 2s ease-in-out infinite}
.ce .ce-spot:focus-visible{outline:2px solid #c1410b;outline-offset:2px}
.ce .ce-spot[aria-expanded="true"]::before{opacity:1;animation:none}
@keyframes ce-pulse{0%,100%{transform:scale(.7);opacity:.7}50%{transform:scale(1.15);opacity:.15}}
.ce .ce-tip{position:absolute;z-index:3;box-sizing:border-box;max-width:260px;padding:10px 12px;background:#fbf7ee;border:1px solid #d9cdb6;border-radius:4px;box-shadow:0 8px 24px rgb(28 23 18 / .12);font:14px/1.45 "Cal Sans",ui-sans-serif,system-ui,sans-serif;color:#1c1712}
.ce .ce-tip strong{display:block;font-weight:600;color:#c1410b;margin-bottom:2px}
.ce .ce-tip[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.ce .ce-spot::before{animation:none}}
@media (max-width:560px){.ce .iso-plate{padding:28px 0 52px}.ce .iso-plate-corner{font-size:10px}.ce .iso-plate-corner[data-corner="hint"]{display:none}.ce .iso-plate-corner[data-corner="readout"]{left:0;right:auto;white-space:normal;line-height:1.3}.ce .ce-spot{width:24px;height:24px;margin:-12px 0 0 -12px}.ce .ce-spot span{inset:7px}.ce .ce-spot span::after{inset:2.5px}.ce .ce-spot::before{inset:4px}}
`;

const caption =
  "We start with your site. Inside the citata frame, each page passes 3 stations: Indexed, Found, Mentioned. AI engines then name your site, and buyers come back to it. One checked change a day turns the wheels. Every 7th buyer, the bell rings: your Monday report. Tap a dot to read each step.";

const plate = k
  .plateHtml({
    fig: "Fig 1",
    title: "The citation engine",
    hint: "Hover an engine to send it a page",
    readout: "Starting the engine",
    keys: [
      { mark: "flat", label: "A page of your site" },
      { mark: "lit", label: "A buyer sent by an AI engine" },
    ],
    caption,
    body: `<div class="iso-stage" tabindex="0" role="group" aria-label="Citation engine. Press 1 to 5 to send a page to an engine." data-figure="/mechanism/figure.html"></div>`,
  })
  .replace(
    "</figcaption>",
    `<span class="ce-small">An illustration of the process, not client data. Logos belong to their owners.</span></figcaption>`,
  );

const markup = `<div class="iso ce" data-theme="light"><style>${k.ISO_CSS}${CSS}</style>${plate}</div>`;

/**
 * Simplify every polyline path (M/L/Z only) with Ramer-Douglas-Peucker at
 * 0.12 viewBox units: the kit samples curves densely; most points are on a line.
 */
function simplify(text, tolerance = 0.12) {
  const rdp = (pts) => {
    if (pts.length < 3) return pts;
    const [ax, ay] = pts[0];
    const [bx, by] = pts[pts.length - 1];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    let far = 0;
    let at = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / len;
      if (d > far) {
        far = d;
        at = i;
      }
    }
    if (far <= tolerance) return [pts[0], pts[pts.length - 1]];
    return [...rdp(pts.slice(0, at + 1)).slice(0, -1), ...rdp(pts.slice(at))];
  };
  return text.replace(/ d="([MLZ0-9.\- ]+)"/g, (all, d) => {
    let out = "";
    for (const sub of d.match(/M[^M]*/g) ?? []) {
      const closed = sub.includes("Z");
      const nums = sub.replace(/[MLZ]/g, " ").trim().split(/\s+/).map(Number);
      const pts = [];
      for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
      out +=
        "M" +
        rdp(pts)
          .map(([x, y]) => `${x} ${y}`)
          .join("L") +
        (closed ? "Z" : "");
    }
    return ` d="${out}"`;
  });
}

const figureMarkup = simplify(svg) + spotsHtml + tipHtml;

// ---------------------------------------------------------------------------
// Live script
// ---------------------------------------------------------------------------
const LIVE = `
const P = ${JSON.stringify(P)};
const ENGINES = ${JSON.stringify(LOGOS.map((l) => l.label))};
const SPOTS = ${JSON.stringify(SPOTS.map(({ title, text }) => ({ title, text })))};
const REST = ${REST}, LENS_POST = ${JSON.stringify(LENS_POST)}, LENS_ARM = ${LENS_ARM}, LENS_R = ${LENS_R}, LENS_Z = ${LENS_Z};
const FLY = ${JSON.stringify(FLY)}, FLY_R = ${FLY_R}, FLY_TEETH = ${FLY_TEETH}, TOOTH = ${TOOTH}, GEAR_H = ${GEAR_H};
const IDLER = ${JSON.stringify(IDLER)}, IDLER_R = ${IDLER_R}, IDLER_TEETH = ${IDLER_TEETH}, ESCAPE = ${JSON.stringify(ESCAPE)}, ESCAPE_R = ${ESCAPE_R}, TEETH = ${TEETH}, GEAR_Z = ${GEAR_Z};
const ANCHOR = ${JSON.stringify(ANCHOR)}, BELL = ${JSON.stringify(BELL)}, BELL_Z = ${BELL_Z};
const DIAL = ${JSON.stringify(DIAL)}, DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP}, STAMP_DOWN = ${STAMP_DOWN};
const at = (p) => iso(p, P);
${lensAt.toString().replace(/M\./g, "")}
${gearSvg.toString()}
${trainAt.toString()}
${anchorAt.toString()}
${cleatsAt.toString().replace(/M\./g, "")}
${backCleatsAt.toString().replace(/M\./g, "")}
${needleAt.toString()}
function hammerAt(swing) {
  const [x, y] = BELL;
  const pivot = [x - 19, y + 2, BELL_Z - 4];
  const head = [x - 15.5 + swing * 2.6, y + 2, BELL_Z + 4];
  return lineSvg(segment(pivot, head, P), { tone: "hi" }) +
    solidSvg(cylinder(head[0], head[1], 2.8, head[2] - 2.6, 5.2, P, 20, 0.3), { tone: "mid" }) +
    dotsSvg([at(pivot)], { size: 0.9, tone: "mid" });
}
const k = { solidSvg, extrude, cylinder, lineSvg, ring, lineOnTop, dotsSvg };
const ease = (dt, s) => 1 - Math.exp(-dt / s);

function init(root) {
  const stage = root.querySelector(".iso-stage");
  const svg = stage.querySelector("svg");
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const pagePool = [...svg.querySelectorAll('[data-part="page"]')];
  const ballPool = [...svg.querySelectorAll('[data-part="ball"]')];
  const waves = [...svg.querySelectorAll('[data-part="wave"]')];
  const dollars = [...svg.querySelectorAll('[data-part="dollar"]')].map((el) => ({ el, born: -9 }));
  const hits = [...svg.querySelectorAll(".ce-hit")];
  const parts = { stamp: q("stamp"), lens: q("lens"), train: q("train"), anchor: q("anchor"), hammer: q("hammer"), bell: q("bell"), needle: q("needle"), cleats: q("cleats"), backcleats: q("backcleats"), gate: q("gate") };
  const readout = root.querySelector("[data-readout]");
  const still = matchMedia("(prefers-reduced-motion: reduce)");

  // State. Every position comes from the model: pageAt, buyerAt, cups, slots.
  let pages = [];   // { el, cup, engine }
  let balls = [];   // { el, engine, cup, land, queued, qx, enter }
  let queue = [];
  const upper = new Set();
  const lower = new Set();
  let clock = 0, last = 0, frame = 0, visible = false;
  let nextPage = 0.1, tour = 0, wish = -1, lastWish = -9, nextRelease = 0, delivered = 0, ring = -99;
  let needle = 0, swing = REST, lensDrawn = 99, gate = 0, trainDrawn = -1, hornPass = -99, lastEngine = -1;
  let lastText = "";
  const say = (text) => { if (text !== lastText) { readout.textContent = text; lastText = text; } };

  function sendPage(engine) {
    const el = pagePool.find((e) => !pages.some((p) => p.el === e));
    if (!el) return;
    const cup = pageCup(clock, upper);
    upper.add(cup);
    pages.push({ el, cup, engine, sent: false });
  }

  function sendBuyer(engine, after) {
    const el = ballPool.find((e) => !balls.some((b) => b.el === e));
    if (!el) return;
    const { cup, land } = buyerCup(ENGINE_X[engine], after + FALL, lower);
    lower.add(cup);
    balls.push({ el, engine, cup, land, queued: false, qx: RETURN_FROM, enter: -1 });
  }

  function update(dt) {
    clock += dt;
    if (clock >= nextPage) {
      const engine = wish >= 0 ? wish : tour++ % ENGINES.length;
      wish = -1;
      sendPage(engine);
      nextPage = clock + PAGE_EVERY;
    }
    for (const p of pages) {
      const done = pageDone(p.cup, p.engine);
      const pass = cupTime(p.cup, STATIONS[2].x);
      if (pass <= clock && pass > hornPass && clock >= cupTime(p.cup, PAGE_X)) hornPass = pass;
      if (!p.sent && clock >= done) {
        p.sent = true;
        upper.delete(p.cup);
        lastEngine = p.engine;
        sendBuyer(p.engine, done + SEND_AFTER);
      }
    }
    pages = pages.filter((p) => !p.sent);
    for (const b of balls) {
      if (b.queued || b.enter >= 0) continue;
      const s = buyerAt(b.engine, b.cup, b.land, clock);
      if (s.phase === "queue") { b.queued = true; lower.delete(b.cup); queue.push(b); }
    }
    queue.forEach((b, i) => {
      const target = DOOR_X + Math.min(i, SLOTS - 1) * SLOT;
      b.qx += (target - b.qx) * ease(dt, 0.18);
    });
    const front = queue[0];
    if (front && Math.abs(front.qx - DOOR_X) < 0.6 && clock >= nextRelease) {
      queue.shift();
      front.enter = clock;
      nextRelease = clock + (queue.length >= 3 ? 0.75 : queue.length >= 2 ? 1.05 : 1.5);
    }
    for (const b of balls) {
      if (b.enter >= 0 && clock - b.enter >= 0.42) {
        b.done = true;
        delivered += 1;
        if (delivered % TURNS_PER_REPORT === 0) ring = clock;
        const slot = dollars.reduce((o, d) => (d.born < o.born ? d : o), dollars[0]);
        slot.born = clock;
      }
    }
    balls = balls.filter((b) => !b.done);
    gate += ((balls.some((b) => b.enter >= 0) ? 1 : 0) - gate) * ease(dt, 0.08);
    needle += (delivered / 40 - needle) * ease(dt, 0.25);
    const near = pages.some((p) => {
      const s = pageAt(p.cup, p.engine, clock);
      return s.phase === "belt" && s.p[0] > STATIONS[1].x - 22 && s.p[0] < STATIONS[1].x + 10;
    });
    swing += ((near ? 0 : REST) - swing) * ease(dt, 0.14);
  }

  function draw() {
    let stampLoad = 0;
    for (const p of pages) {
      const s = pageAt(p.cup, p.engine, clock);
      if (s.phase === "wait" || s.phase === "gone") { p.el.setAttribute("opacity", "0"); continue; }
      if (s.phase === "belt") stampLoad = Math.max(stampLoad, bump(s.p[0], STATIONS[0].x, 9));
      p.el.setAttribute("opacity", s.phase === "lift" ? (1 - s.at * s.at).toFixed(3) : "1");
      p.el.setAttribute("transform", translateAlong(P, s.p));
    }
    for (const el of pagePool) if (!pages.some((p) => p.el === el)) el.setAttribute("opacity", "0");
    for (const b of balls) {
      let pos, alpha = 1;
      if (b.enter >= 0) {
        const u = Math.min(1, (clock - b.enter) / 0.42);
        pos = [DOOR_X - 9 * u, RETURN_Y, BALL_Z];
        alpha = 1 - u * u;
      } else if (b.queued) {
        pos = [b.qx, RETURN_Y, BALL_Z];
      } else {
        const s = buyerAt(b.engine, b.cup, b.land, clock);
        if (s.phase === "wait") { b.el.setAttribute("opacity", "0"); continue; }
        pos = s.p;
      }
      b.el.setAttribute("opacity", alpha.toFixed(3));
      b.el.setAttribute("transform", translateAlong(P, pos));
    }
    for (const el of ballPool) if (!balls.some((b) => b.el === el)) el.setAttribute("opacity", "0");
    parts.cleats.setAttribute("d", cleatsAt(clock));
    parts.backcleats.setAttribute("d", backCleatsAt(clock));
    parts.stamp.setAttribute("transform", translateAlong(P, [0, 0, -STAMP_DOWN * stampLoad]));
    if (Math.abs(swing - lensDrawn) > 0.004) { parts.lens.innerHTML = lensAt(swing); lensDrawn = swing; }
    const since = clock - hornPass;
    waves.forEach((w, i) => {
      const u = since - i * 0.12;
      w.setAttribute("opacity", (u < 0 || u > 0.7 ? 0 : (1 - u / 0.7) * 0.95).toFixed(3));
    });
    const e = clock * 0.55;
    if (Math.abs(e - trainDrawn) > 0.02) {
      parts.train.innerHTML = trainAt(e);
      parts.anchor.innerHTML = anchorAt(0.13 * Math.sin(e * TEETH));
      trainDrawn = e;
    }
    parts.gate.setAttribute("transform", translateAlong(P, [0, 0, 10 * gate]));
    const rang = clock - ring;
    const strike = rang >= 0 && rang < 1.4 ? Math.exp(-rang * 3) * Math.abs(Math.sin(rang * 14)) : 0;
    parts.hammer.innerHTML = hammerAt(Math.min(1, strike * 1.4));
    parts.bell.setAttribute("transform", translateAlong(P, [strike * 0.6 * Math.sin(rang * 40), 0, 0]));
    parts.needle.setAttribute("d", needleAt(needle));
    for (const d of dollars) {
      const u = (clock - d.born) / 0.85;
      if (u < 0 || u > 1) { d.el.setAttribute("opacity", "0"); d.el.setAttribute("visibility", "hidden"); continue; }
      d.el.setAttribute("visibility", "visible");
      d.el.setAttribute("opacity", (u < 0.15 ? u / 0.15 : 1 - (u - 0.15) / 0.85).toFixed(3));
      d.el.setAttribute("transform", "translate(0 " + (-16 * u).toFixed(2) + ")");
    }
    const onWay = balls.filter((b) => !b.queued && b.enter < 0 && clock >= b.land - FALL).length;
    if (rang >= 0 && rang < 2) say("7th buyer in · bell: Monday report");
    else if (lastEngine >= 0) say(pages.length + " pages in the workshop · " + ENGINES[lastEngine] + " sent a buyer · " + (onWay + queue.length) + " on the way");
  }

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
    last = now;
    update(dt);
    draw();
    frame = visible ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible && !still.matches) { last = 0; frame = requestAnimationFrame(tick); } };
  const ask = (engine) => {
    if (still.matches || clock - lastWish < 0.3) return;
    lastWish = clock;
    wish = engine;
    nextPage = Math.min(nextPage, clock);
    run();
  };
  for (const hit of hits) {
    const engine = Number(hit.dataset.engine);
    hit.addEventListener("pointerenter", () => ask(engine));
    hit.addEventListener("pointerdown", () => ask(engine));
  }
  stage.addEventListener("keydown", (event) => {
    const n = Number(event.key);
    if (event.target === stage && n >= 1 && n <= ENGINES.length) { event.preventDefault(); ask(n - 1); }
  });

  // Hotspots: a tooltip card that stays inside the figure.
  const tip = stage.querySelector(".ce-tip");
  const spots = [...stage.querySelectorAll(".ce-spot")];
  let pinned = null;
  const hide = () => {
    tip.hidden = true;
    for (const s of spots) s.setAttribute("aria-expanded", "false");
    pinned = null;
  };
  const show = (spot, pin) => {
    const data = SPOTS[Number(spot.dataset.spot)];
    tip.querySelector("strong").textContent = data.title;
    tip.querySelector("span").textContent = data.text;
    tip.hidden = false;
    for (const s of spots) s.setAttribute("aria-expanded", String(s === spot));
    const box = stage.getBoundingClientRect();
    const dot = spot.getBoundingClientRect();
    const w = Math.min(260, box.width - 16);
    tip.style.width = w + "px";
    const cx = dot.left + dot.width / 2 - box.left;
    const cy = dot.top + dot.height / 2 - box.top;
    tip.style.left = Math.max(8, Math.min(box.width - w - 8, cx - w / 2)) + "px";
    const h = tip.offsetHeight;
    tip.style.top = (cy + 16 + h > box.height ? Math.max(4, cy - 16 - h) : cy + 16) + "px";
    if (pin) pinned = spot;
  };
  for (const spot of spots) {
    spot.addEventListener("pointerenter", () => { if (!pinned) show(spot, false); });
    spot.addEventListener("pointerleave", () => { if (!pinned) hide(); });
    spot.addEventListener("blur", () => { if (pinned === spot) hide(); });
    spot.addEventListener("focus", () => show(spot, true));
    spot.addEventListener("click", (event) => { event.stopPropagation(); show(spot, true); });
  }
  root.addEventListener("keydown", (event) => { if (event.key === "Escape") hide(); });
  document.addEventListener("pointerdown", (event) => {
    if (!tip.hidden && !event.target.closest(".ce-spot") && !event.target.closest(".ce-tip")) hide();
  });

  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run();
  }, { rootMargin: "80px 0px" }).observe(stage);
  // Warm start in small slices so no task runs long, then draw.
  let warm = 0;
  const slice = () => {
    const end = performance.now() + 8;
    while (warm < 540 && performance.now() < end) { update(1 / 30); warm++; }
    if (warm < 540) { setTimeout(slice, 0); return; }
    if (still.matches) swing = 0;
    draw();
    run();
  };
  slice();
}

// Load the figure only when its section comes near the viewport.
for (const root of document.querySelectorAll(".ce")) {
  const stage = root.querySelector(".iso-stage");
  const src = stage.dataset.figure;
  const load = async () => {
    const html = window.__ceFigure || (await (await fetch(src)).text());
    stage.innerHTML = html;
    init(root);
  };
  const watch = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    watch.disconnect();
    const go = () => load().catch(() => {});
    if ("requestIdleCallback" in window) requestIdleCallback(go, { timeout: 1200 }); else setTimeout(go, 0);
  }, { rootMargin: "600px 0px" });
  watch.observe(stage);
}
`;

const script =
  strip(join(ROOT, "vendor/anatomy/iso-kit.mjs")) +
  "\n" +
  strip(join(HERE, "model.mjs")) +
  "\n" +
  LIVE;
const wrapped = `/* citata.ai citation engine. Built by scripts/mechanism/build.mjs; do not edit.\n   Kit: anatomy (MIT), vendor/anatomy. */\n(() => {\n${script}\n})();\n`;

writeFileSync(join(ROOT, "src/components/mechanism/figure.generated.html"), markup + "\n");
writeFileSync(join(ROOT, "public/mechanism/figure.html"), figureMarkup + "\n");
writeFileSync(join(ROOT, "public/mechanism/live.js"), wrapped);
if (process.argv.includes("--page")) {
  const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Citation engine</title><style>@font-face{font-family:"Paper Mono";src:url(../../public/fonts/PaperMono-Regular.woff2)}@font-face{font-family:"Cal Sans";src:url(../../public/fonts/CalSansVF.woff2)}body{margin:0;background:#f5efe3;font:15px/1.5 system-ui}main{width:min(1376px,100% - 32px);margin:40px auto}</style></head><body><main>${markup}</main><script>window.__ceFigure = ${JSON.stringify(figureMarkup).replace(/<\//g, "<\\/")};</script><script>${wrapped.replace(/<\/(script)/gi, "<\\/$1")}</script></body></html>`;
  writeFileSync(join(HERE, "preview.html"), page);
}
console.log(
  `parts ${parts} · figure ${(figureMarkup.length / 1024).toFixed(0)} KB (raw ${(svg.length / 1024).toFixed(0)}) · shell ${(markup.length / 1024).toFixed(0)} KB · live.js ${(wrapped.length / 1024).toFixed(0)} KB`,
);
{
  const pts = SPOTS.map((spot) => at(spot.p));
  let min = Infinity;
  for (let i = 0; i < pts.length; i++)
    for (let j = i + 1; j < pts.length; j++)
      min = Math.min(min, Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]));
  pts.forEach((a, i) =>
    pts.forEach((b, j) => {
      if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 80)
        console.log("close:", SPOTS[i].title, "/", SPOTS[j].title);
    }),
  );
  console.log(
    `hotspots: closest pair ${min.toFixed(1)} units = ${((min * 358) / WIDTH).toFixed(1)} px at 390 wide`,
  );
}
