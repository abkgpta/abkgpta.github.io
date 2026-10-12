// ─────────────────────────────────────────────────────────────
// CELESTIAL · stage 1 sketch
// Draws one topic as a 3D solar system and lets you move through it.
// The content lives in data.js; this file only decides how it looks
// and behaves.
//
// How it's drawn, back to front:
//  1. Backdrop  – a slowly shifting gradient, drawn by a small shader
//  2. Line art  – celestial engravings along the bottom edge (SVG)
//  3. Lines and streams between orbs (WebGL, the 3D canvas)
//  4. Orbs      – HTML shapes placed in 3D, so text stays crisp and
//                 each orb can morph from a soft circle into a card
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
  smallestOrb: 1.0,       // radius of an orb with relevance = 0
  largestOrb: 3.4,        // radius of an orb with relevance = 1
  sunSize: 3.6,
  minDiameter: [50, 92],  // pixels: smallest size for the least / most relevant orb
  leastRelevantFade: 0.38, // opacity of the least relevant orb (most relevant = 1)
  hoverWidth: 270,        // pixels: width of an orb's preview card on hover
  openWidth: 460,         // pixels: width of an orb opened by a click
  cardPadding: 20,        // pixels: inner space of a preview or opened card
  hoverCorner: 34,        // pixels: corner rounding of a preview card
  openCorner: 26,         // pixels: corner rounding of an opened card
  wobble: 3.5,            // how far a resting orb warps from a perfect circle (%)
  float: 2.5,             // pixels a resting orb drifts about its place
  tilt: 1.2,              // degrees a resting orb sways
  gap: 1.4,               // minimum space between orbs
  widen: 1.8,             // most a system may stretch to fill a wide screen
  farthestFade: 0.35,     // opacity of the farthest orb when "fade with distance" is on
  centreLine: 0.16,       // strength of the faint cause/effect lines to the centre
  crossLine: 0.14,        // strength of the faint lines between linked orbs
  crossLinkMin: 0.6,      // links between orbs weaker than this aren't drawn
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
  model: 'claude-opus-5-5',
  webSearch: true,
  reading: 'auto',
  hierarchy: 1,
  theme: 'tide',
  mode: 'system',
  backdropMotion: true,
  lineArt: true,
  streams: true,
  centreLines: true,
  crossLinks: true,
  relationColour: true,
  leadGlow: true,
  names: true,
  organic: true,
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
  { key: 'model', label: 'Model', options: [
    ['claude-opus-5-5', 'Opus 5.5', 'Best · $4 / $20'],
    ['claude-sonnet-5-5', 'Sonnet 5.5', 'Faster · $2 / $10'],
    ['claude-haiku-5-5', 'Haiku 5.5', 'Cheapest'],
  ] },
  { key: 'reading', label: 'How to read what you type', options: [
    ['auto', 'Auto'],
    ['diagnose', 'Diagnose'],
    ['explore', 'Explore'],
  ] },
  { key: 'webSearch', label: 'Search the web for sources', hint: 'When an orb opens. About $0.01 per search' },
  { group: 'Theme' },
  { key: 'theme', label: 'Theme', swatches: true, options: [
    ['tide', 'Tide', 'Teal and bottle green'],
    ['dusk', 'Dusk', 'Pink and purple'],
  ] },
  { key: 'mode', label: 'Light or dark', options: [
    ['system', 'Match device'],
    ['light', 'Light'],
    ['dark', 'Dark'],
  ] },
  { key: 'backdropMotion', label: 'Shifting background' },
  { key: 'lineArt', label: 'Line art along the bottom' },
  { group: 'Show' },
  { key: 'streams', label: 'Cause and effect streams' },
  { key: 'centreLines', label: 'Faint lines from causes and effects' },
  { key: 'crossLinks', label: 'Faint lines between linked orbs' },
  { key: 'relationColour', label: 'Colour outlines by cause and effect' },
  { key: 'leadGlow', label: 'Glow around hidden leads' },
  { key: 'names', label: 'Names inside every orb', hint: 'Off: names appear on hover' },
  { key: 'organic', label: 'Gently warping, drifting orbs' },
  { key: 'hierarchy', label: 'Emphasis on relevance', min: 0, max: 1, step: 0.05, unit: '', relayout: true },
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
if (!['tide', 'dusk'].includes(view.theme)) view.theme = VIEW_DEFAULTS.theme;
function readStoredView() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function storeView() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(view)); } catch { /* not available */ }
}

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const darkDevice = matchMedia('(prefers-color-scheme: dark)');
const UI_TOP = 130, UI_BOTTOM = 40;   // pixels taken by the bars at top and bottom
const lerp = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;
const $ = (id) => document.getElementById(id);

// ─── 1. Backdrop: a slowly shifting gradient ─────────────────
// A shader is a tiny program that runs once for every pixel. This one
// blends two theme tints into the background using soft, drifting
// "noise" (smooth random clouds), kept faint so it never competes
// with the colours of the orbs.
const backdrop = new THREE.WebGLRenderer({ antialias: false });
backdrop.setPixelRatio(0.5);   // a soft gradient needs few pixels
$('backdrop').appendChild(backdrop.domElement);
const backdropUniforms = {
  uTime: { value: 0 },
  uAspect: { value: 1 },
  uBase: { value: new THREE.Vector3() },
  uTintA: { value: new THREE.Vector3() },
  uTintB: { value: new THREE.Vector3() },
  uStrength: { value: 0.8 },
};
const backdropScene = new THREE.Scene();
backdropScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
  uniforms: backdropUniforms,
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
  fragmentShader: /* glsl */`
    uniform float uTime, uAspect, uStrength;
    uniform vec3 uBase, uTintA, uTintB;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
      return v;
    }
    void main() {
      vec2 p = vec2(vUv.x * uAspect, vUv.y);
      float t = uTime * 0.025;
      vec2 warp = vec2(fbm(p * 1.3 + vec2(t, -t * 0.7)), fbm(p * 1.3 + vec2(-t * 0.8, t * 0.5) + 3.1));
      float a = fbm(p * 0.9 + warp * 1.5 + vec2(t * 0.6, 0.0));
      float b = fbm(p * 1.1 - warp * 1.2 + vec2(0.0, t * 0.5) + 7.3);
      vec3 col = uBase;
      col = mix(col, uTintA, smoothstep(0.3, 0.85, a) * uStrength);
      col = mix(col, uTintB, smoothstep(0.35, 0.9, b) * uStrength);
      col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;   // fine grain stops banding
      gl_FragColor = vec4(col, 1.0);
    }`,
  depthTest: false,
})));
const backdropCamera = new THREE.Camera();

