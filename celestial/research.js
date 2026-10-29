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

  // No prices here: they change, and the page can't check them. Usage is
  // counted in tokens and searches; the Anthropic console shows the real cost.
  const MODELS = {
    'claude-opus-5-5': { name: 'Claude Opus 5.5', fallback: true },
    'claude-sonnet-5-5': { name: 'Claude Sonnet 5.5', fallback: true },
    'claude-haiku-5-5': { name: 'Claude Haiku 5.5', fallback: false },
  };

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

  // Added only while Progressive mode is on: the person is watching the map
  // being built and wants the reasoning behind every line
  const MAP_REASONS = `Show your reasoning. The person is watching the map being built step by step and will read why each line exists, so give every orbiting topic and every link these three fields:
- why: one or two plain sentences giving your reasoning for the connection: the mechanism, evidence or logic behind it. Make each step easy to follow and remember.
- basis: a few words saying where that reasoning comes from: the field, kind of source or body of evidence it rests on (e.g. "Heat-transfer physics", "Cohort studies of shift workers", "Common troubleshooting practice"). Write "My inference" when it is your own reasoning step rather than established knowledge.
- tier (1 to 6): how reliable that basis is. 1 primary evidence (standards, systematic reviews, official data); 2 peer-reviewed work and academic textbooks; 3 encyclopedias, reputable journalism, official documentation; 4 expert but unvetted material; 5 opinion and community knowledge; 6 your own inference.
Also give the centre a reading: one or two sentences, in the first person, on how you read the request: what you decided to investigate and which kinds of topics you looked for first.`;

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
  If a search turns up a good video on the topic (a lecture, talk, demonstration or explainer from a credible channel), include it with type "Video".
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

  // The shape of a map; reasons: also why/basis/tier on every orb and link
  function mapSchema(reasons) {
    const obj = (props) => ({ type: 'object', additionalProperties: false, required: Object.keys(props), properties: props });
    const why = reasons ? { why: { type: 'string' }, basis: { type: 'string' }, tier: { type: 'integer', enum: [1, 2, 3, 4, 5, 6] } } : {};
    return obj({
      centre: obj({ title: { type: 'string' }, liner: { type: 'string' }, ...(reasons ? { reading: { type: 'string' } } : {}) }),
      orbs: { type: 'array', items: obj({
        title: { type: 'string' },
        liner: { type: 'string' },
        rel: { type: 'string', enum: ['cause', 'effect', 'related'] },
        link: { type: 'number' },
        relevance: { type: 'number' },
        ...why,
      }) },
      links: { type: 'array', items: obj({ a: { type: 'string' }, b: { type: 'string' }, strength: { type: 'number' }, ...why }) },
    });
  }

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
  const MAP_JSON = (reasons) => reasons
    ? 'Reply with only JSON in exactly this shape: {"centre":{"title":"","liner":"","reading":""},"orbs":[{"title":"","liner":"","rel":"cause|effect|related","link":0.5,"relevance":0.5,"why":"","basis":"","tier":3}],"links":[{"a":"orb title","b":"orb title","strength":0.7,"why":"","basis":"","tier":3}]}'
    : 'Reply with only JSON in exactly this shape: {"centre":{"title":"","liner":""},"orbs":[{"title":"","liner":"","rel":"cause|effect|related","link":0.5,"relevance":0.5}],"links":[{"a":"orb title","b":"orb title","strength":0.7}]}';
  const PLAN_DETAILS = `You research one topic for Celestial, a 3D research explorer. You cannot browse the web here, so draw on what you know and be honest about it.

- about: two to four plain sentences explaining what it is or how the mechanism works, in context.
- check: two to four concrete items. When diagnosing, things to measure or look at to confirm or rule this out. When exploring, the most useful things to explore next.
- chart: only when you know a genuinely useful, well-established numeric comparison (4 to 8 rows), otherwise an empty rows list. Keep labels short; say in the note that values are typical.
- diagram: a simple picture of the idea, which the app draws from your words. Choose the kind that explains it best:
  "chain" for a mechanism or process: 3 to 6 steps in order;
  "cycle" for a feedback loop: 3 to 5 steps, the last leading back to the first;
  "hub" for what it is made of, or the factors that feed into it: 3 to 6 parts.
  Each node: label of 2 to 5 words, note of at most 10 words (may be "" for a hub). caption: one sentence saying what the diagram shows. Use kind "none" with no nodes only if no diagram would help.
- sources: three to six that you are confident exist (textbooks, standards, reviews, landmark papers, encyclopedia articles, official bodies), described well enough to find: author or organisation, year, title. Leave url empty unless it is an English Wikipedia article you are certain exists. Never make up an address. Rate each with a tier:
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

  // Running total of what this browser session has used
  const spend = { tokens: 0, requests: 0, searches: 0 };
  function count(model, usage) {
    spend.tokens += (usage.input_tokens || 0) + (usage.cache_creation_input_tokens || 0) + (usage.cache_read_input_tokens || 0) + (usage.output_tokens || 0);
    spend.requests += 1;
    spend.searches += usage.server_tool_use?.web_search_requests || 0;
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
    if (E && err instanceof E.AuthenticationError) return 'Your API key was rejected. Check it in Settings.';
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
  // reasons: Progressive mode is on, so ask for the reasoning behind every line too
  async function map({ backend, tier, key, model, centre, mode, path, cameFrom, feedback, reasons = false }) {
    const lines = [
      `Centre topic: ${centre}`,
      MODE_NOTES[mode] || MODE_NOTES.diagnose,
      path.length ? `Path so far: ${path.join(' › ')}` : 'This is the starting point.',
      cameFrom ? `Came from: ${cameFrom} (include it as an orbiting topic with this exact title)` : '',
      feedbackNote(feedback),
    ].filter(Boolean);
    const system = reasons ? MAP_SYSTEM + '\n\n' + MAP_REASONS : MAP_SYSTEM;
    let out;
    if (backend === 'plan') {
      out = await askPlan([system, ...lines, MAP_JSON(reasons)].join('\n\n'), tier);
      if (!out || !Array.isArray(out.orbs)) throw { code: 'invalid_json' };
      out.centre = out.centre || {};
      out.links = Array.isArray(out.links) ? out.links : [];
      out.orbs = out.orbs
        .filter((o) => o && o.title)
        .map((o) => ({ ...o, rel: ['cause', 'effect', 'related'].includes(o.rel) ? o.rel : 'related', liner: o.liner || '' }));
      return tidyMap(out);
    }
    const res = await ask(key, model, {
      system,
      output_config: { effort: 'medium', format: { type: 'json_schema', schema: mapSchema(reasons) } },
      messages: [{ role: 'user', content: lines.join('\n') }],
    });
    const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    try { out = JSON.parse(text); } catch { throw new Error('Claude’s answer came back incomplete. Try again.'); }
    return tidyMap(out);
  }

  // Reasoning fields are optional to the app: a link without them still shows
  const tidyReason = (r) => ({ why: String(r.why || ''), basis: String(r.basis || ''), tier: Math.min(6, Math.max(1, Math.round(r.tier) || 6)) });
  function tidyMap(out) {
    out.orbs = (out.orbs || []).map((o) => ({ ...o, ...tidyReason(o), link: clamp01(o.link), relevance: clamp01(o.relevance) }));
    out.links = (out.links || []).filter((l) => l && l.a && l.b).map((l) => ({ ...l, ...tidyReason(l), strength: clamp01(l.strength) }));
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
      webSearch ? 'Search the web for good sources first. If a video would help someone understand it, run one search for a video explainer too.' : 'Do not search the web: rely on what you know, rate sources honestly, and use tier 6 for claims you can’t attribute.',
    ].filter(Boolean).join('\n');
    if (backend === 'plan') {
      const brief = intro.split('\n').filter((l) => !l.startsWith('Search the web') && !l.startsWith('Do not search')).join('\n');
      const d = await askPlan(PLAN_DETAILS + '\n\n' + brief, tier);
      if (!d || typeof d !== 'object') throw { code: 'invalid_json' };
      return tidyDetails({ wikipedia: '', ...d }, {});
    }
    const tools = [DETAILS_TOOL, ...(webSearch ? [{ type: 'web_search_20260209', name: 'web_search', max_uses: 5 }] : [])];
    const messages = [{ role: 'user', content: intro }];
    const seen = new Map();   // every page the search returned or cited
    for (let round = 0; round < 4; round++) {
      const res = await ask(key, model, {
        system: DETAILS_SYSTEM,
        output_config: { effort: 'medium' },
        tools,
        messages,
      });
      collectUrls(res.content, seen);
      const call = res.content.find((b) => b.type === 'tool_use' && b.name === 'record_details');
      if (call) return tidyDetails(call.input, { seen: webSearch ? seen : null });
      messages.push({ role: 'assistant', content: res.content });
      // A long search can pause the turn; send it back so it can carry on
      if (res.stop_reason === 'pause_turn') continue;
      messages.push({ role: 'user', content: 'Please call record_details now with what you have.' });
    }
    throw new Error('Claude didn’t finish the research. Try opening the orb again.');
  }

  function tidyDetails(d, how) {
    const rows = (d.chart?.rows || []).map((r) => ({ label: r.label, value: Number(r.value) })).filter((r) => r.label && Number.isFinite(r.value)).slice(0, 8);
    return {
      about: d.about || '',
      check: (Array.isArray(d.check) ? d.check : []).filter(Boolean).slice(0, 5),
      chart: rows.length >= 2 ? { title: d.chart.title, unit: d.chart.unit || '', note: d.chart.note || '', rows: rows.map((r) => [r.label, r.value]) } : null,
      sources: tidySources(d.sources, how).map(({ from, ...src }) => src),
      searched: how.seen ? how.seen.size : 0,
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

  // ─── Where the sources really came from ────────────────────
  // With web search on, Claude reads real pages. Every address the search
  // returned or cited is kept, and a source is only shown with a link when
  // its address is one of them; a link Claude wrote that the search never
  // returned is treated as made up and dropped. Without web search (always
  // the case on a Claude plan) sources are references Claude named from its
  // own knowledge: shown without links, except English Wikipedia articles.
  const normUrl = (u) => {
    try { const x = new URL(u); return (x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/+$/, '') + x.search).toLowerCase(); } catch { return ''; }
  };
  const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\.|^m\./g, ''); } catch { return ''; } };
  const VIDEO_HOSTS = /(^|\.)(youtube\.com|youtu\.be|vimeo\.com|ted\.com|dailymotion\.com|nebula\.tv)$/;
  function collectUrls(content, seen) {
    for (const b of content || []) {
      if (b.type === 'web_search_tool_result' && Array.isArray(b.content)) {
        for (const r of b.content) if (r?.url) seen.set(normUrl(r.url), { url: r.url, title: r.title || '' });
      }
      for (const c of b.citations || []) if (c?.url) seen.set(normUrl(c.url), { url: c.url, title: c.title || '' });
    }
    return seen;
  }
  // how: { seen } after a web search, { example: true } for the built-in example, {} otherwise.
  // Each kept source remembers its place in Claude's list (from), so citations can follow it.
  function tidySources(list, how = {}) {
    const out = [];
    (Array.isArray(list) ? list : []).forEach((s, from) => {
      if (!s || !s.title || out.length >= 8) return;
      let url = /^https?:\/\//.test(s.url || '') ? s.url : '';
      let checked = how.example ? 'example' : how.seen ? 'unlinked' : 'named';
      if (how.seen && url) {
        const hit = how.seen.get(normUrl(url));
        if (!hit) return;
        url = hit.url;
        checked = 'web';
      } else if (url && hostOf(url) !== 'en.wikipedia.org') url = '';
      const host = url ? hostOf(url) : '';
      out.push({
        tier: Math.min(6, Math.max(1, Math.round(s.tier) || 6)),
        type: String(s.type || 'Source'),
        title: String(s.title),
        url, host, checked,
        video: Boolean(url) && (VIDEO_HOSTS.test(host) || /\bvideo\b/i.test(s.type || '')),
        flag: String(s.flag || ''),
        from,
      });
    });
    return out;
  }

  // ─── deep: look inside one topic ───────────────────────────
  // A deeper pass than map(): instead of a topic's neighbours, its insides.
  // Sub-systems, the parts of each, plausible links between parts, and a few
  // threads the person can choose to follow next.
  const DEEP_SYSTEM = `You do a deeper research pass on one topic for Celestial, a 3D research explorer. The person has seen the topic's neighbours and now wants to look inside it: the sub-systems it is made of, the parts of each, and plausible connections between parts that are easy to miss. They will then choose which thread to follow, so give them good choices.

