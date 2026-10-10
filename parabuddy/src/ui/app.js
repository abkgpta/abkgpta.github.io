// parabuddy app shell: state, history, panels, preview and export.
import { run } from '../core/pipeline.js';
import { GENERATORS } from '../core/generators.js';
import { VARIATION_MODES } from '../core/modifiers.js';
import { BOUNDARY_SHAPES } from '../core/boundary.js';
import { EDGE_RULES } from '../core/pipeline.js';
import { PROCESSES, MATERIALS, resolveRules } from '../core/dfm.js';
import { defaultState, migrate, PRESETS, applyPreset } from '../core/state.js';
import { toSVG } from '../export/svg.js';
import { toDXF } from '../export/dxf.js';
import { TARGETS, FILE_LABELS } from '../export/profiles.js';
import { renderFields, el, fmtNum } from './controls.js';
import { Preview } from './preview.js';
import { renderMap, mapSize } from './maps.js';

const $ = (id) => document.getElementById(id);
const STORE_KEY = 'parabuddy:doc:v1';

let state = defaultState();
let result = null;
let image = null; // { w, h, lum: Float32Array } for halftone; kept in memory only
const history = { past: [], future: [], last: null };

// ---------- persistence ----------
const store = {
  get() { try { return JSON.parse(localStorage.getItem(STORE_KEY)); } catch { return null; } },
  set(v) { try { localStorage.setItem(STORE_KEY, JSON.stringify(v)); } catch { /* private mode */ } },
};

async function encodeShare(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  const cs = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
  const buf = new Uint8Array(await new Response(cs).arrayBuffer());
  let bin = '';
  for (const b of buf) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function decodeShare(str) {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64 + '==='.slice((b64.length + 3) % 4));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  const ds = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return JSON.parse(await new Response(ds).text());
}

// ---------- state changes ----------
let frame = 0;
function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(() => { frame = 0; compute(); });
}

function commit() {
  const snap = JSON.stringify(state);
  if (snap === history.last) return;
  if (history.last) history.past.push(history.last);
  if (history.past.length > 100) history.past.shift();
  history.future = [];
  history.last = snap;
  store.set(state);
  updateHistoryButtons();
}

function change(mutate, { commit: doCommit = true, rerender } = {}) {
  mutate(state);
  if (rerender) rerender();
  schedule();
  if (doCommit) commit();
}

function restore(snap) {
  state = migrate(JSON.parse(snap));
  history.last = snap;
  store.set(state);
  renderAll();
  schedule();
  updateHistoryButtons();
}

function undo() { if (history.past.length) { history.future.push(history.last); restore(history.past.pop()); } }
function redo() { if (history.future.length) { history.past.push(history.last); restore(history.future.pop()); } }
function updateHistoryButtons() { $('undo').disabled = !history.past.length; $('redo').disabled = !history.future.length; }

// ---------- compute + readouts ----------
function sampler(u, v) {
  if (!image) return 1;
  const x = Math.min(image.w - 1, Math.max(0, u * (image.w - 1)));
  const y = Math.min(image.h - 1, Math.max(0, v * (image.h - 1)));
  const x0 = Math.floor(x), y0 = Math.floor(y), x1 = Math.min(image.w - 1, x0 + 1), y1 = Math.min(image.h - 1, y0 + 1);
  const fx = x - x0, fy = y - y0, L = image.lum, W = image.w;
  const a = L[y0 * W + x0], b = L[y0 * W + x1], c = L[y1 * W + x0], d = L[y1 * W + x1];
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}

function compute() {
  try {
    result = run(state, { sampler });
  } catch (err) {
    console.error(err);
    toast(`Could not build the pattern: ${err.message}`);
    return;
  }
  preview.calibration = state.export.calibration;
  preview.set(result);
  renderMetrics();
  renderChecks();
  renderExportSummary();
  $('statusDims').textContent = `${fmt(result.boundary.w)} × ${fmt(result.boundary.h)} mm · ${result.features.length.toLocaleString()} features`;
  $('statusTime').textContent = `${result.ms.toFixed(0)} ms`;
}

const fmt = (v, d = 2) => (Number.isFinite(v) ? (+v).toFixed(d) : '—');

