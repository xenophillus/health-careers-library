# Trial-career reconciliation and image plan

**Status: Development only. Publication has not been authorized by this document.**

## Existing versus incoming
| Incoming article | Canonical public ID | Action | NCHSE pathway |
|---|---|---|---|
| Athletic Trainer | athletic-trainer | Add only after final approval | Therapeutic Services |
| Dental Assistant | dental-assistant | Add only after final approval | Therapeutic Services |
| Medical Assistant | medical-assistant | Add only after final approval | Therapeutic Services |
| Emergency Medical Technician | emt | Upgrade existing article, preserve favorites and route | Therapeutic Services |
| Sterile Processing Technician | sterile-processing-technician | Add only after final approval | Support Services |

Use occupation identity rather than identical slugs to check for duplicates. Source: NCHSE's Health Science Career Specialties chart (May 2024).

## Photography
The UI now supports optional image records via `assets/data/career-integrity.js`.
For each image, require all of:
- `src`: committed local image path under `assets/images/`
- `alt`: accurate, concise image alternative text
- `credit`: visible photographer/organization credit
- `license`: verified reuse license or permission
- `sourceUrl`: authoritative provenance URL

Until legally reusable images have been selected and saved, the emoji fallback remains visible. A media-readiness finding must remain open; do not report the image stage complete.

## Publication sequence
1. Validate duplicate identities, NCHSE pathways, source fidelity and images.
2. Attach an approved 15-section article to its canonical directory entry.
3. Preserve EMT's public ID `emt`; never add a second EMT card under the draft ID.
4. Confirm favorites, navigation, filters, media, mobile layout and all 15 sections.
5. Publish only with an explicit approval decision on the final reconciled profiles.
