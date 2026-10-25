# Independent clinical-profile editorial and source audit

Reviewed 2026-10-25 against isolated checkout `8638950f3c9f0994e5544fb708afbd378d3b52fc`. Parent verified remote before checkout; this reviewer confirmed local SHA. Read AGENTS.md, PROJECT_DECISIONS.md, README.md and ROADMAP.md. No project `.agents` directory was available. This is a bounded independent copy review and high-value source spot check, not exhaustive recertification of every bibliography link or publication approval.

All nine articles have 15 substantive sections, including Professional Associations and Bibliography. Duties, illustrative workdays, settings, skills, physical/emotional demands, education, credentials, wages, advancement, tradeoffs, related occupations and reflection are career-specific. No generic replacement paragraphs or invented observations were found. Wages distinguish U.S. medians from starting pay; no unsupported Kansas wages are supplied. Association membership is distinguished from credentials and legal authorization. All nine remain unapproved; image/render status belongs to the accompanying media/render audits.

## Per-profile result

| Draft folder | Authored | Independent editorial status | Independent source status | Exact remaining content action |
| --- | --- | --- | --- | --- |
| licensed-practical-nurse | 15/15 | Pass | Spot checks pass: BLS; Kansas nursing definition and initial checklist | No required prose correction found. |
| registered-nurse | 15/15 | Pass | Spot checks pass: BLS; Kansas nursing definition and initial checklist | No required prose correction found. |
| surgical-technologist | 15/15 | Pass | Spot checks pass: BLS and current NBSTSA CST eligibility | No required prose correction found. |
| mri-technologist | 15/15 | Pass | Spot checks pass: BLS, ARRT primary pathway, Kansas MRI exclusion | No required prose correction found. |
| radiologic-technologist | 15/15 | Conditional: mapping unresolved | Spot checks pass for general radiographer interpretation: BLS, ARRT, Kansas law/exemptions | Resolve exact source title “Radiologic Technician” versus general radiographer content before release; do not infer limited-scope technician equivalence. |
| phlebotomist | 15/15 | Pass | Spot checks pass: BLS and ASCP PBT Route 1 | No required prose correction found. |
| physical-therapist | 15/15 | Pass | Spot checks pass: BLS, APTA DPT route, Kansas licensure qualifications | No required prose correction found. |
| occupational-therapist | 15/15 | Pass with minor copy fix | Spot checks pass: BLS, AOTA degree routes, NBCOT eligibility, Kansas qualifications | `article.md:110`: change `Occupational Therapists29-1122.00` to `Occupational Therapists 29-1122.00`; make same replacement in section 15 of `sections.json` when integrating. |
| paramedic | 15/15 | Pass | Spot checks pass: BLS, NREMT education pathway, Kansas scope statute and published certification regulation | No required prose correction found. |

“Pass” is only the named editorial/source gate, not publication readiness. None of these nine is certified publication-ready by this audit because staged image and final integrated rendering gates remain separate.

## Wage/outlook evidence independently read

Every median below is U.S. annual, May 2025; projections are 2025–2035. All match the corresponding article and primary page. Growth percentages for surgical technologists, radiologic technologists and MRI were checked in the individual occupation rows, not inferred from combined headlines.

