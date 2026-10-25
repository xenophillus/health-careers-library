# Dental Assistant: proposed content and source QA

Status: **unapproved editorial revision**, researched October 25, 2026. One substantive 15-section proposed article; zero publication approvals. No remote Sheet writes, generated-export edits, runtime edits, registration, deployment, or contacts made.

## Deliverables and baseline

- `sections.json`: student-facing Markdown in the implemented 15-section order; 1,659 words excluding bibliography. Word count describes the artifact, not a quality target.
- `source-records.json`: 12 source records mapped to relevant sections, with evidence and access limitations.
- `media-evidence.json`: existing local image inspected, license provenance checked, precise proposed caption and alt text.
- `canonical-reconciliation.json`: all 15 existing canonical cells preserved as `beforeMarkdown` with SHA-256 preconditions alongside proposed revisions. Based on the parent's fresh `content/qa/sheet-snapshot-article-sections.json`, Article Sections A1:L121, hcl-dentalassistant, read October 25. Re-read current cells before applying; this is a proposal rather than permission to overwrite subsequent edits.

The canonical source was examined after the initial generated draft review. It already improved sections 1, 7, 8, 9, and 15. This revision retains its clinical/administrative distinction, state-specific supervision, separate education/certification/legal authority, approximately one-year formal route, CODA relevance, current CDA routes, current wages and percentiles, all-occupation projection comparison, and local-offer distinction. It adds specific instrument-processing context, realistic workflow, distinct dental-team roles, primary-law support, and removes the student-facing editorial approval note. The bibliography and association copy use readable link labels.

## Verification findings

- BLS primary page inspected: May 2025 national median $48,070; lower 10% below $37,130; upper 10% above $62,250; 7% projected growth for 2025–35; 3% all-occupation comparison; approximately 53,000 annual openings. Percentiles explicitly are not starting wages.
- DANB CDA primary page inspected: current Pathway I CODA graduation, Pathway II high-school credential and 3,500 approved work hours; accepted current hands-on CPR/BLS/ACLS; other routes acknowledged. Future 2027 pathway discussion removed as unnecessary to explain current entry.
- K.S.A. 65-1423 primary statutory text inspected. Article's broad Kansas radiography and prohibited-acts claims now rely on statute. No claim that radiography needs no training and no procedural instruction or nitrous-oxide authorization is added. Expanded-function details are deliberately not generalized into a blanket permission.
- Kansas Dental Board FAQ direct web fetch returned 403. Official indexed answer supports no Board-issued assistant license/certification; full FAQ was not inspected. Shell fetch also failed at environment proxy with 403. Treat as access limitation, not proof the public link is broken. The statute supports the substantive legal boundaries independently.
- DANB day-in-life page returned a timeout through web twice. The official search-index passage was available and supports the high-level workflow. Shell request failed at environment proxy with 403. The article's workday is explicitly illustrative; no exact appointment duration, productivity quota, or universal schedule is invented.
- CDC primary pages inspected for instrument processing and Standard Precautions. The article explains occupational responsibility without giving students procedural training instructions.
- ADA, O*NET, CODA and ADAA primary pages inspected. ADAA's service-transition issue remains internal; article claims membership, education and advocacy purposes, not availability of an operational learning portal.
- Existing `assets/images/careers/dental-assistant.webp` inspected visually. Image shows blood-pressure measurement in Wake Tech scrubs beside a dental chair. Commons identifies Wake Technical Community College/waketechcc, Flickr origin, September 16, 2024 creation, CC0 1.0, and October 2, 2024 Flickr license verification. Proposed caption avoids implying that oral treatment is pictured.

## Checks and remaining work

Passed local checks: 15 exact implemented section names in order, unique IDs, nonempty Markdown, 15 canonical baseline cells with hashes. All JSON files parse. No production profile changed, so registered-profile/browser tests would not establish anything about this proposal and were not run.

Pending: parent source-table schema reconciliation and full missing-row search; fresh cell comparison and authorized canonical import; independent editorial approval; browser, mobile crop, print, and imported-link QA under the runtime task. The two source-access limitations above are explicit; full-page verification of those resources remains outstanding. This article must remain unapproved until the release review resolves or accepts those limitations. No action was denied by automatic approval review; unavailable source fetches had no write side effects.
