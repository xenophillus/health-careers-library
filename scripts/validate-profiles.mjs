// Run: node scripts/validate-profiles.mjs
// No third-party packages. Checks registered reviewed profiles; drafts stay unregistered.
import { fullProfiles } from '../assets/data/full-profiles.js';
import { careers } from '../assets/data/careers.js';
import { PROFILE_SECTION_NAMES } from '../assets/data/profile-standard.js';

export function validateProfiles(profiles, directory) {
  const errors = [];
  const ids = new Set(directory.map(c => c.id));
  const validIds = new Set();
  for (const [id, profile] of Object.entries(profiles)) {
    if (!ids.has(id)) errors.push(`${id}: no matching directory career`);
    if (validIds.has(id)) errors.push(`${id}: duplicate career ID`);
    validIds.add(id);
    if (profile.careerId !== id) errors.push(`${id}: careerId mismatch`);
    if (!profile.intro?.trim()) errors.push(`${id}: missing introduction`);
    if (!Array.isArray(profile.tags) || !profile.tags.length) errors.push(`${id}: missing tags`);
    if (!Array.isArray(profile.facts) || !profile.facts.length) errors.push(`${id}: missing summary facts`);
    else for (const [i, fact] of profile.facts.entries()) {
      if (!fact.label?.trim() || !fact.value?.trim()) errors.push(`${id}: incomplete fact ${i + 1}`);
    }
    const sections = profile.sections;
    if (!Array.isArray(sections)) { errors.push(`${id}: missing sections array`); continue; }
    if (sections.length !== PROFILE_SECTION_NAMES.length)
      errors.push(`${id}: expected ${PROFILE_SECTION_NAMES.length} sections, found ${sections.length}`);
    const seen = new Set();
    for (const [i, section] of sections.entries()) {
      if (!section || typeof section !== 'object') { errors.push(`${id}: invalid section ${i + 1}`); continue; }
      if (!section.id || seen.has(section.id)) errors.push(`${id}: empty or duplicate section ID at ${i + 1}`);
      seen.add(section.id);
      if (section.name !== PROFILE_SECTION_NAMES[i])
        errors.push(`${id}: section ${i + 1} must be "${PROFILE_SECTION_NAMES[i] ?? '(extra section)'}"`);
      const clean = typeof section.html === 'string'
        ? section.html.replace(/<[^>]*>/g, '').replace(/&(?:[a-z]+|#\d+);/gi, ' ').trim() : '';
      if (!clean) errors.push(`${id}: empty section "${section.name ?? i + 1}"`);
    }
    const bibliography = sections.at(-1)?.html ?? '';
    if (!/<a\s[^>]*href=["']https?:\/\//i.test(bibliography))
      errors.push(`${id}: bibliography requires at least one linked source`);
  }
  return errors;
}

const invokedDirectly = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (invokedDirectly) {
  const errors = validateProfiles(fullProfiles, careers);
  if (errors.length) {
    for (const e of errors) console.error('FAIL:', e);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${Object.keys(fullProfiles).length} registered full profile(s); all ${PROFILE_SECTION_NAMES.length} tabs in order.`);
  }
}
