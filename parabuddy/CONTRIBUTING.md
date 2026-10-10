# Contributing to parabuddy

Thanks for helping. A few ground rules keep the files trustworthy for real parts.

## Principles

1. **Millimetres first.** Every number in the core is mm. Convert only at the UI or export edge.
2. **Never hand over a broken file.** Exports must be closed, non-overlapping and correctly scaled.
3. **Keep primitives.** A round hole is a circle, a slot is lines and arcs. Do not turn them into splines.
4. **Deterministic.** Same state and seed must produce byte-identical files. Use the seeded RNG in `src/core/rng.js`, never `Math.random()` in the core.
5. **Speak product.** Parameter labels use hole, pitch, web, margin; not algorithm jargon.

## Adding a generator

1. Add an entry to `GENERATORS` in `src/core/generators.js` with `label`, `edgeRule`, `params` and `generate(params, ctx)`.
2. Return features from `src/core/features.js` (`circle`, `slot`, `poly`). Polygons should be convex where possible; the checks and clipping are exact for convex shapes.
3. Use `ctx.field(x, y)` with `scaleFrom()` so size variation works.
4. Add a test in `tests/core.test.mjs`. The suite already checks that every generator runs, stays inside the margin and is deterministic.

## Development

- No build step. Plain ES modules, served statically.
- `npm test` runs the Node test suites; they must pass before merging.
- Keep the core free of DOM access so it can move to a worker or WebAssembly later.

## Reporting import problems

If a file imports at the wrong size or breaks a CAD feature, open an issue with: the tool and version, the preset JSON (Save button), and what you measured after import.
