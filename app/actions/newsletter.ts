"use server";

import { getAdminSupabase } from "@/lib/cms/supabase";
import { sendEmail } from "@/lib/mailer/email";
import { EMAIL_TEMPLATES } from "@/lib/mailer/templates";

export async function subscribeNewsletterAction(prevState: any, formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    const adminSupabase = getAdminSupabase();

    // 1. Check if already subscribed (anti-duplicate)
    const { data: existing, error: checkError } = await adminSupabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return {
        success: true,
        alreadySubscribed: true,
        message: "You're already on the list! We'll keep you updated with our latest offers and solar tips.",
      };
    }

    // 2. Insert new subscriber
    const { error: insertError } = await adminSupabase
      .from("newsletter_subscribers")
      .insert({ email, status: "active" });

    if (insertError && insertError.code === "23505") {
      // Postgres unique constraint violation
      return {
        success: true,
        alreadySubscribed: true,
        message: "You're already on the list! We'll keep you updated with our latest offers and solar tips.",
      };
    }

    // 3. Send Automated Welcome Email
    try {
      await sendEmail({
        to: email,
        subject: EMAIL_TEMPLATES.welcome.subject,
        html: EMAIL_TEMPLATES.welcome.body,
      });
    } catch (mailError: any) {
      console.error("Welcome email delivery note:", mailError?.message || mailError);
    }

    return {
      success: true,
      message: "You're subscribed! You'll receive a confirmation message shortly.",
    };
  } catch (err: any) {
    console.error("Newsletter error:", err);
    return { error: "Something went wrong. Please try again later." };
  }
}
