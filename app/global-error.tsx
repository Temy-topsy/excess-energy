"use client";

import { useEffect } from "react";

/**
 * The last-resort error boundary. It only renders when the root layout itself
 * fails, so it replaces the entire document and cannot rely on the app's
 * Tailwind, fonts, or theme. Styles are therefore inlined and minimal, and the
 * markup is deliberately self-contained. It follows the OS color scheme rather
 * than the app theme, which does not reach here.
 */

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong | Excess Energy</title>
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0b",
          color: "#f5f5f5",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          padding: "24px",
        }}
      >
        <main
          style={{
            maxWidth: "32rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FFC107",
            }}
          >
            Something went wrong
          </span>
          <h1 style={{ fontSize: "2rem", margin: 0, lineHeight: 1.2 }}>
            The site hit an unexpected error.
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#c4c4c4", margin: 0 }}>
            Please try again. If it keeps happening, reload the page in a moment.
          </p>
          <div>
            <button
              onClick={() => retry()}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "8px",
                padding: "14px 28px",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#111111",
                background: "#FFC107",
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
