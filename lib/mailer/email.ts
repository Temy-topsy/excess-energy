import nodemailer from "nodemailer";
import { wrapEmailHtml, DEFAULT_FROM } from "./templates";

export * from "./templates";

/**
 * Converts rich HTML content into clean, readable plain text.
 * Crucial for spam prevention: spam filters require a faithful
 * plain-text counterpart matching the HTML body.
 */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, "\n\n$1\n\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "• $1\n")
    .replace(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, "$2 ($1)")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/td>/gi, " ")
    .replace(/<div[^>]*>(.*?)<\/div>/gi, "$1\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}

export function getTransporter() {
  const user = process.env.EMAIL_USER || "info.xsenergy1@gmail.com";
  const pass = (process.env.EMAIL_PASS || "").replace(/\s+/g, ""); // strip any accidental spaces

  if (!pass) {
    console.warn("EMAIL_PASS is not configured in environment variables.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send an email using Nodemailer with automatic plain-text counterpart
 * and anti-spam deliverability headers.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  const transporter = getTransporter();
  const recipients = Array.isArray(to) ? to.join(", ") : to;
  const cleanSubject = subject.trim();
  const fullHtml = wrapEmailHtml(html, cleanSubject);
  const plainText = text || htmlToPlainText(html);

  const mailOptions = {
    from: DEFAULT_FROM,
    to: recipients,
    subject: cleanSubject,
    html: fullHtml,
    text: plainText,
    headers: {
      "X-Entity-Ref-ID": `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    },
  };

  return await transporter.sendMail(mailOptions);
}
