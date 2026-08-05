"use client";

import { usePathname } from "next/navigation";

/* Every link here resolves to something that exists. About, Careers, Terms of
   Service, TGA Compliance and Accessibility were removed rather than left
   pointing at "#" — they can come back when there is a page to point at. */
const siteLinks = [
  { label: "How It Works", hash: "#how-it-works" },
  { label: "Technology", hash: "#technology" },
  { label: "Pricing", hash: "#pricing" },
  { label: "Trust & Safety", hash: "#trust" },
];

export function Footer() {
  const pathname = usePathname();
  /* Section anchors only resolve on the home page; from anywhere else they
     have to travel there first. */
  const anchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  const legalLinks = [
    { label: "Privacy & Collection Notice", href: "/privacy" },
    { label: "Medical Disclaimer", href: anchor("#medical-disclaimer") },
  ];

  return (
    <footer className="relative border-t border-neural-silver/5">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-electric-cyan to-electric-cyan-dim flex items-center justify-center">
                <span className="text-deep-space font-bold text-xs font-[family-name:var(--font-space-grotesk)]">
                  F
                </span>
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-space-grotesk)]">
                Future<span className="text-electric-cyan">Scan</span>
              </span>
            </div>
            <p className="text-sm text-neural-silver/80 max-w-sm leading-relaxed">
              Transforming preventative health with affordable, AI-powered MRI
              scanning. Sydney, Australia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.hash}>
                  <a
                    href={anchor(link.hash)}
                    className="text-sm text-neural-silver/80 hover:text-electric-cyan transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-neural-silver/80 hover:text-electric-cyan transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neural-silver/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neural-silver/70">
              &copy; {new Date().getFullYear()} FutureScan Pty Ltd. All rights reserved. ABN pending.
            </p>
            <p className="text-xs text-neural-silver/70 max-w-lg text-center sm:text-right">
              FutureScan uses TGA-registered AI as clinical decision support. All scans
              are reviewed by qualified radiologists. This service does not replace
              medical advice from your GP or specialist.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
