import { z } from "zod";

import {
  honeypot,
  nameField,
  nigerianPhone,
  serviceField,
} from "@/lib/schemas/fields";

/**
 * One schema, shared by the client form (react-hook-form) and the server
 * action, so validation never drifts between the two. Collects only what the
 * assessment needs: Name, Phone, Service, Message. Field rules live in the
 * shared fields module so the quote form reuses the exact same ones.
 */

export const contactSchema = z.object({
  name: nameField,
  phone: nigerianPhone,
  service: serviceField,
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about what you need")
    .max(1000, "Message is too long"),
  /** Honeypot. Must stay empty. Real users never see it. */
  company: honeypot,
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;
