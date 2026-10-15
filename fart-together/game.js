// Fart Together — shared simulation. Runs on the LAN server (Node) and in the
// browser for same-keyboard play, so both sides build the same river from a seed.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FartGame = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const LENGTH = 7000;          // distance from start line to finish line
  const BOTTOM = 260;           // dock wall behind the start
  const TOP = -LENGTH - 500;    // wall past the finish
  const MAX_SEATS = 4;

  const MASS = 4;
  const INERTIA = 1500;
  const THRUST = 340;           // per-player thrust, scaled by 1/sqrt(players)
  const COMBO = 0.15;           // bonus per extra player farting at the same time
  const DRAG_FWD = 0.3, DRAG_QUAD = 0.0015, DRAG_SIDE = 3, DRAG_SPIN = 2.5;
  const AIM_SPEED = 2.8;
  const GAS_USE = 22, GAS_REGEN = 24, GAS_UNTANK = 25;
  const RESTITUTION = 0.35;

  const HULL = [{ f: -20, r: 0, rad: 18 }, { f: 0, r: 0, rad: 19 }, { f: 20, r: 0, rad: 17 }];
  const SEATS = {
    1: [[-24, 0]],
    2: [[-22, -12], [-22, 12]],
    3: [[-22, -12], [-22, 12], [18, 0]],
    4: [[-22, -12], [-22, 12], [16, -12], [16, 12]],
  };
  const COLORS = ['#ff5d73', '#4cc9f0', '#ffd23f', '#7bd389', '#c77dff', '#ff9f1c', '#f15bb5', '#00f5d4'];

  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return function () {
      s ^= s << 13; s >>>= 0;
      s ^= s >>> 17;
      s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }

  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  function createCourse(seed) {
    const R = rng(seed);
    const waves = [
      { a: 150 + R() * 100, f: 1 / (800 + R() * 300), p: R() * 6.28 },
      { a: 50 + R() * 50, f: 1 / (350 + R() * 150), p: R() * 6.28 },
      { a: 12 + R() * 14, f: 1 / (160 + R() * 60), p: R() * 6.28 },
    ];
    const wp = R() * 6.28, cp = R() * 6.28;

    const ramp = (t) => clamp((t - 300) / 700, 0, 1);
    function centerX(y) {
      const t = -y, k = ramp(t);
      let x = 0;
      for (const w of waves) x += w.a * Math.sin(t * w.f + w.p) - w.a * Math.sin(w.p);
      return x * k;
    }
    function halfWidth(y) {
      const t = -y, k = ramp(t);
      return 230 * (1 - k) + k * Math.max(150, 200 + 60 * Math.sin(t / 700 + wp));
    }
    function current(y) {
      const t = -y;
      const base = 20 + 30 * (0.5 + 0.5 * Math.sin(t / 1100 + cp));
      return clamp(base * 200 / halfWidth(y), 15, 70) * ramp(t + 400);
    }

    const rocks = [];
    for (let t = 600 + R() * 100; t < LENGTH - 150; t += 160 + R() * 140) {
      const y = -t, cx = centerX(y), hw = halfWidth(y);
      if (hw > 200 && R() < 0.45) {
        const r1 = 16 + R() * 20, r2 = 16 + R() * 20;
        const o1 = -hw + 30 + R() * (hw - 90), o2 = hw - 30 - R() * (hw - 90);
        rocks.push({ x: cx + o1, y, r: r1 });
        if (o2 - o1 - r1 - r2 >= 110) rocks.push({ x: cx + o2, y: y - (R() - 0.5) * 60, r: r2 });
      } else {
        rocks.push({ x: cx + (R() * 2 - 1) * (hw - 50), y, r: 16 + R() * 22 });
      }
    }

    const whirlpools = [];
    for (let t = 1400 + R() * 300; t < LENGTH - 400; t += 1100 + R() * 400) {
      const y = -t;
      whirlpools.push({ x: centerX(y) + (R() * 2 - 1) * halfWidth(y) * 0.4, y, r: 110, dir: R() < 0.5 ? 1 : -1 });
    }
    for (let i = rocks.length - 1; i >= 0; i--) {
      if (whirlpools.some((w) => Math.hypot(rocks[i].x - w.x, rocks[i].y - w.y) < w.r + rocks[i].r + 20)) rocks.splice(i, 1);
    }

    const beans = [];
    for (let t = 400 + R() * 100; t < LENGTH - 100; t += 350 + R() * 150) {
      const y = -t, hw = halfWidth(y);
      for (let tries = 0; tries < 6; tries++) {
        const x = centerX(y) + (R() * 2 - 1) * (hw - 40);
        if (rocks.every((r) => Math.hypot(r.x - x, r.y - y) > r.r + 30)) { beans.push({ x, y }); break; }
      }
    }

    const checkpoints = [];
    for (let t = 1000; t < LENGTH; t += 1000) checkpoints.push(-t);

    return { seed, length: LENGTH, bottom: BOTTOM, top: TOP, centerX, halfWidth, current, rocks, whirlpools, beans, checkpoints };
  }

  function createGame(seed) {
    const game = {
      seed: seed >>> 0,
      course: createCourse(seed >>> 0),
      players: [],
      boat: null,
      phase: 'lobby',
      phaseTime: 0,
      raceTime: 0,
      taken: [],
      checkpoint: 0,
      best: null,
      last: null,
      bumps: 0,
      beansEaten: 0,
      finishes: 0,
    };
    resetBoat(game, 0);
    return game;
  }

  function setSeed(game, seed) {
    game.seed = seed >>> 0;
    game.course = createCourse(game.seed);
    game.best = null;
    game.last = null;
    toLobby(game);
  }

  function resetBoat(game, y) {
    game.boat = { x: game.course.centerX(y), y, a: -Math.PI / 2, vx: 0, vy: 0, w: 0 };
  }

  function layoutSeats(game) {
    const seated = game.players.slice(0, MAX_SEATS);
    const layout = SEATS[seated.length] || [];
    game.players.forEach((p, i) => {
      p.seat = i < seated.length ? { f: layout[i][0], r: layout[i][1] } : null;
    });
  }

  function addPlayer(game, id, name) {
    const used = new Set(game.players.map((p) => p.color));
    const color = COLORS.find((c) => !used.has(c)) || COLORS[game.players.length % COLORS.length];
    const p = {
      id, name: String(name || 'Player').slice(0, 16), color, seat: null,
      aim: Math.PI, gas: 100, farting: false, tanked: false,
      input: { l: false, r: false, f: false },
    };
    game.players.push(p);
    layoutSeats(game);
    return p;
  }

  function removePlayer(game, id) {
    game.players = game.players.filter((p) => p.id !== id);
    layoutSeats(game);
  }

  function setInput(game, id, input) {
    const p = game.players.find((q) => q.id === id);
    if (p) p.input = { l: !!input.l, r: !!input.r, f: !!input.f };
  }

  function startRace(game) {
    if (game.phase === 'countdown') return;
    resetBoat(game, 0);
    game.taken = [];
    game.checkpoint = 0;
    game.players.forEach((p) => { p.gas = 100; p.tanked = false; p.aim = Math.PI; });
    game.phase = 'countdown';
    game.phaseTime = 0;
    game.raceTime = 0;
  }

  function toLobby(game) {
    game.phase = 'lobby';
    game.phaseTime = 0;
    game.raceTime = 0;
    game.taken = [];
    game.checkpoint = 0;
    resetBoat(game, 0);
  }

  function respawn(game) {
    if (game.phase === 'countdown') return;
    resetBoat(game, game.checkpoint);
  }

  function collide(game, cx, cy, nx, ny, pen) {
    const b = game.boat;
    b.x += nx * pen;
    b.y += ny * pen;
    const rx = cx - b.x, ry = cy - b.y;
    const vpx = b.vx - b.w * ry, vpy = b.vy + b.w * rx;
    const vn = vpx * nx + vpy * ny;
    if (vn >= 0) return;
    const rn = rx * ny - ry * nx;
    const j = -(1 + RESTITUTION) * vn / (1 / MASS + rn * rn / INERTIA);
    b.vx += j * nx / MASS;
    b.vy += j * ny / MASS;
    b.w += rn * j / INERTIA;
    b.vx *= 0.97; b.vy *= 0.97;
    if (vn < -40) game.bumps++;
  }

  function step(game, dt) {
    const c = game.course, b = game.boat;
    game.phaseTime += dt;
    if (game.phase === 'countdown' && game.phaseTime >= 3) { game.phase = 'race'; game.phaseTime = 0; game.raceTime = 0; }
    if (game.phase === 'finished' && game.phaseTime >= 6) toLobby(game);
    if (game.phase === 'race') game.raceTime += dt;
    const canMove = game.phase !== 'countdown';

    const ux = Math.cos(b.a), uy = Math.sin(b.a);
    const vx = -uy, vy = ux;
    const seated = game.players.filter((p) => p.seat);

    for (const p of seated) {
      if (canMove) p.aim += ((p.input.r ? 1 : 0) - (p.input.l ? 1 : 0)) * AIM_SPEED * dt;
      if (p.tanked && p.gas >= GAS_UNTANK) p.tanked = false;
      p.farting = canMove && p.input.f && !p.tanked;
      if (p.farting) {
        p.gas -= GAS_USE * dt;
        if (p.gas <= 0) { p.gas = 0; p.tanked = true; p.farting = false; }
      } else {
        p.gas = Math.min(100, p.gas + GAS_REGEN * dt);
      }
    }
    for (const p of game.players) if (!p.seat) p.farting = false;

    const farters = seated.filter((p) => p.farting);
    const power = THRUST / Math.sqrt(Math.max(1, seated.length)) * (1 + COMBO * (farters.length - 1));
    let fx = 0, fy = 0, torque = 0;
    for (const p of farters) {
      const gx = ux * Math.cos(p.aim) + vx * Math.sin(p.aim);
      const gy = uy * Math.cos(p.aim) + vy * Math.sin(p.aim);
      const Fx = -gx * power, Fy = -gy * power;
      const px = ux * p.seat.f + vx * p.seat.r, py = uy * p.seat.f + vy * p.seat.r;
      fx += Fx; fy += Fy;
      torque += px * Fy - py * Fx;
    }

    // Water drag relative to the current: the hull slides forward easily, sideways hardly at all.
    const rvx = b.vx, rvy = b.vy - c.current(b.y);
    const fwd = rvx * ux + rvy * uy, side = rvx * vx + rvy * vy;
    const df = DRAG_FWD * fwd + DRAG_QUAD * fwd * Math.abs(fwd), ds = DRAG_SIDE * side;
    let ax = fx / MASS - df * ux - ds * vx;
    let ay = fy / MASS - df * uy - ds * vy;
    let aw = torque / INERTIA - DRAG_SPIN * b.w;

    for (const w of c.whirlpools) {
      const dx = w.x - b.x, dy = w.y - b.y, d = Math.hypot(dx, dy);
      if (d < w.r && d > 1) {
        const s = 1 - d / w.r;
        ax += (dx / d) * 120 * s + (-dy / d) * 140 * s * w.dir;
        ay += (dy / d) * 120 * s + (dx / d) * 140 * s * w.dir;
        aw += 2.5 * s * w.dir;
      }
    }

    b.vx += ax * dt; b.vy += ay * dt; b.w += aw * dt;
    b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.w * dt;

    const ca = Math.cos(b.a), sa = Math.sin(b.a);
    for (const h of HULL) {
      const hx = b.x + ca * h.f, hy = b.y + sa * h.f;
      const mid = c.centerX(hy), hw = c.halfWidth(hy);
      const e = 2;
      const slopeR = (c.centerX(hy + e) + c.halfWidth(hy + e) - c.centerX(hy - e) - c.halfWidth(hy - e)) / (2 * e);
      const slopeL = (c.centerX(hy + e) - c.halfWidth(hy + e) - c.centerX(hy - e) + c.halfWidth(hy - e)) / (2 * e);
      if (hx + h.rad > mid + hw) {
        const len = Math.hypot(1, slopeR);
        collide(game, hx + h.rad, hy, -1 / len, slopeR / len, (hx + h.rad - mid - hw) / len);
      } else if (hx - h.rad < mid - hw) {
        const len = Math.hypot(1, slopeL);
        collide(game, hx - h.rad, hy, 1 / len, -slopeL / len, (mid - hw - hx + h.rad) / len);
      }
      if (hy + h.rad > c.bottom) collide(game, hx, hy + h.rad, 0, -1, hy + h.rad - c.bottom);
      if (hy - h.rad < c.top) collide(game, hx, hy - h.rad, 0, 1, c.top - hy + h.rad);
      for (const r of c.rocks) {
        const dx = hx - r.x, dy = hy - r.y, d = Math.hypot(dx, dy);
        if (d < r.r + h.rad && d > 0.001) {
          const nx = dx / d, ny = dy / d;
          collide(game, hx - nx * h.rad, hy - ny * h.rad, nx, ny, r.r + h.rad - d);
        }
      }
    }

    c.beans.forEach((bean, i) => {
      if (game.taken.includes(i)) return;
      if (Math.hypot(bean.x - b.x, bean.y - b.y) < 42) {
        game.taken.push(i);
        game.beansEaten++;
        game.players.forEach((p) => { p.gas = Math.min(100, p.gas + 50); p.tanked = false; });
      }
    });

    for (const y of c.checkpoints) if (b.y < y && y < game.checkpoint) game.checkpoint = y;

    if (game.phase === 'race' && b.y < -c.length) {
      game.phase = 'finished';
      game.phaseTime = 0;
      game.last = game.raceTime;
      if (game.best == null || game.raceTime < game.best) game.best = game.raceTime;
      game.finishes++;
    }
  }

  function snapshot(game) {
    const b = game.boat;
    const r = (x, n) => Math.round(x * n) / n;
    return {
      seed: game.seed,
      phase: game.phase,
      phaseTime: r(game.phaseTime, 100),
      raceTime: r(game.raceTime, 1000),
      boat: { x: r(b.x, 10), y: r(b.y, 10), a: r(b.a, 1000), vx: r(b.vx, 10), vy: r(b.vy, 10), w: r(b.w, 1000) },
      players: game.players.map((p) => ({
        id: p.id, name: p.name, color: p.color, seat: p.seat,
        aim: r(p.aim, 1000), gas: Math.round(p.gas), farting: p.farting, tanked: p.tanked,
      })),
      taken: game.taken.slice(),
      checkpoint: game.checkpoint,
      best: game.best,
      last: game.last,
      bumps: game.bumps,
      beansEaten: game.beansEaten,
      finishes: game.finishes,
    };
  }

  return { createCourse, createGame, setSeed, addPlayer, removePlayer, setInput, startRace, toLobby, respawn, step, snapshot, MAX_SEATS, HULL };
});
