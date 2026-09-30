"use server";

import { getAdminSupabase } from "@/lib/cms/supabase";
import { sendEmail } from "@/lib/mailer/email";
import { EMAIL_TEMPLATES } from "@/lib/mailer/templates";

/**
 * Subscribe an email address directly (e.g. from lead forms that don't use
 * useActionState). Fire-and-forget safe — callers can void the result when
 * they don't need to surface errors to the UI.
 */
export async function subscribeEmailDirect(rawEmail: string) {
  const email = rawEmail?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    const adminSupabase = getAdminSupabase();

    // Check if already subscribed (anti-duplicate)
    const { data: existing } = await adminSupabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return {
        success: true,
        alreadySubscribed: true,
      };
    }

    // Insert new subscriber
    const { error: insertError } = await adminSupabase
      .from("newsletter_subscribers")
      .insert({ email, status: "active" });

    if (insertError && insertError.code === "23505") {
      return { success: true, alreadySubscribed: true };
    }

    if (insertError) {
      console.error("Newsletter insert error:", insertError.message);
      return { error: "Something went wrong. Please try again later." };
    }

    // Send welcome email — best effort, never throws
    try {
      await sendEmail({
        to: email,
        subject: EMAIL_TEMPLATES.welcome.subject,
        html: EMAIL_TEMPLATES.welcome.body,
      });
    } catch (mailError: unknown) {
      console.error("Welcome email delivery note:", (mailError as Error)?.message || mailError);
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("Newsletter error:", err);
    return { error: "Something went wrong. Please try again later." };
  }
}
