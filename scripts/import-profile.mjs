import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { PROFILE_SECTION_NAMES } from '../assets/data/profile-standard.js';
export function parseCSV(text) {
 const rows=[]; let row=[],field='',quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(quoted){if(c==='"'&&text[i+1]==='"'){field+='"';i++;}else if(c==='"')quoted=false;else field+=c;}else if(c==='"')quoted=true;else if(c===','){row.push(field);field='';}else if(c==='\n'){row.push(field);rows.push(row);row=[];field='';}else if(c!=='\r')field+=c;}
 if(quoted)throw Error('Unclosed CSV quote');if(field||row.length){row.push(field);rows.push(row);}return rows;
}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function inline(s){
 const links=[];
 const linked=String(s).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,(_,label,url)=>{const i=links.push({label,url})-1;return `LINKTOKEN${i}END`;});
 const urls=[];
 const marked=linked.replace(/https?:\/\/[^\s<>]+/g,url=>{const trimmed=url.replace(/[.,;]+$/,'');const i=urls.push(trimmed)-1;return `URLTOKEN${i}END`+url.slice(trimmed.length);});
 let html=esc(marked).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/(?<!\*)\*([^*]+)\*(?!\*)/g,'<em>$1</em>');
 const anchor=(label,url)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
 html=html.replace(/LINKTOKEN(\d+)END/g,(_,i)=>anchor(links[Number(i)].label,links[Number(i)].url));
 return html.replace(/URLTOKEN(\d+)END/g,(_,i)=>anchor(urls[Number(i)],urls[Number(i)]));
}
export function markdownToHtml(text){return text.trim().split(/\n\s*\n/).map(block=>{const ls=block.split('\n');if(ls.every(x=>/^\s*\d+\.\s+/.test(x)))return '<ol>'+ls.map(x=>'<li>'+inline(x.replace(/^\s*\d+\.\s+/,''))+'</li>').join('')+'</ol>';if(ls.every(x=>/^\s*[-*]\s+/.test(x)))return '<ul>'+ls.map(x=>'<li>'+inline(x.replace(/^\s*[-*]\s+/,''))+'</li>').join('')+'</ul>';return '<p>'+ls.map(inline).join(' ')+'</p>';}).join('\n').replace(/<\/ol>\s*<ol>/g,'\n');}
export function convertRows(rows,workingId,websiteId){
 if(!/^[a-z0-9-]+$/.test(websiteId))throw Error('Invalid website ID');
 const headers=rows[0];const column=(...names)=>names.map(n=>headers.indexOf(n)).find(i=>i>=0);
 const ix={id:column('Working Profile ID','Profile ID'),number:column('Section Number'),title:column('Section Title'),body:column('Content (HTML or Markdown)','Content (Markdown)')};
 if(Object.values(ix).some(x=>x===undefined))throw Error('Required columns are missing');
 const selected=rows.slice(1).filter(r=>r[ix.id]===workingId);
 if(selected.length!==15)throw Error(`Expected 15 sections; found ${selected.length}`);
 selected.sort((a,b)=>Number(a[ix.number])-Number(b[ix.number]));
 return selected.map((r,i)=>{if(Number(r[ix.number])!==i+1||r[ix.title]!==PROFILE_SECTION_NAMES[i])throw Error(`Incorrect section at position ${i+1}`);const body=r[ix.body]?.trim();if(!body)throw Error(`Empty section ${i+1}`);return {id:`${websiteId}-section-${i+1}`,name:r[ix.title],html:markdownToHtml(body)};});
}
export function writeDraft(sections,filename){fs.mkdirSync(path.dirname(filename),{recursive:true});fs.writeFileSync(filename,'// UNAPPROVED DRAFT — never register automatically.\nexport const sections = '+JSON.stringify(sections,null,2)+';\n');}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){const [csv,workingId,websiteId,output]=process.argv.slice(2);if(!csv||!workingId||!websiteId||!output){console.error('Usage: node scripts/import-profile.mjs sections.csv workingId websiteId output.js');process.exit(2);}const sections=convertRows(parseCSV(fs.readFileSync(csv,'utf8')),workingId,websiteId);writeDraft(sections,output);console.log('Wrote 15-section unapproved draft: '+output);}
