import { ChevronDown } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import type { ServiceDetail } from "@/lib/content/service-details";

/**
 * The service specific FAQ. Built on native details and summary so it is fully
 * accessible and ships zero client JavaScript, which matters most on the low
 * end phones many visitors use. The chevron rotates from the open state with no
 * script. Questions are data, unique to each service.
 */
function ServiceFaq({ detail }: { detail: ServiceDetail }) {
  return (
    <Section aria-labelledby="faq-heading">
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          overline="FAQ"
          headingId="faq-heading"
          heading="Questions, answered."
        />

        <div className="flex flex-col divide-y divide-border border-y border-border">
          {detail.faq.map((item) => (
            <details key={item.question} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-body-lg font-medium text-foreground outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                {item.question}
                <ChevronDown
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-3 pr-9 text-body text-muted-foreground text-pretty">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { ServiceFaq };
