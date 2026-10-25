// Smoke-test the real directory UI with unpublished editorial drafts integrated.
import fs from 'node:fs';
import {chromium} from 'playwright';
import {draftProfiles} from '../preview/drafts/manifest.js';
import {draftToPublicId} from '../assets/data/career-integrity.js';
const base=process.env.PREVIEW_BASE_URL||'http://127.0.0.1:4173/preview/';
const checks=[], browser=await chromium.launch();
const note=(name,ok,detail='')=>checks.push({name,ok,detail:String(detail)});
try{
 for(const viewport of [{width:1365,height:900},{width:390,height:844}]){
  const page=await browser.newPage({viewport});
  const tag=viewport.width<500?'mobile':'desktop';
  const faults=[];page.on('pageerror',e=>faults.push(e.message));
  try{
   const response=await page.goto(base+'library.html#library',{waitUntil:'domcontentloaded'});
   await page.locator('.careerCard').first().waitFor({timeout:12000});
   note(tag+' loads',response.status()===200);
   note(tag+' one track per range filter',await page.locator('.dual-range').count()===2);
   await page.locator('#ymin').evaluate(el=>{el.value='4';el.dispatchEvent(new Event('input',{bubbles:true}));});
   await page.locator('#ymax').evaluate(el=>{el.value='6';el.dispatchEvent(new Event('input',{bubbles:true}));});
   note(tag+' unified schooling range responds',await page.locator('.rangevalue').first().innerText()==='4–6 years');
   await page.locator('#smin').evaluate(el=>{el.value='40000';el.dispatchEvent(new Event('input',{bubbles:true}));});
   await page.locator('#smax').evaluate(el=>{el.value='80000';el.dispatchEvent(new Event('input',{bubbles:true}));});
   note(tag+' unified salary range responds',(await page.locator('.rangevalue').nth(1).innerText()).includes('$40,000')&&(await page.locator('.rangevalue').nth(1).innerText()).includes('$80,000'));
   await page.evaluate(()=>window.resetFilters());
   const cards=page.locator('.careerCard');
   note(tag+' has 6 revised career cards',await cards.count()===6);
   const labels=await cards.locator('h3').allInnerTexts();
   note(tag+' retains reviewed Sonographer model',labels.some(x=>x==='Diagnostic Medical Sonographer'));
   note(tag+' excludes trial-only careers',!labels.some(x=>['Veterinarian','Veterinary Technician','Radiologic Technologist','Registered Nurse','Respiratory Therapist','Medical Laboratory Scientist','Physician','Biomedical Engineer','Health Information Technician','Community Health Worker'].includes(x)));
   note(tag+' no repeated visible occupation names',new Set(labels).size===labels.length);
   note(tag+' one EMT listing',labels.filter(n=>n==='Emergency Medical Technician').length===1);
   note(tag+' no false zero-year/zero-salary placeholders',!(await page.locator('#results').innerText()).includes('$0')&&!(await page.locator('#results').innerText()).includes('~0 years'));
   note(tag+' no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
   const photos=page.locator('.career-photo');
   note(tag+' six career photographs present',await photos.count()===6);
   note(tag+' career photographs load',await photos.evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0)));

   for(const draft of draftProfiles){
    const id=draftToPublicId[draft.id]||draft.id;
    await page.evaluate(id=>window.route('profile',id),id);
    await page.locator('.full-career-profile .menu button').first().waitFor({timeout:8000});
    const buttons=page.locator('.full-career-profile .menu button');
    note(tag+' '+id+' has 15 sections',await buttons.count()===15);
    await buttons.nth(14).click();
    note(tag+' '+id+' bibliography navigation',(await page.locator('.full-career-profile .content h2').innerText()).includes('Bibliography'));
    await page.screenshot({path:'qa-results/browser/integrated-'+id+'-'+tag+'.png',fullPage:true});
   }
   note(tag+' no browser exceptions',faults.length===0,faults.join('; '));
  }catch(e){note(tag+' completed',false,e.message);}
  finally{await page.close();}
 }
}finally{await browser.close();}
fs.mkdirSync('qa-results',{recursive:true});
const fail=checks.filter(x=>!x.ok);
const md=['# Integrated preview UI QA','','Checks: '+checks.length+'. Failures: '+fail.length+'.',...fail.map(x=>'- FAIL '+x.name+': '+x.detail),...(fail.length?[]:['- All integration UI checks passed.'])].join('\n');
fs.writeFileSync('qa-results/integrated-browser-qa.md',md+'\n');
fs.writeFileSync('qa-results/integrated-browser-qa.json',JSON.stringify({checks},null,2)+'\n');
console.log(md);
if(fail.length)process.exitCode=1;
