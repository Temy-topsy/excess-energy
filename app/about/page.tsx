import type { Metadata } from "next";

import { PageHero } from "@/components/sections/hero/page-hero";
import { CompanyStory } from "@/components/sections/about/company-story";
import { MissionVision } from "@/components/sections/about/mission-vision";
import { CoreValues } from "@/components/sections/about/core-values";
import { WhyExcess } from "@/components/sections/about/why-excess";
import { ServiceCoverage } from "@/components/sections/about/service-coverage";
import { CtaSection } from "@/components/sections/cta/cta-section";
import { JsonLd } from "@/components/common/json-ld";
import { buildMetadata } from "@/lib/content/seo";
import { breadcrumbSchema } from "@/lib/content/structured-data";
import { aboutHero } from "@/lib/content/about";
import aboutHeroDesktop from "@/public/images/hero/about-hero-desktop.jpg";
import aboutHeroMobile from "@/public/images/hero/about-hero-mobile.jpg";

/**
 * The About page. It builds trust in a deliberate order: who we are and why we
 * exist, what drives us, the values and strengths behind the work, where we
 * operate, and a closing invitation to start. Every section is a self contained
 * module reading from data, and the page alternates surface tones for cadence,
 * closing on the shared dark CTA band.
 */

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Excess Energy is a Nigerian clean energy company designing, installing, and maintaining solar and battery systems for homes and businesses across Ogun, Lagos, and Ibadan.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        heading={aboutHero.heading}
        description={aboutHero.description}
        desktopImage={aboutHeroDesktop}
        mobileImage={aboutHeroMobile}
        imageAlt="About Excess Energy"
      />
      <CompanyStory />
      <MissionVision />
      <CoreValues />
      <WhyExcess />
      <ServiceCoverage />
      <CtaSection
        heading="Ready to start your energy project?"
        lead="Tell us about your home or business and we will begin with a free energy assessment."
        headingId="about-cta-heading"
      />
    </>
  );
}
