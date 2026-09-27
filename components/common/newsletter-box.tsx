"use client";

import { useActionState, useEffect, useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { subscribeNewsletterAction } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";

export function NewsletterBox() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletterAction, null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if user previously subscribed in this browser
    if (typeof window !== "undefined" && localStorage.getItem("excess_newsletter_subscribed")) {
      setIsSubscribed(true);
    }
  }, []);

  useEffect(() => {
    if (state?.success) {
      setIsSubscribed(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("excess_newsletter_subscribed", "true");
      }
    }
  }, [state]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card/95 to-amber-500/5 p-6 sm:p-8 shadow-sm">
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Get practical solar tips and deals from Excess Energy.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Subscribe to receive battery longevity guides, maintenance advice, and limited-time package discounts directly to your inbox. No spam, ever.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          {isSubscribed ? (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-medium">
                {state?.message || "You're on the list! We'll keep you updated with our latest offers and solar tips."}
              </p>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-input bg-background/80 px-3.5 py-2.5 pl-10 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                />
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-5 py-2.5 shrink-0 transition-all cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}

          {state?.error && !isSubscribed && (
            <div className="mt-3 flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
