// Local-only secondary review surface. Does not modify the approved five-pilot preview.
import fs from 'node:fs';import crypto from 'node:crypto';
import {markdownToHtml,writeDraft} from '../scripts/import-profile.mjs';
import {careers as baseline} from '../preview/assets/data/careers.js';
import {draftProfiles as pilots} from '../preview/drafts/manifest.js';
const dest='qa-audit/expanded-preview';fs.mkdirSync(dest,{recursive:true});fs.cpSync('preview',dest,{recursive:true});
const added=['paramedic','biomedical-clinical-engineer','cancer-registrar','medical-records-specialist','medical-transcriptionist'];
const paths={'paramedic':'Therapeutic Services','biomedical-clinical-engineer':'Support Services','cancer-registrar':'Health Informatics','medical-records-specialist':'Health Informatics','medical-transcriptionist':'Health Informatics'};
const manifest=[...pilots],careers=structuredClone(baseline),entries=[];
for(const id of added){
 const folder='content/batches/2026-10-25/'+id+'/';const raw=fs.readFileSync(folder+'sections.json','utf8');const sections=JSON.parse(raw);const title=fs.readFileSync(folder+'article.md','utf8').split('\n')[0].replace(/^# /,'');
 const html=sections.map(s=>({...s,html:markdownToHtml(s.markdown)}));
 writeDraft(html,dest+'/drafts/'+id+'.js');writeDraft(html,dest+'/assets/data/drafts/'+id+'.js');
 manifest.push({id,title,status:'Unapproved local repository proposal'});
 const intro=sections[0].markdown.split('\n\n')[0];careers.push({id,name:title,path:paths[id],icon:'🏥',desc:intro,years:null,salary:null,related:[],tags:['Unapproved local draft'],hasEditorialDraft:true});
 entries.push({id,intro,sha256:crypto.createHash('sha256').update(raw).digest('hex')});
}
for(const p of ['drafts/manifest.js','assets/data/drafts/manifest.js'])fs.writeFileSync(dest+'/'+p,'export const draftProfiles = '+JSON.stringify(manifest,null,2)+';\n');
fs.writeFileSync(dest+'/assets/data/careers.js','export const careers = '+JSON.stringify(careers,null,2)+';\n');
let profiles=fs.readFileSync(dest+'/assets/data/full-profiles.js','utf8');
profiles=entries.map((e,i)=>`import {sections as extra${i}} from './drafts/${e.id}.js';`).join('\n')+'\n'+profiles;
profiles=profiles.replace('export const fullProfiles = {','export const fullProfiles = {\n'+entries.map((e,i)=>`${JSON.stringify(e.id)}:{careerId:${JSON.stringify(e.id)},intro:${JSON.stringify(e.intro)},tags:['Unapproved local draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'Local review only'}],sections:extra${i}},`).join('\n'));
fs.writeFileSync(dest+'/assets/data/full-profiles.js',profiles);
const m=JSON.parse(fs.readFileSync('content/batches/2026-10-25/paramedic/media-review.json'));
const hash=crypto.createHash('sha256').update(fs.readFileSync(m.assetPath)).digest('hex');if(hash!==m.sha256)throw Error('Paramedic reuse bytes changed');
const media={src:m.assetPath,alt:m.proposedAlt,caption:m.proposedCaption,credit:m.credit,license:m.license,licenseUrl:'https://commons.wikimedia.org/wiki/Template:PD-USGov',sourceUrl:m.sourceUrl,notice:'U.S. government imagery does not imply endorsement.',sha256:hash};
let registry=fs.readFileSync(dest+'/assets/data/career-integrity.js','utf8');registry=registry.replace('export const careerMedia = Object.freeze({','export const careerMedia = Object.freeze({\n"paramedic":'+JSON.stringify(media)+',');fs.writeFileSync(dest+'/assets/data/career-integrity.js',registry);
fs.writeFileSync('qa-audit/expanded-review-manifest.json',JSON.stringify({localOnly:true,publicationApprovals:0,profiles:manifest,added:entries,textOnly:['biomedical-clinical-engineer','cancer-registrar','medical-records-specialist','medical-transcriptionist'],imageReuse:media},null,2)+'\n');
console.log('Built local secondary surface: 10 unapproved drafts; five original pilots preserved.');
// Do not show an empty related-careers panel in the local secondary surface.
const viewPath=dest+'/assets/js/views/full-career-profile.js';
let view=fs.readFileSync(viewPath,'utf8');
const asideStart=view.indexOf('<aside class="profileCard related">');
const asideEnd=view.indexOf('</aside>',asideStart)+8;
if(asideStart<0||asideEnd<8)throw Error('Expected related panel template missing');
view=view.slice(0,asideStart)+"${(c.related||[]).some(id=>careers.some(x=>x.id===id))?`"+view.slice(asideStart,asideEnd)+"`:''}"+view.slice(asideEnd);
fs.writeFileSync(viewPath,view);
