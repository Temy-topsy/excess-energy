"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A quiet control that returns the visitor to the top of the page. It is a real
 * button, so it is keyboard operable and carries a clear aria-label. The scroll
 * is smooth by default but snaps instantly when the visitor prefers reduced
 * motion, read live from the media query rather than assumed, so the preference
 * is honored even if it changed since load.
 *
 * A client component only because it calls window.scrollTo; it ships no state.
 */

interface BackToTopProps {
  className?: string;
}

function BackToTop({ className }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(
      "[data-hero], #main-content > :first-child",
    );
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <Button
      type="button"
      variant="default"
      size="icon"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed right-4 bottom-5 z-[var(--z-index-header)] size-11 rounded-full border border-white/15 bg-brand-dark text-white shadow-md transition-[opacity,transform,background-color] duration-[var(--duration-base)] hover:bg-brand-dark/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-6 sm:bottom-6 sm:size-12",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
        className,
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </Button>
  );
}

export { BackToTop };
