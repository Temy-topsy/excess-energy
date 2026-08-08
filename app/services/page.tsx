import type { Metadata } from "next";

import { buildMetadata } from "@/lib/content/seo";
import { JsonLd } from "@/components/common/json-ld";
import { breadcrumbSchema } from "@/lib/content/structured-data";
import { ServicesGrid } from "@/components/sections/services/services-grid";
import { CtaSection } from "@/components/sections/cta/cta-section";
import { PageHero } from "@/components/sections/hero/page-hero";
import servicesHeroDesktop from "@/public/images/hero/services-hero-desktop.jpg";
import servicesHeroMobile from "@/public/images/hero/services-hero-mobile.jpg";

/**
 * The services listing page at /services. It reuses the same ServicesGrid
 * section the homepage uses, so the live and coming-soon offerings stay in one
 * implementation driven by the services data, and each card already links to
 * its /services/[slug] detail page. The page closes on the shared CTA band so
 * it never dead ends.
 *
 * ServicesGrid renders as an h1 here since it owns the page's top heading, where
 * on the homepage it is one h2 among several below the hero.
 */

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Explore Excess Energy's clean energy services: solar, inverter installation, battery storage, commercial solar, CCTV systems, and solar street lighting, installed and supported across Ogun, Lagos, and Ibadan.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        heading="Clean energy services."
        description="We design, install, and support solar, storage, and security systems for homes and businesses across Nigeria."
        desktopImage={servicesHeroDesktop}
        mobileImage={servicesHeroMobile}
        imageAlt="Excess Energy Services"
      />
      <ServicesGrid headingAs="h2" />
      <CtaSection
        heading="Not sure which service fits?"
        lead="Start with a free energy assessment and we will recommend the right system for your needs."
        headingId="services-cta-heading"
      />
    </>
  );
}
