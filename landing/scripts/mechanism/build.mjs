/**
 * Builds the citation engine figure (anatomy skill, light theme on parchment).
 *
 *   node scripts/mechanism/build.mjs          writes the two generated files
 *   node scripts/mechanism/build.mjs --page   also writes a standalone test page
 *
 * Outputs (committed, so the Astro build does not run this):
 *   src/components/mechanism/figure.generated.html   static card + SVG
 *   public/mechanism/live.js                          kit runtime + model + motion
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../../vendor/anatomy/iso-kit.mjs";
import * as G from "../../vendor/anatomy/lathe.mjs";
import { LOGOS } from "./logos.mjs";
import * as M from "./model.mjs";

const { depthOf } = k;

const WORDMARK = (() => {
  const svg = readFileSync(new URL("../../public/wordmark.svg", import.meta.url), "utf8");
  const [x, y, w, h] = svg
    .match(/viewBox="([^"]+)"/)[1]
    .split(/\s+/)
    .map(Number);
  const paths = svg.match(/<path[^>]*\/>/g).join("");
  return { x, y, w, h, paths };
})();

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const strip = (path) => readFileSync(path, "utf8").replace(/^export /gm, "");

const WIDTH = 760;
const HEIGHT = 430;
const AZIMUTH = 58;

// ---------------------------------------------------------------------------
// World plan
// ---------------------------------------------------------------------------
const BENCH = { x: -236, y: -72, w: 466, d: 140, r: 8 };
const BENCH_H = 12;
const FOOT_H = 6;

const BIN = 22; // square hopper bin
const BIN_Z0 = 74;
const BIN_Z1 = 94;
const GANTRY_Y = -36;
const BEAM_Z = 96;

// The citata section: a plinth and a frame around the three stations.
const SB = 5; // plinth height
const PLINTH = { x: -46, y: -72, w: 182, d: 82, r: 2 };
const FRAME_X = [-42, 130];
const FRAME_Y = [-67, 5];
const FRAME_TOP = 112;

const CABINET = { x: -24, y: -64, w: 44, d: 30, r: 1.5 };
const CABINET_H = 58;
const STAMP = [M.STATIONS[0].x, M.RAIL_Y];
const STAMP_REST = 58; // plunger foot height at rest
const STAMP_DOWN = 4; // travel onto the capsule

const LENS_POST = [M.STATIONS[1].x + 22, -40];
const LENS_Z = 64;
const LENS_ARM = Math.hypot(22, -40 - M.RAIL_Y);
const LENS_R = 7.5;
const REST = 1.55; // lens swing at rest: parked toward the back

const HORN = { x: M.STATIONS[2].x, y: -50 };
const HORN_Z = 66;

const HOUSE = { x: 150, y: -70, w: 56, d: 50, r: 1 };
const HOUSE_H = 60;

const DIAL = [216, 0];
const DIAL_Z = 22;
const DIAL_R = 12;
const DIAL_TOP = DIAL_Z + 6;

// Gear train: great wheel -> pinion -> escape wheel. Centre distance = rA + rB + TOOTH.
const TOOTH = 2.6;
const GEAR_Z = 20;
const GEAR_H = 4;
const FLY = [-160, 32];
const FLY_R = 30;
const FLY_TEETH = 60;
const IDLER_R = 8;
const IDLER_TEETH = 16;
const IDLER = [
  FLY[0] + (FLY_R + IDLER_R + TOOTH) * Math.cos(0.24),
  FLY[1] + (FLY_R + IDLER_R + TOOTH) * Math.sin(0.24),
];
const ESCAPE_R = 13;
const TEETH = 15;
const ESCAPE = [
  IDLER[0] + (IDLER_R + ESCAPE_R + TOOTH) * Math.cos(-0.33),
  IDLER[1] + (IDLER_R + ESCAPE_R + TOOTH) * Math.sin(-0.33),
];
const ANCHOR = [ESCAPE[0], ESCAPE[1] + ESCAPE_R + 13];

const BELL = [-36, 40];
const BELL_Z = 30;

const P = k.fitProjection(
  [
    ...k.boxCorners(BENCH, -BENCH_H - FOOT_H, 0),
    [M.HOPPER_X[0] - BIN / 2, M.RAIL_Y, BEAM_Z + 6],
    [HOUSE.x + HOUSE.w, HOUSE.y, HOUSE_H + 14],
    [FRAME_X[1], FRAME_Y[0], FRAME_TOP + 2],
  ],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: AZIMUTH },
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
  // Ruler strip along the front edge.
  const strip = { x: -150, y: BENCH.y + BENCH.d - 15, w: 300, d: 7, r: 1 };
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
// Back: gantry, card-index cabinet, lens post, horn
// ---------------------------------------------------------------------------
function gantry() {
  const out = [];
  const x0 = M.HOPPER_X[0] - 24;
  const x1 = M.HOPPER_X[M.HOPPER_X.length - 1] + 24;
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
    S(k.slabOf(beam, BEAM_Z, 6, P, 3, 0.5), {
      tone: "mid",
      inner: L(k.sideSeam(beam, BEAM_Z + 3, P, 3), { tone: "faint" }),
    }),
    count(),
  );
  out.push(
    D(
      [x0, x1].map((x) => at([x, GANTRY_Y, BEAM_Z + 6])),
      { size: 0.5 },
    ),
  );
  return out.join("");
}

function cabinet() {
  const out = [];
  out.push(S(k.slabOf(k.insetPlan(CABINET, -1.5), SB, 4, P, 3, 0.4), { tone: "lo" }));
  out.push(S(k.slabOf(CABINET, SB + 4, CABINET_H - SB - 4, P, 3, 0.6), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(CABINET, -1.2), CABINET_H, 2.5, P, 3, 0.5), { tone: "mid" }));
  count(3);
  // Six drawers on the front (+y) face: frame, label holder, pull.
  const face = CABINET.y + CABINET.d;
  const drawers = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      const x = CABINET.x + 3 + col * 19.5;
      const z = CABINET_H - 5 - row * 16;
      const m = k.sideMatrix([x, face], z, P, "left");
      drawers.push(
        `<g transform="${m}"><rect x="0" y="0" width="18" height="14" rx="0.6" class="iso-line" data-tone="mid"/><rect x="5.5" y="2.6" width="7" height="3.6" class="iso-line" data-tone="lo"/><circle cx="9" cy="9.6" r="1.2" class="iso-line" data-tone="mid"/></g>`,
      );
      count();
    }
  }
  out.push(drawers.join(""));
  // Stamp arm over the rail.
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
  const out = [];
  const [x, y] = STAMP;
  out.push(
    S(k.cylinder(x, y, 1.6, STAMP_REST + 2, CABINET_H - 3 - STAMP_REST - 2 + 4, P, 16), {
      tone: "hi",
      crease: "none",
    }),
  );
  out.push(S(k.cylinder(x, y, 4.2, STAMP_REST, 2.2, P, 24, 0.4), { tone: "hi" }));
  count(2);
  return out.join("");
}

function lensPost() {
  const out = [];
  const [x, y] = LENS_POST;
  out.push(S(k.cylinder(x, y, 7, SB, 3, P, 28, 0.4), { tone: "lo" }));
  out.push(
    S(k.cylinder(x, y, 2.6, SB + 3, LENS_Z - SB - 3, P, 20), { tone: "mid", crease: "none" }),
  );
  out.push(L([20, 36, 50].map((z) => k.sideArc(x, y, 2.6, z, P, 12)).join(""), { tone: "faint" }));
  out.push(S(k.cylinder(x, y, 4.2, LENS_Z - 6, 5, P, 24, 0.4), { tone: "mid" }));
  out.push(L(k.knurl(x, y, 4.2, LENS_Z - 6, LENS_Z - 1, 20, P), { tone: "lo" }));
  count(3);
  return out.join("");
}

/** The lens on its arm at swing angle `a` (0 = over the rail). Also built live. */
function lensAt(a) {
  const [px, py] = LENS_POST;
  const base = Math.atan2(M.RAIL_Y - py, M.STATIONS[1].x - px);
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
  // Sound box: a drum on the y axis behind the horn.
  const box = G.frameAlong([HORN.x, HORN.y - 4, HORN_Z - 4], [0, 1, 0]);
  out.push(S(G.disc(0, 6, 8, box, P), { tone: "mid" }), count());
  out.push(L(G.circleOf(box, 6, 5.4, P), { tone: "lo" }));
  // The horn: an analytic flare from the box toward the viewer.
  const F = G.frameAlong([HORN.x, HORN.y + 2, HORN_Z - 4], [0, 0.94, 0.34]);
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
      { tone: "hi" },
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

/** Sound rings in front of the horn mouth, for the live script to fade. */
function hornWaves() {
  const F = G.frameAlong([HORN.x, HORN.y + 2, HORN_Z - 4], [0, 0.94, 0.34]);
  return [0, 1, 2]
    .map((i) => {
      const s = 38 + i * 5;
      return `<path data-part="wave" class="iso-line" data-tone="mid" data-free="both" d="${G.arcOf(F, s, 15 + i * 3, P, { least: -1, from: Math.PI * 0.15, to: Math.PI * 0.85 })}" opacity="0"/>`;
    })
    .join("");
}

// ---------------------------------------------------------------------------
// Conveyor and hoppers
// ---------------------------------------------------------------------------
function rail() {
  const out = [];
  const y0 = M.RAIL_Y - 7;
  const legs = [-222, -160, -100, -56, -20, 30, 80, 128];
  for (const x of legs) {
    const z0 = x > PLINTH.x && x < PLINTH.x + PLINTH.w ? SB : 0;
    out.push(S(k.cylinder(x, M.RAIL_Y, 5, z0, 2, P, 20, 0.3), { tone: "lo" }));
    const post = { x: x - 1.6, y: M.RAIL_Y - 1.6, w: 3.2, d: 3.2, r: 0.6 };
    out.push(S(k.slabOf(post, z0 + 2, M.RAIL_TOP - 9 - z0, P, 2), { tone: "mid", crease: "none" }));
    count(2);
  }
  const body = { x: M.RAIL_FROM, y: y0, w: M.RAIL_TO - M.RAIL_FROM, d: 14, r: 2 };
  out.push(
    S(k.slabOf(body, M.RAIL_TOP - 7, 5, P, 3, 0.4), {
      tone: "mid",
      inner: L(k.sideSeam(body, M.RAIL_TOP - 4.5, P, 3), { tone: "faint" }),
    }),
    count(),
  );
  // Belt on top, between two lips.
  out.push(
    S(
      k.slabOf(
        { x: M.RAIL_FROM + 2, y: y0 + 2.5, w: body.w - 4, d: 9, r: 1 },
        M.RAIL_TOP - 2,
        2,
        P,
        2,
      ),
      { tone: "lo", crease: "none" },
    ),
    count(),
  );
  // Where the belt meets the back lip: the cleats end on this crease.
  out.push(
    L(k.lineOnTop([M.RAIL_FROM, M.RAIL_Y - 5], [M.RAIL_TO, M.RAIL_Y - 5], M.RAIL_TOP, P), {
      tone: "faint",
    }),
  );
  out.push(`<path data-part="cleats" class="iso-line" data-tone="mid" d="${cleatsAt(0)}"/>`);
  for (const y of [y0, y0 + 12]) {
    const lip = { x: M.RAIL_FROM, y, w: body.w, d: 2, r: 0.6 };
    out.push(S(k.slabOf(lip, M.RAIL_TOP - 2, 3.4, P, 2), { tone: "mid", crease: "none" }));
    count();
  }
  // End pulleys.
  for (const x of [M.RAIL_FROM + 1, M.RAIL_TO - 1]) {
    const F = G.frameAlong([x, y0 - 0.5, M.RAIL_TOP - 3], [0, 1, 0]);
    out.push(S(G.disc(0, 15, 4.2, F, P), { tone: "mid" }), count());
  }
  return out.join("");
}

/** Cleats (cups) across the belt; they move with it. Also built live. */
function cleatsAt(t) {
  let d = "";
  const shift = (((M.SPEED * t) % M.CUP) + M.CUP) % M.CUP;
  for (let x = M.RAIL_FROM + 8 + shift; x < M.RAIL_TO - 8; x += M.CUP) {
    d += k.lineOnTop([x, M.RAIL_Y - 5], [x, M.RAIL_Y + 5], M.RAIL_TOP, P);
  }
  return d;
}

/** The citata plinth under the stations, with a station plate under each one. */
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

/** The citata frame: back pair of posts, side beams, and a back beam with the name plate. */
function frameBack() {
  const out = [];
  for (const x of FRAME_X) {
    out.push(post(x, FRAME_Y[0]));
  }
  for (const x of FRAME_X) {
    const beam = { x: x - 3.5, y: FRAME_Y[0] - 3.5, w: 7, d: FRAME_Y[1] - FRAME_Y[0] + 7, r: 1 };
    out.push(S(k.slabOf(beam, FRAME_TOP - 8, 6, P, 3, 0.4), { tone: "mid" }), count());
  }
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
  // Name plate with the citata wordmark on the beam's front face.
  const cx = (FRAME_X[0] + FRAME_X[1]) / 2;
  const pw = 74;
  const m = k.sideMatrix([cx - pw / 2, beam.y + beam.d], FRAME_TOP - 4, P, "left");
  const scale = 56 / WORDMARK.w;
  out.push(
    `<g transform="${m}"><rect x="0" y="0" width="${pw}" height="15" rx="1" class="ce-nameplate"/><circle cx="2" cy="2" r="0.6" class="ce-rivet"/><circle cx="${pw - 2}" cy="2" r="0.6" class="ce-rivet"/><circle cx="2" cy="13" r="0.6" class="ce-rivet"/><circle cx="${pw - 2}" cy="13" r="0.6" class="ce-rivet"/><g transform="translate(${(pw - 56) / 2} ${7.5 - (WORDMARK.h * scale) / 2}) scale(${scale.toFixed(4)}) translate(${-WORDMARK.x} ${-WORDMARK.y})">${WORDMARK.paths}</g></g>`,
  );
  count();
  return out.join("");
}

function frameFront() {
  return FRAME_X.map((x) => post(x, FRAME_Y[1])).join("");
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

/** Glass drop tube at the belt end, down to the queue rail. Front glass only. */
function tube() {
  const [x, y] = [M.TUBE_X, M.RAIL_Y];
  const r = 5.4;
  const z0 = M.QUEUE_Z + 2;
  const z1 = M.RAIL_TOP + 2;
  const F = up(x, y, z0);
  return [
    L(G.arcOf(F, 0, r, P) + G.arcOf(F, z1 - z0, r, P), { tone: "mid" }),
    L(k.ring(x, y, r, z1, P, 32), { tone: "faint" }),
    S(G.ringBand(z1 - z0 - 2, z1 - z0, r, r + 1.4, F, P), { tone: "mid" }),
    S(G.ringBand(0, 2, r, r + 1.4, F, P), { tone: "mid" }),
    `<path class="iso-line" data-tone="lo" d="${G.silhouetteOf(
      [
        [0, r],
        [z1 - z0, r],
      ],
      F,
      P,
    )}"/>`,
  ].join("");
}

/** Queue rail from the tube foot to the house door, and the door gate. */
function queueRail() {
  const out = [];
  const x0 = M.TUBE_X - 8;
  const x1 = M.DOOR_X + 8;
  const body = { x: x0, y: M.RAIL_Y - 7, w: x1 - x0, d: 14, r: 1.5 };
  out.push(S(k.slabOf(body, 0, M.QUEUE_Z, P, 3, 0.4), { tone: "mid" }), count());
  for (const y of [M.RAIL_Y - 7, M.RAIL_Y + 5]) {
    out.push(
      S(k.slabOf({ x: x0, y, w: x1 - x0, d: 2, r: 0.6 }, M.QUEUE_Z, 2.4, P, 2), {
        tone: "mid",
        crease: "none",
      }),
    );
    count();
  }
  const ticks = k.topTicks(x0 + 6, x1 - 4, M.SLOT, 1, M.RAIL_Y + 5, M.QUEUE_Z + 2.4, [1.2, 1.6], P);
  out.push(L(ticks.major, { tone: "lo" }));
  return out.join("");
}

function gate() {
  const plan = { x: M.DOOR_X - 6, y: M.RAIL_Y - 7.5, w: 12, d: 1.6, r: 0.4 };
  return S(k.slabOf(plan, M.QUEUE_Z + 0.5, 9, P, 2, 0.3), { tone: "hi" });
}

function hoppers() {
  return M.HOPPER_X.map((x, i) => {
    const out = [];
    const y = M.RAIL_Y;
    const plan = { x: x - BIN / 2, y: y - BIN / 2, w: BIN, d: BIN, r: 1.2 };
    // Brackets to the gantry beam.
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
    // Funnel neck (turned) from the bin down to the mouth.
    const F = up(x, y, M.MOUTH_Z);
    out.push(
      S(
        G.solidOf(
          [
            [0, 3.2],
            [3, 3.2],
            [BIN_Z0 - M.MOUTH_Z, 9.5],
          ],
          F,
          P,
        ),
        { tone: "mid" },
      ),
    );
    out.push(L(G.arcOf(F, 3, 3.2, P), { tone: "lo" }));
    // Bin, rim and the engine plate on its front face.
    out.push(
      S(k.slabOf(plan, BIN_Z0, BIN_Z1 - BIN_Z0, P, 3, 0.5), {
        tone: "mid",
        inner: L(k.sideSeam(plan, BIN_Z0 + 3, P, 3), { tone: "faint" }),
      }),
    );
    out.push(S(k.slabOf(k.insetPlan(plan, -1), BIN_Z1, 1.6, P, 3, 0.4), { tone: "mid" }));
    out.push(L(k.planOutline(k.insetPlan(plan, 3), BIN_Z1 + 1.6, P, 3), { tone: "lo" }));
    const m = k.sideMatrix([x - 7, plan.y + plan.d], BIN_Z1 - 3.4, P, "left");
    out.push(
      `<g transform="${m}"><rect x="0" y="0" width="14" height="14" rx="0.8" class="iso-line" data-tone="mid"/><circle cx="1.6" cy="1.6" r="0.5" class="ce-rivet"/><circle cx="12.4" cy="1.6" r="0.5" class="ce-rivet"/><circle cx="1.6" cy="12.4" r="0.5" class="ce-rivet"/><circle cx="12.4" cy="12.4" r="0.5" class="ce-rivet"/><path class="ce-logo" transform="translate(2.5 2.5) scale(0.375)" d="${LOGOS[i].d}"/></g>`,
    );
    count(5);
    return `<g data-part="hopper" data-engine="${i}">${out.join("")}</g>`;
  }).join("");
}

/** The pointer target for hopper `i`: the screen hull of its bin and funnel. */
function hitOf(i) {
  const x = M.HOPPER_X[i];
  const pts = [
    [x - BIN / 2 - 2, M.RAIL_Y - BIN / 2, BIN_Z1 + 2],
    [x + BIN / 2 + 2, M.RAIL_Y - BIN / 2, BIN_Z1 + 2],
    [x + BIN / 2 + 2, M.RAIL_Y + BIN / 2, BIN_Z1 + 2],
    [x + BIN / 2 + 2, M.RAIL_Y + BIN / 2, M.MOUTH_Z - 2],
    [x - BIN / 2 - 2, M.RAIL_Y + BIN / 2, M.MOUTH_Z - 2],
    [x - BIN / 2 - 2, M.RAIL_Y + BIN / 2, BIN_Z1 + 2],
  ].map(at);
  return `<path class="ce-hit" data-engine="${i}" d="M${pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join("L")}Z"><title>${LOGOS[i].label}</title></path>`;
}

/** The capsule, coloured inline: it is drawn through <use>, which page CSS cannot reach. */
function capsule() {
  const ink = {
    "iso-fill": "fill:#c1410b;stroke:#8f2f07;stroke-width:.6",
    "iso-shade": "fill:#c1410b;stroke:#c1410b;stroke-width:.4",
    "iso-top": "fill:#e8743f;stroke:#e8743f;stroke-width:.4",
    "iso-edge": "fill:none;stroke:#8f2f07;stroke-width:.6",
    "iso-crease": "fill:none;stroke:#8f2f07;stroke-width:.4",
  };
  return S(G.sphereOf([0, 0, 0], M.CAPSULE_R, P), { tone: "hi", lit: true }).replace(
    /class="(iso-[a-z]+)"/g,
    (all, name) => (ink[name] ? `${all} style="${ink[name]}"` : all),
  );
}

// ---------------------------------------------------------------------------
// Front: drive train, bell, house, counter dial
// ---------------------------------------------------------------------------
function drive() {
  const out = [];
  // Bed plate for the train.
  const bed = { x: FLY[0] - 38, y: 0, w: ESCAPE[0] - FLY[0] + 58, d: 64, r: 3 };
  out.push(`<path class="iso-halo" d="${k.haloOf(bed, 0, 3, P)}"/>`);
  out.push(S(k.slabOf(bed, 0, 3, P, 4, 0.6), { tone: "mid" }), count());
  out.push(L(k.planOutline(k.insetPlan(bed, 3), 3, P), { tone: "faint" }));
  out.push(
    D(
      k.corners(bed, 3.4).map(([a, b]) => at([a, b, 3])),
      { size: 0.45 },
    ),
  );
  // Arbors: a pedestal and a post under each wheel.
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
  // Anchor (pallet fork) post.
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

/**
 * A spur gear as solids: a hub disc at the root radius plus one small prism per
 * tooth, back teeth painted before the disc and front teeth after it.
 * `saw` gives escape-wheel teeth (a leaning point).
 */
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

/** The whole train at escape-wheel angle `e`: the wheels turn together, in step. */
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
      { tone: "lo" },
    ),
  ].join("");
}

