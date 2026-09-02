import type { StaticImageData } from "next/image";

import residentialSolarMain from "@/public/images/hero/solar-install-residential.jpg";
import commercialSolarMain from "@/public/images/hero/solar-install-team.jpg";
import residentialSolar1 from "@/public/images/projects/residential-solar-1.jpg";
import residentialSolar2 from "@/public/images/projects/residential-solar-2.jpg";
import commercialSolar1 from "@/public/images/projects/commercial-solar-1.jpg";
import commercialSolar2 from "@/public/images/projects/commercial-solar-2.jpg";
import cctvSystemsMain from "@/public/images/projects/CCTV-systems-main.jpg";
import cctvSystems1 from "@/public/images/projects/cctv-systems-1.jpg";
import cctvSystems2 from "@/public/images/projects/cctv-systems-2.jpg";
import solarStreetLightsMain from "@/public/images/projects/solar-street-lights-main.jpg";
import solarStreetLights1 from "@/public/images/projects/solar-street-lights-1.jpg";
import solarStreetLights2 from "@/public/images/projects/solar-street-lights-2.jpeg";

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  featured: boolean;
  images: [ProjectImage, ProjectImage, ProjectImage];
  seo: { title: string; description: string };
  href: string;
}

export const projects: Project[] = [
  {
    slug: "residential-solar-abeokuta",
    title: "Residential Solar",
    featured: true,
    images: [
      { src: residentialSolarMain, alt: "Rooftop solar panels installed on a residential home" },
      { src: residentialSolar1, alt: "Residential solar installation equipment" },
      { src: residentialSolar2, alt: "Completed residential solar installation" },
    ],
    seo: {
      title: "Residential Solar Project",
      description: "View a completed residential solar project by Excess Energy.",
    },
    href: "/projects/residential-solar-abeokuta",
  },
  {
    slug: "cctv-installation-lagos",
    title: "CCTV Systems",
    featured: true,
    images: [
      { src: cctvSystemsMain, alt: "CCTV system installed at a property" },
      { src: cctvSystems1, alt: "CCTV camera installation detail" },
      { src: cctvSystems2, alt: "Completed CCTV system installation" },
    ],
    seo: {
      title: "CCTV Systems Project",
      description: "View a completed CCTV systems project by Excess Energy.",
    },
    href: "/projects/cctv-installation-lagos",
  },
  {
    slug: "commercial-solar-lagos",
    title: "Commercial Solar",
    featured: false,
    images: [
      { src: commercialSolarMain, alt: "Technicians installing a commercial rooftop solar array" },
      { src: commercialSolar1, alt: "Commercial solar panels installed on a rooftop" },
      { src: commercialSolar2, alt: "Completed commercial solar installation" },
    ],
    seo: {
      title: "Commercial Solar Project",
      description: "View a completed commercial solar project by Excess Energy.",
    },
    href: "/projects/commercial-solar-lagos",
  },
  {
    slug: "solar-street-lights-estate-ogun",
    title: "Solar Street Lights",
    featured: false,
    images: [
      { src: solarStreetLightsMain, alt: "Installed solar street light" },
      { src: solarStreetLights1, alt: "Solar street light installation" },
      { src: solarStreetLights2, alt: "Completed solar street lighting project" },
    ],
    seo: {
      title: "Solar Street Lights Project",
      description: "View a completed solar street lights project by Excess Energy.",
    },
    href: "/projects/solar-street-lights-estate-ogun",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
