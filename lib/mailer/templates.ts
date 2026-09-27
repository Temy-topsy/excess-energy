export const DEFAULT_SENDER_NAME = "Temy From Excess energy";
export const DEFAULT_SENDER_EMAIL = "info.excessenergy@gmail.com";
export const DEFAULT_FROM = `"${DEFAULT_SENDER_NAME}" <${DEFAULT_SENDER_EMAIL}>`;

/**
 * Branded Excess Energy HTML email wrapper
 */
export function wrapEmailHtml(contentHtml: string, title?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || "Excess Energy"}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      color: #1e293b;
      line-height: 1.6;
    }
    .wrapper {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      padding: 28px 24px;
      text-align: center;
      border-bottom: 3px solid #eab308;
    }
    .header h1 {
      color: #ffffff;
      font-size: 22px;
      margin: 0;
      letter-spacing: -0.5px;
      font-weight: 700;
    }
    .header p {
      color: #94a3b8;
      font-size: 13px;
      margin: 4px 0 0 0;
    }
    .content {
      padding: 32px 28px;
      font-size: 15px;
      color: #334155;
    }
    .content h2 {
      color: #0f172a;
      font-size: 18px;
      margin-top: 0;
    }
    .content p {
      margin: 0 0 16px 0;
    }
    .highlight-box {
      background: #fefce8;
      border-left: 4px solid #eab308;
      padding: 16px;
      border-radius: 6px;
      margin: 20px 0;
      font-size: 14px;
      color: #713f12;
    }
    .btn {
      display: inline-block;
      background: #eab308;
      color: #0f172a !important;
      font-weight: 600;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      margin: 16px 0;
      text-align: center;
    }
    .footer {
      background: #f1f5f9;
      padding: 20px 28px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #0284c7;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>EXCESS ENERGY</h1>
      <p>Clean, Reliable & Uninterrupted Power</p>
    </div>
    <div class="content">
      ${contentHtml}
    </div>
    <div class="footer">
      <p style="margin: 0 0 6px 0;">Sent with ⚡ by <strong>Temy from Excess Energy</strong></p>
      <p style="margin: 0;">Visit us at <a href="https://excessenergy.app">excessenergy.app</a></p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Built-in email templates
 */
export const EMAIL_TEMPLATES = {
  welcome: {
    id: "welcome",
    name: "Automated Welcome Email",
    subject: "Welcome to Excess Energy! ⚡ (Message from Temy)",
    body: `<h2>Hello and welcome!</h2>
<p>I'm <strong>Temy</strong> from Excess Energy, and I'm really excited you decided to connect with us.</p>
<p>Whether you're tired of erratic power outages, rising fuel and electricity costs, or simply looking to upgrade to a dependable solar setup, we are here to guide you every step of the way.</p>

<div class="highlight-box">
  <strong>What you can expect from us:</strong>
  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
    <li>Honest solar advice tailored to your real power load.</li>
    <li>Pro-tips on maximizing your battery lifespan and efficiency.</li>
    <li>First access to limited promotional offers and new inverter packages.</li>
  </ul>
</div>

<p>Feel free to explore our ready-to-install packages or hit reply to this email anytime you have questions.</p>

<div style="text-align: center;">
  <a href="https://excessenergy.app/services" class="btn">Explore Solar Packages</a>
</div>

<p style="margin-top: 24px;">Warm regards,<br><strong>Temy</strong><br><em>Excess Energy</em></p>`,
  },
  promo: {
    id: "promo",
    name: "Special Promo / Discount",
    subject: "⚡ Exclusive Solar Offer from Excess Energy",
    body: `<h2>Special Solar Offer Just for You!</h2>
<p>Hi there,</p>
<p>Temy from Excess Energy here with some exciting news! For a limited time, we're offering an exclusive discount on our complete solar and inverter installations.</p>

<div class="highlight-box">
  <strong>🌟 Exclusive Subscriber Deal:</strong><br>
  Get free installation accessories + full system optimization when you order any of our 2kVA, 4kVA, or 5kVA complete solar packages this month.
</div>

<p>Every setup includes Tier-1 solar panels, high-discharge lithium/tubular battery systems, and our full warranty guarantee.</p>

<div style="text-align: center;">
  <a href="https://excessenergy.app/services" class="btn">Claim Your Discount Today</a>
</div>

<p>Reply directly to this email or chat with us on WhatsApp to lock in your slot before offer ends.</p>

<p style="margin-top: 24px;">Best regards,<br><strong>Temy</strong><br><em>Excess Energy</em></p>`,
  },
  maintenance: {
    id: "maintenance",
    name: "Maintenance & Energy Tips",
    subject: "💡 How to make your solar batteries last 3x longer",
    body: `<h2>Pro Solar Tips from Temy</h2>
<p>Hi there,</p>
<p>Temy from Excess Energy here with a quick tip on keeping your solar and inverter system performing at 100%.</p>

<p>Did you know that frequent deep discharges (running your battery down to 0%) drastically reduce battery life? Here are 3 quick rules to protect your investment:</p>

<div class="highlight-box">
  <ol style="margin: 0; padding-left: 20px;">
    <li style="margin-bottom: 6px;"><strong>Keep battery depth of discharge below 80%</strong> to preserve cycle count.</li>
    <li style="margin-bottom: 6px;"><strong>Dust your solar panels monthly</strong> — layer of dust can drop generation by up to 25%!</li>
    <li><strong>Ventilate your inverter room</strong> — cooler inverters run far more efficiently.</li>
  </ol>
</div>

<p>Need your existing setup inspected or optimized? Reply to this email and our engineering team will assist you.</p>

<p style="margin-top: 24px;">Stay energized,<br><strong>Temy</strong><br><em>Excess Energy</em></p>`,
  },
  announcement: {
    id: "announcement",
    name: "New Package / Product Announcement",
    subject: "🚀 Just Launched: Brand New Solar Packages at Excess Energy",
    body: `<h2>Exciting News: New Solar Packages Are Here!</h2>
<p>Hi,</p>
<p>Temy here! We have just updated our solar package lineup with upgraded lithium capacity, faster hybrid inverters, and sleeker installations designed specifically to handle tough power conditions.</p>

<div class="highlight-box">
  <strong>What's New:</strong><br>
  Faster charging rates, higher surge capacity for pumping machines & ACs, and quiet, clean uninterrupted energy.
</div>

<div style="text-align: center;">
  <a href="https://excessenergy.app/services" class="btn">View New Packages</a>
</div>

<p>Check them out on our website, or reply to this email for a custom load assessment.</p>

<p style="margin-top: 24px;">Warmly,<br><strong>Temy</strong><br><em>Excess Energy</em></p>`,
  },
  custom: {
    id: "custom",
    name: "Custom / Blank Template",
    subject: "Update from Excess Energy",
    body: `<h2>Hello!</h2>
<p>Type your custom message here...</p>
<p style="margin-top: 24px;">Warm regards,<br><strong>Temy</strong><br><em>Excess Energy</em></p>`,
  },
};
