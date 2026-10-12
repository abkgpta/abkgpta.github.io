// ─────────────────────────────────────────────────────────────
// CELESTIAL · stage 1 sketch
// Draws one topic as a 3D solar system and lets you move through it.
// The content lives in data.js; this file only decides how it looks
// and behaves.
//
// How it's drawn:
//  • Orbs are outlined circles (HTML) placed in 3D space, so their
//    text stays crisp and can grow on hover.
//  • Streams and hover lines are drawn with WebGL (the 3D canvas).
// ─────────────────────────────────────────────────────────────
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

const DATA = window.CELESTIAL_DATA;

// ─── Fixed numbers ───────────────────────────────────────────
// The shape of the system. Several of these can be adjusted live
// from the View panel; these are the starting points.
const TUNING = {
  nearestOrbit: 9,        // distance of an orb with link = 1 (scene units)
  farthestOrbit: 24,      // distance of an orb with link = 0
  smallestOrb: 1.6,       // radius of an orb with relevance = 0
  largestOrb: 3.0,        // radius of an orb with relevance = 1
  sunSize: 3.6,
  minDiameter: 76,        // pixels: orbs never shrink below this, so names fit
  hoverDiameter: 250,     // pixels: a hovered orb grows to this so its preview fits
  focusDiameter: 400,     // pixels: a clicked orb opens to this to show its details
  farthestFade: 0.35,     // opacity of the farthest orb when "fade with distance" is on
  gap: 1.4,               // minimum space between orbs
  widen: 1.8,             // most a system may stretch to fill a wide screen
  hiddenLead: { maxLink: 0.45, minRelevance: 0.65 },  // when an orb glows
  pulses: {
    slowest: 6.0,         // seconds between streams for the least relevant orb
    fastest: 2.2,         // seconds between streams for the most relevant orb
    travel: 1.5,          // seconds a stream takes to cross
    // Stronger links get longer, thicker streams
    shortest: 1.4, longest: 6,     // stream length, in scene units
    thinnest: 1.2, thickest: 4.5,  // stream thickness, in pixels
  },
};

// ─── View settings: the controls in the View panel ───────────
const VIEW_DEFAULTS = {
  scheme: 'system',
  streams: true,
  relationColour: true,
  leadGlow: true,
  names: true,
  sameSize: true,
  depthFade: true,
  fillScreen: true,
  sway: true,
  spin: false,
  streamSpeed: 1,
  spacing: 1,
  orbSize: 1,
};
const VIEW_SETTINGS = [
  { group: 'Colour scheme' },
  { key: 'scheme', label: 'Scheme', options: [
    ['system', 'Match my device'],
    ['light', 'Studio · light grey'],
    ['dark', 'Graphite · dark'],
    ['paper', 'Paper · warm white'],
    ['blueprint', 'Blueprint · deep blue'],
    ['nebula', 'Nebula · near black'],
  ] },
  { group: 'Show' },
  { key: 'streams', label: 'Cause and effect streams' },
  { key: 'relationColour', label: 'Colour outlines by cause and effect' },
  { key: 'leadGlow', label: 'Glow around hidden leads' },
  { key: 'names', label: 'Names inside every orb', hint: 'Off: names appear on hover' },
  { group: 'Depth' },
  { key: 'sameSize', label: 'Same size at any depth', hint: 'Off: farther orbs look smaller' },
  { key: 'depthFade', label: 'Fade with distance', hint: 'Farther orbs are more see-through' },
  { key: 'fillScreen', label: 'Stretch to fill wide screens', relayout: true },
  { group: 'Motion' },
  { key: 'sway', label: 'Gentle sway until you grab it' },
  { key: 'spin', label: 'Slow spin' },
  { key: 'streamSpeed', label: 'Stream speed', min: 0.4, max: 2, step: 0.1, unit: '×' },
  { group: 'Scale' },
  { key: 'spacing', label: 'Spacing', min: 0.6, max: 1.6, step: 0.05, unit: '×', relayout: true },
  { key: 'orbSize', label: 'Orb size', min: 0.6, max: 1.5, step: 0.05, unit: '×', relayout: true },
];
const STORE_KEY = 'celestial.view';
const view = { ...VIEW_DEFAULTS, ...readStoredView() };
function readStoredView() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function storeView() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(view)); } catch { /* not available */ }
}

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const UI_TOP = 130, UI_BOTTOM = 40;   // pixels taken by the bars at top and bottom
const lerp = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;
const $ = (id) => document.getElementById(id);

