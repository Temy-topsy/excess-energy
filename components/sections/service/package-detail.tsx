import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { SolarPackage } from "@/lib/content/packages";

function PackageDetail({ solarPackage }: { solarPackage: SolarPackage }) {
  const installationImage = (src: SolarPackage["inverterImage"], alt: string) =>
    src ? (
      <Image
        src={src as string}
        alt={alt}
        width={1200}
        height={900}
        className="h-auto w-full object-cover"
      />
    ) : (
      <div className="flex h-[300px] w-full items-center justify-center text-sm font-medium text-muted-foreground">
        No Image Available
      </div>
    );

  return (
    <>
      <Section data-hero spacing="compact" aria-labelledby="package-heading">
        <Container className="flex flex-col gap-8">
          <Link
            href="/services"
            className="inline-flex w-fit items-center gap-2 rounded-xs text-body-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to packages
          </Link>

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-12">
            <h1 id="package-heading" className="text-h1 text-foreground sm:text-display">
              {solarPackage.name}
            </h1>
            <div className="overflow-hidden rounded-md border border-border bg-muted flex items-center justify-center min-h-[300px]">
              {solarPackage.packageImage ? (
                <Image
                  src={solarPackage.packageImage as string}
                  alt={solarPackage.packageAlt}
                  priority
                  width={800}
                  height={600}
                  className="h-auto w-full object-contain"
                />
              ) : (
                <span className="text-muted-foreground font-medium">No Image Available</span>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="installation-heading">
        <Container className="flex flex-col gap-10 sm:gap-12">
          <div>
            <h2 id="installation-heading" className="text-h2 text-foreground">
              Installation
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <figure className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-md border border-border bg-muted">
                {installationImage(
                  solarPackage.inverterImage,
                  `${solarPackage.name} complete installation indoors`,
                )}
              </div>
              <figcaption className="text-body-sm font-medium text-foreground">
                Complete installation - indoor
              </figcaption>
            </figure>
            <figure className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-md border border-border bg-muted">
                {installationImage(
                  solarPackage.panelImage,
                  `${solarPackage.name} solar panels outdoors`,
                )}
              </div>
              <figcaption className="text-body-sm font-medium text-foreground">
                Solar panels - outdoor
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>
    </>
  );
}

export { PackageDetail };
