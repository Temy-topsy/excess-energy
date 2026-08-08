"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The header's presentation shell. It owns the sticky <header> element and a
 * single `scrolled` boolean, so the bar can sit transparently over the hero at
 * the top of the page and gain a restrained, legible surface once the page
 * moves. Everything inside (Logo, nav, CTA, theme toggle) is passed through as
 * server-rendered children, so this client leaf stays tiny.
 *
 * The scroll listener is passive and only setStates when the ~8px threshold is
 * crossed, so it costs nothing on the low end Android devices we target. The
 * global reduced-motion safety net in globals.css zeroes the transition for
 * users who ask for less motion.
 */

const THRESHOLD = 8;

function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const update = () => {
      const next = window.scrollY > THRESHOLD;
      // Only touch state on a real transition, not on every scroll frame.
      setScrolled((current) => (current === next ? current : next));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        "sticky top-0 z-header w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
        scrolled
          ? "border-border bg-background/80 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-transparent",
      )}
    >
      {children}
    </header>
  );
}

export { HeaderShell };
