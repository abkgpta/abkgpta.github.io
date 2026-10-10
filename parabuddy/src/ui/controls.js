// Builds form controls from a small schema:
// { key, label, type: 'number' | 'select' | 'bool', min, max, step, unit, options, when, hint }
import { evaluate } from './expr.js';

const el = (tag, props = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null && v !== false) e.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids) if (kid) e.append(kid);
  return e;
};
export { el };

let uid = 0;
export const fmtNum = (v, step = 0.01) => {
  if (!Number.isFinite(+v)) return '';
  const d = Math.max(0, Math.min(4, Math.ceil(-Math.log10(step || 1)) || 0));
  const t = (+v).toFixed(d);
  return t.includes('.') ? t.replace(/\.?0+$/, '') : t;
};

// values: current object; onChange(key, value, { commit })
export function renderFields(container, schema, values, onChange, opts = {}) {
  container.replaceChildren();
  for (const f of schema) {
    if (f.when && !f.when(values)) continue;
    container.append(field(f, values[f.key], onChange, opts));
  }
}

export function field(f, value, onChange, opts = {}) {
  const id = `f${++uid}`;
  const overridden = opts.overridden && opts.overridden(f.key);
  if (f.type === 'bool') {
    const box = el('input', { type: 'checkbox', id, onchange: (e) => onChange(f.key, e.target.checked, { commit: true }) });
    box.checked = !!value;
    return el('label', { class: 'field check', for: id }, box, document.createTextNode(f.label));
  }
  const label = el('label', { class: 'label', for: id }, el('span', { text: f.label }));
  if (f.reset && overridden) label.append(el('a', { href: '#', text: 'reset', onclick: (e) => { e.preventDefault(); f.reset(); } }));
  const wrap = el('div', { class: `field${overridden ? ' overridden' : ''}` }, label);
  if (f.type === 'select') {
    const sel = el('select', { id, onchange: (e) => onChange(f.key, e.target.value, { commit: true, structural: true }) });
    for (const [k, v] of Object.entries(f.options)) sel.append(el('option', { value: k, text: v }));
    sel.value = value;
    wrap.append(sel);
  } else {
    const range = el('input', { type: 'range', min: f.min, max: f.max, step: f.step || 'any', tabindex: -1, 'aria-hidden': 'true' });
    const input = el('input', { type: 'text', id, inputmode: 'decimal', autocomplete: 'off' });
    range.value = value;
    input.value = fmtNum(value, f.step);
    range.addEventListener('input', () => {
      input.value = fmtNum(range.value, f.step);
      input.classList.remove('invalid');
      onChange(f.key, +range.value, { commit: false });
    });
    range.addEventListener('change', () => onChange(f.key, +range.value, { commit: true }));
    const apply = () => {
      const v = evaluate(input.value);
      // Typed values may go past the slider's range, but never negative where the slider is not.
      const ok = Number.isFinite(v) && (f.min === undefined || f.min < 0 || v >= 0);
      input.classList.toggle('invalid', !ok);
      if (!ok) return;
      range.value = v;
      input.value = fmtNum(v, Math.min(f.step || 0.01, 0.0001));
      onChange(f.key, v, { commit: true });
    };
    input.addEventListener('change', apply);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { apply(); input.select(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const cur = evaluate(input.value);
        const step = (f.step || 1) * (e.shiftKey ? 10 : 1);
        const v = +(cur + (e.key === 'ArrowUp' ? step : -step)).toFixed(6);
        input.value = fmtNum(v, f.step);
        apply();
      }
    });
    const num = el('div', { class: 'num' }, input, f.unit ? el('span', { class: 'unit', text: f.unit }) : null);
    wrap.append(el('div', { class: 'row' }, range, num));
  }
  if (f.hint) wrap.append(el('div', { class: 'hint', text: f.hint }));
  return wrap;
}
