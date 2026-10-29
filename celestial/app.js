// ─────────────────────────────────────────────────────────────
// CELESTIAL · the app
// Draws one topic as a 3D solar system and lets you move through it.
// The content lives in the EXAMPLE CONTENT script above; this script
// only decides how it looks and behaves.
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
DATA.reasons ||= {};
DATA.deep ||= {};       // example deep passes, as Claude would return them, by topic
DATA.inside ||= {};     // deep passes that have been opened, by the id of their inside view

// ─── Fixed numbers ───────────────────────────────────────────
// The shape of the system. Several of these can be adjusted live
// from the Settings panel; these are the starting points.
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
  readable: 0.65,         // no orb's name fades below this (about 4.5:1); the outline fades further instead
  centreLine: 0.16,       // strength of the faint cause/effect lines to the centre
  crossLine: 0.14,        // strength of the faint lines between linked orbs
  crossLinkMin: 0.6,      // links between orbs weaker than this aren't drawn
  reasonLine: 0.32,       // strength of every line in Reasoning mode, so each can be found and hovered
  // Motion
  cameraGlide: 0.55,      // seconds: how softly the camera glides to a new view (higher = softer)
  expand: {
    move: 1500,           // ms: the chosen orb gliding into the centre, the old centre moving out
    leave: 1100,          // ms: orbs that aren't in the new system drifting away and fading
    arrive: 1300,         // ms: each new orb easing out from the centre
    stagger: 55,          // ms between new orbs appearing (most relevant first)
    drift: 1.45,          // how far leaving orbs drift outward (× their distance)
  },
  openSpeed: 9,           // how quickly an orb opens on hover or click (higher = snappier)
  hiddenLead: { maxLink: 0.45, minRelevance: 0.65 },  // when an orb glows
  pulses: {
    slowest: 6.0,         // seconds between streams for the least relevant orb
    fastest: 2.2,         // seconds between streams for the most relevant orb
    travel: 1.5,          // seconds a stream takes to cross
    // Stronger links get longer, thicker streams
    shortest: 1.4, longest: 6,     // stream length, in scene units
    thinnest: 1.2, thickest: 4.5,  // stream thickness, in pixels
  },
  // Woven threads: each line drawn as a few glowing strands (see "Woven threads" below)
  threads: {
    fewest: 2, most: 6,   // strands for the weakest and the strongest link
    spread: 0.06,         // how far the strands fan out mid-line, as a share of its length on screen
    minSpread: 4, maxSpread: 13,   // ...kept between these, in pixels
    pad: 10,              // pixels of room around the strands for their glow
    wave: 150,            // pixels per full weave along a line
    taper: 0.7,           // how much wider each next strand swings, nesting them
    speed: 0.45,          // how fast the strands weave
    width: 1.1,           // strand width in pixels
    glow: 0.32,           // light around each strand
    falloff: 1.25,        // how quickly the glow fades (higher is tighter)
    brightness: 0.75,
    boost: 2.2,           // threads carry less ink than a line, so they are drawn this much stronger
    stagger: 0.12, stroke: 1.25,   // seconds: strands drawing in one after another, and each stroke
    surge: 1.6,           // seconds a click's light takes to travel a line
  },
};

// ─── Settings: the controls in the Settings panel ────────────
const VIEW_DEFAULTS = {
  model: 'claude-opus-5-5',
  tier: 'default',
  webSearch: true,
  reading: 'auto',
  hierarchy: 1,
  theme: 'tide',
  mode: 'system',
  backdropMotion: true,
  lineArt: true,
  streams: true,
  threads: true,          // lines drawn as woven threads (plain lines without WebGL2)
  centreLines: true,
  crossLinks: true,
  relationColour: true,
  leadGlow: true,
  names: true,
  organic: true,
  sameSize: true,
  depthFade: true,
  fillScreen: true,
  mapMotion: 'sway',      // 'still' | 'sway' | 'spin'
  streamSpeed: 1,
  spacing: 1,
  orbSize: 1,
  reasoning: false,       // Reasoning mode: the map builds step by step and every line explains itself
  traceSpeed: 1,          // index into TRACE_SPEEDS
  sound: false,           // off until you switch it on (browsers block sound before a click anyway)
  volume: 0.6,
  music: true,            // the background drone
  bells: true,            // a note as each orb appears, and when you mark one
  cues: true,             // Reasoning mode: notes for links between orbs and lines you hover
};
// The Settings panel, one tab per question you might have:
//   Research   – how Claude answers, how you learn from it, the connection
//   Appearance – colours and what each orb shows
//   Map        – layout, lines and depth
//   Motion     – everything that moves, in one place
//   Sound      – the soundtrack the map plays
// { tab } starts a tab, { group } a small heading within it.
// needs: the setting only matters while that other switch is on (greyed out otherwise).
// format: 'percent' shows a 0–1 slider as 0–100%.
const VIEW_SETTINGS = [
  { tab: 'Research' },
  { group: 'Your questions' },
  { key: 'reading', label: 'Treat what you type as', options: [
    ['auto', 'Auto', 'Guess from the words'],
    ['diagnose', 'A problem', 'Trace causes'],
    ['explore', 'A topic', 'Map the subject'],
  ] },
  { key: 'tier', label: 'How hard Claude thinks', options: [
    ['quick', 'Fast', 'Lightest'],
    ['default', 'Balanced', 'Recommended'],
    ['complex', 'Thorough', 'Slower, deeper'],
  ] },
  { key: 'model', label: 'Model (with your API key)', options: [
    ['claude-opus-5-5', 'Opus 5.5', 'Most capable'],
    ['claude-sonnet-5-5', 'Sonnet 5.5', 'Faster'],
    ['claude-haiku-5-5', 'Haiku 5.5', 'Lowest cost'],
  ] },
  { key: 'webSearch', label: 'Search the web for sources', hint: 'When an orb opens or you go deeper. Gives real links and videos in the Sources tab. Each search adds a small cost to your key' },
  { group: 'Learning' },
  { key: 'reasoning', label: 'Progressive mode', hint: 'Build each map step by step and explain every line. Claude writes the reasons only while this is on. Same as the Progressive button' },
  { key: 'traceSpeed', label: 'Step speed', needs: 'reasoning', options: [[0, 'Slow'], [1, 'Normal'], [2, 'Fast']] },
  { connection: true },
  { tab: 'Appearance' },
  { group: 'Colours' },
  { key: 'theme', label: 'Theme', swatches: true, options: [
    ['tide', 'Tide', 'Teal and bottle green'],
    ['dusk', 'Dusk', 'Pink and purple'],
  ] },
  { key: 'mode', label: 'Light or dark', options: [
    ['system', 'Match device'],
    ['light', 'Light'],
    ['dark', 'Dark'],
  ] },
  { key: 'relationColour', label: 'Colour outlines by cause and effect', hint: 'Off: every orb gets the same grey outline' },
  { group: 'Orbs' },
  { key: 'names', label: 'Names inside every orb', hint: 'Off: names appear on hover' },
  { key: 'leadGlow', label: 'Glow around hidden leads' },
  { group: 'Background' },
  { key: 'lineArt', label: 'Patterned border' },
  { tab: 'Map' },
  { group: 'Size and spacing' },
  { key: 'hierarchy', label: 'Size orbs by relevance', format: 'percent', min: 0, max: 1, step: 0.05, relayout: true },
  { key: 'orbSize', label: 'Orb size', min: 0.6, max: 1.5, step: 0.05, unit: '×', relayout: true },
  { key: 'spacing', label: 'Spacing', min: 0.6, max: 1.6, step: 0.05, unit: '×', relayout: true },
  { key: 'fillScreen', label: 'Stretch to fill wide screens', relayout: true },
  { group: 'Lines' },
  { key: 'threads', label: 'Woven threads', hint: 'Each line is a few glowing strands that meet at the orbs; stronger links get more. Off: plain straight lines' },
  { key: 'streams', label: 'Cause and effect streams' },
  { key: 'centreLines', label: 'Faint lines to the centre' },
  { key: 'crossLinks', label: 'Faint lines between linked orbs', hint: 'Progressive mode always shows every line' },
  { group: 'Depth' },
  { key: 'sameSize', label: 'Keep orbs the same size at any depth', hint: 'Off: farther orbs look smaller' },
  { key: 'depthFade', label: 'Fade with distance', hint: 'Farther orbs are more see-through' },
  { tab: 'Motion' },
  { reducedNote: true },
  { group: 'Whole map' },
  { key: 'mapMotion', label: 'Until you grab it, the map', options: [['still', 'Stays still'], ['sway', 'Sways'], ['spin', 'Spins']] },
  { group: 'Orbs and streams' },
  { key: 'organic', label: 'Gently warping, drifting orbs', hint: 'Also lets the threads between orbs weave' },
  { key: 'streamSpeed', label: 'Stream speed', needs: 'streams', min: 0.4, max: 2, step: 0.1, unit: '×' },
  { group: 'Background' },
  { key: 'backdropMotion', label: 'Background motion', hint: 'The shifting colours and the slowly turning patterns' },
  { tab: 'Sound' },
  { group: 'Playback' },
  { key: 'sound', label: 'Sound on', hint: 'Off until you switch it on. Same as the speaker button at the top' },
  { key: 'volume', label: 'Volume', needs: 'sound', format: 'percent', min: 0, max: 1, step: 0.05 },
  { group: 'What plays' },
  { key: 'music', label: 'Background drone', needs: 'sound', hint: 'A slow chord that follows the theme' },
  { key: 'bells', label: 'Orb bells', needs: 'sound', hint: 'A note as each orb appears: causes low, effects high, stronger links nearer the home note. Ticks and crosses answer too' },
  { key: 'cues', label: 'Progressive cues', needs: 'sound', hint: 'In Progressive mode, links between orbs and lines you hover play their two notes' },
];
const STORE_KEY = 'celestial.view';
let viewTab = 'Research';
const storedView = readStoredView();
const view = { ...VIEW_DEFAULTS, ...storedView };
if (!['tide', 'dusk'].includes(view.theme)) view.theme = VIEW_DEFAULTS.theme;
// Sway and spin used to be two switches; they're now one choice
if (!storedView.mapMotion) view.mapMotion = storedView.spin ? 'spin' : storedView.sway === false ? 'still' : 'sway';
delete view.sway; delete view.spin;
function readStoredView() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function storeView() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(view)); } catch { /* not available */ }
}

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const darkDevice = matchMedia('(prefers-color-scheme: dark)');
// Pixels taken by the bars at the top and bottom, measured from the page
// (the top bar is taller on a phone, and the findings bar sits at the bottom there)
const narrow = () => innerWidth < 640;
let bars = null;   // measured at most once per frame
function measureBars() {
  if (bars && bars.at === frameCount) return bars;
  const top = Math.max(90, (document.querySelector('.top')?.getBoundingClientRect().bottom || 130) + 10);
  // On a phone the findings bar and the reasoning panel sit at the bottom (the
  // reasoning panel hides the findings while it's open)
  const f = document.body.classList.contains('tracing') ? document.getElementById('trace') : document.getElementById('findings');
  const bottom = !narrow() || !f || f.hidden ? 40 : Math.max(40, innerHeight - f.getBoundingClientRect().top + 12);
  return (bars = { top, bottom, at: frameCount });
}
let frameCount = 0;
const uiTop = () => measureBars().top;
const uiBottom = () => measureBars().bottom;
// Pixels the open findings panel takes on the left of a wide screen
const uiLeft = () => {
  const f = document.getElementById('findings');
  return f && !f.hidden && !f.classList.contains('is-collapsed') && innerWidth > 900 ? f.offsetWidth + 24 : 0;
};
// ...and the reasoning panel on the right
const uiRight = () => {
  const t = document.getElementById('trace');
  return t && !t.hidden && innerWidth > 900 ? t.offsetWidth + 24 : 0;
};
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

// ─── 2. Line art around the edges ────────────────────────────
// Tribal, engraved patterns with a celestial core: sun-stones in the corners,
// moon-phase stones at the sides, an astrolabe horizon along the bottom,
// patterned friezes that slowly circle the frame, and twinkling stars.
// Each moving part is its own layer, so the browser can move it cheaply.
// A CSS mask (.art, in the style block) fades it out towards the middle of the screen.
const n1 = (v) => v.toFixed(1);
const polar = (r, deg) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];
const pts = (list) => list.map(([x, y]) => `${n1(x)} ${n1(y)}`).join('L');
const ring = (r, extra = '') => `<circle r="${n1(r)}" ${extra}/>`;
const FILL = 'fill="currentColor" stroke="none"';
const SOFT_FILL = 'fill="currentColor" fill-opacity="0.45" stroke="none"';

// A ring of triangle "teeth" between two radii, every other one filled
function teeth(r1, r2, count, extra = '') {
  let out = '';
  const step = 360 / count;
  for (let i = 0; i < count; i++) {
    const a = i * step;
    out += `<path d="M${pts([polar(r1, a), polar(r2, a + step / 2), polar(r1, a + step)])}" ${i % 2 ? SOFT_FILL : extra}/>`;
  }
  return out;
}
// A zigzag running round between two radii
const zigzag = (r1, r2, count) =>
  `<path d="M${pts(Array.from({ length: count * 2 + 1 }, (_, i) => polar(i % 2 ? r2 : r1, (i * 180) / count)))}"/>`;
// A ring of dots
const dotRing = (r, count, size) => Array.from({ length: count }, (_, i) => {
  const [x, y] = polar(r, (i * 360) / count);
  return `<circle cx="${n1(x)}" cy="${n1(y)}" r="${size}" ${FILL}/>`;
}).join('');
// Rays between two radii, alternating long and short
const rays = (r1, r2, r3, count) => Array.from({ length: count }, (_, i) => {
  const a = (i * 360) / count;
  return `<path d="M${pts([polar(r1, a), polar(i % 2 ? r3 : r2, a)])}"/>`;
}).join('');
// Lens-shaped petals around the centre
const petals = (r1, r2, count, width) => Array.from({ length: count }, (_, i) => {
  const a = (i * 360) / count, [x1, y1] = polar(r1, a), [x2, y2] = polar(r2, a);
  const [c1x, c1y] = polar((r1 + r2) / 2, a + width), [c2x, c2y] = polar((r1 + r2) / 2, a - width);
  return `<path d="M${n1(x1)} ${n1(y1)}Q${n1(c1x)} ${n1(c1y)} ${n1(x2)} ${n1(y2)}Q${n1(c2x)} ${n1(c2y)} ${n1(x1)} ${n1(y1)}Z" ${i % 2 ? SOFT_FILL : ''}/>`;
}).join('');
// A moon in a given phase (0 new → 0.5 full → 1 new)
function moon(x, y, r, phase) {
  const lit = Math.cos(phase * 2 * Math.PI), rx = Math.abs(lit) * r;
  const waxing = phase < 0.5;
  const d = `M${n1(x)} ${n1(y - r)}A${n1(r)} ${n1(r)} 0 0 ${waxing ? 1 : 0} ${n1(x)} ${n1(y + r)}A${n1(rx)} ${n1(r)} 0 0 ${(lit > 0) === waxing ? 0 : 1} ${n1(x)} ${n1(y - r)}Z`;
  return `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(r)}"/><path d="${d}" ${SOFT_FILL}/>`;
}

// A sun-stone in two layers that turn in opposite directions
function sunStone(r, count = 36) {
  const outer = ring(r) + ring(r * 0.965) + teeth(r * 0.84, r * 0.95, count) + ring(r * 0.84)
    + dotRing(r * 0.795, count * 2, Math.max(0.8, r * 0.006)) + ring(r * 0.75, 'stroke-dasharray="1 5"');
  const inner = zigzag(r * 0.56, r * 0.69, count / 2) + ring(r * 0.71) + ring(r * 0.54)
    + rays(r * 0.31, r * 0.5, r * 0.42, count / 2) + ring(r * 0.3) + petals(r * 0.1, r * 0.27, 8, 13)
    + ring(r * 0.085) + `<circle r="${n1(r * 0.03)}" ${FILL}/>`;
  return { outer, inner };
}
// A moon-stone: the phases of the moon in a patterned ring
function moonStone(r) {
  const phases = Array.from({ length: 12 }, (_, i) => {
    const [x, y] = polar(r * 0.8, i * 30 - 90);
    return moon(x, y, r * 0.075, i / 12);
  }).join('');
  const outer = ring(r) + ring(r * 0.97, 'stroke-dasharray="2 4"') + teeth(r * 0.9, r * 0.97, 48) + ring(r * 0.9)
    + phases + ring(r * 0.69);
  const inner = zigzag(r * 0.5, r * 0.63, 20) + ring(r * 0.47) + dotRing(r * 0.42, 40, Math.max(0.7, r * 0.007))
    + ring(r * 0.36) + rays(r * 0.12, r * 0.33, r * 0.25, 24) + ring(r * 0.11);
  return { outer, inner };
}

// One period of the frieze that circles the screen edge. y is the distance
// in from the edge. Drawn one period too long, so sliding it loops seamlessly.
const FRIEZE = { depth: 44, period: 24 };
function frieze(length) {
  const P = FRIEZE.period, out = [];
  out.push(`<path d="M0 3H${length}M0 19H${length}M0 33H${length}" stroke-width="0.7"/>`);
  for (let x = 0; x < length; x += P) {
    // Teeth pointing inward, every other one filled
    out.push(`<path d="M${x} 3L${x + P / 4} 15L${x + P / 2} 3" />`);
    out.push(`<path d="M${x + P / 2} 3L${x + (3 * P) / 4} 15L${x + P} 3Z" ${SOFT_FILL}/>`);
    // A chain of diamonds with a dot in each
    for (const d of [0, P / 2]) {
      const cx = x + d + P / 4;
      out.push(`<path d="M${cx - P / 4} 26L${cx} 21L${cx + P / 4} 26L${cx} 31Z"/>`);
      out.push(`<circle cx="${cx}" cy="26" r="1.1" ${FILL}/>`);
    }
    // Dotted row
    for (let i = 0; i < 4; i++) out.push(`<circle cx="${x + i * (P / 4) + P / 8}" cy="39" r="0.9" ${FILL}/>`);
  }
  return out.join('');
}

