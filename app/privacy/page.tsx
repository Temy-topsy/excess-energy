import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/common/json-ld";
import { buildMetadata } from "@/lib/content/seo";
import { breadcrumbSchema } from "@/lib/content/structured-data";
import { company } from "@/lib/content/company";

/**
 * Privacy Policy. A concise, accurate baseline that reflects what the site
 * actually does today: it collects the details entered into the contact and
 * quote forms and uses them only to respond. It intentionally avoids claiming
 * practices the site does not have (there are no accounts, no online payments,
 * and no third party analytics wired in). Have this reviewed by counsel and
 * dated before launch; the content is data driven where a company fact appears,
 * so numbers and coverage stay in sync with the rest of the site.
 */

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Excess Energy collects, uses, and protects the information you share when you request an assessment, a quote, or get in touch.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section aria-labelledby="privacy-heading">
      <Container width="prose" className="flex flex-col gap-10">
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ])}
        />

        <header className="flex flex-col gap-4">
          <h1 id="privacy-heading" className="text-h1 text-foreground text-balance">
            Privacy Policy
          </h1>
          <p className="text-body-lg text-muted-foreground text-pretty">
            This policy explains what information {company.name} collects, why we
            collect it, and how we handle it when you contact us or request a
            service.
          </p>
        </header>

        <div className="flex flex-col gap-8 text-body text-muted-foreground">
          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Information we collect</h2>
            <p>
              We collect only the details you choose to share through our contact
              and quote forms: your name, phone number, the service you are
              interested in, your preferred location, and any message or project
              details you provide. We do not require you to create an account.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">How we use it</h2>
            <p>
              Your information is used solely to respond to your enquiry: to
              understand your energy needs, prepare an assessment or quote, and
              follow up about your project. We do not sell your information or use
              it for unrelated marketing.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">How we handle your messages</h2>
            <p>
              When you submit a form you may be handed off to WhatsApp or email to
              complete your enquiry. Messages sent that way are delivered through
              those services and are subject to their own privacy terms. We retain
              enquiry details only for as long as needed to serve you and to keep
              accurate records of the work.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Your choices</h2>
            <p>
              You can ask us to review, update, or delete the information you have
              shared at any time. To make a request, contact us at{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                {company.email}
              </a>{" "}
              or on {company.phones[0].display}.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Contact</h2>
            <p>
              Questions about this policy are welcome. Reach {company.name} at{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                {company.email}
              </a>
              . We serve {company.coverageAreas.join(", ")} and are available{" "}
              {company.availability}.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
