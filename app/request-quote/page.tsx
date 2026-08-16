import type { Metadata } from "next";

import { buildMetadata } from "@/lib/content/seo";
import { JsonLd } from "@/components/common/json-ld";
import { breadcrumbSchema } from "@/lib/content/structured-data";
import { QuoteHero } from "@/components/sections/contact/quote-hero";
import { QuoteFormSection } from "@/components/sections/contact/quote-form-section";
import { CtaSection } from "@/components/sections/cta/cta-section";

/**
 * The quote request page. A focused, low friction path to a quote: a tight
 * hero, the lean five field form that hands off to WhatsApp, and the standard
 * closing CTA. Deliberately short so the form stays the center of attention and
 * fast to complete on a phone.
 */

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Excess Energy directly. Share a few details about your solar, inverter, battery, CCTV, or street lighting project and we will come back to you the same day.",
  path: "/request-quote",
});

export default function RequestQuotePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/request-quote" },
        ])}
      />
      <QuoteHero />
      <QuoteFormSection />
      <CtaSection
        heading="Prefer to talk it through first?"
        lead="Start with a free energy assessment and we will help you scope the right system before you commit."
        headingId="quote-cta-heading"
      />
    </>
  );
}
