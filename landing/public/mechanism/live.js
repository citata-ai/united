/* citata.ai citation engine. Built by scripts/mechanism/build.mjs; do not edit.
   Kit: anatomy (MIT), vendor/anatomy. */
(() => {
const AZIMUTH = 45;
const ELEVATION = 30;
const SHADES = 4;
const RADIANS = Math.PI / 180;
const UNIT = Math.sqrt(1.6);
function cameraOf({ scale, azimuth = AZIMUTH, elevation = ELEVATION }) {
    const a = azimuth * RADIANS;
    const e = elevation * RADIANS;
    return { sinA: Math.sin(a), cosA: Math.cos(a), sinE: Math.sin(e), cosE: Math.cos(e), k: scale * UNIT };
}
function iso([x, y, z], projection) {
    const { origin } = projection;
    const { sinA, cosA, sinE, cosE, k } = cameraOf(projection);
    return [origin[0] + (x * sinA - y * cosA) * k, origin[1] + ((x * cosA + y * sinA) * sinE - z * cosE) * k];
}
function towardViewer(projection) {
    const { sinA, cosA } = cameraOf(projection);
    return [cosA, sinA];
}
function depthOf([x, y, z], projection) {
    const { sinA, cosA, sinE, cosE } = cameraOf(projection);
    return (x * cosA + y * sinA) * cosE + z * sinE;
}
const tenth = (value) => {
    const text = (Math.round(value * 10) / 10).toFixed(1).replace(/\.0$/, "");
    return text === "-0" ? "0" : text;
};
function pathOf(points, closed = false) {
    if (!points.length)
        return "";
    return points.map(([x, y], at) => `${at ? "L" : "M"}${tenth(x)} ${tenth(y)}`).join("") + (closed ? "Z" : "");
}
const joinPaths = (paths) => paths.filter(Boolean).join("");
function roundedPlan({ x, y, w, d, r }, steps = 8) {
    const radius = Math.max(0, Math.min(r, w / 2, d / 2));
    const corners = [
        [x + w - radius, y + radius, -90],
        [x + w - radius, y + d - radius, 0],
        [x + radius, y + d - radius, 90],
        [x + radius, y + radius, 180],
    ];
    const out = [];
    for (const [cx, cy, start] of corners) {
        const count = radius > 0 ? steps : 0;
        for (let step = 0; step <= count; step++) {
            const angle = (start + (count ? (90 * step) / count : 45)) * RADIANS;
            out.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
        }
    }
    return out;
}
function signedArea(points) {
    let area = 0;
    for (let index = 0; index < points.length; index++) {
        const [ax, ay] = points[index];
        const [bx, by] = points[(index + 1) % points.length];
        area += ax * by - bx * ay;
    }
    return area / 2;
}
const oriented = (points) => (signedArea(points) < 0 ? [...points].reverse() : points);
function convexHull(points) {
    const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    if (sorted.length < 3)
        return sorted;
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower = [];
    for (const point of sorted) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0)
            lower.pop();
        lower.push(point);
    }
    const upper = [];
    for (let index = sorted.length - 1; index >= 0; index--) {
        const point = sorted[index];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0)
            upper.pop();
        upper.push(point);
    }
    return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}
