import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/common/json-ld";
import { CtaSection } from "@/components/sections/cta/cta-section";
import { PackageBenefits } from "@/components/sections/service/package-benefits";
import { PackageDetail } from "@/components/sections/service/package-detail";
import { ServiceFaq } from "@/components/sections/service/service-faq";
import { getSolarPackage, getSolarPackageSlugs } from "@/lib/content/packages";
import { buildMetadata } from "@/lib/content/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/content/structured-data";

export function generateStaticParams(): { packageSlug: string }[] {
  return getSolarPackageSlugs().map((packageSlug) => ({ packageSlug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ packageSlug: string }>;
}): Promise<Metadata> {
  const { packageSlug } = await params;
  const solarPackage = getSolarPackage(packageSlug);
  if (!solarPackage) return {};

  return buildMetadata({
    title: solarPackage.seo.title,
    description: solarPackage.seo.description,
    path: solarPackage.href,
  });
}

export default async function SolarPackagePage({
  params,
}: {
  params: Promise<{ packageSlug: string }>;
}) {
  const { packageSlug } = await params;
  const solarPackage = getSolarPackage(packageSlug);
  if (!solarPackage) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: solarPackage.name,
            description: solarPackage.seo.description,
            path: solarPackage.href,
            serviceType: "Excess Solar Package",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: solarPackage.name, path: solarPackage.href },
          ]),
        ]}
      />
      <PackageDetail solarPackage={solarPackage} />
      <PackageBenefits solarPackage={solarPackage} />
      <ServiceFaq detail={{ faq: solarPackage.faq }} />
      <CtaSection
        heading={`Ready to move forward with ${solarPackage.name}?`}
        lead="Start with a free energy assessment and we will design the right system for your needs."
        headingId="package-cta-heading"
      />
    </>
  );
}
