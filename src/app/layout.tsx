import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nanda Kumar | Portfolio",
  description: "Web Designer & Developer - Building AI-powered websites and modern web experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
