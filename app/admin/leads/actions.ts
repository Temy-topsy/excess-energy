"use server";

import { getAdminSupabase } from "@/lib/cms/supabase";
import { sendEmail } from "@/lib/mailer/email";
import { revalidatePath } from "next/cache";

export interface LeadSubmission {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  service?: string;
  source: "quote" | "contact" | "package_cta";
  message?: string;
}

export interface SalesLead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  location: string | null;
  service: string | null;
  source: "quote" | "contact" | "package_cta";
  message: string | null;
  status: "new" | "contacted" | "quote_sent" | "won" | "lost";
  deal_value: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Capture a new lead from Quote or Contact forms.
 * Stores in Supabase sales_leads table and notifies Paul & Quadri via email.
 */
export async function captureLeadAction(data: LeadSubmission): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    const adminSupabase = getAdminSupabase();

    const cleanData = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      location: data.location?.trim() || null,
      service: data.service?.trim() || null,
      source: data.source,
      message: data.message?.trim() || null,
      status: "new",
      deal_value: 0,
      notes: null,
    };

    // Anti-duplicate check: If exact same phone/name/service was submitted within the last 15 minutes, skip creating duplicate
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { data: recentDup } = await adminSupabase
      .from("sales_leads")
      .select("id")
      .eq("source", cleanData.source)
      .eq("service", cleanData.service)
      .eq("phone", cleanData.phone)
      .gte("created_at", fifteenMinutesAgo)
      .limit(1);

    if (recentDup && recentDup.length > 0) {
      // Already recorded recently; ignore spam/refresh click
      return { success: true, leadId: recentDup[0].id };
    }

    const { data: inserted, error: insertError } = await adminSupabase
      .from("sales_leads")
      .insert(cleanData)
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to insert sales lead into Supabase:", insertError);
      // We still attempt to send alert email so no lead is lost if DB has an issue
    }

    const leadId = inserted?.id;

    // Send instant dual-notification email to Paul & Quadri
    try {
      const recipientEmails = ["paul@excessenergy.app", "quadri@excessenergy.app", "info.xsenergy1@gmail.com"];
      const cleanPhone = cleanData.phone.replace(/[^0-9+]/g, "");
      const whatsappDirectUrl = cleanPhone 
        ? `https://wa.me/${cleanPhone.startsWith("+") ? cleanPhone.slice(1) : cleanPhone.startsWith("0") ? "234" + cleanPhone.slice(1) : cleanPhone}`
        : "https://excessenergy.app/admin/leads";

      const subject = `New Lead: ${cleanData.name} - ${cleanData.service || "General Inquiry"}${cleanData.location ? ` (${cleanData.location})` : ""}`;

      const emailHtml = `
        <h2 style="color: #0f172a; font-size: 18px; margin-top: 0; margin-bottom: 12px; font-weight: 700;">
          New Lead Captured from Website (${cleanData.source.toUpperCase().replace("_", " ")})
        </h2>
        <p style="margin: 0 0 16px 0; color: #475569; font-size: 14px;">
          A potential customer just submitted their details on the website. Reach out promptly to maximize closing rate:
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 16px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #f8fafc;">
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; width: 35%;">Customer Name:</td>
            <td style="padding: 10px 14px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${cleanData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone Number:</td>
            <td style="padding: 10px 14px; color: #0284c7; font-weight: 700; border-bottom: 1px solid #e2e8f0;">
              ${cleanPhone ? `<a href="tel:${cleanPhone}" style="color: #0284c7; text-decoration: none;">${cleanData.phone}</a>` : "Not provided yet (Direct WhatsApp Click)"}
            </td>
          </tr>
          ${cleanData.email ? `
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Email:</td>
            <td style="padding: 10px 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
              <a href="mailto:${cleanData.email}" style="color: #0284c7; text-decoration: none;">${cleanData.email}</a>
            </td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Service / Package:</td>
            <td style="padding: 10px 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${cleanData.service || "Not specified"}</td>
          </tr>
          ${cleanData.location ? `
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Location:</td>
            <td style="padding: 10px 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${cleanData.location}</td>
          </tr>` : ""}
          ${cleanData.message ? `
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #475569; vertical-align: top;">Project Note:</td>
            <td style="padding: 10px 14px; color: #334155; line-height: 1.5;">${cleanData.message}</td>
          </tr>` : ""}
        </table>

        <div style="margin: 24px 0 16px 0; text-align: center;">
          ${cleanPhone ? `
          <a href="${whatsappDirectUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #22c55e; color: #ffffff; text-decoration: none; font-weight: 700; border-radius: 6px; font-size: 14px; margin-right: 8px;">
            Chat on WhatsApp &rarr;
          </a>
          <a href="tel:${cleanPhone}" style="display: inline-block; padding: 12px 24px; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; border-radius: 6px; font-size: 14px;">
            Call Customer
          </a>
          ` : `
          <a href="https://excessenergy.app/admin/leads" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; border-radius: 6px; font-size: 14px;">
            View in Admin Dashboard &rarr;
          </a>
          `}
        </div>

        <p style="margin: 16px 0 0 0; font-size: 12px; color: #94a3b8; text-align: center;">
          Excess Energy Sales Notification • View full pipeline at <a href="https://excessenergy.app/admin/leads" style="color: #0284c7;">excessenergy.app/admin/leads</a>
        </p>
      `;

      await sendEmail({
        to: recipientEmails,
        subject,
        html: emailHtml,
      });
    } catch (mailError) {
      console.error("Sales lead email notification error:", mailError);
    }

    revalidatePath("/admin/leads");
    return { success: true, leadId };
  } catch (err) {
    console.error("captureLeadAction uncaught error:", err);
    return { success: false, error: (err as Error)?.message || "Failed to process lead" };
  }
}

/**
 * Fetch all leads for admin dashboard
 */
export async function getSalesLeads(): Promise<{ leads: SalesLead[]; error?: string }> {
  try {
    const adminSupabase = getAdminSupabase();
    const { data, error } = await adminSupabase
      .from("sales_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { leads: [], error: error.message };
    }

    return { leads: (data as SalesLead[]) || [] };
  } catch (err) {
    return { leads: [], error: (err as Error)?.message || "Failed to load leads" };
  }
}

/**
 * Update a lead's status, deal value, or notes
 */
export async function updateLeadAction(
  id: string,
  updates: { status?: SalesLead["status"]; deal_value?: number; notes?: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const adminSupabase = getAdminSupabase();
    const { error } = await adminSupabase
      .from("sales_leads")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/leads");
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error)?.message || "Failed to update lead" };
  }
}
