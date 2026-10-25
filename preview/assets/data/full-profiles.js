import {sections as draftSections0} from './drafts/athletic-trainer.js';
import {sections as draftSections1} from './drafts/sterile-processing-technician.js';
import {sections as draftSections2} from './drafts/dental-assistant.js';
import {sections as draftSections3} from './drafts/emergency-medical-technician.js';
import {sections as draftSections4} from './drafts/medical-assistant.js';
import { sonographerSections } from './sonographer.js';

// Unpublished editorial review build; NOT the public registry.
// "sections[].html" is trusted, repository-authored markup. Never load user HTML.
export const fullProfiles = {
"athletic-trainer": {careerId:"athletic-trainer",intro:"Athletic trainers are healthcare professionals who help prevent, evaluate, and treat injuries and illnesses related to physical activity. They provide emergency care, guide rehabilitation, a",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections0},
"sterile-processing-technician": {careerId:"sterile-processing-technician",intro:"Sterile processing technicians prepare reusable medical instruments and devices for safe use in surgery and other clinical procedures. Operating-room staff depend on instrument sets being co",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections1},
"dental-assistant": {careerId:"dental-assistant",intro:"Dental assistants help the dental team deliver treatment while keeping the patient, instruments, and treatment room ready. Their work connects hands-on care with the preparation and records ",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections2},
"emt": {careerId:"emt",intro:"Emergency medical technicians (EMTs) assess people who are ill or injured, provide emergency care, and help transport patients safely. They are often the first healthcare workers to meet a p",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections3},
"medical-assistant": {careerId:"medical-assistant",intro:"Medical assistants help outpatient healthcare teams care for patients and keep their offices organized. They may prepare a patient for an examination, measure vital signs, update a health re",tags:['Editorial draft'],facts:[{label:'Editorial status',value:'Unapproved',detail:'For review only'}],sections:draftSections4},
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
