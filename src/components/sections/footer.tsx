export function Footer() {
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
            <p className="text-sm text-neural-silver/60 max-w-sm leading-relaxed">
              Transforming preventative health with affordable, AI-powered MRI
              scanning. Sydney, Australia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Technology", "Pricing", "Careers"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-neural-silver/60 hover:text-electric-cyan transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "TGA Compliance", "Accessibility"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-neural-silver/60 hover:text-electric-cyan transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neural-silver/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neural-silver/40">
              &copy; {new Date().getFullYear()} FutureScan Pty Ltd. All rights reserved. ABN pending.
            </p>
            <p className="text-xs text-neural-silver/30 max-w-lg text-center sm:text-right">
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
