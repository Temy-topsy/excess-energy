"use server";

import { getAdminSupabase } from "@/lib/cms/supabase";
import { sendEmail, EMAIL_TEMPLATES } from "@/lib/mailer/email";

export async function subscribeNewsletterAction(prevState: any, formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    const adminSupabase = getAdminSupabase();

    // 1. Save or update subscriber in Supabase
    const { error: dbError } = await adminSupabase
      .from("newsletter_subscribers")
      .upsert({ email, status: "active" }, { onConflict: "email" });

    if (dbError) {
      console.warn("Supabase newsletter insertion warning:", dbError.message);
      // Even if table doesn't exist yet or has an error, we still attempt the welcome email
    }

    // 2. Send Automated Welcome Email from Temy
    try {
      await sendEmail({
        to: email,
        subject: EMAIL_TEMPLATES.welcome.subject,
        html: EMAIL_TEMPLATES.welcome.body,
      });
    } catch (mailError: any) {
      console.error("Failed to send welcome email:", mailError?.message || mailError);
      // Return friendly note if email SMTP fails
      return {
        success: true,
        message: "You're subscribed! (Welcome email will arrive shortly once mailer connects).",
      };
    }

    return {
      success: true,
      message: "You're subscribed! Check your inbox for a welcome email from Temy ⚡",
    };
  } catch (err: any) {
    console.error("Newsletter error:", err);
    return { error: "Something went wrong. Please try again later." };
  }
}
