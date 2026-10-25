# Isolated bounded content batch

This batch is based on main at `23161b6cf3c815a45d2318f609ac410278e64f9c`, with the existing 24 prepared drafts checked against PR #11 head `8638950f3c9f0994e5544fb708afbd378d3b52fc`. It does not replace or regenerate PR #11’s files.

The selection preserves 20 exact inventory titles and all 22 of their source-pathway appearances. It includes priority titles and selected backlog titles to maintain coverage across all five pathways. `productionWave` controls order only; all 192 appearances and 182 exact source titles remain in the coverage ledger. Exact titles are not necessarily distinct occupations. Unresolved aliases elsewhere remain unresolved.

The prepared articles use the requested current 15-section editorial standard: Professional Associations precedes Bibliography & Sources. The registered runtime still uses its existing 14-tab validator; it is unchanged. No applicable `.agents/skills` files were present in the checkout or PR #11 tree.

## Files for review

- `REVIEW.md`: readable article links.
- `selection.json`: selected IDs, exact titles, and source appearance indices.
- `article-sections.csv` and `sources.csv`: local import-compatible proposals, not a workbook write receipt.
- `qa-report.json`: structural results, separate from editorial/source/media review.
- `independent-review.json` and component review reports: independent spot-check scope and limitations.
- `coverage.json`: full source inventory with bounded-batch coverage only.
- `canonical-snapshot-comparison.json`: comparison against PR #11’s committed snapshot, **not a live Sheet read**.

Each article directory contains editable `sections.json`, a readable `article.md`, exact-title metadata, source records, image evidence, and author QA. Run `python3 content/prepare_bounded20.py` from the repository root to regenerate this batch’s prepared outputs. The script performs local preparation only.

Before integration, reconcile any overlapping work from the original content task, re-read live canonical IDs and content, compare source/media records, and complete remaining reviews. Do not blindly append the prepared rows. No canonical writes, runtime/assessment changes, article registration, approval changes, merges, or deployments are included. No personal email is used.


Follow-up: [source/render checkpoint](source-render-checkpoint.json) and [parent image review](parent-image-review-update.json) supersede initial source, image and rendering statuses. Standalone review is [review.html](review.html). Further image candidates are in the four image-search JSON files. Next20 IDs are reserved only; no new authoring or remote writes.