// ─── 2. Line art along the bottom edge ───────────────────────
// Engraving-style motifs from star charts, astrolabes and space-age
// diagrams. It's drawn fresh for the window size and faded towards
// the centre by a mask in style.css.
function drawLineArt() {
  const w = innerWidth, h = innerHeight;
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const n = (v) => v.toFixed(1);
  const out = [];
  const path = (d, extra = '') => out.push(`<path d="${d}" ${extra}/>`);
  const circle = (x, y, r, extra = '') => out.push(`<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" ${extra}/>`);
  const dot = (x, y, r) => circle(x, y, r, 'fill="currentColor" stroke="none"');
  const polar = (x, y, r, deg) => [x + r * Math.cos(deg * Math.PI / 180), y + r * Math.sin(deg * Math.PI / 180)];

  // Horizon: a great arc rising from below, with an astrolabe-style degree scale
  const hx = w / 2, R = Math.max(w * 0.78, 760), hy = h + R * 0.86;
  circle(hx, hy, R);
  circle(hx, hy, R + 16);
  circle(hx, hy, R + 70, 'stroke-dasharray="2 7"');
  circle(hx, hy, R - 48, 'stroke-dasharray="1 9"');
  for (let a = -64; a <= 64; a += 1.25) {
    const major = Math.abs(a % 10) < 0.01;
    const [x1, y1] = polar(hx, hy, R, a - 90);
    const [x2, y2] = polar(hx, hy, R + (major ? 16 : 6), a - 90);
    path(`M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`);
  }
  for (let a = -60; a <= 60; a += 5) {
    const [x1, y1] = polar(hx, hy, R + 16, a - 90);
    const [x2, y2] = polar(hx, hy, R + 70, a - 90);
    path(`M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`, 'stroke-dasharray="1 4"');
  }

  // Left corner: an armillary of tilted orbits, each carrying a small planet
  const ax = w * 0.08, ay = h * 0.9;
  for (const [rx, ry, tilt, dash] of [[175, 52, -16, ''], [130, 130, 0, 'stroke-dasharray="3 5"'], [215, 66, 22, ''], [92, 28, 64, '']]) {
    out.push(`<ellipse cx="${n(ax)}" cy="${n(ay)}" rx="${rx}" ry="${ry}" transform="rotate(${tilt} ${n(ax)} ${n(ay)})" ${dash}/>`);
    const th = rnd() * Math.PI * 2, ph = tilt * Math.PI / 180;
    dot(ax + rx * Math.cos(th) * Math.cos(ph) - ry * Math.sin(th) * Math.sin(ph),
        ay + rx * Math.cos(th) * Math.sin(ph) + ry * Math.sin(th) * Math.cos(ph), 2.5 + rnd() * 2);
  }
  circle(ax, ay, 7);
  dot(ax, ay, 3);

  // Right corner: a heliocentric diagram of concentric orbits and planets
  const ox = w * 0.93, oy = h * 1.04;
  [48, 92, 146, 210, 286, 372].forEach((r, i) => {
    circle(ox, oy, r, i % 2 ? 'stroke-dasharray="1 6"' : '');
    const [px, py] = polar(ox, oy, r, 190 + rnd() * 75);
    dot(px, py, 2 + rnd() * 3);
    if (i === 3) circle(px, py, 11);
  });

  // A space-age starburst
  const sx = w * 0.7, sy = h * 0.9;
  for (let i = 0; i < 36; i++) {
    const [x1, y1] = polar(sx, sy, 7, i * 10);
    const [x2, y2] = polar(sx, sy, i % 3 === 0 ? 34 : i % 3 === 1 ? 18 : 12, i * 10);
    path(`M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`);
  }
  dot(sx, sy, 3);

  // Stars, a few joined into constellations
  const stars = Array.from({ length: 46 }, () => [rnd() * w, h * (0.7 + rnd() * 0.3), 1.5 + rnd() * 3.5]);
  for (const [x, y, s] of stars) {
    path(`M${n(x - s)} ${n(y)}Q${n(x)} ${n(y)} ${n(x)} ${n(y - s)}Q${n(x)} ${n(y)} ${n(x + s)} ${n(y)}Q${n(x)} ${n(y)} ${n(x)} ${n(y + s)}Q${n(x)} ${n(y)} ${n(x - s)} ${n(y)}Z`, 'fill="currentColor" stroke="none"');
  }
  for (let c = 0; c < 4; c++) {
    const near = [...stars].sort((a, b) => Math.hypot(a[0] - stars[c * 9][0], a[1] - stars[c * 9][1]) - Math.hypot(b[0] - stars[c * 9][0], b[1] - stars[c * 9][1])).slice(0, 5);
    path('M' + near.map(([x, y]) => `${n(x)} ${n(y)}`).join('L'), 'stroke-dasharray="4 3"');
  }

  $('art').innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" fill="none" stroke="currentColor" stroke-width="0.8" aria-hidden="true">${out.join('')}</svg>`;
}