/** The anchor: a solid fork that rocks `rock` radians about its post. */
function anchorAt(rock) {
  const [ax, ay] = ANCHOR;
  const z = GEAR_Z + 0.5;
  const t = -Math.PI / 2 + rock;
  const P2 = (a, r) => [ax + Math.cos(t + a) * r, ay + Math.sin(t + a) * r];
  const fork = [
    P2(-0.58, 15),
    P2(-0.5, 12),
    P2(0, 3.5),
    P2(0.5, 12),
    P2(0.58, 15),
    P2(0.66, 12.5),
    P2(0.35, 3),
    P2(Math.PI - 0.3, 6),
    P2(Math.PI, 8),
    P2(Math.PI + 0.3, 6),
    P2(-0.35, 3),
    P2(-0.66, 12.5),
  ];
  return [
    k.solidSvg(k.extrude(fork, z, 2, P, { convex: false }), { tone: "hi" }),
    k.solidSvg(k.cylinder(ax, ay, 2.6, z, 2.6, P, 16, 0.3), { tone: "mid" }),
  ].join("");
}

function bell() {
  const out = [];
  const [x, y] = BELL;
  out.push(S(k.cylinder(x, y, 6.5, 0, 3, P, 24, 0.4), { tone: "lo" }));
  out.push(S(k.cylinder(x, y, 1.8, 3, BELL_Z + 12 - 3, P, 16), { tone: "mid", crease: "none" }));
  count(2);
  // Hammer post beside the bell.
  out.push(S(k.cylinder(x - 19, y + 2, 4, 0, 3, P, 20, 0.3), { tone: "lo" }));
  out.push(
    S(k.cylinder(x - 19, y + 2, 1.5, 3, BELL_Z - 7, P, 14), { tone: "mid", crease: "none" }),
  );
  count(2);
  return out.join("");
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

function house() {
  const out = [`<path class="iso-halo" d="${k.haloOf(HOUSE, 0, HOUSE_H, P)}"/>`];
  const plinth = k.insetPlan(HOUSE, -2);
  out.push(S(k.slabOf(plinth, 0, 4, P, 3, 0.5), { tone: "lo" }));
  out.push(
    S(k.slabOf(HOUSE, 4, HOUSE_H - 4, P, 3, 0.6), {
      tone: "mid",
      inner: L(k.sideSeam(HOUSE, 30, P, 3), { tone: "faint" }),
    }),
  );
  const cornice = k.insetPlan(HOUSE, -2.5);
  out.push(S(k.slabOf(cornice, HOUSE_H, 3, P, 3, 0.5), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(HOUSE, 2), HOUSE_H + 3, 4, P, 3, 0.4), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(HOUSE, 5), HOUSE_H + 7, P, 3), { tone: "faint" }));
  count(4);
  // Chimney.
  const chimney = { x: HOUSE.x + 8, y: HOUSE.y + 8, w: 9, d: 9, r: 0.6 };
  out.push(S(k.slabOf(chimney, HOUSE_H + 7, 9, P, 2, 0.3), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(chimney, -1), HOUSE_H + 16, 1.6, P, 2, 0.3), { tone: "mid" }));
  count(2);
  // Front (+y) face: door, two windows with mullions, sign board.
  const fy = HOUSE.y + HOUSE.d;
  const m = (x, z) => k.sideMatrix([x, fy], z, P, "left");
  out.push(
    `<g transform="${m(HOUSE.x + 22, 30)}"><rect x="0" y="0" width="12" height="26" rx="0.6" class="iso-line" data-tone="hi"/><rect x="2" y="2.5" width="8" height="9" class="iso-line" data-tone="lo"/><rect x="2" y="13.5" width="8" height="9" class="iso-line" data-tone="lo"/><circle cx="9.6" cy="14" r="0.8" class="ce-rivet"/></g>`,
  );
  for (const wx of [HOUSE.x + 5, HOUSE.x + 38]) {
    out.push(
      `<g transform="${m(wx, 27)}"><rect x="0" y="0" width="13" height="15" rx="0.6" class="iso-line" data-tone="mid"/><path class="iso-line" data-tone="lo" d="M6.5 0V15M0 7.5H13"/></g>`,
    );
    count();
  }
  out.push(
    `<g transform="${m(HOUSE.x + 7, HOUSE_H - 6)}"><rect x="0" y="0" width="42" height="10" rx="0.8" class="iso-line" data-tone="mid"/><text x="21" y="6.6" class="ce-sign" text-anchor="middle">YOUR BUSINESS</text></g>`,
  );
  count(2);
  // Side (+x) face: windows down the side.
  const sx = HOUSE.x + HOUSE.w;
  for (const wy of [HOUSE.y + 8, HOUSE.y + 34]) {
    out.push(
      `<g transform="${k.sideMatrix([sx, wy], 46, P, "right")}"><rect x="0" y="0" width="13" height="14" rx="0.6" class="iso-line" data-tone="mid"/><path class="iso-line" data-tone="lo" d="M6.5 0V14M0 7H13"/></g>`,
    );
    out.push(
      `<g transform="${k.sideMatrix([sx, wy], 24, P, "right")}"><rect x="0" y="0" width="13" height="14" rx="0.6" class="iso-line" data-tone="mid"/><path class="iso-line" data-tone="lo" d="M6.5 0V14M0 7H13"/></g>`,
    );
    count(2);
  }
  // Awning over the door and the step.
  out.push(
    S(k.slabOf({ x: HOUSE.x + 19, y: fy, w: 18, d: 6, r: 0.6 }, 32, 2, P, 2, 0.3), { tone: "mid" }),
  );
  out.push(
    S(k.slabOf({ x: HOUSE.x + 20, y: fy, w: 16, d: 5, r: 0.6 }, 4, 1.6, P, 2), { tone: "lo" }),
  );
  count(2);
  return out.join("");
}

