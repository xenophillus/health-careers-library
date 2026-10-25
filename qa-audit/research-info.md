# Independent research / health-information draft audit

Reviewed 2026-10-25 at isolated checkout HEAD `8638950f3c9f0994e5544fb708afbd378d3b52fc`. Nine assigned articles, 135 sections, 96 source records. Parent verified remote before checkout. No existing content, approval flags, workbook, deployed runtime, or remote branch changed. No Gmail used.

## Method and meaning of results

Read all nine articles, their metadata, author QA and source mappings; checked 15 substantive headings, career-specific content, realistic illustrative workflows, credential/clinical-scope distinctions, wage definitions and readable bibliographies. Independently reopened all eight applicable BLS OOH pages and targeted credential authorities. This is an editorial review plus primary-source spot verification, not an assertion that every external link and every sentence was independently re-researched. Image and render review are separate parent workstreams. No profile is publication-approved by this report.

All nine contain substantial occupational prose, usable comparisons and contextual explanations instead of glossary padding. All have Professional Associations and Bibliography. Wage sections correctly label national May 2025 medians, broader occupational groups where applicable, 2025–2035 projections, and the distinction from starting pay. No numeric wage/outlook correction was found in fresh primary-source checks. No invented Kansas wage or blanket clinical-license exemption was found.

## Per-profile results

Paths below are relative to `content/batches/2026-10-25/`; line numbers refer to `article.md` at the audited SHA.

| Profile | Authored/editorial | Source spot-check | Remaining content gate |
|---|---|---|---|
| Biochemist | Pass: all 15 sections; molecular research, experimental uncertainty and clinical-role differences explained | Pass sampled claims: combined biochemist/biophysicist BLS median $127,410, 12% growth, 2,900 annual openings; bachelor versus independent PhD route; ASBMB exam distinguished from clinical permission | No required copy correction identified. Media/render/integration/approval remain separate. |
| Biomedical/Clinical Engineer | Pass: engineering design and hospital technology management both covered, with practical human-factors example | Pass: BLS $109,370, 8%, 1,200; NCEES common licensure route and ACCE education/experience/references plus written/oral CCE process | No required copy correction identified. Grouped title is explicitly explained. Media/render/integration/approval remain. |
| Biomedical/Clinical Technician | Pass for clearly described equipment-service occupation; title mapping is conditional | Pass: repairer-group $61,660, 13%, 8,200; current AAMI full CBET routes, separate candidate status and CABT high-school-junior threshold | **Hold scope acceptance:** article line 13 adopts equipment-service interpretation. `metadata.json` explicitly leaves biotechnology/clinical laboratory meaning unresolved. Confirm source-inventory mapping and whether both pathway appearances are satisfied; retain unresolved appearance rather than treating this as complete coverage. |
| Biostatistician | Pass: study design, missing data, code, uncertainty and collaboration are concrete | Pass: broader statisticians median $105,650; statistician chart 11%; combined mathematician/statistician 10% and 2,000 correctly separated. ASA GStat/PStat framework confirmed | No required copy correction. Optional readability edit at line 64: replace editorial-sounding “those combined openings should not be presented as biostatistician openings” with “Those openings cover both occupations, rather than biostatistics alone.” |
| Cancer Registrar | Pass: casefinding/abstracting clarified, hospital versus central registry distinguished; ODS versus occupational title clear | Pass: combined BLS $68,020, 16%, 3,000; NCRA routes and CTR-to-ODS January 2024 implementation verified | No required copy correction identified. Media/render/integration/approval remain. |
| Medical Information Technologist | Prose passes for health information technologist; exact source-title mapping conditional | Pass sampled combined BLS $68,020, 16%, 3,000 and RHIT HIM-versus-informatics distinction | **Hold scope acceptance:** title line 1 says Medical Information Technologist while body line 9 defines health information technologists. `metadata.json` and `qa.md` explicitly say exact alias unproven. Resolve mapping, or preserve as scoped draft without accepted inventory credit. Section 13 has no source-map entry; original fictional exercise needs author-synthesis labeling in QA metadata, not an invented citation. |
| Medical Records Technician | Pass: record quality, release and coding differentiated; realistic missing-report example | Pass: BLS $51,140, 8%, 14,000; AHIMA RHIT education/reciprocity and CCA diploma required versus recommended coding training confirmed | No factual copy correction. Section 13 has no source-map entry; record its reflective exercise as author synthesis if requiring complete section-to-evidence coverage. |
| Medical Transcriptionist | Pass: speech-recognition editing, uncertain audio and changing labor market explained clearly | Pass: BLS $40,410, −4%, 6,200 replacement-only openings; AHDI CHDS RHDS prerequisite and current-CMT exception confirmed | No required copy correction identified. Media/render/integration/approval remain. |
| Microbiologist | Pass with one small editorial cleanup: research, clinical and public-health work correctly differentiated | Pass: BLS $87,990, 6%, 1,500; ABMM doctoral certification and separate jurisdictional requirements confirmed | Remove internal editorial aside from bibliography line 102: “; older wage examples are not used here.” Retain source description “education and research career routes.” Mirror this deletion in the canonical section source when integrated, not only article.md. Media/render/integration/approval remain. |

