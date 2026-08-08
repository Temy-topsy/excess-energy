"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks the user's reduced motion preference and keeps it in sync if they
 * change it mid session. Motion driven components (the hero parallax, any GSAP
 * timeline) read this and fall back to a still state when it returns true, so
 * the CSS safety net in globals.css is matched by the JavaScript layer.
 *
 * Built on useSyncExternalStore, the React 19 way to read an external source
 * like matchMedia. The server snapshot is false so the first client render
 * agrees with the server and there is no hydration mismatch; the real value is
 * resolved as soon as the store subscribes on the client. This avoids the
 * setState in effect pattern that causes cascading renders.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  const getSnapshot = useCallback(() => window.matchMedia(QUERY).matches, []);
  // Motion is welcome on the server render, matching the CSS default.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export { usePrefersReducedMotion };
