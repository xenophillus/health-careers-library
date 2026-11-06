// Explicit review holds for supplemental drafts, not NCHSE pathway assignments.
// Keep these articles in standalone draft QA. Integrating them into the legacy
// pilot directory needs a separate reviewed decision; publication is separate.
import {careers} from '../assets/data/careers.js';
import {draftToPublicId,draftPathways,healthSciencePathways} from '../assets/data/career-integrity.js';

export const reviewIntegrationHolds = Object.freeze({
  obgyn: 'Supplemental specialty draft; site grouping is undecided. Standalone editorial review only; excluded from this pilot directory and assessment.'
});

export function planReviewIntegration(drafts, options={}) {
  const existing=options.careers??careers;
  const aliases=options.aliases??draftToPublicId;
  const pathways=options.pathways??draftPathways;
  const allowedPathways=options.allowedPathways??healthSciencePathways;
  const holds=options.holds??reviewIntegrationHolds;
  const existingIds=new Set(existing.map(c=>c.id));
  const used=new Set();
  return drafts.map(draft=>{
    if(!/^[a-z0-9-]+$/.test(draft.id))throw Error('Invalid draft identity '+draft.id);
    const id=Object.hasOwn(aliases,draft.id)?aliases[draft.id]:draft.id;
    if(used.has(id))throw Error('Duplicate draft identity '+id);
    used.add(id);
    const pathway=Object.hasOwn(pathways,draft.id)?pathways[draft.id]:null;
    const holdReason=Object.hasOwn(holds,draft.id)?holds[draft.id]:null;
    if(holdReason){
      if(existingIds.has(id)||pathway)throw Error('Review-only draft conflicts with existing career or pathway: '+draft.id);
      return {draft,id,pathway:null,holdReason};
    }
    if(!pathway)throw Error('No pathway for '+draft.id);
    if(!allowedPathways.includes(pathway))throw Error('Invalid pathway for '+draft.id+': '+pathway);
    return {draft,id,pathway,holdReason:null};
  });
}
