// ─────────────────────────────────────────────────────────────
// RESEARCH · asks Claude to map topics and find sources.
//
// This runs only in your own browser, with your own Claude API key.
// The key is kept in this browser's storage and sent only to
// Anthropic's API. It never goes into the website's files.
//
// Two kinds of request:
//   map(…)     → the solar system around a topic (names, one-liners,
//                cause/effect/related, link and relevance numbers)
//   details(…) → what an opened orb shows: explanation, what to check,
//                optional chart, rated sources (found with web search),
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
- wikipedia: the exact title of the English Wikipedia article whose lead image would best illustrate this topic, or "" if none fits.`;

  const DETAILS_TOOL = {
    name: 'record_details',
    description: 'Record the researched details for the topic. Call once, at the end.',
    strict: true,
    input_schema: {
      type: 'object',
      additionalProperties: false,
      required: ['about', 'check', 'chart', 'sources', 'wikipedia'],
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

  // ─── Connection to Claude ──────────────────────────────────
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

  // Turn SDK errors into sentences a person can act on
  function explain(err) {
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

  // ─── map: the system around a topic ────────────────────────
  async function map({ key, model, centre, mode, path, cameFrom }) {
    const lines = [
      `Centre topic: ${centre}`,
      MODE_NOTES[mode] || MODE_NOTES.diagnose,
      path.length ? `Path so far: ${path.join(' › ')}` : 'This is the starting point.',
      cameFrom ? `Came from: ${cameFrom} (include it as an orbiting topic with this exact title)` : '',
    ].filter(Boolean);
    const res = await ask(key, model, {
      system: MAP_SYSTEM,
      output_config: { effort: 'medium', format: { type: 'json_schema', schema: MAP_SCHEMA } },
      messages: [{ role: 'user', content: lines.join('\n') }],
    });
    const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    let out;
    try { out = JSON.parse(text); } catch { throw new Error('Claude’s answer came back incomplete. Try again.'); }
    out.orbs = (out.orbs || []).map((o) => ({ ...o, link: clamp01(o.link), relevance: clamp01(o.relevance) }));
    out.links = (out.links || []).map((l) => ({ ...l, strength: clamp01(l.strength) }));
    return out;
  }

  // ─── details: what an opened orb shows ─────────────────────
  async function details({ key, model, topic, liner, centre, rel, mode, path, webSearch }) {
    const relation = { cause: `a possible cause of "${centre}"`, effect: `an effect of "${centre}"`, related: `related to "${centre}"` }[rel] || `the centre of the investigation`;
    const intro = [
      `Topic: ${topic}`,
      `What it is: ${liner}`,
      `It is ${relation}.`,
      `Mode: ${mode === 'explore' ? 'exploring a subject' : 'diagnosing a problem'}.`,
      path.length ? `Path so far: ${path.join(' › ')}` : '',
      webSearch ? 'Search the web for good sources first.' : 'Do not search the web: rely on what you know, rate sources honestly, and use tier 6 for claims you can’t attribute.',
    ].filter(Boolean).join('\n');
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
    const rows = (d.chart?.rows || []).filter((r) => r.label && Number.isFinite(r.value)).slice(0, 8);
    return {
      about: d.about || '',
      check: (d.check || []).slice(0, 5),
      chart: rows.length >= 2 ? { title: d.chart.title, unit: d.chart.unit || '', note: d.chart.note || '', rows: rows.map((r) => [r.label, r.value]) } : null,
      sources: (d.sources || []).slice(0, 8).map((s) => ({
        tier: Math.min(6, Math.max(1, Math.round(s.tier) || 6)),
        type: s.type || 'Source',
        title: s.title || '',
        url: /^https?:\/\//.test(s.url || '') ? s.url : '',
        flag: s.flag || '',
      })),
      wikipedia: d.wikipedia || '',
    };
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

  window.CELESTIAL_RESEARCH = { MODELS, map, details, wikipediaImage, explain, spend };
})();
