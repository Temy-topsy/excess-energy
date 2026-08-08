import { company } from "./company";
import { absoluteUrl, siteConfig } from "./seo";

/**
 * JSON-LD structured data builders. Each returns a plain object shaped to
 * schema.org so the pages can hand it to <JsonLd> without repeating boilerplate.
 * Everything derives from the shared company data, so the graph never drifts
 * from the facts shown on the page.
 *
 * Data gap: LocalBusiness rich results want a street address and geo
 * coordinates, which the company data does not yet carry. Until they are added,
 * areaServed and the region-level address below are the honest maximum. Fill in
 * `address` (streetAddress, postalCode) and `geo` before relying on the map or
 * "near me" rich results.
 */

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Digits-only, international format phone for schema.org telephone fields. */
const primaryPhone = company.phones[0]?.href ?? company.whatsapp.href;

type JsonLdObject = Record<string, unknown>;

/** The company as an Organization, referenced by other nodes via @id. */
export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: company.name,
    legalName: company.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/logos/logo.jpg"),
    description: siteConfig.description,
    email: company.email,
    telephone: primaryPhone,
    slogan: company.tagline,
    areaServed: company.coverageAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    contactPoint: [
      ...company.phones.map((phone) => ({
        "@type": "ContactPoint",
        contactType: phone.label,
        telephone: phone.href,
        areaServed: "NG",
        availableLanguage: ["en"],
      })),
      {
        "@type": "ContactPoint",
        contactType: "Emergency",
        telephone: company.emergency.href,
        areaServed: "NG",
        availableLanguage: ["en"],
      },
    ],
  };
}

/** The site itself, so search engines tie pages to one named property. */
export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: company.name,
    description: siteConfig.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-NG",
  };
}

/**
 * The company as a LocalBusiness for map and "near me" surfaces. Address is
 * region-level only until a street address is added (see the note above).
 */
export function localBusinessSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: company.name,
    image: absoluteUrl("/images/logos/logo.jpg"),
    url: siteConfig.url,
    telephone: primaryPhone,
    email: company.email,
    priceRange: "$$",
    parentOrganization: { "@id": ORGANIZATION_ID },
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressRegion: "Ogun State",
    },
    areaServed: company.coverageAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}

/** A single service offering, provided by the organization across coverage. */
export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: ServiceSchemaInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceType ?? name,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: company.coverageAreas.map((areaName) => ({
      "@type": "AdministrativeArea",
      name: areaName,
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** An ordered breadcrumb trail, absolute-urled for the rich result. */
export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
