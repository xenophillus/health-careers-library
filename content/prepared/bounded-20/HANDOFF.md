# Bounded batch handoff

Completed 20 substantive 15-section drafts,141 source records, 300 section rows and 468 section-specific source export rows. Review starts at [REVIEW.md](REVIEW.md). Exact IDs and 22 source appearances are in [selection.json](selection.json); the full 192 appearances/182 exact titles remain in [coverage.json](coverage.json).

## Scope and QA

All 20 profiles received a separate full-text editorial read and primary-source spot-check. Corrections identified in those reviews are resolved. Root independently cross-checked 11 national medians. Structural, metadata, source-map and CSV round-trip checks pass. Source checking is bounded, not exhaustive all-claim or legal approval. All 20 still lack publication-ready imagery. See [independent-review.json](independent-review.json), component reviewer reports and per-profile media files for distinct license/provenance/pixel statuses.

Exact image-download blockers: requests for recorded Wikimedia/CDC original image URLs failed with network-proxy HTTP 403 (tunnel failure); web image links often returned a URL without viewable pixels. Some candidate images were rejected for relevance, and some original provenance remains unresolved. Several Kansas board pages and the current BGC application page also returned 403; accessible statutes, official indexed material and dated primary documents were used only within their stated limits. These are external access failures, not automatic approval-review denials. No blocked write has an uncertain outcome because no external write was attempted.

## Integration

Branch: `content/bounded-20-profiles`, based on main `23161b6cf3c815a45d2318f609ac410278e64f9c`. PR #11 was re-fetched at completion and remained `8638950f3c9f0994e5544fb708afbd378d3b52fc`; none of these 20 titles overlaps its 24 prepared drafts or other metadata directories. The original task may still have unpushed work: reconcile with the parent before integration.

All changes are additive under `content/`; no canonical Sheet, runtime, assessment, approval flags, registration, merge or deployment changed. No email used. No remote branch or draft PR was opened: existing repository automation creates deployment previews, and deployment was excluded from this task. A local draft description is provided in [DRAFT_PR.md](DRAFT_PR.md).

The portable Git bundle and patch are returned separately with the final commit. Parent can fetch the bundle into a review ref, inspect the content-only commit, and cherry-pick after duplicate reconciliation. Before any canonical integration, read live IDs/rows/content and preserve concurrent edits. The CSV files are proposals, not append instructions or write receipts. Complete remaining image/source and rendered review before student publication; full library work beyond these 20 titles remains outstanding.


Follow-up: [source/render checkpoint](source-render-checkpoint.json) and [parent image review](parent-image-review-update.json) supersede initial source, image and rendering statuses. Standalone review is [review.html](review.html). Further image candidates are in the four image-search JSON files. Next20 IDs are reserved only; no new authoring or remote writes.

Image rule clarified: useful licensed imagery is optional, not mandatory per profile. Clean text-only presentation is acceptable. Current standalone print QA passed20profiles/84pages; see print-qa.json. New parent-cleared pharmacist, RT and industrial-hygienist replacements are recorded in parent-cleared-replacements.json.
