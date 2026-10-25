import { careers } from '../../data/careers.js';
import { state } from '../state.js';
import { favorites } from '../favorites.js';
import { esc, money } from '../dom.js';
import { sonographerSections } from '../../data/sonographer.js';
export function sonographerProfile(){
  const c=careers.find(x=>x.id==='sonographer');
  const current=sonographerSections.find(x=>x.id===state.section)||sonographerSections[0];
  const fav=favorites.includes(c.id);
  const menus=sonographerSections.map(s=>`<button class="${current.id===s.id?'active':''}" onclick="state.section='${s.id}';render();" aria-current="${current.id===s.id?'true':'false'}">${esc(s.name)}</button>`).join('');
  const allContent=sonographerSections.map(s=>`<section class="print-section"><h2>${esc(s.name)}</h2>${s.html}</section>`).join('');
  return `<div class="wrap profile sonographer-profile"><button class="back" onclick="route('library')">← Back to career library</button>
 <div class="profilehead"><div><span class="tag">Diagnostic Services</span><h1>🩻 Diagnostic Medical Sonographer</h1><p class="intro">Uses diagnostic ultrasound technology to create images of internal anatomy, support clinical decisions, and care for patients.</p><div class="stats"><span class="stat">Ultrasound technology</span><span class="stat">Patient care</span><span class="stat">Medical imaging</span></div></div><div class="actions"><button class="btn small ${fav?'secondary':''}" onclick="toggleFav('sonographer')">${fav?'♥ Saved to favorites':'♡ Add to favorites'}</button><button class="btn secondary small" onclick="window.print()">⎙ Print full profile</button></div></div>
 <div class="facts"><div class="fact"><label>US median annual pay</label><b>$96,590</b><small>May 2025</small></div><div class="fact"><label>Common entry route</label><b>Associate degree</b><small>Other pathways exist</small></div><div class="fact"><label>Projected US growth</label><b>14%</b><small>2025–2035</small></div><div class="fact"><label>Profile last researched</label><b>Oct 2026</b><small>Sources in bibliography</small></div></div>
 <div class="profilegrid"><nav class="panel menu" aria-label="Sonographer career sections">${menus}</nav><article class="profileCard content"><div class="eyebrow">Explore the profession</div><h2>${esc(current.name)}</h2>${current.html}</article><aside class="profileCard related"><h3>Related careers</h3>${c.related.map(id=>careers.find(x=>x.id===id)).filter(Boolean).map(x=>`<button onclick="route('profile','${x.id}')">${x.icon} ${esc(x.name)} ↗</button>`).join('')}</aside></div>
 <div class="print-all">${allContent}</div></div>`;
}
