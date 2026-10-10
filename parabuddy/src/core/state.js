// The document. Everything needed to reproduce a pattern exactly lives here.
import { GENERATORS } from './generators.js';
import { defaults } from './pipeline.js';

export const SCHEMA_VERSION = 1;

export function defaultState() {
  const params = {};
  for (const [k, g] of Object.entries(GENERATORS)) params[k] = defaults(g);
  return {
    version: SCHEMA_VERSION,
    name: 'Speaker grille',
    seed: 1234,
    boundary: { shape: 'rounded', w: 120, h: 40, r: 8, margin: 2, edgeRule: 'drop' },
    generator: { type: 'grid', params },
    modifier: { mode: 'none', minScale: 0, invert: false, angle: 0, start: 0, end: 100, cx: 50, cy: 50, radius: 40, scale: 12, gamma: 1, belowMin: 'drop' },
    keepouts: [],
    process: { preset: 'laser_sheet', thickness: 1, material: 'aluminium', overrides: {} },
    export: { target: 'rhino', calibration: false, pxPerMm: 10, bevel: 0, depth: 1, featuresAre: 'holes', normalDX: false },
  };
}

// Fill in anything a preset file is missing, so old presets keep loading.
export function migrate(s) {
  const d = defaultState();
  if (!s || typeof s !== 'object') return d;
  const out = { ...d, ...s };
  out.boundary = { ...d.boundary, ...(s.boundary || {}) };
  out.modifier = { ...d.modifier, ...(s.modifier || {}) };
  out.process = { ...d.process, ...(s.process || {}), overrides: { ...((s.process || {}).overrides || {}) } };
  out.export = { ...d.export, ...(s.export || {}) };
  out.generator = { type: (s.generator || {}).type || d.generator.type, params: { ...d.generator.params } };
  for (const [k, v] of Object.entries((s.generator || {}).params || {})) out.generator.params[k] = { ...(d.generator.params[k] || {}), ...v };
  if (!GENERATORS[out.generator.type]) out.generator.type = 'grid';
  out.keepouts = Array.isArray(s.keepouts) ? s.keepouts : [];
  out.version = SCHEMA_VERSION;
  return out;
}

export const PRESETS = {
  'Speaker grille': (s) => {
    s.boundary = { ...s.boundary, shape: 'rounded', w: 120, h: 40, r: 8, margin: 2, edgeRule: 'drop' };
    s.generator.type = 'grid';
    Object.assign(s.generator.params.grid, { layout: 'stagger60', shape: 'circle', size: 2, pitch: 3, angle: 0, jitter: 0 });
    s.modifier.mode = 'none';
    s.process.preset = 'laser_sheet';
  },
  'Round speaker (radial)': (s) => {
    s.boundary = { ...s.boundary, shape: 'circle', w: 80, h: 80, margin: 2, edgeRule: 'drop' };
    s.generator.type = 'radial';
    Object.assign(s.generator.params.radial, { size: 1.5, ringPitch: 2.6, holePitch: 2.6, start: 0, stagger: true });
    s.modifier.mode = 'none';
    s.process.preset = 'punched_sheet';
  },
  'Fading vent': (s) => {
    s.boundary = { ...s.boundary, shape: 'rounded', w: 160, h: 60, r: 10, margin: 3, edgeRule: 'drop' };
    s.generator.type = 'grid';
    Object.assign(s.generator.params.grid, { layout: 'stagger60', shape: 'hexagon', size: 3, pitch: 4.2, angle: 0, shapeRot: 30 });
    Object.assign(s.modifier, { mode: 'linear', angle: 0, start: 0, end: 70, minScale: 0, invert: false, belowMin: 'drop' });
    s.process.preset = 'laser_sheet';
  },
  'Voronoi panel': (s) => {
    s.boundary = { ...s.boundary, shape: 'rounded', w: 100, h: 100, r: 12, margin: 4, edgeRule: 'clip' };
    s.generator.type = 'voronoi';
    Object.assign(s.generator.params.voronoi, { cells: 90, web: 2, relax: 2 });
    s.modifier.mode = 'none';
    s.process.preset = 'fdm';
  },
  'Diamond knurl grip': (s) => {
    s.boundary = { ...s.boundary, shape: 'rect', w: 60, h: 25, margin: 1, edgeRule: 'clip' };
    s.generator.type = 'knurl';
    Object.assign(s.generator.params.knurl, { pitch: 1.6, knurlAngle: 30, groove: 0.35, angle: 0 });
    s.modifier.mode = 'none';
    s.process.preset = 'mould_texture';
    s.export.featuresAre = 'raised';
    s.export.bevel = 0.3;
  },
  'Vent slots': (s) => {
    s.boundary = { ...s.boundary, shape: 'rounded', w: 140, h: 50, r: 6, margin: 4, edgeRule: 'drop' };
    s.generator.type = 'ribs';
    Object.assign(s.generator.params.ribs, { width: 2.5, gap: 2.5, angle: 0, ends: 'round', segment: 40, bridge: 4 });
    s.modifier.mode = 'none';
    s.process.preset = 'punched_sheet';
  },
  'Hidden-until-lit icon': (s) => {
    s.boundary = { ...s.boundary, shape: 'circle', w: 6, h: 6, margin: 0.5, edgeRule: 'drop' };
    s.generator.type = 'grid';
    Object.assign(s.generator.params.grid, { layout: 'stagger60', shape: 'circle', size: 0.03, pitch: 0.2, angle: 0 });
    s.modifier.mode = 'none';
    s.process.preset = 'micro_perf';
    s.process.thickness = 0.5;
  },
};

// Apply a preset on top of a clean document, keeping the user's seed and export target.
export function applyPreset(s, name) {
  const d = defaultState();
  const keep = { seed: s.seed, target: s.export.target, pxPerMm: s.export.pxPerMm };
  Object.assign(s, d);
  s.seed = keep.seed;
  s.export.target = keep.target;
  s.export.pxPerMm = keep.pxPerMm;
  PRESETS[name](s);
  s.name = name;
  return s;
}
