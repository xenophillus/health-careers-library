import { careers } from '../../data/careers.js';
import { state } from '../state.js';
import { favorites } from '../favorites.js';
import { esc, money } from '../dom.js';
export function card(c){
  const fav=favorites.includes(c.id);
  return `<article class="careerCard"><div class="cardtop"><div class="careericon" aria-hidden="true">${c.icon}</div><button class="heart ${fav?'active':''}" onclick="toggleFav('${c.id}')" aria-label="${fav?'Remove':'Add'} ${esc(c.name)} ${fav?'from':'to'} favorites">${fav?'♥':'♡'}</button></div><span class="tag">${esc(c.path)}</span><h3>${esc(c.name)}</h3><div class="description">${esc(c.desc)}</div><div class="stats"><span class="stat">🎓 ~${c.years} years*</span><span class="stat">💵 ${money(c.salary)}*</span></div><div class="cardfoot"><span style="font-size:11px;color:var(--muted)">${esc(c.tags[0])}</span><button class="linkbtn" onclick="route('profile','${c.id}')">View profile ↗</button></div></article>`
}
