// Panel outlines. Origin at the bottom-left corner, y up, mm.
// All v0 shapes are convex, which keeps inset and clipping exact and fast.
import { TAU } from './geometry.js';

export const BOUNDARY_SHAPES = {
  rect: 'Rectangle',
  rounded: 'Rounded rectangle',
  ellipse: 'Ellipse',
  circle: 'Circle',
};

export function normalize(b) {
  const w = Math.max(0.1, +b.w || 0);
  const h = b.shape === 'circle' ? w : Math.max(0.1, +b.h || 0);
  const r = Math.min(Math.max(0, +b.r || 0), Math.min(w, h) / 2);
  return { ...b, w, h, r };
}

export function outline(bIn, seg = 192) {
  const b = normalize(bIn);
  const { w, h } = b;
  if (b.shape === 'rect' || (b.shape === 'rounded' && b.r === 0)) {
    return [[0, 0], [w, 0], [w, h], [0, h]];
  }
  if (b.shape === 'rounded') {
    const r = b.r, n = Math.max(6, Math.round(seg / 4));
    const corners = [[w - r, r, -Math.PI / 2], [w - r, h - r, 0], [r, h - r, Math.PI / 2], [r, r, Math.PI]];
    const pts = [];
    for (const [cx, cy, a0] of corners) {
      for (let i = 0; i <= n; i++) {
        const t = a0 + (i / n) * (Math.PI / 2);
        pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
      }
    }
    return pts;
  }
  const pts = [];
  for (let i = 0; i < seg; i++) {
    const t = (i / seg) * TAU;
    pts.push([w / 2 + (w / 2) * Math.cos(t), h / 2 + (h / 2) * Math.sin(t)]);
  }
  return pts;
}

export function area(bIn) {
  const b = normalize(bIn);
  if (b.shape === 'rect') return b.w * b.h;
  if (b.shape === 'rounded') return b.w * b.h - (4 - Math.PI) * b.r * b.r;
  return (Math.PI * b.w * b.h) / 4;
}

export function perimeterOf(bIn) {
  const b = normalize(bIn);
  if (b.shape === 'rect') return 2 * (b.w + b.h);
  if (b.shape === 'rounded') return 2 * (b.w + b.h) - 8 * b.r + TAU * b.r;
  const a = b.w / 2, c = b.h / 2;
  return Math.PI * (3 * (a + c) - Math.sqrt((3 * a + c) * (a + 3 * c)));
}

// Exact primitives for export: lines, arcs (degrees, counter-clockwise), circles, polylines.
export function primitives(bIn) {
  const b = normalize(bIn);
  const { w, h, r } = b;
  if (b.shape === 'circle') return [{ type: 'circle', cx: w / 2, cy: h / 2, r: w / 2 }];
  if (b.shape === 'ellipse') {
    if (Math.abs(w - h) < 1e-9) return [{ type: 'circle', cx: w / 2, cy: h / 2, r: w / 2 }];
    return [{ type: 'ellipse', cx: w / 2, cy: h / 2, rx: w / 2, ry: h / 2, pts: outline(b, 256) }];
  }
  if (b.shape === 'rect' || r === 0) {
    return [
      { type: 'line', x1: 0, y1: 0, x2: w, y2: 0 },
      { type: 'line', x1: w, y1: 0, x2: w, y2: h },
      { type: 'line', x1: w, y1: h, x2: 0, y2: h },
      { type: 'line', x1: 0, y1: h, x2: 0, y2: 0 },
    ];
  }
  const out = [];
  if (w - 2 * r > 1e-9) out.push({ type: 'line', x1: r, y1: 0, x2: w - r, y2: 0 });
  out.push({ type: 'arc', cx: w - r, cy: r, r, a0: 270, a1: 360 });
  if (h - 2 * r > 1e-9) out.push({ type: 'line', x1: w, y1: r, x2: w, y2: h - r });
  out.push({ type: 'arc', cx: w - r, cy: h - r, r, a0: 0, a1: 90 });
  if (w - 2 * r > 1e-9) out.push({ type: 'line', x1: w - r, y1: h, x2: r, y2: h });
  out.push({ type: 'arc', cx: r, cy: h - r, r, a0: 90, a1: 180 });
  if (h - 2 * r > 1e-9) out.push({ type: 'line', x1: 0, y1: h - r, x2: 0, y2: r });
  out.push({ type: 'arc', cx: r, cy: r, r, a0: 180, a1: 270 });
  return out;
}
