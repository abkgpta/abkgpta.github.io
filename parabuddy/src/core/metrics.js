import * as F from './features.js';
import * as B from './boundary.js';
import { MATERIALS } from './dfm.js';

export function compute(features, boundary, dfmResult, process) {
  const panelArea = B.area(boundary);
  let open = 0, cut = B.perimeterOf(boundary), curves = B.primitives(boundary).length;
  let minW = Infinity, maxW = 0;
  for (let k = 0; k < features.length; k++) {
    const f = features[k];
    open += F.area(f);
    cut += F.perim(f);
    curves += F.curveCount(f);
    const w = dfmResult ? dfmResult.widths[k] : F.minWidth(f);
    if (w < minW) minW = w;
    if (w > maxW) maxW = w;
  }
  let minLig = Infinity;
  if (dfmResult) for (const l of dfmResult.ligaments) if (l < minLig) minLig = l;
  const t = Math.max(0, +process.thickness || 0);
  const mat = MATERIALS[process.material] || MATERIALS.aluminium;
  const solidMass = (panelArea * t * mat.density) / 1000; // mm^3 -> cm^3 -> g
  return {
    count: features.length,
    panelArea,
    openArea: open,
    openPct: panelArea > 0 ? (100 * open) / panelArea : 0,
    minFeature: features.length ? minW : 0,
    maxFeature: features.length ? maxW : 0,
    minLigament: Number.isFinite(minLig) ? minLig : null,
    cutLength: cut,
    curves,
    solidMass,
    massSaved: (open * t * mat.density) / 1000,
  };
}
