"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A slide over panel built on the radix Dialog primitive, which supplies the
 * focus trap, Escape to close, focus return to the trigger, and body scroll
 * lock for free. The mobile navigation is its main consumer, so the panel is a
 * solid surface (never glass) that reads clearly on any background.
 *
 * Motion uses the tw-animate-css enter and exit utilities keyed off the panel's
 * data-state, and honours prefers-reduced-motion through the global safety net
 * in globals.css. The overlay fades, the panel slides from its edge.
 */

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetPortal = Dialog.Portal;
const SheetTitle = Dialog.Title;
const SheetDescription = Dialog.Description;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-overlay bg-brand-dark/60",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-[var(--duration-base)]",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-[var(--duration-fast)]",
        className,
      )}
      {...props}
    />
  );
}

type SheetSide = "left" | "right";

const sideClass: Record<SheetSide, string> = {
  right:
    "inset-y-0 right-0 h-full border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
  left: "inset-y-0 left-0 h-full border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
};

interface SheetContentProps
  extends React.ComponentProps<typeof Dialog.Content> {
  side?: SheetSide;
  /** Hide the built in close button when a custom one is provided. */
  hideClose?: boolean;
}

function SheetContent({
  side = "right",
  hideClose = false,
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-sheet flex w-[min(20rem,85vw)] flex-col gap-6 bg-background p-6 shadow-lg",
          "border-border focus:outline-none",
          "data-[state=open]:animate-in data-[state=open]:duration-[var(--duration-slow)] data-[state=open]:ease-[var(--ease-out)]",
          "data-[state=closed]:animate-out data-[state=closed]:duration-[var(--duration-base)] data-[state=closed]:ease-[var(--ease-in)]",
          sideClass[side],
          className,
        )}
        {...props}
      >
        {children}
        {hideClose ? null : (
          <Dialog.Close
            data-slot="sheet-close"
            className={cn(
              "absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-sm text-muted-foreground",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
            )}
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </SheetPortal>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetTitle,
  SheetDescription,
};
export type { SheetSide, SheetContentProps };
