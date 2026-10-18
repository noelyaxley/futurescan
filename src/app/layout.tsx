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
    default: "FutureScan | In development",
    template: "%s | FutureScan",
  },
  description:
    "FutureScan is in development. Services, clinical oversight, location, availability and pricing are not yet confirmed.",
  authors: [{ name: "FutureScan" }],
  creator: "FutureScan",
  metadataBase: new URL("https://futurescan.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://futurescan.com.au",
    siteName: "FutureScan",
    title: "FutureScan | In development",
    description:
      "FutureScan is not yet open. Verified service and contact details will be published when ready.",
  },
  twitter: {
    card: "summary",
    title: "FutureScan | In development",
    description:
      "FutureScan is not yet open. Verified service and contact details will be published when ready.",
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
      <body className="min-h-full flex flex-col bg-deep-space text-white">
        {children}
      </body>
    </html>
  );
}
