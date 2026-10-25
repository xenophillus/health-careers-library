# Independent evidence spot-check

Review date: 2026-10-25. Reviewer: independent research agent, separate from the five batch authors. This is a sample audit of evidence and a structural review, not a claim that every source relationship has received two independent reviews.

## Method

Read the existing assessment schema and new batch JSON, opened primary source pages independently, and compared proposed claims to occupational duties rather than inferring traits from titles, pathway membership, work-style scores, or training requirements. Checked exclusion-sensitive relationships first, then positive soft-interest cues across all five pathways. A source describing a broader family cannot establish routine exposure for every specialty. No absence-of-exposure claims were inferred.

## Integration findings

- Existing `rankCareers` uses truthiness for `interestMatches`. Explicit unknown objects belong in the review ledger, not the compatible sparse export. The integration script already follows this rule.
- Pair questions (`help`, `team`, `pace`, `variety`, `focus`, `location`) need an explicit semantic direction before scoring. Presence alone does not distinguish directly helping from behind-the-scenes work or movement from workstation work. Integrator changed paired questions to context-only.
- Laboratory specimen analysis does not establish seeing open wounds. Teaching self-care techniques does not establish routinely performing bathing care. Emergency care, fast pace, blood, and wounds must remain separate.
- Generic labels such as Research Scientist and combined labels such as Genetic Counselor Histotechnician must not inherit an arbitrary exact occupation mapping.

## Independently checked relationships

