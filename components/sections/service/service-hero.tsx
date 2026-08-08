import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/common/media";
import { primaryCta, secondaryCta } from "@/lib/content/nav";
import type { Service } from "@/lib/content/types";
import type { ServiceDetail } from "@/lib/content/service-details";

/**
 * The service page hero. An asymmetric layout shared by every service: the
 * title, short description, and both standard calls to action on the left, a
 * media panel on the right. The panel shows the service photograph when one is
 * set and degrades to a branded icon placeholder when it is not, so a service
 * ships with or without photography and swaps one in later by editing data.
 *
 * A server component with no client code, so the page paints as static HTML
 * with no layout shift; the photograph carries the composition.
 */
function ServiceHero({
  service,
  detail,
}: {
  service: Service;
  detail: ServiceDetail;
}) {
  const Icon = service.icon;

  return (
    <Section
      spacing="none"
      aria-labelledby="service-hero-heading"
      className="relative isolate overflow-hidden"
    >
      <Container className="flex flex-col">
        <div className="flex flex-col justify-center gap-10 py-12 sm:py-16 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-20">
          <div className="flex flex-col gap-6 sm:gap-7">
            <h1
              id="service-hero-heading"
              className="text-h1 text-foreground text-balance sm:text-display"
            >
              {service.name}
            </h1>
            <p className="max-w-xl text-body-lg text-muted-foreground text-pretty">
              {service.description}
            </p>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover/button:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
          </div>

          <div className="relative lg:justify-self-end lg:w-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-md border border-border/80 sm:translate-x-4 sm:translate-y-4"
            />
            <Media
              ratio="4/3"
              src={detail.coverImage}
              alt={detail.coverAlt ?? ""}
              preload={Boolean(detail.coverImage)}
              sizes="(min-width: 1024px) 46vw, 100vw"
              imageProps={
                detail.coverImage ? { placeholder: "blur" } : undefined
              }
              className="relative border border-border shadow-lg"
            >
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="flex size-20 items-center justify-center rounded-md bg-primary/15 text-foreground">
                  <Icon className="size-10" aria-hidden="true" />
                </span>
              </div>
            </Media>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { ServiceHero };
