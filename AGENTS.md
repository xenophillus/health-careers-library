# Project instructions for coding agents

Read this file, `ROADMAP.md`, `PROJECT_DECISIONS.md`, and `README.md` before planning changes. Treat the repository as the source of truth for implemented functionality; the roadmap records intentions, not existing features.

## Purpose and audience
Health Careers Library is a free, public, student-facing website for exploring healthcare careers, designed primarily for high-school students. It should work without accounts or collection of student-identifiable information. Content should be useful for independent research, career comparisons, and career exploration across the five health science pathways.

## Editorial standards
- Write trustworthy, substantial, readable, career-specific reference material. Verify factual claims against credible occupational, professional, educational, and regulatory sources, and maintain readable bibliographies and source links.
- Explain what professionals actually do, how workplaces differ, skills, working conditions, education and credentials, compensation, challenges, and opportunities, emphasizing information that distinguishes each career.
- Use natural, confident prose with accurate qualifications where genuinely necessary. Avoid excessive preemptive disclaimers, filler, repeated caveats, research-process notes, assignment-rubric references, and editorial/developer instructions in student-facing articles.
- Do not introduce mandatory vocabulary tabs or jargon lists. Explain essential concepts briefly in context where they advance career understanding; technical training vocabulary belongs in professional education.
- Do not impose artificial word counts or a fixed number of cards. Approved long-form profiles must use the same 14 navigation categories in `docs/PROFILE_CONTENT_STANDARD.md` and `assets/data/profile-standard.js`; adapt the depth, examples and visual presentation inside each category to the profession. Run `node scripts/validate-profiles.mjs` and `node --test scripts/validate-profiles.test.mjs` when editing registered full profiles.
- Label wage figures precisely (e.g., median, percentile, published year and geography); never present lower percentiles as verified starting salaries. Do not fabricate regional pay, licensing, school timelines, or other data.
- An external competition rubric may be used internally as a completeness checklist, but the public resource must remain independent of any one assignment or HOSA event.

## Design and images
- Preserve the existing approachable visual language and responsiveness. Use photographs, illustrations, diagrams, timelines, tables, and cards when each adds educational value; do not decorate merely to fill space.
- Verify image license and provenance before adding assets. Use appropriate captions, credits, useful alt text, and reliable references. Avoid fragile or unverified hotlinks where practical.
- Prioritize clarity, readable typography, keyboard accessibility, and print-friendly career articles.

## Engineering and workflow
- The current site is a dependency-free ES-module static website deployed on GitHub Pages. Keep relative asset paths and hash URLs functional. Do not add dependencies or a build system without a documented reason and approval.
- Maintain stable career IDs, related-career links, and the existing `hcl-favorites` localStorage key. Do not break previously stored favorites.
- Preserve working browsing, search, filters, sorting, navigation, favorites, responsive layout, and printing when changing content or structure.
- Work on a separate branch based on current `main`; produce a focused pull request with a concise change summary and meaningful tests. Do not directly edit `main`, merge, or deploy without the user's explicit approval.
- Verify behavior in a real browser when possible. Explicitly report untested areas, external-service limitations, and content needing review.
- Keep content revisions, functional bug fixes, and infrastructure refactors separate when practicable.
- Never assume the agent can read earlier ChatGPT or Codex conversations. Use these repository files and user-supplied instructions; ask when a decision is missing.
- Propose the next scoped task from the roadmap, but do not automatically implement unrelated future features.
