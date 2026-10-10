// Canvas preview: pan, zoom, issue colouring and hover readout.
import * as F from '../core/features.js';
import { pointInPoly } from '../core/geometry.js';
import { CALIBRATION } from '../export/svg.js';

const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export class Preview {
  constructor(canvas, { onHover } = {}) {
    this.c = canvas;
    this.ctx = canvas.getContext('2d');
    this.view = { s: 4, ox: 0, oy: 0 };
    this.result = null;
    this.showIssues = true;
    this.calibration = false;
    this.onHover = onHover;
    this.needsFit = true;
    new ResizeObserver(() => this.resize()).observe(canvas);
    this.bind();
  }

  resize() {
    const r = this.c.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.c.width = Math.max(1, Math.round(r.width * dpr));
    this.c.height = Math.max(1, Math.round(r.height * dpr));
    this.dpr = dpr;
    if (this.needsFit) this.fit(); else this.draw();
  }

  // Screen (css px) <-> model (mm, y up)
  toScreen(x, y) { return [this.view.ox + x * this.view.s, this.view.oy - y * this.view.s]; }
  toModel(px, py) { return [(px - this.view.ox) / this.view.s, (this.view.oy - py) / this.view.s]; }

  fit() {
    if (!this.result) return;
    const r = this.c.getBoundingClientRect();
    const { w, h } = this.result.boundary;
    const pad = 70;
    const s = Math.max(1e-3, Math.min((r.width - pad * 2) / w, (r.height - pad * 2 - 30) / h));
    this.view = { s, ox: (r.width - w * s) / 2, oy: (r.height - 30 + h * s) / 2 };
    this.needsFit = false;
    this.draw();
  }

  oneToOne() {
    if (!this.result) return;
    const r = this.c.getBoundingClientRect();
    const { w, h } = this.result.boundary;
    const s = 96 / 25.4; // CSS px per mm; real size depends on the display
    this.view = { s, ox: (r.width - w * s) / 2, oy: (r.height - 30 + h * s) / 2 };
    this.draw();
  }

  set(result) {
    const first = !this.result;
    const changed = this.result && (this.result.boundary.w !== result.boundary.w || this.result.boundary.h !== result.boundary.h);
    this.result = result;
    if (first || changed) this.fit(); else this.draw();
  }

  bind() {
    let drag = null;
    this.c.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, y: e.clientY, ox: this.view.ox, oy: this.view.oy };
      this.c.setPointerCapture(e.pointerId);
      this.c.classList.add('dragging');
    });
    this.c.addEventListener('pointermove', (e) => {
      if (drag) {
        this.view.ox = drag.ox + e.clientX - drag.x;
        this.view.oy = drag.oy + e.clientY - drag.y;
        this.draw();
        return;
      }
      this.hover(e);
    });
    const end = () => { drag = null; this.c.classList.remove('dragging'); };
    this.c.addEventListener('pointerup', end);
    this.c.addEventListener('pointercancel', end);
    this.c.addEventListener('pointerleave', () => this.onHover && this.onHover(null));
    this.c.addEventListener('wheel', (e) => {
      e.preventDefault();
      const r = this.c.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      const [mx, my] = this.toModel(px, py);
      const k = Math.exp(-e.deltaY * 0.0015);
      this.view.s = Math.min(5000, Math.max(0.05, this.view.s * k));
      this.view.ox = px - mx * this.view.s;
      this.view.oy = py + my * this.view.s;
      this.draw();
    }, { passive: false });
  }

  hover(e) {
    if (!this.onHover || !this.result) return;
    const r = this.c.getBoundingClientRect();
    const px = e.clientX - r.left, py = e.clientY - r.top;
    const [x, y] = this.toModel(px, py);
    const fs = this.result.features;
    let hit = -1;
    for (let k = 0; k < fs.length; k++) {
      const f = fs[k];
      if (f.kind === 'circle') { if ((x - f.x) ** 2 + (y - f.y) ** 2 <= f.r * f.r) { hit = k; break; } continue; }
      const [cx, cy] = F.center(f);
      const rr = F.radius(f);
      if ((x - cx) ** 2 + (y - cy) ** 2 > rr * rr) continue;
      if (pointInPoly(x, y, F.outline(f, 24))) { hit = k; break; }
    }
    this.onHover({ x, y, px, py, index: hit });
  }

  pathFor(f, p) {
    const s = this.view.s;
    if (f.kind === 'circle') {
      const [x, y] = this.toScreen(f.x, f.y);
      const r = f.r * s;
      if (r < 0.35) { p.rect(x - 0.35, y - 0.35, 0.7, 0.7); return; }
      p.moveTo(x + r, y);
      p.arc(x, y, r, 0, Math.PI * 2);
      return;
    }
    const pts = F.outline(f, Math.min(48, Math.max(12, Math.round(f.w ? f.w * s : 12))));
    pts.forEach(([mx, my], i) => {
      const [x, y] = this.toScreen(mx, my);
      if (i) p.lineTo(x, y); else p.moveTo(x, y);
    });
    p.closePath();
  }

  polyPath(pts) {
    const p = new Path2D();
    pts.forEach(([mx, my], i) => {
      const [x, y] = this.toScreen(mx, my);
      if (i) p.lineTo(x, y); else p.moveTo(x, y);
    });
    p.closePath();
    return p;
  }

  draw() {
    const { ctx, c } = this;
    const dpr = this.dpr || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = css('--canvas');
    ctx.fillRect(0, 0, c.width, c.height);
    const R = this.result;
    if (!R) return;
    const land = css('--land'), hole = css('--hole'), bad = css('--bad'), ink = css('--ink'), ink2 = css('--ink-2'), accent = css('--accent');

    const panel = this.polyPath(R.outline);
    ctx.fillStyle = land;
    ctx.fill(panel);

    const ok = new Path2D(), issue = new Path2D();
    const flags = R.dfm.flags;
    R.features.forEach((f, k) => this.pathFor(f, this.showIssues && flags[k] ? issue : ok));
    ctx.fillStyle = hole;
    ctx.fill(ok, 'nonzero');
    ctx.fillStyle = bad;
    ctx.fill(issue, 'nonzero');

    ctx.lineWidth = 1;
    ctx.strokeStyle = ink;
    ctx.stroke(panel);
    if (R.inset.length >= 3 && R.inset !== R.outline) {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = ink2;
      ctx.stroke(this.polyPath(R.inset));
      ctx.setLineDash([]);
    }

    for (const k of R.keepouts || []) {
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      const p = new Path2D();
      if (k.shape === 'rect') {
        const [x, y] = this.toScreen(k.x - k.w / 2, k.y + k.h / 2);
        p.rect(x, y, k.w * this.view.s, k.h * this.view.s);
      } else {
        const [x, y] = this.toScreen(k.x, k.y);
        p.arc(x, y, (k.w / 2) * this.view.s, 0, Math.PI * 2);
      }
      ctx.stroke(p);
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
    }

    if (this.calibration) {
      const c0 = CALIBRATION;
      const [x, y] = this.toScreen(c0.x, c0.y + c0.size);
      ctx.strokeStyle = ink;
      ctx.strokeRect(x, y, c0.size * this.view.s, c0.size * this.view.s);
      ctx.fillStyle = ink2;
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillText('10 mm', x, y - 4);
    }

    // Dimensions
    const { w, h } = R.boundary;
    ctx.fillStyle = ink2;
    ctx.strokeStyle = ink2;
    ctx.font = '12px system-ui, sans-serif';
    const [ax, ay] = this.toScreen(0, 0);
    const [bx] = this.toScreen(w, 0);
    const [, ty] = this.toScreen(0, h);
    const dy = ay + 22;
    ctx.beginPath();
    ctx.moveTo(ax, dy); ctx.lineTo(bx, dy);
    ctx.moveTo(ax, dy - 5); ctx.lineTo(ax, dy + 5);
    ctx.moveTo(bx, dy - 5); ctx.lineTo(bx, dy + 5);
    const dx = ax - 22;
    ctx.moveTo(dx, ay); ctx.lineTo(dx, ty);
    ctx.moveTo(dx - 5, ay); ctx.lineTo(dx + 5, ay);
    ctx.moveTo(dx - 5, ty); ctx.lineTo(dx + 5, ty);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillText(`${+w.toFixed(3)} mm`, (ax + bx) / 2, dy + 16);
    ctx.save();
    ctx.translate(dx - 8, (ay + ty) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${+h.toFixed(3)} mm`, 0, 0);
    ctx.restore();
    ctx.textAlign = 'start';
  }
}