function dial() {
  const out = [];
  const [x, y] = DIAL;
  out.push(S(k.cylinder(x, y, 7, 0, 3, P, 24, 0.4), { tone: "lo" }));
  out.push(S(k.cylinder(x, y, 2.4, 3, DIAL_Z - 3, P, 16), { tone: "mid", crease: "none" }));
  out.push(
    S(k.cylinder(x, y, DIAL_R, DIAL_Z, DIAL_TOP - DIAL_Z, P, 56, 0.6), {
      tone: "hi",
      crease: "lo",
    }),
  );
  out.push(L(k.knurl(x, y, DIAL_R, DIAL_TOP - 2.6, DIAL_TOP, 60, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(x, y, DIAL_R - 2, DIAL_TOP, P, 56), { tone: "lo" }));
  const ticks = k.radialTicks(x, y, DIAL_R - 2.6, 40, 5, DIAL_TOP, [1.2, 2.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(x, y, 1.4, DIAL_TOP, P, 16), { tone: "mid" }));
  count(3);
  return out.join("");
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
const POOL = 16;
const capsules = Array.from(
  { length: POOL },
  () => `<use data-part="capsule" href="#ce-capsule" opacity="0"/>`,
).join("");
count();
const DOLLAR_AT = at([M.DOOR_X, HOUSE.y + HOUSE.d / 2, HOUSE_H + 22]);
const dollars = Array.from(
  { length: 4 },
  () =>
    `<text data-part="dollar" class="ce-dollar" x="${DOLLAR_AT[0].toFixed(1)}" y="${DOLLAR_AT[1].toFixed(1)}" text-anchor="middle" opacity="0">$</text>`,
).join("");

/** Hotspots: world points on key parts, with the step we do there. */
const SPOTS = [
  {
    p: [M.HOPPER_X[2], M.RAIL_Y, BIN_Z1 + 10],
    title: "AI engines",
    text: "Buyers ask AI. We track the questions your buyers ask on ChatGPT, Gemini, Claude, Perplexity and Google, every week.",
  },
  {
    p: [CABINET.x + CABINET.w - 6, CABINET.y + 8, CABINET_H + 3],
    title: "Indexed",
    text: "We make sure search engines and AI crawlers can read every page: sitemaps, crawl errors, speed.",
  },
  {
    p: [LENS_POST[0], LENS_POST[1], LENS_Z + 10],
    title: "Found",
    text: "We write exact answers to those questions on your site, and fix weak pages.",
  },
  {
    p: [HORN.x, HORN.y + 30, HORN_Z + 8],
    title: "Mentioned",
    text: "We fix your listings and profiles so AI engines name you, with a link.",
  },
  {
    p: [ESCAPE[0], ESCAPE[1], GEAR_Z + 10],
    title: "One checked change a day",
    text: "Agents draft it. A person checks it before it ships.",
  },
  {
    p: [BELL[0], BELL[1], BELL_Z + 20],
    title: "Monday report",
    text: "Which engines named you, for which questions, and what we changed.",
  },
  {
    p: [M.DOOR_X, HOUSE.y + HOUSE.d / 2, HOUSE_H + 12],
    title: "Your business",
    text: "More buyers find you. We report citations and leads, not promises.",
  },
];
const spotsHtml = SPOTS.map((spot, i) => {
  const [sx, sy] = at(spot.p);
  return `<button type="button" class="ce-spot" data-spot="${i}" style="left:${((sx / WIDTH) * 100).toFixed(2)}%;top:${((sy / HEIGHT) * 100).toFixed(2)}%" aria-label="${spot.title}: ${spot.text}" aria-expanded="false"><span aria-hidden="true"></span></button>`;
}).join("");
const tipHtml = `<div class="ce-tip" role="tooltip" hidden><strong></strong><span></span></div>`;

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A brass citation engine on a bench. On the left, five hoppers, one for each AI engine (ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews), drop buyer questions as small balls onto a moving belt. In the middle, inside a frame with the citata name plate, each ball passes three stations: a card-index cabinet stamps it (Indexed), a lens swings over it (Found), and a horn speaks (Mentioned). On the right, the balls drop down a glass tube, wait in a line at the door of a small house, your business, and go in one by one. A dollar sign rises each time, and a counter dial moves. A gear train drives the belt, and a bell rings for every seventh ball: the Monday report.",
  body: [
    bench(),
    gantry(),
    plinth(),
    frameBack(),
    cabinet(),
    lensPost(),
    horn(),
    house(),
    queueRail(),
    `<g data-part="gate">${gate()}</g>`,
    rail(),
    hoppers(),
    `<defs><g id="ce-capsule">${capsule()}</g></defs>`,
    capsules,
    tube(),
    `<g data-part="stamp">${stamp()}</g>`,
    `<g data-part="lens">${lensAt(REST)}</g>`,
    hornWaves(),
    frameFront(),
    drive(),
    bell(),
    `<g data-part="bell">${bellDome()}</g>`,
    `<g data-part="hammer">${hammerAt(0)}</g>`,
    dial(),
    `<path data-part="needle" class="iso-line" data-tone="hi" data-free="start" d="${needleAt(0)}" style="stroke-width:1.1"/>`,
    dollars,
    M.HOPPER_X.map((_, i) => hitOf(i)).join(""),
  ],
});
count(8); // moving groups: lens, hammer, bell, needle, anchor, cleats, gate, dollars

