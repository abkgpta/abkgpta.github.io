// Safe arithmetic for number fields: "1.5*2", "(120-4)/3". No eval.
export function evaluate(text) {
  const s = String(text).replace(/,/g, '.').trim();
  if (!s) return NaN;
  let i = 0;
  const peek = () => s[i];
  const skip = () => { while (s[i] === ' ') i++; };
  function number() {
    skip();
    const m = /^\d*\.?\d+(e[+-]?\d+)?/i.exec(s.slice(i));
    if (!m) throw new Error('number');
    i += m[0].length;
    return parseFloat(m[0]);
  }
  function factor() {
    skip();
    if (peek() === '-') { i++; return -factor(); }
    if (peek() === '+') { i++; return factor(); }
    if (peek() === '(') { i++; const v = sum(); skip(); if (peek() !== ')') throw new Error(')'); i++; return v; }
    return number();
  }
  function product() {
    let v = factor();
    for (;;) { skip(); const c = peek(); if (c === '*') { i++; v *= factor(); } else if (c === '/') { i++; v /= factor(); } else return v; }
  }
  function sum() {
    let v = product();
    for (;;) { skip(); const c = peek(); if (c === '+') { i++; v += product(); } else if (c === '-') { i++; v -= product(); } else return v; }
  }
  try {
    const v = sum();
    skip();
    return i === s.length && Number.isFinite(v) ? v : NaN;
  } catch {
    return NaN;
  }
}
