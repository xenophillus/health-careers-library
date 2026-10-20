# Project decisions

Record decisions that should remain consistent across new chat sessions and coding agents. These reflect discussions with the project owner; revisit when new evidence or owner direction warrants a change.

## Audience and purpose
- The library is a standalone, free, public career exploration and research resource for high-school students, useful across multiple classes and assignments. Browsing and favorites require no account. Avoid collecting student-identifiable data.
- The five NCHSE health science pathways organize exploration. A particular HOSA competitive event may inform internal completeness checks but does **not** shape the article's voice or appear as meta-commentary.

## Article quality
- Make each profile comprehensive enough for genuine research and summarization, using coherent, accessible prose and credible citations. There is no mandatory article word count.
- Favor details specific to that occupation over general healthcare advice. A sonographer article should address ultrasound work, clinical settings, relevant training and specialties, for instance, rather than an all-purpose “how to select a college program” checklist.
- Preserve consistent navigation and reliable core career categories, but vary content emphasis and visual treatments according to the profession.
- Avoid repetitive “requirements vary” notices, fabricated global wage comparisons, generic disclaimers, and comments explaining how the website or article was developed. Keep important distinctions when substantively needed.
- Distinguish annual medians and wage percentiles from starting salaries, and explain location, year, and education-route details accurately.
- Source the article carefully and retain a readable bibliography; revise stale or unsupported claims rather than padding them with disclaimers.

## Vocabulary
- **Do not require a dedicated Key Vocabulary tab.** The owner rejected glossary padding such as “ultrasound gel” as well as detailed training jargon like “acoustic shadowing” merely to demonstrate technical depth.
- Explain a technical term in natural prose only when it materially helps students understand what the professional does, what makes the career distinct, or how someone enters it.
- Avoid excessive bold definitions, callouts, or teaching interruptions. A glossary or Key Concepts component is optional, not a requirement.

## Imagery and visual presentation
- Use authentic, relevant images (professional work, equipment, clinical outputs, relevant diagrams) when they deepen understanding. Verify permissions/licensing and include appropriate source attribution, captions, and alt text.
- The reusable presentation toolbox includes photo blocks, specialty cards, timelines, comparison panels, salary tables, and other formats. Apply selectively; no section should exist merely because a component is available.
- Balance readable prose with meaningful visuals. Do not overuse cards, clip art, icons, illustrations, or jargon-heavy diagrams.
- Maintain the site's approachable, modern visual style and responsive/print behavior.

## Product and technical architecture
- No student accounts needed for favorites; use browser-local storage for now. Preserve the `hcl-favorites` key and career IDs.
- The source is hosted as a static GitHub Pages site. Keep dependency-free modules and relative asset paths unless a separate change is approved.
- Develop changes on branches and review pull requests before merging. Keep production stable.
- Career self-assessment, saved-list sharing/export, comparison tools, verified events, and curated health news are roadmap items, not features to silently assume already exist.

## Decisions still open
- Exact image-hosting approach and attribution format for larger-scale profile coverage.
- Detailed editorial review/versioning workflow, ongoing data refresh cadence, and eventual hosting/privacy changes.
- Specific implementation details and sequencing of later product features.
