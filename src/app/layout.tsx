import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080d1a",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nitincode.vercel.app"),
  title: "Nitin Kumar | Backend & AI Systems Engineer",
  description: "Portfolio of Nitin Kumar, an engineering student at NIT Calicut building distributed backends and AI pipelines, from Kafka-powered code judges to a B+ tree database engine in C++.",
  keywords: [
    "Nitin Kumar",
    "Backend Engineer",
    "Distributed Systems",
    "Applied AI",
    "NIT Calicut",
    "Kafka",
    "BullMQ",
    "B+ Tree",
    "CodeArena",
    "FastAPI",
    "React",
    "C++"
  ],
  authors: [{ name: "Nitin Kumar", url: "https://github.com/nitin-code6" }],
  creator: "Nitin Kumar",
  openGraph: {
    title: "Nitin Kumar | Backend & AI Systems Engineer",
    description: "I build distributed backends and AI pipelines, from Kafka-powered code judges to a B+ tree database engine in C++.",
    url: "https://nitincode.vercel.app",
    siteName: "Nitin Kumar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Nitin Kumar — Backend & AI Systems Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Kumar | Backend & AI Systems Engineer",
    description: "I build distributed backends and AI pipelines, from Kafka-powered code judges to a B+ tree database engine in C++.",
    creator: "@Nitin_5432",
    images: ["/profile.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        {children}
      </body>
    </html>
  );
}
