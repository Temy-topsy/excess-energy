"use client";

import { ArrowUp } from "lucide-react";

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
      variant="ghost"
      size="sm"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn("text-muted-foreground hover:text-foreground", className)}
    >
      Back to top
      <ArrowUp aria-hidden="true" />
    </Button>
  );
}

export { BackToTop };
