import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProfiles } from './validate-profiles.mjs';
import { PROFILE_SECTION_NAMES } from '../assets/data/profile-standard.js';

const career = [{ id: 'sample' }];
const makeProfile = () => ({
  careerId: 'sample',
  intro: 'A useful career overview.',
  tags: ['Care'],
  facts: [{ label: 'Pathway', value: 'Therapeutic Services' }],
  sections: PROFILE_SECTION_NAMES.map((name, i) => ({
    id: `section-${i}`, name, html: i === 13
      ? '<ol><li><a href="https://www.bls.gov/">BLS</a></li></ol>'
      : '<p>Career-specific research will be inserted here.</p>'
  }))
});
test('accepts the complete standard', () => assert.deepEqual(validateProfiles({ sample: makeProfile() }, career), []));
test('rejects a missing tab', () => {
  const p = makeProfile(); p.sections.splice(4, 1);
  assert.ok(validateProfiles({ sample: p }, career).some(e => e.includes('expected 14')));
});
test('rejects a renamed tab', () => {
  const p = makeProfile(); p.sections[1].name = 'Other Duties';
  assert.ok(validateProfiles({ sample: p }, career).some(e => e.includes('section 2')));
});
test('rejects duplicate IDs', () => {
  const p = makeProfile(); p.sections[1].id = p.sections[0].id;
  assert.ok(validateProfiles({ sample: p }, career).some(e => e.includes('duplicate section ID')));
});
test('rejects a missing linked bibliography', () => {
  const p = makeProfile(); p.sections.at(-1).html = '<p>No links yet</p>';
  assert.ok(validateProfiles({ sample: p }, career).some(e => e.includes('bibliography')));
});
