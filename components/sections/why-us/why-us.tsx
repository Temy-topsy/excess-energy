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
          className="max-w-2xl"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {whyUsReasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <Card key={reason.title} className="flex flex-col items-center text-center gap-3 p-5 sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-body-lg font-medium text-foreground">{reason.title}</h3>
              </Card>
            );
          })}
        </div>

        {/* Coverage. The seventh highlight from the brief, given its own strip so
            the areas served read as a statement, not one card among many. */}
        <div className="flex flex-col items-start gap-6 rounded-md border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xs bg-primary/15 text-foreground">
              <MapPin className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-body-lg font-semibold text-foreground text-balance">
                {formatAreas(company.coverageAreas)}
              </p>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}

export { WhyUs };
