# Selected publication assets

This directory holds the report PDFs selected by `publication/pdf-selection.json` for
build-time staging. It is outside Astro's `public/` tree. `scripts/stage-assets.mjs`
checks the selected bytes against the project records and `src/data/assets.json`,
then copies them into the generated `public/reports/` area before a check or build.
Every file under `assets/reports/` must appear exactly once in the selection registry.
Unregistered documents are forbidden in this source tree.
