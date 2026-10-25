import {chromium} from 'playwright';
import {careerMap} from '../assets/data/career-map.js';
import {questions} from '../assets/js/assessment.js?v=preferences-2';
import assert from 'node:assert/strict';import fs from 'node:fs';
const base=process.env.ASSESSMENT_BASE_URL||'http://127.0.0.1:4173/';
const out='qa-results/assessment';fs.mkdirSync(out,{recursive:true});
const checks=[];const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined});
try{
 for(const width of [1365,390]){
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[],posts=[],stale=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()!=='GET')posts.push(r.url());});
  // Simulate stale old assessment modules. New release URLs must avoid these cached identities.
  await page.route('**/assets/**/*.js*',async route=>{
   const url=new URL(route.request().url());
   if(/\/(app|assessment|assessment-questions|career-attributes)\.js$/.test(url.pathname)&&!url.searchParams.has('v')){
    stale.push(url.pathname);await route.fulfill({contentType:'text/javascript',body:'throw new Error("STALE ASSESSMENT MODULE");'});
   }else await route.continue();
  });
  await page.goto(base+'#assessment');await page.locator('#assessment-heading').waitFor();
  check(width+' new version and25 question intro',await page.locator('.assessment').innerText().then(x=>x.includes('25 questions')&&x.includes('v2.0')));
  check(width+' mobile assessment nav visible',await page.locator('[data-nav=assessment]').isVisible());
  await page.getByRole('button',{name:'Start exploring',exact:false}).click();
  check(width+' next disabled before choice',await page.locator('#assessment-next').isDisabled());
  await page.locator('input[value="2"]').focus();await page.keyboard.press('Space');
  check(width+' radio does not auto-advance',await page.locator('.assessment .eyebrow').textContent().then(x=>x.includes('Question 1 of 25')));
  await page.getByRole('button',{name:'Explore with my answers so far',exact:true}).click();
  check(width+' early results preserve full map',await page.locator('#map-count').innerText().then(x=>x.startsWith('182 of 182')));
  await page.getByRole('button',{name:'Review answers',exact:true}).click();
  check(width+' early exploration retains answer',await page.locator('input[value="2"]').isChecked());
  await page.locator('#assessment-next').click();await page.getByRole('button',{name:'← Back',exact:true}).click();
  check(width+' back preserves answer',await page.locator('input[value="2"]').isChecked());
  await page.locator('#assessment-next').click();
  for(let i=1;i<questions.length;i++){
   const q=questions[i];const value=['blood','emergencies'].includes(q.id)?-1:0;
   await page.locator(`input[value="${value}"]`).check();
   if(q.exclusionLabel){check(width+' '+q.id+' hide is optional unchecked',!(await page.locator('#assessment-exclude').isChecked()));await page.locator('#assessment-exclude').check();}
   await page.locator('#assessment-next').click();
  }
  check(width+' full25 flow completed',await page.locator('.assessment').innerText().then(x=>x.includes('25 of 25 questions completed')));
  check(width+' only three source-confirmed entries excluded',await page.locator('#map-count').innerText().then(x=>x.startsWith('179 of 182')));
  await page.getByText('Why entries are hidden',{exact:true}).click();
  check(width+' hidden explanations and sources',await page.locator('details').filter({has:page.getByText('Why entries are hidden',{exact:true})}).locator('a').count()===3);
  await page.getByRole('button',{name:'Keep Paramedic in my options',exact:true}).click();
  check(width+' individual restore is independent',await page.locator('#map-count').innerText().then(x=>x.startsWith('180 of 182')));
  await page.getByRole('button',{name:'Apply my answer filters',exact:true}).click();
  check(width+' reapply restores selected exclusions',await page.locator('#map-count').innerText().then(x=>x.startsWith('179 of 182')));
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  check(width+' show all restores all182',await page.locator('#map-count').innerText().then(x=>x.startsWith('182 of 182')));
  await page.locator('#map-search').fill('Phlebotomist');
  check(width+' hidden entry visible with reason in show-all',await page.locator('.map-card').innerText().then(x=>x.includes('Hidden by your optional hide setting')));
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  const seen=[];for(let i=0;i<10;i++){seen.push(...await page.locator('.map-card h3').allTextContents());const next=page.getByRole('button',{name:'Next 20 →'});if(await next.isDisabled())break;await next.click();}
  check(width+' every exact source title paginates',new Set(seen).size===182);
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  await page.locator('#map-search').fill('Genetic Counselor Histotechnician');await page.locator('.map-card button').click();
  check(width+' ambiguous title preserved honestly',await page.locator('.assessment').innerText().then(x=>x.includes('not yet mapped')));
  await page.goBack();await page.locator('#map-results').waitFor();
  check(width+' browser back keeps results',await page.locator('.assessment').innerText().then(x=>x.includes('25 of 25 questions completed')));
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  await page.locator('#map-search').fill('no-such-career-xyz');check(width+' no-result search recovery',await page.locator('#map-count').innerText().then(x=>x.startsWith('0 of 182')));
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:out+`/preferences-results-${width}.png`});
  check(width+' no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  for(const c of careerMap){await page.evaluate(id=>window.route('career-map',id),c.id);check(width+' entry '+c.id,await page.locator('#assessment-heading').innerText()===c.title);assert.equal(new URL(await page.locator('a[href*="mynextmove.org"]').getAttribute('href')).searchParams.get('s'),c.title);}
  await page.evaluate(step=>window.route('assessment',String(step)),questions.findIndex(q=>q.id==='blood')+1);
  check(width+' checked exclusion retained when returning',await page.locator('#assessment-exclude').isChecked());
  await page.locator('input[value="0"]').check();check(width+' unsure hides optional control',await page.locator('#exclusion-control').isHidden());
  await page.locator('input[value="-1"]').check();check(width+' changing away cleared exclusion',!(await page.locator('#assessment-exclude').isChecked()));
  await page.screenshot({path:out+`/preferences-blood-${width}.png`});
  await page.getByRole('button',{name:'Clear answers and restart',exact:true}).click();check(width+' reset clears choices',await page.locator('input:checked').count()===0);
  for(let i=0;i<questions.length;i++)await page.getByRole('button',{name:'Skip for now',exact:true}).click();
  check(width+' all skips neutral and count honest',await page.locator('.assessment').innerText().then(x=>x.includes('25 of 25 questions completed (including any skipped)'))&&await page.locator('#map-count').innerText().then(x=>x.startsWith('182 of 182')));
  check(width+' no answer persistence or upload',posts.length===0&&await page.evaluate(()=>localStorage.length===0&&sessionStorage.length===0));
  await page.reload();await page.locator('#assessment-heading').waitFor();check(width+' reload clears memory',await page.locator('.assessment').innerText().then(x=>x.includes('0 of 25 questions completed')));
  await page.evaluate(()=>window.route('assessment','1'));await page.screenshot({path:out+`/preferences-question-${width}.png`});
  check(width+' changed module URLs avoid stale versions',stale.length===0);
  check(width+' no browser errors',errors.length===0);await page.close();
 }
}finally{await browser.close();}
fs.writeFileSync(out+'/preferences-qa.json',JSON.stringify({base,count:checks.length,checks},null,2)+'\n');console.log('PASS '+checks.length+' preference explorer browser checks');
