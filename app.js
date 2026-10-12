// ─────────────────────────────────────────────────────────────
// CELESTIAL · stage 1 sketch
// Draws one topic as a 3D solar system and lets you move through it.
// The content lives in data.js; this file only decides how it looks
// and behaves.
// ─────────────────────────────────────────────────────────────
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

const DATA = window.CELESTIAL_DATA;

// ─── Tuning ──────────────────────────────────────────────────
// Every number that shapes the look lives here.
// In stage 3 these become sliders you can play with on screen.
const TUNING = {
  nearestOrbit: 6,        // distance of an orb with link = 1
  farthestOrbit: 17,      // distance of an orb with link = 0
  smallestOrb: 0.28,      // radius of an orb with relevance = 0
  largestOrb: 1.05,       // radius of an orb with relevance = 1
  sunSize: 1.5,
  hoverSwell: 1.18,       // how much an orb grows when you point at it
  hiddenLead: { maxLink: 0.45, minRelevance: 0.65 },  // when an orb glows
  keepSizeWithDepth: true, // cancel perspective so size only means relevance
  sway: true,             // gently rock the view until you grab it
  lineOfSight: 0.82,      // keeps orbs out of the cones straight in front of and behind the sun
  breathingRoom: 1.0,     // minimum gap between orbs
  widen: 2.4,             // most a system may stretch sideways to fill a wide screen
  pulses: {
    slowest: 6.0,         // seconds between pulses for the least relevant orb
    fastest: 2.2,         // seconds between pulses for the most relevant orb
    travel: 1.5,          // seconds a pulse takes to cross
    length: 2.4,          // length of a streak, in scene units
    width: 2.5,           // thickness of a streak, in screen pixels
    brightness: 1,
  },
};

const UI_TOP = 130, UI_BOTTOM = 40;   // pixels taken by the bars at top and bottom
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Scene: renderer, camera, lights ─────────────────────────
const stage = document.getElementById('stage');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
stage.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.className = 'label-layer';
stage.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
const FOV = 40;
const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 400);
camera.position.set(0, 3, 44);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.zoomSpeed = 2.4;          // faster trackpad pinch and scroll
controls.rotateSpeed = 0.8;
controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.PAN };
// Stop the browser's own middle-click scrolling from taking over
renderer.domElement.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); });

let swaying = TUNING.sway && !reduceMotion;
controls.addEventListener('start', () => { swaying = false; });

scene.add(new THREE.HemisphereLight(0xffffff, 0x6b7078, 1.7));
const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
keyLight.position.set(10, 16, 12);
scene.add(keyLight);

const world = new THREE.Group();
scene.add(world);

// ─── Colours come from the CSS tokens in style.css ───────────
const palette = {};
function readPalette() {
  const css = getComputedStyle(document.documentElement);
  for (const name of ['scene', 'orb', 'sun', 'line', 'glow', 'cause', 'effect']) {
    palette[name] = new THREE.Color(css.getPropertyValue('--3d-' + name).trim());
  }
  renderer.setClearColor(palette.scene);
  scene.fog = new THREE.Fog(palette.scene, 40, 90);
  for (const o of orbs) paintOrb(o);
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readPalette);
new MutationObserver(readPalette).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

// A soft round texture used for glows and pulses
const GLOW = (() => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
})();

const SPHERE = new THREE.SphereGeometry(1, 48, 24);
const RING = new THREE.TorusGeometry(1.32, 0.035, 8, 64);

// ─── State ───────────────────────────────────────────────────
let orbs = [];          // everything currently on screen, sun included
let trail = [DATA.start];
let selected = null;
let hovered = null;
let busy = false;       // true while a transition is playing

const lerp = THREE.MathUtils.lerp;
const isHiddenLead = (l) => l.link <= TUNING.hiddenLead.maxLink && l.relevance >= TUNING.hiddenLead.minRelevance;
const canUnfold = (id) => Boolean(DATA.systems[id]);
const orbitOf = (l) => lerp(TUNING.nearestOrbit, TUNING.farthestOrbit, 1 - l.link);
const sizeOf = (l) => lerp(TUNING.smallestOrb, TUNING.largestOrb, l.relevance);