// ─── Scene: renderer, camera, controls ───────────────────────
const stage = $('stage');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearAlpha(0);   // see-through, so the page background shows
stage.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.className = 'label-layer';
stage.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
const FOV = 40;
const tanV = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 600);
camera.position.set(0, 3, 80);

// The controls listen on the whole stage, so dragging works on orbs too
const controls = new OrbitControls(camera, stage);
controls.enableDamping = true;
controls.zoomSpeed = 2.4;          // faster trackpad pinch and scroll
controls.rotateSpeed = 0.8;
controls.autoRotateSpeed = 0.6;
controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.PAN };
// Stop the browser's own middle-click scrolling from taking over
stage.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); });

let grabbed = false;   // becomes true once you drag the view yourself
controls.addEventListener('start', () => { grabbed = true; });

const world = new THREE.Group();
scene.add(world);

// ─── Colours come from the CSS tokens in style.css ───────────
const palette = {};
function readPalette() {
  const css = getComputedStyle(document.documentElement);
  for (const name of ['line', 'cause', 'effect']) {
    palette[name] = new THREE.Color(css.getPropertyValue('--3d-' + name).trim());
  }
  for (const o of orbs) paintOrb(o);
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readPalette);
new MutationObserver(readPalette).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

// ─── State ───────────────────────────────────────────────────
let orbs = [];          // everything currently on screen; orbs[0] is the sun
let trail = [DATA.start];
let selected = null;
let hovered = null;
let busy = false;       // true while a transition is playing
let systemRadius = 20;

const isHiddenLead = (l) => l.link <= TUNING.hiddenLead.maxLink && l.relevance >= TUNING.hiddenLead.minRelevance;
const canUnfold = (id) => Boolean(DATA.systems[id]);
const orbitOf = (l) => lerp(TUNING.nearestOrbit, TUNING.farthestOrbit, 1 - l.link) * view.spacing;
const sizeOf = (l) => lerp(TUNING.smallestOrb, TUNING.largestOrb, l.relevance) * view.orbSize;

// ─── Layout: where each orb goes ─────────────────────────────
// Orbs are spread evenly in all three dimensions around the sun.
// Distance from the sun comes from "link".
function layout(links) {
  const n = links.length;
  // 1. Even directions over a sphere (a Fibonacci spiral, like seeds in a sunflower)
  const golden = Math.PI * (3 - Math.sqrt(5));
  const dirs = Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n;
    const ring = Math.sqrt(1 - y * y);
    return new THREE.Vector3(ring * Math.cos(i * golden), y, ring * Math.sin(i * golden));
  });
  // 2. Hand out directions so the biggest orbs don't end up side by side
  let stride = Math.max(1, Math.round(n * 0.382));
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  while (gcd(stride, n) !== 1) stride++;
  const placed = [...links]
    .sort((a, b) => b.relevance - a.relevance)
    .map((l, k) => ({ ...l, target: dirs[(k * stride) % n].clone().multiplyScalar(orbitOf(l)) }));
  // 3. Push apart any that still crowd each other in 3D, keeping each
  //    one's distance from the sun (so distance still means "link")
  const push = new THREE.Vector3();
  for (let pass = 0; pass < 120; pass++) {
    let moved = false;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = placed[i].target, b = placed[j].target;
        const need = sizeOf(placed[i]) + sizeOf(placed[j]) + TUNING.gap;
        const d = a.distanceTo(b);
        if (d >= need) continue;
        push.subVectors(a, b).normalize().multiplyScalar((need - d) / 2);
        a.add(push).setLength(orbitOf(placed[i]));
        b.sub(push).setLength(orbitOf(placed[j]));
        moved = true;
      }
    }
    if (!moved) break;
  }
  // 4. Optionally stretch sideways so a wide screen gets used
  if (view.fillScreen) {
    const usable = stage.clientWidth / Math.max(stage.clientHeight - UI_TOP - UI_BOTTOM, 1);
    const widen = clamp(usable, 1, TUNING.widen);
    for (const p of placed) { p.target.x *= widen; p.target.z *= widen; }
  }
  return placed;
}

