// Manufacturing rules. Values are common rules of thumb, not supplier sign-off:
// every preset is editable and the UI says so.
import * as F from './features.js';
import { distPointPolyEdges, polyPolyDistance, insetConvex, pointInPoly } from './geometry.js';

export const PROCESSES = {
  laser_sheet: {
    label: 'Laser-cut sheet metal',
    rules: (t) => ({ minFeature: Math.max(t, 0.5), minLigament: Math.max(t, 0.5), minEdge: Math.max(2 * t, 1), maxOpen: 70 }),
    note: 'Hole and web at least 1x sheet thickness for mild steel and aluminium; stainless often needs 1.5-2x. Confirm with your cutter.',
  },
  punched_sheet: {
    label: 'Punched sheet metal',
    rules: (t) => ({ minFeature: Math.max(t, 0.8), minLigament: Math.max(t, 0.8), minEdge: Math.max(2 * t, 1.5), maxOpen: 65 }),
    note: 'Punch diameter at least sheet thickness; open area above about 65% weakens the sheet. Confirm tooling with your supplier.',
  },
  cnc: {
    label: 'CNC routed or milled',
    rules: (t) => ({ minFeature: 3.175, minLigament: Math.max(1.5, 0.5 * t), minEdge: 3, maxOpen: 75 }),
    note: 'Smallest hole equals the tool diameter (default 1/8 in). Inside corners get the tool radius.',
  },
  fdm: {
    label: 'FDM 3D print (0.4 mm nozzle)',
    rules: () => ({ minFeature: 1.0, minLigament: 0.8, minEdge: 1.2, maxOpen: 80 }),
    note: 'Walls below two perimeters (0.8 mm) print weakly; small holes close up slightly.',
  },
  sla_mjf: {
    label: 'SLA or MJF 3D print',
    rules: () => ({ minFeature: 0.5, minLigament: 0.6, minEdge: 1.0, maxOpen: 85 }),
    note: 'Typical service-bureau minimums; check your material datasheet.',
  },
  micro_perf: {
    label: 'Laser micro-perforation (hidden until lit)',
    rules: () => ({ minFeature: 0.02, minLigament: 0.1, minEdge: 0.5, maxOpen: 30 }),
    note: 'Holes around 30 um on a 200 um pitch read as invisible when unlit (patent US8524127).',
  },
  mould_texture: {
    label: 'Injection-mould texture',
    rules: () => ({ minFeature: 0.2, minLigament: 0.2, minEdge: 1.0, maxOpen: 100 }),
    note: 'Agree depth and draft angle with your texturing house; deep textures need more draft.',
  },
  custom: {
    label: 'Custom rules',
    rules: () => ({ minFeature: 0.5, minLigament: 0.5, minEdge: 1, maxOpen: 100 }),
    note: 'Set your own limits.',
  },
};

export const MATERIALS = {
  aluminium: { label: 'Aluminium', density: 2.7 },
  steel: { label: 'Steel', density: 7.85 },
  stainless: { label: 'Stainless steel', density: 8.0 },
  abs: { label: 'ABS', density: 1.04 },
  pa12: { label: 'PA12 (MJF)', density: 1.01 },
  resin: { label: 'SLA resin', density: 1.15 },
  acrylic: { label: 'Acrylic', density: 1.19 },
  plywood: { label: 'Plywood', density: 0.6 },
};

export function resolveRules(proc) {
  const preset = PROCESSES[proc.preset] || PROCESSES.custom;
  const base = preset.rules(Math.max(0.01, +proc.thickness || 1));
  const o = proc.overrides || {};
  const pick = (k) => (o[k] === undefined || o[k] === null || o[k] === '' ? base[k] : +o[k]);
  return { minFeature: pick('minFeature'), minLigament: pick('minLigament'), minEdge: pick('minEdge'), maxOpen: pick('maxOpen') };
}

