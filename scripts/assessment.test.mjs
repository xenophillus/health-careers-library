import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {careerMap} from '../assets/data/career-map.js';
import {questions,pathways,rankCareers,pathwayScores,setAnswer,resetAssessment,assessmentState} from '../assets/js/assessment.js';
const ledger=JSON.parse(fs.readFileSync(new URL('../docs/launch-careers.json',import.meta.url)));
test('all 192 source appearances preserved across 182 exact titles',()=>{
 assert.equal(careerMap.length,182);assert.equal(new Set(careerMap.map(c=>c.id)).size,182);
 const pairs=careerMap.flatMap(c=>c.appearances.map(a=>a.sourceTitle+'|'+a.sourcePathway)).sort();
 assert.deepEqual(pairs,ledger.records.map(r=>r.sourceTitle+'|'+r.sourcePathway).sort());
});
test('pathway appearance counts, cross-listed titles and ambiguous labels retained',()=>{
 assert.deepEqual(pathways.map(p=>careerMap.filter(c=>c.pathways.includes(p)).length),[54,41,42,21,34]);
 assert.equal(careerMap.filter(c=>c.pathways.length===2).length,10);assert.equal(careerMap.filter(c=>c.reviewFlags.length).length,3);
});
test('every source entry included for every pure-pathway preference, regardless article or wave',()=>{
 for(const path of pathways){
  const answers=Object.fromEntries(questions.map(q=>[q.id,q.path===path?2:-1]));
  const results=rankCareers(answers);assert.equal(results.length,182);
  assert.deepEqual(new Set(results.map(c=>c.id)),new Set(careerMap.map(c=>c.id)));
  const top=results.filter(c=>c.score===2);assert.deepEqual(new Set(top.map(c=>c.id)),new Set(careerMap.filter(c=>c.pathways.includes(path)).map(c=>c.id)));
 }
});
test('not sure and skipped are neutral, not dislike; no fabricated positive matches',()=>{
 const neutral=Object.fromEntries(questions.map(q=>[q.id,0]));
 assert.ok(rankCareers(neutral).every(c=>c.score===0&&c.reasons.length===0));
 assert.deepEqual(rankCareers({}),rankCareers(neutral));
 const negative=Object.fromEntries(questions.map(q=>[q.id,-1]));assert.ok(rankCareers(negative).every(c=>c.score===-1&&c.reasons.length===0));
});
test('multi-pathway entries use strongest pathway without duplicate boost',()=>{
 const answers={research:2,develop:2};const ranked=rankCareers(answers);
 assert.equal(ranked.find(c=>c.id==='biomedicalclinicalengineer').score,2);
 assert.ok(ranked.find(c=>c.id==='biomedicalclinicalengineer').pathways.length===2);
 assert.equal(pathwayScores(answers)[0].path,pathways[4]);
});
test('changing answers changes order and reset discards all answers',()=>{
 setAnswer('care',2);setAnswer('data',-1);setAnswer('invalid',2);setAnswer('care',99);
 assert.equal(assessmentState.answers.care,2);assert.ok(!Object.hasOwn(assessmentState.answers,'invalid'));
 assert.notEqual(rankCareers({care:2,'support-patient':2})[0].matchedPath,rankCareers({research:2,develop:2})[0].matchedPath);
 resetAssessment();assert.deepEqual(assessmentState.answers,{});
});

import {filterCareerEntries,hiddenPathways} from '../assets/js/assessment.js';
test('explicit paired dislikes hide pathway entries; uncertainty never falsely excludes',()=>{
 assert.equal(hiddenPathways({care:-1}).length,0);
 assert.equal(hiddenPathways({care:-1,'support-patient':0}).length,0);
 const rows=filterCareerEntries({care:-1,'support-patient':-1});
 assert.equal(rows.length,182);
 assert.equal(rows.find(c=>c.id==='veterinarian').hidden,true);
 assert.equal(rows.find(c=>c.id==='respiratorytherapist').hidden,false,'cross-listed diagnostic pathway keeps option open');
 assert.deepEqual(rows.find(c=>c.id==='veterinarian').hiddenReasons,['Therapeutic Services']);
});
test('even every disliked pathway retains full inventory for reversible show-all',()=>{
 const answers=Object.fromEntries(questions.map(q=>[q.id,-1]));const rows=filterCareerEntries(answers);
 assert.equal(rows.filter(c=>c.hidden).length,182);assert.equal(rows.length,182);
 assert.equal(filterCareerEntries({}).filter(c=>!c.hidden).length,182);
});

import {assessment} from '../assets/js/views/assessment.js';
import {state} from '../assets/js/state.js';
test('progress describes completion, including neutral skips, without claiming answers',()=>{
 const oldPage=state.page,oldId=state.id;
 try {
  state.page='assessment';state.id='results';resetAssessment();
  assert.match(assessment(),/0 of 10 questions completed \(including any skipped\)/);
  for(const q of questions)setAnswer(q.id,0);
  const html=assessment();
  assert.match(html,/10 of 10 questions completed \(including any skipped\)/);
  assert.doesNotMatch(html,/questions answered/);
 } finally {resetAssessment();state.page=oldPage;state.id=oldId;}
});