// ─── Camera: frame the whole system so it fills the screen ───
function fitCamera(animate = true) {
  if (!orbs.length) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  const fy = (h - UI_TOP - UI_BOTTOM) / h;
  const fx = (w - 60) / w;
  systemRadius = Math.max(...orbs.map((o) => o.target.length()), 10);
  let dist = 20;
  for (const o of orbs) {
    const p = o.target, pad = o.radius * view.orbSize;
    dist = Math.max(dist,
      p.z + (Math.abs(p.y) + pad) / (tanV * fy),
      p.z + (Math.abs(p.x) + pad) / (tanV * camera.aspect * fx));
  }
  // Shift the view so the system sits in the space between the bars
  const shift = ((UI_TOP - UI_BOTTOM) / 2 / h) * 2 * tanV * dist;
  const to = new THREE.Vector3(0, dist * 0.05 + shift, dist);
  const look = new THREE.Vector3(0, shift, 0);
  controls.minDistance = dist * 0.25;
  controls.maxDistance = dist * 3;
  if (animate) { tweenVector(camera.position, to, 900); tweenVector(controls.target, look, 900); }
  else { camera.position.copy(to); controls.target.copy(look); }
}

// ─── Building orbs ───────────────────────────────────────────
function makeOrbElement(o) {
  const topic = DATA.topics[o.id];
  const el = document.createElement('div');
  el.className = ['orb',
    o.isSun ? 'sun' : 'rel-' + o.rel,
    o.lead ? 'lead' : '',
    !o.isSun && canUnfold(o.id) ? 'unfoldable' : '',
  ].filter(Boolean).join(' ');
  let tag = '';
  if (o.cameFrom) tag = 'Came from';
  else if (o.lead) tag = 'Hidden lead';
  const meter = (name, value, note) =>
    `<div><dt>${name}</dt><dd><span class="bar"><i style="width:${value * 100}%"></i></span><output>${Math.round(value * 100)}</output></dd><dd class="note">${note}</dd></div>`;
  el.innerHTML = `
    <button class="orb-close" type="button" data-action="close" aria-label="Close">&times;</button>
    ${tag ? `<span class="tag">${tag}</span>` : ''}
    <span class="rel"></span>
    <span class="t"></span>
    <span class="l"></span>
    <div class="more">
      ${o.isSun ? '' : `<dl class="meters">${meter('Link', o.link, 'distance')}${meter('Relevance', o.relevance, 'size')}</dl>`}
      <p class="slot">Picture, longer explanation and sources arrive in stage 2</p>
      ${o.isSun ? '' : canUnfold(o.id)
        ? '<button class="orb-unfold" type="button" data-action="unfold">Unfold</button>'
        : '<p class="slot">Not unfoldable in this sketch</p>'}
    </div>`;
  el.querySelector('.rel').textContent = relationText(o);
  el.querySelector('.t').textContent = topic.title;
  el.querySelector('.l').textContent = topic.liner;
  el.addEventListener('pointerenter', () => setHover(o));
  el.addEventListener('pointerleave', () => { if (hovered === o) setHover(null); });
  // Keyboard presses on the buttons (mouse clicks are handled on the stage)
  el.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action && e.detail === 0) runAction(action, o);
  });
  el._orb = o;
  return el;
}

// A stream is a straight segment one unit long, moved, turned and
// stretched into place every frame.
const STREAK = new LineGeometry();
STREAK.setPositions([0, 0, 0, 0, 0, 1]);
const streakMaterials = new Set();   // kept so they can follow window resizes

function makePulse(o) {
  const P = TUNING.pulses;
  const width = lerp(P.thinnest, P.thickest, o.link);
  // A short bright streak riding on a longer faint one reads as a
  // stream that tapers behind its head
  return [
    { length: 1, width: 0.75, strength: 0.35 },
    { length: 0.45, width: 1, strength: 1 },
  ].map((part) => {
    const m = new LineMaterial({ linewidth: width * part.width, transparent: true, depthWrite: false });
    m.resolution.set(stage.clientWidth, stage.clientHeight);
    streakMaterials.add(m);
    const streak = new Line2(STREAK, m);
    streak.frustumCulled = false;
    streak.userData = part;
    world.add(streak);
    return streak;
  });
}

