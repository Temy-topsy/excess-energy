/**
 * Reserved data for future location landing pages (/locations/ogun,
 * /locations/lagos, /locations/ibadan). These pages are NOT built yet; this
 * module exists so the local SEO architecture is ready to scale the day they
 * are. It mirrors the shape of services and projects: a typed record, per entry
 * SEO copy, and slug helpers, so a future /locations/[slug] route is a data and
 * route addition, never an architecture change.
 *
 * Nothing imports this yet by design. When the location pages are built:
 *   1. Add a `/locations/[slug]` route that reads these entries.
 *   2. Uncomment the locations block in app/sitemap.ts so they are indexed.
 *   3. Route each page's metadata through buildMetadata with path
 *      `/locations/${slug}`, which already produces the correct canonical and
 *      Open Graph URL with no new SEO work.
 *
 * Slugs are the coverage areas in lib/content/company.ts, kept in sync so a new
 * coverage region and its future page share one name.
 */

export interface Location {
  /** URL segment, e.g. "ogun". */
  slug: string;
  /** Display name, e.g. "Ogun State". */
  name: string;
  /** Short label for a city or state, for headings and breadcrumbs. */
  shortName: string;
  /** One line describing coverage from this base, for hero and meta copy. */
  tagline: string;
  seo: {
    title: string;
    description: string;
  };
}

export const locations: Location[] = [
  {
    slug: "ogun",
    name: "Ogun State",
    shortName: "Ogun",
    tagline:
      "Solar, inverter, and battery installations across Ogun State, installed and supported by a local team.",
    seo: {
      title: "Solar and Inverter Installation in Ogun State",
      description:
        "Professional solar, inverter, and battery storage installation across Ogun State by Excess Energy. Reliable clean power for homes and businesses, locally supported.",
    },
  },
  {
    slug: "lagos",
    name: "Lagos",
    shortName: "Lagos",
    tagline:
      "Clean energy systems for Lagos homes and businesses, designed and maintained end to end.",
    seo: {
      title: "Solar and Inverter Installation in Lagos",
      description:
        "Professional solar, inverter, and battery storage installation across Lagos by Excess Energy. Reliable clean power for homes and businesses, locally supported.",
    },
  },
  {
    slug: "ibadan",
    name: "Ibadan",
    shortName: "Ibadan",
    tagline:
      "Solar and battery systems for Ibadan, from first assessment to long term support.",
    seo: {
      title: "Solar and Inverter Installation in Ibadan",
      description:
        "Professional solar, inverter, and battery storage installation across Ibadan by Excess Energy. Reliable clean power for homes and businesses, locally supported.",
    },
  },
];

/** All location slugs, for a future generateStaticParams and the sitemap. */
export function getLocationSlugs(): string[] {
  return locations.map((location) => location.slug);
}

/** Look up one location by slug, for a future /locations/[slug] page. */
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
