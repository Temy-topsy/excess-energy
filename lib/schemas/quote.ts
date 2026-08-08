import { z } from "zod";

import {
  honeypot,
  nameField,
  nigerianPhone,
  serviceField,
} from "@/lib/schemas/fields";

/**
 * The quote request schema. Deliberately lean: only what is needed to prepare a
 * quote and call the visitor back. Name, phone, the service they need, where
 * the work is, and a short description of the project. Reuses the shared field
 * rules so a valid phone means the same thing here as on the contact form.
 */

export const quoteSchema = z.object({
  name: nameField,
  phone: nigerianPhone,
  service: serviceField,
  location: z
    .string()
    .trim()
    .min(2, "Where is the project located?")
    .max(120, "That location is too long"),
  description: z
    .string()
    .trim()
    .min(10, "A sentence or two about the project helps us quote it")
    .max(1000, "Description is too long"),
  /** Honeypot. Must stay empty. Real users never see it. */
  company: honeypot,
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteValues = z.output<typeof quoteSchema>;