// ─── Layout: where each orb goes ─────────────────────────────
// Directions are spread evenly around the sun, like points on a globe.
// Distance from the sun comes from "link".
function layout(links) {
  const n = links.length;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cap = TUNING.lineOfSight;
  // Even directions over a sphere, skipping the two caps that point
  // straight at or away from the camera (orbs there would hide the sun)
  const dirs = Array.from({ length: n }, (_, i) => {
    const z = cap * (1 - (2 * (i + 0.5)) / n);
    const ring = Math.sqrt(1 - z * z);
    const a = i * golden;
    return new THREE.Vector3(ring * Math.cos(a), ring * Math.sin(a), z);
  });
  // The most relevant orbs get the clearest, most face-on directions
  dirs.sort((a, b) => Math.abs(a.z) - Math.abs(b.z));
  const placed = [...links]
    .sort((a, b) => b.relevance - a.relevance)
    .map((l, i) => ({ ...l, target: dirs[i].multiplyScalar(orbitOf(l)) }));
  spreadOut(placed);
  // Stretch sideways until the system's shape matches the screen's shape
  const usable = stage.clientWidth / Math.max(stage.clientHeight - UI_TOP - UI_BOTTOM, 1);
  const wide = Math.max(...placed.map((p) => Math.abs(p.target.x)), 1);
  const tall = Math.max(...placed.map((p) => Math.abs(p.target.y)), 1);
  const widen = THREE.MathUtils.clamp((tall * usable) / wide * 0.92, 1, TUNING.widen);
  for (const p of placed) { p.target.x *= widen; p.target.z *= widen; }
  return placed;
}

// Nudge apart any orbs whose labels would still collide as seen from
// the starting camera angle. Each orb keeps its distance from the sun,
// so distance still means "link".
function spreadOut(placed) {
  const clearOfSun = TUNING.sunSize + 2.6;
  const minFlat = Math.sqrt(1 - TUNING.lineOfSight ** 2);
  const fit = (l) => {   // put an orb back at its distance from the sun
    const p = l.target, r = orbitOf(l);
    let flat = Math.hypot(p.x, p.y) || 0.01;
    const lo = Math.max(clearOfSun, r * minFlat);
    const k = flat > r ? r / flat : flat < lo ? Math.min(lo, r) / flat : 1;
    p.x = (p.x || 0.01) * k; p.y *= k;
    p.z = Math.sign(p.z || 1) * Math.sqrt(Math.max(0, r * r - p.x * p.x - p.y * p.y));
  };
  for (let pass = 0; pass < 60; pass++) {
    for (let i = 0; i < placed.length; i++) {
      const a = placed[i].target;
      for (let j = i + 1; j < placed.length; j++) {
        const b = placed[j].target;
        const need = sizeOf(placed[i]) + sizeOf(placed[j]) + TUNING.breathingRoom * 2.2;
        // Labels are wide, so sideways gaps count for less than vertical ones
        const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx * 0.55, dy) || 0.01;
        if (d >= need) continue;
        const k = (need - d) / 2 / d;
        a.x += dx * k * 1.6; a.y += dy * k;
        b.x -= dx * k * 1.6; b.y -= dy * k;
        fit(placed[j]);
      }
      fit(placed[i]);
    }
  }
}

// ─── Camera: frame the whole system so it fills the screen ───
function fitCamera(animate = true) {
  if (!orbs.length) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  const tanV = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  const fy = (h - UI_TOP - UI_BOTTOM) / h;
  const fx = (w - 60) / w;
  // Centre on the middle of the system (effects and causes may not reach equally far)
  const ys = orbs.map((o) => o.target.y);
  const mid = (Math.max(...ys) + Math.min(...ys)) / 2;
  let dist = 20;
  for (const o of orbs) {
    const p = o.target, pad = o.radius + 1.2;
    dist = Math.max(dist,
      p.z + (Math.abs(p.y - mid) + pad + 0.6) / (tanV * fy),
      p.z + (Math.abs(p.x) + pad) / (tanV * camera.aspect * fx));
  }
  dist *= 1.02;
  // Shift the view so the system sits in the space between the bars
  const shift = mid + ((UI_TOP - UI_BOTTOM) / 2 / h) * 2 * tanV * dist;
  const to = new THREE.Vector3(0, dist * 0.06 + shift, dist);
  const look = new THREE.Vector3(0, shift, 0);
  controls.minDistance = dist * 0.3;
  controls.maxDistance = dist * 2.5;
  scene.fog.near = dist * 0.85;
  scene.fog.far = dist * 1.9;
  if (animate) { tweenVector(camera.position, to, 900); tweenVector(controls.target, look, 900); }
  else { camera.position.copy(to); controls.target.copy(look); }
}

