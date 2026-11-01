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

  // The deeper ring (demo-deeper.js): each entry is a card, a map and a deep pass in one
  for (const [title, t] of Object.entries(C.more || {})) {
    const k = key(title);
    cards[k] ||= { about: t.about, check: t.check, wikipedia: t.wiki || '', sources: t.src };
    if (t.map) maps[k] ||= { liner: t.liner, reading: t.map[0], orbs: t.map[1], links: t.map[2] };
    if (t.subs) deeps[k] ||= { liner: t.liner, reading: t.reading, subs: t.subs, connections: t.conn, threads: t.threads, sources: t.src };
  }

  // The example's own maps beyond the start become preloaded maps
  const exampleLiner = new Map(Object.values(DATA.topics).map((t) => [key(t.title), t.liner]));
  for (const [id, system] of Object.entries(DATA.systems)) {
    const r = DATA.reasons?.[id] || {};
    const why = (x) => (Array.isArray(x) ? { tier: x[0], basis: x[1], why: x[2] } : x ? { tier: x.tier, basis: x.from, why: x.why } : {});
    maps[key(titleOf(id))] ||= {
      liner: DATA.topics[id].liner,
      reading: r._centre || '',
      orbs: system.map((s) => ({ title: titleOf(s.to), liner: DATA.topics[s.to].liner, rel: s.rel, link: s.link, relevance: s.relevance, ...why(r[s.to]) })),
      links: (DATA.crossLinks[id] || []).map(([a, b, strength]) => ({ a: titleOf(a), b: titleOf(b), strength, ...why(r[`${a}~${b}`]) })),
    };
    // The start stays drawn as it is; the others are "researched" when you reach them
    if (id === DATA.start) continue;
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

  // Every one-liner the content knows, so a map row can leave its liner blank
  const liners = new Map(exampleLiner);
  for (const [t, x] of Object.entries(C.more || {})) liners.set(key(t), x.liner);
  for (const m of Object.values(maps)) for (const o of m.orbs) if (Array.isArray(o) && o[4] && !liners.has(key(o[0]))) liners.set(key(o[0]), o[4]);
  for (const d of Object.values(deeps)) for (const s of d.subs || []) {
    if (!liners.has(key(s[0]))) liners.set(key(s[0]), s[1]);
    for (const p of s[6]) if (p[1] && !liners.has(key(p[0]))) liners.set(key(p[0]), p[1]);
  }
  for (const [t, m] of Object.entries(maps)) if (!liners.has(t)) liners.set(t, m.liner);

  // Compact rows → objects. Map orbs: [title, rel, link, relevance, liner, why, basis, tier]
  // ('' for liner means "the example's own one-liner"); links: [a, b, strength, why, basis, tier]
  for (const m of Object.values(maps)) {
    m.orbs = m.orbs.map((o) => (Array.isArray(o)
      ? { title: o[0], rel: o[1], link: o[2], relevance: o[3], liner: o[4] || liners.get(key(o[0])) || '', why: o[5] || '', basis: o[6] || '', tier: o[7] || 6 }
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
        parts: parts.map(([pt, pl, relevance, pw, pb, ptier, pcite]) => ({ title: pt, liner: pl || liners.get(key(pt)) || '', relevance, why: pw, basis: pb, tier: ptier, cite: pcite })),
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

  // Every other orb points at the topic it is really about (demo-aliases.js), so
  // Expand and Go deeper keep working at any depth. Up to three hops.
  const alias = lowered(C.alias);
  // An entry can list a second choice, used when the first is where you already are
  const resolve = (table, title, avoid = new Set()) => {
    const walk = (k, hop) => {
      if (!k || hop > 3) return null;
      if (table[k] && (!hop || !avoid.has(k))) return { k, via: hop ? title : null };
      for (const next of [].concat(alias[k] || [])) {
        const found = walk(key(next), hop + 1);
        if (found) return found;
      }
      return null;
    };
    return walk(key(title), 0);
  };
  const nameOf = (k) => Object.keys(C.more || {}).concat(Object.keys(C.maps || {}), Object.keys(C.deep || {}), Object.values(DATA.topics).map((t) => t.title)).find((t) => key(t) === k) || k;
  // Sub-systems found inside a deeper pass, by title, with the pass they came from.
  // Going deeper into one opens each of its parts in turn (see subPass).
  const subsOf = (d) => (d.subs || []).map((x) => ({ title: x[0], liner: x[1], why: x[2], basis: x[3], tier: x[4], parts: x[6].map((p) => ({ title: p[0], liner: p[1] || liners.get(key(p[0])) || '', relevance: p[2], why: p[3], basis: p[4], tier: p[5] })) }))
    .concat((d.subsystems || []).map((x) => ({ title: x.title, liner: x.liner, why: x.why, basis: x.basis || x.from, tier: x.tier, parts: x.parts.map((p) => ({ title: p.title, liner: p.liner, relevance: p.relevance, why: p.why, basis: p.basis || p.from, tier: p.tier })) })));
  const subsIndex = new Map();
  for (const [k, d] of Object.entries(deeps)) for (const sub of subsOf(d)) {
    if (!subsIndex.has(key(sub.title))) subsIndex.set(key(sub.title), []);
    subsIndex.get(key(sub.title)).push({ parent: k, sub });
  }
  // Which sub-system a title means, given where you are (the view it was opened from)
  const subFor = (title, context = []) => {
    const found = subsIndex.get(key(title));
    if (!found) return null;
    for (const c of context) {
      const hit = found.find((f) => f.parent === key(c) || f.parent === resolve(deeps, c || '')?.k);
      if (hit) return hit;
    }
    return found[0];
  };
  // The topic you're in right now, so an orb inside it doesn't just reopen it
  const here = (table, context) => new Set(context.slice(0, 1).map((c) => resolve(table, c)?.k).filter(Boolean));
  const contextOf = (args) => [...(args.path || [])].reverse().concat(args.cameFrom || []).filter(Boolean);

  const leadIn = (title, k, what) => `“${title}” comes down to ${nameOf(k).toLowerCase()}, so ${what}. `;

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
  // Inside a sub-system: each of its parts becomes a sub-system of its own, and
  // that part's parts are the strongest findings from its own deeper pass (or,
  // failing that, its map). So a pass is always one level more specific.
  const strongest = (title, avoid) => {
    const r = resolve(deeps, title);
    if (r) {
      return subsOf(deeps[r.k]).flatMap((s) => s.parts)
        .filter((p) => !avoid.has(key(p.title))).sort((a, b) => b.relevance - a.relevance).slice(0, 3);
    }
    const m = mapFor(title);
    return (m?.orbs || []).filter((o) => !avoid.has(key(o.title))).sort((a, b) => b.relevance - a.relevance).slice(0, 3)
      .map((o) => ({ title: o.title, liner: o.liner, relevance: o.relevance, why: o.why, basis: o.basis, tier: o.tier }));
  };
  function subPass(title, context) {
    const { parent, sub } = subFor(title, context);
    const from = deeps[parent];
    const parentTitle = nameOf(parent);
    const avoid = new Set([key(title), parent, ...sub.parts.map((p) => key(p.title))]);
    const subs = sub.parts.map((p) => {
      let inner = strongest(p.title, avoid);
      // Two parts that lead to the same research: show it under the second too, minus repeats of the obvious
      if (!inner.length) inner = strongest(p.title, new Set([key(title), parent, key(p.title)]));
      inner.forEach((x) => avoid.add(key(x.title)));
      return [p.title, p.liner || liners.get(key(p.title)) || '', p.why, p.basis, p.tier, [],
        inner.map((x) => [x.title, x.liner || liners.get(key(x.title)) || '', x.relevance, x.why, x.basis, x.tier, []])];
    }).filter((x) => x[6].length);
    // Connections the deeper passes already found between the parts now on show
    const shown = new Set(subs.flatMap((x) => x[6].map((y) => key(y[0]))));
    const conn = [];
    for (const p of sub.parts) {
      const r = resolve(deeps, p.title);
      for (const c of (r && deeps[r.k].connections) || []) {
        const [a, b] = Array.isArray(c) ? c : [c.a, c.b];
        if (shown.has(key(a)) && shown.has(key(b)) && !conn.some((x) => key(x[0]) === key(a) && key(x[1]) === key(b))) conn.push(Array.isArray(c) ? [...c.slice(0, 7), []] : [a, b, c.kind, c.confidence, c.why, c.basis || c.from, c.tier, []]);
      }
    }
    const threads = sub.parts.map((p) => resolve(deeps, p.title)).filter(Boolean).map((r) => nameOf(r.k))
      .filter((t, i, all) => all.indexOf(t) === i && key(t) !== parent).slice(0, 3)
      .map((t) => [t, `What is going on inside ${t.toLowerCase()}?`, `One of the parts of ${title.toLowerCase()}, with its own deeper pass.`]);
    return {
      liner: sub.liner,
      reading: `You went deeper into ${title.toLowerCase()}, one of the sub-systems of ${parentTitle.toLowerCase()}. I opened each of its parts in turn and kept the strongest findings inside each, then looked for links between them.`,
      subs, connections: conn.slice(0, 5), threads,
      sources: (from.sources || []).map((x) => (Array.isArray(x) ? x : [x.tier, x.type, x.title, x.url || '', x.flag || ''])).slice(0, 4),
    };
  }
  function subMap(title, context) {
    const { parent, sub } = subFor(title, context);
    const parentTitle = nameOf(parent);
    return {
      liner: sub.liner,
      reading: `You expanded ${title.toLowerCase()}, one of the sub-systems of ${parentTitle.toLowerCase()}, so I mapped its parts and what each leads to.`,
      orbs: [
        { title: parentTitle, rel: 'related', link: 0.9, relevance: 0.85, liner: liners.get(parent) || '', why: `${title} is one of the sub-systems inside it.`, basis: sub.basis, tier: sub.tier },
        ...sub.parts.map((p) => ({ title: p.title, rel: 'cause', link: 0.8, relevance: p.relevance, liner: p.liner || liners.get(key(p.title)) || '', why: p.why, basis: p.basis, tier: p.tier })),
        ...sub.parts.flatMap((p) => strongest(p.title, new Set([key(title), parent, ...sub.parts.map((x) => key(x.title))])).slice(0, 2))
          .filter((o, i, all) => all.findIndex((x) => key(x.title) === key(o.title)) === i)
          .map((o) => ({ title: o.title, rel: 'related', link: 0.5, relevance: Math.min(0.7, o.relevance * 0.8), liner: o.liner || liners.get(key(o.title)) || '', why: o.why, basis: o.basis, tier: o.tier })),
      ].slice(0, 12),
      links: [],
    };
  }

  // A map for an aliased orb is its topic's map, with that topic as the strongest neighbour
  const mapFor = (centre, context = []) => {
    const r = resolve(maps, centre, here(maps, context)) || resolve(maps, centre);
    if (!r) return subFor(centre, context) ? subMap(centre, context) : null;
    const m = maps[r.k];
    if (!r.via) return m;
    const target = nameOf(r.k);
    return {
      liner: liners.get(key(centre)) || m.liner,
      reading: leadIn(centre, r.k, 'I mapped around that') + m.reading,
      orbs: [{ title: target, rel: 'related', link: 0.95, relevance: 0.95, liner: m.liner, why: `${centre} is one face of ${target.toLowerCase()}; opening that shows the whole mechanism.`, basis: 'How the topics fit together', tier: 3 },
        ...m.orbs.filter((o) => key(o.title) !== key(centre) && key(o.title) !== r.k)],
      links: m.links.filter((l) => key(l.a) !== key(centre) && key(l.b) !== key(centre)),
    };
  };

  async function quickMap({ centre, cameFrom, reasons, onCentre, onOrb, path }) {
    const m = mapFor(centre, contextOf({ path, cameFrom }));
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

  async function map({ centre, reasons, path, cameFrom }) {
    const m = mapFor(centre, contextOf({ path, cameFrom }));
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

  async function deep({ topic, path }) {
    const r = resolve(deeps, topic, here(deeps, contextOf({ path }))) || resolve(deeps, topic);
    await wait(between(PACE.deep));
    if (!r && subFor(topic, contextOf({ path }))) return tidyDeep(topic, subPass(topic, contextOf({ path })));
    if (!r) throw missing();
    const out = tidyDeep(topic, clone(deeps[r.k]));
    if (r.via) {
      out.centre.reading = leadIn(topic, r.k, 'this pass opens that up') + (out.centre.reading || '');
      // Don't show the orb you came in through as a part of itself
      for (const sub of out.subsystems) sub.parts = sub.parts.filter((p) => key(p.title) !== key(topic));
      out.subsystems = out.subsystems.filter((sub) => sub.parts.length && key(sub.title) !== key(topic));
    }
    return out;
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
    hasMap: (title) => Boolean(resolve(maps, title) || subsIndex.has(key(title))),
    hasDeep: (title) => Boolean(resolve(deeps, title) || subsIndex.has(key(title))),
    hasDetails: (title) => Boolean(cards[key(title)] || known.has(key(title))),
    // The example's id for a title, so preloaded maps reuse the orbs you already know
    idFor: (title) => Object.keys(DATA.topics).find((id) => !id.startsWith('in:') && !id.startsWith('t-') && key(DATA.topics[id].title) === key(title)) || null,
    PACE,
  };
})();
