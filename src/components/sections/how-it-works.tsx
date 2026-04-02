"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Book Online",
    description:
      "Choose your scan type and pick a time that works. No GP referral required. Takes 2 minutes.",
    image: null,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Get Scanned",
    description:
      "Visit our state-of-the-art Sydney clinic. Your scan takes 30-60 minutes in a comfortable, open MRI environment.",
    image: "/assets/ai/mri-detail.png",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "AI + Radiologist Report",
    description:
      "Our AI flags potential findings instantly. A qualified radiologist reviews every scan. Your report arrives within 24 hours.",
    image: "/assets/ai/ai-report.png",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

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
            How It Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Three steps to{" "}
            <span className="bg-gradient-to-r from-electric-cyan to-electric-cyan-dim bg-clip-text text-transparent">
              peace of mind
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%_-_16px)] w-[calc(100%_-_32px)] h-[1px] bg-gradient-to-r from-electric-cyan/30 to-transparent" />
              )}

              <div className="glass rounded-2xl p-8 h-full transition-all duration-500 hover:border-electric-cyan/20 hover:shadow-[0_0_40px_rgba(0,229,255,0.08)] overflow-hidden relative">
                {/* Background image for steps with imagery */}
                {step.image && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      className="object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                    />
                  </div>
                )}
                <div className="relative z-10">
                  {/* Number + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-deep-space-lighter/80 group-hover:text-electric-cyan/20 transition-colors">
                      {step.number}
                    </span>
                    <div className="text-electric-cyan">{step.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-neural-silver leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