- centre: title (the topic, 1 to 5 words), liner (one sentence on what is inside it), reading (one or two first-person sentences on how you decided to break it down).
- subsystems: 3 to 5 distinct sub-systems, mechanisms, stages or component groups INSIDE the topic (not outside causes or neighbours). title 1 to 5 words; liner one plain sentence; why, basis, tier, cite; parts: 2 to 5 each.
- parts: title 1 to 5 words, specific and checkable, unique across the whole answer; liner one plain sentence of at most 22 words; relevance 0 to 1 for the person's line of reasoning (spread the values: a few above 0.8, some below 0.4); why, basis, tier, cite.
- connections: 3 to 8 plausible links between parts, preferably across different sub-systems. a and b are exact part titles; kind is a short verb phrase ("feeds", "limits", "amplifies", "depends on", "trades off against"); confidence 0 to 1, honestly: below 0.5 for speculative links, and say they are speculative in why; why, basis, tier, cite.
- threads: 3 or 4 directions to explore next. title 2 to 6 words; question: the full question to research; why: one sentence on why it is worth following.
- why: one or two plain sentences of reasoning the person can follow and remember. basis: a few words on where the reasoning comes from; "My inference" for your own reasoning step. tier 1 to 6: 1 primary evidence (standards, systematic reviews, official data); 2 peer-reviewed work and academic textbooks; 3 encyclopedias, reputable journalism, official documentation; 4 expert but unvetted material; 5 opinion and community knowledge; 6 your own inference.
- cite: the 0-based positions in your sources list that support this item, or an empty list.`;
  const DEEP_WEB_SOURCES = `- sources: four to eight, from your web searches only. Search first. Use only URLs that appeared in your search results; never invent or guess one. If a search finds a good video on the topic (a lecture, talk, demonstration or explainer from a credible channel), include it with type "Video". Each source: tier (as above), type (e.g. "Peer-reviewed", "Encyclopedia", "Video"), title, url, flag ("" or one of "Conflict of interest", "Outdated", "Disputed", "Retracted").
