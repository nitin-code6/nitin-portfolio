import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nitin Kumar | Full-Stack Software Developer",
  description: "Portfolio of Nitin Kumar, an engineering student at NIT Calicut and Full-Stack Software Developer building scalable applications and systems-oriented projects.",
  keywords: ["Nitin Kumar", "Software Engineer", "Full-Stack Developer", "NIT Calicut", "CodeArena", "React", "Node.js"],
  authors: [{ name: "Nitin Kumar" }],
  openGraph: {
    title: "Nitin Kumar | Full-Stack Software Developer",
    description: "Portfolio of Nitin Kumar, an engineering student at NIT Calicut and Full-Stack Software Developer building scalable applications and systems-oriented projects.",
    type: "website",
    url: "https://nitin-portfolio.vercel.app", // Placeholder, will update if actual domain known
    siteName: "Nitin Kumar Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Kumar | Full-Stack Software Developer",
    description: "Portfolio of Nitin Kumar, Full-Stack Software Developer building scalable applications.",
    creator: "@Nitin_5432"
  }
};

import Chatbot from '@/components/Chatbot';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
