// DXF writer (AutoCAD R12 / AC1009 text format), millimetres.
// R12 is read by Rhino, Fusion, SolidWorks, Plasticity's peers, LightBurn and most CAM tools.
// Round holes are CIRCLE, slots are LINE + ARC, polygons are closed POLYLINE: no splines.
import * as B from '../core/boundary.js';
import { CALIBRATION } from './svg.js';

const num = (n) => {
  const s = (Math.round(n * 1e6) / 1e6).toFixed(6);
  return s.replace(/\.?0+$/, '') || '0';
};

export function toDXF(result, opts = {}) {
  const L = [];
  const g = (code, value) => { L.push(String(code)); L.push(String(value)); };
  const b = result.boundary;
  const x0 = opts.calibration ? CALIBRATION.x : 0;
  const y1 = Math.max(b.h, opts.calibration ? CALIBRATION.size : 0);

  g(999, 'parabuddy export, units mm');
  g(0, 'SECTION'); g(2, 'HEADER');
  g(9, '$ACADVER'); g(1, 'AC1009');
  g(9, '$INSUNITS'); g(70, 4);
  g(9, '$MEASUREMENT'); g(70, 1);
  g(9, '$EXTMIN'); g(10, num(x0)); g(20, 0); g(30, 0);
  g(9, '$EXTMAX'); g(10, num(b.w)); g(20, num(y1)); g(30, 0);
  g(0, 'ENDSEC');

  const layers = [['0', 7], ['BOUNDARY', 7], ['PATTERN', 1]];
  if (opts.calibration) layers.push(['CALIBRATION_10MM', 3]);
  g(0, 'SECTION'); g(2, 'TABLES');
  g(0, 'TABLE'); g(2, 'LTYPE'); g(70, 1);
  g(0, 'LTYPE'); g(2, 'CONTINUOUS'); g(70, 0); g(3, 'Solid line'); g(72, 65); g(73, 0); g(40, 0);
  g(0, 'ENDTAB');
  g(0, 'TABLE'); g(2, 'LAYER'); g(70, layers.length);
  for (const [name, color] of layers) { g(0, 'LAYER'); g(2, name); g(70, 0); g(62, color); g(6, 'CONTINUOUS'); }
  g(0, 'ENDTAB');
  g(0, 'ENDSEC');

  g(0, 'SECTION'); g(2, 'ENTITIES');
  const line = (layer, ax, ay, bx, by) => { g(0, 'LINE'); g(8, layer); g(10, num(ax)); g(20, num(ay)); g(30, 0); g(11, num(bx)); g(21, num(by)); g(31, 0); };
  const arc = (layer, cx, cy, r, a0, a1) => { g(0, 'ARC'); g(8, layer); g(10, num(cx)); g(20, num(cy)); g(30, 0); g(40, num(r)); g(50, num(a0)); g(51, num(a1)); };
  const circ = (layer, cx, cy, r) => { g(0, 'CIRCLE'); g(8, layer); g(10, num(cx)); g(20, num(cy)); g(30, 0); g(40, num(r)); };
  const pline = (layer, pts) => {
    g(0, 'POLYLINE'); g(8, layer); g(66, 1); g(10, 0); g(20, 0); g(30, 0); g(70, 1);
    for (const [x, y] of pts) { g(0, 'VERTEX'); g(8, layer); g(10, num(x)); g(20, num(y)); g(30, 0); }
    g(0, 'SEQEND'); g(8, layer);
  };

  for (const p of B.primitives(b)) {
    if (p.type === 'line') line('BOUNDARY', p.x1, p.y1, p.x2, p.y2);
    else if (p.type === 'arc') arc('BOUNDARY', p.cx, p.cy, p.r, p.a0, p.a1);
    else if (p.type === 'circle') circ('BOUNDARY', p.cx, p.cy, p.r);
    else if (p.type === 'ellipse') pline('BOUNDARY', p.pts);
  }

  for (const f of result.features) {
    if (f.kind === 'circle') circ('PATTERN', f.x, f.y, f.r);
    else if (f.kind === 'poly') pline('PATTERN', f.pts);
    else {
      const r = f.w / 2, h = (f.len - f.w) / 2;
      if (h <= 1e-9) { circ('PATTERN', f.x, f.y, r); continue; }
      const ux = Math.cos(f.a), uy = Math.sin(f.a), nx = -uy, ny = ux;
      const c1 = [f.x - ux * h, f.y - uy * h], c2 = [f.x + ux * h, f.y + uy * h];
      const deg = (f.a * 180) / Math.PI;
      line('PATTERN', c1[0] - nx * r, c1[1] - ny * r, c2[0] - nx * r, c2[1] - ny * r);
      arc('PATTERN', c2[0], c2[1], r, norm(deg - 90), norm(deg + 90));
      line('PATTERN', c2[0] + nx * r, c2[1] + ny * r, c1[0] + nx * r, c1[1] + ny * r);
      arc('PATTERN', c1[0], c1[1], r, norm(deg + 90), norm(deg + 270));
    }
  }

  if (opts.calibration) {
    const c = CALIBRATION;
    pline('CALIBRATION_10MM', [[c.x, c.y], [c.x + c.size, c.y], [c.x + c.size, c.y + c.size], [c.x, c.y + c.size]]);
  }
  g(0, 'ENDSEC');
  g(0, 'EOF');
  return L.join('\r\n') + '\r\n';
}

const norm = (d) => ((d % 360) + 360) % 360;
