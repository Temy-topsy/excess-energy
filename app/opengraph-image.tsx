import { ImageResponse } from "next/og";

import { company } from "@/lib/content/company";

/**
 * The default social share image for every page, generated at build. It uses
 * the bundled default font (no remote font fetch, so the build cannot fail on
 * it) and the brand palette: the bright bolt on a near-black canvas, the name,
 * and the tagline. The bolt is a data-URI image the renderer rasterizes, which
 * is more reliable than inline SVG elements.
 *
 * This root file convention applies site-wide. Per-page text (title,
 * description) is carried by each page's metadata; this image is the visual.
 */

export const alt = `${company.name} | ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bolt = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none"><defs><linearGradient id="b" x1="30" y1="12" x2="42" y2="60" gradientUnits="userSpaceOnUse"><stop stop-color="#FFC107"/><stop offset="1" stop-color="#FF8C00"/></linearGradient></defs><path d="M40.5 12L23 39.5H34.5L31.5 60L49 32.5H37.5L40.5 12Z" fill="url(#b)"/></svg>`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#0b0b0b",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={88}
            height={88}
            src={`data:image/svg+xml,${encodeURIComponent(bolt)}`}
            alt=""
          />
          <span
            style={{ fontSize: "40px", fontWeight: 700, color: "#ffffff" }}
          >
            {company.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FFC107",
            }}
          >
            Clean energy, professionally installed
          </span>
          <span
            style={{
              fontSize: "88px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            {company.tagline}
          </span>
          <span
            style={{ fontSize: "34px", color: "#c4c4c4", maxWidth: "900px" }}
          >
            Solar, inverters, and battery storage for homes and businesses
            across Ogun, Lagos, and Ibadan.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "160px",
              height: "10px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #FFC107, #FF8C00)",
            }}
          />
          <span style={{ fontSize: "24px", color: "#8a8a8a" }}>
            Request a free energy assessment
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
