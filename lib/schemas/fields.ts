import { z } from "zod";

import { services } from "@/lib/content/services";

/**
 * Field level schemas shared by every lead form, so a rule such as what counts
 * as a valid phone number is written once and reused by the contact form, the
 * quote form, and the server action. Composing forms from these keeps
 * validation identical everywhere and the individual form schemas small.
 */

/** Slugs of services a visitor can pick, drawn from the services data. */
export const serviceSlugs = services.map((service) => service.slug) as [
  string,
  ...string[],
];

export const nameField = z
  .string()
  .trim()
  .min(2, "Please enter your name")
  .max(80, "That name is too long");

/**
 * Nigerian mobile numbers, tolerant of spaces and the common formats:
 * 0803..., +234803..., 234803.... Normalized before validating.
 */
export const nigerianPhone = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .transform((value) => value.replace(/[\s()-]/g, ""))
  .refine(
    (value) => /^(?:\+?234|0)[789][01]\d{8}$/.test(value),
    "Enter a valid Nigerian phone number",
  );

export const serviceField = z.enum(serviceSlugs, {
  message: "Select the service you need",
});

/**
 * Honeypot. A hidden field a real user never sees or fills; a bot that fills
 * every input trips it. Must stay empty. Provider agnostic, so a token based
 * check (Turnstile, reCAPTCHA) can be layered on later without changing forms.
 */
export const honeypot = z.string().max(0).optional();
