import solarResidential from "@/public/images/hero/solar-install-residential.jpg";
import solarTeam from "@/public/images/hero/solar-install-team.jpg";
import type { StaticImageData } from "next/image";

/**
 * The portfolio as data, so it grows without touching layout. Every project
 * page under /projects/[slug] and every card in the listing is generated from
 * the entries below: adding a project is a data edit here, nothing more.
 *
 * These entries are representative placeholders. Real installations replace them
 * by editing the fields, and photography drops in by adding a `src` import to a
 * cover or gallery image; the layout never changes.
 *
 * Copy stays factual. No savings percentages, performance figures, or
 * testimonials are invented. `capacity` describes installed hardware, and the
 * challenge, solution, and result read as what the system does, not as metrics.
 */

export interface ProjectImage {
  /**
   * A static import supplies its own blur placeholder. Omit `src` to render a
   * branded placeholder tile, which is how galleries ship before photography.
   */
  src?: StaticImageData;
  /** Describes the intended photograph, so alt text is ready when it lands. */
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  /** Short service label, e.g. "Residential Solar". Shown as a badge. */
  serviceType: string;
  /** Human readable completion, e.g. "May 2026". */
  completionDate: string;
  /** Whether the project surfaces in featured rails on the home and list pages. */
  featured: boolean;
  /** Short description, used on cards and in listings. */
  description: string;
  /** Long form story, one entry per paragraph. */
  fullStory: string[];
  /** Optional system specification, e.g. "5 kVA inverter, 5 kWh storage". */
  capacity?: string;
  /** Slugs of the services this project drew on, resolved to linked chips. */
  servicesUsed: string[];
  challenge: string;
  solution: string;
  result: string;
  /** Cover image. A static import also supplies its own blur placeholder. */
  coverImage?: StaticImageData;
  coverAlt?: string;
  /** Gallery images, placeholders until photography is added. */
  gallery: ProjectImage[];
  seo: { title: string; description: string };
  /** Detail route. */
  href: string;
}

