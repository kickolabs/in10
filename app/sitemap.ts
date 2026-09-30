import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "/",
  "/about",
  "/internships",
  "/destinations",
  "/industries",
  "/how-it-works",
  "/lord-of-languages",
  "/fly-maverick",
  "/apply",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
