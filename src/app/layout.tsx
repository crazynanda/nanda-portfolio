import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import TargetCursor from "@/components/layout/TargetCursor";

export const metadata: Metadata = {
  title: "Nanda Kumar | Portfolio",
  description: "Web Designer & Developer - Building AI-powered websites and modern web experiences",
  keywords: ["web designer", "web developer", "frontend", "React", "Next.js", "AI integration", "portfolio"],
  authors: [{ name: "Nanda Kumar" }],
  creator: "Nanda Kumar",
  publisher: "Nanda Kumar",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nandakumar.site",
    siteName: "Nanda Kumar Portfolio",
    title: "Nanda Kumar | Portfolio",
    description: "Web Designer & Developer - Building AI-powered websites and modern web experiences",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nanda Kumar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nanda Kumar | Portfolio",
    description: "Web Designer & Developer - Building AI-powered websites and modern web experiences",
    images: ["/images/og-image.jpg"],
    creator: "@nandakumar",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#edf1e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nanda Kumar" />
        <link rel="canonical" href="https://nandakumar.site" />
      </head>
      <body className="custom-cursor-active">
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          hoverDuration={0.2}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
