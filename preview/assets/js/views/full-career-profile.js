import { careers } from '../../data/careers.js';
import { careerMedia } from '../../data/career-integrity.js';
import { state } from '../state.js';
import { favorites } from '../favorites.js';
import { esc } from '../dom.js';

// Renders any reviewed, structured full profile. No occupation-specific logic here.
export function fullCareerProfile(profileData){
  const c=careers.find(x=>x.id===profileData.careerId);
  if(!c) return '';
  const sections=profileData.sections;
  const current=sections.find(x=>x.id===state.section)||sections[0];
  const fav=favorites.includes(c.id);
  const media=careerMedia[c.id];
  const photo=media ? `<figure class="career-figure"><img class="profile-career-photo" src="${esc(media.src)}" alt="${esc(media.alt)}"><figcaption>Photo: <a href="${esc(media.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(media.credit)}</a> · ${esc(media.license)}</figcaption></figure>` : '';
  const menus=sections.map(s=>`<button class="${current.id===s.id?'active':''}" onclick="state.section='${s.id}';render();" aria-current="${current.id===s.id?'true':'false'}">${esc(s.name)}</button>`).join('');
  const allContent=sections.map(s=>`<section class="print-section"><h2>${esc(s.name)}</h2>${s.html}</section>`).join('');
  const facts=profileData.facts.map(f=>`<div class="fact"><label>${esc(f.label)}</label><b>${esc(f.value)}</b>${f.detail?`<small>${esc(f.detail)}</small>`:''}</div>`).join('');
  return `<div class="wrap profile sonographer-profile full-career-profile"><button class="back" onclick="route('library')">← Back to career library</button>
 <div class="profilehead"><div><span class="tag">${esc(c.path)}</span><h1>${c.icon} ${esc(c.name)}</h1><p class="intro">${esc(profileData.intro)}</p><div class="stats">${profileData.tags.map(t=>`<span class="stat">${esc(t)}</span>`).join('')}</div></div>${photo}<div class="actions"><button class="btn small ${fav?'secondary':''}" onclick="toggleFav('${c.id}')">${fav?'♥ Saved to favorites':'♡ Add to favorites'}</button><button class="btn secondary small" onclick="window.print()">⎙ Print full profile</button></div></div>
 <div class="facts">${facts}</div>
 <div class="profilegrid"><nav class="panel menu" aria-label="Career information sections">${menus}</nav><article class="profileCard content"><div class="eyebrow">Explore the profession</div><h2>${esc(current.name)}</h2>${current.html}</article><aside class="profileCard related"><h3>Related careers</h3>${c.related.map(id=>careers.find(x=>x.id===id)).filter(Boolean).map(x=>`<button onclick="route('profile','${x.id}')">${x.icon} ${esc(x.name)} ↗</button>`).join('')}</aside></div>
 <div class="print-all">${allContent}</div></div>`;
}
