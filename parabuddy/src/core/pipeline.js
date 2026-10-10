// State in, manufacturable pattern out. Pure: no DOM, so it runs in tests and workers.
import * as B from './boundary.js';
import * as F from './features.js';
import { GENERATORS } from './generators.js';
import { makeField } from './modifiers.js';
import { mulberry32 } from './rng.js';
import { insetConvex, clipByConvex, distPointPolyEdges, pointInPoly, polyPolyDistance, ensureCCW } from './geometry.js';
import { resolveRules, check } from './dfm.js';
import { compute } from './metrics.js';

export const EDGE_RULES = {
  drop: 'Drop holes that cross the margin',
  shrink: 'Shrink round holes to fit',
  clip: 'Clip holes to the margin',
};

function insideRegion(f, region) {
  if (f.kind === 'circle') {
    return pointInPoly(f.x, f.y, region) && distPointPolyEdges(f.x, f.y, region) >= f.r - 1e-6;
  }
  for (const [x, y] of F.outline(f, 24)) {
    if (!pointInPoly(x, y, region) && distPointPolyEdges(x, y, region) > 1e-6) return false;
  }
  return true;
}

function keepoutOutline(k) {
  const m = Math.max(0, +k.margin || 0);
  if (k.shape === 'rect') {
    const hw = Math.max(0, +k.w) / 2 + m, hh = Math.max(0, +k.h) / 2 + m;
    return [[k.x - hw, k.y - hh], [k.x + hw, k.y - hh], [k.x + hw, k.y + hh], [k.x - hw, k.y + hh]];
  }
  return F.outline(F.circle(+k.x, +k.y, Math.max(0, +k.w) / 2 + m), 48);
}

export function run(state, opts = {}) {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const boundary = B.normalize(state.boundary);
  const outline = ensureCCW(B.outline(boundary));
  const margin = Math.max(0, +boundary.margin || 0);
  const inset = margin > 0 ? insetConvex(outline, margin) : outline;
  const gen = GENERATORS[state.generator.type] || GENERATORS.grid;
  const params = { ...defaults(gen), ...(state.generator.params[state.generator.type] || {}) };
  const rng = mulberry32((+state.seed || 0) >>> 0);
  const field = makeField(state.modifier, boundary.w, boundary.h, (+state.seed || 0) | 0, opts.sampler);
  const rules = resolveRules(state.process);
  const warnings = [];

  let raw = inset.length >= 3
    ? gen.generate(params, { w: boundary.w, h: boundary.h, outline, inset, rng, field, mod: state.modifier })
    : [];
  if (raw.length >= 60000) warnings.push('Pattern capped at 60,000 features. Increase the pitch or reduce the panel.');

  // Fit to the panel.
  const rule = state.boundary.edgeRule || 'drop';
  const fitted = [];
  for (const f of raw) {
    if (inset.length < 3) break;
    if (insideRegion(f, inset)) { fitted.push(f); continue; }
    if (rule === 'shrink' && f.kind === 'circle' && pointInPoly(f.x, f.y, inset)) {
      const r = Math.min(f.r, distPointPolyEdges(f.x, f.y, inset));
      if (r > 1e-6) fitted.push(F.circle(f.x, f.y, r));
    } else if (rule === 'clip') {
      const c = clipByConvex(F.outline(f, 48), inset);
      if (c.length >= 3) {
        const p = F.poly(c);
        if (F.area(p) > 1e-6) fitted.push(p);
      }
    }
  }

  // Keep-out zones.
  let features = fitted;
  const keepouts = (state.keepouts || []).filter((k) => +k.w > 0);
  if (keepouts.length) {
    const kos = keepouts.map(keepoutOutline);
    features = features.filter((f) => {
      const o = F.outline(f, 24);
      return kos.every((ko) => polyPolyDistance(o, ko) >= 0);
    });
  }

  // Features too small to make: drop or grow to the process minimum.
  const below = state.modifier?.belowMin || 'drop';
  const out = [];
  for (const f of features) {
    const wv = F.minWidth(f);
    if (wv >= rules.minFeature - 1e-9) { out.push(f); continue; }
    if (below === 'keep') out.push(f);
    else if (below === 'clamp' && wv > 1e-9) out.push(F.scaled(f, rules.minFeature / wv));
  }

  const dfm = check(out, outline, rules);
  const metrics = compute(out, boundary, dfm, state.process);
  if (dfm.counts.overlap) warnings.push(`${dfm.counts.overlap} features overlap a neighbour; open area is overstated.`);
  if (metrics.openPct > rules.maxOpen) warnings.push(`Open area ${metrics.openPct.toFixed(1)}% is above the ${rules.maxOpen}% limit for this process.`);
  const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return { boundary, outline, inset, keepouts, features: out, dfm, metrics, rules, warnings, ms: t1 - t0 };
}

export function defaults(gen) {
  const o = {};
  for (const p of gen.params) o[p.key] = p.def;
  return o;
}
