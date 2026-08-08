"use client";

import { useRef } from "react";
import { Sun } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Media } from "@/components/common/media";
import { hero } from "@/lib/content/hero";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The hero visual. Real installation photography in a layered composition with
 * depth from structure alone: an offset outline peeking behind the photo, the
 * main image frame, a soft contrast scrim, and a floating caption card over the
 * lower edge. No glow or brand-color decoration; the photograph does the work.
 * The image is data-driven (hero.media in lib/content), so swapping it or adding
 * a background video later means changing one line there, not this layout.
 *
 * Parallax: very subtle, gated on fine pointer + prefers-reduced-motion, using
 * gsap.quickTo for compositor-based interpolation. The frame and the caption
 * card drift at slightly different rates for layered depth, and the card also
 * lifts on hover.
 */

const FRAME_SHIFT = 10;
const CARD_SHIFT = 8;

interface HeroMediaProps {
  className?: string;
}

function HeroMedia({ className }: HeroMediaProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const container = containerRef.current;
      const frame = frameRef.current;
      const card = cardRef.current;

      if (prefersReducedMotion || !container || !frame || !card) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      if (!contextSafe) return;

      const settings = { duration: 0.6, ease: "power2.out" } as const;
      const frameX = gsap.quickTo(frame, "x", settings);
      const frameY = gsap.quickTo(frame, "y", settings);
      const cardX = gsap.quickTo(card, "x", settings);
      const cardY = gsap.quickTo(card, "y", settings);

      const onMove = contextSafe((event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        frameX(relX * FRAME_SHIFT);
        frameY(relY * FRAME_SHIFT);
        cardX(relX * CARD_SHIFT);
        cardY(relY * CARD_SHIFT);
      });

      const onLeave = contextSafe(() => {
        frameX(0);
        frameY(0);
        cardX(0);
        cardY(0);
      });

      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerleave", onLeave);

      return () => {
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [prefersReducedMotion], scope: containerRef },
  );

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Offset outline behind the photo, for a layered, printed-spec feel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-md border border-border/80 sm:translate-x-4 sm:translate-y-4"
      />

      <div ref={frameRef} className="group/frame relative will-change-transform">
        <Media
          ratio="16/9"
          src={hero.media.src}
          alt={hero.media.alt}
          preload
          sizes="(min-width: 1024px) 46vw, 100vw"
          imageProps={{
            placeholder: "blur",
            className:
              "object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover/frame:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/frame:scale-100",
          }}
          className="border border-border shadow-lg sm:aspect-[4/3] lg:aspect-[5/6]"
        />

        {/* Soft contrast scrim so the caption card and any future overlay stay
            legible against the photo. A photographic treatment, not decoration. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent"
        />

        {/* Floating caption card, anchored to the lower-left of the frame. */}
        <div
          ref={cardRef}
          className="absolute bottom-4 left-4 right-4 will-change-transform sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[16rem]"
        >
          <div className="flex items-center gap-3 rounded-md border border-border bg-card/95 p-3 shadow-md backdrop-blur-sm transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-0.5 sm:p-3.5">
            <span
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground"
              aria-hidden="true"
            >
              <Sun className="size-5" />
            </span>
            <span className="text-sm font-medium leading-snug text-card-foreground text-pretty">
              {hero.media.caption}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroMedia };
