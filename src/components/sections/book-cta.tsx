"use client";

import { motion } from "framer-motion";
import { IntakeForm } from "@/components/forms/intake-form";

export function BookCta() {
  return (
    <section id="book" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space-light/10 to-deep-space" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-electric-cyan/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: CTA copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight">
              Ready to see your
              <br />
              <span className="bg-gradient-to-r from-electric-cyan to-electric-cyan-dim bg-clip-text text-transparent">
                future health?
              </span>
            </h2>
            <p className="mt-6 text-lg text-neural-silver leading-relaxed">
              Join the pilot program and be among the first Australians to access
              AI-powered preventative MRI scanning. Limited spots available in our
              Sydney clinic.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "No GP referral required",
                "Results within 24 hours",
                "Cancel membership anytime",
                "100% satisfaction guarantee during pilot",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-electric-cyan/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-electric-cyan" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-neural-silver-light">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong rounded-2xl p-8 glow-cyan"
          >
            <IntakeForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
