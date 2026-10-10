// SVG writer. width/height are in mm and the viewBox uses the same numbers,
// so 1 user unit = 1 mm in every importer that honours physical units.
// Round holes stay <circle>, slots are lines + arcs, so CAD gets real circles and arcs.
import * as B from '../core/boundary.js';

const fmt = (n) => {
  const s = (Math.round(n * 1e4) / 1e4).toFixed(4);
  return s.replace(/\.?0+$/, '') || '0';
};

export const CALIBRATION = { x: -15, y: 0, size: 10 };

export function extents(boundary, calibration) {
  let x0 = 0, y0 = 0, x1 = boundary.w, y1 = boundary.h;
  if (calibration) {
    x0 = Math.min(x0, CALIBRATION.x);
    y0 = Math.min(y0, CALIBRATION.y);
    y1 = Math.max(y1, CALIBRATION.y + CALIBRATION.size);
  }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}

export function toSVG(result, opts = {}) {
  const b = result.boundary;
  const ext = extents(b, opts.calibration);
  // Flip y: CAD is y-up, SVG is y-down.
  const X = (x) => fmt(x - ext.x0);
  const Y = (y) => fmt(ext.y1 - y);
  const stroke = 'fill="none" stroke="#000" stroke-width="0.05"';
  const out = [];
  out.push('<?xml version="1.0" encoding="UTF-8"?>');
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="${fmt(ext.w)}mm" height="${fmt(ext.h)}mm" viewBox="0 0 ${fmt(ext.w)} ${fmt(ext.h)}">`);
  out.push(`<!-- parabuddy export. Units: mm, 1 viewBox unit = 1 mm. Panel ${fmt(b.w)} x ${fmt(b.h)} mm. -->`);
  if (opts.meta) out.push(`<metadata>${escapeXml(JSON.stringify(opts.meta))}</metadata>`);

  out.push(`<g id="boundary" inkscape:groupmode="layer" inkscape:label="boundary" ${stroke}>`);
  out.push(boundaryElement(B.primitives(b), X, Y));
  out.push('</g>');

  out.push(`<g id="pattern" inkscape:groupmode="layer" inkscape:label="pattern" ${stroke}>`);
  for (const f of result.features) out.push(featureElement(f, X, Y));
  out.push('</g>');

  if (opts.calibration) {
    const c = CALIBRATION;
    out.push(`<g id="calibration_10mm" inkscape:groupmode="layer" inkscape:label="calibration 10 mm" ${stroke}>`);
    out.push(`<rect x="${X(c.x)}" y="${Y(c.y + c.size)}" width="${fmt(c.size)}" height="${fmt(c.size)}"/>`);
    out.push('</g>');
  }
  out.push('</svg>');
  return out.join('\n');
}

function boundaryElement(prims, X, Y) {
  if (prims.length === 1 && prims[0].type === 'circle') {
    const p = prims[0];
    return `<circle cx="${X(p.cx)}" cy="${Y(p.cy)}" r="${fmt(p.r)}"/>`;
  }
  if (prims.length === 1 && prims[0].type === 'ellipse') {
    const p = prims[0];
    return `<ellipse cx="${X(p.cx)}" cy="${Y(p.cy)}" rx="${fmt(p.rx)}" ry="${fmt(p.ry)}"/>`;
  }
  const first = prims[0];
  const start = first.type === 'line' ? [first.x1, first.y1] : arcPoint(first, first.a0);
  let d = `M${X(start[0])} ${Y(start[1])}`;
  for (const p of prims) {
    if (p.type === 'line') d += ` L${X(p.x2)} ${Y(p.y2)}`;
    else if (p.type === 'arc') {
      const [ex, ey] = arcPoint(p, p.a1);
      d += ` A${fmt(p.r)} ${fmt(p.r)} 0 0 0 ${X(ex)} ${Y(ey)}`;
    }
  }
  return `<path d="${d} Z"/>`;
}

const arcPoint = (p, deg) => [p.cx + p.r * Math.cos((deg * Math.PI) / 180), p.cy + p.r * Math.sin((deg * Math.PI) / 180)];

export function featureElement(f, X, Y) {
  if (f.kind === 'circle') return `<circle cx="${X(f.x)}" cy="${Y(f.y)}" r="${fmt(f.r)}"/>`;
  if (f.kind === 'slot') {
    const r = f.w / 2, h = (f.len - f.w) / 2;
    if (h <= 1e-9) return `<circle cx="${X(f.x)}" cy="${Y(f.y)}" r="${fmt(r)}"/>`;
    const ux = Math.cos(f.a), uy = Math.sin(f.a), nx = -uy, ny = ux;
    const c1 = [f.x - ux * h, f.y - uy * h], c2 = [f.x + ux * h, f.y + uy * h];
    const P = (c, sx, sy) => `${X(c[0] + sx)} ${Y(c[1] + sy)}`;
    // The y-flip mirrors orientation: counter-clockwise arcs in CAD space are sweep-flag 0 in SVG.
    return `<path d="M${P(c1, -nx * r, -ny * r)} L${P(c2, -nx * r, -ny * r)} A${fmt(r)} ${fmt(r)} 0 0 0 ${P(c2, ux * r, uy * r)} A${fmt(r)} ${fmt(r)} 0 0 0 ${P(c2, nx * r, ny * r)} L${P(c1, nx * r, ny * r)} A${fmt(r)} ${fmt(r)} 0 0 0 ${P(c1, -ux * r, -uy * r)} A${fmt(r)} ${fmt(r)} 0 0 0 ${P(c1, -nx * r, -ny * r)} Z"/>`;
  }
  let d = '';
  f.pts.forEach(([x, y], i) => { d += `${i ? 'L' : 'M'}${X(x)} ${Y(y)} `; });
  return `<path d="${d}Z"/>`;
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
