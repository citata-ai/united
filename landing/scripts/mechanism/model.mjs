/**
 * The citation engine model. Pure: no imports, no DOM. build.mjs uses it for
 * the static drawing, and live.js inlines its source (without `export`) so the
 * page moves every part from the same numbers.
 *
 * World units are about 1 px; x runs along the bench, y toward the viewer, z up.
 * The loop: your site prints pages onto the upper belt -> the pages pass the
 * three citata stations (Indexed, Found, Mentioned) -> each page goes up into
 * an AI engine -> the engine sends a buyer (a ball) down onto the lower belt,
 * which runs back to your site -> buyers queue at the door and go in one by one.
 */

// --- Upper belt: pages, left to right -------------------------------------
export const BELT_Y = -48;
export const BELT_TOP = 44;
export const BELT_FROM = -222;
export const BELT_TO = 232;
export const SPEED = 44;
export const CUP = 24;
/** Pages leave your site here. */
export const PAGE_X = -214;
/** The three stations inside the citata frame. */
export const STATIONS = [
  { name: "Indexed", x: -140 },
  { name: "Found", x: -84 },
  { name: "Mentioned", x: -28 },
];
/** AI engine receivers above the belt, one per engine (same order as LOGOS). */
export const ENGINE_X = [62, 96, 130, 164, 198];
export const MOUTH_Z = 58;
/** A page rises into the receiver mouth in this time. */
export const LIFT = 0.38;

// --- Lower belt: buyers, right to left ------------------------------------
export const RETURN_Y = -26;
export const RETURN_TOP = 10;
export const RETURN_FROM = -150;
export const RETURN_TO = 232;
export const RETURN_SPEED = 54;
/** The receiver sends a buyer out of its spout, which falls to the lower belt. */
export const SPOUT_Z = 72;
export const FALL = 0.42;
export const SEND_AFTER = 0.25;
/** Buyers leave the belt onto the queue rail at RETURN_FROM and roll to a slot. */
export const DOOR_X = -214;
export const SLOT = 9;
export const SLOTS = 7;
export const BALL_R = 4;

/** Every 7th buyer who goes in rings the bell: the Monday report. */
export const TURNS_PER_REPORT = 7;
/** Idle cadence: a new page about every second. */
export const PAGE_EVERY = 0.9;

export const BALL_Z = RETURN_TOP + BALL_R;

/** Upper belt: x of cup `n` at time `t`, and the time cup `n` passes x. */
export const cupX = (n, t) => n * CUP + SPEED * t;
export const cupTime = (n, x) => (x - n * CUP) / SPEED;

/** Lower belt runs the other way. */
export const backX = (n, t) => n * CUP - RETURN_SPEED * t;
export const backTime = (n, x) => (n * CUP - x) / RETURN_SPEED;

/** The first free upper cup that passes the site outlet no earlier than `soonest`. */
export function pageCup(soonest, taken) {
  let cup = Math.floor((PAGE_X - SPEED * soonest) / CUP);
  while (taken.has(cup)) cup -= 1;
  return cup;
}

/** The first free lower cup under x no earlier than `soonest`. Returns { cup, land }. */
export function buyerCup(x, soonest, taken) {
  let cup = Math.ceil((x + RETURN_SPEED * soonest) / CUP);
  while (taken.has(cup)) cup += 1;
  return { cup, land: backTime(cup, x) };
}

/**
 * A page on cup `cup`, bound for engine `engine`, at time `t`.
 * phase: "wait" (still inside the site) | "belt" | "lift" | "gone".
 */
export function pageAt(cup, engine, t) {
  const out = cupTime(cup, PAGE_X);
  if (t < out) return { p: [PAGE_X, BELT_Y, BELT_TOP], phase: "wait", at: 0 };
  const x = ENGINE_X[engine];
  const reach = cupTime(cup, x);
  if (t < reach) return { p: [cupX(cup, t), BELT_Y, BELT_TOP], phase: "belt", at: 0 };
  const u = (t - reach) / LIFT;
  if (u < 1)
    return { p: [x, BELT_Y, BELT_TOP + (MOUTH_Z - BELT_TOP) * u * u], phase: "lift", at: u };
  return { p: [x, BELT_Y, MOUTH_Z], phase: "gone", at: 1 };
}

/** When a page bound for `engine` on `cup` is inside the receiver. */
export const pageDone = (cup, engine) => cupTime(cup, ENGINE_X[engine]) + LIFT;

/**
 * A buyer sent by `engine` on lower cup `cup` that lands at `land`, at time `t`.
 * phase: "wait" | "fall" | "belt" | "queue" (then the live code moves it on).
 */
export function buyerAt(engine, cup, land, t) {
  const x0 = ENGINE_X[engine];
  if (t < land - FALL) return { p: [x0, RETURN_Y, SPOUT_Z], phase: "wait" };
  if (t < land) {
    const share = (1 - (land - t) / FALL) ** 2;
    return { p: [x0, RETURN_Y, SPOUT_Z - (SPOUT_Z - BALL_Z) * share], phase: "fall" };
  }
  const x = backX(cup, t);
  if (x > RETURN_FROM) return { p: [x, RETURN_Y, BALL_Z], phase: "belt" };
  return { p: [RETURN_FROM, RETURN_Y, BALL_Z], phase: "queue" };
}

/** A smooth 0..1..0 bump for something within `reach` of x = `at`. */
export function bump(x, at, reach) {
  const d = Math.abs(x - at) / reach;
  return d >= 1 ? 0 : Math.cos((d * Math.PI) / 2) ** 2;
}
