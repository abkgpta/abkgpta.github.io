// Pattern generators. Each takes its params plus a context and returns features in mm.
// ctx: { w, h, outline, inset, rng, field(x, y) -> 0..1, mod }
// Parameters use product language (hole, pitch, web) so they read like a drawing callout.
import { circle, slot, poly, regularPolygon } from './features.js';
import { clipByConvex, clipHalfPlane, insetConvex, centroid, pointInPoly, rotatePt } from './geometry.js';
import { scaleFrom } from './modifiers.js';

const DEG = Math.PI / 180;
export const MAX_FEATURES = 60000;

function shapeAt(shape, x, y, size, rot, slotLen) {
  switch (shape) {
    case 'square': return regularPolygon(x, y, size / Math.SQRT2, 4, rot + Math.PI / 4);
    case 'diamond': return regularPolygon(x, y, size / Math.SQRT2, 4, rot);
    case 'hexagon': return regularPolygon(x, y, size / Math.sqrt(3), 6, rot);
    case 'triangle': return regularPolygon(x, y, size / Math.sqrt(3), 3, rot + Math.PI / 2);
    case 'slot': return slot(x, y, Math.max(slotLen, size), size, rot);
    default: return circle(x, y, size / 2);
  }
}

// Visit lattice points c + i*a + j*b that fall within radius R of c.
function lattice(cx, cy, a, b, R, visit) {
  const det = a[0] * b[1] - a[1] * b[0];
  if (Math.abs(det) < 1e-12) return 0;
  // Bound i, j through the inverse basis applied to a circle of radius R.
  const ia = Math.ceil((R * Math.hypot(b[0], b[1])) / Math.abs(det)) + 1;
  const ib = Math.ceil((R * Math.hypot(a[0], a[1])) / Math.abs(det)) + 1;
  let count = 0;
  for (let j = -ib; j <= ib; j++) {
    for (let i = -ia; i <= ia; i++) {
      const x = cx + i * a[0] + j * b[0];
      const y = cy + i * a[1] + j * b[1];
      if ((x - cx) ** 2 + (y - cy) ** 2 > R * R) continue;
      if (++count > MAX_FEATURES * 4) return count;
      visit(x, y, i, j);
    }
  }
  return count;
}

