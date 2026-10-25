# Google Sheets → career article conversion (development)

The editorial workbook is the content source. The importer lives at `scripts/import-profile.mjs` and has **no npm dependencies**.

## Import a profile

1. In the Google Sheets workbook, select the **Article Sections** tab and use File → Download → Comma-separated values (.csv). The export must contain the header row and all 14 rows for the desired career. Save the CSV locally (do not commit it).
2. From the repository root, run:

```sh
node scripts/import-profile.mjs path/to/sections.csv hcl-centralserviceorsterileprocessingtechnician sterile-processing-technician assets/data/drafts/sterile-processing-technician.js
node --test scripts/import-profile.test.mjs
```

3. Inspect all 14 generated sections for formatting, links, and completeness. The exporter accepts Markdown in the content column and creates trusted escaped HTML. HTML stored in the spreadsheet is intentionally **escaped**, rather than executed. The original sonographer article contains existing HTML, which requires a separate migration/conversion strategy to preserve rich diagrams and tables.
4. The generated draft is **not registered** in `assets/data/full-profiles.js`. Preview the generated output through `preview/sterile-processing.html`, served from the repository root using `python3 -m http.server 8000` and opened at `http://localhost:8000/preview/sterile-processing.html`. The preview renders every tab using the site's CSS, without linking or registering the career in the public directory. This file is for local/staging inspection only; do not merge or deploy the development branch until the complete library is approved.
5. Before approving publication, confirm factual claims, source URLs, images and licenses, descriptions, salary dates, credential pathways, accessibility and browser presentation. Passing the importer and structural tests alone is insufficient.

## What is covered

- Reads real CSV quoting including multiline article cells.
- Selects a profile by the workbook's **Working Profile ID**, separate from the website's stable ID.
- Requires exactly 14 sections with official names in order and nonempty content.
- Converts paragraphs, basic bold/italic, Markdown links, and simple numbered/bulleted lists.
- Escapes raw HTML to prevent spreadsheet content becoming executable HTML.
- Writes a JavaScript module whose `sections` structure matches the reusable profile renderer.

## Current limitations

- The importer requires a manually downloaded CSV; it does not access the authenticated Google Sheets API automatically.
- It does not yet convert embedded images, tables, nested list formatting, or complex HTML. These require subsequent work.
- It does not verify bibliography targets, image licensing, occupational claims, or publication approval. It never modifies `main` or automatically deploys.
- `assets/data/drafts/sterile-processing-technician.js` is the first converted **development-only** artifact. It remains outside the reviewed profile registry.


## Authenticated Google Sheets synchronization (development)

The new `scripts/sync-sheet-drafts.mjs` supports a **read-only Google service account**. It reads Career Profiles and Article Sections from the existing workbook, validates complete 14-section records, and refreshes JavaScript draft files under `assets/data/drafts/`. It deliberately **does not** modify the production registry or deploy the site.

**The GitHub Actions workflow is currently manual-only and is not activated** until credentials are provisioned. To activate it safely:

1. In a Google Cloud project, enable Google Sheets API; create a dedicated service account with no general Drive editing permissions.
2. Share the editorial spreadsheet with the service account's `client_email` as a **Viewer**, not an Editor. Keep the workbook private otherwise.
3. Store the service account JSON in a GitHub Actions repository secret called `GOOGLE_SERVICE_ACCOUNT_JSON`. Never place the key in Sheets cells, files or commits.
4. Invoke **Sync editorial spreadsheet drafts** using GitHub Actions on the `development/library-launch-build` branch. After verifying an initial manual run, an appropriate schedule may be added.
5. The service account token grants only `spreadsheets.readonly` scope. GitHub's `contents: write` permission is scoped to committing draft files on the development branch.

**Limitations:** This is a prepared authenticated automation, not a running connection. Credentials have not been set by this process. Full automation and synchronization have not been verified end-to-end. Sonographer HTML requires a richer converter and remains handled separately. Published profiles require explicit approval.

## Official editorial workbook

The current source workbook is the **personally owned** Google Sheet: https://docs.google.com/spreadsheets/d/1UrhfwQa8U-Obx-dOX_PyfTt882adIgpm7uG6ysv23UI/edit . The previous school-owned workbook is preserved as a historical backup and must not be used by new import runs. The Google Drive connection in ChatGPT can access and read the personal workbook; the separate GitHub Actions credential (`GOOGLE_SERVICE_ACCOUNT_JSON`) still requires configuration and a successful synchronization run before GitHub can read it unattended.
