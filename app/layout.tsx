import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

const title = `${profile.name} | ${profile.role}`;
const description = `Portfolio of ${profile.name}, a full-stack developer working with React, Node.js and MongoDB.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: profile.siteUrl,
    siteName: profile.name,
    type: "website",
    locale: "en",
  },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
