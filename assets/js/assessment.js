import {careerMap} from '../data/career-map.js';
export const pathways=['Therapeutic Services','Diagnostic Services','Health Informatics','Support Services','Biotechnology Research and Development'];
import {questions,answerOptions} from '../data/assessment-questions.js?v=preferences-2';
import {careerAttributes} from '../data/career-attributes.js?v=preferences-2';
export {questions,answerOptions};
// Memory only: refreshing clears answers. No accounts, answer storage, requests or analytics.
export const assessmentState={answers:{},exclusions:[],restoredIds:[],query:'',path:'all',page:0,showHidden:false};
export function setAnswer(id,value){
 const q=questions.find(q=>q.id===id);
 if(q&&(q.options||answerOptions).some(([v])=>v===value)){
  assessmentState.answers[id]=value;
  if(q.exclusionLabel&&value!==-1)assessmentState.exclusions=assessmentState.exclusions.filter(x=>x!==q.attribute);
 }
}
export function setExclusion(attribute,enabled){
 const q=questions.find(q=>q.attribute===attribute&&q.exclusionLabel);
 assessmentState.exclusions=assessmentState.exclusions.filter(x=>x!==attribute);
 if(q&&enabled&&assessmentState.answers[q.id]===-1){assessmentState.exclusions.push(attribute);assessmentState.restoredIds=assessmentState.restoredIds.filter(id=>!careerAttributes[id]?.[attribute]);}
}
export function restoreEntry(id){if(careerMap.some(c=>c.id===id)&&!assessmentState.restoredIds.includes(id))assessmentState.restoredIds.push(id);}
export function resetAssessment(){Object.assign(assessmentState,{answers:{},exclusions:[],restoredIds:[],query:'',path:'all',page:0,showHidden:false});}
export function pathwayScores(answers){return pathways.map(path=>{
 const qs=questions.filter(q=>q.weights?.[path]);
 const total=qs.reduce((n,q)=>n+q.weights[path],0);
 return {path,score:total?qs.reduce((sum,q)=>sum+q.weights[path]*([-1,0,1,2].includes(answers[q.id])?answers[q.id]:0),0)/total:0,
 reasons:qs.filter(q=>answers[q.id]>0).map(q=>q.reason),tradeoffs:qs.filter(q=>answers[q.id]===-1).map(q=>q.reason)};
}).sort((a,b)=>b.score-a.score||a.path.localeCompare(b.path));}
export function rankCareers(answers){
 const scores=pathwayScores(answers);
 return careerMap.map(c=>{const best=scores.find(s=>c.pathways.includes(s.path));const interestMatches=questions.filter(q=>q.matching==='interest'&&careerAttributes[c.id]?.[q.attribute]&&answers[q.id]>0).map(q=>careerAttributes[c.id][q.attribute]);
 const interestAdjustment=questions.filter(q=>q.matching==='interest'&&['core','regular'].includes(careerAttributes[c.id]?.[q.attribute]?.status)).reduce((sum,q)=>sum+([-1,1,2].includes(answers[q.id])?answers[q.id]*0.5:0),0);
 return {...c,score:best.score+interestAdjustment,matchedPath:best.path,reasons:best.reasons,tradeoffs:best.tradeoffs,interestMatches};})
 .sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title));
}
export function avoidancePreferences(answers,exclusions=[]){return questions.filter(q=>q.matching==='comfort'&&answers[q.id]===-1).map(q=>({...q,mustAvoid:!!q.exclusionLabel&&exclusions.includes(q.attribute)}));}
export function filterCareerEntries(answers,exclusions=[],restoredIds=[]){
 const preferences=avoidancePreferences(answers,exclusions);
 return rankCareers(answers).map(c=>{
  const evidence=careerAttributes[c.id]||{};
  const known=preferences.filter(q=>['core','regular'].includes(evidence[q.attribute]?.status));
  const hidden=known.filter(q=>q.mustAvoid).map(q=>({attribute:q.attribute,...evidence[q.attribute]}));
  const cautions=known.filter(q=>!q.mustAvoid).map(q=>({attribute:q.attribute,...evidence[q.attribute]}));
  const settingNotes=preferences.filter(q=>evidence[q.attribute]?.status==='setting-dependent').map(q=>evidence[q.attribute]);
  return {...c,hidden:hidden.length>0&&!restoredIds.includes(c.id),restored:hidden.length>0&&restoredIds.includes(c.id),hiddenReasons:hidden.map(x=>x.label),exclusions:hidden,cautions,settingNotes,
   unknownPreferences:preferences.filter(q=>!['core','regular'].includes(evidence[q.attribute]?.status)).map(q=>q.attributeLabel),
   score:c.score-cautions.length*0.5};
 }).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title));
}