export const GENERATORS = {
  grid: {
    label: 'Perforation grid',
    edgeRule: 'drop',
    params: [
      { key: 'layout', label: 'Layout', type: 'select', options: { straight: 'Straight', stagger60: 'Staggered 60°', stagger45: 'Staggered 45°' }, def: 'stagger60' },
      { key: 'shape', label: 'Hole shape', type: 'select', options: { circle: 'Round', square: 'Square', diamond: 'Diamond', hexagon: 'Hexagon', triangle: 'Triangle', slot: 'Slot' }, def: 'circle' },
      { key: 'size', label: 'Hole size', unit: 'mm', min: 0.02, max: 50, step: 0.05, def: 2 },
      { key: 'slotLen', label: 'Slot length', unit: 'mm', min: 0.1, max: 200, step: 0.1, def: 6, when: (p) => p.shape === 'slot' },
      { key: 'pitch', label: 'Pitch (centre to centre)', unit: 'mm', min: 0.05, max: 100, step: 0.05, def: 3 },
      { key: 'angle', label: 'Pattern angle', unit: '°', min: -180, max: 180, step: 1, def: 0 },
      { key: 'shapeRot', label: 'Hole rotation', unit: '°', min: -180, max: 180, step: 1, def: 0, when: (p) => p.shape !== 'circle' },
      { key: 'centre', label: 'Panel centre falls on', type: 'select', options: { hole: 'A hole', gap: 'A gap between holes' }, def: 'hole' },
      { key: 'jitter', label: 'Position jitter', unit: 'mm', min: 0, max: 10, step: 0.01, def: 0 },
    ],
    generate(p, ctx) {
      const pitch = Math.max(0.01, +p.pitch);
      const rot = (+p.angle || 0) * DEG;
      let a = [pitch, 0], b = [0, pitch];
      if (p.layout === 'stagger60') b = [pitch / 2, (pitch * Math.sqrt(3)) / 2];
      if (p.layout === 'stagger45') b = [pitch / 2, pitch / 2];
      a = rotatePt(a[0], a[1], rot);
      b = rotatePt(b[0], b[1], rot);
      let cx = ctx.w / 2, cy = ctx.h / 2;
      if (p.centre === 'gap') { cx += (a[0] + b[0]) / 2; cy += (a[1] + b[1]) / 2; }
      const R = Math.hypot(ctx.w, ctx.h) / 2 + 2 * pitch + (+p.size || 0);
      const out = [];
      const jit = +p.jitter || 0;
      const srot = rot + (+p.shapeRot || 0) * DEG;
      lattice(cx, cy, a, b, R, (x, y) => {
        if (out.length >= MAX_FEATURES) return;
        if (jit) { x += (ctx.rng() * 2 - 1) * jit; y += (ctx.rng() * 2 - 1) * jit; }
        const s = scaleFrom(ctx.field(x, y), ctx.mod);
        if (s <= 1e-4) return;
        out.push(shapeAt(p.shape, x, y, p.size * s, srot, (+p.slotLen || 0) * s));
      });
      return out;
    },
  },

  radial: {
    label: 'Radial rings (speaker grille)',
    edgeRule: 'drop',
    params: [
      { key: 'shape', label: 'Hole shape', type: 'select', options: { circle: 'Round', hexagon: 'Hexagon', square: 'Square' }, def: 'circle' },
      { key: 'size', label: 'Hole size', unit: 'mm', min: 0.05, max: 50, step: 0.05, def: 1.5 },
      { key: 'ringPitch', label: 'Ring pitch', unit: 'mm', min: 0.1, max: 100, step: 0.05, def: 2.5 },
      { key: 'holePitch', label: 'Hole pitch along ring', unit: 'mm', min: 0.1, max: 100, step: 0.05, def: 2.5 },
      { key: 'start', label: 'First ring radius', unit: 'mm', min: 0, max: 500, step: 0.1, def: 0 },
      { key: 'cx', label: 'Centre X', unit: '%', min: 0, max: 100, step: 1, def: 50 },
      { key: 'cy', label: 'Centre Y', unit: '%', min: 0, max: 100, step: 1, def: 50 },
      { key: 'stagger', label: 'Stagger alternate rings', type: 'bool', def: true },
    ],
    generate(p, ctx) {
      const cx = (p.cx / 100) * ctx.w, cy = (p.cy / 100) * ctx.h;
      const Rmax = Math.hypot(Math.max(cx, ctx.w - cx), Math.max(cy, ctx.h - cy)) + p.size;
      const ringPitch = Math.max(0.01, +p.ringPitch), holePitch = Math.max(0.01, +p.holePitch);
      const out = [];
      for (let k = 0; ; k++) {
        const rho = +p.start + k * ringPitch;
        if (rho > Rmax || out.length >= MAX_FEATURES) break;
        if (rho < 1e-9) {
          const s = scaleFrom(ctx.field(cx, cy), ctx.mod);
          if (s > 1e-4) out.push(shapeAt(p.shape, cx, cy, p.size * s, 0, 0));
          continue;
        }
        // Most holes whose straight-line spacing is still at least the hole pitch.
        const n = holePitch >= 2 * rho ? 1 : Math.max(1, Math.floor(Math.PI / Math.asin(holePitch / (2 * rho)) + 1e-9));
        const off = p.stagger && k % 2 ? Math.PI / n : 0;
        for (let i = 0; i < n; i++) {
          const t = off + (i / n) * 2 * Math.PI;
          const x = cx + rho * Math.cos(t), y = cy + rho * Math.sin(t);
          const s = scaleFrom(ctx.field(x, y), ctx.mod);
          if (s > 1e-4) out.push(shapeAt(p.shape, x, y, p.size * s, t, 0));
        }
      }
      return out;
    },
  },

  voronoi: {
    label: 'Voronoi cells',
    edgeRule: 'clip',
    params: [
      { key: 'cells', label: 'Cell count', min: 3, max: 3000, step: 1, def: 120 },
      { key: 'web', label: 'Web width (ligament)', unit: 'mm', min: 0.05, max: 20, step: 0.05, def: 1.2 },
      { key: 'relax', label: 'Evenness (relaxation passes)', min: 0, max: 8, step: 1, def: 2 },
    ],
    generate(p, ctx) {
      const n = Math.min(Math.max(3, Math.round(+p.cells)), 5000);
      const region = ctx.outline;
      const { w, h } = ctx;
      // Seeds: rejection-sample inside the panel; the size field sets local density.
      let seeds = [];
      let tries = 0;
      while (seeds.length < n && tries < n * 200) {
        tries++;
        const x = ctx.rng() * w, y = ctx.rng() * h;
        if (!pointInPoly(x, y, region)) continue;
        const dens = ctx.mod && ctx.mod.mode !== 'none' ? scaleFrom(ctx.field(x, y), ctx.mod) : 1;
        if (ctx.rng() > Math.max(0.02, dens)) continue;
        seeds.push([x, y]);
      }
      let cells = voronoiCells(seeds, region);
      for (let k = 0; k < (+p.relax || 0); k++) {
        seeds = cells.map((c, i) => (c.length >= 3 ? centroid(c) : seeds[i]));
        cells = voronoiCells(seeds, region);
      }
      const out = [];
      for (const c of cells) {
        if (c.length < 3) continue;
        const hole = insetConvex(c, (+p.web || 0) / 2);
        if (hole.length >= 3) out.push(poly(hole));
      }
      return out;
    },
  },

  knurl: {
    label: 'Diamond knurl',
    edgeRule: 'clip',
    params: [
      { key: 'pitch', label: 'Pitch', unit: 'mm', min: 0.1, max: 50, step: 0.05, def: 2 },
      { key: 'knurlAngle', label: 'Knurl angle (each side)', unit: '°', min: 10, max: 80, step: 1, def: 30 },
      { key: 'groove', label: 'Groove width', unit: 'mm', min: 0.02, max: 20, step: 0.02, def: 0.4 },
      { key: 'angle', label: 'Pattern angle', unit: '°', min: -180, max: 180, step: 1, def: 0 },
    ],
    generate(p, ctx) {
      const pitch = Math.max(0.01, +p.pitch), th = (+p.knurlAngle || 30) * DEG, rot = (+p.angle || 0) * DEG;
      const a = rotatePt(pitch * Math.cos(th), pitch * Math.sin(th), rot);
      const b = rotatePt(pitch * Math.cos(th), -pitch * Math.sin(th), rot);
      const cx = ctx.w / 2, cy = ctx.h / 2;
      const R = Math.hypot(ctx.w, ctx.h) / 2 + 2 * pitch;
      const out = [];
      lattice(cx, cy, a, b, R, (x, y) => {
        if (out.length >= MAX_FEATURES) return;
        const s = scaleFrom(ctx.field(x, y), ctx.mod);
        const hx = ((a[0] + b[0]) / 2) * s, hy = ((a[1] + b[1]) / 2) * s;
        const kx = ((a[0] - b[0]) / 2) * s, ky = ((a[1] - b[1]) / 2) * s;
        const cell = poly([[x + hx, y + hy], [x - kx, y - ky], [x - hx, y - hy], [x + kx, y + ky]]);
        const d = insetConvex(cell.pts, (+p.groove || 0) / 2);
        if (d.length >= 3) out.push(poly(d));
      });
      return out;
    },
  },

  ribs: {
    label: 'Ribs and vent slots',
    edgeRule: 'drop',
    params: [
      { key: 'width', label: 'Slot width', unit: 'mm', min: 0.05, max: 50, step: 0.05, def: 2 },
      { key: 'gap', label: 'Web between slots', unit: 'mm', min: 0.05, max: 50, step: 0.05, def: 2 },
      { key: 'angle', label: 'Angle', unit: '°', min: -180, max: 180, step: 1, def: 0 },
      { key: 'ends', label: 'Slot ends', type: 'select', options: { round: 'Rounded', square: 'Square' }, def: 'round' },
      { key: 'segment', label: 'Max slot length (0 = full)', unit: 'mm', min: 0, max: 500, step: 0.5, def: 0 },
      { key: 'bridge', label: 'Bridge between segments', unit: 'mm', min: 0.1, max: 50, step: 0.1, def: 3, when: (p) => +p.segment > 0 },
    ],
    generate(p, ctx) {
      const wdt = Math.max(0.01, +p.width), step = wdt + Math.max(0, +p.gap);
      const t = (+p.angle || 0) * DEG;
      const ux = Math.cos(t), uy = Math.sin(t), nx = -uy, ny = ux;
      const cx = ctx.w / 2, cy = ctx.h / 2;
      const R = Math.hypot(ctx.w, ctx.h) / 2 + step;
      const region = ctx.inset;
      if (region.length < 3) return [];
      const out = [];
      const chord = (off) => {
        // Interval along u of the line cx + n*off + u*s inside the convex region.
        let lo = -Infinity, hi = Infinity;
        const px = cx + nx * off, py = cy + ny * off;
        for (let i = 0, m = region.length; i < m; i++) {
          const [ax, ay] = region[i];
          const [bx, by] = region[(i + 1) % m];
          // Inside: cross(b - a, p - a) >= 0
          const ex = bx - ax, ey = by - ay;
          const c0 = ex * (py - ay) - ey * (px - ax);
          const c1 = ex * uy - ey * ux;
          if (Math.abs(c1) < 1e-12) { if (c0 < 0) return null; continue; }
          const s = -c0 / c1;
          if (c1 > 0) lo = Math.max(lo, s); else hi = Math.min(hi, s);
        }
        return lo < hi ? [lo, hi] : null;
      };
      const kmax = Math.ceil(R / step);
      for (let k = -kmax; k <= kmax; k++) {
        const off = k * step;
        const c0 = chord(off - wdt / 2), c1 = chord(off + wdt / 2);
        if (!c0 || !c1) continue;
        let lo = Math.max(c0[0], c1[0]), hi = Math.min(c0[1], c1[1]);
        if (hi - lo < wdt) continue;
        const segs = [];
        const seg = +p.segment || 0;
        if (seg > 0) {
          const br = Math.max(0, +p.bridge || 0);
          const total = hi - lo;
          const count = Math.max(1, Math.ceil((total + br) / (seg + br)));
          const len = (total - br * (count - 1)) / count;
          if (len < wdt) continue;
          for (let i = 0; i < count; i++) segs.push([lo + i * (len + br), lo + i * (len + br) + len]);
        } else segs.push([lo, hi]);
        for (const [s0, s1] of segs) {
          const mx = cx + nx * off + ux * (s0 + s1) / 2, my = cy + ny * off + uy * (s0 + s1) / 2;
          if (p.ends === 'square') {
            const hl = (s1 - s0) / 2, hw = wdt / 2;
            out.push(poly([
              [mx - ux * hl - nx * hw, my - uy * hl - ny * hw],
              [mx + ux * hl - nx * hw, my + uy * hl - ny * hw],
              [mx + ux * hl + nx * hw, my + uy * hl + ny * hw],
              [mx - ux * hl + nx * hw, my - uy * hl + ny * hw],
            ]));
          } else {
            out.push(slot(mx, my, s1 - s0, wdt, t));
          }
        }
      }
      return out;
    },
  },
};

