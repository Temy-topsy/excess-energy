import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import type { SolarPackage } from "@/lib/content/packages";

function PackageBenefits({ solarPackage }: { solarPackage: SolarPackage }) {
  return (
    <Section aria-labelledby="benefits-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Benefits"
          headingId="benefits-heading"
          heading="What you gain."
          className="max-w-2xl"
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {solarPackage.benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-md border border-border bg-card p-4 text-center sm:min-h-32 sm:p-5"
              >
                <Icon className="size-6 text-accent" aria-hidden="true" />
                <h3 className="text-body-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export { PackageBenefits };
