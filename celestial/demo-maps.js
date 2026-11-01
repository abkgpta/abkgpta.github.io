// ─────────────────────────────────────────────────────────────
// DEMO CONTENT · what Expand finds around each example topic.
//
// Only on this site. Written by Claude for the demo, in the shape a live
// map returns (see demo.js). Keyed by the centre topic's title. The
// example's own maps (Uneven cooling, Non-uniform wall thickness,
// Semi-crystalline polymers) are reused as they are, so they aren't here.
//   liner, reading – the centre's one-liner, and how the question was read
//   orbs  – [title, rel, link, relevance, liner, why, basis, tier]
//           liner '' means the example topic's own one-liner
//   links – [a, b, strength, why, basis, tier]
// ─────────────────────────────────────────────────────────────

window.CELESTIAL_DEMO_CONTENT ||= {};
window.CELESTIAL_DEMO_CONTENT.maps = {
  'Differential shrinkage': {
    liner: 'Regions of a part shrink by different amounts, and the part bends to relieve the mismatch.',
    reading: 'You expanded the mechanism behind the warp, so I looked for every route that makes shrinkage differ from place to place: through the thickness, across the part and with direction. Then I added what it leads to and how it is measured.',
    orbs: [
      ['Uneven cooling', 'cause', 0.9, 0.9, '', 'Regions that stay hot keep shrinking for longer than their neighbours. It is the commonest route to differential shrinkage.', 'Mould design textbooks', 2],
      ['Non-uniform wall thickness', 'cause', 0.85, 0.85, '', 'Thick zones freeze late and shrink more than thin ones beside them.', 'Heat-transfer physics', 2],
      ['Direction-dependent shrinkage', 'cause', 0.85, 0.75, '', 'Shrinkage that differs along and across the flow is one of the three forms of differential shrinkage.', 'Shrinkage handbooks', 2],
      ['Low packing pressure', 'cause', 0.7, 0.65, '', 'Areas that get less packing shrink more, so uneven packing becomes uneven shrinkage.', 'Process guides', 3],
      ['Crystallinity', 'cause', 0.75, 0.6, '', 'Where more of the polymer crystallises, it shrinks more. Uneven crystallinity means uneven shrinkage.', 'Polymer science textbooks', 2],
      ['Skin-core shrinkage', 'cause', 0.65, 0.5, 'The frozen skin and the slowly cooling core shrink by different amounts through the wall.', 'The skin freezes against the steel under high orientation, the core cools slowly and shrinks more. That difference sets up residual stress.', 'Studies of residual stress', 2],
      ['Warped moulded part', 'effect', 0.98, 1, '', 'Warp is the shape a part takes to relieve differential shrinkage.', 'Shrinkage handbooks', 2],
      ['Moulded-in residual stress', 'effect', 0.8, 0.55, 'Stress locked into the part when shrinkage is held back, released later by heat or chemicals.', 'Where the part is too stiff to bend, the mismatch stays as stress instead, and can appear as warp later or as cracking.', 'Studies of residual stress', 2],
      ['Sink marks', 'effect', 0.6, 0.4, '', 'A local form of the same mismatch: the core of a thick section shrinks inward under the skin.', 'Part design textbooks', 2],
      ['Mould flow simulation', 'related', 0.6, 0.6, '', 'Warpage analysis splits differential shrinkage into its causes, which tells you which one dominates.', 'Simulation documentation', 4],
      ['Shrinkage test plaques', 'related', 0.5, 0.45, 'Standard moulded plates measured along and across the flow to give a resin’s shrinkage values.', 'ISO 294-4 defines how shrinkage is measured, which is where the datasheet numbers come from.', 'ISO 294-4', 1],
    ],
    links: [
      ['Uneven cooling', 'Crystallinity', 0.8, 'Cooling rate sets how much crystallises, so uneven cooling gives uneven crystallinity.', 'Polymer science textbooks', 2],
      ['Non-uniform wall thickness', 'Uneven cooling', 0.85, 'Thick sections are a main reason a part cools unevenly.', 'Heat-transfer physics', 2],
      ['Moulded-in residual stress', 'Skin-core shrinkage', 0.7, 'The skin-core mismatch is a major source of moulded-in stress.', 'Studies of residual stress', 2],
      ['Shrinkage test plaques', 'Direction-dependent shrinkage', 0.7, 'The plaques are how flow and cross-flow shrinkage are measured.', 'ISO 294-4', 1],
    ],
  },

  'Glass-fibre orientation': {
    liner: 'Fibres line up with the flow, so a filled part shrinks less along the flow than across it.',
    reading: 'You expanded fibre orientation, so I looked at what decides which way the fibres point, then what that does to shrinkage and stiffness, then ways to control it.',
    orbs: [
      ['Gate location', 'cause', 0.85, 0.85, '', 'The gate sets the flow pattern, and fibres follow the flow.', 'Mould design guides', 3],
      ['Flow length and pattern', 'cause', 0.7, 0.7, 'How far the melt travels and how the flow fronts spread and meet.', 'Long, diverging or merging flows rotate fibres differently in each region of the part.', 'Studies of fibre-filled mouldings', 2],
      ['Wall thickness and core layer', 'cause', 0.6, 0.55, 'Thicker walls have a wider core where fibres lie across the flow.', 'Fibres align with flow near the skin and across it in the core, so thickness changes the overall balance.', 'Orientation studies', 2],
      ['Fibre content and length', 'cause', 0.55, 0.5, 'More and longer fibres make the orientation effect stronger.', 'Higher loading and longer fibres raise the difference between flow and cross-flow shrinkage.', 'Resin datasheets', 3],
      ['Direction-dependent shrinkage', 'effect', 0.95, 0.9, '', 'Fibres resist shrinking along their length, so shrinkage differs with direction.', 'Shrinkage handbooks', 2],
      ['Warped moulded part', 'effect', 0.85, 1, '', 'Uneven shrinkage between flow and cross-flow directions twists flat and long parts.', 'Studies of fibre-filled mouldings', 2],
      ['Direction-dependent stiffness', 'effect', 0.6, 0.35, 'A filled part is stiffer and stronger along the fibres than across them.', 'The same alignment that drives warp also changes strength, which matters at weld lines.', 'Composites textbooks', 2],
      ['Mineral and glass-bead fillers', 'related', 0.55, 0.65, 'Fillers with no long axis stiffen a resin with far less directional shrinkage.', 'Swapping some fibre for beads or mineral is a common fix when stiffness can be traded for flatness.', 'Resin supplier guides', 3],
      ['Mould flow simulation', 'related', 0.7, 0.6, '', 'Simulation predicts fibre orientation and the warp it causes.', 'Simulation documentation', 4],
      ['Semi-crystalline polymers', 'related', 0.5, 0.4, '', 'Most glass-filled grades are semi-crystalline (PA, PBT, PP), which adds their own shrinkage.', 'Resin datasheets', 3],
    ],
    links: [
      ['Gate location', 'Flow length and pattern', 0.85, 'The gate is where the flow pattern starts.', 'Mould design guides', 3],
      ['Fibre content and length', 'Direction-dependent shrinkage', 0.7, 'More fibre, more difference between directions.', 'Resin datasheets', 3],
      ['Mineral and glass-bead fillers', 'Direction-dependent shrinkage', 0.7, 'Fillers without a long axis reduce the directional difference.', 'Resin supplier guides', 3],
      ['Mould flow simulation', 'Gate location', 0.7, 'Simulation is used to choose a gate that gives a better fibre pattern.', 'Simulation documentation', 4],
    ],
  },

  'Gate location': {
    liner: 'Where plastic enters the mould sets the flow pattern, and with it pressure, orientation and shrinkage.',
    reading: 'You expanded gate location, so I looked at what the gate controls once plastic enters the mould, then at what limits where a gate can go, then at how gates are chosen.',
    orbs: [
      ['Part geometry and appearance', 'cause', 0.55, 0.5, 'Visible surfaces, thin features and the shape of the part limit where a gate can go.', 'A gate leaves a mark, so it is often pushed to a hidden spot that isn’t ideal for flow.', 'Mould design guides', 3],
      ['Gate type and size', 'cause', 0.7, 0.65, 'Edge, pin, tunnel, hot tip: each freezes at a different time.', 'A small gate freezes early and ends packing before thick areas are filled out.', 'Gating handbooks', 2],
      ['Glass-fibre orientation', 'effect', 0.8, 0.75, '', 'Fibres follow the flow from the gate.', 'Studies of fibre-filled mouldings', 2],
      ['Low packing pressure', 'effect', 0.75, 0.7, '', 'Areas far from the gate get less packing pressure, and an early-freezing gate cuts packing short.', 'Process guides', 3],
      ['Direction-dependent shrinkage', 'effect', 0.75, 0.65, '', 'The flow direction from the gate decides which way molecules and fibres lie.', 'Shrinkage handbooks', 2],
      ['Weld lines', 'effect', 0.6, 0.4, 'Where two flow fronts meet: weaker, and sometimes visible.', 'Moving a gate moves the weld lines with it, which can trade one problem for another.', 'Part design textbooks', 2],
      ['Warped moulded part', 'effect', 0.7, 1, '', 'Moving the gate changes the shrinkage pattern, and so the warp.', 'Mould design guides', 3],
      ['Mould flow simulation', 'related', 0.8, 0.75, '', 'Gate-location analysis is one of the main uses of simulation.', 'Simulation documentation', 4],
      ['Gate freeze-off study', 'related', 0.65, 0.6, 'Weighing parts as hold time rises shows when the gate stops letting plastic in.', 'It tells you whether the gate is limiting packing, before you change the tool.', 'Scientific moulding practice', 2],
      ['Tool rework', 'related', 0.45, 0.35, '', 'Moving a gate means changing the tool, so it is costly once steel is cut.', 'Toolmakers’ guidance', 4],
    ],
    links: [
      ['Gate type and size', 'Gate freeze-off study', 0.75, 'The freeze-off study measures how long the gate lets plastic in.', 'Scientific moulding practice', 2],
      ['Glass-fibre orientation', 'Direction-dependent shrinkage', 0.85, 'Fibre orientation is one source of direction-dependent shrinkage.', 'Shrinkage handbooks', 2],
      ['Weld lines', 'Part geometry and appearance', 0.55, 'Weld lines on show surfaces push gates to other places.', 'Design practice', 4],
    ],
  },

  'Low packing pressure': {
    liner: 'Too little material packed in as the part cools lets thick areas shrink more than they should.',
    reading: 'You expanded low packing pressure, so I looked at the machine settings and tool features that limit packing, then at what under-packing does to the part, then at how to set packing properly.',
    orbs: [
      ['Hold pressure setting', 'cause', 0.85, 0.85, 'The pressure the machine holds after filling, usually 50 to 80% of fill pressure.', 'The most direct cause: set too low, the cavity never gets the extra material it needs.', 'Process guides', 3],
      ['Short hold time', 'cause', 0.8, 0.8, 'Hold ends before the gate has frozen, so plastic flows back out.', 'If hold stops early, the melt can flow back and thick areas end up short.', 'Scientific moulding practice', 2],
      ['Gate type and size', 'cause', 0.7, 0.65, 'A small gate freezes early and ends packing before thick areas are filled out.', 'A gate that freezes before thick sections can cut packing short whatever the setting.', 'Gating handbooks', 2],
      ['Long flow length', 'cause', 0.6, 0.5, 'Far from the gate, pressure has dropped by the time it arrives.', 'Pressure falls along the flow, so far regions are packed less than near ones.', 'Flow analysis textbooks', 2],
      ['Sink marks', 'effect', 0.85, 0.7, '', 'The classic sign of under-packing: thick areas shrink inward.', 'Troubleshooting guides', 3],
      ['Differential shrinkage', 'effect', 0.75, 0.75, '', 'Areas packed less shrink more than areas packed well.', 'Shrinkage handbooks', 2],
      ['Warped moulded part', 'effect', 0.7, 1, '', 'Uneven packing becomes uneven shrinkage, and the part bends.', 'Process guides', 3],
      ['Part weight variation', 'effect', 0.65, 0.45, 'Parts weigh different amounts from shot to shot.', 'Weight is the easiest measure of packing: lighter parts were packed less.', 'Scientific moulding practice', 2],
      ['Gate freeze-off study', 'related', 0.75, 0.75, 'Weighing parts as hold time rises shows when the gate stops letting plastic in.', 'The standard way to set hold time: it shows exactly when packing stops working.', 'Scientific moulding practice', 2],
      ['Over-packing', 'related', 0.5, 0.35, 'Too much packing pressure, which locks in stress and can flash the mould.', 'Packing harder isn’t always the answer: over-packed areas near the gate can warp the other way.', 'Process guides', 3],
    ],
    links: [
      ['Short hold time', 'Gate freeze-off study', 0.85, 'The study finds the hold time where packing stops.', 'Scientific moulding practice', 2],
      ['Sink marks', 'Differential shrinkage', 0.65, 'Both come from areas shrinking more than their neighbours.', 'Part design textbooks', 2],
      ['Part weight variation', 'Hold pressure setting', 0.7, 'Changing hold pressure changes part weight directly.', 'Process guides', 3],
      ['Over-packing', 'Hold pressure setting', 0.6, 'The same setting, pushed too far.', 'Process guides', 3],
    ],
  },

  'Ejecting too early': {
    liner: 'A part pushed out before it is rigid keeps cooling and deforming outside the mould.',
    reading: 'You expanded early ejection, so I looked at why parts get ejected before they are ready, what happens to them after, and how to find the right cooling time.',
    orbs: [
      ['Cycle time pressure', 'cause', 0.8, 0.85, 'Shorter cycles mean more parts per hour, so cooling time is the first thing cut.', 'Cooling is the biggest share of the cycle, so it’s the first place people look for seconds.', 'Process guides', 3],
      ['Thick sections', 'cause', 0.6, 0.6, 'The thickest part of the wall decides when the part is stiff enough.', 'A cooling time that suits most of the part may be too short for its thickest section.', 'Heat-transfer physics', 2],
      ['Hot mould', 'cause', 0.55, 0.5, 'A mould running warm slows cooling, so the same time leaves the part softer.', 'If mould temperature drifts up, a cooling time that used to work stops working.', 'Process guides', 3],
      ['Ejector pin distortion', 'effect', 0.8, 0.75, 'Pins push into a soft part and leave it bent or marked.', 'A part that isn’t rigid yet bends where the pins push it.', 'Mould design textbooks', 2],
      ['Post-mould shrinkage', 'effect', 0.75, 0.7, 'Shrinkage that carries on after the part has left the mould.', 'A hot part keeps shrinking with nothing holding its shape, so it warps freely.', 'Shrinkage handbooks', 2],
      ['Warped moulded part', 'effect', 0.6, 1, '', 'Ejected soft, the part distorts during and after ejection.', 'Shop-floor experience', 5],
      ['Hot parts stacked in boxes', 'related', 0.65, 0.6, '', 'Both are about a part losing support while still warm.', 'Shop-floor experience', 5],
      ['Cooling fixtures', 'related', 0.55, 0.55, 'Jigs that hold parts flat while they finish cooling.', 'A fixture lets you eject early without the part warping, at the cost of handling.', 'Moulders’ practice', 4],
      ['Longer cycle time', 'related', 0.55, 0.4, '', 'The fix, a longer cooling time, is exactly what the shorter cycle was trying to avoid.', 'Process guides', 3],
    ],
    links: [
      ['Cycle time pressure', 'Longer cycle time', 0.75, 'The trade-off at the heart of this: speed against stability.', 'Process guides', 3],
      ['Post-mould shrinkage', 'Hot parts stacked in boxes', 0.7, 'Parts stacked warm deform as their post-mould shrinkage carries on.', 'Shrinkage handbooks', 2],
      ['Cooling fixtures', 'Post-mould shrinkage', 0.6, 'Fixtures hold the shape while post-mould shrinkage finishes.', 'Moulders’ practice', 4],
    ],
  },

  'Thick ribs and bosses': {
    liner: 'Ribs thicker than about 60% of the wall they join create local hot spots.',
    reading: 'You expanded thick ribs and bosses, so I looked at why they end up too thick, what the hot spot does to the part, and the design rules that avoid it.',
    orbs: [
      ['Stiffness targets', 'cause', 0.6, 0.6, 'Ribs are added to stiffen a part; thicker ribs seem stiffer.', 'The urge to make a rib stronger by making it thicker is what creates the hot spot.', 'Part design textbooks', 2],
      ['Screw bosses', 'cause', 0.7, 0.65, '', 'Bosses are often left solid or joined to the wall with too much mass.', 'Part design textbooks', 2],
      ['Missing coring', 'cause', 0.55, 0.45, '', 'A rib or boss left solid is a local thick section.', 'Part design textbooks', 2],
      ['Sink marks', 'effect', 0.9, 0.8, '', 'The hot spot at a rib root shrinks inward and pulls the opposite surface in.', 'Part design textbooks', 2],
      ['Uneven cooling', 'effect', 0.7, 0.7, '', 'Rib roots and bosses hold heat longer than the wall around them.', 'Heat-transfer physics', 2],
      ['Warped moulded part', 'effect', 0.65, 1, '', 'Many ribs on one side shrink more than the other face and bow the part.', 'Resin suppliers’ guides', 3],
      ['Voids', 'effect', 0.5, 0.35, 'Bubbles inside thick sections where the core shrank away from the skin.', 'If the skin is too stiff to sink, the shrinkage pulls a void inside instead.', 'Defect guides', 3],
      ['Rib design rules', 'related', 0.85, 0.85, 'Ribs at 50 to 60% of the wall, 0.5 to 1° draft, a root radius, spacing at least twice the wall.', 'Following these rules removes most rib-related sink and warp.', 'Resin suppliers’ design guides', 3],
      ['Nominal wall guidelines', 'related', 0.6, 0.5, '', 'Rib sizes are set from the nominal wall.', 'Part design textbooks', 2],
      ['Gas-assist moulding', 'related', 0.4, 0.3, '', 'For thick ribs that can’t be redesigned, gas can hollow them out.', 'Gas-assist handbooks', 2],
    ],
    links: [
      ['Sink marks', 'Voids', 0.7, 'Two ways the same shrinkage shows: inward on the surface, or as a hole inside.', 'Defect guides', 3],
      ['Rib design rules', 'Stiffness targets', 0.7, 'The rules get stiffness from more, thinner ribs instead of thick ones.', 'Part design textbooks', 2],
      ['Screw bosses', 'Missing coring', 0.6, 'An uncored boss is the commonest solid feature.', 'Part design textbooks', 2],
    ],
  },

  'Hot parts stacked in boxes': {
    liner: 'Parts packed while still warm can keep deforming under their own weight for hours.',
    reading: 'You expanded hot stacking, a cause that shows up after the machine. I looked at why parts get packed warm, what happens to them in the box, and how to tell this from warp made in the mould.',
    orbs: [
      ['Fast packing at the press', 'cause', 0.8, 0.8, 'Operators or robots box parts within seconds of ejection.', 'The quicker the part goes in the box, the warmer it is.', 'Shop-floor experience', 5],
      ['Ejecting too early', 'cause', 0.65, 0.6, '', 'A part ejected soft is even more vulnerable in the box.', 'Shop-floor experience', 5],
      ['Semi-crystalline polymers', 'cause', 0.55, 0.5, '', 'These keep crystallising and shrinking for a day or more after moulding.', 'Polymer science textbooks', 2],
      ['Post-mould shrinkage', 'effect', 0.85, 0.75, 'Shrinkage that carries on after the part has left the mould.', 'In the box, post-mould shrinkage happens under load and sets the part in a squashed shape.', 'Shrinkage handbooks', 2],
      ['Warped moulded part', 'effect', 0.5, 1, '', 'The part sets in the shape it was stacked in.', 'Trade and forum reports', 5],
      ['Warp found at the customer', 'effect', 0.55, 0.65, 'Parts pass inspection at the press but arrive bent.', 'The tell-tale pattern: good at the machine, bad later.', 'My inference from the timing', 6],
      ['Cooling fixtures', 'related', 0.65, 0.6, 'Jigs that hold parts flat while they finish cooling.', 'Holds the shape until the part is stable.', 'Moulders’ practice', 4],
      ['Cooling conveyor', 'related', 0.6, 0.55, 'A belt that carries parts away to cool before packing.', 'Buys time between ejection and packing without slowing the press.', 'Moulders’ practice', 4],
      ['24-hour measurement', 'related', 0.7, 0.7, 'Measuring parts at the press and again a day later.', 'The simplest test for this cause: if warp grows overnight, it’s happening after the mould.', 'Shrinkage handbooks', 2],
    ],
    links: [
      ['24-hour measurement', 'Warp found at the customer', 0.75, 'The overnight test reproduces what the customer sees.', 'My inference', 6],
      ['Cooling fixtures', 'Cooling conveyor', 0.6, 'Two ways to let parts cool before they’re loaded.', 'Moulders’ practice', 4],
      ['Post-mould shrinkage', 'Semi-crystalline polymers', 0.75, 'Semi-crystalline resins carry on shrinking longest.', 'Polymer science textbooks', 2],
    ],
  },

  'Resin batch or supplier change': {
    liner: 'Warping that starts suddenly often traces back to a new material lot, regrind ratio or supplier.',
    reading: 'You expanded the material-change lead, so I looked for every way the material can change without the drawing changing, then for how to prove or rule it out quickly.',
    orbs: [
      ['Lot-to-lot variation', 'cause', 0.75, 0.75, 'The same grade varies slightly in melt flow and molecular weight from lot to lot.', 'Small shifts in flow and crystallisation change shrinkage enough to show on sensitive parts.', 'Processing magazine articles', 3],
      ['Regrind ratio', 'cause', 0.7, 0.7, 'Reground scrap mixed back in, which has been melted at least once before.', 'Regrind has shorter chains and different crystallisation; a changing ratio means changing shrinkage.', 'Process guides', 3],
      ['Colourant and pigment', 'cause', 0.7, 0.75, 'A masterbatch change can change how the resin crystallises.', 'Some pigments nucleate crystals in PP and change its shrinkage; a colour change can bring new warp.', 'Studies of pigment nucleation', 2],
      ['Supplier or grade switch', 'cause', 0.65, 0.65, 'An “equivalent” grade from another supplier rarely shrinks the same.', 'Datasheet equivalence doesn’t cover shrinkage behaviour in your tool.', 'Moulders’ experience', 5],
      ['Wet resin', 'related', 0.6, 0.3, '', 'Often blamed alongside a new batch, but it usually shows as splay rather than warp.', 'Drying guidance', 3],
      ['Warped moulded part', 'effect', 0.4, 1, '', 'A change in shrinkage on a stable tool shows up as new warp.', 'My inference', 6],
      ['Incoming material checks', 'related', 0.6, 0.6, 'Melt flow index and certificates checked when material arrives.', 'A quick MFI check catches the biggest lot differences.', 'Quality practice', 3],
      ['Lot traceability', 'related', 0.65, 0.7, 'Recording which lot went into which parts and when.', 'Without it you can’t match the start of the warp to a material change.', 'Quality practice', 3],
      ['Crystallinity', 'related', 0.5, 0.45, '', 'Most material changes that matter act through crystallinity.', 'Polymer science textbooks', 2],
    ],
    links: [
      ['Colourant and pigment', 'Crystallinity', 0.8, 'Nucleating pigments change crystallinity directly.', 'Studies of pigment nucleation', 2],
      ['Regrind ratio', 'Lot-to-lot variation', 0.55, 'Both change the material while the label stays the same.', 'Process guides', 3],
      ['Lot traceability', 'Incoming material checks', 0.7, 'Checks and traceability together tell you what changed and when.', 'Quality practice', 3],
    ],
  },

  'Wet resin': {
    liner: 'Undried resin mostly causes splay marks and brittleness. It is rarely the main cause of warping.',
    reading: 'You expanded wet resin. I treated it as something to confirm or rule out: which resins care, what moisture really does, and how to check the dryer.',
    orbs: [
      ['Hygroscopic resins', 'cause', 0.85, 0.75, 'Nylon, PC, PET and PBT absorb water from the air.', 'Only these resins need drying; PP and PE barely absorb water.', 'Resin datasheets', 1],
      ['Dryer problems', 'cause', 0.8, 0.8, 'Wrong temperature, too short a residence time or a saturated desiccant.', 'Most wet-resin problems are dryer problems, not material problems.', 'Drying guidance', 3],
      ['Splay marks', 'effect', 0.9, 0.8, 'Silver streaks on the surface where steam bubbles were dragged along.', 'The signature of moisture; without splay, moisture is unlikely to be the cause.', 'Defect guides', 3],
      ['Brittleness', 'effect', 0.75, 0.6, 'Parts snap more easily because the polymer chains were broken.', 'Water breaks chains in the hot barrel, which weakens the part.', 'Polymer science textbooks', 2],
      ['Warped moulded part', 'effect', 0.25, 0.3, '', 'Rarely the main cause. Moisture changes viscosity a little, which can shift packing slightly.', 'Drying guidance', 3],
      ['Moisture analyser', 'related', 0.65, 0.65, 'A balance that heats a sample and measures the weight lost.', 'The direct way to know whether resin is dry enough.', 'Quality practice', 3],
      ['Nylon conditioning', 'related', 0.5, 0.45, 'Nylon absorbs water after moulding and grows slightly.', 'A different effect from wet resin: dimensions change over days as the part takes up water.', 'Resin datasheets', 1],
      ['Resin batch or supplier change', 'related', 0.5, 0.4, '', 'Often suspected together; check both before blaming either.', 'My inference', 6],
    ],
    links: [
      ['Hygroscopic resins', 'Nylon conditioning', 0.7, 'Nylon is hygroscopic both before and after moulding.', 'Resin datasheets', 1],
      ['Dryer problems', 'Moisture analyser', 0.75, 'The analyser shows whether the dryer is doing its job.', 'Quality practice', 3],
      ['Splay marks', 'Brittleness', 0.6, 'Both come from moisture in the barrel.', 'Defect guides', 3],
    ],
  },

  'Assembly fit failure': {
    liner: 'Snap fits miss, screw bosses misalign and mating parts no longer close.',
    reading: 'You expanded assembly failure, so I looked at which features fail first when a part warps, what else can cause the same failure, and how to tell them apart.',
    orbs: [
      ['Warped moulded part', 'cause', 0.85, 1, '', 'A bent part no longer lines up with the part it mates with.', 'Assembly guides', 3],
      ['Shrinkage off target', 'cause', 0.7, 0.65, 'The part is the right shape but the wrong size.', 'Not warp: the tool was cut for a different shrinkage than the part has.', 'Shrinkage handbooks', 2],
      ['Mating part warp', 'cause', 0.6, 0.6, 'The other part in the assembly is warped too, or instead.', 'Two parts warped the same way can still fit; opposite ways double the gap.', 'Assembly practice', 4],
      ['Snap fits failing', 'effect', 0.8, 0.75, 'Hooks miss their catches or break as they are forced in.', 'Snaps have small engagement, so they are often the first thing to fail.', 'Snap-fit handbooks', 2],
      ['Screw bosses misaligned', 'effect', 0.7, 0.6, 'Holes no longer line up with their mates.', 'Bosses far apart on a bowed part move out of line.', 'Assembly guides', 3],
      ['Visible gaps and flushness', 'effect', 0.8, 0.7, '', 'The same warp shows as gaps at the seam.', 'Assembly practice', 4],
      ['Flatness tolerances', 'related', 0.7, 0.65, '', 'Whether the part is in tolerance decides whose problem the fit failure is.', 'GD&T standard', 1],
      ['Checking fixtures', 'related', 0.6, 0.6, 'Gauges that hold a part as it sits in the assembly.', 'Measuring the part restrained, as assembled, shows whether warp really matters.', 'Quality practice', 3],
      ['Tolerance stack-up', 'related', 0.6, 0.5, 'Adding up the tolerances of every part in the chain.', 'Shows whether the assembly could fit even with every part in tolerance.', 'Tolerancing textbooks', 2],
    ],
    links: [
      ['Snap fits failing', 'Screw bosses misaligned', 0.6, 'Both are features that need two parts to line up.', 'Assembly guides', 3],
      ['Tolerance stack-up', 'Flatness tolerances', 0.7, 'Flatness is one of the tolerances in the stack.', 'Tolerancing textbooks', 2],
      ['Checking fixtures', 'Mating part warp', 0.55, 'Fixtures help find which part is out.', 'Quality practice', 3],
    ],
  },

  'Visible gaps and flushness': {
    liner: 'Split lines open up, and that is what customers notice first.',
    reading: 'You expanded visible gaps, so I looked at what sets the gap at a seam, what customers make of it, and the design tricks that hide it.',
    orbs: [
      ['Warped moulded part', 'cause', 0.8, 1, '', 'Even a small bow opens the seam between two housings.', 'Industrial design practice', 4],
      ['Shrinkage off target', 'cause', 0.6, 0.55, 'The part is the right shape but the wrong size.', 'A part that is uniformly too small gives an even gap rather than a varying one.', 'Shrinkage handbooks', 2],
      ['Fastener spacing', 'cause', 0.55, 0.5, 'How far apart screws or snaps hold the seam closed.', 'Between fasteners, a bowed wall springs open.', 'Assembly guides', 3],
      ['Perceived quality', 'effect', 0.8, 0.75, 'How well made the product looks and feels to a buyer.', 'Uneven gaps read as cheap long before anything fails.', 'Automotive perceived-quality practice', 4],
      ['Returns and complaints', 'effect', 0.5, 0.45, 'Customers returning products or rating them down.', 'Visible gaps are a common complaint even when the product works.', 'My inference', 6],
      ['Assembly fit failure', 'related', 0.8, 0.7, '', 'The functional side of the same problem.', 'Assembly practice', 4],
      ['Reveal or shadow line', 'related', 0.7, 0.7, 'A deliberate step or groove at the split line.', 'A designed gap hides small variation that a zero gap would show.', 'Industrial design practice', 4],
      ['Gap-and-flush specs', 'related', 0.6, 0.55, 'Measured targets for gap width and step at each seam.', 'Turns a look into a number you can inspect.', 'Automotive specifications', 4],
      ['Industrial design', 'related', 0.5, 0.4, '', 'Where seams go, and how they look, is a design decision.', 'Design practice', 4],
    ],
    links: [
      ['Reveal or shadow line', 'Perceived quality', 0.75, 'A reveal keeps the seam looking even.', 'Industrial design practice', 4],
      ['Fastener spacing', 'Warped moulded part', 0.6, 'Closer fasteners hold a bowed part closed.', 'Assembly guides', 3],
      ['Gap-and-flush specs', 'Perceived quality', 0.65, 'The specs exist because of perceived quality.', 'Automotive practice', 4],
    ],
  },

  'Seal and IP rating failure': {
    liner: 'A warped flange cannot compress a gasket evenly, so water and dust get in.',
    reading: 'You expanded seal failure, so I looked at what a gasket needs to seal, how warp breaks that, and what to change: the part, the gasket or the fastening.',
    orbs: [
      ['Warped moulded part', 'cause', 0.75, 1, '', 'A warped flange leaves low spots where the gasket isn’t squeezed.', 'Gasket design guides', 3],
      ['Gasket compression range', 'cause', 0.8, 0.8, 'How much the gasket must be squeezed to seal, often 15 to 30%.', 'If the flange varies by more than this range allows, some point won’t seal.', 'Gasket makers’ guides', 3],
      ['Flange stiffness', 'cause', 0.65, 0.65, 'How much the flange bends between screws.', 'A flexible flange bows open between fasteners under gasket load.', 'Design guides', 3],
      ['Screw spacing', 'cause', 0.6, 0.55, 'Distance between fasteners round the seal.', 'Longer spans let the flange lift more mid-span.', 'Design guides', 3],
      ['Water ingress', 'effect', 0.85, 0.8, 'Water gets inside the enclosure.', 'The failure itself: electronics fail, products are returned.', 'IP testing practice', 3],
      ['IP test failure', 'effect', 0.8, 0.7, 'The product fails its rated IP test, such as IPX7 immersion.', 'Leaks show up in testing, usually mid-span between screws.', 'IEC 60529', 1],
      ['Flatness tolerances', 'related', 0.7, 0.65, '', 'The flange’s flatness tolerance should come from the gasket’s range.', 'GD&T standard', 1],
      ['Liquid gasket or overmould', 'related', 0.5, 0.5, 'Sealants dispensed in place, or a soft seal moulded onto the part.', 'These follow a warped surface better than a cut gasket.', 'Sealing practice', 4],
    ],
    links: [
      ['Gasket compression range', 'Flatness tolerances', 0.75, 'The gasket range sets how flat the flange must be.', 'Gasket makers’ guides', 3],
      ['Flange stiffness', 'Screw spacing', 0.7, 'Stiffer flanges can span further between screws.', 'Design guides', 3],
      ['Water ingress', 'IP test failure', 0.8, 'The test is designed to find the ingress before customers do.', 'IEC 60529', 1],
    ],
  },

  'Scrap rate and cost': {
    liner: 'Every rejected shot costs material, machine time and delivery dates.',
    reading: 'You expanded scrap and cost, so I looked at what drives the scrap rate, what each scrapped part really costs, and how that cost justifies a fix.',
    orbs: [
      ['Warped moulded part', 'cause', 0.6, 1, '', 'Parts that fail flatness are scrapped.', 'My inference', 6],
      ['Process variation', 'cause', 0.65, 0.6, 'Shot-to-shot changes in temperature, pressure and material.', 'A process near the edge of its window scraps more as it drifts.', 'Scientific moulding practice', 2],
      ['Inspection criteria', 'cause', 0.5, 0.45, 'What counts as a reject, and how it’s measured.', 'Tighter or unclear criteria raise scrap without any change in parts.', 'Quality practice', 3],
      ['Machine time lost', 'effect', 0.7, 0.65, 'Press hours spent making parts that are thrown away.', 'Often the biggest share of scrap cost.', 'Costing practice', 3],
      ['Late deliveries', 'effect', 0.55, 0.5, 'Orders shipped late because good parts ran short.', 'High scrap eats into capacity and pushes dates.', 'My inference', 6],
      ['Regrind', 'related', 0.6, 0.55, 'Scrap ground up and fed back in with new material.', 'Recovers material cost, but the ratio needs to stay steady or it changes shrinkage.', 'Process guides', 3],
      ['Tool rework', 'related', 0.6, 0.5, '', 'High ongoing scrap is what justifies an expensive tool fix.', 'Toolmakers’ guidance', 4],
      ['Cost of quality', 'related', 0.5, 0.45, 'Adding up scrap, rework, inspection and returns.', 'Shows the full cost of the warp, beyond the scrap bin.', 'Quality management texts', 3],
    ],
    links: [
      ['Regrind', 'Process variation', 0.6, 'An unsteady regrind ratio is itself a source of variation.', 'Process guides', 3],
      ['Tool rework', 'Cost of quality', 0.65, 'The cost of quality is the case for paying for rework.', 'Quality management texts', 3],
      ['Machine time lost', 'Late deliveries', 0.6, 'Lost press time is lost capacity.', 'My inference', 6],
    ],
  },

  'Tool rework': {
    liner: 'Fixing warp in steel means recutting the mould. Slow and expensive, so usually the last resort.',
    reading: 'You expanded tool rework, so I looked at the kinds of changes made to a mould to fix warp, what they cost, and what should be tried first.',
    orbs: [
      ['Warped moulded part', 'cause', 0.5, 1, '', 'Rework is what you do when warp can’t be fixed at the press.', 'Toolmakers’ guidance', 4],
      ['Process fixes exhausted', 'cause', 0.65, 0.7, 'Mould temperatures, packing and cooling time have all been tried.', 'Steel changes come after the cheap settings have been ruled out.', 'Toolmakers’ guidance', 4],
      ['Warp compensation', 'effect', 0.8, 0.8, 'Recutting the cavity so the part warps into the right shape.', 'Also called pre-warping: the tool is cut deliberately bent the other way.', 'Mould design textbooks', 2],
      ['Added cooling', 'effect', 0.7, 0.7, 'New drillings, baffles or inserts where the tool runs hot.', 'Fixes the cause rather than compensating for it, where there’s room in the steel.', 'Mould design textbooks', 2],
      ['Gate change', 'effect', 0.6, 0.55, 'Moving or resizing the gate.', 'Changes the flow and packing pattern, and so the shrinkage.', 'Gating handbooks', 2],
      ['Lost production time', 'effect', 0.65, 0.5, 'Weeks the tool is out of the press.', 'Often the biggest cost of rework, more than the machining.', 'My inference', 6],
      ['Mould flow simulation', 'related', 0.7, 0.65, '', 'Simulation estimates the compensation before steel is cut, saving trial loops.', 'Simulation documentation', 4],
      ['Conformal cooling', 'related', 0.5, 0.45, '', 'A printed insert can replace a hard-to-cool area in one change.', 'Conformal cooling reviews', 2],
      ['Scrap rate and cost', 'related', 0.6, 0.45, '', 'Ongoing scrap is what pays for the rework.', 'Costing practice', 3],
    ],
    links: [
      ['Warp compensation', 'Mould flow simulation', 0.75, 'Simulation predicts how much to compensate.', 'Simulation documentation', 4],
      ['Added cooling', 'Conformal cooling', 0.7, 'Conformal inserts are a way of adding cooling.', 'Conformal cooling reviews', 2],
      ['Process fixes exhausted', 'Lost production time', 0.55, 'Process fixes cost no tool downtime, which is why they come first.', 'My inference', 6],
    ],
  },

  'Sink marks': {
    liner: 'A sibling defect with the same root: thick sections that shrink inward as they cool.',
    reading: 'You expanded sink marks, so I looked at the thick features and settings that cause them, what they share with warp, and how they’re fixed.',
    orbs: [
      ['Thick ribs and bosses', 'cause', 0.9, 0.85, '', 'The commonest place for sinks: opposite a rib or boss.', 'Part design textbooks', 2],
      ['Non-uniform wall thickness', 'cause', 0.85, 0.85, '', 'Any thick zone can sink as its core shrinks.', 'Part design textbooks', 2],
      ['Low packing pressure', 'cause', 0.8, 0.75, '', 'More packing fills out the shrinkage that would sink.', 'Troubleshooting guides', 3],
      ['Hot mould', 'cause', 0.55, 0.45, 'A warm mould surface keeps the skin soft for longer.', 'A soft skin is pulled in more easily.', 'Process guides', 3],
      ['Cosmetic rejects', 'effect', 0.7, 0.6, 'Parts rejected for how they look.', 'On show surfaces, sinks are rejected even when the part works.', 'Quality practice', 3],
      ['Voids', 'related', 0.7, 0.5, 'Bubbles inside thick sections where the core shrank away from the skin.', 'The same shrinkage, pulled inside when the skin is too stiff to sink.', 'Defect guides', 3],
      ['Warped moulded part', 'related', 0.75, 0.7, '', 'Seeing both on one part points at wall thickness.', 'Part design textbooks', 2],
      ['Gas-assist moulding', 'related', 0.45, 0.4, '', 'Gas packs thick sections from inside and removes sinks.', 'Gas-assist handbooks', 2],
      ['Textured surfaces', 'related', 0.4, 0.35, 'A grain or texture on the surface.', 'Texture hides shallow sinks that would show on a gloss surface.', 'Design practice', 4],
    ],
    links: [
      ['Thick ribs and bosses', 'Voids', 0.6, 'Thick features give either sinks or voids.', 'Defect guides', 3],
      ['Low packing pressure', 'Gas-assist moulding', 0.5, 'Gas does the packing where hold pressure can’t reach.', 'Gas-assist handbooks', 2],
      ['Cosmetic rejects', 'Textured surfaces', 0.6, 'Texture is often chosen to avoid cosmetic rejects.', 'Design practice', 4],
    ],
  },

  'Mould flow simulation': {
    liner: 'Software that predicts filling, cooling and warpage before any steel is cut.',
    reading: 'You expanded mould flow simulation, so I looked at what goes into an analysis, what it tells you about warp, and where it goes wrong.',
    orbs: [
      ['Material data', 'cause', 0.85, 0.85, 'Measured viscosity, pressure-volume-temperature and shrinkage data for the grade.', 'The prediction is only as good as the material card; generic data gives generic answers.', 'Simulation textbooks', 2],
      ['Mesh quality', 'cause', 0.65, 0.55, 'How finely and evenly the part is divided into elements.', 'Too coarse a mesh through the thickness misses the skin-core differences that drive warp.', 'Simulation textbooks', 2],
      ['Warpage breakdown', 'effect', 0.85, 0.85, 'Predicted warp split into cooling, shrinkage and orientation effects.', 'The most useful output: it says which cause to fix first.', 'Simulation documentation', 4],
      ['Gate location', 'effect', 0.75, 0.7, '', 'Simulation compares gate positions before the tool is made.', 'Simulation documentation', 4],
      ['Cooling channel layout', 'effect', 0.7, 0.65, '', 'A cool analysis shows hot spots in a channel layout.', 'Simulation documentation', 4],
      ['Design for manufacture', 'related', 0.6, 0.5, '', 'Early simulation is part of designing for moulding.', 'Design-for-manufacture guides', 3],
      ['Warp compensation', 'related', 0.6, 0.55, 'Recutting the cavity so the part warps into the right shape.', 'Simulation can estimate the compensation before steel is cut.', 'Simulation documentation', 4],
      ['Validation against real parts', 'related', 0.7, 0.7, 'Checking the prediction against moulded parts.', 'Direction is usually right; magnitude often isn’t, so check before trusting numbers.', 'Moulders’ experience', 5],
    ],
    links: [
      ['Material data', 'Warpage breakdown', 0.75, 'Shrinkage data drives the warp result.', 'Simulation textbooks', 2],
      ['Validation against real parts', 'Warpage breakdown', 0.65, 'Validation tells you how far to trust the breakdown.', 'Moulders’ experience', 5],
      ['Gate location', 'Cooling channel layout', 0.5, 'Both are tool decisions simulation can test together.', 'Simulation documentation', 4],
    ],
  },

  'Design for manufacture': {
    liner: 'Shaping a part from the start so it can be made reliably and cheaply.',
    reading: 'You expanded design for manufacture, so I looked at the moulding rules it brings, who needs to be involved and when, and what it prevents.',
    orbs: [
      ['Nominal wall guidelines', 'cause', 0.8, 0.8, '', 'Even walls are the first rule of designing for moulding.', 'Part design textbooks', 2],
      ['Rib design rules', 'cause', 0.75, 0.7, 'Ribs at 50 to 60% of the wall, 0.5 to 1° draft, a root radius, spacing at least twice the wall.', 'Stiffness from thin ribs instead of thick walls.', 'Resin suppliers’ guides', 3],
      ['Draft and radii', 'cause', 0.6, 0.5, 'Tapered walls and rounded corners.', 'Draft helps release; radii even out flow and cooling at corners.', 'Part design textbooks', 2],
      ['Early toolmaker review', 'cause', 0.65, 0.65, 'Asking the toolmaker about gates, cooling and ejection while the design can still change.', 'Many warp causes are cheap to fix in CAD and expensive in steel.', 'Design practice', 4],
      ['Non-uniform wall thickness', 'effect', 0.75, 0.7, '', 'What the rules exist to prevent.', 'Design-for-manufacture guides', 3],
      ['Lower part cost', 'effect', 0.6, 0.45, 'Less material, shorter cycles and less scrap.', 'The original point of design for manufacture.', 'DFMA textbooks', 2],
      ['Industrial design', 'related', 0.65, 0.55, '', 'Design for manufacture works best when it sits beside styling from the start.', 'Product design textbooks', 2],
      ['Mould flow simulation', 'related', 0.6, 0.5, '', 'A quick simulation of the first CAD model catches problems early.', 'Simulation documentation', 4],
    ],
    links: [
      ['Nominal wall guidelines', 'Rib design rules', 0.8, 'Rib sizes are set from the nominal wall.', 'Part design textbooks', 2],
      ['Early toolmaker review', 'Mould flow simulation', 0.6, 'Both are ways of testing the design before steel.', 'Design practice', 4],
      ['Industrial design', 'Draft and radii', 0.5, 'Radii and draft also change how a product looks.', 'Design practice', 4],
    ],
  },

  'Annealing': {
    liner: 'Reheating parts to relax moulded-in stress. A fix after the fact, not a cure.',
    reading: 'You expanded annealing, so I looked at what it does inside the plastic, when it helps with warp, when it makes things worse, and what it costs.',
    orbs: [
      ['Moulded-in residual stress', 'cause', 0.85, 0.85, 'Stress locked into the part when shrinkage is held back, released later by heat or chemicals.', 'Annealing exists to relax this stress.', 'Polymer science textbooks', 2],
      ['Delayed warp', 'cause', 0.6, 0.65, 'Warp that appears days later, or when the part is heated in use.', 'Annealing brings the warp forward to the factory, where it can be controlled.', 'Post-moulding process guides', 3],
      ['Dimensional stability', 'effect', 0.75, 0.7, 'Dimensions that stay put over time and temperature.', 'After annealing, parts move less in service.', 'Resin suppliers’ guidance', 3],
      ['Warp on release', 'effect', 0.6, 0.6, 'Parts that warp as the stress is released during annealing.', 'Annealing unsupported parts can make warp worse, so parts are often fixtured.', 'Post-moulding process guides', 3],
      ['Crystallinity', 'related', 0.7, 0.55, '', 'In semi-crystalline resins annealing also raises crystallinity, adding a little shrinkage.', 'Polymer science textbooks', 2],
      ['Cooling fixtures', 'related', 0.55, 0.5, 'Jigs that hold parts flat while they finish cooling.', 'The same fixtures hold parts during annealing.', 'Moulders’ practice', 4],
      ['Added cost per part', 'related', 0.5, 0.45, 'Oven time, handling and floor space.', 'An extra step on every part, forever, which is why fixing the cause is better.', 'My inference', 6],
    ],
    links: [
      ['Moulded-in residual stress', 'Warp on release', 0.75, 'The stress becomes warp if the part isn’t held.', 'Post-moulding process guides', 3],
      ['Cooling fixtures', 'Warp on release', 0.65, 'Fixtures stop the release turning into warp.', 'Moulders’ practice', 4],
      ['Delayed warp', 'Dimensional stability', 0.6, 'Stability in service is the aim.', 'Resin suppliers’ guidance', 3],
    ],
  },

  'Flatness tolerances': {
    liner: 'How much warp is acceptable is a drawing decision, set with a GD&T flatness callout.',
    reading: 'You expanded flatness tolerances, so I looked at how flatness is defined and measured, where the number should come from, and what moulding can realistically hold.',
    orbs: [
      ['Functional requirement', 'cause', 0.75, 0.75, 'What the part actually needs: a seal, a fit, a look.', 'The tolerance should come from function, not habit.', 'Tolerancing textbooks', 2],
      ['Moulding capability', 'cause', 0.7, 0.7, 'How flat a moulded part of this size and resin can typically be held.', 'A tolerance tighter than the process can hold guarantees scrap.', 'ISO 20457', 1],
      ['Measurement method', 'related', 0.75, 0.7, 'Free state or restrained, on a surface plate, CMM or scanner.', 'The same part can pass restrained and fail free; the drawing should say which.', 'ASME Y14.5', 1],
      ['Free-state variation', 'related', 0.6, 0.55, 'GD&T notation for a part that deflects when unrestrained.', 'Lets the drawing accept warp that disappears in assembly.', 'ASME Y14.5', 1],
      ['Assembly fit failure', 'effect', 0.7, 0.6, '', 'Where flatness is out, fits fail.', 'Assembly guides', 3],
      ['Seal and IP rating failure', 'effect', 0.65, 0.55, '', 'Flange flatness decides whether a gasket seals.', 'Gasket guides', 3],
      ['Warped moulded part', 'related', 0.6, 0.9, '', 'Whether a part counts as warped depends on this tolerance.', 'GD&T standard', 1],
      ['Tolerance stack-up', 'related', 0.6, 0.5, 'Adding up the tolerances of every part in the chain.', 'Flatness is one of the tolerances in the stack.', 'Tolerancing textbooks', 2],
    ],
    links: [
      ['Measurement method', 'Free-state variation', 0.8, 'Free-state notation says how to measure.', 'ASME Y14.5', 1],
      ['Functional requirement', 'Moulding capability', 0.7, 'The tolerance has to sit between what’s needed and what’s possible.', 'Tolerancing textbooks', 2],
      ['Seal and IP rating failure', 'Functional requirement', 0.6, 'A seal is a common functional reason for tight flatness.', 'Gasket guides', 3],
    ],
  },

  'Industrial design': {
    liner: 'The discipline of shaping mass-produced products for use, manufacture and appearance.',
    reading: 'You expanded industrial design, a distant link to warp. I looked for the design decisions that end up affecting moulding, then for how design and engineering work together.',
    orbs: [
      ['Styling-led surfaces', 'effect', 0.75, 0.8, '', 'Form drawn before engineering often leaves thick and thin zones.', 'Design practice', 4],
      ['Split line placement', 'effect', 0.6, 0.55, 'Where the two halves of the mould, or of the product, meet.', 'Split lines set gaps, gate access and which surfaces show.', 'Design practice', 4],
      ['Surface finish choice', 'effect', 0.5, 0.45, 'Gloss, texture or matt.', 'Gloss shows every sink and ripple; texture hides them.', 'Design practice', 4],
      ['Design for manufacture', 'related', 0.75, 0.7, '', 'Industrial design and DFM work best side by side.', 'Product design textbooks', 2],
      ['User needs', 'cause', 0.7, 0.5, 'What people need the product to do and feel like.', 'The starting point of industrial design.', 'Product design textbooks', 2],
      ['Brand language', 'cause', 0.55, 0.4, 'The shapes, lines and finishes that make a range recognisable.', 'Brand features like crisp edges can be hard to mould evenly.', 'Design practice', 4],
      ['Visible gaps and flushness', 'related', 0.55, 0.5, '', 'Seams are where design and moulding meet most visibly.', 'Design practice', 4],
      ['Warped moulded part', 'effect', 0.2, 0.25, '', 'Only a distant link: styling can leave a shape that’s hard to mould flat.', 'My inference', 6],
    ],
    links: [
      ['Styling-led surfaces', 'Brand language', 0.6, 'Brand features often drive the styled surfaces.', 'Design practice', 4],
      ['Split line placement', 'Visible gaps and flushness', 0.7, 'Gaps appear at the split lines.', 'Design practice', 4],
      ['Surface finish choice', 'Styling-led surfaces', 0.5, 'Finish and form are chosen together.', 'Design practice', 4],
    ],
  },

  'Cooling channel layout': {
    liner: 'Channels too far from the surface, or unevenly spaced, leave hot spots in the steel.',
    reading: 'You expanded the cooling channel layout, so I looked at the rules for placing channels, what limits them, how a bad layout shows up, and the alternatives when drilling can’t reach.',
    orbs: [
      ['Channel depth and pitch', 'cause', 0.9, 0.9, 'Distance from the surface (1 to 2 diameters) and between channels (2 to 3 diameters).', 'Too deep or too far apart, and the surface between channels runs hot.', 'Mould design textbooks', 2],
      ['Ejectors and inserts in the way', 'cause', 0.65, 0.6, 'Pins, slides and inserts take the space channels need.', 'Channels get routed around them, leaving gaps in the cooling.', 'Mould design textbooks', 2],
      ['Uncooled cores', 'cause', 0.75, 0.75, 'Tall cores with no baffle or bubbler of their own.', 'A core surrounded by plastic heats up fast if nothing cools its inside.', 'Mould design guides', 3],
      ['Uneven cooling', 'effect', 0.9, 0.85, '', 'Hot spots in the steel become hot spots in the part.', 'Mould design textbooks', 2],
      ['Longer cycle time', 'effect', 0.6, 0.45, '', 'The hottest spot sets the cooling time for the whole part.', 'Heat-transfer physics', 2],
      ['Conformal cooling', 'related', 0.85, 0.7, '', 'Printed channels follow the surface where drilled ones can’t.', 'Conformal cooling reviews', 2],
      ['Baffles and bubblers', 'related', 0.7, 0.65, 'Inserts that send water up into a core and back.', 'The standard way to cool cores with drilled channels.', 'Mould design guides', 3],
      ['Thermal imaging of the mould', 'related', 0.6, 0.6, '', 'Shows the layout’s hot spots directly.', 'Moulders’ practice', 4],
      ['Mould flow simulation', 'related', 0.65, 0.5, '', 'A cooling analysis tests the layout before machining.', 'Simulation documentation', 4],
    ],
    links: [
      ['Uncooled cores', 'Baffles and bubblers', 0.85, 'Baffles and bubblers are the fix for uncooled cores.', 'Mould design guides', 3],
      ['Ejectors and inserts in the way', 'Conformal cooling', 0.6, 'Printed channels can weave between obstacles.', 'Conformal cooling reviews', 2],
      ['Channel depth and pitch', 'Thermal imaging of the mould', 0.55, 'The thermal image shows stripes where pitch is too wide.', 'Moulders’ practice', 4],
    ],
  },

  'Core and cavity at different temperatures': {
    liner: 'If one mould half runs hotter, the part shrinks more on that side and bows toward it.',
    reading: 'You expanded the mould-half temperature difference, so I looked at why one half runs hotter, how big a difference matters, and how to measure and use it.',
    orbs: [
      ['Core heat load', 'cause', 0.85, 0.85, 'The core is wrapped in hot plastic and has less room for cooling.', 'Cores naturally run hotter than cavities unless cooled well.', 'Mould design textbooks', 2],
      ['Shared cooling circuit', 'cause', 0.7, 0.7, 'Both halves fed from one controller, often in series.', 'Water that cools one half first is warmer when it reaches the other.', 'Mould design guides', 3],
      ['Low coolant flow', 'cause', 0.6, 0.55, '', 'Low flow on one half’s circuit lets it run warm.', 'Heat-transfer physics', 2],
      ['Warped moulded part', 'effect', 0.9, 1, '', 'The part bows towards the hotter half.', 'Mould design textbooks', 2],
      ['Bow towards the hot side', 'effect', 0.75, 0.7, 'The warp has a consistent direction: concave on the hotter face.', 'The direction is the clue that points back to this cause.', 'Process guides', 3],
      ['Thermal imaging of the mould', 'related', 0.75, 0.75, '', 'Images both halves at once after the mould opens.', 'Moulders’ practice', 4],
      ['Deliberate temperature offset', 'related', 0.6, 0.6, 'Running one half warmer on purpose to cancel a known warp.', 'A cheap process fix when the geometry bows one way.', 'Process technicians’ practice', 5],
      ['Inside corners', 'related', 0.55, 0.45, '', 'Inside corners are usually on the core, adding to its heat load.', 'Mould design textbooks', 2],
    ],
    links: [
      ['Core heat load', 'Inside corners', 0.7, 'Corners trap heat on the core side.', 'Mould design textbooks', 2],
      ['Shared cooling circuit', 'Low coolant flow', 0.6, 'Shared circuits often run at low flow too.', 'Mould design guides', 3],
      ['Bow towards the hot side', 'Deliberate temperature offset', 0.7, 'Knowing which way it bows tells you which way to offset.', 'Process technicians’ practice', 5],
    ],
  },

  'Low coolant flow': {
    liner: 'Blocked or undersized water lines carry heat away too slowly, often unnoticed until parts change.',
    reading: 'You expanded low coolant flow, so I looked at why flow drops, why it matters so much (turbulence), and how to measure it on the press.',
    orbs: [
      ['Scale and blockage', 'cause', 0.8, 0.8, 'Mineral build-up and corrosion narrow channels over months.', 'Explains warp that crept in slowly on a tool that used to run well.', 'Maintenance guides', 4],
      ['Circuits in series', 'cause', 0.65, 0.6, 'Several channels connected one after another.', 'Long series circuits drop pressure and flow, and warm the water along the way.', 'Mould design guides', 3],
      ['Undersized pump or hoses', 'cause', 0.6, 0.55, 'The temperature controller can’t push enough water through.', 'The setting looks right but the flow isn’t there.', 'Controller makers’ guides', 4],
      ['Laminar flow', 'effect', 0.85, 0.75, 'Slow, smooth flow that carries heat poorly.', 'Below a Reynolds number of about 4,000, heat removal drops sharply.', 'Heat-transfer textbooks', 2],
      ['Uneven cooling', 'effect', 0.8, 0.8, '', 'The starved circuit’s area runs hotter.', 'Mould design textbooks', 2],
      ['Longer cycle time', 'effect', 0.5, 0.4, '', 'Less heat removed means longer cooling.', 'Heat-transfer physics', 2],
      ['Flow meters per circuit', 'related', 0.7, 0.7, 'Gauges on each water line showing litres per minute.', 'The direct check; chiller settings don’t tell you flow.', 'Process guides', 3],
      ['Water temperature rise', 'related', 0.6, 0.6, 'The difference between water in and out of a circuit.', 'Under about 3 °C is good; a big rise means too little flow.', 'Process guides', 3],
      ['Heat transfer', 'related', 0.45, 0.3, '', 'The physics of why turbulence matters.', 'Heat-transfer textbooks', 2],
    ],
    links: [
      ['Scale and blockage', 'Laminar flow', 0.7, 'Narrowed channels slow the flow into the laminar range.', 'Heat-transfer textbooks', 2],
      ['Flow meters per circuit', 'Water temperature rise', 0.65, 'Two ways to see the same problem.', 'Process guides', 3],
      ['Laminar flow', 'Heat transfer', 0.6, 'Turbulence is the heat-transfer reason flow matters.', 'Heat-transfer textbooks', 2],
    ],
  },

  'Inside corners': {
    liner: 'Heat gets trapped in the inner corner of a box shape, so the walls pull inward.',
    reading: 'You expanded inside corners, so I looked at why corners trap heat, what that does to box-shaped parts, and the fixes in the part and in the tool.',
    orbs: [
      ['Steel on three sides', 'cause', 0.85, 0.85, 'The core’s corner is surrounded by plastic, with little room for cooling.', 'Heat from two walls flows into one small piece of steel.', 'Heat-transfer physics', 2],
      ['Sharp internal radius', 'cause', 0.6, 0.55, 'A tight inside corner with a generous outside one makes a thick spot.', 'A sharp inside corner adds mass right where cooling is worst.', 'Part design textbooks', 2],
      ['Walls leaning inward', 'effect', 0.9, 0.85, 'Box sides pulled in at the top.', 'The classic sign: the hot corner shrinks more and draws the walls together.', 'Part design textbooks', 2],
      ['Warped moulded part', 'effect', 0.7, 1, '', 'Inward-leaning walls are a form of warp.', 'Part design textbooks', 2],
      ['Core heat load', 'related', 0.7, 0.65, 'The core is wrapped in hot plastic and has less room for cooling.', 'Corners are the hottest part of the core.', 'Mould design textbooks', 2],
      ['Baffles and bubblers', 'related', 0.6, 0.55, 'Inserts that send water up into a core and back.', 'Bring cooling into the core near the corner.', 'Mould design guides', 3],
      ['Copper alloy inserts', 'related', 0.6, 0.55, 'Highly conductive inserts placed at hot spots.', 'Pull heat out of the corner faster than tool steel can.', 'Toolmakers’ literature', 4],
      ['Conformal cooling', 'related', 0.65, 0.55, '', 'Printed channels can follow round the corner.', 'Conformal cooling reviews', 2],
      ['Uniform corner thickness', 'related', 0.55, 0.5, 'Inside radius about half the wall, outside radius the inside plus one wall.', 'Keeps the corner the same thickness as the walls.', 'Part design textbooks', 2],
    ],
    links: [
      ['Sharp internal radius', 'Uniform corner thickness', 0.75, 'The right radii remove the thick spot.', 'Part design textbooks', 2],
      ['Copper alloy inserts', 'Conformal cooling', 0.5, 'Two tool fixes for the same hot spot.', 'Toolmakers’ literature', 4],
      ['Steel on three sides', 'Core heat load', 0.75, 'The corner is where the core’s heat load peaks.', 'Heat-transfer physics', 2],
    ],
  },

  'Longer cycle time': {
    liner: 'Slower cooling means each shot takes longer, raising the cost of every part.',
    reading: 'You expanded cycle time, an effect of slow cooling. I looked at what sets the cooling time, what a second of cycle is worth, and the trade-off with warp.',
    orbs: [
      ['Thickest section', 'cause', 0.85, 0.85, 'The thickest wall in the part sets the cooling time.', 'The part can’t be ejected until its thickest section is stiff.', 'Heat-transfer physics', 2],
      ['Uneven cooling', 'cause', 0.7, 0.7, '', 'The hottest spot in the mould holds up the whole cycle.', 'Mould design textbooks', 2],
      ['Low coolant flow', 'cause', 0.55, 0.5, '', 'Poor flow slows heat removal everywhere.', 'Heat-transfer physics', 2],
      ['Cost per part', 'effect', 0.85, 0.8, 'Machine time is the biggest share of a moulded part’s cost.', 'Every second on the cycle adds to every part.', 'Costing practice', 3],
      ['Press capacity', 'effect', 0.6, 0.5, 'How many parts the machine can make in a shift.', 'Longer cycles mean fewer parts or more presses.', 'Costing practice', 3],
      ['Ejecting too early', 'related', 0.7, 0.65, '', 'Cutting cooling time to save cycle is what causes early ejection.', 'Shop-floor experience', 5],
      ['Conformal cooling', 'related', 0.6, 0.55, '', 'Often justified by cycle time savings of 10 to 40%.', 'Conformal cooling reviews', 2],
      ['Cooling time estimate', 'related', 0.6, 0.6, 'A formula from wall thickness and the resin’s thermal diffusivity.', 'Gives a target to compare the real cycle against.', 'Heat-transfer textbooks', 2],
    ],
    links: [
      ['Thickest section', 'Cooling time estimate', 0.8, 'The estimate uses the thickest wall.', 'Heat-transfer textbooks', 2],
      ['Cost per part', 'Press capacity', 0.6, 'Both follow from seconds per shot.', 'Costing practice', 3],
      ['Ejecting too early', 'Cost per part', 0.55, 'Cost pressure drives the shortcut.', 'Shop-floor experience', 5],
    ],
  },

  'Thermal imaging of the mould': {
    liner: 'A thermal camera pointed at the open tool shows hot spots directly.',
    reading: 'You expanded thermal imaging, a way of checking for uneven cooling. I looked at what it can find, how to take a reading you can trust, and what to do with the result.',
    orbs: [
      ['Hot spots in the steel', 'effect', 0.85, 0.85, 'Areas of the mould surface that run hotter than the rest.', 'The main thing a thermal image shows.', 'Moulders’ practice', 4],
      ['Core and cavity at different temperatures', 'effect', 0.75, 0.75, '', 'Both halves in one picture make an offset obvious.', 'Moulders’ practice', 4],
      ['Dead cooling circuit', 'effect', 0.65, 0.6, 'A circuit with no flow, from a blocked line or swapped hose.', 'Shows as a stripe or region much hotter than the rest.', 'Moulders’ practice', 4],
      ['Emissivity of steel', 'cause', 0.6, 0.55, 'Polished steel reflects heat and reads cooler than it is.', 'Without a matt reference spot, readings on shiny steel are wrong.', 'Thermography guides', 3],
      ['Imaging the part', 'related', 0.6, 0.6, 'Thermal image of the part just after ejection.', 'Hot zones on the part match hot zones in the tool, without stopping the press.', 'Moulders’ practice', 4],
      ['Uneven cooling', 'related', 0.8, 0.7, '', 'What the camera is used to confirm.', 'Mould design textbooks', 2],
      ['Mould temperature sensors', 'related', 0.5, 0.45, 'Thermocouples fitted in the steel.', 'Give continuous readings at a few points, where the camera gives a snapshot of all of it.', 'Mould instrumentation guides', 3],
    ],
    links: [
      ['Hot spots in the steel', 'Dead cooling circuit', 0.65, 'A dead circuit is one cause of a hot spot.', 'Moulders’ practice', 4],
      ['Emissivity of steel', 'Hot spots in the steel', 0.5, 'Reflections can fake or hide a hot spot.', 'Thermography guides', 3],
      ['Imaging the part', 'Hot spots in the steel', 0.6, 'The part shows the same pattern.', 'Moulders’ practice', 4],
    ],
  },

  'Conformal cooling': {
    liner: '3D-printed mould inserts whose water channels follow the part surface.',
    reading: 'You expanded conformal cooling, a fix for uneven cooling. I looked at how it’s made, where it helps most, what it costs, and its own problems.',
    orbs: [
      ['Metal 3D printing', 'cause', 0.85, 0.8, 'Laser powder bed fusion builds the insert layer by layer, channels included.', 'Printing is what makes curved channels possible.', 'Conformal cooling reviews', 2],
      ['Hard-to-cool geometry', 'cause', 0.75, 0.75, 'Tall cores, deep ribs and corners that drilling can’t reach.', 'These are where conformal cooling earns its cost.', 'Conformal cooling reviews', 2],
      ['Even cooling', 'effect', 0.85, 0.85, 'Steel temperature far more even across the surface.', 'Channels at constant distance remove heat evenly.', 'Conformal cooling reviews', 2],
      ['Cycle time savings', 'effect', 0.75, 0.7, 'Reported savings often 10 to 40%.', 'Faster, more even cooling shortens the cooling phase.', 'Case studies', 4],
      ['Less warp', 'effect', 0.7, 0.75, 'Parts that come out flatter.', 'Even cooling removes one of the main causes of warp.', 'Conformal cooling reviews', 2],
      ['Insert cost', 'related', 0.6, 0.55, 'Printed inserts cost more than machined ones.', 'Justified by cycle and scrap savings on higher volumes.', 'Case studies', 4],
      ['Channel fouling', 'related', 0.55, 0.5, 'Narrow, rough printed channels scale and block more easily.', 'Needs filtered, treated water and regular flushing.', 'Maintenance guides', 4],
      ['Copper alloy inserts', 'related', 0.5, 0.45, 'Highly conductive inserts placed at hot spots.', 'A cheaper alternative for some hot spots.', 'Toolmakers’ literature', 4],
      ['Cooling channel layout', 'related', 0.8, 0.6, '', 'The drilled layout conformal cooling replaces.', 'Mould design textbooks', 2],
    ],
    links: [
      ['Even cooling', 'Less warp', 0.85, 'Even cooling is why warp drops.', 'Conformal cooling reviews', 2],
      ['Insert cost', 'Cycle time savings', 0.7, 'The savings pay for the insert.', 'Case studies', 4],
      ['Metal 3D printing', 'Channel fouling', 0.55, 'Printed channels are rougher inside.', 'Maintenance guides', 4],
    ],
  },

  'Heat transfer': {
    liner: 'The physics of how heat moves through steel, plastic and water.',
    reading: 'You expanded heat transfer, so I looked at the three ways heat moves in a mould and which one limits cooling.',
    orbs: [
      ['Conduction through the plastic', 'related', 0.9, 0.9, 'Heat moving through the part’s own wall to the steel.', 'Plastic conducts about a hundred times worse than steel, so this step usually limits cooling.', 'Heat-transfer textbooks', 2],
      ['Conduction through the steel', 'related', 0.75, 0.65, 'Heat moving through the mould to the channels.', 'Distance and steel type matter here; copper inserts speed it up.', 'Heat-transfer textbooks', 2],
      ['Convection into the water', 'related', 0.75, 0.65, 'Heat carried away by the coolant.', 'Turbulent flow makes this step several times faster.', 'Heat-transfer textbooks', 2],
      ['Thermal diffusivity', 'related', 0.7, 0.6, 'How fast a material evens out its temperature.', 'Sets cooling time together with thickness squared.', 'Heat-transfer textbooks', 2],
      ['Non-uniform wall thickness', 'effect', 0.7, 0.75, '', 'Because cooling time goes with thickness squared, uneven walls cool unevenly.', 'Heat-transfer physics', 2],
      ['Uneven cooling', 'effect', 0.65, 0.7, '', 'Any uneven step in the heat path gives uneven cooling.', 'Mould design textbooks', 2],
      ['Low coolant flow', 'related', 0.5, 0.45, '', 'Low flow weakens the convection step.', 'Heat-transfer textbooks', 2],
      ['Copper alloy inserts', 'related', 0.5, 0.4, 'Highly conductive inserts placed at hot spots.', 'Speed up conduction through the steel where it matters.', 'Toolmakers’ literature', 4],
    ],
    links: [
      ['Conduction through the plastic', 'Thermal diffusivity', 0.8, 'Diffusivity is the plastic’s property that sets this step.', 'Heat-transfer textbooks', 2],
      ['Convection into the water', 'Low coolant flow', 0.75, 'Flow sets the convection rate.', 'Heat-transfer textbooks', 2],
      ['Conduction through the steel', 'Copper alloy inserts', 0.7, 'Copper conducts several times better than steel.', 'Heat-transfer textbooks', 2],
    ],
  },

  'Styling-led surfaces': {
    liner: 'Form decisions made before engineering review often leave thick and thin zones.',
    reading: 'You expanded styling-led surfaces, so I looked at which styling choices create uneven walls, how that reaches the part, and how studios avoid it.',
    orbs: [
      ['Crowned or domed tops', 'cause', 0.7, 0.7, 'A curved outer surface over a flat inside.', 'Thickest at the crown, thin at the edges.', 'Design practice', 4],
      ['Sharp feature lines', 'cause', 0.6, 0.55, 'Crisp creases and edges on the outer surface.', 'A crisp outside edge over a rounded inside adds mass at the line.', 'Design practice', 4],
      ['Late styling changes', 'cause', 0.6, 0.6, 'Form changed after the moulding review.', 'Changes after review skip the checks that would catch thick zones.', 'Design practice', 4],
      ['Non-uniform wall thickness', 'effect', 0.85, 0.85, '', 'The direct result of an inside that doesn’t follow the outside.', 'Part design textbooks', 2],
      ['Sink marks', 'effect', 0.6, 0.5, '', 'Thick zones under show surfaces sink, where they’re most visible.', 'Part design textbooks', 2],
      ['Shelling the inside', 'related', 0.75, 0.75, 'Offsetting the inner surface from the outer at constant thickness.', 'The standard fix: walls follow the styled form.', 'CAD practice', 4],
      ['Industrial design', 'related', 0.8, 0.6, '', 'Where the styling comes from.', 'Design practice', 4],
      ['Design for manufacture', 'related', 0.6, 0.5, '', 'Reviewing styling against moulding rules early.', 'Design-for-manufacture guides', 3],
    ],
    links: [
      ['Crowned or domed tops', 'Shelling the inside', 0.8, 'Shelling turns a solid dome into an even wall.', 'CAD practice', 4],
      ['Late styling changes', 'Design for manufacture', 0.6, 'DFM review catches problems only if changes come back to it.', 'Design practice', 4],
      ['Sharp feature lines', 'Sink marks', 0.5, 'Mass at a feature line can sink beside it.', 'Design practice', 4],
    ],
  },

  'Screw bosses': {
    liner: 'Solid posts for fasteners. Easy to make too thick where they meet the wall.',
    reading: 'You expanded screw bosses, so I looked at how bosses end up too thick, what that does, and how bosses are meant to be designed.',
    orbs: [
      ['Solid boss', 'cause', 0.8, 0.8, 'A post with no cored hole, or a hole drilled later.', 'All that mass cools last and shrinks most.', 'Part design textbooks', 2],
      ['Boss joined to the wall', 'cause', 0.7, 0.7, 'A boss merged into a side wall instead of standing free.', 'Where boss and wall merge, the section is thick.', 'Part design textbooks', 2],
      ['Thread-forming screws', 'cause', 0.5, 0.45, 'Screws that cut or form their own thread in plastic.', 'They need a boss strong enough to hold, which pushes designers to thicken it.', 'Fastener makers’ guides', 3],
      ['Sink marks', 'effect', 0.85, 0.75, '', 'Sinks opposite bosses are the classic sign.', 'Part design textbooks', 2],
      ['Screw bosses misaligned', 'effect', 0.55, 0.5, 'Holes no longer line up with their mates.', 'Warp moves bosses out of line in assembly.', 'Assembly guides', 3],
      ['Boss cracking', 'effect', 0.5, 0.4, 'Bosses that split as screws are driven.', 'Thin, stressed or weld-lined bosses crack; it’s the opposite failure to too thick.', 'Fastener makers’ guides', 3],
      ['Gussets', 'related', 0.65, 0.6, 'Small triangular ribs that support a boss.', 'Strength without mass.', 'Part design textbooks', 2],
      ['Thick ribs and bosses', 'related', 0.75, 0.65, '', 'The broader family of thick features.', 'Part design textbooks', 2],
      ['Heat-set inserts', 'related', 0.45, 0.4, 'Brass threads pressed in with heat after moulding.', 'An alternative that needs less boss.', 'Fastener makers’ guides', 3],
    ],
    links: [
      ['Solid boss', 'Gussets', 0.6, 'Gussets replace the strength that solid mass gave.', 'Part design textbooks', 2],
      ['Thread-forming screws', 'Boss cracking', 0.65, 'Thread-forming screws put hoop stress on the boss.', 'Fastener makers’ guides', 3],
      ['Heat-set inserts', 'Thread-forming screws', 0.5, 'Two ways to put a thread in plastic.', 'Fastener makers’ guides', 3],
    ],
  },

  'Missing coring': {
    liner: 'Solid thick areas that could have been hollowed out and supported with ribs.',
    reading: 'You expanded missing coring, so I looked at where solid sections end up in parts, what they cost, and how to core them out.',
    orbs: [
      ['Solid handles and grips', 'cause', 0.65, 0.6, 'Parts held in the hand, drawn as solid shapes.', 'A common place for solid sections that feel right but mould badly.', 'Design practice', 4],
      ['Design from a solid model', 'cause', 0.6, 0.6, 'CAD started as a block and never shelled.', 'The model looks finished from outside while the inside is solid.', 'CAD practice', 4],
      ['Non-uniform wall thickness', 'effect', 0.85, 0.85, '', 'Solid areas are the extreme case of thick walls.', 'Part design textbooks', 2],
      ['Voids', 'effect', 0.65, 0.5, 'Bubbles inside thick sections where the core shrank away from the skin.', 'Thick solid sections often hide voids.', 'Defect guides', 3],
      ['Longer cycle time', 'effect', 0.65, 0.5, '', 'The solid section sets the cooling time.', 'Heat-transfer physics', 2],
      ['Rib design rules', 'related', 0.7, 0.65, 'Ribs at 50 to 60% of the wall, 0.5 to 1° draft, a root radius, spacing at least twice the wall.', 'Coring replaces mass with ribs designed to these rules.', 'Part design textbooks', 2],
      ['Gas-assist moulding', 'related', 0.6, 0.55, '', 'Hollows sections that can’t be cored by design.', 'Gas-assist handbooks', 2],
      ['Material saving', 'related', 0.5, 0.4, 'Less plastic per part.', 'Coring often saves 20 to 40% of material in thick areas.', 'Design practice', 4],
    ],
    links: [
      ['Design from a solid model', 'Solid handles and grips', 0.55, 'Handles are often modelled as solids.', 'CAD practice', 4],
      ['Rib design rules', 'Material saving', 0.5, 'Ribs keep the strength with less material.', 'Part design textbooks', 2],
      ['Voids', 'Gas-assist moulding', 0.55, 'Gas removes voids by hollowing deliberately.', 'Gas-assist handbooks', 2],
    ],
  },

  'Nominal wall guidelines': {
    liner: 'Typical walls run 1 to 3 mm and vary by no more than about 25% across a part.',
    reading: 'You expanded nominal wall guidelines, so I looked at how the nominal wall is chosen, what it controls, and how features are sized from it.',
    orbs: [
      ['Resin flow length', 'cause', 0.7, 0.65, 'How far a resin can flow for a given wall before it freezes.', 'Thin walls need easy-flowing resins or more gates.', 'Resin datasheets', 3],
      ['Part size and load', 'cause', 0.65, 0.6, 'Bigger and more loaded parts need thicker walls.', 'Stiffness needs set a minimum wall.', 'Part design textbooks', 2],
      ['Even shrinkage', 'effect', 0.85, 0.85, 'Regions shrinking by the same amount.', 'An even wall is the simplest route to even cooling and shrinkage.', 'Part design textbooks', 2],
      ['Shorter cycle time', 'effect', 0.6, 0.5, 'Thinner walls cool faster.', 'Cooling time goes with thickness squared.', 'Heat-transfer physics', 2],
      ['Rib design rules', 'related', 0.75, 0.65, 'Ribs at 50 to 60% of the wall, 0.5 to 1° draft, a root radius, spacing at least twice the wall.', 'Ribs are sized from the nominal wall.', 'Part design textbooks', 2],
      ['Gradual transitions', 'related', 0.7, 0.65, 'Changes in thickness tapered over about three times the step.', 'A sudden step makes a hot spot at the thick side.', 'Part design textbooks', 2],
      ['Non-uniform wall thickness', 'related', 0.8, 0.75, '', 'What the guidelines prevent.', 'Part design textbooks', 2],
      ['Design for manufacture', 'related', 0.65, 0.5, '', 'The nominal wall is the first DFM decision.', 'Design-for-manufacture guides', 3],
    ],
    links: [
      ['Resin flow length', 'Part size and load', 0.5, 'The wall has to satisfy both.', 'Part design textbooks', 2],
      ['Gradual transitions', 'Even shrinkage', 0.65, 'Gentle transitions keep shrinkage even.', 'Part design textbooks', 2],
      ['Rib design rules', 'Gradual transitions', 0.5, 'Both are rules for where thickness changes.', 'Part design textbooks', 2],
    ],
  },

  'Gas-assist moulding': {
    liner: 'Injecting gas to hollow out thick sections that cannot be redesigned.',
    reading: 'You expanded gas-assist moulding, so I looked at how it works, where it fits, and what it brings with it.',
    orbs: [
      ['Thick sections that must stay', 'cause', 0.8, 0.8, 'Handles, frames and thick ribs that can’t be cored.', 'The reason to choose gas-assist.', 'Gas-assist handbooks', 2],
      ['Nitrogen injection', 'related', 0.75, 0.65, 'Gas injected after a partial fill, through the nozzle or the tool.', 'The gas follows the hottest, thickest path and hollows it.', 'Gas-assist handbooks', 2],
      ['Gas channel design', 'related', 0.7, 0.65, 'Thick paths designed in so the gas goes where it should.', 'Without a clear path, gas fingers into thin walls.', 'Gas-assist handbooks', 2],
      ['Less sink and warp', 'effect', 0.75, 0.75, 'Gas packs thick sections from inside.', 'Gas pressure is even, so thick areas shrink less unevenly.', 'Gas-assist handbooks', 2],
      ['Material and weight saving', 'effect', 0.6, 0.5, 'Hollow sections weigh less.', 'Often 10 to 40% lighter.', 'Gas-assist handbooks', 2],
      ['Gas fingering', 'effect', 0.5, 0.45, 'Gas escaping into thin walls, leaving thin, weak spots.', 'The main defect of gas-assist.', 'Gas-assist handbooks', 2],
      ['Equipment and licensing', 'related', 0.45, 0.4, 'Gas controllers, nozzles and sometimes patent licences.', 'Extra cost and complexity at the press.', 'Gas-assist handbooks', 2],
      ['Missing coring', 'related', 0.55, 0.5, '', 'Coring by design is cheaper where it’s possible.', 'Part design textbooks', 2],
    ],
    links: [
      ['Gas channel design', 'Gas fingering', 0.8, 'Good channel design prevents fingering.', 'Gas-assist handbooks', 2],
      ['Nitrogen injection', 'Less sink and warp', 0.7, 'The gas pressure does the packing.', 'Gas-assist handbooks', 2],
      ['Thick sections that must stay', 'Missing coring', 0.55, 'If it could be cored, gas wouldn’t be needed.', 'Part design textbooks', 2],
    ],
  },

  'Material selection trade-offs': {
    liner: 'Semi-crystalline resins are chosen for chemical resistance, fatigue life and low friction.',
    reading: 'You expanded material selection, so I looked at why semi-crystalline resins get chosen, what the alternatives give up, and how to find a lower-warp grade.',
    orbs: [
      ['Chemical resistance', 'cause', 0.8, 0.75, 'Resistance to fuels, solvents and cleaners.', 'A main reason to pick PP, POM or PA over amorphous resins.', 'Materials textbooks', 2],
      ['Fatigue and living hinges', 'cause', 0.65, 0.6, 'Parts that flex millions of times.', 'PP living hinges and POM snaps rely on semi-crystalline toughness.', 'Materials textbooks', 2],
      ['Resin cost pressure', 'cause', 0.6, 0.6, '', 'PP is one of the cheapest engineering options.', 'Market data', 3],
      ['Semi-crystalline polymers', 'effect', 0.85, 0.85, '', 'The family these needs lead to.', 'Materials textbooks', 2],
      ['Amorphous polymers', 'related', 0.8, 0.7, '', 'The low-warp alternative, with its own weaknesses.', 'Materials textbooks', 2],
      ['Filled grades', 'related', 0.65, 0.6, 'Mineral, talc or glass added to the base resin.', 'Talc-filled PP, for one, shrinks much less than unfilled.', 'Resin datasheets', 1],
      ['Low-warp grades', 'related', 0.6, 0.6, 'Grades formulated for flatness, often with special fillers or nucleation.', 'Asking the supplier is often the fastest fix.', 'Resin suppliers’ guides', 3],
      ['Materials selection charts', 'related', 0.45, 0.35, 'Ashby charts comparing materials across properties.', 'A structured way to see the trade-offs.', 'Materials selection textbooks', 2],
    ],
    links: [
      ['Filled grades', 'Low-warp grades', 0.7, 'Many low-warp grades are filled grades.', 'Resin datasheets', 1],
      ['Chemical resistance', 'Amorphous polymers', 0.65, 'Chemical resistance is what amorphous resins give up.', 'Materials textbooks', 2],
      ['Materials selection charts', 'Resin cost pressure', 0.5, 'Charts include cost as a property.', 'Materials selection textbooks', 2],
    ],
  },

  'Resin cost pressure': {
    liner: 'PP is one of the cheapest engineering options, which drives its use.',
    reading: 'You expanded cost pressure, so I looked at where it comes from, the choices it pushes, and the hidden costs it can create.',
    orbs: [
      ['High-volume parts', 'cause', 0.75, 0.7, 'Parts made in millions.', 'A few cents per part decides the material at high volume.', 'Costing practice', 3],
      ['Oil and feedstock prices', 'cause', 0.55, 0.45, 'Resin prices follow oil and monomer markets.', 'Price swings push buyers to switch grades or suppliers.', 'Market data', 3],
      ['Semi-crystalline polymers', 'effect', 0.7, 0.75, '', 'Cheap resins like PP are semi-crystalline.', 'Market data', 3],
      ['Resin batch or supplier change', 'effect', 0.65, 0.65, '', 'Switching suppliers to save money can bring new warp.', 'Moulders’ experience', 5],
      ['More regrind', 'effect', 0.6, 0.55, 'A higher share of reground scrap in the mix.', 'Saves material but changes shrinkage if not controlled.', 'Process guides', 3],
      ['Cost of quality', 'related', 0.6, 0.55, 'Adding up scrap, rework, inspection and returns.', 'The full cost can outweigh the resin saving.', 'Quality management texts', 3],
      ['Material selection trade-offs', 'related', 0.7, 0.6, '', 'Cost is one side of the trade-off.', 'Materials textbooks', 2],
    ],
    links: [
      ['More regrind', 'Cost of quality', 0.55, 'Regrind savings can turn into scrap costs.', 'Process guides', 3],
      ['High-volume parts', 'Oil and feedstock prices', 0.5, 'At high volume, price swings hurt most.', 'Market data', 3],
      ['Resin batch or supplier change', 'Cost of quality', 0.55, 'Warp from a cheaper supplier shows up in quality costs.', 'My inference', 6],
    ],
  },

  'High mould shrinkage': {
    liner: 'PP and POM shrink roughly 1 to 2.5%, against about 0.5% for ABS.',
    reading: 'You expanded high mould shrinkage, so I looked at what sets the amount, why a high number means more warp risk, and how the tool allows for it.',
    orbs: [
      ['Crystallinity', 'cause', 0.85, 0.85, '', 'Crystals pack tighter, so more crystallinity means more shrinkage.', 'Polymer science textbooks', 2],
      ['Mould temperature', 'cause', 0.65, 0.6, 'The steel temperature the part cools against.', 'A hotter mould lets more crystallise, raising shrinkage.', 'Process guides', 3],
      ['Packing level', 'cause', 0.6, 0.55, 'How much extra material is packed in.', 'More packing, less shrinkage.', 'Process guides', 3],
      ['Differential shrinkage', 'effect', 0.75, 0.8, '', 'More total shrinkage leaves more room for it to be uneven.', 'Shrinkage handbooks', 2],
      ['Warped moulded part', 'effect', 0.7, 0.9, '', 'High-shrinkage resins warp more readily.', 'Shrinkage handbooks', 2],
      ['Shrinkage allowance in the tool', 'related', 0.75, 0.7, 'The cavity is cut larger by the expected shrinkage.', 'Get the allowance wrong and the part is off size, even if flat.', 'Mould design textbooks', 2],
      ['Shrinkage test plaques', 'related', 0.6, 0.5, 'Standard moulded plates measured along and across the flow to give a resin’s shrinkage values.', 'Where the datasheet numbers come from.', 'ISO 294-4', 1],
      ['Amorphous polymers', 'related', 0.65, 0.5, '', 'The low-shrinkage comparison.', 'Resin datasheets', 1],
    ],
    links: [
      ['Mould temperature', 'Crystallinity', 0.8, 'Mould temperature sets cooling rate, which sets crystallinity.', 'Polymer science textbooks', 2],
      ['Shrinkage allowance in the tool', 'Shrinkage test plaques', 0.65, 'Toolmakers use plaque data to set the allowance.', 'Mould design textbooks', 2],
      ['Packing level', 'Differential shrinkage', 0.6, 'Uneven packing gives uneven shrinkage.', 'Process guides', 3],
    ],
  },

  'Direction-dependent shrinkage': {
    liner: 'The part shrinks by different amounts along and across the flow.',
    reading: 'You expanded direction-dependent shrinkage, so I looked at what lines up in the flow, which way it shrinks more for each kind of resin, and how to reduce the mismatch.',
    orbs: [
      ['Molecular orientation', 'cause', 0.8, 0.75, 'Polymer chains stretched out along the flow.', 'Stretched chains recoil as they cool, so unfilled resins shrink more along the flow.', 'Polymer science textbooks', 2],
      ['Glass-fibre orientation', 'cause', 0.85, 0.85, '', 'Fibres resist shrinking along their length.', 'Studies of fibre-filled mouldings', 2],
      ['Gate location', 'cause', 0.7, 0.65, '', 'The gate sets the flow direction.', 'Mould design guides', 3],
      ['Twist and bow', 'effect', 0.8, 0.8, 'Long parts twist; flat ones bow or saddle.', 'The shape the mismatch takes.', 'Shrinkage handbooks', 2],
      ['Warped moulded part', 'effect', 0.75, 1, '', 'Any directional mismatch shows as warp.', 'Shrinkage handbooks', 2],
      ['Shrinkage test plaques', 'related', 0.65, 0.55, 'Standard moulded plates measured along and across the flow to give a resin’s shrinkage values.', 'Datasheets give separate flow and cross-flow values from them.', 'ISO 294-4', 1],
      ['Mineral and glass-bead fillers', 'related', 0.55, 0.5, 'Fillers with no long axis stiffen a resin with far less directional shrinkage.', 'Reduce the directional difference.', 'Resin supplier guides', 3],
      ['Semi-crystalline polymers', 'related', 0.6, 0.5, '', 'Their crystals grow with orientation, adding to the effect.', 'Polymer science textbooks', 2],
    ],
    links: [
      ['Molecular orientation', 'Semi-crystalline polymers', 0.65, 'Orientation guides how crystals grow.', 'Polymer science textbooks', 2],
      ['Glass-fibre orientation', 'Mineral and glass-bead fillers', 0.6, 'Fillers are the swap for some of the fibre.', 'Resin supplier guides', 3],
      ['Gate location', 'Twist and bow', 0.55, 'Moving the gate changes which way it twists.', 'Mould design guides', 3],
    ],
  },

  'Amorphous polymers': {
    liner: 'ABS, PC and PMMA shrink less and more evenly, at the cost of chemical resistance.',
    reading: 'You expanded amorphous polymers, the low-warp alternative. I looked at why they shrink less, what they’re weaker at, and when switching makes sense.',
    orbs: [
      ['No crystals', 'cause', 0.85, 0.8, 'Chains stay tangled as they cool.', 'Without crystals packing tight, shrinkage is low and even.', 'Polymer science textbooks', 2],
      ['Low, even shrinkage', 'effect', 0.85, 0.85, 'Around 0.4 to 0.7%, similar in all directions.', 'The reason amorphous parts warp less.', 'Resin datasheets', 1],
      ['Environmental stress cracking', 'effect', 0.7, 0.65, 'Cracks under stress when exposed to some chemicals.', 'The main weakness: oils, cleaners and solvents attack stressed amorphous parts.', 'Materials textbooks', 2],
      ['Higher price', 'effect', 0.5, 0.45, 'Usually more expensive than PP.', 'Part of the trade-off.', 'Market data', 3],
      ['ABS', 'related', 0.7, 0.6, 'Tough, easy to mould, common for housings.', 'The usual swap for PP when flatness matters.', 'Resin datasheets', 1],
      ['PC/ABS blends', 'related', 0.6, 0.55, 'Blends of polycarbonate and ABS.', 'More heat and impact resistance than ABS, still low shrinkage.', 'Resin datasheets', 1],
      ['Semi-crystalline polymers', 'related', 0.8, 0.7, '', 'The family it’s compared against.', 'Materials textbooks', 2],
      ['Material selection trade-offs', 'related', 0.7, 0.6, '', 'Whether to switch is a trade-off decision.', 'Materials textbooks', 2],
    ],
    links: [
      ['No crystals', 'Low, even shrinkage', 0.85, 'No crystals, no crystal shrinkage.', 'Polymer science textbooks', 2],
      ['Environmental stress cracking', 'Material selection trade-offs', 0.6, 'The main thing traded away.', 'Materials textbooks', 2],
      ['ABS', 'PC/ABS blends', 0.6, 'Two common amorphous choices.', 'Resin datasheets', 1],
    ],
  },

  'Crystallinity': {
    liner: 'How much of the polymer packs into ordered regions. Strongly affected by cooling rate.',
    reading: 'You expanded crystallinity, so I looked at what controls it during moulding, how it’s measured, and what it changes in the part.',
    orbs: [
      ['Cooling rate', 'cause', 0.9, 0.9, 'How fast each region passes through the crystallisation range.', 'Slow cooling gives more and larger crystals.', 'Polymer science textbooks', 2],
      ['Mould temperature', 'cause', 0.75, 0.7, 'The steel temperature the part cools against.', 'The main process setting that controls cooling rate.', 'Process guides', 3],
      ['Nucleating agents', 'cause', 0.65, 0.6, 'Additives or pigments that start crystals forming.', 'They speed crystallisation and can change shrinkage, sometimes unintentionally.', 'Studies of nucleation', 2],
      ['High mould shrinkage', 'effect', 0.85, 0.8, '', 'More crystals, more shrinkage.', 'Polymer science textbooks', 2],
      ['Stiffness and heat resistance', 'effect', 0.6, 0.4, 'Crystalline regions make the part stiffer and better at temperature.', 'The upside of crystallinity.', 'Materials textbooks', 2],
      ['Post-mould crystallisation', 'effect', 0.6, 0.55, 'Crystallinity carrying on rising after ejection.', 'Parts keep shrinking for hours or days.', 'Polymer science textbooks', 2],
      ['DSC measurement', 'related', 0.65, 0.6, 'Differential scanning calorimetry measures the heat of melting.', 'The standard way to measure crystallinity in samples.', 'ISO 11357-3', 1],
      ['Annealing', 'related', 0.6, 0.45, '', 'Annealing raises and settles crystallinity.', 'Polymer science textbooks', 2],
    ],
    links: [
      ['Cooling rate', 'Mould temperature', 0.85, 'Mould temperature sets cooling rate.', 'Process guides', 3],
      ['Nucleating agents', 'Cooling rate', 0.55, 'Nucleation changes how crystallinity responds to cooling.', 'Studies of nucleation', 2],
      ['Post-mould crystallisation', 'Annealing', 0.65, 'Annealing finishes the crystallisation in a controlled way.', 'Polymer science textbooks', 2],
    ],
  },
};
