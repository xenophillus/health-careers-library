// Conservative, occupation-specific evidence. Missing data means unknown, never absent.
// Sources checked 2026-10-25. These describe typical core duties, not every workplace.
export const careerAttributes = {
 veterinarian: {animalCare:{status:'core',reviewedAt:'2026-10-25',label:'animal care',explanation:'Veterinarians diagnose and treat animals.',source:'https://www.bls.gov/ooh/healthcare/veterinarians.htm'}},
 veterinariantechnician: {animalCare:{status:'core',reviewedAt:'2026-10-25',label:'animal care',explanation:'Veterinary technicians provide care and medical testing for animals.',source:'https://www.bls.gov/ooh/healthcare/veterinary-technologists-and-technicians.htm'}},
 certifiednursingassistant: {
  physicalAssistance:{status:'regular',reviewedAt:'2026-10-25',label:'physical assistance with positioning',explanation:'Nursing assistants typically turn, reposition, and transfer patients between beds and wheelchairs.',source:'https://www.bls.gov/ooh/healthcare/nursing-assistants.htm'},
  personalCare:{status:'regular',reviewedAt:'2026-10-25',label:'personal-care tasks',explanation:'Helping patients bathe, dress, and use the toilet is typical nursing-assistant work.',source:'https://www.bls.gov/ooh/healthcare/nursing-assistants.htm'}
 },
 medicallaboratoryscientist: {blood:{status:'setting-dependent',reviewedAt:'2026-10-25',label:'work with blood',explanation:'Clinical laboratory work can involve blood samples; the work varies by specialty and laboratory. This broad title is not treated as a confirmed routine-blood exclusion.',source:'https://www.bls.gov/ooh/healthcare/clinical-laboratory-technologists-and-technicians.htm'}},
 medicallaboratorytechnician: {blood:{status:'setting-dependent',reviewedAt:'2026-10-25',label:'work with blood',explanation:'Clinical laboratory work can involve blood samples; duties vary by role and laboratory. Check the particular setting.',source:'https://www.bls.gov/ooh/healthcare/clinical-laboratory-technologists-and-technicians.htm'}},
 phlebotomist: {
  blood: {status:'regular',reviewedAt:'2026-10-25',label:'routine work with blood',explanation:'Drawing blood from patients or donors is central to phlebotomy.',source:'https://www.bls.gov/ooh/healthcare/phlebotomists.htm'}
 },
 emergencymedicaltechnician: {
  emergencies: {status:'core',reviewedAt:'2026-10-25',label:'emergency-response work',explanation:'Responding to medical emergencies and providing emergency care are core EMT duties.',source:'https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm'}
 },
 paramedic: {
  emergencies: {status:'core',reviewedAt:'2026-10-25',label:'emergency-response work',explanation:'Providing emergency medical care is central to paramedic work.',source:'https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm'}
 }
};
