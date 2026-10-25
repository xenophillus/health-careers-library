# Five added profiles — local secondary preview QA

Scope: `qa-audit/expanded-preview`, built by `qa-audit/build-expanded-review.mjs`. This is a local unpublished secondary review surface. No remote writes, publication approval, deployment or mutation of the original five-pilot preview occurred in this QA subtask.

| Added profile | Media choice | Desktop / mobile, simple + integrated | Full print, both surfaces |
| --- | --- | --- | --- |
| Paramedic | Existing verified EMS image, contextual caption | Pass | Pass |
| Biomedical/Clinical Engineer | Intentionally text-only | Pass | Pass |
| Cancer Registrar | Intentionally text-only | Pass | Pass |
| Medical Records Technician | Intentionally text-only | Pass | Pass |
| Medical Transcriptionist | Intentionally text-only | Pass | Pass |

Twenty profile/device/surface cases cover 300 tab activations: each has all 15 correct section headings and active-selection states, keyboard Enter activation, no horizontal overflow in any tab, and no uncaught browser error. Integrated favorites add, persist through reload, and remove for each added profile at both viewport sizes. The four text-only profiles have no image elements in the tested Duties body, and route checks found no broken image placeholders.

Ten A4 PDFs (five profiles × two surfaces) contain all 15 section headings and visible draft labels. Paramedic print includes the exact factual caption and credit. The existing EMS bytes are reused, with alt text and caption matching `content/batches/2026-10-25/paramedic/media-review.json`. Desktop, mobile and print use `object-fit:contain`: the portrait pixels retain their aspect without cropping inside the bounded image box. The initial test incorrectly equated image element-box ratio with contained image-pixel ratio; that assertion was corrected after inspecting the screenshot. No product change was necessary for that finding.

Directory checks pass at 1365×900 and 390×900: 11 unique cards (10 unapproved drafts and Sonographer), each added title searches correctly, View profile opens the correct record, no broken images, no horizontal overflow or browser errors. Original five-pilot profile tests were not repeated.

Visual inspection included added-profile mobile contact sheet, Paramedic desktop integrated screenshot, and Paramedic integrated PDF page 2. Caption identifies Anthony Estrada as the paramedic and Jessica Sanderson as the Navy corpsman, avoiding an unsupported role equivalence. The four text-only choices follow the meaningful-visual rationale in `../expanded-media/research-info-media.md`; no decorative stock substitute was added.

Presentation finding fixed locally: added records have empty `related` arrays, which initially produced an empty “Related careers” panel. The expanded builder now suppresses the aside when no related IDs resolve to actual records. Only the secondary generated view changes; original preview untouched. Targeted repeat checks on all five additions at both widths confirm no empty aside, all 15 tabs and no overflow. Integrated screenshots refreshed; article/print content unchanged. See `related-results.json`.

Evidence: `results.json`, `directory-results.json`, 20 profile screenshots, 2 directory screenshots, 10 PDFs, `added-mobile-contact.jpg`, `paramedic-print-page2.png`. Reproduction scripts: `../qa-expanded-review.cjs` and `../qa-expanded-directory.cjs` using the local server on port 4184. No source-truth or publication sign-off is implied by these rendering results.
