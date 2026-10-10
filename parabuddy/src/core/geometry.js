// 2D geometry helpers. All coordinates are millimetres, y up.
// Polygons are arrays of [x, y] with an implicit closing edge.

export const TAU = Math.PI * 2;

export function signedArea(pts) {
  let s = 0;
  for (let i = 0, n = pts.length; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
}

export function ensureCCW(pts) {
  return signedArea(pts) < 0 ? pts.slice().reverse() : pts;
}

export function perimeter(pts) {
  let s = 0;
  for (let i = 0, n = pts.length; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    s += Math.hypot(x2 - x1, y2 - y1);
  }
  return s;
}

export function centroid(pts) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, n = pts.length; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    const c = x1 * y2 - x2 * y1;
    a += c;
    cx += (x1 + x2) * c;
    cy += (y1 + y2) * c;
  }
  if (Math.abs(a) < 1e-12) {
    let sx = 0, sy = 0;
    for (const [x, y] of pts) { sx += x; sy += y; }
    return [sx / pts.length, sy / pts.length];
  }
  return [cx / (3 * a), cy / (3 * a)];
}

export function bounds(pts) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) {
    if (x < x0) x0 = x;
    if (y < y0) y0 = y;
    if (x > x1) x1 = x;
    if (y > y1) y1 = y;
  }
  return { x0, y0, x1, y1 };
}

export function pointInPoly(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function distPointSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let t = len2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

export function distPointPolyEdges(px, py, pts) {
  let d = Infinity;
  for (let i = 0, n = pts.length; i < n; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[(i + 1) % n];
    const e = distPointSegment(px, py, ax, ay, bx, by);
    if (e < d) d = e;
  }
  return d;
}

function segmentsCross(a, b, c, d) {
  const o = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  const d1 = o(c, d, a), d2 = o(c, d, b), d3 = o(a, b, c), d4 = o(a, b, d);
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
}

// Minimum distance between two polygons; a negative value means they overlap.
export function polyPolyDistance(A, B) {
  for (const [x, y] of A) if (pointInPoly(x, y, B)) return -1;
  for (const [x, y] of B) if (pointInPoly(x, y, A)) return -1;
  for (let i = 0; i < A.length; i++) {
    const a = A[i], b = A[(i + 1) % A.length];
    for (let j = 0; j < B.length; j++) {
      if (segmentsCross(a, b, B[j], B[(j + 1) % B.length])) return -1;
    }
  }
  let d = Infinity;
  for (const [x, y] of A) d = Math.min(d, distPointPolyEdges(x, y, B));
  for (const [x, y] of B) d = Math.min(d, distPointPolyEdges(x, y, A));
  return d;
}

// Keep the part of a polygon where nx*x + ny*y <= c.
export function clipHalfPlane(pts, nx, ny, c) {
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    const dp = nx * p[0] + ny * p[1] - c;
    const dq = nx * q[0] + ny * q[1] - c;
    if (dp <= 0) out.push(p);
    if ((dp <= 0) !== (dq <= 0)) {
      const t = dp / (dp - dq);
      out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
    }
  }
  return out;
}

// Clip any polygon by a convex counter-clockwise polygon (Sutherland-Hodgman).
export function clipByConvex(subject, clip) {
  let out = subject;
  for (let i = 0, n = clip.length; i < n && out.length; i++) {
    const [ax, ay] = clip[i];
    const [bx, by] = clip[(i + 1) % n];
    // Inside is the left side of a->b; express as n.p <= c with n the right normal.
    const nx = by - ay, ny = -(bx - ax);
    out = clipHalfPlane(out, nx, ny, nx * ax + ny * ay);
  }
  return out;
}

// Shrink a convex counter-clockwise polygon by distance d on every edge.
export function insetConvex(pts, d) {
  let out = pts;
  for (let i = 0, n = pts.length; i < n && out.length; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[(i + 1) % n];
    const len = Math.hypot(bx - ax, by - ay);
    if (len < 1e-12) continue;
    const nx = (by - ay) / len, ny = -(bx - ax) / len;
    out = clipHalfPlane(out, nx, ny, nx * ax + ny * ay - d);
  }
  return dedupe(out);
}

function dedupe(pts, eps = 1e-9) {
  const out = [];
  for (const p of pts) {
    const q = out[out.length - 1];
    if (!q || Math.abs(p[0] - q[0]) > eps || Math.abs(p[1] - q[1]) > eps) out.push(p);
  }
  if (out.length > 1) {
    const a = out[0], b = out[out.length - 1];
    if (Math.abs(a[0] - b[0]) <= eps && Math.abs(a[1] - b[1]) <= eps) out.pop();
  }
  return out;
}

// Smallest width of a convex polygon (rotating-calipers, brute force).
export function minWidthConvex(pts) {
  let best = Infinity;
  for (let i = 0, n = pts.length; i < n; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[(i + 1) % n];
    const len = Math.hypot(bx - ax, by - ay);
    if (len < 1e-12) continue;
    let far = 0;
    for (const [x, y] of pts) {
      const d = Math.abs((bx - ax) * (ay - y) - (ax - x) * (by - ay)) / len;
      if (d > far) far = d;
    }
    if (far < best) best = far;
  }
  return best === Infinity ? 0 : best;
}

export function rotatePt(x, y, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c - y * s, x * s + y * c];
}
