import {chromium} from 'playwright';
import {careerMap} from '../assets/data/career-map.js';
import {questions} from '../assets/js/assessment.js';
import assert from 'node:assert/strict';import fs from 'node:fs';
const base=process.env.ASSESSMENT_BASE_URL||'http://127.0.0.1:4173/';
fs.mkdirSync('qa-results/assessment',{recursive:true});
const checks=[];const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined});
try{
 for(const width of [1365,390]){
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[],posts=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()!=='GET')posts.push(r.url());});
  await page.goto(base+'#assessment');await page.locator('#assessment-heading').waitFor();
  check(width+' mobile and desktop assessment entry available',await page.locator('[data-nav=assessment]').isVisible());
  check(width+' initial full inventory promise',await page.locator('.assessment').innerText().then(x=>x.includes('192')&&x.includes('182')));
  await page.getByRole('button',{name:'Start exploring',exact:false}).click();
  check(width+' next disabled before choice',await page.locator('#assessment-next').isDisabled());
  await page.locator('input[value="2"]').focus();await page.keyboard.press('Space');
  check(width+' keyboard selection enables next',await page.locator('#assessment-next').isEnabled());
  await page.locator('#assessment-next').click();await page.getByRole('button',{name:'← Back',exact:true}).click();
  check(width+' back retains answer',await page.locator('input[value="2"]').isChecked());
  await page.locator('#assessment-next').click();
  for(let i=1;i<questions.length;i++){await page.locator(`input[value="${i>=8?2:0}"]`).check();await page.locator('#assessment-next').click();}
  check(width+' results reached',await page.locator('#assessment-heading').innerText()==='Pathways to explore');
  check(width+' expected strongest pathway',await page.locator('.pathway-matches h2').first().innerText()==='Biotechnology Research and Development');
  check(width+' all inventory remains eligible',await page.locator('#map-count').innerText().then(x=>x.startsWith('182 of 182')));
  check(width+' explanations and method present',await page.locator('.pathway-matches').innerText().then(x=>x.includes('scientific research'))&&await page.locator('details summary').count()===1);
  check(width+' focus moved to heading',await page.evaluate(()=>document.activeElement.id)==='assessment-heading');
  const seen=[];
  for(let i=0;i<10;i++){seen.push(...await page.locator('.map-card h3').allTextContents());const next=page.getByRole('button',{name:'Next 20 →'});if(await next.isDisabled())break;await next.click();}
  check(width+' all 182 entries reachable through pagination',new Set(seen).size===182);
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  await page.locator('#map-search').fill('Genetic Counselor Histotechnician');
  check(width+' flagged source discoverable',await page.locator('.map-card').count()===1&&await page.locator('.source-note').isVisible());
  await page.locator('.map-card button').click();
  check(width+' ambiguous title honestly explained',await page.locator('.assessment').innerText().then(x=>x.includes('not yet mapped')));
  await page.goBack();await page.locator('#map-results').waitFor();
  check(width+' browser back restores results',await page.locator('#assessment-heading').innerText()==='Pathways to explore');
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  await page.locator('#map-path').selectOption('Support Services');
  check(width+' pathway filtering preserves all source memberships',await page.locator('#map-count').innerText().then(x=>x.startsWith('21 of 182')));
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`qa-results/assessment/assessment-results-${width}.png`,fullPage:false});
  check(width+' no overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  for(const c of careerMap){await page.evaluate(id=>window.route('career-map',id),c.id);check(width+' entry '+c.id,await page.locator('#assessment-heading').innerText()===c.title);const href=await page.locator('a[href*="mynextmove.org"]').getAttribute('href');assert.equal(new URL(href).searchParams.get('s'),c.title);}
  check(width+' no answer storage or upload',posts.length===0&&await page.evaluate(()=>localStorage.length===0&&sessionStorage.length===0));
  await page.evaluate(()=>window.route('assessment','results'));await page.getByRole('button',{name:'Clear answers and restart',exact:true}).click();
  check(width+' reset clears choices',await page.locator('input:checked').count()===0);
  for(let i=0;i<questions.length;i++)await page.getByRole('button',{name:'Skip for now',exact:true}).click();
  check(width+' skipped questions are labeled as completed',await page.locator('.assessment').innerText().then(x=>x.includes('10 of 10 questions completed (including any skipped)')&&!x.includes('questions answered')));
  check(width+' all unsure gives no false match',await page.locator('#assessment-heading').innerText()==='Keep exploring your interests');
  check(width+' unsure still includes all titles',await page.locator('#map-count').innerText().then(x=>x.startsWith('182 of 182')));
  await page.getByRole('button',{name:'Clear answers and restart',exact:true}).click();
  for(let i=0;i<questions.length;i++){await page.locator('input[value="-1"]').check();await page.locator('#assessment-next').click();}
  check(width+' all-negative narrows to zero with recovery',await page.locator('#map-count').innerText().then(x=>x.startsWith('0 of 182')));
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  check(width+' show all restores every hidden title',await page.locator('#map-count').innerText().then(x=>x.startsWith('182 of 182')));
  await page.getByRole('button',{name:'Apply my answer filters',exact:true}).click();
  check(width+' filters can be reapplied without restart',await page.locator('#map-count').innerText().then(x=>x.startsWith('0 of 182')));
  await page.getByRole('button',{name:'Show every entry',exact:true}).click();
  check(width+' hidden reasons visible',await page.locator('.map-card .source-note').first().innerText().then(x=>x.includes('Hidden by your answers')));
  await page.getByRole('button',{name:'Review answers',exact:true}).click();
  check(width+' showing hidden preserves original answers',await page.locator('input[value="-1"]').isChecked());
  await page.locator('input[value="0"]').check();await page.evaluate(()=>window.route('assessment','results'));
  check(width+' answer change keeps uncertain pathway open',await page.locator('.assessment').innerText().then(x=>!x.includes('182 are hidden')));
  await page.reload();await page.locator('#assessment-heading').waitFor();
  check(width+' refresh clears answers safely',await page.locator('.assessment').innerText().then(x=>x.includes('0 of 10 questions completed')));
  await page.evaluate(()=>window.route('assessment','1'));await page.screenshot({path:`qa-results/assessment/assessment-question-${width}.png`});
  check(width+' no browser errors',errors.length===0);await page.close();
 }
}finally{await browser.close();}
fs.writeFileSync('qa-results/assessment/full-assessment-qa.json',JSON.stringify({base,count:checks.length,checks},null,2)+'\n');console.log('PASS '+checks.length+' full-inventory browser checks');
