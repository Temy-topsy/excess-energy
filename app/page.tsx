import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero/hero";
import { WhyUs } from "@/components/sections/why-us/why-us";
import { ServicesGrid } from "@/components/sections/services/services-grid";
import { FeaturedProjects } from "@/components/sections/projects/featured-projects";
import { JsonLd } from "@/components/common/json-ld";
import { buildMetadata } from "@/lib/content/seo";
import { localBusinessSchema } from "@/lib/content/structured-data";

/**
 * The homepage. The hero fills the first screen, then the reasons to choose us,
 * the services we offer, a look at featured projects, and how the installation
 * process works. Remaining sections (coverage, FAQ, closing call to action)
 * land in later phases and slot in beneath these without touching the structure
 * here.
 */

export const metadata: Metadata = buildMetadata({
  description:
    "Excess Energy designs, installs, and maintains solar and battery systems for homes and businesses across Ogun, Lagos, and Ibadan. Request a free energy assessment.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <WhyUs />
      <ServicesGrid />
      <FeaturedProjects />
    </>
  );
}
