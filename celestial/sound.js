// ─────────────────────────────────────────────────────────────
// SOUND · a soundtrack generated in the browser, with no audio files.
//
// Everything is synthesised with the Web Audio API:
//   drone  – a slow chord under everything, set by the theme
//            (Tide: open fifths on A; Dusk: a soft D minor)
//   bells  – one note per orb as it appears. Causes ring in the low
//            octave, related topics in the middle, effects up high.
//            A stronger link picks a note nearer the home note, and a
//            more relevant orb rings louder
//   pairs  – a line between two orbs plays both their notes together
//   marks  – a tick rises and resolves, a cross falls away
// Browsers only allow sound after a click or key press, so it starts
// off and nothing plays until you switch it on.
// ─────────────────────────────────────────────────────────────
(() => {
  // Notes as semitones above the theme's home note (MIDI numbering)
  const SCALES = {
    tide: { home: 57, steps: [0, 2, 4, 7, 9], drone: [-24, -17, -12, -5] },   // A major pentatonic; drone A1 E2 A2 E3
    dusk: { home: 62, steps: [0, 3, 5, 7, 10], drone: [-24, -12, -9, -5] },   // D minor pentatonic; drone D2 D3 F3 A3
  };
  const OCTAVE = { cause: 0, related: 12, effect: 24 };
  const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
  const gentle = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cfg = { on: false, volume: 0.6, music: true, bells: true, cues: true, theme: 'tide' };
  let ctx = null, master = null, bus = null, droneOut = null, drone = null, droneTheme = '';
  let nextFree = 0;   // bells queue behind each other so a whole map doesn't land at once

  // ─── The mixing desk ─────────────────────────────────────────
  // voices → bus → dry and a generated reverb → master → limiter → speakers
  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -14;
    limiter.ratio.value = 6;
    master.connect(limiter).connect(ctx.destination);
    bus = ctx.createGain();
    bus.connect(master);
    const room = ctx.createConvolver();
    room.buffer = impulse(3.4);
    const wet = ctx.createGain();
    wet.gain.value = 0.55;
    bus.connect(room).connect(wet).connect(master);
    droneOut = ctx.createGain();
    droneOut.gain.value = 0;
    droneOut.connect(bus);
    // An earlier "no" from the browser clears on the next click or key
    for (const type of ['pointerdown', 'keydown']) addEventListener(type, wake, true);
    document.addEventListener('visibilitychange', wake);
    return true;
  }
  // A reverb tail made of noise that dies away, slightly different per ear
  function impulse(seconds) {
    const len = Math.floor(ctx.sampleRate * seconds), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    return buf;
  }

  // Fade the whole soundtrack in or out; pause the engine when silent or hidden
  function wake() {
    if (!ctx) return;
    const audible = cfg.on && !document.hidden;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(audible ? cfg.volume * cfg.volume : 0, now, audible ? 0.4 : 0.15);
    if (audible && ctx.state !== 'running') ctx.resume().catch(() => {});
    if (!audible && ctx.state === 'running') {
      clearTimeout(wake.t);
      wake.t = setTimeout(() => { if (!(cfg.on && !document.hidden)) ctx.suspend().catch(() => {}); }, 900);
    }
  }

  // ─── Drone ───────────────────────────────────────────────────
  // Each note is two slightly detuned voices that swell slowly at their own
  // pace, all through one soft filter that opens and closes over a minute.
  function startDrone(theme) {
    const s = SCALES[theme] || SCALES.tide, now = ctx.currentTime;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    filter.Q.value = 0.4;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(1, now + 4);
    filter.connect(out).connect(droneOut);
    const nodes = [];
    const lfo = (rate, depth, param) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = rate;
      g.gain.value = depth;
      o.connect(g).connect(param);
      o.start(now);
      nodes.push(o);
    };
    lfo(gentle ? 0.012 : 0.018, 260, filter.frequency);
    s.drone.forEach((step, i) => {
      const voice = ctx.createGain();
      voice.gain.value = i === 0 ? 0.05 : 0.032;
      voice.connect(filter);
      lfo((gentle ? 0.03 : 0.05) + i * 0.017, 0.016, voice.gain);
      for (const [type, cents] of [['sine', -5], ['triangle', 6]]) {
        const o = ctx.createOscillator();
        o.type = type;
        o.frequency.value = hz(s.home + step);
        o.detune.value = cents;
        o.connect(voice);
        o.start(now);
        nodes.push(o);
      }
    });
    return { out, nodes };
  }
  function stopDrone(d) {
    if (!d) return;
    const now = ctx.currentTime;
    d.out.gain.cancelScheduledValues(now);
    d.out.gain.setTargetAtTime(0, now, 1.2);
    for (const o of d.nodes) o.stop(now + 6);
  }
  function syncDrone() {
    if (!ctx) return;
    if (droneTheme !== cfg.theme) {
      stopDrone(drone);
      drone = startDrone(cfg.theme);
      droneTheme = cfg.theme;
    }
    droneOut.gain.setTargetAtTime(cfg.music ? 1 : 0, ctx.currentTime, 0.8);
  }

  // ─── Bells ───────────────────────────────────────────────────
  // A sine with a quieter, faster-fading partial a little under an octave
  // and a half above: the inharmonic ring that makes it sound struck.
  function bell(freq, level, at, length = 2.6) {
    const attack = gentle ? 0.04 : 0.008, end = at + (gentle ? length * 1.3 : length);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(level, at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    g.connect(bus);
    const shimmer = ctx.createGain();
    shimmer.gain.setValueAtTime(0.0001, at);
    shimmer.gain.exponentialRampToValueAtTime(0.22, at + attack);
    shimmer.gain.exponentialRampToValueAtTime(0.0001, at + (end - at) * 0.4);
    shimmer.connect(g);
    const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (pan) { pan.pan.value = (Math.random() - 0.5) * 0.7; g.disconnect(); g.connect(pan).connect(bus); }
    const tone = ctx.createOscillator(), ring = ctx.createOscillator();
    tone.frequency.value = freq;
    ring.frequency.value = freq * 2.76;
    tone.connect(g);
    ring.connect(shimmer);
    for (const o of [tone, ring]) { o.start(at); o.stop(end + 0.05); }
  }

  // The note an orb plays, from its role and how strongly it's linked
  function noteOf(o) {
    const s = SCALES[cfg.theme] || SCALES.tide;
    if (!o || o.isSun) return s.home - 12;
    const degree = Math.round((1 - Math.min(1, Math.max(0, o.link ?? 0.5))) * (s.steps.length - 1));
    return s.home + (OCTAVE[o.rel] ?? 12) + s.steps[degree];
  }
  // Higher notes sound louder to the ear, so they're played a little softer
  const levelOf = (o, midi) => (0.05 + 0.13 * Math.min(1, Math.max(0, o?.relevance ?? 0.6))) * Math.pow(0.82, (midi - 57) / 12) * (gentle ? 0.6 : 1);

  // When the next sound may start: now plus any delay, behind the queue.
  // Returns null if the queue is so far behind that it should be skipped.
  function slot(delayMs = 0, gap = 0.075) {
    const now = ctx.currentTime, at = Math.max(now + 0.02 + delayMs / 1000, nextFree);
    if (at - now > 2.5) return null;
    nextFree = at + gap;
    return at;
  }
  const playing = () => ctx && cfg.on && !document.hidden && ctx.state === 'running';

  window.CELESTIAL_SOUND = {
    // Settings changed (or the page just loaded)
    configure(next) {
      Object.assign(cfg, next);
      if (!ctx && !cfg.on) return;
      if (!ctx && !build()) return;
      syncDrone();
      wake();
    },
    // An orb has just appeared
    orb(o, delayMs = 0) {
      if (!playing() || !cfg.bells) return;
      const at = slot(delayMs);
      if (at == null) return;
      const midi = noteOf(o);
      bell(hz(midi), levelOf(o, midi), at);
    },
    // A new centre: a low swell under its home note and fifth
    centre() {
      if (!playing() || !cfg.bells) return;
      const at = slot(0, 0.25);
      if (at == null) return;
      const home = noteOf({ isSun: true });
      bell(hz(home), 0.16, at, 4.2);
      bell(hz(home + 7), 0.09, at + 0.12, 3.6);
    },
    // A line between two orbs (or an orb and the centre): both notes at once
    pair(a, b) {
      if (!playing() || !cfg.cues) return;
      const at = slot(0, 0.12);
      if (at == null) return;
      for (const [o, d] of [[a, 0], [b, 0.06]]) {
        const midi = noteOf(o);
        bell(hz(midi), levelOf(o, midi) * 0.7, at + d, 2.2);
      }
    },
    // You marked an orb: a tick climbs to a resolved chord, a cross falls away
    mark(v) {
      if (!playing() || !cfg.bells || !v) return;
      const at = slot(0, 0.3);
      if (at == null) return;
      const s = SCALES[cfg.theme] || SCALES.tide, home = s.home + 12;
      const notes = v === 'yes' ? [home + s.steps[2], home + s.steps[3], home + 12] : [home + s.steps[1], home - 12 + s.steps[4]];
      notes.forEach((m, i) => bell(hz(m), v === 'yes' ? 0.09 : 0.06, at + i * 0.11, v === 'yes' ? 2.8 : 1.6));
    },
  };
})();

