import { sonographerSections } from './sonographer.js';

// Profiles are editorially reviewed before being added to this registry.
// "sections[].html" is trusted, repository-authored markup. Never load user HTML.
export const fullProfiles = {
  sonographer: {
    careerId: 'sonographer',
    intro: 'Uses diagnostic ultrasound technology to create images of internal anatomy, support clinical decisions, and care for patients.',
    tags: ['Ultrasound technology', 'Patient care', 'Medical imaging'],
    facts: [
      { label: 'US median annual pay', value: '$96,590', detail: 'May 2025' },
      { label: 'Common entry route', value: 'Associate degree', detail: 'Other pathways exist' },
      { label: 'Projected US growth', value: '14%', detail: '2025–2035' },
      { label: 'Profile last researched', value: 'Oct 2026', detail: 'Sources in bibliography' }
    ],
    sections: sonographerSections
  }
};

export function getFullProfile(careerId) {
  return Object.hasOwn(fullProfiles, careerId) ? fullProfiles[careerId] : null;
}