// ─── Building orbs ───────────────────────────────────────────
function makeLabel(o) {
  const topic = DATA.topics[o.id];
  const el = document.createElement('div');
  const size = o.isSun ? 'sun' : o.relevance >= 0.7 ? 'lg' : o.relevance >= 0.4 ? 'md' : 'sm';
  el.className = 'orb-label ' + size + (o.rel === 'cause' || o.rel === 'effect' ? ' is-' + o.rel : '');
  let tag = '';
  if (o.cameFrom) tag = 'Came from';
  else if (o.lead) tag = 'Hidden lead';
  el.innerHTML =
    (tag ? `<span class="tag">${tag}</span>` : '') +
    `<span class="t"></span><span class="l"></span>`;
  el.querySelector('.t').textContent = topic.title;
  el.querySelector('.l').textContent = topic.liner;
  const label = new CSS2DObject(el);
  label.center.set(0.5, 0);   // hang the label just below the orb
  world.add(label);
  return label;
}

// A streak is drawn as a straight segment one unit long, then moved,
// turned and stretched into place every frame.
const STREAK = new LineGeometry();
STREAK.setPositions([0, 0, 0, 0, 0, 1]);
const streakMaterials = new Set();   // kept so they can follow window resizes

function makePulse() {
  // A pulse is a short bright streak riding on a longer faint one,
  // which reads as a stream that tapers behind its head
  return [
    { length: 1, width: 0.8, strength: 0.35 },
    { length: 0.45, width: 1, strength: 1 },
  ].map((part) => {
    const m = new LineMaterial({ linewidth: TUNING.pulses.width * part.width, transparent: true, depthWrite: false });
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
    lead: !spec.isSun && isHiddenLead(spec),
    cameFrom: spec.cameFrom,
    target: spec.target || new THREE.Vector3(),
    start: new THREE.Vector3(),
    grow: 0,
    swell: 1,
  };
  o.radius = o.isSun ? TUNING.sunSize : sizeOf(o);

  o.mesh = new THREE.Mesh(SPHERE, new THREE.MeshStandardMaterial({ roughness: 0.75, metalness: 0.05 }));
  o.mesh.userData.orb = o;
  world.add(o.mesh);

  if (!o.isSun) {
    // A line to the sun, shown only while you point at or focus the orb
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    o.line = new THREE.Line(geo, o.rel === 'related'
      ? new THREE.LineDashedMaterial({ dashSize: 0.35, gapSize: 0.3, transparent: true, opacity: 0 })
      : new THREE.LineBasicMaterial({ transparent: true, opacity: 0 }));
    o.lineK = 0;
    world.add(o.line);
  }
  if (o.rel === 'cause' || o.rel === 'effect') {
    o.pulse = makePulse();
    o.pulseEvery = lerp(TUNING.pulses.slowest, TUNING.pulses.fastest, o.relevance);
    o.pulseOffset = Math.random() * o.pulseEvery;
  }
  if (o.lead) {
    o.glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, transparent: true, depthWrite: false, opacity: 0.6 }));
    world.add(o.glow);
  }
  if (!o.isSun && canUnfold(o.id)) {
    o.ring = new THREE.Mesh(RING, new THREE.MeshBasicMaterial({ transparent: true }));
    world.add(o.ring);
  }
  o.label = makeLabel(o);
  paintOrb(o);
  return o;
}

function relationColour(o) {
  return o.rel === 'cause' ? palette.cause : o.rel === 'effect' ? palette.effect : palette.line;
}

function paintOrb(o) {
  o.mesh.material.color.copy(o.isSun ? palette.sun : palette.orb);
  if (o.isSun) o.mesh.material.emissive = palette.sun.clone().multiplyScalar(0.25);
  if (o.line) o.line.material.color.copy(relationColour(o));
  if (o.pulse) for (const s of o.pulse) s.material.color.copy(relationColour(o));
  if (o.glow) o.glow.material.color.copy(palette.glow);
  if (o.ring) o.ring.material.color.copy(palette.line);
}

