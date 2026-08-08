import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/content/hero";
import { primaryCta, secondaryCta } from "@/lib/content/nav";
import { HeroTrust } from "./hero-trust";
import { HeroMedia } from "./hero-media";

/**
 * The homepage hero. An asymmetric editorial layout: the value proposition and
 * both calls to action on the left, the layered media panel on the right. On
 * phones the core hero (headline, short supporting line, both CTAs, and the
 * image) fills the first screen exactly, so nothing else competes above the
 * fold; the proof strip sits just beneath and is the first thing met on scroll.
 *
 * The background is deliberately quiet: a clean surface with no glows, grids,
 * or brand-color decoration. The photography carries the storytelling.
 *
 * A server component. The only client code is the media panel's optional
 * pointer parallax, isolated in HeroMedia, so the rest ships as static HTML for
 * a fast first paint and no layout shift.
 */

function Hero() {
  return (
    <Section
      spacing="none"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <Container className="flex flex-col">
        {/* Core hero. Fills the first screen on mobile so it stands alone; on
            desktop it holds the two-column composition centered in the view. */}
        <div className="flex min-h-[calc(100svh-var(--header-height))] flex-col justify-center gap-10 py-10 sm:py-14 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-16">
          <div className="flex flex-col gap-6 sm:gap-7">
            <h1
              id="hero-heading"
              className="text-h1 text-foreground text-balance sm:text-display"
            >
              {hero.headline}
            </h1>

            {/* Full line from the small breakpoint up; a tighter line on phones
                so the first screen stays uncrowded. */}
            <p className="hidden max-w-xl text-body-lg text-muted-foreground text-pretty sm:block">
              {hero.subheading}
            </p>
            <p className="max-w-md text-body text-muted-foreground text-pretty sm:hidden">
              {hero.subheadingShort}
            </p>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={primaryCta.href as Route}>
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
                <Link href={secondaryCta.href as Route}>
                  {secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>

          <HeroMedia className="lg:justify-self-end" />
        </div>

        {/* Proof strip. Below the first screen on phones, so scroll reveals it
            first; part of the hero's own rhythm, before the sections below. */}
        {/* <HeroTrust className="pb-16 sm:pb-20 lg:pb-24" /> topsy edit */}
      </Container>
    </Section>
  );
}

export { Hero };
