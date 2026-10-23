# Health Careers Library — launch inventory and publication gates

**Status:** Internal launch planning, not student-facing. Updated October 2026. This document defines a *provisional* scope, not a publication commitment.

## Public-launch goal

Prepare a comprehensive, usable collection **before announcing a public launch**. Initial proposed planning target: **60 prioritized NCHSE chart entries, distributed across pathways according to variety and coverage**. The complete May 2024 NCHSE source baseline contains 192 pathway listings. All remaining 132 entries are tracked for later production in `docs/launch-careers.json` and `docs/CAREER_COVERAGE.md`. The first wave is an editorial starting point, subject to review of professional distinctions, accuracy, pathway classifications, and coverage. Do not pad the library to satisfy the numerical target or split identical roles into artificial occupations.

Source of truth for the *planning inventory*: `docs/launch-careers.json`. Its `profileStatus` does not change the live directory, article registry, or publication status. Entries do not count as completed until reviewed and approved.

The five NCHSE pathways are a **classification framework**, not perfectly exclusive occupational boundaries. Some roles may be placed differently depending on duties. Review borderline cases: veterinarians; community health workers; imaging specialties; health informatics nurses; engineers; clinical research; environmental/supply-chain/administrative support. Do not claim the inventory's placement is NCHSE-endorsed until verified. Distinguish broad occupations from specializations; consolidate or substitute as the review requires.

## Publication gates

1. **Coverage:** selected launch inventory approved and complete across all five pathways; students can meaningfully compare diverse careers, preparation routes and work settings.
2. **Article structure:** each full profile uses all 14 tabs, in exact model order. Run `node scripts/validate-profiles.mjs` and tests.
3. **Editorial depth:** substantial, natural, occupation-specific reference writing; genuinely informative duties, workday, conditions, education, credentials, pay and outlook, variations, challenges and related careers. No word-count padding.
4. **Evidence:** verify key claims, especially training, licensing, credential eligibility, wages, job outlook, dates and geography. Citation URLs must load and support the corresponding statements; labels must distinguish BLS grouping from the occupation where needed.
5. **Presentation:** useful licensed images when available, attribution/alt text; correct tabs, related links, responsive reading layouts and print output. No unfinished markers or illustrative statistics represented as verified.
6. **Functionality:** search, pathways, filters, favorites, direct links, history navigation, accessibility and mobile tested. Comparison or assessment features, if advertised on launch, must also be functional.
7. **Privacy and readiness:** no required student login or personal data collection. A separate public-launch readiness review decides when to release.

**Critical deployment rule:** do not merge incomplete registered full profiles to the GitHub Pages source branch. GitHub Pages currently serves a publicly accessible prototype, so distinguish technical accessibility from the future *official launch*. Stage unpublished content in a development branch. Draft files must not be included in `fullProfiles` on the deployed branch.

## Development workflow

- One long-lived **development branch** for the full-library build and small technical commits inside it.
- Keep drafts unregistered until validated, even inside the development branch when possible. Use feature previews rather than repeatedly publishing incomplete batches.
- Work in repeatable batches after the six-career pilot verifies content quality and the renderer. Maintain one status per inventory record.
- Verify 14-tab structural checks, sources and editorial quality before changing an entry to `approved`.
- Produce a **single launch review** with full coverage, source-audit sampling, automated checks, link checking and browser QA. Publication is explicitly approved by the project owner; no automatic merge.

## Work sequence

1. Review the 60 prioritized source listings and all deferred source entries for overlap, ambiguous labels, high-school relevance and coverage. Preserve the full backlog.
2. Convert one pilot article (Sterile Processing Technician) to reference quality in 14 tabs and validate it independently.
3. Expand the remaining five pilot articles; evaluate the batch for quality and source verification.
4. Develop a sustainable research/drafting workflow and quality checks before generating additional groups.
5. Complete the approved inventory, audit cross-career links/labels, test exploration features, and conduct final launch review.

## Progress metric

Track `approved` / full source baseline and first-wave approval separately, with unique approved profiles and per-pathway coverage. **Unreviewed drafts and placeholder directory cards count as zero completed profiles.** Do not claim progress from file counts alone.