function removeOrb(o) {
  for (const obj of [o.mesh, o.line, o.glow, o.ring, o.label, ...(o.pulse || [])]) {
    if (!obj) continue;
    world.remove(obj);
    if (obj.material && obj !== o.label) { obj.material.dispose(); streakMaterials.delete(obj.material); }
  }
  o.line?.geometry.dispose();
}

// ─── Showing a system ────────────────────────────────────────
function showSystem(sunId) {
  for (const o of orbs) removeOrb(o);
  hovered = null;
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
      o.mesh.position.lerpVectors(o.start, o.target, t);
    }
  });
  renderTrail();
}

function unfold(id) {
  if (busy || !canUnfold(id)) return;
  const at = trail.indexOf(id);
  trail = at >= 0 ? trail.slice(0, at + 1) : [...trail, id];
  closeFocus();
  const chosen = orbs.find((o) => o.id === id);
  busy = true;
  const from = chosen ? chosen.mesh.position.clone() : new THREE.Vector3();
  // Everything else shrinks away while the chosen orb slides to the centre
  tween(450, (t) => {
    for (const o of orbs) {
      if (o === chosen) o.mesh.position.lerpVectors(from, new THREE.Vector3(), t);
      else o.grow = 1 - t;
    }
  }, () => {
    busy = false;
    world.rotation.y = 0;
    showSystem(id);
  });
}

// ─── Focus panel (click) ─────────────────────────────────────
const $ = (id) => document.getElementById(id);

function relationText(o) {
  const sun = DATA.topics[trail[trail.length - 1]].title;
  if (o.isSun) return 'Centre of this system';
  const verb = { cause: 'Cause of', effect: 'Effect of', related: 'Related to' }[o.rel];
  return `${verb} ${sun}`;
}

function openFocus(o) {
  selected = o;
  const topic = DATA.topics[o.id];
  const rel = $('focus-rel');
  rel.textContent = relationText(o);
  rel.dataset.rel = o.rel || '';
  if (o.lead) {
    const lead = document.createElement('span');
    lead.className = 'lead';
    lead.textContent = ' · Hidden lead';
    rel.append(lead);
  }
  $('focus-title').textContent = topic.title;
  $('focus-liner').textContent = topic.liner;
  $('focus-measures').hidden = o.isSun;
  $('m-link').style.width = o.link * 100 + '%';
  $('m-rel').style.width = o.relevance * 100 + '%';
  $('m-link-v').textContent = Math.round(o.link * 100);
  $('m-rel-v').textContent = Math.round(o.relevance * 100);

  const unfoldBtn = $('unfold');
  if (o.isSun) {
    unfoldBtn.hidden = true;
    $('unfold-note').textContent = '';
  } else {
    unfoldBtn.hidden = false;
    unfoldBtn.disabled = !canUnfold(o.id);
    $('unfold-note').textContent = canUnfold(o.id)
      ? ''
      : 'This sketch only has a few unfoldable topics (the ones with a ring). Every topic will unfold once live search arrives in stage 4.';
  }
  $('focus').hidden = false;
  updateDimming();
}

function closeFocus() {
  selected = null;
  $('focus').hidden = true;
  updateDimming();
}

function updateDimming() {
  for (const o of orbs) {
    o.label.element.classList.toggle('is-dim', Boolean(selected) && o !== selected && !o.isSun);
    o.label.element.classList.toggle('is-selected', o === selected);
  }
}

$('focus-close').addEventListener('click', closeFocus);
$('unfold').addEventListener('click', () => selected && unfold(selected.id));
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeFocus(); });

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

// ─── Hover and click on orbs ─────────────────────────────────
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downAt = null;

function orbUnderPointer(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(orbs.map((o) => o.mesh), false)[0];
  return hit ? hit.object.userData.orb : null;
}

renderer.domElement.addEventListener('pointermove', (e) => {
  const o = orbUnderPointer(e);
  if (o === hovered) return;
  hovered?.label.element.classList.remove('is-hover');
  hovered = o;
  o?.label.element.classList.add('is-hover');
  renderer.domElement.style.cursor = o ? 'pointer' : '';
});
renderer.domElement.addEventListener('pointerdown', (e) => { downAt = [e.clientX, e.clientY]; });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 5) return;
  const o = orbUnderPointer(e);
  if (o) openFocus(o);
  else closeFocus();
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

