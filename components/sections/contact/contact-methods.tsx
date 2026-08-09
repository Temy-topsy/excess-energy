import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone, Siren } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { Card } from "@/components/ui/card";
import { company } from "@/lib/content/company";
import { buildWhatsappUrl } from "@/lib/lead/whatsapp";

/**
 * The three ways to reach us: call, email, or WhatsApp. Every value renders
 * from company data, so a changed number or address updates here automatically.
 * These are plain links (tel, mailto, wa.me), so the section ships no client
 * JavaScript and works the moment the page paints.
 */

const linkClass =
  "inline-flex w-fit items-center gap-1.5 rounded-xs text-body font-medium text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function ContactMethods() {
  const whatsappUrl = buildWhatsappUrl(
    `Hello ${company.name}, I would like to make an enquiry.`,
  );

  return (
    <Section tone="muted" aria-labelledby="contact-methods-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Reach us"
          headingId="contact-methods-heading"
          heading="Choose whatever is easiest."
          lead="However you get in touch, our lines are open around the clock."
          className="max-w-2xl"
        />

        <Grid cols={3} gap="lg">
          {/* Call */}
          <Card className="gap-5 p-6">
            <span className="flex size-12 items-center justify-center rounded-md bg-primary/15 text-foreground">
              <Phone className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-h4 text-foreground">Call us</h3>
              <p className="text-body-sm text-muted-foreground">
                Open {company.availability} for sales and support.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {company.phones.map((phone) => (
                <Link
                  key={phone.href}
                  href={`tel:${phone.href}`}
                  className={linkClass}
                >
                  {phone.display}
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    · {phone.label}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-2.5 rounded-xs border border-border bg-background p-3">
              <Siren className="size-5 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-body-sm text-muted-foreground">
                <span className="font-medium text-foreground">Emergency </span>
                <Link
                  href={`tel:${company.emergency.href}`}
                  className="underline-offset-4 hover:text-accent hover:underline"
                >
                  {company.emergency.display}
                </Link>
              </p>
            </div>
          </Card>

          {/* Email */}
          <Card className="gap-5 p-6">
            <span className="flex size-12 items-center justify-center rounded-md bg-primary/15 text-foreground">
              <Mail className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-h4 text-foreground">Email</h3>
              <p className="text-body-sm text-muted-foreground">
                Send us a mail.
              </p>
            </div>
            <Link href={`mailto:${company.email}`} className={`${linkClass} mt-auto break-all`}>
              {company.email}
            </Link>
          </Card>

          {/* WhatsApp */}
          <Card className="gap-5 p-6">
            <span className="flex size-12 items-center justify-center rounded-md bg-primary/15 text-foreground">
              <MessageCircle className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-h4 text-foreground">WhatsApp</h3>
              <p className="text-body-sm text-muted-foreground">
                Start a chat and get a quick reply on {company.whatsapp.display}.
              </p>
            </div>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} mt-auto`}
            >
              Start a chat
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}

export { ContactMethods };
