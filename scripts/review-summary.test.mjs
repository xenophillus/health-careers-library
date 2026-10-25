import test from 'node:test';
import assert from 'node:assert/strict';
import {summarizeIntroduction} from './review-summary.mjs';
import {careers} from '../preview/assets/data/careers.js';
import {fullProfiles} from '../preview/assets/data/full-profiles.js';
import {draftProfiles} from '../preview/drafts/manifest.js';
import {draftToPublicId} from '../assets/data/career-integrity.js';

test('short summaries stay complete; longer summaries end at a sentence or word', () => {
  assert.equal(summarizeIntroduction('Complete introduction.'), 'Complete introduction.');
  assert.equal(summarizeIntroduction('First complete sentence. Another long sentence follows.', 30), 'First complete sentence…');
  assert.equal(summarizeIntroduction('Instrument sets being collected for sterilization', 25), 'Instrument sets being…');
});
test('all five generated article introductions retain the complete overview', async () => {
  for (const draft of draftProfiles) {
    const id = draftToPublicId[draft.id] || draft.id;
    const {sections} = await import('../preview/drafts/' + draft.id + '.js');
    const full = sections[0].html.replace(/<[^>]*>/g,' ').replace(/&(?:amp|nbsp);/g,' ').replace(/\s+/g,' ').trim();
    assert.equal(fullProfiles[id].intro, full, id);
    const summary = careers.find(c => c.id === id).desc;
    assert.equal(summary, summarizeIntroduction(full));
    assert.ok(summary.length <= 190);
    assert.ok(full.startsWith(summary.replace(/…$/, '')));
  }
});
