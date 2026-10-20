import { sections as registered_nurseSections } from './pilot/registered-nurse.js';
import { sections as medical_lab_scientistSections } from './pilot/medical-lab-scientist.js';
import { sections as biomedical_engineerSections } from './pilot/biomedical-engineer.js';
import { sections as respiratory_therapistSections } from './pilot/respiratory-therapist.js';
import { sections as health_info_techSections } from './pilot/health-info-tech.js';
import { sections as sterile_processing_technicianSections } from './pilot/sterile-processing-technician.js';
import { sonographerSections } from './sonographer.js';

// Profiles are editorially reviewed before being added to this registry.
// "sections[].html" is trusted, repository-authored markup. Never load user HTML.
export const fullProfiles = {
  "registered-nurse": {
    careerId: "registered-nurse",
    intro: "Registered nurses assess patients, provide and coordinate care, and help people manage health conditions.",
    tags: ["Patient care","Clinical assessment"],
    facts: [
      {label:"Career pathway",value:"Therapeutic Services"},
      {label:"Median US pay",value:"$101,420",detail:"May 2025 · Registered nurses"},
      {label:"Editorial status",value:"Pilot draft",detail:"Under review"}
    ],
    sections: registered_nurseSections
  },
  "medical-lab-scientist": {
    careerId: "medical-lab-scientist",
    intro: "Medical laboratory scientists analyze patient specimens and ensure test results are accurate and useful.",
    tags: ["Diagnostic testing","Laboratory science"],
    facts: [
      {label:"Career pathway",value:"Diagnostic Services"},
      {label:"Median US pay",value:"$67,350",detail:"May 2025 · Clinical laboratory technologists and technicians"},
      {label:"Editorial status",value:"Pilot draft",detail:"Under review"}
    ],
    sections: medical_lab_scientistSections
  },
  "biomedical-engineer": {
    careerId: "biomedical-engineer",
    intro: "Biomedical engineers create and evaluate devices and technology used in healthcare.",
    tags: ["Device design","Engineering"],
    facts: [
      {label:"Career pathway",value:"Biotechnology Research and Development"},
      {label:"Median US pay",value:"$116,890",detail:"May 2025 · Bioengineers and biomedical engineers"},
      {label:"Editorial status",value:"Pilot draft",detail:"Under review"}
    ],
    sections: biomedical_engineerSections
  },
  "respiratory-therapist": {
    careerId: "respiratory-therapist",
    intro: "Respiratory therapists assess breathing problems and provide specialized respiratory care.",
    tags: ["Breathing support","Critical care"],
    facts: [
      {label:"Career pathway",value:"Therapeutic Services"},
      {label:"Median US pay",value:"$87,300",detail:"May 2025 · Respiratory therapists"},
      {label:"Editorial status",value:"Pilot draft",detail:"Under review"}
    ],
    sections: respiratory_therapistSections
  },
  "health-info-tech": {
    careerId: "health-info-tech",
    intro: "Health information technicians maintain accurate, secure healthcare information.",
    tags: ["Data quality","Health records"],
    facts: [
      {label:"Career pathway",value:"Health Informatics"},
      {label:"Median US pay",value:"$51,140",detail:"May 2025 · Medical records specialists"},
      {label:"Editorial status",value:"Pilot draft",detail:"Under review"}
    ],
    sections: health_info_techSections
  },
  "sterile-processing-technician": {
    careerId: "sterile-processing-technician",
    intro: "Sterile processing technicians prepare reusable instruments for safe clinical use.",
    tags: ["Instrument safety","Infection prevention"],
    facts: [
      {label:"Career pathway",value:"Support Services"},
      {label:"Median US pay",value:"$47,700",detail:"May 2025 · Medical equipment preparers"},
      {label:"Editorial status",value:"Pilot draft",detail:"Under review"}
    ],
    sections: sterile_processing_technicianSections
  },
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
