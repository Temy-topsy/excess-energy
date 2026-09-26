import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { PackageCard } from "@/components/common/package-card";
import { solarPackages } from "@/lib/content/packages";
import { Button } from "@/components/ui/button";

function FeaturedPackage() {
  const featured = solarPackages.find((p) => p.slug === "1kva");

  if (!featured) return null;

  return (
    <Section id="packages" aria-labelledby="featured-package-heading">
      <Container className="flex flex-col items-center gap-10 sm:gap-12">
        <SectionHeading
          headingId="featured-package-heading"
          heading="Our Most Popular Package"
          lead="Start your energy independence with our 1kVA system. Perfect for basic home appliances and lighting."
          className="max-w-2xl text-center"
          align="center"
        />

        <div className="w-full max-w-lg text-left">
          <PackageCard solarPackage={featured} />
        </div>

        <Button asChild variant="outline" size="lg" className="mt-4">
          <Link href="/services#packages">View All Solar Packages</Link>
        </Button>
      </Container>
    </Section>
  );
}

export { FeaturedPackage };
