import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/content/seo";
import { getServiceDetailSlugs } from "@/lib/content/service-details";
import { getProjectSlugs } from "@/lib/content/projects";
// import { getLocationSlugs } from "@/lib/content/locations";

/**
 * The sitemap, generated at build from the same content data that generates the
 * pages, so a new service or project is listed here the moment it is added, with
 * no separate edit. Detail routes are enumerated from their slug helpers; the
 * static routes are listed explicitly with intent-based priorities.
 *
 * Location pages are reserved but not built (see lib/content/locations.ts).
 * When they ship, uncomment the import above and the locations block below and
 * they join the sitemap automatically.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/services"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/request-quote"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getServiceDetailSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const projectRoutes: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: absoluteUrl(`/projects/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Reserved for future /locations/[slug] pages. Uncomment with the import above
  // when those pages exist so they are indexed the day they ship.
  // const locationRoutes: MetadataRoute.Sitemap = getLocationSlugs().map((slug) => ({
  //   url: absoluteUrl(`/locations/${slug}`),
  //   lastModified,
  //   changeFrequency: "monthly",
  //   priority: 0.8,
  // }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
