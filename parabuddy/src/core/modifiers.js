// Size variation fields. A field maps a point (mm) to v in [0, 1];
// generators turn v into a scale between minScale and 1.
import { hash2 } from './rng.js';

export const VARIATION_MODES = {
  none: 'None',
  linear: 'Linear fade',
  radial: 'Point attractor',
  noise: 'Organic noise',
  image: 'Image (halftone)',
};

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t) => t * t * (3 - 2 * t);

function valueNoise(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = smooth(x - ix), fy = smooth(y - iy);
  const a = hash2(ix, iy, seed), b = hash2(ix + 1, iy, seed);
  const c = hash2(ix, iy + 1, seed), d = hash2(ix + 1, iy + 1, seed);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

// sampler(u, v) returns luminance 0..1 for u, v in 0..1 (v = 0 at the top of the image).
export function makeField(mod, w, h, seed, sampler) {
  const m = mod || { mode: 'none' };
  let f;
  switch (m.mode) {
    case 'linear': {
      const a = ((+m.angle || 0) * Math.PI) / 180;
      const ux = Math.cos(a), uy = Math.sin(a);
      const ps = [0, w * ux, h * uy, w * ux + h * uy];
      const lo = Math.min(...ps), hi = Math.max(...ps);
      const s = clamp01((+m.start || 0) / 100), e = clamp01((m.end ?? 100) / 100);
      f = (x, y) => {
        const t = (x * ux + y * uy - lo) / (hi - lo || 1);
        return clamp01((t - s) / (e - s || 1e-9));
      };
      break;
    }
    case 'radial': {
      const cx = ((m.cx ?? 50) / 100) * w, cy = ((m.cy ?? 50) / 100) * h;
      const R = Math.max(1e-6, +m.radius || 1);
      f = (x, y) => 1 - clamp01(Math.hypot(x - cx, y - cy) / R);
      break;
    }
    case 'noise': {
      const sc = Math.max(0.1, +m.scale || 10);
      f = (x, y) => clamp01((valueNoise(x / sc, y / sc, seed) * 0.65 + valueNoise((x / sc) * 2.1, (y / sc) * 2.1, seed + 7) * 0.35 - 0.15) / 0.7);
      break;
    }
    case 'image': {
      f = sampler ? (x, y) => clamp01(sampler(x / w, 1 - y / h)) : () => 1;
      break;
    }
    default:
      return () => 1;
  }
  const g = m.gamma && +m.gamma !== 1 ? +m.gamma : 1;
  const base = m.invert ? (x, y) => 1 - f(x, y) : f;
  return g === 1 ? base : (x, y) => Math.pow(base(x, y), g);
}

export function scaleFrom(v, mod) {
  if (!mod || mod.mode === 'none') return 1;
  const lo = clamp01((mod.minScale ?? 0) / 100);
  return lo + (1 - lo) * v;
}