export const projects: Project[] = [
  {
    slug: "residential-solar-abeokuta",
    title: "Residential solar and storage",
    location: "Abeokuta, Ogun State",
    serviceType: "Residential Solar",
    completionDate: "May 2026",
    featured: true,
    description:
      "A full rooftop solar and battery system that keeps a family home powered through grid outages.",
    fullStory: [
      "We designed a rooftop solar system paired with battery storage, sized around the home's real daily use. Through the day the panels power the house and charge the batteries; after dark and during outages, the stored energy carries the essential circuits without a generator in earshot",
    ],
    capacity: "5 kVA inverter, 5 kWh storage",
    servicesUsed: ["excess-solar", "battery-storage", "inverter-installation"],
    challenge:
      "",
    solution:
      "",
    result:
      "",
    coverImage: solarResidential,
    coverAlt: "Rooftop solar panels installed on a residential home",
    gallery: [
      {
        src: solarResidential,
        alt: "Rooftop solar panels installed on a residential home",
      },
      { alt: "The inverter and battery bank mounted in the utility room" },
      { alt: "A technician routing cabling along the roof mounts" },
      { alt: "The finished array seen across the roofline at dusk" },
    ],
    seo: {
      title: "Residential Solar and Storage in Abeokuta",
      description:
        "A rooftop solar and battery installation in Abeokuta, Ogun State, that keeps a family home powered through grid outages without relying on a generator.",
    },
    href: "/projects/residential-solar-abeokuta",
  },
  {
    slug: "commercial-solar-lagos",
    title: "Commercial solar installation",
    location: "Lagos",
    serviceType: "Commercial Solar",
    completionDate: "March 2026",
    featured: true,
    description:
      "A rooftop array sized to cut daytime energy costs for a busy commercial site.",
    fullStory: [
      "A commercial site in Lagos was carrying steady daytime demand and a diesel bill to match. The business wanted to keep operations running smoothly while spending less on fuel and reducing the hours the generator ran.",
    
    ],
    capacity: "10 kVA system",
    servicesUsed: ["commercial-solar", "battery-storage"],
    challenge:
      "Steady daytime demand met by diesel meant a heavy fuel bill and long generator hours during working days.",
    solution:
      "An engineered rooftop array sized to the site's load profile, with storage for the critical circuits, installed in stages around trading hours.",
    result:
      "The site now covers much of its daytime demand from solar and leans on the generator far less, with critical operations held on stored power during outages.",
    coverImage: solarTeam,
    coverAlt: "Technicians installing a commercial rooftop solar array",
    gallery: [
      {
        src: solarTeam,
        alt: "Technicians installing a commercial rooftop solar array",
      },
      { alt: "The mounted array across the commercial rooftop" },
      { alt: "The inverter and distribution board after commissioning" },
      { alt: "The installation team on site during handover" },
    ],
    seo: {
      title: "Commercial Solar Installation in Lagos",
      description:
        "An engineered rooftop solar array in Lagos, sized to a commercial site's load profile to cut daytime energy costs and reduce reliance on diesel.",
    },
    href: "/projects/commercial-solar-lagos",
  },
  {
    slug: "inverter-backup-ibadan",
    title: "Whole-home inverter backup",
    location: "Ibadan",
    serviceType: "Inverter Installation",
    completionDate: "June 2026",
    featured: false,
    description:
      "A clean inverter and battery backup that keeps essential circuits running the moment the grid drops.",
    fullStory: [
      "A household in Ibadan needed dependable backup for the essentials: lights, fans, connectivity, and a refrigerator that could not be left to warm through an outage.",
      "We sized an inverter to those loads, installed a matched battery bank, and set the changeover so the switch from grid to backup is seamless. The wiring was kept tidy and clearly labelled, and the system is ready to take solar panels later.",
    ],
    capacity: "3.5 kVA inverter, 4.8 kWh storage",
    servicesUsed: ["inverter-installation", "battery-storage"],
    challenge:
      "Outages interrupted the essentials at home, from lighting and connectivity to a refrigerator that could not be left without power.",
    solution:
      "An inverter sized to the essential loads with a matched battery bank and a seamless changeover, wired to expand with solar later.",
    result:
      "Essential circuits now stay on through outages with no manual switching, and the system is ready to add solar when the household chooses.",
    coverAlt: "An inverter and battery backup mounted in a home utility space",
    gallery: [
      { alt: "The inverter mounted and wired in the utility space" },
      { alt: "The battery bank installed below the inverter" },
      { alt: "The labelled changeover and distribution board" },
    ],
    seo: {
      title: "Whole-home Inverter Backup in Ibadan",
      description:
        "An inverter and battery backup installation in Ibadan that keeps essential home circuits running through outages, built to expand with solar later.",
    },
    href: "/projects/inverter-backup-ibadan",
  },
  {
    slug: "battery-storage-upgrade-ogun",
    title: "Battery storage upgrade",
    location: "Ogun State",
    serviceType: "Battery Storage",
    completionDate: "April 2026",
    featured: false,
    description:
      "Added storage that lets an existing solar setup carry power into the evening.",
    fullStory: [
      "A home in Ogun State already generated solar through the day but lost the benefit after dark, falling back on the grid and generator once the sun was down.",
      "We reviewed the existing inverter, confirmed compatibility, and added a battery bank that captures surplus daytime solar. That stored energy now carries the home into the evening and through outages, making fuller use of panels that were already on the roof.",
    ],
    capacity: "5 kWh added storage",
    servicesUsed: ["battery-storage", "excess-solar"],
    challenge:
      "An existing solar array delivered through the day but left the home on the grid and generator once the sun went down.",
    solution:
      "A compatible battery bank added to the existing inverter, capturing surplus daytime solar for use after dark.",
    result:
      "The home now carries its evenings on stored solar and holds essential loads through outages, getting more from the panels already installed.",
    coverAlt: "A wall-mounted battery bank added beside an existing inverter",
    gallery: [
      { alt: "The new battery bank mounted beside the existing inverter" },
      { alt: "The existing rooftop solar array in daylight" },
      { alt: "The system monitor after the storage upgrade" },
    ],
    seo: {
      title: "Battery Storage Upgrade in Ogun State",
      description:
        "A battery storage upgrade in Ogun State that lets an existing solar system carry power into the evening and through outages.",
    },
    href: "/projects/battery-storage-upgrade-ogun",
  },
  {
    slug: "cctv-installation-lagos",
    title: "Business CCTV coverage",
    location: "Lagos",
    serviceType: "CCTV Systems",
    completionDate: "February 2026",
    featured: false,
    description:
      "Full-coverage CCTV with remote viewing for a business that needed eyes on site around the clock.",
    fullStory: [
      "A business in Lagos wanted reliable eyes on its premises around the clock, indoors and out, with the ability to check in from anywhere.",
      "",
    ],
    servicesUsed: ["cctv-systems"],
    challenge:
      "The premises needed continuous monitoring across several entry points, with access to footage when no one was on site.",
    solution:
      "A surveyed camera layout with full coverage, continuous recording, and remote viewing configured on the owner's phone and computer.",
    result:
      "The business now has clear footage day and night across the site, viewable live or after the fact from anywhere.",
    coverAlt: "A CCTV camera mounted on a commercial building exterior",
    gallery: [
      { alt: "An exterior CCTV camera covering the site entrance" },
      { alt: "The recorder and storage installed in the office" },
      { alt: "The remote viewing app open on a phone" },
    ],
    seo: {
      title: "Business CCTV Coverage in Lagos",
      description:
        "A CCTV installation in Lagos with full-coverage camera placement, continuous recording, and remote viewing for a business monitored around the clock.",
    },
    href: "/projects/cctv-installation-lagos",
  },
  {
    slug: "solar-street-lights-estate-ogun",
    title: "Estate solar street lighting",
    location: "Ogun State",
    serviceType: "Solar Street Lights",
    completionDate: "July 2026",
    featured: true,
    description:
      "Standalone solar street lights that brighten an estate's roads with no grid connection and no running cost.",
    fullStory: [
      "An estate in Ogun State wanted its internal roads lit for safety without the cost and disruption of trenching power out to each pole.",
      "We surveyed the layout and installed standalone solar street lights, each generating and storing its own power by day and lighting automatically at dusk. With no grid connection and no wiring between poles, the roads are lit every night at no running cost.",
    ],
    servicesUsed: ["solar-street-lights"],
    challenge:
      "The estate's internal roads were dark at night, and running grid power to each pole would have meant costly trenching and cabling.",
    solution:
      "Standalone solar street lights, each self-powered with its own panel and battery, positioned for even coverage and automatic dusk to dawn operation.",
    result:
      "The estate roads are now lit every night on solar alone, with no grid connection, no inter-pole wiring, and no electricity cost for the lighting.",
    coverAlt: "A solar street light illuminating an estate road at dusk",
    gallery: [
      { alt: "A solar street light with its panel against the sky" },
      { alt: "A lit estate road after dusk" },
      { alt: "A row of installed poles along the roadway" },
    ],
    seo: {
      title: "Estate Solar Street Lighting in Ogun State",
      description:
        "Standalone solar street lighting for an estate in Ogun State, with automatic dusk to dawn operation, no grid connection, and no running cost.",
    },
    href: "/projects/solar-street-lights-estate-ogun",
  },
];

/** Projects that surface in featured rails on the home and listing pages. */
export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Every project slug, for generateStaticParams. */
export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/**
 * Up to `count` projects related to the given slug, current project excluded.
 * Same service type is preferred, then the remaining projects fill the set, so
 * the rail is always full while staying as relevant as the portfolio allows.
 */
export function getRelatedProjects(slug: string, count = 3): Project[] {
  const current = getProjectBySlug(slug);
  const others = projects.filter((project) => project.slug !== slug);
  if (!current) return others.slice(0, count);

  const sameType = others.filter(
    (project) => project.serviceType === current.serviceType,
  );
  const rest = others.filter(
    (project) => project.serviceType !== current.serviceType,
  );
  return [...sameType, ...rest].slice(0, count);
}
