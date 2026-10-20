# Six-career editorial pilot — review checklist

**Status: draft, not publication ready.** These are initial, occupation-specific article outlines converted into prose to exercise the reusable renderer. Do not merge this pull request until the editorial and accessibility checkpoints are satisfied.

## Occupations and pathways

| Career | NCHSE pathway | Draft file |
|---|---|---|
| Registered Nurse | Therapeutic Services | `assets/data/pilot/registered-nurse.js` |
| Medical Laboratory Scientist | Diagnostic Services | `assets/data/pilot/medical-lab-scientist.js` |
| Biomedical Engineer | Biotechnology Research and Development | `assets/data/pilot/biomedical-engineer.js` |
| Respiratory Therapist | Therapeutic Services | `assets/data/pilot/respiratory-therapist.js` |
| Health Information Technician | Health Informatics | `assets/data/pilot/health-info-tech.js` |
| Sterile Processing Technician | Support Services | `assets/data/pilot/sterile-processing-technician.js` |

**Note:** NCHSE's career examples list biomedical/clinical engineering in both Support Services and Biotechnology Research and Development. The pilot treats device R&D as the primary focus.

## Validation needed before publication

- [ ] Expand each draft to match the detailed, standalone reference quality of the sonographer model. Current first passes are approximately 420–500 words each: **insufficient for finished career articles**.
- [ ] Independently verify all occupational claims, education and credential routes, and individual references.
- [ ] Verify that every source URL loads and points to the intended current page.
- [ ] Add credible descriptions of benefits, challenges, career advancement, specialties and relevant local/regional education where research supports them.
- [ ] Confirm authoritative May 2025 wage values, underlying BLS occupational labels, and salary classifications. E.g. laboratory wages report the combined group `Clinical laboratory technologists and technicians`, and health information uses `Medical records specialists` as a comparison, not an occupation-perfect substitute.
- [ ] Review the sterile processing directory record's illustrative training-length filter value. Do not present it as a universally required one-year program.
- [ ] Source relevant, licensed imagery selectively, with alt text, captions, and attribution; no unverified stock images.
- [ ] Review article flow for career-specific explanatory value; no forced glossary, filler, needless caveats or checklist padding.
- [ ] Test all seven sections, direct profile links, favorites, related careers, search, filters, phone layout, accessibility, image loading, and print output.
- [ ] Confirm that prototype/draft badges and supporting metadata do not leak into finished articles.

## Engineering note

This pilot uses the existing rich-profile renderer with data in separate ES modules and adds one new directory record. Profiles are registered *only on the pilot branch*. Merging would publish all six, so do not merge until the editorial reviews are complete. The pipeline for generating or fact-checking future articles is not yet automated.

## Reference for pathway groupings

[NCHSE health science career specialties (2022, mirrored by HOSA)](https://hosa.org/wp-content/uploads/2022/08/Health-Science-Career-Specialties-9-2022-revisions.pdf).
