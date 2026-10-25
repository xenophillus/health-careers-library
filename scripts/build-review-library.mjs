// Build a development-only, integrated career library from unapproved editorial drafts.
// Output stays under preview/. Never modifies the public registry or root index.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {careers as revisedCareers} from '../assets/data/careers.js';
import {draftProfiles} from '../preview/drafts/manifest.js';
import {draftToPublicId,draftPathways,careerEmoji} from '../assets/data/career-integrity.js';

const root=process.cwd();
const destination=path.join(root,'preview/assets');
fs.cpSync(path.join(root,'assets'),destination,{recursive:true,force:true});
fs.mkdirSync(path.join(destination,'data/drafts'),{recursive:true});
const copyDraft=(id)=>fs.copyFileSync(path.join(root,'preview/drafts',id+'.js'),path.join(destination,'data/drafts',id+'.js'));
const clean=s=>s.replace(/<[^>]*>/g,' ').replace(/&(?:amp|nbsp);/g,' ').replace(/\s+/g,' ').trim();
const careers=structuredClone(revisedCareers);
const ids=new Set(careers.map(c=>c.id));
const aliases=new Map();
const info=[];
for(const draft of draftProfiles){
 const id=draftToPublicId[draft.id]||draft.id;
 if(aliases.has(id))throw Error('Duplicate draft identity '+id);
 aliases.set(id,draft.id);
 copyDraft(draft.id);
 const {sections}=await import(pathToFileURL(path.join(root,'preview/drafts',draft.id+'.js')).href+'?fresh='+Date.now());
 if(!Array.isArray(sections)||sections.length!==15)throw Error('Missing sections for '+id);
 const index=careers.findIndex(c=>c.id===id);
 const intro=clean(sections[0].html).slice(0,190);
 const pathName=draftPathways[draft.id];
 if(!pathName)throw Error('No pathway for '+draft.id);
 const entry=index>=0?{...careers[index],name:draft.title,path:pathName,icon:careerEmoji[id]||careers[index].icon,desc:intro||careers[index].desc,hasEditorialDraft:true}:
 {id,name:draft.title,path:pathName,icon:careerEmoji[id]||'🏥',years:null,salary:null,desc:intro,work:'See the full career article for work settings.',duties:[],edu:'See Education and Training.',qualities:'See Skills and Personal Qualities.',requirements:'See Certification and Licensure.',related:[],tags:['Full editorial draft'],hasEditorialDraft:true};
 if(index>=0)careers[index]=entry;
 else {if(ids.has(id))throw Error('Duplicate public ID '+id);ids.add(id);careers.push(entry);}
 info.push({id,draftId:draft.id,title:draft.title,sections:sections.length});
}
fs.writeFileSync(path.join(destination,'data/careers.js'),'// Development review build only; unpublished careers.\nexport const careers = '+JSON.stringify(careers,null,2)+';\n');
const original=fs.readFileSync(path.join(root,'assets/data/full-profiles.js'),'utf8');
const imports=info.map((x,i)=>'import {sections as draftSections'+i+'} from \'./drafts/'+x.draftId+'.js\';').join('\n');
const additions=info.map((x,i)=>JSON.stringify(x.id)+': {careerId:'+JSON.stringify(x.id)+',intro:'+JSON.stringify(careers.find(y=>y.id===x.id).desc)+',tags:[\'Editorial draft\'],facts:[{label:\'Editorial status\',value:\'Unapproved\',detail:\'For review only\'}],sections:draftSections'+i+'}').join(',\n');
let reviewed=original.replace('// Profiles are editorially reviewed before being added to this registry.','// Unpublished editorial review build; NOT the public registry.');
reviewed=imports+'\n'+reviewed;
reviewed=reviewed.replace(/export const fullProfiles = \{/,'export const fullProfiles = {\n'+additions+',');
fs.writeFileSync(path.join(destination,'data/full-profiles.js'),reviewed);
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
html=html.replace('<title>','<title>UNPUBLISHED REVIEW — ');
html=html.replace('<main id="app">','<div class="preview-banner" role="status">UNPUBLISHED DEVELOPMENT REVIEW — CAREER CONTENT IS NOT APPROVED</div><main id="app">');
html=html.replace('</head>','<style>.preview-banner{padding:.85rem 1rem;background:#fff3d6;border-bottom:2px solid #e8ae3b;color:#4c3600;font-weight:700;text-align:center}</style></head>');
html=html.replace('Early interactive prototype','Unpublished integrated review prototype');
fs.writeFileSync(path.join(root,'preview/library.html'),html);
fs.mkdirSync(path.join(root,'qa-results'),{recursive:true});
fs.writeFileSync(path.join(root,'qa-results/integrated-careers.json'),JSON.stringify(info,null,2)+'\n');
console.log('Built unpublished integrated library: '+info.length+' editorial drafts, '+careers.length+' unique cards.');