function runsOf(flags, want) {
    const count = flags.length;
    const runs = [];
    const start = flags.findIndex((flag, index) => flag !== flags[(index + count - 1) % count]);
    if (start < 0)
        return flags[0] === want ? [Array.from({ length: count + 1 }, (_, index) => index % count)] : [];
    let run = null;
    for (let step = 0; step < count; step++) {
        const index = (start + step) % count;
        if (flags[index] === want) {
            if (!run)
                run = [index];
            run.push((index + 1) % count);
        }
        else if (run) {
            runs.push(run);
            run = null;
        }
    }
    if (run)
        runs.push(run);
    return runs;
}
function extrude(ring, z, height, projection, options = {}) {
    const convex = options.convex ?? true;
    const count = ring.length;
    const counter = signedArea(ring) > 0;
    const [vx, vy] = towardViewer(projection);
    const { sinA, cosA } = cameraOf(projection);
    const normals = ring.map(([ax, ay], index) => {
        const [bx, by] = ring[(index + 1) % count];
        const dx = bx - ax;
        const dy = by - ay;
        const length = Math.hypot(dx, dy) || 1;
        return (counter ? [dy / length, -dx / length] : [-dy / length, dx / length]);
    });
    const facing = normals.map(([nx, ny]) => nx * vx + ny * vy > 1e-9);
    const top = ring.map(([x, y]) => iso([x, y, z + height], projection));
    const bottom = ring.map(([x, y]) => iso([x, y, z], projection));
    const outline = [];
    const crease = [];
    for (const run of runsOf(facing, false))
        outline.push(pathOf(run.map((index) => top[index])));
    for (const run of runsOf(facing, true)) {
        crease.push(pathOf(run.map((index) => top[index])));
        if (height > 0)
            outline.push(pathOf(run.map((index) => bottom[index])));
    }
    if (height > 0) {
        for (let index = 0; index < count; index++) {
            if (facing[(index + count - 1) % count] !== facing[index])
                outline.push(pathOf([top[index], bottom[index]]));
        }
    }
    let fill;
    if (convex) {
        fill = pathOf(convexHull([...top, ...bottom]), true);
    }
    else {
        const parts = [pathOf(oriented(top), true), pathOf(oriented(bottom), true)];
        for (let index = 0; index < count; index++) {
            if (!facing[index])
                continue;
            const next = (index + 1) % count;
            parts.push(pathOf(oriented([top[index], top[next], bottom[next], bottom[index]]), true));
        }
        fill = parts.join("");
    }
    const buckets = Array.from({ length: SHADES }, () => []);
    if (height > 0) {
        const [lx, ly] = [-sinA, cosA];
        for (let index = 0; index < count; index++) {
            if (!facing[index])
                continue;
            const [nx, ny] = normals[index];
            const lit = (nx * lx + ny * ly + 1) / 2;
            const shade = Math.min(SHADES - 1, Math.max(0, Math.floor(lit * SHADES)));
            const next = (index + 1) % count;
            buckets[shade].push(pathOf(oriented([top[index], top[next], bottom[next], bottom[index]]), true));
        }
    }
    let bevel;
    if (options.bevel && options.bevel > 0) {
        const by = options.bevel;
        const inset = ring.map(([x, y], index) => {
            const [ax, ay] = normals[(index + count - 1) % count];
            const [bx, by2] = normals[index];
            const mx = ax + bx;
            const my = ay + by2;
            const length = Math.hypot(mx, my) || 1;
            return [x - (mx / length) * by, y - (my / length) * by];
        });
        const insetTop = inset.map(([x, y]) => iso([x, y, z + height], projection));
        bevel = runsOf(facing, true)
            .map((run) => pathOf([top[run[0]], ...run.slice(1, -1).map((index) => insetTop[index]), top[run[run.length - 1]]]))
            .join("");
    }
    return {
        fill,
        outline: outline.join(""),
        crease: crease.join(""),
        top: pathOf(oriented(top), true),
        shades: buckets.map((paths) => paths.join("")),
        bevel,
    };
}
const ringOf = (plan, steps = 8) => roundedPlan(plan, steps);
function slabOf(plan, z, height, projection, steps = 8, bevel = 0) {
    return extrude(ringOf(plan, steps), z, height, projection, { convex: true, bevel });
}
function circleRing(cx, cy, radius, steps = 40) {
    return Array.from({ length: steps }, (_, step) => {
        const angle = (step / steps) * Math.PI * 2;
        return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
    });
}
function cylinder(cx, cy, radius, z, height, projection, steps = 32, bevel = 0) {
    return extrude(circleRing(cx, cy, radius, steps), z, height, projection, { convex: true, bevel });
}
const insetPlan = ({ x, y, w, d, r }, by) => ({ x: x + by, y: y + by, w: w - by * 2, d: d - by * 2, r: Math.max(0, r - by) });
function onTop(points, z, projection, closed = false) {
    return pathOf(points.map(([x, y]) => iso([x, y, z], projection)), closed);
}
const planOutline = (plan, z, projection, steps = 8) => onTop(ringOf(plan, steps), z, projection, true);
const lineOnTop = (from, to, z, projection) => onTop([from, to], z, projection);
const segment = (from, to, projection) => pathOf([iso(from, projection), iso(to, projection)]);
const rise = (at, from, to, projection) => segment([at[0], at[1], from], [at[0], at[1], to], projection);
const ring = (cx, cy, radius, z, projection, steps = 40) => onTop(circleRing(cx, cy, radius, steps), z, projection, true);
const pointsAt = (points, projection) => points.map((point) => iso(point, projection));
function dotGrid(x, y, columns, rows, gap, z, projection) {
    const dots = [];
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++)
            dots.push(iso([x + column * gap, y + row * gap, z], projection));
    }
    return dots;
}
function corners({ x, y, w, d }, inset = 0) {
    return [
        [x + inset, y + inset],
        [x + w - inset, y + inset],
        [x + inset, y + d - inset],
        [x + w - inset, y + d - inset],
    ];
}
function boxCorners({ x, y, w, d }, z0, z1) {
    const out = [];
    for (const px of [x, x + w])
        for (const py of [y, y + d])
            for (const z of [z0, z1])
                out.push([px, py, z]);
    return out;
}
function knurl(cx, cy, radius, z0, z1, count, projection, inset = 0.4) {
    const [vx, vy] = towardViewer(projection);
    const lines = [];
    for (let index = 0; index < count; index++) {
        const angle = (index / count) * Math.PI * 2;
        const nx = Math.cos(angle);
        const ny = Math.sin(angle);
        if (nx * vx + ny * vy < 0.15)
            continue;
        lines.push(segment([cx + radius * nx, cy + radius * ny, z0 + inset], [cx + radius * nx, cy + radius * ny, z1 - inset], projection));
    }
    return lines.join("");
}
function sideArc(cx, cy, radius, z, projection, steps = 24) {
    const [vx, vy] = towardViewer(projection);
    const facing = Math.atan2(vy, vx);
    const points = [];
    for (let step = 0; step <= steps; step++) {
        const angle = facing - Math.PI / 2 + (step / steps) * Math.PI;
        points.push(iso([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), z], projection));
    }
    return pathOf(points);
}
function ringSeam(ring, z, projection) {
    const count = ring.length;
    const counter = signedArea(ring) > 0;
    const [vx, vy] = towardViewer(projection);
    const facing = ring.map(([ax, ay], index) => {
        const [bx, by] = ring[(index + 1) % count];
        const dx = bx - ax;
        const dy = by - ay;
        const [nx, ny] = counter ? [dy, -dx] : [-dy, dx];
        return nx * vx + ny * vy > 1e-9;
    });
    return runsOf(facing, true).map((run) => pathOf(run.map((index) => iso([ring[index][0], ring[index][1], z], projection)))).join("");
}
const sideSeam = (plan, z, projection, steps = 8) => ringSeam(ringOf(plan, steps), z, projection);
function sideRing(center, radius, axis, projection, steps = 20) {
    const [px, py, pz] = center;
    const points = [];
    for (let step = 0; step < steps; step++) {
        const angle = (step / steps) * Math.PI * 2;
        const u = radius * Math.cos(angle);
        const v = radius * Math.sin(angle);
        points.push(iso(axis === "x" ? [px, py + u, pz + v] : [px + u, py, pz + v], projection));
    }
    return pathOf(points, true);
}
function coil(from, to, center, radius, turns, axis, projection, perTurn = 16) {
    const count = Math.max(1, Math.round(turns * perTurn));
    const back = [];
    const front = [];
    let run = [];
    let near = null;
    for (let index = 0; index <= count; index++) {
        const share = index / count;
        const angle = share * turns * Math.PI * 2;
        const u = radius * Math.cos(angle);
        const v = radius * Math.sin(angle);
        const along = from + (to - from) * share;
        const point = axis === "x" ? [along, center[0] + u, center[1] + v] : [center[0] + u, along, center[1] + v];
        const normal = axis === "x" ? [0, Math.cos(angle), Math.sin(angle)] : [Math.cos(angle), 0, Math.sin(angle)];
        const facing = depthOf(normal, projection) > 0;
        const flat = iso(point, projection);
        if (near === null)
            near = facing;
        if (facing !== near) {
            run.push(flat);
            (near ? front : back).push(pathOf(run));
            run = [flat];
            near = facing;
            continue;
        }
        run.push(flat);
    }
    if (run.length > 1)
        (near ? front : back).push(pathOf(run));
    return { back: back.join(""), front: front.join("") };
}
function topTicks(from, to, step, every, edge, z, lengths, projection, axis = "x") {
    const minor = [];
    const major = [];
    const first = Math.ceil(from / step) * step;
    for (let at = first, index = Math.round(first / step); at <= to + 1e-9; at += step, index++) {
        const big = index % every === 0;
        const length = big ? lengths[1] : lengths[0];
        const a = axis === "x" ? [at, edge] : [edge, at];
        const b = axis === "x" ? [at, edge + length] : [edge + length, at];
        (big ? major : minor).push(lineOnTop(a, b, z, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
function sideTicks(from, to, step, every, face, top, lengths, projection, axis = "x") {
    const minor = [];
    const major = [];
    const first = Math.ceil(from / step) * step;
    for (let at = first, index = Math.round(first / step); at <= to + 1e-9; at += step, index++) {
        const big = index % every === 0;
        const length = big ? lengths[1] : lengths[0];
        const a = axis === "x" ? [at, face, top] : [face, at, top];
        const b = axis === "x" ? [at, face, top - length] : [face, at, top - length];
        (big ? major : minor).push(segment(a, b, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
function radialTicks(cx, cy, radius, count, every, z, lengths, projection, from = 0, span = Math.PI * 2) {
    const minor = [];
    const major = [];
    const closed = Math.abs(span - Math.PI * 2) < 1e-9;
    const steps = closed ? count : count + 1;
    for (let index = 0; index < steps; index++) {
        const angle = from + (index / count) * span;
        const big = index % every === 0;
        const inner = radius - (big ? lengths[1] : lengths[0]);
        const sx = Math.sin(angle);
        const sy = -Math.cos(angle);
        (big ? major : minor).push(lineOnTop([cx + sx * inner, cy + sy * inner], [cx + sx * radius, cy + sy * radius], z, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
const haloOf = (plan, z, height, projection) => slabOf(plan, z, height, projection).fill;
function axisVector(projection, [dx, dy, dz]) {
    const origin = iso([0, 0, 0], projection);
    const moved = iso([dx, dy, dz], projection);
    return [moved[0] - origin[0], moved[1] - origin[1]];
}
const fine = (value) => Math.round(value * 100) / 100;
function translateAlong(projection, by) {
    const [x, y] = axisVector(projection, by);
    return `translate(${fine(x)} ${fine(y)})`;
}
const thousandth = (value) => Math.round(value * 1000) / 1000;
function axesAt(at, z, projection) {
    const origin = iso([at[0], at[1], z], projection);
    const along = (point) => {
        const [px, py] = iso(point, projection);
        return [px - origin[0], py - origin[1]];
    };
    return { origin, x: along([at[0] + 1, at[1], z]), y: along([at[0], at[1] + 1, z]), z: along([at[0], at[1], z + 1]) };
}
const matrixOf = (u, v, origin) => `matrix(${thousandth(u[0])} ${thousandth(u[1])} ${thousandth(v[0])} ${thousandth(v[1])} ${thousandth(origin[0])} ${thousandth(origin[1])})`;
function holdStill(element, [dx, dy]) {
    const text = dx || dy ? `translate(${-dx} ${-dy})` : "";
    element.querySelectorAll("[data-hold]").forEach((node) => (text ? node.setAttribute("transform", text) : node.removeAttribute("transform")));
}
function topMatrix(at, z, projection, along = "x") {
    const { origin, x, y } = axesAt(at, z, projection);
    return along === "x" ? matrixOf(x, y, origin) : matrixOf([-y[0], -y[1]], x, origin);
}
function sideMatrix(at, z, projection, face) {
    const { origin, x, y, z: up } = axesAt(at, z, projection);
    const down = [-up[0], -up[1]];
    return face === "left" ? matrixOf(x, down, origin) : matrixOf([-y[0], -y[1]], down, origin);
}
function screenRise(height, projection) {
    const { cosE, k } = cameraOf(projection);
    return height * cosE * k;
}
function fitProjection(points, width, height, { pad = 24, headroom = 0, azimuth = AZIMUTH, elevation = ELEVATION } = {}) {
    const unit = { origin: [0, 0], scale: 1, azimuth, elevation };
    const flat = points.map((point) => iso(point, unit));
    const xs = flat.map(([x]) => x);
    const ys = flat.map(([, y]) => y);
    const left = Math.min(...xs);
    const right = Math.max(...xs);
    const up = Math.min(...ys);
    const down = Math.max(...ys);
    const scale = Math.min((width - pad * 2) / (right - left), (height - pad * 2 - headroom) / (down - up));
    return {
        origin: [width / 2 - ((left + right) / 2) * scale, headroom + (height - headroom) / 2 - ((up + down) / 2) * scale],
        scale,
        azimuth,
        elevation,
    };
}
const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attrs = (pairs) => Object.entries(pairs)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([key, value]) => ` ${key}="${escape(String(value))}"`)
    .join("");
function solidSvg(paths, { tone = "hi", crease = "faint", halo = false, lit = false, flat = false, className, inner = "" } = {}) {
    const parts = [];
    if (halo)
        parts.push(`<path class="iso-halo" d="${paths.fill}"/>`);
    parts.push(`<path class="iso-fill" d="${paths.fill}"/>`);
    if (!flat) {
        paths.shades.forEach((d, shade) => {
            if (d)
                parts.push(`<path class="iso-shade" data-shade="${shade}" d="${d}"/>`);
        });
        parts.push(`<path class="iso-top" d="${paths.top}"/>`);
    }
    if (crease !== "none" && paths.crease)
        parts.push(`<path class="iso-line iso-crease" data-tone="${crease}" d="${paths.crease}"/>`);
    if (crease !== "none" && paths.bevel)
        parts.push(`<path class="iso-line iso-bevel" data-tone="${crease}" d="${paths.bevel}"/>`);
    if (inner)
        parts.push(inner);
    parts.push(`<path class="iso-line iso-edge" data-tone="${tone}" d="${paths.outline}"/>`);
    return `<g${attrs({ class: className ? `iso-solid ${className}` : "iso-solid", "data-lit": lit ? "" : undefined, "data-seamless": paths.seamless ? "" : undefined })}>${parts.join("")}</g>`;
}
function lineSvg(d, { tone = "lo", dotted = false, dashed = false, flow = false, className, free } = {}) {
    if (!d)
        return "";
    return `<path${attrs({
        class: className ? `iso-line ${className}` : "iso-line",
        "data-tone": tone,
        "data-free": free === true ? "" : free || undefined,
        "data-dotted": dotted ? "" : undefined,
        "data-dashed": dashed ? "" : undefined,
        "data-flow": flow ? "" : undefined,
        d,
    })}/>`;
}
function dotsSvg(points, { size = 0.5, tone = "mid", pulse = false } = {}) {
    const dots = points
        .map(([x, y, alpha], index) => `<circle cx="${tenth(x)}" cy="${tenth(y)}" r="${size}"${alpha !== undefined && alpha < 1 ? ` fill-opacity="${Math.max(0, alpha).toFixed(2)}"` : ""}${pulse ? ` data-pulse="" style="--pulse-at:${(index * 137) % 1600}ms"` : ""}/>`)
        .join("");
    return `<g class="iso-dots" data-tone="${tone}">${dots}</g>`;
}
function fadedSvg(list, style = {}) {
    const groups = new Map();
    for (const entry of list) {
        const [d, alpha] = Array.isArray(entry) ? entry : [entry.d, entry.alpha];
        if (!d || !(alpha > 0.02))
            continue;
        const level = Math.min(1, Math.round(alpha * 20) / 20);
        groups.set(level, (groups.get(level) ?? "") + d);
    }
    return [...groups].map(([alpha, d]) => (alpha >= 1 ? lineSvg(d, style) : `<g opacity="${alpha.toFixed(2)}">${lineSvg(d, style)}</g>`)).join("");
}
function fadeLineSvg(points, { fade = [0, 0], tone = "lo", className, stops = 6 } = {}) {
    if (points.length < 2)
        return "";
    const ease = (t) => t * t * (3 - 2 * t);
    const hashOf = (text) => {
        let hash = 2166136261;
        for (let index = 0; index < text.length; index++)
            hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
        return (hash >>> 0).toString(36);
    };
    const lengths = [0];
    for (let index = 1; index < points.length; index++)
        lengths.push(lengths[index - 1] + Math.hypot(points[index][0] - points[index - 1][0], points[index][1] - points[index - 1][1]));
    const at = (length) => {
        let index = 1;
        while (index < points.length - 1 && lengths[index] < length)
            index++;
        const span = lengths[index] - lengths[index - 1] || 1;
        const t = Math.max(0, Math.min(1, (length - lengths[index - 1]) / span));
        return [points[index - 1][0] + (points[index][0] - points[index - 1][0]) * t, points[index - 1][1] + (points[index][1] - points[index - 1][1]) * t];
    };
    const pieceOf = (from, to) => [at(from), ...points.filter((_, index) => lengths[index] > from + 1e-6 && lengths[index] < to - 1e-6), at(to)];
    const total = lengths[lengths.length - 1];
    if (total < 1e-6)
        return "";
    let [start, end] = Array.isArray(fade) ? fade : [fade, fade];
    if (start + end > total) {
        const share = total / (start + end);
        start *= share;
        end *= share;
    }
    const paint = `var(--anatomy-${tone})`;
    const ramp = (piece, rising) => {
        const d = pathOf(piece);
        const [x1, y1] = piece[0];
        const [x2, y2] = piece[piece.length - 1];
        const id = `iso-fade-${hashOf(`${d}|${tone}|${rising}`)}`;
        const marks = Array.from({ length: stops + 1 }, (_, index) => {
            const t = index / stops;
            const alpha = ease(rising ? t : 1 - t);
            return `<stop offset="${t.toFixed(3)}" stop-opacity="${alpha.toFixed(3)}" style="stop-color:${paint}"/>`;
        }).join("");
        const gradient = `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${tenth(x1)}" y1="${tenth(y1)}" x2="${tenth(x2)}" y2="${tenth(y2)}">${marks}</linearGradient>`;
        return `<defs>${gradient}</defs><path${attrs({ class: className ? `iso-line ${className}` : "iso-line", "data-tone": tone, "data-free": rising ? "start" : "end", d, style: `stroke:url(#${id})` })}/>`;
    };
    const parts = [];
    if (start > 0.05)
        parts.push(ramp(pieceOf(0, start), true));
    if (total - end - start > 0.05)
        parts.push(lineSvg(pathOf(pieceOf(start, total - end)), { tone, className }));
    if (end > 0.05)
        parts.push(ramp(pieceOf(total - end, total), false));
    return `<g class="iso-fade">${parts.join("")}</g>`;
}
function wireSvg(from, to, { via = [], tone = "lo", dotted = false, dashed = false, flow = false, ends = "both", size = 1.2 } = {}) {
    const d = pathOf([from, ...via, to]);
    const end = ([x, y]) => `<circle class="iso-wire-end" cx="${tenth(x)}" cy="${tenth(y)}" r="${size}"/>`;
    return `<g class="iso-wire" data-tone="${tone}">${lineSvg(d, { tone, dotted, dashed, flow })}${ends === "both" || ends === "from" ? end(from) : ""}${ends === "both" || ends === "to" ? end(to) : ""}</g>`;
}
function faceTextSvg(transform, text, { size = 3, tone = "mid", anchor = "start" } = {}) {
    return `<text class="iso-face-text" data-tone="${tone}" transform="${transform}" font-size="${size}" text-anchor="${anchor}">${escape(text)}</text>`;
}
function groupSvg(children, extra = {}) {
    return `<g${attrs(extra)}>${Array.isArray(children) ? children.join("") : children}</g>`;
}
function figureSvg({ width, height, label, body, standalone = false, className }) {
    const style = standalone ? `<style>${ISO_CSS}</style>` : "";
    return `<svg${attrs({
        xmlns: "http://www.w3.org/2000/svg",
        class: `iso-svg${standalone ? " iso" : ""}${className ? ` ${className}` : ""}`,
        "data-theme": standalone || undefined,
        viewBox: `0 0 ${width} ${height}`,
        role: "img",
        "aria-label": label,
    })}>${style}${Array.isArray(body) ? body.join("") : body}</svg>`;
}
function swatchSvg(mark) {
    if (mark === "raised" || mark === "flat" || mark === "lit") {
        const body = mark === "flat" ? "M2 6.5 8 3.5 14 6.5 8 9.5Z" : "M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z";
        const crease = mark === "flat" ? "" : `<path class="iso-swatch-crease" d="M2 4.5 8 7.5 14 4.5"/>`;
        return `<svg class="iso-swatch" data-mark="${mark}" viewBox="0 0 16 10" aria-hidden="true"><path d="${body}"/>${crease}</svg>`;
    }
    return `<svg class="iso-swatch" data-mark="${mark}" viewBox="0 0 16 10" aria-hidden="true"><path d="M1.5 5h13"/></svg>`;
}
function plateHtml({ fig, title, hint, readout = "", keys = [], caption, body }) {
    const corner = (name, text, extra = "") => `<span class="iso-plate-corner" data-corner="${name}"${extra}>${escape(text)}</span>`;
    const legend = keys.length || caption
        ? `<figcaption class="iso-legend">${keys.length ? `<span class="iso-keys">${keys.map((key) => `<span class="iso-key">${swatchSvg(key.mark)}${escape(key.label)}</span>`).join("")}</span>` : ""}${caption ? `<span class="iso-caption">${escape(caption)}</span>` : ""}</figcaption>`
        : "";
    return `<figure class="iso-figure"><div class="iso-plate"><div class="iso-plate-corners" aria-hidden="true">${corner("fig", fig)}${title ? corner("title", title) : ""}${hint ? corner("hint", hint) : ""}${corner("readout", readout, " data-readout")}</div>${body}</div>${legend}</figure>`;
}
function pageHtml({ title, theme = "dark", body, script = "", width = 650 }) {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)}</title><style>${ISO_CSS}${PAGE_CSS.replace("__WIDTH__", String(width))}</style></head><body class="iso" data-theme="${theme}"><main class="iso-page">${body}</main>${script ? `<script type="module">${script.replace(/<\/(script)/gi, "<\\/$1")}</script>` : ""}</body></html>`;
}
const PAGE_CSS = `
*{box-sizing:border-box}
html{color-scheme:dark}
body[data-theme="light"]{color-scheme:light}
body{margin:0;background:var(--anatomy-page);color:var(--anatomy-text);font:14px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
.iso-page{width:min(__WIDTH__px,100% - 32px);margin:64px auto 96px}
`;
const ISO_CSS = `
.iso{
  --anatomy-page:#0b0b0b;--anatomy-card:#131313;--anatomy-text:#a3a3a3;--anatomy-strong:#e6e6e6;--anatomy-muted:#6e6e6e;
  --anatomy-paper:#131313;--anatomy-face:#1b1b1b;--anatomy-top:#1c1c1c;
  --anatomy-shade-0:#0f0f0f;--anatomy-shade-1:#121212;--anatomy-shade-2:#151515;--anatomy-shade-3:#181818;
  --anatomy-lit-top:#262626;--anatomy-lit-shade:#1d1d1d;
  --anatomy-hi:#d4d4d4;--anatomy-mid:#6a6a6a;--anatomy-lo:#3e3e3e;--anatomy-faint:#2a2a2a;--anatomy-lit:#ffffff;
  --anatomy-halo:#050505;--anatomy-halo-opacity:.9;--anatomy-dot:#e6e6e6;
  --anatomy-red:#ff6b6b;--anatomy-green:#6be0a0;--anatomy-blue:#6b9bff;
  --anatomy-weight:.6px;--anatomy-ease:cubic-bezier(.32,.72,0,1);
  --anatomy-mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --anatomy-lift:inset 0 1px 0 0 #ffffff0a,inset 0 0 0 1px #ffffff06,0 0 0 1px #00000026,0 1px 1px -.5px #00000014,0 3px 3px -1.5px #00000014,0 6px 6px -3px #00000014,0 12px 12px -6px #00000014;
}
.iso[data-theme="light"]{
  --anatomy-page:#f2f2ef;--anatomy-card:#fbfbfa;--anatomy-text:#57575a;--anatomy-strong:#18181a;--anatomy-muted:#8c8c90;
  --anatomy-paper:#fbfbfa;--anatomy-face:#ffffff;--anatomy-top:#ffffff;
  --anatomy-shade-0:#dcdcd9;--anatomy-shade-1:#e5e5e2;--anatomy-shade-2:#ededea;--anatomy-shade-3:#f4f4f1;
  --anatomy-lit-top:#ffffff;--anatomy-lit-shade:#eeeeeb;
  --anatomy-hi:#26262a;--anatomy-mid:#8a8a8f;--anatomy-lo:#b4b4b8;--anatomy-faint:#d4d4d6;--anatomy-lit:#000000;
  --anatomy-halo:#8a8a80;--anatomy-halo-opacity:.32;--anatomy-dot:#3a3a3e;
  --anatomy-red:#e5484d;--anatomy-green:#30a46c;--anatomy-blue:#3e63dd;
  --anatomy-lift:inset 0 1px 0 0 #ffffff,0 0 0 1px #0000000f,0 1px 1px -.5px #0000000a,0 3px 3px -1.5px #0000000a,0 6px 6px -3px #0000000a,0 12px 12px -6px #0000000a;
}
.iso-svg{display:block;width:100%;height:auto;overflow:visible}
.iso-svg path,.iso-svg circle{vector-effect:non-scaling-stroke}
.iso-fill{fill:var(--anatomy-paper);stroke:none}
.iso-solid[data-lit]>.iso-fill{fill:var(--anatomy-face)}
.iso-shade,.iso-top{stroke:none}
.iso-shade[data-shade="0"]{fill:var(--anatomy-shade-0)}
.iso-shade[data-shade="1"]{fill:var(--anatomy-shade-1)}
.iso-shade[data-shade="2"]{fill:var(--anatomy-shade-2)}
.iso-shade[data-shade="3"]{fill:var(--anatomy-shade-3)}
.iso-top{fill:var(--anatomy-top)}
.iso-solid[data-lit]>.iso-top{fill:var(--anatomy-lit-top)}
.iso-solid[data-lit]>.iso-shade{fill:var(--anatomy-lit-shade)}
.iso-solid[data-seamless]>.iso-shade,.iso-solid[data-seamless]>.iso-top{stroke-width:.4;stroke-linejoin:round}
.iso-solid[data-seamless]>.iso-shade[data-shade="0"]{stroke:var(--anatomy-shade-0)}
.iso-solid[data-seamless]>.iso-shade[data-shade="1"]{stroke:var(--anatomy-shade-1)}
.iso-solid[data-seamless]>.iso-shade[data-shade="2"]{stroke:var(--anatomy-shade-2)}
.iso-solid[data-seamless]>.iso-shade[data-shade="3"]{stroke:var(--anatomy-shade-3)}
.iso-solid[data-seamless]>.iso-top{stroke:var(--anatomy-top)}
.iso-solid[data-seamless][data-lit]>.iso-top{stroke:var(--anatomy-lit-top)}
.iso-solid[data-seamless][data-lit]>.iso-shade{stroke:var(--anatomy-lit-shade)}
.iso-solid[data-lit]>.iso-edge{stroke:var(--anatomy-lit)}
.iso-halo{fill:var(--anatomy-halo);stroke:none;filter:blur(9px);opacity:var(--anatomy-halo-opacity);transform:translateY(3px)}
.iso-line{fill:none;stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight);stroke-linecap:round;stroke-linejoin:round}
.iso-line[data-tone="hi"]{stroke:var(--anatomy-hi)}
.iso-line[data-tone="mid"]{stroke:var(--anatomy-mid)}
.iso-line[data-tone="lo"]{stroke:var(--anatomy-lo)}
.iso-line[data-tone="faint"]{stroke:var(--anatomy-faint)}
.iso-line[data-tone="lit"]{stroke:var(--anatomy-lit)}
.iso-line[data-tone="red"]{stroke:var(--anatomy-red)}
.iso-line[data-tone="green"]{stroke:var(--anatomy-green)}
.iso-line[data-tone="blue"]{stroke:var(--anatomy-blue)}
.iso-line[data-dotted]{stroke-dasharray:.01 3.5;stroke-width:1}
.iso-line[data-dashed]{stroke-dasharray:3 3}
.iso-line[data-flow]{stroke-dasharray:2 6}
.iso-wire-end{fill:var(--anatomy-paper);stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight)}
.iso-wire[data-tone="hi"] .iso-wire-end{stroke:var(--anatomy-hi)}
.iso-wire[data-tone="mid"] .iso-wire-end{stroke:var(--anatomy-mid)}
.iso-wire[data-tone="faint"] .iso-wire-end{stroke:var(--anatomy-faint)}
.iso-wire[data-tone="lit"] .iso-wire-end{stroke:var(--anatomy-lit)}
.iso-dots circle{fill:var(--anatomy-dot);stroke:none;opacity:.32}
.iso-dots[data-tone="hi"] circle{opacity:.85}
.iso-dots[data-tone="mid"] circle{opacity:.45}
.iso-dots[data-tone="lo"] circle{opacity:.22}
.iso-dots[data-tone="faint"] circle{opacity:.12}
.iso-face-text{fill:var(--anatomy-mid);font-family:var(--anatomy-mono);letter-spacing:.04em}
.iso-face-text[data-tone="hi"]{fill:var(--anatomy-hi)}
.iso-face-text[data-tone="lo"]{fill:var(--anatomy-lo)}
.iso-face-text[data-tone="faint"]{fill:var(--anatomy-faint)}
.tb-body{fill:var(--anatomy-shade-2);stroke:none}
.tb-shine{fill:var(--anatomy-top);stroke:none}
.tb-shade{fill:var(--anatomy-shade-0);stroke:none}
.tb-ring{fill:none;stroke:var(--anatomy-lo);stroke-width:.45;stroke-linecap:butt;stroke-linejoin:round}
.tb-ring[data-tone="mid"]{stroke:var(--anatomy-mid)}
.tb-ring[data-tone="faint"]{stroke:var(--anatomy-faint)}
.tb-ring[data-tone="hi"]{stroke:var(--anatomy-hi)}
@keyframes iso-flow{to{stroke-dashoffset:-32}}
@keyframes iso-pulse{0%,100%{opacity:.18}12%{opacity:1}40%{opacity:.18}}
.iso-line[data-flow]{animation:iso-flow 1600ms linear infinite}
.iso-dots circle[data-pulse]{animation:iso-pulse 1600ms steps(1,end) infinite;animation-delay:var(--pulse-at,0ms)}
.iso-figure{margin:32px 0 36px}
.iso-plate{position:relative;padding:52px 24px;border-radius:0;background:var(--anatomy-card);box-shadow:0 0 0 1px var(--anatomy-mid);--anatomy-paper:var(--anatomy-card)}
.iso-plate-corners{position:absolute;inset:18px 20px;pointer-events:none}
.iso-plate-corner{position:absolute;color:var(--anatomy-muted);font-family:var(--anatomy-mono);font-size:10.5px;line-height:1;letter-spacing:.04em;white-space:nowrap}
.iso-plate-corner[data-corner="fig"]{top:0;left:0;color:var(--anatomy-text)}
.iso-plate-corner[data-corner="title"]{top:0;right:0;text-transform:uppercase;letter-spacing:.1em}
.iso-plate-corner[data-corner="hint"]{bottom:0;left:0;text-transform:uppercase;letter-spacing:.1em}
.iso-plate-corner[data-corner="readout"]{right:0;bottom:0;color:var(--anatomy-text);font-variant-numeric:tabular-nums}
.iso-plate .iso-svg{margin:0 auto}
.iso-legend{display:grid;gap:8px;margin-top:12px;color:var(--anatomy-muted);font-size:13px;line-height:1.55}
.iso-keys{display:flex;flex-wrap:wrap;gap:6px 18px}
.iso-key{display:inline-flex;align-items:center;gap:7px}
.iso-swatch{width:16px;height:10px;flex:none;overflow:visible}
.iso-swatch path{fill:none;stroke:var(--anatomy-hi);stroke-width:1;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}
.iso-swatch[data-mark="raised"] path,.iso-swatch[data-mark="flat"] path{stroke:var(--anatomy-mid)}
.iso-swatch[data-mark="lit"] path{stroke:var(--anatomy-lit)}
.iso-swatch[data-mark="dim"] path{stroke:var(--anatomy-lo)}
.iso-swatch[data-mark="dotted"] path{stroke-dasharray:.01 3;stroke-width:1.4}
.iso-swatch[data-mark="dashed"] path{stroke-dasharray:3 2.5}
.iso-swatch[data-mark="red"] path{stroke:var(--anatomy-red)}
.iso-swatch[data-mark="green"] path{stroke:var(--anatomy-green)}
.iso-swatch[data-mark="blue"] path{stroke:var(--anatomy-blue)}
.iso-swatch-crease{stroke:var(--anatomy-lo)!important}
@media (max-width:560px){.iso-plate{padding:48px 12px 70px}.iso-plate-corner[data-corner="hint"]{bottom:18px}}
@media (prefers-reduced-motion:reduce){.iso-line[data-flow],.iso-dots circle[data-pulse]{animation:none}}
`;

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
const BELT_Y = -48;
const BELT_TOP = 44;
const BELT_FROM = -222;
const BELT_TO = 232;
const SPEED = 44;
const CUP = 24;
/** Pages leave your site here. */
const PAGE_X = -214;
/** The three stations inside the citata frame. */
const STATIONS = [
  { name: "Indexed", x: -140 },
  { name: "Found", x: -84 },
  { name: "Mentioned", x: -28 },
];
/** AI engine receivers above the belt, one per engine (same order as LOGOS). */
const ENGINE_X = [62, 96, 130, 164, 198];
const MOUTH_Z = 58;
/** A page rises into the receiver mouth in this time. */
const LIFT = 0.38;

// --- Lower belt: buyers, right to left ------------------------------------
const RETURN_Y = -26;
const RETURN_TOP = 10;
const RETURN_FROM = -150;
const RETURN_TO = 232;
const RETURN_SPEED = 54;
/** The receiver sends a buyer out of its spout, which falls to the lower belt. */
const SPOUT_Z = 72;
const FALL = 0.42;
const SEND_AFTER = 0.25;
/** Buyers leave the belt onto the queue rail at RETURN_FROM and roll to a slot. */
const DOOR_X = -214;
const SLOT = 9;
const SLOTS = 7;
const BALL_R = 4;

/** Every 7th buyer who goes in rings the bell: the Monday report. */
const TURNS_PER_REPORT = 7;
/** Idle cadence: a new page about every second. */
const PAGE_EVERY = 0.9;

const BALL_Z = RETURN_TOP + BALL_R;

/** Upper belt: x of cup `n` at time `t`, and the time cup `n` passes x. */
const cupX = (n, t) => n * CUP + SPEED * t;
const cupTime = (n, x) => (x - n * CUP) / SPEED;

/** Lower belt runs the other way. */
const backX = (n, t) => n * CUP - RETURN_SPEED * t;
const backTime = (n, x) => (n * CUP - x) / RETURN_SPEED;

/** The first free upper cup that passes the site outlet no earlier than `soonest`. */
function pageCup(soonest, taken) {
  let cup = Math.floor((PAGE_X - SPEED * soonest) / CUP);
  while (taken.has(cup)) cup -= 1;
  return cup;
}

/** The first free lower cup under x no earlier than `soonest`. Returns { cup, land }. */
function buyerCup(x, soonest, taken) {
  let cup = Math.ceil((x + RETURN_SPEED * soonest) / CUP);
  while (taken.has(cup)) cup += 1;
  return { cup, land: backTime(cup, x) };
}

/**
 * A page on cup `cup`, bound for engine `engine`, at time `t`.
 * phase: "wait" (still inside the site) | "belt" | "lift" | "gone".
 */
function pageAt(cup, engine, t) {
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
const pageDone = (cup, engine) => cupTime(cup, ENGINE_X[engine]) + LIFT;

/**
 * A buyer sent by `engine` on lower cup `cup` that lands at `land`, at time `t`.
 * phase: "wait" | "fall" | "belt" | "queue" (then the live code moves it on).
 */
function buyerAt(engine, cup, land, t) {
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
function bump(x, at, reach) {
  const d = Math.abs(x - at) / reach;
  return d >= 1 ? 0 : Math.cos((d * Math.PI) / 2) ** 2;
}


const P = {"origin":[426.2678202299965,288.5157291438784],"scale":1.1723340147217847,"azimuth":58,"elevation":30};
const ENGINES = ["ChatGPT","Gemini","Claude","Perplexity","Google AI Overviews"];
const SPOTS = [{"title":"Your site","text":"We start with your website: its pages, your listings and the facts about you."},{"title":"Indexed","text":"We make sure search engines and AI crawlers can read every page: sitemaps, crawl errors, speed."},{"title":"Found","text":"We write exact answers to the questions your buyers ask, and fix weak pages."},{"title":"Mentioned","text":"We fix your listings and profiles, so AI engines can name you, with a link."},{"title":"AI engines","text":"ChatGPT, Gemini, Claude, Perplexity and Google read those pages. Every week we check which ones name you."},{"title":"Buyers come back","text":"Buyers follow the link back to your site. We report citations and leads, not promises."},{"title":"One checked change a day","text":"Agents draft it. A person checks it before it ships."},{"title":"Monday report","text":"Which engines named you, for which questions, and what we changed."}];
const REST = 1.5, LENS_POST = [-62,-80], LENS_ARM = 38.8329756778952, LENS_R = 7.5, LENS_Z = 64;
const FLY = [44,14], FLY_R = 24, FLY_TEETH = 50, TOOTH = 2.6, GEAR_H = 4;
const IDLER = [77.05714807768089,20.015393667107695], IDLER_R = 7, IDLER_TEETH = 14, ESCAPE = [97.98565638663082,14.67146814721], ESCAPE_R = 12, TEETH = 15, GEAR_Z = 16;
const ANCHOR = [123.98565638663082,14.67146814721], BELL = [214,22], BELL_Z = 28;
const DIAL = [-200,14], DIAL_R = 12, DIAL_TOP = 24, STAMP_DOWN = 5;
const at = (p) => iso(p, P);
function lensAt(a) {
  const [px, py] = LENS_POST;
  const base = Math.atan2(BELT_Y - py, STATIONS[1].x - px);
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
function cleatsAt(t) {
  let d = "";
  const shift = (((SPEED * t) % CUP) + CUP) % CUP;
  for (let x = BELT_FROM + 8 + shift; x < BELT_TO - 8; x += CUP) {
    d += k.lineOnTop([x, BELT_Y - 5], [x, BELT_Y + 5], BELT_TOP, P);
  }
  return d;
}
function backCleatsAt(t) {
  let d = "";
  const shift = (((-RETURN_SPEED * t) % CUP) + CUP) % CUP;
  for (let x = RETURN_FROM + 8 + shift; x < RETURN_TO - 8; x += CUP) {
    d += k.lineOnTop([x, RETURN_Y - 5], [x, RETURN_Y + 5], RETURN_TOP, P);
  }
  return d;
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
      if (u < 0 || u > 1) { d.el.setAttribute("opacity", "0"); continue; }
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
  // Warm start: run the model for a while so the loop is already full, then draw.
  for (let i = 0; i < 540; i++) update(1 / 30);
  if (still.matches) swing = 0;
  draw();
}

})();
