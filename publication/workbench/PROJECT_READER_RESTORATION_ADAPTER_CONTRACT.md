# Project reader restoration: website adapter contract

This contract is for the later integration of `MATHLIBANNEX_PROJECT_READER_EXPERIENCE_RESTORATION_RETURN_R1.zip`. The current candidate remains pinned to the selected Workbench input; this task does not edit mathematical Project HTML, JSON, PDF, or renderer code.

## Intake

1. Audit the Return ZIP and its manifest, hashes, CRC, paths, file types, and declared checker before selecting any bytes. Keep the accepted Workbench files immutable under `publication/workbench/selected/<authority-hash>/`.
2. Replace the existing byte pin and route manifest pin as one versioned selection. Reject unknown routes, route collisions, changed source release identity, or a mixture of files from two Workbench selections.
3. Preserve the existing canonical Card routes and exact source links. The selected Mankiewicz Project must resolve 11 PUBLIC canonical Cards; Sphere Rigidity must resolve 0 PUBLIC Cards. Project-local level ordering is a reading order, not Catalog identity.

## Website transform

The website may add its outer context, canonical/robots/CSP metadata, same-origin assets, feedback link, and fixed Back-to-top control. It must preserve the selected Project's level-grouped compact tile grids, declaration text, dependency links, relation anchors, Card links, and source links. It must not flatten tile groups into prose or generate its own mathematical tiles from JSON.

Same-page relation links must target unique IDs in the mounted page, and the target tile must have a visible focus or highlight state. Canonical Card links remain distinct from same-page relation links. For `/exact-mathematics/`, rewrite only website-owned base paths or source-relative references required for mounting; verify all selected links under both bases.

The website wrapper provides the native Back-to-top experience on Astro-owned Project routes. Static Workbench HTML mounted through `postpublic-adapter.mjs` receives the same-origin site-frame control. No Workbench renderer modification is made here.

## Acceptance before final integration

- Check level grouping, tile counts, relation-anchor resolution, unique IDs, and visible target focus on Mankiewicz and Sphere Rigidity.
- Check 11 Mankiewicz PUBLIC canonical Card links and 0 Sphere Rigidity PUBLIC Cards against Project JSON, rendered HTML, and Catalog.
- Check root and subpath builds, 320/390/1440 px, no horizontal overflow, source views, CSP, canonical, sitemap, robots, and private leakage.
- Keep Formspree automated live POST count at zero and do not publish, push, or deploy during candidate qualification.