function renderMetrics() {
  const m = result.metrics;
  const mat = MATERIALS[state.process.material] || MATERIALS.aluminium;
  const rows = [
    ['Open area', `${fmt(m.openPct, 1)} %`, 'big'],
    ['Features', m.count.toLocaleString()],
    ['Smallest feature', `${fmt(m.minFeature, 3)} mm`],
    ['Largest feature', `${fmt(m.maxFeature, 3)} mm`],
    ['Thinnest web', m.minLigament === null ? '—' : m.minLigament < 0 ? 'overlap' : `${fmt(m.minLigament, 3)} mm`],
    ['Cut length', m.cutLength >= 1000 ? `${fmt(m.cutLength / 1000, 2)} m` : `${fmt(m.cutLength, 0)} mm`],
    ['Curves in CAD', m.curves.toLocaleString()],
    [`Mass saved (${mat.label.toLowerCase()}, ${fmt(+state.process.thickness, 2)} mm)`, `${fmt(m.massSaved, 1)} g of ${fmt(m.solidMass, 1)} g`],
  ];
  $('metrics').replaceChildren(...rows.flatMap(([k, v, cls]) => [el('dt', { text: k }), el('dd', { text: v, class: cls })]));
}

function renderChecks() {
  const r = result.rules, c = result.dfm.counts, m = result.metrics;
  const items = [
    [c.small ? 'bad' : 'ok', c.small ? `${c.small} features under ${fmt(r.minFeature, 3)} mm minimum size` : `All features at least ${fmt(r.minFeature, 3)} mm`],
    [c.thin ? 'bad' : 'ok', c.thin ? `${c.thin} features with web under ${fmt(r.minLigament, 3)} mm` : `All webs at least ${fmt(r.minLigament, 3)} mm`],
    [c.near ? 'bad' : 'ok', c.near ? `${c.near} features closer than ${fmt(r.minEdge, 2)} mm to the edge` : `Edge distance at least ${fmt(r.minEdge, 2)} mm`],
    [m.openPct > r.maxOpen ? 'bad' : 'ok', `Open area ${fmt(m.openPct, 1)}% (limit ${fmt(r.maxOpen, 0)}%)`],
  ];
  const t = TARGETS[state.export.target];
  if (t && t.curveLimit) items.push([m.curves > t.curveLimit ? 'warn' : 'ok', `${m.curves.toLocaleString()} curves (${t.label} draws up to about ${t.curveLimit} per plane)`]);
  for (const w of result.warnings) items.push(['warn', w]);
  if (!result.features.length) items.push(['warn', 'No features fit. Check the margin, size and pitch.']);
  $('checks').replaceChildren(...items.map(([cls, text]) => el('li', { class: cls }, el('span', { class: 'dot' }), el('span', { text }))));
}

// ---------- sections ----------
function renderPattern() {
  const box = $('secPattern');
  const type = state.generator.type;
  const gen = GENERATORS[type];
  const sel = el('select', { 'aria-label': 'Generator' });
  for (const [k, g] of Object.entries(GENERATORS)) sel.append(el('option', { value: k, text: g.label }));
  sel.value = type;
  sel.addEventListener('change', () => change((s) => {
    s.generator.type = sel.value;
    s.boundary.edgeRule = GENERATORS[sel.value].edgeRule;
  }, { rerender: () => { renderPattern(); renderPanel(); } }));
  const fieldsBox = el('div', { style: 'display:grid;gap:10px' });
  box.replaceChildren(el('div', { class: 'field' }, el('div', { class: 'label', text: 'Generator' }), sel), fieldsBox);
  const params = state.generator.params[type];
  const draw = () => renderFields(fieldsBox, gen.params, params, (k, v, o) => {
    change((s) => { s.generator.params[type][k] = v; }, { commit: o.commit, rerender: o.structural ? draw : null });
  });
  draw();
}