function makeOrb(spec) {
  const o = {
    id: spec.to,
    rel: spec.rel || null,
    link: spec.link ?? 1,
    relevance: spec.relevance ?? 1,
    isSun: Boolean(spec.isSun),
    cameFrom: spec.cameFrom,
    target: spec.target || new THREE.Vector3(),
    start: new THREE.Vector3(),
    grow: 0,
    k: 0,          // 0 → 1 as the orb opens up on hover
    f: 0,          // 0 → 1 as the orb opens fully on click
    surface: 1,    // circle radius in scene units, worked out each frame
  };
  o.lead = !o.isSun && isHiddenLead(o);
  o.radius = o.isSun ? TUNING.sunSize : lerp(TUNING.smallestOrb, TUNING.largestOrb, o.relevance);
  o.el = makeOrbElement(o);
  o.obj = new CSS2DObject(o.el);
  world.add(o.obj);

  if (!o.isSun) {
    // A thin line to the sun, shown only while you point at or focus the orb
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    o.line = new THREE.Line(geo, new THREE.LineBasicMaterial({ transparent: true, opacity: 0 }));
    world.add(o.line);
  }
  if (o.rel === 'cause' || o.rel === 'effect') {
    o.pulse = makePulse(o);
    o.pulseLength = lerp(TUNING.pulses.shortest, TUNING.pulses.longest, o.link);
    o.pulseEvery = lerp(TUNING.pulses.slowest, TUNING.pulses.fastest, o.relevance);
    o.pulseOffset = Math.random() * o.pulseEvery;
  }
  paintOrb(o);
  return o;
}

function relationColour(o) {
  return o.rel === 'cause' ? palette.cause : o.rel === 'effect' ? palette.effect : palette.line;
}

function paintOrb(o) {
  if (o.line) o.line.material.color.copy(relationColour(o));
  if (o.pulse) for (const s of o.pulse) s.material.color.copy(relationColour(o));
}

function removeOrb(o) {
  world.remove(o.obj);   // also removes its HTML element
  if (o.line) { world.remove(o.line); o.line.geometry.dispose(); o.line.material.dispose(); }
  for (const s of o.pulse || []) { world.remove(s); s.material.dispose(); streakMaterials.delete(s.material); }
}

// ─── Showing a system ────────────────────────────────────────
function showSystem(sunId) {
  for (const o of orbs) removeOrb(o);
  setHover(null);
  const previous = trail.length > 1 ? trail[trail.length - 2] : null;
  const sun = makeOrb({ to: sunId, isSun: true });
  const planets = layout(DATA.systems[sunId]).map((spec) =>
    makeOrb({ ...spec, cameFrom: spec.to === previous }));
  orbs = [sun, ...planets];
  fitCamera();

  // Burst outward from the centre
  tween(900, (t) => {
    for (const o of orbs) {
      o.grow = o.isSun ? Math.min(1, t * 2) : t;
      o.obj.position.lerpVectors(o.start, o.target, t);
    }
  });
  renderTrail();
}

// Re-place the current orbs after a spacing or size change
function relayout() {
  if (!orbs.length || busy) return;
  const placed = layout(DATA.systems[orbs[0].id]);
  for (const o of orbs.slice(1)) {
    const p = placed.find((q) => q.to === o.id);
    if (p) o.target = p.target;
  }
  for (const o of orbs) tweenVector(o.obj.position, o.target, 500);
  fitCamera();
}

function unfold(id) {
  if (busy || !canUnfold(id)) return;
  const at = trail.indexOf(id);
  trail = at >= 0 ? trail.slice(0, at + 1) : [...trail, id];
  closeFocus();
  const chosen = orbs.find((o) => o.id === id);
  busy = true;
  const from = chosen ? chosen.obj.position.clone() : new THREE.Vector3();
  // Everything else shrinks away while the chosen orb slides to the centre
  tween(450, (t) => {
    for (const o of orbs) {
      if (o === chosen) o.obj.position.lerpVectors(from, new THREE.Vector3(), t);
      else o.grow = 1 - t;
    }
  }, () => {
    busy = false;
    world.rotation.y = 0;
    showSystem(id);
  });
}

// ─── Hover ───────────────────────────────────────────────────
function setHover(o) {
  hovered?.el.classList.remove('is-hover');
  hovered = o;
  o?.el.classList.add('is-hover');
}

// ─── Focus: a clicked orb opens up in place ─────────────────
function relationText(o) {
  const sun = DATA.topics[trail[trail.length - 1]].title;
  if (o.isSun) return 'Centre of this system';
  const verb = { cause: 'Cause of', effect: 'Effect of', related: 'Related to' }[o.rel];
  return `${verb} ${sun}`;
}

