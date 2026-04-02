"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "$500–$1,000+",
    label: "Average out-of-pocket MRI cost in Australia",
    detail: "Without Medicare rebate",
  },
  {
    value: "4–8 weeks",
    label: "Average wait time for public MRI",
    detail: "Longer in regional areas",
  },
  {
    value: "1 in 2",
    label: "Australians skip recommended scans",
    detail: "Due to cost or access barriers",
  },
  {
    value: "30%",
    label: "Of cancers detected late could be found early",
    detail: "With proactive screening",
  },
];

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 group hover:border-electric-cyan/20 transition-all duration-500"
    >
      <div className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-electric-cyan text-glow">
        {stat.value}
      </div>
      <p className="mt-3 text-base text-white font-medium">{stat.label}</p>
      <p className="mt-1 text-sm text-neural-silver/60">{stat.detail}</p>
    </motion.div>
  );
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space-light/30 to-deep-space" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-sm font-medium text-electric-cyan uppercase tracking-widest">
            The Problem
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight">
            Healthcare shouldn&apos;t be
            <br />
            <span className="text-neural-silver/40">a luxury.</span>
          </h2>
          <p className="mt-6 text-lg text-neural-silver leading-relaxed">
            Millions of Australians delay or skip MRI scans because they
            can&apos;t afford the out-of-pocket costs or can&apos;t wait weeks for
            a public appointment. By the time they get scanned, it&apos;s often
            too late for early intervention.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