function variationSchema(m) {
  const common = [
    { key: 'minScale', label: 'Smallest size', unit: '%', min: 0, max: 100, step: 1 },
    { key: 'invert', label: 'Invert', type: 'bool' },
    { key: 'gamma', label: 'Contrast (gamma)', min: 0.2, max: 4, step: 0.05 },
    { key: 'belowMin', label: 'Below the process minimum', type: 'select', options: { drop: 'Drop the feature', clamp: 'Hold at the minimum', keep: 'Keep (flagged)' } },
  ];
  switch (m.mode) {
    case 'linear': return [{ key: 'angle', label: 'Direction', unit: '°', min: -180, max: 180, step: 1 }, { key: 'start', label: 'Fade starts at', unit: '%', min: 0, max: 100, step: 1 }, { key: 'end', label: 'Full size at', unit: '%', min: 0, max: 100, step: 1 }, ...common];
    case 'radial': return [{ key: 'cx', label: 'Attractor X', unit: '%', min: 0, max: 100, step: 1 }, { key: 'cy', label: 'Attractor Y', unit: '%', min: 0, max: 100, step: 1 }, { key: 'radius', label: 'Reach', unit: 'mm', min: 1, max: 500, step: 0.5 }, ...common];
    case 'noise': return [{ key: 'scale', label: 'Feature scale', unit: 'mm', min: 1, max: 200, step: 0.5 }, ...common];
    case 'image': return common;
    default: return [];
  }
}

function renderVariation() {
  const box = $('secVariation');
  const m = state.modifier;
  const sel = el('select', { 'aria-label': 'Variation' });
  for (const [k, v] of Object.entries(VARIATION_MODES)) sel.append(el('option', { value: k, text: v }));
  sel.value = m.mode;
  sel.addEventListener('change', () => change((s) => { s.modifier.mode = sel.value; }, { rerender: renderVariation }));
  const fieldsBox = el('div', { style: 'display:grid;gap:10px' });
  const kids = [el('div', { class: 'field' }, el('div', { class: 'label', text: 'Vary size by' }), sel)];
  if (m.mode === 'image') {
    const file = el('input', { type: 'file', accept: 'image/*' });
    file.addEventListener('change', () => loadImage(file.files[0]));
    kids.push(el('div', { class: 'field' }, el('div', { class: 'label', text: image ? `Image loaded (${image.w}×${image.h})` : 'Grayscale image (white = full size)' }), file));
    kids.push(el('div', { class: 'hint', text: 'The image stays on this device and is not stored in presets or share links.' }));
  }
  if (state.generator.type === 'voronoi' && m.mode !== 'none') kids.push(el('div', { class: 'hint', text: 'For Voronoi, variation sets cell density instead of size.' }));
  kids.push(fieldsBox);
  box.replaceChildren(...kids);
  renderFields(fieldsBox, variationSchema(m), m, (k, v, o) => change((s) => { s.modifier[k] = v; }, { commit: o.commit }));
}

async function loadImage(file) {
  if (!file) return;
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 1024 / Math.max(bmp.width, bmp.height));
    const w = Math.max(1, Math.round(bmp.width * k)), h = Math.max(1, Math.round(bmp.height * k));
    const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
    const ctx = c.getContext('2d');
    ctx.drawImage(bmp, 0, 0, w, h);
    const d = ctx.getImageData(0, 0, w, h).data;
    const lum = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) lum[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255 * (d[i * 4 + 3] / 255) + (1 - d[i * 4 + 3] / 255);
    image = { w, h, lum };
    renderVariation();
    schedule();
  } catch (err) {
    toast(`Could not read that image: ${err.message}`);
  }
}

function renderPanel() {
  const b = state.boundary;
  const schema = [
    { key: 'shape', label: 'Shape', type: 'select', options: BOUNDARY_SHAPES },
    { key: 'w', label: b.shape === 'circle' ? 'Diameter' : 'Width', unit: 'mm', min: 1, max: 1000, step: 0.1 },
    { key: 'h', label: 'Height', unit: 'mm', min: 1, max: 1000, step: 0.1, when: (v) => v.shape !== 'circle' },
    { key: 'r', label: 'Corner radius', unit: 'mm', min: 0, max: 200, step: 0.1, when: (v) => v.shape === 'rounded' },
    { key: 'margin', label: 'Edge margin', unit: 'mm', min: 0, max: 50, step: 0.1 },
    { key: 'edgeRule', label: 'At the margin', type: 'select', options: EDGE_RULES },
  ];
  renderFields($('secPanel'), schema, b, (k, v, o) => change((s) => { s.boundary[k] = v; }, { commit: o.commit, rerender: o.structural ? renderPanel : null }));
}

