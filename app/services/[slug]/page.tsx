import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServiceBySlug } from "@/lib/content/services";
import {
  getServiceDetail,
  getServiceDetailSlugs,
  getRelatedServices,
} from "@/lib/content/service-details";
import { buildMetadata } from "@/lib/content/seo";
import { JsonLd } from "@/components/common/json-ld";
import {
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/content/structured-data";
import { ServiceHero } from "@/components/sections/service/service-hero";
import { ServiceOverview } from "@/components/sections/service/service-overview";
import { ServiceBenefits } from "@/components/sections/service/service-benefits";
import { ServiceIdealFor } from "@/components/sections/service/service-ideal-for";
import { ServiceIncluded } from "@/components/sections/service/service-included";
import { ServiceWhyChoose } from "@/components/sections/service/service-why-choose";
import { ServiceFaq } from "@/components/sections/service/service-faq";
import { ServiceRelated } from "@/components/sections/service/service-related";
import { CtaSection } from "@/components/sections/cta/cta-section";

/**
 * The one template every service detail page shares. It reads a service's base
 * record and its long form detail from data, then composes the nine sections in
 * a fixed order that educates, builds trust, and converts. A new service page
 * needs no code here: add the service's detail entry and it is generated at
 * build. Slugs without a detail entry are not built and 404, since the set of
 * services is known.
 */

/** Prerender one page per service that has detail content. */
export function generateStaticParams(): { slug: string }[] {
  return getServiceDetailSlugs().map((slug) => ({ slug }));
}

/** The service set is known, so anything off the list is a genuine 404. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return {};

  return buildMetadata({
    title: detail.seo.title,
    description: detail.seo.description,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);

  // Guard both: a service could exist without a detail page, and the reverse
  // should never happen, but 404 rather than render a half page either way.
  if (!service || !detail) notFound();

  const related = getRelatedServices(detail.related).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: detail.seo.description,
            path: `/services/${slug}`,
            serviceType: service.name,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${slug}` },
          ]),
        ]}
      />
      <ServiceHero service={service} detail={detail} />
      <ServiceOverview detail={detail} />
      <ServiceBenefits detail={detail} />
      <ServiceIdealFor detail={detail} />
      <ServiceIncluded detail={detail} />
      <ServiceWhyChoose />
      <ServiceFaq detail={detail} />
      <ServiceRelated services={related} />
      <CtaSection
        heading={`Ready to move forward with ${service.name}?`}
        lead="Start with a free energy assessment and we will design the right system for your needs."
        headingId="service-cta-heading"
      />
    </>
  );
}