function drawLineArt() {
  const w = innerWidth, h = innerHeight;
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const layers = [];
  const svg = (vb, body, attrs = '') =>
    `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="0.8" ${attrs}>${body}</svg>`;

  // Friezes along all four edges, circling the screen clockwise
  const D = FRIEZE.depth, P = FRIEZE.period;
  for (const [length, place] of [
    [w, `left:0;top:0;transform:none`],
    [h - 2 * D, `left:${w}px;top:${D}px;transform:rotate(90deg)`],
    [w, `left:${w}px;top:${h}px;transform:rotate(180deg)`],
    [h - 2 * D, `left:0;top:${h - D}px;transform:rotate(-90deg)`],
  ]) {
    const L = Math.ceil(length / P) * P + P;
    layers.push(`<div class="strip" style="${place};width:${n1(length)}px;height:${D}px">${svg(`0 0 ${L} ${D}`, frieze(L), `width="${L}" height="${D}" class="drift"`)}</div>`);
  }

  // Stones: two layers each, turning slowly in opposite directions
  const m = Math.min(w, h);
  const stones = [
    [0.02 * w, h * 1.0, m * 0.3, 'sun', 300],
    [w * 0.98, h * 1.0, m * 0.3, 'sun', 360],
    [-m * 0.04, h * 0.5, m * 0.14, 'moon', 260],
    [w + m * 0.04, h * 0.5, m * 0.14, 'moon', 280],
  ];
  for (const [x, y, r, kind, secs] of stones) {
    const { outer, inner } = kind === 'sun' ? sunStone(r, 36) : moonStone(r);
    const box = `left:${n1(x - r)}px;top:${n1(y - r)}px;width:${n1(2 * r)}px;height:${n1(2 * r)}px`;
    const vb = `${n1(-r)} ${n1(-r)} ${n1(2 * r)} ${n1(2 * r)}`;
    layers.push(`<div class="stone" style="${box}">
      ${svg(vb, outer, `class="turn" style="--secs:${secs}s"`)}
      ${svg(vb, inner, `class="turn back" style="--secs:${secs * 0.7}s"`)}</div>`);
  }

  // The astrolabe horizon: a great arc with a degree scale, turning very slowly
  const R = Math.max(w * 0.78, 760), cy = h + R * 0.86;
  let arc = ring(R) + ring(R + 16) + ring(R + 22, 'stroke-dasharray="1 6"') + ring(R + 70, 'stroke-dasharray="2 7"') + ring(R - 48, 'stroke-dasharray="1 9"');
  for (let a = -180; a < 180; a += 1.25) {
    const major = Math.abs(a % 10) < 0.01;
    arc += `<path d="M${pts([polar(R, a), polar(R + (major ? 16 : 6), a)])}"/>`;
  }
  arc += teeth(R + 30, R + 44, 360);
  for (let a = -180; a < 180; a += 5) arc += `<path d="M${pts([polar(R + 48, a), polar(R + 70, a)])}" stroke-dasharray="1 4"/>`;
  const big = R + 72;
  layers.push(`<div class="stone horizon" style="left:${n1(w / 2 - big)}px;top:${n1(cy - big)}px;width:${n1(2 * big)}px;height:${n1(2 * big)}px">
    ${svg(`${n1(-big)} ${n1(-big)} ${n1(2 * big)} ${n1(2 * big)}`, arc, 'class="turn" style="--secs:900s"')}</div>`);

  // Stars and constellations, only around the edges
  const stars = [];
  while (stars.length < 30) {
    const x = rnd() * w, y = rnd() * h;
    const dx = (x - w / 2) / (w / 2), dy = (y - h * 0.45) / (h / 2);
    if (dx * dx + dy * dy > 0.62) stars.push([x, y, 1.5 + rnd() * 3.5]);
  }
  let lines = '';
  for (let c = 0; c < 3; c++) {
    const [ax, ay] = stars[c * 9];
    const near = [...stars].sort((p, q) => Math.hypot(p[0] - ax, p[1] - ay) - Math.hypot(q[0] - ax, q[1] - ay)).slice(0, 5);
    lines += `<path d="M${pts(near)}" stroke-dasharray="4 3"/>`;
  }
  layers.push(svg(`0 0 ${w} ${h}`, lines, `class="sky" width="${w}" height="${h}"`));
  for (const [x, y, size] of stars) {
    const star = `<path d="M${-size} 0Q0 0 0 ${-size}Q0 0 ${size} 0Q0 0 0 ${size}Q0 0 ${-size} 0Z" ${FILL}/>`;
    layers.push(`<div class="star" style="left:${n1(x - size)}px;top:${n1(y - size)}px;width:${n1(2 * size)}px;height:${n1(2 * size)}px;--delay:${(-rnd() * 9).toFixed(1)}s;--secs:${(5 + rnd() * 6).toFixed(1)}s">${svg(`${-size} ${-size} ${2 * size} ${2 * size}`, star)}</div>`);
  }

  $('art').innerHTML = layers.join('');
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
controls.addEventListener('start', () => { grabbed = true; camGoal = null; camVel.set(0, 0, 0); lookVel.set(0, 0, 0); });

const world = new THREE.Group();
scene.add(world);

// ─── Colours come from the CSS tokens in the style block ─────
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
  // Where threads overlap they run hot towards the ink colour; on light
  // themes they're drawn as ink strokes instead of light
  threadUniforms.uCore.value.set(css.getPropertyValue('--ink').trim());
  threadUniforms.uLight.value = themeName().endsWith('light') ? 1 : 0;
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
// ─── Live research with Claude (see the RESEARCH script) ─────
const R = window.CELESTIAL_RESEARCH;
const KEY_STORE = 'celestial.key', CACHE_STORE = 'celestial.research';
const readKey = () => { try { return localStorage.getItem(KEY_STORE) || ''; } catch { return ''; } };
let apiKey = readKey();
// Opened on claude.ai? Then research can only run on the viewer's own Claude
// plan (the page can't reach Anthropic's API directly from there).
const inViewer = Boolean(window.claude?.use);
let planReady = false;              // true when research can run on the viewer's Claude plan
const BLOCKED_NOTE = 'claude.ai isn’t letting this page use Claude for you here, and doesn’t say why. Things to try: open the link in a web browser (not the mobile app) while signed in to claude.ai, then reload; check that your account or organisation allows artifacts to use Claude. Meanwhile you can explore the example.';
let planBlocked = 'checking';       // on claude.ai without Claude: 'checking' | 'denied' | 'unavailable'
// Only on this site: with no key, research replays preloaded answers (demo.js)
const DEMO = window.CELESTIAL_DEMO;
const demo = () => Boolean(DEMO) && !inViewer && !apiKey;
const live = () => Boolean(R && (planReady || apiKey || demo()));
const backend = () => (planReady ? 'plan' : demo() ? 'demo' : 'api');
const whoAnswers = () => (planReady ? 'your Claude plan' : demo() ? 'Claude' : R.MODELS[view.model].name);
const DEMO_END = 'The demo’s preloaded research ends here. Add your Claude API key in Settings to keep going live.';
const session = { mode: 'diagnose' };
const liveIds = new Set();          // topics that came from Claude (saved between visits)
const pending = new Set();          // systems being mapped right now
const detailsLoading = new Set();

const canExpand = (id) => Boolean(DATA.systems[id]) || (live() && (!demo() || DEMO.hasMap(DATA.topics[id]?.title)));
const orbitOf = (l) => lerp(TUNING.nearestOrbit, TUNING.farthestOrbit, 1 - l.link) * view.spacing;
// Size grows with relevance; "Emphasis on relevance" blends towards equal sizes
const radiusFor = (relevance) => lerp((TUNING.smallestOrb + TUNING.largestOrb) / 2,
  lerp(TUNING.smallestOrb, TUNING.largestOrb, relevance), view.hierarchy);
const sizeOf = (l) => radiusFor(l.relevance) * view.orbSize;

// ─── Your ticks and crosses ──────────────────────────────────
// Each opened orb can be marked relevant (yes) or not relevant (no).
// Marks belong to the current investigation and are kept between visits.
// They rearrange the map: ticked orbs come in close and grow, crossed
// orbs shrink, fade and drift out, and unmarked orbs move towards or
// away from them depending on how closely they're linked.
const FEEDBACK_STORE = 'celestial.feedback';
let verdicts = {};                  // topic id → 'yes' | 'no'
let verdictOrder = [];              // ids in the order they were marked
const FEEDBACK = {
  pull: 0.35,          // how far an unmarked orb's link and relevance move with affinity
  sway: 0.45,          // how far it turns towards the ticked orb it's linked to
};
const marked = (v) => verdictOrder.filter((id) => verdicts[id] === v && DATA.topics[id]);
function saveFeedback() {
  try { localStorage.setItem(FEEDBACK_STORE, JSON.stringify({ root: trail[0], verdicts, order: verdictOrder })); } catch { /* ignore */ }
}
function loadFeedback() {
  try {
    const f = JSON.parse(localStorage.getItem(FEEDBACK_STORE) || 'null');
    if (f && f.root === trail[0]) { verdicts = f.verdicts || {}; verdictOrder = (f.order || Object.keys(verdicts)).filter((id) => verdicts[id]); }
  } catch { /* nothing saved */ }
}
function clearFeedback() { verdicts = {}; verdictOrder = []; saveFeedback(); }
const feedbackTitles = () => ({ yes: marked('yes').map((id) => DATA.topics[id].title), no: marked('no').map((id) => DATA.topics[id].title) });

// Words in a title or one-liner, roughly stemmed, for spotting kinship
// between topics that the map didn't link explicitly
const STOP = new Set('the and for with from that this into than when what which their there about your more less over under after before part parts'.split(' '));
const wordsOf = (id) => new Set(`${DATA.topics[id]?.title || ''} ${DATA.topics[id]?.liner || ''}`.toLowerCase().match(/[a-z]{4,}/g)?.filter((w) => !STOP.has(w)).map((w) => w.replace(/(ing|ed|es|s)$/, '')) || []);
function kinship(a, b) {
  const wa = wordsOf(a), wb = wordsOf(b);
  if (!wa.size || !wb.size) return 0;
  let shared = 0;
  for (const w of wa) if (wb.has(w)) shared++;
  return Math.min(1, shared / Math.sqrt(wa.size * wb.size) * 1.6);
}

// How strongly an unmarked orb is tied to what you ticked (+) and crossed (−),
// and which ticked orb it leans towards. Cross-links count most; shared
// words count a little.
function affinity(id, sunId) {
  let score = 0, towards = null, best = 0;
  const links = DATA.crossLinks?.[sunId] || [];
  for (const other of verdictOrder) {
    const v = verdicts[other];
    if (!v || other === id) continue;
    const link = links.find(([a, b]) => (a === id && b === other) || (b === id && a === other));
    const tie = Math.max(link ? link[2] : 0, 0.6 * kinship(id, other));
    if (tie < 0.15) continue;
    if (v === 'yes') { score += tie; if (tie > best) { best = tie; towards = other; } }
    else score -= 0.7 * tie;
  }
  return { score: clamp(score, -1, 1), towards };
}

// The system around a sun, with link and relevance adjusted by your marks.
// order keeps each orb's place in the spiral, so marking reshapes the map
// without shuffling everything.
function adjustedSystem(sunId) {
  return (DATA.systems[sunId] || []).map((spec) => {
    const v = verdicts[spec.to];
    const base = { ...spec, order: spec.relevance, verdict: v || null, towards: null, affinity: 0 };
    if (v === 'yes') return { ...base, link: Math.max(spec.link, 0.6 + 0.4 * spec.link), relevance: Math.max(spec.relevance, 0.95) };
    if (v === 'no') return { ...base, link: spec.link * 0.25, relevance: spec.relevance * 0.35 };
    const { score, towards } = affinity(spec.to, sunId);
    return {
      ...base,
      affinity: score,
      towards: score > 0 ? towards : null,
      link: clamp(spec.link + score * FEEDBACK.pull, 0, 1),
      relevance: clamp(spec.relevance + score * FEEDBACK.pull, 0, 1),
    };
  });
}

// Unmarked orbs that your ticks point to most, for "worth a look next"
function suggestions(sunId, n = 3) {
  return adjustedSystem(sunId)
    .filter((s) => !s.verdict && s.affinity > 0.1)
    .sort((a, b) => b.affinity * 2 + b.relevance - (a.affinity * 2 + a.relevance))
    .slice(0, n);
}

// ─── Layout: where each orb goes ─────────────────────────────
// Orbs are spread evenly in all three dimensions around the sun.
// Distance from the sun comes from "link".
function layout(links) {
  const placed = links.some((l) => l.parent) ? layoutInside(links) : spread(links);
  // 4. Optionally stretch sideways so a wide screen gets used
  const widen = widenFactor();
  const tall = tallFactor();
  for (const p of placed) { p.target.x *= widen; p.target.z *= widen; p.target.y *= tall; }
  return placed;
}

// An inside view (Go deeper) reads like an exploded diagram: sub-systems
// sit on a ring round the centre, facing you, and each one's parts fan out
// beyond it, so every cluster is easy to tell apart
function layoutInside(links) {
  const subs = links.filter((l) => !l.parent).sort((a, b) => (b.order ?? b.relevance) - (a.order ?? a.relevance));
  const placed = [];
  subs.forEach((sub, i) => {
    const a = Math.PI / 2 + (i / subs.length) * Math.PI * 2 + (subs.length % 2 ? 0 : Math.PI / subs.length);
    const out = new THREE.Vector3(Math.cos(a), Math.sin(a) * 0.85, 0).normalize();
    const target = out.clone().multiplyScalar(orbitOf(sub)).setZ(i % 2 ? -2 : 2);
    placed.push({ ...sub, target });
    const parts = links.filter((l) => l.parent === sub.to).sort((x, y) => y.relevance - x.relevance);
    const fan = Math.min(Math.PI * 0.85, parts.length * 0.8);
    parts.forEach((p, k) => {
      const b = a + (parts.length > 1 ? (k / (parts.length - 1) - 0.5) * fan : 0);
      const d = (sizeOf(sub) + sizeOf(p) + TUNING.gap) * 1.15 * view.spacing;
      placed.push({ ...p, target: target.clone().add(new THREE.Vector3(Math.cos(b) * d, Math.sin(b) * d, k % 2 ? 2.5 : -2.5)) });
    });
  });
  // Nudge apart anything that still overlaps; sub-systems stay put
  const push = new THREE.Vector3();
  for (let pass = 0; pass < 80; pass++) {
    let moved = false;
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        const a = placed[i], b = placed[j];
        const need = sizeOf(a) + sizeOf(b) + TUNING.gap, d = a.target.distanceTo(b.target);
        if (d >= need) continue;
        push.subVectors(a.target, b.target);
        if (push.lengthSq() < 1e-6) push.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
        push.setLength((need - d) / (a.parent && b.parent ? 2 : 1));
        if (a.parent) a.target.add(push);
        if (b.parent) b.target.sub(push);
        moved = true;
      }
    }
    if (!moved) break;
  }
  return placed;
}

// Steps 1 to 3 of a normal layout: directions, then distances, then room
function spread(links) {
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
    .sort((a, b) => (b.order ?? b.relevance) - (a.order ?? a.relevance))
    .map((l, k) => ({ ...l, target: dirs[(k * stride) % n].clone().multiplyScalar(orbitOf(l)) }));
  // Orbs tied to something you ticked turn towards it, so related
  // findings gather on one side of the sun
  for (const p of placed) {
    if (!p.towards) continue;
    const anchor = placed.find((q) => q.to === p.towards);
    if (!anchor) continue;
    const d = p.target.clone().normalize().lerp(anchor.target.clone().normalize(), FEEDBACK.sway * clamp(p.affinity, 0, 1));
    if (d.lengthSq() > 1e-4) p.target.copy(d.setLength(orbitOf(p)));
  }
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
  return placed;
}

// On a tall (portrait) screen the system stretches vertically instead
function tallFactor() {
  if (!view.fillScreen) return 1;
  const usable = Math.max(stage.clientHeight - uiTop() - uiBottom(), 1) / stage.clientWidth;
  return clamp(usable * 1.2, 1, 2.6);
}
function widenFactor() {
  if (!view.fillScreen) return 1;
  const usable = stage.clientWidth / Math.max(stage.clientHeight - uiTop() - uiBottom(), 1);
  return clamp(usable, 1, TUNING.widen);
}

// Place one more orb while others already exist: pick the direction
// furthest from everything already there, at the distance its link sets.
function placeAmong(spec, existing) {
  const widen = widenFactor();
  const tall = tallFactor();
  const taken = existing.map((t) => new THREE.Vector3(t.x / widen, t.y / tall, t.z / widen).normalize());
  const golden = Math.PI * (3 - Math.sqrt(5)), spin = Math.random() * Math.PI * 2;
  let best = null, bestGap = -1;
  for (let i = 0; i < 64; i++) {
    const y = 1 - (2 * (i + 0.5)) / 64, ring = Math.sqrt(1 - y * y), a = spin + i * golden;
    const dir = new THREE.Vector3(ring * Math.cos(a), y, ring * Math.sin(a));
    const gap = taken.length ? Math.min(...taken.map((t) => t.distanceTo(dir))) : 1;
    if (gap > bestGap) { bestGap = gap; best = dir; }
  }
  const p = best.multiplyScalar(orbitOf(spec));
  p.x *= widen; p.z *= widen; p.y *= tall;
  return p;
}

// Re-frame the camera shortly after orbs stop arriving
let fitTimer;
const scheduleFit = () => { clearTimeout(fitTimer); fitTimer = setTimeout(() => fitCamera(), 250); };

// Add an orb to the system on screen while the rest are still loading
function addQuickOrb(centreId, spec) {
  if (orbs[0]?.id !== centreId || orbs.some((o) => o.id === spec.to)) return false;
  (DATA.systems[centreId] ||= []).push(spec);   // provisional until the full map arrives
  const previous = trail.length > 1 ? trail[trail.length - 2] : null;
  const o = makeOrb({ ...spec, target: placeAmong(spec, orbs.slice(1).map((x) => x.target)), cameFrom: spec.to === previous });
  o.hub = orbs[0];
  orbs.push(o);
  if (view.reasoning) traceSketch(o);
  else S?.orb(o);
  tween(TUNING.expand.arrive, (t) => { o.grow = t; o.obj.position.lerpVectors(o.start, o.target, t); }, null, { ease: easeOut, owner: o });
  scheduleFit();
  return true;
}

// ─── Camera: frame the whole system so it fills the screen ───
function fitCamera(animate = true) {
  if (!orbs.length) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  const fy = (h - uiTop() - uiBottom()) / h;
  const left = uiLeft(), right = uiRight();
  const fx = (w - 60 - left - right) / w;
  systemRadius = Math.max(...orbs.map((o) => o.target.length()), 10);
  let dist = 20;
  for (const o of orbs) {
    const p = o.target, pad = o.radius * view.orbSize;
    dist = Math.max(dist,
      p.z + (Math.abs(p.y) + pad) / (tanV * fy),
      p.z + (Math.abs(p.x) + pad) / (tanV * camera.aspect * fx));
  }
  // Shift the view so the system sits in the space between the bars
  const shift = ((uiTop() - uiBottom()) / 2 / h) * 2 * tanV * dist;
  // ...and between the findings and reasoning panels when they're open
  const shiftX = -((left - right) / 2 / w) * 2 * tanV * camera.aspect * dist;
  const to = new THREE.Vector3(shiftX, dist * 0.05 + shift, dist);
  const look = new THREE.Vector3(shiftX, shift, 0);
  controls.minDistance = dist * 0.25;
  controls.maxDistance = dist * 3;
  if (animate && !reduceMotion) camGoal = { pos: to, look };
  else { camGoal = null; camera.position.copy(to); controls.target.copy(look); }
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

// Link, relevance and confidence are Claude's estimates, so they're shown as
// a word and a rough bar rather than an exact-looking number
const band = (v) => (v >= 0.8 ? 'Strong' : v >= 0.6 ? 'Clear' : v >= 0.4 ? 'Some' : 'Weak');

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
// ─── Diagrams Claude describes, drawn here ───────────────────
// Claude sends a short description (the kind of diagram and its steps or
// parts); this turns it into a drawing in the same style as the hand-made
// illustrations. chain = steps in order, cycle = a loop, hub = parts.
function wrapWords(text, max) {
  const lines = [];
  let line = '';
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    if (line && (line + ' ' + word).length > max) { lines.push(line); line = word; }
    else line = line ? line + ' ' + word : word;
  }
  if (line) lines.push(line);
  return lines;
}
function arrowPath(x1, y1, x2, y2) {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 5.5, n = (v) => v.toFixed(1);
  return `<path class="il-arrow" d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}M${n(x2 + h * Math.cos(a + 2.6))} ${n(y2 + h * Math.sin(a + 2.6))}L${n(x2)} ${n(y2)}L${n(x2 + h * Math.cos(a - 2.6))} ${n(y2 + h * Math.sin(a - 2.6))}"/>`;
}
const textLines = (lines, x, y, cls, step, anchor = 'middle') =>
  lines.map((l, i) => `<text class="${cls}" x="${x}" y="${(y + i * step).toFixed(1)}" text-anchor="${anchor}">${esc(l)}</text>`).join('');

