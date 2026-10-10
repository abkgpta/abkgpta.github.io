# parabuddy

A parametric pattern generator for industrial designers. One pattern gives you
**unit-true SVG and DXF curves** for Rhino, Fusion, Plasticity and SOLIDWORKS, plus
**matching PNG maps** (16-bit height, normal, opacity) for Blender and KeyShot.

It runs entirely in the browser. Nothing is uploaded: patterns, images and exports stay on your machine.

Live: https://abkgpta.github.io/parabuddy/

## What it does today (v0.1)

| Area | Status |
| --- | --- |
| Generators | Perforation grid (straight, staggered 60°, staggered 45°; round, square, diamond, hexagon, triangle, slot holes), radial rings for speaker grilles, Voronoi cells with relaxation, diamond knurl, ribs and vent slots with bridges |
| Size variation | Linear fade, point attractor, organic noise, image halftone; drop, hold or flag features that fall below the process minimum |
| Panel | Rectangle, rounded rectangle, ellipse, circle; edge margin; drop, shrink or clip at the margin; keep-out zones |
| Manufacturing checks | Process presets (laser-cut sheet, punched sheet, CNC, FDM, SLA/MJF, laser micro-perforation, mould texture, custom). Live checks for minimum feature, web (ligament), edge distance and open area; problems show in red |
| Metrics | Open area, feature count, smallest and largest feature, thinnest web, cut length, CAD curve count, mass saved |
| Export | SVG (mm width/height, 1:1 viewBox, real circles and arcs, layers), DXF (R12, mm, CIRCLE/ARC/LINE/POLYLINE, no splines), 16-bit height PNG, normal PNG (OpenGL or DirectX), opacity and mask PNGs with physical size in pHYs, preset JSON |
| Workflow | Per-tool import steps (Rhino, Fusion, Plasticity, SOLIDWORKS, Blender, KeyShot, laser), optional 10 mm calibration square, seeded randomness, undo/redo, autosave, share links that hold every setting |

The rules in the process presets are common rules of thumb. They are not supplier sign-off.

## Not yet

- Import a custom outline (DXF/SVG) as the panel or as a hole motif
- Layer stack (several generators and masks on one panel)
- Curve attractors, inch and micron display units
- Splitting exports for Plasticity's ~700 curves-per-plane limit (the meter warns today)
- DXF R2000, EXR maps, PDF spec sheet, 3D preview, unrolling for curved parts
- Connectors for Rhino/Grasshopper, Fusion and Blender
- Verified round-trip imports in each CAD tool (files are validated with ezdxf and in Chromium; real-tool tests are next)

The full plan lives in the product requirements doc.

## Run it locally

No build step and no dependencies. Serve the folder with any static server:

```sh
cd parabuddy
python3 -m http.server 8080
# open http://localhost:8080
```

ES modules need a server; opening `index.html` from disk will not work.

## Tests

```sh
cd parabuddy
npm test        # node --test, Node 18 or newer, no installs
```

The tests cover generators, determinism, open-area maths, DFM checks, SVG/DXF output, the PNG encoder and the map maths.

## How it is built

```
src/core/      pure geometry, no DOM: runs in browsers, Node and (later) workers
  geometry.js    polygons, clipping, inset, distances
  features.js    circle / slot / polygon features
  boundary.js    panel outlines and their exact export primitives
  generators.js  pattern generators (add new ones here)
  modifiers.js   size-variation fields
  dfm.js         process rules, ligament and edge checks
  metrics.js     open area, cut length, mass
  pipeline.js    state -> fitted, checked pattern
  state.js       document schema, migration, presets
src/export/    svg.js, dxf.js, png.js (16-bit encoder), raster.js (height/normal maps), profiles.js
src/ui/        app.js (shell), controls.js, preview.js (canvas), maps.js, expr.js
tests/         node:test suites
```

Units are millimetres everywhere, y up, origin at the panel's bottom-left corner.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