// Pairwise nearest-neighbour ligament per feature, using a spatial hash.
export function ligaments(features) {
  const n = features.length;
  const lig = new Float64Array(n).fill(Infinity);
  if (n < 2) return lig;
  const cs = [], rs = [];
  let maxR = 0;
  for (const f of features) {
    cs.push(F.center(f));
    const r = F.radius(f);
    rs.push(r);
    if (r > maxR) maxR = r;
  }
  // Cells wide enough to find each feature's nearest neighbour in dense and sparse layouts.
  let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity;
  for (const [x, y] of cs) { bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x); by1 = Math.max(by1, y); }
  const spacing = Math.sqrt(Math.max((bx1 - bx0) * (by1 - by0), 1e-12) / n);
  const cell = Math.max(4 * maxR, 2.5 * spacing, 1e-6);
  const grid = new Map();
  const key = (i, j) => i * 73856093 ^ j * 19349663;
  for (let k = 0; k < n; k++) {
    const g = key(Math.floor(cs[k][0] / cell), Math.floor(cs[k][1] / cell));
    let list = grid.get(g);
    if (!list) grid.set(g, (list = []));
    list.push(k);
  }
  const outlines = new Array(n);
  const ol = (k) => outlines[k] || (outlines[k] = F.outline(features[k], 24));
  for (let k = 0; k < n; k++) {
    const gi = Math.floor(cs[k][0] / cell), gj = Math.floor(cs[k][1] / cell);
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        const list = grid.get(key(gi + di, gj + dj));
        if (!list) continue;
        for (const m of list) {
          if (m <= k) continue;
          const cd = Math.hypot(cs[m][0] - cs[k][0], cs[m][1] - cs[k][1]);
          const lower = cd - rs[k] - rs[m];
          if (lower >= lig[k] && lower >= lig[m]) continue;
          let d;
          const a = features[k], b = features[m];
          if (a.kind === 'circle' && b.kind === 'circle') d = cd - a.r - b.r;
          else d = polyPolyDistance(ol(k), ol(m));
          if (d < lig[k]) lig[k] = d;
          if (d < lig[m]) lig[m] = d;
        }
      }
    }
  }
  return lig;
}

// Check every feature. Returns per-feature flags and the measured values.
export function check(features, boundaryOutline, rules) {
  const n = features.length;
  const lig = ligaments(features);
  const widths = new Float64Array(n);
  const edge = new Float64Array(n).fill(Infinity);
  let maxR = 0;
  for (let k = 0; k < n; k++) {
    widths[k] = F.minWidth(features[k]);
    maxR = Math.max(maxR, F.radius(features[k]));
  }
  // Only features near the edge need the exact edge distance.
  const safe = insetConvex(boundaryOutline, rules.minEdge + 2 * maxR + 1e-6);
  for (let k = 0; k < n; k++) {
    const f = features[k];
    const [cx, cy] = F.center(f);
    if (safe.length >= 3 && pointInPoly(cx, cy, safe)) continue;
    if (f.kind === 'circle') edge[k] = distPointPolyEdges(f.x, f.y, boundaryOutline) - f.r;
    else {
      let d = Infinity;
      for (const [x, y] of F.outline(f, 24)) d = Math.min(d, distPointPolyEdges(x, y, boundaryOutline));
      edge[k] = d;
    }
  }
  const flags = new Uint8Array(n); // bit 1 small, 2 ligament, 4 edge
  const tol = 1e-6;
  let small = 0, thin = 0, near = 0, overlap = 0;
  for (let k = 0; k < n; k++) {
    if (widths[k] < rules.minFeature - tol) { flags[k] |= 1; small++; }
    if (lig[k] < rules.minLigament - tol) { flags[k] |= 2; thin++; }
    if (lig[k] < 0) overlap++;
    if (edge[k] < rules.minEdge - tol) { flags[k] |= 4; near++; }
  }
  return { flags, ligaments: lig, widths, edge, counts: { small, thin, near, overlap } };
}