// ─── 3 & 4. Scene: renderer, camera, controls ────────────────
const stage = $('stage');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearAlpha(0);   // see-through, so the backdrop shows
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
const hexToVec = (hex) => {
  const v = hex.trim().replace('#', '');
  return new THREE.Vector3(parseInt(v.slice(0, 2), 16) / 255, parseInt(v.slice(2, 4), 16) / 255, parseInt(v.slice(4, 6), 16) / 255);
};
function readPalette() {
  const css = getComputedStyle(document.documentElement);
  for (const name of ['line', 'cause', 'effect']) {
    palette[name] = new THREE.Color(css.getPropertyValue('--3d-' + name).trim());
  }
  backdropUniforms.uBase.value = hexToVec(css.getPropertyValue('--sh-base'));
  backdropUniforms.uTintA.value = hexToVec(css.getPropertyValue('--sh-a'));
  backdropUniforms.uTintB.value = hexToVec(css.getPropertyValue('--sh-b'));
  for (const o of orbs) paintOrb(o);
  for (const c of crossLines) c.line.material.color.copy(palette.line);
}

// ─── State ───────────────────────────────────────────────────
let orbs = [];          // everything currently on screen; orbs[0] is the sun
let crossLines = [];    // faint lines between linked orbs
let trail = [DATA.start];
let selected = null;
let hovered = null;
let busy = false;       // true while a transition is playing
let systemRadius = 20;

const isHiddenLead = (l) => l.link <= TUNING.hiddenLead.maxLink && l.relevance >= TUNING.hiddenLead.minRelevance;
// ─── Live research with Claude (see research.js) ─────────────
const R = window.CELESTIAL_RESEARCH;
const KEY_STORE = 'celestial.key', CACHE_STORE = 'celestial.research';
const readKey = () => { try { return localStorage.getItem(KEY_STORE) || ''; } catch { return ''; } };
let apiKey = readKey();
const live = () => Boolean(apiKey && R);
const session = { mode: 'diagnose' };
const liveIds = new Set();          // topics that came from Claude (saved between visits)
const pending = new Set();          // systems being mapped right now
const detailsLoading = new Set();

const canUnfold = (id) => Boolean(DATA.systems[id]) || live();
const orbitOf = (l) => lerp(TUNING.nearestOrbit, TUNING.farthestOrbit, 1 - l.link) * view.spacing;
// Size grows with relevance; "Emphasis on relevance" blends towards equal sizes
const radiusFor = (relevance) => lerp((TUNING.smallestOrb + TUNING.largestOrb) / 2,
  lerp(TUNING.smallestOrb, TUNING.largestOrb, relevance), view.hierarchy);
const sizeOf = (l) => radiusFor(l.relevance) * view.orbSize;

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
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Topics in the current system strongly linked to this one, strongest first
function connectionsOf(id) {
  const sunId = trail[trail.length - 1];
  return (DATA.crossLinks?.[sunId] || [])
    .filter(([a, b, strength]) => strength >= TUNING.crossLinkMin && (a === id || b === id))
    .map(([a, b, strength]) => [a === id ? b : a, strength])
    .sort((x, y) => y[1] - x[1]);
}

// A small horizontal bar chart, drawn to scale
function chartHTML(c) {
  const W = 320, valueW = 44, rowH = 20;
  const labelW = Math.min(120, Math.max(44, Math.max(...c.rows.map((r) => String(r[0]).length)) * 6.3 + 12));
  const max = Math.max(...c.rows.map((r) => r[1]));
  const bars = c.rows.map(([label, value], i) => {
    const y = i * rowH;
    const w = (value / max) * (W - labelW - valueW);
    return `<text class="viz-label" x="${labelW - 8}" y="${y + 13}" text-anchor="end">${esc(label)}</text>
      <rect class="viz-bar" x="${labelW}" y="${y + 5}" width="${w.toFixed(1)}" height="10" rx="2"/>
      <text class="viz-value" x="${(labelW + w + 6).toFixed(1)}" y="${y + 13}">${value}${esc(c.unit)}</text>`;
  }).join('');
  return `<figure class="viz"><figcaption>${esc(c.title)}</figcaption>
    <svg viewBox="0 0 ${W} ${c.rows.length * rowH}" role="img" aria-label="${esc(c.title)}">${bars}</svg>
    ${c.note ? `<p class="viz-note">${esc(c.note)}</p>` : ''}</figure>`;
}
function makeOrbElement(o) {
  const el = document.createElement('div');
  el.className = ['orb',
    o.isSun ? 'sun' : 'rel-' + o.rel,
    o.lead ? 'lead' : '',
    // Double outline: this orb's own system is ready to open instantly
    !o.isSun && DATA.systems[o.id] ? 'unfoldable' : '',
    o.isSun ? '' : o.relevance >= 0.75 ? 'rank-high' : o.relevance < 0.4 ? 'rank-low' : '',
  ].filter(Boolean).join(' ');
  // Scrolling inside an opened card shouldn't zoom the view
  el.addEventListener('wheel', (e) => { if (o === selected) e.stopPropagation(); });
  el.addEventListener('pointerenter', () => setHover(o));
  el.addEventListener('pointerleave', () => { if (hovered === o) setHover(null); });
  // Inside an opened card, the card handles its own clicks and scrolling,
  // and dragging doesn't turn the view
  el.addEventListener('pointerdown', (e) => { if (o === selected) e.stopPropagation(); });
  el.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (btn) runAction(btn.dataset.action, o, btn.dataset.id);
  });
  el._orb = o;
  o.el = el;
  fillOrb(o);
  return el;
}

