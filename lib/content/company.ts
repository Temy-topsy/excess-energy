/**
 * Single source of truth for the company facts surfaced across the site.
 * Header, footer, and contact page read from here. Changing a phone number
 * or coverage area is a one line edit, never a layout change.
 */

export interface ContactPhone {
  label: string;
  /** Human readable, as displayed. */
  display: string;
  /** Digits only, for the tel: href. */
  href: string;
}

/**
 * A social profile. `platform` also selects the brand glyph in SocialLinks, so
 * it must stay one of the known keys. `href` is null while a profile has no
 * public URL yet: the footer keeps the icon visible but disabled, and a single
 * edit here (paste the real URL) turns it into a live link. WhatsApp is not
 * listed here; it is a contact method (see `whatsapp` below) and its chat link
 * is derived from that number.
 */
export interface SocialLink {
  platform: "instagram" | "facebook" | "x" | "linkedin" | "whatsapp";
  label: string;
  href: string | null;
}

export const company = {
  name: "Excess Energy",
  tagline: "",
  mission:
    "Reliable energy solutions for homes businesses and more",
  vision: "Become one of Africa's leading clean energy companies.",

  phones: [
    { label: "Sales", display: "0913 143 6391", href: "+2349131436391" },
    { label: "Support", display: "0702 546 1898", href: "+2347025461898" },
  ] satisfies ContactPhone[],

  emergency: {
    label: "Emergency",
    display: "0905 836 0452",
    href: "+2349058360452",
  } satisfies ContactPhone,

  /**
   * The WhatsApp business line. Forms and contact buttons open a chat here with
   * a prefilled message. UPDATE this to the real WhatsApp number when it is
   * confirmed; it defaults to the sales line. `href` is international format and
   * the wa.me link uses its digits only.
   */
  whatsapp: {
    label: "WhatsApp",
    display: "0913 143 6391",
    href: "+2349131436391",
  } satisfies ContactPhone,

  email: "info.xsenergy1@gmail.com",
  availability: "24/7",

  /** Current coverage. New regions are additive. */
  coverageAreas: ["Nationwide"],
  coverageFuture: "Global",

  /**
   * Social profiles surfaced in the footer. Hrefs are null until the real
   * profile URLs are confirmed; paste a URL here to turn that icon into a live
   * link with no other change. Do not invent URLs.
   */
  socials: [
    { platform: "instagram", label: "Instagram", href: null },
    { platform: "facebook", label: "Facebook", href: null },
    { platform: "x", label: "X", href: null },
    { platform: "linkedin", label: "LinkedIn", href: null },
  ] satisfies SocialLink[],
} as const;

export type Company = typeof company;
