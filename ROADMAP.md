# Health Careers Library roadmap

This is a planning document, not a promise that listed features are implemented. Update status after accepted changes, and review priorities with the project owner before starting major work.

## Completed: functional foundation
- A public static GitHub Pages prototype with an approachable home page, a searchable/filterable directory, 12 initial career records, favorites saved in the current browser, and career profiles.
- A substantially developed Diagnostic Medical Sonographer reference profile.
- Modular extraction into HTML, CSS, JavaScript views/application code, and career-data files; no build step or third-party package dependencies.
- GitHub pull request #1 was merged into `main`. The owner confirmed the live site looked good after the merge.

## Current priority: establish the reference article standard
Refine **Diagnostic Medical Sonographer** into the first exemplary profile before scaling content production.
- Edit for confident, natural, career-specific explanations. Remove duplicated material, excessive qualifications, assignment/rubric commentary, generic checklists, and unnecessary vocabulary-oriented sections.
- Check technical and occupational accuracy, salary dates and geography, education/credential routes, and each bibliography link against authoritative sources.
- Add or improve professionally relevant imagery with verified licenses, captions, alt text, and attribution. Use visual layouts only where they clarify information.
- Preserve detailed reading content, mobile presentation, site behavior, and sensible print formatting.
- Review the final student-facing article editorially before declaring it the template for subsequent careers.

## Next: content and reliability
- Fix documented routing, browser-history, saved-favorite validation, keyboard-focus, bibliography-URL, CSS-selector, and search/skills issues in focused patches (see `README.md`). Test changes.
- Expand authoritative, career-specific profiles across the **five NCHSE health science pathways**. Maintain citations, reviewed dates, images as useful, and career relationships.
- Separate reusable article presentation from individually authored career information without making every profile identical.
- Establish practical research, editorial, and source-update processes appropriate for a public educational resource.

## Planned: exploration tools
- Side-by-side career comparisons, with useful differences in education, job duties, setting, pay, and preparation.
- Improved saved-career experience, including exporting/sharing a shortlist without student accounts.
- Adaptive, explainable interest assessment using career-specific attributes. Potential prompts cover preferred work environments, interaction with people or animals, comfort with clinical situations, education commitment, and professional interests. Recommendations should explain their rationale.

## Future exploration: additional resources
- Curated and verified regional/Kansas health-career experiences and awareness events, including relevant virtual opportunities where appropriate.
- Carefully selected healthcare/science news connected to career exploration, with dependable sources and an appropriate review workflow.
- Consider a general student guide to choosing education programs if genuinely useful; do not pad individual career profiles with generic material.
- Review hosting, privacy, and maintenance options as needs evolve. Hosting migration and GitHub repository privacy changes are deferred unless requested.

## Working approach
For each task: confirm scope and relevant decisions, update a feature branch, test, open a pull request, review it with the owner, then merge only with explicit approval. Update this roadmap when priorities or completion status change.