| Title / claim | Primary source checked | Finding |
|---|---|---|
| Phlebotomist / blood | [BLS duties](https://www.bls.gov/ooh/healthcare/phlebotomists.htm) | Drawing blood is an explicit typical duty; regular exposure supported. |
| EMT / emergencies | [BLS duties](https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm) | Emergency care and responding to medical-assistance calls are explicit duties. |
| Paramedic / emergencies | [BLS duties](https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm) | Emergency-care description explicitly covers paramedics. |
| Clinical-laboratory family / blood | [BLS duties](https://www.bls.gov/ooh/healthcare/clinical-laboratory-technologists-and-technicians.htm) | Source includes several specimens and specialties; broad labels should remain setting-dependent. |
| Bioinformatics Scientist / patterns | [O*NET tasks 19-1029.01](https://www.onetonline.org/link/summary/19-1029.01) | Molecular-dataset analysis directly supports a soft data-pattern cue. |
| Bioinformatics Scientist / digital | [O*NET tasks 19-1029.01](https://www.onetonline.org/link/summary/19-1029.01) | Testing new and updated software is directly listed. |
| Biostatistician / patterns | [O*NET tasks 15-2041.01](https://www.onetonline.org/link/summary/15-2041.01) | Statistical analysis of clinical or survey data directly supports cue. |
| Biostatistician / digital | [O*NET tasks 15-2041.01](https://www.onetonline.org/link/summary/15-2041.01) | Writing analysis code is directly listed. |
| Microbiologist / experiment | [BLS duties](https://www.bls.gov/ooh/life-physical-and-social-science/microbiologists.htm) | Laboratory experiments are explicit typical duties. |
| Microbiologist / explain | [BLS duties](https://www.bls.gov/ooh/life-physical-and-social-science/microbiologists.htm) | Presenting research findings supports a communication interest cue. |

| Athletic Trainer / emergencies | [BLS duties](https://www.bls.gov/ooh/healthcare/athletic-trainers.htm) | First aid/emergency care explicitly listed among typical duties. |
| CNA / personalCare | [BLS nursing-assistant duties](https://www.bls.gov/ooh/healthcare/nursing-assistants.htm) | Bathing, toileting and dressing explicitly typical. |
| CNA / physicalAssistance | [BLS nursing-assistant duties](https://www.bls.gov/ooh/healthcare/nursing-assistants.htm) | Turning, repositioning and transferring explicitly typical. |
| CNA / listen | [BLS nursing-assistant duties](https://www.bls.gov/ooh/healthcare/nursing-assistants.htm) | Listening to and reporting patient concerns directly listed. |
| Pharmacist / details | [BLS duties](https://www.bls.gov/ooh/healthcare/pharmacists.htm) | Prescription accuracy and medication interactions directly described. |
| Pharmacist / explain | [BLS duties](https://www.bls.gov/ooh/healthcare/pharmacists.htm) | Instruction on medicine use/storage/side effects directly listed. |
| EMT / physicalAssistance | [BLS injuries and illnesses](https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm) | Lifting while caring for and moving patients is explicit. |
| Paramedic / physicalAssistance | [BLS injuries and illnesses](https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm) | Same sentence explicitly covers paramedics. |
| Home Health Aide / physicalAssistance | [BLS work environment](https://www.bls.gov/ooh/healthcare/home-health-aides-and-personal-care-aides.htm) | Often helping clients from bed or with standing/walking is explicit. |
| Home Health Aide / personalCare | [BLS duties](https://www.bls.gov/ooh/healthcare/home-health-aides-and-personal-care-aides.htm) | Bathing/dressing assistance is listed as typical. |
| Personal Care Aide / physicalAssistance | [BLS work environment](https://www.bls.gov/ooh/healthcare/home-health-aides-and-personal-care-aides.htm) | Explicitly covered in the shared statement; no medical interventions imported from home health aides. |
| Personal Care Aide / personalCare | [BLS duties](https://www.bls.gov/ooh/healthcare/home-health-aides-and-personal-care-aides.htm) | Shared duties expressly include bathing/dressing. |
| LPN / personalCare | [BLS duties](https://www.bls.gov/ooh/healthcare/licensed-practical-and-licensed-vocational-nurses.htm) | Bathing/dressing is typical; source separately notes setting variation. |
| Physical Therapist / physicalAssistance | [BLS work environment](https://www.bls.gov/ooh/healthcare/physical-therapists.htm) | Often lifting/moving patients is explicit. |
| Physical Therapy Assistant / physicalAssistance | [BLS work environment](https://www.bls.gov/ooh/healthcare/physical-therapist-assistants-and-aides.htm) | Often lifting/moving patients explicitly applies to assistants and aides; do not rely only on exercise coaching. |
| Surgical Technologist / physicalAssistance | [BLS duties](https://www.bls.gov/ooh/healthcare/surgical-technologists.htm) | Positioning patients on the operating table expressly described. |
| Surgical Technologist / wounds | [BLS duties](https://www.bls.gov/ooh/healthcare/surgical-technologists.htm) | Seeing surgical incisions is a bounded inference from assisting operations and incision dressing; no traumatic-wound-treatment claim. |
| Diagnostic Medical Sonographer / explain | [BLS communication section](https://www.bls.gov/ooh/healthcare/diagnostic-medical-sonographers.htm) | Explaining procedures directly supports soft cue. |
| Diagnostic Medical Sonographer / details | [BLS detail-oriented section](https://www.bls.gov/ooh/healthcare/diagnostic-medical-sonographers.htm) | Inspecting images for subtle differences directly supports soft cue; no aptitude threshold. |
| Phlebotomist / explain | [BLS duties](https://www.bls.gov/ooh/healthcare/phlebotomists.htm) | Explaining collection to reassure patients directly listed. |
| Clinical Coder / details | [BLS medical-coder paragraph](https://www.bls.gov/ooh/healthcare/medical-records-and-health-information-technicians.htm) | Reviewing patient information for accurate coding directly supported. |
| Clinical Coder / organize | [BLS medical-coder paragraph](https://www.bls.gov/ooh/healthcare/medical-records-and-health-information-technicians.htm) | Classifying diagnosis/procedure information is supported. |
| Epidemiologist / patterns | [BLS duties](https://www.bls.gov/ooh/life-physical-and-social-science/epidemiologists.htm) | Population-data analysis and disease-pattern investigation explicitly described. |
| Epidemiologist / explain | [BLS duties](https://www.bls.gov/ooh/life-physical-and-social-science/epidemiologists.htm) | Communicating findings to public and professionals expressly listed. |
| Medical Records Technician / details | [O*NET 29-2072.00](https://www.onetonline.org/link/summary/29-2072.00) | Reported alias explicitly listed; completeness/accuracy review is a task. |
| Community Health Worker / explain | [BLS duties](https://www.bls.gov/ooh/community-and-social-service/community-health-workers.htm) | Coaching and sharing information expressly supported. |
| Community Health Worker / listen | [BLS duties](https://www.bls.gov/ooh/community-and-social-service/community-health-workers.htm) | Discussing health concerns/barriers supports listening cue. |
| Sterile Processing Technician / details | [O*NET 31-9093.00](https://www.onetonline.org/link/summary/31-9093.00) | Reported titles support alias; equipment and supply inspection explicitly listed. |
| Sterile Processing Technician / organize | [O*NET 31-9093.00](https://www.onetonline.org/link/summary/31-9093.00) | Trays and sterilizer records expressly listed. |
| Central Service Manager / plan | [HSPA CHL description](https://myhspa.org/certification/certification-overview/certified-healthcare-leader-chl/) | Sterile-processing leadership description directly includes staffing/operations; credential not treated as mandatory. |
| Patient Navigator / explain | [NCI definition](https://www.cancer.gov/publications/dictionaries/cancer-terms/def/patient-navigator) | Helping patient-provider communication is explicit; definition uses cancer as example. |

| Trial Monitor / details and organize | [ACRP CRA career description](https://acrpnet.org/2024/08/15/insights-into-the-clinical-research-associate-career-pathway) | Opening occupational description explicitly supports verification/documentation and identifies monitor role; no claim imported from survey percentages. |
| Toxicologist / evidence and patterns | [ACS toxicology duties](https://www.acs.org/careers/chemical-sciences/fields/toxicology.html) | Risk analysis and integrating datasets for patterns explicitly listed; experiment remains setting-dependent because senior roles may interpret others' work. |

## Result and limits

All 17 proposed hard-exclusion-eligible relationships in the first integrated ledger were independently checked. The primary evidence supports typical occupational duties, not universal exposure in every workplace. PTA positioning needed a clearer evidence note; the source expressly says assistants often lift and move patients. Surgical-technologist wounds is a limited inference about seeing surgical incisions from assisting operations, retractors/organs, and incision dressings; it must not imply treating traumatic wounds. These clarifications were sent to the author and integrator.

PET digital was removed after review: creating 3D images does not itself establish the current question's interest in learning new digital tools. Other digital-operation-only cues should remain contextual unless runtime wording is aligned or direct evidence of new-tool use is supplied. Aggregate/group soft cues must display their scope and must never become exclusions. The integrator reports broader-group claims are downgraded to setting-dependent with scoped soft-use metadata.

The sample includes more than 15 relationships, all proposed hard exclusions, and at least two positive soft cues in each pathway. This is not a complete second review of every attribute. No runtime, article, or Sheet changes were made by this reviewer.

