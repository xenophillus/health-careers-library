// Automated deterministic checks for unpublished career drafts.
// AI/editorial fact checking remains a separate human-reviewed stage.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {PROFILE_SECTION_NAMES} from '../assets/data/profile-standard.js';

const root=process.cwd(), dir=path.join(root,'preview/drafts');
const manifestPath=path.join(dir,'manifest.js');
const results=[];
const issues=(r,severity,message)=>r.findings.push({severity,message});
const text=html=>html.replace(/<[^>]+>/g,' ').replace(/&(?:amp|nbsp|lt|gt);/g,' ').replace(/\s+/g,' ').trim();
const links=html=>[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
const escapeMarkdown=s=>String(s).replace(/[|\n]/g,' ');
if(!fs.existsSync(manifestPath))throw Error('Missing draft manifest; run spreadsheet sync first.');
const {draftProfiles}=await import(pathToFileURL(manifestPath)+'?check='+Date.now());
for(const profile of draftProfiles){
  const r={id:profile.id,title:profile.title,findings:[],sections:0,wordCount:0};
  results.push(r);
  if(!/^[a-z0-9-]+$/.test(profile.id)){issues(r,'error','Invalid profile ID');continue;}
  const file=path.join(dir,profile.id+'.js');
  if(!fs.existsSync(file)){issues(r,'error','Draft module missing');continue;}
  let sections;
  try{({sections}=await import(pathToFileURL(file)+'?check='+Date.now()));}
  catch(e){issues(r,'error','Draft import failed: '+e.message);continue;}
  if(!Array.isArray(sections)){issues(r,'error','Sections export must be an array');continue;}
  r.sections=sections.length;
  if(sections.length!==PROFILE_SECTION_NAMES.length)issues(r,'error','Expected exactly 15 sections');
  const seen=new Set();
  sections.forEach((section,i)=>{
    const label='Section '+(i+1);
    if(seen.has(section.id))issues(r,'error',label+': repeated section ID');
    seen.add(section.id);
    if(section.name!==PROFILE_SECTION_NAMES[i])issues(r,'error',label+': title or ordering mismatch');
    const html=section.html||'';
    const plain=text(html), words=plain.split(/\s+/).filter(Boolean).length;
    r.wordCount+=words;
    if(words<30)issues(r,'warning',label+': very short section ('+words+' words)');
    if(/\b(?:TBD|TODO|lorem ipsum|insert source|placeholder)\b/i.test(plain))issues(r,'error',label+': unfinished placeholder');
    if(/<script|javascript:|onerror\s*=|onclick\s*=/i.test(html))issues(r,'error',label+': unsafe HTML detected');
    for(const link of links(html)){
      if(!/^https:\/\//i.test(link))issues(r,'warning',label+': non-HTTPS reference '+link);
      if(/example\.com|localhost/i.test(link))issues(r,'error',label+': placeholder URL');
    }
  });
  const association=sections[13]?.html||'';
  const bibliography=sections[14]?.html||'';
  if(!links(association).length)issues(r,'warning','Professional association has no direct official link');
  if(links(bibliography).length<3)issues(r,'warning','Bibliography contains fewer than 3 links');
  if(r.wordCount<700)issues(r,'warning','Total profile under 700 words; review depth');
}
const preview=fs.readFileSync('preview/index.html','utf8');
const css=fs.readFileSync('preview/styles.css','utf8');
const platform=[];
if(!/name="viewport"/.test(preview))platform.push('Missing mobile viewport');
if(!/@media\s*\(max-width:\s*750px\)/.test(preview+css))platform.push('Mobile breakpoint missing');
if(!/aria-label/.test(preview))platform.push('Preview navigation accessibility labels missing');
const errors=results.reduce((n,r)=>n+r.findings.filter(f=>f.severity==='error').length,0);
const warnings=results.reduce((n,r)=>n+r.findings.filter(f=>f.severity==='warning').length,0);
const report=['# Editorial draft QA report','','Generated: '+new Date().toISOString(),'','Drafts: '+results.length+' | Errors: '+errors+' | Warnings: '+warnings,'','**Automated checks are not source verification, rendered browser QA, or publication approval.**','','## Platform checks',...(platform.length?platform.map(x=>'- FAIL: '+x):['- PASS: viewport, responsive breakpoint and navigation labels exist']),'','## Career drafts',...results.flatMap(r=>['','### '+r.title+' ('+r.id+')','Sections: '+r.sections+' | Words: '+r.wordCount,...(r.findings.length?r.findings.map(f=>'- '+f.severity.toUpperCase()+': '+f.message):['- No structural findings'])])].join('\n');
fs.mkdirSync('qa-results',{recursive:true});
fs.writeFileSync('qa-results/editorial-qa.md',report+'\n');
fs.writeFileSync('qa-results/editorial-qa.json',JSON.stringify({generatedAt:new Date().toISOString(),errors,warnings,platform,results},null,2)+'\n');
console.log(report);
if(errors||platform.length)process.exitCode=1;
