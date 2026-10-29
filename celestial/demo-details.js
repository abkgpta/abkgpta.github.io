// ─────────────────────────────────────────────────────────────
// DEMO CONTENT · what an opened orb shows, one card per example topic.
//
// Only on this site. Written by Claude for the demo, in the same shape a
// live research pass returns (see demo.js). Keyed by the topic's title.
//   about     – two to four sentences
//   check     – what to look at
//   chart     – optional { title, unit, note, rows: [[label, value], …] }
//   diagram   – optional { kind: chain | cycle | hub, caption, nodes: [[label, note], …] }
//               (topics with a hand-drawn illustration don't need one)
//   wikipedia – article whose lead image illustrates the card, or ''
//   sources   – [tier, type, title, url, flag]. References named from
//               Claude's own knowledge, not found by a web search, so no
//               links except Wikipedia articles.
// ─────────────────────────────────────────────────────────────

window.CELESTIAL_DEMO_CONTENT ||= {};
window.CELESTIAL_DEMO_CONTENT.details = {
  'Warped moulded part': {
    about: 'Every plastic shrinks as it cools from melt to room temperature, typically by 0.4 to 2.5%. Warping is what happens when that shrinkage is uneven: one region ends up shorter than its neighbour, and the part bends or twists to relieve the mismatch. Almost every cause of warping is a different route to uneven shrinkage, so the useful question is where the shrinkage differs and why.',
    check: ['Which way does it bend, and is it the same on every part and every cavity?', 'Did it start suddenly (material, machine, season) or has it always happened (design, tooling)?', 'Measure parts at the machine and again after 24 hours: does the warp grow?', 'Compare the warp direction with the flow direction from the gate.'],
    wikipedia: 'Injection moulding',
    sources: [
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier / Plastics Design Library, 2013)'],
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010), chapter on shrinkage and warpage'],
      [3, 'Encyclopedia', 'Injection moulding, Wikipedia', 'https://en.wikipedia.org/wiki/Injection_moulding'],
      [5, 'Forum', 'Moulders’ forum threads on troubleshooting warped lids and covers'],
    ],
  },
  'Uneven cooling': {
    about: 'A part keeps shrinking until it freezes. If one side sits against hotter steel, it stays soft longer and keeps shrinking after the other side has set, so the part bows towards the hotter side. On flat parts a difference of a few degrees between the mould halves can be enough to cause visible warp.',
    check: ['Measure the surface temperature of both mould halves on the open tool, ideally with a thermal camera.', 'Check flow and temperature on each cooling circuit, not just the chiller setting.', 'See which way the part bows: usually towards the hotter side.'],
    chart: { title: 'Bow of a flat 200 mm PP plate vs mould-half temperature difference', unit: 'mm', note: 'Illustrative trend from simulation studies; real values depend on grade and thickness.', rows: [['0 °C', 0.1], ['5 °C', 0.6], ['10 °C', 1.3], ['15 °C', 2.1], ['20 °C', 2.9]] },
    sources: [
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002), chapter on mould cooling'],
      [2, 'Textbook', 'Menges, G., Michaeli, W., Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)'],
      [3, 'Design guide', 'Shoemaker, J. (ed.) Moldflow Design Guide (Hanser, 2006)', '', 'Conflict of interest'],
      [6, 'AI inference', 'Link between thermal imaging and this diagnosis, from the reasoning on this map'],
    ],
  },
  'Non-uniform wall thickness': {
    about: 'Cooling time grows roughly with the square of wall thickness, so a section twice as thick takes about four times as long to set. Thick and thin areas in the same part therefore freeze at different times and shrink by different amounts, pulling the part out of shape. It is the most common design-side cause of warp.',
    check: ['Run the CAD wall-thickness analysis, or section a part, to find thick zones.', 'Look for thick areas where ribs, bosses or styling features join the main wall.', 'Compare against the nominal wall: variation above about 25% is a warning sign.'],
    chart: { title: 'Relative cooling time by wall thickness', unit: '×', note: 'Cooling time scales with thickness squared (1 mm = 1×).', rows: [['1 mm', 1], ['2 mm', 4], ['3 mm', 9], ['4 mm', 16]] },
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010), chapter on wall thickness'],
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011), transient conduction'],
      [3, 'Design guide', 'Resin suppliers’ part design guides (e.g. BASF, Covestro, DuPont)', '', 'Conflict of interest'],
    ],
  },
  'Differential shrinkage': {
    about: 'This is the mechanism behind warping rather than a separate cause. Shrinkage differs through the thickness (skin versus core), across the part (thick versus thin, near versus far from the gate) and with direction (along versus across the flow). The part warps wherever those differences are largest, and in the direction that relieves them.',
    check: ['Measure shrinkage along and across the flow on test plaques.', 'Compare dimensions near and far from the gate.', 'Run a warpage analysis that splits the result into cooling, shrinkage and orientation effects.'],
    sources: [
      [1, 'Standard', 'ISO 294-4: Plastics, injection moulding of test specimens, determination of moulding shrinkage'],
      [1, 'Standard', 'ASTM D955: Standard test method of measuring shrinkage from mold dimensions of thermoplastics'],
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage, 2nd ed. (Elsevier, 2013)'],
      [2, 'Peer-reviewed', 'Studies of residual stress and warpage in injection-moulded plates (e.g. Polymer Engineering & Science)'],
    ],
  },
  'Semi-crystalline polymers': {
    about: 'In semi-crystalline plastics, part of the polymer packs into ordered crystals as it cools, which takes up less space. They shrink more than amorphous plastics, and by different amounts depending on how fast each region cooled and which way it flowed. That makes them both higher-shrinkage and less forgiving of uneven cooling.',
    check: ['Check the datasheet’s shrinkage along and across the flow.', 'Ask whether an amorphous or filled grade would meet the requirements.', 'Keep mould temperature steady: it changes how much crystallises.'],
    chart: { title: 'Typical mould shrinkage, unfilled grades', unit: '%', note: 'Typical mid-range values; real grades vary.', rows: [['HDPE', 2.5], ['POM', 2.0], ['PP', 1.8], ['PA6', 1.2], ['PC', 0.6], ['ABS', 0.55], ['PMMA', 0.4]] },
    wikipedia: 'Polypropylene',
    sources: [
      [1, 'Datasheet', 'Resin manufacturers’ shrinkage data (ISO 294-4 values)', '', 'Conflict of interest'],
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'],
      [3, 'Encyclopedia', 'Crystallization of polymers, Wikipedia', 'https://en.wikipedia.org/wiki/Crystallization_of_polymers'],
    ],
  },
  'Glass-fibre orientation': {
    about: 'Glass fibres line up with the flow. The part then shrinks very little along the fibres and much more across them, often by a factor of two or more, which twists flat or long parts. The fibres also change orientation through the thickness, aligned with the flow near the skin and across it in the core.',
    check: ['Compare the warp with the flow pattern from the gate.', 'Compare shrinkage along and across the flow on the datasheet.', 'Consider a different gate position, or a mineral or glass-bead filler that shrinks more evenly.'],
    chart: { title: 'Typical shrinkage of 30% glass-filled PA66', unit: '%', note: 'Typical values; grades vary.', rows: [['Along flow', 0.3], ['Across flow', 0.9], ['Unfilled PA66', 1.5]] },
    wikipedia: 'Glass fiber',
    sources: [
      [2, 'Textbook', 'Osswald, Turng & Gramann, Injection Molding Handbook, 2nd ed. (Hanser, 2008), chapter on fibre orientation'],
      [2, 'Peer-reviewed', 'Folgar, F. & Tucker, C. L. Orientation behavior of fibers in concentrated suspensions (Journal of Reinforced Plastics and Composites, 1984)'],
      [3, 'Design guide', 'Resin suppliers’ guides to glass-filled nylon', '', 'Conflict of interest'],
    ],
  },
  'Gate location': {
    about: 'The gate is where plastic enters the cavity. It decides the flow direction, how well far areas are packed, and which way fibres and molecules line up, all of which change local shrinkage. Moving a gate is one of the most effective warp fixes, but it means changing the tool.',
    check: ['Compare warp direction with flow direction from the gate.', 'Check whether regions far from the gate are being packed properly.', 'Run a gate-location analysis in mould flow software before moving it.'],
    sources: [
      [2, 'Handbook', 'Beaumont, J. P. Runner and Gating Design Handbook, 2nd ed. (Hanser, 2007)'],
      [2, 'Textbook', 'Kazmer, D. O. Injection Mold Design Engineering, 2nd ed. (Hanser, 2016)'],
      [3, 'Design guide', 'Shoemaker, J. (ed.) Moldflow Design Guide (Hanser, 2006)', '', 'Conflict of interest'],
    ],
  },
  'Low packing pressure': {
    about: 'After filling, the machine keeps pushing in extra material to make up for shrinkage. Too little pressure, or a gate that freezes too soon, leaves thick or far-off areas under-packed so they shrink more than the rest. Packing is often the cheapest thing to change, since it is a machine setting.',
    check: ['Run a gate-freeze study: weigh parts while increasing hold time; weight stops rising when the gate freezes.', 'Check hold pressure and hold time against the material’s recommendations.', 'Compare part weight shot to shot: drifting weight means drifting packing.'],
    sources: [
      [2, 'Textbook', 'Kulkarni, S. Robust Process Development and Scientific Molding, 2nd ed. (Hanser, 2017)'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding: Manufacturing Process Fundamentals (SME, 1996)'],
      [5, 'Forum', 'Process technicians’ forum threads on hold pressure and warp'],
    ],
  },
  'Ejecting too early': {
    about: 'Shortening cooling time is a common way to speed up a cycle. If the part leaves the mould before it is stiff enough, ejector pins can push it out of shape and it keeps shrinking unevenly outside the mould with nothing holding it. It often appears right after someone has tuned the cycle.',
    check: ['Has the cycle time been shortened recently?', 'Look for ejector pin marks or distortion near the pins.', 'Try a longer cooling time as a test, and see whether the warp drops.'],
    sources: [
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding: Manufacturing Process Fundamentals (SME, 1996)'],
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002), chapter on ejection'],
      [5, 'Forum', 'Moulders’ shop-floor experience shared in trade forums'],
    ],
  },
  'Thick ribs and bosses': {
    about: 'Ribs stiffen a part, but where a thick rib meets the wall it creates a local hot spot that shrinks more, often showing as a sink mark on the other face. The usual rule is a rib about 50 to 60% of the wall it joins, with a draft and a root radius. Many ribs on one side of a flat part can also pull it into a bow.',
    check: ['Measure rib thickness against the wall: aim for about 50 to 60%.', 'Look for sink marks opposite ribs as a clue.', 'Check whether ribs sit mostly on one side of a flat part.'],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010), chapter on ribs'],
      [3, 'Design guide', 'Resin suppliers’ rib design rules', '', 'Conflict of interest'],
    ],
  },
  'Hot parts stacked in boxes': {
    about: 'A part can look fine at the machine and still warp later. If it is packed while warm, it keeps cooling in the box under the weight of the parts above it, and sets in the shape it was squashed into. Semi-crystalline parts also keep shrinking for a day or more after moulding, which makes them more prone to it.',
    check: ['Measure parts straight off the machine and again after 24 hours.', 'Check how long parts cool before packing, and how they are stacked.', 'Try a cooling fixture or conveyor for flat parts.'],
    sources: [
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013), chapter on post-mould shrinkage'],
      [3, 'Trade article', 'Trade magazine pieces on post-mould shrinkage and packaging'],
      [5, 'Forum', 'Forum reports of lids warping in storage'],
    ],
  },
  'Resin batch or supplier change': {
    about: 'When warping starts suddenly on a tool that used to run well, the material is a prime suspect. A new lot, a different supplier, a change in regrind ratio or a colour masterbatch that nucleates crystals can all change shrinkage. Pigments are a known case: some, like certain phthalocyanine blues and greens, change how polypropylene crystallises.',
    check: ['Match the date the problem began against material lot numbers.', 'Check whether regrind or colourant changed.', 'Run a known good lot, if any remains, as a comparison.'],
    sources: [
      [2, 'Peer-reviewed', 'Studies of pigment nucleation and shrinkage in polypropylene (e.g. Polymer Engineering & Science)'],
      [3, 'Trade article', 'Processing magazine articles on lot-to-lot variation'],
      [6, 'AI inference', 'Suggested from the sudden-onset pattern, not yet sourced'],
    ],
  },
  'Wet resin': {
    about: 'Moisture in hygroscopic resins like nylon, PC and PET mostly causes splay marks, bubbles and brittleness, because the water breaks polymer chains in the barrel. It is often blamed for warp, but it is rarely the main cause. Nylon that absorbs moisture after moulding can grow slightly, which is a different effect.',
    check: ['Check dryer temperature, residence time and dew point against the datasheet.', 'Look for splay or silver streaks: they point to moisture, warp alone does not.', 'For nylon, measure parts dry-as-moulded and again after conditioning.'],
    diagram: { kind: 'chain', caption: 'What moisture does in the barrel, and why it shows as splay rather than warp.', nodes: [['Resin absorbs water', 'In storage, before drying'], ['Heated in the barrel', 'Water turns to steam'], ['Chains break', 'Hydrolysis lowers molecular weight'], ['Splay and brittleness', 'Not usually warp']] },
    sources: [
      [1, 'Datasheet', 'Resin manufacturers’ drying recommendations', '', 'Conflict of interest'],
      [2, 'Textbook', 'Osswald, Turng & Gramann, Injection Molding Handbook, 2nd ed. (Hanser, 2008), chapter on material handling'],
    ],
  },
  'Assembly fit failure': {
    about: 'Warp often isn’t noticed until assembly: snap fits that won’t engage, screw bosses out of line, or mating parts that won’t close evenly. A part can be within its own drawing and still fail if the mating part warps the other way. Assembly is also where you learn which features actually matter.',
    check: ['Measure the part on a fixture that matches its assembled position.', 'Check whether the mating part is warped too, and in which direction.', 'Note which features fail first: snaps, screws or seams.'],
    wikipedia: 'Snap-fit',
    sources: [
      [2, 'Handbook', 'Bonenberger, P. R. The First Snap-Fit Handbook, 3rd ed. (Hanser, 2016)'],
      [2, 'Textbook', 'Tres, P. A. Designing Plastic Parts for Assembly, 8th ed. (Hanser, 2017)'],
      [3, 'Encyclopedia', 'Snap-fit, Wikipedia', 'https://en.wikipedia.org/wiki/Snap-fit'],
    ],
  },
  'Visible gaps and flushness': {
    about: 'Where two housings meet, even a fraction of a millimetre of bow opens the seam. Customers read uneven gaps as poor quality long before anything fails, so gap and flush targets are often tighter than functional tolerances. Designers hide some of it with a deliberate step or a shadow line at the split.',
    check: ['Measure gap and flush at several points along the seam on assembled products.', 'Check whether the gap varies with position (a bow) or is constant (a size error).', 'Consider a reveal or step at the split line to hide small variation.'],
    diagram: { kind: 'hub', caption: 'What sets the gap you see at a seam.', nodes: [['Part warp', 'Bow opens the seam'], ['Part size', 'Shrinkage off target'], ['Assembly fixing', 'Screws pull parts together'], ['Seam design', 'Reveals hide variation']] },
    sources: [
      [3, 'Textbook', 'Tres, P. A. Designing Plastic Parts for Assembly, 8th ed. (Hanser, 2017)'],
      [4, 'Industry practice', 'Automotive gap-and-flush specifications and perceived-quality guides'],
    ],
  },
  'Seal and IP rating failure': {
    about: 'A gasket only seals when it is squeezed evenly, usually by 15 to 30% of its height. A warped flange leaves low spots where the squeeze falls short, and water and dust get in there. IP testing, such as the IPX7 immersion test, finds these leaks quickly.',
    check: ['Measure flange flatness against the gasket’s compression range.', 'Check where leaks appear in testing: usually mid-span between screws.', 'Add screws, stiffen the flange, or use a softer gasket that tolerates more variation.'],
    wikipedia: 'Gasket',
    sources: [
      [1, 'Standard', 'IEC 60529: Degrees of protection provided by enclosures (IP code)'],
      [3, 'Encyclopedia', 'IP code, Wikipedia', 'https://en.wikipedia.org/wiki/IP_code'],
      [3, 'Design guide', 'Gasket manufacturers’ compression and flange design guides', '', 'Conflict of interest'],
    ],
  },
  'Scrap rate and cost': {
    about: 'Every warped part that fails inspection costs its material, its share of machine time and labour, and sometimes a delivery date. Scrap is usually the first number that makes warp a priority. Regrinding scrap recovers material but can itself shift shrinkage if the regrind ratio varies.',
    check: ['Track scrap rate by cavity, shift and material lot to find patterns.', 'Work out the cost per scrapped part, including machine time.', 'Check whether scrap is reground, and at what ratio.'],
    chart: { title: 'Where the cost of a scrapped part goes (typical small part)', unit: '%', note: 'Illustrative split; varies with part and machine.', rows: [['Machine time', 45], ['Material', 30], ['Labour', 15], ['Inspection', 10]] },
    sources: [
      [3, 'Textbook', 'Rosato, D. V. et al. Injection Molding Handbook, 3rd ed. (Kluwer, 2000), chapter on costing'],
      [6, 'AI inference', 'Cost split estimated for a typical small part, not sourced'],
    ],
  },
  'Tool rework': {
    about: 'When process changes cannot fix warp, the mould itself is changed: steel is recut so the part warps into the right shape, cooling is added, or the gate is moved. Recutting to compensate for warp, sometimes called pre-warping, can take several loops of trial and measurement. It is slow and expensive, so it is usually the last resort.',
    check: ['Exhaust process fixes first: mould temperatures, packing and cooling time.', 'Use warpage simulation to estimate the compensation before cutting steel.', 'Budget for more than one trial loop.'],
    diagram: { kind: 'cycle', caption: 'Compensating a mould for warp is a loop of trials.', nodes: [['Mould trial', 'Shoot parts at stable settings'], ['Measure warp', 'Scan or CMM'], ['Recut steel', 'Pre-warp the cavity'], ['Retry', 'Until in tolerance']] },
    sources: [
      [2, 'Textbook', 'Menges, G., Michaeli, W., Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)'],
      [4, 'Industry practice', 'Toolmakers’ guidance on warp compensation'],
    ],
  },
  'Sink marks': {
    about: 'Sink marks are shallow dips on the surface over thick sections. They share a root with warping: thick areas shrink more as they cool, and if the skin is still soft it is pulled inward. Seeing sink and warp on the same part points strongly at wall thickness.',
    check: ['Look for sinks over ribs and bosses.', 'If you see both sink and warp, suspect wall thickness first.', 'Raise hold pressure or time as a test: sinks that shrink point to under-packing.'],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding (SME, 1996), defects chapter'],
    ],
  },
  'Mould flow simulation': {
    about: 'Simulation software models filling, packing, cooling and warpage before any steel is cut. A warpage analysis can split the predicted warp into its causes (uneven cooling, differential shrinkage and orientation), which tells you which fix to try. The results are only as good as the material data and the mesh.',
    check: ['Ask for a warpage result that separates cooling, shrinkage and orientation effects.', 'Check that the material card matches the actual grade.', 'Compare the predicted warp direction with real parts before trusting the magnitudes.'],
    diagram: { kind: 'chain', caption: 'The stages a mould flow analysis runs through.', nodes: [['Fill', 'Flow front, pressure'], ['Pack', 'Shrinkage compensation'], ['Cool', 'Mould and part temperatures'], ['Warp', 'Deflection by cause']] },
    wikipedia: 'Computer-aided engineering',
    sources: [
      [2, 'Textbook', 'Kennedy, P. & Zheng, R. Flow Analysis of Injection Molds, 2nd ed. (Hanser, 2013)'],
      [3, 'Design guide', 'Shoemaker, J. (ed.) Moldflow Design Guide (Hanser, 2006)', '', 'Conflict of interest'],
      [4, 'Company guide', 'Simulation software vendors’ warpage analysis guides', '', 'Conflict of interest'],
    ],
  },
  'Design for manufacture': {
    about: 'Design for manufacture means shaping a part from the start so it can be made reliably and cheaply. For moulding, that means even walls, ribs instead of thick sections, generous radii and draft, and a gate position agreed with the toolmaker. Most design-side causes of warp are things these rules exist to prevent.',
    check: ['Review the part against a moulding design checklist before the tool is ordered.', 'Involve the toolmaker in the gate and cooling decisions.', 'Run a quick fill and warp simulation on the first CAD model.'],
    diagram: { kind: 'hub', caption: 'The moulding rules that matter most for warp.', nodes: [['Even walls', 'Within about 25%'], ['Ribs, not mass', '50–60% of the wall'], ['Radii and draft', 'Even flow and release'], ['Gate agreed early', 'With the toolmaker']] },
    wikipedia: 'Design for manufacturability',
    sources: [
      [2, 'Textbook', 'Boothroyd, G., Dewhurst, P., Knight, W. Product Design for Manufacture and Assembly, 3rd ed. (CRC Press, 2010)'],
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [3, 'Encyclopedia', 'Design for manufacturability, Wikipedia', 'https://en.wikipedia.org/wiki/Design_for_manufacturability'],
    ],
  },
  'Annealing': {
    about: 'Annealing reheats moulded parts below their softening point and holds them there, so moulded-in stress relaxes and crystallinity settles. It can reduce warp that appears over time and stabilise dimensions, but it can also release stress as new warp if parts aren’t supported. It treats the symptom, so it is a fix after the fact rather than a cure.',
    check: ['Try annealing a few parts on a flat fixture and measure before and after.', 'Check the resin supplier’s recommended annealing temperature and time.', 'Compare the extra cost per part with fixing the cause.'],
    wikipedia: 'Annealing (materials science)',
    sources: [
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'],
      [3, 'Encyclopedia', 'Annealing (materials science), Wikipedia', 'https://en.wikipedia.org/wiki/Annealing_(materials_science)'],
      [3, 'Design guide', 'Resin suppliers’ annealing guidance', '', 'Conflict of interest'],
    ],
  },
  'Flatness tolerances': {
    about: 'Whether a part counts as warped depends on the flatness tolerance on its drawing. A GD&T flatness callout defines a zone between two parallel planes that the surface must sit within. Sometimes the right fix is a realistic tolerance, or measuring the part restrained as it is in assembly.',
    check: ['Read the flatness callout and how the part is meant to be measured.', 'Check whether it should be measured free or restrained, as in assembly.', 'Compare the tolerance with what moulding can typically hold for this size and material.'],
    wikipedia: 'Geometric dimensioning and tolerancing',
    sources: [
      [1, 'Standard', 'ASME Y14.5-2018: Dimensioning and Tolerancing'],
      [1, 'Standard', 'ISO 20457: Plastics moulded parts, tolerances and acceptance conditions'],
      [3, 'Encyclopedia', 'Geometric dimensioning and tolerancing, Wikipedia', 'https://en.wikipedia.org/wiki/Geometric_dimensioning_and_tolerancing'],
    ],
  },
  'Industrial design': {
    about: 'Industrial design shapes mass-produced products for use, manufacture and appearance. Its decisions about form, surfaces and split lines are made early, and they set much of a part’s wall thickness and rib layout before engineering gets involved. When styling and moulding are reviewed together, most warp risks can be designed out.',
    check: ['Find out when moulding was first reviewed in the design process.', 'Check whether styling surfaces created thick or thin zones.', 'Look at where the split line and gates sit relative to the visible surfaces.'],
    wikipedia: 'Industrial design',
    sources: [
      [2, 'Textbook', 'Ulrich, K. & Eppinger, S. Product Design and Development, 7th ed. (McGraw-Hill, 2019)'],
      [3, 'Encyclopedia', 'Industrial design, Wikipedia', 'https://en.wikipedia.org/wiki/Industrial_design'],
      [6, 'AI inference', 'Link from styling decisions to wall thickness, from the reasoning on this map'],
    ],
  },
  'Cooling channel layout': {
    about: 'Cooling channels carry heat out of the mould. A common rule is to place them about one to two channel diameters from the cavity surface and two to three diameters apart. Channels that are too deep, too far apart, or missing from cores leave hot spots that cool the part unevenly.',
    check: ['Check channel depth and spacing in the tool drawings.', 'Use a thermal image of the open tool to spot hot zones.', 'Look for cores and inside corners with no cooling of their own.'],
    sources: [
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002), chapter on cooling design'],
      [2, 'Textbook', 'Kazmer, D. O. Injection Mold Design Engineering, 2nd ed. (Hanser, 2016)'],
      [3, 'Design guide', 'Mould component suppliers’ cooling design guides', '', 'Conflict of interest'],
    ],
  },
  'Core and cavity at different temperatures': {
    about: 'If the core and cavity halves of the mould run at different temperatures, one face of the part shrinks more than the other and the part bends towards the hotter half. Cores are surrounded by plastic and usually run hotter unless they are cooled well. Sometimes the halves are run at deliberately different temperatures to cancel a known warp.',
    check: ['Measure both halves after the tool has stabilised, not at start-up.', 'Check that each half has its own temperature control and that both are working.', 'Try a small deliberate offset between the halves and see which way the warp moves.'],
    sources: [
      [2, 'Textbook', 'Menges, G., Michaeli, W., Mohren, P. How to Make Injection Molds, 3rd ed. (Hanser, 2001)'],
      [3, 'Textbook', 'Bryce, D. M. Plastic Injection Molding (SME, 1996)'],
      [5, 'Forum', 'Process technicians’ discussions of mould-half offsets'],
    ],
  },
  'Low coolant flow': {
    about: 'Water removes heat far better when it flows fast enough to be turbulent, roughly a Reynolds number above 4,000. Blocked, scaled or undersized lines, or too many circuits on one pump, drop the flow below that and heat transfer falls sharply. It is often unnoticed because the chiller setting still looks right.',
    check: ['Fit flow meters on each circuit, or measure the water temperature rise across it (under about 3 °C is good).', 'Check for kinked hoses and circuits connected in series.', 'Flush or descale channels on older tools.'],
    chart: { title: 'Relative heat removal by flow regime', unit: '×', note: 'Illustrative: turbulent flow removes several times more heat.', rows: [['Laminar', 1], ['Transitional', 2.5], ['Turbulent', 5]] },
    wikipedia: 'Reynolds number',
    sources: [
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011), internal flow'],
      [3, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'],
      [4, 'Company guide', 'Mould temperature controller makers’ flow guides', '', 'Conflict of interest'],
    ],
  },
  'Inside corners': {
    about: 'The inside corner of a box-shaped part is surrounded by steel on several sides and is hard to cool. It stays hot, shrinks more, and pulls the walls inward. Box-shaped parts with walls that lean in are the classic sign.',
    check: ['Check whether the walls of box shapes lean inwards.', 'Look for cooling in cores, such as baffles or bubblers.', 'Consider a copper alloy insert or conformal cooling at the corners.'],
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [2, 'Textbook', 'Rees, H. Mold Engineering, 2nd ed. (Hanser, 2002)'],
    ],
  },
  'Longer cycle time': {
    about: 'Cooling is usually the longest part of the moulding cycle, often half or more of it. Anything that slows cooling, from thick walls to poor channels, adds seconds to every shot and cost to every part. It is also why warp fixes that add cooling time are unpopular.',
    check: ['Break the cycle into fill, pack, cooling and mould open times.', 'Find which section of the part sets the cooling time.', 'Work out what one second of cycle costs over a year’s volume.'],
    chart: { title: 'Typical share of the cycle, thin-walled part', unit: '%', note: 'Illustrative; cooling usually dominates.', rows: [['Cooling', 55], ['Packing', 20], ['Mould open and eject', 15], ['Filling', 10]] },
    sources: [
      [2, 'Textbook', 'Osswald, Turng & Gramann, Injection Molding Handbook, 2nd ed. (Hanser, 2008)'],
      [3, 'Textbook', 'Rosato, D. V. et al. Injection Molding Handbook, 3rd ed. (Kluwer, 2000)'],
    ],
  },
  'Thermal imaging of the mould': {
    about: 'A thermal camera pointed at the open tool right after ejection shows the surface temperature of both halves at once. Hot spots, an uncooled core or a dead circuit show up within minutes, with no need to strip the mould. Shiny steel reflects heat, so readings need care with emissivity.',
    check: ['Image both halves within a few seconds of the mould opening.', 'Image the part too: hot zones on the part match hot zones in the steel.', 'Use a matt marker or tape spot to calibrate readings on polished steel.'],
    wikipedia: 'Thermography',
    sources: [
      [3, 'Encyclopedia', 'Thermography, Wikipedia', 'https://en.wikipedia.org/wiki/Thermography'],
      [4, 'Company guide', 'Thermal camera makers’ application notes for moulding', '', 'Conflict of interest'],
      [6, 'AI inference', 'Link between thermal imaging and warp diagnosis, from the reasoning on this map'],
    ],
  },
  'Conformal cooling': {
    about: 'Conformal cooling uses mould inserts made by metal 3D printing, whose water channels follow the shape of the part surface at a constant distance. That evens out cooling in places drilled channels can’t reach, like tall cores and corners. It can cut both warp and cycle time, at a higher insert cost.',
    check: ['Identify the hot spots a drilled layout can’t reach.', 'Compare the insert cost with savings in cycle time and scrap.', 'Plan for cleaning: narrow printed channels scale and block more easily.'],
    diagram: { kind: 'chain', caption: 'Why conformal channels cool more evenly.', nodes: [['Printed insert', 'Laser powder bed fusion'], ['Channels follow surface', 'Constant distance'], ['Even heat removal', 'No hot corners'], ['Less warp, shorter cycle', 'At higher tool cost']] },
    sources: [
      [2, 'Peer-reviewed', 'Feng, S., Kamat, A. M., Pei, Y. Design and fabrication of conformal cooling channels in molds: review and progress updates (International Journal of Heat and Mass Transfer, 2021)'],
      [4, 'Company guide', 'Metal 3D printing vendors’ conformal cooling case studies', '', 'Conflict of interest'],
    ],
  },
  'Heat transfer': {
    about: 'Heat leaves a moulded part by conduction through the plastic into the steel, then by convection into the cooling water. Plastic conducts heat roughly a hundred times worse than steel, so the part’s own thickness usually controls how fast it cools. That is why wall thickness matters so much.',
    check: ['Estimate cooling time from wall thickness and the resin’s thermal diffusivity.', 'Compare the conductivity of the plastic, steel and any inserts.'],
    chart: { title: 'Thermal conductivity', unit: 'W/m·K', note: 'Typical values at room temperature.', rows: [['Polypropylene', 0.2], ['Tool steel (P20)', 30], ['Copper alloy', 200]] },
    wikipedia: 'Heat transfer',
    sources: [
      [2, 'Textbook', 'Incropera, F. P. et al. Fundamentals of Heat and Mass Transfer, 7th ed. (Wiley, 2011)'],
      [3, 'Encyclopedia', 'Heat transfer, Wikipedia', 'https://en.wikipedia.org/wiki/Heat_transfer'],
    ],
  },
  'Styling-led surfaces': {
    about: 'Surfaces drawn for appearance first, and engineered afterwards, often leave the wall thicker in some places than others: a crowned top, a sharp feature line, or a soft shape over a flat inside. Those thick zones cool slowly and pull the part out of shape. Shelling the inside to follow the outside fixes most of it.',
    check: ['Run a wall-thickness check on the styled CAD surfaces.', 'Check whether the inside surface follows the outside, or is flat.', 'Review styling changes made after the moulding review.'],
    diagram: { kind: 'chain', caption: 'How a styling decision can end up as warp.', nodes: [['Styled outer surface', 'Drawn for looks'], ['Flat or simple inside', 'Not shelled'], ['Thick and thin zones', 'Uneven wall'], ['Uneven cooling and warp', 'Pulls out of shape']] },
    sources: [
      [3, 'Textbook', 'Ulrich, K. & Eppinger, S. Product Design and Development, 7th ed. (McGraw-Hill, 2019)'],
      [4, 'Industry practice', 'Industrial design studios’ guidance on designing for moulding'],
    ],
  },
  'Screw bosses': {
    about: 'Bosses are posts that take screws or inserts. A solid boss, or one joined straight to the wall, makes a thick spot that sinks and pulls on the wall around it. The usual design is a cored boss with a wall about 60% of the nominal wall, tied in with ribs rather than mass.',
    check: ['Check that bosses are cored and their walls are thinner than the main wall.', 'Look for sink marks opposite each boss.', 'Check the screw maker’s recommended hole and boss sizes.'],
    diagram: { kind: 'hub', caption: 'What makes a boss mould well.', nodes: [['Cored hole', 'No solid post'], ['Thin boss wall', 'About 60% of wall'], ['Gussets', 'Support without mass'], ['Base radius', 'Avoids stress and hot spots']] },
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010), chapter on bosses'],
      [3, 'Design guide', 'Fastener makers’ boss design guides for thread-forming screws', '', 'Conflict of interest'],
    ],
  },
  'Missing coring': {
    about: 'Coring means hollowing out thick areas and supporting them with ribs. A part designed as a solid block, or a thick feature left solid, holds heat in its middle long after the surface has set, and shrinks unevenly as it finally cools. Coring saves material and cycle time too.',
    check: ['Find solid sections thicker than the nominal wall.', 'Ask whether each could be cored out and replaced with ribs.', 'Weigh the material and cycle time saving.'],
    diagram: { kind: 'chain', caption: 'Coring replaces mass with ribs.', nodes: [['Solid thick feature', 'Slow to cool'], ['Hollow it out', 'Keep the outer shape'], ['Add ribs', 'Restore stiffness'], ['Even cooling', 'Less warp and sink']] },
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [3, 'Design guide', 'Resin suppliers’ part design guides', '', 'Conflict of interest'],
    ],
  },
  'Nominal wall guidelines': {
    about: 'Most moulded parts have one nominal wall thickness, typically 1 to 3 mm depending on material and size, and every other feature is sized from it. Keeping variation within about 25% of the nominal wall, with gradual transitions, keeps cooling and shrinkage even. Each resin has its own recommended range.',
    check: ['Find the nominal wall and the thickest and thinnest sections.', 'Check transitions: they should taper over about three times the thickness change.', 'Compare with the resin supplier’s recommended range.'],
    chart: { title: 'Typical nominal wall ranges', unit: 'mm', note: 'Upper end of typical ranges; check the supplier’s guide.', rows: [['PP', 3.8], ['ABS', 3.5], ['PC', 3.8], ['PA', 3.0], ['POM', 3.0]] },
    sources: [
      [2, 'Textbook', 'Malloy, R. A. Plastic Part Design for Injection Molding, 2nd ed. (Hanser, 2010)'],
      [3, 'Design guide', 'Resin suppliers’ wall thickness tables', '', 'Conflict of interest'],
    ],
  },
  'Gas-assist moulding': {
    about: 'Gas-assist moulding injects nitrogen into the melt after filling, which hollows out thick sections from the inside and packs the plastic against the mould. It suits handles, thick ribs and frames that can’t be redesigned. It reduces sink and warp in thick parts, but needs extra equipment and careful gas channel design.',
    check: ['Identify thick sections that can’t be cored or redesigned.', 'Check whether the gas can follow a continuous path through them.', 'Compare equipment cost with savings in material and cycle time.'],
    diagram: { kind: 'chain', caption: 'The gas-assist cycle.', nodes: [['Partial fill', 'Most of the melt in'], ['Gas injected', 'Nitrogen follows thick paths'], ['Hollow core forms', 'Gas packs the walls'], ['Gas vented', 'Then eject']] },
    sources: [
      [2, 'Handbook', 'Avery, J. Gas-Assist Injection Molding: Principles and Applications (Hanser, 2001)'],
      [3, 'Textbook', 'Osswald, Turng & Gramann, Injection Molding Handbook, 2nd ed. (Hanser, 2008)'],
    ],
  },
  'Material selection trade-offs': {
    about: 'Semi-crystalline resins like PP, POM and nylon are chosen for chemical resistance, fatigue life, low friction and low cost. Their high, uneven shrinkage is the price. Amorphous resins shrink less and more evenly but crack under some chemicals and cost more, so the choice is a trade-off rather than a fix.',
    check: ['List why the current material was chosen: which properties are essential?', 'Check whether a filled grade or an amorphous blend meets those needs.', 'Ask the supplier for a low-warp grade of the same family.'],
    diagram: { kind: 'hub', caption: 'What a semi-crystalline resin gives you, against its shrinkage.', nodes: [['Chemical resistance', 'Solvents, fuels, cleaners'], ['Fatigue life', 'Living hinges, snaps'], ['Low friction', 'Gears, bearings'], ['Low cost', 'PP especially']] },
    sources: [
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'],
      [2, 'Textbook', 'Ashby, M. F. Materials Selection in Mechanical Design, 5th ed. (Butterworth-Heinemann, 2016)'],
    ],
  },
  'Resin cost pressure': {
    about: 'Polypropylene is one of the cheapest engineering plastics, often less than half the price of ABS or PC by weight. On high-volume parts that difference decides the material, even when PP is harder to mould flat. Cost pressure can also push towards cheaper grades, more regrind or new suppliers, each of which can change shrinkage.',
    check: ['Compare price per kilogram, and per part, for the alternatives.', 'Check whether a cheaper grade or supplier was introduced recently.', 'Include scrap and rework in the cost comparison.'],
    chart: { title: 'Relative price per kilogram', unit: '×', note: 'Illustrative relative prices; markets move.', rows: [['PP', 1], ['ABS', 1.7], ['PA6', 2.2], ['PC', 2.6], ['POM', 2.0]] },
    sources: [
      [3, 'Market data', 'Plastics price indices published by trade press (e.g. Plastics News resin pricing)'],
      [6, 'AI inference', 'Relative prices are illustrative, not current quotes'],
    ],
  },
  'High mould shrinkage': {
    about: 'Mould shrinkage is how much smaller the part is than the cavity once it has cooled. PP and POM shrink roughly 1 to 2.5%, against about 0.5% for ABS. The bigger the total shrinkage, the bigger any difference between regions, and the more room there is for warp.',
    check: ['Check the datasheet’s shrinkage along and across the flow.', 'Measure actual shrinkage on parts at 24 hours.', 'Confirm the tool was cut with the right shrinkage allowance.'],
    chart: { title: 'Typical mould shrinkage', unit: '%', note: 'Typical mid-range values for unfilled grades.', rows: [['HDPE', 2.5], ['POM', 2.0], ['PP', 1.8], ['PA6', 1.2], ['ABS', 0.55]] },
    sources: [
      [1, 'Standard', 'ISO 294-4: determination of moulding shrinkage'],
      [1, 'Datasheet', 'Resin manufacturers’ shrinkage data', '', 'Conflict of interest'],
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013)'],
    ],
  },
  'Direction-dependent shrinkage': {
    about: 'Molecules and fibres line up with the flow, so a part shrinks by different amounts along and across the flow. In unfilled semi-crystalline resins it usually shrinks more along the flow; in glass-filled ones much less along it. Either way, the mismatch twists long or flat parts.',
    check: ['Compare shrinkage along and across flow on the datasheet.', 'Map the flow direction from the gate on the part.', 'Check whether the warp follows the flow direction.'],
    wikipedia: 'Anisotropy',
    sources: [
      [1, 'Standard', 'ISO 294-4: shrinkage measured parallel and normal to flow'],
      [2, 'Handbook', 'Fischer, J. M. Handbook of Molded Part Shrinkage and Warpage (Elsevier, 2013)'],
      [3, 'Encyclopedia', 'Anisotropy, Wikipedia', 'https://en.wikipedia.org/wiki/Anisotropy'],
    ],
  },
  'Amorphous polymers': {
    about: 'In amorphous plastics like ABS, PC and PMMA, the chains stay tangled as they cool instead of packing into crystals. They shrink less (around 0.4 to 0.7%) and more evenly, so they warp far less. The cost is weaker chemical and fatigue resistance, and usually a higher price.',
    check: ['Check whether the part meets its chemical and fatigue needs in an amorphous resin.', 'Compare shrinkage and price with the current material.', 'Consider an amorphous blend such as PC/ABS.'],
    wikipedia: 'Amorphous solid',
    sources: [
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'],
      [3, 'Encyclopedia', 'Amorphous solid, Wikipedia', 'https://en.wikipedia.org/wiki/Amorphous_solid'],
    ],
  },
  'Crystallinity': {
    about: 'Crystallinity is the share of a polymer packed into ordered regions, often 30 to 70% in moulded semi-crystalline parts. Slow cooling gives more and larger crystals, and so more shrinkage; fast cooling freezes less. Uneven cooling therefore means uneven crystallinity, and that means uneven shrinkage.',
    check: ['Measure crystallinity with DSC on samples from different regions.', 'Keep mould temperature steady from shot to shot.', 'Check whether nucleating agents or pigments changed.'],
    diagram: { kind: 'chain', caption: 'How cooling rate becomes shrinkage in a semi-crystalline part.', nodes: [['Cooling rate', 'Set by mould and wall'], ['Crystallinity', 'Slower cooling, more crystals'], ['Density', 'Crystals pack tighter'], ['Shrinkage', 'More where crystallinity is higher']] },
    wikipedia: 'Crystallization of polymers',
    sources: [
      [1, 'Standard', 'ISO 11357-3: Differential scanning calorimetry, melting and crystallisation'],
      [2, 'Textbook', 'Osswald, T. & Menges, G. Materials Science of Polymers for Engineers, 3rd ed. (Hanser, 2012)'],
      [3, 'Encyclopedia', 'Crystallization of polymers, Wikipedia', 'https://en.wikipedia.org/wiki/Crystallization_of_polymers'],
    ],
  },
};
