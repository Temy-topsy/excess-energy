export const DEFAULT_SENDER_NAME = "Temy from Excess Energy";
export const DEFAULT_SENDER_EMAIL = "info.xsenergy1@gmail.com";
export const DEFAULT_FROM = `"${DEFAULT_SENDER_NAME}" <${DEFAULT_SENDER_EMAIL}>`;

/**
 * Anti-spam responsive table-based email wrapper
 * Built with inline styles and proper metadata to pass spam filters
 */
export function wrapEmailHtml(contentHtml: string, title?: string): string {
  const displayTitle = title || "Excess Energy";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${displayTitle}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    .email-container {
      max-width: 600px !important;
      margin: auto !important;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        margin: auto !important;
      }
      .content-padding {
        padding: 24px 18px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <center style="width: 100%; background-color: #f8fafc;">
    <!-- Hidden preheader text for clean email client previews -->
    <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
      ${displayTitle} - Clean, Reliable &amp; Uninterrupted Power from Excess Energy
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc;">
      <tr>
        <td align="center" style="padding: 24px 12px;">
          <!-- Main Card Container Table -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <!-- Header -->
            <tr>
              <td align="center" style="background-color: #0f172a; padding: 28px 24px; border-bottom: 3px solid #eab308;">
                <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">EXCESS ENERGY</h1>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Clean, Reliable &amp; Uninterrupted Power</p>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td class="content-padding" style="padding: 32px 28px; font-size: 15px; line-height: 1.6; color: #334155; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                ${contentHtml}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #f1f5f9; padding: 20px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <p style="margin: 0 0 4px 0; font-weight: 600; color: #475569;">Excess Energy</p>
                <p style="margin: 0;"><a href="https://excessenergy.app" target="_blank" style="color: #0284c7; text-decoration: none;">excessenergy.app</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
}

/**
 * Built-in email templates with anti-spam table formatting
 */
export const EMAIL_TEMPLATES = {
  welcome: {
    id: "welcome",
    name: "Automated Welcome Email",
    subject: "Welcome to Excess Energy",
    body: `<h2 style="color: #0f172a; font-size: 18px; margin-top: 0; margin-bottom: 14px; font-weight: 700;">Hello and welcome!</h2>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">I'm <strong>Temy</strong> from Excess Energy, and I'm really excited you decided to connect with us.</p>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Whether you're tired of erratic power outages, rising fuel and electricity costs, or simply looking to upgrade to a dependable solar setup, we are here to guide you every step of the way.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #fefce8; border-left: 4px solid #eab308; border-radius: 6px;">
  <tr>
    <td style="padding: 16px; font-size: 14px; color: #713f12; line-height: 1.5;">
      <strong>What you can expect from us:</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 20px;">
        <li style="margin-bottom: 4px;">Honest solar advice tailored to your real power load.</li>
        <li style="margin-bottom: 4px;">Pro-tips on maximizing your battery lifespan and efficiency.</li>
        <li>First access to limited promotional offers and new inverter packages.</li>
      </ul>
    </td>
  </tr>
</table>

<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Feel free to explore our ready-to-install packages or hit reply to this email anytime you have questions.</p>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 24px auto; text-align: center;">
  <tr>
    <td align="center" style="border-radius: 6px; background-color: #eab308;">
      <a href="https://excessenergy.app/services" target="_blank" style="display: inline-block; padding: 12px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #0f172a; text-decoration: none; border-radius: 6px;">Explore Solar Packages &rarr;</a>
    </td>
  </tr>
</table>

<p style="margin-top: 24px; margin-bottom: 0; color: #334155; line-height: 1.6;">Warm regards,<br><strong>Temy</strong><br><span style="color: #64748b; font-size: 13px;">Excess Energy</span></p>`,
  },
  promo: {
    id: "promo",
    name: "Special Promo / Discount",
    subject: "Exclusive Solar Offer - Excess Energy",
    body: `<h2 style="color: #0f172a; font-size: 18px; margin-top: 0; margin-bottom: 14px; font-weight: 700;">Special Solar Offer Just for You!</h2>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Hi there,</p>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Temy from Excess Energy here with some exciting news! For a limited time, we're offering an exclusive discount on our complete solar and inverter installations.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #fefce8; border-left: 4px solid #eab308; border-radius: 6px;">
  <tr>
    <td style="padding: 16px; font-size: 14px; color: #713f12; line-height: 1.5;">
      <strong>Exclusive Subscriber Deal:</strong><br>
      Get free installation accessories + full system optimization when you order any of our 2kVA, 4kVA, or 5kVA complete solar packages this month.
    </td>
  </tr>
</table>

<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Every setup includes Tier-1 solar panels, high-discharge lithium/tubular battery systems, and our full warranty guarantee.</p>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 24px auto; text-align: center;">
  <tr>
    <td align="center" style="border-radius: 6px; background-color: #eab308;">
      <a href="https://excessenergy.app/services" target="_blank" style="display: inline-block; padding: 12px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #0f172a; text-decoration: none; border-radius: 6px;">Claim Your Discount Today &rarr;</a>
    </td>
  </tr>
</table>

<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Reply directly to this email or chat with us on WhatsApp to lock in your slot before offer ends.</p>

<p style="margin-top: 24px; margin-bottom: 0; color: #334155; line-height: 1.6;">Best regards,<br><strong>Temy</strong><br><span style="color: #64748b; font-size: 13px;">Excess Energy</span></p>`,
  },
  maintenance: {
    id: "maintenance",
    name: "Maintenance & Energy Tips",
    subject: "Solar Battery Maintenance Guide - Excess Energy",
    body: `<h2 style="color: #0f172a; font-size: 18px; margin-top: 0; margin-bottom: 14px; font-weight: 700;">Pro Solar Tips from Temy</h2>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Hi there,</p>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Temy from Excess Energy here with a quick tip on keeping your solar and inverter system performing at 100%.</p>

<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Did you know that frequent deep discharges (running your battery down to 0%) drastically reduce battery life? Here are 3 quick rules to protect your investment:</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #fefce8; border-left: 4px solid #eab308; border-radius: 6px;">
  <tr>
    <td style="padding: 16px; font-size: 14px; color: #713f12; line-height: 1.5;">
      <ol style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 6px;"><strong>Keep battery depth of discharge below 80%</strong> to preserve cycle count.</li>
        <li style="margin-bottom: 6px;"><strong>Dust your solar panels monthly</strong> — a layer of dust can drop generation by up to 25%!</li>
        <li><strong>Ventilate your inverter room</strong> — cooler inverters run far more efficiently.</li>
      </ol>
    </td>
  </tr>
</table>

<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Need your existing setup inspected or optimized? Reply to this email and our engineering team will assist you.</p>

<p style="margin-top: 24px; margin-bottom: 0; color: #334155; line-height: 1.6;">Stay energized,<br><strong>Temy</strong><br><span style="color: #64748b; font-size: 13px;">Excess Energy</span></p>`,
  },
  announcement: {
    id: "announcement",
    name: "New Package / Product Announcement",
    subject: "New Solar Packages Available - Excess Energy",
    body: `<h2 style="color: #0f172a; font-size: 18px; margin-top: 0; margin-bottom: 14px; font-weight: 700;">Exciting News: New Solar Packages Are Here!</h2>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Hi,</p>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Temy here! We have just updated our solar package lineup with upgraded lithium capacity, faster hybrid inverters, and sleeker installations designed specifically to handle tough power conditions.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #fefce8; border-left: 4px solid #eab308; border-radius: 6px;">
  <tr>
    <td style="padding: 16px; font-size: 14px; color: #713f12; line-height: 1.5;">
      <strong>What's New:</strong><br>
      Faster charging rates, higher surge capacity for pumping machines &amp; ACs, and quiet, clean uninterrupted energy.
    </td>
  </tr>
</table>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 24px auto; text-align: center;">
  <tr>
    <td align="center" style="border-radius: 6px; background-color: #eab308;">
      <a href="https://excessenergy.app/services" target="_blank" style="display: inline-block; padding: 12px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #0f172a; text-decoration: none; border-radius: 6px;">View New Packages &rarr;</a>
    </td>
  </tr>
</table>

<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Check them out on our website, or reply to this email for a custom load assessment.</p>

<p style="margin-top: 24px; margin-bottom: 0; color: #334155; line-height: 1.6;">Warmly,<br><strong>Temy</strong><br><span style="color: #64748b; font-size: 13px;">Excess Energy</span></p>`,
  },
  custom: {
    id: "custom",
    name: "Custom / Blank Template",
    subject: "Update from Excess Energy",
    body: `<h2 style="color: #0f172a; font-size: 18px; margin-top: 0; margin-bottom: 14px; font-weight: 700;">Hello!</h2>
<p style="margin: 0 0 16px 0; color: #334155; line-height: 1.6;">Type your custom message here...</p>
<p style="margin-top: 24px; margin-bottom: 0; color: #334155; line-height: 1.6;">Warm regards,<br><strong>Temy</strong><br><span style="color: #64748b; font-size: 13px;">Excess Energy</span></p>`,
  },
};
