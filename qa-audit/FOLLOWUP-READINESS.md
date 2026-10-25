# Follow-up readiness and deployment handoff

October 25, 2026. **Ten profiles have completed the bounded independent source/editorial and local interactive presentation checks.** This is useful draft readiness, not a generic all-unapproved result and not a publication approval. Five are on the repair-branch preview; five additions are deliberately local only.

## Ready for content/release review

| Profile | Evidence complete | Remaining owner/integration work |
|---|---|---|
| Athletic Trainer | Substantive 15 sections; retained parent source checks; independent copy/image inspection; contextual licensed photo; desktop/mobile/keyboard/favorites/full-print checks | Canonical/branch reconciliation and publication decision; live protected-browser check blocked separately |
| Dental Assistant | Same technical gates; precise training photo/credit; existing statute and author credential evidence retained | Accept or resolve documented Dental Board FAQ/DANB full-page access limits; canonical/release decision |
| EMT | Same technical gates; photo explicitly identifies paramedic/corpsman shared-task context | Canonical/release decision; live protected-browser check |
| Medical Assistant | Same technical gates; identified Navy corpsman shared-task photo in Duties | Canonical/release decision; live protected-browser check |
| Sterile Processing | Same technical gates; demonstration context and attribution; credential spot-check | Canonical/release decision; live protected-browser check |
| Paramedic | Independent source/copy review; verified existing EMS photo reused with exact identities; 15 tabs, mobile, keyboard, favorites persistence and complete PDF tested | Local secondary preview only; canonical and final release integration |
| Biomedical/Clinical Engineer | Independent source/copy review; deliberately text-only (no misleading technician photograph); full interactive and print checks | Local secondary preview only; preserve both source pathways, canonical/release integration |
| Cancer Registrar | Independent source/copy review; text-only decision avoids specialist software diagram as decorative filler; full interactive/print checks | Local secondary preview only; canonical/release integration |
| Medical Records Technician | Independent source/copy review and supported occupational crosswalk; text-only decision avoids uninspected historical paper-file image; full interactive/print checks | Local secondary preview only; canonical/release integration |
| Medical Transcriptionist | Independent source/copy review; original occupational examples more useful than generic headset imagery; full interactive/print checks | Local secondary preview only; canonical/release integration |

Source status is bounded: high-risk wages/credentials/legal claims sampled and existing evidence retained, not all 273 records fetched again. Four intentional text-only choices are editorial decisions grounded in project rules, not missing-image placeholders.

## Rules: selective imagery and final owner approval

`docs/LIBRARY_LAUNCH_PLAN.md` presentation gate says: **“useful licensed images when available, attribution/alt text; correct tabs, related links, responsive reading layouts and print output.”** `PROJECT_DECISIONS.md` says: **“Use authentic, relevant images ... when they deepen understanding”** and **“no section should exist merely because a component is available.”** There is no one-photo-per-profile quota. Four text-only dispositions above apply this rule; they do not pretend an unavailable photograph was verified.

The launch-plan workflow says: **“Publication is explicitly approved by the project owner; no automatic merge.”** AGENTS says: **“Do not directly edit main, merge, or deploy without the user's explicit approval.”** No rule requires personal owner rereview of every individual paragraph as a prerequisite for technical QA. Owner publication approval remains separate from completed editorial/source/render evidence. The latest user approval covers draft PR and existing review-site update, not approved student publication or the separate privacy package.

## Remaining 14 profile dispositions

