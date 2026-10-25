"""Prepare this isolated review batch locally. Never contacts or writes Sheets/runtime."""
import csv
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
BATCH = ROOT / 'batches/next-20-2026-10-25'
OUT = ROOT / 'prepared/next-20'
STANDARD = ['Career Overview', 'Duties and Responsibilities', 'A Day in the Life', 'Work Environment and Schedule', 'Skills, Knowledge, and Personal Qualities', 'Physical and Emotional Demands', 'Education and Training', 'Certification and Licensure', 'Salary, Entry-Level Earnings, and Job Outlook', 'Specialties and Career Advancement', 'Benefits and Challenges of the Career', 'Career Connections and Related Occupations', 'Could This Career Interest You?', 'Professional Associations', 'Bibliography & Sources']

def read(path):
    return json.loads(path.read_text())

def write(name, obj):
    (OUT / name).write_text(json.dumps(obj, indent=2, ensure_ascii=False)+'\n')

selection = read(OUT/'selection.json')
selected = {r['sourceKey']: r for r in selection['records']}
reports, section_rows, source_rows = [], [], []
for key, record in selected.items():
    folder = BATCH/key
    required = ['sections.json','article.md','source-records.json','metadata.json','media-evidence.json','qa.md']
    missing = [name for name in required if not (folder/name).exists()]
    if missing:
        reports.append(dict(sourceKey=key,structuralStatus='incomplete',missingFiles=missing))
        continue
    sections = read(folder/'sections.json')
    sources = read(folder/'source-records.json')
    assert [s['name'] for s in sections] == STANDARD, (key, 'ordered headings')
    assert len({s['id'] for s in sections}) == 15, (key, 'section IDs')
    assert all(s['markdown'].strip() for s in sections), key
    working_id = 'hcl-'+key
    metadata = read(folder/'metadata.json')
    assert metadata['workingProfileId'] == working_id, (key, 'metadata ID')
    assert metadata['sourceKey'] == key and metadata['sourceTitle'] == record['sourceTitle'], (key, 'exact title identity')
    assert metadata['sourceIndices'] == [r['sourceIndex'] for r in record['sourceAppearances']], (key, 'source appearances')
    assert all(s['workingProfileId']==working_id for s in sources), (key,'profile ID')
    assert len({s['sourceId'] for s in sources}) == len(sources), (key,'source IDs')
    covered = set()
    for source in sources:
        nums=source.get('sections',source.get('sectionNumbers',[]))
        assert nums and all(isinstance(n,int) and 1<=n<=15 for n in nums), (key,source)
        assert source['url'].startswith('https://'),(key,source['url'])
        covered.update(nums)
        for n in nums:
            source_rows.append([working_id+'-NEXT20-'+source['sourceId']+'-S'+str(n),working_id,str(n),source.get('organizationTitle',source.get('title','')),source['url'],source.get('claimSupported',source.get('evidence','')),source.get('publicationDate',''),source.get('verifiedDate',''),source.get('verificationStatus','See source record')])
    assert set(range(1,15)).issubset(covered), (key, 'missing body section source mapping', sorted(set(range(1,15))-covered))
    for n,section in enumerate(sections,1):
        section_rows.append([working_id,str(n),section['name'],section['markdown'],'Fact check','Unapproved isolated batch proposal; compare live canonical rows and IDs before any integration.'])
    article = '# '+record['sourceTitle']+'\n\n'+'\n\n'.join('## '+s['name']+'\n\n'+s['markdown'] for s in sections)+'\n'
    assert (folder/'article.md').read_text().count('\n## ') == 15, (key,'readable article headings')
    (folder/'article.md').write_text(article)
    reports.append(dict(sourceKey=key,sourceTitle=record['sourceTitle'],workingProfileId=working_id,structuralStatus='pass',sections=15,wordCount=sum(len(s['markdown'].split()) for s in sections),sourceRecords=len(sources),sectionsWithSourceRecords=sorted(covered),sourceStatus='Author records present; independent spot-check in independent-review.json; not exhaustive approval',imageStatus='See media-evidence.json and independent-review.json; not automatically cleared',editorialStatus='Independent spot-check recorded separately; full publication review pending',renderedStatus='Not run; drafts not registered or published',canonicalStatus='No canonical writes; live ID/row comparison required',approvalStatus='No approval granted or changed'))
assert len({r[0] for r in source_rows}) == len(source_rows)
for name,header,rows in [('article-sections.csv',['Working Profile ID','Section Number','Section Title','Content (HTML or Markdown)','Section Status','Reviewer Notes'],section_rows),('sources.csv',['Source ID','Working Profile ID','Section Number','Organization / Title','URL','Claim Supported','Publication Date','Verified Date','Verification Status'],source_rows)]:
    with (OUT/name).open('w',newline='') as f:
        csv.writer(f,lineterminator='\n').writerows([header]+rows)
write('qa-report.json',dict(batch='next-20-2026-10-25',selectedTitles=20,completeDrafts=sum(r['structuralStatus']=='pass' for r in reports),sectionRows=len(section_rows),sourceRows=len(source_rows),publicationReadyCount=0,profiles=reports))
inv=read(ROOT.parent/'docs/launch-careers.json')['records']
coverage=[]
for index,r in enumerate(inv,1):
    report=next((p for p in reports if p['sourceKey']==r['sourceKey']),None)
    coverage.append(dict(sourceIndex=index,sourceKey=r['sourceKey'],sourceTitle=r['sourceTitle'],sourcePathway=r['sourcePathway'],productionWave=r['productionWave'],selectedInBoundedBatch=bool(report),draftComplete=bool(report and report['structuralStatus']=='pass'),scopeNote='Exact source title retained; mapping details in profile metadata. No aliases merged.',approvalChanged=False))
assert len(coverage)==192 and len({r['sourceTitle'] for r in coverage})==182
write('coverage.json',dict(sourceAppearances=192,exactTitles=182,selectedTitles=20,selectedAppearances=sum(r['selectedInBoundedBatch'] for r in coverage),records=coverage))
lines=['# Next batch of 20 — review index','','Unapproved editorial drafts only. No Sheet writes, runtime registration, approval changes, merge or deployment.','',f"{sum(r['structuralStatus']=='pass' for r in reports)} complete 15-section drafts; {len(section_rows)} prepared section rows. Full library remains in scope beyond this batch.",'','Read `qa-report.json`, `independent-review.json`, and each profile’s source/media records separately. Structural completeness is not source, image, editorial, or publication approval.','','| Inventory ID | Exact title | Draft / QA |','| --- | --- | --- |']
for key,r in selected.items():
    path='../../batches/next-20-2026-10-25/'+key+'/'
    lines.append(f"| `{key}` | {r['sourceTitle']} | [Article]({path}article.md) · [Sources]({path}source-records.json) · [QA]({path}qa.md) · [Media]({path}media-evidence.json) |")
(OUT/'REVIEW.md').write_text('\n'.join(lines)+'\n')
print(f'{sum(r["structuralStatus"]=="pass" for r in reports)}/20 complete drafts; {len(section_rows)} sections; {len(source_rows)} source rows. Local preparation only.')
