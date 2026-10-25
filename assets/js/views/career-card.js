import { careers } from '../../data/careers.js';
import { state } from '../state.js';
import { favorites } from '../favorites.js';
import { esc, money } from '../dom.js';
import { careerMedia } from '../../data/career-integrity.js';
export function card(c){
  const fav=favorites.includes(c.id);
  const media=careerMedia[c.id];
  const artwork=media ? `<div class="career-visual"><img class="career-photo" src="${esc(media.src)}" alt="${esc(media.alt)}" loading="lazy"><span class="career-emoji-overlay" aria-hidden="true">${c.icon}</span></div>` : `<div class="careericon" aria-hidden="true">${c.icon}</div>`;
  return `<article class="careerCard"><div class="cardtop">${artwork}<button class="heart ${fav?'active':''}" onclick="toggleFav('${c.id}')" aria-label="${fav?'Remove':'Add'} ${esc(c.name)} ${fav?'from':'to'} favorites">${fav?'♥':'♡'}</button></div><span class="tag">${esc(c.path)}</span><h3>${esc(c.name)}</h3><div class="description">${esc(c.desc)}</div><div class="stats"><span class="stat">🎓 ${Number.isFinite(c.years)?'~'+c.years+' years*':'See training section'}</span><span class="stat">💵 ${Number.isFinite(c.salary)?money(c.salary)+'*':'See salary section'}</span></div><div class="cardfoot"><span style="font-size:11px;color:var(--muted)">${esc(c.tags[0])}</span><button class="linkbtn" onclick="route('profile','${c.id}')">View profile ↗</button></div></article>`
}
