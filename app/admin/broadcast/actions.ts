"use server";

import { getAdminSupabase } from "@/lib/cms/supabase";
import { sendEmail } from "@/lib/mailer/email";
import { revalidatePath } from "next/cache";

export type Subscriber = {
  id: string;
  email: string;
  status: string;
  created_at: string;
};

export async function getSubscribers(): Promise<{ subscribers: Subscriber[]; error?: string }> {
  try {
    const adminSupabase = getAdminSupabase();
    const { data, error } = await adminSupabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { subscribers: [], error: error.message };
    }

    return { subscribers: (data as Subscriber[]) || [] };
  } catch (err: unknown) {
    return { subscribers: [], error: (err as Error)?.message || "Failed to load subscribers" };
  }
}

export async function sendBroadcastAction(_prevState: unknown, formData: FormData) {
  const subject = (formData.get("subject") as string)?.trim();
  const messageHtml = (formData.get("body") as string)?.trim();
  const target = formData.get("target") as "test" | "all";
  const testEmail = (formData.get("testEmail") as string)?.trim();

  if (!subject) return { error: "Subject line is required." };
  if (!messageHtml) return { error: "Email body content is required." };

  try {
    if (target === "test") {
      if (!testEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
        return { error: "Please provide a valid test email address." };
      }

      await sendEmail({
        to: testEmail,
        subject: `[TEST] ${subject}`,
        html: messageHtml,
      });

      return {
        success: true,
        message: `Test email successfully sent to ${testEmail}!`,
      };
    }

    // Target is ALL active subscribers
    const adminSupabase = getAdminSupabase();
    const { data: subscribers, error: fetchError } = await adminSupabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("status", "active");

    if (fetchError) {
      return {
        error: `Could not fetch subscribers: ${fetchError.message}. Make sure the table exists in Supabase.`,
      };
    }

    if (!subscribers || subscribers.length === 0) {
      return { error: "No active subscribers found in your database to send to." };
    }

    const emailList = subscribers.map((s) => s.email);

    // Send emails
    // Nodemailer can accept an array or loop through recipients
    let sentCount = 0;
    const errors: string[] = [];

    for (const recipient of emailList) {
      try {
        await sendEmail({
          to: recipient,
          subject,
          html: messageHtml,
        });
        sentCount++;
      } catch (err: unknown) {
        console.error(`Failed to send to ${recipient}:`, (err as Error)?.message);
        errors.push(recipient);
      }
    }

    revalidatePath("/admin/broadcast");

    return {
      success: true,
      message: `Broadcast finished! Sent to ${sentCount} of ${emailList.length} subscribers.${
        errors.length > 0 ? ` (${errors.length} failed)` : ""
      }`,
    };
  } catch (err: unknown) {
    console.error("Broadcast send error:", err);
    return {
      error: `Mailer error: ${(err as Error)?.message || "Failed to send email. Check credentials."}`,
    };
  }
}
