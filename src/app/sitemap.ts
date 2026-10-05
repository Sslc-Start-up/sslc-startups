import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/privacy`, lastModified: new Date("2026-10-06"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/refund-policy`, lastModified: new Date("2026-10-06"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/cookie-policy`, lastModified: new Date("2026-10-06"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
