import nodemailer from "nodemailer";
import { wrapEmailHtml, DEFAULT_FROM } from "./templates";

export * from "./templates";

export function getTransporter() {
  const user = process.env.EMAIL_USER || "info.excessenergy@gmail.com";
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
 * Send an email using Nodemailer
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

  const mailOptions = {
    from: DEFAULT_FROM,
    to: recipients,
    subject,
    html: wrapEmailHtml(html, subject),
    text: text || "Please open this email in an HTML compatible mail client.",
  };

  return await transporter.sendMail(mailOptions);
}
