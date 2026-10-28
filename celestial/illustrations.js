// ─────────────────────────────────────────────────────────────
// ILLUSTRATIONS shown inside opened orbs.
//
// Each one is a small technical drawing (section views, top views,
// simple diagrams), drawn as SVG so it stays sharp at any size and
// takes its colours from the current theme:
//   il-part   the moulded part          il-steel  the mould (steel)
//   il-hot    hotter regions            il-cold   cooler regions
//   il-ghost  "as designed" outlines    il-accent the orb's own colour
//
// Every drawing is 320 wide; the second number in svg(…) is its height.
// ─────────────────────────────────────────────────────────────
(() => {
  const r = (n) => Math.round(n * 10) / 10;

  // An arrow from (x1, y1) to (x2, y2)
  const arrow = (x1, y1, x2, y2, cls = 'il-arrow') => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5.5;
    return `<path class="${cls}" d="M${r(x1)} ${r(y1)}L${r(x2)} ${r(y2)}M${r(x2 + h * Math.cos(a + 2.6))} ${r(y2 + h * Math.sin(a + 2.6))}L${r(x2)} ${r(y2)}L${r(x2 + h * Math.cos(a - 2.6))} ${r(y2 + h * Math.sin(a - 2.6))}"/>`;
  };
  const text = (x, y, t, anchor = 'start', cls = 'il-text') =>
    `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;
  const head = (x, y, t, anchor = 'start') => text(x, y, t, anchor, 'il-head');
  const svg = (h, body) => `<svg viewBox="0 0 320 ${h}" role="img">${body}</svg>`;

  // A wavy polymer chain for the material drawings
  const chain = (x, y, seed) => {
    let d = `M${x} ${y}`, px = x, py = y, s = seed;
    for (let i = 0; i < 6; i++) {
      s = (s * 9301 + 49297) % 233280;
      const nx = px + 8 + (s % 9), ny = py + ((s % 23) - 11);
      d += `Q${r((px + nx) / 2 + ((s % 7) - 3) * 2)} ${r((py + ny) / 2 - 8 + (s % 17))} ${r(nx)} ${r(ny)}`;
      px = nx; py = ny;
    }
    return `<path class="il-line" d="${d}"/>`;
  };
  const fold = (x, y) => {   // a folded crystalline lamella
    let d = `M${x} ${y}`;
    for (let i = 0; i < 6; i++) d += `L${x + 5 + i * 5} ${i % 2 ? y : y + 26}`;
    return `<path class="il-accent" d="${d}"/>`;
  };

  // Mould halves at different temperatures, and the part that comes out
  const twoHalves = (hot, cold) => svg(150, `
    <rect class="il-steel il-hot" x="14" y="22" width="140" height="44" rx="3"/>
    <rect class="il-part" x="14" y="66" width="140" height="12"/>
    <rect class="il-steel il-cold" x="14" y="78" width="140" height="44" rx="3"/>
    ${text(84, 42, 'Cavity half', 'middle')}${text(84, 54, hot, 'middle', 'il-head')}
    ${text(84, 98, 'Core half', 'middle')}${text(84, 110, cold, 'middle', 'il-head')}
    ${text(84, 140, 'Mould, in section', 'middle')}
    ${arrow(162, 72, 184, 72)}
    <path class="il-part" d="M192 62 Q252 96 312 62 L312 74 Q252 108 192 74 Z"/>
    <path class="il-ghost" d="M192 66 H312"/>
    ${text(252, 40, 'Part after ejection', 'middle')}
    ${text(252, 128, 'Bows towards the', 'middle', 'il-head')}${text(252, 141, 'hotter side', 'middle', 'il-head')}`);

  const fibres = () => {
    let out = '', s = 7;
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 9; col++) {
        s = (s * 9301 + 49297) % 233280;
        const x = 44 + col * 19 + (s % 7), y = 40 + row * 10 + (s % 5) - 2, tilt = ((s % 9) - 4) * 0.6;
        out += `<path class="il-accent" d="M${x} ${r(y - tilt)}L${x + 11} ${r(y + tilt)}"/>`;
      }
    }
    return out;
  };

  window.CELESTIAL_ILLUSTRATIONS = {
    'warping': {
      caption: 'Side view: the part as designed, and the same part after it has cooled unevenly.',
      svg: svg(150, `
        ${head(20, 24, 'As designed')}
        <rect class="il-ghost" x="40" y="34" width="240" height="12"/>
        ${head(20, 82, 'After cooling')}
        <path class="il-part" d="M40 104 Q160 72 280 104 L280 116 Q160 84 40 116 Z"/>
        <path class="il-ghost" d="M40 104 H280"/>
        ${arrow(40, 100, 40, 128)}${arrow(280, 100, 280, 128)}
        ${text(160, 142, 'Ends pull down where the part shrank more on one face', 'middle')}`),
    },
    'uneven-cooling': {
      caption: 'One mould half runs hotter. That face keeps shrinking longer, so the part curls towards it.',
      svg: twoHalves('hotter', 'cooler'),
    },
    'mould-halves': {
      caption: 'Example temperatures: a 14 °C difference between halves on a flat part is enough to bow it.',
      svg: twoHalves('62 °C', '48 °C'),
    },
    'wall-thickness': {
      caption: 'Section through a part with a thick zone. Its core stays molten longest and shrinks the most.',
      svg: svg(150, `
        <path class="il-part" d="M20 78 H128 V40 H192 V78 H300 V92 H20 Z"/>
        <ellipse class="il-hot" cx="160" cy="70" rx="20" ry="14"/>
        ${arrow(146, 34, 152, 46)}${arrow(174, 34, 168, 46)}
        ${text(40, 72, '2 mm wall')}${text(160, 26, '6 mm section', 'middle')}
        ${text(214, 60, 'freezes last,')}${text(214, 71, 'shrinks most')}
        <path class="il-line" d="M180 68 L210 62"/>
        ${text(160, 116, 'Thin areas set first; the thick core keeps', 'middle')}
        ${text(160, 128, 'contracting and pulls the part out of shape', 'middle')}`),
    },
    'ribs': {
      caption: 'A rib about half to 60% as thick as the wall cools evenly. A full-thickness rib leaves a hot spot and a sink.',
      svg: svg(150, `
        ${head(80, 18, 'Good', 'middle')}
        <path class="il-part" d="M20 86 H76 V32 H84 V86 H140 V100 H20 Z"/>
        ${text(80, 116, 'rib ≈ 0.5–0.6 × wall', 'middle')}
        ${head(240, 18, 'Too thick', 'middle')}
        <path class="il-part" d="M180 86 H232 V32 H248 V86 H300 V100 H250 Q240 106 230 100 H180 Z"/>
        <circle class="il-hot" cx="240" cy="92" r="7"/>
        ${arrow(276, 124, 246, 106)}${text(280, 128, 'sink')}
        ${text(240, 140, 'hot spot where rib meets wall', 'middle')}`),
    },
    'sink': {
      caption: 'Section: a thick boss under the surface shrinks as it cools and drags the visible face inward.',
      svg: svg(140, `
        <path class="il-part" d="M20 40 H122 Q160 52 198 40 H300 V56 H200 V112 H120 V56 H20 Z"/>
        <path class="il-ghost" d="M122 40 H198"/>
        <ellipse class="il-hot" cx="160" cy="78" rx="22" ry="18"/>
        ${arrow(160, 16, 160, 40)}${text(168, 22, 'dip on the visible face')}
        ${text(230, 92, 'thick boss')}${text(230, 103, 'shrinks inward')}`),
    },
    'diff-shrinkage': {
      caption: 'Top view of a moulded plaque. It shrinks by different amounts along and across the flow.',
      svg: svg(150, `
        <rect class="il-ghost" x="60" y="24" width="160" height="100"/>
        <rect class="il-part" x="66" y="34" width="148" height="80"/>
        <path class="il-accent" d="M48 74 L60 66 L60 82 Z"/>${text(40, 100, 'gate', 'middle')}
        ${arrow(238, 74, 226, 74)}${text(244, 70, 'along flow:')}${text(244, 81, 'less shrinkage')}
        ${arrow(140, 10, 140, 30)}${arrow(140, 138, 140, 118)}
        ${text(150, 18, 'across flow: more')}
        ${text(60, 144, 'dashed: mould size  ·  solid: part after shrinkage')}`),
    },
    'semi-crystalline': {
      caption: 'Amorphous chains stay tangled. In semi-crystalline plastics some chains fold into tightly packed crystals, so the material shrinks more.',
      svg: svg(150, `
        ${head(80, 18, 'Amorphous (ABS, PC)', 'middle')}
        ${chain(22, 50, 3)}${chain(26, 72, 11)}${chain(18, 94, 29)}${chain(30, 116, 41)}
        ${head(240, 18, 'Semi-crystalline (PP, POM)', 'middle')}
        ${chain(176, 44, 5)}${fold(214, 56)}${fold(250, 56)}${chain(190, 112, 17)}${fold(222, 96)}
        ${text(240, 140, 'ordered folds pack tighter', 'middle')}
        ${text(80, 140, 'random coils', 'middle')}`),
    },
    'fibre': {
      caption: 'Top view: glass fibres line up with the flow from the gate, so the part resists shrinking along them.',
      svg: svg(130, `
        <rect class="il-part" x="36" y="30" width="190" height="80" rx="2"/>
        ${fibres()}
        <path class="il-accent" d="M22 70 L36 62 L36 78 Z"/>${text(14, 96, 'gate')}
        ${arrow(240, 50, 262, 50)}${text(240, 42, 'flow')}
        ${text(240, 74, 'along: shrinks')}${text(240, 85, 'little')}
        ${text(240, 104, 'across: shrinks')}${text(240, 115, 'more → twist')}`),
    },
    'gate': {
      caption: 'Top view: plastic spreads from the gate in fronts. Areas far from the gate receive less packing pressure.',
      svg: svg(140, `
        <rect class="il-part" x="40" y="24" width="250" height="92" rx="2"/>
        <path class="il-accent" d="M26 70 L40 62 L40 78 Z"/>${text(14, 100, 'gate')}
        <path class="il-ghost" d="M40 40 Q70 70 40 100"/>
        <path class="il-ghost" d="M40 28 Q112 70 40 112"/>
        <path class="il-ghost" d="M70 24 Q160 70 70 116"/>
        <path class="il-ghost" d="M130 24 Q220 70 130 116"/>
        ${text(96, 134, 'flow fronts', 'middle')}
        <rect class="il-hot" x="250" y="28" width="36" height="84"/>
        ${text(268, 18, 'far end:', 'middle')}${text(268, 134, 'packed least', 'middle')}`),
    },
    'packing': {
      caption: 'Cavity pressure during one cycle. Packing tops up the cavity as the plastic shrinks, until the gate freezes.',
      svg: svg(150, `
        <path class="il-line" d="M30 20 V120 H304"/>
        ${text(24, 16, 'pressure', 'start')}${text(304, 134, 'time', 'end')}
        <path class="il-accent" d="M30 120 C60 118 70 40 88 34 L180 40 C196 42 200 60 206 104 C220 116 260 118 300 119"/>
        <path class="il-ghost" d="M88 20 V120 M180 20 V120 M206 20 V120"/>
        ${text(58, 134, 'fill', 'middle')}${text(134, 134, 'pack and hold', 'middle')}
        ${text(194, 28, 'gate', 'middle')}${text(194, 38, 'freezes', 'middle')}
        ${text(254, 134, 'cooling', 'middle')}
        ${text(134, 58, 'too low here → thick areas', 'middle')}${text(134, 69, 'shrink more', 'middle')}`),
    },
    'early-eject': {
      caption: 'Section: ejector pins push a part that is still soft, leaving dents and bends.',
      svg: svg(140, `
        <path class="il-part" d="M30 50 H110 Q120 38 130 50 H190 Q200 38 210 50 H290 V62 H210 Q200 50 190 62 H130 Q120 50 110 62 H30 Z"/>
        <rect class="il-steel" x="30" y="70" width="260" height="40"/>
        <rect class="il-steel" x="116" y="56" width="8" height="62"/>
        <rect class="il-steel" x="196" y="56" width="8" height="62"/>
        ${arrow(120, 132, 120, 118)}${arrow(200, 132, 200, 118)}
        ${text(160, 92, 'mould core', 'middle')}
        ${text(160, 26, 'soft part bulges over the pins', 'middle')}`),
    },
    'cooling-channels': {
      caption: 'Section through a mould. Where a cooling channel is missing, the steel stays hot and so does the part next to it.',
      svg: svg(150, `
        <rect class="il-steel" x="20" y="20" width="280" height="96" rx="3"/>
        <rect class="il-part" x="36" y="62" width="248" height="12"/>
        ${[60, 110, 210, 260].map((x) => `<circle class="il-cold" cx="${x}" cy="40" r="8"/><circle class="il-cold" cx="${x}" cy="96" r="8"/>`).join('')}
        <circle class="il-ghost" cx="160" cy="40" r="8"/><circle class="il-cold" cx="160" cy="96" r="8"/>
        <ellipse class="il-hot" cx="160" cy="62" rx="26" ry="9"/>
        ${text(160, 138, 'missing channel → hot spot → uneven cooling', 'middle')}`),
    },
    'inside-corners': {
      caption: 'Section through the corner of a box-shaped part. Heat is trapped in the steel inside the corner, so the walls lean inward.',
      svg: svg(150, `
        <rect class="il-steel" x="74" y="20" width="200" height="86"/>
        ${text(200, 52, 'core: surrounded by', 'middle')}${text(200, 63, 'plastic, hard to cool', 'middle')}
        <path class="il-part" d="M60 20 H74 V106 H274 V120 H60 Z"/>
        <path class="il-ghost" d="M60 20 L70 20 L84 106"/>
        <circle class="il-hot" cx="84" cy="98" r="12"/>
        ${arrow(40, 30, 58, 34)}${text(16, 50, 'wall')}${text(16, 61, 'pulls in')}
        ${text(170, 140, 'inside corner stays hottest and shrinks most', 'middle')}`),
    },
    'hot-stacking': {
      caption: 'Warm parts stacked in a box keep cooling under the weight above them and set in that squashed shape.',
      svg: svg(150, `
        <path class="il-line" d="M40 30 V128 H280 V30"/>
        <path class="il-part" d="M52 104 Q160 124 268 104 L268 112 Q160 132 52 112 Z"/>
        <path class="il-part" d="M52 88 Q160 104 268 88 L268 96 Q160 112 52 96 Z"/>
        <path class="il-part" d="M52 72 Q160 84 268 72 L268 80 Q160 92 52 80 Z"/>
        <path class="il-part" d="M52 58 H268 V66 H52 Z"/>
        ${arrow(110, 20, 110, 52)}${arrow(160, 20, 160, 52)}${arrow(210, 20, 210, 52)}
        ${text(160, 144, 'lower parts sag the most', 'middle')}`),
    },
    'assembly': {
      caption: 'Two housing halves. A warped half leaves a gap at the seam and snap fits that no longer reach.',
      svg: svg(140, `
        <path class="il-part" d="M40 30 H280 V70 H268 V42 Q160 60 52 42 V70 H40 Z"/>
        <path class="il-part" d="M40 110 H280 V78 H268 V98 H52 V78 H40 Z"/>
        <path class="il-ghost" d="M52 42 H268"/>
        ${arrow(160, 66, 160, 76)}${text(170, 80, 'gap')}
        ${text(160, 20, 'top half bowed', 'middle')}${text(160, 128, 'bottom half flat', 'middle')}`),
    },
    'resin-batch': {
      caption: 'Lining up when warping started against material lots often points straight at the cause.',
      svg: svg(120, `
        <path class="il-line" d="M20 70 H300"/>
        ${[40, 100, 160, 220, 280].map((x) => `<path class="il-line" d="M${x} 66 V74"/>`).join('')}
        <rect class="il-cold" x="30" y="40" width="120" height="18" rx="3"/>${text(90, 52, 'Lot 2201 · parts OK', 'middle')}
        <rect class="il-hot" x="160" y="40" width="130" height="18" rx="3"/>${text(225, 52, 'Lot 2214 · warping', 'middle')}
        <path class="il-accent" d="M160 30 V92"/>${text(160, 104, 'problem starts with the new lot', 'middle')}
        ${text(20, 88, 'weeks')}`),
    },
  };
})();

