"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function DetectionMarker({
  label,
  top,
  left,
  delay,
}: {
  label: string;
  top: string;
  left: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="absolute flex items-center gap-2"
      style={{ top, left }}
    >
      <div className="relative">
        <div className="h-3 w-3 rounded-full bg-electric-cyan" />
        <div className="absolute inset-0 h-3 w-3 rounded-full bg-electric-cyan animate-ping opacity-40" />
      </div>
      <span className="glass rounded-full px-3 py-1 text-xs text-electric-cyan font-medium whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

export function ScanExperience() {
  return (
    <section id="technology" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space-light/20 to-deep-space" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Interactive scan visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* MRI scan frame */}
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden glow-cyan-strong">
              {/* Background gradient simulating scan */}
              <div className="absolute inset-0 bg-gradient-to-br from-deep-space-light via-deep-space to-deep-space-lighter" />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-grid opacity-60" />

              {/* AI-generated MRI brain scan */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/ai/scan-brain.png"
                  alt="AI-analysed brain MRI scan with neural network overlay"
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Scanning line */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute left-0 right-0 h-[3px] animate-scan-line"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.6) 30%, rgba(0,229,255,1) 50%, rgba(0,229,255,0.6) 70%, transparent 100%)",
                    boxShadow: "0 0 20px rgba(0,229,255,0.5), 0 0 60px rgba(0,229,255,0.2)",
                  }}
                />
              </div>

              {/* Glassmorphism overlay panel */}
              <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400 font-medium">AI Analysis Active</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neural-silver/60">Neural structures</span>
                    <span className="text-electric-cyan">Normal</span>
                  </div>
                  <div className="h-1 rounded-full bg-deep-space-lighter overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-electric-cyan to-electric-cyan-dim"
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neural-silver/60">Tissue density</span>
                    <span className="text-electric-cyan">Analysing...</span>
                  </div>
                  <div className="h-1 rounded-full bg-deep-space-lighter overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "78%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.5, delay: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-electric-cyan to-electric-cyan-dim animate-shimmer"
                    />
                  </div>
                </div>
              </div>

              {/* Detection markers */}
              <DetectionMarker label="Region clear" top="20%" left="55%" delay={1.0} />
              <DetectionMarker label="No anomalies" top="40%" left="25%" delay={1.4} />
              <DetectionMarker label="Baseline captured" top="65%" left="60%" delay={1.8} />
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-medium text-electric-cyan uppercase tracking-widest">
              AI-Powered Analysis
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight">
              Your scan, analysed by
              <br />
              <span className="bg-gradient-to-r from-electric-cyan to-electric-cyan-dim bg-clip-text text-transparent">
                the most precise AI
              </span>
            </h2>
            <p className="mt-6 text-lg text-neural-silver leading-relaxed">
              Our TGA-compliant AI analyses every pixel of your MRI scan, detecting
              subtle patterns that can indicate early-stage conditions — often before
              any symptoms appear.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: "Sub-millimetre precision",
                  desc: "AI detects abnormalities as small as 1-2mm that human review alone might miss.",
                },
                {
                  title: "Always verified by a radiologist",
                  desc: "Every AI finding is reviewed by a qualified Australian radiologist before your report is finalised.",
                },
                {
                  title: "Longitudinal tracking",
                  desc: "Subscribe and we track changes in your scans over time, catching trends before they become problems.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-electric-cyan/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-electric-cyan" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="mt-1 text-sm text-neural-silver">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
