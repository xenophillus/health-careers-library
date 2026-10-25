import { careers } from '../../data/careers.js';
import { careerMedia } from '../../data/career-integrity.js';
import { state } from '../state.js';
import { favorites } from '../favorites.js';
import { esc, money } from '../dom.js';
import { sections } from '../../data/profile-sections.js';
import { library } from './library.js';
import { getFullProfile } from '../../data/full-profiles.js';
import { fullCareerProfile } from './full-career-profile.js';
export function profile(){
  const rich = getFullProfile(state.id);
  if(rich) return fullCareerProfile(rich);
  const c=careers.find(x=>x.id===state.id);
  if(!c)return library();
  const media=careerMedia[c.id];
  const photo=media ? `<figure class="career-figure"><img class="profile-career-photo" src="${esc(media.src)}" alt="${esc(media.alt)}"><figcaption>${esc(media.credit)}</figcaption></figure>` : '';
  const active=sections.find(s=>s[0]===state.section)||sections[0];
  let html='';
  switch(active[0]){
    case'overview':html=`<p>${esc(c.desc)}</p><p>Typical workplaces include ${esc(c.work.charAt(0).toLowerCase()+c.work.slice(1))}</p><h3>What makes this career interesting?</h3><p>${esc(c.qualities)}</p>`;
    break;
    case'duties':html='<ul>'+c.duties.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>';
    break;
    case'qualities':html=`<p>${esc(c.qualities)}</p>`;
    break;
    case'work':html=`<p>${esc(c.work)}</p>`;
    break;
    case'education':html=`<p>${esc(c.edu)}</p><p><strong>Illustrative years of training:</strong> approximately ${c.years}. Actual routes vary.</p>`;
    break;
    case'requirements':html=`<p>${esc(c.requirements)}</p>`;
    break;
    case'resources':html=`<p>For reliable research, consult the <a style="color:var(--teal);text-decoration:underline" target="_blank" rel="noopener" href="https://www.bls.gov/ooh/">Occupational Outlook Handbook</a> and <a style="color:var(--teal);text-decoration:underline" target="_blank" rel="noopener" href="https://www.onetonline.org/">O*NET OnLine</a>. Career-specific professional organizations and licensing boards will be added in the complete library.</p>`;
    break
  }return `<div class="wrap profile"><button class="back" onclick="route('library')">← Back to career library</button><div class="profilehead"><div><span class="tag">${esc(c.path)}</span><h1>${c.icon} ${esc(c.name)}</h1><p class="intro">${esc(c.desc)}</p><div class="stats">${c.tags.map(x=>`<span class="stat">${esc(x)}</span>`).join('')}</div></div>${photo}<div class="actions"><button class="btn small ${favorites.includes(c.id)?'secondary':''}" onclick="toggleFav('${c.id}')">${favorites.includes(c.id)?'♥ Saved to favorites':'♡ Add to favorites'}</button><button class="btn secondary small" onclick="window.print()">⎙ Print profile</button></div></div><div class="facts"><div class="fact"><label>Schooling*</label><b>~${c.years} years</b></div><div class="fact"><label>Annual salary*</label><b>${money(c.salary)}</b></div><div class="fact"><label>Pathway</label><b style="font-size:13px">${esc(c.path)}</b></div><div class="fact"><label>Career focus</label><b style="font-size:13px">${esc(c.tags.join(' · '))}</b></div></div><div class="profilegrid"><nav class="panel menu" aria-label="Career information sections">${sections.map(s=>`<button class="${active[0]===s[0]?'active':''}" onclick="state.section='${s[0]}';render();">${s[1]}</button>`).join('')}</nav><article class="profileCard content"><div class="eyebrow">Career information</div><h2>${active[1]}</h2>${html}</article><aside class="profileCard related"><h3>Discover related careers</h3>${c.related.map(id=>careers.find(x=>x.id===id)).filter(Boolean).map(x=>`<button onclick="route('profile','${x.id}')">${x.icon} ${esc(x.name)} ↗</button>`).join('')}</aside></div><div class="notice">* This prototype uses illustrative salary and education figures and abbreviated career information. Content is not yet verified for student-facing publication. Information varies by state, specialty, and training route.</div></div>`
}
