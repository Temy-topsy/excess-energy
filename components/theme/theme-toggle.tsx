"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Light and dark switch. The two icons are stacked and cross faded purely in CSS
 * off the `.dark` class, so the correct one is painted on first load with no
 * hydration flicker and no mounted guard. The click reads the resolved theme to
 * decide the next value, falling back to the live class on <html> if the
 * provider has not resolved yet. Motion is a token driven transition, so it
 * calms automatically under prefers-reduced-motion via the global safety net.
 */

interface ThemeToggleProps {
  className?: string;
}

function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle() {
    const current =
      resolvedTheme ??
      (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light");
    setTheme(current === "dark" ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={cn("text-muted-foreground hover:text-foreground", className)}
    >
      <Sun
        aria-hidden="true"
        className="size-5 scale-100 rotate-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] dark:scale-0 dark:-rotate-90"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-5 scale-0 rotate-90 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] dark:scale-100 dark:rotate-0"
      />
    </Button>
  );
}

export { ThemeToggle };
