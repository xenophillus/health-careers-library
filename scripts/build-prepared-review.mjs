// Review-only repair build from repository proposals; never reads/writes the Sheet.
// Run from the repository root. All generated runtime output stays under preview/.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {markdownToHtml,writeDraft} from './import-profile.mjs';
import {PROFILE_SECTION_NAMES} from '../assets/data/profile-standard.js';
import {draftToPublicId} from '../assets/data/career-integrity.js';
const batch='content/batches/2026-10-25/';
const ids=['athletic-trainer','sterile-processing-technician','dental-assistant','emergency-medical-technician','medical-assistant'];
const evidenceFiles=['media.json','media-evidence.json','media-evidence.json','media-review.json','media-review.json'];
const manifest=[],media={},inputs=[];
for(const [index,id] of ids.entries()){
 const raw=fs.readFileSync(batch+id+'/sections.json','utf8');
 const sections=JSON.parse(raw);
 if(JSON.stringify(sections.map(s=>s.name))!==JSON.stringify(PROFILE_SECTION_NAMES))throw Error('Unexpected section standard: '+id);
 writeDraft(sections.map(s=>({id:s.id,name:s.name,html:markdownToHtml(s.markdown)})),'preview/drafts/'+id+'.js');
 const title=fs.readFileSync(batch+id+'/article.md','utf8').split('\n')[0].replace(/^# /,'');
 manifest.push({id,title,status:'Unapproved repository proposal — not a fresh Sheet export'});
 const evidencePath=batch+id+'/'+evidenceFiles[index];
 const e=JSON.parse(fs.readFileSync(evidencePath,'utf8'));
 const src=e.src||e.assetPath||e.localFile;
 const digest=crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
 const expected=e.localSha256||e.sha256||(id==='dental-assistant'?'cfa1e8404a9fc5e8b0a66d07a115f5d6d2a109907f28f1e5851c815d55c41646':null);
 if(!expected||digest!==expected)throw Error('Reviewed image bytes changed: '+id);
 media[draftToPublicId[id]||id]={src,alt:e.alt||e.proposedAlt,caption:e.caption||e.proposedCaption,credit:e.credit||e.author,license:e.license,licenseUrl:e.licenseUrl||'https://commons.wikimedia.org/wiki/Template:PD-USGov',sourceUrl:e.sourceUrl,verificationStatus:'License evidence and pixels inspected; unapproved review use',notice:id==='dental-assistant'?'':'U.S. government imagery does not imply endorsement.',evidencePath,sha256:digest};
 inputs.push({id,sectionsSha256:crypto.createHash('sha256').update(raw).digest('hex'),imageSha256:digest,evidencePath});
}
fs.writeFileSync('preview/drafts/manifest.js','// REVIEW ONLY: repository proposals, not a live canonical Sheet export.\nexport const draftProfiles = '+JSON.stringify(manifest,null,2)+';\n');
execFileSync(process.execPath,['scripts/build-review-library.mjs'],{stdio:'inherit'});
fs.copyFileSync('preview/drafts/manifest.js','preview/assets/data/drafts/manifest.js');
// Preserve the out-of-scope sonographer record while overriding only reviewed pilots.
const registryPath='preview/assets/data/career-integrity.js';
let registry=fs.readFileSync(registryPath,'utf8');
const start=registry.indexOf('export const careerMedia = Object.freeze('),end=registry.indexOf(';',start);
const original=JSON.parse(registry.slice(start+'export const careerMedia = Object.freeze('.length,end-1));
registry=registry.slice(0,start)+'export const careerMedia = Object.freeze('+JSON.stringify({...original,...media},null,2)+')'+registry.slice(end);
fs.writeFileSync(registryPath,registry);
fs.writeFileSync('preview/assets/data/career-images.json',JSON.stringify(Object.entries({...original,...media}).map(([id,v])=>({id,...v})),null,2)+'\n');
fs.copyFileSync('scripts/review-media.mjs','preview/assets/js/views/review-media.js');
let view=fs.readFileSync('preview/assets/js/views/full-career-profile.js','utf8');
view="import {renderReviewMedia} from './review-media.js';\n"+view;
view=view.replace(/  const photo=.*\n/,"  const photo=renderReviewMedia(media);\n");
view=view.replace('sections.map(s=>`<section class="print-section"><h2>${esc(s.name)}</h2>${s.html}</section>`)','sections.map((s,i)=>`<section class="print-section"><h2>${esc(s.name)}</h2>${s.html}${i===1?photo:\'\'}</section>`)');
view=view.replace('</div>${photo}<div class="actions">','</div><div class="actions">');
view=view.replace('${current.html}</article>','${current.html}${current===sections[1]?photo:\'\'}</article>');
fs.writeFileSync('preview/assets/js/views/full-career-profile.js',view);
let card=fs.readFileSync('preview/assets/js/views/career-card.js','utf8');
card="import {renderReviewMedia} from './review-media.js';\n"+card;
card=card.replace('const artwork=media ?', 'const artwork=media?.caption ? renderReviewMedia(media) : media ?');
fs.writeFileSync('preview/assets/js/views/career-card.js',card);
const css='\n/* Review figures retain the entire verified image and its context. */\n.review-career-figure{margin:1.5rem 0;break-inside:avoid}.review-career-figure img{display:block;width:100%;height:auto;max-height:440px;object-fit:contain}.review-career-figure figcaption{line-height:1.5;font-size:.9rem;overflow-wrap:anywhere}.review-career-figure a{text-decoration:underline}.careerCard .review-career-figure{margin:0;min-width:0;flex:1}.careerCard .review-career-figure img{max-height:220px}.careerCard .review-career-figure figcaption{font-size:.8rem}@media print{.review-career-figure img{max-height:60mm}.preview-banner{display:block!important}}\n';
fs.appendFileSync('preview/assets/css/styles.css',css);
fs.writeFileSync('preview/review-media.css',css);
fs.writeFileSync('preview/prepared-review-receipt.json',JSON.stringify({basis:'Repository proposals based on 8638950; not canonical Sheet synchronization',publicationApprovals:0,profiles:inputs},null,2)+'\n');
console.log('Prepared five unapproved pilots with verified media context; no production assets or Sheet modified.');
