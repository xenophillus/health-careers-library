# Career profile content standard (14 tabs)

This is the mandatory **navigation and coverage standard** for approved full-length career articles. The exact tab names and their order come from the existing Diagnostic Medical Sonographer profile (`assets/data/sonographer.js`). A stable structure helps students compare careers without sacrificing occupation-specific depth. Authors can use additional subheadings, images, tables and diagrams *within* tabs when useful.

| Tab | Required editorial coverage |
| --- | --- |
| Career Overview | Define the profession, who benefits from its work, and how it fits in healthcare |
| Duties and Responsibilities | Specific real-world tasks, decisions, collaboration and responsibilities |
| A Day in the Life | Realistic illustrative workflow, including variations across settings |
| Work Environment and Schedule | Settings, hours, shifts, teams and working conditions |
| Skills, Knowledge, and Personal Qualities | Career-relevant scientific knowledge, interpersonal and technical capabilities |
| Physical and Emotional Demands | Practical occupational challenges and safety, without exaggeration |
| Education and Training | Accurate educational routes, clinical experience, prerequisites and variations |
| Certification and Licensure | Clearly separate credentials from legal requirements; verify jurisdiction |
| Salary, Entry-Level Earnings, and Job Outlook | Verified geography, date, statistic type, occupational grouping and projections; do not invent entry wages |
| Specialties and Career Advancement | Genuine subfields, pathways to advancement and additional study where relevant |
| Benefits and Challenges of the Career | Balanced, concrete advantages and tradeoffs |
| Career Connections and Related Occupations | Meaningful contrasts and relationships, not an arbitrary list |
| Could This Career Interest You? | Reflective, grounded questions tied to actual work rather than an assessment quiz |
| Bibliography & Sources | Clickable authoritative occupation-specific references, dates where relevant |

## Requirements for every approved profile

- Use the `sections` array format `{ id, name, html }`. Section IDs must be unique. Match all fourteen tab names and order in `assets/data/profile-standard.js`.
- Write substantial occupation-specific explanations; avoid generic paragraphs copied between careers. No fixed word count. The sonographer reference article defines quality expectations, not a length quota.
- Verify specific claims before publication, especially salary, outlook, credentials, scope, schooling, and regulatory requirements. Distinguish *median* earnings from genuinely substantiated entry-level figures. Do not substitute a broader labor grouping's statistics without labeling it.
- Attach reliable bibliography links that actually support the relevant claims. A link existing in the last tab is a minimal technical check, not a source-verification result.
- Images must have verified origin and license, meaningful alt text, appropriate captions and attribution. Only include visual material when it explains the career.
- Follow `AGENTS.md` and `PROJECT_DECISIONS.md`: naturally written references, no forced glossary, no assignment-specific instructions, no filler or developer language in student-facing text.
- New articles may remain in draft files while developing, but should **not enter `fullProfiles`** until editorial and factual review is complete. Adding an entry makes it public if merged into main.
- When a section is less relevant to an occupation, explain that occupational reality substantively instead of omitting the section or inventing a credential or specialty.

## Automated gate

Run `node scripts/validate-profiles.mjs` to validate *registered* long-form profiles. It fails on missing or misordered tabs, missing or duplicate section IDs, empty content, incomplete summary facts, missing introduction/tags, registry mismatches, or an absent bibliography link. This is a **structural gate only**: human editorial review and source/link/image verification are still required. A passing result does not approve publication.

## Pilot workflow

1. Restore the six-career pilot drafts on a **new development branch only** (they remain in Git history after reverting PR #7).
2. Use the sonographer profile and this standard to expand each draft into all 14 tabs.
3. Check citations, image licenses, wage definitions, credentials and section quality individually.
4. Preview and test all complete articles, including navigation, favorites, mobile layout and print.
5. Register and merge approved profiles together only after the whole release passes review; do not merge partial drafts.
