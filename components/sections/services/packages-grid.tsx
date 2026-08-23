import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { PackageCard } from "@/components/common/package-card";
import { solarPackages } from "@/lib/content/packages";

function PackagesGrid() {
  return (
    <Section aria-labelledby="packages-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="What we do"
          headingId="packages-heading"
          heading="Available packages"
          className="max-w-2xl"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {solarPackages.map((solarPackage) => (
            <PackageCard key={solarPackage.slug} solarPackage={solarPackage} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { PackagesGrid };
