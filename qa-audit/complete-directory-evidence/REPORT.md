# Complete 24-draft directory QA

Local secondary review surface: `qa-audit/review-24`, served from `http://127.0.0.1:4186/qa-audit/review-24/`. Branch `qa/complete-24-review`. No remote writes or runtime changes performed by this task. Source of displayed titles is the generated manifest, including **Biomedical Equipment Technician (scoped profile)** and **Health Information Technologist (related occupation)**.

**PASS: 2 devices, 48 draft route/search/history/favorite checks, 10 pathway checks; zero recorded failures or browser errors.**

Automated scope (desktop 1365×900 and mobile 390×900): 25 unique directory cards, existing Sonographer preserved, all 24 draft titles searchable and linked to correct stable IDs; back/forward navigation preserves searched title and returns to correct profile; favorites use existing `hcl-favorites` and correct mapped EMT ID; saved-only directory and reload persistence; all five pathway filters equal the generated records; no document overflow, broken profile image loads or uncaught browser errors. Full profile/tab/PDF coverage is run independently by the parent and is not represented by these directory checks.

Pixel inspection: desktop directory top, mobile directory top, scoped Biomedical Equipment Technician desktop, related Health Information Technologist desktop, Paramedic mobile and Medical Transcriptionist mobile. Long scoped titles wrap cleanly; full introductions remain readable; unapproved labels remain visible; text-only articles have no missing-photo placeholders or empty related panels. Paramedic's uncropped portrait appears within Duties with its factual named-person caption and creator/license credit. Directory image captions remain present. Desktop mixed image/text cards have additional whitespace in the shorter card, an existing equal-height grid behavior, not clipping or hidden content.

One initial test-harness error toggled an already-open mobile Filters control closed on the second pathway. Corrected the harness to open only if `#path` is hidden and repeated the suite; no runtime fix was needed.

Evidence: `results.json`; full directory screenshots for both sizes; six representative profile screenshots per size; two cropped directory tops. Script: `../qa-complete-directory.cjs`. These are local review findings, not factual/editorial approval or deployment evidence.

## Current PDF pixel spot check

Inspected rasterized pages from the parent's current integrated PDFs: Paramedic pages 2 and 7; Biomedical Equipment Technician (scoped profile) pages 1, 6 and 7. Both documents are seven A4 pages. Paramedic's portrait is fully visible within Duties, with caption/credit immediately below; its ten-item bibliography is readable and numbered continuously. The scoped technician's long title wraps inside margins, draft banner remains visible, and bibliography links remain readable across pages 6–7. No clipped text, cropped image, missing content or entirely blank page was seen in these samples.

Minor print pagination inefficiency: the scoped technician's final page contains only the last three bibliography entries. This is natural list continuation from a full preceding page, not a blank spill page or content loss. Its full overview also appears in both header introduction and Career Overview by the current full-introduction design, increasing printed length. These are nonblocking polish opportunities; no runtime edits made. Raster evidence: `paramedic-print-page2.png`, `paramedic-print-page7.png`, `bct-print-page1.png`, `bct-print-page6.png`, `bct-print-page7.png`.
