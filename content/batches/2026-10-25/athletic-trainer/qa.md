# Athletic Trainer content review — October 25, 2026

Status: proposed canonical replacement; **not approved**, not published, no remote changes. One existing profile revised, zero new occupations or approved profiles.

## Deliverables and canonical reconciliation

- `sections.json`: complete 15-section Markdown article (1,833 whitespace-delimited words), based on the freshly read canonical workbook snapshot, not the divergent generated preview. Working profile ID `hcl-athletictrainer`; website ID `athletic-trainer`.
- `source-records.json`: ten source records mapping occupational, education, regulatory, wage and association claims to section numbers. Expand arrays into individual rows if the Sources sheet requires one section per row.
- `media.json`: corrected photographer credit, explanatory caption, source/license evidence and hash of existing local image; no asset replacement needed.
- Canonical baseline: `content/qa/sheet-snapshot-article-sections.json`, Article Sections rows 2–16. Re-read these exact rows before applying edits and compare content; do not overwrite newer remote changes. Sources snapshot contains no Athletic Trainer records, so these are proposed additions, not verified existing rows. Read the destination again before appending/deduplicating.

## Editorial changes

Replaced the unsupported “most students” pathway assertion with a common route and a named institutional example for five-/six-year timing. Tightened Kansas license wording to avoid contradicting the visiting-team exemption; explained separate clinician protocols. Clarified certification documentation and maintenance. Replaced internal editorial status in the bibliography with ten descriptive links. Removed repeated overview wording from duties; strengthened the illustrative workday without treating it as an observed shift; corrected ambiguous “trainer” wording. Preserved national wage definitions and the distinction from starting salaries.

## Source and image QA

Directly checked BLS, O*NET, NATA role and association pages, CAATE, UNE, BOC initial/renewal requirements, Kansas statute, and Commons image provenance. BLS confirms May 2025 $62,520 median, $48,180/$88,760 tenth-percentile boundaries, 2025–35 13% growth versus 3% overall, and 2,400 annual openings. No Kansas wage or starting-pay number invented. The six-year education example is arithmetic for a four-year bachelor's and two-year professional master's; UNE directly supports its two-year graduate and five-year integrated options.

The local photograph was visually inspected: the hand examination and wheelchair participant are clearly visible. Commons identifies Anthony Lazzaro, a U.S. Marine Corps official-duty public-domain image, and VIRIN 120216-M-IX633-211. Caption avoids the day-level date discrepancy between metadata fields and does not imply a contemporary scene. Mobile crop/print rendering remains with engineering.

KSBHA protocol PDF independently verified by the parent's read-only researcher. This worker's web fetch and curl fetch both returned HTTP 403. The separate-protocol details rely on that explicitly attributed prior primary-source review; no claim is made that this worker retrieved the PDF. Kansas statute was directly retrieved and corroborates licensure/protocol framework and the narrow visiting-team exception. The blocked PDF is a retrieval limitation, not proof that the source is broken; no approval rejection occurred.

## Checks and remaining gates

Local Node check passed: 15 nonempty sections, exact current standard order, 15 unique IDs, ten source records; no internal editorial/fact-check wording found in student article. All substantive original sections retained or revised; no new registry entries or generated exports edited. Bibliography and section wording reviewed manually.

Remaining: canonical destination diff/application and import, independent final editorial approval, and rendered desktop/mobile/print verification by the runtime task. The source mapping is prepared locally; do not report the live Sources tab as complete until changes are actually applied and read back. Neither the local structural pass nor prior browser checks approve this revised article.
