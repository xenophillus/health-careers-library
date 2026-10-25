// Generate the image registry from source-controlled data imported from the Media tab.
// Unreviewed images remain clearly marked for QA; metadata is required.
import fs from 'node:fs';
const file='assets/data/career-integrity.js';
const catalog=JSON.parse(fs.readFileSync('assets/data/career-images.json','utf8'));
const entries=Object.fromEntries(catalog.map(({id,src,alt,credit,license,sourceUrl,verificationStatus})=>[id,{src,alt,credit,license,sourceUrl,verificationStatus}]));
const source=fs.readFileSync(file,'utf8');
const start=source.indexOf('export const careerMedia = Object.freeze(');
const end=source.indexOf(';',start);
if(start<0||end<0)throw Error('careerMedia declaration missing');
const updated=source.slice(0,start)+'export const careerMedia = Object.freeze('+JSON.stringify(entries,null,2)+')'+source.slice(end);
fs.writeFileSync(file,updated);
console.log('Generated media registry for '+catalog.length+' careers.');
