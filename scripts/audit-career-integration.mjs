// Reconcile public trial careers with unpublished drafts before promotion.
import fs from 'node:fs';
import {careers} from '../assets/data/careers.js';
import {draftToPublicId,healthSciencePathways,careerMedia} from '../assets/data/career-integrity.js';
import {draftProfiles} from '../preview/drafts/manifest.js';

const normalize=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
const existingById=new Map(careers.map(c=>[c.id,c]));
const existingByTitle=new Map(careers.map(c=>[normalize(c.name),c]));
const findings=[],actions=[];
const add=(severity,code,detail)=>findings.push({severity,code,detail});
for(const c of careers){
 if(!healthSciencePathways.includes(c.path))add('error','invalid-pathway',c.id+': '+c.path);

}
const existingIds=new Set();
for(const c of careers){if(existingIds.has(c.id))add('error','repeated-public-id',c.id);existingIds.add(c.id);}
const used=new Set();
for(const draft of draftProfiles){
 const canonical=draftToPublicId[draft.id]||draft.id;
 const byTitle=existingByTitle.get(normalize(draft.title));
 const byId=existingById.get(canonical);
 if(byTitle&&byId&&byTitle.id!==byId.id)add('error','identity-conflict',draft.id+' mapped to '+byId.id+' but title matches '+byTitle.id);
 if(byTitle&&!byId)add('error','unmapped-duplicate',draft.id+' duplicates '+byTitle.id+' without canonical mapping');
 if(used.has(canonical))add('error','draft-collision',canonical);
 used.add(canonical);
 actions.push({draft:draft.id,publicId:canonical,mode:byId?'upgrade-existing':'add-new',existingTitle:byId?.name||null});
 if(!careerMedia[canonical])add('review','image-pending',canonical+': no approved, credited image yet');
}
for(const [id,media] of Object.entries(careerMedia)){
 if(!existingById.has(id)&&!used.has(id))add('error','orphan-image',id);
 if(!media.src||!media.alt||!media.credit||!media.license||!media.sourceUrl)add('error','image-metadata',id+' missing src/alt/credit/license/sourceUrl');
 if(media.src&&!/^assets\/images\/[a-z0-9/_-]+\.(jpg|jpeg|png|webp|svg)$/i.test(media.src))add('error','image-path',id+' must use approved relative file');
 if(media.src&&!fs.existsSync(media.src))add('error','image-file-missing',id+': '+media.src);
}
fs.mkdirSync('qa-results',{recursive:true});
const report={createdAt:new Date().toISOString(),actions,findings};
fs.writeFileSync('qa-results/career-integration.json',JSON.stringify(report,null,2)+'\n');
const markdown=['# Career directory integration audit','','This is a development-only mapping. No profiles are automatically published.','','## Proposed actions',...actions.map(a=>'- '+a.draft+' → '+a.publicId+' ('+a.mode+')'),'','## Findings',...(findings.length?findings.map(f=>'- '+f.severity.toUpperCase()+' ['+f.code+'] '+f.detail):['No findings.'])].join('\n');
fs.writeFileSync('qa-results/career-integration.md',markdown+'\n');
console.log(markdown);
if(findings.some(f=>f.severity==='error'))process.exitCode=1;
