/**
 * The citation engine model. Pure: no imports, no DOM. build.mjs uses it for
 * the static drawing, and live.js inlines its source (without `export`) so the
 * page moves every part from the same numbers.
 *
 * World units are about 1 px; x runs along the bench, y toward the viewer, z up.
 */

/** Hopper x positions, one per AI engine (same order as LOGOS). */
export const HOPPER_X = [-196, -162, -128, -94, -60];
/** The conveyor runs along this line. */
export const RAIL_Y = -12;
export const RAIL_TOP = 44;
export const RAIL_FROM = -218;
export const RAIL_TO = 152;
/** A capsule (one buyer question) is a ball of this radius. */
export const CAPSULE_R = 4;
/** The hopper mouth, where a capsule leaves the funnel. */
export const MOUTH_Z = 58;
/** The three stations: the stages of the service. */
export const STATIONS = [
  { name: "Indexed", x: -10, dwell: 0.7 },
  { name: "Found", x: 46, dwell: 0.8 },
  { name: "Mentioned", x: 106, dwell: 0.8 },
];
/** Where the capsule enters the house (your site). */
export const HOUSE_X = 168;
export const SPEED = 62;
export const DROP = 0.45;
/** One spawn is one turn of the escapement: one checked change a day. */
export const TURNS_PER_REPORT = 7;
/** Idle spawn interval, seconds. */
export const SPAWN_EVERY = 3.6;

const centreZ = RAIL_TOP + CAPSULE_R;

/** The route of a capsule from hopper `index` as legs: move or dwell. */
export function routeOf(index) {
  const legs = [];
  let x = HOPPER_X[index];
  for (const [i, station] of STATIONS.entries()) {
    legs.push({ kind: "move", from: x, to: station.x, time: (station.x - x) / SPEED, stage: i });
    legs.push({ kind: "dwell", at: station.x, time: station.dwell, stage: i });
    x = station.x;
  }
  legs.push({ kind: "move", from: x, to: HOUSE_X, time: (HOUSE_X - x) / SPEED, stage: 3 });
  return legs;
}

/** Total life of a capsule from hopper `index`, seconds. */
export function lifeOf(index) {
  return DROP + routeOf(index).reduce((sum, leg) => sum + leg.time, 0);
}

/**
 * Where a capsule from hopper `index` is `u` seconds after it left the
 * mouth. `stage` is -1 while it falls, 0..2 at or toward a station, 3 on the
 * way into the house; `at` is 0..1 progress of a dwell (or -1 when moving);
 * `done` is true once it is inside the house.
 */
export function capsuleAt(index, u) {
  const x0 = HOPPER_X[index];
  if (u < DROP) {
    const share = (u / DROP) ** 2;
    return {
      p: [x0, RAIL_Y, MOUTH_Z - (MOUTH_Z - centreZ) * share],
      stage: -1,
      at: -1,
      done: false,
    };
  }
  let t = u - DROP;
  for (const leg of routeOf(index)) {
    if (t <= leg.time) {
      if (leg.kind === "dwell")
        return { p: [leg.at, RAIL_Y, centreZ], stage: leg.stage, at: t / leg.time, done: false };
      const x = leg.from + (leg.to - leg.from) * (t / leg.time);
      return { p: [x, RAIL_Y, centreZ], stage: leg.stage, at: -1, done: false };
    }
    t -= leg.time;
  }
  return { p: [HOUSE_X, RAIL_Y, centreZ], stage: 3, at: -1, done: true };
}

/** How busy a station is, 0..1, given the capsule states: a smooth bump over a dwell. */
export function stationLoad(states, stage) {
  let load = 0;
  for (const s of states) {
    if (s.stage !== stage || s.at < 0) continue;
    load = Math.max(load, Math.sin(Math.PI * Math.min(1, Math.max(0, s.at))));
  }
  return load;
}
