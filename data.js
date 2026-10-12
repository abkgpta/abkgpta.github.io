// ─────────────────────────────────────────────────────────────
// EXAMPLE CONTENT for the stage 1 sketch.
//
// This file is plain text you can safely edit. Change a title or a
// one-liner, save, and refresh the page to see it.
//
// TOPICS   – every orb that can appear, with its name and one-liner.
// SYSTEMS  – the "solar system" around a topic: which orbs orbit it,
//            and how. Only topics listed here can be unfolded.
//
// For each orbiting orb:
//   rel        "cause"   → sits BELOW the sun (it's a root of the problem)
//              "effect"  → sits ABOVE the sun (it's a consequence)
//              "related" → sits around the middle
//   link       0 to 1. How strongly the two topics are linked in general.
//              Sets DISTANCE: 1 = tight orbit, 0 = far out.
//   relevance  0 to 1. How much it matters to THIS line of reasoning.
//              Sets SIZE: 1 = big orb, 0 = tiny.
//
// The same topic can have a different size in different systems,
// because relevance depends on how you got there.
// ─────────────────────────────────────────────────────────────

window.ORRERY_DATA = {
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
};
