"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  scanType: string;
  concern: string;
  preferredDate: string;
  heardAbout: string;
};

const scanTypes = [
  { id: "full-body", label: "Full Body Scan", desc: "Comprehensive head-to-toe screening" },
  { id: "brain", label: "Brain MRI", desc: "Neurological screening" },
  { id: "cardiac", label: "Cardiac MRI", desc: "Heart & cardiovascular assessment" },
  { id: "spine", label: "Spine MRI", desc: "Back, neck & spinal cord" },
  { id: "joint", label: "Joint / MSK", desc: "Knee, shoulder, hip & more" },
  { id: "abdominal", label: "Abdominal MRI", desc: "Organs, liver, kidneys" },
];

const initialData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  scanType: "",
  concern: "",
  preferredDate: "",
  heardAbout: "",
};

export function IntakeForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (fields: Partial<FormData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const canProceed = () => {
    if (step === 0) return data.firstName && data.email;
    if (step === 1) return data.scanType;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/hubspot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-cyan/10 mb-6">
          <svg className="w-8 h-8 text-electric-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
          You&apos;re in.
        </h3>
        <p className="mt-3 text-neural-silver max-w-md mx-auto">
          We&apos;ll be in touch within 24 hours to confirm your scan. Welcome to the
          future of preventative health.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {["Your Details", "Scan Type", "Schedule"].map((label, i) => (
          <div key={label} className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= step ? "bg-electric-cyan" : "bg-deep-space-lighter"
                }`}
              />
            </div>
            <span
              className={`text-xs transition-colors ${
                i <= step ? "text-electric-cyan" : "text-neural-silver/40"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neural-silver mb-1.5">
                  First name *
                </label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => update({ firstName: e.target.value })}
                  className="w-full rounded-xl bg-deep-space-light border border-neural-silver/10 px-4 py-3 text-white placeholder:text-neural-silver/30 focus:border-electric-cyan/40 focus:outline-none focus:ring-1 focus:ring-electric-cyan/20 transition-all"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm text-neural-silver mb-1.5">
                  Last name
                </label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => update({ lastName: e.target.value })}
                  className="w-full rounded-xl bg-deep-space-light border border-neural-silver/10 px-4 py-3 text-white placeholder:text-neural-silver/30 focus:border-electric-cyan/40 focus:outline-none focus:ring-1 focus:ring-electric-cyan/20 transition-all"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-neural-silver mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                className="w-full rounded-xl bg-deep-space-light border border-neural-silver/10 px-4 py-3 text-white placeholder:text-neural-silver/30 focus:border-electric-cyan/40 focus:outline-none focus:ring-1 focus:ring-electric-cyan/20 transition-all"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-neural-silver mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
                className="w-full rounded-xl bg-deep-space-light border border-neural-silver/10 px-4 py-3 text-white placeholder:text-neural-silver/30 focus:border-electric-cyan/40 focus:outline-none focus:ring-1 focus:ring-electric-cyan/20 transition-all"
                placeholder="04XX XXX XXX"
              />
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <p className="text-sm text-neural-silver mb-4">
              Select the scan type you&apos;re interested in:
            </p>
            {scanTypes.map((scan) => (
              <button
                key={scan.id}
                onClick={() => update({ scanType: scan.id })}
                className={`w-full text-left rounded-xl border px-5 py-4 transition-all ${
                  data.scanType === scan.id
                    ? "border-electric-cyan/40 bg-electric-cyan/5"
                    : "border-neural-silver/10 bg-deep-space-light hover:border-neural-silver/20"
                }`}
              >
                <div className="font-medium text-white">{scan.label}</div>
                <div className="text-sm text-neural-silver/60">{scan.desc}</div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm text-neural-silver mb-1.5">
                Any specific health concerns? (optional)
              </label>
              <textarea
                value={data.concern}
                onChange={(e) => update({ concern: e.target.value })}
                rows={3}
                className="w-full rounded-xl bg-deep-space-light border border-neural-silver/10 px-4 py-3 text-white placeholder:text-neural-silver/30 focus:border-electric-cyan/40 focus:outline-none focus:ring-1 focus:ring-electric-cyan/20 transition-all resize-none"
                placeholder="e.g., family history of heart disease, persistent headaches..."
              />
            </div>
            <div>
              <label className="block text-sm text-neural-silver mb-1.5">
                Preferred timeframe
              </label>
              <select
                value={data.preferredDate}
                onChange={(e) => update({ preferredDate: e.target.value })}
                className="w-full rounded-xl bg-deep-space-light border border-neural-silver/10 px-4 py-3 text-white focus:border-electric-cyan/40 focus:outline-none focus:ring-1 focus:ring-electric-cyan/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="asap">As soon as possible</option>
                <option value="this-week">This week</option>
                <option value="next-week">Next week</option>
                <option value="this-month">This month</option>
                <option value="flexible">I&apos;m flexible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neural-silver mb-1.5">
                How did you hear about us?
              </label>
              <select
                value={data.heardAbout}
                onChange={(e) => update({ heardAbout: e.target.value })}
                className="w-full rounded-xl bg-deep-space-light border border-neural-silver/10 px-4 py-3 text-white focus:border-electric-cyan/40 focus:outline-none focus:ring-1 focus:ring-electric-cyan/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="google">Google search</option>
                <option value="social">Social media</option>
                <option value="gp">My GP/doctor</option>
                <option value="friend">Friend or family</option>
                <option value="news">News article</option>
                <option value="other">Other</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="text-sm text-neural-silver hover:text-white transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="rounded-full bg-electric-cyan px-6 py-2.5 text-sm font-semibold text-deep-space transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-full bg-electric-cyan px-8 py-2.5 text-sm font-semibold text-deep-space transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "See Your Future Health"}
          </button>
        )}
      </div>
    </div>
  );
}