// Everything inside an orb. Called again when research arrives.
function fillOrb(o) {
  const topic = DATA.topics[o.id];
  const el = o.el;
  let tag = '';
  if (o.cameFrom) tag = 'Came from';
  else if (o.lead) tag = 'Hidden lead';
  const meter = (name, value) =>
    `<div><dt>${name}</dt><dd><span class="bar"><i style="width:${value * 100}%"></i></span><output>${Math.round(value * 100)}</output></dd></div>`;
  const more = DATA.details?.[o.id] || {};
  const links = o.isSun ? [] : connectionsOf(o.id);
  const drawing = window.CELESTIAL_ILLUSTRATIONS?.[o.id];
  let body;
  if (more.loading) body = `<p class="researching"><span class="spinner"></span>Researching with ${esc(R.MODELS[view.model]?.name || 'Claude')}${view.webSearch ? ' and searching the web' : ''}…</p>`;
  else if (more.error) body = `<p class="research-error">${esc(more.error)}</p><button type="button" class="chip" data-action="retry">Try again</button>`;
  else if (more.about) body = `<p class="about-text">${esc(more.about)}</p>`;
  else if (live()) body = '<p class="slot">Opening this orb researches it with Claude.</p>';
  else body = '<p class="slot">Add your Claude API key in the View panel to research any topic in depth.</p>';
  const sourceLine = (src) => {
    const title = src.url ? `<a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.title)}</a>` : esc(src.title);
    return `<li><span class="tier tier-${src.tier}" title="Reliability tier ${src.tier} of 6">${src.tier}</span><span><b>${esc(src.type)}</b> ${title}${src.flag ? ` <em class="flag">⚠ ${esc(src.flag)}</em>` : ''}</span></li>`;
  };
  el.innerHTML = `
    <button class="orb-close" type="button" data-action="close" aria-label="Close">&times;</button>
    <div class="inner">
      ${tag ? `<span class="tag">${tag}</span>` : ''}
      <span class="rel"></span>
      <span class="t"></span>
      <span class="l"></span>
      <div class="more">
        ${more.image ? `<figure class="photo"><img src="${esc(more.image.src)}" alt="${esc(more.image.alt)}" loading="lazy"><figcaption>${more.image.href ? `<a href="${esc(more.image.href)}" target="_blank" rel="noopener noreferrer">${esc(more.image.credit)}</a>` : esc(more.image.credit)}</figcaption></figure>` : ''}
        ${drawing ? `<figure class="il">${drawing.svg}<figcaption>${esc(drawing.caption)}</figcaption></figure>` : ''}
        ${body}
        ${more.chart ? chartHTML(more.chart) : ''}
        ${more.check?.length ? `<section class="section"><h3>${session.mode === 'explore' && more.live ? 'Worth exploring next' : 'What to check'}</h3><ul class="checks">${more.check.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></section>` : ''}
        ${o.isSun ? '' : `<dl class="meters">${meter('Link', o.link)}${meter('Relevance', o.relevance)}</dl>`}
        ${links.length ? `<section class="section"><h3>Strongly linked to</h3><div class="chips">${links.map(([id]) =>
          `<button type="button" class="chip" data-action="open" data-id="${id}">${esc(DATA.topics[id].title)}</button>`).join('')}</div></section>` : ''}
        ${more.sources?.length ? `<section class="section"><h3>Sources${more.live ? '' : ' <span>· examples of the rating system</span>'}</h3><ul class="sources">${more.sources.map(sourceLine).join('')}</ul></section>` : ''}
        ${o.isSun ? '' : canUnfold(o.id)
          ? '<button class="orb-unfold" type="button" data-action="unfold">Unfold</button>'
          : '<p class="slot">Add a Claude API key to unfold any orb</p>'}
      </div>
    </div>`;
  el.querySelector('.rel').textContent = relationText(o);
  el.querySelector('.t').textContent = topic.title;
  el.querySelector('.l').textContent = topic.liner;
  o.inner = el.querySelector('.inner');   // measured every frame to fit the card
  // Once a picture arrives the card may need to grow
  el.querySelector('.photo img')?.addEventListener('error', (e) => e.target.closest('figure').remove());
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

function makeLine() {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
  world.add(line);
  return line;
}

function setLine(line, a, b) {
  const p = line.geometry.attributes.position;
  p.setXYZ(0, a.x, a.y, a.z);
  p.setXYZ(1, b.x, b.y, b.z);
  p.needsUpdate = true;
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
    k: 0,          // 0 → 1 as the orb opens into a preview card on hover
    f: 0,          // 0 → 1 as the orb opens fully on click
    surface: 1,    // the orb's radius in scene units, worked out each frame
    phase: Math.random() * 10,   // so each orb's shape drifts differently
  };
  o.lead = !o.isSun && isHiddenLead(o);
  o.radius = o.isSun ? TUNING.sunSize : radiusFor(o.relevance);
  o.el = makeOrbElement(o);
  o.obj = new CSS2DObject(o.el);
  world.add(o.obj);

  // A line to the sun: faint for causes and effects, brighter on hover
  if (!o.isSun) o.line = makeLine();
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
  for (const c of crossLines) { world.remove(c.line); c.line.geometry.dispose(); c.line.material.dispose(); }
  setHover(null);
  const previous = trail.length > 1 ? trail[trail.length - 2] : null;
  const sun = makeOrb({ to: sunId, isSun: true });
  const planets = layout(DATA.systems[sunId] || []).map((spec) =>
    makeOrb({ ...spec, cameFrom: spec.to === previous }));
  orbs = [sun, ...planets];

  // Faint lines between orbiting topics that are strongly linked to each other
  const byId = new Map(planets.map((o) => [o.id, o]));
  crossLines = (DATA.crossLinks?.[sunId] || [])
    .filter(([a, b, s]) => byId.has(a) && byId.has(b) && s >= TUNING.crossLinkMin)
    .map(([a, b, strength]) => {
      const line = makeLine();
      line.material.color.copy(palette.line);
      return { a: byId.get(a), b: byId.get(b), strength, line };
    });
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
  const placed = layout(DATA.systems[orbs[0].id] || []);
  for (const o of orbs.slice(1)) {
    const p = placed.find((q) => q.to === o.id);
    if (p) o.target = p.target;
  }
  for (const o of orbs) tweenVector(o.obj.position, o.target, 500);
  fitCamera();
}

async function unfold(id) {
  if (busy || !canUnfold(id)) return;
  const before = trail;
  const at = trail.indexOf(id);
  trail = at >= 0 ? trail.slice(0, at + 1) : [...trail, id];
  closeFocus();
  const chosen = orbs.find((o) => o.id === id);
  // If you unfold a cause, the old centre becomes its effect (and vice versa)
  const back = { cause: 'effect', effect: 'cause', related: 'related' }[chosen?.rel] || 'related';
  busy = true;
  const from = chosen ? chosen.obj.position.clone() : new THREE.Vector3();
  // Everything else shrinks away while the chosen orb slides to the centre
  await new Promise((done) => tween(450, (t) => {
    for (const o of orbs) {
      if (o === chosen) o.obj.position.lerpVectors(from, new THREE.Vector3(), t);
      else o.grow = 1 - t;
    }
  }, done));
  world.rotation.y = 0;
  if (!DATA.systems[id]) {
    // Not mapped yet: show the new centre on its own while Claude maps it
    showSystem(id);
    const ok = await mapLive(id, at >= 0 ? null : before[before.length - 1], back);
    if (!ok) { busy = false; trail = before; showSystem(trail[trail.length - 1]); return; }
  }
  busy = false;
  showSystem(id);
  saveSession();
}

// Ask Claude for the system around a topic and store it like the example data
async function mapLive(centreId, cameFromId = null, cameFromRel = 'related') {
  const topic = DATA.topics[centreId];
  pending.add(centreId);
  setStatus(`Mapping “${topic.title}” with ${R.MODELS[view.model].name}…`);
  try {
    const out = await R.map({
      key: apiKey,
      model: view.model,
      centre: topic.title,
      mode: session.mode,
      path: trail.slice(0, -1).map((id) => DATA.topics[id].title),
      cameFrom: cameFromId ? DATA.topics[cameFromId].title : '',
    });
    storeMap(centreId, out, cameFromId, cameFromRel);
    setStatus('');
    saveCache();
    return true;
  } catch (err) {
    setStatus(R.explain(err), 'error');
    return false;
  } finally {
    pending.delete(centreId);
    updateSpend();
  }
}

const slug = (t) => t.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'topic';

function storeMap(centreId, out, cameFromId, cameFromRel) {
  if (!trail.slice(0, -1).length) {
    // A fresh search: use Claude's tidier name for the centre
    DATA.topics[centreId] = { title: out.centre.title || DATA.topics[centreId].title, liner: out.centre.liner || '' };
  }
  liveIds.add(centreId);
  const byTitle = new Map();
  const seen = new Set([centreId]);
  const system = [];
  if (cameFromId) {
    system.push({ to: cameFromId, rel: cameFromRel, link: 0.9, relevance: 1 });
    seen.add(cameFromId);
    byTitle.set(DATA.topics[cameFromId].title.toLowerCase(), cameFromId);
  }
  for (const orb of out.orbs.slice(0, 20)) {
    const known = byTitle.get(orb.title.toLowerCase());
    if (known) continue;   // e.g. Claude's copy of the "came from" topic
    const id = slug(orb.title);
    if (seen.has(id)) continue;
    seen.add(id);
    byTitle.set(orb.title.toLowerCase(), id);
    if (!DATA.topics[id] || liveIds.has(id)) DATA.topics[id] = { title: orb.title, liner: orb.liner };
    liveIds.add(id);
    system.push({ to: id, rel: orb.rel, link: orb.link, relevance: orb.relevance });
  }
  DATA.systems[centreId] = system;
  DATA.crossLinks[centreId] = out.links
    .map((l) => [byTitle.get(l.a.toLowerCase()), byTitle.get(l.b.toLowerCase()), l.strength])
    .filter(([a, b]) => a && b && a !== b);
}

// Start a new investigation from the prompt line
const DIAGNOSE_CUES = /^(why|how come|what causes|what's causing|what is causing)\b|\b(problem|issue|fail|failing|failure|broken|keeps|won't|doesn't|not working|declin|drop|dropping|slow|leak|crack|warp|error|wrong)\b/i;
function modeFor(q) {
  if (view.reading !== 'auto') return view.reading;
  return DIAGNOSE_CUES.test(q) ? 'diagnose' : 'explore';
}

async function explore(query) {
  if (!live()) {
    setViewPanel(true);
    $('api-key').focus();
    toast('Add your Claude API key here to explore your own questions.');
    return;
  }
  if (busy) return;
  busy = true;
  closeFocus();
  session.mode = modeFor(query);
  const id = 'q-' + slug(query);
  DATA.topics[id] = { title: query, liner: session.mode === 'explore' ? 'Mapping the subject…' : 'Tracing causes and effects…' };
  await new Promise((done) => tween(400, (t) => { for (const o of orbs) o.grow = Math.min(o.grow, 1 - t); }, done));
  const before = trail;
  trail = [id];
  delete DATA.systems[id];
  showSystem(id);
  const ok = await mapLive(id);
  busy = false;
  if (!ok) { delete DATA.topics[id]; trail = before; showSystem(trail[trail.length - 1]); return; }
  showSystem(id);
  saveSession();
}

// Research an opened orb: explanation, sources, picture
async function loadDetails(o) {
  const id = o.id;
  if (!live() || detailsLoading.has(id)) return;
  const known = DATA.details[id];
  if (known && !known.error) return;
  detailsLoading.add(id);
  DATA.details[id] = { live: true, loading: true };
  refill(id);
  try {
    const centreId = trail[trail.length - 1];
    const d = await R.details({
      key: apiKey,
      model: view.model,
      topic: DATA.topics[id].title,
      liner: DATA.topics[id].liner,
      centre: DATA.topics[centreId].title,
      rel: o.isSun ? null : o.rel,
      mode: session.mode,
      path: trail.map((t) => DATA.topics[t].title),
      webSearch: view.webSearch,
    });
    DATA.details[id] = { ...d, live: true };
    liveIds.add(id);
    refill(id);
    const image = await R.wikipediaImage(d.wikipedia);
    if (image) { DATA.details[id].image = image; refill(id); }
    saveCache();
  } catch (err) {
    DATA.details[id] = { live: true, error: R.explain(err) };
    refill(id);
  } finally {
    detailsLoading.delete(id);
    updateSpend();
  }
}
const refill = (id) => { for (const o of orbs) if (o.id === id) fillOrb(o); };

// ─── Remember research between visits (in this browser only) ─
function saveCache() {
  const pick = (table) => Object.fromEntries([...liveIds].filter((id) => table[id] && !table[id].loading).map((id) => [id, table[id]]));
  try {
    localStorage.setItem(CACHE_STORE, JSON.stringify({
      topics: pick(DATA.topics), systems: pick(DATA.systems), crossLinks: pick(DATA.crossLinks),
      details: Object.fromEntries(Object.entries(pick(DATA.details)).filter(([, d]) => !d.error)),
    }));
  } catch { /* storage full or blocked: research still works, it just won't be remembered */ }
}
function saveSession() {
  try { localStorage.setItem(CACHE_STORE + '.session', JSON.stringify({ trail, mode: session.mode })); } catch { /* ignore */ }
}
function loadCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_STORE) || 'null');
    if (c) for (const table of ['topics', 'systems', 'crossLinks', 'details']) {
      Object.assign(DATA[table], c[table] || {});
      Object.keys(c[table] || {}).forEach((id) => liveIds.add(id));
    }
    const last = JSON.parse(localStorage.getItem(CACHE_STORE + '.session') || 'null');
    if (last?.trail?.length && last.trail.every((id) => DATA.topics[id] && DATA.systems[id])) {
      trail = last.trail;
      session.mode = last.mode || 'diagnose';
    }
  } catch { /* nothing saved yet */ }
}

