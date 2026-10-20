import { $ } from './dom.js';
export let favorites=[];
try{
  favorites=JSON.parse(localStorage.getItem('hcl-favorites')||'[]');
  if(!Array.isArray(favorites))favorites=[]
}catch(e){
}
export function saveFav(){
  try{
    localStorage.setItem('hcl-favorites',JSON.stringify(favorites))
  }catch(e){
  }setCount()
}export function setCount(){
  const x=$('favCount');
  if(x)x.textContent=favorites.length
}export function toggleFav(id){
  favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];
  saveFav()
}