function renderKeepouts() {
  const box = $('secKeepouts');
  const list = state.keepouts;
  const kids = [el('div', { class: 'hint', text: 'Areas with no pattern: logos, bosses, screw holes. Position from the panel\'s bottom-left corner.' })];
  list.forEach((k, i) => {
    const card = el('div', { class: 'keepout' });
    const schema = [
      { key: 'shape', label: `Zone ${i + 1}`, type: 'select', options: { circle: 'Circle', rect: 'Rectangle' } },
      { key: 'x', label: 'Centre X', unit: 'mm', min: 0, max: 1000, step: 0.1 },
      { key: 'y', label: 'Centre Y', unit: 'mm', min: 0, max: 1000, step: 0.1 },
      { key: 'w', label: k.shape === 'rect' ? 'Width' : 'Diameter', unit: 'mm', min: 0, max: 1000, step: 0.1 },
      { key: 'h', label: 'Height', unit: 'mm', min: 0, max: 1000, step: 0.1, when: (v) => v.shape === 'rect' },
      { key: 'margin', label: 'Clearance', unit: 'mm', min: 0, max: 50, step: 0.1 },
    ];
    const inner = el('div', { style: 'display:grid;gap:8px' });
    renderFields(inner, schema, k, (key, v, o) => change((s) => { s.keepouts[i][key] = v; }, { commit: o.commit, rerender: o.structural ? renderKeepouts : null }));
    card.append(inner, el('button', { text: 'Remove', onclick: () => change((s) => { s.keepouts.splice(i, 1); }, { rerender: renderKeepouts }) }));
    kids.push(card);
  });
  kids.push(el('button', {
    text: '+ Add keep-out',
    onclick: () => change((s) => { s.keepouts.push({ shape: 'circle', x: +(s.boundary.w / 2).toFixed(1), y: +(s.boundary.h / 2).toFixed(1), w: 10, h: 10, margin: 1 }); }, { rerender: renderKeepouts }),
  }));
  box.replaceChildren(...kids);
}

function renderProcess() {
  const p = state.process;
  const base = PROCESSES[p.preset] || PROCESSES.custom;
  const rules = resolveRules(p);
  const top = el('div', { style: 'display:grid;gap:10px' });
  renderFields(top, [
    { key: 'preset', label: 'Process', type: 'select', options: Object.fromEntries(Object.entries(PROCESSES).map(([k, v]) => [k, v.label])) },
    { key: 'thickness', label: 'Material thickness', unit: 'mm', min: 0.05, max: 50, step: 0.05 },
    { key: 'material', label: 'Material', type: 'select', options: Object.fromEntries(Object.entries(MATERIALS).map(([k, v]) => [k, v.label])) },
  ], p, (k, v, o) => change((s) => { s.process[k] = v; }, { commit: o.commit, rerender: o.structural || (k === 'thickness' && o.commit) ? renderProcess : null }));
  const rulesBox = el('div', { style: 'display:grid;gap:10px' });
  const ruleField = (key, label, unit, step, max) => ({
    key, label, unit, min: 0, max, step,
    reset: () => change((s) => { delete s.process.overrides[key]; }, { rerender: renderProcess }),
  });
  renderFields(rulesBox, [
    ruleField('minFeature', 'Min feature size', 'mm', 0.01, 20),
    ruleField('minLigament', 'Min web (ligament)', 'mm', 0.01, 20),
    ruleField('minEdge', 'Min distance to edge', 'mm', 0.05, 50),
    ruleField('maxOpen', 'Max open area', '%', 1, 100),
  ], rules, (k, v, o) => change((s) => { s.process.overrides[k] = v; }, { commit: o.commit }), {
    overridden: (k) => p.overrides[k] !== undefined,
  });
  $('secProcess').replaceChildren(top, rulesBox, el('div', { class: 'hint box', text: `${base.note} These are rules of thumb, not supplier sign-off.` }));
}

