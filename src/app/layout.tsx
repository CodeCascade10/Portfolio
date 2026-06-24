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
  title: "Kausik Naskar | AI/ML Researcher & Backend Developer",
  description:
    "Modern portfolio website for Kausik Naskar featuring research, projects, achievements, and contact information.",
  keywords: [
    "Kausik Naskar",
    "AI/ML researcher",
    "backend developer",
    "portfolio",
    "computer science",
  ],
  openGraph: {
    title: "Kausik Naskar | AI/ML Researcher & Backend Developer",
    description:
      "Portfolio of Kausik Naskar, combining AI/ML research, backend development, and production-focused engineering.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
