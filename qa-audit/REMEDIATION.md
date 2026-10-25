# Review-only pilot repairs and handoff

**Five pilots are technically ready for human review on the repaired local preview. None is publication-approved.** This report supersedes the original audit's recoverable rendering/media findings for these five only. Base is PR #11 head `8638950f3c9f0994e5544fb708afbd378d3b52fc`; isolated branch `qa/pilot-review-repairs`. Author branch, production runtime/registry, canonical Sheet and approval flags are unchanged.

## Completed repairs

- Microbiologist section 15: removed `; older wage examples are not used here`.
- Occupational Therapist section 15: corrected `Occupational Therapists29-1122.00` to `Occupational Therapists 29-1122.00`.
- Mirrored both changes in article Markdown, sections JSON and prepared CSV. Canonical Sheet was not edited.
- Five pilot modules now derive directly from prepared sections, with an explicit repository-proposal label instead of claiming to be a current canonical export. Receipt includes source and image hashes.
- Athletic Trainer, Dental Assistant, EMT, Medical Assistant and Sterile Processing images retain inspected bytes, full aspect ratio, exact contextual captions and creator credits. Their figures appear in Duties, not as occupational-identity hero images. Directory cards also show context and avoid cropped frames.
- Simple preview now prints all 15 sections, one image and its caption/credit, and a visible draft banner. Integrated preview preserves the same full-article print behavior.
- All-24 local catalog refreshed, with five pilot images and the two corrected sections. Other 19 image integrations remain pending.

## Tested results

- `node scripts/check-draft-isolation.mjs`: PASS; no draft imports in production registry.
- `node scripts/validate-profiles.mjs`: PASS; one registered profile, unchanged.
- `node --test scripts/validate-profiles.test.mjs scripts/import-profile.test.mjs`: 14/14 PASS.
- `node scripts/qa-prepared-review.cjs`: 20/20 profile/device/surface cases PASS; all 300 section selections, keyboard activation, no horizontal overflow or browser exceptions. Five pilots each tested in simple and integrated previews at 1365 and 390 pixels. Integrated favorites add/remove passed.
- Ten preview PDFs (five pilots × two surfaces) contain all 15 heading names, draft labels, and exact image captions/credits. Images loaded and use `object-fit: contain`.
- Directory checks at both widths: six cards (five pilots plus existing Sonographer), five context-bearing figures loaded without overflow; Dental Assistant search and card-to-profile navigation pass.
- All-24 catalog: 48/48 desktop/mobile pages, 720 section instances, 24 full-article PDFs with draft labels; five image-bearing PDFs include context/credits. Visual contact sheets and EMT print sample inspected. See `remediation-catalog.md` and evidence JSON.

## Reproduce without publication

Apply the supplied patch to the audited base (or reconcile its focused changes against later author work). From checkout root:

1. `node scripts/build-prepared-review.mjs` regenerates only the five-pilot review runtime under `preview/` from repository proposals and checked media records. It does not contact the Sheet. Image hashes fail closed if reviewed bytes change.
2. `node qa-audit/build-catalog.mjs` regenerates all 24 local review pages.
3. Serve with `python3 -m http.server 4184 --bind 127.0.0.1`.
4. Review `/preview/library.html`, `/preview/`, and `/qa-audit/catalog/`.
5. With Playwright available and Chromium at `/usr/bin/chromium` (or `CHROMIUM_PATH`), run `node scripts/qa-prepared-review.cjs`. `pdftotext` is required for PDF evidence. No new runtime dependency or build system was added to production.

The existing general `build-review-library.mjs` and scheduled Sheet sync do not apply these repair overlays by themselves. Run the prepared-review builder afterward for this proposal, or have the runtime owner integrate the behavior into the authoritative workflow. Do not describe repository proposal generation as canonical Sheet synchronization.

## Precise remaining decisions and blockers

1. **Biomedical/Clinical Technician:** accept equipment-service interpretation or create separately scoped biotechnology/clinical-laboratory coverage. Current article does not prove equivalence across inventory pathways.
2. **Medical Information Technologist:** confirm the health-information-technologist alias or preserve unresolved inventory mapping.
3. **Radiologic Technician:** confirm general-radiographer coverage versus limited-scope technician interpretation.
4. **Eighteen new profiles:** image acquisition/selection and pixel/license verification remain unresolved as itemized in `media.md`. No blocked image download was bypassed. **Paramedic:** existing EMT image is available for supported reuse but not integrated in this bounded five-pilot repair.
5. **Canonical reconciliation:** parent must reconcile prepared proposals, current workbook, source rows and generated exports. The earlier receipt is not a fresh live-sheet read. No canonical media or section edits were made here.
6. **Editorial release acceptance:** source spot-check limits remain documented. Dental Board FAQ full-page access and this audit's DANB timeout remain limitations; prior author primary evidence and Kansas statute are retained. This repair does not fabricate a fresh source check.
7. **Scope:** this is five-pilot review readiness plus all-24 local catalog QA. It is not a completed library, a deployment, a production regression certification or permission to approve/publish. Other 158 exact inventory titles remain outside the batch. Documentation's 14-versus-15 conflict remains for owner reconciliation.

## Evidence and delivery

`pilot-repair-evidence/results.json` and `directory-results.json` contain interactive checks. Ten PDFs and 20 profile screenshots plus two directory screenshots support those checks. `repair-evidence/` contains all-24 catalog PDFs/screenshots and five-pilot desktop/mobile contact sheets. Initial evidence remains historical under `render-evidence/` and `historical-8638950/`.

The transferable review bundle includes the correction patch, runnable preview/catalog, current reports, test JSON, PDFs and representative screenshots. Full-resolution individual screenshots remain in the local evidence directories. No merge, remote branch overwrite, deployment, Gmail or personal-email action occurred. No image-access denial was bypassed. No uncertain external mutation exists.
