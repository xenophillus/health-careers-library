// Browser QA for private editorial drafts. Run with a local static server at PREVIEW_BASE_URL.
// Requires Playwright and Chromium. No public-site publication occurs here.
import fs from 'node:fs';
import {chromium} from 'playwright';
import {pathToFileURL} from 'node:url';

const base=process.env.PREVIEW_BASE_URL||'http://127.0.0.1:4173/preview/';
const {draftProfiles}=await import(pathToFileURL(process.cwd()+'/preview/drafts/manifest.js').href);
const out='qa-results/browser';
fs.mkdirSync(out,{recursive:true});
const checks=[];
const record=(career,device,check,ok,detail='')=>checks.push({career,device,check,ok,detail:String(detail).slice(0,350)});
const safe=s=>s.replace(/[^a-z0-9-]/gi,'-');
const browser=await chromium.launch({headless:true});
try{
 for(const device of [{name:'desktop',width:1365,height:900,isMobile:false},{name:'mobile',width:390,height:844,isMobile:true}]){
  const context=await browser.newContext({viewport:{width:device.width,height:device.height},isMobile:device.isMobile,hasTouch:device.isMobile,deviceScaleFactor:1});
  for(const profile of draftProfiles){
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   const url=base+'?career='+encodeURIComponent(profile.id);
   try{
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
    record(profile.id,device.name,'Page HTTP response',response?.status()===200,response?.status());
    const nav=page.locator('#section-menu button');
    await nav.first().waitFor({state:'visible',timeout:10000});
    record(profile.id,device.name,'15 navigation buttons',(await nav.count())===15);
    record(profile.id,device.name,'Correct career heading',(await page.locator('#career-title').innerText()).trim()===profile.title);
    let navigationOk=true;
    for(let index=0;index<15;index++){
     await nav.nth(index).click();
     const selected=nav.nth(index);
     const heading=(await selected.innerText()).replace(/^[0-9]+[.] +/,'').trim();
     const displayed=(await page.locator('#section-content h2').innerText()).trim();
     const isActive=(await selected.getAttribute('aria-current'))==='true';
     const hasBody=(await page.locator('#section-content .preview-body').innerText()).trim().length>20;
     if(heading!==displayed||!isActive||!hasBody){navigationOk=false;record(profile.id,device.name,'Section '+(index+1),false,'Heading/selection/body mismatch');}
    }
    record(profile.id,device.name,'All sections navigable',navigationOk);
    const screen=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
    record(profile.id,device.name,'No horizontal overflow',screen.scroll<=screen.viewport+2,JSON.stringify(screen));
    const anchors=await page.locator('#section-content a[href]').evaluateAll(nodes=>nodes.map(n=>({href:n.getAttribute('href'),target:n.target,rel:n.rel})));
    record(profile.id,device.name,'Source links structurally safe',anchors.every(a=>/^https:\/\//.test(a.href)&&a.target==='_blank'&&a.rel.includes('noopener')),'Links in last section: '+anchors.length);
    if(device.name==='mobile'){
      await page.locator('#career-select').selectOption(profile.id);
      record(profile.id,device.name,'Career selector works',await page.locator('#section-menu button').count()===15);
    }
    await nav.first().click();
    await page.screenshot({path:out+'/'+safe(profile.id)+'-'+device.name+'.png',fullPage:true});
    record(profile.id,device.name,'No uncaught browser exceptions',errors.length===0,errors.join('; '));
   }catch(err){
    record(profile.id,device.name,'Browser test completed',false,err.message);
    try{await page.screenshot({path:out+'/'+safe(profile.id)+'-'+device.name+'-failure.png',fullPage:true});}catch{}
   }finally{await page.close();}
  }
  await context.close();
 }
}finally{await browser.close();}
const failed=checks.filter(x=>!x.ok);
const report=['# Browser QA','',`Checked ${draftProfiles.length} draft profiles on desktop and mobile.`,`Checks: ${checks.length}. Failed: ${failed.length}.`,'',...checks.filter(x=>!x.ok).map(x=>'- FAIL '+x.career+' / '+x.device+' / '+x.check+': '+x.detail)];
if(!failed.length)report.push('All automated browser checks passed.');
fs.writeFileSync('qa-results/browser-qa.md',report.join('\n')+'\n');
fs.writeFileSync('qa-results/browser-qa.json',JSON.stringify({checks,failed:failed.length},null,2)+'\n');
console.log(report.join('\n'));
if(failed.length)process.exitCode=1;
