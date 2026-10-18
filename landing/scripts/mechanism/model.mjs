/**
 * The citation engine model. Pure: no imports, no DOM. build.mjs uses it for
 * the static drawing, and live.js inlines its source (without `export`) so the
 * page moves every part from the same numbers.
 *
 * World units are about 1 px; x runs along the bench, y toward the viewer, z up.
 * Flow: AI engine hoppers (input) -> belt through the citata frame, past three
 * stations (Indexed, Found, Mentioned) -> drop tube -> queue -> your business.
 */

/** Hopper x positions, one per AI engine (same order as LOGOS). */
export const HOPPER_X = [-210, -176, -142, -108, -74];
/** The belt runs along this line. */
export const RAIL_Y = -12;
export const RAIL_TOP = 44;
export const RAIL_FROM = -232;
export const RAIL_TO = 148;
/** A capsule (one buyer question) is a ball of this radius. */
export const CAPSULE_R = 4;
/** The hopper mouth, where a capsule leaves the funnel. */
export const MOUTH_Z = 58;
/** The three stations inside the citata frame: the stages of the service. */
export const STATIONS = [
  { name: "Indexed", x: -2 },
  { name: "Found", x: 50 },
  { name: "Mentioned", x: 104 },
];
/** Belt speed and the spacing of the cups (cleats) that carry the capsules. */
export const SPEED = 46;
export const CUP = 26;
/** Fall time from a hopper mouth into a cup. */
export const DROP = 0.42;
/** At the end of the belt a capsule falls down a glass tube to the queue rail. */
export const TUBE_X = 142;
export const QUEUE_Z = 6;
export const TUBE_T = 0.5;
/** The queue runs along the front of the house to its door. */
export const DOOR_X = 178;
export const SLOT = 9;
export const SLOTS = 5;
/** Every 7th capsule that enters rings the bell: the Monday report. */
export const TURNS_PER_REPORT = 7;
/** Idle cadence: a new question about every second. */
export const SPAWN_EVERY = 0.95;

export const BELT_Z = RAIL_TOP + CAPSULE_R;
export const QUEUE_CZ = QUEUE_Z + CAPSULE_R;

/** The x of cup `n` at time `t`. */
export const cupX = (n, t) => n * CUP + SPEED * t;

/** The time cup `n` passes x. */
export const cupTime = (n, x) => (x - n * CUP) / SPEED;

/**
 * The first free cup that reaches hopper `index` no earlier than `soonest`,
 * given the set of taken cups. Returns { cup, land }.
 */
export function nextCup(index, soonest, taken) {
  const x = HOPPER_X[index];
  let cup = Math.floor((x - SPEED * soonest) / CUP);
  while (taken.has(cup)) cup -= 1;
  return { cup, land: cupTime(cup, x) };
}

/**
 * Where a capsule is at time `t`. It rides `cup`, landing under hopper
 * `index` at `land`. phase: "fall" | "belt" | "tube" | "queue".
 * In the queue phase `p` is the tube foot; the live code moves it on.
 */
export function capsuleAt(index, cup, land, t) {
  const x0 = HOPPER_X[index];
  if (t < land) {
    const share = Math.max(0, 1 - (land - t) / DROP) ** 2;
    return { p: [x0, RAIL_Y, MOUTH_Z - (MOUTH_Z - BELT_Z) * share], phase: "fall" };
  }
  const x = cupX(cup, t);
  if (x < TUBE_X) return { p: [x, RAIL_Y, BELT_Z], phase: "belt" };
  const u = (t - cupTime(cup, TUBE_X)) / TUBE_T;
  if (u < 1) return { p: [TUBE_X, RAIL_Y, BELT_Z - (BELT_Z - QUEUE_CZ) * u * u], phase: "tube" };
  return { p: [TUBE_X, RAIL_Y, QUEUE_CZ], phase: "queue" };
}

/** A smooth 0..1..0 bump for a capsule within `reach` of x = `at`. */
export function bump(x, at, reach) {
  const d = Math.abs(x - at) / reach;
  return d >= 1 ? 0 : Math.cos((d * Math.PI) / 2) ** 2;
}
