# Celestial — plan

A 3D research tool for **diagnosing problems (about 75%) and learning topics (about 25%)**,
loosely based on the 5 Whys. You start from a question, see the topics around it as a solar
system, and keep branching, the way Wikipedia lets you keep clicking.

## Core ideas

| Idea | Decision |
|---|---|
| Structure | Branching, not a single chain. Built to show interlinked systems. |
| Main view | 3D solar system. The current topic is the **sun**, related topics are **orbs**, each with one line back to the sun. |
| Distance from the sun | How strongly the topic is linked to the sun **in general**. |
| Orb size | How relevant the topic is to **your current line of reasoning** (depends on the path you took). |
| Placement | Orbs are spread evenly in all three dimensions around the sun, so spacing looks even from any angle. |
| Cause and effect | Outline colour (violet = cause, cyan = effect, grey = related) plus streams: violet flows **in** from causes, cyan flows **out** to effects. **Stronger link = longer, thicker stream. More relevant = more frequent.** A line to the sun appears only on hover or focus. |
| Screen use | The camera frames each system to fill the whole display. |
| Orbs | At rest: an outlined, softly shifting near-circle with the name inside and a faint drifting highlight. Hover: widens into a rounded preview card sized to its text. Click: opens into a full card. A double outline means it can be unfolded. |
| View panel | Switches and sliders, remembered between visits: theme (Tide or Dusk) and light/dark/match device, shifting background, line art, streams, faint lines, outline colours, hidden-lead glow, names, orb shape drift, same size at any depth, fade with distance, stretch to fill, sway, spin, stream speed, spacing, orb size. |
| Lines | Very faint permanent lines from each cause and effect to the centre. Faint lines between orbiting topics that are strongly linked to each other (from `crossLinks` in data.js). Both brighten on hover. |
| Look | Two themes, each light and dark: **Tide** (teal, bottle green) and **Dusk** (pink, purple). A very faint shifting gradient shader behind everything. Celestial line art (astrolabe scale, orbit diagrams, starburst, constellations) along the bottom edge, fading towards the centre, blended like a multiply layer. Typeface: Libre Caslon Condensed. |
| Navigation | Left-drag rotates, scroll or pinch zooms (sped up), middle- or right-drag pans. |
| Hidden leads | Orbs that are far (loosely linked) but big (relevant here) glow. |
| Breadth | Generalist, like Wikipedia. |
| Summaries | None for now. Each topic has a title and a one-liner; we'll experiment further. |

## Interactions

| Action | Name | What happens |
|---|---|---|
| Orbs | At rest: an outlined, softly shifting near-circle with the name inside and a faint drifting highlight. Hover: widens into a rounded preview card sized to its text. Click: opens into a full card. A double outline means it can be unfolded. |
| Click | **Open** | The orb opens into a card in place: relation, one-liner, a chart or picture where one fits, a short explanation, **What to check** (for diagnosing), link and relevance, **Strongly linked to** (jump to those orbs), sources with reliability tiers, and Unfold. Long cards scroll. |
| Unfold button | **Unfold** | The orb becomes the new sun and breaks into its own orbs. |

The visual inside an opened orb depends on the topic: a photo, a chart from real data,
a cause-and-effect loop, a process flow, a timeline, a map, a video link, or a labelled schematic.

## Sources

**Colour = reliability tier. Icon = source type.**

| Tier | Colour | Includes |
|---|---|---|
| 1 · Primary evidence | Deep blue | Meta-analyses, systematic reviews, official statistics, raw datasets, standards, laws |
| 2 · Peer-reviewed / institutional | Teal | Peer-reviewed papers, textbooks, reports from bodies like WHO, IPCC, OECD |
| 3 · Edited reference | Green | Encyclopedias including Wikipedia, major news, analyst reports, official docs |
| 4 · Expert, unvetted | Amber | Preprints, expert blogs, talks, lectures, documentaries, company white papers |
| 5 · Opinion / community | Orange | Opinion pieces, general blogs, podcasts, general YouTube, forums, social media |
| 6 · Unsourced | Grey, dashed | AI inference with no source, anonymous or unverifiable claims |

- A tier is a starting point. Individual sources can move up or down.
- Separate warning flags: conflict of interest, outdated, disputed, retracted.
- Each orb gets a thin ring split by colour, showing what its content rests on.
- Information comes from a mix of AI reasoning and real sources (papers, articles, blogs, videos).

## Build stages

Every stage ends with a link to click and a short list of things to try.

