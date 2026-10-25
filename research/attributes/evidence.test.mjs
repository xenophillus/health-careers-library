import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {careerAttributes} from './career-attributes.js';
import {careerMap} from '../../assets/data/career-map.js';
const ledger=JSON.parse(fs.readFileSync(new URL('./career-evidence.json',import.meta.url)));
const comfort=['blood','wounds','emergencies','physicalAssistance','personalCare'];
test('inventory preserves all titles, appearances and duplicate pathways',()=>{
 assert.equal(ledger.records.length,182);
 assert.deepEqual(ledger.records.map(({id,title,pathways,appearances})=>({id,title,pathways,appearances})),careerMap.map(({id,title,pathways,appearances})=>({id,title,pathways,appearances})));
 assert.equal(ledger.records.flatMap(r=>r.appearances).length,192);
 assert.equal(ledger.records.filter(r=>r.pathways.length===2).length,10);
});
test('every entry has 25 explicit, independently evaluated preference states',()=>{
 assert.equal(ledger.attributeKeys.length,25);
 for(const r of ledger.records){assert.deepEqual(Object.keys(r.attributes),ledger.attributeKeys);assert.ok(r.mapping.status);for(const e of Object.values(r.attributes)){assert.ok(['core','regular','setting-dependent','unknown'].includes(e.status));assert.equal(e.reviewedAt,'2026-10-25');assert.ok(e.explanation);if(e.status!=='unknown'){assert.match(e.source,/^https:\/\//);assert.ok(e.evidenceNote);assert.ok(e.scope);assert.ok(['high','moderate'].includes(e.confidence));}else{assert.equal(e.hardExclusionEligible,false);assert.equal(e.scoringUse,'none');}}}
});
test('hard rules require exact/alias mapping, high confidence and core/regular distinct duty',()=>{
 for(const r of ledger.records)for(const [key,e] of Object.entries(r.attributes)){
 if(e.hardExclusionEligible){assert.ok(comfort.includes(key));assert.ok(['exact','alias'].includes(r.mapping.status));assert.equal(e.confidence,'high');assert.ok(['core','regular'].includes(e.status));}
 if(['broader-group','ambiguous','unresolved'].includes(r.mapping.status))assert.ok(['unknown','setting-dependent'].includes(e.status));
 }
});
test('candidate sparse export cannot turn unknown object truthiness into a match',()=>{
 for(const [id,attrs] of Object.entries(careerAttributes)){const r=ledger.records.find(r=>r.id===id);assert.ok(r);for(const [key,e] of Object.entries(attrs)){assert.notEqual(e.status,'unknown');assert.deepEqual(e,r.attributes[key]);if(comfort.includes(key)&&['core','regular'].includes(e.status))assert.equal(e.hardExclusionEligible,true);}}
});
test('baseline exclusions remain backed and ambiguous labels never hard-exclude',()=>{
 assert.equal(careerAttributes.phlebotomist.blood.hardExclusionEligible,true);
 for(const id of ['emergencymedicaltechnician','paramedic'])assert.equal(careerAttributes[id].emergencies.hardExclusionEligible,true);
 for(const r of ledger.records.filter(r=>['ambiguous','unresolved'].includes(r.mapping.status)))assert.ok(Object.values(r.attributes).every(e=>!e.hardExclusionEligible));
});
test('coverage counts distinguish verified, setting-dependent and unknown',()=>{
 const all=ledger.records.flatMap(r=>Object.values(r.attributes));
 assert.equal(all.length,182*25);
 assert.equal(all.filter(e=>['core','regular'].includes(e.status)).length,ledger.counts.verifiedAttributeRelationships);
 assert.equal(all.filter(e=>e.status==='setting-dependent').length,ledger.counts.settingDependentRelationships);
 assert.equal(all.filter(e=>e.status==='unknown').length,ledger.counts.unknownAttributeRelationships);
});
