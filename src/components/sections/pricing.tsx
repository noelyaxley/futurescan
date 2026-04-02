"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Single Scan",
    price: "$299",
    period: "one-time",
    description: "Perfect for a one-off health check or specific concern.",
    features: [
      "Choose any body region",
      "AI-enhanced analysis",
      "Radiologist-verified report",
      "Results within 24 hours",
      "Digital report & images",
    ],
    cta: "Book a Scan",
    featured: false,
  },
  {
    name: "Annual Membership",
    price: "$49",
    period: "/month",
    description: "Proactive health monitoring. The way scanning should be.",
    features: [
      "1 full scan per year included",
      "AI + radiologist report",
      "Year-on-year comparison tracking",
      "Priority booking",
      "Additional scans at member rate",
      "24/7 access to your health portal",
    ],
    cta: "Start Your Membership",
    featured: true,
    savings: "Save $110+ vs traditional",
  },
  {
    name: "Corporate Wellness",
    price: "Custom",
    period: "",
    description: "Proactive health packages for your team. Reduce sick days, increase wellbeing.",
    features: [
      "Volume discounts from 10+ employees",
      "Dedicated account manager",
      "Aggregate health insights (anonymised)",
      "Flexible scan types per employee",
      "Quarterly wellness reports",
    ],
    cta: "Talk to Sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

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
            Transparent Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
            MRI scans shouldn&apos;t
            <br />
            <span className="bg-gradient-to-r from-electric-cyan to-electric-cyan-dim bg-clip-text text-transparent">
              break the bank
            </span>
          </h2>
          <p className="mt-6 text-lg text-neural-silver">
            Traditional private MRI: $500–$1,000+. FutureScan: from $49/month with AI analysis included.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.featured
                  ? "glass-strong border-electric-cyan/30 glow-cyan"
                  : "glass"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-electric-cyan px-4 py-1.5 text-xs font-bold text-deep-space uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)]">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-neural-silver text-sm">{plan.period}</span>
                  )}
                </div>
                {plan.savings && (
                  <span className="mt-2 inline-block text-xs text-electric-cyan font-medium">
                    {plan.savings}
                  </span>
                )}
                <p className="mt-3 text-sm text-neural-silver">{plan.description}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0 text-electric-cyan"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-neural-silver-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#book"
                className={`block text-center rounded-full py-3 px-6 text-sm font-semibold transition-all ${
                  plan.featured
                    ? "bg-electric-cyan text-deep-space hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-105"
                    : "border border-neural-silver/20 text-white hover:border-electric-cyan/40"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Comparison note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-neural-silver/50"
        >
          All prices in AUD. Membership billed annually ($588/year). Cancel anytime.
          Pricing subject to change during pilot phase.
        </motion.p>
      </div>
    </section>
  );
}
