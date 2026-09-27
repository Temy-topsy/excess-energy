"use client";

import { useActionState, useEffect, useState } from "react";
import { Check, AlertCircle, Loader2 } from "lucide-react";
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

  // If already subscribed, replace the ENTIRE screen with the clean confirmation and big tick
  if (isSubscribed) {
    return (
      <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl bg-[#111111] border border-white/10 p-8 sm:p-10 shadow-lg text-center">
        <div className="flex justify-center mb-5">
          <div className="flex size-16 sm:size-20 items-center justify-center rounded-full bg-[#ffc107]/15 text-[#ffc107] ring-8 ring-[#ffc107]/5">
            <Check className="size-9 sm:size-11 stroke-[2.5]" />
          </div>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          You&apos;re on the list!
        </h3>
        <p className="mt-2.5 text-sm text-white/70 leading-relaxed max-w-xs mx-auto">
          We&apos;ll keep you updated with our latest offers and solar tips.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl bg-[#111111] border border-white/10 p-7 sm:p-9 shadow-lg">
      <div>
        <h3 className="font-serif text-3xl sm:text-4xl tracking-tight text-white font-normal">
          Stay Connected
        </h3>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          Join for practical solar tips, maintenance guides, and early access to limited package offers.
        </p>
      </div>

      <div className="w-full h-px bg-white/15 my-6 sm:my-7" />

      <form action={formAction} className="space-y-3">
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Insert your email here"
            className="w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc107] font-normal"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-[#ffc107] hover:bg-[#ffb300] text-black font-semibold py-3 px-4 shadow-sm transition-all cursor-pointer h-auto text-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
              Subscribing...
            </>
          ) : (
            "Join the List"
          )}
        </Button>

        {state?.error && (
          <div className="pt-2 flex items-center gap-2 text-xs text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}
      </form>
    </div>
  );
}
