import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://callalouventures.com"),
  title: {
    default: "Callalou Ventures",
    template: "%s | Callalou Ventures",
  },
  description: "Invest in a future where everyone has a place to belong.",
  openGraph: {
    title: "Callalou Ventures",
    description: "Invest in a future where everyone has a place to belong.",
    url: "https://callalouventures.com",
    siteName: "Callalou Ventures",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-stone-50 text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
