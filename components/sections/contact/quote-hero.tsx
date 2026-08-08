import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { company } from "@/lib/content/company";

/**
 * The quote page hero. Kept tight and reassuring: it names what the page does
 * and sets expectations (fast, no obligation) so the form directly below feels
 * quick to start. A compact strip of facts (areas, hours, a direct line) reads
 * from company data and gives an immediate alternative to the form.
 */

const facts = [
  { icon: MapPin, label: company.coverageAreas.join(", ") },
  { icon: Clock, label: `Open ${company.availability}` },
];

function QuoteHero() {
  return (
    <Section
      aria-labelledby="quote-hero-heading"
      className="relative isolate overflow-hidden"
    >
      <Container className="flex max-w-3xl flex-col gap-6">
        <h1
          id="quote-hero-heading"
          className="text-h1 text-foreground text-balance sm:text-display"
        >
          Get a quote built around your needs.
        </h1>
        <p className="max-w-xl text-body-lg text-muted-foreground text-pretty">
          Share a few details and we will prepare a quote for your project. It
          takes under a minute, and there is no obligation.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <span
                key={fact.label}
                className="inline-flex items-center gap-2 text-body-sm text-muted-foreground"
              >
                <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {fact.label}
              </span>
            );
          })}
          <Link
            href={`tel:${company.phones[0].href}`}
            className="inline-flex items-center gap-2 rounded-xs text-body-sm font-medium text-foreground underline-offset-4 outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Phone className="size-4 shrink-0 text-accent" aria-hidden="true" />
            Prefer to call? {company.phones[0].display}
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export { QuoteHero };
