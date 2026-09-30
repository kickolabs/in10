import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "International Internship Opportunities",
    template: "%s · INTERN IN10",
  },
  description:
    "INTERN IN10 connects students and candidates with international internship opportunities across hospitality, healthcare, tourism and business destinations.",
  keywords: [
    "International Internship",
    "International Internship Opportunities",
    "Overseas Internship",
    "Global Internship Programs",
    "Hospitality Internship Abroad",
    "Hotel Management Internship Abroad",
    "Healthcare Internship Abroad",
    "International Internship Programs",
    "Internship Abroad",
  ],
  openGraph: {
    siteName: site.brand,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: site.url,
    email: site.email,
    slogan: site.tagline,
  };

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
