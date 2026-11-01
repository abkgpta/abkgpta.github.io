// ─────────────────────────────────────────────────────────────
// DEMO CONTENT · the deeper levels, so every orb can keep opening up.
//
// Only on this site. Written by Claude for the demo. The first preload
// (demo-details/maps/deep.js) covers the 43 topics around the example
// question. Everything found inside those (sub-systems, parts, neighbours)
// was a dead end. This file adds a second ring of topics, each with its own
// card, Expand map and Go deeper pass, and demo-aliases.js points every
// other orb at the topic it is really about. Together they make the demo a
// closed web: whatever you open, Expand and Go deeper keep working.
//
// One entry per topic, keyed by title:
//   liner, about, check, wiki    – the card (wiki: Wikipedia article for a picture, or '')
//   src     – [tier, type, title]: references named from Claude's own knowledge
//   reading – how the deeper pass broke the topic down
//   subs    – [title, liner, why, basis, tier, cite, parts]
//   parts   – [title, liner, relevance, why, basis, tier, cite]
//   conn    – [part a, part b, kind, confidence, why, basis, tier, cite]
//   threads – [title, question, why]: each title is a topic with its own pass
//   map     – [reading, orbs, links] for Expand, in the demo-maps.js row shapes
//             (a blank liner means "use the one the orb already has")
// ─────────────────────────────────────────────────────────────

