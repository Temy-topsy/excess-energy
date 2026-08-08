"use server";

import { contactSchema } from "@/lib/schemas/contact";
import { deliverLead } from "@/lib/notifier";

/**
 * Server action for the assessment and contact forms. Validation is
 * authoritative here (the client schema is for UX only), spam is filtered by a
 * honeypot plus basic rate limiting, and delivery is handed to the swappable
 * notifier. Designed for useActionState: it takes the previous state and the
 * submitted FormData and returns the next state.
 */

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      /** Field level messages, keyed by field name, for inline display. */
      errors?: Record<string, string>;
    };

export const initialContactState: ContactState = { status: "idle" };

/**
 * Naive in-memory rate limiter. Enough to blunt casual abuse in a single
 * instance. A durable store (Redis, database) replaces this when a backend is
 * chosen; the call site does not change.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  // Date.now is only read on the server at request time, never at build.
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a real user never fills the hidden company field. Pretend success
  // so a bot gets no signal, but deliver nothing.
  if (((formData.get("company") as string) ?? "").length > 0) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  if (isRateLimited("global")) {
    return {
      status: "error",
      message: "Too many requests. Please wait a moment and try again.",
    };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    message: formData.get("message"),
    company: formData.get("company") ?? undefined,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "");
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  try {
    await deliverLead(parsed.data);
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong sending your request. Please call us instead.",
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}

const SUCCESS_MESSAGE =
  "Thank you. Your request has reached us and our team will call you shortly.";
