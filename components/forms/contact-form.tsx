"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  contactSchema,
  type ContactInput,
  type ContactValues,
} from "@/lib/schemas/contact";
import { contactWhatsappUrl } from "@/lib/lead/whatsapp";
import { useLeadForm } from "@/components/forms/use-lead-form";
import { LeadSuccess } from "@/components/forms/lead-success";
import {
  HoneypotField,
  ServiceSelectField,
  TextField,
  TextareaField,
} from "@/components/forms/fields";

/**
 * The contact form. Collects only what an assessment needs (name, phone,
 * service, message), validates with the shared zod schema, and hands the
 * result to WhatsApp through the shared lead hook. Once sent, the whole form is
 * replaced by the confirmation panel, which doubles as the guard against a
 * duplicate submission since the inputs are gone.
 */
function ContactForm() {
  const { status, whatsappUrl, submit, reset } = useLeadForm<ContactValues>();

  const form = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      service: undefined,
      message: "",
      company: "",
    },
  });

  const onSubmit = form.handleSubmit((values) =>
    submit(values, contactWhatsappUrl),
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

        <ServiceSelectField label="Service you need" />

        <TextareaField
          name="message"
          label="How can we help?"
          rows={5}
          placeholder="Tell us a little about your home or business and what you are looking for."
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

export { ContactForm };
