import { state } from './state.js';
import { $, money } from './dom.js';
import { setCount, toggleFav as updateFavorite } from './favorites.js';
import { home } from './views/home.js';
import { library, resultMarkup } from './views/library.js';
import { profile } from './views/profile.js';
function toggleFav(id) {
  updateFavorite(id);
  render();
}
function route(page,id){
  state.page=page;
  state.id=id||null;
  state.section='overview';
  render();
  window.scrollTo({
    top:0,behavior:'instant'
  });
  try{
    location.hash=page+(id?'/'+id:'')
  }catch(e){
  }
}
function navActive(){
  document.querySelectorAll('[data-nav]').forEach(x=>x.classList.toggle('current',x.dataset.nav===state.page));
  setCount()
}
function renderResults(){
  const r=$('results');
  if(r)r.innerHTML=resultMarkup();
  document.querySelectorAll('.rangevalue').forEach((e,i)=>e.textContent=i===0?`${state.yMin}–${state.yMax} years`:`${money(state.sMin)}–${money(state.sMax)}`)
}
function updateRange(which,value){
  state[which]=Number(value);
  if(state.yMin>state.yMax){
    if(which==='yMin')state.yMax=state.yMin;
    else state.yMin=state.yMax
  }if(state.sMin>state.sMax){
    if(which==='sMin')state.sMax=state.sMin;
    else state.sMin=state.sMax
  }for(const k of ['yMin','yMax','sMin','sMax']){
    const input=$({
      yMin:'ymin',yMax:'ymax',sMin:'smin',sMax:'smax'
    }[k]);
    if(input)input.value=state[k]
  }renderResults()
}
function resetFilters(){
  Object.assign(state,{
    query:'',path:'all',yMin:0,yMax:15,sMin:0,sMax:250000,sort:'az'
  });
  render()
}
function render(){
  const app=$('app');
  app.innerHTML=state.page==='home'?home():state.page==='profile'?profile():library();
  navActive();
  if(state.page==='library'||state.page==='favorites')renderResults()
}
// Inline template handlers use these explicit entry points; module internals stay private.
Object.assign(window, {
  state, route, render, renderResults, updateRange, resetFilters, toggleFav
});
const hash=location.hash.replace(/^#/,'').split('/');
if(['home','library','favorites','profile'].includes(hash[0])){
  state.page=hash[0];
  state.id=hash[1]||null
}render();
window.addEventListener('hashchange',()=>{
  const h=location.hash.replace(/^#/,'').split('/');
  if(['home','library','favorites','profile'].includes(h[0])&&(h[0]!==state.page||h[1]!==state.id)){
    state.page=h[0];
    state.id=h[1]||null;
    render()
  }
})
