import type { Metadata } from "next";

import { buildMetadata } from "@/lib/content/seo";
import { JsonLd } from "@/components/common/json-ld";
import {
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/content/structured-data";
import { PageHero } from "@/components/sections/hero/page-hero";
import { ContactMethods } from "@/components/sections/contact/contact-methods";
import { ContactFormSection } from "@/components/sections/contact/contact-form-section";
import { ServiceAreas } from "@/components/sections/contact/service-areas";
import { ContactFaq } from "@/components/sections/contact/contact-faq";
import { CtaSection } from "@/components/sections/cta/cta-section";
import contactHeroDesktop from "@/public/images/hero/contact-hero-desktop.jpg";
import contactHeroMobile from "@/public/images/hero/contact-hero-mobile.jpg";

/**
 * The contact page. It gives every way to reach Excess Energy in one place:
 * the direct methods (call, email, WhatsApp), a short form that hands off to
 * WhatsApp, the areas we serve, and answers to the common questions. Company
 * facts throughout read from the shared company data, so nothing here goes
 * stale when a number or area changes.
 */

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Excess Energy. Call, email, or start a WhatsApp chat, or send a message and our team will reply the same day. Serving Ogun, Lagos, and Ibadan.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHero
        heading="Talk to a real energy team."
        description="Call, email, or start a WhatsApp chat. Tell us what you need and we will point you to the right next step, usually the same day."
        desktopImage={contactHeroDesktop}
        mobileImage={contactHeroMobile}
        imageAlt="Contact Excess Energy"
      />
      <ContactMethods />
      <ContactFormSection />
      <ServiceAreas />
      <ContactFaq />
      <CtaSection
        heading="Ready when you are."
        lead="Start with a free energy assessment and we will design a system built around your needs."
        headingId="contact-cta-heading"
      />
    </>
  );
}
