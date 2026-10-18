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

const CABINET = { x: -34, y: -66, w: 44, d: 32, r: 1.5 };
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

const HOUSE = { x: 158, y: -44, w: 56, d: 60, r: 1 };
const HOUSE_H = 60;

const DIAL = [132, 42];
const DIAL_Z = 22;
const DIAL_R = 15;
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
  // Maker's plate, the one engraved label.
  const plate = { x: -222, y: BENCH.y + BENCH.d - 22, w: 52, d: 14, r: 1.2 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 3, 0.3), { tone: "mid" }), count());
  out.push(
    D(
      k.corners(plate, 2.4).map(([x, y]) => at([x, y, 0.8])),
      { size: 0.45 },
    ),
  );
  out.push(
    k.faceTextSvg(
      k.topMatrix([plate.x + plate.w / 2, plate.y + 9.4], 0.8, P, "x"),
      "CITATA · No 1",
      { size: 4.2, tone: "mid", anchor: "middle" },
    ),
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
  const out = [`<path class="iso-halo" d="${k.haloOf(CABINET, 0, CABINET_H, P)}"/>`];
  out.push(S(k.slabOf(k.insetPlan(CABINET, -1.5), 0, 4, P, 3, 0.4), { tone: "lo" }));
  out.push(S(k.slabOf(CABINET, 4, CABINET_H - 4, P, 3, 0.6), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(CABINET, -1.2), CABINET_H, 2.5, P, 3, 0.5), { tone: "mid" }));
  count(3);
  // Six drawers on the front (+y) face: frame, label holder, pull.
  const face = CABINET.y + CABINET.d;
  const drawers = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      const x = CABINET.x + 3 + col * 19.5;
      const z = CABINET_H - 5 - row * 17;
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
  out.push(S(k.cylinder(x, y, 7, 0, 3, P, 28, 0.4), { tone: "lo" }));
  out.push(S(k.cylinder(x, y, 2.6, 3, LENS_Z - 3, P, 20), { tone: "mid", crease: "none" }));
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
  out.push(S(k.cylinder(HORN.x, HORN.y, 8, 0, 3, P, 28, 0.4), { tone: "lo" }));
  out.push(
    S(k.cylinder(HORN.x, HORN.y, 2.4, 3, HORN_Z - 13, P, 20), { tone: "mid", crease: "none" }),
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
  const legs = [-206, -144, -78, -20, 30, 80, 136];
  for (const x of legs) {
    out.push(S(k.cylinder(x, M.RAIL_Y, 5, 0, 2, P, 20, 0.3), { tone: "lo" }));
    out.push(
      S(
        k.slabOf(
          { x: x - 1.6, y: M.RAIL_Y - 1.6, w: 3.2, d: 3.2, r: 0.6 },
          2,
          M.RAIL_TOP - 9,
          P,
          2,
        ),
        { tone: "mid", crease: "none" },
      ),
    );
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
  for (const y of [y0, y0 + 12]) {
    const lip = { x: M.RAIL_FROM, y, w: body.w, d: 2, r: 0.6 };
    out.push(S(k.slabOf(lip, M.RAIL_TOP - 2, 3.4, P, 2), { tone: "mid", crease: "none" }));
    count();
  }
  out.push(
    `<path data-part="belt" class="iso-line" data-tone="lo" data-flow="" data-free="both" d="${k.lineOnTop([M.RAIL_FROM + 4, M.RAIL_Y], [M.RAIL_TO - 4, M.RAIL_Y], M.RAIL_TOP, P)}"/>`,
  );
  // End pulleys.
  for (const x of [M.RAIL_FROM + 1, M.RAIL_TO - 1]) {
    const F = G.frameAlong([x, y0 - 0.5, M.RAIL_TOP - 3], [0, 1, 0]);
    out.push(S(G.disc(0, 15, 4.2, F, P), { tone: "mid" }), count());
  }
  return out.join("");
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

function capsule() {
  return S(G.sphereOf([0, 0, 0], M.CAPSULE_R, P), { tone: "hi", lit: true });
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
    `<g transform="${m(HOUSE.x + 9, HOUSE_H - 6)}"><rect x="0" y="0" width="38" height="10" rx="0.8" class="iso-line" data-tone="mid"/><path class="iso-line" data-tone="lo" data-free="both" d="M6 3.6H32M10 6.6H28"/></g>`,
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
const POOL = 6;
const capsules = Array.from(
  { length: POOL },
  () => `<g data-part="capsule" opacity="0">${capsule()}</g>`,
).join("");
count();

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A brass citation engine on a bench. Five hoppers, one for each AI engine (ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews), drop buyer questions as small balls onto a conveyor. Each ball stops at three stations: a card-index cabinet stamps it (Indexed), a lens swings over it (Found), and a horn speaks (Mentioned). Then it rolls into a small house, your site, and a counter dial moves. A flywheel and an escape wheel drive the belt; the wheel moves one tooth for each question, and a bell rings every seventh turn.",
  body: [
    bench(),
    gantry(),
    cabinet(),
    lensPost(),
    horn(),
    rail(),
    hoppers(),
    capsules,
    `<g data-part="stamp">${stamp()}</g>`,
    `<g data-part="lens">${lensAt(REST)}</g>`,
    hornWaves(),
    drive(),
    bell(),
    `<g data-part="bell">${bellDome()}</g>`,
    `<g data-part="hammer">${hammerAt(0)}</g>`,
    house(),
    dial(),
    `<path data-part="needle" class="iso-line" data-tone="hi" data-free="start" d="${needleAt(0)}" style="stroke-width:1.1"/>`,
    M.HOPPER_X.map((_, i) => hitOf(i)).join(""),
  ],
});
count(6); // moving groups: lens, hammer, bell, needle, anchor, belt

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
.ce .iso-stage{outline:none;touch-action:manipulation}
.ce .iso-stage:focus-visible{box-shadow:0 0 0 2px #1e3a7b;border-radius:4px}
.ce .ce-small{display:block;margin-top:2px;font-size:12px;color:var(--anatomy-muted)}
@media (max-width:560px){.ce .iso-plate{padding:44px 10px 76px}.ce .iso-plate-corner{font-size:10px}.ce .iso-plate-corner[data-corner="hint"]{bottom:22px}.ce .iso-plate-corner[data-corner="readout"]{left:0;right:auto;white-space:normal;line-height:1.3}}
`;

const caption =
  "Buyers ask AI engines. Each question passes 3 stations: Indexed, Found, Mentioned. One checked change a day turns the wheel. Every 7th turn, the bell rings: your Monday report.";

const plate = k
  .plateHtml({
    fig: "Fig 1",
    title: "The citation engine",
    hint: "Hover or tap an engine",
    readout: "Waiting for a question",
    keys: [
      { mark: "lit", label: "A buyer question on its way to your site" },
      { mark: "raised", label: "Stations: Indexed, Found, Mentioned" },
    ],
    caption,
    body: `<div class="iso-stage" tabindex="0" role="group" aria-label="Citation engine. Press 1 to 5 to drop a question from an engine.">${svg}</div>`,
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
const ENGINES = ${JSON.stringify(LOGOS.map((l) => l.label))};
const REST = ${REST}, LENS_POST = ${JSON.stringify(LENS_POST)}, LENS_ARM = ${LENS_ARM}, LENS_R = ${LENS_R}, LENS_Z = ${LENS_Z};
const FLY = ${JSON.stringify(FLY)}, FLY_R = ${FLY_R}, FLY_TEETH = ${FLY_TEETH}, TOOTH = ${TOOTH}, GEAR_H = ${GEAR_H};
const IDLER = ${JSON.stringify(IDLER)}, IDLER_R = ${IDLER_R}, IDLER_TEETH = ${IDLER_TEETH}, ESCAPE = ${JSON.stringify(ESCAPE)}, ESCAPE_R = ${ESCAPE_R}, TEETH = ${TEETH}, GEAR_Z = ${GEAR_Z};
const ANCHOR = ${JSON.stringify(ANCHOR)}, BELL = ${JSON.stringify(BELL)}, BELL_Z = ${BELL_Z};
const DIAL = ${JSON.stringify(DIAL)}, DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP};
const at = (p) => iso(p, P);
${lensAt.toString().replace(/M\./g, "")}
${gearSvg.toString().replace(/depthOf\(/g, "depthOf(")}
${trainAt.toString()}
${anchorAt.toString()}
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

for (const root of document.querySelectorAll(".ce")) {
  const stage = root.querySelector(".iso-stage");
  const svg = stage.querySelector("svg");
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const pool = [...svg.querySelectorAll('[data-part="capsule"]')];
  const waves = [...svg.querySelectorAll('[data-part="wave"]')];
  const hits = [...svg.querySelectorAll(".ce-hit")];
  const parts = { stamp: q("stamp"), lens: q("lens"), train: q("train"), anchor: q("anchor"), hammer: q("hammer"), bell: q("bell"), needle: q("needle"), belt: q("belt") };
  const readout = root.querySelector("[data-readout]");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  let live = [];
  let clock = 0, last = 0, frame = 0, visible = false, nextSpawn = 0.6, lastSpawn = -9, tour = 0;
  let turns = 0, toothAt = 0, toothTo = 0, delivered = 0, needle = 0, ring = -9, swing = REST, lensDrawn = REST;
  let lastText = "", trainDrawn = 0;

  const say = (text) => { if (text !== lastText) { readout.textContent = text; lastText = text; } };

  function spawn(index) {
    if (clock - lastSpawn < 0.9) return;
    lastSpawn = clock;
    const free = pool.find((el) => !live.some((c) => c.el === el));
    if (!free) return;
    turns += 1;
    toothTo += 1;
    if (turns % TURNS_PER_REPORT === 0) ring = clock;
    live.push({ el: free, index, born: clock, turn: ((turns - 1) % TURNS_PER_REPORT) + 1, counted: false });
  }

  function draw() {
    const states = [];
    for (const c of live) {
      const s = capsuleAt(c.index, clock - c.born);
      states.push(s);
      if (s.done) {
        if (!c.counted) { c.counted = true; delivered += 1; }
        c.el.setAttribute("opacity", "0");
        continue;
      }
      c.el.setAttribute("opacity", "1");
      c.el.setAttribute("transform", translateAlong(P, s.p));
    }
    live = live.filter((c) => !c.counted);
    // Stamp: drops onto a capsule that waits at Indexed.
    const stampLoad = stationLoad(states, 0);
    parts.stamp.setAttribute("transform", translateAlong(P, [0, 0, -${STAMP_DOWN} * stampLoad]));
    // Lens: swings over the rail while a capsule nears or waits at Found.
    const near = states.some((s) => (s.stage === 1) && (s.at >= 0 || s.p[0] > STATIONS[1].x - 30));
    const want = near ? 0 : REST;
    swing += (want - swing) * (1 - Math.exp(-dtNow / 0.22));
    if (Math.abs(swing - lensDrawn) > 0.004) { parts.lens.innerHTML = lensAt(swing); lensDrawn = swing; }
    // Horn: three rings fade out from the mouth while a capsule waits at Mentioned.
    const hornLoad = stationLoad(states, 2);
    waves.forEach((w, i) => {
      const phase = (clock * 1.6 + i / 3) % 1;
      w.setAttribute("opacity", (hornLoad * (1 - phase) * 0.9).toFixed(3));
    });
    // Drive: the flywheel turns, the escape wheel steps one tooth per question.
    toothAt += (toothTo - toothAt) * (1 - Math.exp(-dtNow / 0.12));
    const tooth = (Math.PI * 2) / TEETH;
    if (Math.abs(toothAt - trainDrawn) > 0.002) {
      parts.train.innerHTML = trainAt(toothAt * tooth);
      const side = Math.floor(toothTo) % 2 ? 1 : -1;
      parts.anchor.innerHTML = anchorAt(side * 0.12 - side * 0.24 * Math.max(0, Math.min(1, toothTo - toothAt)));
      trainDrawn = toothAt;
    }
    // Bell: the seventh turn rings it.
    const since = clock - ring;
    const strike = since >= 0 && since < 1.4 ? Math.exp(-since * 3) * Math.abs(Math.sin(since * 14)) : 0;
    parts.hammer.innerHTML = hammerAt(Math.min(1, strike * 1.4));
    parts.bell.setAttribute("transform", translateAlong(P, [strike * 0.6 * Math.sin(since * 40), 0, 0]));
    // Counter dial: one step per question that reaches the house.
    needle += (delivered / 40 - needle) * (1 - Math.exp(-dtNow / 0.3));
    parts.needle.setAttribute("d", needleAt(needle));
    // Readout: the newest question and where it is.
    const newest = live[live.length - 1];
    if (since >= 0 && since < 2.2) say("Turn 7 of 7 · bell: Monday report");
    else if (newest) {
      const s = capsuleAt(newest.index, clock - newest.born);
      const where = s.stage < 0 ? "asked" : s.stage >= 3 ? "to your site" : STATIONS[s.stage].name + (s.at >= 0 ? "" : " next");
      say(ENGINES[newest.index] + " question · " + where + " · turn " + newest.turn + " of 7");
    }
  }

  let dtNow = 1 / 60;
  function tick(now) {
    dtNow = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
    last = now;
    clock += dtNow;
    if (clock >= nextSpawn) { spawn(tour % ENGINES.length); tour += 1; nextSpawn = clock + SPAWN_EVERY; }
    draw();
    frame = visible ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible && !still.matches) { last = 0; frame = requestAnimationFrame(tick); } };
  const drop = (index) => {
    if (still.matches) return;
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
    if (n >= 1 && n <= ENGINES.length) { event.preventDefault(); drop(n - 1); }
  });
  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run();
  }, { rootMargin: "80px 0px" }).observe(stage);
  if (still.matches) {
    // One still frame: a question waits under the lens, the lens over it.
    live.push({ el: pool[0], index: 1, born: -9, turn: 3, counted: false });
    clock = 0;
    const u = DROP + routeOf(1).slice(0, 3).reduce((t, leg) => t + leg.time, 0) + 0.3;
    live[0].born = -u;
    swing = 0;
    draw();
    say("Gemini question · Found · turn 3 of 7");
    svg.querySelectorAll("[data-flow]").forEach((el) => el.removeAttribute("data-flow"));
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
