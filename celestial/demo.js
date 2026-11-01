// ─────────────────────────────────────────────────────────────
// DEMO · replays preloaded research as if Claude were doing it live.
//
// Only on this site (not in the claude.ai artifact). Without an API key the
// app runs on backend 'demo': every call research.js would send to Claude
// is answered from demo-*.js instead, with the same loading states, timing
// and staged reveal as the real thing. The quick sketch streams its orbs
// one by one, the full map lands a few seconds later, an opened orb gets a
// quick take word by word before the full card, and a deeper pass takes a
// while. Saving a key switches all of this off.
//
// Content (window.CELESTIAL_DEMO_CONTENT), looked up by topic title:
//   details[title] – what an opened orb shows
//   maps[title]    – what Expand finds around it
//   deep[title]    – what Go deeper finds inside it
// The example's own maps, details and deep pass are moved in here too, so
// everything in the demo is "researched" when you reach it.
// ─────────────────────────────────────────────────────────────

(() => {
  const R = window.CELESTIAL_RESEARCH, DATA = window.CELESTIAL_DATA, C = window.CELESTIAL_DEMO_CONTENT;
  if (!R || !DATA || !C) return;
  // A saved key (or claude.ai) means real research: leave the example alone
  const hasKey = (() => { try { return Boolean(localStorage.getItem('celestial.key')); } catch { return false; } })();
  if (hasKey || window.claude?.use) return;

  // How long each kind of research takes, in milliseconds [shortest, longest].
  // Shorter than the real thing (a full map can take half a minute) so the
  // demo stays watchable, but long enough to see each stage.
  const PACE = {
    firstToken: [700, 1200],    // before the quick sketch starts writing
    perOrb: [260, 520],         // between orbs in the sketch
    sketchOrbs: 11,             // how many orbs the sketch shows before the full map
    fullAfterSketch: [2200, 3800],
    quickTake: [600, 900],      // before an opened orb's quick take starts
    perWord: [28, 55],
    details: [4200, 6500],      // until the full card arrives
    deep: [9000, 13000],        // a deeper pass
    digest: [1800, 2800],       // the written answer in the findings panel
  };
  const between = ([a, b]) => a + Math.random() * (b - a);
  const wait = (ms) => new Promise((done) => setTimeout(done, ms));
  const key = (t) => String(t || '').trim().toLowerCase();
  const titleOf = (id) => DATA.topics[id]?.title;

  // ─── Normalise the content into the shapes research.js returns ─
  const lowered = (table) => Object.fromEntries(Object.entries(table || {}).map(([t, v]) => [key(t), v]));
  const maps = lowered(C.maps), cards = lowered(C.details), deeps = lowered(C.deep);

  // The example's own maps beyond the start become preloaded maps
  const exampleLiner = new Map(Object.values(DATA.topics).map((t) => [key(t.title), t.liner]));
  for (const [id, system] of Object.entries(DATA.systems)) {
    if (id === DATA.start) continue;
    const r = DATA.reasons?.[id] || {};
    const why = (x) => (Array.isArray(x) ? { tier: x[0], basis: x[1], why: x[2] } : x ? { tier: x.tier, basis: x.from, why: x.why } : {});
    maps[key(titleOf(id))] ||= {
      liner: DATA.topics[id].liner,
      reading: r._centre || '',
      orbs: system.map((s) => ({ title: titleOf(s.to), liner: DATA.topics[s.to].liner, rel: s.rel, link: s.link, relevance: s.relevance, ...why(r[s.to]) })),
      links: (DATA.crossLinks[id] || []).map(([a, b, strength]) => ({ a: titleOf(a), b: titleOf(b), strength, ...why(r[`${a}~${b}`]) })),
    };
    delete DATA.systems[id];
    delete DATA.crossLinks[id];
    delete DATA.reasons[id];
  }
  // …and so do its example cards and deep pass, unless the demo has better ones
  for (const [id, d] of Object.entries(DATA.details)) {
    cards[key(titleOf(id))] ||= { ...d, sources: (d.sources || []).map((s) => [s.tier, s.type, s.title, '', s.flag || '']) };
    delete DATA.details[id];
  }
  for (const [id, d] of Object.entries(DATA.deep)) {
    deeps[key(titleOf(id))] ||= d;
    delete DATA.deep[id];
  }

  // Compact rows → objects. Map orbs: [title, rel, link, relevance, liner, why, basis, tier]
  // ('' for liner means "the example's own one-liner"); links: [a, b, strength, why, basis, tier]
  for (const m of Object.values(maps)) {
    m.orbs = m.orbs.map((o) => (Array.isArray(o)
      ? { title: o[0], rel: o[1], link: o[2], relevance: o[3], liner: o[4] || exampleLiner.get(key(o[0])) || '', why: o[5] || '', basis: o[6] || '', tier: o[7] || 6 }
      : o));
    m.links = (m.links || []).map((l) => (Array.isArray(l) ? { a: l[0], b: l[1], strength: l[2], why: l[3] || '', basis: l[4] || '', tier: l[5] || 6 } : l));
  }
  const source = (s) => {
    const [tier, type, title, url = '', flag = ''] = Array.isArray(s) ? s : [s.tier, s.type, s.title, s.url, s.flag];
    const host = url ? new URL(url).hostname.replace(/^www\./, '') : '';
    return { tier, type, title, url, host, checked: 'demo', video: false, flag };
  };
  // Deep passes: subs [title, liner, why, basis, tier, cite, parts]; parts [title, liner, relevance, why, basis, tier, cite];
  // connections [a, b, kind, confidence, why, basis, tier, cite]; threads [title, question, why]
  const tidyDeep = (title, d) => {
    if (d.subsystems) return R.tidyDeep(d, { example: true });   // the example's own shape
    return {
      centre: { title, liner: d.liner, reading: d.reading },
      subsystems: d.subs.map(([t, liner, why, basis, tier, cite, parts]) => ({
        title: t, liner, why, basis, tier, cite,
        parts: parts.map(([pt, pl, relevance, pw, pb, ptier, pcite]) => ({ title: pt, liner: pl, relevance, why: pw, basis: pb, tier: ptier, cite: pcite })),
      })),
      connections: d.connections.map(([a, b, kind, confidence, why, basis, tier, cite = []]) => ({ a, b, kind, confidence, why, basis, tier, cite })),
      threads: d.threads.map(([t, question, why]) => ({ title: t, question, why })),
      sources: d.sources.map(source),
      searched: 0,
    };
  };

  // Every orb the demo can show, so a card can be written for orbs that
  // only appear inside a preloaded map or deep pass
  const known = new Map();
  for (const m of Object.values(maps)) for (const o of m.orbs) if (!known.has(key(o.title))) known.set(key(o.title), { liner: o.liner, why: o.why, basis: o.basis, tier: o.tier });
  for (const d of Object.values(deeps)) {
    for (const s of d.subs || d.subsystems || []) {
      const sub = Array.isArray(s) ? { title: s[0], liner: s[1], why: s[2], basis: s[3], tier: s[4], parts: s[6].map((p) => ({ title: p[0], liner: p[1], why: p[3], basis: p[4], tier: p[5] })) } : s;
      for (const x of [sub, ...sub.parts]) if (!known.has(key(x.title))) known.set(key(x.title), x);
    }
  }

  const cardFor = (title, liner) => {
    const d = cards[key(title)];
    if (d) {
      const rows = d.chart?.rows || [];
      return {
        about: d.about,
        check: d.check || [],
        chart: rows.length >= 2 ? { title: d.chart.title, unit: d.chart.unit || '', note: d.chart.note || '', rows } : null,
        sources: (d.sources || []).map(source),
        searched: 0,
        diagram: d.diagram ? { kind: d.diagram.kind, caption: d.diagram.caption, nodes: d.diagram.nodes.map(([label, note = '']) => ({ label, note })) } : null,
        wikipedia: d.wikipedia || '',
      };
    }
    // An orb found while mapping: its card is what the research said about it
    const k = known.get(key(title));
    return {
      about: [k?.liner || liner, k?.why].filter(Boolean).join(' '),
      check: [], chart: null, sources: [], searched: 0, diagram: null, wikipedia: '',
    };
  };

  const missing = () => new Error('The demo has no preloaded research for this. Add your Claude API key in Settings to research it live.');
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const withoutReasons = (o) => { const { why, basis, tier, ...rest } = o; return rest; };

  // ─── The replays ───────────────────────────────────────────
  // The quick sketch and the full map run side by side, as in the real
  // thing: orbs stream in, then the full map refines them.
  const sketches = new Map();
  async function quickMap({ centre, cameFrom, reasons, onCentre, onOrb }) {
    const m = maps[key(centre)];
    if (!m) throw missing();
    let done;
    sketches.set(key(centre), new Promise((r) => { done = r; }));
    try {
      await wait(between(PACE.firstToken));
      onCentre?.({ title: centre, liner: m.liner });
      const order = [...m.orbs].filter((o) => key(o.title) !== key(cameFrom)).sort((a, b) => b.relevance - a.relevance).slice(0, PACE.sketchOrbs);
      for (const o of order) {
        await wait(between(PACE.perOrb));
        // The sketch's reasons are short first takes; the full map's replace them
        onOrb({ title: o.title, liner: o.liner, rel: o.rel, link: o.link, relevance: o.relevance, why: reasons ? o.why.split(/(?<=\.)\s/)[0] : '' });
      }
    } finally { done(); }
  }

  async function map({ centre, reasons }) {
    const m = maps[key(centre)];
    if (!m) { await wait(between(PACE.firstToken)); throw missing(); }
    await wait(200);   // let the sketch start first
    await sketches.get(key(centre));
    await wait(between(PACE.fullAfterSketch));
    const out = clone({ centre: { title: centre, liner: m.liner, reading: m.reading }, orbs: m.orbs, links: m.links });
    if (!reasons) {
      delete out.centre.reading;
      out.orbs = out.orbs.map(withoutReasons);
      out.links = out.links.map(withoutReasons);
    }
    return out;
  }

  // An opened orb: a quick take streams in, then the full card
  async function quickAbout({ topic, liner, onText }) {
    const card = cardFor(topic, liner);
    const take = card.about.split(/(?<=\.)\s/).slice(0, 2).join(' ');
    await wait(between(PACE.quickTake));
    let text = '';
    for (const word of take.split(' ')) {
      text += (text ? ' ' : '') + word;
      onText(text);
      await wait(between(PACE.perWord));
    }
    return text;
  }
  async function details({ topic, liner }) {
    await wait(between(PACE.details));
    return clone(cardFor(topic, liner));
  }

  async function deep({ topic }) {
    const d = deeps[key(topic)];
    await wait(between(PACE.deep));
    if (!d) throw missing();
    return tidyDeep(topic, clone(d));
  }

  // The findings panel: a short written answer from what's been ticked
  async function digest({ question, mode, relevant, notRelevant }) {
    await wait(between(PACE.digest));
    const first = (t) => (t || '').split(/(?<=\.)\s/)[0];
    const [lead, ...rest] = relevant;
    const diagnose = mode !== 'explore';
    const summary = [
      diagnose
        ? `Your marks point to ${lead.title.toLowerCase()} as the leading explanation for the ${question.toLowerCase()}.`
        : `Your marks centre on ${lead.title.toLowerCase()}.`,
      first(lead.about) || lead.liner,
      rest.length ? `It fits with ${rest.slice(0, 3).map((r) => r.title.toLowerCase()).join(rest.length > 2 ? ', ' : ' and ')}${rest.length > 3 ? ' and more' : ''}, which ${rest.length > 1 ? 'are' : 'is'} likely ${diagnose ? 'working through the same mechanism or making it worse' : 'part of the same picture'}.` : '',
      notRelevant.length ? `Ruling out ${notRelevant.slice(0, 2).map((t) => t.toLowerCase()).join(' and ')} narrows it further.` : '',
    ].filter(Boolean).join(' ');
    const next = relevant.flatMap((r) => (cards[key(r.title)]?.check || []).slice(0, 2)).slice(0, 4);
    return {
      title: diagnose ? `Most likely: ${lead.title}` : `Centred on ${lead.title}`,
      summary,
      next: next.length ? next : [`Open ${lead.title} and check what it lists.`],
    };
  }

  const pass = (name, demo) => {
    const real = R[name];
    R[name] = (args) => (args?.backend === 'demo' ? demo(args) : real(args));
  };
  pass('quickMap', quickMap);
  pass('map', map);
  pass('quickAbout', quickAbout);
  pass('details', details);
  pass('deep', deep);
  pass('digest', digest);

  // What the app asks before offering Expand, Go deeper or a thread
  window.CELESTIAL_DEMO = {
    hasMap: (title) => Boolean(maps[key(title)]),
    hasDeep: (title) => Boolean(deeps[key(title)]),
    hasDetails: (title) => Boolean(cards[key(title)] || known.has(key(title))),
    // The example's id for a title, so preloaded maps reuse the orbs you already know
    idFor: (title) => Object.keys(DATA.topics).find((id) => !id.startsWith('in:') && !id.startsWith('t-') && key(DATA.topics[id].title) === key(title)) || null,
    PACE,
  };
})();