// ─── Status line under the prompt ───────────────────────────
function setStatus(text, kind = '') {
  const el = $('status');
  el.hidden = !text;
  el.className = 'status' + (kind ? ' is-' + kind : '');
  el.innerHTML = text ? (kind === 'error' ? '' : '<span class="spinner"></span>') + '<span></span>' : '';
  if (text) el.lastChild.textContent = text;
  document.body.classList.toggle('is-researching', Boolean(text) && kind !== 'error');
  if (kind === 'error') { clearTimeout(setStatus.t); setStatus.t = setTimeout(() => setStatus(''), 8000); }
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
  if (selected) selected.el.style.translate = '';
  selected = o;
  updateDimming();
  if (live() && !DATA.details[o.id]?.about) loadDetails(o);
}

function closeFocus() {
  if (!selected) return;
  selected.el.style.translate = '';
  selected = null;
  updateDimming();
}

function runAction(action, o, id) {
  if (action === 'close') closeFocus();
  if (action === 'unfold') unfold(o.id);
  if (action === 'open') { const other = orbs.find((x) => x.id === id); if (other) openFocus(other); }
  if (action === 'retry') { delete DATA.details[o.id]; loadDetails(o); }
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
    id: e.target.closest?.('[data-action]')?.dataset.id ?? null,
  };
});
stage.addEventListener('pointerup', (e) => {
  const d = down;
  down = null;
  if (!d || e.button !== 0 || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) return;
  if (d.action && d.orb) runAction(d.action, d.orb, d.id);
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
      // A row of choices, like radio buttons
      const row = document.createElement('div');
      row.className = s.swatches ? 'view-choices view-themes' : 'view-choices';
      row.setAttribute('role', 'radiogroup');
      row.setAttribute('aria-label', s.label);
      for (const [value, text, sub] of s.options) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'choice' + (s.swatches ? ' theme-' + value : '');
        b.dataset.value = value;
        b.setAttribute('role', 'radio');
        b.innerHTML = (s.swatches ? '<span class="swatch"></span>' : '') + '<span class="choice-text"><span></span>' + (sub ? '<small></small>' : '') + '</span>';
        b.querySelector('.choice-text span').textContent = text;
        if (sub) b.querySelector('small').textContent = sub;
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

// The page's colours come from data-theme on the root, e.g. "tide-dark"
const OUR_THEMES = ['tide-light', 'tide-dark', 'dusk-light', 'dusk-dark'];
function themeName() {
  const dark = view.mode === 'dark' || (view.mode === 'system' && darkDevice.matches);
  return `${view.theme}-${dark ? 'dark' : 'light'}`;
}

function applyView() {
  const root = document.documentElement;
  if (root.dataset.theme !== themeName()) root.dataset.theme = themeName();
  const b = document.body.classList;
  b.toggle('hide-names', !view.names);
  b.toggle('plain-outlines', !view.relationColour);
  b.toggle('no-lead-glow', !view.leadGlow);
  $('art').hidden = !view.lineArt;
  controls.autoRotate = view.spin && !reduceMotion;
  readPalette();
  if ($('brand-stage') && R) $('brand-stage').textContent = live() ? `Live · ${R.MODELS[view.model].name}` : 'Example · add a key to go live';
}
darkDevice.addEventListener('change', applyView);
// If the page host switches light/dark itself, keep our theme and follow its mode
new MutationObserver(() => {
  const t = document.documentElement.dataset.theme;
  if (OUR_THEMES.includes(t)) return;
  if (t === 'dark' || t === 'light') view.mode = t;
  applyView();
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

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
$('prompt-input').value = trail[0] === DATA.start ? DATA.prompt : DATA.topics[trail[0]].title;
$('prompt').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = $('prompt-input').value.trim();
  if (q) explore(q);
});

// ─── Your Claude API key ────────────────────────────────────
function updateLiveState() {
  $('brand-stage').textContent = live()
    ? `Live · ${R.MODELS[view.model].name}`
    : 'Example · add a key to go live';
  $('key-forget').hidden = !apiKey;
  $('api-key').value = apiKey ? '••••••••••••' + apiKey.slice(-4) : '';
  $('key-note').textContent = apiKey
    ? 'Saved in this browser only. It is sent only to Anthropic.'
    : 'Stored only in this browser and sent only to Anthropic. Create one at console.anthropic.com → API keys.';
  for (const o of orbs) fillOrb(o);
  updateSpend();
}
function updateSpend() {
  const s = R?.spend;
  $('spend').textContent = s && s.requests
    ? `This visit: ${s.requests} request${s.requests === 1 ? '' : 's'}${s.searches ? `, ${s.searches} web searches` : ''}, about $${s.dollars.toFixed(2)}`
    : '';
}
$('key-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const v = $('api-key').value.trim();
  if (!v || v.startsWith('•')) return;
  if (!v.startsWith('sk-ant-')) { toast('That doesn’t look like a Claude API key. They start with sk-ant-.'); return; }
  apiKey = v;
  try { localStorage.setItem(KEY_STORE, v); } catch { toast('This browser won’t store the key, so it will be forgotten when you close the tab.'); }
  updateLiveState();
  toast('Key saved. Type a question or topic to begin.');
  $('prompt-input').focus();
  $('prompt-input').select();
});
$('key-forget').addEventListener('click', () => {
  apiKey = '';
  try { localStorage.removeItem(KEY_STORE); } catch { /* ignore */ }
  updateLiveState();
  toast('Key removed from this browser.');
});
$('show-example').addEventListener('click', () => {
  if (busy) return;
  trail = [DATA.start];
  session.mode = 'diagnose';
  $('prompt-input').value = DATA.prompt;
  closeFocus();
  showSystem(DATA.start);
  saveSession();
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

// Points on the edges of two orbs, facing each other
function edgePoints(a, b) {
  dir.subVectors(b.obj.position, a.obj.position).normalize();
  pathFrom.copy(a.obj.position).addScaledVector(dir, a.surface);
  pathTo.copy(b.obj.position).addScaledVector(dir, -b.surface);
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

// ─── Orb shape: a softly shifting circle that becomes a card ──
// Each corner is rounded separately. At rest every corner is close to
// 50% (a circle) and drifts slightly; opened, the corners tighten to a
// fixed radius so the text gets a readable, card-like area.
function orbShape(o, w, h, open, seconds) {
  const corner = lerp(TUNING.hoverCorner, TUNING.openCorner, o.f);
  const wob = view.organic && !reduceMotion ? TUNING.wobble : 0;
  const across = [], down = [];
  for (let i = 0; i < 4; i++) {
    // Two slow waves at different speeds, so the warping never repeats exactly
    const a = 0.65 * Math.sin(seconds * 0.55 + o.phase + i * 1.7) + 0.35 * Math.sin(seconds * 1.37 + o.phase * 2.3 + i);
    const b = 0.65 * Math.cos(seconds * 0.47 + o.phase * 1.3 + i * 2.1) + 0.35 * Math.cos(seconds * 1.21 + o.phase * 1.7 + i * 0.6);
    across.push(lerp(50 + wob * a, (corner / w) * 100, open).toFixed(2) + '%');
    down.push(lerp(50 + wob * b, (corner / h) * 100, open).toFixed(2) + '%');
  }
  return across.join(' ') + ' / ' + down.join(' ');
}

// ─── Every frame ─────────────────────────────────────────────
const worldPos = new THREE.Vector3();
let lastNow = performance.now();
let backdropClock = 0;
function frame(now) {
  const dt = Math.min(0.1, (now - lastNow) / 1000);
  lastNow = now;
  const seconds = now / 1000;
  streamClock += dt * view.streamSpeed;
  if (view.backdropMotion && !reduceMotion) backdropClock += dt;

  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i];
    const t = Math.min(1, (now - tw.start) / tw.ms);
    tw.step(ease(t));
    if (t >= 1) { tweens.splice(i, 1); tw.done?.(); }
  }
  if (view.sway && !view.spin && !grabbed && !reduceMotion) world.rotation.y = Math.sin(now / 4000) * 0.12;
  controls.update();

  // How far to move towards an orb's open/closed state this frame
  // (based on time, so it feels the same on fast and slow machines)
  const approach = reduceMotion ? 1 : 1 - Math.exp(-dt * 12);
  const h = stage.clientHeight;
  const focusDist = camera.position.distanceTo(controls.target);
  const sun = orbs[0];
  for (const o of orbs) {
    o.obj.getWorldPosition(worldPos);
    const camDist = camera.position.distanceTo(worldPos);
    // Open up smoothly on hover (preview) or click (full)
    const target = o === hovered || o === selected ? 1 : 0;
    o.k += (target - o.k) * approach;
    o.f += ((o === selected ? 1 : 0) - o.f) * approach;
    const open = Math.max(o.k, o.f);

    // Size: a circle at rest, widening into a card as it opens
    const pxPerUnit = h / (2 * tanV * (view.sameSize ? focusDist : camDist));
    const rank = o.isSun ? 1 : lerp(0.5, o.relevance, view.hierarchy);
    const rest = Math.max(lerp(TUNING.minDiameter[0], TUNING.minDiameter[1], rank), 2 * o.radius * view.orbSize * pxPerUnit);
    const cardW = lerp(Math.max(rest, TUNING.hoverWidth), Math.max(rest, TUNING.openWidth), o.f);
    const w = lerp(rest, cardW, open) * o.grow;
    const pad = lerp(rest * 0.15, TUNING.cardPadding, open);
    o.el.style.setProperty('--iw', Math.max(8, w - 2 * pad).toFixed(1) + 'px');
    let hgt = w;
    if (open > 0.002) {
      // Fit the height to the text; very long cards scroll inside instead
      const maxH = h - UI_TOP - UI_BOTTOM;
      o.el.style.setProperty('--maxh', (maxH - 2 * pad).toFixed(0) + 'px');
      const fits = o.inner.scrollHeight + 2 * pad;
      hgt = lerp(w, clamp(fits, rest * 0.8, maxH), open);
    }
    o.el.style.width = w.toFixed(1) + 'px';
    o.el.style.height = hgt.toFixed(1) + 'px';
    o.el.style.padding = pad.toFixed(1) + 'px';
    o.el.style.borderRadius = orbShape(o, Math.max(w, 1), Math.max(hgt, 1), open, seconds);
    o.el.style.setProperty('--d', (rest * o.grow).toFixed(1));   // resting size sets the text size
    o.el.style.setProperty('--k', o.k.toFixed(3));
    o.el.style.setProperty('--f', o.f.toFixed(3));
    // A soft highlight that drifts across the orb's surface
    o.el.style.setProperty('--gx', (50 + 28 * Math.sin(seconds * 0.21 + o.phase)).toFixed(1) + '%');
    o.el.style.setProperty('--gy', (40 + 22 * Math.cos(seconds * 0.17 + o.phase * 0.7)).toFixed(1) + '%');
    o.el.style.visibility = w < 4 ? 'hidden' : '';
    // At rest, drift and sway very slightly; still when open, for reading
    const calm = (1 - open) * (view.organic && !reduceMotion ? 1 : 0);
    if (o !== selected) {
      const fx = TUNING.float * (0.7 * Math.sin(seconds * 0.6 + o.phase) + 0.3 * Math.sin(seconds * 1.4 + o.phase * 2));
      const fy = TUNING.float * (0.7 * Math.cos(seconds * 0.5 + o.phase * 1.4) + 0.3 * Math.cos(seconds * 1.1 + o.phase));
      o.el.style.translate = `${(fx * calm).toFixed(2)}px ${(fy * calm).toFixed(2)}px`;
    }
    o.el.style.rotate = `${(TUNING.tilt * Math.sin(seconds * 0.33 + o.phase * 0.9) * calm).toFixed(2)}deg`;
    // The further away an orb is, the more see-through it gets
    let fade = 1;
    if (view.depthFade && !o.isSun) {
      const far = clamp((camDist - (focusDist - systemRadius)) / (2 * systemRadius), 0, 1);
      fade = lerp(1, TUNING.farthestFade, far);
    }
    // Less relevant orbs recede, so the eye lands on the relevant ones first
    if (!o.isSun) fade *= lerp(1, lerp(TUNING.leastRelevantFade, 1, o.relevance), view.hierarchy);
    o.fade = Math.max(fade, open) * Math.min(1, o.grow * 1.5);
    o.el.style.opacity = o.fade.toFixed(3);
    // The orb's radius in scene units, so lines and streams meet its edge
    o.surface = (Math.min(w, hgt) / 2) * (2 * tanV * camDist) / h;
  }

  for (const o of orbs) {
    if (o.line) {
      const faint = view.centreLines && (o.rel === 'cause' || o.rel === 'effect') ? TUNING.centreLine : 0;
      const dim = selected && selected !== o ? 0.4 : 1;
      const strength = Math.max(faint * o.fade * dim, 0.6 * o.k) * o.grow;
      o.line.visible = strength > 0.005;
      if (o.line.visible) {
        edgePoints(o, sun);
        setLine(o.line, pathFrom, pathTo);
        o.line.material.opacity = strength;
      }
    }
    if (o.pulse) updatePulse(o, sun);
  }
  for (const c of crossLines) {
    const lit = Math.max(c.a.k, c.b.k);
    const dim = selected && selected !== c.a && selected !== c.b ? 0.4 : 1;
    const strength = Math.max(TUNING.crossLine * c.strength * Math.min(c.a.fade, c.b.fade) * dim, 0.5 * lit) * Math.min(c.a.grow, c.b.grow);
    c.line.visible = view.crossLinks && strength > 0.005;
    if (!c.line.visible) continue;
    edgePoints(c.a, c.b);
    setLine(c.line, pathFrom, pathTo);
    c.line.material.opacity = strength;
  }

  backdropUniforms.uTime.value = backdropClock;
  backdrop.render(backdropScene, backdropCamera);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  // Whatever you're pointing at or have opened always sits on top
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
  const rx = parseFloat(o.el.style.width) / 2 + 12, ry = parseFloat(o.el.style.height) / 2 + 12;
  const dx = clamp(x, rx, w - rx) - x;
  // Keep it between the top bar and the bottom edge
  const top = UI_TOP + ry - 12, bottom = h - UI_BOTTOM - ry + 12;
  const dy = (top <= bottom ? clamp(y, top, bottom) : (top + bottom) / 2) - y;
  o.el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
}

// ─── Size everything to the window ───────────────────────────
let resizeTimer;
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
  backdrop.setSize(w, h);
  backdropUniforms.uAspect.value = w / h;
  for (const m of streakMaterials) m.resolution.set(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { fitCamera(); drawLineArt(); }, 200);
}
new ResizeObserver(resize).observe(stage);

// ─── Start ───────────────────────────────────────────────────
loadCache();
buildViewPanel();
applyView();
resize();
drawLineArt();
showSystem(trail[trail.length - 1]);
updateLiveState();
requestAnimationFrame(frame);
