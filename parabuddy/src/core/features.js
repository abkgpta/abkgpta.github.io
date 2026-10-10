// Pattern features. Each is one closed region in mm.
//   circle: { kind: 'circle', x, y, r }
//   slot:   { kind: 'slot', x, y, len, w, a }   len is tip to tip, a in radians
//   poly:   { kind: 'poly', pts: [[x, y], ...] } counter-clockwise
// Keeping circles and slots as primitives lets the exporters write true
// circles and arcs, which CAD tools emboss and cut far more reliably than splines.
import { ensureCCW, signedArea, perimeter, centroid, minWidthConvex, TAU } from './geometry.js';

export const circle = (x, y, r) => ({ kind: 'circle', x, y, r });
export const slot = (x, y, len, w, a) => ({ kind: 'slot', x, y, len: Math.max(len, w), w, a });
export const poly = (pts) => ({ kind: 'poly', pts: ensureCCW(pts) });

export function regularPolygon(x, y, circumR, sides, rot) {
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const t = rot + (i / sides) * TAU;
    pts.push([x + circumR * Math.cos(t), y + circumR * Math.sin(t)]);
  }
  return poly(pts);
}

export function area(f) {
  if (f.kind === 'circle') return Math.PI * f.r * f.r;
  if (f.kind === 'slot') return f.w * (f.len - f.w) + Math.PI * (f.w / 2) ** 2;
  return Math.abs(signedArea(f.pts));
}

export function perim(f) {
  if (f.kind === 'circle') return TAU * f.r;
  if (f.kind === 'slot') return 2 * (f.len - f.w) + Math.PI * f.w;
  return perimeter(f.pts);
}

// How many curves this feature becomes in CAD (Plasticity limits curves per plane).
export function curveCount(f) {
  if (f.kind === 'circle') return 1;
  if (f.kind === 'slot') return f.len > f.w ? 4 : 1;
  return f.pts.length;
}

export function center(f) {
  if (f.kind === 'poly') return centroid(f.pts);
  return [f.x, f.y];
}

// Bounding radius about center().
export function radius(f) {
  if (f.kind === 'circle') return f.r;
  if (f.kind === 'slot') return f.len / 2;
  const [cx, cy] = centroid(f.pts);
  let r = 0;
  for (const [x, y] of f.pts) r = Math.max(r, Math.hypot(x - cx, y - cy));
  return r;
}

// Smallest width: the size that limits punching, cutting and printing.
export function minWidth(f) {
  if (f.kind === 'circle') return 2 * f.r;
  if (f.kind === 'slot') return f.w;
  return minWidthConvex(f.pts);
}

export function outline(f, seg = 32) {
  if (f.kind === 'poly') return f.pts;
  if (f.kind === 'circle') {
    const pts = [];
    for (let i = 0; i < seg; i++) {
      const t = (i / seg) * TAU;
      pts.push([f.x + f.r * Math.cos(t), f.y + f.r * Math.sin(t)]);
    }
    return pts;
  }
  const r = f.w / 2, h = (f.len - f.w) / 2;
  const ux = Math.cos(f.a), uy = Math.sin(f.a);
  const half = Math.max(4, seg >> 1);
  const pts = [];
  for (let i = 0; i <= half; i++) {
    const t = f.a - Math.PI / 2 + (i / half) * Math.PI;
    pts.push([f.x + ux * h + r * Math.cos(t), f.y + uy * h + r * Math.sin(t)]);
  }
  for (let i = 0; i <= half; i++) {
    const t = f.a + Math.PI / 2 + (i / half) * Math.PI;
    pts.push([f.x - ux * h + r * Math.cos(t), f.y - uy * h + r * Math.sin(t)]);
  }
  return pts;
}

// Uniformly scale a feature about its centre.
export function scaled(f, s) {
  if (f.kind === 'circle') return circle(f.x, f.y, f.r * s);
  if (f.kind === 'slot') return slot(f.x, f.y, f.len * s, f.w * s, f.a);
  const [cx, cy] = centroid(f.pts);
  return poly(f.pts.map(([x, y]) => [cx + (x - cx) * s, cy + (y - cy) * s]));
}
