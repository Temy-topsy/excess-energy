import type { MetadataRoute } from "next";

import { absoluteUrl, siteConfig } from "@/lib/content/seo";

/**
 * robots.txt, generated so it always points at the current origin and sitemap.
 * The whole site is public and indexable, so every crawler is allowed
 * everywhere; there are no private or admin routes to exclude. The sitemap and
 * host lines resolve from the same origin the rest of the SEO layer uses.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
