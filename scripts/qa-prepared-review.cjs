// Review-only Chromium checks. No service writes or production mutation.
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
(async()=>{
 const out=process.env.QA_OUTPUT||'qa-audit/pilot-repair-evidence';fs.mkdirSync(out,{recursive:true});
 const base=process.env.PREVIEW_BASE_URL||'http://127.0.0.1:4184/preview/';
 const {draftProfiles}=await import('../preview/drafts/manifest.js');
 const {draftToPublicId}=await import('../assets/data/career-integrity.js');
 const {PROFILE_SECTION_NAMES}=await import('../assets/data/profile-standard.js');
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const results=[];
 try{for(const surface of ['simple','integrated'])for(const width of [1365,390])for(const p of draftProfiles){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const publicId=draftToPublicId[p.id]||p.id;
  await page.goto(base+(surface==='simple'?'?career='+p.id:'library.html#profile/'+publicId),{waitUntil:'networkidle'});
  const nav=page.locator(surface==='simple'?'#section-menu button':'.full-career-profile .menu button');
  await nav.first().waitFor();const fails=[];
  if(await nav.count()!==15)fails.push('section count');
  for(let i=0;i<15;i++){
   await nav.nth(i).click();
   const body=page.locator(surface==='simple'?'#section-content':'.full-career-profile .content');
   if((await body.locator('h2').innerText())!==PROFILE_SECTION_NAMES[i])fails.push('heading '+i);
   if(await nav.nth(i).getAttribute('aria-current')!=='true')fails.push('selection '+i);
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))fails.push('overflow section '+i);
  }
  await nav.nth(1).click();
  const screenBody=page.locator(surface==='simple'?'#section-content':'.full-career-profile .content');
  await screenBody.locator('.review-career-figure img').waitFor();
  const figure=await screenBody.locator('.review-career-figure').evaluate(f=>{const i=f.querySelector('img'),r=i.getBoundingClientRect();return {loaded:i.complete&&i.naturalWidth>0,alt:i.alt,caption:f.querySelector('figcaption').innerText,fit:getComputedStyle(i).objectFit,width:r.width,height:r.height,source:i.getAttribute('src')};});
  if(!figure.loaded||!figure.alt||figure.caption.length<80||figure.fit!=='contain')fails.push('image context/load');
  await page.screenshot({path:`${out}/${p.id}-${surface}-${width}.png`,fullPage:true});
  // Keyboard-operate the next section, then return to Duties.
  await nav.nth(2).focus();await page.keyboard.press('Enter');
  if(await nav.nth(2).getAttribute('aria-current')!=='true')fails.push('keyboard activation');
  await nav.nth(1).click();
  if(surface==='integrated'){
   const save=page.getByRole('button',{name:'♡ Add to favorites'});await save.click();
   if(!await page.getByRole('button',{name:'♥ Saved to favorites'}).count())fails.push('favorite add');
   await page.getByRole('button',{name:'♥ Saved to favorites'}).click();
  }
  let print;
  if(width===1365){
   await page.emulateMedia({media:'print'});
   print=await page.evaluate(surface=>{const container=document.querySelector(surface==='simple'?'#print-all':'.print-all');const figure=container.querySelector('.review-career-figure');return {sections:container.querySelectorAll('section').length,visible:getComputedStyle(container).display!=='none',draft:getComputedStyle(document.querySelector('.preview-banner')).display!=='none',images:container.querySelectorAll('img').length,caption:figure?.querySelector('figcaption').innerText};},surface);
   if(print.sections!==15||!print.visible||!print.draft||print.images!==1)fails.push('full print');
   const file=`${out}/${p.id}-${surface}.pdf`;await page.pdf({path:file,format:'A4',printBackground:true,margin:{top:'12mm',bottom:'12mm',left:'12mm',right:'12mm'}});
   const text=execFileSync('pdftotext',[file,'-'],{encoding:'utf8'}).replace(/\s+/g,' ');
   for(const name of PROFILE_SECTION_NAMES)if(!text.includes(name))fails.push('PDF missing '+name);
   if(!/NOT APPROVED|NOT VERIFIED OR APPROVED/.test(text))fails.push('PDF draft label');
   if(!text.includes(figure.caption.replace(/\s+/g,' ')))fails.push('PDF caption/credit');
  }
  if(errors.length)fails.push(...errors);
  results.push({id:p.id,surface,width,figure,print,fails});await page.close();
 }}finally{await browser.close();}
 fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2)+'\n');
 const failed=results.filter(r=>r.fails.length);console.log(JSON.stringify({cases:results.length,sectionInstances:results.length*15,failed},null,2));if(failed.length)process.exitCode=1;
})();