function openFocus(o) {
  if (selected === o) return;
  selected = o;
  updateDimming();
}

function closeFocus() {
  if (!selected) return;
  selected.el.style.translate = '';
  selected = null;
  updateDimming();
}

function runAction(action, o) {
  if (action === 'close') closeFocus();
  if (action === 'unfold') unfold(o.id);
}

function updateDimming() {
  for (const o of orbs) {
    o.el.classList.toggle('is-dim', Boolean(selected) && o !== selected && !o.isSun);
    o.el.classList.toggle('is-selected', o === selected);
  }
}

addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeFocus();
  setViewPanel(false);
});

// Click = press and release without dragging
let down = null;
stage.addEventListener('pointerdown', (e) => {
  down = {
    x: e.clientX, y: e.clientY,
    orb: e.target.closest?.('.orb')?._orb ?? null,
    action: e.target.closest?.('[data-action]')?.dataset.action ?? null,
  };
});
stage.addEventListener('pointerup', (e) => {
  const d = down;
  down = null;
  if (!d || e.button !== 0 || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) return;
  if (d.action && d.orb) runAction(d.action, d.orb);
  else if (d.orb) openFocus(d.orb);
  else closeFocus();
});

// ─── Trail (breadcrumb) ──────────────────────────────────────
function renderTrail() {
  $('about').textContent = DATA.topics[trail[trail.length - 1]].liner;
  const nav = $('trail');
  nav.replaceChildren();
  const depth = document.createElement('span');
  depth.className = 'depth';
  depth.textContent = `Depth ${trail.length}`;
  nav.append(depth);
  trail.forEach((id, i) => {
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'sep';
      sep.textContent = '›';
      nav.append(sep);
    }
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = DATA.topics[id].title;
    if (i === trail.length - 1) b.setAttribute('aria-current', 'step');
    else b.addEventListener('click', () => unfold(id));
    nav.append(b);
  });
}

// ─── View panel ──────────────────────────────────────────────
function buildViewPanel() {
  const list = $('view-list');
  for (const s of VIEW_SETTINGS) {
    if (s.group) {
      const h = document.createElement('p');
      h.className = 'view-group';
      h.textContent = s.group;
      list.append(h);
      continue;
    }
    const id = 'view-' + s.key;
    if (s.options) {
      // A row of swatches, one per colour scheme
      const row = document.createElement('div');
      row.className = 'view-schemes';
      row.setAttribute('role', 'radiogroup');
      row.setAttribute('aria-label', s.label);
      for (const [value, text] of s.options) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'scheme scheme-' + value;
        b.dataset.value = value;
        b.setAttribute('role', 'radio');
        b.innerHTML = '<span class="swatch"></span><span></span>';
        b.lastChild.textContent = text;
        b.addEventListener('click', () => { view[s.key] = value; afterViewChange(s); });
        row.append(b);
      }
      row.id = id;
      list.append(row);
      continue;
    }
    const row = document.createElement('label');
    row.htmlFor = id;
    const input = document.createElement('input');
    input.id = id;
    if (typeof VIEW_DEFAULTS[s.key] === 'boolean') {
      row.className = 'view-toggle';
      input.type = 'checkbox';
      input.setAttribute('role', 'switch');
      row.innerHTML = `<span class="view-text"><span></span>${s.hint ? '<small></small>' : ''}</span>`;
      row.querySelector('span span').textContent = s.label;
      if (s.hint) row.querySelector('small').textContent = s.hint;
      row.prepend(input);
      input.addEventListener('change', () => { view[s.key] = input.checked; afterViewChange(s); });
    } else {
      row.className = 'view-slider';
      input.type = 'range';
      Object.assign(input, { min: s.min, max: s.max, step: s.step });
      row.innerHTML = '<span class="view-text"><span></span><output></output></span>';
      row.querySelector('span span').textContent = s.label;
      row.append(input);
      input.addEventListener('input', () => { view[s.key] = Number(input.value); afterViewChange(s); });
    }
    list.append(row);
  }
  syncViewPanel();
}

