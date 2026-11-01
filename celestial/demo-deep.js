// ─────────────────────────────────────────────────────────────
// DEMO CONTENT · what Go deeper finds inside each example topic.
//
// Only on this site. Written by Claude for the demo, in the shape a live
// deeper pass returns (see demo.js). Keyed by the topic's title.
//   liner, reading – what is inside, and how it was broken down
//   subs        – [title, liner, why, basis, tier, cite, parts]
//   parts       – [title, liner, relevance, why, basis, tier, cite]
//   connections – [part a, part b, kind, confidence, why, basis, tier, cite]
//   threads     – [title, question, why]. Each title is another example
//                 topic, so following a thread opens that topic's deeper
//                 pass and the demo can keep going.
//   sources     – [tier, type, title, url, flag]; cite = positions in it
// ─────────────────────────────────────────────────────────────

window.CELESTIAL_DEMO_CONTENT ||= {};
window.CELESTIAL_DEMO_CONTENT.deep = {
  'Warped moulded part': {
    liner: 'Warp broken into where the shrinkage mismatch comes from: the part, the mould, the process and the material.',
    reading: 'You went deeper into the warp itself, so I split it into the four places a shrinkage mismatch can start: the part design, the mould, the process settings and the material. Then I looked for connections across them, since warp usually has more than one contributor.',
    subs: [
      ['Part design', 'The shape decides where the part is thick, thin and stiff.', 'Design causes are always there, shot after shot, so they explain warp that has never gone away.', 'Part design textbooks', 2, [0], [
        ['Wall variation', 'Thick and thin regions in the same part.', 0.9, 'Thick regions cool late and shrink more.', 'Heat-transfer physics', 2, [0]],
        ['Rib layout', 'How many ribs, how thick, and on which side.', 0.65, 'Ribs on one side of a flat part pull it into a bow.', 'Part design textbooks', 2, [0]],
        ['Part stiffness', 'How well the shape resists bending.', 0.5, 'A stiff box resists warp that would bend a flat plate.', 'Part design textbooks', 2, [0]],
      ]],
      ['Mould', 'The tool sets how evenly heat leaves and how plastic flows in.', 'Mould causes are fixed until the tool changes, so they look like design causes on the shop floor.', 'Mould design textbooks', 2, [1], [
        ['Cooling balance', 'Whether every area of the steel runs at the same temperature.', 0.9, 'Hotter steel means later freezing and more shrinkage.', 'Mould design textbooks', 2, [1]],
        ['Gate position', 'Where plastic enters the cavity.', 0.7, 'Sets flow direction, packing and orientation.', 'Gating handbooks', 2, [1]],
      ]],
      ['Process', 'Machine settings that change from shot to shot and shift to shift.', 'Process causes come and go, so they explain warp that varies.', 'Scientific moulding practice', 2, [2], [
        ['Packing profile', 'Hold pressure and hold time after filling.', 0.75, 'Under-packed areas shrink more than packed ones.', 'Scientific moulding practice', 2, [2]],
        ['Cooling time', 'How long the part stays in the mould.', 0.65, 'Ejected soft, the part keeps shrinking unevenly outside.', 'Process guides', 3, [2]],
        ['Mould temperatures', 'The set and actual temperatures of each half.', 0.7, 'A few degrees between halves can bow a flat part.', 'Process guides', 3, [2]],
      ]],
      ['Material', 'What the resin brings: how much it shrinks, and how unevenly.', 'The material sets the size of the problem every other cause works on.', 'Shrinkage handbooks', 2, [0, 3], [
        ['Shrinkage level', 'How much the resin shrinks overall.', 0.7, 'More total shrinkage leaves more room for it to be uneven.', 'Resin datasheets', 1, [3]],
        ['Filler orientation', 'Fibres lining up with the flow.', 0.55, 'Makes shrinkage depend on direction.', 'Studies of fibre-filled mouldings', 2, [0]],
      ]],
    ],
    connections: [
      ['Wall variation', 'Cooling balance', 'compounds', 0.85, 'A thick zone over a poorly cooled area is the worst case: the slowest region on the slowest path.', 'Mould design textbooks', 2, [1]],
      ['Gate position', 'Filler orientation', 'sets', 0.8, 'Fibres follow the flow from the gate.', 'Gating handbooks', 2, [1]],
      ['Packing profile', 'Wall variation', 'depends on', 0.65, 'Thick areas need longer hold to stay packed.', 'Scientific moulding practice', 2, [2]],
      ['Mould temperatures', 'Shrinkage level', 'shifts', 0.6, 'In semi-crystalline resins, mould temperature changes how much crystallises.', 'Polymer science textbooks', 2, [3]],
      ['Part stiffness', 'Rib layout', 'traded off against', 0.5, 'More ribs add stiffness but can add warp of their own. Plausible, depends on layout.', 'My inference', 6, []],
    ],
    threads: [
      ['Uneven cooling', 'How do I find where my mould is cooling unevenly, and fix it?', 'Cooling balance scored highest and connects to the design side.'],
      ['Non-uniform wall thickness', 'Which thick sections in my part are causing the warp?', 'The strongest design-side cause.'],
      ['Low packing pressure', 'Is my packing profile right for the thick areas?', 'The cheapest thing to change at the press.'],
    ],
    sources: [
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier, 2013)'],
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'],
      [2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)'],
      [1, 'Standard', 'ISO 294-4: determination of moulding shrinkage'],
    ],
  },

  'Uneven cooling': {
    liner: 'How heat leaves a mould, broken into the parts that decide where a part cools fast or slow.',
    reading: 'You went deeper into uneven cooling, so I split it into the three places heat has to travel through: the plastic itself, the mould steel, and the water that carries the heat away. Then I looked for connections between parts of different sub-systems, since those are easy to miss.',
    subs: [
      ['Heat in the plastic', 'How fast each region of the part can give up its heat.', 'Heat starts in the melt, so the part’s own geometry is the first thing that sets cooling speed.', 'Heat-transfer physics', 2, [0], [
        ['Section thickness', 'Cooling time grows with the square of thickness.', 0.9, 'Thick sections hold heat far longer than thin ones next to them.', 'Heat-transfer physics', 2, [0]],
        ['Melt temperature', 'Hotter melt carries more heat to remove.', 0.55, 'A higher melt setting raises the heat load everywhere, and exaggerates existing hot spots.', 'Process guides', 3, [2]],
        ['Crystallisation heat', 'Semi-crystalline resins release extra heat as they crystallise.', 0.6, 'This latent heat is released unevenly, so these resins are more sensitive to cooling layout.', 'Polymer science textbooks', 2, [3]],
      ]],
      ['Heat in the steel', 'How evenly the mould conducts heat from the part to the water.', 'The steel sits between part and water, so any uneven path through it becomes uneven cooling.', 'Mould design textbooks', 2, [1], [
        ['Channel distance', 'How far cooling channels sit from the moulding surface.', 0.85, 'Channels too far away, or unevenly spaced, leave warm zones in the steel.', 'Mould design textbooks', 2, [1]],
        ['Core cooling', 'Baffles and bubblers that reach into tall cores.', 0.8, 'Cores are surrounded by plastic and are the hardest place to cool.', 'Mould design guides', 3, [1]],
        ['Insert materials', 'Copper alloy inserts pull heat out of hot spots faster than tool steel.', 0.45, 'A more conductive insert can even out a hot spot without moving channels.', 'Toolmakers’ literature', 4, [1]],
      ]],
      ['Heat in the water', 'How much heat the coolant circuit can carry away.', 'The water is the last step; if it carries heat away unevenly, the rest can’t compensate.', 'Maintenance guides', 4, [0], [
        ['Turbulent flow', 'Water moving fast enough to tumble removes heat far better.', 0.7, 'Below turbulent flow, heat transfer drops sharply, often on one circuit only.', 'Heat-transfer physics', 2, [0]],
        ['Scale and blockage', 'Mineral build-up narrows channels over months.', 0.75, 'Explains warp that crept in slowly on a tool that used to run well.', 'Maintenance guides', 4, []],
        ['Circuit balancing', 'Each half and zone getting its own controlled flow and temperature.', 0.65, 'Shared circuits let one half run warmer than the other.', 'Mould design guides', 3, [1]],
      ]],
    ],
    connections: [
      ['Section thickness', 'Channel distance', 'compounds', 0.8, 'A thick section over a far-off channel is the worst case: the slowest part to cool sits on the slowest path out.', 'Mould design textbooks', 2, [1]],
      ['Scale and blockage', 'Circuit balancing', 'undermines', 0.65, 'A balanced circuit drifts out of balance as one branch scales up faster than another.', 'My inference from maintenance reports', 6, []],
      ['Core cooling', 'Turbulent flow', 'depends on', 0.7, 'Bubblers only work with enough flow; a low-flow core circuit runs hot even with good design.', 'Mould design guides', 3, [1]],
      ['Crystallisation heat', 'Insert materials', 'offset by', 0.45, 'A conductive insert at a crystalline hot spot could absorb the extra latent heat. Speculative, rarely documented.', 'My inference', 6, []],
    ],
    threads: [
      ['Core and cavity at different temperatures', 'Why are mould cores harder to cool than cavities, and how do I balance the halves?', 'Core cooling scored high and links to two other sub-systems.'],
      ['Low coolant flow', 'How can you tell cooling channels are scaled or starved of flow without taking the tool apart?', 'A slow-onset cause that is cheap to check.'],
      ['Conformal cooling', 'When is a printed conformal insert worth it to fix hot spots in a mould?', 'A fix that avoids fighting the drilled layout.'],
    ],
    sources: [
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011)'],
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002), chapter on mould cooling'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding (SME, 1996)'],
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'],
    ],
  },

  'Non-uniform wall thickness': {
    liner: 'Where thick and thin zones come from in a part, and how each one turns into uneven shrinkage.',
    reading: 'You went deeper into wall thickness, so I split it by where thick zones come from: features joined to the wall, the overall shape, and transitions between thicknesses. Then I looked at how each one reaches the warp.',
    subs: [
      ['Features on the wall', 'Ribs, bosses and other features where they meet the wall.', 'Most thick spots in a well-designed wall come from features joined to it.', 'Part design textbooks', 2, [0], [
        ['Rib roots', 'The junction where a rib meets the wall.', 0.8, 'The root is thicker than either the rib or the wall alone.', 'Part design textbooks', 2, [0]],
        ['Boss bases', 'Where a screw boss joins the wall.', 0.7, 'A boss merged into a wall makes a local thick spot.', 'Part design textbooks', 2, [0]],
        ['Snap-fit hooks', 'Thick hooks on thin walls.', 0.4, 'Hooks are often thickened for strength, adding mass at their base.', 'Snap-fit handbooks', 2, [2]],
      ]],
      ['Overall shape', 'The form of the part as a whole.', 'Styled or solid shapes can leave whole regions thicker than the rest.', 'Design practice', 4, [1], [
        ['Unshelled solids', 'Regions modelled solid and never hollowed out.', 0.75, 'A solid region is the extreme thick zone.', 'Part design textbooks', 2, [0]],
        ['Styled surfaces', 'Outer surfaces whose inside doesn’t follow them.', 0.6, 'A domed top over a flat inside is thick at the crown.', 'Design practice', 4, [1]],
      ]],
      ['Transitions', 'Where the wall changes from one thickness to another.', 'Even planned thickness changes cause trouble if they are abrupt.', 'Part design textbooks', 2, [0], [
        ['Abrupt steps', 'A sudden change in wall thickness.', 0.65, 'The thick side of a step cools late and pulls on the thin side.', 'Part design textbooks', 2, [0]],
        ['Corner radii', 'Inside and outside radii at corners.', 0.55, 'Mismatched radii make corners thicker than the walls.', 'Part design textbooks', 2, [0]],
      ]],
    ],
    connections: [
      ['Rib roots', 'Abrupt steps', 'behaves like', 0.6, 'A rib root is effectively a local step in thickness.', 'Part design textbooks', 2, [0]],
      ['Unshelled solids', 'Styled surfaces', 'often comes from', 0.55, 'Styled shapes are often modelled as solids first and never shelled.', 'Design practice', 4, [1]],
      ['Boss bases', 'Corner radii', 'compounds', 0.5, 'A boss in a corner combines two thick features. Plausible, worth checking.', 'My inference', 6, []],
    ],
    threads: [
      ['Thick ribs and bosses', 'Are my ribs and bosses sized right for the wall they join?', 'The commonest source of thick spots.'],
      ['Styling-led surfaces', 'Did the styled surfaces leave thick zones under them?', 'A design-stage cause that is easy to miss.'],
      ['Nominal wall guidelines', 'What should my nominal wall be, and how much may it vary?', 'Sets the target every feature is sized from.'],
    ],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [4, 'Industry practice', 'Industrial design studios’ guidance on designing for moulding'],
      [2, 'Handbook', 'Bonenberger, P. R. The First Snap-Fit Handbook, 3rd ed. (Hanser, 2016)'],
    ],
  },

  'Differential shrinkage': {
    liner: 'The three ways shrinkage can differ within one part, and what drives each.',
    reading: 'You went deeper into differential shrinkage, so I split it into its three forms: through the thickness, across the part and with direction. Each has its own drivers, and warp is their combined result.',
    subs: [
      ['Through the thickness', 'The skin and core of a wall shrinking differently.', 'The skin freezes first under orientation; the core cools slowly and shrinks more.', 'Studies of residual stress', 2, [1], [
        ['Frozen skin layer', 'A thin layer that freezes against the steel during filling.', 0.6, 'It sets early and resists later shrinkage of the core.', 'Studies of residual stress', 2, [1]],
        ['Core shrinkage', 'The slowly cooling middle of the wall.', 0.65, 'Shrinks last and most, putting the skin in compression.', 'Studies of residual stress', 2, [1]],
        ['Asymmetric cooling', 'One face cooling faster than the other.', 0.8, 'Makes the through-thickness profile lopsided, which bends the wall.', 'Mould design textbooks', 2, [0]],
      ]],
      ['Across the part', 'Different regions of the part shrinking by different amounts.', 'The most visible form: one region ends up shorter than its neighbour.', 'Shrinkage handbooks', 2, [0], [
        ['Thickness differences', 'Thick regions shrinking more than thin ones.', 0.85, 'Cooling time and so shrinkage grow with thickness.', 'Heat-transfer physics', 2, [0]],
        ['Pressure differences', 'Near-gate areas packed harder than far ones.', 0.7, 'Pressure falls along the flow, so far areas shrink more.', 'Flow analysis textbooks', 2, [2]],
      ]],
      ['With direction', 'Along versus across the flow.', 'Orientation of molecules and fibres makes shrinkage directional.', 'Shrinkage handbooks', 2, [0, 3], [
        ['Chain orientation', 'Polymer chains stretched along the flow.', 0.55, 'They recoil as they cool, so unfilled resins shrink more along the flow.', 'Polymer science textbooks', 2, [0]],
        ['Fibre alignment', 'Fibres lying with the flow.', 0.6, 'Fibres resist shrinking along their length.', 'Studies of fibre-filled mouldings', 2, [0]],
      ]],
    ],
    connections: [
      ['Asymmetric cooling', 'Thickness differences', 'compounds', 0.7, 'Thick regions are also where one face tends to run hotter.', 'Mould design textbooks', 2, [0]],
      ['Pressure differences', 'Chain orientation', 'linked by flow', 0.55, 'Both follow the flow from the gate.', 'Flow analysis textbooks', 2, [2]],
      ['Frozen skin layer', 'Fibre alignment', 'layered with', 0.5, 'Fibres align differently in skin and core, so the two forms interact.', 'Studies of fibre-filled mouldings', 2, [0]],
    ],
    threads: [
      ['Direction-dependent shrinkage', 'How much does flow direction contribute to my warp?', 'The form simulation separates out as orientation effects.'],
      ['Uneven cooling', 'Is one face of my part cooling faster than the other?', 'Asymmetric cooling scored highest.'],
      ['Crystallinity', 'Is crystallinity varying across my part?', 'Drives how much semi-crystalline regions shrink.'],
    ],
    sources: [
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier, 2013)'],
      [2, 'Peer-reviewed', 'Studies of residual stress in injection-moulded plates (e.g. Polymer Engineering & Science)'],
      [2, 'Textbook', 'Kennedy, P. & Zheng, R. Flow Analysis of Injection Molds, 2nd ed. (Hanser, 2013)'],
      [1, 'Standard', 'ISO 294-4: determination of moulding shrinkage'],
    ],
  },

  'Semi-crystalline polymers': {
    liner: 'What happens inside a semi-crystalline resin as it cools, and which stages decide its shrinkage.',
    reading: 'You went deeper into semi-crystalline polymers, so I followed the material from melt to finished part: crystals forming, crystals growing, and what happens after the part leaves the mould.',
    subs: [
      ['Crystals forming', 'Where and when crystals start in the cooling melt.', 'Nucleation decides how many crystals there are and how fast they appear.', 'Polymer science textbooks', 2, [0], [
        ['Nucleation sites', 'Points where crystals begin: impurities, additives, pigments.', 0.65, 'More nuclei give smaller, more even crystals.', 'Polymer science textbooks', 2, [0]],
        ['Pigment effects', 'Some colourants act as nucleating agents.', 0.6, 'A colour change can change shrinkage.', 'Studies of pigment nucleation', 2, [1]],
      ]],
      ['Crystals growing', 'How far crystallisation gets before the part freezes.', 'The longer a region stays in the crystallisation range, the more it crystallises.', 'Polymer science textbooks', 2, [0], [
        ['Cooling rate', 'How fast each region passes through the crystallisation range.', 0.85, 'Slow cooling means more crystals and more shrinkage.', 'Polymer science textbooks', 2, [0]],
        ['Flow-induced crystals', 'Crystals that form faster where the melt was stretched.', 0.5, 'Orientation speeds crystallisation along the flow.', 'Polymer science textbooks', 2, [0]],
        ['Mould temperature setting', 'The steel temperature chosen for the resin.', 0.7, 'Sets the cooling rate at the surface.', 'Resin datasheets', 1, [2]],
      ]],
      ['After the mould', 'What carries on after ejection.', 'Semi-crystalline parts are not finished when they leave the tool.', 'Shrinkage handbooks', 2, [3], [
        ['Secondary crystallisation', 'Slow further crystallisation at room temperature.', 0.6, 'Parts keep shrinking for hours or days.', 'Polymer science textbooks', 2, [0]],
        ['Stress relaxation', 'Moulded-in stress easing over time.', 0.5, 'Can release as delayed warp.', 'Shrinkage handbooks', 2, [3]],
      ]],
    ],
    connections: [
      ['Pigment effects', 'Cooling rate', 'changes the effect of', 0.6, 'Nucleated resins crystallise faster, so they respond differently to the same cooling.', 'Studies of pigment nucleation', 2, [1]],
      ['Mould temperature setting', 'Secondary crystallisation', 'trades off against', 0.65, 'A colder mould freezes less crystallinity in, leaving more to happen later.', 'Polymer science textbooks', 2, [0]],
      ['Flow-induced crystals', 'Stress relaxation', 'feeds', 0.45, 'Oriented crystal regions lock in stress that relaxes later. Speculative link.', 'My inference', 6, []],
    ],
    threads: [
      ['Crystallinity', 'How do I measure and control crystallinity in my parts?', 'Every stage here acts through it.'],
      ['Resin batch or supplier change', 'Did a pigment or material change start my warp?', 'Pigment effects are a known hidden cause.'],
      ['Hot parts stacked in boxes', 'Is my part still shrinking after it leaves the mould?', 'Post-mould changes explain warp found later.'],
    ],
    sources: [
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'],
      [2, 'Peer-reviewed', 'Studies of pigment nucleation and shrinkage in polypropylene'],
      [1, 'Datasheet', 'Resin manufacturers’ processing guides', '', 'Conflict of interest'],
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013)'],
    ],
  },

  'Glass-fibre orientation': {
    liner: 'What sets which way fibres point, layer by layer, and how that becomes shrinkage.',
    reading: 'You went deeper into fibre orientation, so I split it into what the flow does to fibres, how the layers through the wall differ, and what the fibres themselves bring.',
    subs: [
      ['Flow effects', 'How the melt’s movement turns fibres.', 'Fibres align with stretching flow and turn across in spreading flow.', 'Orientation studies', 2, [1], [
        ['Shear near the walls', 'Fast shearing flow next to the steel.', 0.6, 'Aligns fibres with the flow direction near the skin.', 'Orientation studies', 2, [1]],
        ['Spreading flow', 'Flow fanning out from a gate.', 0.6, 'Turns fibres across the flow in the middle of the wall.', 'Orientation studies', 2, [1]],
        ['Weld-line regions', 'Where two flow fronts meet.', 0.45, 'Fibres lie along the weld, weakening it.', 'Part design textbooks', 2, [0]],
      ]],
      ['Layers through the wall', 'Skin, shell and core each with their own orientation.', 'A wall is a sandwich of differently oriented layers.', 'Orientation studies', 2, [1], [
        ['Shell layers', 'Highly aligned with the flow.', 0.7, 'Usually the thickest layers, so they dominate shrinkage.', 'Orientation studies', 2, [1]],
        ['Core layer', 'Fibres lying across the flow.', 0.65, 'Thicker in thick walls, shifting the balance.', 'Orientation studies', 2, [1]],
      ]],
      ['The fibres', 'What the reinforcement itself brings.', 'Content and length decide how strong the orientation effect is.', 'Resin datasheets', 1, [2], [
        ['Fibre loading', 'Percentage of glass by weight.', 0.6, 'More glass, more difference between directions.', 'Resin datasheets', 1, [2]],
        ['Fibre breakage', 'Fibres shortened by screws and gates.', 0.4, 'Shorter fibres orient less strongly.', 'Processing studies', 2, [1]],
      ]],
    ],
    connections: [
      ['Spreading flow', 'Core layer', 'creates', 0.75, 'Spreading flow is what turns core fibres across.', 'Orientation studies', 2, [1]],
      ['Fibre loading', 'Shell layers', 'amplifies', 0.6, 'More fibres in the aligned shell means more directional shrinkage.', 'Resin datasheets', 1, [2]],
      ['Fibre breakage', 'Weld-line regions', 'eases', 0.4, 'Shorter fibres may weaken welds less. Speculative.', 'My inference', 6, []],
    ],
    threads: [
      ['Gate location', 'Would moving the gate give a better fibre pattern?', 'The gate sets the flow that orients the fibres.'],
      ['Direction-dependent shrinkage', 'How big is the flow versus cross-flow shrinkage difference here?', 'The effect fibres have on warp.'],
      ['Mould flow simulation', 'Can simulation predict the fibre orientation in my part?', 'Orientation is hard to see without it.'],
    ],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [2, 'Textbook', 'Osswald, Turng & Gramann, Injection Molding Handbook, 2nd ed. (Hanser, 2008)'],
      [1, 'Datasheet', 'Glass-filled nylon datasheets (flow and cross-flow shrinkage)', '', 'Conflict of interest'],
    ],
  },

  'Gate location': {
    liner: 'What a gate decides about filling, packing and orientation, and what limits where it can go.',
    reading: 'You went deeper into gate location, so I split it into what the gate controls during filling, during packing, and the practical limits on placing it.',
    subs: [
      ['During filling', 'How plastic flows from the gate across the cavity.', 'The gate is the start of every flow path.', 'Gating handbooks', 2, [0], [
        ['Flow direction', 'Which way the melt travels through each region.', 0.75, 'Sets molecular and fibre orientation.', 'Gating handbooks', 2, [0]],
        ['Flow length', 'Distance from gate to the last place to fill.', 0.6, 'Long flows lose pressure and temperature.', 'Flow analysis textbooks', 2, [1]],
        ['Weld line positions', 'Where flow fronts meet.', 0.4, 'Moving the gate moves the welds.', 'Part design textbooks', 2, [0]],
      ]],
      ['During packing', 'How well the gate lets extra plastic in after filling.', 'Packing works through the gate, so the gate limits it.', 'Scientific moulding practice', 2, [2], [
        ['Gate freeze time', 'When the gate solidifies and packing stops.', 0.75, 'A small gate freezes early and ends packing.', 'Scientific moulding practice', 2, [2]],
        ['Gate to thick section', 'Whether the gate feeds into thick or thin areas.', 0.7, 'Gating into the thick section keeps it packed; gating thin starves it.', 'Gating handbooks', 2, [0]],
      ]],
      ['Placement limits', 'What stops the gate going where flow wants it.', 'The best place for flow is often not allowed.', 'Mould design guides', 3, [0], [
        ['Cosmetic surfaces', 'Gate marks not allowed on show faces.', 0.5, 'Pushes gates to hidden edges.', 'Design practice', 4, []],
        ['Tool construction', 'Slides, cores and cooling in the way.', 0.45, 'Limits where a gate can physically be.', 'Mould design textbooks', 2, [1]],
      ]],
    ],
    connections: [
      ['Gate to thick section', 'Gate freeze time', 'depends on', 0.7, 'Gating into thick sections only helps if the gate stays open long enough.', 'Gating handbooks', 2, [0]],
      ['Cosmetic surfaces', 'Flow direction', 'constrains', 0.6, 'Hidden gate positions often give awkward flow directions.', 'Design practice', 4, []],
      ['Flow length', 'Weld line positions', 'trades off against', 0.5, 'Adding gates shortens flow but adds welds.', 'Gating handbooks', 2, [0]],
    ],
    threads: [
      ['Low packing pressure', 'Is my gate freezing before thick areas are packed?', 'Gate freeze time scored high.'],
      ['Glass-fibre orientation', 'How does my gate position set fibre orientation?', 'For filled parts, the biggest gate effect.'],
      ['Mould flow simulation', 'Can I test gate positions before changing the tool?', 'Moving a gate is expensive to do blind.'],
    ],
    sources: [
      [2, 'Handbook', 'Beaumont, J. P. Runner and Gating Design Handbook, 2nd ed. (Hanser, 2007)'],
      [2, 'Textbook', 'Kazmer, D. O. Injection Mold Design Engineering, 2nd ed. (Hanser, 2016)'],
      [2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)'],
    ],
  },

  'Low packing pressure': {
    liner: 'The packing stage broken into what the machine does, what the tool allows, and how to see the result.',
    reading: 'You went deeper into packing, so I split it into the machine settings, the tool features that limit packing, and the measurements that tell you whether it worked.',
    subs: [
      ['Machine settings', 'What the press is told to do after filling.', 'The settings are the first and cheapest thing to check.', 'Scientific moulding practice', 2, [0], [
        ['Hold pressure', 'Pressure applied after the cavity is full.', 0.85, 'Too low, and thick areas end up short.', 'Scientific moulding practice', 2, [0]],
        ['Hold time', 'How long that pressure is applied.', 0.8, 'Stopping before gate freeze lets plastic flow back.', 'Scientific moulding practice', 2, [0]],
        ['Transfer position', 'Where the machine switches from filling to packing.', 0.55, 'Switching too early leaves the cavity underfilled when packing starts.', 'Scientific moulding practice', 2, [0]],
      ]],
      ['Tool limits', 'What the mould allows packing to do.', 'Pressure has to get through the runner and gate to reach the part.', 'Gating handbooks', 2, [1], [
        ['Gate size', 'The gate’s cross-section.', 0.7, 'Small gates freeze first.', 'Gating handbooks', 2, [1]],
        ['Runner length', 'How far plastic travels before the gate.', 0.45, 'Long runners lose pressure.', 'Gating handbooks', 2, [1]],
      ]],
      ['Seeing the result', 'How you know packing is right.', 'Packing problems are invisible without measurement.', 'Scientific moulding practice', 2, [0], [
        ['Part weight', 'Weight of each shot.', 0.7, 'The direct measure of how much was packed in.', 'Scientific moulding practice', 2, [0]],
        ['Cavity pressure sensors', 'Sensors in the mould reading pressure in the part.', 0.5, 'Show the packing actually reaching far areas.', 'Mould instrumentation guides', 3, [2]],
      ]],
    ],
    connections: [
      ['Hold time', 'Gate size', 'limited by', 0.8, 'Hold time beyond gate freeze does nothing, and gate size sets freeze.', 'Scientific moulding practice', 2, [0]],
      ['Part weight', 'Hold time', 'measures', 0.75, 'The gate-freeze study plots weight against hold time.', 'Scientific moulding practice', 2, [0]],
      ['Cavity pressure sensors', 'Runner length', 'reveals', 0.5, 'Sensors show how much pressure the runner loses.', 'Mould instrumentation guides', 3, [2]],
    ],
    threads: [
      ['Gate location', 'Is the gate in the right place to pack the thick areas?', 'Packing works through the gate.'],
      ['Sink marks', 'Are sink marks telling me the part is under-packed?', 'The visible sign of under-packing.'],
      ['Differential shrinkage', 'How much of my warp comes from uneven packing?', 'Uneven packing is one route to uneven shrinkage.'],
    ],
    sources: [
      [2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)'],
      [2, 'Handbook', 'Beaumont, J. P. Runner and Gating Design Handbook, 2nd ed. (Hanser, 2007)'],
      [3, 'Company guide', 'Cavity pressure sensor makers’ application notes', '', 'Conflict of interest'],
    ],
  },

  'Ejecting too early': {
    liner: 'What decides when a part is ready to leave the mould, and what happens if it leaves too soon.',
    reading: 'You went deeper into early ejection, so I split it into what makes a part ready, the ejection itself, and the part’s life just after.',
    subs: [
      ['Readiness', 'When the part is stiff enough to eject.', 'Ejection should wait for the thickest region, not the average.', 'Heat-transfer physics', 2, [0], [
        ['Ejection temperature', 'The temperature at which the resin is stiff enough.', 0.75, 'Each resin has a recommended ejection temperature.', 'Resin datasheets', 1, [1]],
        ['Thickest region', 'The slowest part of the wall to cool.', 0.8, 'It decides when the whole part is ready.', 'Heat-transfer physics', 2, [0]],
      ]],
      ['Ejection', 'How the part is pushed out.', 'A soft part deforms where it’s pushed.', 'Mould design textbooks', 2, [2], [
        ['Ejector pin layout', 'How many pins, where, and how big.', 0.6, 'Few small pins concentrate force on a soft part.', 'Mould design textbooks', 2, [2]],
        ['Draft and release', 'How easily the part slides off the core.', 0.5, 'Poor draft means more force to eject.', 'Part design textbooks', 2, [2]],
      ]],
      ['Just after', 'The first minutes outside the mould.', 'The part is still hot and shrinking.', 'Shrinkage handbooks', 2, [3], [
        ['Unsupported cooling', 'Shrinking with nothing holding the shape.', 0.7, 'Uneven shrinkage now bends the part freely.', 'Shrinkage handbooks', 2, [3]],
        ['Handling and drop', 'Falling onto a conveyor or into a bin.', 0.4, 'Soft parts can be bent by the fall.', 'Shop-floor experience', 5, []],
      ]],
    ],
    connections: [
      ['Thickest region', 'Ejection temperature', 'decides when it reaches', 0.75, 'The thickest region is last to reach ejection temperature.', 'Heat-transfer physics', 2, [0]],
      ['Ejector pin layout', 'Draft and release', 'works against', 0.55, 'Poor draft needs more ejection force through the same pins.', 'Mould design textbooks', 2, [2]],
      ['Unsupported cooling', 'Handling and drop', 'compounds', 0.45, 'A soft part dropped onto a hard surface bends more. Plausible.', 'My inference', 6, []],
    ],
    threads: [
      ['Longer cycle time', 'How much cooling time do I actually need?', 'The trade-off behind early ejection.'],
      ['Hot parts stacked in boxes', 'Are my parts still warm when they’re packed?', 'The next place a soft part can deform.'],
      ['Non-uniform wall thickness', 'Is a thick section setting my cooling time?', 'The thickest region decides readiness.'],
    ],
    sources: [
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011)'],
      [1, 'Datasheet', 'Resin manufacturers’ processing guides (ejection temperatures)', '', 'Conflict of interest'],
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002), chapter on ejection'],
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013)'],
    ],
  },

  'Thick ribs and bosses': {
    liner: 'What happens at the junction where a rib or boss meets the wall.',
    reading: 'You went deeper into thick ribs and bosses, so I split it into the geometry of the junction, what the hot spot does as it cools, and the design levers that remove it.',
    subs: [
      ['The junction', 'Where rib or boss meets the wall.', 'The junction is thicker than either piece.', 'Part design textbooks', 2, [0], [
        ['Inscribed circle', 'The largest circle that fits in the junction.', 0.75, 'Its diameter is the real local thickness.', 'Part design textbooks', 2, [0]],
        ['Root radius', 'The fillet at the base of the rib.', 0.55, 'A big radius adds mass; none adds stress. Usually 0.25 to 0.5 of the wall.', 'Part design textbooks', 2, [0]],
      ]],
      ['The hot spot', 'What the junction does as it cools.', 'The extra mass cools last.', 'Heat-transfer physics', 2, [1], [
        ['Late freezing', 'The junction stays molten after the wall has set.', 0.8, 'It keeps shrinking and pulls on the wall around it.', 'Heat-transfer physics', 2, [1]],
        ['Surface pull-in', 'The opposite face drawn inward.', 0.7, 'Visible as a sink mark.', 'Part design textbooks', 2, [0]],
        ['One-sided ribbing', 'Many ribs on one face of a flat part.', 0.6, 'All that extra shrinkage on one side bows the part.', 'Resin suppliers’ guides', 3, [2]],
      ]],
      ['Design levers', 'How the junction is designed out.', 'Rules exist for each part of the junction.', 'Resin suppliers’ guides', 3, [2], [
        ['Rib-to-wall ratio', 'Rib thickness as a share of the wall.', 0.8, '50 to 60% keeps the junction close to the wall thickness.', 'Resin suppliers’ guides', 3, [2]],
        ['More, thinner ribs', 'Several thin ribs instead of one thick.', 0.55, 'Same stiffness, no hot spot.', 'Part design textbooks', 2, [0]],
      ]],
    ],
    connections: [
      ['Rib-to-wall ratio', 'Inscribed circle', 'sets', 0.8, 'The ratio controls how big the inscribed circle gets.', 'Part design textbooks', 2, [0]],
      ['Root radius', 'Late freezing', 'trades off against', 0.6, 'Bigger radii reduce stress but add mass that freezes late.', 'Part design textbooks', 2, [0]],
      ['One-sided ribbing', 'More, thinner ribs', 'eased by', 0.45, 'Thinner ribs reduce the one-sided pull. Partly; balance matters more.', 'My inference', 6, []],
    ],
    threads: [
      ['Screw bosses', 'Are my bosses cored and sized right?', 'Bosses are the other half of this topic.'],
      ['Sink marks', 'Are the sinks on my part opposite ribs?', 'The clue that points at ribs.'],
      ['Design for manufacture', 'What rules should my ribs follow?', 'Where the design levers come from.'],
    ],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011)'],
      [3, 'Design guide', 'Resin suppliers’ rib design rules', '', 'Conflict of interest'],
    ],
  },

  'Hot parts stacked in boxes': {
    liner: 'The hours after moulding, broken into the part’s state, the packing, and the evidence.',
    reading: 'You went deeper into hot stacking, so I looked at the part’s state when it’s packed, the conditions in the box, and how to prove this is the cause.',
    subs: [
      ['Part state at packing', 'How warm and soft the part still is.', 'The warmer the part, the more it can still move.', 'Shrinkage handbooks', 2, [0], [
        ['Core temperature', 'The inside of thick sections, still hot after the surface cools.', 0.75, 'Thick sections stay warm for minutes after ejection.', 'Heat-transfer physics', 2, [1]],
        ['Remaining shrinkage', 'Shrinkage still to come.', 0.7, 'Semi-crystalline parts have a lot left.', 'Shrinkage handbooks', 2, [0]],
      ]],
      ['In the box', 'What the part experiences after packing.', 'Load and trapped heat make the box a slow press.', 'Shop-floor experience', 5, [2], [
        ['Stack weight', 'Weight of parts above.', 0.75, 'Squashes warm parts into new shapes.', 'Shop-floor experience', 5, [2]],
        ['Trapped heat', 'Parts packed together keep each other warm.', 0.6, 'Slows cooling, extending the soft period.', 'My inference', 6, []],
        ['Nesting shape', 'How parts sit against each other.', 0.5, 'Parts nested unevenly are pushed out of true.', 'Shop-floor experience', 5, [2]],
      ]],
      ['The evidence', 'How to prove warp happens after the press.', 'This cause leaves a time signature.', 'Shrinkage handbooks', 2, [0], [
        ['Overnight growth', 'Warp that is larger after 24 hours.', 0.8, 'The test that separates this cause from mould causes.', 'Shrinkage handbooks', 2, [0]],
        ['Position in the box', 'Bottom parts worse than top parts.', 0.65, 'Points straight at stack weight.', 'My inference', 6, []],
      ]],
    ],
    connections: [
      ['Stack weight', 'Position in the box', 'shows as', 0.75, 'If stack weight matters, the bottom layers are worse.', 'My inference', 6, []],
      ['Core temperature', 'Trapped heat', 'prolonged by', 0.6, 'Packed parts keep their core warm longer.', 'Heat-transfer physics', 2, [1]],
      ['Remaining shrinkage', 'Overnight growth', 'causes', 0.7, 'What’s left shrinks overnight, under load.', 'Shrinkage handbooks', 2, [0]],
    ],
    threads: [
      ['Ejecting too early', 'Are parts leaving the mould before they’re ready?', 'The step before packing.'],
      ['Semi-crystalline polymers', 'How much will my resin keep shrinking after moulding?', 'Sets how much post-mould shrinkage there is.'],
      ['Annealing', 'Would annealing stabilise the parts before packing?', 'A way to finish the shrinkage under control.'],
    ],
    sources: [
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013), post-mould shrinkage'],
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011)'],
      [5, 'Forum', 'Forum reports of lids warping in storage'],
    ],
  },

  'Resin batch or supplier change': {
    liner: 'The ways material can change without the drawing changing, and how to trace them.',
    reading: 'You went deeper into a material change, so I split it into what can change in the resin, in what’s added to it, and in the records that let you trace it.',
    subs: [
      ['The base resin', 'The polymer itself.', 'Even within one grade, the polymer varies.', 'Processing articles', 3, [0], [
        ['Melt flow index', 'How easily the resin flows, measured at the supplier.', 0.65, 'Higher flow packs differently and shrinks differently.', 'Processing articles', 3, [0]],
        ['Molecular weight spread', 'The mix of chain lengths.', 0.45, 'Changes crystallisation and shrinkage.', 'Polymer science textbooks', 2, [1]],
      ]],
      ['What’s added', 'Regrind, colour and additives.', 'Additions change between runs more often than the resin.', 'Process guides', 3, [2], [
        ['Regrind share', 'How much reground scrap is mixed in.', 0.7, 'Regrind has shorter chains and behaves differently.', 'Process guides', 3, [2]],
        ['Masterbatch colour', 'The colour concentrate.', 0.75, 'Some pigments nucleate crystals and change shrinkage.', 'Studies of pigment nucleation', 2, [1]],
        ['Let-down ratio', 'How much masterbatch per kilogram of resin.', 0.5, 'More pigment, more nucleation effect.', 'Process guides', 3, [2]],
      ]],
      ['Traceability', 'Records that link parts to material.', 'Without records you can’t prove a change.', 'Quality practice', 3, [3], [
        ['Lot records', 'Which lot went into which run.', 0.75, 'Lets you line up the start of warp with a change.', 'Quality practice', 3, [3]],
        ['Retained samples', 'Material kept from previous lots.', 0.55, 'A known good lot to compare against.', 'Quality practice', 3, [3]],
      ]],
    ],
    connections: [
      ['Masterbatch colour', 'Let-down ratio', 'scaled by', 0.65, 'The pigment effect grows with how much masterbatch goes in.', 'Process guides', 3, [2]],
      ['Lot records', 'Melt flow index', 'checks', 0.6, 'Certificates on each lot give its MFI.', 'Quality practice', 3, [3]],
      ['Regrind share', 'Molecular weight spread', 'widens', 0.55, 'Reprocessing shortens chains and widens the spread.', 'Polymer science textbooks', 2, [1]],
    ],
    threads: [
      ['Crystallinity', 'Did the new material change how my part crystallises?', 'Most material effects work through it.'],
      ['Wet resin', 'Could the new lot just be wet?', 'Worth ruling out alongside.'],
      ['Semi-crystalline polymers', 'Why is my resin so sensitive to small changes?', 'Semi-crystalline resins react most.'],
    ],
    sources: [
      [3, 'Trade article', 'Processing magazine articles on lot-to-lot variation'],
      [2, 'Peer-reviewed', 'Studies of pigment nucleation and shrinkage in polypropylene'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding (SME, 1996), material handling'],
      [3, 'Standard practice', 'ISO 9001 traceability requirements for production records'],
    ],
  },

  'Wet resin': {
    liner: 'What moisture does to a resin from storage to the part, and how to keep it out.',
    reading: 'You went deeper into wet resin, so I followed the water: how it gets in, what it does in the barrel, and how drying removes it.',
    subs: [
      ['Getting in', 'How resin picks up water.', 'Hygroscopic resins absorb water from the air within hours.', 'Resin datasheets', 1, [0], [
        ['Open bags and hoppers', 'Resin left exposed to air.', 0.6, 'Absorbs moisture before it reaches the dryer.', 'Drying guidance', 3, [0]],
        ['Humid seasons', 'Summer humidity.', 0.45, 'Problems that come and go with the weather point here.', 'Moulders’ experience', 5, []],
      ]],
      ['In the barrel', 'What water does when the resin melts.', 'Heat plus water breaks chains.', 'Polymer science textbooks', 2, [1], [
        ['Hydrolysis', 'Water breaking polymer chains.', 0.75, 'Lowers strength and changes flow.', 'Polymer science textbooks', 2, [1]],
        ['Steam bubbles', 'Water turning to vapour.', 0.7, 'Dragged to the surface as splay.', 'Defect guides', 3, [2]],
      ]],
      ['Drying', 'Removing water before moulding.', 'Most moisture problems are drying problems.', 'Drying guidance', 3, [0], [
        ['Dew point', 'How dry the dryer’s air is.', 0.7, 'A saturated desiccant stops drying even though it’s hot.', 'Drying guidance', 3, [0]],
        ['Residence time', 'How long the resin spends in the dryer.', 0.65, 'Too short a time, from too high a throughput, leaves it wet.', 'Drying guidance', 3, [0]],
        ['Over-drying', 'Too long at temperature.', 0.35, 'Can yellow or degrade some resins.', 'Drying guidance', 3, [0]],
      ]],
    ],
    connections: [
      ['Residence time', 'Open bags and hoppers', 'undone by', 0.6, 'Dry resin re-absorbs water if the hopper is open.', 'Drying guidance', 3, [0]],
      ['Hydrolysis', 'Dew point', 'prevented by', 0.7, 'A low dew point is what keeps hydrolysis from happening.', 'Drying guidance', 3, [0]],
      ['Humid seasons', 'Dew point', 'strains', 0.45, 'Humid air loads the desiccant faster. Plausible seasonal link.', 'My inference', 6, []],
    ],
    threads: [
      ['Resin batch or supplier change', 'Is the problem the lot rather than the moisture?', 'Usually checked together.'],
      ['Crystallinity', 'Does moisture change how my resin crystallises?', 'A way moisture might reach shrinkage.'],
      ['Warped moulded part', 'If not moisture, what else is warping my part?', 'Back to the main question.'],
    ],
    sources: [
      [1, 'Datasheet', 'Resin manufacturers’ drying recommendations', '', 'Conflict of interest'],
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers (Hanser, 2012)'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding (SME, 1996), defects chapter'],
    ],
  },

  'Assembly fit failure': {
    liner: 'An assembly broken into the features that must line up, the parts involved, and how fit is checked.',
    reading: 'You went deeper into fit failure, so I split it into the features that fail, the parts and tolerances that contribute, and how fit is verified.',
    subs: [
      ['Failing features', 'What stops the assembly going together.', 'Some features are far more sensitive to warp than others.', 'Assembly guides', 3, [1], [
        ['Snap engagement', 'How far a hook overlaps its catch.', 0.75, 'Often under a millimetre, so small warp defeats it.', 'Snap-fit handbooks', 2, [0]],
        ['Boss alignment', 'Holes lining up with their mates.', 0.6, 'Distant bosses move most on a bowed part.', 'Assembly guides', 3, [1]],
        ['Seam closure', 'Two housings meeting evenly.', 0.6, 'The visible symptom of the same misfit.', 'Assembly guides', 3, [1]],
      ]],
      ['Contributors', 'Which parts and tolerances add up to the misfit.', 'A misfit is rarely one part’s fault.', 'Tolerancing textbooks', 2, [2], [
        ['This part’s warp', 'The part under investigation.', 0.8, 'The usual first suspect.', 'Assembly guides', 3, [1]],
        ['Mating part', 'The part it joins.', 0.6, 'May warp the opposite way and double the gap.', 'Assembly practice', 4, []],
        ['Stack of tolerances', 'Every tolerance in the chain added up.', 0.5, 'Can fail even with every part in tolerance.', 'Tolerancing textbooks', 2, [2]],
      ]],
      ['Verification', 'How fit is checked.', 'The way you measure decides what you find.', 'Quality practice', 3, [2], [
        ['Restrained fixture', 'Holding the part as assembled.', 0.65, 'Shows whether warp matters in use.', 'Quality practice', 3, [2]],
        ['Trial assembly', 'Building a few assemblies from sample parts.', 0.55, 'The final check of fit.', 'Quality practice', 3, []],
      ]],
    ],
    connections: [
      ['Snap engagement', 'This part’s warp', 'defeated by', 0.75, 'A small bow can pull a hook off its catch.', 'Snap-fit handbooks', 2, [0]],
      ['Mating part', 'Seam closure', 'doubles', 0.55, 'Opposite warps add at the seam.', 'Assembly practice', 4, []],
      ['Restrained fixture', 'Stack of tolerances', 'separates', 0.5, 'Fixturing shows whether the issue is warp or the stack.', 'Quality practice', 3, [2]],
    ],
    threads: [
      ['Flatness tolerances', 'Is the part actually out of tolerance, or is the tolerance wrong?', 'Decides whose problem the misfit is.'],
      ['Visible gaps and flushness', 'How does the misfit show at the seams?', 'The visible side of the same problem.'],
      ['Warped moulded part', 'What is warping the part in the first place?', 'Back to the root cause.'],
    ],
    sources: [
      [2, 'Handbook', 'Bonenberger, P. R. The First Snap-Fit Handbook, 3rd ed. (Hanser, 2016)'],
      [2, 'Textbook', 'Tres, P. A. Designing Plastic Parts for Assembly, 8th ed. (Hanser, 2017)'],
      [1, 'Standard', 'ASME Y14.5-2018: Dimensioning and Tolerancing'],
    ],
  },

  'Visible gaps and flushness': {
    liner: 'A seam broken into what sets the gap, what the eye notices, and how designers hide variation.',
    reading: 'You went deeper into visible gaps, so I split the seam into its geometry, how people perceive it, and the design tools that control it.',
    subs: [
      ['Seam geometry', 'What physically sets the gap.', 'The gap is the result of both parts’ shapes and the fixing.', 'Assembly guides', 3, [0], [
        ['Gap width', 'The distance across the seam.', 0.75, 'Varies along a bowed edge.', 'Assembly guides', 3, [0]],
        ['Flush step', 'One surface standing proud of the other.', 0.65, 'A twisted part steps at the seam.', 'Assembly guides', 3, [0]],
        ['Fixing points', 'Where screws or snaps hold the seam.', 0.55, 'Between them, the seam springs open.', 'Assembly guides', 3, [0]],
      ]],
      ['Perception', 'What the eye notices.', 'People judge quality by seams.', 'Perceived-quality practice', 4, [1], [
        ['Gap variation', 'A gap that changes along its length.', 0.8, 'Variation is noticed more than an even wide gap.', 'Perceived-quality practice', 4, [1]],
        ['Light and shadow', 'How the seam catches light.', 0.45, 'Gloss and lighting exaggerate steps.', 'Design practice', 4, []],
      ]],
      ['Design tools', 'How designers control seams.', 'Good seam design hides normal variation.', 'Design practice', 4, [2], [
        ['Reveal groove', 'A deliberate shadow gap at the split.', 0.7, 'Makes small variation invisible.', 'Design practice', 4, [2]],
        ['Lip and groove', 'One part overlapping the other.', 0.55, 'Hides the gap and locates the parts.', 'Assembly guides', 3, [0]],
      ]],
    ],
    connections: [
      ['Fixing points', 'Gap width', 'controls', 0.7, 'Gap is smallest at fixings and widest between.', 'Assembly guides', 3, [0]],
      ['Reveal groove', 'Gap variation', 'hides', 0.7, 'A designed gap masks variation.', 'Design practice', 4, [2]],
      ['Light and shadow', 'Flush step', 'exaggerates', 0.45, 'Glossy surfaces make small steps look larger. Plausible.', 'My inference', 6, []],
    ],
    threads: [
      ['Industrial design', 'How should seams be designed to hide variation?', 'Where the design tools come from.'],
      ['Assembly fit failure', 'Are the gaps a sign of a deeper fit problem?', 'The functional side.'],
      ['Flatness tolerances', 'What flatness do my seams really need?', 'Turns the look into a number.'],
    ],
    sources: [
      [3, 'Textbook', 'Tres, P. A. Designing Plastic Parts for Assembly, 8th ed. (Hanser, 2017)'],
      [4, 'Industry practice', 'Automotive perceived-quality and gap-and-flush guides'],
      [4, 'Industry practice', 'Industrial design studios’ split-line guidance'],
    ],
  },

  'Seal and IP rating failure': {
    liner: 'A seal broken into the gasket, the flange it sits on, and the test that finds the leak.',
    reading: 'You went deeper into seal failure, so I split it into the gasket’s needs, the flange and fixing that must meet them, and how testing reveals a failure.',
    subs: [
      ['The gasket', 'What the seal needs to work.', 'Every gasket has a compression window.', 'Gasket makers’ guides', 3, [1], [
        ['Compression window', 'Minimum and maximum squeeze.', 0.85, 'Outside it, the seal leaks or the gasket is crushed.', 'Gasket makers’ guides', 3, [1]],
        ['Gasket hardness', 'How soft the material is.', 0.55, 'Softer gaskets tolerate more flange variation.', 'Gasket makers’ guides', 3, [1]],
      ]],
      ['The flange', 'The surface the gasket sits on.', 'The flange must stay within the window all round.', 'Design guides', 3, [1], [
        ['Flange flatness', 'How flat the sealing surface is.', 0.85, 'Warp leaves low spots.', 'Design guides', 3, [1]],
        ['Flange stiffness', 'How much it bends under gasket load.', 0.6, 'A flexible flange lifts between screws.', 'Design guides', 3, [1]],
        ['Screw pitch', 'Distance between fixings.', 0.55, 'Long spans lift more.', 'Design guides', 3, [1]],
      ]],
      ['Testing', 'How leaks are found.', 'IP tests are designed to find weak spots.', 'IEC 60529', 1, [0], [
        ['Immersion test', 'IPX7: submerged at one metre for 30 minutes.', 0.6, 'Finds low spots in the seal.', 'IEC 60529', 1, [0]],
        ['Leak location', 'Where water got in.', 0.65, 'Mid-span leaks point at the flange, not the gasket.', 'Testing practice', 4, []],
      ]],
    ],
    connections: [
      ['Flange flatness', 'Compression window', 'must fit within', 0.85, 'Flatness variation has to be smaller than the window.', 'Gasket makers’ guides', 3, [1]],
      ['Flange stiffness', 'Screw pitch', 'trades off against', 0.7, 'Stiffer flanges allow fewer screws.', 'Design guides', 3, [1]],
      ['Leak location', 'Screw pitch', 'points to', 0.6, 'Leaks between screws suggest the pitch is too wide.', 'Testing practice', 4, []],
    ],
    threads: [
      ['Flatness tolerances', 'What flange flatness does my gasket need?', 'The link between seal and drawing.'],
      ['Warped moulded part', 'What is warping the flange?', 'Back to the cause.'],
      ['Design for manufacture', 'How should a sealing flange be designed for moulding?', 'Prevents it next time.'],
    ],
    sources: [
      [1, 'Standard', 'IEC 60529: Degrees of protection provided by enclosures (IP code)'],
      [3, 'Design guide', 'Gasket manufacturers’ compression and flange design guides', '', 'Conflict of interest'],
      [3, 'Encyclopedia', 'IP code, Wikipedia', 'https://en.wikipedia.org/wiki/IP_code'],
    ],
  },

  'Scrap rate and cost': {
    liner: 'The cost of warp broken into what’s scrapped, what it costs, and what the money could fix.',
    reading: 'You went deeper into scrap and cost, so I split it into how scrap is counted, what each scrapped part costs, and how that cost becomes a case for a fix.',
    subs: [
      ['Counting scrap', 'How rejects are found and recorded.', 'You can’t fix what isn’t counted properly.', 'Quality practice', 3, [1], [
        ['Reject criteria', 'What counts as a reject.', 0.65, 'Vague criteria give noisy numbers.', 'Quality practice', 3, [1]],
        ['Scrap by cavity', 'Rejects broken down by mould cavity.', 0.7, 'One bad cavity points at the tool.', 'Quality practice', 3, [1]],
      ]],
      ['Cost per reject', 'What each scrapped part costs.', 'The true cost is more than material.', 'Costing practice', 3, [0], [
        ['Machine hour rate', 'The cost of an hour of press time.', 0.75, 'Usually the biggest share.', 'Costing practice', 3, [0]],
        ['Material lost', 'Resin in scrapped parts, less regrind recovered.', 0.55, 'Smaller than people expect.', 'Costing practice', 3, [0]],
        ['Knock-on costs', 'Overtime, expediting and late deliveries.', 0.5, 'Often missed in scrap reports.', 'My inference', 6, []],
      ]],
      ['The case for a fix', 'Turning cost into a decision.', 'A fix is justified when savings beat its cost.', 'Costing practice', 3, [0], [
        ['Annual scrap cost', 'Scrap rate times volume times cost per reject.', 0.75, 'The number that justifies rework.', 'Costing practice', 3, [0]],
        ['Payback period', 'How long a fix takes to pay for itself.', 0.6, 'Tool changes often pay back within months on high-volume parts.', 'Costing practice', 3, [0]],
      ]],
    ],
    connections: [
      ['Scrap by cavity', 'Annual scrap cost', 'feeds', 0.6, 'Fixing one cavity may remove most of the cost.', 'Quality practice', 3, [1]],
      ['Machine hour rate', 'Payback period', 'shortens', 0.65, 'Expensive presses make fixes pay back faster.', 'Costing practice', 3, [0]],
      ['Knock-on costs', 'Annual scrap cost', 'often left out of', 0.5, 'Including them can change the decision.', 'My inference', 6, []],
    ],
    threads: [
      ['Tool rework', 'Is the scrap cost high enough to pay for a tool fix?', 'The decision this cost informs.'],
      ['Resin cost pressure', 'Is cheaper material costing more in scrap?', 'A hidden cost link.'],
      ['Warped moulded part', 'What is causing the rejects?', 'Back to the cause.'],
    ],
    sources: [
      [3, 'Textbook', 'Rosato, D. V. et al. Injection Molding Handbook, 3rd ed. (Kluwer, 2000), costing'],
      [3, 'Textbook', 'Juran’s Quality Handbook, 7th ed. (McGraw-Hill, 2016), cost of poor quality'],
    ],
  },

  'Tool rework': {
    liner: 'A mould rework broken into the kinds of change, the process of getting it right, and the cost.',
    reading: 'You went deeper into tool rework, so I split it into what can be changed in the steel, the trial loop that gets it right, and what it costs.',
    subs: [
      ['Kinds of change', 'What toolmakers can do to fix warp.', 'Each change targets a different cause.', 'Mould design textbooks', 2, [0], [
        ['Steel compensation', 'Recutting the cavity bent the other way.', 0.8, 'Fixes the shape without fixing the cause.', 'Mould design textbooks', 2, [0]],
        ['Cooling additions', 'New channels, baffles or inserts.', 0.75, 'Fixes the cause where there is room.', 'Mould design textbooks', 2, [0]],
        ['Gate changes', 'Moving or enlarging gates.', 0.6, 'Changes flow and packing.', 'Gating handbooks', 2, [1]],
      ]],
      ['The trial loop', 'How a rework is proven.', 'Rework is iterative.', 'Toolmakers’ guidance', 4, [2], [
        ['Measurement', 'Scanning or CMM on trial parts.', 0.65, 'You can only compensate what you measure.', 'Quality practice', 3, [2]],
        ['Stable process first', 'Locking the process before measuring.', 0.7, 'Compensating for a drifting process chases noise.', 'Scientific moulding practice', 2, [2]],
      ]],
      ['Cost', 'What a rework costs.', 'Downtime usually dominates.', 'Costing practice', 3, [], [
        ['Machining', 'Toolroom hours.', 0.5, 'Visible, but often not the biggest cost.', 'Costing practice', 3, []],
        ['Downtime', 'Weeks without the tool.', 0.65, 'Lost production, or bridge tooling.', 'Costing practice', 3, []],
      ]],
    ],
    connections: [
      ['Stable process first', 'Steel compensation', 'must come before', 0.8, 'Compensation only works if the warp is repeatable.', 'Scientific moulding practice', 2, [2]],
      ['Cooling additions', 'Downtime', 'costs more', 0.5, 'Cooling changes take longer than steel adjustment.', 'Toolmakers’ guidance', 4, []],
      ['Measurement', 'Gate changes', 'guides', 0.45, 'Measurements show whether a gate change helped. Plausible.', 'My inference', 6, []],
    ],
    threads: [
      ['Mould flow simulation', 'Can simulation predict the compensation needed?', 'Saves trial loops.'],
      ['Conformal cooling', 'Would a conformal insert fix the cooling in one change?', 'A cooling addition worth comparing.'],
      ['Scrap rate and cost', 'Does the scrap cost justify the rework?', 'The other side of the decision.'],
    ],
    sources: [
      [2, 'Textbook', 'Menges, G., Michaeli, W., Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)'],
      [2, 'Handbook', 'Beaumont, J. P. Runner and Gating Design Handbook (Hanser, 2007)'],
      [2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding (Hanser, 2017)'],
    ],
  },

  'Sink marks': {
    liner: 'A sink mark broken into the thick section behind it, the skin that gives way, and the fixes.',
    reading: 'You went deeper into sink marks, so I split them into the section that shrinks, the surface that is pulled in, and the levers that remove them.',
    subs: [
      ['The section', 'The thick area behind the sink.', 'Every sink has a thick section behind it.', 'Part design textbooks', 2, [0], [
        ['Local mass', 'Extra material at a rib, boss or thickening.', 0.85, 'The source of the extra shrinkage.', 'Part design textbooks', 2, [0]],
        ['Late core shrink', 'The middle shrinking after the surface sets.', 0.7, 'Pulls the surface inward.', 'Heat-transfer physics', 2, [1]],
      ]],
      ['The surface', 'The skin that gives way.', 'Whether it sinks depends on how stiff the skin is.', 'Defect guides', 3, [2], [
        ['Skin stiffness', 'How thick and cold the frozen skin is.', 0.6, 'A thin, warm skin sinks; a stiff one makes a void instead.', 'Defect guides', 3, [2]],
        ['Gloss level', 'How shiny the surface is.', 0.45, 'Gloss shows sinks that texture hides.', 'Design practice', 4, []],
      ]],
      ['Fixes', 'How sinks are removed.', 'Design fixes last; process fixes are quick.', 'Troubleshooting guides', 3, [2], [
        ['More packing', 'Higher or longer hold pressure.', 0.75, 'Fills out the shrinkage.', 'Troubleshooting guides', 3, [2]],
        ['Thinner features', 'Ribs and bosses sized to the rules.', 0.8, 'Removes the extra mass.', 'Part design textbooks', 2, [0]],
        ['Texture', 'A grain on the surface.', 0.4, 'Hides shallow sinks.', 'Design practice', 4, []],
      ]],
    ],
    connections: [
      ['Local mass', 'Thinner features', 'removed by', 0.85, 'Thinner features take away the mass.', 'Part design textbooks', 2, [0]],
      ['Skin stiffness', 'Late core shrink', 'decides the result of', 0.65, 'Same shrinkage gives a sink or a void depending on the skin.', 'Defect guides', 3, [2]],
      ['More packing', 'Late core shrink', 'compensates', 0.7, 'Packing adds material to make up for the shrink.', 'Troubleshooting guides', 3, [2]],
    ],
    threads: [
      ['Thick ribs and bosses', 'Which features are causing the sinks?', 'The commonest source.'],
      ['Low packing pressure', 'Will more packing remove the sinks?', 'The quickest fix to try.'],
      ['Non-uniform wall thickness', 'Do the sinks and the warp share a cause?', 'Seeing both points at the wall.'],
    ],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer (Wiley, 2011)'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding (SME, 1996), defects chapter'],
    ],
  },

  'Mould flow simulation': {
    liner: 'A warpage analysis broken into its inputs, the stages it runs, and how to read the answer.',
    reading: 'You went deeper into mould flow simulation, so I split it into what goes in, what the solver runs, and how the warp result should be read and trusted.',
    subs: [
      ['Inputs', 'What the analysis is built from.', 'Results are only as good as inputs.', 'Simulation textbooks', 2, [0], [
        ['Material card', 'Viscosity, PVT and shrinkage data for the grade.', 0.85, 'The biggest single source of error.', 'Simulation textbooks', 2, [0]],
        ['Mesh', 'The part divided into elements.', 0.6, 'Needs enough layers through the thickness.', 'Simulation textbooks', 2, [0]],
        ['Process settings', 'Temperatures, pressures and times.', 0.55, 'Should match what the press will really run.', 'Simulation documentation', 4, [1]],
      ]],
      ['Stages', 'What the solver runs.', 'Each stage feeds the next.', 'Simulation textbooks', 2, [0], [
        ['Fill and pack', 'Flow, pressure and orientation.', 0.65, 'Sets orientation and packing.', 'Simulation textbooks', 2, [0]],
        ['Cool', 'Mould and part temperatures.', 0.7, 'Finds hot spots.', 'Simulation textbooks', 2, [0]],
      ]],
      ['Reading the answer', 'How to use the warp result.', 'Direction is more trustworthy than magnitude.', 'Moulders’ experience', 5, [1], [
        ['Cause breakdown', 'Warp split into cooling, shrinkage and orientation.', 0.85, 'Tells you which fix to try.', 'Simulation documentation', 4, [1]],
        ['Validation', 'Comparing with real parts.', 0.7, 'Calibrates how far to trust the numbers.', 'Moulders’ experience', 5, []],
      ]],
    ],
    connections: [
      ['Material card', 'Cause breakdown', 'drives', 0.75, 'Shrinkage data dominates the warp result.', 'Simulation textbooks', 2, [0]],
      ['Mesh', 'Fill and pack', 'limits', 0.6, 'Coarse meshes miss orientation layers.', 'Simulation textbooks', 2, [0]],
      ['Validation', 'Process settings', 'checks', 0.5, 'Mismatched settings are a common reason validation fails.', 'Moulders’ experience', 5, []],
    ],
    threads: [
      ['Gate location', 'Which gate position does simulation suggest?', 'A classic use of the tool.'],
      ['Cooling channel layout', 'Does the cooling analysis show hot spots in my layout?', 'The cool stage’s main output.'],
      ['Tool rework', 'Can simulation estimate the steel compensation?', 'Saves trial loops.'],
    ],
    sources: [
      [2, 'Textbook', 'Kennedy, P. & Zheng, R. Flow Analysis of Injection Molds, 2nd ed. (Hanser, 2013)'],
      [3, 'Design guide', 'Shoemaker, J. (ed.) Moldflow Design Guide (Hanser, 2006)', '', 'Conflict of interest'],
    ],
  },

  'Design for manufacture': {
    liner: 'Designing for moulding broken into the rules, the reviews and the people involved.',
    reading: 'You went deeper into design for manufacture, so I split it into the geometry rules, the reviews that apply them, and who needs to be involved.',
    subs: [
      ['Geometry rules', 'The moulding rules for shape.', 'Most warp risks are geometry.', 'Part design textbooks', 2, [0], [
        ['Even walls', 'One nominal wall, within about 25%.', 0.85, 'The rule that prevents most warp.', 'Part design textbooks', 2, [0]],
        ['Rib proportions', '50 to 60% of the wall.', 0.7, 'Stiffness without hot spots.', 'Resin suppliers’ guides', 3, [2]],
        ['Draft', 'Tapered walls for release.', 0.45, 'Eases ejection, reducing distortion.', 'Part design textbooks', 2, [0]],
      ]],
      ['Reviews', 'Where the rules are applied.', 'Rules only help if someone checks.', 'DFMA textbooks', 2, [1], [
        ['Wall-thickness analysis', 'A CAD check of thickness.', 0.7, 'Finds thick zones in minutes.', 'CAD practice', 4, []],
        ['Early simulation', 'Fill and warp on first CAD.', 0.6, 'Tests gate and cooling ideas cheaply.', 'Simulation documentation', 4, []],
      ]],
      ['People', 'Who needs to be involved.', 'Moulding knowledge sits with the toolmaker and moulder.', 'Design practice', 4, [1], [
        ['Toolmaker input', 'Gate, cooling and ejection advice.', 0.75, 'Most cheaply given before the design is frozen.', 'Design practice', 4, [1]],
        ['Designer and engineer together', 'Styling and engineering reviewing together.', 0.6, 'Stops styling creating thick zones.', 'Design practice', 4, [1]],
      ]],
    ],
    connections: [
      ['Even walls', 'Wall-thickness analysis', 'checked by', 0.8, 'The analysis is how the rule is checked.', 'CAD practice', 4, []],
      ['Toolmaker input', 'Early simulation', 'complements', 0.6, 'Experience and simulation catch different problems.', 'Design practice', 4, []],
      ['Designer and engineer together', 'Even walls', 'protects', 0.55, 'Joint reviews keep styling within the rules.', 'Design practice', 4, [1]],
    ],
    threads: [
      ['Nominal wall guidelines', 'What wall thickness should my part use?', 'The first DFM decision.'],
      ['Industrial design', 'How should styling and moulding work together?', 'Where many design causes start.'],
      ['Mould flow simulation', 'What should an early simulation check?', 'The cheapest test before steel.'],
    ],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [2, 'Textbook', 'Boothroyd, G., Dewhurst, P., Knight, W. Product Design for Manufacture and Assembly, 3rd ed. (CRC, 2010)'],
      [3, 'Design guide', 'Resin suppliers’ part design guides', '', 'Conflict of interest'],
    ],
  },

  'Annealing': {
    liner: 'Annealing broken into what happens inside the plastic, the process settings, and the risks.',
    reading: 'You went deeper into annealing, so I split it into the changes inside the material, the oven process, and what can go wrong.',
    subs: [
      ['Inside the plastic', 'What heat does to the material.', 'Annealing works by letting chains move a little.', 'Polymer science textbooks', 2, [0], [
        ['Stress relaxation', 'Locked-in stress easing as chains move.', 0.8, 'The main purpose of annealing.', 'Polymer science textbooks', 2, [0]],
        ['Crystallinity increase', 'Further crystallisation in semi-crystalline resins.', 0.6, 'Adds a little shrinkage, but stabilises it.', 'Polymer science textbooks', 2, [0]],
      ]],
      ['The process', 'Oven settings.', 'Time and temperature must suit the resin.', 'Resin suppliers’ guidance', 3, [1], [
        ['Temperature', 'Usually some way below the heat deflection temperature.', 0.7, 'Too hot and the part sags.', 'Resin suppliers’ guidance', 3, [1]],
        ['Soak time', 'Time at temperature.', 0.55, 'Thick parts need longer.', 'Resin suppliers’ guidance', 3, [1]],
        ['Cool-down rate', 'How fast parts return to room temperature.', 0.5, 'Fast cooling can lock stress back in.', 'Resin suppliers’ guidance', 3, [1]],
      ]],
      ['Risks', 'What can go wrong.', 'Annealing can create the warp it was meant to prevent.', 'Post-moulding guides', 3, [1], [
        ['Release warp', 'Stress releasing as new warp.', 0.7, 'Unsupported parts move as stress releases.', 'Post-moulding guides', 3, [1]],
        ['Fixturing', 'Holding parts in shape during annealing.', 0.6, 'Prevents release warp.', 'Moulders’ practice', 4, []],
      ]],
    ],
    connections: [
      ['Stress relaxation', 'Release warp', 'can cause', 0.75, 'Relaxing stress changes shape if the part isn’t held.', 'Post-moulding guides', 3, [1]],
      ['Fixturing', 'Release warp', 'prevents', 0.7, 'A fixture holds the shape while stress relaxes.', 'Moulders’ practice', 4, []],
      ['Cool-down rate', 'Stress relaxation', 'can undo', 0.5, 'Cooling too fast reintroduces some stress. Plausible.', 'My inference', 6, []],
    ],
    threads: [
      ['Crystallinity', 'How will annealing change my part’s crystallinity?', 'The material side of annealing.'],
      ['Hot parts stacked in boxes', 'Is my part changing shape after moulding?', 'Annealing addresses post-mould changes.'],
      ['Semi-crystalline polymers', 'Why do semi-crystalline parts keep changing?', 'Why annealing helps them.'],
    ],
    sources: [
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers (Hanser, 2012)'],
      [3, 'Design guide', 'Resin suppliers’ annealing guidance', '', 'Conflict of interest'],
    ],
  },

  'Flatness tolerances': {
    liner: 'A flatness requirement broken into what it means, where the number comes from, and how it’s measured.',
    reading: 'You went deeper into flatness tolerances, so I split it into the definition on the drawing, the reasons behind the number, and the measurement.',
    subs: [
      ['The definition', 'What flatness means on a drawing.', 'GD&T defines flatness precisely.', 'ASME Y14.5', 1, [0], [
        ['Tolerance zone', 'Two parallel planes the surface must sit between.', 0.75, 'The size of the zone is the tolerance.', 'ASME Y14.5', 1, [0]],
        ['Free-state note', 'Stating whether the part is measured unrestrained.', 0.6, 'Flexible parts need it said.', 'ASME Y14.5', 1, [0]],
      ]],
      ['The number', 'Where the tolerance value comes from.', 'Good tolerances come from function.', 'Tolerancing textbooks', 2, [1], [
        ['Function', 'What the surface must do: seal, fit, look.', 0.8, 'The reason for the number.', 'Tolerancing textbooks', 2, [1]],
        ['Process capability', 'What moulding can hold for this part.', 0.7, 'A tolerance beyond capability guarantees scrap.', 'ISO 20457', 1, [2]],
      ]],
      ['Measurement', 'How flatness is checked.', 'Method changes the result.', 'Quality practice', 3, [], [
        ['Surface plate and gauge', 'The traditional shop check.', 0.5, 'Quick, but depends on how the part sits.', 'Quality practice', 3, []],
        ['3D scanning', 'A full surface scan.', 0.55, 'Shows the whole warp shape.', 'Quality practice', 3, []],
        ['Restrained fixture', 'Clamping as assembled.', 0.65, 'Measures what matters in use.', 'Quality practice', 3, []],
      ]],
    ],
    connections: [
      ['Free-state note', 'Restrained fixture', 'decides use of', 0.75, 'The note says whether to fixture.', 'ASME Y14.5', 1, [0]],
      ['Function', 'Process capability', 'must be reconciled with', 0.7, 'The tolerance sits between need and capability.', 'Tolerancing textbooks', 2, [1]],
      ['3D scanning', 'Tolerance zone', 'checks', 0.5, 'A scan fits the planes directly.', 'Quality practice', 3, []],
    ],
    threads: [
      ['Seal and IP rating failure', 'What flatness does a sealing face need?', 'A common functional reason.'],
      ['Assembly fit failure', 'Does the assembly need the part this flat?', 'Tests the function.'],
      ['Warped moulded part', 'How do I bring the part within tolerance?', 'Back to the cause.'],
    ],
    sources: [
      [1, 'Standard', 'ASME Y14.5-2018: Dimensioning and Tolerancing'],
      [2, 'Textbook', 'Fischer, B. R. Mechanical Tolerance Stackup and Analysis, 2nd ed. (CRC Press, 2011)'],
      [1, 'Standard', 'ISO 20457: Plastics moulded parts, tolerances and acceptance conditions'],
    ],
  },

  'Industrial design': {
    liner: 'The industrial design process broken into the decisions that end up affecting moulding.',
    reading: 'You went deeper into industrial design, so I split it into the stages of the design process and the decisions in each that later affect how a part moulds.',
    subs: [
      ['Concept', 'Early ideas and form.', 'Form is set before engineering details.', 'Product design textbooks', 2, [0], [
        ['Form language', 'Curves, edges and proportions.', 0.6, 'Some forms are much harder to mould evenly.', 'Design practice', 4, [1]],
        ['Material intent', 'The look and feel wanted.', 0.45, 'May point to a resin before engineering weighs in.', 'Design practice', 4, [1]],
      ]],
      ['Detailing', 'Turning form into a part.', 'Detailing is where walls are set.', 'Design practice', 4, [1], [
        ['Surface modelling', 'The styled outer surfaces in CAD.', 0.7, 'If the inside isn’t shelled to follow, walls vary.', 'CAD practice', 4, [1]],
        ['Split lines', 'Where parts and mould halves divide.', 0.55, 'Sets seams, gates and draft.', 'Design practice', 4, [1]],
      ]],
      ['Handover', 'Passing the design to engineering and tooling.', 'Gaps here let problems through.', 'Product design textbooks', 2, [0], [
        ['Design freeze timing', 'When form stops changing.', 0.6, 'Late changes skip moulding reviews.', 'Design practice', 4, []],
        ['Joint review', 'Design, engineering and toolmaker together.', 0.7, 'Catches thick zones and gate issues early.', 'Design practice', 4, []],
      ]],
    ],
    connections: [
      ['Surface modelling', 'Joint review', 'checked in', 0.65, 'Reviews catch unshelled surfaces.', 'Design practice', 4, []],
      ['Form language', 'Surface modelling', 'carried into', 0.6, 'The form becomes the CAD surfaces.', 'Design practice', 4, [1]],
      ['Design freeze timing', 'Split lines', 'affects', 0.4, 'Late split-line moves can upset gating. Plausible.', 'My inference', 6, []],
    ],
    threads: [
      ['Styling-led surfaces', 'Did styled surfaces leave thick zones?', 'Where design meets wall thickness.'],
      ['Design for manufacture', 'How do design and DFM work together?', 'The process side.'],
      ['Visible gaps and flushness', 'How do design choices affect visible seams?', 'Where design meets appearance.'],
    ],
    sources: [
      [2, 'Textbook', 'Ulrich, K. & Eppinger, S. Product Design and Development, 7th ed. (McGraw-Hill, 2019)'],
      [4, 'Industry practice', 'Industrial design studios’ guidance on designing for moulding'],
    ],
  },

  'Cooling channel layout': {
    liner: 'A cooling layout broken into the channels, the circuits that feed them, and the places they can’t reach.',
    reading: 'You went deeper into the channel layout, so I split it into the geometry of the channels, how they are connected into circuits, and the hard-to-reach areas.',
    subs: [
      ['Channel geometry', 'Size and position of each channel.', 'Geometry sets how evenly heat is pulled out.', 'Mould design textbooks', 2, [0], [
        ['Depth from surface', '1 to 2 channel diameters from the cavity.', 0.8, 'Too deep, and the surface runs hot.', 'Mould design textbooks', 2, [0]],
        ['Pitch', '2 to 3 diameters between channels.', 0.75, 'Too wide, and hot stripes form between.', 'Mould design textbooks', 2, [0]],
        ['Diameter', 'Channel size, often 8 to 14 mm.', 0.45, 'Sets flow and surface area.', 'Mould design textbooks', 2, [0]],
      ]],
      ['Circuits', 'How channels are connected.', 'Connection decides flow and temperature rise.', 'Mould design guides', 3, [1], [
        ['Series versus parallel', 'Channels one after another or side by side.', 0.6, 'Series circuits warm the water along the way.', 'Mould design guides', 3, [1]],
        ['Separate halves', 'Independent circuits for core and cavity.', 0.7, 'Lets each half be controlled.', 'Mould design guides', 3, [1]],
      ]],
      ['Hard-to-reach areas', 'Where drilled channels can’t go.', 'Some geometry defeats straight drilling.', 'Mould design textbooks', 2, [0, 2], [
        ['Tall cores', 'Cores deeper than drilled channels reach.', 0.8, 'Need baffles, bubblers or inserts.', 'Mould design guides', 3, [1]],
        ['Corners and thin steel', 'Places with no room for a channel.', 0.6, 'Often solved with conductive inserts or conformal cooling.', 'Conformal cooling reviews', 2, [2]],
      ]],
    ],
    connections: [
      ['Pitch', 'Depth from surface', 'balanced with', 0.75, 'Deeper channels can be spaced wider, within limits.', 'Mould design textbooks', 2, [0]],
      ['Tall cores', 'Separate halves', 'needs', 0.6, 'Core circuits need their own control to keep up.', 'Mould design guides', 3, [1]],
      ['Series versus parallel', 'Diameter', 'interacts with', 0.45, 'Narrow series circuits lose flow fast.', 'Mould design guides', 3, [1]],
    ],
    threads: [
      ['Conformal cooling', 'Would conformal channels reach the hot spots?', 'The answer for hard-to-reach areas.'],
      ['Inside corners', 'How do I cool the inside corners?', 'A common hard-to-reach area.'],
      ['Thermal imaging of the mould', 'Where is my layout leaving hot spots?', 'The check for any layout.'],
    ],
    sources: [
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'],
      [2, 'Textbook', 'Kazmer, D. O. Injection Mold Design Engineering, 2nd ed. (Hanser, 2016)'],
      [2, 'Peer-reviewed', 'Feng, S., Kamat, A. M., Pei, Y. Design and fabrication of conformal cooling channels in molds: review and progress updates (International Journal of Heat and Mass Transfer, 2021)'],
    ],
  },

  'Core and cavity at different temperatures': {
    liner: 'The two mould halves broken into why they differ, how the part responds, and how to control it.',
    reading: 'You went deeper into the mould-half difference, so I split it into the heat each half receives, how the part bends, and how the difference is measured and controlled.',
    subs: [
      ['Heat load', 'How much heat each half has to remove.', 'The core usually gets more heat and less cooling.', 'Mould design textbooks', 2, [0], [
        ['Core surrounded by plastic', 'Heat flows into the core from all sides.', 0.85, 'The core heats up faster.', 'Mould design textbooks', 2, [0]],
        ['Cooling space in core', 'Room for channels inside the core.', 0.7, 'Cores often have less room.', 'Mould design textbooks', 2, [0]],
      ]],
      ['The part’s response', 'How the part bends.', 'Hotter side shrinks more.', 'Shrinkage handbooks', 2, [1], [
        ['Bow direction', 'Concave towards the hotter half.', 0.8, 'The clue that points to this cause.', 'Shrinkage handbooks', 2, [1]],
        ['Through-wall gradient', 'Temperature difference across the wall.', 0.65, 'Drives the uneven shrinkage.', 'Heat-transfer physics', 2, [2]],
      ]],
      ['Control', 'How to manage the difference.', 'Measuring comes before adjusting.', 'Process guides', 3, [3], [
        ['Surface measurement', 'Probe or thermal camera on each half.', 0.75, 'Set points don’t tell you surface temperature.', 'Process guides', 3, [3]],
        ['Separate controllers', 'One temperature unit per half.', 0.65, 'Allows independent adjustment.', 'Mould design guides', 3, [0]],
        ['Deliberate offset', 'Running one half warmer to cancel warp.', 0.55, 'A process fix for a known bow.', 'Process technicians’ practice', 5, []],
      ]],
    ],
    connections: [
      ['Core surrounded by plastic', 'Bow direction', 'sets', 0.7, 'Usually the core is hotter, so parts bow towards it.', 'Shrinkage handbooks', 2, [1]],
      ['Separate controllers', 'Deliberate offset', 'makes possible', 0.7, 'You can only offset what you control separately.', 'Mould design guides', 3, [0]],
      ['Surface measurement', 'Through-wall gradient', 'estimates', 0.5, 'Surface readings on both halves give the gradient. Roughly.', 'My inference', 6, []],
    ],
    threads: [
      ['Thermal imaging of the mould', 'How do I measure both halves at once?', 'The best measurement for this.'],
      ['Cooling channel layout', 'Does my core have enough cooling?', 'The usual root of the difference.'],
      ['Inside corners', 'Are the core’s corners adding to its heat load?', 'Corners concentrate the problem.'],
    ],
    sources: [
      [2, 'Textbook', 'Menges, G., Michaeli, W., Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)'],
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013)'],
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer (Wiley, 2011)'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding (SME, 1996)'],
    ],
  },

  'Low coolant flow': {
    liner: 'A cooling circuit broken into the water, the plumbing and the checks.',
    reading: 'You went deeper into low coolant flow, so I split it into the water itself, the plumbing between controller and mould, and the measurements that show the problem.',
    subs: [
      ['The water', 'What flows through the channels.', 'Water quality decides how channels age.', 'Maintenance guides', 4, [1], [
        ['Hardness and minerals', 'Dissolved calcium and magnesium.', 0.65, 'Deposit as scale in hot channels.', 'Maintenance guides', 4, [1]],
        ['Flow regime', 'Laminar or turbulent.', 0.8, 'Turbulent flow removes several times more heat.', 'Heat-transfer textbooks', 2, [0]],
      ]],
      ['Plumbing', 'Hoses, manifolds and connections.', 'Many flow problems are outside the mould.', 'Process guides', 3, [2], [
        ['Kinked or long hoses', 'Hoses that restrict flow.', 0.55, 'Easy to miss and easy to fix.', 'Process guides', 3, [2]],
        ['Shared manifolds', 'Several circuits on one supply.', 0.6, 'The lowest-resistance circuit takes most of the flow.', 'Process guides', 3, [2]],
        ['Swapped connections', 'In and out reversed, or circuits mixed up.', 0.45, 'Changes which area gets the coldest water.', 'Process guides', 3, [2]],
      ]],
      ['Checks', 'How the problem is found.', 'Flow is invisible without measurement.', 'Process guides', 3, [2], [
        ['Flow meters', 'Litres per minute on each circuit.', 0.75, 'The direct check.', 'Process guides', 3, [2]],
        ['Delta-T', 'Temperature rise from inlet to outlet.', 0.6, 'Over about 3 °C suggests too little flow.', 'Process guides', 3, [2]],
      ]],
    ],
    connections: [
      ['Hardness and minerals', 'Flow regime', 'degrades', 0.7, 'Scale narrows channels and drops flow towards laminar.', 'Heat-transfer textbooks', 2, [0]],
      ['Shared manifolds', 'Flow meters', 'revealed by', 0.7, 'Meters show which circuit is starved.', 'Process guides', 3, [2]],
      ['Swapped connections', 'Delta-T', 'shows up in', 0.4, 'Odd delta-T patterns can reveal swapped hoses. Plausible.', 'My inference', 6, []],
    ],
    threads: [
      ['Heat transfer', 'Why does turbulent flow matter so much?', 'The physics behind flow.'],
      ['Uneven cooling', 'Is low flow causing uneven cooling across my part?', 'What low flow leads to.'],
      ['Core and cavity at different temperatures', 'Is one half’s circuit starved?', 'Shows up as a half difference.'],
    ],
    sources: [
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011), internal flow'],
      [4, 'Company guide', 'Mould temperature controller makers’ maintenance guides', '', 'Conflict of interest'],
      [3, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'],
    ],
  },

  'Inside corners': {
    liner: 'A box-shaped part’s corner broken into the steel, the plastic and the fixes.',
    reading: 'You went deeper into inside corners, so I split the corner into the steel around it, the plastic in it, and the fixes on each side.',
    subs: [
      ['The steel', 'The core corner.', 'Heat from two walls meets in a small piece of steel.', 'Heat-transfer physics', 2, [0], [
        ['Heat concentration', 'Two walls’ heat flowing into one corner.', 0.85, 'The corner is the core’s hottest point.', 'Heat-transfer physics', 2, [0]],
        ['Distance to cooling', 'How far the nearest channel is.', 0.7, 'Corners are often furthest from channels.', 'Mould design textbooks', 2, [1]],
      ]],
      ['The plastic', 'The corner of the part.', 'Corner geometry adds to the problem.', 'Part design textbooks', 2, [2], [
        ['Corner thickness', 'Thickness at the corner versus the walls.', 0.7, 'Mismatched radii make it thicker.', 'Part design textbooks', 2, [2]],
        ['Wall pull-in', 'Walls drawn inward as the corner shrinks.', 0.8, 'The visible result.', 'Part design textbooks', 2, [2]],
      ]],
      ['Fixes', 'How corners are cooled or designed.', 'Fix the steel or the plastic.', 'Mould design guides', 3, [1, 3], [
        ['Matched radii', 'Inside radius half the wall, outside the inside plus one wall.', 0.65, 'Keeps the corner even.', 'Part design textbooks', 2, [2]],
        ['Conductive insert', 'Copper alloy at the corner.', 0.6, 'Pulls heat out faster.', 'Toolmakers’ literature', 4, [1]],
        ['Conformal channel', 'A printed channel that follows the corner.', 0.6, 'Brings water right to it.', 'Conformal cooling reviews', 2, [3]],
      ]],
    ],
    connections: [
      ['Heat concentration', 'Wall pull-in', 'causes', 0.8, 'The hot corner shrinks more and pulls the walls.', 'Part design textbooks', 2, [2]],
      ['Matched radii', 'Corner thickness', 'evens out', 0.75, 'Matching radii removes extra thickness.', 'Part design textbooks', 2, [2]],
      ['Conductive insert', 'Distance to cooling', 'bridges', 0.55, 'A copper insert carries heat to a distant channel.', 'Toolmakers’ literature', 4, [1]],
    ],
    threads: [
      ['Conformal cooling', 'Would a conformal insert cool my corners?', 'A strong fix for corners.'],
      ['Core and cavity at different temperatures', 'Are my corners making the core run hot?', 'Corners raise the core’s load.'],
      ['Cooling channel layout', 'How far are my channels from the corners?', 'The layout check.'],
    ],
    sources: [
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer (Wiley, 2011)'],
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'],
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [2, 'Peer-reviewed', 'Feng, S., Kamat, A. M., Pei, Y. Design and fabrication of conformal cooling channels in molds: review and progress updates (International Journal of Heat and Mass Transfer, 2021)'],
    ],
  },

  'Longer cycle time': {
    liner: 'A moulding cycle broken into its stages, what sets each one, and where seconds can be saved.',
    reading: 'You went deeper into cycle time, so I split the cycle into its stages, what limits each, and the trade-offs in shortening them.',
    subs: [
      ['Stages', 'The parts of a cycle.', 'Cooling usually dominates.', 'Moulding handbooks', 2, [0], [
        ['Fill', 'Injecting the melt.', 0.35, 'Usually a second or two.', 'Moulding handbooks', 2, [0]],
        ['Pack and hold', 'Holding pressure until the gate freezes.', 0.55, 'Set by gate freeze.', 'Scientific moulding practice', 2, [1]],
        ['Cooling', 'Waiting for the part to stiffen.', 0.85, 'Often half or more of the cycle.', 'Moulding handbooks', 2, [0]],
      ]],
      ['What sets cooling', 'The limits on cooling time.', 'The slowest region sets the time.', 'Heat-transfer physics', 2, [2], [
        ['Thickest wall', 'The thickest section.', 0.85, 'Cooling time goes with thickness squared.', 'Heat-transfer physics', 2, [2]],
        ['Hottest steel', 'The hottest spot in the mould.', 0.7, 'A hot spot slows its region.', 'Mould design textbooks', 2, [0]],
      ]],
      ['Saving seconds', 'Ways to shorten the cycle.', 'Each saving has a cost.', 'Process guides', 3, [0], [
        ['Better cooling', 'More even, stronger heat removal.', 0.7, 'Saves time and reduces warp together.', 'Conformal cooling reviews', 2, [3]],
        ['Thinner walls', 'Redesigning thick sections.', 0.6, 'The biggest saving, but a design change.', 'Part design textbooks', 2, [2]],
        ['Shorter cooling time', 'Simply ejecting sooner.', 0.5, 'Risks early ejection and warp.', 'Process guides', 3, [0]],
      ]],
    ],
    connections: [
      ['Thickest wall', 'Cooling', 'sets', 0.85, 'The thickest wall decides cooling time.', 'Heat-transfer physics', 2, [2]],
      ['Shorter cooling time', 'Thickest wall', 'risky with', 0.65, 'Cutting time with a thick section ejects it soft.', 'Process guides', 3, [0]],
      ['Better cooling', 'Hottest steel', 'targets', 0.6, 'Better cooling removes the hot spot that holds up the cycle.', 'Mould design textbooks', 2, [0]],
    ],
    threads: [
      ['Ejecting too early', 'Has my cooling time been cut too far?', 'The risk of saving seconds.'],
      ['Conformal cooling', 'Would conformal cooling pay back in cycle time?', 'The usual business case.'],
      ['Heat transfer', 'How is cooling time calculated?', 'The physics behind the number.'],
    ],
    sources: [
      [2, 'Textbook', 'Osswald, Turng & Gramann, Injection Molding Handbook, 2nd ed. (Hanser, 2008)'],
      [2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding (Hanser, 2017)'],
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer (Wiley, 2011)'],
      [2, 'Peer-reviewed', 'Feng, S., Kamat, A. M., Pei, Y. Design and fabrication of conformal cooling channels in molds: review and progress updates (International Journal of Heat and Mass Transfer, 2021)'],
    ],
  },

  'Thermal imaging of the mould': {
    liner: 'Thermal imaging broken into the camera, the reading and what to do with it.',
    reading: 'You went deeper into thermal imaging, so I split it into the equipment, how to take a reading you can trust, and how to turn the image into a fix.',
    subs: [
      ['The camera', 'What you need.', 'A modest camera is enough for moulds.', 'Thermography guides', 3, [0], [
        ['Resolution', 'Pixels in the thermal image.', 0.45, 'Enough to see a channel pitch.', 'Thermography guides', 3, [0]],
        ['Temperature range', 'The span the camera reads.', 0.4, 'Must cover mould and part temperatures.', 'Thermography guides', 3, [0]],
      ]],
      ['The reading', 'Taking an image you can trust.', 'Timing and surface decide accuracy.', 'Thermography guides', 3, [0], [
        ['Timing after opening', 'Seconds between mould open and image.', 0.7, 'The surface cools fast once open.', 'Moulders’ practice', 4, []],
        ['Emissivity', 'How much a surface radiates versus reflects.', 0.75, 'Polished steel reflects; readings need a matt reference.', 'Thermography guides', 3, [0]],
        ['Stable cycle', 'Imaging after the tool has warmed up.', 0.6, 'Start-up images mislead.', 'Process guides', 3, []],
      ]],
      ['Using it', 'Turning the picture into a fix.', 'The image points at where to look.', 'Moulders’ practice', 4, [], [
        ['Hot-spot map', 'Marking hot zones on the tool drawing.', 0.75, 'Links hot zones to channels.', 'Moulders’ practice', 4, []],
        ['Before and after', 'Imaging again after a change.', 0.6, 'Proves the fix worked.', 'Moulders’ practice', 4, []],
      ]],
    ],
    connections: [
      ['Emissivity', 'Hot-spot map', 'can distort', 0.65, 'Reflections can fake a hot spot.', 'Thermography guides', 3, [0]],
      ['Stable cycle', 'Timing after opening', 'together set', 0.55, 'Both are needed for repeatable images.', 'Process guides', 3, []],
      ['Before and after', 'Hot-spot map', 'confirms', 0.55, 'Repeat images show whether the map changed.', 'Moulders’ practice', 4, []],
    ],
    threads: [
      ['Core and cavity at different temperatures', 'Do my two halves differ?', 'The commonest finding.'],
      ['Cooling channel layout', 'Do the hot spots match gaps in my layout?', 'Where the image points.'],
      ['Uneven cooling', 'Is the uneven cooling enough to cause my warp?', 'The question behind the image.'],
    ],
    sources: [
      [3, 'Encyclopedia', 'Thermography, Wikipedia', 'https://en.wikipedia.org/wiki/Thermography'],
      [4, 'Company guide', 'Thermal camera makers’ application notes for moulding', '', 'Conflict of interest'],
    ],
  },

  'Conformal cooling': {
    liner: 'A conformal insert broken into how it’s designed, how it’s made, and what it takes to run.',
    reading: 'You went deeper into conformal cooling, so I split it into the channel design, the printing, and running and maintaining the insert.',
    subs: [
      ['Design', 'Laying out channels that follow the part.', 'Design decides how even the cooling is.', 'Conformal cooling reviews', 2, [0], [
        ['Constant offset', 'Channels at a fixed distance from the surface.', 0.8, 'The point of conformal cooling.', 'Conformal cooling reviews', 2, [0]],
        ['Channel cross-section', 'Round, teardrop or other shapes.', 0.45, 'Printing allows shapes drilling can’t.', 'Conformal cooling reviews', 2, [0]],
        ['Pressure drop', 'Resistance of long winding channels.', 0.55, 'Must stay low enough for turbulent flow.', 'Heat-transfer textbooks', 2, [1]],
      ]],
      ['Making it', 'Printing and finishing the insert.', 'Printing makes the channels; machining finishes the surface.', 'Conformal cooling reviews', 2, [0], [
        ['Powder bed printing', 'Laser melting of steel powder.', 0.65, 'Builds channels inside the insert.', 'Conformal cooling reviews', 2, [0]],
        ['Hybrid inserts', 'A printed top on a machined base.', 0.45, 'Cuts print time and cost.', 'Case studies', 4, [2]],
      ]],
      ['Running it', 'Keeping it working.', 'Narrow channels need care.', 'Maintenance guides', 4, [2], [
        ['Water treatment', 'Filtered, treated water.', 0.6, 'Stops scale in narrow channels.', 'Maintenance guides', 4, [2]],
        ['Cleaning access', 'Ports for flushing.', 0.45, 'Printed channels are hard to clean mechanically.', 'Maintenance guides', 4, [2]],
      ]],
    ],
    connections: [
      ['Constant offset', 'Pressure drop', 'trades off against', 0.6, 'Following the surface closely makes channels long and winding.', 'Conformal cooling reviews', 2, [0]],
      ['Water treatment', 'Channel cross-section', 'protects', 0.5, 'Small cross-sections block first.', 'Maintenance guides', 4, [2]],
      ['Hybrid inserts', 'Powder bed printing', 'reduces', 0.55, 'Less printed volume, lower cost.', 'Case studies', 4, [2]],
    ],
    threads: [
      ['Cooling channel layout', 'Where does my drilled layout fall short?', 'Decides if conformal is needed.'],
      ['Longer cycle time', 'How much cycle time would it save?', 'The usual business case.'],
      ['Tool rework', 'Can a conformal insert be added to my existing tool?', 'A rework option.'],
    ],
    sources: [
      [2, 'Peer-reviewed', 'Feng, S., Kamat, A. M., Pei, Y. Design and fabrication of conformal cooling channels in molds: review and progress updates (International Journal of Heat and Mass Transfer, 2021)'],
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer (Wiley, 2011)'],
      [4, 'Company guide', 'Metal 3D printing vendors’ conformal cooling case studies', '', 'Conflict of interest'],
    ],
  },

  'Heat transfer': {
    liner: 'Heat leaving a moulded part, broken into the three steps it passes through.',
    reading: 'You went deeper into heat transfer, so I followed the heat out of the part: through the plastic, through the steel, into the water. The slowest step decides cooling.',
    subs: [
      ['Through the plastic', 'Conduction in the part.', 'Usually the slowest step.', 'Heat-transfer textbooks', 2, [0], [
        ['Low conductivity', 'Plastics conduct about 0.2 W/m·K.', 0.85, 'A hundred times worse than steel.', 'Heat-transfer textbooks', 2, [0]],
        ['Thickness squared', 'Cooling time grows with thickness squared.', 0.85, 'Why thick walls dominate.', 'Heat-transfer textbooks', 2, [0]],
      ]],
      ['Through the steel', 'Conduction in the mould.', 'Usually fast, unless the distance is long.', 'Heat-transfer textbooks', 2, [0], [
        ['Steel grade', 'Tool steels around 25 to 35 W/m·K.', 0.5, 'Copper alloys conduct far better.', 'Materials data', 2, [1]],
        ['Path length', 'Distance from surface to channel.', 0.65, 'Long paths slow heat removal locally.', 'Mould design textbooks', 2, [1]],
      ]],
      ['Into the water', 'Convection at the channel wall.', 'Depends heavily on flow.', 'Heat-transfer textbooks', 2, [0], [
        ['Turbulence', 'Mixing in fast flow.', 0.75, 'Raises the heat transfer coefficient several times.', 'Heat-transfer textbooks', 2, [0]],
        ['Channel surface', 'Clean or scaled channel walls.', 0.55, 'Scale insulates the channel.', 'Maintenance guides', 4, []],
      ]],
    ],
    connections: [
      ['Low conductivity', 'Thickness squared', 'together set', 0.85, 'Low conductivity and thickness together set cooling time.', 'Heat-transfer textbooks', 2, [0]],
      ['Channel surface', 'Turbulence', 'undermines', 0.55, 'Scale both insulates and slows the flow.', 'Maintenance guides', 4, []],
      ['Steel grade', 'Path length', 'offsets', 0.5, 'A conductive insert makes a long path less costly.', 'Materials data', 2, [1]],
    ],
    threads: [
      ['Non-uniform wall thickness', 'Which walls are thick enough to slow cooling?', 'The slowest step.'],
      ['Low coolant flow', 'Is my water flow turbulent?', 'The water step.'],
      ['Conformal cooling', 'How does conformal cooling shorten the steel path?', 'The steel step.'],
    ],
    sources: [
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011)'],
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'],
    ],
  },

  'Styling-led surfaces': {
    liner: 'A styled part broken into its outer form, its inside, and how the two are reconciled.',
    reading: 'You went deeper into styling-led surfaces, so I split the part into the styled outside, the inside that should follow it, and how designers reconcile them.',
    subs: [
      ['The outside', 'The styled surfaces.', 'Drawn for appearance first.', 'Design practice', 4, [0], [
        ['Crowned faces', 'Gently domed tops.', 0.65, 'Thick at the crown over a flat inside.', 'Design practice', 4, [0]],
        ['Crisp feature lines', 'Sharp creases.', 0.5, 'Mass gathers at the line.', 'Design practice', 4, [0]],
      ]],
      ['The inside', 'The surface no one sees.', 'Should follow the outside.', 'Part design textbooks', 2, [1], [
        ['Flat inner face', 'An inside left flat for simplicity.', 0.75, 'Makes walls vary with the styling.', 'Part design textbooks', 2, [1]],
        ['Shell offset', 'The inside offset from the outside.', 0.7, 'Keeps the wall constant.', 'CAD practice', 4, []],
      ]],
      ['Reconciling', 'Making form and moulding agree.', 'Reviews and CAD checks.', 'Design practice', 4, [0], [
        ['Thickness check', 'A CAD wall-thickness map.', 0.7, 'Shows where styling made walls vary.', 'CAD practice', 4, []],
        ['Change control', 'Re-checking after styling changes.', 0.5, 'Late changes skip the check.', 'Design practice', 4, []],
      ]],
    ],
    connections: [
      ['Crowned faces', 'Flat inner face', 'creates thick zone with', 0.8, 'A crown over a flat inside is the classic thick zone.', 'Part design textbooks', 2, [1]],
      ['Shell offset', 'Thickness check', 'verified by', 0.65, 'The check confirms the shell worked.', 'CAD practice', 4, []],
      ['Crisp feature lines', 'Change control', 'often added during', 0.4, 'Feature lines are often sharpened late. Plausible.', 'My inference', 6, []],
    ],
    threads: [
      ['Industrial design', 'How should styling and engineering work together?', 'The process behind the surfaces.'],
      ['Non-uniform wall thickness', 'How uneven are my walls?', 'What styling leads to.'],
      ['Sink marks', 'Are there sinks on the styled faces?', 'The visible sign.'],
    ],
    sources: [
      [4, 'Industry practice', 'Industrial design studios’ guidance on designing for moulding'],
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
    ],
  },

  'Screw bosses': {
    liner: 'A screw boss broken into its geometry, the fastener it serves, and how it fails.',
    reading: 'You went deeper into screw bosses, so I split a boss into its own geometry, the screw it must hold, and its failure modes.',
    subs: [
      ['Geometry', 'The boss itself.', 'Geometry decides mass and strength.', 'Part design textbooks', 2, [0], [
        ['Boss wall', 'Thickness of the boss around the hole.', 0.8, 'About 60% of the nominal wall.', 'Part design textbooks', 2, [0]],
        ['Cored hole depth', 'How deep the hole is moulded.', 0.6, 'A shallow core leaves a solid base.', 'Part design textbooks', 2, [0]],
        ['Gusset support', 'Small ribs bracing the boss.', 0.5, 'Strength without mass.', 'Part design textbooks', 2, [0]],
      ]],
      ['The fastener', 'What the boss must hold.', 'The screw sets the boss’s minimum size.', 'Fastener makers’ guides', 3, [1], [
        ['Screw type', 'Thread-forming or thread-cutting.', 0.55, 'Forming screws put more stress on the boss.', 'Fastener makers’ guides', 3, [1]],
        ['Hole diameter', 'Pilot hole size for the screw.', 0.5, 'Too small cracks the boss; too big strips it.', 'Fastener makers’ guides', 3, [1]],
      ]],
      ['Failure modes', 'How bosses go wrong.', 'Two opposite failures.', 'Part design textbooks', 2, [0], [
        ['Too thick: sink', 'Mass sinks the opposite face.', 0.75, 'The warp-related failure.', 'Part design textbooks', 2, [0]],
        ['Too thin: cracking', 'Hoop stress splits the boss.', 0.55, 'The strength failure.', 'Fastener makers’ guides', 3, [1]],
      ]],
    ],
    connections: [
      ['Boss wall', 'Too thick: sink', 'controls', 0.8, 'Boss wall thickness decides sink.', 'Part design textbooks', 2, [0]],
      ['Screw type', 'Too thin: cracking', 'drives', 0.65, 'Forming screws raise hoop stress.', 'Fastener makers’ guides', 3, [1]],
      ['Gusset support', 'Too thin: cracking', 'prevents', 0.5, 'Gussets stiffen a thin boss.', 'Part design textbooks', 2, [0]],
    ],
    threads: [
      ['Thick ribs and bosses', 'Are my bosses causing hot spots?', 'The wider topic.'],
      ['Assembly fit failure', 'Are warped bosses misaligning in assembly?', 'How bosses meet assembly.'],
      ['Missing coring', 'Are any bosses left solid?', 'The commonest boss mistake.'],
    ],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010), chapter on bosses'],
      [3, 'Design guide', 'Fastener makers’ boss design guides for thread-forming screws', '', 'Conflict of interest'],
    ],
  },

  'Missing coring': {
    liner: 'A solid section broken into why it’s there, what it does, and how to core it out.',
    reading: 'You went deeper into missing coring, so I split it into why solid sections end up in parts, what they do in moulding, and how they’re cored out.',
    subs: [
      ['Why it’s there', 'How solid sections end up in a part.', 'Usually a modelling shortcut.', 'CAD practice', 4, [1], [
        ['Solid modelling habit', 'Parts started as solids.', 0.6, 'Easy to leave unshelled.', 'CAD practice', 4, [1]],
        ['Perceived strength', 'Solid feels stronger.', 0.5, 'Ribs give the same stiffness with less mass.', 'Part design textbooks', 2, [0]],
      ]],
      ['What it does', 'Effects in moulding.', 'Solid sections are the worst thick zones.', 'Part design textbooks', 2, [0], [
        ['Slow core cooling', 'The middle stays molten long after.', 0.8, 'Shrinks late and unevenly.', 'Heat-transfer physics', 2, [2]],
        ['Voids and sinks', 'Shrinkage pulling the surface or a hole.', 0.7, 'Typical in solid sections.', 'Defect guides', 3, [0]],
        ['Cycle penalty', 'The solid section sets cooling time.', 0.55, 'Slows every shot.', 'Heat-transfer physics', 2, [2]],
      ]],
      ['Coring out', 'How to fix it.', 'Hollow and rib.', 'Part design textbooks', 2, [0], [
        ['Shell and rib', 'Hollow to the nominal wall, add ribs.', 0.8, 'The standard fix.', 'Part design textbooks', 2, [0]],
        ['Core pulls', 'Mould features that form the hollow.', 0.45, 'Must be able to release.', 'Mould design textbooks', 2, [0]],
      ]],
    ],
    connections: [
      ['Shell and rib', 'Slow core cooling', 'removes', 0.85, 'No solid core, no slow core.', 'Part design textbooks', 2, [0]],
      ['Perceived strength', 'Shell and rib', 'overcome by', 0.55, 'Ribs show stiffness is kept.', 'Part design textbooks', 2, [0]],
      ['Core pulls', 'Shell and rib', 'limits', 0.45, 'Some hollows can’t be released without slides.', 'Mould design textbooks', 2, [0]],
    ],
    threads: [
      ['Gas-assist moulding', 'Can gas hollow sections that can’t be cored?', 'The fallback when coring isn’t possible.'],
      ['Nominal wall guidelines', 'What thickness should the cored walls be?', 'Sets the shell.'],
      ['Thick ribs and bosses', 'Will the new ribs create hot spots?', 'The next thing to check.'],
    ],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [4, 'Industry practice', 'CAD vendors’ guides to shelling moulded parts'],
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer (Wiley, 2011)'],
    ],
  },

  'Nominal wall guidelines': {
    liner: 'The nominal wall broken into how it’s chosen, how features follow it, and how variation is limited.',
    reading: 'You went deeper into nominal wall guidelines, so I split them into choosing the wall, sizing features from it, and keeping variation in check.',
    subs: [
      ['Choosing the wall', 'Setting the nominal thickness.', 'A balance of flow, strength and cost.', 'Part design textbooks', 2, [0], [
        ['Flow length ratio', 'How far the resin can flow for the wall.', 0.65, 'Thin walls need easy-flow grades.', 'Resin datasheets', 1, [1]],
        ['Stiffness need', 'How rigid the part must be.', 0.55, 'Ribs can stiffen instead of thicker walls.', 'Part design textbooks', 2, [0]],
        ['Resin range', 'The supplier’s recommended range.', 0.6, 'Each resin has a sweet spot.', 'Resin suppliers’ guides', 3, [1]],
      ]],
      ['Features from the wall', 'Sizing everything else.', 'The nominal wall is the reference.', 'Part design textbooks', 2, [0], [
        ['Rib and boss ratios', 'Ribs 50–60%, boss walls about 60%.', 0.75, 'Keeps features from creating hot spots.', 'Part design textbooks', 2, [0]],
        ['Corner radii', 'Radii sized from the wall.', 0.5, 'Keeps corners even.', 'Part design textbooks', 2, [0]],
      ]],
      ['Limiting variation', 'Keeping thickness even.', 'Variation is what causes warp.', 'Part design textbooks', 2, [0], [
        ['25% rule', 'Variation within about 25% of nominal.', 0.8, 'A practical limit for even shrinkage.', 'Part design textbooks', 2, [0]],
        ['Tapered transitions', 'Changes spread over about three times the step.', 0.65, 'Avoids abrupt hot spots.', 'Part design textbooks', 2, [0]],
      ]],
    ],
    connections: [
      ['Resin range', 'Flow length ratio', 'informed by', 0.6, 'Supplier ranges reflect flow limits.', 'Resin suppliers’ guides', 3, [1]],
      ['Rib and boss ratios', '25% rule', 'serve the same goal as', 0.6, 'Both keep effective thickness even.', 'Part design textbooks', 2, [0]],
      ['Stiffness need', 'Rib and boss ratios', 'met through', 0.55, 'Ribs supply stiffness the thin wall lacks.', 'Part design textbooks', 2, [0]],
    ],
    threads: [
      ['Non-uniform wall thickness', 'Where does my part break the 25% rule?', 'The check against the guideline.'],
      ['Design for manufacture', 'What other rules go with the nominal wall?', 'The wider rule set.'],
      ['Thick ribs and bosses', 'Are my ribs sized from the wall?', 'The features that follow it.'],
    ],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [3, 'Design guide', 'Resin suppliers’ wall thickness tables', '', 'Conflict of interest'],
    ],
  },

  'Gas-assist moulding': {
    liner: 'Gas-assist broken into the process, the part design it needs, and the equipment.',
    reading: 'You went deeper into gas-assist moulding, so I split it into the process steps, what the part design must provide, and the equipment and costs.',
    subs: [
      ['Process', 'The steps of a gas-assist shot.', 'Gas replaces some of the packing.', 'Gas-assist handbooks', 2, [0], [
        ['Short shot', 'Partially filling the cavity with melt.', 0.6, 'Leaves room for the gas.', 'Gas-assist handbooks', 2, [0]],
        ['Gas pressure profile', 'How gas pressure rises and holds.', 0.7, 'Packs the walls from inside.', 'Gas-assist handbooks', 2, [0]],
        ['Venting', 'Releasing the gas before opening.', 0.4, 'Must finish before ejection.', 'Gas-assist handbooks', 2, [0]],
      ]],
      ['Part design', 'What the part must provide.', 'Gas needs a path.', 'Gas-assist handbooks', 2, [0], [
        ['Gas channels', 'Thick paths designed for gas to follow.', 0.8, 'Without them, gas wanders.', 'Gas-assist handbooks', 2, [0]],
        ['Wall-to-channel ratio', 'Contrast between thin walls and gas paths.', 0.6, 'Too little contrast lets gas finger into walls.', 'Gas-assist handbooks', 2, [0]],
      ]],
      ['Equipment', 'What the press needs.', 'Extra kit and cost.', 'Gas-assist handbooks', 2, [0], [
        ['Gas controller', 'Supplies nitrogen at set pressure.', 0.5, 'An added unit at the press.', 'Gas-assist handbooks', 2, [0]],
        ['Gas injection point', 'Through the nozzle or into the tool.', 0.5, 'Affects where gas enters.', 'Gas-assist handbooks', 2, [0]],
      ]],
    ],
    connections: [
      ['Gas channels', 'Wall-to-channel ratio', 'depends on', 0.75, 'Channels work only if walls are thinner.', 'Gas-assist handbooks', 2, [0]],
      ['Gas pressure profile', 'Short shot', 'tuned with', 0.6, 'Shot size and pressure are set together.', 'Gas-assist handbooks', 2, [0]],
      ['Gas injection point', 'Gas channels', 'must connect to', 0.55, 'Gas must enter where a channel starts.', 'Gas-assist handbooks', 2, [0]],
    ],
    threads: [
      ['Missing coring', 'Could the section be cored by design instead?', 'Cheaper if possible.'],
      ['Sink marks', 'Would gas-assist remove my sinks?', 'A main benefit.'],
      ['Thick ribs and bosses', 'Could gas hollow my thick ribs?', 'A typical use.'],
    ],
    sources: [
      [2, 'Handbook', 'Avery, J. Gas-Assist Injection Molding: Principles and Applications (Hanser, 2001)'],
      [2, 'Textbook', 'Osswald, Turng & Gramann, Injection Molding Handbook, 2nd ed. (Hanser, 2008)'],
    ],
  },

  'Material selection trade-offs': {
    liner: 'A material choice broken into what’s needed, what each family offers, and how to compare.',
    reading: 'You went deeper into material selection, so I split it into the requirements, what each resin family offers against them, and how to compare options.',
    subs: [
      ['Requirements', 'What the part needs.', 'Requirements decide the shortlist.', 'Materials selection textbooks', 2, [0], [
        ['Chemical exposure', 'What the part touches.', 0.75, 'Rules out many amorphous resins.', 'Materials textbooks', 2, [1]],
        ['Mechanical load', 'Stiffness, impact and fatigue.', 0.6, 'Fatigue favours semi-crystalline resins.', 'Materials textbooks', 2, [1]],
        ['Flatness need', 'How flat the part must be.', 0.7, 'Favours low-shrink resins.', 'My inference', 6, []],
      ]],
      ['Families', 'What each resin type offers.', 'Each family trades differently.', 'Materials textbooks', 2, [1], [
        ['Semi-crystalline', 'PP, POM, PA, PBT.', 0.7, 'Chemicals and fatigue, but high shrinkage.', 'Materials textbooks', 2, [1]],
        ['Amorphous', 'ABS, PC, PMMA.', 0.65, 'Low shrinkage, weaker on chemicals.', 'Materials textbooks', 2, [1]],
        ['Filled grades', 'Mineral, talc or glass additions.', 0.6, 'Change shrinkage and stiffness.', 'Resin datasheets', 1, [2]],
      ]],
      ['Comparing', 'How to choose.', 'Structured comparison beats habit.', 'Materials selection textbooks', 2, [0], [
        ['Selection charts', 'Plots of property against property.', 0.45, 'Show trade-offs at a glance.', 'Materials selection textbooks', 2, [0]],
        ['Trial moulding', 'Running candidate grades in the tool.', 0.6, 'The real test of warp.', 'Moulders’ experience', 5, []],
      ]],
    ],
    connections: [
      ['Chemical exposure', 'Semi-crystalline', 'pushes towards', 0.75, 'Chemical resistance is their main advantage.', 'Materials textbooks', 2, [1]],
      ['Flatness need', 'Amorphous', 'pushes towards', 0.7, 'Low shrinkage suits flatness.', 'Materials textbooks', 2, [1]],
      ['Filled grades', 'Trial moulding', 'proven by', 0.5, 'Filled grades behave differently in each tool.', 'Moulders’ experience', 5, []],
    ],
    threads: [
      ['Amorphous polymers', 'Would an amorphous resin meet my needs?', 'The low-warp option.'],
      ['Resin cost pressure', 'How much would a switch cost?', 'The cost side.'],
      ['Semi-crystalline polymers', 'Can I keep my resin and reduce warp?', 'The stay-put option.'],
    ],
    sources: [
      [2, 'Textbook', 'Ashby, M. F. Materials Selection in Mechanical Design, 5th ed. (Butterworth-Heinemann, 2016)'],
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers (Hanser, 2012)'],
      [1, 'Datasheet', 'Resin manufacturers’ datasheets', '', 'Conflict of interest'],
    ],
  },

  'Resin cost pressure': {
    liner: 'The cost of resin broken into market price, how much each part uses, and the hidden costs.',
    reading: 'You went deeper into resin cost, so I split it into what sets the price, how material use per part adds up, and the costs a cheaper material can hide.',
    subs: [
      ['Market price', 'What a kilogram costs.', 'Prices follow feedstock and demand.', 'Market data', 3, [0], [
        ['Feedstock link', 'Resin prices follow oil and monomers.', 0.55, 'Prices swing with energy markets.', 'Market data', 3, [0]],
        ['Grade premium', 'Speciality grades cost more.', 0.5, 'Low-warp grades carry a premium.', 'Market data', 3, [0]],
      ]],
      ['Use per part', 'How much material each part takes.', 'Weight times price times volume.', 'Costing practice', 3, [1], [
        ['Part weight', 'Grams per part.', 0.6, 'Coring and thinner walls cut it.', 'Costing practice', 3, [1]],
        ['Runner waste', 'Material in runners and sprues.', 0.45, 'Hot runners avoid it.', 'Costing practice', 3, [1]],
      ]],
      ['Hidden costs', 'What a cheaper material can bring.', 'The cheapest resin isn’t always cheapest.', 'Quality management texts', 3, [2], [
        ['Scrap from warp', 'Rejects caused by the material.', 0.75, 'Can outweigh the saving.', 'Quality management texts', 3, [2]],
        ['Process window', 'How forgiving the resin is.', 0.6, 'Narrow windows mean more scrap.', 'Process guides', 3, [1]],
      ]],
    ],
    connections: [
      ['Grade premium', 'Scrap from warp', 'trades off against', 0.7, 'Paying more per kilo can save more in scrap.', 'Quality management texts', 3, [2]],
      ['Part weight', 'Feedstock link', 'exposed to', 0.5, 'Heavier parts feel price swings more.', 'Costing practice', 3, [1]],
      ['Process window', 'Scrap from warp', 'drives', 0.65, 'A narrow window scraps more as conditions drift.', 'Process guides', 3, [1]],
    ],
    threads: [
      ['Scrap rate and cost', 'How much is warp scrap costing?', 'The hidden cost.'],
      ['Material selection trade-offs', 'Is there a better-value material?', 'The choice.'],
      ['Resin batch or supplier change', 'Did a cheaper supplier bring new warp?', 'A common side effect.'],
    ],
    sources: [
      [3, 'Market data', 'Plastics price indices published by trade press'],
      [3, 'Textbook', 'Rosato, D. V. et al. Injection Molding Handbook, 3rd ed. (Kluwer, 2000), costing'],
      [3, 'Textbook', 'Juran’s Quality Handbook, 7th ed. (McGraw-Hill, 2016)'],
    ],
  },

  'High mould shrinkage': {
    liner: 'Shrinkage broken into its three stages: in the mould, at ejection and afterwards.',
    reading: 'You went deeper into high mould shrinkage, so I followed it in time: what happens in the mould, at ejection, and in the hours after.',
    subs: [
      ['In the mould', 'Shrinkage while the part is held.', 'The mould restrains shrinkage until ejection.', 'Shrinkage handbooks', 2, [0], [
        ['Thermal contraction', 'Plastic shrinking as it cools.', 0.75, 'Plastics expand and contract far more than steel.', 'Polymer science textbooks', 2, [1]],
        ['Crystal packing', 'Crystals forming and packing tight.', 0.8, 'The extra shrinkage of semi-crystalline resins.', 'Polymer science textbooks', 2, [1]],
      ]],
      ['At ejection', 'The part released from the steel.', 'Restraint ends; the part moves.', 'Shrinkage handbooks', 2, [0], [
        ['Restraint release', 'Features no longer held by the core.', 0.6, 'Shrinkage the mould held back appears.', 'Shrinkage handbooks', 2, [0]],
        ['Ejection temperature', 'How hot the part is when it leaves.', 0.55, 'Hotter parts have more to shrink.', 'Resin datasheets', 1, [2]],
      ]],
      ['Afterwards', 'Hours to days later.', 'Shrinkage isn’t finished at the press.', 'Shrinkage handbooks', 2, [0], [
        ['Post-mould shrinkage', 'Further shrinkage outside the mould.', 0.7, 'Most of it within 24 to 48 hours.', 'Shrinkage handbooks', 2, [0]],
        ['Measurement timing', 'When the part is measured.', 0.6, 'Datasheets use 24-hour or 48-hour values.', 'ISO 294-4', 1, [3]],
      ]],
    ],
    connections: [
      ['Crystal packing', 'Post-mould shrinkage', 'continues as', 0.7, 'Secondary crystallisation keeps shrinking parts.', 'Polymer science textbooks', 2, [1]],
      ['Ejection temperature', 'Post-mould shrinkage', 'raises', 0.6, 'Hotter ejection leaves more shrinkage for later.', 'Shrinkage handbooks', 2, [0]],
      ['Measurement timing', 'Restraint release', 'must account for', 0.45, 'Measuring too soon misses later changes.', 'ISO 294-4', 1, [3]],
    ],
    threads: [
      ['Crystallinity', 'How much of my shrinkage is crystal packing?', 'The biggest part for semi-crystalline resins.'],
      ['Hot parts stacked in boxes', 'Is post-mould shrinkage warping parts in storage?', 'The “afterwards” stage.'],
      ['Differential shrinkage', 'Is my high shrinkage also uneven?', 'Where warp comes from.'],
    ],
    sources: [
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013)'],
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers (Hanser, 2012)'],
      [1, 'Datasheet', 'Resin manufacturers’ processing guides', '', 'Conflict of interest'],
      [1, 'Standard', 'ISO 294-4: determination of moulding shrinkage'],
    ],
  },

  'Direction-dependent shrinkage': {
    liner: 'Directional shrinkage broken into what lines up, how much each resin type is affected, and how it’s measured.',
    reading: 'You went deeper into direction-dependent shrinkage, so I split it into the things that orient in the flow, how each resin type responds, and how the effect is measured.',
    subs: [
      ['What lines up', 'Things oriented by flow.', 'Orientation is what makes shrinkage directional.', 'Shrinkage handbooks', 2, [0], [
        ['Polymer chains', 'Chains stretched along the flow.', 0.65, 'Recoil and shrink more along the flow.', 'Polymer science textbooks', 2, [1]],
        ['Glass fibres', 'Fibres aligned with the flow.', 0.8, 'Resist shrinking along their length.', 'Orientation studies', 2, [0]],
        ['Crystal growth', 'Crystals growing along oriented chains.', 0.5, 'Adds to the chain effect.', 'Polymer science textbooks', 2, [1]],
      ]],
      ['By resin type', 'How each type behaves.', 'The direction of the effect flips with fibres.', 'Shrinkage handbooks', 2, [0], [
        ['Unfilled semi-crystalline', 'More shrinkage along the flow.', 0.6, 'Chain orientation dominates.', 'Shrinkage handbooks', 2, [0]],
        ['Glass-filled', 'Much less shrinkage along the flow.', 0.75, 'Fibres dominate.', 'Shrinkage handbooks', 2, [0]],
      ]],
      ['Measurement', 'How it’s quantified.', 'Standard plaques give the numbers.', 'ISO 294-4', 1, [2], [
        ['Parallel and normal values', 'Shrinkage along and across the flow.', 0.7, 'The datasheet pair to compare.', 'ISO 294-4', 1, [2]],
        ['Part-specific flow', 'Flow direction in your actual part.', 0.55, 'Plaques don’t show your part’s flow pattern.', 'My inference', 6, []],
      ]],
    ],
    connections: [
      ['Glass fibres', 'Glass-filled', 'explains', 0.85, 'Fibres are why filled grades shrink less along flow.', 'Orientation studies', 2, [0]],
      ['Polymer chains', 'Unfilled semi-crystalline', 'explains', 0.7, 'Chain recoil drives flow-direction shrinkage.', 'Polymer science textbooks', 2, [1]],
      ['Part-specific flow', 'Parallel and normal values', 'must be combined with', 0.55, 'Datasheet values only help with your flow pattern.', 'My inference', 6, []],
    ],
    threads: [
      ['Glass-fibre orientation', 'How are the fibres oriented in my part?', 'The strongest source of directionality.'],
      ['Gate location', 'Would a different gate change the flow direction?', 'The lever that changes it.'],
      ['High mould shrinkage', 'How much does my resin shrink overall?', 'The size the direction acts on.'],
    ],
    sources: [
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013)'],
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers (Hanser, 2012)'],
      [1, 'Standard', 'ISO 294-4: shrinkage measured parallel and normal to flow'],
    ],
  },

  'Amorphous polymers': {
    liner: 'An amorphous resin broken into its structure, its strengths, and its weaknesses.',
    reading: 'You went deeper into amorphous polymers, so I split them into the structure that makes them low-shrink, the properties they offer, and where they fall short.',
    subs: [
      ['Structure', 'How the chains are arranged.', 'No crystals, so no crystal shrinkage.', 'Polymer science textbooks', 2, [0], [
        ['Tangled chains', 'Random coils with no order.', 0.75, 'They pack no tighter as they cool.', 'Polymer science textbooks', 2, [0]],
        ['Glass transition', 'The temperature where they soften.', 0.55, 'They soften gradually rather than melting sharply.', 'Polymer science textbooks', 2, [0]],
      ]],
      ['Strengths', 'What they do well.', 'Dimensional stability and appearance.', 'Materials textbooks', 2, [1], [
        ['Even shrinkage', 'Similar in all directions.', 0.85, 'Warp far less.', 'Resin datasheets', 1, [2]],
        ['Clarity and gloss', 'PC and PMMA are transparent.', 0.4, 'Good surface finish.', 'Materials textbooks', 2, [1]],
      ]],
      ['Weaknesses', 'Where they fall short.', 'The reasons people choose semi-crystalline instead.', 'Materials textbooks', 2, [1], [
        ['Stress cracking', 'Cracks from chemicals under stress.', 0.75, 'Oils and cleaners attack stressed parts.', 'Materials textbooks', 2, [1]],
        ['Fatigue', 'Weaker under repeated flexing.', 0.55, 'Poor for living hinges.', 'Materials textbooks', 2, [1]],
        ['Price', 'Generally more expensive than PP.', 0.45, 'Part of the trade-off.', 'Market data', 3, []],
      ]],
    ],
    connections: [
      ['Tangled chains', 'Even shrinkage', 'gives', 0.85, 'No crystals means even, low shrinkage.', 'Polymer science textbooks', 2, [0]],
      ['Stress cracking', 'Even shrinkage', 'traded off against', 0.6, 'Low warp comes with chemical sensitivity.', 'Materials textbooks', 2, [1]],
      ['Glass transition', 'Fatigue', 'related to', 0.4, 'Chain mobility affects fatigue. Loosely.', 'My inference', 6, []],
    ],
    threads: [
      ['Material selection trade-offs', 'Should I switch to an amorphous resin?', 'The decision.'],
      ['Semi-crystalline polymers', 'What would I give up from my current resin?', 'The comparison.'],
      ['Resin cost pressure', 'What would the switch cost?', 'The cost side.'],
    ],
    sources: [
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers (Hanser, 2012)'],
      [2, 'Textbook', 'Ashby, M. F. Materials Selection in Mechanical Design (Butterworth-Heinemann, 2016)'],
      [1, 'Datasheet', 'Resin manufacturers’ datasheets', '', 'Conflict of interest'],
    ],
  },

  'Crystallinity': {
    liner: 'Crystallinity broken into how crystals form, what controls them in moulding, and how they’re measured.',
    reading: 'You went deeper into crystallinity, so I split it into the physics of crystal formation, the moulding conditions that control it, and how it’s measured.',
    subs: [
      ['Formation', 'How crystals form.', 'Nucleation then growth.', 'Polymer science textbooks', 2, [0], [
        ['Nucleation', 'Crystals starting.', 0.65, 'Additives and pigments add nuclei.', 'Polymer science textbooks', 2, [0]],
        ['Spherulite growth', 'Crystals growing outward as spheres.', 0.55, 'Slower cooling gives larger spherulites.', 'Polymer science textbooks', 2, [0]],
      ]],
      ['Control in moulding', 'What the moulder can change.', 'Cooling rate is the main lever.', 'Process guides', 3, [1], [
        ['Mould temperature', 'Steel temperature.', 0.8, 'Hotter mould, more crystallinity.', 'Process guides', 3, [1]],
        ['Local cooling rate', 'How fast each region cools.', 0.8, 'Uneven cooling gives uneven crystallinity.', 'Polymer science textbooks', 2, [0]],
        ['Nucleating additives', 'Added to speed crystallisation.', 0.5, 'More even, faster crystallisation.', 'Studies of nucleation', 2, [2]],
      ]],
      ['Measurement', 'How it’s quantified.', 'DSC is the standard.', 'ISO 11357-3', 1, [3], [
        ['DSC', 'Measuring the heat of melting.', 0.65, 'Gives the crystalline fraction.', 'ISO 11357-3', 1, [3]],
        ['Density', 'Crystalline regions are denser.', 0.45, 'A quick indirect measure.', 'Polymer science textbooks', 2, [0]],
      ]],
    ],
    connections: [
      ['Mould temperature', 'Local cooling rate', 'sets', 0.85, 'The mould temperature drives the surface cooling rate.', 'Process guides', 3, [1]],
      ['Nucleating additives', 'Spherulite growth', 'refines', 0.6, 'More nuclei give smaller spherulites.', 'Studies of nucleation', 2, [2]],
      ['DSC', 'Local cooling rate', 'reveals effects of', 0.5, 'Samples from different regions show cooling differences.', 'ISO 11357-3', 1, [3]],
    ],
    threads: [
      ['Semi-crystalline polymers', 'How does crystallinity affect my resin’s shrinkage?', 'Why it matters.'],
      ['Uneven cooling', 'Is uneven cooling giving uneven crystallinity?', 'The usual cause of variation.'],
      ['Annealing', 'Would annealing even out crystallinity?', 'A post-mould fix.'],
    ],
    sources: [
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers (Hanser, 2012)'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding (SME, 1996)'],
      [2, 'Peer-reviewed', 'Studies of nucleating agents in polypropylene'],
      [1, 'Standard', 'ISO 11357-3: Differential scanning calorimetry, melting and crystallisation'],
    ],
  },
};
