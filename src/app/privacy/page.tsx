import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the FutureScan development status website.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-deep-space">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <Link
          href="/"
          className="rounded-sm text-sm text-electric-cyan underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-cyan"
        >
          ← Back to status
        </Link>

        <h1 className="mt-10 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold sm:text-5xl">
          Privacy
        </h1>

        <div className="mt-8 space-y-8 text-neural-silver leading-relaxed">
          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
              Current website
            </h2>
            <p className="mt-3">
              FutureScan is in development. This website currently provides
              status information only. It does not provide a booking, account or
              enquiry form, and it does not ask you to submit personal or health
              information.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
              Technical information
            </h2>
            <p className="mt-3">
              The hosting service may process standard technical request
              information, such as an IP address, browser details and request
              times, to deliver and protect the website. FutureScan has not
              enabled analytics or customer tracking scripts on this status
              page.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
              Before collection begins
            </h2>
            <p className="mt-3">
              A complete collection notice, the responsible entity and a privacy
              contact will be published before FutureScan begins accepting
              enquiries or collecting health information through this website.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
