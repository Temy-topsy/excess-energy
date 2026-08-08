import { ImageResponse } from "next/og";

/**
 * The Apple touch icon, generated at build so it stays in sync with the brand
 * mark. iOS wants a filled, non-transparent square (it applies its own rounded
 * mask), so the bright bolt sits on the solid brand tile. The mark is embedded
 * as a data-URI image, which the OG renderer rasterizes reliably, rather than
 * inline SVG elements.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const bolt = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none"><defs><linearGradient id="b" x1="30" y1="12" x2="42" y2="60" gradientUnits="userSpaceOnUse"><stop stop-color="#FFC107"/><stop offset="1" stop-color="#FF8C00"/></linearGradient></defs><path d="M40.5 12L23 39.5H34.5L31.5 60L49 32.5H37.5L40.5 12Z" fill="url(#b)"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={120}
          height={120}
          src={`data:image/svg+xml,${encodeURIComponent(bolt)}`}
          alt=""
        />
      </div>
    ),
    { ...size },
  );
}
