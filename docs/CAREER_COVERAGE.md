# Full career coverage ledger (NCHSE May 2024)

The May 2024 NCHSE "Health Science Pathways and Sample Career Specialties" chart is our initial baseline. It is explicitly a SAMPLE list, so we may later add careers from other reputable sources.

The complete source listing is preserved in docs/launch-careers.json: 192 pathway entries: Therapeutic Services 54, Diagnostic Services 41, Health Informatics 42, Support Services 21, and Biotechnology Research and Development 34.

First production wave: 60 entries (respectively 22, 14, 10, 7, and 7 by pathway). Accountable deferred backlog: 132 entries (32, 27, 32, 14, 27). Priorities determine work order and never imply a career is less valuable.

Ten exact titles appear in multiple pathway columns, leaving 182 distinct exact titles before reviewing synonyms, specialties, and ambiguities. Preserve every appearance in source data; multiple records may ultimately link to the same approved article.

Check unusual source titles including "Genetic Counselor Histotechnician" (appears compressed in source), "Environmental Services", and "Health Information Services". Do not silently discard or rewrite them. Preserve sourceTitle and sourcePathway while recording normalized career names separately after review.

Each record tracks productionWave, profileStatus, reviewFlags and a future profileId. None of the planning records alone publishes an article.

Measure approved coverage both as source listings served and distinct approved profiles. Keep unapproved entries and the full backlog visible in the tracker. After the first wave, expand through every deferred listing, resolving overlaps transparently, and then consider additional healthcare occupations beyond the NCHSE examples.

Development authors new articles against the agreed 15-tab standard with verified educational, credential, salary and source claims. The existing registered production model still uses 14 tabs; migrating it is a separate reviewed content change. Do not register unfinished articles on the deployed branch. Work on the development branch until comprehensive launch review.