function renderExport() {
  const ex = state.export;
  const box = $('secExport');
  const target = TARGETS[ex.target] || TARGETS.rhino;
  const top = el('div', { style: 'display:grid;gap:10px' });
  renderFields(top, [
    { key: 'target', label: 'Importing into', type: 'select', options: Object.fromEntries(Object.entries(TARGETS).map(([k, v]) => [k, v.label])) },
  ], ex, (k, v) => change((s) => { s.export[k] = v; }, { rerender: () => { renderExport(); renderChecks(); } }));

  const summary = el('div', { class: 'summary', id: 'exportSummary' });
  const steps = el('ol', { class: 'steps' }, ...target.steps.map((t) => el('li', { text: t })));
  const grid = el('div', { class: 'export-grid' });
  for (const kind of ['svg', 'dxf', 'height', 'normal', 'opacity', 'mask', 'json']) {
    const rec = target.files[0] === kind;
    grid.append(el('button', { class: rec ? 'rec' : '', title: rec ? 'Recommended for this tool' : '', text: FILE_LABELS[kind], onclick: () => download(kind) }));
  }
  const opts = el('div', { style: 'display:grid;gap:10px' });
  renderFields(opts, [
    { key: 'calibration', label: 'Add a 10 mm calibration square (own layer)', type: 'bool' },
    { key: 'pxPerMm', label: 'Map resolution', unit: 'px/mm', min: 1, max: 100, step: 1 },
    { key: 'featuresAre', label: 'In maps, features are', type: 'select', options: { holes: 'Holes (cut or recessed)', raised: 'Raised' } },
    { key: 'bevel', label: 'Edge bevel in maps', unit: 'mm', min: 0, max: 5, step: 0.01 },
    { key: 'depth', label: 'Normal map depth', unit: 'mm', min: 0.01, max: 10, step: 0.01 },
    { key: 'normalDX', label: 'DirectX normals (green down)', type: 'bool' },
  ], ex, (k, v, o) => change((s) => { s.export[k] = v; }, { commit: o.commit }));
  box.replaceChildren(top, summary, steps, grid, el('h2', { text: 'Options' }), opts);
  renderExportSummary();
}

function renderExportSummary() {
  const s = $('exportSummary');
  if (!s || !result) return;
  const ex = state.export;
  const { W, H, ok } = mapSize(result.boundary, ex.pxPerMm);
  s.textContent = `Imports at ${fmt(result.boundary.w)} × ${fmt(result.boundary.h)} mm · ${result.metrics.curves.toLocaleString()} curves · maps ${W}×${H} px${ok ? '' : ' (too large, lower the resolution)'}`;
}

// ---------- export ----------
const slug = () => (state.name || 'pattern').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'pattern';

function save(name, data, type) {
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  const a = el('a', { href: URL.createObjectURL(blob), download: name });
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

async function download(kind) {
  if (!result) return;
  const b = result.boundary;
  const size = `${fmtNum(b.w, 0.001)}x${fmtNum(b.h, 0.001)}mm`;
  const ex = state.export;
  const meta = { app: 'parabuddy', version: 1, seed: state.seed, generator: state.generator.type, units: 'mm' };
  try {
    if (kind === 'svg') return save(`${slug()}_${size}.svg`, toSVG(result, { calibration: ex.calibration, meta }), 'image/svg+xml');
    if (kind === 'dxf') return save(`${slug()}_${size}.dxf`, toDXF(result, { calibration: ex.calibration }), 'application/dxf');
    if (kind === 'json') return save(`${slug()}.parabuddy.json`, JSON.stringify(state, null, 2), 'application/json');
    const { ok } = mapSize(b, ex.pxPerMm);
    if (!ok) return toast('Map is too large. Lower the map resolution.');
    toast('Rendering map…');
    const png = await renderMap(kind, result, ex);
    save(`${slug()}_${kind}_${size}_${fmtNum(ex.pxPerMm, 0.01)}pxmm.png`, new Blob([png], { type: 'image/png' }));
    toast('Map saved.');
  } catch (err) {
    console.error(err);
    toast(`Export failed: ${err.message}`);
  }
}

// ---------- misc ui ----------
let toastTimer = 0;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
}

function renderAll() {
  $('docName').value = state.name || '';
  $('seed').value = state.seed;
  renderPattern();
  renderVariation();
  renderPanel();
  renderKeepouts();
  renderProcess();
  renderExport();
}

