import test from 'node:test';
import assert from 'node:assert/strict';
import { encodePNG } from '../src/export/png.js';
import { heightMap, normalMap, distanceTo, to16 } from '../src/export/raster.js';

test('16-bit PNG has signature, IHDR depth 16 and pHYs in pixels per metre', async () => {
  const w = 4, h = 3;
  const png = await encodePNG({ width: w, height: h, channels: 1, bitDepth: 16, samples: new Uint16Array(w * h).fill(40000), pxPerMm: 10, text: { mm_per_px: '0.1' } });
  assert.deepEqual([...png.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  const dv = new DataView(png.buffer);
  assert.equal(dv.getUint32(16), w);
  assert.equal(dv.getUint32(20), h);
  assert.equal(png[24], 16);
  const s = Buffer.from(png).toString('latin1');
  const i = s.indexOf('pHYs');
  assert.ok(i > 0);
  assert.equal(dv.getUint32(i + 4), 10000);
  assert.ok(s.includes('mm_per_px'));
});

test('distance transform is exact on a single point', () => {
  const w = 5, h = 5, on = new Uint8Array(25);
  on[12] = 1;
  const d = distanceTo(on, w, h);
  assert.equal(d[12], 0);
  assert.ok(Math.abs(d[0] - Math.hypot(2, 2)) < 1e-9);
});

test('height map: holes are low, land is high, bevel is smooth', () => {
  const w = 21, h = 1;
  const cov = new Float32Array(w).map((_, i) => (i >= 7 && i <= 13 ? 1 : 0));
  const panel = new Float32Array(w).fill(1);
  const hard = heightMap(cov, panel, w, h);
  assert.equal(hard[10], 0);
  assert.equal(hard[0], 1);
  const soft = heightMap(cov, panel, w, h, { bevelPx: 3 });
  const values = new Set(to16(soft));
  assert.ok(values.size > 3, 'bevel should create intermediate heights');
  const n = normalMap(hard, w, h, 5);
  assert.equal(n.length, w * h * 3);
});
