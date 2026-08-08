"use client";

import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import { hero } from "@/lib/content/hero";
import { primaryCta, secondaryCta } from "@/lib/content/nav";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * The redesigned homepage hero. Uses a full viewport background image with
 * a strong, editorial layout. Mobile focuses entirely on this hero in the 
 * first 100svh.
 */
function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !contentRef.current) return;
      
      const elements = contentRef.current.children;
      gsap.fromTo(
        elements,
        { y: 24, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power3.out",
          delay: 0.1
        }
      );
    },
    { dependencies: [prefersReducedMotion], scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden pb-12 pt-32 sm:min-h-[85vh] sm:justify-center sm:pb-24 lg:min-h-[100svh]"
    >
      {/* Background Media */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        {/* Mobile Portrait */}
        <Image
          src={hero.media.mobileSrc}
          alt={hero.media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:hidden"
        />
        {/* Desktop Landscape */}
        <Image
          src={hero.media.desktopSrc}
          alt={hero.media.alt}
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center sm:block"
        />
        {/* Subtle Scrim for text readability */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      {/* Editorial Content Block */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div ref={contentRef} className="mx-auto max-w-4xl sm:mx-0">
          <h1
            id="hero-heading"
            className="mb-6 text-balance text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            {hero.headline}
          </h1>
          <p className="mb-10 max-w-xl text-pretty text-lg leading-relaxed text-zinc-200 sm:text-xl md:text-2xl">
            {hero.subheading}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap">
            <Button
              asChild
              size="lg"
              className="group/button h-14 rounded-full bg-white px-8 text-base font-semibold text-black shadow-lg transition-transform duration-300 ease-out hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.98] sm:w-auto"
            >
              <Link href={primaryCta.href as Route}>
                {primaryCta.label}
                <ArrowRight
                  className="ml-2 size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-white/30 bg-black/20 px-8 text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-colors duration-300 ease-out hover:bg-white/10 hover:text-white active:scale-[0.98] sm:w-auto"
            >
              <Link href={secondaryCta.href as Route}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
