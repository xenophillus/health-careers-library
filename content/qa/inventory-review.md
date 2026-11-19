# Inventory and reusable editorial QA review — October 25, 2026

This internal review preserves **192 source-pathway appearances and 182 distinct exact titles**. It does not establish 182 distinct occupations. No article, alias, split, correction or publication approval is established by this review.

The companion `inventory-review.json` contains every original `docs/launch-careers.json` record, its one-based source index, exact-title matches, candidate relationships, review flags and unresolved article mapping. Its source SHA-256 identifies the inspected snapshot. The original source records, including production waves and status fields, are copied without modification. The 60-entry priority wave does not limit coverage.

| Source pathway | Appearances |
| --- | ---: |
| Therapeutic Services | 54 |
| Diagnostic Services | 41 |
| Health Informatics | 42 |
| Support Services | 21 |
| Biotechnology Research and Development | 34 |
| Total | 192 |

## What requires a decision

Ten exact titles repeat across pathways: Audiologist, Nurse Practitioner, Occupational Therapist, Physical Therapist, Physical Therapy Assistant, Respiratory Therapist, Medical Assistant, Healthcare Administrator, Biomedical/Clinical Engineer, and Biomedical/Clinical Technician. A shared approved article may eventually serve multiple appearances, but the pathway appearances must remain separately traceable.

Candidate alias groups include Dietitian/Nutritionist versus Nutritionist/Dietitian; Occupational Therapy Assistant versus Occupational Therapist Assistant; and Clinical Laboratory Technician versus Medical Laboratory Technician. These are textual candidates, not confirmed synonyms. The JSON also records overlapping job families, levels and specialty labels without merging them.

Resolve particularly consequential source ambiguity before article mapping:

- **Genetic Counselor Histotechnician:** inspect the original chart layout. Do not assume the compressed label is a single occupation or silently create two approved entries.
- **Environmental Services** and **Health Information Services:** these name service areas. Determine the intended role or create an explicitly explained overview only after editorial review; do not silently substitute an occupation.
- **Certified Cardiogenic Technician (CCT):** compare the original chart with the credential issuer's current terminology before any correction.
- **Art/Music/Dance Therapist(s), Kinesiotherapist/Kinesiologist, Orthotist/Prosthetist:** preserve the grouped label while researching whether each named profession needs distinct treatment.
- **Cardiac imaging and electrophysiology labels:** the source mixes broad occupational titles, specialties and credential-bearing titles. Retain each appearance and explain the relationship to its underlying occupation after credential-source research.
- **Technician/technologist, associate/scientist and manager/technician labels:** do not infer equivalent duties, pay or education from similar names.
- **Broad research, finance, information and support titles:** specify the healthcare setting and intended role before choosing an occupational wage series or credential pathway.

The ledger flags textual risks; it has not independently re-inspected the original NCHSE PDF or verified every role against an occupational authority. No primary-source occupational assertions should be inferred from the candidate groups.

## Repeatable research and acceptance method

1. **Define the article boundary.** Record all source indices served, working profile ID, stable website ID, proposed normalized title and any unresolved labels. Retain original titles/pathways. Explain whether a related label is an alias, credential, specialty, job level or distinct profession, with authoritative evidence. Do not mark coverage while this is unresolved.
2. **Read the canonical source before editing.** Use the personally owned workbook identified in `docs/SHEET_IMPORT_WORKFLOW.md`. Read the relevant Career Profiles, Article Sections, Sources, Media and Review Queue rows and record a snapshot or exact before-values. Do not treat generated JavaScript as canonical. Immediately before a remote update, re-read affected rows and compare; reconcile intervening changes rather than overwriting them. Keep ambiguous targets pending parent clarification.
3. **Build claim-level source records.** For each material duty, training route, credential, law, wage and projection, record profile ID, section, claim, primary source title/publisher/URL, access date, relevant passage or page/section locator, source date, jurisdiction/occupational grouping, verification result and unresolved limitations. Distinguish a page that loaded from a claim that was actually supported. A bibliography link alone is not verification.
4. **Verify sensitive distinctions.** Check current statutes/regulations or regulators for licensure and legal delegation; credential issuers for examination and eligibility; recognized accreditors or institutions for educational routes; BLS for dated wage statistic and projection period. Do not equate a credential with procedure authority, a national description with Kansas law, a broader grouping with the exact role, or wage percentiles with starting salaries. Check enacted laws' effective dates. Keep source conflicts in internal notes and narrow unsupported student-facing claims.
5. **Author all 15 implemented sections.** Use the ordered headings in `assets/data/profile-standard.js`, with Professional Associations immediately before Bibliography & Sources. The older 14-section prose is stale. Each section must explain this career rather than repeat general healthcare advice. Workday examples should be clearly illustrative. Preserve meaningful differences among settings, specialties and entry routes. Avoid minimum-word-count padding, generic disclaimers and editorial status notes in article copy.
6. **Verify media separately.** Record exact source file page, creator, license/version or public-domain basis, attribution, local asset path, original descriptive context, caption and alt text. Inspect the actual image. A healthcare scene must not be labeled as a specific occupation without evidence; for example, a military corpsman image does not establish that its subject is a civilian medical assistant. Record crop and mobile/print inspection separately from license verification. Unresolved image rights or misleading captions block image readiness.
7. **Reconcile and generate.** Keep proposed content, source and media records together in a reviewable batch. After authorized canonical updates and a fresh readback, use the normal importer/sync path to regenerate exports. Confirm all 15 sections, stable IDs, bibliography links, source mappings and publication flags survived conversion. Never repair only the export or turn draft into approved as a side effect.
8. **Review editorially and functionally.** Check accessible high-school prose, unsupported scope claims, repetitive sections, broken citations, substantive salary labels, and related-career distinctions. Run appropriate structural/import checks; then inspect the rendered article, keyboard navigation, images, links, mobile width and print. Coordinate runtime defects with the runtime owner. Passing structural tests or browser checks is not factual review or publication approval.
9. **Record disposition precisely.** Track research, authored, source-verified, media-verified, editorial-reviewed, functional-QA and owner publication approval separately. Record reviewer/date and remaining blockers. Do not label an article complete while a required stage remains unresolved. Draft PRs remain unmerged until parent release instructions.

## Coverage accounting

Report distinct approved profiles separately from source appearances served. Count a source appearance as served only when its explicit mapping to an approved profile or clearly scoped set of approved profiles is resolved. A grouped label may need multiple profiles; a cross-pathway duplicate may share one profile. Neither case changes the original 192-appearance denominator. Keep per-pathway served counts and unresolved mapping counts, not only a single percentage.

At this inventory-review stage: **0 new profiles approved; 0 source appearances newly approved; all 192 mappings remain unresolved in this ledger.** This is a conservative result of this review, not a claim that no draft content exists. The existing five drafts and Sonographer model require their separate editorial and publication decisions. A directory card, inventory row, generated file or all-section presence is never counted as a completed article.

## Validation performed

The generation check asserted 192 mapped records, 182 exact titles and exact parsed-JSON equality between each preserved `sourceRecord` and its corresponding original record. It also calculated the five pathway totals above. No runtime, inventory source, generated export, canonical workbook or approval state was changed.