function diagramSVG(d, centreTitle) {
  const W = 320;
  if (d.kind === 'chain') {
    // Steps top to bottom, each in a box, joined by arrows
    let y = 4, body = '';
    d.nodes.forEach((node, i) => {
      const label = wrapWords(node.label, 44).slice(0, 2), note = wrapWords(node.note, 54).slice(0, 2);
      const h = 10 + label.length * 13 + note.length * 11;
      body += `<rect class="il-part" x="28" y="${y}" width="${W - 36}" height="${h}" rx="6"/>`;
      body += `<circle class="il-accent" cx="12" cy="${y + h / 2}" r="8"/>${textLines([String(i + 1)], 12, y + h / 2 + 3, 'il-text', 0)}`;
      body += textLines(label, 38, y + 16, 'il-head', 13, 'start');
      body += textLines(note, 38, y + 16 + label.length * 13, 'il-text', 11, 'start');
      y += h;
      if (i < d.nodes.length - 1) { body += arrowPath(W / 2, y + 2, W / 2, y + 14); y += 16; }
    });
    return `<svg viewBox="0 0 ${W} ${y + 4}" role="img">${body}</svg>`;
  }
  // Hub and cycle: nodes around an ellipse
  const H = 236, cx = W / 2, cy = H / 2, rx = 108, ry = 82, n = d.nodes.length;
  const spots = d.nodes.map((node, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const label = wrapWords(node.label, 15).slice(0, 3);
    const w = Math.max(...label.map((l) => l.length)) * 5.9 + 14, h = label.length * 12 + 8;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), label, w, h };
  });
  let lines = '', boxes = '';
  if (d.kind === 'hub') {
    const title = wrapWords(centreTitle, 12).slice(0, 3);
    for (const p of spots) lines += `<path class="il-ghost" d="M${cx} ${cy}L${p.x.toFixed(1)} ${p.y.toFixed(1)}"/>`;
    boxes += `<circle class="il-steel" cx="${cx}" cy="${cy}" r="34"/>` + textLines(title, cx, cy + 4 - (title.length - 1) * 6, 'il-head', 12);
  } else {
    // Arrows from each step to the next, stopping short of the labels
    spots.forEach((p, i) => {
      const q = spots[(i + 1) % n];
      const dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy);
      const cut = (s) => Math.min(len * 0.35, Math.abs(dx / len) * s.w / 2 + Math.abs(dy / len) * s.h / 2 + 6);
      const a = cut(p), b = cut(q);
      lines += arrowPath(p.x + dx / len * a, p.y + dy / len * a, q.x - dx / len * b, q.y - dy / len * b);
    });
  }
  for (const p of spots) {
    const x = clamp(p.x, p.w / 2 + 2, W - p.w / 2 - 2), y = clamp(p.y, p.h / 2 + 2, H - p.h / 2 - 2);
    boxes += `<rect class="il-part" x="${(x - p.w / 2).toFixed(1)}" y="${(y - p.h / 2).toFixed(1)}" width="${p.w.toFixed(1)}" height="${p.h}" rx="6"/>`;
    boxes += textLines(p.label, x.toFixed(1), y - p.h / 2 + 15, 'il-head', 12);
  }
  return `<svg viewBox="0 0 ${W} ${H}" role="img">${lines}${boxes}</svg>`;
}

