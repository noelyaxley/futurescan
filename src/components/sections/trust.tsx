"use client";

import { motion } from "framer-motion";

const trustItems = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "TGA-Compliant AI",
    description:
      "Our AI diagnostic partners hold Therapeutic Goods Administration (TGA) approval as Software as a Medical Device (SaMD), meeting Australian regulatory standards for clinical use.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Radiologist Verified",
    description:
      "AI assists, but never replaces. Every scan is reviewed by a qualified Australian radiologist (FRANZCR). Your report carries a human seal of approval.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Your Data, Protected",
    description:
      "All scan data is encrypted at rest and in transit, stored in Australian data centres, and compliant with the Australian Privacy Act 1988 and My Health Records Act 2012.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.385 3.172a1.5 1.5 0 01-2.177-1.583l1.03-5.998-4.354-4.247a1.5 1.5 0 01.832-2.56l6.015-.874L10.07 4.18a1.5 1.5 0 012.86 0l2.69 5.449 6.015.874a1.5 1.5 0 01.832 2.56l-4.354 4.247 1.03 5.998a1.5 1.5 0 01-2.177 1.583L12 15.17z" />
      </svg>
    ),
    title: "Clinical-Grade Equipment",
    description:
      "Our clinic uses state-of-the-art 3T MRI machines — the same technology found in Australia's top hospitals, delivering the highest image resolution available.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space-light/20 to-deep-space" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-sm font-medium text-electric-cyan uppercase tracking-widest">
            Trust & Safety
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Medical accuracy.{" "}
            <span className="text-neural-silver/40">No compromises.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 group hover:border-electric-cyan/20 transition-all duration-500"
            >
              <div className="text-electric-cyan mb-5 group-hover:text-glow transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">
                {item.title}
              </h3>
              <p className="mt-3 text-neural-silver leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI vendor logos placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-neural-silver/40 mb-8">
            Powered by TGA-approved AI diagnostic partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-30" id="ai-vendor-logos">
            {/* Replace with actual partner logos */}
            {["SNAC iQ-Solutions", "Aidoc", "RapidAI", "MVision AI"].map(
              (vendor) => (
                <div
                  key={vendor}
                  className="px-6 py-3 border border-neural-silver/10 rounded-lg text-sm text-neural-silver font-medium"
                >
                  {vendor}
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Medical disclaimer */}
        <div className="mt-16 glass rounded-xl p-6 text-xs text-neural-silver/50 leading-relaxed">
          <p>
            <strong className="text-neural-silver/70">Important:</strong> FutureScan
            provides AI-assisted screening services for informational purposes. Our
            AI tools are TGA-registered Software as a Medical Device (SaMD) used as
            clinical decision support. All findings are reviewed and reported by
            FRANZCR-qualified radiologists. FutureScan does not replace your GP or
            specialist. If you have acute symptoms, please contact emergency services
            (000) or visit your nearest emergency department. Scans without a GP
            referral may not be eligible for Medicare rebate.
          </p>
        </div>
      </div>
    </section>
  );
}
