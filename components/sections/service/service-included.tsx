import { Check } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import type { ServiceDetail } from "@/lib/content/service-details";

/**
 * What's included: the concrete deliverables of a service as a checked list,
 * so a prospect sees exactly what the engagement covers before they ask. Items
 * are data, and the list flows into two columns on wider screens.
 */
function ServiceIncluded({ detail }: { detail: ServiceDetail }) {
  return (
    <Section aria-labelledby="included-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="What's included"
          headingId="included-heading"
          heading="Everything in the package."
          lead="Each installation is delivered end to end, from the first assessment to handover."
          className="max-w-2xl"
        />

        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {detail.included.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-b border-border pb-4"
            >
              <Check
                className="mt-0.5 size-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span className="text-body text-foreground text-pretty">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export { ServiceIncluded };
