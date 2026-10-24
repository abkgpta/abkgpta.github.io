// Dark-chrome, low-poly ABK badge in plain WebGL (no libraries).
// Falls back to the SVG logo if WebGL or the mesh isn't available.
(function () {
  const box = document.getElementById("logo3d");
  if (!box || typeof LOGO_MESH === "undefined") return;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl", { antialias: true, alpha: true, premultipliedAlpha: false });
  if (!gl) return;

  // Flat (faceted) geometry: unshare vertices and give each triangle its own normal.
  const pos = [], nor = [];
  for (const part of LOGO_MESH) {
    const P = part.p, I = part.i;
    for (let k = 0; k < I.length; k += 3) {
      const a = I[k] * 3, b = I[k + 1] * 3, c = I[k + 2] * 3;
      const ax = P[a], ay = P[a + 1], az = P[a + 2], bx = P[b], by = P[b + 1], bz = P[b + 2], cx = P[c], cy = P[c + 1], cz = P[c + 2];
      let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay), ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az), nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
      const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
      pos.push(ax, ay, az, bx, by, bz, cx, cy, cz);
      for (let r = 0; r < 3; r++) nor.push(nx, ny, nz);
    }
  }

  const vs = `
    attribute vec3 aPos; attribute vec3 aNor;
    uniform mat4 uModel; uniform mat4 uProj; uniform vec3 uEye;
    varying vec3 vN; varying vec3 vV;
    void main() {
      vec4 w = uModel * vec4(aPos, 1.0);
      vN = mat3(uModel) * aNor;
      vV = normalize(uEye - w.xyz);
      gl_Position = uProj * w;
    }`;
  const fs = `
    precision mediump float;
    varying vec3 vN; varying vec3 vV;
    uniform vec3 uAccent;
    // Procedural studio for chrome: dark room, two softboxes, a floor glow and a magenta kicker.
    vec3 env(vec3 r) {
      vec3 c = vec3(0.015);
      c += vec3(1.0) * smoothstep(0.45, 0.85, r.y) * 1.4;                                   // overhead softbox
      c += vec3(0.18) * smoothstep(-0.1, 0.6, r.y) * smoothstep(-0.2, 0.6, r.z);           // soft front fill
      c += vec3(1.0) * smoothstep(0.07, 0.0, abs(0.75 * r.x + 0.66 * r.y - 0.18)) * 1.3;   // diagonal chrome streak
      c += vec3(0.8) * smoothstep(0.05, 0.0, abs(0.75 * r.x + 0.66 * r.y + 0.35)) * 0.8;   // second, weaker streak
      c += vec3(0.20) * smoothstep(-0.2, -0.9, r.y);                                         // floor bounce
      c += uAccent * smoothstep(0.6, 0.98, -r.x) * 0.55;                                     // magenta kicker, left
      return c;
    }
    void main() {
      vec3 n = normalize(vN);
      if (!gl_FrontFacing) n = -n;
      vec3 v = normalize(vV);
      vec3 r = reflect(-v, n);
      float fres = pow(1.0 - max(dot(n, v), 0.0), 4.0);
      vec3 base = vec3(0.10, 0.10, 0.11);                 // dark chrome tint
      vec3 col = env(r) * mix(base * 5.0, vec3(1.0), fres) + uAccent * fres * 0.08;
      col = col / (col + vec3(0.9));                      // tone map
      gl_FragColor = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
    }`;
  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  let prog;
  try {
    prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) { console.warn("logo3d:", e.message); return; }
  gl.useProgram(prog);
  function buf(data, name) {
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
  }
  buf(pos, "aPos"); buf(nor, "aNor");
  const uModel = gl.getUniformLocation(prog, "uModel"), uProj = gl.getUniformLocation(prog, "uProj"), uEye = gl.getUniformLocation(prog, "uEye");
  gl.uniform3f(gl.getUniformLocation(prog, "uAccent"), 0.984, 0.0, 0.408);
  gl.enable(gl.DEPTH_TEST);
  const count = pos.length / 3;

  // Matrices (column-major)
  function persp(fov, asp, n, f) { const t = 1 / Math.tan(fov / 2); return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) / (n - f), -1, 0, 0, (2 * f * n) / (n - f), 0]; }
  function mul(a, b) { const o = new Array(16); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k]; o[i * 4 + j] = s; } return o; }
  function rotX(a) { const c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; }
  function rotY(a) { const c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; }
  const DIST = 66;
  const view = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -DIST, 1];

  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener("pointermove", e => { tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
  const still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), w = box.clientWidth, h = box.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniformMatrix4fv(uProj, false, new Float32Array(mul(persp(0.42, w / h, 1, 400), view)));
  }
  function frame(t) {
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    const s = still ? 0 : t / 1000;
    const ry = Math.sin(s * 0.5) * 0.42 + mx * 0.3, rx = -0.14 + Math.sin(s * 0.33) * 0.06 + my * 0.15;
    const model = mul(rotX(rx), rotY(ry));
    // eye in model-independent world space (camera at +Z)
    gl.uniformMatrix4fv(uModel, false, new Float32Array(model));
    gl.uniform3f(uEye, 0, 0, DIST);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, count);
    if (!still) requestAnimationFrame(frame);
  }
  box.replaceChildren(canvas);
  size(); window.addEventListener("resize", size);
  requestAnimationFrame(frame);
})();
