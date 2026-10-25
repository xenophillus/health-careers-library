# Five-pilot editorial review update

Target: `development/library-launch-build`, based on `21c842f004055ec9cd0bfae082d70753eb7fe5bb`. This branch is the existing Vercel editorial-review workflow; main/GitHub Pages student production is outside this change. User explicitly approved updating the existing draft review site. No privacy, sharing, authentication, canonical Sheet, or publication-approval change is included.

Selected review outputs are identical to tested repair commit `f241166a82292f421261e6eafe1d99a86f4dbf8f`. Only Athletic Trainer, Dental Assistant, EMT, Medical Assistant and Sterile Processing are included, plus the unchanged existing Sonographer model. The broader 24-profile batch, two unrelated copy fixes, later mapping changes and additional local profiles are excluded.

Five prepared source folders and their evidence support repeatable `node scripts/build-prepared-review.mjs`. It generates repository-proposal review modules, not a fresh Sheet export. Images preserve full frames, contextual captions and credits; both readers retain all15 sections and draft labels in print. Root assets and index are unchanged. The CI path filters now include preview/prepared source and repair scripts so the normal structural gate runs for this PR.

Validation on this exact development-based checkout:

- Draft isolation and registered-profile validation pass.
- Existing converter/validator tests:14/14 pass.
- Chromium:20/20 profile/device/surface cases pass,300 section selections; desktop1365/mobile390,keyboard activation,favorites add/remove,no overflow or browser errors.
- Ten A4 PDFs:all15 headings,draft labels,exact image captions/credits retained.
- Independent read-only review:75 source sections match both generated module copies; all image/input hashes match; exactly5 source folders and manifests; preview-root relative paths valid; original EMT ambulance icon preserved.

No automatic publication approval follows from these checks. The existing manual Sheet sync can replace simple-preview modules; reconcile canonical content and regenerate the integrated preview before running it. Existing short intro excerpts are preserved. Live established-alias status is verified after the ordinary development-branch deployment; this document does not claim a protected browser verification or authorize a temporary share link.

## Consolidated live-review repairs

- Card summaries now stop at a sentence or word boundary and show an ellipsis when shortened. All five integrated profile headers retain the complete overview introduction.
- Adjacent numbered bibliography entries separated by blank lines now form one ordered list. EMT and Medical Assistant no longer restart every reference at 1. Existing source text and links are unchanged; Sterile Processing retains its authored unordered bibliography.
- Article media is deliberately contextual: select **Duties and Responsibilities**, then scroll below the duties prose. Both simple and integrated readers display the verified image, caption, attribution, license link, and applicable no-endorsement notice there. Overview does not show a hero image. Full-article print includes that image and all 15 sections.
- Regression checks cover all five full introductions, readable card boundaries, bibliography list continuity and link preservation. Chromium checks cover desktop/mobile, both readers, all 15 tabs, loaded contextual images and credits, and full PDF output with draft labels.
- Root production assets and index remain unchanged. This is a draft-review repair; no publication approval or canonical Sheet synchronization is implied.