function orbClasses(o) {
  const keep = ['is-hover', 'is-selected', 'is-dim', 'is-leaving'].filter((c) => o.el.classList.contains(c));
  o.el.className = ['orb',
    o.isSun ? 'sun' : 'rel-' + o.rel,
    o.lead ? 'lead' : '',
    // Double outline: this orb's own system is ready to open instantly
    !o.isSun && DATA.systems[o.id] ? 'expandable' : '',
    o.isSun ? '' : o.relevance >= 0.75 ? 'rank-high' : o.relevance < 0.4 ? 'rank-low' : '',
    o.verdict ? 'v-' + o.verdict : '',
    o.role === 'sub' ? 'role-sub' : '',
    ...keep,
  ].filter(Boolean).join(' ');
}
function makeOrbElement(o) {
  const el = document.createElement('div');
  o.el = el;
  orbClasses(o);
  // Scrolling inside an opened card shouldn't zoom the view
  el.addEventListener('wheel', (e) => { if (o === selected) e.stopPropagation(); });
  // No hover previews while orbs are sliding into place under a still mouse
  el.addEventListener('pointerenter', () => { if (!busy) setHover(o); });
  el.addEventListener('pointerleave', () => { if (hovered === o) setHover(null); });
  // Inside an opened card, the card handles its own clicks and scrolling,
  // and dragging doesn't turn the view
  el.addEventListener('pointerdown', (e) => { o.wasOpen = o === selected; if (o.wasOpen) e.stopPropagation(); });
  el.addEventListener('click', (e) => {
    // The card's buttons appear under your finger as it opens: don't press them by accident.
    // A click from the keyboard (Enter or Space on a button) has no pointer, so it counts if the card is open
    if (!(e.detail === 0 ? o === selected : o.wasOpen)) return;
    const btn = e.target.closest('[data-action]');
    if (btn) runAction(btn.dataset.action, o, btn.dataset.id);
  });
  // Tab reaches every orb; focusing one previews it, Enter or Space opens it
  el.tabIndex = 0;
  el.addEventListener('focus', () => { if (!busy && o !== selected) setHover(o); });
  el.addEventListener('blur', () => { if (hovered === o) setHover(null); });
  el.addEventListener('keydown', (e) => {
    if (e.target !== el || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    if (o !== selected) openFocus(o);
  });
  el._orb = o;
  o.el = el;
  fillOrb(o);
  return el;
}

// ─── Sources: where an orb's information came from ──────────
// Two places a source can come from: the orb's own research (opening it),
// and, inside a deep map, the deeper pass that put the orb there (each part
// cites the sources that back it). Nothing here is made up by the page:
// it only shows what the research returned, and says how it was found.
const SOURCE_NOTES = {
  web: 'Found by web search while Claude researched this. Every link is a page the search actually returned; links Claude wrote that the search never returned are dropped.',
  named: 'No web search was used here (on a Claude plan, Claude can’t browse the web from this page), so these are references Claude named from its own knowledge. They haven’t been checked online. Use “find” to look each one up.',
  unlinked: 'Entries without a link are points Claude made without a page from its search to back them.',
  demo: 'Preloaded for this demo: references Claude named from its own knowledge when the demo was made, without browsing the web. They haven’t been checked online. Use “find” to look each one up.',
  example: 'These are examples showing how sources and their ratings look. Ask your own question to get real ones.',
};
const searchLink = (base, q) => base + encodeURIComponent(q);
function sourceLine(src) {
  const title = src.url ? `<a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.title)}</a>` : esc(src.title);
  const find = !src.url && (src.checked === 'named' || src.checked === 'unlinked' || src.checked === 'demo')
    ? ` <a class="src-search" href="${esc(searchLink('https://www.google.com/search?q=', src.title))}" target="_blank" rel="noopener noreferrer">find ↗</a>` : '';
  return `<li><span class="tier tier-${src.tier}" title="Reliability tier ${src.tier} of 6">${src.tier}</span><span>${src.video ? '<em class="video-badge">▶ Video</em>' : ''}<b>${esc(src.type)}</b> ${title}${find}${src.flag ? ` <em class="flag">⚠ ${esc(src.flag)}</em>` : ''}${src.host ? `<span class="src-host">${esc(src.host)}</span>` : ''}</span></li>`;
}
function sourcesFor(o) {
  const sunId = trail[trail.length - 1];
  const more = DATA.details?.[o.id] || {};
  const own = (more.sources || []).map((s) => ({ checked: more.live ? 'named' : 'example', ...s }));
  const inside = !o.isSun ? DATA.inside[sunId] : null;
  const cited = inside ? (inside.cites?.[o.id] || []).map((i) => inside.sources[i]).filter(Boolean) : [];
  const key = (s) => (s.url || s.title).toLowerCase();
  const ownKeys = new Set(own.map(key));
  const fromPass = cited.filter((s) => !ownKeys.has(key(s)));
  const all = [...own, ...fromPass];
  const videos = all.filter((s) => s.video);
  const list = (items) => `<ul class="sources">${items.map(sourceLine).join('')}</ul>`;
  const parts = [];
  // How these were found, most trustworthy first
  const kinds = [...new Set(all.map((s) => s.checked))].sort((a, b) => ['web', 'unlinked', 'named', 'demo', 'example'].indexOf(a) - ['web', 'unlinked', 'named', 'demo', 'example'].indexOf(b));
  for (const k of kinds) if (SOURCE_NOTES[k]) parts.push(`<p class="src-note">${SOURCE_NOTES[k]}</p>`);
  if (more.searched) parts.push(`<p class="src-note">Claude’s searches returned ${more.searched} page${more.searched === 1 ? '' : 's'}; these are the ones it used.</p>`);
  if (videos.length) parts.push(`<section class="section"><h3>Videos</h3>${list(videos)}</section>`);
  const ownText = own.filter((s) => !s.video), passText = fromPass.filter((s) => !s.video);
  if (ownText.length) parts.push(`<section class="section"><h3>${more.live ? 'From researching this orb' : 'Sources <span>· examples of the rating system</span>'}</h3>${list(ownText)}</section>`);
  if (passText.length) parts.push(`<section class="section"><h3>From the deeper pass on ${esc(DATA.topics[sunId].title)}</h3>${list(passText)}</section>`);
  if (!all.length) {
    parts.push(`<p class="src-note">${more.loading ? 'Researching… sources appear here when Claude finishes.'
      : more.error ? 'The research didn’t finish, so there are no sources yet.'
      : live() ? 'No sources yet. They appear here once Claude has researched this orb.'
      : 'No sources for this example orb. With Claude on, opening an orb researches it and lists its sources here.'}</p>`);
  }
  if (all.length && !videos.length && kinds.includes('web')) parts.push('<p class="src-note">The web search didn’t turn up a video for this.</p>');
  // Searches the person can run themselves, clearly not sources
  const t = DATA.topics[o.id].title, context = o.isSun ? '' : ' ' + DATA.topics[sunId].title;
  const q = (t + (o.role ? context : '')).trim();
  parts.push(`<section class="section"><h3>Look further yourself <span>· searches, not sources</span></h3><div class="find-more">
    <a href="${esc(searchLink('https://www.youtube.com/results?search_query=', q))}" target="_blank" rel="noopener noreferrer">▶ Videos on YouTube</a>
    <a href="${esc(searchLink('https://scholar.google.com/scholar?q=', q))}" target="_blank" rel="noopener noreferrer">Papers on Google Scholar</a>
    <a href="${esc(searchLink('https://en.wikipedia.org/w/index.php?search=', t))}" target="_blank" rel="noopener noreferrer">Wikipedia</a></div></section>`);
  return { html: parts.join(''), count: all.length, videos: videos.length };
}

// Everything inside an orb. Called again when research arrives.
function fillOrb(o) {
  const topic = DATA.topics[o.id];
  const el = o.el;
  let tag = '';
  if (o.verdict === 'yes') tag = '✓ Relevant';
  else if (o.verdict === 'no') tag = '✕ Not relevant';
  else if (o.cameFrom) tag = 'Came from';
  else if (o.role === 'sub') tag = 'Sub-system';
  else if (o.lead) tag = 'Hidden lead';
  else if (o.isSun && topic.inside) tag = 'Inside';
  const pressed = (v) => String(o.verdict === v);
  const meter = (name, value) =>
    `<div><dt>${name}</dt><dd><span class="bar"><i style="width:${value * 100}%"></i></span><output>${band(value)}</output></dd></div>`;
  const more = DATA.details?.[o.id] || {};
  const links = o.isSun ? [] : connectionsOf(o.id);
  // A hand-made drawing for the example topics, else one Claude described
  const drawing = window.CELESTIAL_ILLUSTRATIONS?.[o.id]
    || (more.diagram && { svg: diagramSVG(more.diagram, topic.title), caption: more.diagram.caption });
  let body;
  if (more.loading) body = `<p class="about-text preview-text">${esc(more.preview || '')}</p><p class="researching"><span class="spinner"></span>${planReady
    ? 'Researching in depth on your plan…'
    : demo() ? 'Researching in depth with Claude…'
    : `Researching in depth with ${esc(R.MODELS[view.model]?.name || 'Claude')}${view.webSearch ? ' and the web' : ''}…`}</p>`;
  else if (more.error) body = `<p class="research-error">${esc(more.error)}</p><button type="button" class="chip" data-action="retry">Try again</button>`;
  else if (more.about) body = `<p class="about-text">${esc(more.about)}</p>`;
  else if (demo() && !DEMO.hasDetails(topic.title)) body = `<p class="slot">${DEMO_END}</p>`;
  else if (live()) body = '<p class="slot">Opening this orb researches it with Claude.</p>';
  else body = `<p class="slot">${inViewer ? 'Sign in to claude.ai to research any topic in depth, on your own Claude plan.' : 'Connect Claude in Settings to research any topic in depth.'}</p>`;
  const sources = sourcesFor(o);
  const tab = o.tab === 'sources' ? 'sources' : 'about';
  const deeperHere = canGoDeeper(o.id);
  const actions = [
    o.isSun ? '' : canExpand(o.id) ? '<button class="orb-expand" type="button" data-action="expand">Expand</button>' : '',
    deeperHere ? '<button class="orb-deeper" type="button" data-action="deeper">Go deeper</button>' : '',
  ].filter(Boolean).join('');
  const actionNote = !actions && !o.isSun && !topic.inside
    ? `<p class="slot">${demo() ? DEMO_END : inViewer ? 'Sign in to claude.ai to expand any orb or go deeper' : 'Connect Claude to expand any orb or go deeper'}</p>`
    : deeperHere && !o.isSun ? '<p class="action-note">Expand shows its neighbours. Go deeper opens it up: sub-systems, parts and plausible connections, then you pick a thread.</p>'
    : deeperHere ? '<p class="action-note">Go deeper opens the centre up into sub-systems, parts and plausible connections, then you pick a thread.</p>' : '';
  const inside = o.isSun && topic.inside ? DATA.inside[o.id] : null;
  const overview = `
        ${more.image ? `<figure class="photo"><img src="${esc(more.image.src)}" alt="${esc(more.image.alt)}" loading="lazy"><figcaption>${more.image.href ? `<a href="${esc(more.image.href)}" target="_blank" rel="noopener noreferrer">${esc(more.image.credit)}</a>` : esc(more.image.credit)}</figcaption></figure>` : ''}
        ${drawing ? `<figure class="il">${drawing.svg}<figcaption>${esc(drawing.caption)}</figcaption></figure>` : ''}
        ${body}
        ${more.chart ? chartHTML(more.chart) : ''}
        ${more.check?.length ? `<section class="section"><h3>${session.mode === 'explore' && more.live ? 'Worth exploring next' : 'What to check'}</h3><ul class="checks">${more.check.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></section>` : ''}
        ${inside?.threads?.length ? `<section class="section"><h3>Threads to follow next <span>· you choose</span></h3><div class="threads">${inside.threads.map((t, i) =>
          `<button type="button" class="thread-btn" data-action="thread" data-id="${i}"><b>${esc(t.title)}</b>${t.why ? `<small>${esc(t.why)}</small>` : ''}</button>`).join('')}</div></section>` : ''}
        ${o.isSun ? '' : `<dl class="meters">${o.role ? '' : meter('Link', o.link)}${meter('Relevance', o.relevance)}</dl>`}
        ${links.length ? `<section class="section"><h3>${DATA.inside[trail[trail.length - 1]] ? 'Plausibly connected to' : 'Strongly linked to'}</h3><div class="chips">${links.map(([id]) =>
          `<button type="button" class="chip" data-action="open" data-id="${id}">${esc(DATA.topics[id].title)}</button>`).join('')}</div></section>` : ''}
        ${actions ? `<div class="actions">${actions}</div>` : ''}
        ${actionNote}`;
  // Re-rendering replaces the card's buttons; keep keyboard focus on the same one
  const focusedAction = el.contains(document.activeElement) && document.activeElement !== el ? document.activeElement.dataset?.action : null;
  el.innerHTML = `
    <button class="orb-close" type="button" data-action="close" aria-label="Close">&times;</button>
    <div class="inner">
      ${tag ? `<span class="tag">${tag}</span>` : ''}
      <span class="rel"></span>
      <span class="t"></span>
      <span class="l"></span>
      <div class="card-tabs" role="tablist" aria-label="What to show">
        <button type="button" class="card-tab" role="tab" data-action="tab" data-id="about" aria-selected="${tab === 'about'}">Overview</button>
        <button type="button" class="card-tab" role="tab" data-action="tab" data-id="sources" aria-selected="${tab === 'sources'}">Sources${sources.count ? ` · ${sources.count}` : ''}${sources.videos ? ` · ▶ ${sources.videos}` : ''}</button>
      </div>
      ${o.isSun ? '' : `<div class="verdict" role="group" aria-label="Is this relevant?">
        <p class="verdict-q">${o.verdict ? 'Marked. Change your mind any time.' : 'Is this relevant to what you’re looking for?'}</p>
        <div class="verdict-row">
          <button type="button" class="verdict-btn yes" data-action="tick" aria-pressed="${pressed('yes')}"><span aria-hidden="true">✓</span>Relevant</button>
          <button type="button" class="verdict-btn no" data-action="cross" aria-pressed="${pressed('no')}"><span aria-hidden="true">✕</span>Not relevant</button>
        </div>
      </div>`}
      <div class="more">${tab === 'sources' ? sources.html : overview}</div>
    </div>`;
  el.querySelector('.rel').textContent = relationText(o);
  el.querySelector('.t').textContent = topic.title;
  el.querySelector('.l').textContent = topic.liner;
  o.inner = el.querySelector('.inner');   // measured every frame to fit the card
  labelOrb(o);
  // The longest word sets a ceiling on text size, so long words never get cut off
  if (focusedAction) el.querySelector(`[data-action="${focusedAction}"]`)?.focus({ preventScroll: true });
  el.style.setProperty('--longest', Math.max(7, ...topic.title.split(/\s+/).map((w) => w.length)));
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
  makeThreads(line);
  return line;
}
function disposeLine(line) {
  world.remove(line);
  line.geometry.dispose();
  line.material.dispose();
  line.userData.weave?.mesh.material.dispose();
}

// ─── Woven threads: every line drawn as a few glowing strands ─
// A port of the WebThreads component from React Bits (reactbits.dev), turned
// from one full-screen weave into a small weave per line. Each line gets a
// flat strip facing the screen, and the shader draws 2 to 6 strands inside it
// that weave around the straight line and pinch together where it meets each
// orb. Stronger links get more strands and more light. As in the original,
// strands draw in one after another when a line appears, the strand under the
// mouse lights up while its neighbours recede, and a click on the map sends
// light along every thread. The plain line stays underneath, unseen, so line
// hover and tap still work the same way. Original notice:
//
//   MIT + Commons Clause License Condition v1.0. Copyright (c) 2026 David Haz.
//   Permission is hereby granted, free of charge, to any person obtaining a copy
//   of this software and associated documentation files (the "Software"), to deal
//   in the Software without restriction, including without limitation the rights
//   to use, copy, modify, merge, publish, and distribute the Software as part of
//   an application, website, or product, subject to the following conditions:
//   The above copyright notice and this permission notice shall be included in all
//   copies or substantial portions of the Software. Commons Clause: you may not
//   sell, sublicense, or redistribute the components themselves, whether alone, in
//   a bundle, or as a ported version. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT
//   WARRANTY OF ANY KIND. Full text: github.com/DavidHDev/react-bits/blob/main/LICENSE.md
const THREADS = TUNING.threads;
const MAX_STRANDS = 6;
const threadGeometry = new THREE.PlaneGeometry(1, 1);
// Shared by every line: one clock, one weave, one look
const threadUniforms = {
  uRes: { value: new THREE.Vector2(1, 1) },
  uPhase: { value: 0 },
  uClock: { value: 0 },
  uWaves: { value: (Math.PI * 2) / THREADS.wave },
  uTaper: { value: THREADS.taper },
  uWidth: { value: THREADS.width },
  uFalloff: { value: THREADS.falloff },
  uBrightness: { value: THREADS.brightness },
  uLight: { value: 0 },
  uCore: { value: new THREE.Color(1, 1, 1) },
  uPad: { value: THREADS.pad },
};
// Threads need WebGL2; without it (or if the shader won't build) lines stay plain
let threadsOk = renderer.capabilities.isWebGL2;
const threadsOn = () => threadsOk && view.threads;
renderer.debug.onShaderError = (gl, program, vs, fs) => {
  console.error('Celestial: a shader failed to build.', gl.getProgramInfoLog(program), gl.getShaderInfoLog(vs), gl.getShaderInfoLog(fs));
  if (gl.getShaderSource(fs)?.includes('uSurge')) { threadsOk = false; syncViewPanel(); }
};
let threadClock = 0;

const THREAD_VERTEX = /* glsl */`
  uniform vec3 uA, uB;
  uniform vec2 uRes;
  uniform float uHalf, uPad;
  varying vec2 vLocal;   // pixels along the line from end A, and across it
  varying float vLen;    // the line's length in pixels
  void main() {
    // Both ends on screen, then a strip around the line between them
    vec4 ca = projectionMatrix * modelViewMatrix * vec4(uA, 1.0);
    vec4 cb = projectionMatrix * modelViewMatrix * vec4(uB, 1.0);
    vec2 a = (ca.xy / ca.w * 0.5 + 0.5) * uRes;
    vec2 b = (cb.xy / cb.w * 0.5 + 0.5) * uRes;
    float len = max(length(b - a), 0.001);
    vec2 t = (b - a) / len, n = vec2(-t.y, t.x);
    float along = mix(-uPad, len + uPad, uv.x);
    float across = (uv.y * 2.0 - 1.0) * uHalf;
    vLocal = vec2(along, across);
    vLen = len;
    gl_Position = vec4((a + t * along + n * across) / uRes * 2.0 - 1.0, 0.0, 1.0);
  }`;
const THREAD_FRAGMENT = /* glsl */`
  #define MAX_STRANDS ${MAX_STRANDS}
  uniform float uCount, uPhase, uClock, uSpread, uWaves, uTaper, uWidth, uGlow, uFalloff;
  uniform float uBrightness, uOpacity, uLight, uLit, uFrom, uPad;
  uniform vec3 uColA, uColB, uCore;
  uniform vec4 uIntro;      // seconds since the line appeared, stagger, seconds per stroke, 1 while drawing in
  uniform vec3 uSurge;      // seconds since a click, direction (1: A to B, -1: B to A), 1 while travelling
  uniform float uFocus[MAX_STRANDS];
  uniform vec2 uFocusState; // how present the mouse is, how far the other strands recede
  varying vec2 vLocal;
  varying float vLen;
  const float PI = 3.14159265;
  const float TAU = 6.28318530;

  float easeInOut(float t) { return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) * 0.5; }

  // Strand i's height above the straight line at x (0 at end A, 1 at end B),
  // and its slope. The fan is widest mid-line and closes to a pinch at each end.
  vec2 strand(float x, float i, float n) {
    float env = uSpread * sin(PI * x);
    float dEnv = uSpread * PI * cos(PI * x) / vLen;
    float amp = (1.0 + i * uTaper) / (1.0 + (n - 1.0) * uTaper);
    float angle = x * vLen * uWaves - uPhase + i * TAU / n;
    return vec2(env * amp * sin(angle), amp * (dEnv * sin(angle) + env * cos(angle) * uWaves));
  }

  void main() {
    float x = clamp(vLocal.x / vLen, 0.0, 1.0);
    float beyond = vLocal.x - x * vLen;      // pixels past either end
    float travel = mix(x, 1.0 - x, uFrom);   // how far along, in the direction strands draw in
    // Nothing reaches this far from the bundle: skip the work
    if (abs(vLocal.y) > uSpread * sin(PI * x) + uPad || abs(beyond) > uPad) discard;
    float n = uCount;
    float presence = uFocusState.x;
    float settle = uFocusState.y;
    vec3 color = vec3(0.0);
    vec3 inkColor = vec3(0.0);
    float energy = 0.0;
    float ink = 0.0;

    for (int k = 0; k < MAX_STRANDS; k++) {
      float i = float(k);
      if (i >= n) break;
      float ci = n > 1.0 ? i / (n - 1.0) : 0.0;

      float head = 2.0;
      float bead = 0.0;
      if (uIntro.w > 0.5) {
        float progress = clamp((uIntro.x - i * uIntro.y) / uIntro.z, 0.0, 1.0);
        head = mix(-0.06, 1.06, easeInOut(progress));
        bead = sin(PI * progress);
        if (progress <= 0.0 || travel > head) continue;
      }

      vec2 s = strand(x, i, n);
      float d = length(vec2(beyond, (vLocal.y - s.x) / sqrt(1.0 + s.y * s.y)));
      float focus = uFocus[k];
      float width = uWidth * (1.0 + 0.4 * focus * presence + 0.3 * uLit);
      float g = uGlow * pow(width / max(d, 0.3), uFalloff);
      float onLine = exp(-d / width);

      // A soft light leads each strand as it draws in
      if (bead > 0.0) {
        float ahead = (travel - head) * vLen;
        g *= 1.0 + bead * 1.6 * exp(-(ahead * ahead + d * d) / 60.0);
      }
      // A click's light running along the strand
      if (uSurge.z > 0.5) {
        float p = clamp((uSurge.x - i * 0.05) / ${THREADS.surge.toFixed(2)}, 0.0, 1.0);
        if (p > 0.0 && p < 1.0) {
          float lead = uSurge.y > 0.0 ? mix(-0.12, 1.12, easeInOut(p)) : mix(1.12, -0.12, easeInOut(p));
          float along = (x - lead) * uSurge.y * vLen;
          float trail = along < 0.0 ? exp(along / 90.0) : exp(-along * along / 120.0);
          g *= 1.0 + trail * sin(PI * p) * (0.12 + 2.8 * onLine);
        }
      }
      // The strand under the mouse lifts, with a slow sheen; the rest recede
      float sheen = pow(0.5 + 0.5 * sin(x * vLen * 0.05 - uClock * 1.4), 10.0);
      float lift = focus * presence;
      g *= (1.0 - settle * (1.0 - focus)) * (1.0 + lift * (0.9 + 1.4 * sheen * onLine)) * (1.0 + 0.6 * uLit);
      g = min(g, 12.0);

      vec3 tint = mix(mix(uColA, uColB, ci), uCore, 0.3 * lift);
      color += g * tint;
      energy += g;
      float stroke = smoothstep(0.45, 1.3, g);
      inkColor += tint * stroke;
      ink += stroke;
    }

    if (uLight < 0.5) {
      // Dark themes: light, running hot where strands cross and pinch
      float core = smoothstep(0.5, 2.2, energy);
      color = mix(color, uCore * energy, core * 0.5) * uBrightness;
      float alpha = clamp(energy, 0.0, 1.0) * uOpacity;
      gl_FragColor = vec4(min(color * alpha, vec3(1.0)), alpha);
    } else {
      // Light themes: crisp ink strokes with a faint haze
      vec3 hue = ink > 0.0001 ? inkColor / ink : mix(uColA, uColB, 0.5);
      float body = clamp(ink, 0.0, 1.0);
      float haze = clamp(1.0 - exp(-energy * 0.3), 0.0, 1.0) * 0.12;
      float cover = clamp(body * 0.9 + haze * (1.0 - body), 0.0, 0.95) * uOpacity;
      gl_FragColor = vec4(hue * cover, cover);
    }
  }`;

function makeThreads(line) {
  const u = {
    ...threadUniforms,
    uA: { value: new THREE.Vector3() },
    uB: { value: new THREE.Vector3() },
    uHalf: { value: 1 },
    uSpread: { value: 1 },
    uCount: { value: 2 },
    uGlow: { value: THREADS.glow },
    uOpacity: { value: 0 },
    uLit: { value: 0 },
    uFrom: { value: 0 },
    uColA: { value: new THREE.Color() },
    uColB: { value: new THREE.Color() },
    uIntro: { value: new THREE.Vector4() },
    uSurge: { value: new THREE.Vector3() },
    uFocus: { value: new Float32Array(MAX_STRANDS) },
    uFocusState: { value: new THREE.Vector2() },
  };
  const mesh = new THREE.Mesh(threadGeometry, new THREE.ShaderMaterial({
    uniforms: u,
    vertexShader: THREAD_VERTEX,
    fragmentShader: THREAD_FRAGMENT,
    transparent: true,
    premultipliedAlpha: true,   // the shader hands back light already multiplied by its cover
    depthTest: false,
    depthWrite: false,
  }));
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;   // under the streams
  mesh.visible = false;
  line.add(mesh);
  line.userData.weave = { mesh, u, born: -1, hiddenFor: 0, focus: u.uFocus.value, presence: 0, settle: 0, lit: 0, surge: null, spread: 0, count: 2 };
}

// Lines drawn as threads this frame, for the mouse and clicks to find
let woven = [];
const threadTint = new THREE.Color();

// Draw one line as threads (call after setLine). show: whether the line is
// on screen; opacity: how strong it is drawn; link: 0–1, sets the strands;
// colA and colB: colours across the strands; fromB: strands draw in from end B
function weave(line, show, dt, opacity = 0, link = 0, colA = null, colB = null, fromB = false) {
  const w = line.userData.weave;
  line.material.visible = !threadsOn();   // the plain line steps aside but still answers hover
  if (!w) return;
  if (!(show && threadsOn())) {
    w.mesh.visible = false;
    // Hidden for a moment: draw in again when it comes back
    if ((w.hiddenFor += dt) > 0.4) w.born = -1;
    return;
  }
  w.hiddenFor = 0;
  if (w.born < 0) w.born = threadClock;
  const { a, b, p1, p2 } = line.userData;
  const u = w.u;
  u.uA.value.copy(a);
  u.uB.value.copy(b);
  w.len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  w.spread = clamp(w.len * THREADS.spread, THREADS.minSpread, THREADS.maxSpread);
  w.count = Math.round(lerp(THREADS.fewest, THREADS.most, clamp(link, 0, 1)));
  u.uSpread.value = w.spread;
  u.uHalf.value = w.spread + THREADS.pad;
  u.uCount.value = w.count;
  u.uGlow.value = THREADS.glow * (0.6 + 0.4 * link);   // stronger links shine brighter
  u.uOpacity.value = clamp(opacity * THREADS.boost, 0, 1);
  u.uColA.value.copy(colA);
  u.uColB.value.copy(colB);
  u.uFrom.value = fromB ? 1 : 0;
  const since = threadClock - w.born;
  const drawing = !reduceMotion && since < (w.count - 1) * THREADS.stagger + THREADS.stroke;
  u.uIntro.value.set(since, THREADS.stagger, THREADS.stroke, drawing ? 1 : 0);
  if (w.surge && threadClock - w.surge.at > THREADS.surge + (w.count - 1) * 0.05) w.surge = null;
  u.uSurge.value.set(w.surge ? threadClock - w.surge.at : 0, w.surge?.dir || 1, w.surge ? 1 : 0);
  w.mesh.visible = true;
  woven.push(w);
}
// A strand's height above its line, in pixels: the same sum as in the shader
function strandOffset(w, x, i) {
  const n = w.count;
  const amp = (1 + i * THREADS.taper) / (1 + (n - 1) * THREADS.taper);
  const angle = x * w.len * threadUniforms.uWaves.value - threadUniforms.uPhase.value + (i * Math.PI * 2) / n;
  return w.spread * Math.sin(Math.PI * x) * amp * Math.sin(angle);
}
// The strand nearest the mouse lights up while the others on its line
// recede; the line being explained in Progressive mode glows
let threadPointer = null;   // the mouse over the map (not touch, not an orb)
let litLine = null;
let focusTarget = null, focusStrand = -1;
function focusThreads(dt) {
  let target = null, strand = -1, best = Infinity;
  const p = threadPointer && !hovered && !busy ? threadPointer : null;
  if (p) {
    const h = screenSize.h, py = h - p.y;   // the shader counts pixels upward
    for (const w of woven) {
      const { p1, p2 } = w.mesh.parent.userData;
      const ax = p1.x, ay = h - p1.y, len = Math.max(w.len, 1);
      const tx = (p2.x - p1.x) / len, ty = -(p2.y - p1.y) / len;
      const along = (p.x - ax) * tx + (py - ay) * ty;
      const across = -(p.x - ax) * ty + (py - ay) * tx;
      if (along < 0 || along > len || Math.abs(across) > w.spread + 10) continue;
      for (let i = 0; i < w.count; i++) {
        const d = Math.abs(across - strandOffset(w, along / len, i));
        const reach = w === focusTarget && i === focusStrand ? 9 : 7;   // a little sticky
        if (d < reach && d < best) { best = d; target = w; strand = i; }
      }
    }
  }
  focusTarget = target;
  focusStrand = strand;
  const ease = 1 - Math.exp(-dt / 0.22), slow = 1 - Math.exp(-dt / 0.3);
  for (const w of woven) {
    let strongest = 0;
    for (let i = 0; i < MAX_STRANDS; i++) {
      w.focus[i] += ((w === target && i === strand ? 1 : 0) - w.focus[i]) * ease;
      strongest = Math.max(strongest, w.focus[i]);
    }
    w.presence += ((w === target ? 1 : 0) - w.presence) * slow;
    w.settle += (0.5 * 0.65 * strongest * w.presence - w.settle) * slow;
    w.lit += ((w.mesh.parent === litLine ? 1 : 0) - w.lit) * slow;
    w.u.uFocusState.value.set(w.presence * 0.7, w.settle);
    w.u.uLit.value = w.lit;
  }
}
// A click on the map sends light along every thread, from the end nearer the click
function surgeThreads(x, y) {
  if (!threadsOn() || reduceMotion) return;
  for (const w of woven) {
    const { p1, p2 } = w.mesh.parent.userData;
    w.surge = { at: threadClock, dir: Math.hypot(x - p1.x, y - p1.y) <= Math.hypot(x - p2.x, y - p2.y) ? 1 : -1 };
  }
}

function setLine(line, a, b) {
  const p = line.geometry.attributes.position;
  p.setXYZ(0, a.x, a.y, a.z);
  p.setXYZ(1, b.x, b.y, b.z);
  p.needsUpdate = true;
  // Kept so Reasoning mode can find the line under the mouse and light it up
  const u = line.userData;
  (u.a ||= new THREE.Vector3()).copy(a);
  (u.b ||= new THREE.Vector3()).copy(b);
  u.p1 = toScreen(a, u.p1);
  u.p2 = toScreen(b, u.p2);
}
// A point inside the 3D world, in pixels on screen
const screenScratch = new THREE.Vector3();
function toScreen(v, out = {}) {
  screenScratch.copy(v);
  world.localToWorld(screenScratch).project(camera);
  out.x = (screenScratch.x + 1) / 2 * screenSize.w;
  out.y = (1 - screenScratch.y) / 2 * screenSize.h;
  return out;
}
const screenSize = { w: 1, h: 1 };   // the stage in pixels, kept by resize()

function makeOrb(spec) {
  const o = {
    id: spec.to,
    rel: spec.rel || null,
    link: spec.link ?? 1,
    relevance: spec.relevance ?? 1,
    isSun: Boolean(spec.isSun),
    cameFrom: spec.cameFrom,
    role: spec.role || null,       // inside a deep map: 'sub' (a sub-system) or 'part'
    parent: spec.parent || null,   // a part's sub-system
    target: spec.target || new THREE.Vector3(),
    start: new THREE.Vector3(),
    grow: 0,
    k: 0,          // 0 → 1 as the orb opens into a preview card on hover
    f: 0,          // 0 → 1 as the orb opens fully on click
    surface: 1,    // the orb's radius in scene units, worked out each frame
    phase: Math.random() * 10,   // so each orb's shape drifts differently
    exit: 0,       // 0 → 1 as the orb drifts away when you leave its system
    nx: 0, ny: 0,  // a gentle nudge that keeps an opened card on screen
    reveal: view.reasoning && !spec.isSun ? 0 : 1,   // 0 → 1 as Reasoning mode reaches this orb's step
  };
  o.verdict = spec.verdict || null;
  o.lead = !o.isSun && !o.verdict && isHiddenLead(o);
  o.radius = o.isSun ? TUNING.sunSize : radiusFor(o.relevance);
  o.el = makeOrbElement(o);
  o.obj = new CSS2DObject(o.el);
  world.add(o.obj);
  attachLinks(o);
  paintOrb(o);
  return o;
}

// A line to the sun (faint for causes and effects, brighter on hover)
// and, for causes and effects, the streams. They fade in gently.
function attachLinks(o) {
  dropLinks(o);
  o.linkIn = 0;
  o.flow = 0;
  if (!o.isSun) o.line = makeLine();
  if (o.rel === 'cause' || o.rel === 'effect') {
    o.pulse = makePulse(o);
    o.pulseLength = lerp(TUNING.pulses.shortest, TUNING.pulses.longest, o.link);
    o.pulseEvery = lerp(TUNING.pulses.slowest, TUNING.pulses.fastest, o.relevance);
    o.pulseOffset = Math.random() * o.pulseEvery;
  }
}
function dropLinks(o) {
  if (o.line) { disposeLine(o.line); o.line = null; }
  for (const s of o.pulse || []) { world.remove(s); s.material.dispose(); streakMaterials.delete(s.material); }
  o.pulse = null;
}

// An orb that stays on screen but takes a new role in the next system
// (the orb you expand becomes the sun; the old sun becomes a planet)
function reshape(o, spec) {
  Object.assign(o, {
    rel: spec.rel || null,
    link: spec.link ?? 1,
    relevance: spec.relevance ?? 1,
    isSun: Boolean(spec.isSun),
    cameFrom: spec.cameFrom,
    role: spec.role || null,
    parent: spec.parent || null,
    target: spec.target || new THREE.Vector3(),
    verdict: spec.verdict || null,
    kept: true,
  });
  o.lead = !o.isSun && !o.verdict && isHiddenLead(o);
  o.radius = o.isSun ? TUNING.sunSize : radiusFor(o.relevance);
  orbClasses(o);
  fillOrb(o);
  attachLinks(o);
  paintOrb(o);
}

// New link and relevance after a mark: size, glow, rank and streams follow
function applySpec(o, spec) {
  const was = o.verdict;
  o.link = spec.link;
  o.relevance = spec.relevance;
  o.verdict = spec.verdict || null;
  o.lead = !o.verdict && isHiddenLead(o);
  o.radius = radiusFor(o.relevance);
  if (o.pulse) {
    o.pulseLength = lerp(TUNING.pulses.shortest, TUNING.pulses.longest, o.link);
    o.pulseEvery = lerp(TUNING.pulses.slowest, TUNING.pulses.fastest, o.relevance);
  }
  orbClasses(o);
  if (was !== o.verdict) fillOrb(o);
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
  dropLinks(o);
}

// Orbs that aren't part of the next system drift outward and fade.
// shift: how the view is re-centring, so they travel with it
let leaving = [];
function retire(o, shift) {
  if (hovered === o) setHover(null);
  o.leaving = true;
  o.el.classList.add('is-leaving');
  o.el.tabIndex = -1;
  leaving.push(o);
  const from = o.obj.position.clone();
  const to = from.clone().add(shift).multiplyScalar(TUNING.expand.drift);
  const grew = o.grow;
  tween(TUNING.expand.leave, (t) => {
    o.exit = t;
    o.grow = grew;
    o.obj.position.lerpVectors(from, to, t);
  }, () => { removeOrb(o); leaving = leaving.filter((x) => x !== o); }, { ease: easeInOut, owner: o });
}

let fadingLines = [];
function retireLine(c) {
  fadingLines.push(c);
  const from = c.life ?? 1;
  tween(TUNING.expand.leave * 0.6, (t) => { c.life = from * (1 - t); }, () => {
    disposeLine(c.line);
    fadingLines = fadingLines.filter((x) => x !== c);
  }, { ease: easeInOut, owner: c });
}

// ─── Showing a system ────────────────────────────────────────
// One continuous movement from whatever is on screen to the new system:
// - orbs in both systems stay and glide to their new places (the orb you
//   expanded glides into the centre and becomes the sun)
// - orbs not in the new system drift outward and fade
// - new orbs ease out from the centre in a wave, most relevant first
// - the camera glides to frame it all
// Resolves once the movement has settled.
function showSystem(sunId) {
  const E = TUNING.expand;
  const old = new Map(orbs.map((o) => [o.id, o]));
  const chosen = old.get(sunId);
  // The view re-centres on the chosen orb, so everything leaving travels with it
  const shift = chosen && !chosen.isSun ? chosen.obj.position.clone().negate() : new THREE.Vector3();
  setHover(null);
  for (const c of crossLines) retireLine(c);

  const previous = trail.length > 1 ? trail[trail.length - 2] : null;
  const specs = [{ to: sunId, isSun: true },
    ...layout(adjustedSystem(sunId)).map((spec) => ({ ...spec, cameFrom: spec.to === previous }))];
  orbs = specs.map((spec) => {
    const o = old.get(spec.to);
    if (!o) return makeOrb(spec);
    old.delete(spec.to);
    reshape(o, spec);
    return o;
  });
  for (const o of old.values()) retire(o, shift);
  // Lines run to the centre, or inside a deep map from each part to its sub-system
  const hubs = new Map(orbs.map((o) => [o.id, o]));
  for (const o of orbs) o.hub = o.isSun ? null : (o.parent && hubs.get(o.parent)) || orbs[0];
  renderThreads();
  updateDimming();

  // Faint lines between orbiting topics that are strongly linked to each other
  const byId = new Map(orbs.slice(1).map((o) => [o.id, o]));
  crossLines = (DATA.crossLinks?.[sunId] || [])
    .filter(([a, b, s]) => byId.has(a) && byId.has(b) && s >= TUNING.crossLinkMin)
    .map(([a, b, strength]) => {
      const line = makeLine();
      line.material.color.copy(palette.line);
      const c = { a: byId.get(a), b: byId.get(b), strength, line, life: 0 };
      tween(E.arrive, (t) => { c.life = t; }, null, { ease: easeInOut, delay: E.move * 0.5, owner: c });
      return c;
    });
  fitCamera();
  if (!chosen?.isSun && !view.reasoning) S?.centre();

  const fresh = orbs.filter((o) => !o.kept && !o.isSun).sort((x, y) => y.relevance - x.relevance);
  let settled = E.move;
  for (const o of orbs) {
    const from = o.obj.position.clone(), grew = o.grow;
    if (o.kept) {
      tween(E.move, (t) => {
        o.grow = lerp(grew, 1, t);
        o.obj.position.lerpVectors(from, o.target, t);
      }, null, { ease: easeInOut, owner: o });
    } else {
      // New orbs start at the centre, so they seem to come out of the sun
      const delay = o.isSun ? 0 : E.move * 0.3 + fresh.indexOf(o) * E.stagger;
      o.obj.position.set(0, 0, 0);
      tween(o.isSun ? E.move * 0.7 : E.arrive, (t) => {
        o.grow = t;
        o.obj.position.lerpVectors(from.set(0, 0, 0), o.target, t);
      }, null, { ease: easeOut, delay, owner: o });
      settled = Math.max(settled, delay + E.arrive);
      if (!o.isSun && !view.reasoning) S?.orb(o, delay + E.arrive * 0.25);
    }
  }
  renderTrail();
  if (view.reasoning) startTrace();
  return wait(settled * 0.8);
}

// Re-place the current orbs after a spacing or size change
function relayout(ms = 800) {
  if (!orbs.length || busy) return;
  const placed = layout(adjustedSystem(orbs[0].id));
  for (const o of orbs.slice(1)) {
    const p = placed.find((q) => q.to === o.id);
    if (!p) continue;
    o.target = p.target;
    applySpec(o, p);
  }
  for (const o of orbs) {
    const from = o.obj.position.clone();
    tween(ms, (t) => o.obj.position.lerpVectors(from, o.target, t), null, { ease: easeInOut, owner: o });
  }
  fitCamera();
}

// Make an orb the new centre of the view
async function expand(id) {
  if (busy || !canExpand(id)) return;
  const before = trail;
  const at = trail.indexOf(id);
  trail = at >= 0 ? trail.slice(0, at + 1) : [...trail, id];
  closeFocus();
  const chosen = orbs.find((o) => o.id === id);
  // If you expand a cause, the old centre becomes its effect (and vice versa)
  const back = { cause: 'effect', effect: 'cause', related: 'related' }[chosen?.rel] || 'related';
  busy = true;
  if (!DATA.systems[id]) {
    // Not mapped yet: glide to the new centre, and let orbs arrive as Claude maps it
    const moved = showSystem(id);
    const ok = await mapLive(id, at >= 0 ? null : before[before.length - 1], back);
    await moved;
    if (!ok) { trail = before; await showSystem(trail[trail.length - 1]); busy = false; return; }
    await showSystem(id);
    busy = false;
    saveSession();
    return;
  }
  await showSystem(id);
  busy = false;
  saveSession();
}

// Ask Claude for the system around a topic and store it like the example data.
// Two requests run side by side: a fast streamed sketch (Haiku) whose orbs
// appear one by one, and the full map, which then refines what's on screen.
async function mapLive(centreId, cameFromId = null, cameFromRel = 'related') {
  const topic = DATA.topics[centreId];
  const fresh = !trail.slice(0, -1).length;
  pending.add(centreId);
  setStatus(`Sketching “${topic.title}”… then mapping it in depth with ${whoAnswers()}`);
  const args = {
    backend: backend(),
    tier: view.tier,
    key: apiKey,
    model: view.model,
    centre: topic.title,
    mode: session.mode,
    path: trail.slice(0, -1).map((id) => DATA.topics[id].title),
    cameFrom: cameFromId ? DATA.topics[cameFromId].title : '',
    feedback: feedbackTitles(),
    reasons: view.reasoning,   // Claude writes the reasoning behind each line only in Progressive mode
  };
  let fullDone = false, sketched = 0;
  trace.live = view.reasoning;
  DATA.reasons[centreId] = view.reasoning ? {} : { _off: true };
  if (cameFromId) {
    DATA.reasons[centreId][cameFromId] = cameFromReason(centreId, cameFromId, cameFromRel);
    addQuickOrb(centreId, { to: cameFromId, rel: cameFromRel, link: 0.9, relevance: 1 });
  }
  const quick = R.quickMap({
    ...args,
    onCentre: (c) => {
      if (fullDone || !fresh || !c.title) return;
      DATA.topics[centreId] = { title: c.title, liner: c.liner || '' };
      refill(centreId);
      renderTrail();
    },
    onOrb: (orb) => {
      if (fullDone) return;
      const id = topicId(orb.title);
      if (id === centreId || id === cameFromId || verdicts[id] === 'no') return;
      if (!DATA.topics[id] || liveIds.has(id)) DATA.topics[id] = { title: orb.title, liner: orb.liner };
      liveIds.add(id);
      if (orb.why) (DATA.reasons[centreId] ||= {})[id] = { why: orb.why, from: 'Quick first pass, before the full map', tier: 6 };
      if (addQuickOrb(centreId, { to: id, rel: orb.rel, link: orb.link, relevance: orb.relevance })) sketched++;
    },
  }).catch(() => null);   // the sketch is a bonus; the full map decides
  try {
    const out = await R.map(args);
    fullDone = true;
    storeMap(centreId, out, cameFromId, cameFromRel);
    setStatus('');
    saveCache();
    return true;
  } catch (err) {
    fullDone = true;
    await quick;
    if (sketched >= 4) {
      // Keep the quick sketch rather than losing everything
      liveIds.add(centreId);
      saveCache();
      setStatus('Showing the quick sketch. ' + R.explain(err), 'error');
      return true;
    }
    setStatus(R.explain(err), 'error');
    return false;
  } finally {
    pending.delete(centreId);
    trace.live = false;
    renderTrace();
    updateSpend();
  }
}

// The orb you came from stays on the new map; say so in its reasoning
function cameFromReason(centreId, cameFromId, rel) {
  const centre = DATA.topics[centreId].title, came = DATA.topics[cameFromId].title;
  const role = { cause: 'one of its causes', effect: 'one of its effects', related: 'a related topic' }[rel] || 'a related topic';
  return { why: `You opened “${centre}” from “${came}”, so “${came}” stays on the map. Seen from this side it becomes ${role}.`, from: 'Your path through the map', tier: null };
}

const slug = (t) => t.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'topic';
// In the demo, a preloaded map that names an example topic lands on that same orb
const topicId = (title) => (demo() && DEMO.idFor(title)) || slug(title);

function storeMap(centreId, out, cameFromId, cameFromRel) {
  if (!trail.slice(0, -1).length) {
    // A fresh search: use Claude's tidier name for the centre
    DATA.topics[centreId] = { title: out.centre.title || DATA.topics[centreId].title, liner: out.centre.liner || '' };
  }
  liveIds.add(centreId);
  const byTitle = new Map();
  const seen = new Set([centreId]);
  const system = [];
  const reasons = DATA.reasons[centreId] = { _centre: out.centre.reading || '', ...(DATA.reasons[centreId]?._off ? { _off: true } : {}) };
  const reason = (r) => ({ why: r.why, from: r.basis, tier: r.tier });
  if (cameFromId) {
    system.push({ to: cameFromId, rel: cameFromRel, link: 0.9, relevance: 1 });
    seen.add(cameFromId);
    byTitle.set(DATA.topics[cameFromId].title.toLowerCase(), cameFromId);
    reasons[cameFromId] = cameFromReason(centreId, cameFromId, cameFromRel);
  }
  for (const orb of out.orbs.slice(0, 20)) {
    const known = byTitle.get(orb.title.toLowerCase());
    if (known) continue;   // e.g. Claude's copy of the "came from" topic
    const id = topicId(orb.title);
    if (seen.has(id) || verdicts[id] === 'no') continue;   // you ruled it out already
    seen.add(id);
    byTitle.set(orb.title.toLowerCase(), id);
    if (!DATA.topics[id] || liveIds.has(id)) DATA.topics[id] = { title: orb.title, liner: orb.liner };
    liveIds.add(id);
    system.push({ to: id, rel: orb.rel, link: orb.link, relevance: orb.relevance });
    if (orb.why) reasons[id] = reason(orb);
  }
  DATA.systems[centreId] = system;
  DATA.crossLinks[centreId] = out.links
    .map((l) => [byTitle.get(l.a.toLowerCase()), byTitle.get(l.b.toLowerCase()), l.strength, l])
    .filter(([a, b]) => a && b && a !== b)
    .map(([a, b, strength, l]) => {
      if (l.why) reasons[`${a}~${b}`] = reason(l);
      return [a, b, strength];
    });
}

// ─── Go deeper: open a topic up into its sub-systems ─────────
// Expand moves sideways (a topic's neighbours). Go deeper moves inwards: a
// deeper research pass splits the topic into sub-systems, the parts of each
// and plausible connections between parts, and suggests threads to follow.
// The result is its own map, "Inside <topic>", reached through the path at
// the top like any other, and remembered with the rest of the research.
const insideId = (id) => 'in:' + id;
const canGoDeeper = (id) => !DATA.topics[id]?.inside
  && Boolean(DATA.systems[insideId(id)] || DATA.deep[id] || (live() && (!demo() || DEMO.hasDeep(DATA.topics[id]?.title))));

async function goDeeper(id) {
  if (busy || !canGoDeeper(id)) return;
  const deepId = insideId(id);
  // The built-in example can be opened without Claude
  if (!DATA.systems[deepId] && DATA.deep[id]) storeDeep(deepId, id, R.tidyDeep(DATA.deep[id], { example: true }), false);
  const before = trail;
  const at = trail.indexOf(deepId);
  trail = at >= 0 ? trail.slice(0, at + 1) : [...trail, deepId];
  // The new centre needs a name before the open card closes (closing relabels every orb)
  if (!DATA.systems[deepId]) DATA.topics[deepId] ||= { title: DATA.topics[id].title, liner: 'Looking inside…', inside: id };
  closeFocus();
  busy = true;
  // The orb you chose glides into the centre and becomes the inside view's sun
  const chosen = orbs.find((o) => o.id === id);
  if (chosen && !DATA.systems[deepId]) DATA.topics[deepId] = { title: DATA.topics[id].title, liner: 'Looking inside…', inside: id };
  if (chosen && DATA.topics[deepId]) chosen.id = deepId;
  if (!DATA.systems[deepId]) {
    DATA.topics[deepId] ||= { title: DATA.topics[id].title, liner: 'Looking inside…', inside: id };
    const moved = showSystem(deepId);
    const ok = await researchDeep(deepId, id);
    await moved;
    if (!ok) {
      trail = before;
      delete DATA.topics[deepId];
      if (chosen) chosen.id = id;
      await showSystem(trail[trail.length - 1]);
      busy = false;
      return;
    }
  }
  await showSystem(deepId);
  busy = false;
  saveSession();
}

async function researchDeep(deepId, ofId) {
  const topic = DATA.topics[ofId];
  pending.add(deepId);
  const web = !planReady && !demo() && view.webSearch;
  setStatus(`Looking inside “${topic.title}” with ${whoAnswers()}${web ? ' and the web' : ''}. A deeper pass takes a minute or two…`);
  try {
    const out = await R.deep({
      backend: backend(),
      tier: view.tier,
      key: apiKey,
      model: view.model,
      topic: topic.title,
      liner: topic.liner,
      mode: session.mode,
      path: trail.slice(0, -1).map((t) => DATA.topics[t].title),
      webSearch: web,
      feedback: feedbackTitles(),
    });
    storeDeep(deepId, ofId, out, true);
    setStatus('');
    saveCache();
    return true;
  } catch (err) {
    setStatus(R.explain(err), 'error');
    return false;
  } finally {
    pending.delete(deepId);
    updateSpend();
  }
}

// Store a deep pass like any other system: sub-systems orbit the centre,
// parts orbit their sub-system, plausible connections become cross-links
function storeDeep(deepId, ofId, out, isLive) {
  const of = DATA.topics[ofId];
  const subs = out.subsystems;
  DATA.topics[deepId] = { title: of.title, liner: out.centre.liner || of.liner, inside: ofId };
  const reasons = DATA.reasons[deepId] = { _centre: out.centre.reading || '' };
  const reason = (x) => ({ why: x.why, from: x.basis, tier: x.tier });
  const used = new Set([deepId, ofId]);
  const idFor = (title) => {
    let id = slug(title), n = 2;
    while (used.has(id)) id = `${slug(title)}-${n++}`;
    used.add(id);
    return id;
  };
  const put = (id, x) => {
    if (!DATA.topics[id] || liveIds.has(id) || !isLive) DATA.topics[id] = { title: x.title, liner: x.liner };
    if (isLive) liveIds.add(id);
  };
  const system = [], cites = {}, byTitle = new Map();
  for (const sub of subs) {
    const sid = idFor(sub.title);
    put(sid, sub);
    const top = Math.max(...sub.parts.map((p) => p.relevance));
    system.push({ to: sid, rel: 'related', role: 'sub', link: 0.6, relevance: clamp(0.55 + top * 0.45, 0, 1) });
    reasons[sid] = reason(sub);
    cites[sid] = sub.cite;
    for (const part of sub.parts) {
      const pid = idFor(part.title);
      put(pid, part);
      byTitle.set(part.title.toLowerCase(), pid);
      system.push({ to: pid, rel: 'related', role: 'part', parent: sid, link: 0.8, relevance: part.relevance });
      reasons[pid] = reason(part);
      cites[pid] = part.cite;
    }
  }
  DATA.systems[deepId] = system;
  DATA.crossLinks[deepId] = out.connections
    .map((c) => [byTitle.get(c.a.toLowerCase()), byTitle.get(c.b.toLowerCase()), c])
    .filter(([a, b]) => a && b && a !== b)
    .map(([a, b, c]) => {
      // Shown in Reasoning mode and on the line cards; strength follows confidence
      reasons[`${a}~${b}`] = { why: `${DATA.topics[a].title} ${c.kind} ${DATA.topics[b].title}. ${c.why}`, from: `${c.basis} · ${c.confidence >= 0.7 ? 'likely' : c.confidence >= 0.5 ? 'plausible' : 'speculative'}`, tier: c.tier };
      cites[`${a}~${b}`] = c.cite;
      return [a, b, TUNING.crossLinkMin + (1 - TUNING.crossLinkMin) * c.confidence];
    });
  DATA.inside[deepId] = { of: ofId, threads: out.threads, sources: out.sources, cites, live: isLive };
  DATA.details[deepId] = {
    about: `Inside ${of.title}: ${subs.length} sub-systems (${subs.map((x) => x.title).join(', ')}), ${system.length - subs.length} parts and ${DATA.crossLinks[deepId].length} plausible connections between them.`,
    sources: out.sources,
    live: isLive,
  };
  if (isLive) liveIds.add(deepId);
}

// Pick a thread: it becomes the next deeper pass, one level further in
function followThread(i) {
  const sunId = trail[trail.length - 1];
  const t = DATA.inside[sunId]?.threads?.[i];
  if (!t || busy) return;
  if (!live()) { toast(inViewer ? 'Following a thread needs Claude. Sign in to claude.ai and allow it for this page.' : 'Following a thread needs Claude. Add your API key in Settings.'); return; }
  if (demo() && !DEMO.hasDeep(t.title)) { toast(DEMO_END); return; }
  const id = 't-' + slug(t.title);
  if (!DATA.topics[id]) DATA.topics[id] = { title: t.title, liner: t.question };
  liveIds.add(id);
  goDeeper(id);
}

// The threads bar under the path, while you're inside a deep map
function renderThreads() {
  const bar = $('threads');
  const sunId = trail[trail.length - 1];
  const threads = DATA.inside[sunId]?.threads || [];
  bar.replaceChildren();
  if (!threads.length) return;
  const label = document.createElement('span');
  label.className = 'threads-label';
  label.textContent = 'Follow a thread';
  bar.append(label);
  threads.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = t.title;
    b.title = t.question + (t.why ? '\n' + t.why : '');
    b.addEventListener('click', () => followThread(i));
    bar.append(b);
  });
}

