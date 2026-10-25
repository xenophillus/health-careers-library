// Canonical occupation identities across public prototypes and editorial drafts.
// A single occupation should retain its existing public ID to preserve favorites and routes.
export const draftToPublicId = Object.freeze({
  'emergency-medical-technician': 'emt'
});
export const healthSciencePathways = Object.freeze([
  'Therapeutic Services',
  'Diagnostic Services',
  'Health Informatics',
  'Support Services',
  'Biotechnology Research and Development'
]);
// Editorial draft pathways based on NCHSE Health Science Career Specialties (May 2024).
export const draftPathways = Object.freeze({
  'athletic-trainer': 'Therapeutic Services',
  'dental-assistant': 'Therapeutic Services',
  'medical-assistant': 'Therapeutic Services',
  'emergency-medical-technician': 'Therapeutic Services',
  'sterile-processing-technician': 'Support Services'
});
// Approved media must use a repository-relative image and documented rights.
// Empty catalog intentionally falls back to existing emoji until licensed images are added.
export const careerMedia = Object.freeze({});
