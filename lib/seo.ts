import type { Metadata } from "next";
import { site } from "@/lib/site";

export function createMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.brand}`,
      description,
      url: path,
      siteName: site.brand,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.brand}`,
      description,
    },
  };
}
