# Adding a complete career profile

The full-profile system deliberately separates **editorial content** from **presentation**.

- `assets/data/careers.js`: short directory record, ID, pathway, search/filter facts, relationships, and card metadata.
- `assets/data/<career-id>.js`: reviewed article sections for one occupation, exported as an array of `{ id, name, html }`.
- `assets/data/full-profiles.js`: registry of *approved* complete profiles and their introductory facts, sections and display metadata.
- `assets/js/views/full-career-profile.js`: shared rendering, navigation, favorites, related careers, and print markup. Avoid changing this file when adding an occupation.

## Publishing workflow

1. Confirm the career exists in `careers.js` with a **stable, unique ID** and valid related-career IDs. The directory record alone remains an abbreviated sample.
2. Research and write the article with authentic career-specific information, reliable citations, sources, and any licensed, attributed imagery. Explain necessary terminology naturally rather than creating a forced glossary.
3. Store sections in a new file under `assets/data/`, using unique section IDs. This implementation permits trusted, repository-authored HTML in the `html` field to preserve rich diagrams, tables, references and prose; it is **not** safe for untrusted or user-submitted HTML.
4. Add a registry entry keyed by exactly the matching career ID, with `careerId`, `intro`, `tags`, `facts` and `sections`. Include wages with source geography, time period and statistic type.
5. Test direct profile URLs, section navigation, related links, favorites, mobile layout, source links and print output. Confirm that the article contains a bibliography and that key statistics are current and properly sourced.
6. Only then merge the reviewed branch. Drafts must remain out of `fullProfiles` until approved.

No separate website code or HTML template is needed for an additional complete profile. The website will automatically render approved registry entries via the shared renderer. Other, not-yet-reviewed careers continue using the existing brief prototype view.

## Current scope and limitations

This first architecture milestone **does not generate research automatically**, verify factual claims or image licenses, provide an editing dashboard, or publish batches. These require separate workflows and validation. It deliberately migrates *one* existing long-form profile while leaving the rest of the website intact.

For future improvements, consider a stricter typed/content schema with verified URLs, link checks, automated section/reference validation, and a build-time script that can reject unpublished drafts before deployment. Preserve accessible, substantive reading content without imposing identical layouts on different occupations.