| Stage | Like a… | What you get | AI? | Status |
|---|---|---|---|---|
| 1. Sketch | Foam model | 3D solar system with example content. Rotate, zoom, hover, click, unfold. | No | **Built** |
| 2. Looks-like | Appearance model | Source tiers, full opened cards with charts, illustrations and sources. | No | **Done** |
| 3. Tuning rig | Test jig | On-screen sliders and switches to try options without code. | No | **Started** (View panel) |
| 4. Works-like | Working prototype | Type any question or keyword and Claude maps it; open any orb to research it with web sources and a Wikipedia picture; unfold any orb. Runs on your own API key, from your browser. | Yes | **Built** |
| 5. Memory | — | Saved sessions, built so they can merge into one growing map later. | Yes | |

### Switches planned for the tuning rig (stage 3)
- Unfold as **new sun** vs as **moons** around the orb
- Orbs keep the same on-screen size at any depth, on or off
- Full 3D vs flatter, tilted disc
- Orbit distances, orb sizes, hidden-lead thresholds, sway

### Open for later
- Exactly what the prompt line does (you're refining this).
- Stage 4: the AI needs an access key. For a personal tool, the simplest route is pasting your
  own key into a settings box, where it stays only in your browser.

## Two ways to reach Claude

| | On claude.ai (the private preview link) | On your own site |
|---|---|---|
| Pays with | Your Claude plan's usage | Your API credits (console.anthropic.com) |
| Setup | None. The first search asks permission | Paste an API key in the View panel |
| Sources | From Claude's knowledge, named but mostly not linked | Found with web search, linked |
| Pictures | Example drawings only | Wikipedia pictures for live topics |
| Model | Fast / Balanced / Thorough | Opus 5.5, Sonnet 5.5 or Haiku 5.5 |

The same code runs in both places: it uses your plan when opened on claude.ai, and your key elsewhere.

## How live research works

- **Your key, your browser.** Paste a Claude API key into the View panel. It is stored in that browser only and sent only to Anthropic. Nothing about it is in the website's files.
- **Typing** a question that describes a problem ("Why…", "…keeps failing") starts a *diagnosis*. A single keyword or topic name starts an *exploration*: mostly related topics that map the subject. The View panel can force either.
- **Mapping** runs two requests side by side: a fast sketch on Haiku (the quickest tier on your plan) that streams topics in one by one, so orbs appear as they're written, and the full map, which then refines what's on screen without a reset. If the full map fails, the sketch stays.
- **Opening** an orb shows Haiku's quick take within seconds while the full research loads.
- (Previously: mapping a system is one request to Claude, no web search.) **Opening** an orb is a second request that searches the web for sources, rates each by tier, and names a Wikipedia article whose picture is shown.
- **Unfolding** any orb maps it as a new centre, with the path you took shaping what counts as relevant.
- **Cost:** the View panel shows a running estimate for the current visit. Model choice: Opus 5.5 (default), Sonnet 5.5 or Haiku 5.5.
- **Remembered:** research and your last path are saved in the browser, so reopening the page resumes where you were without paying again.
- **Privacy:** the page asks search engines not to list it. The site itself is reachable by anyone with the address, but without your key it can only show the example.

## Next steps

1. **Finish the look (stages 2–3).** Source rings on resting orbs showing what each rests on; pictures as well as charts; the unfold-as-moons option; any line-art reference you want to swap in.
2. **Decide the prompt line.** What typing a question should do: start a fresh system, add to the current one, or ask a "why" about the open orb.
3. ~~**Make it work for real (stage 4).**~~ Done, see above.
   - Choose how the AI is reached: your own key pasted into a settings box, or a small private server that holds the key.
   - The AI turns a question into a system: topics, one-liners, cause/effect/related, link and relevance numbers, and links between orbs.
   - Real sources: research databases (OpenAlex, Semantic Scholar), Wikipedia, news and the web, each rated by tier.
   - Unfold any orb, not just the four example ones.
4. **Memory (stage 5).** Save sessions, mark orbs as suspected / ruled out / confirmed while diagnosing, and later merge sessions into one growing map.
5. **Go live.** Put the tool on abkgpta.github.io once you're happy with a version.

## How the code is organised

| File | What it is | Safe to edit? |
|---|---|---|
| `data.js` | The example content: topics, one-liners and how they connect | **Yes.** Plain text with notes at the top |
| `style.css` | Colours, fonts and layout of the panels | Yes, with care |
| `app.js` | The 3D engine: placing orbs, hover, click, unfold. The `TUNING` block at the top holds the key numbers | The `TUNING` numbers, yes |
| `index.html` | The page skeleton that loads everything | Rarely |

No build step and nothing to install. The 3D drawing uses [three.js](https://threejs.org),
loaded from the web.
