import type { Metadata, Viewport } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { BackToTop } from "@/components/layout/back-to-top";
import { JsonLd } from "@/components/common/json-ld";
import { buildMetadata, siteConfig } from "@/lib/content/seo";
import {
  organizationSchema,
  websiteSchema,
} from "@/lib/content/structured-data";
import "./globals.css";

/**
 * Brand fonts, self hosted through next/font so there is no layout shift and no
 * third party request. Archivo carries headings, Inter carries body and UI, and
 * IBM Plex Mono is reserved for technical figures. Each exposes a CSS variable
 * consumed by the font tokens in globals.css.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/images/logos/logo.jpg", type: "image/jpeg" }],
    shortcut: [{ url: "/images/logos/logo.jpg", type: "image/jpeg" }],
    apple: [{ url: "/images/logos/logo.jpg", type: "image/jpeg" }],
  },
  ...buildMetadata(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${ibmPlexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
