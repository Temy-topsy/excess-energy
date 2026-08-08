import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import type { Service } from "@/lib/content/types";

/**
 * The services this project drew on, resolved to full service records by the
 * page and rendered as links into each service page. A quiet way to connect a
 * finished installation back to the offering behind it, so a visitor reading a
 * project can move straight to the service that delivered it.
 */
function ProjectServicesUsed({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <Section aria-labelledby="project-services-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Services used"
          headingId="project-services-heading"
          heading="What went into this project."
          lead="The services behind the installation. Follow any one to see how we approach it."
          className="max-w-2xl"
        />

        <ul className="flex flex-wrap gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.slug}>
                <Link
                  href={service.href}
                  className="group inline-flex items-center gap-3 rounded-md border border-border bg-background px-5 py-3 outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-body font-medium text-foreground">
                    {service.name}
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

export { ProjectServicesUsed };
