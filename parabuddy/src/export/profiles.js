// Per-tool export profiles: which file to use and how to import it at true scale.
// Import facts come from each tool's docs and support forums (see the PRD).
export const TARGETS = {
  rhino: {
    label: 'Rhino / Grasshopper',
    files: ['svg', 'dxf'],
    steps: ['Set the Rhino document units to millimetres before importing.', 'File > Import, pick the SVG or DXF; curves land on the boundary and pattern layers.'],
  },
  fusion: {
    label: 'Fusion',
    files: ['dxf', 'svg'],
    steps: ['Insert > Insert DXF, pick a sketch plane, set units to mm.', 'DXF keeps holes as true circles and arcs, which Emboss and Extrude handle cleanly.'],
    curveWarn: 5000,
  },
  plasticity: {
    label: 'Plasticity',
    files: ['svg'],
    steps: ['Import the SVG onto a plane.', 'Plasticity stops drawing a region above about 700 curves per plane; split the export if the meter is red.'],
    curveLimit: 700,
  },
  solidworks: {
    label: 'SOLIDWORKS',
    files: ['dxf'],
    steps: ['SOLIDWORKS has no SVG import. Use Insert > DXF/DWG on a face or plane.', 'Choose millimetres in the import dialog.'],
  },
  blender: {
    label: 'Blender',
    files: ['height', 'normal', 'opacity', 'svg'],
    steps: ['For rendering, use the height map for displacement or the normal map for bump.', 'Map size in mm is written into the file name; scale the UV or texture mapping to match.'],
  },
  keyshot: {
    label: 'KeyShot',
    files: ['height', 'normal', 'opacity'],
    steps: ['Add the height map as bump or displacement and the opacity map for perforations.', 'Set the texture size to the panel size in mm shown here.'],
  },
  laser: {
    label: 'Laser cutter (LightBurn etc.)',
    files: ['dxf', 'svg'],
    steps: ['Import the DXF; it is already in mm.', 'Apply kerf compensation in your laser software.'],
  },
};

export const FILE_LABELS = {
  svg: 'SVG curves',
  dxf: 'DXF curves',
  height: 'Height map (16-bit PNG)',
  normal: 'Normal map (PNG)',
  opacity: 'Opacity map (PNG)',
  mask: 'Feature mask (PNG)',
  json: 'Preset (JSON)',
};
