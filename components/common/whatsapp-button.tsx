"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { company } from "@/lib/content/company";

export function WhatsAppButton() {
  const phone = company.whatsapp.href.replace(/\D/g, "");
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent("Hi Excess Energy, I would like to get a free energy assessment.")}`;

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Only show once if the user hasn't explicitly dismissed it
    const isDismissed = typeof window !== "undefined" && localStorage.getItem("excess_wa_dismissed");
    if (!isDismissed) {
      const initialTimer = setTimeout(() => {
        setShowMessage(true);
      }, 2500);

      return () => clearTimeout(initialTimer);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMessage(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("excess_wa_dismissed", "true");
    }
  };

  return (
    <div className="fixed bottom-4 left-3 z-[var(--z-index-toast)] flex items-end gap-2.5 sm:bottom-6 sm:left-6 sm:gap-4">
      {/* WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:size-16"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6 sm:size-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

      {/* Chat Bubble Popup with Dismiss X */}
      <div 
        className={`relative mb-1 sm:mb-2 flex flex-col justify-center rounded-2xl rounded-bl-sm bg-background px-3.5 py-2.5 sm:px-5 sm:py-3.5 shadow-xl ring-1 ring-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showMessage ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background border border-border shadow-xs cursor-pointer transition-colors"
          aria-label="Dismiss"
        >
          <X className="size-3" />
        </button>

        <p className="text-xs sm:text-base font-semibold text-foreground pr-2">Contact us on WhatsApp</p>
        <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-muted-foreground">We usually reply instantly.</p>
      </div>
    </div>
  );
}
