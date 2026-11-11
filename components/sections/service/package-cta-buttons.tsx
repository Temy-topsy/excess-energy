"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { packageWhatsappUrl } from "@/lib/lead/whatsapp";
import { captureLeadAction } from "@/app/admin/leads/actions";

interface PackageCtaButtonsProps {
  packageName: string;
  packageSlug: string;
}

export function PackageCtaButtons({ packageName, packageSlug }: PackageCtaButtonsProps) {
  const handleClick = async () => {
    // 1. Open WhatsApp immediately so user experience has zero friction or delay
    const url = packageWhatsappUrl(packageName, packageSlug);
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }

    // 2. Client-side deduplication using localStorage (30-minute cooldown per package)
    const storageKey = `excess_lead_cta_${packageSlug}`;
    const lastLogged = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    const now = Date.now();
    const COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes

    if (lastLogged && now - parseInt(lastLogged, 10) < COOLDOWN_MS) {
      // Already logged this visitor for this package recently; skip duplicate
      return;
    }

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, now.toString());
      }

      await captureLeadAction({
        name: `Visitor interested in ${packageName}`,
        phone: "Pending WhatsApp chat",
        service: `${packageName} Solar Package`,
        source: "package_cta",
        message: `Clicked 'Continue with ${packageName}' on https://excessenergy.app/services/excess-solar/${packageSlug}`,
      });
    } catch (err) {
      console.error("Failed to capture package CTA click:", err);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
      <Button
        size="lg"
        onClick={handleClick}
        className="w-full sm:w-auto font-semibold gap-2 shadow-sm"
      >
        <MessageSquare className="size-4 shrink-0 text-slate-900" />
        <span>Continue with {packageName}</span>
        <ArrowRight className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover/button:translate-x-0.5" />
      </Button>

      <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
        <Link href="/contact">Request Custom Assessment</Link>
      </Button>
    </div>
  );
}
