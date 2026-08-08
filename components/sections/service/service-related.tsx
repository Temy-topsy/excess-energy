import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { ServiceCard } from "@/components/common/service-card";
import type { Service } from "@/lib/content/types";

/**
 * Related services: three relevant services rendered with the shared
 * ServiceCard, so this section carries no bespoke card treatment and stays in
 * step with the services grid elsewhere. The three are chosen per service in
 * the detail data and resolved to full Service records by the page.
 */
function ServiceRelated({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <Section tone="muted" aria-labelledby="related-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Related services"
          headingId="related-heading"
          heading="Explore what pairs well."
          lead="Services that often work alongside this one for a more complete system."
          className="max-w-2xl"
        />

        <Grid cols={3} gap="lg">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export { ServiceRelated };
