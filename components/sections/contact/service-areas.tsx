import { Globe, MapPin } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { Card } from "@/components/ui/card";
import { company } from "@/lib/content/company";

/**
 * Service areas on the contact page. Renders the current regions from
 * company.coverageAreas, so a new state is a one line data edit that adds a card
 * automatically. A closing strip keeps the nationwide ambition honest by noting
 * that work beyond the core regions is available on request. Mirrors the About
 * page coverage section so the site states its reach the same way everywhere.
 */
function ServiceAreas() {
  return (
    <Section tone="muted" aria-labelledby="contact-areas-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Service areas"
          headingId="contact-areas-heading"
          heading="Where we work."
          lead="We install and support systems across these regions, with room to grow."
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

export { ServiceAreas };