// ─── Pulses: causes stream in towards the sun, effects stream out ─
const pulseFrom = new THREE.Vector3(), pulseTo = new THREE.Vector3(), dir = new THREE.Vector3();
const tailAt = new THREE.Vector3(), headAt = new THREE.Vector3();
function updatePulse(o, sun, seconds, scale) {
  const P = TUNING.pulses;
  const show = !reduceMotion && o.grow > 0.99 && !busy;
  // Start and end at the surfaces, not the centres
  dir.subVectors(sun.mesh.position, o.mesh.position).normalize();
  const outer = pulseFrom.copy(o.mesh.position).addScaledVector(dir, o.radius * scale * o.swell);
  const inner = pulseTo.copy(sun.mesh.position).addScaledVector(dir, -sun.radius * scale);
  const [a, b] = o.rel === 'cause' ? [outer, inner] : [inner, outer];
  const path = a.distanceTo(b);
  const dimmed = selected && selected !== o ? 0.25 : 1;
  const u = ((seconds + o.pulseOffset) % o.pulseEvery) / P.travel;   // 0→1 while travelling
  for (const streak of o.pulse) {
    const len = Math.min(P.length * streak.userData.length * scale, path * 0.6) / path;
    // The head runs a little past the end so the tail can slide in after it
    const head = u * (1 + len);
    const h = Math.min(head, 1), t = Math.max(head - len, 0);
    streak.visible = show && path > 0.1 && head > 0 && t < 1 && h - t > 0.001;
    if (!streak.visible) continue;
    tailAt.lerpVectors(a, b, t);
    headAt.lerpVectors(a, b, h);
    streak.position.copy(tailAt);
    streak.lookAt(world.localToWorld(headAt.clone()));
    streak.scale.set(1, 1, tailAt.distanceTo(headAt));
    const fade = Math.sin(Math.PI * Math.min(1, head / (1 + len)));
    streak.material.opacity = Math.min(1, fade * streak.userData.strength * P.brightness * dimmed);
  }
}

// ─── Every frame ─────────────────────────────────────────────
const tmp = new THREE.Vector3();
function frame(now) {
  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i];
    const t = Math.min(1, (now - tw.start) / tw.ms);
    tw.step(ease(t));
    if (t >= 1) { tweens.splice(i, 1); tw.done?.(); }
  }
  if (swaying) world.rotation.y = Math.sin(now / 4000) * 0.12;
  controls.update();

  const focusDist = camera.position.distanceTo(controls.target);
  const sun = orbs[0];
  for (const o of orbs) {
    const p = o.mesh.position;
    // Cancel perspective so a far orb isn't drawn smaller just for being far
    const depth = TUNING.keepSizeWithDepth ? camera.position.distanceTo(o.mesh.getWorldPosition(tmp)) / focusDist : 1;
    // Swell smoothly when pointed at
    const swellTo = o === hovered || o === selected ? TUNING.hoverSwell : 1;
    o.swell += (swellTo - o.swell) * (reduceMotion ? 1 : 0.18);
    const r = o.radius * o.grow * depth * o.swell;
    o.mesh.scale.setScalar(Math.max(r, 0.0001));
    o.mesh.visible = o.grow > 0.001;
    o.label.position.copy(p).add(tmp.set(0, -r, 0));
    o.label.element.style.opacity = o.grow < 0.6 ? String(o.grow / 0.6) : '';
    if (o.glow) { o.glow.position.copy(p); o.glow.scale.setScalar(r * 4.2); }
    if (o.ring) { o.ring.position.copy(p); o.ring.scale.setScalar(r); o.ring.quaternion.copy(camera.quaternion); }
    if (o.line) {
      const lineTo = o === hovered || o === selected ? 1 : 0;
      o.lineK += (lineTo - o.lineK) * 0.15;
      o.line.visible = o.lineK > 0.01;
      if (o.line.visible) {
        const a = o.line.geometry.attributes.position;
        a.setXYZ(0, sun.mesh.position.x, sun.mesh.position.y, sun.mesh.position.z);
        a.setXYZ(1, p.x, p.y, p.z);
        a.needsUpdate = true;
        o.line.computeLineDistances();
        o.line.material.opacity = 0.6 * o.lineK * o.grow;
      }
    }
    if (o.pulse) updatePulse(o, sun, now / 1000, depth);
  }
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(frame);
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
resize();
readPalette();
showSystem(DATA.start);
requestAnimationFrame(frame);