## Required claim coverage and evidence limits

All seven other source-record arrays map sections 1–14. Medical Information Technologist and Medical Records Technician map 1–12 and 14, omitting reflective section 13. Their reflection sections do not introduce empirical claims needing invented citations; a clearly recorded author-synthesis disposition closes that bookkeeping gap. This is not a reason to add generic filler.

All nine `article.md` files include draft-review wrapper text and Author QA links in lines 3–5. These are appropriate in a labeled review catalog, but must not be imported into student-facing sections. The separate `sections.json` should be used for publication conversion. The microbiologist bibliography aside is inside student content and therefore merits removal; ordinary source dates and source descriptions should remain.

The documentation still calls the standard 14 tabs while the drafts and actual current work use 15; parent should track that repository documentation conflict separately. This audit follows the explicit 15-section delegated standard.

## Fresh primary-source evidence

Checked 2026-10-25; links are direct authority pages. Pay/outlook paragraphs and tables were checked, not inferred from search snippets.

- [BLS Biochemists and Biophysicists](https://www.bls.gov/ooh/life-physical-and-social-science/biochemists-and-biophysicists.htm): grouped wage, percentiles, outlook and independent-research education.
- [BLS Bioengineers and Biomedical Engineers](https://www.bls.gov/ooh/architecture-and-engineering/biomedical-engineers.htm): wage, percentiles, outlook and degree route.
- [BLS Medical Equipment Repairers](https://www.bls.gov/ooh/installation-maintenance-and-repair/medical-equipment-repairers.htm): wage, percentiles, outlook and associate/certificate/experience routes.
- [BLS Mathematicians and Statisticians](https://www.bls.gov/ooh/math/mathematicians-and-statisticians.htm): statistician wage/percentiles and separate versus combined projections.
- [BLS Health Information Technologists and Medical Registrars](https://www.bls.gov/ooh/healthcare/health-information-technologists-and-medical-registrars.htm): grouped wage and outlook for both relevant drafts.
- [BLS Medical Records Specialists](https://www.bls.gov/ooh/healthcare/medical-records-and-health-information-technicians.htm): wage and outlook.
- [BLS Medical Transcriptionists](https://www.bls.gov/ooh/healthcare/medical-transcriptionists.htm): wage, decline, replacement openings and technology context.
- [BLS Microbiologists](https://www.bls.gov/ooh/life-physical-and-social-science/microbiologists.htm): wage/percentiles, outlook and preparation.
- [AAMI CBET](https://aami.org/certifications/cbet/) and [CABT](https://aami.org/certifications/cabt/): eligibility text directly matches draft distinction.
- [NCEES licensure](https://ncees.org/licensure/) and [ACCE CCE FAQs](https://accenet.org/CECertification/Pages/Faqs.aspx): state-route qualification and certification process. No detailed Kansas rule was asserted or independently approved.
- [NCRA ODS eligibility](https://www.ncra-usa.org/ODS-credential/potential-ODS/eligibility) and [credential transition](https://www.ncra-usa.org/ODSToolkit/Accredited-Education-Program): route structure and January 2024 name transition.
- [AHIMA RHIT](https://www.ahima.org/certification-careers/certifications-overview/rhit/) and [CCA](https://www.ahima.org/certification-careers/certifications-overview/cca/): educational eligibility, reciprocity, recommended versus mandatory preparation.
- [AHDI CHDS](https://ahdionline.org/certified-healthcare-documentation-specialist/): intended audience, RHDS prerequisite and CMT exception.
- [ASM ABMM](https://asm.org/certifications/american-board-of-medical-microbiology-abmm): doctoral laboratory leadership and explicit remaining jurisdictional requirements.
- [ASA accreditation](https://www.amstat.org/your-career/accreditation): GStat/PStat professional framework.

ASBMB exam and CMS CLIA pages were opened, but their full relevant text was not extracted in this spot check; detailed regulatory requirements remain supported by the existing author records, not independently revalidated sentence by sentence here. Neither article attempts detailed state eligibility rules. General workday examples and reflections remain original illustrations, not interviews.

## Disposition

Seven drafts have no unresolved title-mapping gate; Microbiologist additionally needs the small bibliography cleanup above. Two drafts need explicit scope acceptance (Biomedical/Clinical Technician and Medical Information Technologist). All nine still require the parent's image/render/integration gates and release approval; **none is declared publication-ready by this limited audit**. No blocked or uncertain external write exists because no external write was attempted.
