import { MapPin, Globe } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { Card } from "@/components/ui/card";
import { company } from "@/lib/content/company";

/**
 * Service coverage. The current regions render from company.coverageAreas, so a
 * new state is a one line data edit that adds a card here automatically, no
 * layout change. Beneath the areas, a quiet strip notes that projects beyond the
 * core regions are available on request, keeping the nationwide ambition honest
 * and additive.
 */
function ServiceCoverage() {
  return (
    <Section id="coverage" tone="muted" aria-labelledby="coverage-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Service coverage"
          headingId="coverage-heading"
          heading="Where we work."
          lead="We currently install and support systems Nationwide."
          className="max-w-2xl"
        />

        <div className="flex flex-col gap-6">
          <Grid cols={3} gap="lg">
            {company.coverageAreas.map((area) => (
              <Card key={area} className="flex-row items-center gap-4 p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xs bg-primary/15 text-foreground">
                  <MapPin className="size-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-h4 text-foreground">{area}</span>
                  <span className="text-body-sm text-muted-foreground">
                    Active coverage
                  </span>
                </div>
              </Card>
            ))}
          </Grid>


        </div>
      </Container>
    </Section>
  );
}

export { ServiceCoverage };
