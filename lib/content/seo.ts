import type { Metadata } from "next";

import { company } from "./company";

/**
 * Centralized SEO defaults and a per page metadata builder. Every page's
 * metadata flows through `buildMetadata`, so titles, canonicals, Open Graph,
 * and Twitter cards stay consistent and correct without being retyped per page.
 *
 * The origin is read from `NEXT_PUBLIC_SITE_URL` so the production domain is a
 * deploy time setting, not a code change. Until it is set it falls back to a
 * clearly non-real placeholder, which keeps canonical and OG URLs valid but
 * obviously-to-be-replaced.
 */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://excessenergy.example"
).replace(/\/+$/, "");

export const siteConfig = {
  name: company.name,
  /**
   * The home page and brand title, used as the root title default and the Open
   * Graph title when a page sets none. Child pages template off `name` instead.
   * Descriptive rather than the bare tagline, since this is the <title> search
   * engines weigh most.
   */
  defaultTitle: `${company.name} | Solar and battery systems for reliable power`,
  description:
    "Reliable, affordable, professionally installed clean energy for homes, businesses, and institutions across Ogun, Lagos, and Ibadan. Solar, inverters, battery storage, and more.",
  /** Production origin, no trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
  url: SITE_URL,
  locale: "en_NG",
  keywords: [
    "solar installation Nigeria",
    "clean energy",
    "inverter installation",
    "battery storage",
    "commercial solar",
    "solar Lagos",
    "solar Ogun",
    "solar Ibadan",
  ],
} as const;

/** Resolve a site relative path to an absolute URL for sitemaps and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

export interface BuildMetadataOptions {
  /**
   * The page title, unbranded. It is templated to "Title | Excess Energy" by
   * the root layout. Omit for the home page to inherit the brand default.
   */
  title?: string;
  description?: string;
  /** Site relative path, e.g. "/services". Sets the canonical and OG url. */
  path?: string;
  /** Open Graph type. "article" for project stories, "website" otherwise. */
  ogType?: "website" | "article";
  keywords?: readonly string[];
}

/**
 * Build a page's metadata from the shared defaults. The returned `title` is the
 * bare page title so the root layout's template brands it; Open Graph and
 * Twitter carry the fully branded title since templates do not apply to them.
 * openGraph and twitter are always complete objects, which matters because
 * page metadata shallow-replaces the layout's, so partial objects would drop
 * fields rather than merge.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  ogType = "website",
  keywords = siteConfig.keywords,
}: BuildMetadataOptions = {}): Metadata {
  const brandedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;

  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: brandedTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
    },
  };
}
