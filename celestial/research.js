// ─────────────────────────────────────────────────────────────
// RESEARCH · asks Claude to map topics and find sources.
//
// It reaches Claude in one of two ways:
//  • On claude.ai: through your own Claude plan. No key needed; the
//    first request asks your permission. No web browsing there.
//  • On your own site: with your own Claude API key, kept in this
//    browser's storage and sent only to Anthropic's API.
//
// Two kinds of request:
//   map(…)     → the solar system around a topic (names, one-liners,
//                cause/effect/related, link and relevance numbers)
//   details(…) → what an opened orb shows: explanation, what to check,
//                optional chart, a diagram, rated sources (found with web search),
//                and a Wikipedia article to borrow a picture from
// ─────────────────────────────────────────────────────────────
(() => {
  // The official Anthropic SDK, loaded from a CDN only when first needed
  const SDK_URL = 'https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@0.128.0/+esm';

  const MODELS = {
    'claude-opus-5-5': { name: 'Claude Opus 5.5', input: 4, output: 20, fallback: true },
    'claude-sonnet-5-5': { name: 'Claude Sonnet 5.5', input: 2, output: 10, fallback: true },
    'claude-haiku-5-5': { name: 'Claude Haiku 5.5', input: 0.1, output: 0.5, fallback: false },
  };
  const WEB_SEARCH_COST = 10 / 1000;   // dollars per search

  // ─── Prompts ───────────────────────────────────────────────
  const MAP_SYSTEM = `You map topics for Celestial, a 3D research explorer. People use it mostly to diagnose problems (trace root causes) and sometimes to learn about a subject. It works for any field.

Given a centre topic, and the path of topics the person followed to reach it, return the topics that orbit the centre.

Orbiting topics (return 12 to 18):
- title: 1 to 5 words, a specific noun phrase. No trailing punctuation.
- liner: one plain sentence of at most 22 words saying what it is and how it connects to the centre.
- rel: "cause" if it can cause or contribute to the centre; "effect" if the centre causes or leads to it; otherwise "related".
- link (0 to 1): how strongly it is connected to the centre in general, regardless of this investigation.
- relevance (0 to 1): how much it matters for THIS line of reasoning, given the path. Spread the values out: only a few above 0.8, several below 0.4. The most relevant topics should clearly stand out.
- Include one to three hidden leads: topics with a low general link (0.4 or less) but high relevance here (0.65 or more). Non-obvious but plausible, worth checking.
- If a "came from" topic is given, include it with its exact title.

links: 4 to 12 pairs of orbiting topics (by exact title) that are strongly connected to each other, with strength 0.6 to 1.

centre: a short title for the centre topic (rewrite a question as the thing being investigated, e.g. "Why is my bread dense?" becomes "Dense bread") and a one-sentence liner.

Be accurate. Prefer specific, checkable topics over vague ones. When unsure about a connection, give it a lower link rather than leaving it out.`;

  const MODE_NOTES = {
    diagnose: 'Mode: diagnose. The person is investigating a problem. Make about half the topics causes (including root causes further upstream), some effects, and a few related methods, tests or tools.',
    explore: 'Mode: explore. The person typed a keyword or topic name to learn about it. Return mostly "related" topics that map the subject broadly: key concepts, subtopics, history, applications, neighbouring fields and notable debates. Use cause or effect only where it is clearly true.',
  };

  const DETAILS_SYSTEM = `You research one topic for Celestial, a 3D research explorer. Finish by calling the record_details tool exactly once.

- about: two to four plain sentences explaining what it is or how the mechanism works, in context.
- check: two to four concrete items. When diagnosing, things to measure or look at to confirm or rule this out. When exploring, the most useful things to explore next.
- chart: only when your sources give a genuinely useful numeric comparison (4 to 8 rows); otherwise use an empty rows list. Keep labels short.
- sources: three to six. Use only URLs that appeared in your search results; never invent one. Rate each with a tier:
  1 primary evidence: meta-analyses, systematic reviews, official statistics, datasets, standards, laws
  2 peer-reviewed papers, academic textbooks, institutional reports (e.g. WHO, IPCC, OECD, universities)
  3 edited reference and reputable journalism: encyclopedias including Wikipedia, major news outlets, analyst reports, official documentation
  4 expert but unvetted: preprints, expert blogs and newsletters, talks, lectures, documentaries, company white papers
  5 opinion and community: opinion pieces, general blogs, podcasts, general YouTube, forums, social media
  6 unsourced: a claim you are making without a source (url empty)
  Adjust a tier up or down for an unusually strong or weak example. flag is "" or one of: "Conflict of interest", "Outdated", "Disputed", "Retracted".
- diagram: a simple picture of the idea, which the app draws from your words. Choose the kind that explains it best:
  "chain" for a mechanism or process: 3 to 6 steps in order;
  "cycle" for a feedback loop: 3 to 5 steps, the last leading back to the first;
  "hub" for what it is made of, or the factors that feed into it: 3 to 6 parts.
  Each node: label of 2 to 5 words, note of at most 10 words (may be "" for a hub). caption: one sentence saying what the diagram shows. Use kind "none" with no nodes only if no diagram would help.
- wikipedia: the exact title of the English Wikipedia article whose lead image would best illustrate this topic, or "" if none fits.`;

  const DETAILS_TOOL = {
    name: 'record_details',
    description: 'Record the researched details for the topic. Call once, at the end.',
    strict: true,
    input_schema: {
      type: 'object',
      additionalProperties: false,
      required: ['about', 'check', 'chart', 'diagram', 'sources', 'wikipedia'],
      properties: {
        about: { type: 'string' },
        check: { type: 'array', items: { type: 'string' } },
        chart: {
          type: 'object',
          additionalProperties: false,
          required: ['title', 'unit', 'note', 'rows'],
          properties: {
            title: { type: 'string' },
            unit: { type: 'string' },
            note: { type: 'string' },
            rows: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['label', 'value'],
                properties: { label: { type: 'string' }, value: { type: 'number' } },
              },
            },
          },
        },
        sources: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['tier', 'type', 'title', 'url', 'flag'],
            properties: {
              tier: { type: 'integer', enum: [1, 2, 3, 4, 5, 6] },
              type: { type: 'string' },
              title: { type: 'string' },
              url: { type: 'string' },
              flag: { type: 'string' },
            },
          },
        },
        diagram: {
          type: 'object',
          additionalProperties: false,
          required: ['kind', 'caption', 'nodes'],
          properties: {
            kind: { type: 'string', enum: ['chain', 'cycle', 'hub', 'none'] },
            caption: { type: 'string' },
            nodes: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['label', 'note'],
                properties: { label: { type: 'string' }, note: { type: 'string' } },
              },
            },
          },
        },
        wikipedia: { type: 'string' },
      },
    },
  };

  const MAP_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: ['centre', 'orbs', 'links'],
    properties: {
      centre: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'liner'],
        properties: { title: { type: 'string' }, liner: { type: 'string' } },
      },
      orbs: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['title', 'liner', 'rel', 'link', 'relevance'],
          properties: {
            title: { type: 'string' },
            liner: { type: 'string' },
            rel: { type: 'string', enum: ['cause', 'effect', 'related'] },
            link: { type: 'number' },
            relevance: { type: 'number' },
          },
        },
      },
      links: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['a', 'b', 'strength'],
          properties: { a: { type: 'string' }, b: { type: 'string' }, strength: { type: 'number' } },
        },
      },
    },
  };

  // ─── Your Claude plan (only when the page is opened on claude.ai) ─
  let samplePromise = null;
  function getSample() {
    if (!samplePromise) {
      samplePromise = (window.claude?.use ? window.claude.use('sample') : Promise.resolve(null)).catch(() => null);
    }
    return samplePromise;
  }
  // retry: ask claude.ai again (an earlier "no" can be a timing hiccup)
  async function planAvailable(retry = false) {
    if (retry && !(await getSample())) samplePromise = null;
    return Boolean(await getSample());
  }
  // Why Claude can't be used here, as far as claude.ai will say:
  // "denied" (this viewer turned it off for the page), or "unavailable"
  async function planState() {
    try {
      const perms = await window.claude?.use?.('permissions');
      return perms ? await perms.state('sample') : 'unavailable';
    } catch { return 'unavailable'; }
  }
  async function openPermissions() {
    const perms = await window.claude?.use?.('permissions');
    if (!perms) throw new Error('unavailable');
    await perms.manage();
  }

  // How a reply should look, spelled out for requests made on your plan
  const MAP_JSON = 'Reply with only JSON in exactly this shape: {"centre":{"title":"","liner":""},"orbs":[{"title":"","liner":"","rel":"cause|effect|related","link":0.5,"relevance":0.5}],"links":[{"a":"orb title","b":"orb title","strength":0.7}]}';
  const PLAN_DETAILS = `You research one topic for Celestial, a 3D research explorer. You cannot browse the web here, so draw on what you know and be honest about it.

- about: two to four plain sentences explaining what it is or how the mechanism works, in context.
- check: two to four concrete items. When diagnosing, things to measure or look at to confirm or rule this out. When exploring, the most useful things to explore next.
- chart: only when you know a genuinely useful, well-established numeric comparison (4 to 8 rows) — otherwise an empty rows list. Keep labels short; say in the note that values are typical.
- diagram: a simple picture of the idea, which the app draws from your words. Choose the kind that explains it best:
  "chain" for a mechanism or process: 3 to 6 steps in order;
  "cycle" for a feedback loop: 3 to 5 steps, the last leading back to the first;
  "hub" for what it is made of, or the factors that feed into it: 3 to 6 parts.
  Each node: label of 2 to 5 words, note of at most 10 words (may be "" for a hub). caption: one sentence saying what the diagram shows. Use kind "none" with no nodes only if no diagram would help.
- sources: three to six that you are confident exist (textbooks, standards, reviews, landmark papers, encyclopedia articles, official bodies), described well enough to find: author or organisation, year, title. Leave url empty unless it is a stable address you are certain of, such as a Wikipedia article. Rate each with a tier:
  1 primary evidence: meta-analyses, systematic reviews, official statistics, datasets, standards, laws
  2 peer-reviewed papers, academic textbooks, institutional reports
  3 encyclopedias including Wikipedia, major news outlets, analyst reports, official documentation
  4 preprints, expert blogs, talks, lectures, documentaries, company white papers
  5 opinion pieces, general blogs, podcasts, forums, social media
  6 a point you are making without a source you can name (url empty)
  flag is "" or one of: "Conflict of interest", "Outdated", "Disputed", "Retracted".

Reply with only JSON in exactly this shape: {"about":"","check":[""],"chart":{"title":"","unit":"","note":"","rows":[{"label":"","value":0}]},"diagram":{"kind":"chain|cycle|hub|none","caption":"","nodes":[{"label":"","note":""}]},"sources":[{"tier":3,"type":"","title":"","url":"","flag":""}]}`;

  async function askPlan(prompt, tier) {
    const sample = await getSample();
    if (!sample) throw { code: 'sampling_disabled' };
    spend.requests += 1;
    return sample.json(prompt, { modelTier: tier || 'default' });
  }

  // ─── Connection to Claude with an API key ──────────────────
  let sdk = null, client = null, clientKey = null;
  async function getClient(key) {
    if (!sdk) sdk = await import(SDK_URL);
    if (!client || clientKey !== key) {
      clientKey = key;
      client = new sdk.default({ apiKey: key, dangerouslyAllowBrowser: true });
    }
    return client;
  }

  // Running total of what this browser session has spent
  const spend = { dollars: 0, requests: 0, searches: 0 };
  function count(model, usage) {
    const price = MODELS[model] || MODELS['claude-opus-5-5'];
    const input = (usage.input_tokens || 0) + (usage.cache_creation_input_tokens || 0) * 1.25 + (usage.cache_read_input_tokens || 0) * 0.1;
    const searches = usage.server_tool_use?.web_search_requests || 0;
    spend.dollars += (input * price.input + (usage.output_tokens || 0) * price.output) / 1e6 + searches * WEB_SEARCH_COST;
    spend.requests += 1;
    spend.searches += searches;
  }

  // One request. Refusals on Opus/Sonnet are retried on a fallback model
  // automatically by Anthropic's servers ("fallbacks: default").
  async function ask(key, model, params) {
    const c = await getClient(key);
    const fallback = MODELS[model]?.fallback;
    const res = await c.beta.messages.create({
      model,
      max_tokens: 16000,
      ...params,
      ...(fallback ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' } : {}),
    });
    count(model, res.usage);
    if (res.stop_reason === 'refusal') {
      throw new Error('Claude declined this request. Try rephrasing the topic.');
    }
    return res;
  }

  // Turn errors into sentences a person can act on
  const PLAN_ERRORS = {
    not_granted: 'You didn’t allow this page to use Claude. Reload the page to be asked again.',
    sampling_disabled: 'Claude isn’t available to this page for your account.',
    rate_limited: 'Your Claude plan’s usage limit is reached for now, or too many requests are running. Try again a little later.',
    session_expired: 'Your claude.ai session expired. Sign in again, then reload.',
    refused: 'Claude declined this request. Try rephrasing the topic.',
    invalid_json: 'Claude’s answer came back incomplete. Try again.',
    empty_completion: 'Claude returned nothing. Try again, or rephrase.',
    prompt_too_large: 'That request was too long for Claude.',
  };
  function explain(err) {
    if (err && typeof err.code === 'string' && !(err instanceof Error)) {
      return PLAN_ERRORS[err.code] || 'Couldn’t reach Claude just now. Try again in a moment.';
    }
    const E = sdk?.default;
    if (E && err instanceof E.AuthenticationError) return 'Your API key was rejected. Check it in the View panel.';
    if (E && err instanceof E.PermissionDeniedError) return 'This API key isn’t allowed to use that model.';
    if (E && err instanceof E.RateLimitError) return 'Claude is rate-limiting this key. Wait a minute and try again.';
    if (E && err instanceof E.BadRequestError) return 'Claude couldn’t process the request: ' + (err.message || 'bad request');
    if (E && err instanceof E.APIConnectionError) return 'Couldn’t reach Claude. Check your connection.';
    if (E && err instanceof E.APIError) return `Claude returned an error (${err.status}). Try again in a moment.`;
    if (err?.message?.includes('import')) return 'Couldn’t load the Claude library. This only works on your own site, not inside a preview.';
    return err?.message || 'Something went wrong.';
  }

  const clamp01 = (n) => Math.min(1, Math.max(0, Number(n) || 0));

  // ─── What the person has ticked and crossed so far ─────────
  // feedback: { yes: [titles], no: [titles] }
  function feedbackNote(feedback) {
    const yes = feedback?.yes || [], no = feedback?.no || [];
    if (!yes.length && !no.length) return '';
    return [
      'The person has been marking topics as they go.',
      yes.length ? `Marked relevant: ${yes.join('; ')}.` : '',
      no.length ? `Marked not relevant: ${no.join('; ')}.` : '',
      'Weight your answer towards what they found relevant (raise the relevance of topics close to those, and dig further in that direction). Lower the relevance of anything close to what they ruled out, and do not suggest the ruled-out topics again.',
    ].filter(Boolean).join(' ');
  }

  // ─── digest: the running answer in the findings panel ───────
  const DIGEST_SYSTEM = `You keep the running answer for Celestial, a 3D research explorer. The person asked a question and is marking topics as relevant or not relevant to it. Write what their marks add up to so far.

- title: 2 to 7 words naming the current answer. When diagnosing, the most likely explanation (e.g. "Mould halves at different temperatures"). When exploring, the angle their picks point to.
- summary: two to four plain sentences. When diagnosing: the most likely explanation, how the relevant findings fit together, and how sure one can be. When exploring: what the relevant topics add up to.
- next: two to four concrete next steps. When diagnosing, the checks or fixes that would confirm or resolve it, most decisive first. When exploring, the most useful things to look into next.
Mention ruled-out topics only to say they were set aside. Be honest when the marks don't yet point anywhere clear.`;
  const DIGEST_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'summary', 'next'],
    properties: { title: { type: 'string' }, summary: { type: 'string' }, next: { type: 'array', items: { type: 'string' } } },
  };
  // relevant: [{ title, liner, about }], notRelevant: [titles]
  async function digest({ backend, tier, key, model, question, mode, relevant, notRelevant }) {
    const lines = [
      `Question: ${question}`,
      `Mode: ${mode === 'explore' ? 'exploring a subject' : 'diagnosing a problem'}.`,
      'Marked relevant:',
      ...relevant.map((r) => `- ${r.title}: ${r.liner}${r.about ? ' ' + r.about : ''}`),
      notRelevant.length ? `Marked not relevant: ${notRelevant.join('; ')}` : '',
    ].filter(Boolean).join('\n');
    let d;
    if (backend === 'plan') {
      d = await askPlan(DIGEST_SYSTEM + '\n\n' + lines + '\n\nReply with only JSON in exactly this shape: {"title":"","summary":"","next":[""]}', tier);
    } else {
      const res = await ask(key, model, {
        system: DIGEST_SYSTEM,
        output_config: { effort: 'low', format: { type: 'json_schema', schema: DIGEST_SCHEMA } },
        messages: [{ role: 'user', content: lines }],
      });
      try { d = JSON.parse(res.content.filter((b) => b.type === 'text').map((b) => b.text).join('')); } catch { d = null; }
    }
    if (!d || typeof d !== 'object' || !d.summary) throw { code: 'invalid_json' };
    return { title: String(d.title || ''), summary: String(d.summary), next: (Array.isArray(d.next) ? d.next : []).filter(Boolean).map(String).slice(0, 5) };
  }

  // ─── map: the system around a topic ────────────────────────
  async function map({ backend, tier, key, model, centre, mode, path, cameFrom, feedback }) {
    const lines = [
      `Centre topic: ${centre}`,
      MODE_NOTES[mode] || MODE_NOTES.diagnose,
      path.length ? `Path so far: ${path.join(' › ')}` : 'This is the starting point.',
      cameFrom ? `Came from: ${cameFrom} (include it as an orbiting topic with this exact title)` : '',
      feedbackNote(feedback),
    ].filter(Boolean);
    let out;
    if (backend === 'plan') {
      out = await askPlan([MAP_SYSTEM, ...lines, MAP_JSON].join('\n\n'), tier);
      if (!out || !Array.isArray(out.orbs)) throw { code: 'invalid_json' };
      out.centre = out.centre || {};
      out.links = Array.isArray(out.links) ? out.links : [];
      out.orbs = out.orbs
        .filter((o) => o && o.title)
        .map((o) => ({ ...o, rel: ['cause', 'effect', 'related'].includes(o.rel) ? o.rel : 'related', liner: o.liner || '' }));
      return tidyMap(out);
    }
    const res = await ask(key, model, {
      system: MAP_SYSTEM,
      output_config: { effort: 'medium', format: { type: 'json_schema', schema: MAP_SCHEMA } },
      messages: [{ role: 'user', content: lines.join('\n') }],
    });
    const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    try { out = JSON.parse(text); } catch { throw new Error('Claude’s answer came back incomplete. Try again.'); }
    return tidyMap(out);
  }

  function tidyMap(out) {
    out.orbs = (out.orbs || []).map((o) => ({ ...o, link: clamp01(o.link), relevance: clamp01(o.relevance) }));
    out.links = (out.links || []).filter((l) => l && l.a && l.b).map((l) => ({ ...l, strength: clamp01(l.strength) }));
    return out;
  }

  // ─── details: what an opened orb shows ─────────────────────
  async function details({ backend, tier, key, model, topic, liner, centre, rel, mode, path, webSearch, feedback }) {
    const relation = { cause: `a possible cause of "${centre}"`, effect: `an effect of "${centre}"`, related: `related to "${centre}"` }[rel] || `the centre of the investigation`;
    const intro = [
      `Topic: ${topic}`,
      `What it is: ${liner}`,
      `It is ${relation}.`,
      `Mode: ${mode === 'explore' ? 'exploring a subject' : 'diagnosing a problem'}.`,
      path.length ? `Path so far: ${path.join(' › ')}` : '',
      feedback?.yes?.length ? `The person has marked these as relevant so far: ${feedback.yes.join('; ')}. Where it helps, say how this topic relates to them.` : '',
      webSearch ? 'Search the web for good sources first.' : 'Do not search the web: rely on what you know, rate sources honestly, and use tier 6 for claims you can’t attribute.',
    ].filter(Boolean).join('\n');
    if (backend === 'plan') {
      const brief = intro.split('\n').filter((l) => !l.startsWith('Search the web') && !l.startsWith('Do not search')).join('\n');
      const d = await askPlan(PLAN_DETAILS + '\n\n' + brief, tier);
      if (!d || typeof d !== 'object') throw { code: 'invalid_json' };
      return tidyDetails({ wikipedia: '', ...d });
    }
    const tools = [DETAILS_TOOL, ...(webSearch ? [{ type: 'web_search_20260209', name: 'web_search', max_uses: 4 }] : [])];
    const messages = [{ role: 'user', content: intro }];
    for (let round = 0; round < 4; round++) {
      const res = await ask(key, model, {
        system: DETAILS_SYSTEM,
        output_config: { effort: 'medium' },
        tools,
        messages,
      });
      const call = res.content.find((b) => b.type === 'tool_use' && b.name === 'record_details');
      if (call) return tidyDetails(call.input);
      messages.push({ role: 'assistant', content: res.content });
      // A long search can pause the turn; send it back so it can carry on
      if (res.stop_reason === 'pause_turn') continue;
      messages.push({ role: 'user', content: 'Please call record_details now with what you have.' });
    }
    throw new Error('Claude didn’t finish the research. Try opening the orb again.');
  }

  function tidyDetails(d) {
    const rows = (d.chart?.rows || []).map((r) => ({ label: r.label, value: Number(r.value) })).filter((r) => r.label && Number.isFinite(r.value)).slice(0, 8);
    return {
      about: d.about || '',
      check: (Array.isArray(d.check) ? d.check : []).filter(Boolean).slice(0, 5),
      chart: rows.length >= 2 ? { title: d.chart.title, unit: d.chart.unit || '', note: d.chart.note || '', rows: rows.map((r) => [r.label, r.value]) } : null,
      sources: (Array.isArray(d.sources) ? d.sources : []).filter((s) => s && s.title).slice(0, 8).map((s) => ({
        tier: Math.min(6, Math.max(1, Math.round(s.tier) || 6)),
        type: s.type || 'Source',
        title: s.title || '',
        url: /^https?:\/\//.test(s.url || '') ? s.url : '',
        flag: s.flag || '',
      })),
      diagram: tidyDiagram(d.diagram),
      wikipedia: d.wikipedia || '',
    };
  }

  // A diagram needs a known kind and at least three nodes to be worth drawing
  function tidyDiagram(g) {
    if (!g || !['chain', 'cycle', 'hub'].includes(g.kind)) return null;
    const nodes = (Array.isArray(g.nodes) ? g.nodes : [])
      .filter((n) => n && n.label)
      .slice(0, g.kind === 'cycle' ? 5 : 6)
      .map((n) => ({ label: String(n.label).slice(0, 48), note: String(n.note || '').slice(0, 90) }));
    return nodes.length >= 3 ? { kind: g.kind, caption: String(g.caption || ''), nodes } : null;
  }

  // ─── Quick first pass: Haiku, streamed, while the full answer loads ─
  // Fast and cheap: topics arrive one per line so orbs can appear as they
  // are written, and opened orbs get a short summary to read while waiting.
  const QUICK_MODEL = 'claude-haiku-5-5';

  const QUICK_MAP = `List the topics that orbit a centre topic in a research map, as fast as you can.
Write one JSON object per line and nothing else: no code fence, no commentary.
Line 1: {"centre":{"title":"short name","liner":"one sentence"}}
Then 12 to 16 lines, the most relevant first, each:
{"title":"1 to 5 words","liner":"one plain sentence linking it to the centre","rel":"cause|effect|related","link":0.0,"relevance":0.0}
rel: cause if it can cause the centre, effect if the centre leads to it, otherwise related.
link (0 to 1): how strongly it is connected in general. relevance (0 to 1): how much it matters for this line of reasoning; spread the values, only a few above 0.8.`;

  // Read a growing reply line by line, handing each complete JSON line on
  function lineReader(onValue) {
    let pending = '';
    const take = (line) => {
      const t = line.trim().replace(/,$/, '');
      if (!t.startsWith('{')) return;
      try { onValue(JSON.parse(t)); } catch { /* half a line or chatter: skip */ }
    };
    return {
      feed(delta) {
        const lines = (pending + delta).split('\n');
        pending = lines.pop();
        lines.forEach(take);
      },
      end() { take(pending); pending = ''; },
    };
  }

  // Stream a short answer from the fastest model, calling onText as it grows
  async function streamQuick({ backend, key, prompt, onDelta }) {
    if (backend === 'plan') {
      const sample = await getSample();
      if (!sample) throw { code: 'sampling_disabled' };
      spend.requests += 1;
      const { text } = await sample(prompt, { modelTier: 'quick', onText: ({ delta }) => onDelta(delta) });
      return text;
    }
    const c = await getClient(key);
    const stream = c.messages.stream({
      model: QUICK_MODEL,
      max_tokens: 4000,
      thinking: { type: 'disabled' },        // no thinking: text starts at once
      output_config: { effort: 'low' },
      messages: [{ role: 'user', content: prompt }],
    });
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') onDelta(event.delta.text);
    }
    const final = await stream.finalMessage();
    count(QUICK_MODEL, final.usage);
    return final.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  }

  // Topics as they're written. onCentre({title, liner}) once, onOrb(orb) per topic.
  async function quickMap({ backend, key, centre, mode, path, cameFrom, feedback, onCentre, onOrb }) {
    const prompt = [
      QUICK_MAP,
      `Centre topic: ${centre}`,
      MODE_NOTES[mode] || MODE_NOTES.diagnose,
      path.length ? `Path so far: ${path.join(' › ')}` : '',
      cameFrom ? `Skip "${cameFrom}": it is already shown.` : '',
      feedbackNote(feedback),
    ].filter(Boolean).join('\n');
    const reader = lineReader((v) => {
      if (v.centre) onCentre?.(v.centre);
      else if (v.title) {
        onOrb({
          title: String(v.title),
          liner: String(v.liner || ''),
          rel: ['cause', 'effect', 'related'].includes(v.rel) ? v.rel : 'related',
          link: clamp01(v.link),
          relevance: clamp01(v.relevance),
        });
      }
    });
    await streamQuick({ backend, key, prompt, onDelta: reader.feed });
    reader.end();
  }

  // A short plain summary of a topic, streamed
  async function quickAbout({ backend, key, topic, liner, centre, mode, onText }) {
    const prompt = `In two or three plain sentences, explain "${topic}" (${liner}) in the context of ${mode === 'explore' ? 'learning about' : 'diagnosing'} "${centre}". No preamble, no headings.`;
    let text = '';
    await streamQuick({ backend, key, prompt, onDelta: (d) => { text += d; onText(text); } });
    return text;
  }

  // ─── A picture from Wikipedia (free to request from the browser) ─
  async function wikipediaImage(title) {
    if (!title) return null;
    try {
      const res = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title.replace(/ /g, '_')));
      if (!res.ok) return null;
      const page = await res.json();
      const img = page.originalimage?.width > 800 ? page.thumbnail : (page.originalimage || page.thumbnail);
      if (!img?.source) return null;
      return { src: img.source, alt: page.title, credit: `Image via Wikipedia: ${page.title}`, href: page.content_urls?.desktop?.page || '' };
    } catch { return null; }
  }

  window.CELESTIAL_RESEARCH = { MODELS, map, details, digest, quickMap, quickAbout, wikipediaImage, explain, spend, planAvailable, planState, openPermissions };
})();
