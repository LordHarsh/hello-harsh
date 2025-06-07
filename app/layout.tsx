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
  title: "Harsh Kumar Banka - AI/ML Engineer & Full Stack Developer",
  description: "Portfolio of Harsh Kumar Banka, AI/ML Engineer and Full Stack Developer with expertise in Python, JavaScript, Machine Learning, and Cloud Technologies.",
  keywords: [
    "Harsh Kumar Banka",
    "AI Engineer",
    "ML Engineer", 
    "Full Stack Developer",
    "Python Developer",
    "Machine Learning",
    "Deep Learning",
    "React Developer",
    "Next.js Developer"
  ],
  authors: [{ name: "Harsh Kumar Banka" }],
  creator: "Harsh Kumar Banka",
  openGraph: {
    title: "Harsh Kumar Banka - AI/ML Engineer & Full Stack Developer",
    description: "Portfolio showcasing AI/ML projects, full-stack development work, and technical expertise.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kumar Banka - AI/ML Engineer & Full Stack Developer",
    description: "Portfolio showcasing AI/ML projects, full-stack development work, and technical expertise.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark scrollbar-thin`}
      >
        {children}
      </body>
    </html>
  );
}
