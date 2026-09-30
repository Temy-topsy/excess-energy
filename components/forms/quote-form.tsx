"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, TriangleAlert, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  quoteSchema,
  type QuoteInput,
  type QuoteValues,
} from "@/lib/schemas/quote";
import { quoteWhatsappUrl } from "@/lib/lead/whatsapp";
import { useLeadForm } from "@/components/forms/use-lead-form";
import { LeadSuccess } from "@/components/forms/lead-success";
import {
  HoneypotField,
  ServiceSelectField,
  TextField,
  TextareaField,
} from "@/components/forms/fields";
import { subscribeEmailDirect } from "@/app/actions/subscribe-direct";

/**
 * The quote form. Collects name, phone, service, location, project description.
 * A soft newsletter opt-in sits above the submit button — checking it reveals a
 * small email field so the user can subscribe without any extra steps.
 */
function QuoteForm() {
  const { status, whatsappUrl, submit, reset } = useLeadForm<QuoteValues>();
  const [wantsNewsletter, setWantsNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const form = useForm<QuoteInput, unknown, QuoteValues>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      service: undefined,
      location: "",
      description: "",
      company: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    // Fire newsletter subscribe silently in the background — best effort, no UX block
    if (wantsNewsletter && newsletterEmail.trim()) {
      void subscribeEmailDirect(newsletterEmail.trim());
    }
    submit(values, quoteWhatsappUrl);
  });

  if (status === "success") {
    return <LeadSuccess whatsappUrl={whatsappUrl} onReset={reset} />;
  }

  const submitting = status === "submitting" || form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2">
          <TextField
            name="name"
            label="Name"
            placeholder="Your full name"
            autoComplete="name"
          />
          <TextField
            name="phone"
            label="Phone number"
            type="tel"
            inputMode="tel"
            placeholder="0803 000 0000"
            autoComplete="tel"
          />
        </div>

        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2">
          <ServiceSelectField label="Service needed" />
          <TextField
            name="location"
            label="Preferred location"
            placeholder="Area, city, or state"
            autoComplete="address-level2"
          />
        </div>

        <TextareaField
          name="description"
          label="Project description"
          rows={5}
          placeholder="A sentence or two about what you need, so we can prepare an accurate quote."
        />

        <HoneypotField />

        {/* Soft newsletter opt-in — unchecked by default, zero-friction */}
        <div className="rounded-md border border-border bg-muted/40 p-4 space-y-3">
          <label
            htmlFor="quote-newsletter-optin"
            className="flex cursor-pointer items-start gap-3"
          >
            <input
              id="quote-newsletter-optin"
              type="checkbox"
              checked={wantsNewsletter}
              onChange={(e) => setWantsNewsletter(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[#ffc107]"
            />
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-body-sm font-medium text-foreground">
                Also send me solar tips &amp; package updates
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed">
                Practical guides and early-access offers. Unsubscribe any time.
              </span>
            </span>
          </label>

          {/* Slide-in email field — only visible when opted in */}
          {wantsNewsletter && (
            <div className="pt-1 animate-in slide-in-from-top-2 duration-200">
              <label
                htmlFor="quote-newsletter-email"
                className="mb-1.5 block text-xs font-medium text-muted-foreground"
              >
                Email address for updates
              </label>
              <input
                id="quote-newsletter-email"
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          )}
        </div>

        {status === "error" ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xs border border-destructive/30 bg-destructive/10 p-3 text-body-sm font-medium text-destructive"
          >
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Something went wrong opening WhatsApp. Please try again, or call us
            directly.
          </p>
        ) : null}

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            size="lg"
            loading={submitting}
            className="w-full sm:w-auto"
          >
            Send via WhatsApp
            <Send aria-hidden="true" />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export { QuoteForm };
