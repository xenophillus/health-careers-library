import { careers } from '../../data/careers.js';
import { card } from './career-card.js';
import { esc } from '../dom.js';

// Add an entry only after its career ID, image rights, and source URL have been verified.
const featuredMedia = [
  { id:'sonographer', label:'Medical imaging', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Medical_ultrasound_examination.JPG?width=900', alt:'A healthcare professional conducting an ultrasound examination', source:'https://commons.wikimedia.org/wiki/File:Medical_ultrasound_examination.JPG', credit:'U.S. Air Force' },
  { id:'vet-technician', label:'Animal care', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Vet_examines_dog.jpg?width=650', alt:'Veterinary technician checking a dog', source:'https://commons.wikimedia.org/wiki/File:Vet_examines_dog.jpg', credit:'U.S. Air Force' },
  { id:'medical-lab-scientist', label:'Laboratory science', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Medical_Laboratory_Scientist_US_NIH.jpg?width=650', alt:'Medical laboratory scientist working at a laboratory bench', source:'https://commons.wikimedia.org/wiki/File:Medical_Laboratory_Scientist_US_NIH.jpg', credit:'NIH' }
];
const eligibleMedia = featuredMedia.filter(item => careers.some(c => c.id === item.id));
// Choose once per page load: navigating away and back will not reshuffle.
const shuffledMedia = [...eligibleMedia];
for(let i=shuffledMedia.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [shuffledMedia[i],shuffledMedia[j]]=[shuffledMedia[j],shuffledMedia[i]];
}
const featuredSelection = shuffledMedia.slice(0,3);
function featuredCareer(item,i){
 const career=careers.find(c=>c.id===item.id);
 return `<div class="hero-career ${i===0?'hero-career-main':''}"><button type="button" onclick="route('profile','${item.id}')" aria-label="Explore ${esc(career.name)}"><img src="${item.image}" alt="${esc(item.alt)}" loading="${i===0?'eager':'lazy'}"><span class="hero-career-caption"><strong>${esc(career.name)}</strong><small>${esc(item.label)}</small></span></button><a class="hero-photo-credit" href="${item.source}" target="_blank" rel="noopener noreferrer" aria-label="Photograph credit and source for ${esc(career.name)}">Photo: ${esc(item.credit)} ↗</a></div>`;
}
export function home(){
  return `<div class="wrap"><section class="hero"><div><div class="eyebrow">Your future in health & science</div><h1>Explore what<br><em>you could become.</em></h1><p class="lede">From caring for animals to developing life-changing technology, there's a whole world of careers to discover. Find the paths that spark your curiosity.</p><div class="actions"><button class="btn" onclick="route('library')">Explore careers ↗</button><button class="btn secondary" onclick="alert('Coming in Phase 2: an adaptive self-assessment that recommends careers based on your interests and preferences.')">✨ Find my match</button></div><p class="footnote">Explore sample profiles · Save favorites · No account needed</p></div><div class="hero-careers" aria-label="Explore featured health careers">
  <div class="hero-careers-heading"><span>Explore real careers</span><span aria-hidden="true">↗</span></div>
  <div class="hero-career-grid">${featuredSelection.map(featuredCareer).join('')}</div>
</div></section><section class="section"><div class="sectionhead"><div><div class="eyebrow">Made for curious minds</div><h2>Many paths. One place to explore.</h2><p>Follow what interests you and see where it leads.</p></div></div><div class="featuregrid"><div class="feature"><div class="symbol">🔎</div><h3>Search & discover</h3><p>Browse careers and filter by schooling, salary and health science pathway.</p></div><div class="feature"><div class="symbol">💚</div><h3>Save what inspires you</h3><p>Favorite interesting careers and return to them as you explore.</p></div><div class="feature"><div class="symbol">🧭</div><h3>Go beyond the title</h3><p>Learn what professionals do, where they work and how they prepare for their careers.</p></div></div></section><section class="section"><div class="sectionhead"><div><div class="eyebrow">A few starting points</div><h2>Careers worth exploring</h2></div><button class="btn secondary small" onclick="route('library')">See all →</button></div><div class="cards">${careers.slice(0,4).map(card).join('')}</div></section></div>`
}
