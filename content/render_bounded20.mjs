// Local editorial preview only. No runtime registration, network writes or deployment.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {marked}=await import(require.resolve('marked'));
const out=path.resolve('content/prepared/bounded-20');
const batch=path.resolve('content/batches/bounded-20-2026-10-25');
const sel=JSON.parse(fs.readFileSync(path.join(out,'selection.json'),'utf8'));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const articles=sel.records.map(r=>{
const sections=JSON.parse(fs.readFileSync(path.join(batch,r.sourceKey,'sections.json'),'utf8'));
return `<article id="${r.sourceKey}"><h2>${esc(r.sourceTitle)}</h2><p class="status">Editorial review draft · not published · image/source review tracked separately</p>${sections.map((s,i)=>`<section id="${r.sourceKey}-${i+1}"><h3>${esc(s.name)}</h3>${marked.parse(s.markdown)}</section>`).join('\n')}</article>`;
});
fs.writeFileSync(path.join(out,'review.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Health Careers — 20 draft review</title><style>body{margin:0;background:#f4f7fa;color:#172938;font:17px/1.65 system-ui,sans-serif}main{max-width:920px;margin:auto;padding:24px}nav,article{background:white;border:1px solid #ccd8e0;border-radius:12px;padding:24px;margin-bottom:28px}nav ul{columns:2;padding-left:20px}a{color:#075985;overflow-wrap:anywhere}h1,h2,h3{line-height:1.25}h2{border-bottom:3px solid #0e7490;padding-bottom:12px}h3{margin-top:28px}.status{font-size:.85em;color:#52626d}article{scroll-margin-top:16px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccd8e0;padding:8px}pre{white-space:pre-wrap;overflow-wrap:anywhere}img{max-width:100%}@media(max-width:600px){main{padding:12px}nav,article{padding:16px}nav ul{columns:1}}@media print{body{background:white;font-size:10pt}main{max-width:none;padding:0}nav{display:none}article{border:0;border-radius:0;break-before:page;padding:0}h2,h3{break-after:avoid}a{color:inherit}}</style><main><h1>Health Careers: 20 drafts for review</h1><p>Local editorial rendering, separate from the assessment and production website. This preview does not establish publication readiness.</p><nav aria-label="Draft articles"><ul>${sel.records.map(r=>`<li><a href="#${r.sourceKey}">${esc(r.sourceTitle)}</a></li>`).join('')}</ul></nav>${articles.join('\n')}</main></html>`);
console.log('Rendered20 articles/300 sections locally; no remote actions.');
