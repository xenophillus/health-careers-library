import fs from 'node:fs';
const source=fs.readFileSync(new URL('../research/attributes/career-attributes.js',import.meta.url),'utf8');
const ledger=JSON.parse(fs.readFileSync(new URL('../research/attributes/career-evidence.json',import.meta.url)));
const mappings=Object.fromEntries(ledger.records.map(r=>[r.id,r.mapping]));
fs.writeFileSync(new URL('../assets/data/career-attributes.js',import.meta.url),source.replace('// Candidate data export; not imported by the live application. See README.md.','// Generated from research/attributes/; run scripts/sync-career-attributes.mjs.')+'\nexport const careerAttributeMappings = '+JSON.stringify(mappings,null,2)+';\n');
