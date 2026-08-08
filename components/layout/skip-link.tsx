import { cn } from "@/lib/utils";

/**
 * Keyboard and screen reader affordance. Hidden until focused, then the first
 * Tab on any page reveals a link that jumps straight to the main landmark.
 * Targets the id set on <main> in the root layout.
 */
function SkipLink({ className }: { className?: string }) {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only z-toast rounded-sm bg-primary px-4 py-2 text-body-sm font-semibold text-primary-foreground",
        "focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4",
        className,
      )}
    >
      Skip to content
    </a>
  );
}

export { SkipLink };
