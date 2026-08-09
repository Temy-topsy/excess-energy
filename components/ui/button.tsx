import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The button, extended from the shadcn radix-nova base rather than replaced.
 * Corners use radius-sm, sizes are touch friendly for mobile first (minimum
 * 44px target), and a loading state is built in. Every variant keeps a visible
 * hover, focus-visible, active, and disabled treatment so buttons always look
 * clickable. Icons sit at 20px with a space-2 gap.
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-full border border-transparent bg-clip-padding font-medium whitespace-nowrap",
    "transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)] outline-none select-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary conversion action. Yellow fill, dark text, darkens toward
        // orange on hover. Never white text on yellow.
        default:
          "bg-primary text-primary-foreground font-semibold shadow-sm ring-1 ring-inset ring-primary/10 hover:bg-accent hover:text-accent-foreground hover:shadow active:scale-[0.98] active:shadow-sm",
        // Supporting action. Dark fill, white text, lightens one step on hover.
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-[color-mix(in_oklab,var(--secondary),white_10%)] hover:shadow-sm active:shadow-none",
        outline:
          "border-input bg-background text-foreground hover:bg-muted hover:text-foreground",
        ghost: "text-foreground hover:bg-muted hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-[color-mix(in_oklab,var(--destructive),black_8%)] hover:shadow-sm active:shadow-none focus-visible:ring-destructive/40",
      },
      size: {
        // Heights map to the documented touch targets.
        lg: "h-14 px-8 text-base", // 56px, hero and primary CTAs
        default: "h-12 px-6 text-sm", // 48px, standard actions
        sm: "h-10 px-4 text-sm", // 40px, compact contexts
        icon: "size-12", // 48px square
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /**
   * Shows an inline spinner and disables the button. The label stays rendered
   * so the width does not shift. Ignored when asChild is set, since the child
   * owns its own content.
   */
  loading?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? (
            <LoaderCircle
              className="size-5 animate-spin"
              aria-hidden="true"
            />
          ) : null}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