function syncViewPanel() {
  for (const s of VIEW_SETTINGS) {
    if (s.group) continue;
    const el = $('view-' + s.key);
    if (s.options) {
      for (const b of el.children) b.setAttribute('aria-checked', String(b.dataset.value === view[s.key]));
    } else if (el.type === 'checkbox') {
      el.checked = view[s.key];
    } else {
      el.value = view[s.key];
      el.parentElement.querySelector('output').textContent = view[s.key].toFixed(s.step < 0.1 ? 2 : 1) + (s.unit || '');
    }
  }
}

let relayoutTimer;
function afterViewChange(s) {
  storeView();
  syncViewPanel();
  applyView();
  if (s?.relayout) { clearTimeout(relayoutTimer); relayoutTimer = setTimeout(relayout, 120); }
}

function applyView() {
  const root = document.documentElement;
  if (view.scheme === 'system') delete root.dataset.theme;
  else root.dataset.theme = view.scheme;
  const b = document.body.classList;
  b.toggle('hide-names', !view.names);
  b.toggle('plain-outlines', !view.relationColour);
  b.toggle('no-lead-glow', !view.leadGlow);
  controls.autoRotate = view.spin && !reduceMotion;
}

function setViewPanel(open) {
  $('view-panel').hidden = !open;
  $('view-toggle').setAttribute('aria-expanded', String(open));
}
$('view-toggle').addEventListener('click', () => setViewPanel($('view-panel').hidden));
$('view-reset').addEventListener('click', () => {
  Object.assign(view, VIEW_DEFAULTS);
  afterViewChange({ relayout: true });
});

// ─── Prompt line ─────────────────────────────────────────────
let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 4200);
}
$('prompt-input').value = DATA.prompt;
$('prompt').addEventListener('submit', (e) => {
  e.preventDefault();
  toast('This sketch runs on one example topic. Typing your own question works from stage 4.');
});

// ─── Small animation helper ──────────────────────────────────
const tweens = [];
const ease = (t) => 1 - Math.pow(1 - t, 3);
function tween(ms, step, done) {
  tweens.push({ start: performance.now(), ms: reduceMotion ? 1 : ms, step, done });
}
function tweenVector(v, to, ms) {
  const from = v.clone();
  tween(ms, (t) => v.lerpVectors(from, to, t));
}

// ─── Streams: causes stream in towards the sun, effects stream out ─
const pathFrom = new THREE.Vector3(), pathTo = new THREE.Vector3(), dir = new THREE.Vector3();
const tailAt = new THREE.Vector3(), headAt = new THREE.Vector3(), lookAt = new THREE.Vector3();
let streamClock = 0;

// Start and end on the circles' edges, not their centres
function edgePoints(o, sun) {
  dir.subVectors(sun.obj.position, o.obj.position).normalize();
  pathFrom.copy(o.obj.position).addScaledVector(dir, o.surface);
  pathTo.copy(sun.obj.position).addScaledVector(dir, -sun.surface);
}

function updatePulse(o, sun) {
  const P = TUNING.pulses;
  const show = view.streams && !reduceMotion && o.grow > 0.99 && !busy;
  if (!show) { for (const s of o.pulse) s.visible = false; return; }
  edgePoints(o, sun);
  const [a, b] = o.rel === 'cause' ? [pathFrom, pathTo] : [pathTo, pathFrom];
  const path = a.distanceTo(b);
  const dimmed = selected && selected !== o ? 0.25 : 1;
  const u = ((streamClock + o.pulseOffset) % o.pulseEvery) / P.travel;   // 0→1 while travelling
  for (const streak of o.pulse) {
    const len = Math.min(o.pulseLength * streak.userData.length, path * 0.7) / Math.max(path, 0.01);
    // The head runs a little past the end so the tail can slide in after it
    const head = u * (1 + len);
    const h = Math.min(head, 1), t = Math.max(head - len, 0);
    streak.visible = path > 0.5 && head > 0 && t < 1 && h - t > 0.001;
    if (!streak.visible) continue;
    tailAt.lerpVectors(a, b, t);
    headAt.lerpVectors(a, b, h);
    streak.position.copy(tailAt);
    streak.lookAt(world.localToWorld(lookAt.copy(headAt)));
    streak.scale.set(1, 1, tailAt.distanceTo(headAt));
    const fade = Math.sin(Math.PI * Math.min(1, head / (1 + len)));
    streak.material.opacity = Math.min(1, fade * streak.userData.strength * dimmed);
  }
}

