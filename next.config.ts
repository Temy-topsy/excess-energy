import type { NextConfig } from "next";

/**
 * Security headers applied to every response. These are the broadly safe,
 * high-value defaults: they stop MIME sniffing, clickjacking, and referrer
 * leakage, and enforce HTTPS once the site is live. A strict Content-Security-
 * Policy is intentionally NOT set here: next-themes and Next's runtime inject
 * inline scripts, so a correct CSP needs per-request nonces or hashes. That is
 * tracked as a pre-launch task rather than shipped half-done, which would be
 * worse than none.
 */
const securityHeaders = [
  {
    // Enforce HTTPS for two years, including subdomains. Only takes effect over
    // an existing HTTPS connection, so it is inert during local HTTP dev.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Never let a browser second-guess a declared content type.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // No other origin may frame the site: blocks clickjacking.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Send the origin on cross-origin requests, the full path same-origin.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    // Deny powerful features outright; nothing on the site uses them.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Drop the X-Powered-By: Next.js header; no reason to advertise the stack.
  poweredByHeader: false,
  images: {
    // Serve AVIF where supported, WebP otherwise: smaller photos, better LCP.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
