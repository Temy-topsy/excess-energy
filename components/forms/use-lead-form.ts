"use client";

import * as React from "react";

/**
 * The submit lifecycle every lead form shares, kept out of the form UI so the
 * two forms stay declarative and behave identically. It tracks the four states
 * the task calls for (idle, submitting, success, error), guards against
 * duplicate submissions, and hands the validated values off to WhatsApp.
 *
 * WhatsApp is the delivery channel today. The form passes its validated values
 * in, so enabling server side email later is a change here alone: call the
 * provider agnostic notifier at the marked seam and the forms never change.
 */

export type LeadStatus = "idle" | "submitting" | "success" | "error";

export function useLeadForm<TValues>() {
  const [status, setStatus] = React.useState<LeadStatus>("idle");
  const [whatsappUrl, setWhatsappUrl] = React.useState<string | null>(null);
  // A ref, not state, so a rapid second submit is blocked synchronously before
  // React re-renders, which state alone cannot guarantee.
  const inFlight = React.useRef(false);

  const submit = React.useCallback(
    async (values: TValues, toWhatsappUrl: (values: TValues) => string) => {
      if (inFlight.current) return;
      inFlight.current = true;
      setStatus("submitting");

      try {
        const url = toWhatsappUrl(values);
        setWhatsappUrl(url);

        // Open WhatsApp with the prefilled message. If a browser blocks the
        // popup, the success panel still shows a tappable link to this url.
        if (typeof window !== "undefined") {
          window.open(url, "_blank", "noopener,noreferrer");
        }

        // Future email seam: to also deliver the lead server side, call the
        // provider agnostic notifier here with `values`. The forms already
        // pass their values, so turning email on needs no change to them.

        setStatus("success");
      } catch {
        setStatus("error");
      } finally {
        inFlight.current = false;
      }
    },
    [],
  );

  const reset = React.useCallback(() => {
    setStatus("idle");
    setWhatsappUrl(null);
  }, []);

  return { status, whatsappUrl, submit, reset };
}