// Start a new investigation from the prompt line
const DIAGNOSE_CUES = /^(why|how come|what causes|what's causing|what is causing)\b|\b(problem|issue|fail|failing|failure|broken|keeps|won't|doesn't|not working|declin|drop|dropping|slow|leak|crack|warp|error|wrong)\b/i;
function modeFor(q) {
  if (view.reading !== 'auto') return view.reading;
  return DIAGNOSE_CUES.test(q) ? 'diagnose' : 'explore';
}

async function explore(query) {
  if (demo()) {
    // The demo only has research for the example question
    setViewPanel(true);
    showViewTab('Research');
    $('api-key').focus();
    toast('The demo runs on preloaded research for the example question. Add your Claude API key here to ask your own.');
    return;
  }
  if (!live()) {
    setViewPanel(true);
    showViewTab('Research');
    if (!inViewer) $('api-key').focus();
    if (inViewer) {
      // Ask claude.ai once more before giving up
      if (await R.planAvailable(true)) { planReady = true; updateLiveState(); return explore(query); }
      toast(planBlocked === 'denied' ? 'Claude is switched off for this page. Use “Allow Claude” in Settings.' : 'Claude isn’t available to this page here. See Settings for what to try.');
    } else {
      toast('Add your Claude API key here to explore your own questions.');
    }
    return;
  }
  if (busy) return;
  busy = true;
  closeFocus();
  session.mode = modeFor(query);
  const id = 'q-' + slug(query);
  // A new question starts with no marks (the old ones come back if mapping fails)
  const kept = { verdicts, verdictOrder, findings: { ...findings } };
  verdicts = {}; verdictOrder = [];
  Object.assign(findings, { shown: false, claude: null, sig: '', loading: false, error: '' });
  renderFindings();
  DATA.topics[id] = { title: query, liner: session.mode === 'explore' ? 'Mapping the subject…' : 'Tracing causes and effects…' };
  const before = trail;
  trail = [id];
  delete DATA.systems[id];
  showSystem(id);
  const ok = await mapLive(id);
  busy = false;
  if (!ok) {
    delete DATA.topics[id]; trail = before;
    ({ verdicts, verdictOrder } = kept); Object.assign(findings, kept.findings);
    showSystem(trail[trail.length - 1]); renderFindings();
    return;
  }
  await showSystem(id);
  saveSession();
  saveFeedback();
  saveFindings();
}

// Research an opened orb: explanation, sources, picture
async function loadDetails(o) {
  const id = o.id;
  if (!live() || detailsLoading.has(id)) return;
  if (demo() && !DEMO.hasDetails(DATA.topics[id].title)) return;
  const known = DATA.details[id];
  if (known && !known.error) return;
  detailsLoading.add(id);
  DATA.details[id] = { live: true, loading: true, preview: '' };
  refill(id);
  const centreId = trail[trail.length - 1];
  // A quick take from Haiku to read while the full research runs
  R.quickAbout({
    backend: backend(),
    key: apiKey,
    topic: DATA.topics[id].title,
    liner: DATA.topics[id].liner,
    centre: DATA.topics[centreId].title,
    mode: session.mode,
    onText: (text) => {
      const d = DATA.details[id];
      if (!d?.loading) return;
      d.preview = text;
      for (const x of orbs) if (x.id === id) { const p = x.el.querySelector('.preview-text'); if (p) p.textContent = text; }
    },
  }).catch(() => {});
  try {
    const d = await R.details({
      backend: backend(),
      tier: view.tier,
      key: apiKey,
      model: view.model,
      topic: DATA.topics[id].title,
      liner: DATA.topics[id].liner,
      centre: DATA.topics[centreId].title,
      rel: o.isSun ? null : o.rel,
      mode: session.mode,
      path: trail.map((t) => DATA.topics[t].title),
      webSearch: view.webSearch,
      feedback: feedbackTitles(),
    });
    DATA.details[id] = { ...d, live: true };
    liveIds.add(id);
    refill(id);
    // Pictures come from Wikipedia, which only your own site can reach
    const image = backend() !== 'plan' ? await R.wikipediaImage(d.wikipedia) : null;
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
  if (demo()) return;   // preloaded answers replay fresh on every visit
  const pick = (table) => Object.fromEntries([...liveIds].filter((id) => table[id] && !table[id].loading).map((id) => [id, table[id]]));
  try {
    localStorage.setItem(CACHE_STORE, JSON.stringify({
      topics: pick(DATA.topics), systems: pick(DATA.systems), crossLinks: pick(DATA.crossLinks), reasons: pick(DATA.reasons), inside: pick(DATA.inside),
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
    if (c) for (const table of ['topics', 'systems', 'crossLinks', 'reasons', 'details', 'inside']) {
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

// ─── Findings: the running answer, built from your ticks ─────
// Appears the first time you tick an orb and updates on every mark.
// Its name follows the kind of question: a problem gets a Diagnosis,
// a topic gets a Synthesis. Without Claude it's assembled from the
// example notes; with Claude, a short written answer is added on top.
const FINDINGS_STORE = 'celestial.findings';
const findings = { shown: false, collapsed: false, claude: null, sig: '', loading: false, error: '' };
function loadFindings() {
  try {
    const f = JSON.parse(localStorage.getItem(FINDINGS_STORE) || 'null');
    if (f && f.root === trail[0]) Object.assign(findings, f, { loading: false, error: '' });
  } catch { /* ignore */ }
}
const saveFindings = () => { try { localStorage.setItem(FINDINGS_STORE, JSON.stringify({ root: trail[0], shown: findings.shown, collapsed: findings.collapsed, claude: findings.claude, sig: findings.sig })); } catch { /* ignore */ } };
const findingsName = () => (session.mode === 'explore' ? 'Synthesis' : 'Diagnosis');
const feedbackSig = () => JSON.stringify([trail[0], marked('yes'), marked('no')]);
let findingsTimer = null, findingsAsk = 0;

function updateFindings() {
  const yes = marked('yes');
  // First tick: the panel opens (as a small bar on a phone, so the map stays visible)
  if (yes.length && !findings.shown) { findings.shown = true; findings.collapsed = innerWidth < 640; }
  renderFindings();
  // Ask Claude for a written answer once the marks settle
  clearTimeout(findingsTimer);
  if (!live() || !yes.length || findings.sig === feedbackSig()) return;
  findings.loading = true;
  renderFindings();
  findingsTimer = setTimeout(askFindings, 1200);
}

async function askFindings() {
  const ask = ++findingsAsk, sig = feedbackSig();
  findings.error = '';
  try {
    const d = await R.digest({
      backend: backend(), tier: view.tier, key: apiKey, model: view.model,
      question: DATA.topics[trail[0]].title,
      mode: session.mode,
      relevant: marked('yes').map((id) => ({ title: DATA.topics[id].title, liner: DATA.topics[id].liner, about: DATA.details[id]?.about || '' })),
      notRelevant: marked('no').map((id) => DATA.topics[id].title),
    });
    if (ask !== findingsAsk) return;   // you've marked something since; a newer answer is coming
    findings.claude = d;
    findings.sig = sig;
  } catch (err) {
    if (ask !== findingsAsk) return;
    findings.error = R.explain(err);
  } finally {
    if (ask === findingsAsk) { findings.loading = false; renderFindings(); saveFindings(); updateSpend(); }
  }
}

let findingsWidth = 0;
function renderFindings() {
  const box = $('findings');
  box.hidden = !findings.shown || !marked('yes').length && !marked('no').length;
  saveFindings();
  // Make room for the panel (or give it back)
  queueMicrotask(() => { const w = uiLeft(); if (w !== findingsWidth) { findingsWidth = w; scheduleFit(); } });
  if (box.hidden) return;
  const yes = marked('yes'), no = marked('no');
  const diagnose = session.mode !== 'explore';
  const sunId = trail[trail.length - 1];
  box.classList.toggle('is-collapsed', findings.collapsed);
  $('findings-toggle').textContent = findings.collapsed ? '▸' : '▾';
  $('findings-toggle').setAttribute('aria-expanded', String(!findings.collapsed));
  $('findings-toggle').setAttribute('aria-label', findings.collapsed ? 'Expand' : 'Collapse');
  $('findings-kicker').textContent = `${findingsName()} · ${yes.length} relevant${no.length ? `, ${no.length} ruled out` : ''}`;
  const fresh = findings.claude && findings.sig === feedbackSig();
  const claude = findings.claude;
  // Title: Claude's name for the answer when it has one, else the strongest tick
  const lead = [...yes].sort((a, b) => (verdictWeight(b) - verdictWeight(a)))[0];
  $('findings-title').textContent = claude?.title || (yes.length
    ? (diagnose ? `Leading lead: ${DATA.topics[lead].title}` : `Centred on ${DATA.topics[lead].title}`)
    : 'Nothing ticked yet');

  const parts = [];
  if (claude?.summary) parts.push(`<p class="findings-lead">${esc(claude.summary)}</p>`);
  if (findings.loading) parts.push(`<p class="findings-note"><span class="spinner"></span>${claude ? 'Updating with your latest marks…' : 'Claude is writing this up…'}</p>`);
  else if (findings.error) parts.push(`<p class="findings-note">${esc(findings.error)}</p>`);
  else if (claude && !fresh && live()) parts.push('<p class="findings-note">Out of date: mark another orb to refresh it.</p>');
  else if (!live() && yes.length) parts.push(`<p class="findings-note">${inViewer ? 'Built from the example notes. With Claude on, a written answer appears here too.' : 'Built from the example notes. Connect Claude for a written answer.'}</p>`);

  if (yes.length) parts.push(`<section class="findings-section"><h3>${diagnose ? 'Most likely' : 'What matters here'}</h3><ol class="findings-list">${
    [...yes].sort((a, b) => verdictWeight(b) - verdictWeight(a)).map((id) => `<li>${esc(DATA.topics[id].title)}<small>${esc(DATA.topics[id].liner)}</small></li>`).join('')}</ol></section>`);

  // Next steps: Claude's, or the checks noted for what you ticked
  const next = claude?.next?.length && fresh ? claude.next : [...new Set(yes.flatMap((id) => (DATA.details[id]?.check || []).slice(0, 2)))].slice(0, 4);
  if (next.length) parts.push(`<section class="findings-section"><h3>${diagnose ? 'Check next' : 'Look into next'}</h3><ul class="findings-list">${next.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></section>`);
  else if (yes.length) parts.push(`<section class="findings-section"><h3>${diagnose ? 'Check next' : 'Look into next'}</h3><p class="findings-out">Open a ticked orb to see ${diagnose ? 'what to check' : 'where to go next'}.</p></section>`);

  const more = suggestions(sunId);
  if (more.length) parts.push(`<section class="findings-section"><h3>Worth a look</h3><div class="findings-chips">${more.map((s) =>
    `<button type="button" class="findings-chip" data-open="${esc(s.to)}">${esc(DATA.topics[s.to].title)}</button>`).join('')}</div></section>`);
  if (no.length) parts.push(`<p class="findings-out">Ruled out: ${no.map((id) => `<s>${esc(DATA.topics[id].title)}</s>`).join(', ')}</p>`);
  $('findings-body').innerHTML = parts.join('');
}
// Stronger link and higher relevance (as first given) put a tick higher in the list
function verdictWeight(id) {
  for (const sys of [DATA.systems[trail[trail.length - 1]], ...trail.map((t) => DATA.systems[t])]) {
    const s = sys?.find((x) => x.to === id);
    if (s) return s.relevance + s.link * 0.5;
  }
  return 0;
}
$('findings-head').addEventListener('click', (e) => {
  if (e.target.closest('a')) return;
  findings.collapsed = !findings.collapsed;
  renderFindings();
});
$('findings-body').addEventListener('click', (e) => {
  const b = e.target.closest('[data-open]');
  const o = b && orbs.find((x) => x.id === b.dataset.open);
  if (o) openFocus(o);
});

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
  if (o.isSun) return DATA.topics[o.id]?.inside ? 'Inside view · centre' : 'Centre of this system';
  if (o.role === 'sub') return `Sub-system of ${sun}`;
  if (o.role === 'part') return `Part of ${DATA.topics[o.parent]?.title || sun}`;
  const verb = { cause: 'Cause of', effect: 'Effect of', related: 'Related to' }[o.rel];
  return `${verb} ${sun}`;
}

function openFocus(o) {
  if (selected === o) return;
  // Opening an orb the step-by-step build hasn't reached yet jumps ahead to it
  if (view.reasoning && o.step != null && o.step > trace.at) { trace.at = o.step; trace.playing = false; renderTrace(); }
  pinned = null;
  selected = o;
  if (o.tab !== 'about') { o.tab = 'about'; fillOrb(o); }
  updateDimming();
  if (live() && !DATA.details[o.id]?.about) loadDetails(o);
}

function closeFocus() {
  if (!selected) return;
  selected = null;
  updateDimming();
}

function runAction(action, o, id) {
  if (action === 'close') { closeFocus(); o.el.focus({ preventScroll: true }); }
  if (action === 'expand') expand(o.id);
  if (action === 'deeper') goDeeper(o.id);
  if (action === 'thread') followThread(Number(id));
  if (action === 'tab') {
    o.tab = id;
    fillOrb(o);
    o.inner.scrollTop = 0;
    // Opening Sources on an orb that hasn't been researched yet starts the research
    if (id === 'sources' && live() && !DATA.details[o.id]?.about) loadDetails(o);
  }
  if (action === 'open') { const other = orbs.find((x) => x.id === id); if (other) openFocus(other); }
  if (action === 'retry') { delete DATA.details[o.id]; loadDetails(o); }
  if (action === 'tick') setVerdict(o, 'yes');
  if (action === 'cross') setVerdict(o, 'no');
}

// Mark an orb; pressing the same mark again clears it
function setVerdict(o, v) {
  if (o.isSun) return;
  const next = verdicts[o.id] === v ? null : v;
  verdictOrder = verdictOrder.filter((id) => id !== o.id);
  if (next) { verdicts[o.id] = next; verdictOrder.push(o.id); }
  else delete verdicts[o.id];
  saveFeedback();
  S?.mark(next);
  relayout(900);
  // A crossed orb has said what it needed to: close it and let it drift off
  if (next === 'no' && selected === o) closeFocus();
  updateFindings();
}

function updateDimming() {
  for (const o of orbs) {
    o.el.classList.toggle('is-dim', Boolean(selected) && o !== selected && !o.isSun);
    o.el.classList.toggle('is-selected', o === selected);
    labelOrb(o);
  }
}
// What a screen reader hears: a button with the orb's name while closed,
// a labelled group holding the card's own buttons once opened
function labelOrb(o) {
  const open = o === selected;
  o.el.setAttribute('role', open ? 'group' : 'button');
  o.el.setAttribute('aria-label', `${DATA.topics[o.id]?.title || ''}. ${relationText(o)}${o.verdict ? `. Marked ${o.verdict === 'yes' ? 'relevant' : 'not relevant'}` : ''}`);
  if (open) o.el.removeAttribute('aria-expanded'); else o.el.setAttribute('aria-expanded', 'false');
}

addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  pinned = null;
  const was = selected;
  closeFocus();
  if (was && (was.el.contains(document.activeElement) || document.activeElement === document.body)) was.el.focus({ preventScroll: true });
  setPanel(null, false);
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
  else {
    // In Reasoning mode, tapping a line keeps its reasoning open (how touch screens "hover")
    pinned = view.reasoning ? lineAt(e.clientX, e.clientY, e.pointerType === 'touch') : null;
    if (!pinned) closeFocus();
    surgeThreads(e.clientX, e.clientY);
  }
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
    if (DATA.topics[id].inside) {
      const mark = document.createElement('span');
      mark.className = 'inside';
      mark.textContent = 'Inside';
      b.prepend(mark);
    }
    if (i === trail.length - 1) b.setAttribute('aria-current', 'step');
    else b.addEventListener('click', () => expand(id));
    nav.append(b);
  });
}

// ─── Settings panel ──────────────────────────────────────────
function buildViewPanel() {
  const tabs = $('view-tabs');
  let list = null;
  for (const s of VIEW_SETTINGS) {
    if (s.tab) {
      // A tab button and the pane it shows
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'view-tab';
      b.id = 'view-tab-' + s.tab;
      b.textContent = s.tab;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', 'view-pane-' + s.tab);
      b.addEventListener('click', () => showViewTab(s.tab));
      tabs.append(b);
      list = document.createElement('div');
      list.className = 'view-pane';
      list.id = 'view-pane-' + s.tab;
      list.setAttribute('role', 'tabpanel');
      list.setAttribute('aria-labelledby', b.id);
      $('view-list').append(list);
      continue;
    }
    if (s.connection) { list.append($('connection')); continue; }
    if (s.reducedNote) {
      // Settings here can't override the device asking for less motion
      if (!reduceMotion) continue;
      const p = document.createElement('p');
      p.className = 'view-note';
      p.textContent = 'Your device asks for reduced motion, so these stay still whatever is set here.';
      list.append(p);
      continue;
    }
    if (s.group) {
      const h = document.createElement('p');
      h.className = 'view-group';
      h.textContent = s.group;
      list.append(h);
      continue;
    }
    const id = 'view-' + s.key;
    if (s.options) {
      // A row of choices, like radio buttons, with a small caption
      const wrap = document.createElement('div');
      wrap.id = id;
      wrap.className = 'view-option';
      if (!s.swatches) {
        const cap = document.createElement('p');
        cap.className = 'view-caption';
        cap.textContent = s.label;
        wrap.append(cap);
      }
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
      wrap.append(row);
      list.append(wrap);
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
      row.append(input);
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
  // Tabs follow the usual keyboard pattern: arrows move between them
  tabs.addEventListener('keydown', (e) => {
    const names = [...tabs.children].map((b) => b.textContent);
    const i = names.indexOf(viewTab);
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: names.length - 1 }[e.key];
    if (to == null) return;
    e.preventDefault();
    showViewTab(names[(to + names.length) % names.length]);
    $('view-tab-' + viewTab).focus();
  });
  showViewTab(viewTab);
  syncViewPanel();
}

function showViewTab(name) {
  viewTab = name;
  for (const b of $('view-tabs').children) {
    const on = b.textContent === name;
    b.setAttribute('aria-selected', String(on));
    b.tabIndex = on ? 0 : -1;
    $('view-pane-' + b.textContent).hidden = !on;
  }
  $('view-reset').textContent = `Reset ${name.toLowerCase()} settings`;
  $('view-list').scrollTop = 0;
}

// The settings that live on a tab, for "Reset" (the connection is left alone)
function tabKeys(name) {
  const keys = [];
  let current = null;
  for (const s of VIEW_SETTINGS) {
    if (s.tab) current = s.tab;
    else if (s.key && current === name) keys.push(s.key);
  }
  return keys;
}

function syncViewPanel() {
  for (const s of VIEW_SETTINGS) {
    if (!s.key) continue;
    const el = $('view-' + s.key);
    // Greyed out while the setting it depends on is off
    // Threads also grey out where the device can't draw them
    const unsupported = s.key === 'threads' && !threadsOk;
    const off = Boolean(s.needs && !view[s.needs]) || unsupported;
    if (unsupported) el.closest('label').querySelector('small').textContent = 'This device can’t draw them (it needs WebGL2), so lines stay plain';
    (el.closest('label') || el).classList.toggle('is-off', off);
    if (s.options) {
      for (const b of el.querySelectorAll('.choice')) {
        b.setAttribute('aria-checked', String(b.dataset.value === String(view[s.key])));
        b.disabled = off;
      }
    } else if (el.type === 'checkbox') {
      el.checked = view[s.key] && !unsupported;
      el.disabled = off;
    } else {
      el.value = view[s.key];
      el.disabled = off;
      el.parentElement.querySelector('output').textContent = s.format === 'percent'
        ? Math.round(view[s.key] * 100) + '%'
        : view[s.key].toFixed(s.step < 0.1 ? 2 : 1) + (s.unit || '');
    }
  }
}

let relayoutTimer;
function afterViewChange(s) {
  // Choices store numbers as numbers, even though buttons hand back text
  if (s?.key && typeof VIEW_DEFAULTS[s.key] === 'number') view[s.key] = Number(view[s.key]);
  if (s?.key === 'reasoning') setReasoning(view.reasoning);
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
  b.toggle('still', !view.backdropMotion);
  controls.autoRotate = view.mapMotion === 'spin' && !reduceMotion;
  readPalette();
  if (!view.reasoning) trace.playing = false;
  renderTrace();
  if ($('plan-note') && R) updateLiveState(false);
  applySound();
}
darkDevice.addEventListener('change', applyView);
// If the page host switches light/dark itself, keep our theme and follow its mode
new MutationObserver(() => {
  const t = document.documentElement.dataset.theme;
  if (OUR_THEMES.includes(t)) return;
  if (t === 'dark' || t === 'light') view.mode = t;
  applyView();
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

// The Settings and How to use panels: one open at a time
function setPanel(name, open) {
  for (const n of ['view', 'help']) {
    const on = n === name && open;
    $(n + '-panel').hidden = !on;
    $(n + '-toggle').setAttribute('aria-expanded', String(on));
  }
}
const setViewPanel = (open) => setPanel('view', open);
$('view-toggle').addEventListener('click', () => setPanel('view', $('view-panel').hidden));
$('help-toggle').addEventListener('click', () => setPanel('help', $('help-panel').hidden));
for (const b of document.querySelectorAll('[data-close]')) b.addEventListener('click', () => setPanel(b.dataset.close, false));
// Reset puts back only the tab you're looking at
$('view-reset').addEventListener('click', () => {
  const keys = tabKeys(viewTab);
  const wasReasoning = view.reasoning;
  for (const k of keys) view[k] = VIEW_DEFAULTS[k];
  if (view.reasoning !== wasReasoning) setReasoning(view.reasoning);
  afterViewChange({ relayout: viewTab === 'Map' });
});

// ─── Sound (see the SOUND script) ────────────────────────────
const S = window.CELESTIAL_SOUND;
function applySound() {
  S?.configure({ on: view.sound, volume: view.volume, music: view.music, bells: view.bells, cues: view.cues, theme: view.theme });
  $('sound-toggle').setAttribute('aria-pressed', String(view.sound));
}
$('sound-toggle').addEventListener('click', () => {
  view.sound = !view.sound;
  storeView();
  syncViewPanel();
  applySound();
  if (view.sound) toast('Sound on. Settings › Sound sets the volume and what plays.');
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
function updateLiveState(refill = true) {
  $('brand-stage').textContent = planReady ? 'Live · on your Claude plan'
    : inViewer ? (planBlocked === 'checking' ? 'Connecting to Claude…' : 'Example · Claude not available here')
    : demo() ? 'Demo · preloaded research'
    : live() ? `Live · ${R.MODELS[view.model].name}`
    : 'Example · add a key to go live';
  // On claude.ai each viewer's own plan is used, so the key and API-only settings step aside
  const onClaude = planReady || inViewer;
  $('plan-note').hidden = !onClaude;
  $('plan-note').textContent = planReady
    ? 'Research runs on your own Claude plan, whoever shared this page with you. No key needed; the first search asks your permission. It draws on Claude’s own knowledge (no web browsing here), so each orb’s Sources tab lists references Claude named, with search links to find them, rather than links to pages it read.'
    : planBlocked === 'checking' ? 'Connecting to Claude…'
    : planBlocked === 'denied' ? 'Claude is switched off for this page in your settings. Turn it back on to research your own questions; it runs on your own Claude plan.'
    : BLOCKED_NOTE;
  $('plan-allow').hidden = !(inViewer && !planReady && planBlocked === 'denied');
  $('plan-retry').hidden = !(inViewer && !planReady && planBlocked === 'unavailable');
  $('key-form').querySelector('label').hidden = onClaude;
  $('key-form').querySelector('.key-row').hidden = onClaude;
  $('key-note').hidden = onClaude;
  $('view-model').hidden = onClaude;
  $('view-webSearch').closest('label').hidden = onClaude;
  $('view-tier').hidden = !planReady;
  $('key-forget').hidden = !apiKey || onClaude;
  $('api-key').value = apiKey ? '••••••••••••' + apiKey.slice(-4) : '';
  $('key-note').textContent = apiKey
    ? 'Saved in this browser only. It is sent only to Anthropic.'
    : 'Stored only in this browser and sent only to Anthropic. Create one at console.anthropic.com → API keys.';
  if (refill) for (const o of orbs) fillOrb(o);
  if (refill) updateFindings(); else renderFindings();
  updateSpend();
}
function updateSpend() {
  const s = R?.spend;
  $('spend').textContent = !s?.requests ? ''
    : planReady ? `This visit: ${s.requests} request${s.requests === 1 ? '' : 's'} on your Claude plan`
    : `This visit: ${s.requests} request${s.requests === 1 ? '' : 's'}${s.searches ? `, ${s.searches} web search${s.searches === 1 ? '' : 'es'}` : ''}, ${s.tokens >= 1e6 ? (s.tokens / 1e6).toFixed(1) + 'M' : Math.max(1, Math.round(s.tokens / 1000)) + 'k'} tokens. Your Anthropic console shows the cost.`;
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
  clearFeedback();
  Object.assign(findings, { shown: false, claude: null, sig: '', loading: false, error: '' });
  renderFindings();
  $('prompt-input').value = DATA.prompt;
  closeFocus();
  showSystem(DATA.start);
  saveSession();
});

// ─── Small animation helper ──────────────────────────────────
// Easing curves: how a movement speeds up and slows down
const easeOut = (t) => 1 - Math.pow(1 - t, 3);                       // quick start, soft landing
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);   // soft at both ends
const tweens = [];
// owner: starting a new tween for the same thing stops its previous one
function tween(ms, step, done, { ease = easeOut, delay = 0, owner = null } = {}) {
  if (owner) for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].owner === owner) tweens.splice(i, 1);
  if (reduceMotion) { step(1); done?.(); return; }
  tweens.push({ start: performance.now() + delay, ms, step, done, ease, owner });
}
function tweenVector(v, to, ms, opts) {
  const from = v.clone();
  tween(ms, (t) => v.lerpVectors(from, to, t), null, opts);
}
const wait = (ms) => new Promise((done) => tween(ms, () => {}, done, { ease: (t) => t }));

// The camera glides like it's on a soft spring: it eases away, and if the
// goal moves mid-flight (more orbs arrive) it bends towards it without a jolt
let camGoal = null;
const camVel = new THREE.Vector3(), lookVel = new THREE.Vector3();
function smoothDamp(v, goal, vel, time, dt) {
  const w = 2 / time, x = w * dt;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = v.clone().sub(goal);
  const temp = vel.clone().addScaledVector(change, w).multiplyScalar(dt);
  vel.sub(temp.clone().multiplyScalar(w)).multiplyScalar(decay);
  v.copy(goal).add(change.add(temp).multiplyScalar(decay));
}
function glideCamera(dt) {
  if (!camGoal) return;
  smoothDamp(camera.position, camGoal.pos, camVel, TUNING.cameraGlide, dt);
  smoothDamp(controls.target, camGoal.look, lookVel, TUNING.cameraGlide, dt);
  if (camera.position.distanceTo(camGoal.pos) < 0.01 && camVel.length() < 0.01) camGoal = null;
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

function updatePulse(o, sun, approach) {
  const P = TUNING.pulses;
  const show = view.streams && !reduceMotion && o.grow > 0.99 && o.reveal > 0.99 && !busy && !o.leaving && sun;
  // Streams fade in and out instead of switching on and off
  o.flow += ((show ? 1 : 0) - o.flow) * approach * 0.4;
  if (o.flow < 0.01 || !sun) { for (const s of o.pulse) s.visible = false; return; }
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
    streak.material.opacity = Math.min(1, fade * streak.userData.strength * dimmed) * o.flow;
  }
}

// ─── Progressive mode: watch the map being built ─────────────
// (Called "Reasoning" in the code and in stored settings, view.reasoning.)
// A toggle at the top. When it's on, a system doesn't appear all at once:
// it's rebuilt one step at a time, in the order the reasoning goes. First
// how the question was read, then causes (strongest first), effects and
// related topics, each joined to the centre with a line. A link between two
// orbs appears as soon as both are on the map ("noticing a connection").
// Every line can be hovered (or tapped) to see why it exists and where that
// reasoning comes from, and the panel bottom right lists the steps so far.
const TRACE_SPEEDS = [['Slow', 3800], ['Normal', 2400], ['Fast', 1200]];   // ms per step
const trace = {
  steps: [],          // { kind: 'start' | 'orb' | 'cross', orb, c, phase }
  at: 0,              // the step reached so far
  playing: false,
  nextAt: 0,
  manual: false,      // you stepped or picked a step yourself
  live: false,        // Claude is still mapping: steps arrive as orbs do
  collapsed: innerWidth < 640,   // on a phone the line card tells the story; the list waits
};
let pinned = null;    // a line you tapped, whose reasoning stays open
let pointer = null;   // the mouse, when it's over the map (not an orb)
let hoverLink = null;
const traceSpeed = () => TRACE_SPEEDS[view.traceSpeed]?.[1] || 2400;

// Hidden until the build reaches it
function revealGoal(x) {
  if (!view.reasoning || x.isSun || x.step == null) return 1;
  return x.step <= trace.at ? 1 : 0;
}

// The recorded reasoning for a line, as { why, from, tier }, or null
function reasonFor(sunId, a, b) {
  const table = DATA.reasons[sunId] || {};
  const r = b == null ? table[a] : table[`${a}~${b}`] || table[`${b}~${a}`];
  if (Array.isArray(r)) return { tier: r[0], from: r[1], why: r[2] };
  return r?.why ? r : null;
}

function defaultReading() {
  const centre = DATA.topics[trail[trail.length - 1]].title;
  if (trail.length > 1) return `You expanded “${centre}” from “${DATA.topics[trail[trail.length - 2]].title}”. I looked for what leads to it, what it leads to and what sits beside it, strongest links first.`;
  return session.mode === 'explore'
    ? `You typed a topic, so I mapped the subject around “${centre}”: its key ideas, parts and neighbours, strongest links first.`
    : `You described a problem, so I treated “${centre}” as something to diagnose: causes first, strongest first, then what it leads to, then tools and related topics.`;
}

// Everything the card and the step list say about one line (or the start)
function describe(l) {
  const sunId = trail[trail.length - 1];
  const centre = DATA.topics[sunId].title;
  if (l.kind === 'start') {
    const asked = trail[0] === DATA.start ? DATA.prompt : $('prompt-input').value.trim() || DATA.topics[trail[0]].title;
    return {
      kicker: 'Step 1 · Reading the question', rel: 'sun', title: centre,
      why: DATA.reasons[sunId]?._centre || defaultReading(),
      fromLabel: trail.length > 1 ? 'Your path' : 'Your question',
      from: trail.length > 1 ? trail.map((id) => DATA.topics[id].title).join(' › ') : `“${asked}”`,
      tier: null,
    };
  }
  // A map Claude made while the mode was off has no reasons; say so plainly
  const OFF_NOTE = 'Progressive mode was off when Claude mapped this, so no reason was written for this line. Turn it on before asking a question to get one for every line.';
  const off = Boolean(DATA.reasons[sunId]?._off);
  if (l.kind === 'orb') {
    const o = l.orb, r = reasonFor(sunId, o.id);
    const verb = { cause: 'Cause of', effect: 'Effect of', related: 'Related to' }[o.rel] || 'Related to';
    const role = o.role === 'sub' ? `Sub-system of ${centre}` : o.role === 'part' ? `Part of ${DATA.topics[o.parent]?.title || centre}` : '';
    return {
      kicker: role || `${o.lead ? 'Hidden lead · ' : ''}${verb} ${centre}`, rel: o.rel, title: DATA.topics[o.id].title,
      why: r?.why || (off ? `${OFF_NOTE} The orb’s own summary: ${DATA.topics[o.id].liner}` : `No reasoning was recorded for this line. The orb’s own summary: ${DATA.topics[o.id].liner}`),
      fromLabel: 'Where this comes from', from: r ? r.from : 'Not recorded', tier: r ? r.tier : 6, strength: o.link,
    };
  }
  const { a, b, strength } = l.c, r = reasonFor(sunId, a.id, b.id);
  return {
    kicker: DATA.inside[sunId] ? 'A plausible connection' : 'Noticing a connection', rel: 'cross', title: `${DATA.topics[a.id].title} ↔ ${DATA.topics[b.id].title}`,
    why: r?.why || (off ? OFF_NOTE : 'These two were marked as strongly linked, but no reasoning was recorded for the line.'),
    fromLabel: 'Where this comes from', from: r ? r.from : 'Not recorded', tier: r ? r.tier : 6, strength,
  };
}
const linkKey = (l) => !l ? '' : l.kind === 'start' ? 'start' : l.kind === 'orb' ? 'o:' + l.orb.id : `c:${l.c.a.id}~${l.c.b.id}`;

// The order the map is rebuilt in: causes, effects, related, strongest
// first within each, with each cross-link right after its second orb
function startTrace() {
  const rank = { cause: 0, effect: 1, related: 2 };
  const inside = orbs.some((o) => o.role === 'sub');
  const byRelevance = (x, y) => y.relevance - x.relevance;
  const planets = inside
    ? orbs.filter((o) => o.role === 'sub').sort(byRelevance).flatMap((sub) => [sub, ...orbs.filter((o) => o.parent === sub.id).sort(byRelevance)])
    : orbs.slice(1).sort((x, y) => (rank[x.rel] ?? 2) - (rank[y.rel] ?? 2) || y.link - x.link);
  const steps = [{ kind: 'start', orb: orbs[0], phase: 'start' }];
  const shown = new Set();
  let waiting = [...crossLines];
  for (const o of orbs) o.step = null;
  for (const o of planets) {
    steps.push({ kind: 'orb', orb: o, phase: inside ? 'sub:' + (o.parent || o.id) : o.rel });
    shown.add(o);
    const ready = waiting.filter((c) => shown.has(c.a) && shown.has(c.b));
    waiting = waiting.filter((c) => !ready.includes(c));
    for (const c of ready.sort((x, y) => y.strength - x.strength)) steps.push({ kind: 'cross', c, phase: o.rel });
  }
  steps.forEach((s, i) => { if (s.kind === 'cross') s.c.step = i; else s.orb.step = i; });
  Object.assign(trace, { steps, at: 0, manual: false, playing: steps.length > 1, nextAt: performance.now() + traceSpeed() + 900 });
  pinned = null;
  renderTrace();
}

// While Claude is still mapping, each orb that arrives is the next step
function traceSketch(o) {
  if (trace.steps[0]?.orb !== orbs[0]) return;
  o.reveal = 0;
  o.step = trace.steps.length;
  trace.steps.push({ kind: 'orb', orb: o, phase: 'sketch' });
  Object.assign(trace, { at: o.step, playing: false, manual: false });
  renderTrace();
}

function advanceTrace(now) {
  if (!view.reasoning || !trace.playing || now < trace.nextAt) return;
  if (trace.at < trace.steps.length - 1) { trace.at++; trace.nextAt = now + traceSpeed(); }
  else trace.playing = false;
  renderTrace();
}

function goToStep(i, { play = false } = {}) {
  trace.at = clamp(i, 0, trace.steps.length - 1);
  trace.playing = play;
  trace.manual = !play;
  trace.nextAt = performance.now() + traceSpeed();
  pinned = null;
  renderTrace();
}

// The steps panel, bottom right
const PHASES = {
  start: 'Starting point',
  cause: 'Looking for causes',
  effect: 'Following the effects',
  related: 'Related ideas, tools and checks',
  sketch: 'First pass, while the full map loads',
};
const ICONS = {
  play: '<path d="M5 3v10l8-5z" fill="currentColor"/>',
  pause: '<path d="M5.5 3.5v9M10.5 3.5v9"/>',
};
const icon = (name) => `<svg viewBox="0 0 16 16" aria-hidden="true">${ICONS[name]}</svg>`;
let traceWidth = 0, traceRendered = '';

function renderTrace() {
  const box = $('trace');
  if (!box) return;
  box.hidden = !view.reasoning;
  document.body.classList.toggle('tracing', view.reasoning);
  $('reason-toggle').setAttribute('aria-pressed', String(view.reasoning));
  queueMicrotask(() => { const w = uiRight(); if (w !== traceWidth) { traceWidth = w; scheduleFit(); } });
  if (box.hidden) return;
  soundStep();
  const n = trace.steps.length, last = n - 1, done = trace.at >= last && !trace.playing && !trace.live;
  box.classList.toggle('is-collapsed', trace.collapsed);
  $('trace-toggle').textContent = trace.collapsed ? '▸' : '▾';
  $('trace-toggle').setAttribute('aria-expanded', String(!trace.collapsed));
  $('trace-kicker').textContent = trace.live ? `Thinking · step ${trace.at + 1}` : `Step ${Math.min(trace.at + 1, n)} of ${n}${done ? ' · map complete' : ''}`;
  $('trace-play').innerHTML = icon(trace.playing ? 'pause' : 'play');
  $('trace-play').setAttribute('aria-label', trace.playing ? 'Pause' : done ? 'Replay from the start' : 'Play');
  $('trace-back').disabled = trace.at <= 0;
  $('trace-next').disabled = $('trace-end').disabled = trace.at >= last;
  $('trace-speed').textContent = TRACE_SPEEDS[view.traceSpeed][0];
  // The steps so far (later ones stay hidden, so the map is discovered in order)
  let phase = null;
  const items = [];
  trace.steps.slice(0, trace.at + 1).forEach((s, i) => {
    if (s.phase !== phase && s.kind !== 'cross') {
      phase = s.phase;
      const label = PHASES[phase] || (phase.startsWith('sub:') ? `Inside ${DATA.topics[phase.slice(4)]?.title || ''}` : '');
      items.push(`<li class="trace-phase">${esc(label)}</li>`);
    }
    const d = describe(s);
    items.push(`<li><button type="button" class="trace-step" data-step="${i}" ${i === trace.at ? 'aria-current="step"' : ''}>
      <span class="trace-dot dot-${d.rel}" aria-hidden="true"></span>
      <span><b>${esc(d.title)}</b><small>${esc(d.why)}</small></span></button></li>`);
  });
  const html = items.join('');
  if (html === traceRendered) return;
  traceRendered = html;
  $('trace-log').innerHTML = html;
  $('trace-log').querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest' });
}

// Each step plays its note as the build reaches it (stepping back is silent)
let soundedSteps = null, soundedAt = -1;
function soundStep() {
  if (trace.steps !== soundedSteps) { soundedSteps = trace.steps; soundedAt = -1; }
  const forward = trace.at > soundedAt;
  soundedAt = trace.at;
  const s = forward && trace.steps[trace.at];
  if (!s) return;
  if (s.kind === 'start') S?.centre();
  else if (s.kind === 'orb') S?.orb(s.orb);
  else S?.pair(s.c.a, s.c.b);
}

// Turned on or off from the button at the top or the Settings panel
function setReasoning(on) {
  view.reasoning = on;
  if (on && orbs.length) startTrace();
  if (!on) { trace.playing = false; trace.live = false; pinned = null; }
  renderTrace();
}
$('reason-toggle').addEventListener('click', () => {
  setReasoning(!view.reasoning);
  storeView();
  syncViewPanel();
});
$('trace-head').addEventListener('click', (e) => {
  if (e.target.closest('.trace-controls')) return;
  trace.collapsed = !trace.collapsed;
  renderTrace();
});
$('trace-restart').addEventListener('click', () => goToStep(0, { play: true }));
$('trace-back').addEventListener('click', () => goToStep(trace.at - 1));
$('trace-next').addEventListener('click', () => goToStep(trace.at + 1));
$('trace-end').addEventListener('click', () => { goToStep(trace.steps.length - 1); trace.manual = false; renderTrace(); });
$('trace-play').addEventListener('click', () => {
  if (trace.playing) { trace.playing = false; trace.manual = true; renderTrace(); }
  else goToStep(trace.at >= trace.steps.length - 1 ? 0 : trace.at + 1, { play: true });
});
$('trace-speed').addEventListener('click', () => {
  view.traceSpeed = (view.traceSpeed + 1) % TRACE_SPEEDS.length;
  storeView();
  renderTrace();
});
$('trace-log').addEventListener('click', (e) => {
  const b = e.target.closest('[data-step]');
  if (b) goToStep(Number(b.dataset.step));
});

// Which line is under a point on screen, if any
function segDist(x, y, p, q) {
  const dx = q.x - p.x, dy = q.y - p.y, len2 = dx * dx + dy * dy;
  const t = len2 ? clamp(((x - p.x) * dx + (y - p.y) * dy) / len2, 0, 1) : 0;
  return Math.hypot(x - (p.x + t * dx), y - (p.y + t * dy));
}
// touch: a fingertip gets a 44px-wide target; threads count their whole bundle
function lineAt(x, y, touch = false) {
  let best = null, bestD = touch ? 22 : 9;
  const consider = (line, link) => {
    if (!line?.visible || !line.userData.p1) return;
    const w = line.userData.weave;
    const d = segDist(x, y, line.userData.p1, line.userData.p2) - (threadsOn() && w?.mesh.visible ? w.spread * 0.7 : 0);
    if (d < bestD) { bestD = d; best = link; }
  };
  for (const o of orbs) if (!o.isSun && o.reveal > 0.5) consider(o.line, { kind: 'orb', orb: o });
  for (const c of crossLines) if ((c.reveal ?? 1) > 0.5) consider(c.line, { kind: 'cross', c });
  return best;
}
stage.addEventListener('pointermove', (e) => {
  const free = e.pointerType !== 'touch' && !down && !e.target.closest?.('.orb');
  pointer = view.reasoning && free ? { x: e.clientX, y: e.clientY } : null;
  threadPointer = free ? { x: e.clientX, y: e.clientY } : null;
});
stage.addEventListener('pointerleave', () => { pointer = null; threadPointer = null; });

// The line being explained lights up with a thicker stroke drawn over it
const glowMaterial = new LineMaterial({ linewidth: 3.2, transparent: true, depthWrite: false });
glowMaterial.resolution.set(stage.clientWidth, stage.clientHeight);
streakMaterials.add(glowMaterial);
const glow = new Line2(STREAK, glowMaterial);
glow.frustumCulled = false;
glow.visible = false;
world.add(glow);

// The line card: what the hovered line, the tapped line or the current step means
let cardKey = '', hoverSoundKey = '';
function cardHTML(d) {
  const tier = d.tier >= 1 && d.tier <= 6 ? `<span class="tier tier-${d.tier}" title="Reliability tier ${d.tier} of 6">${d.tier}</span>` : '';
  return `<span class="lc-kicker">${esc(d.kicker)}</span>
    <b class="lc-title">${esc(d.title)}</b>
    <p class="lc-why">${esc(d.why)}</p>
    <div class="lc-from"><span class="lc-label">${esc(d.fromLabel)}</span><span class="lc-source">${tier}<span>${esc(d.from)}</span></span></div>
    ${d.strength != null ? `<div class="lc-meter"><span class="lc-label">Link</span><span class="bar"><i style="width:${Math.round(d.strength * 100)}%"></i></span><output>${band(d.strength)}</output></div>` : ''}`;
}
function updateReasoning(sw, h) {
  const card = $('link-card');
  hoverLink = view.reasoning && pointer && !hovered ? lineAt(pointer.x, pointer.y) : null;
  if (linkKey(hoverLink) !== hoverSoundKey) {
    hoverSoundKey = linkKey(hoverLink);
    if (hoverLink?.kind === 'orb') S?.pair(orbs[0], hoverLink.orb);
    else if (hoverLink?.kind === 'cross') S?.pair(hoverLink.c.a, hoverLink.c.b);
  }
  stage.style.cursor = hoverLink ? 'help' : '';
  const step = trace.steps[trace.at];
  const following = trace.playing || trace.manual || trace.live || trace.at < trace.steps.length - 1;
  const active = !view.reasoning ? null : hoverLink || pinned || (following && !selected && (trace.live || !busy) ? step : null);
  // Light up its line
  const line = active?.kind === 'orb' ? active.orb.line : active?.kind === 'cross' ? active.c.line : null;
  const shown = Boolean(line?.visible && line.userData.a);
  // Threads light up the line themselves; plain lines get a thicker stroke drawn over them
  litLine = shown ? line : null;
  glow.visible = shown && !threadsOn();
  if (glow.visible) {
    const { a, b } = line.userData;
    glow.position.copy(a);
    glow.lookAt(world.localToWorld(lookAt.copy(b)));
    glow.scale.set(1, 1, Math.max(a.distanceTo(b), 0.001));
    glowMaterial.color.copy(active.kind === 'orb' ? relationColour(active.orb) : palette.line);
    glowMaterial.opacity = 0.85 * Math.min(1, line.material.opacity * 4);
  }
  if (!active || (active.kind !== 'start' && !shown)) { card.hidden = true; cardKey = ''; return; }
  const key = linkKey(active);
  if (key !== cardKey) {
    cardKey = key;
    const d = describe(active);
    card.dataset.rel = d.rel;
    card.innerHTML = cardHTML(d);
    card.hidden = false;
  }
  // Next to the mouse when hovering; otherwise beside the line (or under the sun)
  const cw = card.offsetWidth, ch = card.offsetHeight;
  let x, y;
  if (active === hoverLink) {
    x = pointer.x + 18; y = pointer.y + 18;
    if (x + cw > sw - 12) x = pointer.x - cw - 18;
    if (y + ch > h - 12) y = pointer.y - ch - 18;
  } else if (active.kind === 'start') {
    const r = orbs[0].el.getBoundingClientRect();
    x = r.left + r.width / 2 - cw / 2; y = r.bottom + 14;
  } else {
    const { p1, p2 } = line.userData;
    const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
    x = mx - cw / 2; y = my - ch - 16;
    if (y < uiTop()) y = my + 16;
  }
  // Keep a card that isn't following the mouse clear of the bars and panels
  const pinnedCard = active !== hoverLink;
  const minX = pinnedCard ? Math.max(12, uiLeft()) : 12, maxX = sw - cw - 12 - (pinnedCard ? uiRight() : 0);
  const minY = pinnedCard ? uiTop() : 12, maxY = h - ch - 12 - (pinnedCard ? uiBottom() - 40 : 0);
  x = clamp(x, minX, Math.max(minX, maxX));
  y = clamp(y, minY, Math.max(minY, maxY));
  card.style.transform = `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px)`;
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
  frameCount++;
  const dt = Math.min(0.1, (now - lastNow) / 1000);
  lastNow = now;
  const seconds = now / 1000;
  streamClock += dt * view.streamSpeed;
  // Threads weave unless motion is reduced or orb motion is off; the clock still runs for clicks and draw-ins
  threadClock += dt;
  if (!reduceMotion && view.organic) threadUniforms.uPhase.value += dt * THREADS.speed;
  threadUniforms.uClock.value = reduceMotion ? 0 : threadClock;
  woven = [];
  if (view.backdropMotion && !reduceMotion) backdropClock += dt;

  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i];
    if (now < tw.start) continue;   // still waiting for its delay
    const t = Math.min(1, (now - tw.start) / tw.ms);
    tw.step(tw.ease(t));
    if (t >= 1) { tweens.splice(i, 1); tw.done?.(); }
  }
  if (view.mapMotion === 'sway' && !grabbed && !reduceMotion) world.rotation.y = Math.sin(now / 4000) * 0.12;
  glideCamera(dt);
  controls.update();
  world.updateMatrixWorld();
  advanceTrace(now);

  // How far to move towards an orb's open/closed state this frame
  // (based on time, so it feels the same on fast and slow machines)
  const approach = reduceMotion ? 1 : 1 - Math.exp(-dt * TUNING.openSpeed);
  const settle = reduceMotion ? 1 : 1 - Math.exp(-dt * 3);   // slower, for size and role changes
  const h = stage.clientHeight, sw = stage.clientWidth;
  const focusDist = camera.position.distanceTo(controls.target);
  const all = leaving.length ? orbs.concat(leaving) : orbs;
  const revealRate = reduceMotion ? 1 : 1 - Math.exp(-dt * 5);
  for (const o of all) {
    // Reasoning mode: an orb comes out of the sun when the build reaches its step
    o.reveal += (revealGoal(o) - o.reveal) * revealRate;
    if (o.reveal < 0.999 && o.hub && !o.leaving) {
      if (o.hub.isSun) o.obj.position.copy(o.target).multiplyScalar(o.reveal);
      else o.obj.position.lerpVectors(o.hub.target, o.target, o.reveal);
    }
    o.obj.getWorldPosition(worldPos);
    const camDist = camera.position.distanceTo(worldPos);
    // Open up smoothly on hover (preview) or click (full)
    const target = o === hovered || o === selected ? 1 : 0;
    o.k += (target - o.k) * approach;
    o.f += ((o === selected ? 1 : 0) - o.f) * approach;
    const open = Math.max(o.k, o.f);

    // Size: a circle at rest, widening into a card as it opens
    const pxPerUnit = h / (2 * tanV * (view.sameSize ? focusDist : camDist));
    // Rank and radius ease towards new values, so an orb that becomes the
    // sun (or a sun that becomes an orb) grows or shrinks smoothly
    const rankGoal = o.isSun ? 1 : lerp(0.5, o.relevance, view.hierarchy);
    o.rank = o.rank == null ? rankGoal : o.rank + (rankGoal - o.rank) * settle;
    o.size = o.size == null ? o.radius : o.size + (o.radius - o.size) * settle;
    const small = narrow() ? 0.72 : 1;   // phones get smaller resting orbs
    const rest = Math.max(lerp(TUNING.minDiameter[0], TUNING.minDiameter[1], o.rank) * small, 2 * o.size * view.orbSize * pxPerUnit * small);
    // Cards never get wider than the screen
    const cardW = Math.min(lerp(Math.max(rest, TUNING.hoverWidth), Math.max(rest, TUNING.openWidth), o.f), sw - 24);
    const w = lerp(rest, cardW, open) * o.grow * (1 - 0.3 * o.exit) * o.reveal;
    const pad = lerp(rest * 0.15, TUNING.cardPadding, open);
    o.el.style.setProperty('--iw', Math.max(8, w - 2 * pad).toFixed(1) + 'px');
    let hgt = w;
    if (open > 0.002) {
      // Fit the height to the text; very long cards scroll inside instead
      const maxH = h - uiTop() - uiBottom();
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
    const fx = TUNING.float * (0.7 * Math.sin(seconds * 0.6 + o.phase) + 0.3 * Math.sin(seconds * 1.4 + o.phase * 2));
    const fy = TUNING.float * (0.7 * Math.cos(seconds * 0.5 + o.phase * 1.4) + 0.3 * Math.cos(seconds * 1.1 + o.phase));
    // An opened card slides gently so none of it hangs off the screen
    let nx = 0, ny = 0;
    if (o === selected) {
      projected.copy(worldPos).project(camera);
      const x = (projected.x + 1) / 2 * sw, y = (1 - projected.y) / 2 * h;
      const rx = w / 2 + 12, ry = hgt / 2 + 12;
      const left = uiLeft(), right = sw - uiRight();
      nx = (left + rx <= right - rx ? clamp(x, left + rx, right - rx) : clamp(x, rx, sw - rx)) - x;
      // Keep it between the top bar and the bottom edge
      const top = uiTop() + ry - 12, bottom = h - uiBottom() - ry + 12;
      ny = (top <= bottom ? clamp(y, top, bottom) : (top + bottom) / 2) - y;
    }
    o.nx += (nx - o.nx) * approach;
    o.ny += (ny - o.ny) * approach;
    o.el.style.translate = `${(o.nx + fx * calm).toFixed(2)}px ${(o.ny + fy * calm).toFixed(2)}px`;
    o.el.style.rotate = `${(TUNING.tilt * Math.sin(seconds * 0.33 + o.phase * 0.9) * calm).toFixed(2)}deg`;
    // The further away an orb is, the more see-through it gets
    let fade = 1;
    if (view.depthFade && !o.isSun) {
      const far = clamp((camDist - (focusDist - systemRadius)) / (2 * systemRadius), 0, 1);
      fade = lerp(1, TUNING.farthestFade, far);
    }
    // Less relevant orbs recede, so the eye lands on the relevant ones first
    if (!o.isSun) fade *= lerp(1, lerp(TUNING.leastRelevantFade, 1, o.relevance), view.hierarchy);
    // The ring keeps the full fade, so depth and relevance still read at a glance
    o.el.style.setProperty('--ring', clamp(fade / TUNING.readable, 0.2, 1).toFixed(2));
    fade = Math.max(fade, TUNING.readable);
    if (o.verdict === 'no') fade = 0.55;   // ruled out: fades back, still legible
    if (o.verdict === 'yes') fade = Math.max(fade, 0.95);   // relevant: stays clear
    o.fade = Math.max(fade, open) * Math.min(1, o.grow * 1.5) * (1 - o.exit) * o.reveal;
    o.el.style.opacity = o.fade.toFixed(3);
    // The orb's radius in scene units, so lines and streams meet its edge
    o.surface = (Math.min(w, hgt) / 2) * (2 * tanV * camDist) / h;
  }

  for (const o of all) {
    const sun = o.hub;
    o.linkIn += ((o.leaving ? 0 : 1) - o.linkIn) * settle;
    if (o.line) {
      const faint = view.reasoning ? TUNING.reasonLine
        : view.centreLines && (o.rel === 'cause' || o.rel === 'effect') ? TUNING.centreLine
        : o.role ? TUNING.centreLine * 1.4 : 0;   // inside a deep map the structure always shows
      const dim = selected && selected !== o ? 0.4 : 1;
      const strength = Math.max(faint * o.fade * dim, 0.6 * o.k) * o.grow * o.linkIn;
      o.line.visible = strength > 0.005 && Boolean(sun);
      if (o.line.visible) {
        edgePoints(o, sun);
        setLine(o.line, pathFrom, pathTo);
        o.line.material.opacity = strength;
        // Strands in the orb's colour, the outer ones warming towards the ink; drawn in from the centre outward
        const col = relationColour(o);
        weave(o.line, true, dt, strength, o.link, col, threadTint.copy(col).lerp(threadUniforms.uCore.value, 0.35), true);
      } else weave(o.line, false, dt);
    }
    if (o.pulse) updatePulse(o, sun, approach);
  }
  for (const c of fadingLines.length ? crossLines.concat(fadingLines) : crossLines) {
    c.reveal = (c.reveal ?? 1) + (revealGoal(c) - (c.reveal ?? 1)) * revealRate;
    const lit = Math.max(c.a.k, c.b.k);
    const dim = selected && selected !== c.a && selected !== c.b ? 0.4 : 1;
    const faint = view.reasoning ? TUNING.reasonLine : TUNING.crossLine * c.strength;
    const strength = Math.max(faint * Math.min(c.a.fade, c.b.fade) * dim, 0.5 * lit) * Math.min(c.a.grow, c.b.grow) * (c.life ?? 1) * c.reveal;
    c.line.visible = (view.crossLinks || view.reasoning) && strength > 0.005;
    if (!c.line.visible) { weave(c.line, false, dt); continue; }
    edgePoints(c.a, c.b);
    setLine(c.line, pathFrom, pathTo);
    c.line.material.opacity = strength;
    // Strands shade from one orb's colour to the other's
    weave(c.line, true, dt, strength, c.strength, relationColour(c.a), relationColour(c.b), false);
  }
  updateReasoning(sw, h);
  focusThreads(dt);

  backdropUniforms.uTime.value = backdropClock;
  backdrop.render(backdropScene, backdropCamera);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  // Whatever you're pointing at or have opened always sits on top
  if (selected) selected.el.style.zIndex = '99998';
  if (hovered) hovered.el.style.zIndex = '99999';
  requestAnimationFrame(frame);
}

const projected = new THREE.Vector3();

// ─── Size everything to the window ───────────────────────────
let resizeTimer;
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  Object.assign(screenSize, { w, h });
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
  backdrop.setSize(w, h);
  backdropUniforms.uAspect.value = w / h;
  for (const m of streakMaterials) m.resolution.set(w, h);
  threadUniforms.uRes.value.set(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { fitCamera(); drawLineArt(); }, 200);
}
new ResizeObserver(resize).observe(stage);

// ─── Start ───────────────────────────────────────────────────
loadCache();
loadFeedback();
loadFindings();
buildViewPanel();
applyView();
resize();
drawLineArt();
showSystem(trail[trail.length - 1]);
updateLiveState();
renderFindings();
requestAnimationFrame(frame);
// On claude.ai, research runs on your Claude plan instead of a key
async function checkPlan() {
  const ok = await R.planAvailable(planBlocked !== 'checking');
  planReady = ok;
  planBlocked = ok ? '' : (await R.planState()) === 'denied' ? 'denied' : 'unavailable';
  updateLiveState();
}
if (R && inViewer) checkPlan();
$('plan-retry').addEventListener('click', () => { planBlocked = 'checking'; updateLiveState(false); checkPlan(); });
$('plan-allow').addEventListener('click', async () => {
  try { await R.openPermissions(); } catch { toast('Open the page’s Permissions menu on claude.ai and switch Claude on.'); }
  checkPlan();
});

