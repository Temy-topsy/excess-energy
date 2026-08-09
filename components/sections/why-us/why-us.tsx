import { MapPin } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/section-heading";
import { company } from "@/lib/content/company";
import { whyUsReasons } from "@/lib/content/why-us";

/**
 * The "why choose us" section: a grid of value propositions, each an icon, a
 * short title, and a single supporting line, over a calm coverage strip that
 * states where we work. Content is data (lib/content/why-us and company), so the
 * section is a layout and new reasons or regions never touch this markup.
 *
 * The cards are static, not links, so they carry no hover treatment; the design
 * system reserves card hover for cards that are themselves links. A server
 * component with no client code.
 */

/** "Ogun State, Lagos & Ibadan" from the coverage data, kept as one source. */
function formatAreas(areas: readonly string[]): string {
  if (areas.length <= 1) return areas[0] ?? "";
  return `${areas.slice(0, -1).join(", ")} & ${areas[areas.length - 1]}`;
}

function WhyUs() {
  return (
    <Section tone="muted" aria-labelledby="why-us-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Why Excess Energy"
          headingId="why-us-heading"
          heading="Built for reliable power that lasts."
          lead="The details that keep your power on, from the components we choose to the support that follows."
          className="max-w-2xl"
        />

        <Grid cols={3} gap="lg">
          {whyUsReasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <Card key={reason.title} className="gap-4 p-6">
                <span className="flex size-12 items-center justify-center rounded-xs bg-primary/15 text-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-h4 text-foreground">{reason.title}</h3>
                  <p className="text-body-sm text-muted-foreground text-pretty">
                    {reason.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </Grid>

        {/* Coverage. The seventh highlight from the brief, given its own strip so
            the areas served read as a statement, not one card among many. */}
        <div className="flex flex-col items-start gap-5 rounded-md border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xs bg-primary/15 text-foreground">
              <MapPin className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-overline text-accent uppercase">
                Coverage
              </span>
              <p className="text-body-lg font-semibold text-foreground text-balance">
                Serving {formatAreas(company.coverageAreas)}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { WhyUs };
