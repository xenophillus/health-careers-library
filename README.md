# Health Careers Library

Interactive health career exploration website for students. A static website with no build step or package dependencies, suitable for GitHub Pages project sites.

## Run locally

Serve the repository over HTTP (JavaScript modules require an HTTP server rather than opening `index.html` as a file):

```sh
python3 -m http.server 8000
```

Open the server in a browser. GitHub Pages can serve the files directly; all local asset and module paths are relative. Hash routes such as `#library` and `#profile/sonographer` do not require server rewrites.

## File map

- `index.html`: document shell, header, navigation, and footer.
- `assets/css/styles.css`: existing styles, responsive rules, and print styles in their original cascade order.
- `assets/data/careers.js`: structured career records; keep IDs stable because favorites reference them.
- `assets/data/profile-sections.js`: generic profile section definitions.
- `assets/data/sonographer.js`: rich sonographer sections and bibliography, preserved without editorial changes. HTML strings are trusted, repository-authored content.
- `assets/js/app.js`: application startup, hash routing, rendering, and filter event coordination.
- `assets/js/state.js`: shared view/filter state.
- `assets/js/favorites.js`: browser favorites using the existing `hcl-favorites` localStorage key.
- `assets/js/career-query.js`: search, filtering, and sorting.
- `assets/js/dom.js`: DOM lookup, HTML escaping, and currency formatting.
- `assets/js/views/`: home, directory/results, career card, generic profile, and rich sonographer profile templates.
- `assets/images/`: reserved for future licensed photographs and educational illustrations; no new imagery is included.

The templates retain existing inline event handlers. `app.js` exposes their small, explicit set of entry points on `window` so they continue working with module scope. Data and view functions otherwise use explicit imports. Preserve HTML escaping for plain text; do not insert untrusted HTML into rich sections.

Favorites stay on the same browser origin. Keeping the storage key preserves existing favorites when this refactor is served at the existing site address; local development and different domains have separate storage.

## Regression checks

Serve from a subdirectory as well as the server root to check GitHub Pages relative paths. Check:

1. Home, Explore, Favorites, direct profile hashes for every career, related career links, and browser Back/Forward.
2. Search, pathway selection, education/salary ranges (including crossed bounds), all sort options, reset, and empty results.
3. Add/remove favorites on cards and profiles; reload to verify persistence and the header count. Include an existing `hcl-favorites` value.
4. All 14 rich sonographer sections, bibliography, and print preview; generic profile sections and printing.
5. Desktop/mobile layouts, mobile filters, keyboard navigation, and focus behavior.

External Google Fonts and Wikimedia images retain their original URLs and require network access.

## Existing issues intentionally deferred

This extraction preserves behavior rather than adding unrelated fixes:

- Unknown profile IDs render a directory shell without results because route state remains `profile`.
- Stored favorites are checked for an array but are not deduplicated or checked against career IDs; storage errors are silent.
- Hash/history navigation retains profile section state while button navigation resets it.
- Full application rerenders may lose keyboard focus.
- Rich checklist markup uses `hcl-checkicon`, while its existing CSS targets `checkicon`.
- The sonographer bibliography contains a double-escaped query string; its content is preserved as requested.
- Search covers names, pathways, descriptions, and tags, but not the dedicated skills field.

## Full-map interest explorer

Open `#assessment` for the 25-question, memory-only preference explorer or `#career-map` to browse without answering. The complete `docs/launch-careers.json` inventory contains 192 pathway appearances grouped into 182 exact source titles. Article readiness and production-wave priority never control inclusion. The map includes source labels, specialties, and overlapping titles; it is not 182 confirmed distinct occupations.

Questions cover interests, work style, and comfort. Broad interest connections order pathways; work-setting preferences without verified occupational data become research prompts. Comfort alone never hides careers. Separate optional blood and emergency checkboxes hide only exact titles with source-confirmed routine duties in `assets/data/career-attributes.js`. Unknown and setting-dependent entries stay eligible. Students can restore individual entries, show every entry, reapply filters, change answers, or reset. Comfortable answers do not imply clinical enthusiasm or ability. These editorial mappings are not a validated aptitude instrument. No assessment answers are persisted, uploaded, placed in URLs, or sent to analytics.

Question definitions live in `assets/data/assessment-questions.js`. All 25 questions offer a neutral unsure answer; skipping is neutral and progress counts completed steps including skips. Preference explorer v2.0 versions changed module URLs consistently to avoid reusing the earlier assessment module identity.

`assets/data/career-map.js` is generated with `node scripts/build-career-map.mjs`. Preserve the original titles and all pathway appearances when updating the ledger; do not silently merge aliases or split ambiguous labels. Career details use explicit routes and source links. Only the existing Sonographer article is linked as a local full article; unapproved draft modules remain unregistered. External keyword searches are labeled as searches, not exact occupation mappings. `assets/data/assessment.js` holds brief source-linked introductions, independently of filtering.

Run `node --test scripts/*.test.mjs` and `node scripts/validate-profiles.mjs`. For browser QA only, install `playwright@1.56.1` without adding site dependencies, install its Chromium browser, serve the repository over HTTP, and run:

```sh
ASSESSMENT_BASE_URL=http://127.0.0.1:4173/ node scripts/qa-assessment.mjs
```

If using an existing Chromium, set `CHROMIUM_EXECUTABLE_PATH` to its executable. Browser evidence is written under ignored `qa-results/assessment/`. The test opens every map entry at desktop/mobile widths and covers uncertain answers, explicit source-backed exclusions, individual restoration, applying filters again, backward navigation, keyboard selection, reset, and no answer storage/upload.