| Profile | Exact unresolved work |
|---|---|
| Biochemist | Molecular-model source/license verified; ordinary original-file GET failed proxy403; no pixels/local asset. Useful scientific figure remains unfinished. |
| Biostatistician | Historical Nightingale source/license verified; original GET proxy403; explanatory visual and readable rendering remain unfinished. |
| Microbiologist | Bibliography aside fixed; CDC source/license evidence retained; original GET proxy403; micrograph pixel/colorization presentation pending. |
| MRI Technologist | Source/license verified; original GET proxy403; clinical-output figure/CC BY-SA implementation pending. |
| Radiologic Technician | General-radiographer crosswalk now evidence-supported and explicitly bounded. Original radiograph GET proxy403; visual work remains. No longer an unresolved title mapping. |
| LPN | Source/license record refreshed; source-page GET proxy403; image not acquired or inspected. |
| RN | Source/license record refreshed; source-page GET proxy403; image not acquired or inspected. |
| OT | Bibliography spacing fixed; source/license refreshed; source-page GET proxy403; hand-brace image not acquired/inspected. |
| PT | Source/license refreshed; source-page GET proxy403; portrait not acquired/inspected. |
| Surgical Technologist | Source/license refreshed; source-page GET proxy403; technician visibility and non-graphic suitability not inspected. |
| Community Health Worker | Source/copy/text-render checks complete; no cleared suitable selected photo. Brazilian licensing warning and Ethiopian role/context mismatch remain. No new download attempted. |
| Phlebotomist | Source/copy/text-render checks complete; no individual-file rights/provenance established for selected image. No new download attempted. |
| Biomedical/Clinical Technician | Equipment-service scope now explicit, two original inventory appearances preserved. Exact crosswalk unresolved; do not claim both appearances completed. BMET candidate GET proxy403. Text-only scoped article is possible, but no completed alias/inventory credit. |
| Medical Information Technologist | Related health-information-technologist scope and non-universal RHIT clarified. Exact alias unresolved. Rejected historical tablet as weak illustration; text-only related article possible, without exact inventory credit. |

The twelve visual-work items are not assertions that the project mandates a photo on every page. They identify useful visual work that this pass did not complete; unlike the four assessed text-only profiles, no final selective-presentation decision was adopted for them here. All 14 still have complete prepared text; all 24 text catalogs were rendered. Do not confuse draft quality, exact inventory coverage, media completeness, and publication permission.

## Local remediation after repair commit f241166

- Three scope corrections in articles/sections/metadata/source records and proposed prepared files. Four original source appearances preserved. No approval flags changed. Bibliography/source support records remain 273; 360 article sections; 712 section-source mappings.
- `mapping-review.json` in each affected folder records parent-provided NCHSE/O*NET/credential research, distinctions and remaining uncertainty.
- Three changed profiles rerendered at desktop/mobile; all six cases pass. PDF text confirms scope paragraphs, associations, bibliography and draft labels.
- `build-expanded-review.mjs` creates local `expanded-preview/` from the preserved five-pilot runtime and adds five reviewed profiles. Paramedic reuses verified bytes. Empty Related careers panels suppressed only in this local secondary surface.
- Expanded QA: 20/20 added-profile/device/surface cases, 300 section activations, keyboard, favorites persistence, no overflow/errors, 10 complete labeled PDFs. Directory 11 unique cards (10 drafts plus existing Sonographer), search and routes pass. No added-profile deployment/push.

## Approved PR/review-site outcome

The previously rejected draft PR was authorized by new explicit user approval and then created successfully: **PR #16**, `qa/pilot-review-repairs` → `content/library-profile-batches`: https://github.com/xenophillus/health-careers-library/pull/16 . No merge. Target remains `8638950f3c9f0994e5544fb708afbd378d3b52fc`; remote repair head remains `f241166a82292f421261e6eafe1d99a86f4dbf8f`. No newer author changes were overwritten.

The existing Vercel Git integration produced a READY preview for that exact repair head, project `hcl-git-editorial-review`, team `team_jpT0z14FWfbGEZN6ccHzDNBX`, deployment `dpl_G25b5VgvCuDaNJh3hp7LqrW1vPn9`, preview target (not production). URL: https://hcl-git-editorial-review-hasq9vh8n-roddcg-4576.vercel.app/library.html . Build timestamps indicate approximately 2.1 seconds. Branch alias: https://hcl-git-editorial-review-git-qa-pilot-review-6d9aa8-roddcg-4576.vercel.app/library.html . Metadata confirms source commit/READY only; it is not a live browser/print pass. Direct repair-branch preview avoids merging or altering the author branch/default review alias.

**Exact live-verification blocker:** Vercel `web_fetch_vercel_url` for this protected deployment was rejected by automatic approval review because it creates/reuses a temporary share link (23-hour lifetime), potentially extending access beyond the approved existing protected path. Known not executed; no retry or alternate disclosure route used. No authenticated Vercel CLI/browser token is available locally. Read-only deployment file-tree/content API requests returned404, so no deployed content verification is claimed. Protection remains as reported: SSO enabled, `all_except_custom_domains`; no protection/privacy setting changed. Local full-print tests pass; deployed full-print behavior remains unverified.

No image-access restriction was bypassed. Media failures are ordinary proxy403 failures, not publication approvals or uncertain writes. All local additions after f241166 remain unpushed. The earlier Library helper failed before preparing uploads; it created no transferable Library item.
