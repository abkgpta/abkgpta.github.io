import test from 'node:test';
import assert from 'node:assert/strict';
import { run } from '../src/core/pipeline.js';
import { defaultState, migrate, PRESETS, applyPreset } from '../src/core/state.js';
import { toSVG } from '../src/export/svg.js';
import { toDXF } from '../src/export/dxf.js';
import { GENERATORS } from '../src/core/generators.js';

const clone = (o) => JSON.parse(JSON.stringify(o));

test('every preset generates features without errors', () => {
  for (const [name, apply] of Object.entries(PRESETS)) {
    const s = defaultState();
    apply(s);
    const r = run(s);
    assert.ok(r.features.length > 0, `${name} produced no features`);
  }
});

test('every generator runs from its defaults', () => {
  for (const type of Object.keys(GENERATORS)) {
    const s = defaultState();
    s.generator.type = type;
    s.boundary.edgeRule = GENERATORS[type].edgeRule;
    assert.ok(run(s).features.length > 0, type);
  }
});

test('same seed gives an identical export', () => {
  const s = defaultState();
  s.generator.type = 'voronoi';
  s.boundary.edgeRule = 'clip';
  const a = toSVG(run(clone(s))), b = toSVG(run(clone(s)));
  assert.equal(a, b);
  s.seed = 99;
  assert.notEqual(toSVG(run(s)), a);
});

test('straight grid open area matches the closed form', () => {
  const s = defaultState();
  s.boundary = { shape: 'rect', w: 30, h: 30, margin: 0, edgeRule: 'drop' };
  Object.assign(s.generator.params.grid, { layout: 'straight', shape: 'circle', size: 2, pitch: 3, angle: 0, jitter: 0, centre: 'hole' });
  s.process.preset = 'custom';
  // Hole on centre: centres at 3..27 mm, so 9 x 9 fit.
  assert.equal(run(s).metrics.count, 81);
  s.generator.params.grid.centre = 'gap';
  const r = run(s);
  // Gap on centre: centres at 1.5..28.5 mm, so 10 x 10 fit.
  assert.equal(r.metrics.count, 100);
  const expected = (100 * Math.PI * 1 * 1) / 900 * 100;
  assert.ok(Math.abs(r.metrics.openPct - expected) < 1e-9);
  assert.ok(Math.abs(r.metrics.minLigament - 1) < 1e-9, `ligament ${r.metrics.minLigament}`);
});

test('ligament and size rules flag the right features', () => {
  const s = defaultState();
  s.boundary = { shape: 'rect', w: 20, h: 20, margin: 0, edgeRule: 'drop' };
  Object.assign(s.generator.params.grid, { layout: 'straight', shape: 'circle', size: 2, pitch: 2.5 });
  s.process = { preset: 'custom', thickness: 1, material: 'steel', overrides: { minFeature: 1, minLigament: 1, minEdge: 0, maxOpen: 100 } };
  const r = run(s);
  assert.ok(r.dfm.counts.thin === r.features.length, 'all 0.5 mm webs should fail a 1 mm rule');
  s.process.overrides.minLigament = 0.5;
  assert.equal(run(s).dfm.counts.thin, 0);
});

test('features stay inside the margin', () => {
  for (const type of Object.keys(GENERATORS)) {
    const s = defaultState();
    s.generator.type = type;
    s.boundary = { shape: 'ellipse', w: 80, h: 50, margin: 3, edgeRule: GENERATORS[type].edgeRule };
    s.process.overrides = { minEdge: 2.999 };
    const r = run(s);
    assert.equal(r.dfm.counts.near, 0, `${type}: ${r.dfm.counts.near} features closer than the margin`);
  }
});

test('fade drops features below the process minimum', () => {
  const s = defaultState();
  Object.assign(s.modifier, { mode: 'linear', angle: 0, start: 0, end: 100, minScale: 0, belowMin: 'drop' });
  const r = run(s);
  assert.equal(r.dfm.counts.small, 0);
  s.modifier.belowMin = 'keep';
  assert.ok(run(s).dfm.counts.small > 0);
});

test('keep-outs remove features', () => {
  const s = defaultState();
  const n = run(s).features.length;
  s.keepouts = [{ shape: 'circle', x: 60, y: 20, w: 10, h: 10, margin: 1 }];
  const r = run(s);
  assert.ok(r.features.length < n);
  for (const f of r.features) assert.ok(Math.hypot(f.x - 60, f.y - 20) >= 6 + f.r - 1e-9);
});

test('SVG declares mm size with a matching viewBox', () => {
  const s = defaultState();
  const svg = toSVG(run(s));
  assert.match(svg, /width="120mm" height="40mm" viewBox="0 0 120 40"/);
  assert.match(svg, /<circle /);
  const cal = toSVG(run(s), { calibration: true });
  assert.match(cal, /width="135mm" height="40mm" viewBox="0 0 135 40"/);
});

test('DXF uses mm, circles and no splines', () => {
  const s = defaultState();
  const dxf = toDXF(run(s));
  assert.match(dxf, /\$INSUNITS\r\n70\r\n4/);
  assert.match(dxf, /CIRCLE/);
  assert.doesNotMatch(dxf, /SPLINE/);
  assert.ok(dxf.trim().endsWith('EOF'));
});

test('migrate fills in missing fields', () => {
  const s = migrate({ seed: 5, generator: { type: 'knurl', params: { knurl: { pitch: 3 } } } });
  assert.equal(s.seed, 5);
  assert.equal(s.generator.type, 'knurl');
  assert.equal(s.generator.params.knurl.pitch, 3);
  assert.equal(s.generator.params.knurl.groove, 0.4);
  assert.ok(s.boundary.w > 0);
});

test('performance: 10,000 holes generate and check quickly', () => {
  const s = defaultState();
  s.boundary = { shape: 'rect', w: 300, h: 300, margin: 1, edgeRule: 'drop' };
  Object.assign(s.generator.params.grid, { layout: 'stagger60', size: 2, pitch: 3 });
  const r = run(s);
  assert.ok(r.features.length > 9000, `${r.features.length}`);
  assert.ok(r.ms < 1500, `took ${r.ms.toFixed(0)} ms`);
});

test('presets pass their own process rules', () => {
  for (const [name, apply] of Object.entries(PRESETS)) {
    const s = defaultState();
    apply(s);
    const c = run(s).dfm.counts;
    assert.deepEqual([c.small, c.thin, c.near], [0, 0, 0], name);
  }
});

test('radial rings keep straight-line hole spacing at or above the pitch', () => {
  const s = defaultState();
  s.boundary = { shape: 'circle', w: 80, h: 80, margin: 2, edgeRule: 'drop' };
  s.generator.type = 'radial';
  Object.assign(s.generator.params.radial, { size: 1.5, ringPitch: 2.6, holePitch: 2.6, start: 0 });
  s.process = { preset: 'custom', thickness: 1, material: 'steel', overrides: { minFeature: 0, minLigament: 1.1 - 1e-9, minEdge: 0, maxOpen: 100 } };
  assert.equal(run(s).dfm.counts.thin, 0);
});

test('presets start clean: earlier preset settings do not leak', () => {
  const s = defaultState();
  applyPreset(s, 'Diamond knurl grip');
  assert.equal(s.export.featuresAre, 'raised');
  s.seed = 77;
  applyPreset(s, 'Round speaker (radial)');
  assert.equal(s.export.featuresAre, 'holes');
  assert.equal(s.export.bevel, 0);
  assert.equal(s.seed, 77);
});
