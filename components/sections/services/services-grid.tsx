import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import type { HeadingLevel } from "@/components/common/section-heading";
import { ServiceCard } from "@/components/common/service-card";
import { availableServices, comingSoonServices } from "@/lib/content/services";

/**
 * The homepage services section. It reads the services data and lays out the
 * live offerings as interactive cards, then the architected-but-not-yet-live
 * ones under a quiet roadmap heading. Both use the same ServiceCard, whose
 * status flag picks the variant, so a new service is a data change, never a
 * layout one, and each card already links to its future detail route.
 *
 * A server component: all interaction lives inside ServiceCard's links and CSS.
 * No closing call to action here; that band is its own section further down the
 * page.
 *
 * The heading level is a prop so the same section can be an h2 among others on
 * the homepage or the page's own h1 on /services, with no change to its look.
 */

interface ServicesGridProps {
  headingAs?: HeadingLevel;
}

function ServicesGrid({ headingAs = "h2" }: ServicesGridProps) {
  return (
    <Section aria-labelledby="services-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="What we do"
          headingId="services-heading"
          heading="Available services"
          as={headingAs}
        />

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {availableServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
        <SectionHeading
          heading=""
          lead="From solar and storage to security and street lighting, designed, installed, and supported by one team."
          className="max-w-2xl"
        />

        {comingSoonServices.length > 0 ? (
          <div className="flex flex-col gap-6 border-t border-border pt-10 sm:pt-12">
            <span className="text-overline text-muted-foreground uppercase">
              Coming Soon
            </span>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {comingSoonServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export { ServicesGrid };
