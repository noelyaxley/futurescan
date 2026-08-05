"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { clinicContact } from "@/lib/contact";
import {
  PLAN_EVENT,
  clearPlanFromLocation,
  planFromLocation,
  plans,
  type PlanId,
} from "@/lib/plan";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  scanType: string;
  concern: string;
  company: string;
  teamSize: string;
  preferredDate: string;
  heardAbout: string;
  plan: string;
  consent: boolean;
};

const scanTypes = [
  { id: "full-body", label: "Full Body Scan", desc: "Comprehensive head-to-toe screening" },
  { id: "brain", label: "Brain MRI", desc: "Neurological screening" },
  { id: "cardiac", label: "Cardiac MRI", desc: "Heart & cardiovascular assessment" },
  { id: "spine", label: "Spine MRI", desc: "Back, neck & spinal cord" },
  { id: "joint", label: "Joint / MSK", desc: "Knee, shoulder, hip & more" },
  { id: "abdominal", label: "Abdominal MRI", desc: "Organs, liver, kidneys" },
];

const teamSizes = [
  { value: "10-25", label: "10–25 employees" },
  { value: "26-100", label: "26–100 employees" },
  { value: "101-500", label: "101–500 employees" },
  { value: "500+", label: "More than 500 employees" },
];

const initialData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  scanType: "",
  concern: "",
  company: "",
  teamSize: "",
  preferredDate: "",
  heardAbout: "",
  plan: "",
  consent: false,
};

