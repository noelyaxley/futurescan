import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FutureScan | Affordable AI-Powered MRI Scans in Sydney",
    template: "%s | FutureScan",
  },
  description:
    "Get proactive MRI scans powered by AI diagnostics at a fraction of traditional costs. No referral needed. Results in 24 hours. Sydney's first AI-driven MRI clinic.",
  keywords: [
    "affordable MRI Australia",
    "AI radiology report",
    "private MRI scans Sydney",
    "private MRI scans Melbourne",
    "preventative health scan",
    "full body MRI scan",
    "AI MRI diagnostics",
    "cheap MRI scan Sydney",
    "proactive health screening",
    "MRI subscription Australia",
  ],
  authors: [{ name: "FutureScan" }],
  creator: "FutureScan",
  metadataBase: new URL("https://futurescan.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://futurescan.com.au",
    siteName: "FutureScan",
    title: "FutureScan | Affordable AI-Powered MRI Scans",
    description:
      "Proactive MRI scans powered by AI. Affordable. Fast. No referral needed. See your future health today.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "FutureScan - AI-Powered MRI Scans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FutureScan | Affordable AI-Powered MRI Scans",
    description:
      "Proactive MRI scans powered by AI. Affordable. Fast. No referral needed.",
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://futurescan.com.au",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/assets/icons/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/assets/icons/icon-512.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
        {/* HubSpot Tracking Code */}
        {process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID && (
          <script
            id="hs-script-loader"
            async
            defer
            src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-deep-space text-white">
        {children}
      </body>
    </html>
  );
}