const preview = new Preview($('view'), {
  onHover(h) {
    const tip = $('tip');
    if (!h) { tip.hidden = true; $('statusCursor').textContent = ''; return; }
    $('statusCursor').textContent = `x ${fmt(h.x)}  y ${fmt(h.y)} mm`;
    if (h.index < 0 || !result) { tip.hidden = true; return; }
    const k = h.index, f = result.features[k], d = result.dfm;
    const lines = [`${f.kind === 'circle' ? `Ø ${fmt(2 * f.r, 3)}` : `${fmt(d.widths[k], 3)} wide`} mm`];
    if (Number.isFinite(d.ligaments[k])) lines.push(d.ligaments[k] < 0 ? 'overlaps a neighbour' : `web ${fmt(d.ligaments[k], 3)} mm`);
    if (Number.isFinite(d.edge[k])) lines.push(`edge ${fmt(d.edge[k], 2)} mm`);
    const fl = d.flags[k];
    if (fl) lines.push(['too small', 'web too thin', 'too close to edge'].filter((_, i) => fl & (1 << i)).join(', '));
    tip.textContent = lines.join(' · ');
    tip.style.left = `${h.px}px`;
    tip.style.top = `${h.py}px`;
    tip.hidden = false;
  },
});

function bindTopbar() {
  const presetSel = $('presetSelect');
  for (const name of Object.keys(PRESETS)) presetSel.append(el('option', { value: name, text: name }));
  presetSel.addEventListener('change', () => {
    const name = presetSel.value;
    if (!name) return;
    change((s) => { applyPreset(s, name); }, { rerender: renderAll });
    preview.needsFit = true;
    preview.fit();
    presetSel.value = '';
  });
  $('docName').addEventListener('change', (e) => change((s) => { s.name = e.target.value; }));
  $('seed').addEventListener('change', (e) => {
    const v = parseInt(e.target.value, 10);
    if (Number.isFinite(v)) change((s) => { s.seed = v >>> 0; });
    else e.target.value = state.seed;
  });
  $('reseed').addEventListener('click', () => change((s) => { s.seed = (Math.random() * 1e6) | 0; }, { rerender: () => { $('seed').value = state.seed; } }));
  $('undo').addEventListener('click', undo);
  $('redo').addEventListener('click', redo);
  $('savePreset').addEventListener('click', () => download('json'));
  $('openPreset').addEventListener('click', () => $('presetFile').click());
  $('presetFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = migrate(JSON.parse(await file.text()));
      change((s) => Object.assign(s, data), { rerender: renderAll });
      preview.needsFit = true;
      preview.fit();
      toast(`Opened ${file.name}`);
    } catch (err) {
      toast(`That file is not a parabuddy preset (${err.message}).`);
    }
    e.target.value = '';
  });
  $('share').addEventListener('click', async () => {
    try {
      const url = `${location.origin}${location.pathname}#s=${await encodeShare(state)}`;
      window.history.replaceState(null, '', url);
      await navigator.clipboard.writeText(url);
      toast('Link copied. It holds every setting, so anyone can reopen this exact pattern.');
    } catch {
      toast('Copy failed; the link is in the address bar.');
    }
  });
  $('fit').addEventListener('click', () => preview.fit());
  $('oneToOne').addEventListener('click', () => preview.oneToOne());
  $('showIssues').addEventListener('change', (e) => { preview.showIssues = e.target.checked; preview.draw(); });
  window.addEventListener('keydown', (e) => {
    const typing = /INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName) && document.activeElement.type !== 'range' && document.activeElement.type !== 'checkbox';
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !typing) { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y' && !typing) { e.preventDefault(); redo(); }
    if (e.key.toLowerCase() === 'f' && !typing && !e.ctrlKey && !e.metaKey) preview.fit();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => preview.draw());
}

async function boot() {
  let loaded = null;
  const m = /#s=([\w-]+)/.exec(location.hash);
  if (m) {
    try { loaded = await decodeShare(m[1]); } catch { toast('That share link could not be read; opening your last pattern.'); }
  }
  state = migrate(loaded || store.get() || defaultState());
  history.last = JSON.stringify(state);
  bindTopbar();
  renderAll();
  updateHistoryButtons();
  compute();
}

boot();