window.CELESTIAL_DEMO_CONTENT ||= {};
window.CELESTIAL_DEMO_CONTENT.more = {
  'Moulded-in residual stress': {
    liner: 'Stress frozen into the part when shrinkage is held back, waiting to come out as warp or cracks.',
    about: 'When one region wants to shrink more than its neighbour but the part is too stiff to bend, the mismatch stays inside as stress. It is invisible at the press, which is why it surprises people: heat, solvents or time can release it later as warp, crazing or cracking. Its two main sources are flow (chains frozen while stretched) and cooling (skin and core shrinking by different amounts).',
    check: ['Look at a clear or transparent part between crossed polarisers: stress shows as coloured fringes.', 'Heat a part to just below its softening point for an hour and see whether it moves.', 'Try a solvent stress-crack test on a sample (for ABS or PC).'],
    wiki: 'Residual stress',
    src: [[2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'], [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier, 2013)'], [3, 'Encyclopedia', 'Residual stress, Wikipedia']],
    reading: 'You went into the stress itself, so I split it by where it comes from, how it shows itself and how it is released on purpose.',
    subs: [
      ['Where it comes from', 'Flow and cooling both lock stress in.', 'Knowing the source tells you which setting moves it.', 'Polymer processing textbooks', 2, [0], [
        ['Molecular orientation', '', 0.85, 'Chains frozen while stretched pull back later.', 'Polymer processing textbooks', 2, [0]],
        ['Frozen skin layer', '', 0.8, 'The skin sets first and the core pulls on it as it shrinks.', 'Studies of residual stress', 2, [1]],
        ['Over-packing', '', 0.6, 'Extra packing near the gate adds compressive stress there.', 'Process guides', 3, [1]],
      ]],
      ['How it shows', 'What stress does once it gets the chance.', 'The symptoms often appear far from the press.', 'Failure analysis practice', 3, [0], [
        ['Delayed warp', '', 0.8, 'Warmth lets the stress relax as bending.', 'Studies of residual stress', 2, [1]],
        ['Environmental stress cracking', '', 0.7, 'Chemicals plus locked-in stress crack amorphous parts.', 'Failure analysis practice', 2, [0]],
      ]],
      ['Getting it out', 'Releasing it under control instead of at the customer.', 'The fixes are cheaper than returns.', 'Process guides', 3, [1], [
        ['Annealing', '', 0.75, 'Heat lets stress relax in an oven, not in service.', 'Process guides', 3, [1]],
        ['Mould temperature', '', 0.65, 'Warmer steel lets chains relax before they freeze.', 'Polymer processing textbooks', 2, [0]],
      ]],
    ],
    conn: [
      ['Frozen skin layer', 'Delayed warp', 'releases as', 0.7, 'Skin-core stress is what comes out as warp when the part is warmed.', 'Studies of residual stress', 2, [1]],
      ['Molecular orientation', 'Environmental stress cracking', 'raises the risk of', 0.6, 'Oriented, stressed regions are where solvent cracks start.', 'Failure analysis practice', 2, [0]],
      ['Mould temperature', 'Molecular orientation', 'relaxes', 0.65, 'A warmer mould gives chains time to recoil before freezing.', 'Polymer processing textbooks', 2, [0]],
    ],
    threads: [['Annealing', 'Should I anneal these parts to release the stress?', 'The direct way to get stress out.'], ['Molecular orientation', 'How much of the stress comes from flow?', 'The source a gate or speed change can move.'], ['Environmental stress cracking', 'Will cleaners or oils crack these parts?', 'The costly failure stress can cause.']],
    map: ['You expanded locked-in stress, so I mapped what puts it there, what it turns into and how to release it.', [
      ['Molecular orientation', 'cause', 0.8, 0.8, '', 'Stretched chains frozen in place are a main source.', 'Polymer processing textbooks', 2],
      ['Frozen skin layer', 'cause', 0.75, 0.75, '', 'Skin and core shrink by different amounts.', 'Studies of residual stress', 2],
      ['Over-packing', 'cause', 0.6, 0.5, '', 'Packing harder than needed adds stress near the gate.', 'Process guides', 3],
      ['Delayed warp', 'effect', 0.8, 0.85, '', 'Released stress becomes warp days later.', 'Studies of residual stress', 2],
      ['Environmental stress cracking', 'effect', 0.65, 0.6, '', 'Stress plus chemicals cracks parts.', 'Failure analysis practice', 2],
      ['Annealing', 'related', 0.7, 0.65, '', 'A deliberate heat soak relaxes stress.', 'Process guides', 3],
      ['Warped moulded part', 'effect', 0.7, 0.7, '', 'Some warp is stress that has already come out.', 'Shrinkage handbooks', 2],
      ['Glass transition', 'related', 0.5, 0.45, '', 'Stress relaxes fast once the part nears its softening point.', 'Polymer science textbooks', 2],
    ], [
      ['Frozen skin layer', 'Delayed warp', 0.7, 'Skin-core stress is what comes out on heating.', 'Studies of residual stress', 2],
      ['Annealing', 'Delayed warp', 0.6, 'Annealing triggers the warp early, under control.', 'Process guides', 3],
    ]],
  },

  'Post-mould shrinkage': {
    liner: 'Shrinkage that carries on for hours or weeks after the part leaves the mould.',
    about: 'A part is not finished shrinking when it is ejected. It keeps contracting as it cools to room temperature, and semi-crystalline resins keep crystallising slowly for days, which adds more. Typically 80 to 90% of total shrinkage happens in the mould and the rest afterwards. If the after-shrinkage is uneven, the part changes shape in the box.',
    check: ['Measure the same parts at ejection, after 1 hour, 24 hours and a week.', 'Compare a part left on a flat plate with one boxed hot.', 'Check whether the resin is semi-crystalline (PP, POM, PA, PBT).'],
    wiki: '',
    src: [[2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier, 2013)'], [1, 'Standard', 'ISO 294-4: determination of moulding shrinkage (moulding and post-moulding shrinkage)'], [2, 'Textbook', 'Ehrenstein, G. W. Polymeric Materials (Hanser, 2001)']],
    reading: 'You went deeper into shrinkage after ejection, so I split it into the heat still to leave, the crystals still to form and how to stop it bending the part.',
    subs: [
      ['Heat still inside', 'The core is hot when the skin is already firm.', 'The quickest part of after-shrinkage.', 'Heat-transfer physics', 2, [0], [
        ['Core temperature', '', 0.8, 'Thick cores keep shrinking for minutes after ejection.', 'Heat-transfer physics', 2, [0]],
        ['Ejection temperature', '', 0.7, 'The hotter it leaves, the more is still to come.', 'Process guides', 3, [0]],
      ]],
      ['Crystals still forming', 'Slow crystallisation at room temperature.', 'The slowest part, lasting days in PP and POM.', 'Polymer science textbooks', 2, [2], [
        ['Secondary crystallisation', '', 0.8, 'Adds shrinkage for days or weeks.', 'Polymer science textbooks', 2, [2]],
        ['Mould temperature', '', 0.7, 'A warmer mould crystallises more in the tool, leaving less for later.', 'Resin processing guides', 3, [2]],
      ]],
      ['Holding the shape', 'Stopping uneven after-shrinkage from bending the part.', 'The practical fixes.', 'Process guides', 3, [0], [
        ['Cooling fixtures', '', 0.75, 'Jigs keep the part flat while it finishes.', 'Process guides', 3, [0]],
        ['24-hour measurement', '', 0.65, 'Only a later measurement shows the final size.', 'ISO 294-4', 1, [1]],
      ]],
    ],
    conn: [
      ['Mould temperature', 'Secondary crystallisation', 'reduces', 0.75, 'A hotter mould leaves less crystallisation for later.', 'Resin processing guides', 3, [2]],
      ['Core temperature', 'Cooling fixtures', 'calls for', 0.6, 'The hotter the core at ejection, the more a fixture helps.', 'Process guides', 3, [0]],
      ['Ejection temperature', '24-hour measurement', 'shows up in', 0.6, 'Hot ejection shows as a growing gap between press and next-day sizes.', 'ISO 294-4', 1, [1]],
    ],
    threads: [['Cooling fixtures', 'Would a cooling fixture hold these parts flat?', 'The cheapest fix if warp grows after ejection.'], ['Crystallinity', 'How much of the after-shrinkage is crystallisation?', 'The slow component in semi-crystalline resins.'], ['Hot parts stacked in boxes', 'Is the warp happening in the box?', 'Where uneven after-shrinkage usually happens.']],
    map: ['You expanded after-shrinkage, so I mapped what drives it, where it bites and what controls it.', [
      ['Ejecting too early', 'cause', 0.8, 0.8, '', 'An early ejection leaves more shrinkage for outside the tool.', 'Process guides', 3],
      ['Secondary crystallisation', 'cause', 0.7, 0.7, '', 'Slow crystal growth adds shrinkage for days.', 'Polymer science textbooks', 2],
      ['Semi-crystalline polymers', 'cause', 0.7, 0.6, '', 'These resins have the most after-shrinkage.', 'Polymer science textbooks', 2],
      ['Hot parts stacked in boxes', 'effect', 0.75, 0.8, '', 'Uneven after-shrinkage under load bends parts.', 'Process guides', 3],
      ['Warp found at the customer', 'effect', 0.6, 0.65, '', 'Parts change after they pass inspection.', 'Process guides', 3],
      ['Cooling fixtures', 'related', 0.6, 0.6, '', 'Holds the part flat while it finishes.', 'Process guides', 3],
      ['24-hour measurement', 'related', 0.6, 0.55, '', 'The way to see it at all.', 'ISO 294-4', 1],
      ['Annealing', 'related', 0.5, 0.4, '', 'Finishes the shrinkage in an oven, on purpose.', 'Process guides', 3],
    ], [
      ['Ejecting too early', 'Hot parts stacked in boxes', 0.7, 'Early ejection plus hot boxing is the classic pairing.', 'Process guides', 3],
    ]],
  },

  'Weld lines': {
    liner: 'Where two flow fronts meet: a seam that can be weaker, visible, and oriented differently.',
    about: 'When melt splits around a hole or comes from two gates, the fronts meet again and fuse. Because their surfaces were already cooling, the chains only partly entangle across the seam, so a weld line can have half the strength of the bulk, less in glass-filled resins where fibres lie along the seam instead of across it. Weld lines also change local shrinkage, so they can show up in warp.',
    check: ['Find weld lines on a short-shot series or in a fill simulation.', 'Check whether any weld sits on a loaded or sealed feature.', 'Raise melt and mould temperature and see whether the line fades.'],
    wiki: '',
    src: [[2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'], [2, 'Textbook', 'Beaumont, J. P. Runner and Gating Design Handbook, 2nd ed. (Hanser, 2007)'], [4, 'Guide', 'Resin supplier design guides on weld-line strength']],
    reading: 'You went into the weld line, so I split it into how it forms, what it weakens and how to move or strengthen it.',
    subs: [
      ['How it forms', 'Two fronts meeting after splitting or from two gates.', 'Where it forms is set by the flow, not by chance.', 'Gating handbooks', 2, [1], [
        ['Flow direction', '', 0.8, 'The fronts meet where the flow paths converge.', 'Gating handbooks', 2, [1]],
        ['Melt temperature', '', 0.65, 'Hotter fronts fuse better.', 'Process guides', 3, [0]],
      ]],
      ['What it weakens', 'The seam carries less load and looks different.', 'Matters on loaded or visible features.', 'Design guides', 2, [0], [
        ['Fibre content and length', '', 0.75, 'Fibres along the seam give no reinforcement across it.', 'Studies of fibre-filled mouldings', 2, [2]],
        ['Cosmetic rejects', '', 0.55, 'A visible line on a show surface.', 'Quality practice', 4, [0]],
      ]],
      ['Moving it', 'Putting the weld where it does no harm.', 'Usually a gate or wall change.', 'Gating handbooks', 2, [1], [
        ['Gate location', '', 0.85, 'Moving the gate moves where fronts meet.', 'Gating handbooks', 2, [1]],
        ['Mould flow simulation', '', 0.65, 'Predicts weld positions before steel is cut.', 'Simulation documentation', 4, [1]],
      ]],
    ],
    conn: [
      ['Gate location', 'Flow direction', 'sets', 0.85, 'Gate position decides the flow paths and so the meeting point.', 'Gating handbooks', 2, [1]],
      ['Melt temperature', 'Fibre content and length', 'cannot fully offset', 0.5, 'Hotter melt helps fusion but fibres still lie along the seam.', 'My inference', 6, []],
      ['Mould flow simulation', 'Gate location', 'guides', 0.7, 'Weld prediction is a main reason to simulate gate options.', 'Simulation documentation', 4, [1]],
    ],
    threads: [['Gate location', 'Could moving the gate put the weld somewhere harmless?', 'The usual fix.'], ['Glass-fibre orientation', 'How weak is the weld in a glass-filled grade?', 'Fibres make welds much weaker.'], ['Mould flow simulation', 'Where will the welds land in each gate option?', 'Cheapest way to compare.']],
    map: ['You expanded weld lines, so I mapped what creates them, what they affect and how to move them.', [
      ['Gate location', 'cause', 0.85, 0.85, '', 'The gate decides where fronts meet.', 'Gating handbooks', 2],
      ['Missing coring', 'related', 0.4, 0.3, '', 'Holes and cores split the flow and create welds.', 'Design guides', 3],
      ['Glass-fibre orientation', 'related', 0.7, 0.7, '', 'Fibres lie along the weld, weakening it.', 'Studies of fibre-filled mouldings', 2],
      ['Cosmetic rejects', 'effect', 0.6, 0.5, '', 'Visible lines on show faces get parts rejected.', 'Quality practice', 4],
      ['Snap-fit hooks', 'effect', 0.5, 0.5, '', 'A weld across a hook root is a common breakage point.', 'Design guides', 3],
      ['Direction-dependent shrinkage', 'effect', 0.55, 0.45, '', 'Orientation changes at the weld change local shrinkage.', 'Shrinkage handbooks', 2],
      ['Mould flow simulation', 'related', 0.7, 0.65, '', 'Predicts where welds form.', 'Simulation documentation', 4],
    ], [
      ['Gate location', 'Mould flow simulation', 0.7, 'Simulation is used to place gates around welds.', 'Simulation documentation', 4],
    ]],
  },

  'Voids': {
    liner: 'Bubbles inside thick sections where the core shrank away from itself.',
    about: 'A void forms when a thick section’s skin is already too stiff to sink, so the shrinking core pulls apart inside instead. It is the internal twin of a sink mark: same cause, different outcome depending on how stiff the skin is. Voids weaken the part and are hidden, so they are often found only by cutting parts open or by X-ray. Moisture can also make bubbles that look similar.',
    check: ['Cut a thick section and look: a clean, smooth cavity is a shrinkage void; many small bubbles suggest moisture or gas.', 'Increase hold time and see whether voids shrink.', 'Check whether the gate freezes before the thick section is packed.'],
    wiki: '',
    src: [[2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'], [2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)']],
    reading: 'You went inside voids, so I split them into the section that makes them, how packing feeds it, and how to tell them from gas bubbles.',
    subs: [
      ['The section', 'Too much plastic in one place.', 'The root cause is geometry.', 'Part design textbooks', 2, [0], [
        ['Thick ribs and bosses', '', 0.8, 'Junctions are the usual void sites.', 'Part design textbooks', 2, [0]],
        ['Missing coring', '', 0.75, 'Solid sections that should be hollow.', 'Part design textbooks', 2, [0]],
      ]],
      ['Feeding it', 'Packing has to reach the section before the gate freezes.', 'The process side of voids.', 'Scientific moulding practice', 2, [1], [
        ['Gate freeze-off study', '', 0.8, 'Shows when packing stops.', 'Scientific moulding practice', 2, [1]],
        ['Gate to thick section', '', 0.65, 'Gating into the thick part feeds it longest.', 'Gating handbooks', 2, [1]],
      ]],
      ['Telling it apart', 'Shrinkage voids versus gas and moisture.', 'Different causes, different fixes.', 'Troubleshooting guides', 3, [1], [
        ['Wet resin', '', 0.6, 'Steam makes bubbles that look like voids.', 'Troubleshooting guides', 3, [1]],
        ['Gas-assist moulding', '', 0.45, 'Turns the void into a controlled hollow.', 'Process guides', 3, [0]],
      ]],
    ],
    conn: [
      ['Gate to thick section', 'Gate freeze-off study', 'is checked by', 0.7, 'A freeze-off study shows whether the thick section stays fed.', 'Scientific moulding practice', 2, [1]],
      ['Missing coring', 'Gas-assist moulding', 'can be replaced by', 0.55, 'If coring is impossible, gas hollows the section instead.', 'Process guides', 3, [0]],
      ['Thick ribs and bosses', 'Gate to thick section', 'made worse by gating away from', 0.5, 'A junction far from the gate gets packed least.', 'My inference', 6, []],
    ],
    threads: [['Missing coring', 'Can the thick section be cored out?', 'Removes the cause.'], ['Gate freeze-off study', 'Is the gate freezing too soon?', 'The process check.'], ['Sink marks', 'Why do some sections sink and others void?', 'The same cause with a different outcome.']],
    map: ['You expanded voids, so I mapped the sections that make them, the process that feeds them and their look-alikes.', [
      ['Thick ribs and bosses', 'cause', 0.8, 0.8, '', 'Junctions are classic void sites.', 'Part design textbooks', 2],
      ['Missing coring', 'cause', 0.8, 0.75, '', 'Solid sections shrink inside.', 'Part design textbooks', 2],
      ['Low packing pressure', 'cause', 0.7, 0.7, '', 'Too little packing leaves room for voids.', 'Process guides', 3],
      ['Sink marks', 'related', 0.8, 0.6, '', 'The surface version of the same shrinkage.', 'Part design textbooks', 2],
      ['Wet resin', 'related', 0.5, 0.4, '', 'Steam bubbles can be mistaken for voids.', 'Troubleshooting guides', 3],
      ['Brittleness', 'effect', 0.5, 0.45, '', 'A void is a weak spot.', 'Failure analysis practice', 3],
      ['Gas-assist moulding', 'related', 0.6, 0.5, '', 'Makes a controlled hollow instead.', 'Process guides', 3],
    ], [
      ['Missing coring', 'Sink marks', 0.7, 'Solid sections give both, depending on skin stiffness.', 'Part design textbooks', 2],
    ]],
  },

  'Baffles and bubblers': {
    liner: 'Inserts that carry cooling water up into a tall core and back down again.',
    about: 'A drilled channel can’t follow water into a deep core, so toolmakers drill a vertical hole and split the flow. A baffle is a blade that divides the hole so water goes up one side and down the other; a bubbler is a tube that fountains water out at the top. Either one turns an uncooled core into a cooled one, but they restrict flow and can starve if fed in series with other circuits.',
    check: ['Check the tool drawing: does every tall core have a baffle or bubbler?', 'Measure flow on circuits feeding them: they need enough flow to stay turbulent.', 'Look for bubblers fed in series with other channels.'],
    wiki: '',
    src: [[2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'], [2, 'Textbook', 'Menges, G., Michaeli, W. & Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)']],
    reading: 'You went inside baffles and bubblers, so I split them into the two designs, what makes them work and how they fail.',
    subs: [
      ['The two designs', 'A blade or a tube in a vertical hole.', 'Each suits different core sizes.', 'Mould design textbooks', 2, [0, 1], [
        ['Tall cores', '', 0.8, 'The reason they exist.', 'Mould design textbooks', 2, [0]],
        ['Copper alloy inserts', '', 0.55, 'The alternative where a core is too slim to drill.', 'Mould design textbooks', 2, [1]],
      ]],
      ['Making them work', 'Enough flow, close enough to the top.', 'A badly fed bubbler barely cools.', 'Mould design textbooks', 2, [0], [
        ['Turbulent flow', '', 0.75, 'They need turbulent flow to pull heat out.', 'Heat-transfer physics', 2, [0]],
        ['Series versus parallel', '', 0.7, 'Bubblers in series starve the last ones.', 'Mould design textbooks', 2, [0]],
      ]],
      ['How they fail', 'Narrow passages that block and restrict.', 'Common on older tools.', 'Maintenance practice', 3, [1], [
        ['Scale and blockage', '', 0.75, 'Narrow tubes scale up first.', 'Maintenance practice', 3, [1]],
        ['Flow meters per circuit', '', 0.6, 'A flow reading shows a starved bubbler.', 'Maintenance practice', 3, [1]],
      ]],
    ],
    conn: [
      ['Series versus parallel', 'Turbulent flow', 'decides', 0.7, 'Parallel feeding keeps each bubbler’s flow up.', 'Mould design textbooks', 2, [0]],
      ['Scale and blockage', 'Flow meters per circuit', 'is caught by', 0.7, 'Falling flow on a circuit is the first sign of scale.', 'Maintenance practice', 3, [1]],
      ['Tall cores', 'Copper alloy inserts', 'or else', 0.55, 'Slim cores that can’t take a bubbler get a copper insert.', 'Mould design textbooks', 2, [1]],
    ],
    threads: [['Core and cavity at different temperatures', 'Is my core running hotter than the cavity?', 'The problem bubblers fix.'], ['Copper alloy inserts', 'Is the core too slim for a bubbler?', 'The alternative.'], ['Low coolant flow', 'Are the bubblers getting enough water?', 'Their most common failure.']],
    map: ['You expanded baffles and bubblers, so I mapped where they are needed and what they connect to.', [
      ['Uncooled cores', 'cause', 0.85, 0.85, '', 'Tall cores without them run hot.', 'Mould design textbooks', 2],
      ['Core and cavity at different temperatures', 'effect', 0.8, 0.8, '', 'They bring the core down towards the cavity.', 'Mould design textbooks', 2],
      ['Inside corners', 'related', 0.6, 0.6, '', 'A bubbler near a corner cools it.', 'Mould design textbooks', 2],
      ['Low coolant flow', 'related', 0.7, 0.65, '', 'They need flow to work.', 'Maintenance practice', 3],
      ['Copper alloy inserts', 'related', 0.6, 0.55, '', 'The alternative in slim cores.', 'Mould design textbooks', 2],
      ['Conformal cooling', 'related', 0.6, 0.5, '', 'Printed channels can replace them.', 'Mould design textbooks', 2],
      ['Cooling channel layout', 'related', 0.75, 0.7, '', 'They are part of the circuit layout.', 'Mould design textbooks', 2],
    ], [
      ['Uncooled cores', 'Core and cavity at different temperatures', 0.75, 'Uncooled cores are why the core runs hot.', 'Mould design textbooks', 2],
    ]],
  },

  'Copper alloy inserts': {
    liner: 'Highly conductive inserts placed where steel can’t get rid of heat fast enough.',
    about: 'Beryllium-copper and other copper alloys conduct heat four to eight times better than tool steel. Fitted at a hot spot such as a slim core or an inside corner, an insert pulls heat away to a nearby channel even where there is no room for water. They are softer than steel and cost more, so they go where they are needed most.',
    check: ['Find the hot spots with a thermal camera first.', 'Check whether the insert is cooled at its base: a copper insert with no water nearby only spreads heat.', 'Ask about wear if the area sees glass-filled flow.'],
    wiki: 'Beryllium copper',
    src: [[2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'], [4, 'Datasheet', 'Copper alloy supplier datasheets for mould inserts (thermal conductivity, hardness)'], [3, 'Encyclopedia', 'Beryllium copper, Wikipedia']],
    reading: 'You went inside copper inserts, so I split them into why they work, where they go and what they cost.',
    subs: [
      ['Why they work', 'Conductivity several times that of steel.', 'The physics behind the fix.', 'Heat-transfer physics', 2, [0], [
        ['Steel grade', '', 0.7, 'Tool steels conduct around 25 to 35 W/m·K, copper alloys 100 to 250.', 'Material datasheets', 4, [1]],
        ['Thermal diffusivity', '', 0.6, 'Heat evens out faster in copper.', 'Heat-transfer physics', 2, [0]],
      ]],
      ['Where they go', 'Places drilled water can’t reach.', 'Wasted elsewhere.', 'Mould design textbooks', 2, [0], [
        ['Inside corners', '', 0.8, 'Corners where heat concentrates.', 'Mould design textbooks', 2, [0]],
        ['Tall cores', '', 0.75, 'Slim cores with no room for a bubbler.', 'Mould design textbooks', 2, [0]],
      ]],
      ['What they cost', 'Price, wear and safety.', 'Why not every tool has them.', 'Toolmaking practice', 3, [1], [
        ['Insert cost', '', 0.6, 'More expensive material and fitting.', 'Toolmaking practice', 3, [1]],
        ['Fibre content and length', '', 0.45, 'Glass-filled resins wear soft inserts faster.', 'Toolmaking practice', 3, [1]],
      ]],
    ],
    conn: [
      ['Steel grade', 'Inside corners', 'is the limit at', 0.7, 'Steel’s low conductivity is why corners run hot.', 'Heat-transfer physics', 2, [0]],
      ['Tall cores', 'Insert cost', 'justifies', 0.5, 'Worth it when a core sets the cycle time.', 'My inference', 6, []],
      ['Fibre content and length', 'Insert cost', 'adds to', 0.45, 'Abrasive fill shortens insert life.', 'Toolmaking practice', 3, [1]],
    ],
    threads: [['Inside corners', 'Is the warp coming from hot corners?', 'The classic place for an insert.'], ['Thermal imaging of the mould', 'Where exactly are the hot spots?', 'Find them before fitting anything.'], ['Heat transfer', 'How much faster would copper cool this?', 'The underlying physics.']],
    map: ['You expanded copper inserts, so I mapped what they fix and their alternatives.', [
      ['Inside corners', 'cause', 0.8, 0.8, '', 'Hot corners are the commonest reason to fit one.', 'Mould design textbooks', 2],
      ['Uncooled cores', 'cause', 0.7, 0.7, '', 'Slim cores with no water.', 'Mould design textbooks', 2],
      ['Even cooling', 'effect', 0.7, 0.65, '', 'Hot spots come down to the rest of the steel.', 'Mould design textbooks', 2],
      ['Baffles and bubblers', 'related', 0.6, 0.55, '', 'The water-based alternative.', 'Mould design textbooks', 2],
      ['Conformal cooling', 'related', 0.6, 0.5, '', 'The printed alternative.', 'Mould design textbooks', 2],
      ['Heat transfer', 'related', 0.6, 0.5, '', 'Why conductivity matters.', 'Heat-transfer physics', 2],
      ['Tool rework', 'related', 0.5, 0.45, '', 'A common rework addition.', 'Toolmaking practice', 3],
    ], [
      ['Inside corners', 'Even cooling', 0.6, 'An insert in a corner evens out the steel.', 'Mould design textbooks', 2],
    ]],
  },

  'Scale and blockage': {
    liner: 'Minerals and rust building up inside cooling channels until heat and water can’t get through.',
    about: 'Hard water leaves calcium carbonate on hot channel walls; untreated water also rusts steel channels. Even a millimetre of scale insulates like several centimetres of steel and narrows the channel, so flow and heat removal both fall. It builds over months, which is why a tool that once ran flat slowly starts warping.',
    check: ['Compare flow on each circuit with the figure from when the tool was new.', 'Look into a channel end or use a borescope.', 'Test the water hardness and check whether treatment is in use.'],
    wiki: 'Limescale',
    src: [[3, 'Guide', 'Mould maintenance guides on descaling cooling circuits'], [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'], [3, 'Encyclopedia', 'Limescale, Wikipedia']],
    reading: 'You went inside scale, so I split it into the water that causes it, what it does to cooling and how it is found and removed.',
    subs: [
      ['The water', 'What is dissolved in it.', 'Prevention starts here.', 'Water treatment practice', 3, [0], [
        ['Hardness and minerals', '', 0.8, 'Calcium and magnesium come out on hot walls.', 'Water treatment practice', 3, [0]],
        ['Water treatment', '', 0.7, 'Softening, inhibitors and filtration.', 'Water treatment practice', 3, [0]],
      ]],
      ['What it does', 'Insulation and restriction.', 'Two effects that add up.', 'Heat-transfer physics', 2, [1], [
        ['Channel surface', '', 0.8, 'A scaled wall resists heat flow.', 'Heat-transfer physics', 2, [1]],
        ['Laminar flow', '', 0.6, 'Narrowed channels lose flow and turbulence.', 'Heat-transfer physics', 2, [1]],
      ]],
      ['Finding and fixing', 'Measurement and descaling.', 'Routine maintenance.', 'Maintenance practice', 3, [0], [
        ['Flow meters', '', 0.75, 'Falling flow is the first sign.', 'Maintenance practice', 3, [0]],
        ['Delta-T', '', 0.6, 'A circuit that warms the water less is removing less heat.', 'Maintenance practice', 3, [0]],
      ]],
    ],
    conn: [
      ['Hardness and minerals', 'Channel surface', 'coats', 0.85, 'Minerals deposit on the hottest channel walls first.', 'Water treatment practice', 3, [0]],
      ['Laminar flow', 'Delta-T', 'shows as', 0.55, 'Less flow means a bigger temperature rise but less heat removed in total.', 'Heat-transfer physics', 2, [1]],
      ['Water treatment', 'Flow meters', 'is verified by', 0.5, 'Stable flow over months shows treatment working.', 'My inference', 6, []],
    ],
    threads: [['Low coolant flow', 'Is flow lower than it should be?', 'Scale’s main symptom.'], ['Turbulent flow', 'Is the water still turbulent in the narrowed channels?', 'Why flow matters for heat.'], ['Heat transfer', 'How much does scale cut heat removal?', 'The physics.']],
    map: ['You expanded scale, so I mapped where it comes from and what it does downstream.', [
      ['Hardness and minerals', 'cause', 0.85, 0.85, '', 'Dissolved minerals form scale.', 'Water treatment practice', 3],
      ['Water treatment', 'related', 0.75, 0.7, '', 'Prevents it.', 'Water treatment practice', 3],
      ['Low coolant flow', 'effect', 0.85, 0.8, '', 'Narrowed channels carry less water.', 'Maintenance practice', 3],
      ['Uneven cooling', 'effect', 0.75, 0.75, '', 'Scaled circuits cool less than clean ones.', 'Mould design textbooks', 2],
      ['Channel fouling', 'related', 0.7, 0.6, '', 'The same problem, worse in printed channels.', 'Maintenance practice', 3],
      ['Flow meters per circuit', 'related', 0.65, 0.6, '', 'How it is caught early.', 'Maintenance practice', 3],
      ['Heat transfer', 'related', 0.6, 0.5, '', 'Scale is an insulating layer.', 'Heat-transfer physics', 2],
    ], [
      ['Low coolant flow', 'Uneven cooling', 0.75, 'Lost flow on one circuit makes cooling uneven.', 'Mould design textbooks', 2],
    ]],
  },

  'Turbulent flow': {
    liner: 'Water moving fast enough to tumble, which carries heat away several times better than smooth flow.',
    about: 'In smooth (laminar) flow, a slow layer of water clings to the channel wall and insulates it. Above a Reynolds number of about 4,000 the flow tumbles, that layer thins and heat transfer jumps. For a 10 mm channel with warm water that usually means a few litres per minute or more per circuit. Pushing much harder than turbulent brings little extra.',
    check: ['Work out the Reynolds number for each circuit from flow, diameter and water temperature.', 'Check circuits fed in series, which share one flow.', 'Compare a circuit’s delta-T with its neighbours.'],
    wiki: 'Reynolds number',
    src: [[2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011)'], [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'], [3, 'Encyclopedia', 'Reynolds number, Wikipedia']],
    reading: 'You went inside turbulent flow, so I split it into the physics, what sets it in a mould and how to check it.',
    subs: [
      ['The physics', 'Why tumbling water carries more heat.', 'Explains the threshold.', 'Heat-transfer textbooks', 2, [0], [
        ['Convection into the water', '', 0.8, 'Heat crossing the wall into the water.', 'Heat-transfer textbooks', 2, [0]],
        ['Laminar flow', '', 0.7, 'The slow, insulating alternative.', 'Heat-transfer textbooks', 2, [0]],
      ]],
      ['What sets it', 'Flow rate, channel size and temperature.', 'All adjustable.', 'Mould design textbooks', 2, [1], [
        ['Diameter', '', 0.6, 'For the same flow, a smaller channel runs faster.', 'Fluid mechanics', 2, [0]],
        ['Undersized pump or hoses', '', 0.7, 'Supply limits on flow.', 'Maintenance practice', 3, [1]],
        ['Circuits in series', '', 0.65, 'One flow shared by many channels.', 'Mould design textbooks', 2, [1]],
      ]],
      ['Checking it', 'Measuring rather than assuming.', 'Cheap to do.', 'Maintenance practice', 3, [1], [
        ['Flow meters per circuit', '', 0.75, 'Litres per minute on each line.', 'Maintenance practice', 3, [1]],
        ['Water temperature rise', '', 0.6, 'A large rise hints at low flow.', 'Maintenance practice', 3, [1]],
      ]],
    ],
    conn: [
      ['Undersized pump or hoses', 'Laminar flow', 'causes', 0.75, 'Too little supply drops circuits below turbulent.', 'Maintenance practice', 3, [1]],
      ['Circuits in series', 'Flow meters per circuit', 'is exposed by', 0.6, 'Meters show how little each series circuit gets.', 'Maintenance practice', 3, [1]],
      ['Diameter', 'Convection into the water', 'shifts', 0.55, 'Smaller channels raise velocity and heat transfer.', 'Fluid mechanics', 2, [0]],
    ],
    threads: [['Low coolant flow', 'Are any circuits below turbulent?', 'Where this matters in practice.'], ['Heat transfer', 'How much heat can each circuit remove?', 'The bigger picture.'], ['Scale and blockage', 'Has scale narrowed the channels?', 'A common cause of lost flow.']],
    map: ['You expanded turbulent flow, so I mapped what drives it and what it controls.', [
      ['Low coolant flow', 'cause', 0.85, 0.85, '', 'Low flow drops circuits to laminar.', 'Maintenance practice', 3],
      ['Circuits in series', 'cause', 0.7, 0.65, '', 'Shared flow per circuit.', 'Mould design textbooks', 2],
      ['Convection into the water', 'effect', 0.85, 0.8, '', 'Turbulence is what makes convection strong.', 'Heat-transfer textbooks', 2],
      ['Uneven cooling', 'effect', 0.7, 0.7, '', 'Laminar circuits cool less.', 'Mould design textbooks', 2],
      ['Flow meters per circuit', 'related', 0.65, 0.6, '', 'The check.', 'Maintenance practice', 3],
      ['Heat transfer', 'related', 0.7, 0.55, '', 'The physics behind it.', 'Heat-transfer textbooks', 2],
      ['Scale and blockage', 'cause', 0.6, 0.55, '', 'Narrowed channels lose flow.', 'Maintenance practice', 3],
    ], [
      ['Low coolant flow', 'Uneven cooling', 0.7, 'Lost turbulence on one circuit unbalances cooling.', 'Mould design textbooks', 2],
    ]],
  },

  'Gate freeze-off study': {
    liner: 'Weighing parts as hold time rises, to find when the gate freezes and packing stops.',
    about: 'After filling, the machine holds pressure to push in more plastic while the part shrinks. That only works until the gate freezes. A freeze-off study moulds parts at increasing hold times and weighs them: the weight rises, then levels off. The knee is the gate freeze time; setting hold a little beyond it makes sure every part is fully packed.',
    check: ['Mould 5 parts at each hold time in 0.5 or 1 s steps and weigh them on a 0.01 g balance.', 'Plot weight against hold time and read off where it levels.', 'Repeat after any change to gate, melt or mould temperature.'],
    wiki: '',
    src: [[2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)'], [3, 'Guide', 'Scientific moulding course notes on gate seal studies']],
    reading: 'You went into the freeze-off study, so I split it into running it, reading it and what moves the result.',
    subs: [
      ['Running it', 'Hold-time steps and a balance.', 'Takes under an hour.', 'Scientific moulding practice', 2, [0], [
        ['Hold time', '', 0.85, 'The variable stepped.', 'Scientific moulding practice', 2, [0]],
        ['Part weight', '', 0.85, 'The response measured.', 'Scientific moulding practice', 2, [0]],
      ]],
      ['Reading it', 'Where the weight curve levels.', 'Gives the setting.', 'Scientific moulding practice', 2, [0], [
        ['Gate freeze time', '', 0.8, 'The knee of the curve.', 'Scientific moulding practice', 2, [0]],
        ['Part weight variation', '', 0.6, 'Scatter before the knee shows unstable packing.', 'Scientific moulding practice', 2, [1]],
      ]],
      ['What moves it', 'Gate and temperatures shift freeze time.', 'Why it must be repeated.', 'Gating handbooks', 2, [0], [
        ['Gate size', '', 0.8, 'Bigger gates freeze later.', 'Gating handbooks', 2, [0]],
        ['Mould temperature', '', 0.55, 'Warmer steel delays freezing.', 'Process guides', 3, [1]],
      ]],
    ],
    conn: [
      ['Gate size', 'Gate freeze time', 'sets', 0.85, 'The gate’s thickness decides how long it stays open.', 'Gating handbooks', 2, [0]],
      ['Hold time', 'Part weight', 'raises until', 0.85, 'Weight rises with hold until the gate freezes.', 'Scientific moulding practice', 2, [0]],
      ['Mould temperature', 'Gate freeze time', 'delays', 0.55, 'A warmer tool keeps the gate open slightly longer.', 'Process guides', 3, [1]],
    ],
    threads: [['Hold pressure setting', 'Is the hold pressure itself right?', 'The other half of packing.'], ['Low packing pressure', 'Is the part under-packed?', 'What the study diagnoses.'], ['Cavity pressure sensors', 'Can I see packing directly in the cavity?', 'A sharper measurement.']],
    map: ['You expanded the freeze-off study, so I mapped what it measures and what it informs.', [
      ['Short hold time', 'cause', 0.8, 0.8, '', 'The fault it is designed to catch.', 'Scientific moulding practice', 2],
      ['Gate type and size', 'cause', 0.75, 0.7, '', 'Sets when the gate freezes.', 'Gating handbooks', 2],
      ['Part weight variation', 'related', 0.7, 0.65, '', 'The signal it reads.', 'Scientific moulding practice', 2],
      ['Low packing pressure', 'related', 0.8, 0.75, '', 'What it diagnoses.', 'Scientific moulding practice', 2],
      ['Hold pressure setting', 'related', 0.7, 0.6, '', 'Set alongside hold time.', 'Scientific moulding practice', 2],
      ['Sink marks', 'effect', 0.55, 0.5, '', 'Hold ending before freeze leaves sinks.', 'Process guides', 3],
      ['Cavity pressure sensors', 'related', 0.55, 0.45, '', 'Shows the gate freezing directly.', 'Sensor documentation', 4],
    ], [
      ['Short hold time', 'Sink marks', 0.6, 'Unpacked sections sink.', 'Process guides', 3],
    ]],
  },

  'Cavity pressure sensors': {
    liner: 'Sensors in the mould that read the pressure inside the part as it fills, packs and cools.',
    about: 'A machine reads hydraulic or screw pressure at the back of the barrel, which says little about what the plastic feels in a far corner. Sensors fitted behind ejector pins or flush with the cavity read the real pressure curve in the part. Its peak and how fast it decays tell you about packing and gate freeze, and shifts in the curve flag bad parts before anyone measures them.',
    check: ['Compare curves from near the gate and at the end of fill.', 'Watch how the curve changes after a material lot change.', 'Use the peak or integral to sort parts automatically.'],
    wiki: '',
    src: [[4, 'Documentation', 'Cavity pressure system documentation (sensor makers’ application notes)'], [2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)']],
    reading: 'You went inside cavity pressure sensing, so I split it into the sensors, what the curve says and how it is used.',
    subs: [
      ['The sensors', 'Direct or behind a pin.', 'Placement matters most.', 'Sensor documentation', 4, [0], [
        ['Ejector pin layout', '', 0.6, 'Indirect sensors sit behind ejector pins.', 'Sensor documentation', 4, [0]],
        ['Flow length', '', 0.65, 'A sensor at end of fill sees the least pressure.', 'Sensor documentation', 4, [0]],
      ]],
      ['The curve', 'Rise, peak and decay.', 'Each stage tells a story.', 'Scientific moulding practice', 2, [1], [
        ['Gate freeze time', '', 0.75, 'The decay changes slope when the gate seals.', 'Scientific moulding practice', 2, [1]],
        ['Hold pressure setting', '', 0.7, 'Sets the plateau height.', 'Scientific moulding practice', 2, [1]],
      ]],
      ['Using it', 'Control and sorting.', 'Where it pays back.', 'Sensor documentation', 4, [0], [
        ['Process variation', '', 0.7, 'Curve shifts reveal shot-to-shot change.', 'Sensor documentation', 4, [0]],
        ['Scrap by cavity', '', 0.5, 'Per-cavity curves explain per-cavity scrap.', 'Quality practice', 4, [0]],
      ]],
    ],
    conn: [
      ['Hold pressure setting', 'Gate freeze time', 'acts only until', 0.75, 'Hold does nothing once the gate has sealed.', 'Scientific moulding practice', 2, [1]],
      ['Flow length', 'Hold pressure setting', 'loses', 0.6, 'Pressure falls along the flow path.', 'Scientific moulding practice', 2, [1]],
      ['Process variation', 'Scrap by cavity', 'explains', 0.5, 'Varying curves in one cavity line up with its rejects.', 'My inference', 6, []],
    ],
    threads: [['Gate freeze-off study', 'When does my gate freeze?', 'The sensor makes it visible.'], ['Process variation', 'How much does the process drift?', 'What the curve monitors.'], ['Low packing pressure', 'Is the far end packed?', 'The question it answers.']],
    map: ['You expanded cavity pressure sensing, so I mapped what it measures and what it helps with.', [
      ['Low packing pressure', 'related', 0.8, 0.75, '', 'It shows packing directly.', 'Scientific moulding practice', 2],
      ['Long flow length', 'cause', 0.6, 0.6, '', 'Pressure drops far from the gate.', 'Scientific moulding practice', 2],
      ['Part weight variation', 'related', 0.7, 0.6, '', 'Weight follows the pressure curve.', 'Scientific moulding practice', 2],
      ['Process variation', 'related', 0.75, 0.7, '', 'The curve flags drift.', 'Sensor documentation', 4],
      ['Gate freeze-off study', 'related', 0.6, 0.5, '', 'The sensor shows freeze directly.', 'Scientific moulding practice', 2],
      ['Scrap rate and cost', 'effect', 0.5, 0.45, '', 'Automatic sorting cuts escapes.', 'Quality practice', 4],
    ], [
      ['Long flow length', 'Low packing pressure', 0.7, 'Far regions see the least pressure.', 'Scientific moulding practice', 2],
    ]],
  },

  'Hold pressure setting': {
    liner: 'The pressure the machine keeps on the melt after filling, to pack in plastic as it shrinks.',
    about: 'Once the cavity is full, the machine switches to hold pressure, usually 50 to 80% of the peak fill pressure. Too low and thick or distant areas shrink more than the rest; too high and the gate area is over-packed, stressed and may flash. Because pressure falls with distance from the gate, a single setting packs the near end more than the far end.',
    check: ['Run a hold-pressure series and measure warp and weight at each step.', 'Check the profile: a stepped or decaying hold can even out packing.', 'Confirm the switch to hold happens at the right screw position.'],
    wiki: '',
    src: [[2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)'], [3, 'Guide', 'Resin supplier processing guides (recommended hold pressures)']],
    reading: 'You went into the hold pressure, so I split it into the setting itself, how far it reaches and what too much or too little does.',
    subs: [
      ['The setting', 'Level, profile and switch-over.', 'Three separate knobs.', 'Scientific moulding practice', 2, [0], [
        ['Transfer position', '', 0.75, 'When filling stops and hold begins.', 'Scientific moulding practice', 2, [0]],
        ['Hold time', '', 0.75, 'How long hold lasts.', 'Scientific moulding practice', 2, [0]],
      ]],
      ['How far it reaches', 'Pressure lost along the flow.', 'Why the far end shrinks more.', 'Scientific moulding practice', 2, [0], [
        ['Long flow length', '', 0.75, 'Far areas get less.', 'Scientific moulding practice', 2, [0]],
        ['Gate size', '', 0.7, 'A small gate chokes the pressure.', 'Gating handbooks', 2, [0]],
      ]],
      ['Too little or too much', 'Both ends of the window.', 'The window is the goal.', 'Process guides', 3, [1], [
        ['Sink marks', '', 0.7, 'Too little shows as sinks.', 'Process guides', 3, [1]],
        ['Over-packing', '', 0.65, 'Too much locks in stress.', 'Process guides', 3, [1]],
      ]],
    ],
    conn: [
      ['Gate size', 'Long flow length', 'adds to losses along', 0.6, 'A restrictive gate and long flow both drop pressure before the far end.', 'Scientific moulding practice', 2, [0]],
      ['Transfer position', 'Over-packing', 'can cause', 0.55, 'Switching late lets fill speed pack the cavity.', 'Scientific moulding practice', 2, [0]],
      ['Hold time', 'Sink marks', 'prevents when long enough', 0.65, 'Hold past gate freeze stops sinks in thick areas.', 'Process guides', 3, [1]],
    ],
    threads: [['Gate freeze-off study', 'Is hold lasting until the gate freezes?', 'Hold time matters as much as pressure.'], ['Low packing pressure', 'Is the part under-packed?', 'The broader problem.'], ['Moulded-in residual stress', 'Am I packing in stress?', 'The cost of too much.']],
    map: ['You expanded hold pressure, so I mapped what it fixes, what it causes and what limits it.', [
      ['Low packing pressure', 'effect', 0.85, 0.85, '', 'Too low a setting is the commonest form.', 'Process guides', 3],
      ['Over-packing', 'effect', 0.7, 0.6, '', 'Too high a setting.', 'Process guides', 3],
      ['Gate type and size', 'related', 0.7, 0.65, '', 'Limits what reaches the part.', 'Gating handbooks', 2],
      ['Short hold time', 'related', 0.75, 0.7, '', 'Pressure is useless if hold ends early.', 'Scientific moulding practice', 2],
      ['Sink marks', 'effect', 0.65, 0.6, '', 'The first sign of too little.', 'Process guides', 3],
      ['Differential shrinkage', 'effect', 0.7, 0.7, '', 'Uneven packing becomes uneven shrinkage.', 'Shrinkage handbooks', 2],
      ['Cavity pressure sensors', 'related', 0.5, 0.45, '', 'Shows what actually reaches the cavity.', 'Sensor documentation', 4],
    ], [
      ['Low packing pressure', 'Differential shrinkage', 0.7, 'Under-packed areas shrink more.', 'Shrinkage handbooks', 2],
    ]],
  },

  'Ejector pin layout': {
    liner: 'How many ejector pins there are, where they push and how big they are.',
    about: 'Ejector pins push the part off the core. If they are too few or too small, or sit away from where the part grips, they push a still-soft part out of shape. Pins on ribs and walls, larger pins or blades, and stripper plates spread the force. Pin marks bulging or the part bending around pins is a sign that ejection is distorting it.',
    check: ['Look for pin marks that are raised, glossy or stretched: signs of pushing too hard.', 'Watch ejection in slow motion: does the part bend before it releases?', 'Check draft on the walls that grip the core.'],
    wiki: '',
    src: [[2, 'Textbook', 'Menges, G., Michaeli, W. & Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)'], [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)']],
    reading: 'You went into ejection, so I split it into the force needed, how it is spread and the signs it is bending parts.',
    subs: [
      ['The force needed', 'What holds the part on the core.', 'Grip sets the force.', 'Mould design textbooks', 2, [0], [
        ['Draft and radii', '', 0.8, 'Too little draft means more grip.', 'Mould design textbooks', 2, [0]],
        ['Ejection temperature', '', 0.65, 'A hot part is soft and grips harder as it shrinks on.', 'Process guides', 3, [0]],
      ]],
      ['Spreading it', 'Pins, blades and plates.', 'Where the push lands.', 'Mould design textbooks', 2, [0], [
        ['Thick ribs and bosses', '', 0.55, 'Pins under ribs push where the part is strong.', 'Mould design textbooks', 2, [0]],
        ['Cooling channel layout', '', 0.5, 'Pins compete with channels for space.', 'Mould design textbooks', 2, [0]],
      ]],
      ['Signs of trouble', 'Distortion at ejection.', 'How to spot it.', 'Troubleshooting guides', 3, [1], [
        ['Ejector pin distortion', '', 0.8, 'Bulges and bends at pins.', 'Troubleshooting guides', 3, [1]],
        ['Ejecting too early', '', 0.7, 'A soft part shows pin damage first.', 'Troubleshooting guides', 3, [1]],
      ]],
    ],
    conn: [
      ['Draft and radii', 'Ejector pin distortion', 'reduces', 0.7, 'More draft, less force, less distortion.', 'Mould design textbooks', 2, [0]],
      ['Cooling channel layout', 'Thick ribs and bosses', 'competes for space under', 0.45, 'Pins and channels both want the space beneath features.', 'My inference', 6, []],
      ['Ejection temperature', 'Ejecting too early', 'is the same question as', 0.7, 'Ejecting early means ejecting hot.', 'Process guides', 3, [0]],
    ],
    threads: [['Ejecting too early', 'Is the part too soft at ejection?', 'The usual partner of pin distortion.'], ['Draft and radii', 'Is there enough draft?', 'Cuts the force needed.'], ['Cooling channel layout', 'Are pins blocking cooling?', 'A hidden trade-off.']],
    map: ['You expanded ejector pin layout, so I mapped what it affects and what it trades off against.', [
      ['Ejector pin distortion', 'effect', 0.85, 0.85, '', 'Poor layout bends parts.', 'Troubleshooting guides', 3],
      ['Ejecting too early', 'related', 0.75, 0.75, '', 'Soft parts suffer more.', 'Troubleshooting guides', 3],
      ['Draft and radii', 'related', 0.7, 0.65, '', 'Sets the force needed.', 'Mould design textbooks', 2],
      ['Ejectors and inserts in the way', 'related', 0.6, 0.55, '', 'Pins take space from cooling.', 'Mould design textbooks', 2],
      ['Warped moulded part', 'effect', 0.6, 0.6, '', 'Ejection can warp a soft part.', 'Troubleshooting guides', 3],
      ['Tool rework', 'related', 0.45, 0.4, '', 'Adding pins is a common rework.', 'Toolmaking practice', 3],
    ], [
      ['Ejecting too early', 'Ejector pin distortion', 0.75, 'Early ejection shows up as pin damage.', 'Troubleshooting guides', 3],
    ]],
  },

  'Cooling fixtures': {
    liner: 'Jigs that hold parts in shape while they finish cooling after ejection.',
    about: 'A cooling fixture clamps or supports a part straight from the press so the last of its shrinkage happens against a flat or correctly shaped surface. It works because the part is still warm enough to set in the held shape. It treats the symptom, not the cause, and adds handling, but it can rescue a part while the tool is fixed.',
    check: ['Trial a simple flat plate with weights on ten parts and measure after 24 hours.', 'Check how long parts must stay held before they stop moving.', 'Count the fixtures needed at the cycle time.'],
    wiki: '',
    src: [[3, 'Guide', 'Moulding troubleshooting guides on post-mould fixturing'], [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier, 2013)']],
    reading: 'You went into cooling fixtures, so I split them into why they work, how they are designed and what they cost.',
    subs: [
      ['Why they work', 'Warm parts set in the shape they are held in.', 'Explains timing.', 'Shrinkage handbooks', 2, [1], [
        ['Post-mould shrinkage', '', 0.8, 'The shrinkage still to happen.', 'Shrinkage handbooks', 2, [1]],
        ['Core temperature', '', 0.7, 'Hot cores keep moving.', 'Heat-transfer physics', 2, [1]],
      ]],
      ['Designing one', 'Shape, clamping and time.', 'Simple usually works.', 'Process guides', 3, [0], [
        ['Restrained fixture', '', 0.6, 'Same idea as a measuring fixture.', 'Process guides', 3, [0]],
        ['Cooling conveyor', '', 0.5, 'A gentler alternative.', 'Process guides', 3, [0]],
      ]],
      ['What it costs', 'Labour and floor space.', 'A stopgap.', 'Process guides', 3, [0], [
        ['Cost per part', '', 0.6, 'Handling adds cost.', 'Costing practice', 4, [0]],
        ['Tool rework', '', 0.55, 'The permanent fix it buys time for.', 'Toolmaking practice', 3, [0]],
      ]],
    ],
    conn: [
      ['Core temperature', 'Post-mould shrinkage', 'drives', 0.75, 'The hotter the core, the more shrinkage to come.', 'Heat-transfer physics', 2, [1]],
      ['Cost per part', 'Tool rework', 'is weighed against', 0.6, 'Fixture cost versus a one-off tool change.', 'My inference', 6, []],
      ['Restrained fixture', 'Cooling conveyor', 'is the alternative to', 0.4, 'Supported cooling without clamping.', 'Process guides', 3, [0]],
    ],
    threads: [['Post-mould shrinkage', 'How much will it still shrink?', 'Explains whether a fixture can work.'], ['Ejecting too early', 'Should parts just stay in the mould longer?', 'The alternative fix.'], ['Annealing', 'Would annealing on a fixture be better?', 'The combined approach.']],
    map: ['You expanded cooling fixtures, so I mapped what they fix and their alternatives.', [
      ['Post-mould shrinkage', 'cause', 0.8, 0.8, '', 'The movement they control.', 'Shrinkage handbooks', 2],
      ['Ejecting too early', 'cause', 0.7, 0.7, '', 'Early ejection makes fixtures necessary.', 'Process guides', 3],
      ['Hot parts stacked in boxes', 'related', 0.7, 0.65, '', 'Fixtures replace hot boxing.', 'Process guides', 3],
      ['Cooling conveyor', 'related', 0.6, 0.5, '', 'A gentler alternative.', 'Process guides', 3],
      ['Annealing', 'related', 0.5, 0.45, '', 'Often done on a fixture.', 'Process guides', 3],
      ['Warped moulded part', 'effect', 0.7, 0.7, '', 'Fixtures reduce warp.', 'Process guides', 3],
      ['Cost per part', 'effect', 0.5, 0.4, '', 'Adds handling.', 'Costing practice', 4],
    ], [
      ['Ejecting too early', 'Post-mould shrinkage', 0.7, 'Earlier ejection means more shrinkage outside.', 'Shrinkage handbooks', 2],
    ]],
  },

  'Tolerance stack-up': {
    liner: 'Adding up every tolerance in a chain of parts to see whether the assembly can still fit.',
    about: 'Each part in an assembly is made within a tolerance, and the gaps and overlaps that matter depend on several of them at once. A worst-case stack adds them all; a statistical (root-sum-square) stack assumes they rarely all go the wrong way together. Warp is often missing from the stack because drawings give flatness separately, so the real assembly fails even though every part is "in tolerance".',
    check: ['List every dimension in the chain for the failing feature.', 'Add flatness or warp of each part into the chain.', 'Compare worst-case and RSS totals with the available clearance.'],
    wiki: '',
    src: [[2, 'Textbook', 'Fischer, B. R. Mechanical Tolerance Stackup and Analysis, 2nd ed. (CRC Press, 2011)'], [1, 'Standard', 'ASME Y14.5: Dimensioning and Tolerancing']],
    reading: 'You went into the tolerance stack, so I split it into the chain itself, the methods and where warp goes missing.',
    subs: [
      ['The chain', 'Every dimension between the two surfaces that matter.', 'Getting it complete is the hard part.', 'Tolerancing textbooks', 2, [0], [
        ['Mating part', '', 0.75, 'The other half of the chain.', 'Tolerancing textbooks', 2, [0]],
        ['Fastener spacing', '', 0.5, 'Fixings change which tolerances count.', 'Tolerancing textbooks', 2, [0]],
      ]],
      ['The methods', 'Worst case versus statistical.', 'Different risks.', 'Tolerancing textbooks', 2, [0], [
        ['Process capability', '', 0.7, 'Statistical stacks need real capability data.', 'Tolerancing textbooks', 2, [0]],
        ['Measurement method', '', 0.55, 'Numbers depend on how they are measured.', 'ASME Y14.5', 1, [1]],
      ]],
      ['Where warp goes missing', 'Flatness left out of the chain.', 'The common gap.', 'My inference from practice', 6, [], [
        ['Flatness tolerances', '', 0.8, 'Specified apart from size.', 'ASME Y14.5', 1, [1]],
        ['Free-state variation', '', 0.6, 'Parts that fit when clamped but not free.', 'ASME Y14.5', 1, [1]],
      ]],
    ],
    conn: [
      ['Flatness tolerances', 'Mating part', 'adds to', 0.7, 'Each part’s flatness eats into the shared clearance.', 'Tolerancing textbooks', 2, [0]],
      ['Process capability', 'Free-state variation', 'must include', 0.45, 'Capability studies often measure parts restrained.', 'My inference', 6, []],
      ['Measurement method', 'Free-state variation', 'decides', 0.6, 'Restrained or free measurement changes the number.', 'ASME Y14.5', 1, [1]],
    ],
    threads: [['Flatness tolerances', 'Is flatness in my stack at all?', 'Usually the missing term.'], ['Assembly fit failure', 'Which feature actually fails?', 'Back to the symptom.'], ['Measurement method', 'Are we measuring parts the way they sit?', 'Free versus restrained.']],
    map: ['You expanded the stack-up, so I mapped what feeds it and what it predicts.', [
      ['Shrinkage off target', 'cause', 0.7, 0.65, '', 'Size errors feed the stack.', 'Tolerancing textbooks', 2],
      ['Mating part warp', 'cause', 0.7, 0.7, '', 'The other part’s warp is in the chain too.', 'Tolerancing textbooks', 2],
      ['Flatness tolerances', 'related', 0.8, 0.8, '', 'Often left out.', 'ASME Y14.5', 1],
      ['Assembly fit failure', 'effect', 0.85, 0.85, '', 'What a bad stack predicts.', 'Tolerancing textbooks', 2],
      ['Visible gaps and flushness', 'effect', 0.6, 0.55, '', 'Stacks set seam gaps.', 'Tolerancing textbooks', 2],
      ['Measurement method', 'related', 0.55, 0.5, '', 'How each number is measured.', 'ASME Y14.5', 1],
    ], [
      ['Mating part warp', 'Assembly fit failure', 0.75, 'Both parts’ warp add up at the seam.', 'Tolerancing textbooks', 2],
    ]],
  },

  'Snap-fit hooks': {
    liner: 'Flexible hooks that bend, slide over a catch and spring back to lock two parts together.',
    about: 'A snap fit works only if the hook bends enough to pass the catch without breaking, and overlaps it enough to hold. Both depend on hook length, thickness, the resin’s allowable strain and how far the two parts sit apart. A warped part shifts that distance, so hooks either fail to engage or overstrain and crack. Hooks are also thick features on thin walls, so they can cause local sink or warp themselves.',
    check: ['Measure engagement on assembled parts: how much overlap is left?', 'Check whether failing hooks sit where the part is warped most.', 'Compare the hook’s strain with the resin’s allowable strain.'],
    wiki: 'Snap-fit',
    src: [[2, 'Guide', 'Bonenberger, P. R. The First Snap-Fit Handbook, 3rd ed. (Hanser, 2016)'], [4, 'Guide', 'Resin supplier snap-fit design guides (allowable strain)'], [3, 'Encyclopedia', 'Snap-fit, Wikipedia']],
    reading: 'You went inside snap fits, so I split them into the hook geometry, the material limits and how warp makes them fail.',
    subs: [
      ['The hook', 'Length, thickness, taper.', 'Sets the strain.', 'Snap-fit design guides', 2, [0], [
        ['Root radius', '', 0.75, 'A sharp root concentrates strain.', 'Snap-fit design guides', 2, [0]],
        ['Snap engagement', '', 0.75, 'How far the hook overlaps.', 'Snap-fit design guides', 2, [0]],
      ]],
      ['The material', 'How far it can bend.', 'The limit.', 'Resin design guides', 4, [1], [
        ['Material selection trade-offs', '', 0.6, 'Allowable strain differs a lot by resin.', 'Resin design guides', 4, [1]],
        ['Weld lines', '', 0.55, 'A weld at the root halves strength.', 'Design guides', 3, [0]],
      ]],
      ['Why they fail', 'Warp and tolerance shifting the overlap.', 'The link to warp.', 'My inference from practice', 6, [], [
        ['Tolerance stack-up', '', 0.7, 'The overlap is a stack-up.', 'Tolerancing textbooks', 2, [0]],
        ['Boss alignment', '', 0.45, 'Screws and snaps fight each other if misaligned.', 'My inference', 6, []],
      ]],
    ],
    conn: [
      ['Root radius', 'Weld lines', 'compounds with', 0.55, 'A sharp root on a weld is the weakest possible hook.', 'Design guides', 3, [0]],
      ['Snap engagement', 'Tolerance stack-up', 'is set by', 0.75, 'Engagement is what is left after the stack.', 'Tolerancing textbooks', 2, [0]],
      ['Material selection trade-offs', 'Root radius', 'tolerates more or less', 0.45, 'Tough resins forgive tight roots more.', 'My inference', 6, []],
    ],
    threads: [['Assembly fit failure', 'Are the hooks the failing feature?', 'Back to the symptom.'], ['Tolerance stack-up', 'How much overlap is left after tolerances?', 'The calculation.'], ['Weld lines', 'Is there a weld at the hook root?', 'A hidden weakness.']],
    map: ['You expanded snap-fit hooks, so I mapped what makes them fail and what they affect.', [
      ['Snap fits failing', 'effect', 0.85, 0.85, '', 'The symptom.', 'Snap-fit design guides', 2],
      ['Warped moulded part', 'cause', 0.75, 0.8, '', 'Warp shifts the overlap.', 'My inference', 6],
      ['Tolerance stack-up', 'related', 0.7, 0.65, '', 'Sets the overlap.', 'Tolerancing textbooks', 2],
      ['Weld lines', 'cause', 0.5, 0.5, '', 'A weld at the root weakens it.', 'Design guides', 3],
      ['Non-uniform wall thickness', 'related', 0.55, 0.45, '', 'Thick hooks on thin walls.', 'Part design textbooks', 2],
      ['Assembly fit failure', 'effect', 0.8, 0.75, '', 'Failed snaps stop assembly.', 'Snap-fit design guides', 2],
    ], [
      ['Warped moulded part', 'Snap fits failing', 0.7, 'Warp takes away engagement.', 'My inference', 6],
    ]],
  },

  'Gasket compression range': {
    liner: 'How much a gasket must be squeezed to seal: enough to close gaps, not so much it takes a set.',
    about: 'A compression gasket seals when it is squeezed by roughly 15 to 40% of its height, depending on material. Below the window it leaves gaps; above it the material overstrains and takes a permanent set, then leaks later. A flange that warps or bows between screws varies the squeeze along its length, so one stretch can be under-compressed even when the average is right.',
    check: ['Measure the gap the gasket must fill all round the flange, not just at screws.', 'Check the gasket supplier’s compression range for that hardness.', 'Look for compression set on gaskets from leaking units.'],
    wiki: 'Gasket',
    src: [[4, 'Guide', 'Seal supplier design guides for compression gaskets'], [3, 'Encyclopedia', 'Gasket, Wikipedia']],
    reading: 'You went into the compression window, so I split it into the gasket, the flange that squeezes it and how to check it.',
    subs: [
      ['The gasket', 'Material and shape.', 'Sets the window.', 'Seal design guides', 4, [0], [
        ['Gasket hardness', '', 0.75, 'Softer gaskets tolerate more variation.', 'Seal design guides', 4, [0]],
        ['Liquid gasket or overmould', '', 0.5, 'Alternatives with different windows.', 'Seal design guides', 4, [0]],
      ]],
      ['The flange', 'What sets the squeeze.', 'Where warp enters.', 'Seal design guides', 4, [0], [
        ['Flange flatness', '', 0.85, 'A bowed flange varies the squeeze.', 'Seal design guides', 4, [0]],
        ['Screw pitch', '', 0.7, 'Wide spacing lets the flange lift between screws.', 'Seal design guides', 4, [0]],
      ]],
      ['Checking it', 'Seeing the squeeze.', 'Before an IP test.', 'Test practice', 4, [0], [
        ['Immersion test', '', 0.6, 'The pass/fail.', 'IEC 60529', 1, []],
        ['Leak location', '', 0.65, 'Where it leaks shows where squeeze is lowest.', 'Test practice', 4, [0]],
      ]],
    ],
    conn: [
      ['Flange flatness', 'Leak location', 'predicts', 0.7, 'Leaks start where the flange bows away.', 'Seal design guides', 4, [0]],
      ['Screw pitch', 'Flange flatness', 'limits the effect of', 0.65, 'Closer screws pull a bowed flange flat.', 'Seal design guides', 4, [0]],
      ['Gasket hardness', 'Flange flatness', 'can absorb', 0.55, 'A softer gasket takes up more bow.', 'Seal design guides', 4, [0]],
    ],
    threads: [['Seal and IP rating failure', 'Is the seal failing because of warp?', 'Back to the failure.'], ['Flatness tolerances', 'How flat must the flange be?', 'Sets the design number.'], ['Screw bosses', 'Can I add screws to close the gap?', 'A design fix.']],
    map: ['You expanded the compression range, so I mapped what moves the squeeze and what happens outside it.', [
      ['Flange stiffness', 'cause', 0.75, 0.75, '', 'A soft flange lifts between screws.', 'Seal design guides', 4],
      ['Screw spacing', 'cause', 0.7, 0.7, '', 'Wider spacing, more variation.', 'Seal design guides', 4],
      ['Warped moulded part', 'cause', 0.8, 0.8, '', 'Warp varies the squeeze.', 'Seal design guides', 4],
      ['Water ingress', 'effect', 0.75, 0.7, '', 'Too little squeeze leaks.', 'Seal design guides', 4],
      ['IP test failure', 'effect', 0.7, 0.65, '', 'Shows up at test.', 'Test practice', 4],
      ['Liquid gasket or overmould', 'related', 0.5, 0.4, '', 'Different sealing approach.', 'Seal design guides', 4],
    ], [
      ['Warped moulded part', 'Water ingress', 0.7, 'Warp opens gaps the gasket can’t fill.', 'Seal design guides', 4],
    ]],
  },

  'Dryer problems': {
    liner: 'Dryers that don’t get resin dry: wrong temperature, too little time, or exhausted desiccant.',
    about: 'Moisture-sensitive resins are dried in desiccant dryers that blow hot, very dry air through a hopper. They fail quietly: a saturated desiccant bed lets the dew point rise, a hopper too small for the throughput cuts residence time, and a wrong setpoint either under-dries or yellows the resin. The moulded part looks fine at first, but strength and dimensions drift.',
    check: ['Read the dryer’s dew point: it should be around −40 °C.', 'Check hopper size against kg per hour to get residence time.', 'Test pellets from the hopper outlet with a moisture analyser.'],
    wiki: 'Dew point',
    src: [[4, 'Guide', 'Resin supplier drying recommendations (temperature, time, target moisture)'], [3, 'Guide', 'Dryer manufacturer manuals on desiccant regeneration']],
    reading: 'You went inside dryer problems, so I split them into the air, the time and checking the result.',
    subs: [
      ['The air', 'Dry enough and hot enough.', 'Desiccant dryers depend on it.', 'Dryer manuals', 3, [1], [
        ['Dew point', '', 0.85, 'How dry the air is.', 'Dryer manuals', 3, [1]],
        ['Humid seasons', '', 0.55, 'Summer loads the desiccant faster.', 'Dryer manuals', 3, [1]],
      ]],
      ['The time', 'Long enough in the hopper.', 'Throughput decides it.', 'Resin processing guides', 4, [0], [
        ['Residence time', '', 0.8, 'Hours at temperature.', 'Resin processing guides', 4, [0]],
        ['Over-drying', '', 0.5, 'Too long can degrade some resins.', 'Resin processing guides', 4, [0]],
      ]],
      ['Checking it', 'Measuring moisture, not trusting the dryer.', 'The only proof.', 'Resin processing guides', 4, [0], [
        ['Moisture analyser', '', 0.8, 'Weighs moisture in a sample.', 'Resin processing guides', 4, [0]],
        ['Hydrolysis', '', 0.6, 'What happens if it is wet.', 'Polymer science textbooks', 2, [0]],
      ]],
    ],
    conn: [
      ['Dew point', 'Moisture analyser', 'is confirmed by', 0.7, 'A good dew point means little unless the pellets test dry.', 'Resin processing guides', 4, [0]],
      ['Residence time', 'Hydrolysis', 'too short leads to', 0.6, 'Under-dried resin hydrolyses in the barrel.', 'Polymer science textbooks', 2, [0]],
      ['Humid seasons', 'Dew point', 'raises', 0.55, 'Wet air exhausts the desiccant faster.', 'Dryer manuals', 3, [1]],
    ],
    threads: [['Wet resin', 'Is wet resin causing my problem?', 'The symptom.'], ['Hydrolysis', 'Has moisture already damaged the resin?', 'The chemistry.'], ['Resin batch or supplier change', 'Is it the lot, not the dryer?', 'The look-alike.']],
    map: ['You expanded dryer problems, so I mapped what causes them and what they lead to.', [
      ['Hygroscopic resins', 'cause', 0.8, 0.8, '', 'Only these need drying.', 'Resin processing guides', 4],
      ['Humid seasons', 'cause', 0.6, 0.55, '', 'Load on the dryer.', 'Dryer manuals', 3],
      ['Wet resin', 'effect', 0.9, 0.85, '', 'The result.', 'Resin processing guides', 4],
      ['Splay marks', 'effect', 0.65, 0.6, '', 'Visible sign.', 'Troubleshooting guides', 3],
      ['Brittleness', 'effect', 0.6, 0.55, '', 'Hidden sign.', 'Troubleshooting guides', 3],
      ['Moisture analyser', 'related', 0.7, 0.65, '', 'The check.', 'Resin processing guides', 4],
      ['Hydrolysis', 'related', 0.65, 0.6, '', 'The damage.', 'Polymer science textbooks', 2],
    ], [
      ['Hygroscopic resins', 'Wet resin', 0.8, 'These resins pick up water fastest.', 'Resin processing guides', 4],
    ]],
  },

  'Hydrolysis': {
    liner: 'Water breaking polymer chains apart in the hot barrel, leaving a weaker, runnier resin.',
    about: 'At melt temperature, water reacts with polyesters, polycarbonate and polyamides and cuts their chains. Shorter chains mean lower viscosity, so the resin flows more easily and packs differently, and the moulded parts are more brittle. The damage is permanent: drying the regrind afterwards can’t join the chains again.',
    check: ['Compare melt flow index of moulded parts with the virgin pellets: a big rise means degradation.', 'Look for easy flow and short-shot changes after drying problems.', 'Do an impact or bend test on suspect parts.'],
    wiki: 'Hydrolysis',
    src: [[2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'], [3, 'Encyclopedia', 'Hydrolysis, Wikipedia']],
    reading: 'You went inside hydrolysis, so I split it into the chemistry, which resins suffer and what it does to parts.',
    subs: [
      ['The chemistry', 'Water cutting chains at high temperature.', 'Why it is permanent.', 'Polymer science textbooks', 2, [0], [
        ['Melt temperature', '', 0.7, 'Hotter melts react faster.', 'Polymer science textbooks', 2, [0]],
        ['Molecular weight spread', '', 0.75, 'Cut chains shift the distribution.', 'Polymer science textbooks', 2, [0]],
      ]],
      ['Who suffers', 'Condensation polymers.', 'PET, PBT, PC, PA.', 'Polymer science textbooks', 2, [0], [
        ['Hygroscopic resins', '', 0.8, 'The ones that absorb water.', 'Polymer science textbooks', 2, [0]],
        ['Dryer problems', '', 0.7, 'How the water gets there.', 'Resin processing guides', 4, [0]],
      ]],
      ['What it does', 'Weaker, runnier resin.', 'What you see.', 'Failure analysis practice', 3, [0], [
        ['Brittleness', '', 0.8, 'Shorter chains snap.', 'Failure analysis practice', 3, [0]],
        ['Melt flow index', '', 0.65, 'MFI rises after degradation.', 'Testing practice', 3, [0]],
      ]],
    ],
    conn: [
      ['Molecular weight spread', 'Brittleness', 'causes', 0.8, 'Lower molecular weight means lower toughness.', 'Polymer science textbooks', 2, [0]],
      ['Melt flow index', 'Molecular weight spread', 'reveals', 0.7, 'MFI rises as chains get shorter.', 'Testing practice', 3, [0]],
      ['Dryer problems', 'Melt temperature', 'combines with', 0.5, 'Wet resin at high melt temperature is the worst case.', 'My inference', 6, []],
    ],
    threads: [['Dryer problems', 'Is the dryer letting wet resin through?', 'The source.'], ['Melt flow index', 'Can MFI show the damage?', 'The test.'], ['Wet resin', 'What else does wet resin do?', 'The wider symptom set.']],
    map: ['You expanded hydrolysis, so I mapped its causes and effects.', [
      ['Wet resin', 'cause', 0.9, 0.9, '', 'Water is the reactant.', 'Polymer science textbooks', 2],
      ['Dryer problems', 'cause', 0.75, 0.75, '', 'How water gets in.', 'Resin processing guides', 4],
      ['Hygroscopic resins', 'related', 0.75, 0.7, '', 'The resins at risk.', 'Polymer science textbooks', 2],
      ['Brittleness', 'effect', 0.8, 0.8, '', 'Weaker parts.', 'Failure analysis practice', 3],
      ['Melt flow index', 'related', 0.6, 0.55, '', 'How to measure it.', 'Testing practice', 3],
      ['Process variation', 'effect', 0.5, 0.45, '', 'Changing viscosity changes packing.', 'My inference', 6],
    ], [
      ['Wet resin', 'Brittleness', 0.75, 'Hydrolysis is how wet resin becomes brittle.', 'Polymer science textbooks', 2],
    ]],
  },

  'Nucleating agents': {
    liner: 'Additives, including some pigments, that give crystals somewhere to start.',
    about: 'Crystals need a surface to begin on. Nucleating agents provide millions of those sites, so a semi-crystalline resin crystallises faster, at a higher temperature and into smaller spherulites. That stiffens it and shortens cycles, but it can also make shrinkage more direction-dependent. Some pigments, notably phthalocyanine blues and greens, nucleate polypropylene strongly, which is why one colour of a part can warp while another doesn’t.',
    check: ['Compare warp across colours of the same part.', 'Run DSC on two colours: a higher crystallisation temperature means nucleation.', 'Ask the masterbatch supplier whether the pigment is known to nucleate.'],
    wiki: 'Nucleation',
    src: [[2, 'Textbook', 'Pasquini, N. (ed.) Polypropylene Handbook, 2nd ed. (Hanser, 2005)'], [2, 'Paper', 'Studies of pigment nucleation in polypropylene (e.g. phthalocyanine pigments)'], [3, 'Encyclopedia', 'Nucleation, Wikipedia']],
    reading: 'You went inside nucleating agents, so I split them into how they work, where they come from and what they change.',
    subs: [
      ['How they work', 'More starting points for crystals.', 'Faster, finer crystallisation.', 'Polymer science textbooks', 2, [0], [
        ['Spherulite growth', '', 0.75, 'More nuclei, smaller spherulites.', 'Polymer science textbooks', 2, [0]],
        ['DSC measurement', '', 0.6, 'Shows the shift in crystallisation temperature.', 'Testing practice', 3, [0]],
      ]],
      ['Where they come from', 'Added on purpose or by accident.', 'Pigments surprise people.', 'Studies of pigment nucleation', 2, [1], [
        ['Masterbatch colour', '', 0.8, 'Some pigments nucleate.', 'Studies of pigment nucleation', 2, [1]],
        ['Regrind', '', 0.4, 'Reprocessed material can crystallise differently.', 'My inference', 6, []],
      ]],
      ['What they change', 'Stiffness, cycle and anisotropy.', 'Good and bad.', 'Polypropylene handbooks', 2, [0], [
        ['Direction-dependent shrinkage', '', 0.7, 'Nucleated PP often shrinks more unevenly by direction.', 'Polypropylene handbooks', 2, [0]],
        ['Stiffness and heat resistance', '', 0.6, 'More crystals, stiffer part.', 'Polypropylene handbooks', 2, [0]],
      ]],
    ],
    conn: [
      ['Masterbatch colour', 'Direction-dependent shrinkage', 'can increase', 0.7, 'Nucleating pigments make PP shrink more anisotropically, so one colour warps.', 'Studies of pigment nucleation', 2, [1]],
      ['Spherulite growth', 'Stiffness and heat resistance', 'raises', 0.6, 'Finer, more numerous crystals stiffen the part.', 'Polymer science textbooks', 2, [0]],
      ['DSC measurement', 'Masterbatch colour', 'can compare', 0.55, 'DSC shows whether a colour shifts crystallisation.', 'Testing practice', 3, [0]],
    ],
    threads: [['Crystallinity', 'How much crystallinity does the part reach?', 'The wider property.'], ['Resin batch or supplier change', 'Did a colour or masterbatch change?', 'Where nucleation sneaks in.'], ['DSC measurement', 'Can I measure the difference?', 'The test.']],
    map: ['You expanded nucleating agents, so I mapped where they come from and what they change.', [
      ['Colourant and pigment', 'cause', 0.8, 0.8, '', 'Pigments can nucleate.', 'Studies of pigment nucleation', 2],
      ['Crystallinity', 'effect', 0.85, 0.8, '', 'They change how crystals form.', 'Polymer science textbooks', 2],
      ['Direction-dependent shrinkage', 'effect', 0.7, 0.7, '', 'Can make shrinkage more directional.', 'Polypropylene handbooks', 2],
      ['Semi-crystalline polymers', 'related', 0.75, 0.6, '', 'Only these respond.', 'Polymer science textbooks', 2],
      ['DSC measurement', 'related', 0.6, 0.55, '', 'Measures their effect.', 'Testing practice', 3],
      ['Shorter cycle time', 'effect', 0.5, 0.4, '', 'Faster crystallisation means earlier ejection.', 'Polypropylene handbooks', 2],
    ], [
      ['Colourant and pigment', 'Direction-dependent shrinkage', 0.65, 'A colour change can change warp.', 'Studies of pigment nucleation', 2],
    ]],
  },
};

Object.assign(window.CELESTIAL_DEMO_CONTENT.more, {
  'Molecular orientation': {
    liner: 'Polymer chains stretched out along the flow and frozen before they can coil back up.',
    about: 'Flowing melt stretches its long chains in the flow direction. Near the cold steel they freeze while still stretched; in the hot core they have time to relax. Stretched chains shrink differently along and across the flow, and they hold stress that can come out later. Fast filling, cold moulds and thin walls all increase orientation.',
    check: ['In clear parts, view between crossed polarisers to see orientation patterns.', 'Compare shrinkage along and across the flow on a plaque.', 'Try a slower fill or warmer mould and see whether warp changes.'],
    wiki: '',
    src: [[2, 'Textbook', 'Tadmor, Z. & Gogos, C. G. Principles of Polymer Processing, 2nd ed. (Wiley, 2006)'], [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier, 2013)']],
    reading: 'You went inside molecular orientation, so I split it into what stretches the chains, what freezes them and what that does to the part.',
    subs: [
      ['Stretching', 'Shear and extension in the flow.', 'Where orientation starts.', 'Polymer processing textbooks', 2, [0], [
        ['Shear near the walls', '', 0.8, 'Highest shear, highest orientation.', 'Polymer processing textbooks', 2, [0]],
        ['Spreading flow', '', 0.6, 'Fan-shaped flow stretches across too.', 'Polymer processing textbooks', 2, [0]],
      ]],
      ['Freezing it in', 'Cooling before relaxing.', 'Decides how much stays.', 'Polymer processing textbooks', 2, [0], [
        ['Frozen skin layer', '', 0.8, 'The skin keeps its orientation.', 'Polymer processing textbooks', 2, [0]],
        ['Mould temperature', '', 0.7, 'A warmer tool allows relaxation.', 'Polymer processing textbooks', 2, [0]],
      ]],
      ['What it does', 'Direction-dependent shrinkage and stress.', 'The consequences.', 'Shrinkage handbooks', 2, [1], [
        ['Direction-dependent shrinkage', '', 0.85, 'Shrinks differently by direction.', 'Shrinkage handbooks', 2, [1]],
        ['Moulded-in residual stress', '', 0.7, 'Stretched chains hold stress.', 'Studies of residual stress', 2, [1]],
      ]],
    ],
    conn: [
      ['Shear near the walls', 'Frozen skin layer', 'is locked in by', 0.8, 'Shear is highest exactly where the skin freezes first.', 'Polymer processing textbooks', 2, [0]],
      ['Mould temperature', 'Moulded-in residual stress', 'reduces', 0.6, 'More relaxation, less stress.', 'Polymer processing textbooks', 2, [0]],
      ['Spreading flow', 'Direction-dependent shrinkage', 'sets the pattern of', 0.6, 'The flow pattern from the gate decides the shrinkage map.', 'Shrinkage handbooks', 2, [1]],
    ],
    threads: [['Direction-dependent shrinkage', 'How much does orientation make shrinkage directional?', 'Its main warp effect.'], ['Frozen skin layer', 'How thick is the oriented skin?', 'Where orientation lives.'], ['Gate location', 'Can the gate change the orientation pattern?', 'The design lever.']],
    map: ['You expanded molecular orientation, so I mapped what drives it and what it causes.', [
      ['Gate location', 'cause', 0.75, 0.7, '', 'Sets flow direction.', 'Gating handbooks', 2],
      ['Shear near the walls', 'cause', 0.7, 0.7, '', 'Shear stretches chains.', 'Polymer processing textbooks', 2],
      ['Direction-dependent shrinkage', 'effect', 0.9, 0.85, '', 'The main consequence.', 'Shrinkage handbooks', 2],
      ['Moulded-in residual stress', 'effect', 0.75, 0.7, '', 'Stretched chains hold stress.', 'Studies of residual stress', 2],
      ['Glass-fibre orientation', 'related', 0.7, 0.6, '', 'Fibres line up the same way.', 'Studies of fibre-filled mouldings', 2],
      ['Crystallinity', 'related', 0.55, 0.45, '', 'Oriented chains crystallise faster.', 'Polymer science textbooks', 2],
      ['Mould temperature', 'related', 0.6, 0.55, '', 'Warmer steel relaxes orientation.', 'Polymer processing textbooks', 2],
    ], [
      ['Gate location', 'Direction-dependent shrinkage', 0.7, 'The gate sets which way chains point.', 'Shrinkage handbooks', 2],
    ]],
  },

  'Frozen skin layer': {
    liner: 'The thin layer that freezes against the cold steel while the rest of the wall is still molten.',
    about: 'As melt flows along a cold mould wall, a solid skin forms almost at once and grows inward while the core keeps flowing. The skin freezes oriented and early; the core cools slowly, crystallises more in semi-crystalline resins and shrinks more. This skin-core difference sets up stress through the wall, and if the two faces cool at different rates the skins differ in thickness and the part bends.',
    check: ['Section a part and look at it under polarised light to see the skin.', 'Compare core and cavity temperatures: unequal faces give unequal skins.', 'Try a faster fill: it thins the skin.'],
    wiki: '',
    src: [[2, 'Textbook', 'Tadmor, Z. & Gogos, C. G. Principles of Polymer Processing, 2nd ed. (Wiley, 2006)'], [2, 'Paper', 'Studies of skin-core morphology in injection-moulded polypropylene']],
    reading: 'You went inside the frozen skin, so I split it into how it forms, how it differs from the core and what that does to warp.',
    subs: [
      ['How it forms', 'Fountain flow laying melt onto cold steel.', 'Sets thickness.', 'Polymer processing textbooks', 2, [0], [
        ['Mould temperature', '', 0.75, 'Colder steel, thicker skin.', 'Polymer processing textbooks', 2, [0]],
        ['Shear near the walls', '', 0.65, 'Orients the skin.', 'Polymer processing textbooks', 2, [0]],
      ]],
      ['Skin versus core', 'Different structure, different shrinkage.', 'The mismatch.', 'Studies of skin-core morphology', 2, [1], [
        ['Core shrinkage', '', 0.8, 'The core shrinks more.', 'Studies of skin-core morphology', 2, [1]],
        ['Crystallinity', '', 0.6, 'Core crystallises more.', 'Studies of skin-core morphology', 2, [1]],
      ]],
      ['Effect on warp', 'Unequal skins on the two faces.', 'How it bends parts.', 'Shrinkage handbooks', 2, [0], [
        ['Asymmetric cooling', '', 0.8, 'Faces at different temperatures grow different skins.', 'Shrinkage handbooks', 2, [0]],
        ['Moulded-in residual stress', '', 0.7, 'Skin-core stress.', 'Studies of residual stress', 2, [0]],
      ]],
    ],
    conn: [
      ['Mould temperature', 'Asymmetric cooling', 'is unequal in', 0.75, 'A hotter half grows a thinner skin, so the part bows.', 'Shrinkage handbooks', 2, [0]],
      ['Core shrinkage', 'Moulded-in residual stress', 'sets up', 0.7, 'The core pulls on the stiff skin.', 'Studies of residual stress', 2, [0]],
      ['Shear near the walls', 'Crystallinity', 'raises in the skin layer', 0.45, 'Shear-induced crystals form just under the skin.', 'Studies of skin-core morphology', 2, [1]],
    ],
    threads: [['Core and cavity at different temperatures', 'Are my two faces growing different skins?', 'The warp route.'], ['Molecular orientation', 'How oriented is the skin?', 'Its structure.'], ['Moulded-in residual stress', 'How much stress does the skin hold?', 'The hidden effect.']],
    map: ['You expanded the frozen skin, so I mapped what shapes it and what it affects.', [
      ['Mould temperature', 'cause', 0.75, 0.7, '', 'Sets how fast the skin grows.', 'Polymer processing textbooks', 2],
      ['Skin-core shrinkage', 'effect', 0.85, 0.8, '', 'The mismatch it creates.', 'Studies of residual stress', 2],
      ['Moulded-in residual stress', 'effect', 0.75, 0.7, '', 'Stress through the wall.', 'Studies of residual stress', 2],
      ['Core and cavity at different temperatures', 'cause', 0.7, 0.75, '', 'Unequal faces, unequal skins.', 'Shrinkage handbooks', 2],
      ['Molecular orientation', 'related', 0.7, 0.6, '', 'The skin is highly oriented.', 'Polymer processing textbooks', 2],
      ['Sink marks', 'related', 0.5, 0.4, '', 'A thin skin lets sinks form.', 'Part design textbooks', 2],
    ], [
      ['Core and cavity at different temperatures', 'Skin-core shrinkage', 0.65, 'Unequal skins make the mismatch asymmetric.', 'Shrinkage handbooks', 2],
    ]],
  },

  'Regrind': {
    liner: 'Scrap and runners ground up and fed back in with new material.',
    about: 'Grinding scrap and runners back into the feed saves material, but each pass through the barrel shortens some chains, breaks fibres and can change colour and crystallisation. Up to about 15 to 25% regrind is common for many parts; the trouble comes when the share swings, because viscosity and shrinkage then swing with it. Fines and dust in the regrind also melt unevenly.',
    check: ['Find out whether the regrind share is controlled or varies with how much scrap there is.', 'Compare parts made with and without regrind.', 'Check glass-filled regrind for fibre length.'],
    wiki: '',
    src: [[3, 'Guide', 'Resin supplier guidance on regrind use'], [2, 'Textbook', 'Rosato, D. V. et al. Injection Molding Handbook, 3rd ed. (Springer, 2000)']],
    reading: 'You went into regrind, so I split it into what reprocessing does, how the share is controlled and when it hurts.',
    subs: [
      ['What reprocessing does', 'Heat history and grinding.', 'Each pass changes the resin.', 'Processing handbooks', 2, [1], [
        ['Molecular weight spread', '', 0.75, 'Chains shorten.', 'Polymer science textbooks', 2, [1]],
        ['Fibre breakage', '', 0.7, 'Fibres get shorter.', 'Studies of fibre-filled mouldings', 2, [1]],
      ]],
      ['The share', 'How much and how steady.', 'Steadiness matters more than level.', 'Supplier guidance', 3, [0], [
        ['Regrind share', '', 0.85, 'The proportion in the feed.', 'Supplier guidance', 3, [0]],
        ['Lot traceability', '', 0.45, 'Records of what went where.', 'Quality practice', 4, [0]],
      ]],
      ['When it hurts', 'Critical parts and swinging shares.', 'The risk.', 'Supplier guidance', 3, [0], [
        ['Process variation', '', 0.75, 'Swinging regrind swings the process.', 'Supplier guidance', 3, [0]],
        ['Melt flow index', '', 0.6, 'Regrind raises MFI.', 'Testing practice', 3, [1]],
      ]],
    ],
    conn: [
      ['Regrind share', 'Process variation', 'drives when it swings', 0.75, 'A varying share changes viscosity shot to shot.', 'Supplier guidance', 3, [0]],
      ['Molecular weight spread', 'Melt flow index', 'shows as', 0.7, 'Shorter chains raise MFI.', 'Testing practice', 3, [1]],
      ['Fibre breakage', 'Regrind share', 'grows with', 0.6, 'More regrind, shorter average fibre.', 'Studies of fibre-filled mouldings', 2, [1]],
    ],
    threads: [['Resin batch or supplier change', 'Is it the regrind or the virgin lot?', 'The look-alike.'], ['Process variation', 'Does the process drift with regrind?', 'The mechanism.'], ['Melt flow index', 'How much has MFI changed?', 'The test.']],
    map: ['You expanded regrind, so I mapped why it is used and what it changes.', [
      ['Resin cost pressure', 'cause', 0.75, 0.6, '', 'Saves material cost.', 'Supplier guidance', 3],
      ['Scrap rate and cost', 'cause', 0.6, 0.5, '', 'Scrap becomes regrind.', 'Costing practice', 4],
      ['Process variation', 'effect', 0.75, 0.75, '', 'Swinging share, swinging process.', 'Supplier guidance', 3],
      ['Fibre content and length', 'effect', 0.6, 0.55, '', 'Fibres shorten.', 'Studies of fibre-filled mouldings', 2],
      ['Melt flow index', 'related', 0.6, 0.55, '', 'Rises with regrind.', 'Testing practice', 3],
      ['Resin batch or supplier change', 'related', 0.6, 0.6, '', 'Both change the feed.', 'Supplier guidance', 3],
      ['Lot traceability', 'related', 0.45, 0.4, '', 'Tracks what went in.', 'Quality practice', 4],
    ], [
      ['Scrap rate and cost', 'Process variation', 0.5, 'More scrap, more regrind, more variation: a loop.', 'My inference', 6],
    ]],
  },

  'Melt flow index': {
    liner: 'A quick lab number for how easily a resin flows: grams through a die in ten minutes.',
    about: 'MFI (or MFR) is measured by pushing molten resin through a standard die under a set weight and temperature. A higher number means easier flow and usually shorter chains. Suppliers certify it per lot, so it is the first thing to compare when material seems to have changed, but it is a single-point test at low shear and can miss differences that matter in moulding.',
    check: ['Compare the certificate MFI of good and bad lots.', 'Test moulded parts against virgin pellets to see degradation.', 'Remember MFI is measured at low shear: two lots with equal MFI can still mould differently.'],
    wiki: 'Melt flow index',
    src: [[1, 'Standard', 'ISO 1133: determination of melt mass-flow rate'], [1, 'Standard', 'ASTM D1238: melt flow rates of thermoplastics'], [3, 'Encyclopedia', 'Melt flow index, Wikipedia']],
    reading: 'You went into melt flow index, so I split it into the test, what it tells you and its limits.',
    subs: [
      ['The test', 'Weight, temperature and die.', 'Standardised.', 'ISO 1133', 1, [0], [
        ['Incoming material checks', '', 0.7, 'Often done on arrival.', 'Quality practice', 4, [0]],
        ['Lot records', '', 0.55, 'The certificate value per lot.', 'Quality practice', 4, [0]],
      ]],
      ['What it tells you', 'Chain length and flow.', 'A proxy.', 'Polymer science textbooks', 2, [0], [
        ['Molecular weight spread', '', 0.75, 'Higher MFI, shorter chains.', 'Polymer science textbooks', 2, [0]],
        ['Hydrolysis', '', 0.6, 'Degradation raises MFI.', 'Polymer science textbooks', 2, [0]],
      ]],
      ['Its limits', 'Low shear, one point.', 'Why equal MFI isn’t equal resin.', 'Rheology textbooks', 2, [1], [
        ['Material data', '', 0.65, 'Full viscosity curves say more.', 'Simulation documentation', 4, [1]],
        ['Lot-to-lot variation', '', 0.6, 'Lots can differ in ways MFI misses.', 'Rheology textbooks', 2, [1]],
      ]],
    ],
    conn: [
      ['Molecular weight spread', 'Lot-to-lot variation', 'can differ despite equal MFI', 0.6, 'Two lots can share an MFI but not a distribution.', 'Rheology textbooks', 2, [1]],
      ['Hydrolysis', 'Incoming material checks', 'is caught only after moulding', 0.45, 'Incoming checks test pellets, not the degraded melt.', 'My inference', 6, []],
      ['Material data', 'Lot records', 'goes beyond', 0.4, 'Full rheology data is rarely part of lot certificates.', 'My inference', 6, []],
    ],
    threads: [['Resin batch or supplier change', 'Has the material changed?', 'What MFI is used to check.'], ['Hydrolysis', 'Has moisture degraded the resin?', 'MFI shows it.'], ['Material data', 'What data would describe flow properly?', 'Beyond one number.']],
    map: ['You expanded melt flow index, so I mapped what it reflects and where it is used.', [
      ['Lot-to-lot variation', 'related', 0.75, 0.75, '', 'MFI is the first check.', 'Quality practice', 4],
      ['Incoming material checks', 'related', 0.75, 0.7, '', 'Where it is measured.', 'Quality practice', 4],
      ['Hydrolysis', 'cause', 0.6, 0.55, '', 'Raises MFI.', 'Polymer science textbooks', 2],
      ['Regrind', 'cause', 0.55, 0.5, '', 'Raises MFI.', 'Supplier guidance', 3],
      ['Resin batch or supplier change', 'related', 0.75, 0.7, '', 'What it helps diagnose.', 'Quality practice', 4],
      ['Material data', 'related', 0.5, 0.45, '', 'Fuller flow data.', 'Simulation documentation', 4],
    ], [
      ['Hydrolysis', 'Regrind', 0.4, 'Both shorten chains.', 'Polymer science textbooks', 2],
    ]],
  },

  'Warp compensation': {
    liner: 'Recutting the mould so the part warps into the shape you actually wanted.',
    about: 'When warp is consistent and the causes can’t be removed, toolmakers cut the cavity "pre-bent" the other way so the part relaxes into spec. It relies on a stable process: if warp varies, a compensated tool just moves the average. It is usually done from scan data of trial parts, sometimes guided by warp simulation, and often takes more than one iteration.',
    check: ['Confirm the warp is repeatable shot to shot and cavity to cavity first.', 'Scan parts after 24 hours, not at the press.', 'Plan for two loops: cut, trial, adjust.'],
    wiki: '',
    src: [[2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier, 2013)'], [4, 'Documentation', 'Warpage simulation software documentation on compensated geometry export']],
    reading: 'You went inside warp compensation, so I split it into when it works, how it is done and how it is proven.',
    subs: [
      ['When it works', 'Stable, repeatable warp.', 'The precondition.', 'Shrinkage handbooks', 2, [0], [
        ['Stable process first', '', 0.85, 'Variation defeats compensation.', 'Shrinkage handbooks', 2, [0]],
        ['Process fixes exhausted', '', 0.65, 'Usually the last resort.', 'Toolmaking practice', 3, [0]],
      ]],
      ['Doing it', 'From scans or simulation.', 'The method.', 'Toolmaking practice', 3, [1], [
        ['3D scanning', '', 0.8, 'Measures the actual warp shape.', 'Metrology practice', 3, [0]],
        ['Mould flow simulation', '', 0.6, 'Predicts the shape to cut.', 'Simulation documentation', 4, [1]],
      ]],
      ['Proving it', 'Trials and measurement.', 'The loop.', 'Toolmaking practice', 3, [0], [
        ['24-hour measurement', '', 0.7, 'Measure the settled shape.', 'ISO 294-4', 1, []],
        ['Lost production time', '', 0.5, 'Each loop takes the tool out.', 'Toolmaking practice', 3, [0]],
      ]],
    ],
    conn: [
      ['Stable process first', '3D scanning', 'is required before', 0.75, 'Scan a stable process, or you compensate for noise.', 'Shrinkage handbooks', 2, [0]],
      ['Mould flow simulation', '3D scanning', 'is checked against', 0.6, 'Simulated compensation is confirmed by scanning trial parts.', 'Simulation documentation', 4, [1]],
      ['24-hour measurement', 'Lost production time', 'adds to', 0.45, 'Waiting a day per loop lengthens the rework.', 'My inference', 6, []],
    ],
    threads: [['Tool rework', 'What else could a rework change?', 'The wider set of tool fixes.'], ['Process variation', 'Is my warp stable enough to compensate?', 'The precondition.'], ['Mould flow simulation', 'Can simulation predict the compensation?', 'Saves a loop.']],
    map: ['You expanded warp compensation, so I mapped when to use it and what it needs.', [
      ['Process fixes exhausted', 'cause', 0.75, 0.7, '', 'The usual trigger.', 'Toolmaking practice', 3],
      ['Tool rework', 'related', 0.85, 0.8, '', 'A kind of rework.', 'Toolmaking practice', 3],
      ['Process variation', 'related', 0.7, 0.7, '', 'Must be low for it to work.', 'Shrinkage handbooks', 2],
      ['Mould flow simulation', 'related', 0.65, 0.6, '', 'Can predict the cut.', 'Simulation documentation', 4],
      ['Warped moulded part', 'effect', 0.8, 0.8, '', 'Cancels a repeatable warp.', 'Shrinkage handbooks', 2],
      ['Lost production time', 'effect', 0.5, 0.45, '', 'Tool out for each loop.', 'Toolmaking practice', 3],
    ], [
      ['Process variation', 'Warped moulded part', 0.6, 'Variable warp can’t be compensated away.', 'Shrinkage handbooks', 2],
    ]],
  },

  'Metal 3D printing': {
    liner: 'Building mould inserts layer by layer from metal powder, so cooling channels can go anywhere.',
    about: 'Laser powder bed fusion melts thin layers of tool-steel powder to build an insert with channels inside that follow the part’s shape. That is what makes conformal cooling possible. Printed inserts cost more and need careful heat treatment and finishing, and their narrow, rough channels need clean water. Hybrid builds print only the top on a machined base to save cost.',
    check: ['Ask which steel the insert is printed in and how it is heat-treated.', 'Check the channel size and whether it can be cleaned.', 'Compare the printed insert cost with cycle and scrap savings.'],
    wiki: 'Selective laser melting',
    src: [[2, 'Paper', 'Reviews of conformal cooling with additively manufactured mould inserts'], [3, 'Encyclopedia', 'Selective laser melting, Wikipedia']],
    reading: 'You went inside metal printing, so I split it into the process, what it allows and what to watch.',
    subs: [
      ['The process', 'Powder, laser, layers.', 'How inserts are made.', 'Additive manufacturing reviews', 2, [0], [
        ['Powder bed printing', '', 0.85, 'Laser melting of powder.', 'Additive manufacturing reviews', 2, [0]],
        ['Hybrid inserts', '', 0.65, 'Print on a machined base.', 'Additive manufacturing reviews', 2, [0]],
      ]],
      ['What it allows', 'Channels that follow the surface.', 'The reason to print.', 'Additive manufacturing reviews', 2, [0], [
        ['Conformal cooling', '', 0.9, 'The main use.', 'Additive manufacturing reviews', 2, [0]],
        ['Hard-to-cool geometry', '', 0.7, 'Where it pays off.', 'Additive manufacturing reviews', 2, [0]],
      ]],
      ['What to watch', 'Cost, finish and fouling.', 'The trade-offs.', 'Additive manufacturing reviews', 2, [0], [
        ['Insert cost', '', 0.7, 'More than machining.', 'Additive manufacturing reviews', 2, [0]],
        ['Channel fouling', '', 0.65, 'Narrow rough channels block.', 'Maintenance practice', 3, [0]],
      ]],
    ],
    conn: [
      ['Powder bed printing', 'Channel fouling', 'leaves rough channels prone to', 0.6, 'As-printed channel walls are rough and scale faster.', 'Maintenance practice', 3, [0]],
      ['Hybrid inserts', 'Insert cost', 'reduces', 0.6, 'Printing only the top costs less.', 'Additive manufacturing reviews', 2, [0]],
      ['Hard-to-cool geometry', 'Insert cost', 'justifies', 0.55, 'The harder to cool, the better the payback.', 'My inference', 6, []],
    ],
    threads: [['Conformal cooling', 'Would conformal channels fix my hot spots?', 'What printing is for.'], ['Scale and blockage', 'Will printed channels block?', 'The main risk.'], ['Tool rework', 'Can a printed insert be retrofitted?', 'How it reaches existing tools.']],
    map: ['You expanded metal printing, so I mapped what it enables and costs.', [
      ['Conformal cooling', 'effect', 0.9, 0.85, '', 'Printing is what makes it possible.', 'Additive manufacturing reviews', 2],
      ['Hard-to-cool geometry', 'cause', 0.7, 0.7, '', 'The reason to print.', 'Additive manufacturing reviews', 2],
      ['Insert cost', 'effect', 0.65, 0.6, '', 'More than machined.', 'Additive manufacturing reviews', 2],
      ['Channel fouling', 'effect', 0.6, 0.55, '', 'A risk with fine channels.', 'Maintenance practice', 3],
      ['Cycle time savings', 'effect', 0.6, 0.55, '', 'Better cooling, shorter cycles.', 'Additive manufacturing reviews', 2],
      ['Tool rework', 'related', 0.45, 0.4, '', 'Printed inserts can be retrofitted.', 'Toolmaking practice', 3],
    ], [
      ['Hard-to-cool geometry', 'Conformal cooling', 0.75, 'Printing makes channels reach those areas.', 'Additive manufacturing reviews', 2],
    ]],
  },

  'Emissivity of steel': {
    liner: 'How much heat a surface radiates; polished steel radiates little, so a thermal camera reads it too cold.',
    about: 'A thermal camera estimates temperature from the infrared a surface gives off. Polished tool steel has an emissivity as low as 0.1 to 0.3, so it mostly reflects its surroundings and reads far cooler than it really is. Textured or oxidised areas read closer to the truth, which can make a mould look uneven when it isn’t. Matt tape or paint spots, or comparing with a contact probe, fix the reading.',
    check: ['Put a spot of high-emissivity tape on the steel and compare with the bare surface.', 'Check a few points with a contact thermocouple.', 'Look for “hot spots” that line up with texture rather than with cooling.'],
    wiki: 'Emissivity',
    src: [[2, 'Textbook', 'Vollmer, M. & Möllmann, K.-P. Infrared Thermal Imaging, 2nd ed. (Wiley-VCH, 2017)'], [3, 'Encyclopedia', 'Emissivity, Wikipedia']],
    reading: 'You went into emissivity, so I split it into the physics, what it does to a mould image and how to correct it.',
    subs: [
      ['The physics', 'Emission versus reflection.', 'Why shiny surfaces lie.', 'Thermography textbooks', 2, [0], [
        ['Temperature range', '', 0.5, 'The camera’s calibrated span.', 'Thermography textbooks', 2, [0]],
        ['Resolution', '', 0.4, 'Pixel size against the feature.', 'Thermography textbooks', 2, [0]],
      ]],
      ['On a mould', 'Polish, texture and reflections.', 'False patterns.', 'Thermography textbooks', 2, [0], [
        ['Hot spots in the steel', '', 0.75, 'Real ones versus reflective artefacts.', 'Thermography textbooks', 2, [0]],
        ['Textured surfaces', '', 0.6, 'Texture reads hotter than polish.', 'Thermography textbooks', 2, [0]],
      ]],
      ['Correcting it', 'Reference spots and probes.', 'Making numbers trustworthy.', 'Thermography textbooks', 2, [0], [
        ['Mould temperature sensors', '', 0.7, 'Contact readings for comparison.', 'Thermography textbooks', 2, [0]],
        ['Imaging the part', '', 0.55, 'Plastic has high emissivity and reads truer.', 'Thermography textbooks', 2, [0]],
      ]],
    ],
    conn: [
      ['Textured surfaces', 'Hot spots in the steel', 'can fake', 0.65, 'A textured patch reads hotter than polished steel at the same temperature.', 'Thermography textbooks', 2, [0]],
      ['Mould temperature sensors', 'Hot spots in the steel', 'confirms', 0.7, 'A probe tells real hot spots from reflections.', 'Thermography textbooks', 2, [0]],
      ['Imaging the part', 'Resolution', 'needs less of', 0.35, 'Part images are more forgiving.', 'My inference', 6, []],
    ],
    threads: [['Thermal imaging of the mould', 'How do I take a trustworthy image?', 'The full method.'], ['Core and cavity at different temperatures', 'Are the halves really different?', 'What the image is for.'], ['Heat transfer', 'What temperatures should I expect?', 'The physics.']],
    map: ['You expanded emissivity, so I mapped what it affects in mould imaging.', [
      ['Thermal imaging of the mould', 'related', 0.9, 0.85, '', 'The method it affects.', 'Thermography textbooks', 2],
      ['Hot spots in the steel', 'effect', 0.7, 0.65, '', 'Can fake or hide hot spots.', 'Thermography textbooks', 2],
      ['Textured surfaces', 'related', 0.55, 0.5, '', 'Texture reads differently.', 'Thermography textbooks', 2],
      ['Mould temperature sensors', 'related', 0.6, 0.55, '', 'The contact check.', 'Thermography textbooks', 2],
      ['Imaging the part', 'related', 0.55, 0.5, '', 'Plastic reads truer.', 'Thermography textbooks', 2],
    ], [
      ['Textured surfaces', 'Hot spots in the steel', 0.6, 'Texture can look like a hot spot.', 'Thermography textbooks', 2],
    ]],
  },

  'Rib design rules': {
    liner: 'Ribs about half the wall thick, tapered, filleted at the root and spaced well apart.',
    about: 'Ribs add stiffness without thickening the wall, but where a rib meets the wall it creates a thick junction. The common rules are a rib 50 to 60% of the wall (less for high-shrink resins), height up to about three times the wall, 0.5 to 1.5° draft, a root radius of about a quarter to half the wall, and spacing at least twice the wall. Breaking them shows up as sinks, voids and warp.',
    check: ['Measure the inscribed circle at each rib root against the wall.', 'Check rib spacing and height.', 'Look at whether ribs sit on one face only.'],
    wiki: '',
    src: [[2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'], [4, 'Guide', 'Resin supplier part design guides (rib proportions)']],
    reading: 'You went into the rib rules, so I split them into thickness, shape and layout.',
    subs: [
      ['Thickness', 'Rib against wall.', 'Controls the junction.', 'Part design textbooks', 2, [0], [
        ['Rib-to-wall ratio', '', 0.85, 'The core rule.', 'Part design textbooks', 2, [0]],
        ['Inscribed circle', '', 0.7, 'How thick the junction really is.', 'Part design textbooks', 2, [0]],
      ]],
      ['Shape', 'Draft, radius, height.', 'Mouldability.', 'Part design textbooks', 2, [0], [
        ['Root radius', '', 0.7, 'Fillets reduce stress but add mass.', 'Part design textbooks', 2, [0]],
        ['Draft and radii', '', 0.6, 'Tall ribs need draft to release.', 'Part design textbooks', 2, [0]],
      ]],
      ['Layout', 'Spacing and sides.', 'Warp comes from layout.', 'Part design textbooks', 2, [1], [
        ['One-sided ribbing', '', 0.75, 'Ribs on one face bow a flat part.', 'Part design textbooks', 2, [0]],
        ['More, thinner ribs', '', 0.65, 'Same stiffness, less mass per junction.', 'Supplier design guides', 4, [1]],
      ]],
    ],
    conn: [
      ['Root radius', 'Inscribed circle', 'enlarges', 0.7, 'A bigger fillet makes the junction thicker.', 'Part design textbooks', 2, [0]],
      ['Rib-to-wall ratio', 'More, thinner ribs', 'leads to', 0.6, 'Thinner ribs need more of them for the same stiffness.', 'Supplier design guides', 4, [1]],
      ['One-sided ribbing', 'Draft and radii', 'interacts with', 0.35, 'Drafted ribs still pull one face.', 'My inference', 6, []],
    ],
    threads: [['Thick ribs and bosses', 'Which of my ribs break the rules?', 'Back to the problem.'], ['Nominal wall guidelines', 'Is the wall itself right?', 'Ribs are sized from it.'], ['Sink marks', 'Are the ribs sinking the show face?', 'The first symptom.']],
    map: ['You expanded the rib rules, so I mapped what they prevent and what they connect to.', [
      ['Thick ribs and bosses', 'related', 0.85, 0.85, '', 'What breaking them creates.', 'Part design textbooks', 2],
      ['Sink marks', 'effect', 0.7, 0.65, '', 'Prevented by thin ribs.', 'Part design textbooks', 2],
      ['Nominal wall guidelines', 'related', 0.75, 0.7, '', 'Ribs are sized from the wall.', 'Part design textbooks', 2],
      ['Stiffness targets', 'cause', 0.6, 0.55, '', 'Why ribs are there.', 'Part design textbooks', 2],
      ['Design for manufacture', 'related', 0.65, 0.6, '', 'Part of the DFM rules.', 'Part design textbooks', 2],
      ['Voids', 'effect', 0.55, 0.5, '', 'Thick roots void.', 'Part design textbooks', 2],
    ], [
      ['Thick ribs and bosses', 'Sink marks', 0.7, 'Thick ribs show as sinks.', 'Part design textbooks', 2],
    ]],
  },

  'Draft and radii': {
    liner: 'Tapered walls so the part releases, and rounded corners so plastic flows and cools evenly.',
    about: 'Draft, typically 0.5 to 2° and more on textured faces, lets a shrinking part slide off the core without being dragged or bent. Radii soften corners: an inside radius about half the wall and an outside radius equal to inside plus wall keep the corner the same thickness as the walls, which keeps it cooling at the same rate. Sharp corners concentrate stress and heat.',
    check: ['Check draft on walls that grip the core, especially textured ones.', 'Compare inside and outside radii at corners against the wall.', 'Look for drag marks or whitening on ejection.'],
    wiki: 'Draft (engineering)',
    src: [[2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'], [3, 'Encyclopedia', 'Draft (engineering), Wikipedia']],
    reading: 'You went into draft and radii, so I split them into release, corners and texture.',
    subs: [
      ['Release', 'Getting the part off the core.', 'Draft’s job.', 'Part design textbooks', 2, [0], [
        ['Ejector pin layout', '', 0.7, 'Less draft, more force on pins.', 'Mould design textbooks', 2, [0]],
        ['Ejection temperature', '', 0.5, 'A hot part grips harder.', 'Process guides', 3, [0]],
      ]],
      ['Corners', 'Even thickness round the bend.', 'Radii’s job.', 'Part design textbooks', 2, [0], [
        ['Uniform corner thickness', '', 0.85, 'Matched radii keep thickness even.', 'Part design textbooks', 2, [0]],
        ['Inside corners', '', 0.7, 'Where corner heat builds up.', 'Mould design textbooks', 2, [0]],
      ]],
      ['Texture', 'Grain needs extra draft.', 'Often forgotten.', 'Texture supplier guides', 4, [0], [
        ['Textured surfaces', '', 0.75, 'About 1° extra per 0.025 mm depth.', 'Texture supplier guides', 4, [0]],
        ['Cosmetic rejects', '', 0.5, 'Drag marks on textured faces.', 'Quality practice', 4, [0]],
      ]],
    ],
    conn: [
      ['Textured surfaces', 'Ejector pin layout', 'raises the force on', 0.6, 'Texture grips, so pins push harder.', 'Mould design textbooks', 2, [0]],
      ['Uniform corner thickness', 'Inside corners', 'cools evenly at', 0.7, 'An even corner doesn’t lag the walls.', 'Part design textbooks', 2, [0]],
      ['Ejection temperature', 'Cosmetic rejects', 'adds drag marks', 0.4, 'A soft part scuffs more on release.', 'My inference', 6, []],
    ],
    threads: [['Inside corners', 'Are my corners cooling late?', 'Where radii matter for warp.'], ['Ejector pin layout', 'Is ejection pushing the part out of shape?', 'Where draft matters for warp.'], ['Design for manufacture', 'What other rules apply?', 'The wider checklist.']],
    map: ['You expanded draft and radii, so I mapped what they affect.', [
      ['Ejector pin distortion', 'effect', 0.65, 0.6, '', 'Too little draft bends parts on ejection.', 'Mould design textbooks', 2],
      ['Inside corners', 'related', 0.7, 0.7, '', 'Radii set corner thickness.', 'Part design textbooks', 2],
      ['Uniform corner thickness', 'related', 0.75, 0.7, '', 'The radius rule.', 'Part design textbooks', 2],
      ['Textured surfaces', 'related', 0.6, 0.5, '', 'Needs extra draft.', 'Texture supplier guides', 4],
      ['Design for manufacture', 'related', 0.7, 0.6, '', 'Part of DFM.', 'Part design textbooks', 2],
      ['Walls leaning inward', 'effect', 0.55, 0.55, '', 'Sharp inside corners pull walls in.', 'Part design textbooks', 2],
    ], [
      ['Inside corners', 'Walls leaning inward', 0.65, 'Hot corners pull walls in.', 'Part design textbooks', 2],
    ]],
  },
});

Object.assign(window.CELESTIAL_DEMO_CONTENT.more, {
  'Cost of quality': {
    liner: 'Adding up everything poor quality costs: scrap, rework, inspection, returns and lost time.',
    about: 'Cost of quality splits spending into prevention (design reviews, simulation), appraisal (inspection, measurement), internal failure (scrap, rework) and external failure (returns, complaints, lost customers). For a warp problem, the visible scrap is often the smaller part; sorting, expediting and customer claims add more. Putting the full number on the table is what justifies a tool change.',
    check: ['Add sorting labour, expediting and claims to the scrap figure.', 'Split costs into prevention, appraisal, internal and external failure.', 'Compare the yearly total with the cost of the fix.'],
    wiki: 'Cost of quality',
    src: [[2, 'Textbook', 'Juran, J. M. & De Feo, J. A. Juran’s Quality Handbook, 7th ed. (McGraw-Hill, 2016)'], [3, 'Encyclopedia', 'Cost of quality, Wikipedia']],
    reading: 'You went into cost of quality, so I split it into the four kinds of cost and how they make the case for a fix.',
    subs: [
      ['Failure costs', 'Internal and external.', 'The ones warp creates.', 'Quality handbooks', 2, [0], [
        ['Machine time lost', '', 0.75, 'Press hours on scrap.', 'Costing practice', 4, [0]],
        ['Returns and complaints', '', 0.75, 'External failures cost most.', 'Quality handbooks', 2, [0]],
      ]],
      ['Appraisal costs', 'Inspection and measurement.', 'Grows when trust falls.', 'Quality handbooks', 2, [0], [
        ['Inspection criteria', '', 0.65, 'What is checked and how often.', 'Quality practice', 4, [0]],
        ['Measurement method', '', 0.5, 'Time per measurement.', 'Metrology practice', 3, [0]],
      ]],
      ['Prevention costs', 'Design and process work up front.', 'Cheapest per problem.', 'Quality handbooks', 2, [0], [
        ['Mould flow simulation', '', 0.6, 'Catches warp before steel.', 'Simulation documentation', 4, [0]],
        ['Payback period', '', 0.65, 'How fast a fix repays.', 'Costing practice', 4, [0]],
      ]],
    ],
    conn: [
      ['Returns and complaints', 'Payback period', 'shortens', 0.65, 'Counting external costs makes fixes pay back faster.', 'Quality handbooks', 2, [0]],
      ['Inspection criteria', 'Machine time lost', 'trades off with', 0.45, 'Tighter inspection catches more but scraps more.', 'My inference', 6, []],
      ['Mould flow simulation', 'Machine time lost', 'prevents', 0.5, 'Problems designed out never reach the press.', 'Quality handbooks', 2, [0]],
    ],
    threads: [['Scrap rate and cost', 'What does scrap alone cost?', 'The visible part.'], ['Tool rework', 'Is a tool fix worth it?', 'The decision this informs.'], ['Process variation', 'How much is variation costing?', 'A hidden driver.']],
    map: ['You expanded cost of quality, so I mapped what feeds it and what it justifies.', [
      ['Scrap rate and cost', 'cause', 0.8, 0.8, '', 'Scrap is the largest internal failure.', 'Quality handbooks', 2],
      ['Returns and complaints', 'cause', 0.7, 0.7, '', 'External failures.', 'Quality handbooks', 2],
      ['Machine time lost', 'cause', 0.65, 0.6, '', 'Press hours wasted.', 'Costing practice', 4],
      ['Tool rework', 'effect', 0.6, 0.6, '', 'What a high number justifies.', 'Costing practice', 4],
      ['Late deliveries', 'cause', 0.55, 0.5, '', 'Expediting and penalties.', 'Costing practice', 4],
      ['Inspection criteria', 'related', 0.5, 0.45, '', 'Appraisal cost.', 'Quality practice', 4],
    ], [
      ['Scrap rate and cost', 'Tool rework', 0.6, 'Scrap cost funds the fix.', 'Costing practice', 4],
    ]],
  },

  'DSC measurement': {
    liner: 'Differential scanning calorimetry: heating a tiny sample to measure how much of it was crystalline.',
    about: 'DSC heats a few milligrams of plastic alongside an empty reference pan and records the extra heat needed. Melting crystals absorb heat, so the size of the melting peak gives the degree of crystallinity; cooling scans show where crystallisation starts. Samples cut from skin and core, or from good and warped parts, reveal differences you can’t see.',
    check: ['Cut samples from the same spot on good and bad parts.', 'Compare skin with core in a thick section.', 'Run a cooling scan on two colours to check for nucleation.'],
    wiki: 'Differential scanning calorimetry',
    src: [[1, 'Standard', 'ISO 11357: differential scanning calorimetry of plastics'], [3, 'Encyclopedia', 'Differential scanning calorimetry, Wikipedia']],
    reading: 'You went into DSC, so I split it into how it works, what it reads and how to sample a moulded part.',
    subs: [
      ['How it works', 'Heat flow against a reference.', 'The principle.', 'ISO 11357', 1, [0], [
        ['Glass transition', '', 0.6, 'Shows as a step in heat flow.', 'ISO 11357', 1, [0]],
        ['Crystallisation heat', '', 0.75, 'Shows as a peak.', 'ISO 11357', 1, [0]],
      ]],
      ['What it reads', 'Crystallinity and nucleation.', 'The useful numbers.', 'Polymer science textbooks', 2, [0], [
        ['Crystallinity increase', '', 0.6, 'Compares before and after annealing.', 'Polymer science textbooks', 2, [0]],
        ['Nucleating agents', '', 0.65, 'Raise crystallisation temperature.', 'Polymer science textbooks', 2, [0]],
      ]],
      ['Sampling a part', 'Where you cut matters.', 'Parts vary inside.', 'Testing practice', 3, [0], [
        ['Frozen skin layer', '', 0.65, 'Skin differs from core.', 'Studies of skin-core morphology', 2, [0]],
        ['Retained samples', '', 0.45, 'Compare with old lots.', 'Quality practice', 4, [0]],
      ]],
    ],
    conn: [
      ['Nucleating agents', 'Crystallisation heat', 'shift the peak of', 0.7, 'Nucleated resin crystallises at a higher temperature.', 'Polymer science textbooks', 2, [0]],
      ['Frozen skin layer', 'Crystallinity increase', 'often has less', 0.5, 'Skins quench before crystallising fully.', 'Studies of skin-core morphology', 2, [0]],
      ['Retained samples', 'Glass transition', 'can confirm grade by', 0.35, 'Tg is a fingerprint of the polymer.', 'My inference', 6, []],
    ],
    threads: [['Crystallinity', 'How crystalline are my parts?', 'What DSC measures.'], ['Nucleating agents', 'Is a pigment nucleating?', 'A common use.'], ['Annealing', 'Did annealing raise crystallinity?', 'Before and after.']],
    map: ['You expanded DSC, so I mapped what it measures and helps decide.', [
      ['Crystallinity', 'related', 0.9, 0.85, '', 'What it measures.', 'ISO 11357', 1],
      ['Nucleating agents', 'related', 0.65, 0.6, '', 'Detected by a shift.', 'Polymer science textbooks', 2],
      ['Glass transition', 'related', 0.55, 0.5, '', 'Also visible.', 'ISO 11357', 1],
      ['Resin batch or supplier change', 'related', 0.55, 0.55, '', 'Compares lots.', 'Testing practice', 3],
      ['Annealing', 'related', 0.5, 0.45, '', 'Measures its effect.', 'Polymer science textbooks', 2],
    ], [
      ['Nucleating agents', 'Crystallinity', 0.65, 'Nucleation changes crystallinity.', 'Polymer science textbooks', 2],
    ]],
  },

  'Glass transition': {
    liner: 'The temperature where a glassy, rigid polymer softens into a rubbery one.',
    about: 'Below its glass transition temperature (Tg) an amorphous polymer is stiff; above it the chains can move and it softens. For ABS it is around 105 °C, for PC around 145 °C. Moulded-in stress relaxes quickly near Tg, which is why parts that sit near a heater or in a hot car warp. Semi-crystalline resins have a Tg too, but their crystals keep them stiff above it.',
    check: ['Compare the service temperature with Tg (or heat deflection temperature).', 'Heat a part to 20 °C below Tg for an hour and see if it moves.', 'Check whether failures cluster in hot environments.'],
    wiki: 'Glass transition',
    src: [[2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'], [3, 'Encyclopedia', 'Glass transition, Wikipedia']],
    reading: 'You went into the glass transition, so I split it into what happens there, which resins it limits and what it does to stress.',
    subs: [
      ['What happens', 'Chains start to move.', 'The physics.', 'Polymer science textbooks', 2, [0], [
        ['Tangled chains', '', 0.7, 'Amorphous structure.', 'Polymer science textbooks', 2, [0]],
        ['DSC measurement', '', 0.55, 'Measures Tg.', 'ISO 11357', 1, [0]],
      ]],
      ['Which resins', 'Amorphous ones most.', 'Where it limits use.', 'Polymer science textbooks', 2, [0], [
        ['Amorphous polymers', '', 0.8, 'Soften above Tg.', 'Polymer science textbooks', 2, [0]],
        ['Stiffness and heat resistance', '', 0.6, 'Crystals extend the range.', 'Polymer science textbooks', 2, [0]],
      ]],
      ['Effect on stress', 'Relaxation near Tg.', 'The warp link.', 'Studies of residual stress', 2, [0], [
        ['Delayed warp', '', 0.75, 'Heat near Tg releases stress.', 'Studies of residual stress', 2, [0]],
        ['Annealing', '', 0.65, 'Done just below Tg on purpose.', 'Process guides', 3, [0]],
      ]],
    ],
    conn: [
      ['Tangled chains', 'Delayed warp', 'move and release', 0.7, 'Mobile chains near Tg let stress come out.', 'Polymer science textbooks', 2, [0]],
      ['Annealing', 'Delayed warp', 'triggers early', 0.6, 'Annealing near Tg releases the warp under control.', 'Process guides', 3, [0]],
      ['Stiffness and heat resistance', 'Amorphous polymers', 'is limited in', 0.55, 'Without crystals, Tg is the ceiling.', 'Polymer science textbooks', 2, [0]],
    ],
    threads: [['Amorphous polymers', 'Is my resin amorphous?', 'Where Tg matters most.'], ['Annealing', 'What temperature should I anneal at?', 'Set from Tg.'], ['Moulded-in residual stress', 'How much stress is waiting to come out?', 'What heat releases.']],
    map: ['You expanded the glass transition, so I mapped what it governs.', [
      ['Amorphous polymers', 'related', 0.85, 0.8, '', 'Their main temperature limit.', 'Polymer science textbooks', 2],
      ['Delayed warp', 'effect', 0.7, 0.7, '', 'Heat near Tg releases stress.', 'Studies of residual stress', 2],
      ['Annealing', 'related', 0.65, 0.6, '', 'Set just below Tg.', 'Process guides', 3],
      ['Dimensional stability', 'related', 0.6, 0.55, '', 'Holds below Tg.', 'Polymer science textbooks', 2],
      ['Semi-crystalline polymers', 'related', 0.5, 0.4, '', 'Crystals extend past Tg.', 'Polymer science textbooks', 2],
      ['DSC measurement', 'related', 0.45, 0.4, '', 'Measures it.', 'ISO 11357', 1],
    ], [
      ['Annealing', 'Delayed warp', 0.6, 'Annealing pre-empts delayed warp.', 'Process guides', 3],
    ]],
  },

  'Environmental stress cracking': {
    liner: 'Cracks that appear when a stressed part meets certain chemicals, often well below its normal strength.',
    about: 'Some chemicals, such as oils, cleaners, plasticisers and alcohols, don’t dissolve a plastic but let crazes grow where it is under tension. Amorphous resins like ABS, PC and PMMA are the most vulnerable. The stress can be moulded in, applied by a screw or snap, or created by forcing a warped part flat. It is a leading cause of plastic part failures in service.',
    check: ['List every chemical the part touches, including hand cream and cleaning sprays.', 'Look for cracks starting at bosses, snaps or weld lines.', 'Run a bent-strip test with the suspect chemical.'],
    wiki: 'Environmental stress cracking',
    src: [[2, 'Textbook', 'Wright, D. C. Environmental Stress Cracking of Plastics (Rapra, 1996)'], [1, 'Standard', 'ISO 22088: determination of resistance to environmental stress cracking'], [3, 'Encyclopedia', 'Environmental stress cracking, Wikipedia']],
    reading: 'You went into stress cracking, so I split it into the stress, the chemical and the resin.',
    subs: [
      ['The stress', 'Moulded in or applied.', 'One of two ingredients.', 'Failure analysis practice', 2, [0], [
        ['Moulded-in residual stress', '', 0.8, 'Locked in at moulding.', 'Failure analysis practice', 2, [0]],
        ['Boss cracking', '', 0.65, 'Screws apply hoop stress.', 'Failure analysis practice', 2, [0]],
      ]],
      ['The chemical', 'What the part touches.', 'The other ingredient.', 'ISO 22088', 1, [1], [
        ['Chemical exposure', '', 0.8, 'Oils, cleaners, plasticisers.', 'ISO 22088', 1, [1]],
        ['Liquid gasket or overmould', '', 0.4, 'Some sealants attack housings.', 'My inference', 6, []],
      ]],
      ['The resin', 'Amorphous versus semi-crystalline.', 'Sets vulnerability.', 'Failure analysis practice', 2, [0], [
        ['Amorphous polymers', '', 0.75, 'Most vulnerable.', 'Failure analysis practice', 2, [0]],
        ['Chemical resistance', '', 0.65, 'Semi-crystalline grades resist better.', 'Material guides', 4, [0]],
      ]],
    ],
    conn: [
      ['Moulded-in residual stress', 'Chemical exposure', 'cracks when meeting', 0.8, 'Neither alone cracks the part; together they do.', 'Failure analysis practice', 2, [0]],
      ['Boss cracking', 'Amorphous polymers', 'is common in', 0.6, 'ABS and PC bosses crack with the wrong screw or chemical.', 'Failure analysis practice', 2, [0]],
      ['Chemical resistance', 'Liquid gasket or overmould', 'must be checked against', 0.4, 'Check sealant compatibility.', 'My inference', 6, []],
    ],
    threads: [['Moulded-in residual stress', 'How much stress is in the part?', 'One half of the cause.'], ['Material selection trade-offs', 'Should I switch to a resistant resin?', 'The material fix.'], ['Screw bosses', 'Are the bosses where cracks start?', 'A common origin.']],
    map: ['You expanded stress cracking, so I mapped its ingredients and consequences.', [
      ['Moulded-in residual stress', 'cause', 0.85, 0.85, '', 'The stress.', 'Failure analysis practice', 2],
      ['Chemical resistance', 'related', 0.75, 0.7, '', 'The resin’s defence.', 'Material guides', 4],
      ['Amorphous polymers', 'related', 0.75, 0.7, '', 'Most vulnerable.', 'Failure analysis practice', 2],
      ['Boss cracking', 'effect', 0.6, 0.55, '', 'A common form.', 'Failure analysis practice', 2],
      ['Returns and complaints', 'effect', 0.6, 0.55, '', 'Cracks in service.', 'Failure analysis practice', 2],
      ['Annealing', 'related', 0.5, 0.45, '', 'Lowers the stress.', 'Process guides', 3],
    ], [
      ['Moulded-in residual stress', 'Boss cracking', 0.55, 'Stress at bosses cracks first.', 'Failure analysis practice', 2],
    ]],
  },

  'Material data': {
    liner: 'The measured properties a simulation runs on: viscosity, pressure-volume-temperature and shrinkage.',
    about: 'A warp simulation is only as good as its material card. It needs viscosity at several temperatures and shear rates, PVT data (how volume changes with pressure and temperature, which drives shrinkage), thermal properties and, for good warp predictions, measured shrinkage or fibre data. Generic or “similar grade” cards are a common reason predictions miss.',
    check: ['Check whether the card is for your exact grade, and whether it is measured or estimated.', 'Look for PVT and shrinkage data, not just viscosity.', 'For filled grades, check fibre orientation parameters.'],
    wiki: '',
    src: [[4, 'Documentation', 'Simulation software documentation on material characterisation'], [1, 'Standard', 'ISO 17744: determination of specific volume as a function of temperature and pressure (PVT)']],
    reading: 'You went into material data, so I split it into what is measured, why it matters and how to judge a card.',
    subs: [
      ['What is measured', 'Flow, volume and heat.', 'The ingredients.', 'Simulation documentation', 4, [0], [
        ['Melt flow index', '', 0.5, 'Too simple on its own.', 'Rheology textbooks', 2, [0]],
        ['Thermal diffusivity', '', 0.65, 'How fast it cools.', 'Heat-transfer textbooks', 2, [0]],
      ]],
      ['Why it matters', 'Shrinkage comes from PVT.', 'Drives warp predictions.', 'ISO 17744', 1, [1], [
        ['High mould shrinkage', '', 0.7, 'PVT predicts it.', 'ISO 17744', 1, [1]],
        ['Direction-dependent shrinkage', '', 0.65, 'Needs fibre and orientation data.', 'Simulation documentation', 4, [0]],
      ]],
      ['Judging a card', 'Exact grade, measured, complete.', 'Trust it or not.', 'Simulation documentation', 4, [0], [
        ['Validation against real parts', '', 0.75, 'The real test.', 'Simulation documentation', 4, [0]],
        ['Supplier or grade switch', '', 0.55, 'A new grade needs a new card.', 'Simulation documentation', 4, [0]],
      ]],
    ],
    conn: [
      ['Thermal diffusivity', 'High mould shrinkage', 'combines with PVT to predict', 0.55, 'Cooling rate and PVT together set shrinkage.', 'Simulation documentation', 4, [0]],
      ['Supplier or grade switch', 'Validation against real parts', 'needs fresh', 0.6, 'A grade change voids old validation.', 'Simulation documentation', 4, [0]],
      ['Direction-dependent shrinkage', 'Validation against real parts', 'is the hardest to get right in', 0.5, 'Anisotropic warp is where cards most often miss.', 'My inference', 6, []],
    ],
    threads: [['Mould flow simulation', 'How is the data used?', 'Where it goes.'], ['Melt flow index', 'Why isn’t MFI enough?', 'The common shortcut.'], ['High mould shrinkage', 'How much will this resin shrink?', 'What PVT predicts.']],
    map: ['You expanded material data, so I mapped what it feeds and where it comes from.', [
      ['Mould flow simulation', 'effect', 0.9, 0.85, '', 'Runs on it.', 'Simulation documentation', 4],
      ['Shrinkage test plaques', 'related', 0.6, 0.55, '', 'Source of shrinkage data.', 'ISO 294-4', 1],
      ['Melt flow index', 'related', 0.5, 0.45, '', 'A partial substitute.', 'Rheology textbooks', 2],
      ['Validation against real parts', 'related', 0.7, 0.65, '', 'Proves the data.', 'Simulation documentation', 4],
      ['High mould shrinkage', 'related', 0.55, 0.5, '', 'Predicted from PVT.', 'ISO 17744', 1],
      ['Thermal diffusivity', 'related', 0.5, 0.45, '', 'A key thermal property.', 'Heat-transfer textbooks', 2],
    ], [
      ['Shrinkage test plaques', 'Mould flow simulation', 0.55, 'Plaque data improves warp prediction.', 'Simulation documentation', 4],
    ]],
  },

  'Cooling time estimate': {
    liner: 'A formula that predicts cooling time from wall thickness and how fast the resin conducts heat.',
    about: 'The standard estimate is t = s² / (π² α) × ln(8/π² × (Tmelt − Tmould) / (Teject − Tmould)), where s is wall thickness and α the thermal diffusivity. The key point is the square: doubling the thickest wall roughly quadruples cooling time. It assumes even cooling from both faces, so a real part with hot spots needs longer than the formula says.',
    check: ['Plug in the thickest wall, not the nominal.', 'Compare the estimate with your actual cooling time.', 'If you need far longer than predicted, look for hot spots.'],
    wiki: '',
    src: [[2, 'Textbook', 'Menges, G., Michaeli, W. & Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)'], [2, 'Textbook', 'Osswald, T. Polymer Processing Fundamentals (Hanser, 1998)']],
    reading: 'You went into the cooling time estimate, so I split it into the inputs, what dominates and where it goes wrong.',
    subs: [
      ['The inputs', 'Thickness, diffusivity, temperatures.', 'What you plug in.', 'Mould design textbooks', 2, [0], [
        ['Thermal diffusivity', '', 0.75, 'Resin property.', 'Heat-transfer textbooks', 2, [0]],
        ['Ejection temperature', '', 0.7, 'When the part is stiff enough.', 'Resin datasheets', 4, [0]],
      ]],
      ['What dominates', 'Thickness squared.', 'Why walls matter.', 'Mould design textbooks', 2, [0], [
        ['Thickness squared', '', 0.9, 'Double the wall, four times the time.', 'Heat-transfer textbooks', 2, [0]],
        ['Thickest section', '', 0.8, 'The thickest wall sets the time.', 'Mould design textbooks', 2, [0]],
      ]],
      ['Where it misleads', 'Uneven cooling in real tools.', 'Assumptions.', 'Mould design textbooks', 2, [1], [
        ['Hot spots in the steel', '', 0.7, 'Real tools aren’t even.', 'Mould design textbooks', 2, [1]],
        ['Crystallisation heat', '', 0.55, 'Semi-crystalline resins release extra heat.', 'Polymer science textbooks', 2, [1]],
      ]],
    ],
    conn: [
      ['Thickness squared', 'Thickest section', 'magnifies', 0.85, 'Any thick spot dominates because of the square.', 'Heat-transfer textbooks', 2, [0]],
      ['Hot spots in the steel', 'Ejection temperature', 'delays reaching', 0.6, 'A hot spot holds part of the part above ejection temperature.', 'Mould design textbooks', 2, [1]],
      ['Crystallisation heat', 'Thermal diffusivity', 'adds to the load beyond', 0.5, 'Latent heat isn’t in the simple formula.', 'Polymer science textbooks', 2, [1]],
    ],
    threads: [['Longer cycle time', 'Why is my cycle longer than it should be?', 'What the estimate is for.'], ['Heat transfer', 'How does heat leave the part?', 'The physics.'], ['Ejecting too early', 'Am I ejecting before the estimate says I should?', 'The warp link.']],
    map: ['You expanded the cooling time estimate, so I mapped its inputs and uses.', [
      ['Thickest section', 'cause', 0.85, 0.85, '', 'Sets the time.', 'Mould design textbooks', 2],
      ['Thermal diffusivity', 'cause', 0.7, 0.65, '', 'Resin property.', 'Heat-transfer textbooks', 2],
      ['Longer cycle time', 'effect', 0.75, 0.7, '', 'What it predicts.', 'Mould design textbooks', 2],
      ['Ejecting too early', 'related', 0.6, 0.6, '', 'Ejecting before the estimate.', 'Process guides', 3],
      ['Heat transfer', 'related', 0.7, 0.6, '', 'The physics.', 'Heat-transfer textbooks', 2],
      ['Non-uniform wall thickness', 'cause', 0.6, 0.55, '', 'Thick zones dominate.', 'Mould design textbooks', 2],
    ], [
      ['Thickest section', 'Longer cycle time', 0.75, 'The thickest wall drives the cycle.', 'Mould design textbooks', 2],
    ]],
  },

  'Split line placement': {
    liner: 'Where the two halves of the mould meet, which decides draft directions, gates and visible lines.',
    about: 'The parting line is where the core and cavity close on each other. Its position sets which way every face must draft, where a witness line or flash can appear, where slides are needed and often where gates can go. Industrial designers care because it is visible; toolmakers care because a stepped or awkward split line is expensive and hard to seal.',
    check: ['Find the split line on the part and check it is where the design intended.', 'Look for flash or a step along it.', 'Check whether a different split would remove a slide.'],
    wiki: 'Parting line',
    src: [[2, 'Textbook', 'Menges, G., Michaeli, W. & Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)'], [3, 'Encyclopedia', 'Parting line, Wikipedia']],
    reading: 'You went into split line placement, so I split it into what it decides, who cares and how it is chosen.',
    subs: [
      ['What it decides', 'Draft, slides and gates.', 'The knock-on effects.', 'Mould design textbooks', 2, [0], [
        ['Draft and radii', '', 0.7, 'Draft runs away from the split.', 'Mould design textbooks', 2, [0]],
        ['Gate location', '', 0.55, 'Edge gates sit on the split.', 'Gating handbooks', 2, [0]],
      ]],
      ['Who cares', 'Design and tooling.', 'Competing wishes.', 'Mould design textbooks', 2, [0], [
        ['Industrial design', '', 0.7, 'A visible line.', 'Design practice', 4, [0]],
        ['Tool construction', '', 0.65, 'Stepped splits cost more.', 'Mould design textbooks', 2, [0]],
      ]],
      ['Choosing it', 'Early, together.', 'When it goes wrong, late.', 'Design practice', 4, [0], [
        ['Early toolmaker review', '', 0.75, 'The toolmaker proposes it.', 'Design practice', 4, [0]],
        ['Visible gaps and flushness', '', 0.5, 'Split lines become seams.', 'Design practice', 4, [0]],
      ]],
    ],
    conn: [
      ['Industrial design', 'Tool construction', 'trades off against', 0.6, 'The line designers want is not always the one toolmakers can make cheaply.', 'Mould design textbooks', 2, [0]],
      ['Early toolmaker review', 'Draft and radii', 'settles', 0.55, 'Draft directions follow from the agreed split.', 'Design practice', 4, [0]],
      ['Gate location', 'Visible gaps and flushness', 'leaves marks near', 0.35, 'Edge gates on a visible split leave vestiges.', 'My inference', 6, []],
    ],
    threads: [['Industrial design', 'How does design choose where lines go?', 'The design side.'], ['Draft and radii', 'Which faces need draft?', 'The direct consequence.'], ['Gate location', 'Can the gate sit on the split?', 'A common link.']],
    map: ['You expanded split line placement, so I mapped what it shapes.', [
      ['Industrial design', 'related', 0.75, 0.7, '', 'Visible line.', 'Design practice', 4],
      ['Draft and radii', 'effect', 0.7, 0.65, '', 'Sets draft directions.', 'Mould design textbooks', 2],
      ['Gate location', 'related', 0.55, 0.5, '', 'Edge gates use it.', 'Gating handbooks', 2],
      ['Early toolmaker review', 'related', 0.65, 0.6, '', 'Where it is agreed.', 'Design practice', 4],
      ['Visible gaps and flushness', 'related', 0.5, 0.45, '', 'Becomes a seam.', 'Design practice', 4],
      ['Tool rework', 'effect', 0.4, 0.35, '', 'A late split change is costly.', 'Toolmaking practice', 3],
    ], [
      ['Industrial design', 'Early toolmaker review', 0.55, 'Design and tooling agree the split together.', 'Design practice', 4],
    ]],
  },

  'Thread-forming screws': {
    liner: 'Screws that form their own thread in a moulded hole, putting hoop stress into the boss.',
    about: 'Thread-forming screws push plastic aside rather than cutting it, so they hold well without inserts. The price is hoop stress in the boss: if the hole is too small, the boss wall too thin or the resin brittle, the boss splits, sometimes days later. Screw makers publish hole sizes per resin, and screws designed for plastics have wider thread angles that lower the stress.',
    check: ['Compare the hole diameter with the screw maker’s figure for your resin.', 'Measure the boss wall against about 0.6 × the nominal wall and 2 × the screw diameter outside.', 'Check driving torque against strip torque.'],
    wiki: '',
    src: [[4, 'Guide', 'Screw manufacturer design guides for thread-forming screws in plastics'], [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)']],
    reading: 'You went into thread-forming screws, so I split them into the screw, the hole and what fails.',
    subs: [
      ['The screw', 'Thread form and size.', 'Sets the stress.', 'Screw maker guides', 4, [0], [
        ['Screw type', '', 0.75, 'Forming versus cutting.', 'Screw maker guides', 4, [0]],
        ['Heat-set inserts', '', 0.5, 'The alternative.', 'Screw maker guides', 4, [0]],
      ]],
      ['The hole', 'Diameter and depth.', 'Where design controls it.', 'Screw maker guides', 4, [0], [
        ['Hole diameter', '', 0.8, 'Too small cracks the boss.', 'Screw maker guides', 4, [0]],
        ['Cored hole depth', '', 0.6, 'Enough engagement without bottoming.', 'Screw maker guides', 4, [0]],
      ]],
      ['What fails', 'Cracks and stripping.', 'The failure modes.', 'Failure analysis practice', 2, [1], [
        ['Boss cracking', '', 0.8, 'Hoop stress splits the boss.', 'Failure analysis practice', 2, [1]],
        ['Environmental stress cracking', '', 0.55, 'Chemicals plus screw stress.', 'Failure analysis practice', 2, [1]],
      ]],
    ],
    conn: [
      ['Hole diameter', 'Boss cracking', 'causes when undersized', 0.8, 'A tight hole raises hoop stress past what the boss can take.', 'Screw maker guides', 4, [0]],
      ['Screw type', 'Environmental stress cracking', 'raises the risk of', 0.5, 'More hoop stress, more risk with chemicals.', 'Failure analysis practice', 2, [1]],
      ['Heat-set inserts', 'Boss cracking', 'avoids', 0.55, 'Inserts carry the thread without forming stress.', 'Screw maker guides', 4, [0]],
    ],
    threads: [['Screw bosses', 'Is the boss designed right for the screw?', 'Back to the boss.'], ['Environmental stress cracking', 'Will chemicals crack the stressed boss?', 'A delayed failure.'], ['Assembly fit failure', 'Are screws pulling warped parts together?', 'The warp link.']],
    map: ['You expanded thread-forming screws, so I mapped their design and failures.', [
      ['Screw bosses', 'related', 0.85, 0.85, '', 'What they go into.', 'Screw maker guides', 4],
      ['Boss cracking', 'effect', 0.75, 0.75, '', 'The main failure.', 'Failure analysis practice', 2],
      ['Heat-set inserts', 'related', 0.6, 0.5, '', 'The alternative.', 'Screw maker guides', 4],
      ['Environmental stress cracking', 'effect', 0.5, 0.45, '', 'Chemicals plus stress.', 'Failure analysis practice', 2],
      ['Assembly fit failure', 'related', 0.5, 0.5, '', 'Screws fight warp.', 'My inference', 6],
    ], [
      ['Screw bosses', 'Boss cracking', 0.7, 'Boss design decides whether it cracks.', 'Screw maker guides', 4],
    ]],
  },

  'Textured surfaces': {
    liner: 'A grain etched or lasered into the mould, which hides marks but needs more draft.',
    about: 'Texture breaks up reflections, so it hides sink marks, flow lines and small warp that would show on a gloss surface. It also grips the core, so it needs extra draft, roughly 1° more per 0.025 mm of depth, or the part scuffs and is pushed out of shape on ejection. Texture also changes how a thermal camera reads the steel.',
    check: ['Check draft on textured faces against the texture supplier’s chart.', 'Compare sink visibility on textured and gloss areas.', 'Look for drag marks along the draw direction.'],
    wiki: '',
    src: [[4, 'Guide', 'Mould texture supplier draft charts'], [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)']],
    reading: 'You went into textured surfaces, so I split them into what texture hides, what it needs and what it affects.',
    subs: [
      ['What it hides', 'Sinks, flow lines and gloss changes.', 'Why it is used.', 'Part design textbooks', 2, [1], [
        ['Sink marks', '', 0.75, 'Less visible under texture.', 'Part design textbooks', 2, [1]],
        ['Gloss level', '', 0.6, 'Gloss shows everything.', 'Part design textbooks', 2, [1]],
      ]],
      ['What it needs', 'Extra draft.', 'The cost.', 'Texture supplier guides', 4, [0], [
        ['Draft and radii', '', 0.8, 'More draft per depth of grain.', 'Texture supplier guides', 4, [0]],
        ['Ejector pin layout', '', 0.5, 'More grip, more force.', 'Mould design textbooks', 2, [1]],
      ]],
      ['What it affects', 'Imaging and cost.', 'Side effects.', 'Practice', 4, [0], [
        ['Emissivity of steel', '', 0.5, 'Texture reads differently on camera.', 'Thermography textbooks', 2, []],
        ['Surface finish choice', '', 0.6, 'A design decision.', 'Design practice', 4, [0]],
      ]],
    ],
    conn: [
      ['Draft and radii', 'Ejector pin layout', 'reduces force on', 0.6, 'Enough draft lets textured parts release without strain.', 'Mould design textbooks', 2, [1]],
      ['Gloss level', 'Sink marks', 'reveals', 0.65, 'Gloss makes small sinks visible.', 'Part design textbooks', 2, [1]],
      ['Surface finish choice', 'Emissivity of steel', 'changes readings of', 0.35, 'Polish and grain read differently.', 'My inference', 6, []],
    ],
    threads: [['Sink marks', 'Would texture hide my sinks?', 'The main reason to texture.'], ['Draft and radii', 'Is there enough draft for the texture?', 'The requirement.'], ['Industrial design', 'Is texture part of the design intent?', 'Who decides.']],
    map: ['You expanded textured surfaces, so I mapped what they hide and need.', [
      ['Sink marks', 'related', 0.75, 0.7, '', 'Hidden by texture.', 'Part design textbooks', 2],
      ['Draft and radii', 'related', 0.75, 0.7, '', 'Needs extra draft.', 'Texture supplier guides', 4],
      ['Surface finish choice', 'related', 0.7, 0.6, '', 'A design choice.', 'Design practice', 4],
      ['Cosmetic rejects', 'effect', 0.6, 0.55, '', 'Fewer with texture.', 'Quality practice', 4],
      ['Emissivity of steel', 'related', 0.4, 0.35, '', 'Changes camera readings.', 'Thermography textbooks', 2],
    ], [
      ['Sink marks', 'Cosmetic rejects', 0.6, 'Visible sinks are a common reject.', 'Quality practice', 4],
    ]],
  },

  'Fibre content and length': {
    liner: 'How much glass is in the resin and how long the fibres stay after moulding.',
    about: 'Glass fibres stiffen and strengthen a resin, and the effect grows with both content (10 to 50% by weight is common) and length. Longer, more numerous fibres also make shrinkage more direction-dependent: shrinkage along the fibres can be a third of that across them. Fibres break in the screw, the gate and in regrind, so the moulded part has shorter fibres than the pellet.',
    check: ['Check the grade’s glass content and whether it is short or long fibre.', 'Burn off a sample (ash test) to confirm content.', 'Measure fibre length after moulding if regrind is used.'],
    wiki: 'Glass fiber reinforced plastic',
    src: [[2, 'Paper', 'Studies of fibre length and orientation in injection-moulded thermoplastics'], [1, 'Standard', 'ISO 3451: determination of ash']],
    reading: 'You went inside fibre content and length, so I split it into content, length and what they do to shrinkage.',
    subs: [
      ['Content', 'How much glass.', 'Sets the scale of the effect.', 'Studies of fibre-filled mouldings', 2, [0], [
        ['Fibre loading', '', 0.8, 'Percent by weight.', 'Studies of fibre-filled mouldings', 2, [0]],
        ['Mineral and glass-bead fillers', '', 0.55, 'Fillers without a long axis.', 'Studies of fibre-filled mouldings', 2, [0]],
      ]],
      ['Length', 'What survives processing.', 'Shrinks as it is processed.', 'Studies of fibre-filled mouldings', 2, [0], [
        ['Fibre breakage', '', 0.8, 'Screws and gates shorten fibres.', 'Studies of fibre-filled mouldings', 2, [0]],
        ['Regrind', '', 0.6, 'Each pass shortens more.', 'Supplier guidance', 3, [0]],
      ]],
      ['Effect on shrinkage', 'Direction dependence.', 'The warp link.', 'Shrinkage handbooks', 2, [0], [
        ['Direction-dependent shrinkage', '', 0.85, 'Less along fibres, more across.', 'Shrinkage handbooks', 2, [0]],
        ['Direction-dependent stiffness', '', 0.6, 'Stiffer along fibres.', 'Studies of fibre-filled mouldings', 2, [0]],
      ]],
    ],
    conn: [
      ['Fibre loading', 'Direction-dependent shrinkage', 'strengthens', 0.8, 'More glass, bigger difference between directions.', 'Shrinkage handbooks', 2, [0]],
      ['Fibre breakage', 'Direction-dependent stiffness', 'weakens', 0.6, 'Shorter fibres reinforce less.', 'Studies of fibre-filled mouldings', 2, [0]],
      ['Mineral and glass-bead fillers', 'Direction-dependent shrinkage', 'reduces when replacing glass', 0.65, 'Swapping some glass for beads or mineral cuts anisotropy.', 'Studies of fibre-filled mouldings', 2, [0]],
    ],
    threads: [['Glass-fibre orientation', 'Which way do the fibres point?', 'Content matters through orientation.'], ['Direction-dependent shrinkage', 'How directional is my shrinkage?', 'The warp effect.'], ['Material selection trade-offs', 'Would a lower-glass or low-warp grade work?', 'The material fix.']],
    map: ['You expanded fibre content and length, so I mapped what they change.', [
      ['Glass-fibre orientation', 'related', 0.85, 0.8, '', 'Content matters through orientation.', 'Studies of fibre-filled mouldings', 2],
      ['Direction-dependent shrinkage', 'effect', 0.85, 0.85, '', 'More glass, more anisotropy.', 'Shrinkage handbooks', 2],
      ['Fibre breakage', 'related', 0.7, 0.6, '', 'Shortens fibres.', 'Studies of fibre-filled mouldings', 2],
      ['Regrind', 'cause', 0.55, 0.5, '', 'Breaks fibres.', 'Supplier guidance', 3],
      ['Low-warp grades', 'related', 0.6, 0.55, '', 'Blend fibres with other fillers.', 'Material guides', 4],
      ['Direction-dependent stiffness', 'effect', 0.65, 0.5, '', 'Stiffer along fibres.', 'Studies of fibre-filled mouldings', 2],
    ], [
      ['Regrind', 'Fibre breakage', 0.6, 'Regrind passes break fibres.', 'Studies of fibre-filled mouldings', 2],
    ]],
  },

  'Process variation': {
    liner: 'Shot-to-shot and shift-to-shift changes in temperature, pressure, timing and material.',
    about: 'No moulding process is perfectly steady. Barrel and mould temperatures drift, check rings wear, material viscosity varies by lot and regrind share, and settings get tweaked between shifts. When the process window is narrow, these small changes move warp in and out of tolerance. Scientific moulding aims to set the process where the part is least sensitive, then monitor the few variables that matter.',
    check: ['Plot warp against shift, cavity and material lot.', 'Record actual (not set) melt and mould temperatures over a shift.', 'Check whether cushion and fill time vary shot to shot.'],
    wiki: '',
    src: [[2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)'], [2, 'Textbook', 'Montgomery, D. C. Introduction to Statistical Quality Control, 7th ed. (Wiley, 2012)']],
    reading: 'You went into process variation, so I split it into the sources, how to see it and how to make the process robust.',
    subs: [
      ['Sources', 'Machine, material, people.', 'Where variation comes from.', 'Scientific moulding practice', 2, [0], [
        ['Mould temperatures', '', 0.75, 'Drift as tools warm up.', 'Scientific moulding practice', 2, [0]],
        ['Lot-to-lot variation', '', 0.65, 'Material changes.', 'Scientific moulding practice', 2, [0]],
        ['Regrind share', '', 0.55, 'Varying regrind.', 'Supplier guidance', 3, [0]],
      ]],
      ['Seeing it', 'Measuring the right things.', 'Control charts and sensors.', 'Statistical quality control', 2, [1], [
        ['Part weight', '', 0.7, 'A cheap, sensitive signal.', 'Scientific moulding practice', 2, [0]],
        ['Cavity pressure sensors', '', 0.65, 'The best signal.', 'Sensor documentation', 4, [0]],
      ]],
      ['Making it robust', 'A wide window, then monitoring.', 'The fix.', 'Scientific moulding practice', 2, [0], [
        ['Stable process first', '', 0.75, 'Fix the process before the tool.', 'Scientific moulding practice', 2, [0]],
        ['Process capability', '', 0.65, 'Measuring how well it holds.', 'Statistical quality control', 2, [1]],
      ]],
    ],
    conn: [
      ['Mould temperatures', 'Part weight', 'shows in', 0.55, 'Temperature drift changes packing and weight.', 'Scientific moulding practice', 2, [0]],
      ['Lot-to-lot variation', 'Cavity pressure sensors', 'is caught by', 0.6, 'Viscosity changes alter the pressure curve.', 'Sensor documentation', 4, [0]],
      ['Stable process first', 'Process capability', 'enables', 0.7, 'Capability can only be measured on a stable process.', 'Statistical quality control', 2, [1]],
    ],
    threads: [['Cavity pressure sensors', 'Can I see the variation in the cavity?', 'The sharpest signal.'], ['Resin batch or supplier change', 'Is the variation from the material?', 'A common source.'], ['Scrap rate and cost', 'What is the variation costing?', 'The business case.']],
    map: ['You expanded process variation, so I mapped its sources and effects.', [
      ['Resin batch or supplier change', 'cause', 0.7, 0.7, '', 'Material changes.', 'Scientific moulding practice', 2],
      ['Regrind ratio', 'cause', 0.6, 0.55, '', 'Varying regrind.', 'Supplier guidance', 3],
      ['Part weight variation', 'effect', 0.75, 0.7, '', 'The visible sign.', 'Scientific moulding practice', 2],
      ['Scrap rate and cost', 'effect', 0.75, 0.75, '', 'Variation makes scrap.', 'Quality practice', 4],
      ['Cavity pressure sensors', 'related', 0.6, 0.55, '', 'Monitors it.', 'Sensor documentation', 4],
      ['Warp compensation', 'related', 0.45, 0.4, '', 'Fails if variation is high.', 'Shrinkage handbooks', 2],
      ['Warped moulded part', 'effect', 0.7, 0.7, '', 'Warp that comes and goes.', 'Scientific moulding practice', 2],
    ], [
      ['Part weight variation', 'Warped moulded part', 0.55, 'Weight swings track warp swings.', 'Scientific moulding practice', 2],
    ]],
  },

  'Measurement method': {
    liner: 'How a part is measured: free or clamped, on a surface plate, a CMM or a 3D scanner, and when.',
    about: 'The same part can pass or fail depending on how it is measured. A flexible part measured free shows its full warp; clamped in a fixture it may be flat. Measuring at the press catches it before after-shrinkage. Surface plate and feeler gauges are quick but coarse; a CMM measures points; a 3D scanner captures the whole shape and shows where warp is.',
    check: ['Write down whether the drawing asks for free or restrained measurement.', 'Measure the same five parts with two methods and compare.', 'Fix the time after moulding at which parts are measured.'],
    wiki: '',
    src: [[1, 'Standard', 'ASME Y14.5: Dimensioning and Tolerancing (free-state variation)'], [3, 'Guide', 'Metrology guides on measuring flexible plastic parts']],
    reading: 'You went into measurement method, so I split it into the state of the part, the instrument and the timing.',
    subs: [
      ['The part’s state', 'Free or restrained.', 'Changes the answer most.', 'ASME Y14.5', 1, [0], [
        ['Free-state variation', '', 0.8, 'GD&T for flexible parts.', 'ASME Y14.5', 1, [0]],
        ['Restrained fixture', '', 0.75, 'Holding it as assembled.', 'Metrology guides', 3, [1]],
      ]],
      ['The instrument', 'Plate, CMM, scanner.', 'Resolution and coverage.', 'Metrology guides', 3, [1], [
        ['3D scanning', '', 0.8, 'Whole-surface shape.', 'Metrology guides', 3, [1]],
        ['Surface plate and gauge', '', 0.6, 'Quick but coarse.', 'Metrology guides', 3, [1]],
      ]],
      ['The timing', 'When after moulding.', 'Parts keep moving.', 'ISO 294-4', 1, [], [
        ['24-hour measurement', '', 0.8, 'The settled size.', 'ISO 294-4', 1, []],
        ['Post-mould shrinkage', '', 0.6, 'Why timing matters.', 'Shrinkage handbooks', 2, []],
      ]],
    ],
    conn: [
      ['Free-state variation', 'Restrained fixture', 'differs from', 0.75, 'A part can be out free but in when clamped.', 'ASME Y14.5', 1, [0]],
      ['3D scanning', '24-hour measurement', 'is best done at', 0.55, 'Scan settled parts for compensation work.', 'Metrology guides', 3, [1]],
      ['Surface plate and gauge', 'Post-mould shrinkage', 'misses when done early', 0.4, 'A quick check at the press won’t show later movement.', 'My inference', 6, []],
    ],
    threads: [['Flatness tolerances', 'What does the drawing actually ask for?', 'The spec behind the method.'], ['Warp compensation', 'Is the scan good enough to compensate from?', 'Where measurement feeds tooling.'], ['Hot parts stacked in boxes', 'Does the part change after measurement?', 'Timing matters.']],
    map: ['You expanded measurement method, so I mapped what it decides and what depends on it.', [
      ['Flatness tolerances', 'related', 0.85, 0.8, '', 'What it checks.', 'ASME Y14.5', 1],
      ['Free-state variation', 'related', 0.7, 0.65, '', 'Free or clamped.', 'ASME Y14.5', 1],
      ['Checking fixtures', 'related', 0.7, 0.6, '', 'Holding parts as assembled.', 'Metrology guides', 3],
      ['24-hour measurement', 'related', 0.65, 0.6, '', 'When to measure.', 'ISO 294-4', 1],
      ['Warp compensation', 'effect', 0.5, 0.45, '', 'Uses scan data.', 'Metrology guides', 3],
      ['Assembly fit failure', 'related', 0.55, 0.5, '', 'Free measurement may not predict fit.', 'My inference', 6],
    ], [
      ['Free-state variation', 'Assembly fit failure', 0.5, 'Parts that fail free may fit clamped.', 'ASME Y14.5', 1],
    ]],
  },
});
