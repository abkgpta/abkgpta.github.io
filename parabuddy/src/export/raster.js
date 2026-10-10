// Height, normal, opacity and mask maps from a coverage mask.
// Pure array maths; the browser supplies coverage by drawing features to a canvas.

const INF = 1e20;

// 1D squared distance transform (Felzenszwalb & Huttenlocher).
function edt1d(f, n, d, v, z) {
  let k = 0;
  v[0] = 0; z[0] = -INF; z[1] = INF;
  for (let q = 1; q < n; q++) {
    let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
    k++; v[k] = q; z[k] = s; z[k + 1] = INF;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    d[q] = (q - v[k]) ** 2 + f[v[k]];
  }
}

// Euclidean distance (px) from each pixel to the nearest pixel where on[i] is true.
export function distanceTo(on, w, h) {
  const g = new Float64Array(w * h);
  for (let i = 0; i < w * h; i++) g[i] = on[i] ? 0 : INF;
  const n = Math.max(w, h);
  const f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) f[y] = g[y * w + x];
    edt1d(f, h, d, v, z);
    for (let y = 0; y < h; y++) g[y * w + x] = d[y];
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) f[x] = g[y * w + x];
    edt1d(f, w, d, v, z);
    for (let x = 0; x < w; x++) g[y * w + x] = Math.sqrt(d[x]);
  }
  return g;
}

// coverage: Float32Array 0..1 of features. panel: Float32Array 0..1 of the panel area.
// Returns height 0..1 where 1 is the top surface.
export function heightMap(coverage, panel, w, h, { bevelPx = 0, featuresAre = 'holes' } = {}) {
  const out = new Float32Array(w * h);
  let feat = coverage;
  if (bevelPx > 0) {
    const inside = new Uint8Array(w * h), outside = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) { inside[i] = coverage[i] >= 0.5; outside[i] = !inside[i]; }
    const dIn = distanceTo(outside, w, h); // inside a feature: distance to its edge
    const dOut = distanceTo(inside, w, h);
    feat = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      const sd = inside[i] ? dIn[i] - 0.5 : -(dOut[i] - 0.5);
      const t = Math.min(1, Math.max(0, sd / bevelPx));
      feat[i] = t * t * (3 - 2 * t);
    }
  }
  for (let i = 0; i < w * h; i++) {
    const f = feat[i];
    out[i] = (featuresAre === 'raised' ? f : 1 - f) * panel[i];
  }
  return out;
}

// Tangent-space normal map (OpenGL convention: green up). depthPx = full height in pixels.
export function normalMap(height, w, h, depthPx, directX = false) {
  const out = new Uint8Array(w * h * 3);
  const at = (x, y) => height[Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = ((at(x + 1, y) - at(x - 1, y)) / 2) * depthPx;
      const dy = ((at(x, y - 1) - at(x, y + 1)) / 2) * depthPx; // image y down, surface y up
      let nx = -dx, ny = -dy, nz = 1;
      const l = Math.hypot(nx, ny, nz);
      nx /= l; ny /= l; nz /= l;
      if (directX) ny = -ny;
      const i = (y * w + x) * 3;
      out[i] = Math.round((nx * 0.5 + 0.5) * 255);
      out[i + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      out[i + 2] = Math.round((nz * 0.5 + 0.5) * 255);
    }
  }
  return out;
}

export function to16(values) {
  const out = new Uint16Array(values.length);
  for (let i = 0; i < values.length; i++) out[i] = Math.round(Math.min(1, Math.max(0, values[i])) * 65535);
  return out;
}

export function to8(values) {
  const out = new Uint8Array(values.length);
  for (let i = 0; i < values.length; i++) out[i] = Math.round(Math.min(1, Math.max(0, values[i])) * 255);
  return out;
}
