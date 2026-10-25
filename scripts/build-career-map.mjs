import fs from 'node:fs';
const ledger=JSON.parse(fs.readFileSync(new URL('../docs/launch-careers.json',import.meta.url),'utf8'));
const grouped=new Map();
for(const r of ledger.records){
 if(!grouped.has(r.sourceTitle))grouped.set(r.sourceTitle,{id:r.sourceKey,title:r.sourceTitle,pathways:[],reviewFlags:[],appearances:[]});
 const c=grouped.get(r.sourceTitle);
 if(c.id!==r.sourceKey)throw Error('Source key differs for identical title');
 c.pathways.push(r.sourcePathway);c.reviewFlags.push(...r.reviewFlags);c.appearances.push({sourceTitle:r.sourceTitle,sourcePathway:r.sourcePathway});
}
const entries=[...grouped.values()].map(c=>({...c,pathways:[...new Set(c.pathways)],reviewFlags:[...new Set(c.reviewFlags)]})).sort((a,b)=>a.title.localeCompare(b.title));
if(ledger.records.length!==192||entries.length!==182||new Set(entries.map(c=>c.id)).size!==182)throw Error('Inventory counts changed: review before rebuilding');
fs.writeFileSync(new URL('../assets/data/career-map.js',import.meta.url),'// Generated from docs/launch-careers.json; never filter by article status or production wave.\nexport const mapSource = '+JSON.stringify(ledger.source,null,2)+';\nexport const careerMap = '+JSON.stringify(entries,null,2)+';\n');
console.log('Preserved 192 source appearances across 182 exact titles.');
