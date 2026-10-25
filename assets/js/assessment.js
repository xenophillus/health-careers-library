import {careerMap} from '../data/career-map.js';
export const pathways=['Therapeutic Services','Diagnostic Services','Health Informatics','Support Services','Biotechnology Research and Development'];
export const questions=[
 {id:'care',path:pathways[0],title:'Help people or animals recover and stay well',detail:'Think about taking part in treatment, rehabilitation, or ongoing care.',reason:'treatment and recovery'},
 {id:'support-patient',path:pathways[0],title:'Work directly with people receiving care',detail:'Think about listening, explaining, and helping someone through a care plan.',reason:'direct care and communication'},
 {id:'investigate',path:pathways[1],title:'Gather evidence to help understand a health problem',detail:'Think about images, samples, measurements, or test results.',reason:'investigating health problems'},
 {id:'precise',path:pathways[1],title:'Use precise tools to observe and measure',detail:'Think about careful testing, checking results, and noticing details.',reason:'precise observations and testing'},
 {id:'information',path:pathways[2],title:'Organize information so others can use it',detail:'Think about health records, documentation, coding, or information systems.',reason:'organizing health information'},
 {id:'data',path:pathways[2],title:'Use data and technology to improve decisions',detail:'Think about finding patterns, improving information quality, or protecting records.',reason:'health data and information systems'},
 {id:'operations',path:pathways[3],title:'Keep healthcare services running smoothly',detail:'Think about equipment, supplies, facilities, food services, or daily operations.',reason:'supporting healthcare operations'},
 {id:'safe',path:pathways[3],title:'Make healthcare environments safe and dependable',detail:'Think about checking systems, solving practical problems, and supporting the care team.',reason:'safe and dependable environments'},
 {id:'research',path:pathways[4],title:'Explore scientific questions and new possibilities',detail:'Think about experiments, biological processes, or investigating how something works.',reason:'scientific research'},
 {id:'develop',path:pathways[4],title:'Develop and test new healthcare solutions',detail:'Think about improving a product, device, process, or scientific technique.',reason:'developing and testing new solutions'}
];
export const answerOptions=[[-1,'Not for me right now'],[0,'Not sure yet'],[1,'Interested'],[2,'Very interested']];
// Memory only: refreshing clears answers. No accounts, answer storage, requests or analytics.
export const assessmentState={answers:{},query:'',path:'all',page:0,showHidden:false};
export function setAnswer(id,value){if(questions.some(q=>q.id===id)&&[-1,0,1,2].includes(value))assessmentState.answers[id]=value;}
export function resetAssessment(){Object.assign(assessmentState,{answers:{},query:'',path:'all',page:0,showHidden:false});}
export function pathwayScores(answers){return pathways.map(path=>{
 const qs=questions.filter(q=>q.path===path);
 return {path,score:qs.reduce((sum,q)=>sum+([-1,0,1,2].includes(answers[q.id])?answers[q.id]:0),0)/qs.length,
 reasons:qs.filter(q=>answers[q.id]>0).map(q=>q.reason),tradeoffs:qs.filter(q=>answers[q.id]===-1).map(q=>q.reason)};
}).sort((a,b)=>b.score-a.score||a.path.localeCompare(b.path));}
export function rankCareers(answers){
 const scores=pathwayScores(answers);
 return careerMap.map(c=>{const best=scores.find(s=>c.pathways.includes(s.path));return {...c,score:best.score,matchedPath:best.path,reasons:best.reasons,tradeoffs:best.tradeoffs};})
 .sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title));
}
// Conservative, reversible pathway filtering: partial/uncertain answers never exclude.
export function hiddenPathways(answers){return pathways.filter(path=>questions.filter(q=>q.path===path).every(q=>answers[q.id]===-1));}
export function filterCareerEntries(answers){
 const hidden=hiddenPathways(answers);
 return rankCareers(answers).map(c=>({...c,hidden:c.pathways.every(path=>hidden.includes(path)),hiddenReasons:c.pathways.filter(path=>hidden.includes(path))}));
}
