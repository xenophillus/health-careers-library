import { careers } from '../data/careers.js';
import { state } from './state.js';
import { favorites } from './favorites.js';
export function filtered(){
  let res=careers.filter(c=>(state.page!=='favorites'||favorites.includes(c.id))&&(!state.query||[c.name,c.path,c.desc,...c.tags].join(' ').toLowerCase().includes(state.query.toLowerCase()))&&(state.path==='all'||c.path===state.path)&&(Number.isFinite(c.years)?c.years>=state.yMin&&c.years<=state.yMax:(state.yMin===0&&state.yMax===15))&&(Number.isFinite(c.salary)?c.salary>=state.sMin&&c.salary<=state.sMax:(state.sMin===0&&state.sMax===250000)));
  if(state.sort==='salary')res.sort((a,b)=>b.salary-a.salary);
  else if(state.sort==='education')res.sort((a,b)=>a.years-b.years||b.salary-a.salary);
  else res.sort((a,b)=>a.name.localeCompare(b.name));
  return res
}
