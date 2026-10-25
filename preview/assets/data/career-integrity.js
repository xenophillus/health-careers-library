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
export const careerMedia = Object.freeze({
  "sonographer": {
    "src": "assets/images/careers/sonographer.webp",
    "alt": "Healthcare professional performing an ultrasound examination",
    "credit": "U.S. Air Force / Christopher Hubenthal",
    "license": "Public domain (U.S. government)",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Medical_ultrasound_examination.JPG",
    "verificationStatus": "Needs visual verification"
  },
  "athletic-trainer": {
    "src": "assets/images/careers/athletic-trainer.webp",
    "alt": "Athletic trainer examining a competitor's hand at a wheelchair basketball event",
    "credit": "U.S. Marine Corps",
    "license": "Public domain (U.S. government)",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:An%20athletic%20trainer%20with%20the%20Warrior%20Hope%20and%20Care%20Center%20examines%20U.S.%20Marine%20Corps%20Lance%20Cpl.%20Nicholas%20M.%20Shelton's%20hand%2C%20during%20a%20wheelchair%20basketball%20game%20at%20the%202012%20Marine%20Corps%20Trials%20at%20Marine%20Corps%20120216-M-IX633-211.jpg",
    "verificationStatus": "Needs visual verification"
  },
  "dental-assistant": {
    "src": "assets/images/careers/dental-assistant.webp",
    "alt": "Dental assisting students practicing clinical procedures",
    "credit": "Wake Technical Community College",
    "license": "CC0 1.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dental%20Assisting-44.jpg",
    "verificationStatus": "Needs visual verification"
  },
  "emt": {
    "src": "assets/images/careers/emt.webp",
    "alt": "Emergency medical team preparing for ambulance patient care",
    "credit": "U.S. Navy / Christopher Jones",
    "license": "Public domain (U.S. government)",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Navy%20Corpsmen%20Ride-Along%20with%20Local%20Ambulance%20Paramedics%20to%20Bolster%20Patient%20Care%20and%20Readiness%20(9087008).jpg",
    "verificationStatus": "Needs visual verification"
  },
  "medical-assistant": {
    "src": "assets/images/careers/medical-assistant.webp",
    "alt": "Healthcare worker taking a patient's vital signs",
    "credit": "U.S. Navy",
    "license": "Public domain (U.S. government)",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:US%20Navy%20070622-N-0194K-447%20Hospital%20Corpsman%203rd%20Class%20Philip%20Ganaban%20checks%20the%20vital%20signs%20of%20a%20patient%20at%20the%20Monsignor%20Romero%20Roman%20Catholic%20School%20in%20the%20Valley%20of%20Peace.jpg",
    "verificationStatus": "Needs visual verification"
  },
  "sterile-processing-technician": {
    "src": "assets/images/careers/sterile-processing-technician.webp",
    "alt": "Medical staff demonstrating the handling and preparation of sterile instruments",
    "credit": "U.S. Air Force / Brieana E. Bolfing",
    "license": "Public domain (U.S. government)",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:From%20Preventive%20Care%20to%20Environmental%20Health%2C%2039th%20OMRS%20Maintains%20Force%20Capability%20(9253859).jpg",
    "verificationStatus": "Needs visual verification"
  }
});

// Approved visual associations for incoming profiles.
export const careerEmoji = Object.freeze({
  'athletic-trainer': '🏈',
  'dental-assistant': '🦷',
  'sterile-processing-technician': '🧼',
  'medical-assistant': '📋',
  'sonographer': '🖥️'
});
