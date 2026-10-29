// ─────────────────────────────────────────────────────────────
// TOUR · a short guided first visit, only on this site's demo.
//
// Shown once per browser to people without a key. Seven small steps,
// each pointing at the thing it describes with a ring that follows it.
// You can do what a step asks (open an orb, mark it) and it moves on by
// itself, or press Next. Skip or Esc ends it; "Take the tour" in How to
// use brings it back.
// ─────────────────────────────────────────────────────────────

(() => {
  if (!window.CELESTIAL_DEMO) return;   // no demo (a key is saved, or on claude.ai)
  const DONE = 'celestial.toured';
  const store = {
    get: () => { try { return localStorage.getItem(DONE); } catch { return '1'; } },   // no storage: don't nag on every visit
    set: () => { try { localStorage.setItem(DONE, '1'); } catch { /* fine */ } },
  };
  const $ = (s) => document.querySelector(s);
  const orbNamed = (title) => [...document.querySelectorAll('.orb')].find((el) => el.querySelector('.t')?.textContent === title);
  const opened = () => $('.orb.is-selected:not(.sun)');
  const FIRST = 'Uneven cooling';

  const STEPS = [
    {
      target: () => $('.orb.sun'),
      kicker: 'Welcome',
      title: 'One question, mapped as a solar system',
      text: 'This demo explores a real engineering question: why is an injection-moulded part warping? The question sits at the centre. Every orb around it is a topic the research turned up.',
    },
    {
      target: () => orbNamed(FIRST),
      kicker: 'Reading the map',
      title: 'Where an orb sits tells you what it is',
      text: 'Causes sit below the centre with violet outlines, effects sit above in cyan, related topics around the middle. Bigger orbs matter more to the question; closer ones are more strongly linked.',
    },
    {
      target: () => opened() || orbNamed(FIRST),
      kicker: 'Try it',
      title: `Click “${FIRST}” to open it`,
      text: 'Opening an orb researches it while you watch: a quick take streams in first, then the full card with what to check, a drawing and a Sources tab.',
      waitFor: () => opened(),
      hint: 'Waiting for you to open an orb…',
    },
    {
      target: () => opened()?.querySelector('.actions') || opened() || orbNamed(FIRST),
      reveal: '.actions',
      kicker: 'Go further',
      title: 'Expand, or go deeper',
      text: 'Expand makes this orb the new centre and maps what surrounds it. Go deeper opens it up instead: sub-systems, their parts and the plausible links between them, then threads you choose to follow. The path at the top always takes you back.',
    },
    {
      target: () => opened()?.querySelector('.verdict') || opened(),
      kicker: 'Steer it',
      title: 'Tell it what’s relevant',
      text: 'Mark orbs Relevant or Not relevant. The map pulls ticked orbs in and pushes crossed ones out, and a running Diagnosis appears bottom left with what your marks add up to.',
      waitFor: () => $('.verdict-btn[aria-pressed="true"]'),
      hint: 'Mark it, or press Next',
    },
    {
      target: () => $('#reason-toggle'),
      kicker: 'See the thinking',
      title: 'Progressive mode',
      text: 'Turn on Progressive to watch a map being built one step at a time. Hover any line, or tap it, to see why it exists, where that comes from and how reliable it is.',
    },
    {
      target: () => $('#prompt'),
      kicker: 'Your turn',
      title: 'Explore on your own',
      text: 'Everything in this demo was researched in advance and replays as if live, so you can open, expand and go deeper anywhere on this question. To ask your own questions, add a Claude API key.',
      last: true,
    },
  ];

  // ─── The card and the ring ─────────────────────────────────
  const ring = document.createElement('div');
  ring.className = 'tour-ring';
  ring.hidden = true;
  const card = document.createElement('section');
  card.className = 'tour';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-live', 'polite');
  card.setAttribute('aria-label', 'Guided tour');
  card.hidden = true;
  document.body.append(ring, card);

  let at = -1, raf = 0, poll = 0;
  const notice = () => document.getElementById('demo-notice');

  function render() {
    const s = STEPS[at];
    card.innerHTML = `
      <div class="tour-head">
        <span class="tour-kicker">${s.kicker} · ${at + 1} of ${STEPS.length}</span>
        <button type="button" class="tour-skip" data-tour="skip">Skip tour</button>
      </div>
      <h2 class="tour-title"></h2>
      <p class="tour-text"></p>
      ${s.waitFor ? `<p class="tour-hint"><span class="tour-dot"></span>${s.hint}</p>` : ''}
      <div class="tour-foot">
        <span class="tour-dots" aria-hidden="true">${STEPS.map((_, i) => `<i class="${i === at ? 'on' : i < at ? 'done' : ''}"></i>`).join('')}</span>
        <span class="tour-buttons">
          ${at > 0 ? '<button type="button" class="tour-back" data-tour="back">Back</button>' : ''}
          ${s.last
            ? '<button type="button" class="tour-back" data-tour="key">Add API key</button><button type="button" class="tour-next" data-tour="end">Start exploring</button>'
            : `<button type="button" class="tour-next" data-tour="next">${at === 0 ? 'Show me' : 'Next'}</button>`}
        </span>
      </div>`;
    card.querySelector('.tour-title').textContent = s.title;
    card.querySelector('.tour-text').textContent = s.text;
    card.querySelector('.tour-next')?.focus({ preventScroll: true });
    // Scroll the opened card to what this step is about
    if (s.reveal) opened()?.querySelector(s.reveal)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    clearInterval(poll);
    // Doing what the step asks moves the tour on by itself
    if (s.waitFor) poll = setInterval(() => { if (s.waitFor()) { clearInterval(poll); setTimeout(() => go(at + 1), 900); } }, 300);
  }

  // The ring follows its target every frame (orbs drift and grow as they open)
  function follow() {
    const el = STEPS[at]?.target();
    const r = el?.getBoundingClientRect();
    if (r && r.width) {
      const pad = 8, round = el.classList.contains('orb') && !el.classList.contains('is-selected');
      Object.assign(ring.style, {
        left: `${r.left - pad}px`, top: `${r.top - pad}px`,
        width: `${r.width + pad * 2}px`, height: `${r.height + pad * 2}px`,
        borderRadius: round ? '50%' : '18px',
      });
      ring.hidden = false;
      place(r);
    } else { ring.hidden = true; place(null); }
    raf = requestAnimationFrame(follow);
  }

  // Beside what it points at when there's room, otherwise above or below it
  function place(r) {
    const cw = card.offsetWidth, ch = card.offsetHeight, gap = 24, edge = 16;
    let left = null;
    if (r && innerWidth > 760) {
      if (r.right + gap + cw <= innerWidth - edge) left = r.right + gap;
      else if (r.left - gap - cw >= edge) left = r.left - gap - cw;
    }
    card.classList.toggle('beside', left != null);
    if (left != null) {
      const top = Math.min(Math.max(r.top + r.height / 2 - ch / 2, 76), innerHeight - ch - edge);
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
    } else {
      card.style.left = card.style.top = '';
      card.classList.toggle('at-top', Boolean(r) && r.top + r.height / 2 >= innerHeight * 0.55);
    }
  }

  function go(i) {
    if (i >= STEPS.length) return end();
    at = Math.max(0, i);
    card.hidden = false;
    render();
  }
  function start() {
    if (notice()) notice().hidden = true;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(follow);
    go(0);
  }
  function end() {
    clearInterval(poll);
    cancelAnimationFrame(raf);
    card.hidden = true;
    ring.hidden = true;
    at = -1;
    store.set();
    // The demo notice comes back unless it was closed this visit
    let closed = false;
    try { closed = Boolean(sessionStorage.getItem('celestial.demoClosed')); } catch { /* fine */ }
    if (notice() && !closed) notice().hidden = false;
  }

  card.addEventListener('click', (e) => {
    const a = e.target.closest('[data-tour]')?.dataset.tour;
    if (a === 'next') go(at + 1);
    if (a === 'back') go(at - 1);
    if (a === 'skip' || a === 'end') end();
    if (a === 'key') { end(); document.getElementById('demo-key')?.click(); }
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && at >= 0) end(); });

  // "Take the tour" in How to use
  const again = document.createElement('button');
  again.type = 'button';
  again.className = 'tour-again';
  again.textContent = 'Take the guided tour';
  again.addEventListener('click', () => { document.querySelector('[data-close="help"]')?.click(); start(); });
  document.querySelector('#help-panel .panel-body')?.prepend(again);

  // First visit: start once the map has settled
  if (!store.get()) setTimeout(start, 1400);
})();