const CSS = `
.ce{--anatomy-page:#f5efe3;--anatomy-card:#fbf7ee;--anatomy-text:#5c5145;--anatomy-strong:#1c1712;--anatomy-muted:#8a7d6c;
--anatomy-paper:#fbf7ee;--anatomy-face:#fffdf8;--anatomy-top:#fbf6ec;
--anatomy-shade-0:#d2c4a8;--anatomy-shade-1:#ddd1b9;--anatomy-shade-2:#e8dfcc;--anatomy-shade-3:#f1eadb;
--anatomy-lit-top:#e8743f;--anatomy-lit-shade:#c1410b;
--anatomy-hi:#1c1712;--anatomy-mid:#7a6b58;--anatomy-lo:#ad9c7e;--anatomy-faint:#d3c5aa;--anatomy-lit:#8f2f07;
--anatomy-halo:#7a6a50;--anatomy-halo-opacity:.28;--anatomy-dot:#3a2f25;
--anatomy-mono:"Paper Mono",ui-monospace,monospace;--anatomy-weight:.6px}
.ce .iso-figure{margin:0}
.ce .iso-plate{background:var(--anatomy-card);box-shadow:0 0 0 1px #d9cdb6;border-radius:4px}
.ce .iso-plate-corner{font-size:11px}
.ce .iso-plate-corner[data-corner="fig"],.ce .iso-plate-corner[data-corner="title"]{color:#c1410b}
.ce .iso-legend{color:var(--anatomy-text);font-size:14px}
.ce .iso-solid[data-lit]>.iso-fill{fill:#c1410b}
.ce .iso-solid[data-seamless][data-lit]>.iso-shade{fill:#c1410b;stroke:#c1410b}
.ce .iso-solid[data-seamless][data-lit]>.iso-top{fill:#e8743f;stroke:#e8743f}
.ce .ce-logo{fill:var(--anatomy-hi)}
.ce .ce-rivet{fill:var(--anatomy-mid);stroke:none}
.ce .ce-hit{fill:transparent;stroke:none;cursor:pointer;pointer-events:all}
.ce .ce-hit:hover,.ce .ce-hit[data-on]{fill:#c1410b;fill-opacity:.06}
.ce .iso-stage{position:relative;outline:none;touch-action:manipulation}
.ce .ce-plate{fill:var(--anatomy-top);stroke:var(--anatomy-mid);stroke-width:.25}
.ce .ce-plate-text{font-family:var(--anatomy-mono);font-size:2.3px;letter-spacing:.12em;fill:var(--anatomy-hi)}
.ce .ce-nameplate{fill:#fbf7ee;stroke:#c1410b;stroke-width:.5}
.ce .ce-sign{font-family:var(--anatomy-mono);font-size:3.6px;letter-spacing:.1em;fill:var(--anatomy-hi)}
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
@media (max-width:560px){.ce .ce-spot{width:20px;height:20px;margin:-10px 0 0 -10px}.ce .ce-spot span{inset:5px}.ce .ce-spot span::after{inset:2.5px}.ce .iso-plate-corner[data-corner="hint"]{display:none}}
.ce .iso-stage:focus-visible{box-shadow:0 0 0 2px #c1410b;border-radius:4px}
.ce .ce-small{display:block;margin-top:2px;font-size:12px;color:var(--anatomy-muted)}
@media (max-width:560px){.ce .iso-plate{padding:44px 10px 76px}.ce .iso-plate-corner{font-size:10px}.ce .iso-plate-corner[data-corner="hint"]{bottom:22px}.ce .iso-plate-corner[data-corner="readout"]{left:0;right:auto;white-space:normal;line-height:1.3}}
`;

