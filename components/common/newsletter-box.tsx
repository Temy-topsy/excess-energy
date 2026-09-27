"use client";

import { useActionState, useEffect, useRef } from "react";
import { Mail, Zap, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { subscribeNewsletterAction } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";

export function NewsletterBox() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletterAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card/95 to-amber-500/5 p-6 sm:p-8 shadow-sm">
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Zap className="h-3.5 w-3.5" />
            <span>Energy Updates & Exclusive Offers</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Get practical solar tips & deals from Temy
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Subscribe to receive battery longevity guides, maintenance advice, and limited-time package discounts directly to your inbox. No spam, ever.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2.5">
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

          {state?.error && (
            <div className="mt-3 flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          {state?.success && (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
