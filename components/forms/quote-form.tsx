"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, TriangleAlert } from "lucide-react";

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

/**
 * The quote form. The same architecture as the contact form, with the lean set
 * of fields a quote needs: name, phone, service, location, and a short project
 * description. Nothing else, so it stays fast to complete on a phone.
 */
function QuoteForm() {
  const { status, whatsappUrl, submit, reset } = useLeadForm<QuoteValues>();

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

  const onSubmit = form.handleSubmit((values) =>
    submit(values, quoteWhatsappUrl),
  );

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
          <p className="text-body-sm text-muted-foreground">
            This opens WhatsApp with your details prefilled, ready to send.
          </p>
        </div>
      </form>
    </FormProvider>
  );
}

export { QuoteForm };
