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
receipt_path=ROOT/'qa/canonical-write-receipt.json'
applied_profiles=set(read(receipt_path)['profiles']) if receipt_path.exists() else set()
proposals, section_rows, source_rows, report, in_progress = [], [], [], [], []
seen_ids = set()
for folder in sorted((ROOT / 'batches/2026-10-25').iterdir()):
    if not all((folder/name).exists() for name in ('sections.json','source-records.json','qa.md')):
        in_progress.append(folder.name)
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
            proposals.append(dict(workingProfileId=working_id,section=i,operation='already_applied_do_not_repeat; see canonical-write-receipt.json' if working_id in applied_profiles else 'update_content_only_after_live_compare',range=f"'Article Sections'!D{n}",expectedRow=r,expectedContent=expected,proposedContent=s['markdown'],changed=expected!=s['markdown']))
        else:
            proposals.append(dict(workingProfileId=working_id,section=i,operation='append_only_after_live_profile_search',proposedRow=row))
    for s in sources:
        nums=s.get('sections',s.get('sectionNumbers',[]))
        assert nums and all(isinstance(n,int) and 1<=n<=15 for n in nums),(folder,s)
        assert re.match(r'^https://',s['url']),(folder,s)
        for number in nums:
            source_id=working_id+'-'+s['sourceId']+'-R20261025-S'+str(number)
            source_rows.append([source_id,working_id,str(number),s.get('organizationTitle',s.get('title','')),s['url'],s.get('claimSupported',s.get('evidence','')),s.get('publicationDate',''),s.get('verifiedDate',s.get('accessed','2026-10-25')),s.get('verificationStatus',s.get('verification','Research checked; editorial approval pending'))])
    report.append(dict(folder=folder.name,workingProfileId=working_id,sections=15,sourceRecords=len(sources),canonicalSectionsPresent=len(current),canonicalUpdate='applied and readback verified' if working_id in applied_profiles else 'proposed only',wordCount=sum(len(s['markdown'].split()) for s in sections),structuralCheck='pass',sourceCheck='See claim-level records; not automatic approval',mediaCheck='See profile media evidence',independentEditorialReview='pending unless reviewer documented',renderedQA='pending integration; runtime owner',publicationApproval='Not approved'))
assert len({r[0] for r in source_rows})==len(source_rows),'Duplicate proposed source IDs'
for name,rows in [('article-sections.csv',[baseline[0]]+section_rows),('sources.csv',[source_baseline[0]]+source_rows)]:
    with (OUT/name).open('w',newline='') as f: csv.writer(f,lineterminator='\n').writerows(rows)
(OUT/'workbook-change-plan.json').write_text(json.dumps(dict(spreadsheetId='1UrhfwQa8U-Obx-dOX_PyfTt882adIgpm7uG6ysv23UI',status='Five pilot profiles already applied; others proposed. See receipt and per-operation disposition.',sectionProposals=proposals,sourcePolicy='Pilot source IDs already exist: do not append twice. Append other proposed IDs only after live collision check and authorization. Preserve historical records; do not overwrite SPT or SONO rows. Each new source row maps one section. No approval or Media changes included.'),indent=2,ensure_ascii=False)+'\n')
(OUT/'qa-report.json').write_text(json.dumps(dict(profiles=report,authoredProfiles=len(report),inProgressFolders=in_progress,approvedProfiles=0,sourceAppearances=192,exactTitles=182,remainingTitleCountNotRepresentedInBatch=182-len(report),note='Title count is not a distinct-occupation count. Proposed/ambiguous title mappings require review; this is not completed-library coverage.'),indent=2)+'\n')
print(f'Prepared {len(report)} unapproved profiles, {len(section_rows)} sections, {len(source_rows)} section-specific source rows. No remote writes.')
index_lines=['# Readable article review batch','',f'{len(report)} authored drafts; zero publication approvals. Five pilot canonical revisions applied and read back; other canonical dispositions are listed in qa-report.json.','', 'Each article below is browsable on GitHub. Its source records and independent-review file (when present) distinguish factual checks, editorial review, media readiness and remaining publication decisions.','', '| Article | Readable draft | Evidence / independent review |','| --- | --- | --- |']
for item in report:
    folder=ROOT/'batches/2026-10-25'/item['folder']
    sections=read(folder/'sections.json')
    title=next((r[1] for r in read(ROOT/'qa/sheet-snapshot-career-profiles-full.json')['values'][1:] if r[0]==item['workingProfileId']),item['folder'])
    readable=['# '+title,'','**Unapproved editorial review draft.** '+item['canonicalUpdate']+'. Source, image and review evidence are linked below.','', '[Author QA](qa.md) · [Claim-level sources](source-records.json)']
    if (folder/'independent-review.md').exists(): readable[-1]+=' · [Independent review](independent-review.md)'
    for s in sections: readable.extend(['','## '+s['name'],'',s['markdown']])
    (folder/'article.md').write_text('\n'.join(readable)+'\n')
    base='../batches/2026-10-25/'+item['folder']+'/'
    review='[Independent review]('+base+'independent-review.md)' if (folder/'independent-review.md').exists() else 'Independent review pending'
    index_lines.append('| '+title+' | [Read article]('+base+'article.md) | [Sources]('+base+'source-records.json) · '+review+' |')
(OUT/'REVIEW.md').write_text('\n'.join(index_lines)+'\n')
inventory = read(ROOT.parent/'docs/launch-careers.json')['records']
profile_table = read(ROOT/'qa/sheet-snapshot-career-profiles-full.json')['values'][1:]
title_to_id = {r[1]:r[0] for r in profile_table}
prepared_by_id = {r['workingProfileId']:r for r in report}
coverage=[]
for index,source in enumerate(inventory,1):
    working_id=title_to_id.get(source['sourceTitle'])
    prepared=prepared_by_id.get(working_id)
    coverage.append(dict(sourceIndex=index,sourceTitle=source['sourceTitle'],sourcePathway=source['sourcePathway'],sourceKey=source['sourceKey'],workingProfileId=working_id,batchFolder=prepared['folder'] if prepared else None,authoredDraftPresent=bool(prepared),mappingStatus='Proposed exact-title link via canonical Career Profiles; occupation boundary/aliases require separate review' if prepared else 'No prepared batch profile',sectionCheck='15 sections pass' if prepared else 'not checked',sourceCheck='Claim records present; see individual verification limits' if prepared else 'not checked',imageCheck='See per-profile media evidence; not globally cleared' if prepared else 'not checked',editorialCheck='Independent final approval pending',functionalCheck='Pending integration; runtime owner',publicationApproval='Not approved'))
assert len(coverage)==192
(OUT/'coverage.json').write_text(json.dumps(dict(sourceAppearances=192,exactTitles=182,authoredDraftAppearances=sum(r['authoredDraftPresent'] for r in coverage),approvedAppearances=0,records=coverage),indent=2)+'\n')
