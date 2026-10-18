import Link from "next/link";

const statusItems = [
  { label: "Service", value: "Scans and bookings are not currently available." },
  { label: "Enquiries", value: "Online enquiries are not currently being accepted." },
  {
    label: "Details",
    value:
      "Clinical oversight, services, location, availability and pricing are still to be confirmed.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-deep-space">
      <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-electric-cyan/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-48 bottom-0 h-[32rem] w-[32rem] rounded-full bg-electric-cyan/5 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3" aria-label="FutureScan">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-cyan to-electric-cyan-dim text-sm font-bold text-deep-space">
              F
            </div>
            <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight">
              Future<span className="text-electric-cyan">Scan</span>
            </span>
          </div>
          <Link
            href="/privacy"
            className="rounded-sm text-sm text-neural-silver underline decoration-neural-silver/40 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-cyan"
          >
            Privacy
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <section aria-labelledby="status-heading">
            <div className="inline-flex items-center gap-2 rounded-full border border-electric-cyan/30 bg-electric-cyan/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-electric-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan" aria-hidden="true" />
              Development status
            </div>
            <h1
              id="status-heading"
              className="mt-7 max-w-3xl font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl"
            >
              FutureScan is{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-silver-light bg-clip-text text-transparent">
                in development.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-neural-silver sm:text-xl">
              We are working through the clinical, operational and privacy details
              required before presenting a health service to the public.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neural-silver/90">
              Please do not submit personal or health information through this
              website. Verified service information and contact details will be
              published here when they are ready.
            </p>
          </section>

          <section
            aria-labelledby="current-status"
            className="glass-strong glow-cyan rounded-2xl p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric-cyan">
              Current status
            </p>
            <h2
              id="current-status"
              className="mt-3 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold"
            >
              Not yet open
            </h2>
            <dl className="mt-7 divide-y divide-neural-silver/10 border-y border-neural-silver/10">
              {statusItems.map((item) => (
                <div key={item.label} className="py-5">
                  <dt className="text-sm font-medium text-white">{item.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-neural-silver">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <footer className="border-t border-neural-silver/10 py-6 text-sm text-neural-silver/70">
          © {new Date().getFullYear()} FutureScan. Status information only.
        </footer>
      </div>
    </main>
  );
}
