"use client";

import { useEffect, useState, useActionState } from "react";
import { X, Check, Zap, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { subscribeNewsletterAction } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "excess_exit_dismissed";
const SUBSCRIBED_KEY = "excess_newsletter_subscribed";
const DISMISS_DAYS = 7;

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(subscribeNewsletterAction, null);
  const isSubscribed = Boolean(state?.success);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user already subscribed or recently dismissed
    if (localStorage.getItem(SUBSCRIBED_KEY)) return;

    const dismissedTimestamp = localStorage.getItem(STORAGE_KEY);
    if (dismissedTimestamp) {
      const daysSinceDismiss =
        (Date.now() - parseInt(dismissedTimestamp, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < DISMISS_DAYS) {
        return;
      }
    }

    let triggered = false;

    const triggerModal = () => {
      if (triggered) return;
      triggered = true;
      setIsOpen(true);
    };

    // 1. Desktop: Trigger when cursor leaves through the top of the viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) {
        triggerModal();
      }
    };

    // 2. Mobile / Tablet: Trigger after scroll depth or inactivity timer (35 seconds)
    const timer = setTimeout(() => {
      if (!triggered && window.scrollY > 400) {
        triggerModal();
      }
    }, 35000);

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && window.scrollY / scrollHeight > 0.65) {
        // Scrolled 65% of the page
        triggerModal();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (state?.success && typeof window !== "undefined") {
      localStorage.setItem(SUBSCRIBED_KEY, "true");
      // Automatically close after a moment
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [state?.success]);

  const handleDismiss = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#111111] border border-amber-500/30 p-6 sm:p-8 shadow-2xl text-white">
        {/* Amber radial glow decoration */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-amber-500/10 blur-3xl"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <X className="size-5" />
        </button>

        {isSubscribed ? (
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-400 ring-8 ring-amber-400/5">
              <Check className="size-8 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              You&apos;re in!
            </h3>
            <p className="mt-2 text-sm text-white/70 max-w-sm mx-auto">
              We&apos;ve reserved your solar discount guide. Check your inbox for practical sizing and pricing details.
            </p>
          </div>
        ) : (
          <div>


            <h3 id="exit-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Before you leave: <br />
              <span className="text-amber-400">Don&apos;t overpay for solar.</span>
            </h3>

            <p className="mt-2.5 text-sm text-white/70 leading-relaxed">
              Get our 2026 Solar Sizing &amp; Pricing Cheat Sheet + seasonal package deals directly to your email.
            </p>

            <ul className="my-4 space-y-2 text-xs sm:text-sm text-white/80">
              <li className="flex items-center gap-2">
                <span>Real load breakdowns for 3kVA to 10kVA systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span>How to avoid under-sizing your lithium battery</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Early subscriber notifications on discounted installations</span>
              </li>
            </ul>

            <form action={formAction} className="mt-5 space-y-3">
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-4 shadow-sm transition-all cursor-pointer h-auto text-sm"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Sending Guide...
                  </>
                ) : (
                  "Send Me The Solar Guide & Discounts"
                )}
              </Button>

              {state?.error && (
                <div className="pt-1 flex items-center gap-2 text-xs text-rose-400">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{state.error}</span>
                </div>
              )}
            </form>

            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-white/40 hover:text-white/60 transition-colors underline underline-offset-2"
              >
                No thanks, I will figure it out on my own
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
