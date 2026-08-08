import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { ValueCard } from "@/components/common/value-card";
import type { ServiceDetail } from "@/lib/content/service-details";

/**
 * The benefits grid: the concrete gains a service delivers, each as a reused
 * ValueCard so the treatment matches the rest of the site. Benefits are data,
 * so the count and copy vary per service without any layout change.
 */
function ServiceBenefits({ detail }: { detail: ServiceDetail }) {
  return (
    <Section aria-labelledby="benefits-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Benefits"
          headingId="benefits-heading"
          heading="What you gain."
          lead="The practical difference this service makes, from the first day it runs."
          className="max-w-2xl"
        />

        <Grid cols={2} gap="lg">
          {detail.benefits.map((benefit) => (
            <ValueCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export { ServiceBenefits };
