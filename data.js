// ─────────────────────────────────────────────────────────────
// EXAMPLE CONTENT for the stage 1 sketch.
//
// This file is plain text you can safely edit. Change a title or a
// one-liner, save, and refresh the page to see it.
//
// TOPICS   – every orb that can appear, with its name and one-liner.
// SYSTEMS  – the "solar system" around a topic: which orbs orbit it,
//            and how. Only topics listed here can be expanded.
//
// For each orbiting orb:
//   rel        "cause"   → sits BELOW the sun, pulses flow IN to the sun
//              "effect"  → sits ABOVE the sun, pulses flow OUT of the sun
//              "related" → sits around the middle
//   link       0 to 1. How strongly the two topics are linked in general.
//              Sets DISTANCE: 1 = tight orbit, 0 = far out.
//   relevance  0 to 1. How much it matters to THIS line of reasoning.
//              Sets SIZE: 1 = big orb, 0 = tiny.
//
// The same topic can have a different size in different systems,
// because relevance depends on how you got there.
// ─────────────────────────────────────────────────────────────

window.CELESTIAL_DATA = {
  start: 'warping',
  prompt: 'Why is my injection-moulded part warping?',

  topics: {
    'warping':           { title: 'Warped moulded part', liner: 'The part bends or twists out of its designed shape after leaving the mould, because some regions shrank more than others.' },
    'uneven-cooling':    { title: 'Uneven cooling', liner: 'One region of the part cools faster than another, locking in different amounts of shrinkage.' },
    'wall-thickness':    { title: 'Non-uniform wall thickness', liner: 'Thick sections cool and shrink more slowly than thin ones, pulling the part out of shape.' },
    'diff-shrinkage':    { title: 'Differential shrinkage', liner: 'The underlying mechanism: regions shrink by different amounts, and the part bends to relieve the mismatch.' },
    'semi-crystalline':  { title: 'Semi-crystalline polymers', liner: 'PP, POM and nylon shrink more, and less evenly, than amorphous plastics like ABS or PC.' },
    'fibre':             { title: 'Glass-fibre orientation', liner: 'Fibres align with the flow, so a filled part shrinks less along the flow than across it.' },
    'gate':              { title: 'Gate location', liner: 'Where plastic enters the mould sets the flow pattern, and with it pressure, orientation and shrinkage.' },
    'packing':           { title: 'Low packing pressure', liner: 'Too little material packed in as the part cools lets thick areas shrink more than they should.' },
    'early-eject':       { title: 'Ejecting too early', liner: 'A part pushed out before it is rigid keeps cooling and deforming outside the mould.' },
    'ribs':              { title: 'Thick ribs and bosses', liner: 'Ribs thicker than about 60% of the wall they join create local hot spots.' },
    'hot-stacking':      { title: 'Hot parts stacked in boxes', liner: 'Parts packed while still warm can keep deforming under their own weight for hours.' },
    'resin-batch':       { title: 'Resin batch or supplier change', liner: 'Warping that starts suddenly often traces back to a new material lot, regrind ratio or supplier.' },
    'wet-resin':         { title: 'Wet resin', liner: 'Undried resin mostly causes splay marks and brittleness. It is rarely the main cause of warping.' },
    'assembly':          { title: 'Assembly fit failure', liner: 'Snap fits miss, screw bosses misalign and mating parts no longer close.' },
    'gaps':              { title: 'Visible gaps and flushness', liner: 'Split lines open up, and that is what customers notice first.' },
    'sealing':           { title: 'Seal and IP rating failure', liner: 'A warped flange cannot compress a gasket evenly, so water and dust get in.' },
    'scrap':             { title: 'Scrap rate and cost', liner: 'Every rejected shot costs material, machine time and delivery dates.' },
    'tool-rework':       { title: 'Tool rework', liner: 'Fixing warp in steel means recutting the mould. Slow and expensive, so usually the last resort.' },
    'sink':              { title: 'Sink marks', liner: 'A sibling defect with the same root: thick sections that shrink inward as they cool.' },
    'moldflow':          { title: 'Mould flow simulation', liner: 'Software that predicts filling, cooling and warpage before any steel is cut.' },
    'dfm':               { title: 'Design for manufacture', liner: 'Shaping a part from the start so it can be made reliably and cheaply.' },
    'annealing':         { title: 'Annealing', liner: 'Reheating parts to relax moulded-in stress. A fix after the fact, not a cure.' },
    'flatness':          { title: 'Flatness tolerances', liner: 'How much warp is acceptable is a drawing decision, set with a GD&T flatness callout.' },
    'industrial-design': { title: 'Industrial design', liner: 'The discipline of shaping mass-produced products for use, manufacture and appearance.' },
    'cooling-channels':  { title: 'Cooling channel layout', liner: 'Channels too far from the surface, or unevenly spaced, leave hot spots in the steel.' },
    'mould-halves':      { title: 'Core and cavity at different temperatures', liner: 'If one mould half runs hotter, the part shrinks more on that side and bows toward it.' },
    'coolant-flow':      { title: 'Low coolant flow', liner: 'Blocked or undersized water lines carry heat away too slowly, often unnoticed until parts change.' },
    'inside-corners':    { title: 'Inside corners', liner: 'Heat gets trapped in the inner corner of a box shape, so the walls pull inward.' },
    'cycle-time':        { title: 'Longer cycle time', liner: 'Slower cooling means each shot takes longer, raising the cost of every part.' },
    'thermal-imaging':   { title: 'Thermal imaging of the mould', liner: 'A thermal camera pointed at the open tool shows hot spots directly.' },
    'conformal':         { title: 'Conformal cooling', liner: '3D-printed mould inserts whose water channels follow the part surface.' },
    'heat-transfer':     { title: 'Heat transfer', liner: 'The physics of how heat moves through steel, plastic and water.' },
    'styling-surfaces':  { title: 'Styling-led surfaces', liner: 'Form decisions made before engineering review often leave thick and thin zones.' },
    'bosses':            { title: 'Screw bosses', liner: 'Solid posts for fasteners. Easy to make too thick where they meet the wall.' },
    'missing-coring':    { title: 'Missing coring', liner: 'Solid thick areas that could have been hollowed out and supported with ribs.' },
    'nominal-wall':      { title: 'Nominal wall guidelines', liner: 'Typical walls run 1 to 3 mm and vary by no more than about 25% across a part.' },
    'gas-assist':        { title: 'Gas-assist moulding', liner: 'Injecting gas to hollow out thick sections that cannot be redesigned.' },
    'material-choice':   { title: 'Material selection trade-offs', liner: 'Semi-crystalline resins are chosen for chemical resistance, fatigue life and low friction.' },
    'resin-cost':        { title: 'Resin cost pressure', liner: 'PP is one of the cheapest engineering options, which drives its use.' },
    'high-shrinkage':    { title: 'High mould shrinkage', liner: 'PP and POM shrink roughly 1 to 2.5%, against about 0.5% for ABS.' },
    'anisotropy':        { title: 'Direction-dependent shrinkage', liner: 'The part shrinks by different amounts along and across the flow.' },
    'amorphous':         { title: 'Amorphous polymers', liner: 'ABS, PC and PMMA shrink less and more evenly, at the cost of chemical resistance.' },
    'crystallinity':     { title: 'Crystallinity', liner: 'How much of the polymer packs into ordered regions. Strongly affected by cooling rate.' },
  },

  systems: {
    'warping': [
      { to: 'uneven-cooling',    rel: 'cause',   link: 0.95, relevance: 0.95 },
      { to: 'wall-thickness',    rel: 'cause',   link: 0.90, relevance: 0.90 },
      { to: 'diff-shrinkage',    rel: 'cause',   link: 0.98, relevance: 0.75 },
      { to: 'semi-crystalline',  rel: 'cause',   link: 0.70, relevance: 0.75 },
      { to: 'fibre',             rel: 'cause',   link: 0.60, relevance: 0.45 },
      { to: 'gate',              rel: 'cause',   link: 0.65, relevance: 0.60 },
      { to: 'packing',           rel: 'cause',   link: 0.70, relevance: 0.55 },
      { to: 'early-eject',       rel: 'cause',   link: 0.60, relevance: 0.65 },
      { to: 'ribs',              rel: 'cause',   link: 0.55, relevance: 0.50 },
      { to: 'hot-stacking',      rel: 'cause',   link: 0.25, relevance: 0.70 },
      { to: 'resin-batch',       rel: 'cause',   link: 0.30, relevance: 0.75 },
      { to: 'wet-resin',         rel: 'cause',   link: 0.35, relevance: 0.15 },
      { to: 'assembly',          rel: 'effect',  link: 0.85, relevance: 0.85 },
      { to: 'gaps',              rel: 'effect',  link: 0.70, relevance: 0.60 },
      { to: 'sealing',           rel: 'effect',  link: 0.55, relevance: 0.55 },
      { to: 'scrap',             rel: 'effect',  link: 0.60, relevance: 0.50 },
      { to: 'tool-rework',       rel: 'effect',  link: 0.50, relevance: 0.40 },
      { to: 'sink',              rel: 'related', link: 0.75, relevance: 0.45 },
      { to: 'moldflow',          rel: 'related', link: 0.65, relevance: 0.70 },
      { to: 'dfm',               rel: 'related', link: 0.60, relevance: 0.55 },
      { to: 'annealing',         rel: 'related', link: 0.45, relevance: 0.35 },
      { to: 'flatness',          rel: 'related', link: 0.40, relevance: 0.50 },
      { to: 'industrial-design', rel: 'related', link: 0.20, relevance: 0.20 },
    ],

    'uneven-cooling': [
      { to: 'mould-halves',      rel: 'cause',   link: 0.90, relevance: 0.95 },
      { to: 'cooling-channels',  rel: 'cause',   link: 0.90, relevance: 0.90 },
      { to: 'inside-corners',    rel: 'cause',   link: 0.70, relevance: 0.80 },
      { to: 'wall-thickness',    rel: 'cause',   link: 0.75, relevance: 0.70 },
      { to: 'coolant-flow',      rel: 'cause',   link: 0.60, relevance: 0.60 },
      { to: 'warping',           rel: 'effect',  link: 0.95, relevance: 1.00 },
      { to: 'diff-shrinkage',    rel: 'effect',  link: 0.85, relevance: 0.70 },
      { to: 'cycle-time',        rel: 'effect',  link: 0.60, relevance: 0.35 },
      { to: 'thermal-imaging',   rel: 'related', link: 0.35, relevance: 0.75 },
      { to: 'conformal',         rel: 'related', link: 0.50, relevance: 0.55 },
      { to: 'moldflow',          rel: 'related', link: 0.60, relevance: 0.50 },
      { to: 'heat-transfer',     rel: 'related', link: 0.35, relevance: 0.30 },
    ],

    'wall-thickness': [
      { to: 'missing-coring',    rel: 'cause',   link: 0.70, relevance: 0.75 },
      { to: 'styling-surfaces',  rel: 'cause',   link: 0.35, relevance: 0.70 },
      { to: 'ribs',              rel: 'cause',   link: 0.60, relevance: 0.60 },
      { to: 'bosses',            rel: 'cause',   link: 0.60, relevance: 0.50 },
      { to: 'warping',           rel: 'effect',  link: 0.90, relevance: 1.00 },
      { to: 'sink',              rel: 'effect',  link: 0.85, relevance: 0.70 },
      { to: 'uneven-cooling',    rel: 'effect',  link: 0.80, relevance: 0.70 },
      { to: 'cycle-time',        rel: 'effect',  link: 0.60, relevance: 0.40 },
      { to: 'nominal-wall',      rel: 'related', link: 0.70, relevance: 0.80 },
      { to: 'dfm',               rel: 'related', link: 0.70, relevance: 0.70 },
      { to: 'gas-assist',        rel: 'related', link: 0.35, relevance: 0.35 },
      { to: 'industrial-design', rel: 'related', link: 0.30, relevance: 0.35 },
    ],

    'semi-crystalline': [
      { to: 'material-choice',   rel: 'cause',   link: 0.70, relevance: 0.70 },
      { to: 'resin-cost',        rel: 'cause',   link: 0.40, relevance: 0.50 },
      { to: 'high-shrinkage',    rel: 'effect',  link: 0.90, relevance: 0.90 },
      { to: 'anisotropy',        rel: 'effect',  link: 0.75, relevance: 0.75 },
      { to: 'warping',           rel: 'effect',  link: 0.80, relevance: 1.00 },
      { to: 'crystallinity',     rel: 'related', link: 0.85, relevance: 0.60 },
      { to: 'amorphous',         rel: 'related', link: 0.80, relevance: 0.75 },
      { to: 'fibre',             rel: 'related', link: 0.60, relevance: 0.50 },
      { to: 'annealing',         rel: 'related', link: 0.40, relevance: 0.30 },
    ],
  },

  // Strong links BETWEEN orbiting topics (not with the sun), per system.
  // [topic, topic, strength 0 to 1]. Shown as faint lines between orbs.
  crossLinks: {
    'warping': [
      ['wall-thickness', 'uneven-cooling', 0.85],
      ['wall-thickness', 'sink', 0.85],
      ['wall-thickness', 'ribs', 0.80],
      ['uneven-cooling', 'diff-shrinkage', 0.85],
      ['semi-crystalline', 'diff-shrinkage', 0.75],
      ['fibre', 'diff-shrinkage', 0.70],
      ['fibre', 'gate', 0.70],
      ['gate', 'packing', 0.70],
      ['packing', 'sink', 0.75],
      ['early-eject', 'hot-stacking', 0.65],
      ['assembly', 'gaps', 0.80],
      ['assembly', 'flatness', 0.70],
      ['sealing', 'flatness', 0.65],
      ['scrap', 'tool-rework', 0.60],
      ['moldflow', 'gate', 0.70],
      ['moldflow', 'uneven-cooling', 0.60],
      ['dfm', 'wall-thickness', 0.75],
      ['dfm', 'industrial-design', 0.65],
      ['annealing', 'semi-crystalline', 0.60],
      ['wet-resin', 'resin-batch', 0.60],
    ],
    'uneven-cooling': [
      ['cooling-channels', 'conformal', 0.85],
      ['cooling-channels', 'coolant-flow', 0.80],
      ['cooling-channels', 'inside-corners', 0.70],
      ['mould-halves', 'thermal-imaging', 0.70],
      ['warping', 'diff-shrinkage', 0.90],
      ['wall-thickness', 'cycle-time', 0.65],
      ['moldflow', 'cooling-channels', 0.65],
      ['heat-transfer', 'conformal', 0.60],
    ],
    'wall-thickness': [
      ['ribs', 'bosses', 0.75],
      ['missing-coring', 'ribs', 0.70],
      ['styling-surfaces', 'industrial-design', 0.85],
      ['nominal-wall', 'dfm', 0.80],
      ['gas-assist', 'missing-coring', 0.65],
      ['sink', 'ribs', 0.70],
      ['warping', 'uneven-cooling', 0.85],
    ],
    'semi-crystalline': [
      ['material-choice', 'resin-cost', 0.75],
      ['material-choice', 'amorphous', 0.70],
      ['high-shrinkage', 'crystallinity', 0.80],
      ['anisotropy', 'fibre', 0.80],
      ['crystallinity', 'annealing', 0.70],
      ['high-shrinkage', 'warping', 0.75],
    ],
  },

  // Extra detail shown when an orb is opened. Topics without an entry
  // show their one-liner only (live research fills the rest in stage 4).
  //   about   – a short explanation
  //   check   – what to look at when diagnosing
  //   chart   – an optional bar chart: { title, unit, note, rows: [[label, value], …] }
  //   sources – EXAMPLES showing how reliability tiers will look (1 = most reliable, 6 = unsourced)
  details: {
    'warping': {
      about: 'Every plastic shrinks as it cools from melt to room temperature. Warping is what happens when that shrinkage is uneven: one region ends up shorter than its neighbour, and the part bends or twists to relieve the mismatch. Almost every cause of warping is a different route to uneven shrinkage.',
      check: ['Which way does it bend, and is it the same on every part?', 'Did it start suddenly (material, machine, season) or has it always happened (design, tooling)?', 'Does it get worse over hours or days after moulding?'],
      sources: [
        { tier: 2, type: 'Textbook', title: 'A plastics part design textbook, chapter on shrinkage and warpage' },
        { tier: 3, type: 'Reference', title: 'Encyclopedia entry on injection moulding defects' },
        { tier: 5, type: 'Forum', title: 'Moulders’ forum thread on troubleshooting warped lids' },
      ],
    },
    'uneven-cooling': {
      about: 'A part keeps shrinking until it freezes. If one side sits against hotter steel, it stays soft longer and keeps shrinking after the other side has set, so the part bows towards the hotter side. On flat parts a difference of a few degrees between the mould halves can be enough.',
      check: ['Measure the surface temperature of both mould halves, ideally with a thermal camera on the open tool.', 'Check flow and temperature on each cooling circuit, not just the chiller setting.', 'See which way the part bows: usually towards the hotter side.'],
      sources: [
        { tier: 2, type: 'Textbook', title: 'Mould design textbook, chapter on cooling systems' },
        { tier: 4, type: 'Company guide', title: 'Simulation software vendor’s guide to warpage', flag: 'Conflict of interest' },
        { tier: 6, type: 'AI inference', title: 'Link between thermal imaging and this diagnosis, not yet sourced' },
      ],
    },
    'wall-thickness': {
      about: 'Cooling time grows roughly with the square of wall thickness, so a section twice as thick takes about four times as long to set. Thick and thin areas in the same part therefore freeze at different times and shrink by different amounts, pulling the part out of shape.',
      check: ['Section the part or use the CAD wall-thickness check to find thick zones.', 'Look for thick areas where ribs, bosses or styling features join the main wall.', 'Compare against a nominal wall: variation above about 25% is a warning sign.'],
      chart: { title: 'Relative cooling time by wall thickness', unit: '×', note: 'Cooling time scales with thickness squared (1 mm = 1×).', rows: [['1 mm', 1], ['2 mm', 4], ['3 mm', 9], ['4 mm', 16]] },
      sources: [
        { tier: 2, type: 'Textbook', title: 'Heat transfer in injection moulding, design handbook' },
        { tier: 3, type: 'Design guide', title: 'Resin supplier’s part design guide', flag: 'Conflict of interest' },
      ],
    },
    'diff-shrinkage': {
      about: 'This is the mechanism behind warping rather than a separate cause. Shrinkage differs through the thickness (skin versus core), across the part (thick versus thin, near versus far from the gate) and with direction (along versus across the flow). Warp follows wherever those differences are largest.',
      check: ['Measure shrinkage along and across the flow on test plaques.', 'Compare dimensions near and far from the gate.'],
      sources: [
        { tier: 1, type: 'Standard', title: 'ISO 294-4: determining moulding shrinkage' },
        { tier: 2, type: 'Peer-reviewed', title: 'Studies of residual stress and warpage in moulded plates' },
      ],
    },
    'semi-crystalline': {
      about: 'In semi-crystalline plastics, part of the polymer packs into ordered crystals as it cools, which takes up less space. They shrink more than amorphous plastics, and by different amounts depending on how fast each region cooled and which way it flowed.',
      check: ['Check the material datasheet’s shrinkage along and across the flow.', 'Ask whether an amorphous or filled grade would meet the requirements.', 'Keep mould temperature steady: it changes how much crystallises.'],
      chart: { title: 'Typical mould shrinkage, unfilled grades', unit: '%', note: 'Typical mid-range values; real grades vary.', rows: [['HDPE', 2.5], ['POM', 2.0], ['PP', 1.8], ['PA6', 1.2], ['PC', 0.6], ['ABS', 0.55], ['PMMA', 0.4]] },
      sources: [
        { tier: 1, type: 'Datasheet', title: 'Resin manufacturers’ shrinkage data', flag: 'Conflict of interest' },
        { tier: 2, type: 'Textbook', title: 'Polymer science textbook, chapter on crystallisation' },
      ],
    },
    'hot-stacking': {
      about: 'A part can look fine at the machine and still warp later. If it is packed while warm, it keeps cooling in the box under the weight of the parts above it, and sets in the shape it was squashed into.',
      check: ['Measure parts straight off the machine and again after 24 hours.', 'Check how long parts cool before packing, and how they are stacked.', 'Try a cooling fixture or conveyor for flat parts.'],
      sources: [
        { tier: 3, type: 'Trade article', title: 'Trade magazine piece on post-mould shrinkage' },
        { tier: 5, type: 'Forum', title: 'Forum reports of lids warping in storage' },
      ],
    },
    'resin-batch': {
      about: 'When warping starts suddenly on a tool that used to run well, the material is a prime suspect. A new lot, a different supplier, a change in regrind ratio or a colour masterbatch that nucleates crystals can all change shrinkage.',
      check: ['Match the date the problem began against material lot numbers.', 'Check whether regrind or colourant changed.', 'Run a known good lot, if any remains, as a comparison.'],
      sources: [
        { tier: 3, type: 'Trade article', title: 'Processing magazine article on lot-to-lot variation' },
        { tier: 6, type: 'AI inference', title: 'Suggested from the sudden-onset pattern, not yet sourced' },
      ],
    },
    'early-eject': {
      about: 'Shortening cooling time is a common way to speed up a cycle. If the part leaves the mould before it is stiff enough, ejector pins can push it out of shape and it keeps shrinking unevenly outside the mould.',
      check: ['Has the cycle time been shortened recently?', 'Look for ejector pin marks or distortion near the pins.', 'Try a longer cooling time as a test.'],
    },
    'gate': {
      about: 'The gate is where plastic enters the cavity. It decides the flow direction, how well far areas are packed, and which way fibres and molecules line up, all of which change local shrinkage.',
      check: ['Compare warp direction with flow direction from the gate.', 'Check whether far regions are being packed properly.'],
    },
    'packing': {
      about: 'After filling, the machine keeps pushing in extra material to make up for shrinkage. Too little pressure, or a gate that freezes too soon, leaves thick areas under-packed so they shrink more.',
      check: ['Weigh parts while increasing hold time: weight stops rising when the gate freezes.', 'Check hold pressure and hold time against the material’s recommendations.'],
    },
    'fibre': {
      about: 'Glass fibres line up with the flow. The part then shrinks very little along the fibres and much more across them, which twists flat or long parts.',
      check: ['Compare the warp with the flow pattern.', 'Consider a different gate position or a mineral or bead filler.'],
    },
    'ribs': {
      about: 'Ribs stiffen a part, but where a thick rib meets the wall it creates a local hot spot that shrinks more, often showing as a sink mark on the other face.',
      check: ['Rib thickness should usually be around 50 to 60% of the wall it joins.', 'Look for sink marks opposite ribs as a clue.'],
    },
    'assembly': {
      about: 'Warp often isn’t noticed until assembly: snap fits that won’t engage, screw bosses out of line, or mating parts that won’t close evenly.',
      check: ['Measure the part on a fixture that matches its assembled position.', 'Check whether the mating part is warped too.'],
    },
    'sink': {
      about: 'Sink marks are shallow dips on the surface over thick sections. They share a root with warping: thick areas shrink more as they cool.',
      check: ['Look for sinks over ribs and bosses.', 'If you see both sink and warp, suspect wall thickness first.'],
    },
    'mould-halves': {
      about: 'If the core and cavity halves of the mould run at different temperatures, one face of the part shrinks more than the other and the part bends towards the hotter half.',
      check: ['Measure both halves after the tool has stabilised.', 'Check that each half has its own temperature control and that both are working.'],
    },
    'cooling-channels': {
      about: 'Cooling channels carry heat out of the mould. Channels that are too far from the surface, too far apart, or missing from cores leave hot spots that cool the part unevenly.',
      check: ['Check channel layout in the tool drawings.', 'Use a thermal image of the open tool to spot hot zones.'],
    },
    'inside-corners': {
      about: 'The inside corner of a box-shaped part is surrounded by steel on several sides and is hard to cool. It stays hot, shrinks more, and pulls the walls inward.',
      check: ['Check whether the walls of box shapes lean inwards.', 'Look for cooling in cores, such as baffles or bubblers.'],
    },
  },
};

