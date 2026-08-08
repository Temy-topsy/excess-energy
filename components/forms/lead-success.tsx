import Link from "next/link";
import { CircleCheckBig, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { company } from "@/lib/content/company";

/**
 * The confirmation shown once a lead form hands off successfully. It confirms
 * what happened, gives a fallback WhatsApp link in case the popup was blocked,
 * offers a direct call, and lets the visitor send another message, so the form
 * is never a dead end. Shared by both forms so the success experience matches.
 */
function LeadSuccess({
  whatsappUrl,
  onReset,
}: {
  whatsappUrl: string | null;
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-6 rounded-md border border-border bg-card p-8 text-center sm:p-10"
    >
      <span className="flex size-14 items-center justify-center rounded-md bg-primary/15 text-foreground">
        <CircleCheckBig className="size-7 text-accent" aria-hidden="true" />
      </span>

      <div className="flex max-w-md flex-col gap-2">
        <h3 className="text-h4 text-foreground">Your message is ready.</h3>
        <p className="text-body text-muted-foreground text-pretty">
          We have opened WhatsApp with your details prefilled. Send it and our
          team will get back to you shortly. If WhatsApp did not open, use the
          button below.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
        {whatsappUrl ? (
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Open WhatsApp
              <MessageCircle aria-hidden="true" />
            </a>
          </Button>
        ) : null}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          <Link href={`tel:${company.phones[0].href}`}>
            Call us instead
            <Phone aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="rounded-xs text-body-sm font-medium text-muted-foreground underline-offset-4 outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Send another message
      </button>
    </div>
  );
}

export { LeadSuccess };
