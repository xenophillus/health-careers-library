# Canonical content review batches

These files are proposed editorial source material, not approved site articles. The current canonical workbook remains https://docs.google.com/spreadsheets/d/1UrhfwQa8U-Obx-dOX_PyfTt882adIgpm7uG6ysv23UI/edit . No workbook edits or generated/runtime changes are made by this batch.

Each occupation directory contains 15 ordered Markdown sections, claim-level primary-source records, media evidence or an explicit gap, and review notes. The source-title inventory is preserved in `qa/inventory-review.json`: 192 source-pathway appearances, 182 exact titles, not 182 established distinct occupations. Proposed aliases and grouped labels remain unresolved until supported and reviewed.

`qa/sheet-snapshot-*` are bounded read-only snapshots taken October 25, 2026. They are evidence for reconciliation, not replacement workbooks. Read current cells immediately before applying any proposal. Compare row identity, section title and full current content with the expected snapshot; reconcile concurrent changes instead of overwriting. New article rows are appended only after checking whether the working profile already has sections. Do not touch approval fields or register drafts.

Run `python3 content/prepare_batch.py` to produce import-compatible section CSV, per-cell content proposals with before-values, source-row proposals and a structural QA report under `content/prepared/`. This is local preparation only; it does not access Sheets, change generated articles, register profiles or publish. After authorized canonical updates and readback, use the repository’s normal Sheet sync/import workflow. Generated files alone must never become the source of truth.

Article authors’ source verification, independent editorial review, image/license checks, canonical synchronization, rendered QA and publication approval are separate stages. The runtime task owns deployment and browser behavior. All publication approvals in this batch remain **Not approved**. The source ledger and review notes preserve access failures and inherited research provenance rather than claiming every page was directly retrieved.