| Career | Median | Growth | Annual openings and grouping | Official source |
| --- | ---: | ---: | --- | --- |
| LPN/LVN combined | $64,400 | 3% | 51,800, combined LPN/LVN | [BLS](https://www.bls.gov/ooh/healthcare/licensed-practical-and-licensed-vocational-nurses.htm) |
| RN | $97,550 | 6% | 180,800, RN | [BLS](https://www.bls.gov/ooh/healthcare/registered-nurses.htm) |
| Surgical technologist | $64,650 | 5% | 8,600, assistants and technologists combined | [BLS](https://www.bls.gov/ooh/healthcare/surgical-technologists.htm) |
| MRI technologist | $95,480 | 8% | Draft correctly avoids assigning combined openings to MRI | [BLS](https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm) |
| Radiologic technologists/technicians | $80,110 | 5% | Draft labels broader occupational grouping | [BLS](https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm) |
| Phlebotomist | $45,230 | 7% | 18,000 | [BLS](https://www.bls.gov/ooh/healthcare/phlebotomists.htm) |
| Physical therapist | $102,760 | 12% | 13,400 | [BLS](https://www.bls.gov/ooh/healthcare/physical-therapists.htm) |
| Occupational therapist | $100,330 | 15% | 10,000 | [BLS](https://www.bls.gov/ooh/healthcare/occupational-therapists.htm) |
| Paramedic | $60,600 | 6% | 18,200, EMTs and paramedics combined | [BLS](https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm) |

Surgical-technologist percentiles ($45,940 / $96,940) and paramedic percentiles ($44,230 / $84,850) also match BLS; neither draft calls them entry salaries.

## Credential/legal checks and scope limits

- **LPN/RN:** [K.S.A. 65-1113](https://www.kslegislature.gov/b2025_26/laws/065_000_0000_chapter/065_011_0000_article/065_011_0013_section/065_011_0013_k/) supports directed practical nursing and the nursing/medical diagnosis distinction. [KSBN initial checklist](https://ksbn.kansas.gov/initial-application/) supports transcripts, fingerprints/background fee, NCLEX registration and additional multistate eligibility. The articles avoid unsupported universal task permission.
- **Surgical technology:** [NBSTSA CST eligibility](https://www.nbstsa.org/cst-eligibility) expressly supports the CAAHEP/ABHES program requirement. No erroneous first-assistant equivalence found. No Kansas nonlicensure claim is invented. An initial reviewer URL guess `/cst-exam-eligibility` failed; the actual bibliography URL above worked. This is not a broken draft link.
- **MRI/radiography:** [ARRT primary requirements](https://www.arrt.org/pages/earn-arrt-credentials/initial-requirements/primary-requirements) supports the associate-or-higher plus approved-discipline program route and identifies MRI primary/postprimary routes. [K.S.A. 65-7302](https://www.kslegislature.gov/b2025_26/laws/065_000_0000_chapter/065_073_0000_article/065_073_0002_section/065_073_0002_k/) explicitly excludes MRI from this act's definition. [65-7303](https://www.kslegislature.gov/b2025_26/laws/065_000_0000_chapter/065_073_0000_article/065_073_0003_section/065_073_0003_k/) and [65-7304](https://www.kslegislature.gov/b2025_26/laws/065_000_0000_chapter/065_073_0000_article/065_073_0004_section/065_073_0004_k/) support the radiography licensing/exemption qualifications. MRI exclusion is appropriately not expanded into unrestricted task authority.
- **Phlebotomy:** [ASCP PBT](https://www.ascp.org/boc/explore-credentials/view-all-credentials/PBT) Route 1 supports high-school equivalence and a NAACLS-accredited phlebotomy program completed within five years. Draft presents this as one route, not the only route.
- **PT:** [APTA](https://www.apta.org/your-career/careers-in-physical-therapy/becoming-a-pt) supports typical three-year professional DPT, common bachelor prerequisite and combined alternatives. [K.S.A. 65-2906](https://www.kslegislature.gov/b2025_26/laws/065_000_0000_chapter/065_029_0000_article/065_029_0006_section/065_029_0006_k/) supports the stated broad Kansas process.
- **OT:** [AOTA](https://www.aota.org/education/find-a-school) confirms master's and doctoral entry; [NBCOT](https://www.nbcot.org/get-certified/eligibility) confirms ACOTE-accredited U.S. education. [K.S.A. 65-5406](https://www.kslegislature.gov/b2025_26/laws/065_000_0000_chapter/065_054_0000_article/065_054_0006_section/065_054_0006_k/) supports education, supervised fieldwork, exam and fee qualifications.
- **Paramedic:** [NREMT](https://www.nremt.org/Document/Paramedic-Full-Education-Program-Pathway) supports EMT-or-higher and accredited/Letter-of-Review education. [K.S.A. 65-6119](https://www.kslegislature.gov/b2025_26/laws/065_000_0000_chapter/065_061_0000_article/065_061_0019_section/065_061_0019_k/) supports the training, competency and protocol/order limitations. [Published Kansas regulation](https://www.kssos.org/publications/Register/Volume-43/Issues/Issue-42/10-17-24-52587.html) supports EMT/AEMT prerequisite and distinct paramedic cognitive-exam route.

## Coverage and handoff

Source-record counts: LPN 14; RN 13; surgical 12; MRI 12; radiography 12; phlebotomy 8; PT 10; OT 12; paramedic 12. Every factual section 1–12 and association section 14 has a source mapping in each draft. Reflection section 13 is unmapped in LPN, RN, MRI, radiography, PT and OT; this is acceptable original editorial reflection, not an unsupported statistic or assessment claim. Other files explicitly map its editorial synthesis.

Article preambles at lines 3–5 are internal review labels/links. Retain them in review artifacts, but import only the 15 student-facing sections into production. No internal author QA notes were found inside the substantive article bodies.

Remaining source limitations: this review did not reopen every association, duties, safety, task-inventory PDF, renewal rule or secondary bibliography destination. Existing author evidence was inspected and high-risk wage/credential/legal claims were independently sampled as listed above. Detailed regulator application procedures, fees and jurisdiction-wide permissions were not invented or certified.

No canonical Sheet writes, approval changes, runtime changes, branch mutations, merges, deployment, Gmail or external messages. No denied or uncertain mutation. Sole created artifact: this QA report in the isolated checkout.
