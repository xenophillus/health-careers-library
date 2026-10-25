"""Prepare reviewable workbook proposals; never performs remote or runtime writes."""
import csv, hashlib, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / 'prepared'
OUT.mkdir(exist_ok=True)
def read(path):
    return json.loads(path.read_text())
snapshot = read(ROOT / 'qa/sheet-snapshot-all-sections.json')
baseline = snapshot['values']
standard = [r[2] for r in baseline[1:16]]
source_baseline = read(ROOT / 'qa/sheet-snapshot-sources.json')['values']
proposals, section_rows, source_rows, report = [], [], [], []
seen_ids = set()
for folder in sorted((ROOT / 'batches/2026-10-25').iterdir()):
    if not (folder/'sections.json').exists():
        continue
    sections = read(folder/'sections.json')
    sources = read(folder/'source-records.json')
    assert isinstance(sections,list) and len(sections)==15, folder
    assert [s['name'] for s in sections]==standard, folder
    assert len({s['id'] for s in sections})==15, folder
    assert all(s.get('markdown','').strip() for s in sections), folder
    profile_ids={s['workingProfileId'] for s in sources}
    assert len(profile_ids)==1, (folder,profile_ids)
    working_id=next(iter(profile_ids))
    assert working_id not in seen_ids, working_id
    seen_ids.add(working_id)
    current=[(i+1,r) for i,r in enumerate(baseline) if r and r[0]==working_id]
    assert len(current) in (0,15), (working_id,len(current))
    for i,s in enumerate(sections,1):
        row=[working_id,str(i),s['name'],s['markdown'],'Fact check','Unapproved proposed content; review evidence in repository batch.']
        section_rows.append(row)
        old=[(n,r) for n,r in current if str(r[1])==str(i)]
        assert len(old)<=1
        if old:
            n,r=old[0]
            assert r[2]==s['name'], (working_id,i)
            expected=r[3] if len(r)>3 else None
            proposals.append(dict(workingProfileId=working_id,section=i,operation='update_content_only_after_live_compare',range=f"'Article Sections'!D{n}",expectedRow=r,expectedContent=expected,proposedContent=s['markdown'],changed=expected!=s['markdown']))
        else:
            proposals.append(dict(workingProfileId=working_id,section=i,operation='append_only_after_live_profile_search',proposedRow=row))
    for s in sources:
        nums=s.get('sections',s.get('sectionNumbers',[]))
        assert nums and all(isinstance(n,int) and 1<=n<=15 for n in nums),(folder,s)
        assert re.match(r'^https://',s['url']),(folder,s)
        for number in nums:
            source_id=working_id+'-'+s['sourceId']+'-R20261025-S'+str(number)
            source_rows.append([source_id,working_id,str(number),s.get('organizationTitle',s.get('title','')),s['url'],s.get('claimSupported',s.get('evidence','')),s.get('publicationDate',''),s.get('verifiedDate',s.get('accessed','2026-10-25')),s.get('verificationStatus',s.get('verification','Research checked; editorial approval pending'))])
    report.append(dict(folder=folder.name,workingProfileId=working_id,sections=15,sourceRecords=len(sources),canonicalSectionsPresent=len(current),wordCount=sum(len(s['markdown'].split()) for s in sections),structuralCheck='pass',sourceCheck='See claim-level records; not automatic approval',mediaCheck='See profile media evidence',independentEditorialReview='pending unless reviewer documented',renderedQA='pending integration; runtime owner',publicationApproval='Not approved'))
assert len({r[0] for r in source_rows})==len(source_rows),'Duplicate proposed source IDs'
for name,rows in [('article-sections.csv',[baseline[0]]+section_rows),('sources.csv',[source_baseline[0]]+source_rows)]:
    with (OUT/name).open('w',newline='') as f: csv.writer(f).writerows(rows)
(OUT/'workbook-change-plan.json').write_text(json.dumps(dict(spreadsheetId='1UrhfwQa8U-Obx-dOX_PyfTt882adIgpm7uG6ysv23UI',status='Proposed only; no remote writes',sectionProposals=proposals,sourcePolicy='Append proposed source IDs only after live collision check. Preserve historical records; do not overwrite SPT or SONO rows. Each new source row maps one section. No approval or Media changes included.'),indent=2,ensure_ascii=False)+'\n')
(OUT/'qa-report.json').write_text(json.dumps(dict(profiles=report,authoredProfiles=len(report),approvedProfiles=0,sourceAppearances=192,exactTitles=182,remainingTitleCountNotRepresentedInBatch=182-len(report),note='Title count is not a distinct-occupation count. Proposed/ambiguous title mappings require review; this is not completed-library coverage.'),indent=2)+'\n')
print(f'Prepared {len(report)} unapproved profiles, {len(section_rows)} sections, {len(source_rows)} section-specific source rows. No remote writes.')
