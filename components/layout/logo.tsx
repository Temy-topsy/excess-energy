import Link from "next/link";
import Image from "next/image";

import logoMark from "@/public/images/logos/logo.jpg";
import { company } from "@/lib/content/company";
import { cn } from "@/lib/utils";

/**
 * The brand lockup: a mark plus the company wordmark, linking home. The mark is
 * a real image (a temporary placeholder asset today) rendered through
 * next/image, so swapping in the final logo is a one line change to the import
 * above and nothing else moves. Next serves .svg sources unoptimized
 * automatically, so no config change is needed. Kept as a server component; the
 * hover treatment is pure CSS on the group.
 *
 * `showWordmark` lets tight layouts render the mark alone while assistive tech
 * still reads the full company name through the link's accessible label.
 */

interface LogoProps {
  className?: string;
  /** Hide the text wordmark, showing only the mark. Defaults to shown. */
  showWordmark?: boolean;
}

function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${company.name}, home`}
      className={cn(
        "group/logo inline-flex items-center gap-2.5 rounded-sm outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src={logoMark}
        alt=""
        width={36}
        height={36}
        preload
        className={cn(
          "size-9 rounded-sm",
          "transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
          "group-hover/logo:-translate-y-0.5",
        )}
      />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-base font-bold tracking-tight text-foreground">
            {company.name}
          </span>
          <span className="text-[0.6875rem] font-medium tracking-wide text-muted-foreground">
            {company.tagline}
          </span>
        </span>
      ) : null}
    </Link>
  );
}

export { Logo };