// ─── Every frame ─────────────────────────────────────────────
const worldPos = new THREE.Vector3();
let lastNow = performance.now();
function frame(now) {
  const dt = Math.min(0.1, (now - lastNow) / 1000);
  lastNow = now;
  streamClock += dt * view.streamSpeed;

  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i];
    const t = Math.min(1, (now - tw.start) / tw.ms);
    tw.step(ease(t));
    if (t >= 1) { tweens.splice(i, 1); tw.done?.(); }
  }
  if (view.sway && !view.spin && !grabbed && !reduceMotion) world.rotation.y = Math.sin(now / 4000) * 0.12;
  controls.update();

  const h = stage.clientHeight;
  const focusDist = camera.position.distanceTo(controls.target);
  const sun = orbs[0];
  for (const o of orbs) {
    o.obj.getWorldPosition(worldPos);
    const camDist = camera.position.distanceTo(worldPos);
    // Open up smoothly on hover or focus
    const open = o === hovered || o === selected ? 1 : 0;
    o.k += (open - o.k) * (reduceMotion ? 1 : 0.2);
    o.f += ((o === selected ? 1 : 0) - o.f) * (reduceMotion ? 1 : 0.2);
    // Size on screen, in pixels
    const pxPerUnit = h / (2 * tanV * (view.sameSize ? focusDist : camDist));
    const base = Math.max(TUNING.minDiameter, 2 * o.radius * view.orbSize * pxPerUnit);
    const hoverD = lerp(base, Math.max(base, TUNING.hoverDiameter), o.k);
    const d = lerp(hoverD, Math.max(base, TUNING.focusDiameter), o.f) * o.grow;
    o.el.style.width = o.el.style.height = d.toFixed(1) + 'px';
    o.el.style.setProperty('--d', d.toFixed(1));
    o.el.style.setProperty('--k', o.k.toFixed(3));
    o.el.style.setProperty('--f', o.f.toFixed(3));
    o.el.style.visibility = d < 4 ? 'hidden' : '';
    // The further away an orb is, the more see-through it gets
    let fade = 1;
    if (view.depthFade && !o.isSun) {
      const far = clamp((camDist - (focusDist - systemRadius)) / (2 * systemRadius), 0, 1);
      fade = lerp(1, TUNING.farthestFade, far);
    }
    o.el.style.opacity = (Math.max(fade, o.k) * Math.min(1, o.grow * 1.5)).toFixed(3);
    // The circle's radius in scene units, so streams can start at its edge
    o.surface = (d / 2) * (2 * tanV * camDist) / h;
  }
  for (const o of orbs) {
    if (o.line) {
      o.line.visible = o.k > 0.01;
      if (o.line.visible) {
        edgePoints(o, sun);
        const a = o.line.geometry.attributes.position;
        a.setXYZ(0, pathFrom.x, pathFrom.y, pathFrom.z);
        a.setXYZ(1, pathTo.x, pathTo.y, pathTo.z);
        a.needsUpdate = true;
        o.line.material.opacity = 0.6 * o.k * o.grow;
      }
    }
    if (o.pulse) updatePulse(o, sun);
  }
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  // Whatever you're pointing at or focusing always sits on top
  if (selected) { selected.el.style.zIndex = '99998'; keepOnScreen(selected); }
  if (hovered) hovered.el.style.zIndex = '99999';
  requestAnimationFrame(frame);
}

// Nudge an opened orb so none of it hangs off the edge of the screen
const projected = new THREE.Vector3();
function keepOnScreen(o) {
  const w = stage.clientWidth, h = stage.clientHeight;
  o.obj.getWorldPosition(projected).project(camera);
  const x = (projected.x + 1) / 2 * w, y = (1 - projected.y) / 2 * h;
  const r = parseFloat(o.el.style.width) / 2 + 12;
  const dx = clamp(x, r, w - r) - x;
  const dy = clamp(y, Math.min(r + 90, h / 2), Math.max(h - r, h / 2)) - y;
  o.el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
}

// ─── Size the canvas to the window ───────────────────────────
let resizeTimer;
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
  for (const m of streakMaterials) m.resolution.set(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => fitCamera(), 200);
}
new ResizeObserver(resize).observe(stage);

// ─── Start ───────────────────────────────────────────────────
buildViewPanel();
applyView();
resize();
readPalette();
showSystem(DATA.start);
requestAnimationFrame(frame);
