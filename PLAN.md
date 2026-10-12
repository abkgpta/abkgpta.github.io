# Orrery — plan

*Working title. An orrery is a mechanical model of the solar system.*

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
| Up / down | Causes sit **below** the sun, effects **above**, related topics around the middle. |
| Hidden leads | Orbs that are far (loosely linked) but big (relevant here) glow. |
| Breadth | Generalist, like Wikipedia. |
| Summaries | None for now. Each topic has a title and a one-liner; we'll experiment further. |

## Interactions

| Action | Name | What happens |
|---|---|---|
| Hover | **Glance** | The one-liner appears. |
| Click | **Focus** | A panel with a visual, a longer explanation, and its sources. |
| Unfold button | **Unfold** | The orb becomes the new sun and breaks into its own orbs. |

The visual in the Focus panel depends on the topic: a photo, a chart from real data,
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
| 2. Looks-like | Appearance model | Source colour rings, a full Focus panel with visuals and sources. | No | Next |
| 3. Tuning rig | Test jig | On-screen sliders and switches to try options without code. | No | |
| 4. Works-like | Working prototype | Type any question and get real topics, sources and relationships. | Yes | |
| 5. Memory | — | Saved sessions, built so they can merge into one growing map later. | Yes | |

### Switches planned for the tuning rig (stage 3)
- Unfold as **new sun** vs as **moons** around the orb
- Orbs keep the same on-screen size at any depth, on or off
- Causes below / effects above, on or off
- Full 3D vs flatter, tilted disc
- Orbit distances, orb sizes, hidden-lead thresholds, sway

### Open for later
- Exactly what the prompt line does (you're refining this).
- Stage 4: the AI needs an access key. For a personal tool, the simplest route is pasting your
  own key into a settings box, where it stays only in your browser.

## How the code is organised

| File | What it is | Safe to edit? |
|---|---|---|
| `data.js` | The example content: topics, one-liners and how they connect | **Yes.** Plain text with notes at the top |
| `style.css` | Colours, fonts and layout of the panels | Yes, with care |
| `app.js` | The 3D engine: placing orbs, hover, click, unfold. The `TUNING` block at the top holds the key numbers | The `TUNING` numbers, yes |
| `index.html` | The page skeleton that loads everything | Rarely |

No build step and nothing to install. The 3D drawing uses [three.js](https://threejs.org),
loaded from the web.
