import type { Metadata } from "next";

import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { clinicContact } from "@/lib/contact";

/* ============================================================================
   PRIVACY & COLLECTION NOTICE — PART DRAFTED, PART OUTSTANDING
   ----------------------------------------------------------------------------
   Everything stated below is true of the code as it stands: the enquiry form
   collects exactly the fields listed, and sends them to HubSpot's CRM API.
   Nothing here describes clinical handling of scan data, because none of that
   code exists yet.

   TO GO LIVE, FutureScan must supply (and have reviewed by a privacy lawyer):
     - Registered legal entity name and ABN
     - Registered business address
     - Privacy officer name and contact address for access/correction requests
     - Retention period for enquiry data, and the deletion process
     - The HubSpot data region in use, and any other overseas disclosure
     - Clinical sections: how scan images and reports are stored, who may read
       them, My Health Records interaction, and the third parties involved
     - Complaints process and OAIC escalation wording
   Do not publish this page as final until those are filled in.
   ========================================================================== */

export const metadata: Metadata = {
  title: "Privacy & Collection Notice",
  description:
    "What FutureScan collects through its enquiry form, why, where it goes, and what is still being finalised before launch.",
  robots: { index: false, follow: true },
};

function Outstanding({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 border-l border-dashed border-neural-silver/40 pl-4 text-neural-silver/80">
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Privacy &amp;{" "}
            <span className="bg-gradient-to-r from-electric-cyan to-electric-cyan-dim bg-clip-text text-transparent">
              collection notice
            </span>
          </h1>

          <div className="mt-8 glass rounded-xl p-6 text-sm text-neural-silver/90 leading-relaxed">
            FutureScan has not opened yet. This notice covers the one thing the
            site does today — the enquiry form — accurately and in full. The
            sections about scans, reports and clinical records are marked as
            outstanding, because that part of the service does not exist yet and
            we would rather tell you that than describe something we have not
            built.
          </div>

          <div className="mt-12 space-y-12 text-neural-silver leading-relaxed max-w-[68ch]">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                What the enquiry form collects
              </h2>
              <p className="mt-4">
                When you complete the booking enquiry form, we collect what you
                type into it:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-electric-cyan">
                <li>Your first name, and last name if you give one</li>
                <li>Your email address</li>
                <li>Your phone number, if you give one</li>
                <li>The scan type you selected, or the plan you clicked from</li>
                <li>
                  Anything you write in the free-text &ldquo;health
                  concerns&rdquo; field — this is <strong className="text-white font-semibold">health
                  information</strong>, a sensitive category under the Privacy Act
                  1988 (Cth), and the field is optional for that reason
                </li>
                <li>Your preferred timeframe, and how you heard about us</li>
                <li>
                  For corporate enquiries: your company name and the size of the
                  team the programme would cover
                </li>
                <li>That you ticked the consent box, and when</li>
              </ul>
              <p className="mt-4">
                We do not ask for a Medicare number, a date of birth, or any
                identity document through this form, and you should not send
                them to us this way.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                Why we collect it, and where it goes
              </h2>
              <p className="mt-4">
                We collect it for one purpose: to contact you about the scan or
                programme you enquired about, and to have enough context to make
                that conversation useful. Submitting the form creates or updates
                a contact record in <strong className="text-white font-semibold">HubSpot</strong>,
                the customer relationship management service we use. Your
                enquiry is stored there and read by the FutureScan team.
              </p>
              <p className="mt-4">
                We do not sell your information, and we do not pass it to
                advertisers.
              </p>
              <Outstanding>
                Outstanding before launch: the HubSpot data region in use, and
                whether that means your information is held or accessed
                overseas.
              </Outstanding>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                Analytics and cookies
              </h2>
              <p className="mt-4">
                This site loads Google Analytics and HubSpot&apos;s visitor
                tracking script when those are configured. Both set cookies in
                your browser and record pages you visit on this site. Neither is
                given the contents of the health-concerns field.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                Scans, reports and clinical records
              </h2>
              <p className="mt-4">
                Nothing in this section applies yet — no scan has been performed
                and no clinical record exists.
              </p>
              <Outstanding>
                Outstanding before launch: how scan images and radiology reports
                are stored and for how long, who inside and outside FutureScan
                may read them, how they interact with My Health Records, and
                which third parties are involved in producing your report.
              </Outstanding>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                Access, correction and deletion
              </h2>
              <p className="mt-4">
                You can ask us what we hold about you, ask us to correct it, or
                ask us to delete your enquiry. Under the Privacy Act you can
                also complain to the Office of the Australian Information
                Commissioner if you are not satisfied with how we handle that
                request.
              </p>
              <Outstanding>
                Outstanding before launch: the contact point for these requests,
                how long we keep enquiry data, and our complaints process.
              </Outstanding>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                Who we are
              </h2>
              {clinicContact.clinic ? (
                <address className="mt-4 not-italic">
                  {clinicContact.clinic.addressLine1}
                  <br />
                  {clinicContact.clinic.addressLine2}
                </address>
              ) : (
                <Outstanding>
                  Outstanding before launch: registered entity name, ABN and
                  business address.
                </Outstanding>
              )}
              {clinicContact.phone && (
                <p className="mt-4">
                  <a
                    href={`tel:${clinicContact.phone.tel}`}
                    className="text-electric-cyan underline underline-offset-2 hover:text-white transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-cyan"
                  >
                    {clinicContact.phone.display}
                  </a>
                </p>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
