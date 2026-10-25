// Exercise the released runtime with candidate data in a disposable copy.
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'hcl-evidence-'));
try{
 await fs.cp(new URL('../../assets',import.meta.url),path.join(dir,'assets'),{recursive:true});
 await fs.copyFile(new URL('./career-attributes.js',import.meta.url),path.join(dir,'assets/data/career-attributes.js'));
 const {filterCareerEntries}=await import(pathToFileURL(path.join(dir,'assets/js/assessment.js')));
 const hidden=(a,e)=>filterCareerEntries(a,e).filter(x=>x.hidden).map(x=>x.id).sort();
 assert.equal(filterCareerEntries({}).length,182);
 assert.deepEqual(hidden({blood:-1},['blood']),['phlebotomist']);
 assert.deepEqual(hidden({emergencies:-1},['emergencies']),['athletictrainer','emergencymedicaltechnician','paramedic']);
 assert.deepEqual(hidden({blood:-1,emergencies:-1},[]),[]);
 assert.deepEqual(hidden({blood:0,emergencies:0},['blood','emergencies']),[]);
 assert.equal(filterCareerEntries({emergencies:-1},['emergencies'],['athletictrainer']).find(x=>x.id==='athletictrainer').hidden,false);
 for(const id of ['physicianmddo','registerednurse','geneticcounselorhistotechnician'])assert.equal(filterCareerEntries({blood:-1,emergencies:-1},['blood','emergencies']).find(x=>x.id===id).hidden,false);
 console.log('PASS candidate data/released-runtime smoke: full map, explicit exclusions, unknowns, unsure, ordinary avoidance and restoration.');
}finally{await fs.rm(dir,{recursive:true,force:true});}
