// Render maps in the browser: draw coverage with canvas, then shape it with raster.js.
import * as F from '../core/features.js';
import { heightMap, normalMap, to16, to8 } from '../export/raster.js';
import { encodePNG } from '../export/png.js';

export const MAX_PIXELS = 36e6;

export function mapSize(boundary, pxPerMm) {
  const W = Math.max(1, Math.round(boundary.w * pxPerMm));
  const H = Math.max(1, Math.round(boundary.h * pxPerMm));
  return { W, H, ok: W * H <= MAX_PIXELS && W <= 16384 && H <= 16384 };
}

function coverage(result, pxPerMm, which) {
  const { W, H } = mapSize(result.boundary, pxPerMm);
  const canvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(W, H) : Object.assign(document.createElement('canvas'), { width: W, height: H });
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  const sx = W / result.boundary.w, sy = H / result.boundary.h;
  const P = (x, y) => [x * sx, (result.boundary.h - y) * sy];
  ctx.beginPath();
  if (which === 'panel') {
    result.outline.forEach(([x, y], i) => { const [a, b] = P(x, y); if (i) ctx.lineTo(a, b); else ctx.moveTo(a, b); });
    ctx.closePath();
  } else {
    for (const f of result.features) {
      if (f.kind === 'circle') {
        const [a, b] = P(f.x, f.y);
        ctx.moveTo(a + f.r * sx, b);
        ctx.ellipse(a, b, f.r * sx, f.r * sy, 0, 0, Math.PI * 2);
        continue;
      }
      F.outline(f, 64).forEach(([x, y], i) => { const [a, b] = P(x, y); if (i) ctx.lineTo(a, b); else ctx.moveTo(a, b); });
      ctx.closePath();
    }
  }
  ctx.fill();
  const data = ctx.getImageData(0, 0, W, H).data;
  const out = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) out[i] = data[i * 4] / 255;
  return { out, W, H };
}

export async function renderMap(kind, result, ex) {
  const ppm = Math.max(0.1, +ex.pxPerMm || 10);
  const cov = coverage(result, ppm, 'features');
  const panel = coverage(result, ppm, 'panel').out;
  const { W, H } = cov;
  const text = {
    Software: 'parabuddy',
    'parabuddy:map': kind,
    'parabuddy:size_mm': `${result.boundary.w} x ${result.boundary.h}`,
    'parabuddy:px_per_mm': String(ppm),
    'parabuddy:mm_per_px': String(1 / ppm),
  };
  if (kind === 'height' || kind === 'normal') {
    const height = heightMap(cov.out, panel, W, H, { bevelPx: (+ex.bevel || 0) * ppm, featuresAre: ex.featuresAre });
    if (kind === 'height') {
      text['parabuddy:white_is'] = 'top surface';
      return encodePNG({ width: W, height: H, channels: 1, bitDepth: 16, samples: to16(height), pxPerMm: ppm, text });
    }
    text['parabuddy:normal'] = ex.normalDX ? 'DirectX (green down)' : 'OpenGL (green up)';
    return encodePNG({ width: W, height: H, channels: 3, bitDepth: 8, samples: normalMap(height, W, H, (+ex.depth || 1) * ppm, !!ex.normalDX), pxPerMm: ppm, text });
  }
  const vals = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    vals[i] = kind === 'opacity' ? panel[i] * (1 - cov.out[i]) : panel[i] * cov.out[i];
  }
  text['parabuddy:white_is'] = kind === 'opacity' ? 'solid material' : 'pattern feature';
  return encodePNG({ width: W, height: H, channels: 1, bitDepth: 8, samples: to8(vals), pxPerMm: ppm, text });
}
