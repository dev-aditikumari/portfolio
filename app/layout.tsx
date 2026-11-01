import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const title = `${profile.name}, ${profile.role}`;
const description = `${profile.name} is a Software Engineer I at MAQ Software working on data pipelines, REST APIs and SQL, and builds full-stack apps with React and Node.js. ${profile.availability}.`;

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
  themeColor: "#000010",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
