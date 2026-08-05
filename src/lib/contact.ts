/* ============================================================================
   REAL-WORLD CONTACT DETAIL — NOT YET SUPPLIED
   ----------------------------------------------------------------------------
   Every field below is deliberately `null`. Nothing here may be filled with an
   example, a placeholder or a "close enough" value: these are the credentials
   and contact points of a regulated health service, and a wrong one is worse
   than a missing one. The UI renders a clearly-marked empty slot for anything
   still `null`, so no unverified claim can ship by accident.

   TO GO LIVE, FutureScan must supply:

     medicalDirector.name        Full name of the supervising medical director,
                                 spelled as it appears on the AHPRA register.
     medicalDirector.credential  Post-nominals exactly as registered
                                 (e.g. "MBBS, FRANZCR").
     medicalDirector.ahpraNumber AHPRA registration number, so a reader can
                                 verify it on the public register.
     medicalDirector.photo       Path to a head-and-shoulders photograph placed
                                 in /public/assets/team/ (e.g.
                                 "/assets/team/medical-director.jpg").
     clinic.addressLine1         Street address of the Sydney clinic.
     clinic.addressLine2         Suburb, state and postcode.
     phone.display               Published clinic phone number, formatted for
                                 reading (e.g. "(02) 0000 0000").
     phone.tel                   The same number in tel: form, E.164
                                 (e.g. "+61200000000").

   The phone number is read by both the Trust section and the intake form's
   failure message ("please try again or call us on ..."), so it only needs to
   be entered once, here.
   ========================================================================== */

export type MedicalDirector = {
  name: string;
  credential: string;
  ahpraNumber: string;
  photo: string;
};

export type ClinicAddress = {
  addressLine1: string;
  addressLine2: string;
};

export type ClinicPhone = {
  display: string;
  tel: string;
};

export type ClinicContact = {
  medicalDirector: MedicalDirector | null;
  clinic: ClinicAddress | null;
  phone: ClinicPhone | null;
};

export const clinicContact: ClinicContact = {
  medicalDirector: null,
  clinic: null,
  phone: null,
};
