import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/common/json-ld";
import { buildMetadata } from "@/lib/content/seo";
import { breadcrumbSchema } from "@/lib/content/structured-data";
import { company } from "@/lib/content/company";

/**
 * Terms and Conditions. A concise, honest baseline covering how the site and
 * its enquiries work: quotes are estimates, the website is informational, and
 * the actual scope of any work is agreed in writing before it begins. Have this
 * reviewed by counsel and dated before launch. Company facts are read from the
 * shared data so they never drift from the rest of the site.
 */

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that govern the use of the Excess Energy website and the enquiries, assessments, and quotes made through it.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section aria-labelledby="terms-heading">
      <Container width="prose" className="flex flex-col gap-10">
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms & Conditions", path: "/terms" },
          ])}
        />

        <header className="flex flex-col gap-4">
          <h1 id="terms-heading" className="text-h1 text-foreground text-balance">
            Terms &amp; Conditions
          </h1>
          <p className="text-body-lg text-muted-foreground text-pretty">
            These terms govern your use of the {company.name} website and the
            enquiries you make through it. By using this site you agree to them.
          </p>
        </header>

        <div className="flex flex-col gap-8 text-body text-muted-foreground">
          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Use of this website</h2>
            <p>
              This website is provided for general information about our services.
              We work to keep it accurate and up to date, but content may change
              without notice and is not a guarantee of any particular result.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Enquiries and quotes</h2>
            <p>
              Requesting an assessment or a quote does not create a contract. Any
              figures we share in response are estimates based on the information
              provided and may change once we assess the site and your energy
              needs. The scope, price, and timeline of any work are confirmed in
              a written agreement before the work begins.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Your responsibilities</h2>
            <p>
              To help us respond well, please provide accurate details in your
              enquiry. You are responsible for the information you submit and for
              ensuring you are authorized to share it.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Intellectual property</h2>
            <p>
              The {company.name} name, logo, and the content of this site are our
              property and may not be copied or reused without permission.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Contact</h2>
            <p>
              Questions about these terms are welcome. Reach {company.name} at{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                {company.email}
              </a>{" "}
              or on {company.phones[0].display}. We serve{" "}
              {company.coverageAreas.join(", ")} and are available{" "}
              {company.availability}.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
