// Fart Together — browser client. Talks to server.js over WebSocket for LAN play,
// or runs the simulation itself for same-keyboard play when no server is around.
(function () {
  'use strict';
  const G = window.FartGame;
  const $ = (id) => document.getElementById(id);
  const canvas = $('c');
  const ctx = canvas.getContext('2d');

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  // ---------- Connection / mode ----------

  let mode = null;          // 'net' | 'local'
  let ws = null, myId = null, joined = false;
  let latest = null, recvAt = 0;
  let localGame = null;
  const localPlayers = [];  // { id, scheme }

  const SCHEMES = [
    { name: 'P1', l: ['KeyA'], r: ['KeyD'], f: ['KeyW', 'Space'], label: '<kbd>A</kbd> <kbd>D</kbd> aim, <kbd>W</kbd>/<kbd>Space</kbd> fart' },
    { name: 'P2', l: ['ArrowLeft'], r: ['ArrowRight'], f: ['ArrowUp'], label: '<kbd>←</kbd> <kbd>→</kbd> aim, <kbd>↑</kbd> fart' },
    { name: 'P3', l: ['KeyJ'], r: ['KeyL'], f: ['KeyI'], label: '<kbd>J</kbd> <kbd>L</kbd> aim, <kbd>I</kbd> fart' },
    { name: 'P4', l: ['Numpad4'], r: ['Numpad6'], f: ['Numpad8'], label: 'numpad <kbd>4</kbd> <kbd>6</kbd> aim, <kbd>8</kbd> fart' },
  ];
  const NET_SCHEME = {
    l: ['KeyA', 'ArrowLeft'], r: ['KeyD', 'ArrowRight'], f: ['Space', 'KeyW', 'ArrowUp'],
  };

  function tryConnect() {
    if (!/^https?:$/.test(location.protocol)) { startLocal(); return; }
    let settled = false;
    const timer = setTimeout(() => { if (!settled) { settled = true; try { ws.close(); } catch { } startLocal(); } }, 2000);
    try {
      ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/');
    } catch { clearTimeout(timer); startLocal(); return; }
    ws.onopen = () => {
      if (settled) return;
      settled = true; clearTimeout(timer);
      mode = 'net';
      setupPanel();
    };
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.t === 'welcome') myId = msg.id;
      if (msg.t === 'state') { latest = msg.s; recvAt = performance.now(); }
    };
    ws.onerror = ws.onclose = () => {
      if (!settled) { settled = true; clearTimeout(timer); startLocal(); return; }
      if (mode === 'net') {
        $('modeNote').textContent = 'Lost connection to the server. Reload to rejoin.';
        $('panel').classList.remove('hidden');
      }
    };
  }

  function send(obj) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj)); }

  function startLocal() {
    mode = 'local';
    localGame = G.createGame((Math.random() * 2 ** 32) >>> 0);
    addLocalPlayer();
    setupPanel();
  }

  function addLocalPlayer() {
    if (localPlayers.length >= SCHEMES.length) return;
    const scheme = SCHEMES[localPlayers.length];
    const id = 'local' + localPlayers.length;
    localPlayers.push({ id, scheme });
    G.addPlayer(localGame, id, scheme.name);
  }

  function removeLocalPlayer() {
    if (localPlayers.length <= 1) return;
    const p = localPlayers.pop();
    G.removePlayer(localGame, p.id);
  }

  // ---------- Panel ----------

  function setupPanel() {
    if (mode === 'net') {
      $('modeNote').innerHTML = 'LAN game on <b>' + location.host + '</b>. Friends on the same Wi-Fi open this same address.';
      $('joinBox').style.display = '';
      $('nameInput').value = store.get('ft-name') || '';
      $('help').innerHTML =
        '<b>Controls:</b> <kbd>A</kbd>/<kbd>D</kbd> or <kbd>←</kbd>/<kbd>→</kbd> swing your bum, ' +
        'hold <kbd>Space</kbd>/<kbd>W</kbd>/<kbd>↑</kbd> to fart. On a phone, use the buttons.<br>' +
        'Your fart pushes the boat <b>away</b> from where your bum points, and from where you sit, so a side seat turns the boat. ' +
        'Fart together for a harmony boost. Eat beans to refill everyone\'s gas.<br>' +
        '<kbd>R</kbd> back to last checkpoint · <kbd>Enter</kbd> start · <kbd>M</kbd> mute · <kbd>Tab</kbd> menu';
    } else {
      $('modeNote').innerHTML = 'Playing on this device (no LAN server found). ' +
        'For LAN play, run <kbd>node server.js</kbd> in the <b>fart-together</b> folder and open the address it prints.';
      $('localBox').style.display = '';
      $('help').innerHTML =
        'Your fart pushes the boat <b>away</b> from where your bum points, and from where you sit, so a side seat turns the boat. ' +
        'Fart together for a harmony boost. Eat beans to refill everyone\'s gas.<br>' +
        '<kbd>R</kbd> back to last checkpoint · <kbd>Enter</kbd> start · <kbd>M</kbd> mute · <kbd>Tab</kbd> menu';
    }
  }

  function join() {
    const name = $('nameInput').value.trim() || 'Farter' + Math.floor(Math.random() * 100);
    store.set('ft-name', name);
    send({ t: 'join', name });
    joined = true;
    $('joinBox').style.display = 'none';
    $('nameInput').blur();
    unlockAudio();
  }

  $('joinBtn').onclick = join;
  $('nameInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') join(); e.stopPropagation(); });
  $('nameInput').addEventListener('keyup', (e) => e.stopPropagation());
  $('addLocalBtn').onclick = () => { addLocalPlayer(); unlockAudio(); };
  $('removeLocalBtn').onclick = removeLocalPlayer;
  $('startBtn').onclick = () => { startRace(); unlockAudio(); };
  $('riverBtn').onclick = newRiver;
  $('hideBtn').onclick = () => togglePanel(false);
  $('showBtn').onclick = () => togglePanel(true);
  let panelOpen = true;
  function togglePanel(open) {
    panelOpen = open;
    $('panel').classList.toggle('hidden', !open);
    $('showBtn').style.display = open ? 'none' : 'block';
  }

  function startRace() {
    if (mode === 'net') send({ t: 'start' });
    else G.startRace(localGame);
  }
  function newRiver() {
    if (mode === 'net') send({ t: 'newriver' });
    else if (localGame.phase === 'lobby') G.setSeed(localGame, (Math.random() * 2 ** 32) >>> 0);
  }
  function respawn() {
    if (mode === 'net') send({ t: 'respawn' });
    else G.respawn(localGame);
  }

  let listKey = '';
  function updatePanel(s) {
    const key = JSON.stringify([s.players.map((p) => [p.id, p.name, p.color, !!p.seat]), s.phase, joined]);
    if (key === listKey) return;
    listKey = key;
    const list = $('playerList');
    list.innerHTML = '';
    s.players.forEach((p) => {
      const li = document.createElement('li');
      const dot = document.createElement('span');
      dot.className = 'dot'; dot.style.background = p.color;
      const name = document.createElement('span');
      name.textContent = p.name + (p.id === myId ? ' (you)' : '');
      const tag = document.createElement('span');
      tag.className = 'tag';
      const local = localPlayers.find((l) => l.id === p.id);
      if (local) tag.innerHTML = local.scheme.label;
      else tag.textContent = p.seat ? '' : 'watching (boat is full)';
      li.append(dot, name, tag);
      list.appendChild(li);
    });
    if (!s.players.length) list.innerHTML = '<li class="tag" style="margin:0">Nobody aboard yet.</li>';
    $('startBtn').textContent = s.phase === 'race' ? 'Restart race' : 'Start race';
    $('startBtn').disabled = s.phase === 'countdown' || !s.players.length;
    $('riverBtn').disabled = s.phase !== 'lobby';
    $('addLocalBtn').disabled = localPlayers.length >= SCHEMES.length;
    $('removeLocalBtn').disabled = localPlayers.length <= 1;
  }

  // ---------- Input ----------

  const down = new Set();
  const touch = { l: false, r: false, f: false };

  addEventListener('keydown', (e) => {
    if (e.code === 'Tab') { e.preventDefault(); togglePanel(!panelOpen); return; }
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    if (e.repeat) return;
    down.add(e.code);
    unlockAudio();
    if (e.code === 'KeyR') respawn();
    if (e.code === 'KeyM') { muted = !muted; if (master) master.gain.value = muted ? 0 : 0.8; }
    if (e.code === 'Enter') { if (mode === 'net' && !joined) join(); else startRace(); }
  });
  addEventListener('keyup', (e) => down.delete(e.code));
  addEventListener('blur', () => down.clear());

  const any = (codes) => codes.some((c) => down.has(c));

  function bindTouch(id, key) {
    const el = $(id);
    const on = (e) => { e.preventDefault(); touch[key] = true; el.classList.add('on'); unlockAudio(); };
    const off = (e) => { e.preventDefault(); touch[key] = false; el.classList.remove('on'); };
    el.addEventListener('pointerdown', on);
    el.addEventListener('pointerup', off);
    el.addEventListener('pointercancel', off);
    el.addEventListener('pointerleave', off);
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  bindTouch('tLeft', 'l'); bindTouch('tRight', 'r'); bindTouch('tFart', 'f');
  if (matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) document.body.classList.add('touch');
  addEventListener('touchstart', () => document.body.classList.add('touch'), { once: true, passive: true });

  let sentInput = '';
  function pollInput() {
    if (mode === 'net') {
      if (!joined) return;
      const inp = {
        l: any(NET_SCHEME.l) || touch.l,
        r: any(NET_SCHEME.r) || touch.r,
        f: any(NET_SCHEME.f) || touch.f,
      };
      const key = '' + +inp.l + +inp.r + +inp.f;
      if (key !== sentInput) { sentInput = key; send(Object.assign({ t: 'input' }, inp)); }
    } else if (mode === 'local') {
      localPlayers.forEach((lp, i) => {
        const s = lp.scheme, t = i === 0 ? touch : {};
        G.setInput(localGame, lp.id, { l: any(s.l) || t.l, r: any(s.r) || t.r, f: any(s.f) || t.f });
      });
    }
  }

  // ---------- Audio: synthesised farts ----------

  let ac = null, master = null, noiseBuf = null, muted = false;
  function unlockAudio() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ac = new AC();
    master = ac.createGain();
    master.gain.value = muted ? 0 : 0.8;
    const comp = ac.createDynamicsCompressor();
    master.connect(comp).connect(ac.destination);
    noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }

  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; }

  const voices = new Map();
  function fartOn(p) {
    if (!ac || voices.has(p.id)) return;
    const t = ac.currentTime;
    const pitch = 55 + (hashStr(p.id) % 70);
    const rate = 14 + Math.random() * 16;
    const osc = ac.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(pitch * 1.25, t);
    osc.frequency.exponentialRampToValueAtTime(pitch, t + 0.15);
    osc.frequency.linearRampToValueAtTime(pitch * 0.75, t + 3);
    const lfo = ac.createOscillator();
    lfo.frequency.value = rate;
    const lfoGain = ac.createGain();
    lfoGain.gain.value = pitch * 0.4;
    lfo.connect(lfoGain).connect(osc.frequency);
    const noise = ac.createBufferSource();
    noise.buffer = noiseBuf; noise.loop = true;
    const nf = ac.createBiquadFilter();
    nf.type = 'bandpass'; nf.frequency.value = pitch * 4; nf.Q.value = 1.5;
    const ng = ac.createGain(); ng.gain.value = 0.6;
    noise.connect(nf).connect(ng);
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 650; lp.Q.value = 6;
    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.32, t + 0.03);
    const am = ac.createOscillator();
    am.frequency.value = rate * 0.5;
    const amGain = ac.createGain(); amGain.gain.value = 0.14;
    am.connect(amGain).connect(g.gain);
    osc.connect(lp); ng.connect(lp); lp.connect(g).connect(master);
    [osc, lfo, noise, am].forEach((n) => n.start(t));
    voices.set(p.id, { g, nodes: [osc, lfo, noise, am] });
  }
  function fartOff(id) {
    const v = voices.get(id);
    if (!v) return;
    voices.delete(id);
    const t = ac.currentTime;
    v.g.gain.cancelScheduledValues(t);
    v.g.gain.setTargetAtTime(0, t, 0.05);
    v.nodes.forEach((n) => n.stop(t + 0.4));
  }

  function blip(freqs, type = 'square', dur = 0.12, vol = 0.15) {
    if (!ac) return;
    let t = ac.currentTime;
    freqs.forEach((f) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g).connect(master); o.start(t); o.stop(t + dur);
      t += dur * 0.8;
    });
  }
  function thud() {
    if (!ac) return;
    const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.2);
    g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    o.connect(g).connect(master); o.start(t); o.stop(t + 0.3);
  }

  // ---------- World state on this client ----------

  let course = null;
  let particles = [];
  let prev = null;
  const disp = { x: 0, y: 0, a: 0, init: false };
  const cam = { x: 0, y: 0, init: false };
  const rockShapes = [];

  function setCourse(seed) {
    course = G.createCourse(seed);
    particles = [];
    rockShapes.length = 0;
    course.rocks.forEach((r, i) => {
      const pts = [], n = 9;
      let h = hashStr(seed + ':' + i);
      for (let k = 0; k < n; k++) {
        h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
        const j = 0.82 + (h % 1000) / 1000 * 0.3;
        const ang = (k / n) * Math.PI * 2;
        pts.push([Math.cos(ang) * r.r * j, Math.sin(ang) * r.r * j]);
      }
      rockShapes.push(pts);
    });
    disp.init = false; cam.init = false;
  }

  function currentState() {
    if (mode === 'local') return G.snapshot(localGame);
    if (!latest) return null;
    const s = latest;
    const dt = Math.min(0.1, (performance.now() - recvAt) / 1000);
    const b = s.boat;
    return Object.assign({}, s, { boat: Object.assign({}, b, { x: b.x + b.vx * dt, y: b.y + b.vy * dt, a: b.a + b.w * dt }) });
  }

  function handleEvents(s) {
    if (!prev) { prev = s; return; }
    if (s.bumps > prev.bumps) thud();
    if (s.beansEaten > prev.beansEaten) blip([660, 880, 1320], 'triangle', 0.09, 0.18);
    if (s.phase === 'countdown') {
      const a = Math.floor(prev.phase === 'countdown' ? prev.phaseTime : -1), b = Math.floor(s.phaseTime);
      if (b > a) blip([440], 'square', 0.15, 0.12);
    }
    if (s.phase === 'countdown' && prev.phase !== 'countdown' && (joined || mode === 'local')) togglePanel(false);
    if (s.phase === 'lobby' && prev.phase === 'finished') togglePanel(true);
    if (s.phase === 'race' && prev.phase === 'countdown') blip([880], 'square', 0.35, 0.15);
    if (s.phase === 'finished' && prev.phase === 'race') blip([523, 659, 784, 1047, 784, 1047], 'square', 0.13, 0.14);
    if (s.checkpoint < prev.checkpoint && s.phase !== 'lobby') blip([700, 1000], 'triangle', 0.1, 0.12);

    const ids = new Set();
    s.players.forEach((p) => {
      ids.add(p.id);
      if (p.farting) fartOn(p); else fartOff(p.id);
    });
    for (const id of [...voices.keys()]) if (!ids.has(id)) fartOff(id);
    prev = s;
  }

  // ---------- Rendering ----------

  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
  }
  addEventListener('resize', resize);
  resize();

  function seatWorld(b, seat) {
    const ux = Math.cos(b.a), uy = Math.sin(b.a);
    return { x: b.x + ux * seat.f - uy * seat.r, y: b.y + uy * seat.f + ux * seat.r };
  }
  function gasDir(b, aim) {
    const ux = Math.cos(b.a), uy = Math.sin(b.a);
    return { x: ux * Math.cos(aim) - uy * Math.sin(aim), y: uy * Math.cos(aim) + ux * Math.sin(aim) };
  }

  function emit(s, b, dt) {
    const farters = s.players.filter((p) => p.farting && p.seat).length;
    s.players.forEach((p) => {
      if (!p.seat || !p.farting) return;
      const sp = seatWorld(b, p.seat), gd = gasDir(b, p.aim);
      const n = Math.random() < 0.6 * (1 + farters * 0.3) ? 2 : 1;
      for (let i = 0; i < n; i++) {
        const spread = (Math.random() - 0.5) * 0.7;
        const dx = gd.x * Math.cos(spread) - gd.y * Math.sin(spread);
        const dy = gd.y * Math.cos(spread) + gd.x * Math.sin(spread);
        const speed = 90 + Math.random() * 80;
        particles.push({
          x: sp.x + gd.x * 10, y: sp.y + gd.y * 10,
          vx: dx * speed + b.vx * 0.3, vy: dy * speed + b.vy * 0.3,
          life: 0, max: 0.8 + Math.random() * 0.7,
          r: 4 + Math.random() * 4,
          hue: Math.random() < 0.7 ? 75 + Math.random() * 25 : 35 + Math.random() * 10,
        });
      }
    });
    const speed = Math.hypot(b.vx, b.vy);
    if (speed > 60 && Math.random() < 0.6) {
      const ux = Math.cos(b.a), uy = Math.sin(b.a), side = Math.random() < 0.5 ? -1 : 1;
      particles.push({
        x: b.x - ux * 30 - uy * side * 16, y: b.y - uy * 30 + ux * side * 16,
        vx: -uy * side * 20, vy: ux * side * 20, life: 0, max: 1.2, r: 2 + Math.random() * 2, wake: true,
      });
    }
    for (const p of particles) {
      p.life += dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vx *= 1 - 1.8 * dt; p.vy *= 1 - 1.8 * dt;
      if (!p.wake && course) p.vy += course.current(p.y) * 0.5 * dt;
    }
    particles = particles.filter((p) => p.life < p.max);
    if (particles.length > 1500) particles.splice(0, particles.length - 1500);
  }

  function fmtTime(t) {
    if (t == null) return '–';
    const m = Math.floor(t / 60), sec = t - m * 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec.toFixed(2);
  }

  function hash2(x, y) { let h = Math.imul(x, 374761393) + Math.imul(y, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }

  function drawWorld(s, b, z, time) {
    const halfW = W / 2 / z, halfH = H / 2 / z;
    const x0 = cam.x - halfW - 60, x1 = cam.x + halfW + 60;
    const y0 = cam.y - halfH - 60, y1 = cam.y + halfH + 60;

    // grass + tufts
    ctx.fillStyle = '#5a9e4b';
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.fillStyle = '#4c8c3f';
    const cell = 70;
    for (let gy = Math.floor(y0 / cell); gy <= Math.ceil(y1 / cell); gy++) {
      for (let gx = Math.floor(x0 / cell); gx <= Math.ceil(x1 / cell); gx++) {
        const r = hash2(gx, gy);
        if (r < 0.5) continue;
        const px = gx * cell + hash2(gy, gx) * cell, py = gy * cell + r * cell;
        ctx.beginPath(); ctx.ellipse(px, py, 8 + r * 10, 4 + r * 4, 0, 0, Math.PI * 2); ctx.fill();
      }
    }

    // river
    const ya = Math.max(y0, course.top), yb = Math.min(y1, course.bottom);
    if (yb > ya) {
      const step = 14;
      const left = [], right = [];
      for (let y = ya; y <= yb + step; y += step) {
        const yy = Math.min(y, yb), m = course.centerX(yy), hw = course.halfWidth(yy);
        left.push([m - hw, yy]); right.push([m + hw, yy]);
      }
      ctx.beginPath();
      left.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i][0], right[i][1]);
      ctx.closePath();
      ctx.fillStyle = '#3d8fd1';
      ctx.fill();

      // banks
      ctx.lineJoin = 'round';
      for (const side of [left, right]) {
        ctx.beginPath();
        side.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.strokeStyle = '#e8d49a'; ctx.lineWidth = 14; ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3; ctx.stroke();
      }

      // current streaks drifting downstream
      ctx.strokeStyle = 'rgba(255,255,255,.22)';
      ctx.lineWidth = 2.5; ctx.lineCap = 'round';
      const gap = 56;
      for (let row = Math.floor(ya / gap) - 1; row <= Math.ceil(yb / gap); row++) {
        const baseY = row * gap;
        const cur = course.current(baseY);
        const off = (time * cur) % gap;
        const y = baseY + off;
        if (y < ya || y > yb) continue;
        const m = course.centerX(y), hw = course.halfWidth(y);
        for (let k = 0; k < 5; k++) {
          const f = (k + 0.2 + hash2(row, k) * 0.6) / 5;
          const x = m - hw + 20 + f * (hw * 2 - 40);
          const len = 6 + cur * 0.25;
          ctx.beginPath(); ctx.moveTo(x, y - len); ctx.lineTo(x, y + len); ctx.stroke();
        }
      }
    }

    // dock at the bottom, wall at the top
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(x0, course.bottom, x1 - x0, 60);
    ctx.fillStyle = '#6e4420';
    for (let x = Math.floor(x0 / 30) * 30; x < x1; x += 30) ctx.fillRect(x, course.bottom, 3, 60);
    ctx.fillStyle = '#7d7f86';
    ctx.fillRect(x0, course.top - 60, x1 - x0, 60);

    // start line
    const sm = course.centerX(0), shw = course.halfWidth(0);
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4; ctx.setLineDash([12, 10]);
    ctx.beginPath(); ctx.moveTo(sm - shw, 0); ctx.lineTo(sm + shw, 0); ctx.stroke();
    ctx.setLineDash([]);

    // finish line: checkerboard
    const fy = -course.length, fm = course.centerX(fy), fhw = course.halfWidth(fy);
    const sq = 16;
    for (let i = 0; i * sq < fhw * 2; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.fillStyle = (i + j) % 2 ? '#111' : '#fff';
        ctx.fillRect(fm - fhw + i * sq, fy - sq + j * sq, Math.min(sq, fhw * 2 - i * sq), sq);
      }
    }
    ctx.fillStyle = '#fff8e7'; ctx.font = 'bold 28px Trebuchet MS, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('FINISH', fm, fy - 30);

    // checkpoint buoys
    for (const cy of course.checkpoints) {
      if (cy < y0 - 40 || cy > y1 + 40) continue;
      const m = course.centerX(cy), hw = course.halfWidth(cy);
      const got = s.checkpoint <= cy;
      for (const bx of [m - hw + 14, m + hw - 14]) {
        ctx.beginPath(); ctx.arc(bx, cy + Math.sin(time * 2 + bx) * 2, 9, 0, Math.PI * 2);
        ctx.fillStyle = got ? '#7bd389' : '#ff8c42'; ctx.fill();
        ctx.lineWidth = 2.5; ctx.strokeStyle = '#2b1d0e'; ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 2; ctx.setLineDash([4, 10]);
      ctx.beginPath(); ctx.moveTo(m - hw + 24, cy); ctx.lineTo(m + hw - 24, cy); ctx.stroke(); ctx.setLineDash([]);
    }

    // whirlpools
    for (const w of course.whirlpools) {
      if (w.y < y0 - w.r || w.y > y1 + w.r) continue;
      ctx.save(); ctx.translate(w.x, w.y); ctx.rotate(time * 1.6 * w.dir);
      for (let k = 0; k < 4; k++) {
        ctx.beginPath();
        const rr = w.r * (0.25 + k * 0.2);
        ctx.arc(0, 0, rr, k * 1.4, k * 1.4 + Math.PI * 1.2);
        ctx.strokeStyle = `rgba(255,255,255,${0.35 - k * 0.06})`; ctx.lineWidth = 4 - k * 0.6; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); ctx.fillStyle = '#25618f'; ctx.fill();
      ctx.restore();
    }

    // rocks
    course.rocks.forEach((r, i) => {
      if (r.y < y0 - r.r || r.y > y1 + r.r) return;
      const pts = rockShapes[i];
      ctx.save(); ctx.translate(r.x, r.y);
      ctx.beginPath(); ctx.ellipse(0, 4, r.r * 1.1, r.r * 0.95, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fill();
      ctx.beginPath(); pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
      ctx.fillStyle = '#7d7f86'; ctx.fill();
      ctx.lineWidth = 3; ctx.strokeStyle = '#3f4045'; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(-r.r * 0.25, -r.r * 0.3, r.r * 0.35, r.r * 0.2, -0.5, 0, Math.PI * 2);
      ctx.fillStyle = '#a3a6ad'; ctx.fill();
      ctx.restore();
    });

    // beans
    course.beans.forEach((bean, i) => {
      if (s.taken.includes(i) || bean.y < y0 - 30 || bean.y > y1 + 30) return;
      const bob = Math.sin(time * 3 + i) * 3;
      ctx.save(); ctx.translate(bean.x, bean.y + bob);
      ctx.beginPath(); ctx.arc(0, 0, 20 + Math.sin(time * 5 + i) * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,230,120,.35)'; ctx.fill();
      for (let k = 0; k < 3; k++) {
        ctx.save(); ctx.rotate(k * 2.1 + time * 0.5); ctx.translate(7, 0);
        ctx.beginPath(); ctx.ellipse(0, 0, 7, 4.5, 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#8a4b1f'; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = '#4a2408'; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(-1.5, -1.5, 2.5, 1.2, 0.4, 0, Math.PI * 2); ctx.fillStyle = '#c47a45'; ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    });

    // particles (wake under the boat, gas clouds too)
    for (const p of particles) {
      const k = p.life / p.max;
      ctx.beginPath();
      if (p.wake) {
        ctx.arc(p.x, p.y, p.r * (1 + k * 2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.5 * (1 - k)})`;
      } else {
        ctx.arc(p.x, p.y, p.r * (1 + k * 3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 55%, 45%, ${0.55 * (1 - k)})`;
      }
      ctx.fill();
    }

    drawBoat(s, b, time);
  }

  function drawBoat(s, b, time) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.a);
    // shadow
    ctx.beginPath(); ctx.ellipse(2, 5, 42, 24, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,30,60,.25)'; ctx.fill();
    // hull
    const hull = () => {
      ctx.beginPath();
      ctx.moveTo(44, 0);
      ctx.quadraticCurveTo(30, -24, -10, -23);
      ctx.lineTo(-34, -21);
      ctx.quadraticCurveTo(-40, 0, -34, 21);
      ctx.lineTo(-10, 23);
      ctx.quadraticCurveTo(30, 24, 44, 0);
      ctx.closePath();
    };
    hull(); ctx.fillStyle = '#8b5a2b'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#2b1d0e'; ctx.stroke();
    ctx.save(); hull(); ctx.clip();
    ctx.fillStyle = '#c48a4a'; ctx.fillRect(-32, -17, 70, 34);
    ctx.strokeStyle = '#a06a35'; ctx.lineWidth = 1.5;
    for (let y = -12; y <= 12; y += 6) { ctx.beginPath(); ctx.moveTo(-34, y); ctx.lineTo(40, y); ctx.stroke(); }
    ctx.restore();

    // players on their seats
    s.players.forEach((p) => {
      if (!p.seat) return;
      ctx.save();
      ctx.translate(p.seat.f, p.seat.r);
      const wob = p.farting ? 1 + Math.sin(time * 40) * 0.08 : 1;
      // bum, pointing where the gas goes
      ctx.save();
      ctx.rotate(p.aim);
      ctx.translate(7, 0);
      ctx.fillStyle = shade(p.color, -0.25);
      ctx.strokeStyle = '#2b1d0e'; ctx.lineWidth = 1.5;
      for (const side of [-1, 1]) {
        ctx.beginPath(); ctx.arc(0, side * 3.6, 4.6 * wob, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      ctx.restore();
      // body
      ctx.beginPath(); ctx.arc(0, 0, 9.5 * wob, 0, Math.PI * 2);
      ctx.fillStyle = p.tanked ? '#9a9a9a' : p.color; ctx.fill();
      ctx.lineWidth = p.id === myId ? 3 : 2; ctx.strokeStyle = p.id === myId ? '#fff' : '#2b1d0e'; ctx.stroke();
      // face looks the opposite way from the bum
      ctx.save();
      ctx.rotate(p.aim + Math.PI);
      ctx.fillStyle = '#fff';
      for (const side of [-1, 1]) {
        ctx.beginPath(); ctx.arc(3.5, side * 3.4, 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#111';
        if (p.tanked) {
          ctx.fillRect(2.5, side * 3.4 - 0.6, 2.4, 1.2);
        } else {
          ctx.beginPath(); ctx.arc(4.4, side * 3.4, 1.2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#fff';
      }
      if (p.farting) { ctx.beginPath(); ctx.arc(7, 0, 1.8, 0, Math.PI * 2); ctx.fillStyle = '#2b1d0e'; ctx.fill(); }
      ctx.restore();
      ctx.restore();
    });
    ctx.restore();

    // name tags stay upright, pushed out to the side each player sits on
    ctx.font = 'bold 11px Trebuchet MS, sans-serif';
    s.players.forEach((p) => {
      if (!p.seat) return;
      const side = Math.sign(p.seat.r);
      const w = seatWorld(b, { f: p.seat.f, r: p.seat.r + side * 26 });
      const sx = side ? Math.sign(-Math.sin(b.a) * side) || side : 0;
      ctx.textAlign = sx > 0 ? 'left' : sx < 0 ? 'right' : 'center';
      const ty = side ? w.y + 4 : w.y - 15;
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(43,29,14,.8)';
      ctx.strokeText(p.name, w.x, ty);
      ctx.fillStyle = '#fff'; ctx.fillText(p.name, w.x, ty);
    });
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const f = (c) => Math.max(0, Math.min(255, Math.round(c + c * amt)));
    return 'rgb(' + f(n >> 16) + ',' + f((n >> 8) & 255) + ',' + f(n & 255) + ')';
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function bigText(text, y, size, color) {
    ctx.font = `bold ${size}px Trebuchet MS, sans-serif`; ctx.textAlign = 'center';
    ctx.lineWidth = size / 6; ctx.strokeStyle = '#2b1d0e'; ctx.lineJoin = 'round';
    ctx.strokeText(text, W / 2, y);
    ctx.fillStyle = color; ctx.fillText(text, W / 2, y);
  }

  function drawHud(s, b) {
    const small = W < 560;
    // timer
    let label;
    if (s.phase === 'race') label = fmtTime(s.raceTime);
    else if (s.phase === 'countdown') label = 'Get ready…';
    else if (s.phase === 'finished') label = fmtTime(s.last);
    else label = 'Practice';
    const topY = 34;
    bigText(label, topY, small ? 24 : 30, '#fff8e7');
    if (s.best != null) {
      ctx.font = 'bold 13px Trebuchet MS, sans-serif'; ctx.fillStyle = '#fff8e7';
      ctx.fillText('best ' + fmtTime(s.best), W / 2, topY + 20);
    }

    // progress bar on the right
    const bx = W - 22, by = 70, bh = Math.min(H - 220, 360);
    roundRect(bx - 6, by, 12, bh, 6); ctx.fillStyle = 'rgba(43,29,14,.35)'; ctx.fill();
    const prog = Math.max(0, Math.min(1, -b.y / course.length));
    for (const cy of course.checkpoints) {
      const yy = by + bh * (1 - -cy / course.length);
      ctx.fillStyle = s.checkpoint <= cy ? '#7bd389' : '#ff8c42'; ctx.fillRect(bx - 8, yy - 1.5, 16, 3);
    }
    ctx.fillStyle = '#111'; ctx.fillRect(bx - 8, by - 4, 16, 4);
    ctx.beginPath(); ctx.arc(bx, by + bh * (1 - prog), 8, 0, Math.PI * 2);
    ctx.fillStyle = '#c48a4a'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = '#2b1d0e'; ctx.stroke();

    // gas meters
    const seated = s.players.filter((p) => p.seat);
    const mw = small ? Math.min(140, (W - 40) / Math.max(1, seated.length) - 8) : 150;
    const totalW = seated.length * (mw + 10) - 10;
    const my = H - (document.body.classList.contains('touch') ? 140 : 48);
    seated.forEach((p, i) => {
      const x = W / 2 - totalW / 2 + i * (mw + 10);
      roundRect(x, my, mw, 30, 8); ctx.fillStyle = 'rgba(255,248,231,.92)'; ctx.fill();
      ctx.lineWidth = p.id === myId ? 3 : 2; ctx.strokeStyle = '#2b1d0e'; ctx.stroke();
      roundRect(x + 5, my + 18, (mw - 10) * p.gas / 100, 7, 3.5);
      ctx.fillStyle = p.tanked ? '#b0a090' : p.farting ? '#9bc53d' : p.color; ctx.fill();
      ctx.font = 'bold 11px Trebuchet MS, sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#2b1d0e';
      ctx.fillText(p.name, x + 7, my + 13);
      ctx.textAlign = 'right';
      ctx.fillStyle = p.tanked ? '#b23a48' : '#8a7a63';
      ctx.fillText(p.tanked ? 'EMPTY' : p.farting ? 'PFFT' : '', x + mw - 7, my + 13);
    });

    const farters = seated.filter((p) => p.farting).length;
    if (farters >= 2) {
      ctx.save();
      ctx.translate(W / 2, my - 22);
      ctx.rotate(Math.sin(performance.now() / 90) * 0.05);
      ctx.font = 'bold 20px Trebuchet MS, sans-serif'; ctx.textAlign = 'center';
      ctx.lineWidth = 4; ctx.strokeStyle = '#2b1d0e';
      const t = (farters === 4 ? 'FULL BRASS SECTION' : 'HARMONY') + ' x' + (1 + 0.15 * (farters - 1)).toFixed(2);
      ctx.strokeText(t, 0, 0); ctx.fillStyle = '#ffd23f'; ctx.fillText(t, 0, 0);
      ctx.restore();
    }

    if (s.phase === 'countdown') {
      const n = 3 - Math.floor(s.phaseTime);
      bigText(n > 0 ? String(n) : 'GO!', H / 2 - 40, 96, '#ffd23f');
    }
    if (s.phase === 'race' && s.phaseTime < 1) bigText('PFFFT!', H / 2 - 40, 80, '#9bc53d');
    if (s.phase === 'finished') {
      bigText('YOU MADE IT!', H / 2 - 70, small ? 40 : 60, '#ffd23f');
      bigText(fmtTime(s.last) + (s.last === s.best ? '  new best!' : ''), H / 2 - 20, 30, '#fff8e7');
    }
    if (mode === 'net' && !joined && !panelOpen) bigText('Open the menu to join', H / 2, 26, '#fff8e7');
    if (!s.players.length) bigText('Nobody aboard', H / 2, 26, '#fff8e7');
  }

  // ---------- Main loop ----------

  let lastFrame = performance.now(), acc = 0;
  function frame(now) {
    const dt = Math.min(0.1, (now - lastFrame) / 1000);
    lastFrame = now;
    pollInput();
    if (mode === 'local') {
      acc += dt;
      while (acc >= 1 / 60) { G.step(localGame, 1 / 60); acc -= 1 / 60; }
    }
    const s = currentState();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (!s) {
      ctx.fillStyle = '#4f8f42'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(frame);
      return;
    }
    if (!course || course.seed !== s.seed) setCourse(s.seed);
    handleEvents(s);
    updatePanel(s);

    // smooth out network jitter, snap on teleports
    const b = s.boat;
    if (!disp.init || Math.hypot(b.x - disp.x, b.y - disp.y) > 150) { disp.x = b.x; disp.y = b.y; disp.a = b.a; disp.init = true; }
    const k = mode === 'net' ? 0.5 : 1;
    disp.x += (b.x - disp.x) * k; disp.y += (b.y - disp.y) * k; disp.a += (b.a - disp.a) * k;
    const db = Object.assign({}, b, { x: disp.x, y: disp.y, a: disp.a });

    emit(s, db, dt);

    const tx = db.x + b.vx * 0.35, ty = db.y + b.vy * 0.35 - 60;
    if (!cam.init) { cam.x = tx; cam.y = ty; cam.init = true; }
    cam.x += (tx - cam.x) * Math.min(1, dt * 4);
    cam.y += (ty - cam.y) * Math.min(1, dt * 4);
    const z = Math.max(0.6, Math.min(1.8, Math.sqrt(W * H) / 700));

    ctx.setTransform(DPR * z, 0, 0, DPR * z, DPR * (W / 2 - cam.x * z), DPR * (H / 2 - cam.y * z));
    drawWorld(s, db, z, now / 1000);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    drawHud(s, db);
    requestAnimationFrame(frame);
  }

  tryConnect();
  requestAnimationFrame(frame);
})();
