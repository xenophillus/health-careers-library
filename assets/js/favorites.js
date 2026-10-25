import { careers } from '../data/careers.js';
import { $ } from './dom.js';
export let favorites=[];
try{
  favorites=JSON.parse(localStorage.getItem('hcl-favorites')||'[]');
  if(!Array.isArray(favorites))favorites=[];
  favorites=[...new Set(favorites.filter(id=>typeof id==='string'))]
}catch(e){
}
export function saveFav(){
  try{
    localStorage.setItem('hcl-favorites',JSON.stringify(favorites))
  }catch(e){
  }setCount()
}export function setCount(){
  const x=$('favCount');
  if(x)x.textContent=favorites.filter(id=>careers.some(c=>c.id===id)).length
}export function toggleFav(id){
  if(!careers.some(c=>c.id===id))return;
  favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];
  saveFav()
}
