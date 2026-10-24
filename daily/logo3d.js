// ABK badge: smooth, filleted, dark chrome.
// Built from the SVG outline: the path is turned into a signed distance field at load,
// then ray-marched as a rounded extrusion (10 mm thick, filleted edges) in WebGL2.
// Falls back to the plain SVG logo if anything is unavailable.
(function () {
  const box = document.getElementById("logo3d");
  if (!box) return;
  const LOGO_D = "M229.998 0C304.84 0 376.633 13.0527 443.227 37.002C446.888 38.319 449.763 41.2349 450.907 44.9541C456.119 61.8884 458.945 79.8675 458.995 98.5C458.945 117.133 456.119 135.112 450.907 152.046C449.763 155.765 446.888 158.681 443.227 159.998C376.633 183.947 304.84 197 229.998 197C154.727 197 82.5397 183.8 15.624 159.588C11.9626 158.263 9.09328 155.339 7.95703 151.615C2.82935 134.807 0.0493003 116.975 0 98.5C0.0493003 80.0254 2.82935 62.1931 7.95703 45.3848C9.09328 41.6606 11.9626 38.7369 15.624 37.4121C82.5397 13.2001 154.727 0 229.998 0ZM267.902 27.8975C249.673 24.1237 207.941 25.964 185.364 29.6846C183.228 30.0366 181.494 31.5544 180.863 33.625C167.471 77.5747 175.453 137.945 184.732 165.46C185.436 167.546 187.269 168.99 189.455 169.249C216.598 172.462 265.99 173.801 296.028 166.367C297.81 165.926 299.266 164.649 299.899 162.927C310.169 135.022 308.843 84.297 304.526 71.4277C304.141 70.28 303.265 69.4097 302.104 69.0635C297.594 67.7174 288.999 67.3918 282.463 67.208C279.106 67.1136 276.554 64.2652 276.595 60.9072C276.734 49.3588 275.035 38.5076 271.496 30.75C270.822 29.2717 269.494 28.2269 267.902 27.8975ZM143.666 33.7334C111.316 28.9145 38.1801 44.4348 23.7979 51.7012C22.5707 52.3212 21.8622 53.5008 21.5908 54.8486C18.0646 72.3625 14.0229 109.837 24.2783 143.775C24.6842 145.119 25.5679 146.273 26.7812 146.978C30.1735 148.948 33.5245 150.411 36.6035 151.458C40.8031 152.886 44.1531 148.718 42.8945 144.465C37.7341 127.026 35.4616 106.986 36.7139 93.0557C36.8392 91.6618 37.4646 90.362 38.6318 89.5898C53.2061 79.9486 109.042 75.93 127.998 75.8047C130.944 75.7852 133.242 78.0784 133.421 81.0186C134.592 100.256 134.633 124.713 129.946 155.694C129.712 157.24 130.059 158.839 131.049 160.049C133.857 163.483 137.157 166.153 140.851 168.159C144.023 169.882 147.692 167.691 148.251 164.124C153.799 128.7 157.562 57.1298 147.325 36.2988C146.622 34.8689 145.242 33.9682 143.666 33.7334ZM195.545 73.1992C224.302 69.6315 254.239 71.168 284.227 75.0801C286.705 75.4033 288.726 77.2324 289.137 79.6973C293.054 103.187 289.222 141.985 286.127 158.837C285.694 161.193 283.83 162.977 281.463 163.348C260.009 166.71 226.062 167.53 206.201 163.332C204.425 162.956 202.97 161.729 202.244 160.064C192.482 137.676 187.515 112.193 190.472 78.4658C190.711 75.7333 192.823 73.537 195.545 73.1992ZM337.605 30.4629C336.084 29.736 334.678 30.7503 334.072 32.3242C324.866 56.2433 318.565 116.371 334.622 160.061C335.464 162.351 337.78 164.02 339.998 163.002C343.639 161.331 345.95 157.262 348.224 152.219C349.085 150.307 348.799 148.099 347.844 146.232C340.214 131.33 338.594 97.1025 341.142 84.1279C341.556 82.0189 343.369 80.6391 345.518 80.6064C360.517 80.3797 403.323 84.7822 421.493 87.7568C423.971 88.1626 425.867 90.1299 426.145 92.625C428.558 114.317 423.135 136.446 421.475 144.911C421.05 147.076 422.466 148.389 424.633 147.972C430.715 146.799 435.068 143.975 437.343 141.972C438.199 141.217 438.674 140.144 438.838 139.015C441.398 121.384 441.986 109.705 441.681 91.79C441.634 89.052 439.734 86.6982 437.054 86.1377C415.441 81.6198 372.494 75.3356 351.579 74.915C369.133 74.915 409.78 73.815 422.1 71.6152C424.016 71.273 425.323 69.7087 425.581 67.7793C426.315 62.29 426.432 55.3893 424.505 51.2744C424.25 50.7312 423.863 50.2642 423.391 49.8945C421.342 48.2918 418.389 46.8537 415.916 45.957C413.423 45.053 411.579 46.8632 411.641 49.5146C411.786 55.7987 412.106 61.0393 411.349 65.2363C411.014 67.0899 409.541 68.448 407.685 68.7666C394.9 70.9605 360.306 71.1756 347.95 70.3613C345.577 70.2049 343.787 68.4235 343.823 66.0459C343.939 58.484 346.478 46.1943 347.578 40.6387C347.931 38.8567 347.261 37.1434 345.828 36.0264C343.005 33.8252 339.867 31.5431 337.605 30.4629ZM42.4521 52.6494C57.1893 46.8558 101.639 37.7127 125.869 39.7109C127.94 39.8818 129.724 41.2193 130.313 43.2119C132.078 49.179 132.428 56.8406 132.288 63.8779C132.224 67.0685 129.585 69.5624 126.396 69.6562C101.693 70.3829 61.2305 75.3897 42.2803 79.8086C39.6851 80.4137 37.2834 79.186 37.2432 76.5215C37.1566 70.7785 38.4246 61.3382 39.4482 56.2539C39.78 54.6066 40.8882 53.2643 42.4521 52.6494ZM198.63 34.9844C213.299 31.863 236.867 30.6392 258.317 33.0352C260.507 33.2797 262.384 34.7416 262.89 36.8857C264.594 44.117 264.658 54.2966 264.339 61.0488C264.182 64.3545 261.222 66.6741 257.921 66.4375C241.941 65.2916 212.016 65.4941 197.163 66.4512C193.749 66.6711 190.65 64.1633 190.754 60.7441C190.989 52.9812 192.706 44.9656 194.456 38.8896C195.025 36.9149 196.62 35.4121 198.63 34.9844Z";
  const VW = 459, VH = 197;          // SVG viewBox; 459 units = 45.9 mm, so 10 units = 1 mm
  const HALF_T = 50;                 // half thickness: 10 mm badge
  const FILLET = 11;                 // fillet radius, ~1.1 mm
  const PAD = 40;                    // distance-field margin around the badge

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: true });
  if (!gl) return;

  // ---------- 1. SVG path -> polylines ----------
  function flatten(d) {
    const tok = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g);
    const loops = []; let pts = null, i = 0, cmd = "", x = 0, y = 0, sx = 0, sy = 0;
    const num = () => parseFloat(tok[i++]);
    const cubic = (x1, y1, x2, y2, x3, y3) => {
      const n = 14;
      for (let k = 1; k <= n; k++) {
        const t = k / n, u = 1 - t;
        pts.push([u * u * u * x + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3, u * u * u * y + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3]);
      }
      x = x3; y = y3;
    };
    while (i < tok.length) {
      if (/[a-zA-Z]/.test(tok[i])) cmd = tok[i++];
      const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
      const ox = rel ? x : 0, oy = rel ? y : 0;
      if (C === "M") { if (pts && pts.length) loops.push(pts); x = num() + ox; y = num() + oy; sx = x; sy = y; pts = [[x, y]]; cmd = rel ? "l" : "L"; }
      else if (C === "L") { x = num() + ox; y = num() + oy; pts.push([x, y]); }
      else if (C === "H") { x = num() + ox; pts.push([x, y]); }
      else if (C === "V") { y = num() + oy; pts.push([x, y]); }
      else if (C === "C") { const a = num() + ox, b = num() + oy, c = num() + ox, e = num() + oy, f = num() + ox, g = num() + oy; cubic(a, b, c, e, f, g); }
      else if (C === "Z") { if (pts && pts.length) loops.push(pts); pts = null; x = sx; y = sy; }
      else { i++; }
    }
    if (pts && pts.length) loops.push(pts);
    return loops;
  }

  // ---------- 2. Signed distance field (exact near the edge, EDT further out) ----------
  function buildSDF(W, H) {
    const s = W / (VW + 2 * PAD);                 // pixels per SVG unit
    const loops = flatten(LOGO_D);
    const segs = [];
    for (const L of loops) for (let k = 0; k < L.length; k++) {
      const a = L[k], b = L[(k + 1) % L.length];
      segs.push([(a[0] + PAD) * s, (a[1] + PAD) * s, (b[0] + PAD) * s, (b[1] + PAD) * s]);
    }
    // inside test per pixel centre via scanline crossings (even-odd; contours don't overlap)
    const inside = new Uint8Array(W * H);
    for (let yy = 0; yy < H; yy++) {
      const py = yy + 0.5, xs = [];
      for (const g of segs) {
        const [x1, y1, x2, y2] = g;
        if ((y1 <= py) !== (y2 <= py)) xs.push(x1 + (py - y1) / (y2 - y1) * (x2 - x1));
      }
      xs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const a = Math.max(0, Math.ceil(xs[k] - 0.5)), b = Math.min(W - 1, Math.floor(xs[k + 1] - 0.5));
        for (let xx = a; xx <= b; xx++) inside[yy * W + xx] = 1;
      }
    }
    // Felzenszwalb squared EDT
    const INF = 1e20;
    function edt1(f, n, d, v, z) {
      let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
      for (let q = 1; q < n; q++) {
        let s2 = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        while (s2 <= z[k]) { k--; s2 = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
        k++; v[k] = q; z[k] = s2; z[k + 1] = INF;
      }
      k = 0;
      for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
    }
    function edt(target) {
      const g = new Float64Array(W * H), n = Math.max(W, H);
      const f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
      for (let i = 0; i < W * H; i++) g[i] = inside[i] === target ? 0 : INF;
      for (let x = 0; x < W; x++) { for (let y = 0; y < H; y++) f[y] = g[y * W + x]; edt1(f, H, d, v, z); for (let y = 0; y < H; y++) g[y * W + x] = d[y]; }
      for (let y = 0; y < H; y++) { for (let x = 0; x < W; x++) f[x] = g[y * W + x]; edt1(f, W, d, v, z); for (let x = 0; x < W; x++) g[y * W + x] = d[x]; }
      return g;
    }
    const toIn = edt(1), toOut = edt(0);
    // exact distances near the boundary, using a bucket grid of segments
    const CELL = 16, GW = Math.ceil(W / CELL), GH = Math.ceil(H / CELL), grid = Array.from({ length: GW * GH }, () => []);
    segs.forEach((g, idx) => {
      const x0 = Math.floor(Math.min(g[0], g[2]) / CELL), x1 = Math.floor(Math.max(g[0], g[2]) / CELL);
      const y0 = Math.floor(Math.min(g[1], g[3]) / CELL), y1 = Math.floor(Math.max(g[1], g[3]) / CELL);
      for (let gy = Math.max(0, y0); gy <= Math.min(GH - 1, y1); gy++) for (let gx = Math.max(0, x0); gx <= Math.min(GW - 1, x1); gx++) grid[gy * GW + gx].push(idx);
    });
    const BAND = Math.ceil((FILLET + 3) * s), RC = Math.ceil((BAND + 2) / CELL), out = new Float32Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x, ins = inside[i] === 1;
      let dpx = ins ? Math.sqrt(toOut[i]) : Math.sqrt(toIn[i]);
      if (dpx < BAND + 1) {
        const px = x + 0.5, py = y + 0.5, cx = Math.floor(px / CELL), cy = Math.floor(py / CELL);
        let best = INF;
        for (let gy = cy - RC; gy <= cy + RC; gy++) for (let gx = cx - RC; gx <= cx + RC; gx++) {
          if (gx < 0 || gy < 0 || gx >= GW || gy >= GH) continue;
          for (const idx of grid[gy * GW + gx]) {
            const [x1, y1, x2, y2] = segs[idx], dx = x2 - x1, dy = y2 - y1, L = dx * dx + dy * dy;
            let t = L ? ((px - x1) * dx + (py - y1) * dy) / L : 0; t = Math.max(0, Math.min(1, t));
            const ex = x1 + t * dx - px, ey = y1 + t * dy - py, e = ex * ex + ey * ey;
            if (e < best) best = e;
          }
        }
        if (best < INF) dpx = Math.sqrt(best);
      }
      out[i] = (ins ? -dpx : dpx) / s;           // back to SVG units, negative inside
    }
    return out;
  }

  // ---------- 3. Ray-marching shader ----------
  const vs = `#version 300 es
    in vec2 aP; out vec2 vUv;
    void main() { vUv = aP; gl_Position = vec4(aP, 0.0, 1.0); }`;
  const fs = `#version 300 es
    precision highp float;
    in vec2 vUv; out vec4 o;
    uniform sampler2D uSdf; uniform mat3 uRot; uniform vec2 uAspect; uniform float uDist; uniform float uPx; uniform vec3 uAccent;
    const vec2 HALF = vec2(${(VW / 2).toFixed(1)}, ${(VH / 2).toFixed(1)});
    const vec2 TEX = vec2(${(VW + 2 * PAD).toFixed(1)}, ${(VH + 2 * PAD).toFixed(1)});
    const float HT = ${HALF_T.toFixed(1)}; const float R = ${FILLET.toFixed(1)};
    float sd2(vec2 q) {
      vec2 p = q + TEX * 0.5;                      // q centred on the badge -> texture units
      vec2 c = clamp(p, vec2(1.0), TEX - 1.0);
      return texture(uSdf, c / TEX).r + length(p - c);
    }
    float map(vec3 p) {
      float d2 = sd2(vec2(p.x, -p.y));
      vec2 w = vec2(d2 + R, abs(p.z) - HT + R);
      return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - R;
    }
    vec3 nrm(vec3 p) {
      vec2 e = vec2(0.9, 0.0);
      return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
    }
    vec3 env(vec3 r) {
      vec3 c = vec3(0.012);
      c += vec3(1.0) * smoothstep(0.45, 0.85, r.y) * 1.4;                                   // overhead softbox
      c += vec3(0.16) * smoothstep(-0.1, 0.6, r.y) * smoothstep(-0.2, 0.6, r.z);           // soft front fill
      c += vec3(1.0) * smoothstep(0.07, 0.0, abs(0.75 * r.x + 0.66 * r.y - 0.18)) * 1.3;   // diagonal streak
      c += vec3(0.8) * smoothstep(0.05, 0.0, abs(0.75 * r.x + 0.66 * r.y + 0.35)) * 0.8;   // second streak
      c += vec3(0.20) * smoothstep(-0.2, -0.9, r.y);                                         // floor bounce
      c += uAccent * smoothstep(0.6, 0.98, -r.x) * 0.35;                                     // magenta kicker
      return c;
    }
    float h1(float x) { return fract(sin(x * 127.1) * 43758.5453); }
    float n1(float x) { float i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(h1(i), h1(i + 1.0), f); }
    // brushed grain: fine lines along X on the faces, along Z on the side walls
    float grain(vec3 p, vec3 n) {
      float u = abs(n.z) > 0.6 ? p.y + n1(p.x * 0.02) * 3.0 : p.z + n1((p.x + p.y) * 0.02) * 3.0;
      return 0.6 * n1(u * 0.9) + 0.4 * n1(u * 2.6 + 3.0);
    }
    void main() {
      vec3 ro = vec3(0.0, 0.0, uDist), rd = normalize(vec3(vUv * uAspect, -1.0));
      ro = ro * uRot; rd = rd * uRot;                // into object space (transpose of uRot)
      float t = uDist - 300.0, tmax = uDist + 300.0, best = 1e9; bool hit = false;
      for (int i = 0; i < 140; i++) {
        float d = map(ro + rd * t);
        best = min(best, d / t);
        if (d < 0.01 * t / uDist + 0.005) { hit = true; break; }
        t += d * 0.9;
        if (t > tmax) break;
      }
      if (!hit) { float a = 1.0 - smoothstep(0.0, uPx, best); o = vec4(0.0, 0.0, 0.0, 0.0) * a; return; }
      vec3 p = ro + rd * t, n = nrm(p), v = -rd;
      float g = grain(p, n);
      vec3 tang = abs(n.z) > 0.6 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0);
      n = normalize(n + tang * (g - 0.5) * 0.045);       // grain bends the reflection slightly
      vec3 r = reflect(rd, n);
      vec3 nW = uRot * n, rW = uRot * r, vW = uRot * v;   // shade in world space so lights stay put
      float fres = pow(1.0 - max(dot(nW, vW), 0.0), 4.0);
      vec3 base = vec3(0.10, 0.10, 0.11);
      vec3 col = env(rW) * mix(base * 5.0, vec3(1.0), fres) + uAccent * fres * 0.08;
      col *= 0.9 + 0.2 * g;                           // brushed streaks in brightness
      col = col / (col + vec3(0.9));
      o = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
    }`;
  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }

  let prog, uRot, uAspect, uDist, uPx;
  try {
    // Distance field texture (half float, filterable in WebGL2)
    const TW = window.LOGO_TEX || 1024, TH = Math.round(TW * (VH + 2 * PAD) / (VW + 2 * PAD));
    const sdf = buildSDF(TW, TH);
    const flip = new Float32Array(TW * TH);       // texture row 0 = top of SVG
    flip.set(sdf);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R16F, TW, TH, 0, gl.RED, gl.FLOAT, flip);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aP"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(prog, "uSdf"), 0);
    gl.uniform3f(gl.getUniformLocation(prog, "uAccent"), 0.984, 0.0, 0.408);
    uRot = gl.getUniformLocation(prog, "uRot"); uAspect = gl.getUniformLocation(prog, "uAspect");
    uDist = gl.getUniformLocation(prog, "uDist"); uPx = gl.getUniformLocation(prog, "uPx");
  } catch (e) { console.warn("logo3d:", e.message); return; }

  const FOV = 0.42, DIST = 680;
  // Spins on its own; while the cursor is over the logo, it turns to face the cursor instead.
  let hover = false, hx = 0, hy = 0, yaw = 0, pitch = -0.14, last = 0;
  box.addEventListener("pointerenter", () => { hover = true; });
  box.addEventListener("pointerleave", () => { hover = false; });
  box.addEventListener("pointermove", e => {
    const r = box.getBoundingClientRect();
    hx = ((e.clientX - r.left) / r.width) * 2 - 1; hy = ((e.clientY - r.top) / r.height) * 2 - 1;
  });
  const still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), w = box.clientWidth, h = box.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    const k = Math.tan(FOV / 2);
    gl.uniform2f(uAspect, k * w / h, k);
    gl.uniform1f(uDist, DIST);
    gl.uniform1f(uPx, 2.0 * k / canvas.height * 1.5);
  }
  function rot(rx, ry) {
    const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
    // R = Rx * Ry, column-major for GLSL
    return new Float32Array([cy, sx * sy, -cx * sy, 0, cx, sx, sy, -sx * cy, cx * cy]);
  }
  function frame(t) {
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016; last = t;
    const k = 1 - Math.exp(-dt * 6);
    if (hover) {
      // ease to the nearest front-facing angle, then follow the cursor
      const front = Math.round(yaw / (2 * Math.PI)) * 2 * Math.PI;
      yaw += (front + hx * 0.6 - yaw) * k;
      pitch += (-0.14 + hy * 0.45 - pitch) * k;
    } else {
      if (!still) yaw += dt * 0.55;                  // about one turn every 11 seconds
      pitch += (-0.14 + Math.sin(t / 3000) * 0.06 - pitch) * k;
    }
    gl.uniformMatrix3fv(uRot, false, rot(pitch, yaw));
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(frame);
  }
  box.replaceChildren(canvas);
  size(); window.addEventListener("resize", size);
  requestAnimationFrame(frame);
})();
