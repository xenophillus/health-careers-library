import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {careerMap} from '../assets/data/career-map.js';
import {careerAttributes} from '../assets/data/career-attributes.js?v=preferences-2';
import {questions,answerOptions,pathways,rankCareers,pathwayScores,setAnswer,setExclusion,restoreEntry,resetAssessment,assessmentState,filterCareerEntries} from '../assets/js/assessment.js?v=preferences-2';
import {assessment} from '../assets/js/views/assessment.js?v=preferences-2';
import {state} from '../assets/js/state.js';
const ledger=JSON.parse(fs.readFileSync(new URL('../docs/launch-careers.json',import.meta.url)));
const hidden=(a,e=[],restored=[])=>filterCareerEntries(a,e,restored).filter(c=>c.hidden).map(c=>c.id).sort();
test('all192 appearances and182 exact titles retained without article/wave exclusions',()=>{
 assert.equal(careerMap.length,182);assert.equal(new Set(careerMap.map(c=>c.id)).size,182);
 assert.deepEqual(careerMap.flatMap(c=>c.appearances.map(a=>a.sourceTitle+'|'+a.sourcePathway)).sort(),ledger.records.map(r=>r.sourceTitle+'|'+r.sourcePathway).sort());
 assert.deepEqual(pathways.map(p=>careerMap.filter(c=>c.pathways.includes(p)).length),[54,41,42,21,34]);
 assert.equal(careerMap.filter(c=>c.pathways.length===2).length,10);assert.equal(careerMap.filter(c=>c.reviewFlags.length).length,3);
});
test('25 distinct questions in five groups, each with neutral option',()=>{
 assert.equal(questions.length,25);assert.equal(new Set(questions.map(q=>q.id)).size,25);
 const counts={};for(const q of questions){counts[q.group]=(counts[q.group]||0)+1;assert.ok((q.options||answerOptions).some(([v])=>v===0));}
 assert.deepEqual(Object.values(counts),[5,5,5,5,5]);
});
test('all skipped, unsure, or ordinary negative keeps every source entry eligible',()=>{
 for(const value of [0,-1]){const answers=Object.fromEntries(questions.map(q=>[q.id,value]));assert.deepEqual(hidden(answers),[]);assert.equal(filterCareerEntries(answers).length,182);}
 assert.deepEqual(hidden({}),[]);
});
test('blood avoidance never excludes a pathway or unverified occupational exposure',()=>{
 assert.deepEqual(hidden({blood:-1},['blood']),['phlebotomist']);
 for(const id of ['registerednurse','medicallaboratoryscientist','medicallaboratorytechnician','diagnosticmedicalsonographer','geneticcounselorhistotechnician'])assert.equal(filterCareerEntries({blood:-1},['blood']).find(c=>c.id===id).hidden,false);
});
test('only explicit checked emergency exclusion hides EMT and paramedic',()=>{
 assert.deepEqual(hidden({emergencies:-1}),[]);
 assert.deepEqual(hidden({emergencies:-1},['emergencies']),['emergencymedicaltechnician','paramedic']);
 assert.deepEqual(hidden({emergencies:0},['emergencies']),[]);
 assert.deepEqual(hidden({emergencies:2},['emergencies']),[]);
});
test('both exposure rules preserve all entries and allow restoring one independently',()=>{
 const a={blood:-1,emergencies:-1},e=['blood','emergencies'];
 assert.deepEqual(hidden(a,e),['emergencymedicaltechnician','paramedic','phlebotomist']);
 assert.deepEqual(hidden(a,e,['paramedic']),['emergencymedicaltechnician','phlebotomist']);assert.equal(filterCareerEntries(a,e).length,182);
});
test('comfort is not enthusiasm: comfortable answers do not boost clinical careers',()=>{
 const neutral=filterCareerEntries({}).map(c=>[c.id,c.score]);
 assert.deepEqual(filterCareerEntries({blood:2,emergencies:2,wounds:2,positioning:2,'personal-care':2}).map(c=>[c.id,c.score]),neutral);
});
test('unmapped workday preferences do not invent career-level fit',()=>{
 assert.deepEqual(rankCareers({team:2,pace:-1,variety:2,focus:2,location:-1}),rankCareers({}));
});
test('ordinary comfort avoidance only lowers documented regular duties, unknown stays unchanged',()=>{
 const a=filterCareerEntries({}),b=filterCareerEntries({blood:-1});
 assert.ok(b.find(c=>c.id==='phlebotomist').score<a.find(c=>c.id==='phlebotomist').score);
 assert.equal(b.find(c=>c.id==='registerednurse').score,a.find(c=>c.id==='registerednurse').score);
 assert.equal(b.find(c=>c.id==='medicallaboratoryscientist').score,a.find(c=>c.id==='medicallaboratoryscientist').score);
});
test('animal preference supports veterinary care, not inferred animal research',()=>{
 const rows=rankCareers({animals:2});assert.ok(rows.find(c=>c.id==='veterinarian').interestMatches.length);
 assert.ok(rows.find(c=>c.id==='veterinariantechnician').interestMatches.length);
 assert.equal(rows.find(c=>c.id==='laboratoryassistantgenetics').interestMatches.length,0);
});
test('multi-pathway roles use strongest normalized pathway without duplicate boost',()=>{
 const a={experiment:2,invent:2,evidence:2,make:2};const scores=pathwayScores(a);const c=rankCareers(a).find(c=>c.id==='biomedicalclinicalengineer');
 assert.equal(c.score,Math.max(...scores.filter(s=>c.pathways.includes(s.path)).map(s=>s.score)));
 assert.equal(rankCareers(a).filter(x=>x.id===c.id).length,1);
});
test('each source-confirmed attribute has provenance and no phantom inventory ID',()=>{
 for(const [id,attrs] of Object.entries(careerAttributes)){assert.ok(careerMap.some(c=>c.id===id));for(const e of Object.values(attrs)){assert.ok(['core','regular','setting-dependent','unknown'].includes(e.status));assert.match(e.source,/^https:\/\/www\.bls\.gov\//);assert.ok(e.reviewedAt&&e.explanation);}}
});
test('optional exclusions start unchecked and clear when preference changes',()=>{
 resetAssessment();setAnswer('blood',-1);assert.deepEqual(assessmentState.exclusions,[]);setExclusion('blood',true);assert.deepEqual(assessmentState.exclusions,['blood']);
 restoreEntry('phlebotomist');assert.deepEqual(assessmentState.restoredIds,['phlebotomist']);
 setAnswer('blood',0);assert.deepEqual(assessmentState.exclusions,[]);setExclusion('blood',true);assert.deepEqual(assessmentState.exclusions,[]);
 setAnswer('invalid',2);setAnswer('blood',99);assert.equal(assessmentState.answers.blood,0);resetAssessment();assert.deepEqual(assessmentState.restoredIds,[]);
});
test('progress is dynamic and includes skips without claiming they were answers',()=>{
 const old={page:state.page,id:state.id};try{state.page='assessment';state.id='results';resetAssessment();assert.match(assessment(),/0 of 25 questions completed/);questions.forEach(q=>setAnswer(q.id,0));assert.match(assessment(),/25 of 25 questions completed \(including any skipped\)/);assert.doesNotMatch(assessment(),/questions answered/);}finally{resetAssessment();Object.assign(state,old);}
});
test('entry and changed assessment modules use one release version',()=>{
 const root=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');assert.match(root,/app\.js\?v=preferences-2/);
 for(const f of ['app.js','views/assessment.js'])assert.match(fs.readFileSync(new URL('../assets/js/'+f,import.meta.url),'utf8'),/assessment\.js\?v=preferences-2/);
});
