"use client";

import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface PageHeroProps {
  heading: string;
  description: string;
  mobileImage: StaticImageData;
  desktopImage: StaticImageData;
  imageAlt: string;
}

export function PageHero({ heading, description, mobileImage, desktopImage, imageAlt }: PageHeroProps) {
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
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.1 }
      );
    },
    { dependencies: [prefersReducedMotion], scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      data-hero
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden pb-12 pt-32 sm:min-h-[70vh] sm:justify-center sm:pb-24 lg:min-h-[85svh]"
    >
      {/* Background Media */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src={mobileImage}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:hidden"
        />
        <Image
          src={desktopImage}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center sm:block"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      </div>

      {/* Content Block */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div ref={contentRef} className="mx-auto max-w-4xl sm:mx-0">
          <h1 className="mb-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {heading}
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-200 sm:text-xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
