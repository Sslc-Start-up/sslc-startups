import type { MetadataRoute } from "next";
import { company, seo } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: "SSLC",
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05030f",
    theme_color: "#05030f",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