// Voronoi cells by half-plane clipping, clipped to a convex region.
export function voronoiCells(seeds, region) {
  const n = seeds.length;
  if (!n) return [];
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of region) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  // Bucket seeds so each cell only checks nearby ones.
  const cs = Math.max(1e-6, Math.sqrt(((x1 - x0) * (y1 - y0)) / n) * 1.5);
  const grid = new Map();
  const key = (i, j) => i * 73856093 ^ j * 19349663;
  seeds.forEach(([x, y], k) => {
    const g = key(Math.floor(x / cs), Math.floor(y / cs));
    if (!grid.has(g)) grid.set(g, []);
    grid.get(g).push(k);
  });
  const box = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const cells = [];
  for (let k = 0; k < n; k++) {
    const [sx, sy] = seeds[k];
    const gi = Math.floor(sx / cs), gj = Math.floor(sy / cs);
    let cell = box;
    for (let ring = 0; ring < 1e4; ring++) {
      // Visit the square ring of buckets at Chebyshev distance `ring`.
      for (let di = -ring; di <= ring; di++) {
        for (let dj = -ring; dj <= ring; dj++) {
          if (Math.max(Math.abs(di), Math.abs(dj)) !== ring) continue;
          const list = grid.get(key(gi + di, gj + dj));
          if (!list) continue;
          for (const m of list) {
            if (m === k) continue;
            const [ox, oy] = seeds[m];
            const nx = ox - sx, ny = oy - sy;
            const c = (nx * (ox + sx) + ny * (oy + sy)) / 2;
            cell = clipHalfPlane(cell, nx, ny, c);
          }
        }
      }
      // Stop once no unvisited seed can still cut the cell.
      let far = 0;
      for (const [x, y] of cell) far = Math.max(far, Math.hypot(x - sx, y - sy));
      if (ring * cs >= 2 * far || ring * cs > (x1 - x0) + (y1 - y0)) break;
    }
    cells.push(cell.length >= 3 ? clipByConvex(cell, region) : []);
  }
  return cells;
}
