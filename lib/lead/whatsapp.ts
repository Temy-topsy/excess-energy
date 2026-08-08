import { company } from "@/lib/content/company";
import { getServiceBySlug } from "@/lib/content/services";
import type { ContactValues } from "@/lib/schemas/contact";
import type { QuoteValues } from "@/lib/schemas/quote";

/**
 * WhatsApp handoff, kept entirely separate from the UI so the message wording
 * is edited in one place and the forms stay presentational. Each builder turns
 * validated form values into a professional, prefilled message; buildWhatsappUrl
 * wraps any message in a wa.me link that opens the company's WhatsApp line.
 *
 * The destination number is company.whatsapp; changing it there changes every
 * link. To reword an outgoing message, edit the templates below, nothing else.
 */

/** Turn a service slug into its display name, falling back to the raw value. */
function serviceName(slug: string): string {
  return getServiceBySlug(slug)?.name ?? slug;
}

/** wa.me expects digits only, no plus sign or spaces. */
function whatsappNumber(): string {
  return company.whatsapp.href.replace(/\D/g, "");
}

/** Wrap a message in a wa.me link that opens the company WhatsApp chat. */
export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

/** Message for a general contact or assessment request. */
export function buildContactMessage(values: ContactValues): string {
  return [
    `Hello ${company.name}, I would like to request a free energy assessment.`,
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Service of interest: ${serviceName(values.service)}`,
    "",
    values.message,
  ].join("\n");
}

/** Message for a quote request. */
export function buildQuoteMessage(values: QuoteValues): string {
  return [
    `Hello ${company.name}, I would like to request a quote.`,
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Service needed: ${serviceName(values.service)}`,
    `Preferred location: ${values.location}`,
    "",
    "Project details:",
    values.description,
  ].join("\n");
}

/** Convenience: full WhatsApp URL straight from contact form values. */
export function contactWhatsappUrl(values: ContactValues): string {
  return buildWhatsappUrl(buildContactMessage(values));
}

/** Convenience: full WhatsApp URL straight from quote form values. */
export function quoteWhatsappUrl(values: QuoteValues): string {
  return buildWhatsappUrl(buildQuoteMessage(values));
}
