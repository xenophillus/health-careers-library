import fs from 'node:fs';
import { convertRows, writeDraft } from './import-profile.mjs';

// Read-only source. Sheets API key must have permission to view the workbook.
// Never commit credentials, never publish without editorial approval.
const SHEET_ID=process.env.SHEET_ID;
const key=process.env.GOOGLE_SHEETS_API_KEY;
if(!SHEET_ID || !key) {
 console.error('Google Sheets sync not configured. Set SHEET_ID and GOOGLE_SHEETS_API_KEY GitHub Actions secret.');
 process.exit(2);
}
async function sheet(name,range){
 const a1=encodeURIComponent("'"+name+"'!"+range);
 const url=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(SHEET_ID)}/values/${a1}?key=${encodeURIComponent(key)}`;
 const response=await fetch(url);
 if(!response.ok)throw Error(`Google Sheets read failed for ${name}: HTTP ${response.status}. Check workbook visibility and credentials.`);
 const data=await response.json();return data.values||[];
}
const profiles=await sheet('Career Profiles','A1:G250');
const rows=await sheet('Article Sections','A1:F3000');
const header=profiles[0]||[];
const id=header.indexOf('Working Profile ID'),title=header.indexOf('Career Title'),status=header.indexOf('Editorial Status'),webId=header.indexOf('Website Career ID');
if([id,title,status,webId].some(i=>i<0))throw Error('Career Profiles column headers changed');
let count=0;
for(const profile of profiles.slice(1)){
 const workingId=profile[id],websiteId=profile[webId];
 if(!workingId||!websiteId)continue;
 if(profile[status]==='Not started')continue;
 if(profile[status]==='Approved')continue; // reviewed publishing requires a separate manual process
 if(profile[status]!=='Draft'&&profile[status]!=='Fact check'&&profile[status]!=='QA')continue;
 const selected=rows.slice(1).filter(r=>r[0]===workingId);
 if(selected.length!==14 || selected.some(r=>!r[3]?.trim()))continue; // unfinished profiles are tracked in Sheets
 const sections=convertRows(rows,workingId,websiteId);
 writeDraft(sections,`assets/data/drafts/${websiteId}.js`);
 count++;
}
console.log(`Exported ${count} complete unapproved profile drafts. No published registry modified.`);