Finish by calling the record_deep tool exactly once.`;
  const DEEP_PLAN_SOURCES = `- sources: three to six references you are confident exist (textbooks, standards, reviews, landmark papers, encyclopedia articles, official bodies), described well enough to find: author or organisation, year, title. You cannot browse the web here: leave url empty unless it is an English Wikipedia article you are certain exists, and never make up an address. Each: tier, type, title, url, flag ("" or one of "Conflict of interest", "Outdated", "Disputed", "Retracted").`;
  const DEEP_JSON = 'Reply with only JSON in exactly this shape: {"centre":{"title":"","liner":"","reading":""},"subsystems":[{"title":"","liner":"","why":"","basis":"","tier":3,"cite":[0],"parts":[{"title":"","liner":"","relevance":0.5,"why":"","basis":"","tier":3,"cite":[0]}]}],"connections":[{"a":"part title","b":"part title","kind":"","confidence":0.5,"why":"","basis":"","tier":3,"cite":[]}],"threads":[{"title":"","question":"","why":""}],"sources":[{"tier":3,"type":"","title":"","url":"","flag":""}]}';

  const reasonProps = { why: { type: 'string' }, basis: { type: 'string' }, tier: { type: 'integer', enum: [1, 2, 3, 4, 5, 6] }, cite: { type: 'array', items: { type: 'integer' } } };
  const strictObject = (props) => ({ type: 'object', additionalProperties: false, required: Object.keys(props), properties: props });
  const DEEP_TOOL = {
    name: 'record_deep',
    description: 'Record the deeper research pass. Call once, at the end.',
    strict: true,
    input_schema: strictObject({
      centre: strictObject({ title: { type: 'string' }, liner: { type: 'string' }, reading: { type: 'string' } }),
      subsystems: { type: 'array', items: strictObject({
        title: { type: 'string' }, liner: { type: 'string' }, ...reasonProps,
        parts: { type: 'array', items: strictObject({ title: { type: 'string' }, liner: { type: 'string' }, relevance: { type: 'number' }, ...reasonProps }) },
      }) },
      connections: { type: 'array', items: strictObject({ a: { type: 'string' }, b: { type: 'string' }, kind: { type: 'string' }, confidence: { type: 'number' }, ...reasonProps }) },
      threads: { type: 'array', items: strictObject({ title: { type: 'string' }, question: { type: 'string' }, why: { type: 'string' } }) },
      sources: { type: 'array', items: strictObject({ tier: { type: 'integer', enum: [1, 2, 3, 4, 5, 6] }, type: { type: 'string' }, title: { type: 'string' }, url: { type: 'string' }, flag: { type: 'string' } }) },
    }),
  };

  async function deep({ backend, tier, key, model, topic, liner, mode, path, webSearch, feedback }) {
    const brief = [
      `Topic: ${topic}`,
      liner ? `What it is: ${liner}` : '',
      `Mode: ${mode === 'explore' ? 'exploring a subject' : 'diagnosing a problem'}.`,
      path.length ? `Path so far: ${path.join(' › ')}` : '',
      feedbackNote(feedback),
    ].filter(Boolean).join('\n');
    if (backend === 'plan') {
      // A deeper pass deserves more thought than the lightest setting
      const d = await askPlan([DEEP_SYSTEM, DEEP_PLAN_SOURCES, brief, DEEP_JSON].join('\n\n'), tier === 'quick' ? 'default' : tier);
      return tidyDeep(d, {});
    }
    const tools = [DEEP_TOOL, ...(webSearch ? [{ type: 'web_search_20260209', name: 'web_search', max_uses: 6 }] : [])];
    const messages = [{ role: 'user', content: brief + (webSearch ? '' : '\nDo not search the web: rely on what you know, leave every url empty, and rate sources honestly.') }];
    const system = DEEP_SYSTEM + '\n\n' + (webSearch ? DEEP_WEB_SOURCES : DEEP_PLAN_SOURCES + '\nFinish by calling the record_deep tool exactly once.');
    const seen = new Map();
    for (let round = 0; round < 5; round++) {
      const res = await ask(key, model, { system, output_config: { effort: 'high' }, tools, messages });
      collectUrls(res.content, seen);
      const call = res.content.find((b) => b.type === 'tool_use' && b.name === 'record_deep');
      if (call) return tidyDeep(call.input, { seen: webSearch ? seen : null });
      messages.push({ role: 'assistant', content: res.content });
      if (res.stop_reason === 'pause_turn') continue;
      messages.push({ role: 'user', content: 'Please call record_deep now with what you have.' });
    }
    throw new Error('Claude didn’t finish the deeper pass. Try again.');
  }

  // Check and tidy a deep pass (also used for the built-in example)
  function tidyDeep(d, how) {
    if (!d || typeof d !== 'object' || !Array.isArray(d.subsystems)) throw { code: 'invalid_json' };
    const sources = tidySources(d.sources, how);
    const place = new Map(sources.map((s, i) => [s.from, i]));
    sources.forEach((s) => delete s.from);
    // Citations follow their source to its new place; ones to dropped sources go
    const cite = (c) => [...new Set((Array.isArray(c) ? c : []).map((i) => place.get(Math.round(i))).filter((i) => i != null))];
    const item = (x) => ({ title: String(x.title).trim().slice(0, 60), liner: String(x.liner || ''), ...tidyReason(x), cite: cite(x.cite) });
    const subsystems = d.subsystems.filter((x) => x && x.title).slice(0, 6).map((x) => ({
      ...item(x),
      parts: (Array.isArray(x.parts) ? x.parts : []).filter((p) => p && p.title).slice(0, 6).map((p) => ({ ...item(p), relevance: clamp01(p.relevance ?? 0.5) })),
    })).filter((x) => x.parts.length);
    if (!subsystems.length) throw { code: 'invalid_json' };
    return {
      centre: { title: String(d.centre?.title || ''), liner: String(d.centre?.liner || ''), reading: String(d.centre?.reading || '') },
      subsystems,
      connections: (Array.isArray(d.connections) ? d.connections : []).filter((c) => c && c.a && c.b).slice(0, 10).map((c) => ({
        a: String(c.a), b: String(c.b), kind: String(c.kind || 'links to'), confidence: clamp01(c.confidence ?? 0.5), ...tidyReason(c), cite: cite(c.cite),
      })),
      threads: (Array.isArray(d.threads) ? d.threads : []).filter((t) => t && t.title).slice(0, 4).map((t) => ({
        title: String(t.title), question: String(t.question || t.title), why: String(t.why || ''),
      })),
      sources,
      searched: how.seen ? how.seen.size : 0,
    };
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
  async function quickMap({ backend, key, centre, mode, path, cameFrom, feedback, reasons = false, onCentre, onOrb }) {
    const prompt = [
      QUICK_MAP,
      reasons ? 'Add to each topic line a "why" field: under 16 words, your reason for linking it to the centre.' : '',
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
          why: String(v.why || ''),
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

  window.CELESTIAL_RESEARCH = { MODELS, map, details, deep, tidyDeep, digest, quickMap, quickAbout, wikipediaImage, explain, spend, planAvailable, planState, openPermissions };
})();

