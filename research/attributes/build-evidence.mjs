import fs from 'node:fs';
import {careerMap} from '../../assets/data/career-map.js';
import {questions} from '../../assets/data/assessment-questions.js';
const root = new URL('./', import.meta.url);
const keys = questions.map(q => q.attribute || q.id);
const comfort = new Set(['blood','wounds','emergencies','physicalAssistance','personalCare']);
const paired=new Set(['help','team','pace','variety','focus','location']);
const batches=['therapeutic','diagnostic','informatics','support','biotech'];
const raw=batches.flatMap(batch=>JSON.parse(fs.readFileSync(new URL(`batches/${batch}-evidence.json`,root))).map(r=>({...r,batch})));
if(raw.length!==182 || new Set(raw.map(r=>r.id)).size!==182)throw new Error('Expected 182 unique reviewed titles');
const byId=new Map(raw.map(r=>[r.id,r]));
const compatible={};
const records=careerMap.map(c=>{
 const r=byId.get(c.id); if(!r || r.title!==c.title)throw new Error(`Missing/mismatched ${c.id}`);
 const attributes=Object.fromEntries(keys.map(key=>[key,{status:'unknown',confidence:'unknown',reviewedAt:'2026-10-25',label:questions.find(q=>(q.attribute||q.id)===key)?.attributeLabel||key,explanation:'This review did not establish a sufficiently specific source-backed relationship for this preference. Unknown does not mean absent.',source:null,evidenceNote:'No verified mapping accepted for this attribute.',scope:'unresolved',hardExclusionEligible:false,scoringUse:'none'}]));
 for(const [key,input] of Object.entries(r.attributes)){
  if(!keys.includes(key))throw new Error(`Invalid key ${key} in ${r.id}`);
  const e={...input};
  if(e.status==='unknown')continue;
  if(!e.source?.startsWith('https://') || !e.explanation || !e.evidenceNote || !e.confidence || !e.scope)throw new Error(`Incomplete evidence ${r.id}/${key}`);
  const exact=['exact','alias'].includes(r.mapping.status);
  // Group-level and ambiguous mappings never produce mandatory career exposure.
  if(!exact)e.status='setting-dependent';
  e.hardExclusionEligible=comfort.has(key)&&exact&&e.confidence==='high'&&['core','regular'].includes(e.status);
  if(comfort.has(key)&&!e.hardExclusionEligible&&['core','regular'].includes(e.status))e.status='setting-dependent';
  e.scoringUse=(paired.has(key)||key==='digital')?'context-only':comfort.has(key)?(e.hardExclusionEligible?'optional-avoidance':'context-only'):(['core','regular'].includes(e.status)&&exact?'soft-interest':r.mapping.status==='broader-group'&&['core','regular'].includes(input.status)?'soft-interest-scoped':'context-only');
  attributes[key]=e;
  // Deliberately omit unknowns: the released runtime tests truthiness for interest matches.
  // Context-only workstyle/group evidence stays in the ledger pending qualified UI support.
  if(comfort.has(key)||['soft-interest','soft-interest-scoped'].includes(e.scoringUse)){
   compatible[c.id]??={}; compatible[c.id][key]=e;
  }
 }
 return {...c,mapping:r.mapping,reviewBatch:r.batch,reviewedAt:'2026-10-25',attributes};
});
const counts={inventoryAppearances:records.reduce((n,r)=>n+r.appearances.length,0),exactSourceTitles:records.length,crossPathwayDuplicateTitles:records.filter(r=>r.pathways.length>1).length,reviewedEntries:records.length,attributesPerEntry:keys.length,verifiedAttributeRelationships:0,settingDependentRelationships:0,unknownAttributeRelationships:0,entriesWithVerifiedAttributes:0,entriesWithAnySourcedEvidence:0,hardExclusionEligibleRelationships:0,scopedSoftInterestRelationships:0,byPathway:{}};
for(const r of records){const a=Object.values(r.attributes);counts.verifiedAttributeRelationships+=a.filter(e=>['core','regular'].includes(e.status)).length;counts.settingDependentRelationships+=a.filter(e=>e.status==='setting-dependent').length;counts.unknownAttributeRelationships+=a.filter(e=>e.status==='unknown').length;counts.entriesWithVerifiedAttributes+=a.some(e=>['core','regular'].includes(e.status))?1:0;counts.entriesWithAnySourcedEvidence+=a.some(e=>e.status!=='unknown')?1:0;counts.scopedSoftInterestRelationships+=a.filter(e=>e.scoringUse==='soft-interest-scoped').length;counts.hardExclusionEligibleRelationships+=a.filter(e=>e.hardExclusionEligible).length;}
for(const p of [...new Set(records.flatMap(r=>r.pathways))]){const rs=records.filter(r=>r.pathways.includes(p));counts.byPathway[p]={appearances:rs.length,entriesWithVerifiedAttributes:rs.filter(r=>Object.values(r.attributes).some(e=>['core','regular'].includes(e.status))).length,entriesWithAnySourcedEvidence:rs.filter(r=>Object.values(r.attributes).some(e=>e.status!=='unknown')).length};}
fs.writeFileSync(new URL('career-evidence.json',root),JSON.stringify({schemaVersion:1,reviewedAt:'2026-10-25',baseCommit:'72e96ae8a0a6e5502ce45943033e1f3247e56d6a',attributeKeys:keys,counts,records},null,2)+'\n');
fs.writeFileSync(new URL('career-attributes.js',root),'// Candidate data export; not imported by the live application. See README.md.\n// Unknown is never absence. Soft cues are preferences, not aptitude.\nexport const careerAttributes = '+JSON.stringify(compatible,null,2)+';\n');
fs.writeFileSync(new URL('coverage.json',root),JSON.stringify(counts,null,2)+'\n');
console.log(JSON.stringify(counts,null,2));
const sourceIndex={};
for(const r of records)for(const [attribute,e] of Object.entries(r.attributes))if(e.source){sourceIndex[e.source]??=[];sourceIndex[e.source].push({id:r.id,attribute,status:e.status,scoringUse:e.scoringUse});}
fs.writeFileSync(new URL('source-index.json',root),JSON.stringify(sourceIndex,null,2)+'\n');
const clean=s=>String(s??'').replace(/[\t\n\r]+/g,' ');
const rows=[['Title','ID','Pathways','Mapping','Core/regular attributes','Setting-dependent attributes','Unknown attribute count','Mapping note']];
for(const r of records)rows.push([r.title,r.id,r.pathways.join(' | '),r.mapping.status,Object.entries(r.attributes).filter(([,e])=>['core','regular'].includes(e.status)).map(([k])=>k).join(', '),Object.entries(r.attributes).filter(([,e])=>e.status==='setting-dependent').map(([k])=>k).join(', '),Object.values(r.attributes).filter(e=>e.status==='unknown').length,r.mapping.note]);
fs.writeFileSync(new URL('mapping-review.tsv',root),rows.map(r=>r.map(clean).join('\t')).join('\n')+'\n');
