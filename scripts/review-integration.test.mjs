import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {planReviewIntegration} from './review-integration-policy.mjs';
import {draftProfiles} from '../preview/drafts/manifest.js';

const root=fileURLToPath(new URL('../',import.meta.url));
const obgyn={id:'obgyn',title:'Obstetrician-Gynecologist (OB-GYN)',status:'Draft'};
const emt={id:'emergency-medical-technician',title:'Emergency Medical Technician',status:'Draft'};

test('OB-GYN remains explicitly held without an invented pathway',()=>{
  const [item]=planReviewIntegration([obgyn]);
  assert.equal(item.id,'obgyn');
  assert.equal(item.pathway,null);
  assert.match(item.holdReason,/grouping is undecided/);
  assert.equal(item.draft.status,'Draft');
});
test('existing draft mapping and stable aliases remain unchanged',()=>{
  const [item]=planReviewIntegration([emt]);
  assert.equal(item.id,'emt');
  assert.equal(item.pathway,'Therapeutic Services');
  assert.equal(item.holdReason,null);
});
test('other missing pathways still fail closed',()=>{
  assert.throws(()=>planReviewIntegration([{id:'unknown-specialty'}]),/No pathway for unknown-specialty/);
});
test('invalid pathway and identity still fail',()=>{
  assert.throws(()=>planReviewIntegration([emt],{pathways:{[emt.id]:'Invented'}}),/Invalid pathway/);
  assert.throws(()=>planReviewIntegration([{id:'../obgyn'}]),/Invalid draft identity/);
});
test('duplicate aliases and held IDs still fail',()=>{
  assert.throws(()=>planReviewIntegration([emt,{id:'emt'}]),/Duplicate draft identity emt/);
  assert.throws(()=>planReviewIntegration([obgyn,obgyn]),/Duplicate draft identity obgyn/);
});
test('review holds cannot hide existing careers or override a pathway',()=>{
  assert.throws(()=>planReviewIntegration([obgyn],{careers:[{id:'obgyn'}]}),/conflicts with existing career/);
  assert.throws(()=>planReviewIntegration([obgyn],{pathways:{obgyn:'Therapeutic Services'}}),/conflicts with existing career/);
});

function fixture(t){
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'hcl-review-integration-'));
  t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
  for(const name of ['scripts','assets'])fs.cpSync(path.join(root,name),path.join(dir,name),{recursive:true});
  fs.mkdirSync(path.join(dir,'preview/drafts'),{recursive:true});
  for(const name of ['index.html','styles.css'])fs.copyFileSync(path.join(root,'preview',name),path.join(dir,'preview',name));
  fs.copyFileSync(path.join(root,'index.html'),path.join(dir,'index.html'));
  fs.cpSync(path.join(root,'preview/drafts'),path.join(dir,'preview/drafts'),{recursive:true});
  const baselineDrafts=planReviewIntegration(draftProfiles).filter(item=>!item.holdReason).map(item=>item.draft);
  fs.writeFileSync(path.join(dir,'preview/drafts/manifest.js'),'export const draftProfiles = '+JSON.stringify(baselineDrafts)+';\n');
  return dir;
}
function run(dir,script){return spawnSync(process.execPath,[path.join(dir,'scripts',script)],{cwd:dir,encoding:'utf8'});}
function addDraft(dir,id='obgyn',sections=null){
  const manifest=path.join(dir,'preview/drafts/manifest.js');
  fs.appendFileSync(manifest,'\ndraftProfiles.push('+JSON.stringify({...obgyn,id})+');\n');
  const text=sections??fs.readFileSync(path.join(dir,'preview/drafts/athletic-trainer.js'),'utf8').replaceAll('athletic-trainer-section-','obgyn-section-');
  for(const destination of ['preview/drafts','assets/data/drafts'])fs.writeFileSync(path.join(dir,destination,id+'.js'),text);
}

test('build and audit preserve the pilot, original inventory, and all standalone draft QA',t=>{
  const dir=fixture(t);
  const originals=['assets/data/careers.js','assets/data/full-profiles.js','assets/data/career-integrity.js','index.html'].map(name=>[name,fs.readFileSync(path.join(dir,name))]);
  let result=run(dir,'build-review-library.mjs');
  assert.equal(result.status,0,result.stderr);
  const baseline=['careers.js','full-profiles.js'].map(name=>[name,fs.readFileSync(path.join(dir,'preview/assets/data',name))]);
  addDraft(dir);
  result=run(dir,'build-review-library.mjs');
  assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/REVIEW HOLD obgyn/);
  for(const [name,bytes] of originals)assert.deepEqual(fs.readFileSync(path.join(dir,name)),bytes,name);
  for(const [name,bytes] of baseline)assert.deepEqual(fs.readFileSync(path.join(dir,'preview/assets/data',name)),bytes,name);
  const deferred=JSON.parse(fs.readFileSync(path.join(dir,'qa-results/deferred-review-drafts.json')));
  assert.equal(deferred.length,1);
  assert.equal(deferred[0].id,'obgyn');
  assert.equal(deferred[0].status,'Draft');
  assert.equal(deferred[0].sections,15);
  result=run(dir,'audit-career-integration.mjs');
  assert.equal(result.status,0,result.stdout+result.stderr);
  const audit=JSON.parse(fs.readFileSync(path.join(dir,'qa-results/career-integration.json')));
  assert.ok(audit.findings.some(f=>f.code==='integration-deferred'&&f.severity==='review'));
  assert.equal(audit.actions.find(a=>a.draft==='obgyn').pathway,null);
  assert.equal(audit.actions.find(a=>a.draft==='obgyn').mode,'standalone-review-only');
  result=run(dir,'qa-editorial-drafts.mjs');
  assert.equal(result.status,0,result.stdout+result.stderr);
  const qa=JSON.parse(fs.readFileSync(path.join(dir,'qa-results/editorial-qa.json')));
  assert.equal(qa.results.length,6);
  assert.equal(qa.results.find(p=>p.id==='obgyn').sections,15);
  assert.equal(run(dir,'check-draft-isolation.mjs').status,0);
});
test('held drafts do not bypass required section validation',t=>{
  const dir=fixture(t);
  addDraft(dir,'obgyn','export const sections = [];\n');
  const result=run(dir,'build-review-library.mjs');
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/Missing sections for obgyn/);
});
test('unexpected new draft still blocks the build before output is created',t=>{
  const dir=fixture(t);
  addDraft(dir,'unknown-specialty');
  const result=run(dir,'build-review-library.mjs');
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/No pathway for unknown-specialty/);
  assert.equal(fs.existsSync(path.join(dir,'preview/assets')),false);
  const auditResult=run(dir,'audit-career-integration.mjs');
  assert.notEqual(auditResult.status,0);
  const audit=JSON.parse(fs.readFileSync(path.join(dir,'qa-results/career-integration.json')));
  assert.ok(audit.findings.some(f=>f.severity==='error'&&f.detail.includes('unknown-specialty')));
  assert.ok(fs.existsSync(path.join(dir,'qa-results/career-integration.md')));
});

test('audit reports duplicate held draft IDs without silently accepting them',t=>{
  const dir=fixture(t);
  addDraft(dir);
  addDraft(dir);
  const result=run(dir,'audit-career-integration.mjs');
  assert.notEqual(result.status,0);
  const audit=JSON.parse(fs.readFileSync(path.join(dir,'qa-results/career-integration.json')));
  assert.ok(audit.findings.some(f=>f.code==='draft-collision'&&f.severity==='error'&&f.detail==='obgyn'));
});