const caption =
  "Buyers ask AI engines. Inside the citata frame, each question passes 3 stations: Indexed, Found, Mentioned. Then buyers line up at your door and come in one by one. One checked change a day turns the wheels. Every 7th buyer, the bell rings: your Monday report. Tap a dot to read each step.";

const plate = k
  .plateHtml({
    fig: "Fig 1",
    title: "The citation engine",
    hint: "Hover or tap an engine",
    readout: "Starting the engine",
    keys: [
      { mark: "lit", label: "A buyer question" },
      { mark: "raised", label: "AI engines → citata → your business" },
    ],
    caption,
    body: `<div class="iso-stage" tabindex="0" role="group" aria-label="Citation engine. Press 1 to 5 to drop a question from an engine.">${svg}${spotsHtml}${tipHtml}</div>`,
  })
  .replace(
    "</figcaption>",
    `<span class="ce-small">An illustration of the process, not client data. Logos belong to their owners.</span></figcaption>`,
  );

const markup = `<div class="iso ce" data-theme="light"><style>${k.ISO_CSS}${CSS}</style>${plate}</div>`;

// ---------------------------------------------------------------------------
// Live script
// ---------------------------------------------------------------------------
const LIVE = `
const P = ${JSON.stringify(P)};
const WIDTH = ${WIDTH}, HEIGHT = ${HEIGHT};
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
${needleAt.toString().replace(/k\./g, "")}
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

for (const root of document.querySelectorAll(".ce")) {
  const stage = root.querySelector(".iso-stage");
  const svg = stage.querySelector("svg");
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const pool = [...svg.querySelectorAll('[data-part="capsule"]')];
  const waves = [...svg.querySelectorAll('[data-part="wave"]')];
  const dollars = [...svg.querySelectorAll('[data-part="dollar"]')].map((el) => ({ el, born: -9 }));
  const hits = [...svg.querySelectorAll(".ce-hit")];
  const parts = { stamp: q("stamp"), lens: q("lens"), train: q("train"), anchor: q("anchor"), hammer: q("hammer"), bell: q("bell"), needle: q("needle"), cleats: q("cleats"), gate: q("gate") };
  const readout = root.querySelector("[data-readout]");
  const still = matchMedia("(prefers-reduced-motion: reduce)");

  // State: every number comes from the model (capsuleAt, cups, slots).
  let balls = [];          // { el, index, cup, land, queued, qx, enter }
  const taken = new Set(); // cups that carry a ball
  let queue = [];          // balls waiting at the door, front first
  let clock = 0, last = 0, frame = 0, visible = false;
  let nextSpawn = 0.2, lastDrop = -9, tour = 0, nextRelease = 0, delivered = 0, ring = -99;
  let needle = 0, swing = REST, lensDrawn = 99, gate = 0, trainAt0 = -1, hornPass = -99, lastEngine = -1;
  let lastText = "";
  const say = (text) => { if (text !== lastText) { readout.textContent = text; lastText = text; } };

  function spawn(index) {
    const free = pool.find((el) => !balls.some((b) => b.el === el));
    if (!free) return;
    const { cup, land } = nextCup(index, clock + DROP, taken);
    taken.add(cup);
    balls.push({ el: free, index, cup, land, queued: false, qx: TUBE_X, enter: -1 });
    lastEngine = index;
  }

  function update(dt) {
    clock += dt;
    if (clock >= nextSpawn) { spawn(tour % ENGINES.length); tour += 1; nextSpawn = clock + SPAWN_EVERY; }
    for (const b of balls) {
      if (b.queued || b.enter >= 0) continue;
      const s = capsuleAt(b.index, b.cup, b.land, clock);
      if (s.phase === "tube" || s.phase === "queue") taken.delete(b.cup);
      if (s.phase === "queue") { b.queued = true; queue.push(b); }
      const passT = cupTime(b.cup, STATIONS[2].x);
      if (passT <= clock && passT > hornPass && clock >= b.land) hornPass = passT;
    }
    // Queue: each ball rolls to its slot; the front one waits at the door.
    queue.forEach((b, i) => {
      const target = DOOR_X - Math.min(i, SLOTS - 1) * SLOT;
      b.qx += (target - b.qx) * ease(dt, 0.16);
    });
    const front = queue[0];
    if (front && Math.abs(front.qx - DOOR_X) < 0.6 && clock >= nextRelease) {
      queue.shift();
      front.enter = clock;
      nextRelease = clock + (queue.length >= 3 ? 0.8 : queue.length >= 2 ? 1.1 : 1.6);
    }
    for (const b of balls) {
      if (b.enter >= 0 && clock - b.enter >= 0.45) {
        b.done = true;
        delivered += 1;
        if (delivered % TURNS_PER_REPORT === 0) ring = clock;
        const slot = dollars.reduce((o, d) => (d.born < o.born ? d : o), dollars[0]);
        slot.born = clock;
      }
    }
    balls = balls.filter((b) => !b.done);
    const opening = balls.some((b) => b.enter >= 0);
    gate += ((opening ? 1 : 0) - gate) * ease(dt, 0.08);
    needle += (delivered / 40 - needle) * ease(dt, 0.25);
    const near = balls.some((b) => {
      if (b.queued || b.enter >= 0 || clock < b.land) return false;
      const x = cupX(b.cup, clock);
      return x > STATIONS[1].x - 24 && x < STATIONS[1].x + 10;
    });
    swing += ((near ? 0 : REST) - swing) * ease(dt, 0.14);
  }

  function draw() {
    let stampLoad = 0;
    for (const b of balls) {
      let p, alpha = 1;
      if (b.enter >= 0) {
        const u = Math.min(1, (clock - b.enter) / 0.45);
        p = [DOOR_X, RAIL_Y - 9 * u, QUEUE_CZ];
        alpha = 1 - u * u;
      } else if (b.queued) {
        p = [b.qx, RAIL_Y, QUEUE_CZ];
      } else {
        if (clock < b.land - DROP) { b.el.setAttribute("opacity", "0"); continue; }
        const s = capsuleAt(b.index, b.cup, b.land, clock);
        p = s.p;
        if (s.phase === "belt") stampLoad = Math.max(stampLoad, bump(p[0], STATIONS[0].x, 9));
      }
      b.el.setAttribute("opacity", alpha.toFixed(3));
      b.el.setAttribute("transform", translateAlong(P, p));
    }
    for (const el of pool) if (!balls.some((b) => b.el === el)) el.setAttribute("opacity", "0");
    parts.cleats.setAttribute("d", cleatsAt(clock));
    parts.stamp.setAttribute("transform", translateAlong(P, [0, 0, -STAMP_DOWN * stampLoad]));
    if (Math.abs(swing - lensDrawn) > 0.004) { parts.lens.innerHTML = lensAt(swing); lensDrawn = swing; }
    const since = clock - hornPass;
    waves.forEach((w, i) => {
      const u = since - i * 0.12;
      w.setAttribute("opacity", (u < 0 || u > 0.7 ? 0 : (1 - u / 0.7) * 0.95).toFixed(3));
    });
    // Gear train: turns smoothly all the time; the anchor ticks with the escape wheel.
    const e = clock * 0.55;
    if (Math.abs(e - trainAt0) > 0.02) {
      parts.train.innerHTML = trainAt(e);
      parts.anchor.innerHTML = anchorAt(0.13 * Math.sin(e * TEETH));
      trainAt0 = e;
    }
    parts.gate.setAttribute("transform", translateAlong(P, [0, 0, 8 * gate]));
    const rang = clock - ring;
    const strike = rang >= 0 && rang < 1.4 ? Math.exp(-rang * 3) * Math.abs(Math.sin(rang * 14)) : 0;
    parts.hammer.innerHTML = hammerAt(Math.min(1, strike * 1.4));
    parts.bell.setAttribute("transform", translateAlong(P, [strike * 0.6 * Math.sin(rang * 40), 0, 0]));
    parts.needle.setAttribute("d", needleAt(needle));
    for (const d of dollars) {
      const u = (clock - d.born) / 0.85;
      if (u < 0 || u > 1) { d.el.setAttribute("opacity", "0"); continue; }
      d.el.setAttribute("opacity", (u < 0.15 ? u / 0.15 : 1 - (u - 0.15) / 0.85).toFixed(3));
      d.el.setAttribute("transform", "translate(0 " + (-16 * u).toFixed(2) + ")");
    }
    const inside = balls.filter((b) => !b.queued && b.enter < 0 && clock >= b.land - DROP).length;
    if (rang >= 0 && rang < 2) say("7th buyer in · bell: Monday report");
    else if (lastEngine >= 0) say(ENGINES[lastEngine] + " asked · " + inside + " in the engine · " + queue.length + " at your door");
  }

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
    last = now;
    update(dt);
    draw();
    frame = visible ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible && !still.matches) { last = 0; frame = requestAnimationFrame(tick); } };
  const drop = (index) => {
    if (still.matches || clock - lastDrop < 0.3) return;
    lastDrop = clock;
    spawn(index);
    nextSpawn = clock + SPAWN_EVERY;
    run();
  };
  for (const hit of hits) {
    const index = Number(hit.dataset.engine);
    hit.addEventListener("pointerenter", () => drop(index));
    hit.addEventListener("pointerdown", () => drop(index));
  }
  stage.addEventListener("keydown", (event) => {
    const n = Number(event.key);
    if (event.target === stage && n >= 1 && n <= ENGINES.length) { event.preventDefault(); drop(n - 1); }
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
  root.addEventListener("keydown", (event) => { if (event.key === "Escape") { hide(); } });
  document.addEventListener("pointerdown", (event) => {
    if (!tip.hidden && !event.target.closest(".ce-spot") && !event.target.closest(".ce-tip")) hide();
  });

  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run();
  }, { rootMargin: "80px 0px" }).observe(stage);
  if (still.matches) {
    // One still frame: run the model for a while, then draw once.
    for (let i = 0; i < 420; i++) update(1 / 30);
    swing = 0;
    draw();
  } else {
    draw();
  }
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
writeFileSync(join(ROOT, "public/mechanism/live.js"), wrapped);
if (process.argv.includes("--page")) {
  const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Citation engine</title><style>@font-face{font-family:"Paper Mono";src:url(../../public/fonts/PaperMono-Regular.woff2)}body{margin:0;background:#f5efe3;font:15px/1.5 system-ui}main{width:min(1100px,100% - 24px);margin:40px auto}</style></head><body><main>${markup}</main><script>${wrapped.replace(/<\/(script)/gi, "<\\/$1")}</script></body></html>`;
  writeFileSync(join(HERE, "preview.html"), page);
}
console.log(
  `parts ${parts} · svg ${(svg.length / 1024).toFixed(0)} KB · live.js ${(wrapped.length / 1024).toFixed(0)} KB`,
);
