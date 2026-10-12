// ─────────────────────────────────────────────────────────────
// CELESTIAL · stage 1 sketch
// Draws one topic as a 3D solar system and lets you move through it.
// The content lives in data.js; this file only decides how it looks
// and behaves.
// ─────────────────────────────────────────────────────────────
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

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
  // Height bands, in degrees above (+) or below (−) the sun
  bands: { cause: [-72, -22], effect: [22, 66], related: [-16, 16] },
  breathingRoom: 1.0,     // minimum gap between orbs
  widen: 2.4,             // most a system may stretch sideways to fill a wide screen
  pulses: {
    slowest: 6.0,         // seconds between pulses for the least relevant orb
    fastest: 2.2,         // seconds between pulses for the most relevant orb
    travel: 1.5,          // seconds a pulse takes to cross
    size: 0.85,
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
// Distance from the sun comes from "link"; up/down comes from "rel".
function layout(links) {
  const groups = { cause: [], effect: [], related: [] };
  for (const l of links) groups[l.rel].push(l);
  const golden = Math.PI * (3 - Math.sqrt(5));   // spreads orbs evenly around
  const turn = { cause: 0.3, effect: 1.4, related: 2.6 };
  const placed = [];
  for (const [rel, list] of Object.entries(groups)) {
    const [lo, hi] = TUNING.bands[rel];
    list.sort((a, b) => b.relevance - a.relevance);
    list.forEach((l, i) => {
      const step = list.length > 1 ? (i * 0.618) % 1 : 0.5;
      const elevation = THREE.MathUtils.degToRad(lerp(lo, hi, step));
      const around = turn[rel] + i * golden;
      const r = orbitOf(l);
      placed.push({
        ...l,
        target: new THREE.Vector3(
          r * Math.cos(elevation) * Math.cos(around),
          r * Math.sin(elevation),
          r * Math.cos(elevation) * Math.sin(around),
        ),
      });
    });
  }
  spreadOut(placed);
  // Stretch sideways until the system's shape matches the screen's shape
  const usable = stage.clientWidth / Math.max(stage.clientHeight - UI_TOP - UI_BOTTOM, 1);
  const wide = Math.max(...placed.map((p) => Math.abs(p.target.x)), 1);
  const tall = Math.max(...placed.map((p) => Math.abs(p.target.y)), 1);
  const widen = THREE.MathUtils.clamp((tall * usable) / wide * 0.92, 1, TUNING.widen);
  for (const p of placed) { p.target.x *= widen; p.target.z *= widen; }
  return placed;
}

// Nudge orbs apart where they crowd each other as seen from the
// starting camera angle, and keep them from hiding behind the sun.
// Each orb keeps its distance from the sun, so distance still means "link".
function spreadOut(placed) {
  const clearOfSun = TUNING.sunSize + 2.6;
  const deg = THREE.MathUtils.degToRad;
  // Put an orb back at its distance from the sun, inside its height band
  // (so causes always stay below and effects above)
  const fit = (l) => {
    const p = l.target, r = orbitOf(l);
    const [lo, hi] = TUNING.bands[l.rel];
    const el = THREE.MathUtils.clamp(Math.asin(THREE.MathUtils.clamp(p.y / r, -1, 1)), deg(lo), deg(hi));
    p.y = r * Math.sin(el);
    const h = r * Math.cos(el);
    if (Math.abs(p.x) > h) p.x = Math.sign(p.x) * h;
    p.z = Math.sign(p.z || 1) * Math.sqrt(Math.max(0, h * h - p.x * p.x));
  };
  for (let pass = 0; pass < 80; pass++) {
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
      const flat = Math.hypot(a.x, a.y);
      if (flat < clearOfSun) {
        const k = clearOfSun / (flat || 0.01);
        a.x = (a.x || 0.01) * k; a.y *= k;
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
  el.className = 'orb-label ' + size;
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

function makePulse() {
  // A pulse is a bright head with a short fading tail
  return [1, 0.55, 0.3].map((strength) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, transparent: true, depthWrite: false }));
    s.userData.strength = strength;
    world.add(s);
    return s;
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
    if (obj.material && obj !== o.label) obj.material.dispose();
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

// ─── Pulses: causes fire in towards the sun, effects fire out ─
const pulseFrom = new THREE.Vector3(), pulseTo = new THREE.Vector3(), dir = new THREE.Vector3();
function updatePulse(o, sun, seconds, scale) {
  const P = TUNING.pulses;
  const show = !reduceMotion && o.grow > 0.99 && !busy;
  const u = ((seconds + o.pulseOffset) % o.pulseEvery) / P.travel;   // 0→1 while travelling
  // Start and end at the surfaces, not the centres
  dir.subVectors(sun.mesh.position, o.mesh.position).normalize();
  const outer = pulseFrom.copy(o.mesh.position).addScaledVector(dir, o.radius * scale * o.swell);
  const inner = pulseTo.copy(sun.mesh.position).addScaledVector(dir, -sun.radius * scale);
  const [a, b] = o.rel === 'cause' ? [outer, inner] : [inner, outer];
  const dimmed = selected && selected !== o ? 0.25 : 1;
  o.pulse.forEach((s, k) => {
    const t = u - k * 0.045;
    s.visible = show && t > 0 && t < 1;
    if (!s.visible) return;
    s.position.lerpVectors(a, b, t);
    s.material.opacity = Math.min(1, Math.sin(Math.PI * t) * s.userData.strength * P.brightness * dimmed);
    s.scale.setScalar(P.size * scale * (0.6 + 0.4 * s.userData.strength));
  });
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
