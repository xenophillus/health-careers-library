# Career preference evidence handoff

This is a data/research candidate based on main `72e96ae8a0a6e5502ce45943033e1f3247e56d6a`. It does not change the live site, runtime, questions, articles, Sheet or inventory. All 192 pathway appearances, 182 exact source titles and 10 cross-pathway duplicate titles remain intact. These are not 182 distinct occupations. Review date: 2026-10-25.

## Deliverables

- `career-evidence.json`: complete 182-title ledger, original appearances/flags, explicit mapping scope, and all 25 preference states per title. Unknown is not absence.
- `career-attributes.js`: sparse `export const careerAttributes` candidate using the released data shape (`status`, `reviewedAt`, `label`, `explanation`, `source`) plus confidence, evidence notes, scope and integration controls. Not imported by the app.
- `mapping-review.tsv`: human-readable full-inventory mapping and coverage review.
- `coverage.json`: generated coverage counts, including unknown relationships and overlapping pathway coverage.
- `source-index.json`: primary URLs indexed to each supported claim.
- `batches/*-evidence.json`: disjoint researchers' source-backed input; raw status may be more general than the accepted status. The build applies conservative mapping gates.
- `batches/*-notes.md`: sources read, method, limitations and unresolved label reasons.
- `independent-review.md`: separate source spot-check and integration findings.

## Research and evidence rules

Researchers read BLS Occupational Outlook Handbook duties/subtype sections, O*NET definitions, reported job titles and Tasks sections, then authoritative occupation/credential bodies for specialties. They did not assign traits from title keywords or pathway membership, nor convert aggregate O*NET context/interest scores into universal requirements. Notes are paraphrases. Review date indicates review, not publication date. URLs and scope are retained on every accepted claim; mapping URLs alone do not verify attributes.

`exact` and `alias` indicate supported occupational identity, not a claim that all jobs are identical. `broader-group` means a source covers a related occupational family rather than this exact label. `ambiguous` and `unresolved` do not become an invented one-to-one occupation. Canonical IDs and titles are preserved, including the CCT spelling and combined Genetic Counselor Histotechnician label. Occupational aliases remain separate inventory entries; no hidden deduplication changes the map.

The integration build downgrades every group/ambiguous/unresolved attribute to `setting-dependent`. A comfort attribute can be `core`/`regular` only with exact/alias mapping and high confidence. Blood, open wounds, emergencies, positioning assistance and personal care are independent evidence categories. Teaching self-care does not establish bathing assistance; needles do not establish visible blood; laboratory work does not establish regular blood exposure; fast work does not establish emergency response.

A documented duty can support a transparent soft interest cue, but this is an editorial connection between a preference and task content, not a validated personality scale or aptitude measure. No private student attributes are needed or collected.

## Runtime-owner integration contract

1. Preserve the full map and existing IDs. Article readiness never gates eligibility.
2. The existing runtime can consume the sparse candidate export for its existing attribute questions. Unknown objects are intentionally omitted because current interest-match code checks object truthiness. Explicit unknowns belong in the ledger, not that sparse export.
3. Existing question keys map as follows: `animals → animalCare`, `positioning → physicalAssistance`, `personal-care → personalCare`; other keys match question IDs. Existing comfort questions remain distinct.
4. `scoringUse: soft-interest` permits optional soft ordering for a supported exact/alias duty. `soft-interest-scoped` permits only qualified, lower-confidence exploration using the recorded broader-group scope; it is always setting-dependent. Show the scope rather than presenting it as an exact occupational trait. `context-only` and `none` do not score.
5. Paired workday questions (`help`, `team`, `pace`, `variety`, `focus`, `location`) lack a verified answer-direction contract and remain context-only. Digital tool use does not establish enjoyment of learning *new* tools; all `digital` claims remain context-only. Do not silently score those fields from existence.
6. `hardExclusionEligible` is true only for exact/alias, high-confidence, core/regular comfort evidence. Exclude only after a separate explicit opt-in for that exact comfort attribute; ordinary avoidance remains a soft caution, and comfortable responses never imply clinical enthusiasm. Current UI only enables blood and emergency exclusions. Additional comfort evidence does **not** authorize adding new unchecked or implicit exclusions.
7. Unknown and setting-dependent careers remain eligible, with specific source notes when available. An unset field means unknown, never safe/absent. Explain evidence coverage rather than claiming every role was fully verified.
8. Replace existing exact-count assessment assertions only after review of the new expected list. Current live tests intentionally expect only EMT/paramedic emergency exclusions; the candidate additionally documents athletic trainers. Browser QA, release cache versioning, question wiring and coherent release integration belong to the runtime owner.

## Rebuild and validate

From repository root:

```sh
node research/attributes/build-evidence.mjs
node --test research/attributes/evidence.test.mjs
node --test scripts/*.test.mjs
node research/attributes/runtime-smoke.mjs
```

Generated files are deterministic from the canonical map and the five batch inputs. Tests check inventory identity, all preference states, provenance, confidence gates, ambiguity protection, baseline exposures, sparse-export safety and honest coverage arithmetic. Independent source checking is separate from structural tests. No merge or deployment is part of this handoff.

## Accepted coverage and validation result

All 182 exact titles have mapping reviews. 142 have at least one sourced attribute; 95 have at least one accepted core/regular attribute. The final ledger contains 188 core/regular, 114 setting-dependent and 4,248 unknown attribute relationships out of 4,550 possible title–preference pairs. Forty titles remain unknown-only. These figures are deliberately not called full verification. There are 17 potential opt-in comfort relationships, but the released UI only enables blood/emergency exclusions. Scoped soft cues number 31; they are included in the 114 setting-dependent relationships, not additional evidence.

All 26 repository-plus-evidence tests passed, as did the existing full-profile validator. An isolated temporary copy using the released runtime and candidate data retained 182 entries, kept unknown/unsure/ordinary avoidance eligible, supported restoration, and produced only Phlebotomist for blood plus Athletic Trainer/EMT/Paramedic for emergency exclusions. This data-only task did not run browser QA or modify runtime; the runtime owner still needs end-to-end verification after wiring additional soft questions.

Independent audit covered 43 sampled table rows, all 17 potential hard-exclusion relationships and at least two positive soft cues per pathway. Review clarified PTA patient-moving evidence, bounded surgical-incision inference, and removed unsupported PET digital inference. It also kept paired and digital-operation-only cues out of scoring.

Remaining source blocker: the informatics researcher received HTTP 403 fetching the NAHQ competency framework; affected quality-role attributes remain unknown. Remaining research gaps and ambiguous-title reasons are recorded individually in the ledger and batch notes. No private email source was accessed.

## Runtime integration in v2.1

The reviewed export is now synchronized into `assets/data/career-attributes.js` by `node scripts/sync-career-attributes.mjs`. The runtime export also includes mapping occupations from the ledger so scoped cues name their actual source occupation. Rebuild the ledger first, then synchronize and run repository/evidence tests. The historical candidate instructions above describe the original data-only handoff.

The application uses explicit soft-interest gates, quarter-weight scoped cues, no career-specific scoring of paired or digital-context fields, and explicit hard-exclusion eligibility. Only the blood and emergency opt-ins are enabled. Individually kept careers survive show-all, reapply and checkbox changes until a full reset. Clinical Coder's mapping also records the NHS exact-title corroboration; no UK qualifications are imported.
