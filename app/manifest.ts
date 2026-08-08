import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content/seo";
import { company } from "@/lib/content/company";

/**
 * The web app manifest, so the site is installable and themed when saved to a
 * home screen. It reuses the brand logo mark as the icon (an SVG scales to any
 * size, so no separate raster set is needed) and the same theme colors the
 * viewport uses, keeping the installed chrome consistent with the site.
 */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [
      {
        src: "/images/logos/logo.jpg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
