import { UserCheck } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import type { ServiceDetail } from "@/lib/content/service-details";

/**
 * Ideal for: the customers a service suits best, as a two column list of icon
 * and line rather than cards, so it reads as a quick qualifying checklist and
 * stays distinct from the benefit cards above. The audiences are data.
 */
function ServiceIdealFor({ detail }: { detail: ServiceDetail }) {
  return (
    <Section tone="muted" aria-labelledby="ideal-for-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Ideal for"
          headingId="ideal-for-heading"
          heading="Who it is for."
          lead="This service is a strong fit if you recognise yourself in any of these."
          className="max-w-2xl"
        />

        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {detail.idealFor.map((audience) => (
            <li key={audience} className="flex items-start gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xs bg-primary/15 text-foreground">
                <UserCheck className="size-5" aria-hidden="true" />
              </span>
              <span className="pt-1 text-body text-foreground text-pretty">
                {audience}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export { ServiceIdealFor };
