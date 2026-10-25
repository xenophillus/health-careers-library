# Local catalog remediation and repeat QA

October 25, 2026; isolated `qa/pilot-review-repairs` worktree based on `8638950f3c9f0994e5544fb708afbd378d3b52fc`. This is a review-only artifact, not deployed, approved or published.

## Changes

- Rebuilt all 24 pages from current local `sections.json` after the parent's two copy corrections. Exact input hashes are in `catalog-manifest.json`.
- Added existing verified photographs to **Duties and Responsibilities** for Athletic Trainer, Dental Assistant, EMT, Medical Assistant and Sterile Processing. No image acquisition. Captions, creator credits, provenance links, licenses and alt text come from those profiles' existing media evidence records.
- Preserved contextual distinctions: EMT image identifies paramedic/corpsman; Medical Assistant image identifies a Navy corpsman doing a shared task; Sterile Processing image explicitly describes a demonstration; Dental Assistant image describes blood-pressure practice.
- Natural image aspect ratio is preserved on desktop, mobile and print. Print figures use a bounded width, full image and caption together. Draft labels remain visible in PDFs.
- Historical original catalog, manifest, builder and checker preserved under `historical-8638950/`. Original audit results and `render-evidence/` remain historical. Current repair outputs are under `repair-evidence/`, separate from the initial text-only audit. The historical HTML is an archive, not the current runnable catalog.

## Repeat checks

Chromium 1365×900 desktop and 390×900 mobile: **48/48 pages pass**, all 720 section instances present, no document/section overflow or uncaught browser errors. All article links use HTTPS and safe new-tab attributes. All five images load at both sizes, have alt text and contextual captions, occur in Duties, and retain natural aspect ratio (difference <0.01).

All **24 A4 PDFs** contain all 15 section headings and the unapproved draft label. Five image-bearing PDFs also contain the exact context caption and creator credit; print-media checks preserve natural ratios and visible captions. Documents span 5–7 pages. Desktop and mobile figure contact sheets visually inspected for all five images; EMT PDF page 2 visually inspected for uncropped image and attached readable caption/credit. This does not claim manual inspection of every pixel of every page.

## Deliverables

- `catalog/index.html`: current local all-24 review catalog; serve repository over local HTTP.
- `build-catalog.mjs`: repeatable builder using the project Markdown converter and existing media evidence.
- `repair-render-check.cjs`: repeatable browser test (local HTTP port 4184).
- `repair-render-results.json`: per-profile/device bounds, image, source-link and print checks.
- `repair-pdf-text-check.json`: per-profile PDF section/draft checks and five caption/credit checks.
- `repair-evidence/`: 48 full-page screenshots, 10 dedicated image screenshots, 24 PDFs, desktop/mobile figure contact sheets, EMT print sample.

## Remaining limits

This all-sections local catalog is a review surface, not the interactive production runtime. Parent owns separate integrated five-pilot preview remediation/testing. The other 19 profiles have no new image integrated here, and their image readiness remains unresolved. Source/editorial blockers outside the parent's two copy corrections still require resolution. No approval flags, canonical Sheet cells, production runtime, or preview files were changed by this subtask.
