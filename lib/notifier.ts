import type { ContactValues } from "@/lib/schemas/contact";

/**
 * The delivery target for a submitted assessment. This sits behind the server
 * action so the destination (email, database, WhatsApp handoff, CRM) can change
 * in one place without touching the form or the action. The concrete mechanism
 * is a pending project decision; until then, submissions are logged on the
 * server so nothing is silently dropped in development.
 *
 * Replace the body of deliverLead with the real integration when chosen.
 */

export interface LeadNotifier {
  deliver(lead: ContactValues): Promise<void>;
}

const consoleNotifier: LeadNotifier = {
  async deliver(lead) {
    // Intentionally minimal. Swap for the real notifier when decided.
    console.info("[lead] new assessment request", {
      name: lead.name,
      phone: lead.phone,
      service: lead.service,
    });
  },
};

/** The active notifier. Point this at the real implementation later. */
export const leadNotifier: LeadNotifier = consoleNotifier;

export async function deliverLead(lead: ContactValues): Promise<void> {
  await leadNotifier.deliver(lead);
}
