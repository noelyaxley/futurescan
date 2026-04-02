"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-deep-space" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)]" />

      {/* Animated scan line across full viewport */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-cyan to-transparent animate-scan-line opacity-40" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-electric-cyan/5 blur-[120px] animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-electric-cyan/3 blur-[100px] animate-float"
        style={{ animationDelay: "3s" }}
      />

      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/ai/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-deep-space/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-electric-cyan/20 bg-electric-cyan/5 px-4 py-2"
        >
          <span className="h-2 w-2 rounded-full bg-electric-cyan animate-pulse-glow" />
          <span className="text-sm text-electric-cyan font-medium">
            Now accepting pilot members in Sydney
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
        >
          <span className="block">See inside.</span>
          <span className="block mt-2 bg-gradient-to-r from-electric-cyan via-electric-cyan-dim to-electric-cyan bg-clip-text text-transparent">
            Before symptoms start.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-lg sm:text-xl text-neural-silver max-w-2xl mx-auto leading-relaxed"
        >
          AI-powered MRI scans that detect what humans miss.
          No GP referral needed. Results in 24 hours.
          From <span className="text-electric-cyan font-semibold">$49/month</span>.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#book"
            className="group relative inline-flex items-center gap-2 rounded-full bg-electric-cyan px-8 py-4 text-base font-semibold text-deep-space transition-all hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95"
          >
            <span>See Your Future Health</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-neural-silver/20 px-8 py-4 text-base text-neural-silver transition-all hover:border-electric-cyan/40 hover:text-white"
          >
            <span>How It Works</span>
          </a>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neural-silver/60"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-electric-cyan" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            TGA-compliant AI
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-electric-cyan" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Radiologist verified
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-electric-cyan" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No referral required
          </span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-space to-transparent" />
    </section>
  );
}
