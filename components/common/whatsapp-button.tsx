"use client";

import { MessageCircle } from "lucide-react";
import { company } from "@/lib/content/company";

export function WhatsAppButton() {
  const phone = company.whatsapp.href.replace(/\D/g, "");
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent("Hi Excess Energy, I would like to get a free energy assessment.")}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-4 z-[var(--z-index-toast)] flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:bottom-6 sm:left-6 sm:size-16"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="size-7 md:size-8" />
    </a>
  );
}
