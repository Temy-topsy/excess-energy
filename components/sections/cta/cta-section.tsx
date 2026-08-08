import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { primaryCta, secondaryCta } from "@/lib/content/nav";

/**
 * The closing conversion band: a dark surface that ends a page's rhythm with a
 * direct invitation and the two standard actions. Both calls to action read from
 * nav data, so the labels and targets stay identical everywhere they appear. The
 * heading and lead are props, so any page can reuse this band with its own words.
 *
 * On the dark surface the primary action keeps its yellow fill while the
 * secondary reads as a quiet outline, so one action clearly leads.
 */
function CtaSection({
  heading,
  lead,
  headingId = "cta-heading",
  className,
}: {
  heading: React.ReactNode;
  lead?: React.ReactNode;
  headingId?: string;
  className?: string;
}) {
  return (
    <Section tone="dark" aria-labelledby={headingId} className={className}>
      <Container className="flex flex-col items-center gap-8">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 id={headingId} className="text-h2 text-foreground text-balance">
            {heading}
          </h2>
          {lead ? (
            <p className="text-body-lg text-muted-foreground text-pretty">
              {lead}
            </p>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover/button:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export { CtaSection };
