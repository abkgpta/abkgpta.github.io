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

  // The reasoning behind every line, shown in Reasoning mode, per system.
  //   _centre        – how the question was read, and what was looked for first
  //   'topic'        – the line from that orb to the centre
  //   'topic~topic'  – a line between two orbs
  // Each link is [tier, where it comes from, why]. Tier is the same 1 to 6
  // reliability scale the sources use (6 = my own inference, no source).
  reasons: {
    'warping': {
      _centre: 'You asked why your part is warping, so I treated it as a problem to diagnose and named the thing under investigation: the warped part. I looked for causes first, strongest mechanism first, then for what the warp leads to, then for tools and neighbouring topics.',
      'uneven-cooling':    [2, 'Mould design textbooks, cooling chapter', 'Plastic keeps shrinking until it freezes. If one region stays hot longer, it shrinks more than its neighbours, and that mismatch is exactly what bends a part.'],
      'wall-thickness':    [2, 'Heat-transfer physics; part design handbooks', 'Cooling time grows with the square of thickness, so thick zones freeze late and shrink more than the thin walls next to them.'],
      'diff-shrinkage':    [1, 'ISO 294-4 and studies of residual stress', 'This is the mechanism itself: warp is the shape a part takes to relieve uneven shrinkage. Every other cause works through it, which is why it is the strongest link on the map.'],
      'semi-crystalline':  [1, 'Resin datasheets (shrinkage values)', 'Crystals pack tighter than tangled chains, so these plastics shrink 1 to 2.5% against about 0.5% for amorphous ones. More total shrinkage leaves more room for it to be uneven.'],
      'fibre':             [2, 'Studies of fibre-filled mouldings', 'Fibres line up with the flow and resist shrinking along their length, so a filled part shrinks differently in two directions and twists.'],
      'gate':              [3, 'Mould design guides', 'The gate sets the flow path, and the flow path sets how well each area is packed and which way molecules and fibres lie. Move the gate and the shrinkage pattern moves with it.'],
      'packing':           [3, 'Process troubleshooting guides', 'Packing pushes in extra plastic to make up for shrinkage. Too little leaves thick or far-off areas short, so they shrink more than the rest.'],
      'early-eject':       [5, 'Moulders’ shop-floor experience', 'A part that leaves the mould before it is rigid keeps cooling with nothing holding its shape, and ejector pins can push it out of true. It ranks high because shortening the cycle is such a common change.'],
      'ribs':              [3, 'Resin suppliers’ rib design rules', 'Where a thick rib meets a wall it forms a local hot spot. That spot shrinks more and pulls on the wall around it.'],
      'hot-stacking':      [5, 'Trade and forum reports of parts warping in storage', 'Loosely linked in general, but it fits a specific pattern: parts packed warm keep cooling under load and set in the squashed shape. It explains warp that appears hours after moulding.'],
      'resin-batch':       [6, 'My inference from the sudden-onset pattern', 'A tool that ran well and suddenly warps points to something that changed. Material lots, suppliers and regrind ratios change often and alter shrinkage, so this is a hidden lead rather than a textbook cause.'],
      'wet-resin':         [3, 'Drying guidance in resin datasheets', 'Kept on the map so it can be ruled out: moisture mostly causes splay and brittleness. It is often blamed for warp, so it stays, but small.'],
      'assembly':          [3, 'Assembly and tolerance guides', 'A part that has bent no longer matches the parts it mates with, so snap fits miss and bosses misalign. This is usually where warp is first noticed.'],
      'gaps':              [4, 'Industrial design practice on split lines', 'Even a small bow opens the seam between two housings, and visible gaps are what customers see first.'],
      'sealing':           [3, 'Gasket and IP-rating design guides', 'A gasket only seals when it is squeezed evenly. A warped flange leaves low spots where water and dust get in.'],
      'scrap':             [6, 'My inference: rejected parts cost material and time', 'Parts that fail a flatness check are scrapped, so warp shows up directly in scrap rate and cost.'],
      'tool-rework':       [4, 'Toolmakers’ guidance', 'When process changes cannot fix warp, the mould itself is recut. It is the costly last resort, so it is an effect to avoid rather than a first fix.'],
      'sink':              [2, 'Part design textbooks', 'Sink marks and warp share a root: thick sections shrinking more as they cool. Seeing both on one part points to wall thickness.'],
      'moldflow':          [4, 'Simulation software documentation', 'Flow simulation predicts filling, cooling and warpage, so it is a way to test the causes above before cutting steel.'],
      'dfm':               [3, 'Design-for-manufacture guides', 'Most design-side causes of warp, like uneven walls and thick ribs, are exactly what design-for-manufacture rules exist to prevent.'],
      'annealing':         [3, 'Post-moulding process guides', 'Reheating relaxes moulded-in stress and can reduce warp after the fact. It treats the symptom, which is why it sits further out.'],
      'flatness':          [1, 'GD&T standard (ASME Y14.5)', 'Whether a part counts as warped depends on the flatness tolerance on its drawing. Sometimes the fix is a realistic tolerance.'],
      'industrial-design': [6, 'My inference: styling decisions shape wall thickness', 'A distant link: styling choices made early can leave thick and thin zones. It is small because it only matters if the shape itself is the problem.'],
      'wall-thickness~uneven-cooling':   [2, 'Heat-transfer physics', 'Thick sections are one of the main reasons a part cools unevenly: they hold heat longer than the thin walls around them.'],
      'wall-thickness~sink':             [2, 'Part design textbooks', 'Both come from thick sections shrinking more. A sink mark is the surface version, warp is the whole-part version.'],
      'wall-thickness~ribs':             [3, 'Rib design rules', 'A rib that is too thick is just a local thick wall, so it carries the same risk.'],
      'uneven-cooling~diff-shrinkage':   [2, 'Mould design textbooks', 'Uneven cooling is the most common route to differential shrinkage: hotter regions keep shrinking for longer.'],
      'semi-crystalline~diff-shrinkage': [2, 'Polymer science textbooks', 'How much these plastics crystallise depends on the local cooling rate, so their shrinkage varies more from place to place.'],
      'fibre~diff-shrinkage':            [2, 'Studies of fibre-filled mouldings', 'Fibre alignment makes shrinkage depend on direction, which is one form of differential shrinkage.'],
      'fibre~gate':                      [3, 'Mould design guides', 'The gate decides the flow direction and fibres line up with the flow, so moving the gate changes fibre orientation.'],
      'gate~packing':                    [3, 'Process guides', 'Areas far from the gate get less packing pressure, and a small gate freezes early and cuts packing short.'],
      'packing~sink':                    [3, 'Troubleshooting guides', 'Raising packing pressure is the standard fix for sink marks, which shows the two share a cause.'],
      'early-eject~hot-stacking':        [5, 'Shop-floor experience', 'Both are about a part losing support while still warm: one in the mould, the other in the box.'],
      'assembly~gaps':                   [4, 'Assembly practice', 'A warped housing shows up both as parts that won’t fit and as gaps at the seam.'],
      'assembly~flatness':               [3, 'Tolerance guides', 'Flatness tolerances exist so parts assemble, and a tight fit needs a tight flatness callout.'],
      'sealing~flatness':                [3, 'Gasket design guides', 'A seal needs a flat flange, so sealing faces usually carry the strictest flatness tolerance.'],
      'scrap~tool-rework':               [6, 'My inference: a cost trade-off', 'Scrap that won’t go away is what eventually justifies paying to rework the tool.'],
      'moldflow~gate':                   [4, 'Simulation software documentation', 'Choosing a gate position is one of the main things flow simulation is used for.'],
      'moldflow~uneven-cooling':         [4, 'Simulation software documentation', 'A cooling analysis shows hot spots before the mould is built.'],
      'dfm~wall-thickness':              [3, 'Design-for-manufacture guides', 'Keeping walls uniform is the first rule of design for manufacture in moulding.'],
      'dfm~industrial-design':           [4, 'Product design practice', 'Design for manufacture is where styling intent meets what the process can make.'],
      'annealing~semi-crystalline':      [3, 'Polymer processing texts', 'Annealing lets semi-crystalline plastics finish crystallising, which steadies their shape.'],
      'wet-resin~resin-batch':           [6, 'My inference: both are material questions', 'Both point at the material rather than the tool, and both are checked in the same place: the material handling records.'],
    },
    'uneven-cooling': {
      _centre: 'You expanded uneven cooling from the warped part. I looked for what makes a mould cool unevenly, what that leads to, and the tools that reveal it, strongest links first.',
      'mould-halves':     [2, 'Mould design textbooks', 'When one mould half runs hotter, that face of the part keeps shrinking longer, so the part bows towards it. On a flat part a few degrees is enough.'],
      'cooling-channels': [2, 'Mould design textbooks, cooling chapter', 'Channels carry the heat away. Channels too far from the surface, or missing from an area, leave hot spots in the steel.'],
      'inside-corners':   [3, 'Mould design guides', 'Steel inside a corner is surrounded by plastic on several sides and is hard to cool, so it stays the hottest place in the tool.'],
      'wall-thickness':   [2, 'Heat-transfer physics', 'Thick sections hold heat longer, so a part can cool unevenly even in an evenly cooled mould.'],
      'coolant-flow':     [4, 'Maintenance guides for mould temperature controllers', 'Blocked or undersized lines carry heat away slowly. Scale builds up over months, so this explains warp that crept in gradually.'],
      'warping':          [2, 'Mould design textbooks', 'You came from here. Uneven cooling is one of the main causes of warp, so seen from this side, warp is its effect.'],
      'diff-shrinkage':   [2, 'Mould design textbooks', 'Regions that cool at different rates shrink by different amounts, and that difference is what turns into warp.'],
      'cycle-time':       [3, 'Process economics guides', 'The slowest-cooling spot sets the cycle time, so hot spots cost time on every shot.'],
      'thermal-imaging':  [6, 'My inference: the most direct way to see the cause', 'Loosely linked in general, but very useful here: a thermal camera on the open tool shows hot spots directly, which confirms or rules out this whole branch quickly.'],
      'conformal':        [4, 'Case studies of 3D-printed mould inserts', 'Conformal channels follow the part surface and reach hot spots that straight drilled channels can’t.'],
      'moldflow':         [4, 'Simulation software documentation', 'A cooling analysis predicts where the part will run hot before steel is cut.'],
      'heat-transfer':    [2, 'Physics textbooks', 'The underlying physics. Useful for understanding, less so for diagnosing, so it sits far out.'],
      'cooling-channels~conformal':      [4, 'Case studies of 3D-printed mould inserts', 'Conformal cooling is a different way of laying out the channels.'],
      'cooling-channels~coolant-flow':   [4, 'Maintenance guides', 'A good channel layout still fails if the water through it is slow.'],
      'cooling-channels~inside-corners': [3, 'Mould design guides', 'Inside corners are where channels are hardest to fit, which is why they run hot.'],
      'mould-halves~thermal-imaging':    [6, 'My inference', 'A thermal image of both halves shows a temperature difference at a glance.'],
      'warping~diff-shrinkage':          [2, 'Mould design textbooks', 'Differential shrinkage is the mechanism and warp is its visible result.'],
      'wall-thickness~cycle-time':       [2, 'Heat-transfer physics', 'Cooling time grows with thickness squared, so the thickest wall sets the cycle.'],
      'moldflow~cooling-channels':       [4, 'Simulation software documentation', 'Simulation is used to test channel layouts before machining.'],
      'heat-transfer~conformal':         [4, 'Engineering papers on conformal cooling', 'Conformal cooling works by shortening the path heat travels from part to water.'],
    },
    'wall-thickness': {
      _centre: 'You expanded wall thickness from the warped part. I looked for the design choices that create thick zones, what thick zones lead to, and the guidelines and fixes around them.',
      'missing-coring':    [3, 'Design-for-manufacture guides', 'Solid areas that could have been hollowed out are the most common source of thick sections.'],
      'styling-surfaces':  [6, 'My inference from how products get developed', 'A hidden lead: shapes fixed by styling before engineering review often hide thick zones. It applies if the design team works that way.'],
      'ribs':              [3, 'Rib design rules', 'Ribs thicker than about 60% of the wall add thick spots where they join it.'],
      'bosses':            [3, 'Fastening design guides', 'Screw bosses are solid posts and are easy to make too thick where they meet the wall.'],
      'warping':           [2, 'Heat-transfer physics', 'You came from here. Thick sections freeze late and shrink more, pulling the part out of shape.'],
      'sink':              [2, 'Part design textbooks', 'Thick sections shrink inward as they cool and drag the surface with them.'],
      'uneven-cooling':    [2, 'Heat-transfer physics', 'Thick and thin areas cool at different speeds, which is uneven cooling by definition.'],
      'cycle-time':        [2, 'Heat-transfer physics', 'The thickest section sets how long every shot has to cool.'],
      'nominal-wall':      [3, 'Resin suppliers’ design guides', 'The guideline gives a yardstick: walls of 1 to 3 mm that vary by no more than about 25%.'],
      'dfm':               [3, 'Design-for-manufacture guides', 'Uniform walls are the first rule of design for manufacture.'],
      'gas-assist':        [4, 'Process suppliers’ literature', 'A way to hollow out thick sections that can’t be redesigned.'],
      'industrial-design': [6, 'My inference', 'Wall thickness is partly a styling decision, so it links back to industrial design.'],
      'ribs~bosses':                       [3, 'Part design guides', 'Both are features added to a wall, and both follow the same thickness rule.'],
      'missing-coring~ribs':               [3, 'Design-for-manufacture guides', 'The usual fix for a solid thick area is to core it out and support it with ribs.'],
      'styling-surfaces~industrial-design':[4, 'Product design practice', 'Styling-led surfaces are what industrial design produces before engineering review.'],
      'nominal-wall~dfm':                  [3, 'Design-for-manufacture guides', 'The nominal wall guideline is one of the core design-for-manufacture rules.'],
      'gas-assist~missing-coring':         [4, 'Process suppliers’ literature', 'Gas assist does in the process what coring does in the design.'],
      'sink~ribs':                         [3, 'Rib design rules', 'A sink mark opposite a rib is the classic sign the rib is too thick.'],
      'warping~uneven-cooling':            [2, 'Heat-transfer physics', 'Uneven cooling is how thickness turns into warp, so these two effects feed each other.'],
    },
    'semi-crystalline': {
      _centre: 'You expanded semi-crystalline polymers from the warped part. I looked for why these plastics get chosen, what their structure does to shrinkage, and the alternatives.',
      'material-choice': [3, 'Materials selection guides', 'These plastics are chosen for chemical resistance, fatigue life and low friction, so the reason they are in the part is often a requirement that can’t be dropped.'],
      'resin-cost':      [4, 'Market price reports', 'PP is among the cheapest engineering plastics, which is often why it was picked.'],
      'high-shrinkage':  [1, 'Resin datasheets', 'Crystals pack tighter than tangled chains, so these grades shrink about 1 to 2.5% against roughly 0.5% for amorphous ones.'],
      'anisotropy':      [2, 'Polymer processing studies', 'Molecules and crystals line up with the flow, so shrinkage differs along and across it.'],
      'warping':         [2, 'Polymer science textbooks', 'You came from here. Larger and less even shrinkage makes these plastics prone to warp.'],
      'crystallinity':   [2, 'Polymer science textbooks', 'How much crystallises depends on cooling rate, which is why mould temperature matters so much for these resins.'],
      'amorphous':       [2, 'Polymer science textbooks', 'The other family. Comparing them shows what switching material would gain and lose.'],
      'fibre':           [2, 'Studies of fibre-filled mouldings', 'Glass fibre is often added to semi-crystalline resins, and brings its own direction-dependent shrinkage.'],
      'annealing':       [3, 'Polymer processing texts', 'Annealing completes crystallisation after moulding, which steadies the shape.'],
      'material-choice~resin-cost':   [4, 'Materials selection guides', 'Cost is one of the main forces in choosing a material.'],
      'material-choice~amorphous':    [3, 'Materials selection guides', 'Choosing a material usually means weighing semi-crystalline against amorphous options.'],
      'high-shrinkage~crystallinity': [2, 'Polymer science textbooks', 'More crystallinity means more shrinkage, because crystals pack tighter.'],
      'anisotropy~fibre':             [2, 'Studies of fibre-filled mouldings', 'Fibres are the strongest source of direction-dependent shrinkage.'],
      'crystallinity~annealing':      [3, 'Polymer processing texts', 'Annealing works by raising crystallinity in a controlled way.'],
      'high-shrinkage~warping':       [2, 'Mould design textbooks', 'More total shrinkage leaves more room for it to be uneven.'],
    },
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


