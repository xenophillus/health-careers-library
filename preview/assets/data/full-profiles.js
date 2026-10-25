import {sections as draftSections0} from './drafts/athletic-trainer.js';
import {sections as draftSections1} from './drafts/sterile-processing-technician.js';
import {sections as draftSections2} from './drafts/dental-assistant.js';
import {sections as draftSections3} from './drafts/emergency-medical-technician.js';
import {sections as draftSections4} from './drafts/medical-assistant.js';
import { sonographerSections } from './sonographer.js';

// Unpublished editorial review build; NOT the public registry.
// "sections[].html" is trusted, repository-authored markup. Never load user HTML.
export const fullProfiles = {
"athletic-trainer": {careerId:"athletic-trainer",intro:"Athletic trainers are healthcare professionals who help prevent, recognize, evaluate, and manage injuries and illnesses associated with physical activity. They work with athletes, active adu",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections0},
"sterile-processing-technician": {careerId:"sterile-processing-technician",intro:"Sterile processing technicians prepare reusable medical instruments and devices for safe use in surgery and other clinical procedures. Operating-room staff depend on instrument sets being co",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections1},
"dental-assistant": {careerId:"dental-assistant",intro:"Dental assistants help a dental practice run safely and efficiently. They prepare treatment areas, support dentists during procedures, help patients feel comfortable, sterilize instruments, ",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections2},
"emt": {careerId:"emt",intro:"Emergency medical technicians (EMTs) provide emergency medical care before and during transport to a hospital or other medical facility. They respond to people experiencing injuries, illness",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections3},
"medical-assistant": {careerId:"medical-assistant",intro:"Medical assistants support patient care and office operations in healthcare settings such as physician practices and outpatient clinics. Depending on the workplace, they may room patients, m",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections4},
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