/* Shape check only — the address is confirmed by the email we send, not by a
   regex. Its job is to stop "a" passing as an email address. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fieldClasses =
  // transition-colors, not transition-all: the focus outline must appear at
  // full width immediately rather than animate its way in.
  "w-full rounded-xl bg-deep-space-light border border-neural-silver/10 px-4 py-3 text-white placeholder:text-neural-silver/70 transition-colors hover:border-neural-silver/20 focus-visible:border-electric-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-cyan";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-cyan";

export function IntakeForm() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const scanGroupRef = useRef<HTMLFieldSetElement>(null);

  const plan = data.plan as PlanId | "";
  const isBusiness = plan !== "" && plans[plan].audience === "business";
  const stepLabels = isBusiness
    ? ["Your Details", "Your Team", "Timing"]
    : ["Your Details", "Scan Type", "Schedule"];
  const lastStep = stepLabels.length - 1;

  const id = (name: string) => `${uid}-${name}`;

  /* The plan chosen in the pricing section arrives either on the URL (a shared
     or reloaded link) or as an event from the CTA that was just clicked. */
  useEffect(() => {
    const fromUrl = planFromLocation();
    if (fromUrl) setData((prev) => ({ ...prev, plan: fromUrl }));

    const onPlan = (event: Event) => {
      const chosen = (event as CustomEvent<PlanId>).detail;
      setData((prev) => ({ ...prev, plan: chosen, scanType: "", teamSize: "" }));
      setStep(0);
    };
    window.addEventListener(PLAN_EVENT, onPlan);
    return () => window.removeEventListener(PLAN_EVENT, onPlan);
  }, []);

  const update = (fields: Partial<FormData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const clearPlan = () => {
    clearPlanFromLocation();
    update({ plan: "", scanType: "", teamSize: "" });
    setStep(0);
  };

  const canProceed = () => {
    if (step === 0) {
      return (
        data.firstName.trim() !== "" &&
        emailPattern.test(data.email.trim()) &&
        (!isBusiness || data.company.trim() !== "")
      );
    }
    if (step === 1) return isBusiness ? data.teamSize !== "" : data.scanType !== "";
    return data.consent;
  };

  /* Named so the visitor knows why Continue is greyed, rather than guessing. */
  const blockedReason = () => {
    if (canProceed()) return "";
    if (step === 0) {
      if (data.firstName.trim() === "") return "Enter your first name to continue.";
      if (!emailPattern.test(data.email.trim()))
        return "Enter a valid email address — that is where your confirmation goes.";
      return "Enter your company name to continue.";
    }
    if (step === 1)
      return isBusiness
        ? "Choose a team size to continue."
        : "Choose a scan type to continue.";
    return "Tick the consent box to send your enquiry.";
  };

  const send = async () => {
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
      setError(
        clinicContact.phone
          ? `We couldn't send that. Please try again, or call us on ${clinicContact.phone.display}.`
          : "We couldn't send that. Please try again in a moment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    if (!canProceed()) {
      // Native validation covers the inputs; the scan picker has none of its own.
      scanGroupRef.current?.querySelector("input")?.focus();
      return;
    }
    if (step < lastStep) {
      setStep(step + 1);
      return;
    }
    void send();
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

  const reason = blockedReason();

  return (
    <form onSubmit={handleSubmit}>
      {/* Carried through from pricing, so nobody has to say it twice */}
      {plan !== "" && (
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-electric-cyan/30 bg-electric-cyan/5 px-4 py-3 text-sm">
          <span className="text-neural-silver">
            You selected:{" "}
            <span className="font-medium text-white">{plans[plan].label}</span>
          </span>
          <button
            type="button"
            onClick={clearPlan}
            className={`text-electric-cyan underline underline-offset-2 hover:text-white transition-colors rounded-sm ${focusRing}`}
          >
            Change
          </button>
        </div>
      )}

      {/* Progress bar */}
      <ol className="flex items-center gap-2 mb-8">
        {stepLabels.map((label, i) => (
          <li key={label} className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= step ? "bg-electric-cyan" : "bg-deep-space-lighter"
                }`}
              />
            </div>
            <span
              className={`text-xs transition-colors ${
                i <= step ? "text-electric-cyan" : "text-neural-silver/70"
              }`}
              aria-current={i === step ? "step" : undefined}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

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
                <label
                  htmlFor={id("firstName")}
                  className="block text-sm text-neural-silver mb-1.5"
                >
                  First name *
                </label>
                <input
                  id={id("firstName")}
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  aria-required="true"
                  value={data.firstName}
                  onChange={(e) => update({ firstName: e.target.value })}
                  className={fieldClasses}
                  placeholder="Jane"
                />
              </div>
              <div>
                <label
                  htmlFor={id("lastName")}
                  className="block text-sm text-neural-silver mb-1.5"
                >
                  Last name
                </label>
                <input
                  id={id("lastName")}
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={data.lastName}
                  onChange={(e) => update({ lastName: e.target.value })}
                  className={fieldClasses}
                  placeholder="Smith"
                />
              </div>
            </div>
            {isBusiness && (
              <div>
                <label
                  htmlFor={id("company")}
                  className="block text-sm text-neural-silver mb-1.5"
                >
                  Company *
                </label>
                <input
                  id={id("company")}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  aria-required="true"
                  value={data.company}
                  onChange={(e) => update({ company: e.target.value })}
                  className={fieldClasses}
                  placeholder="Acme Pty Ltd"
                />
              </div>
            )}
            <div>
              <label
                htmlFor={id("email")}
                className="block text-sm text-neural-silver mb-1.5"
              >
                Email *
              </label>
              <input
                id={id("email")}
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                className={fieldClasses}
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label
                htmlFor={id("phone")}
                className="block text-sm text-neural-silver mb-1.5"
              >
                Phone
              </label>
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
                className={fieldClasses}
                placeholder="04XX XXX XXX"
              />
            </div>
          </motion.div>
        )}

        {step === 1 && !isBusiness && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <fieldset ref={scanGroupRef} className="space-y-3">
              <legend className="text-sm text-neural-silver mb-4">
                Select the scan type you&apos;re interested in:
              </legend>
              {scanTypes.map((scan) => (
                <label
                  key={scan.id}
                  htmlFor={id(scan.id)}
                  className="block cursor-pointer"
                >
                  <input
                    id={id(scan.id)}
                    type="radio"
                    name="scanType"
                    value={scan.id}
                    checked={data.scanType === scan.id}
                    onChange={() => update({ scanType: scan.id })}
                    className="sr-only peer"
                  />
                  <span
                    className={`block rounded-xl border px-5 py-4 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-electric-cyan ${
                      data.scanType === scan.id
                        ? "border-electric-cyan/40 bg-electric-cyan/5"
                        : "border-neural-silver/10 bg-deep-space-light hover:border-neural-silver/20"
                    }`}
                  >
                    <span className="block font-medium text-white">{scan.label}</span>
                    <span className="block text-sm text-neural-silver/80">
                      {scan.desc}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>
          </motion.div>
        )}

        {step === 1 && isBusiness && (
          <motion.div
            key="step1-business"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <p className="text-sm text-neural-silver">
              Corporate enquiries are handled by our team directly — we&apos;ll scope
              scan types with you rather than ask you to pick one now.
            </p>
            <div>
              <label
                htmlFor={id("teamSize")}
                className="block text-sm text-neural-silver mb-1.5"
              >
                How many people would the programme cover? *
              </label>
              <select
                id={id("teamSize")}
                name="teamSize"
                required
                aria-required="true"
                value={data.teamSize}
                onChange={(e) => update({ teamSize: e.target.value })}
                className={fieldClasses}
              >
                <option value="">Select a team size...</option>
                {teamSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
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
            {!isBusiness && (
              <div>
                <label
                  htmlFor={id("concern")}
                  className="block text-sm text-neural-silver mb-1.5"
                >
                  Any specific health concerns? (optional)
                </label>
                <textarea
                  id={id("concern")}
                  name="concern"
                  aria-describedby={id("concern-notice")}
                  value={data.concern}
                  onChange={(e) => update({ concern: e.target.value })}
                  rows={3}
                  className={`${fieldClasses} resize-none`}
                  placeholder="e.g., family history of heart disease, persistent headaches..."
                />
                <p id={id("concern-notice")} className="mt-2 text-xs text-neural-silver/80">
                  Anything you write here is health information. Read what we collect
                  and why in the{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className={`text-electric-cyan underline underline-offset-2 hover:text-white transition-colors rounded-sm ${focusRing}`}
                  >
                    Privacy &amp; Collection Notice
                  </a>
                  .
                </p>
              </div>
            )}
            <div>
              <label
                htmlFor={id("preferredDate")}
                className="block text-sm text-neural-silver mb-1.5"
              >
                Preferred timeframe
              </label>
              <select
                id={id("preferredDate")}
                name="preferredDate"
                value={data.preferredDate}
                onChange={(e) => update({ preferredDate: e.target.value })}
                className={fieldClasses}
              >
                <option value="">Select a timeframe...</option>
                <option value="asap">As soon as possible</option>
                <option value="this-week">This week</option>
                <option value="next-week">Next week</option>
                <option value="this-month">This month</option>
                <option value="flexible">I&apos;m flexible</option>
              </select>
            </div>
            <div>
              <label
                htmlFor={id("heardAbout")}
                className="block text-sm text-neural-silver mb-1.5"
              >
                How did you hear about us?
              </label>
              <select
                id={id("heardAbout")}
                name="heardAbout"
                value={data.heardAbout}
                onChange={(e) => update({ heardAbout: e.target.value })}
                className={fieldClasses}
              >
                <option value="">Select an answer...</option>
                <option value="google">Google search</option>
                <option value="social">Social media</option>
                <option value="gp">My GP/doctor</option>
                <option value="friend">Friend or family</option>
                <option value="news">News article</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Consent — the collection notice sits with the thing it consents to */}
            <div className="rounded-xl border border-neural-silver/10 bg-deep-space-light/60 p-4">
              <label
                htmlFor={id("consent")}
                className="flex items-start gap-3 cursor-pointer"
              >
                <input
                  id={id("consent")}
                  name="consent"
                  type="checkbox"
                  required
                  aria-required="true"
                  checked={data.consent}
                  onChange={(e) => update({ consent: e.target.checked })}
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 accent-electric-cyan ${focusRing}`}
                />
                <span className="text-sm text-neural-silver leading-relaxed">
                  I consent to FutureScan collecting the details above
                  {!isBusiness && ", including any health information I have entered,"}{" "}
                  and storing them in our CRM to respond to this enquiry, as set out
                  in the{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className={`text-electric-cyan underline underline-offset-2 hover:text-white transition-colors rounded-sm ${focusRing}`}
                  >
                    Privacy &amp; Collection Notice
                  </a>
                  . *
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announced when it changes, reserved so the layout does not jump */}
      <div role="status" aria-live="polite" className="mt-4 min-h-[1.25rem]">
        {error && <p className="text-sm text-red-300">{error}</p>}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className={`text-sm text-neural-silver hover:text-white transition-colors rounded-sm ${focusRing}`}
          >
            Back
          </button>
        ) : (
          <div />
        )}

        <div className="flex flex-col items-end gap-2">
          {reason && (
            <p id={id("blocked")} className="text-xs text-neural-silver/80 text-right">
              {reason}
            </p>
          )}
          <button
            type="submit"
            aria-disabled={reason !== "" || submitting}
            aria-describedby={reason ? id("blocked") : undefined}
            className={`rounded-full bg-electric-cyan px-8 py-2.5 text-sm font-semibold text-deep-space transition-[opacity,box-shadow] ${focusRing} ${
              reason || submitting
                ? "opacity-40 cursor-not-allowed"
                : "hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            }`}
          >
            {step < lastStep
              ? "Continue"
              : submitting
                ? "Sending..."
                : "See Your Future Health"}
          </button>
        </div>
      </div>
    </form>
  );
}
