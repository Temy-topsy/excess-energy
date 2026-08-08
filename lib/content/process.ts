import {
  ClipboardList,
  Search,
  PencilRuler,
  HardHat,
  ClipboardCheck,
  Headset,
  type LucideIcon,
} from "lucide-react";

/**
 * The installation journey as data, so the process section stays a layout over
 * content. Six steps, ordered, from first contact to ongoing support. Copy is
 * concise and factual: it describes what happens at each stage, and the only
 * figures it leans on (24/7 support) are already approved elsewhere.
 */

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    icon: ClipboardList,
    title: "Request a free energy assessment",
    description:
      "Tell us about your power needs and we begin with a no cost assessment.",
  },
  {
    icon: Search,
    title: "Site inspection",
    description:
      "We visit to measure your space, load, and roof so the design fits reality.",
  },
  {
    icon: PencilRuler,
    title: "Custom energy solution",
    description:
      "You receive a system designed and sized around your usage and budget.",
  },
  {
    icon: HardHat,
    title: "Professional installation",
    description:
      "Trained technicians install your system safely, cleanly, and on schedule.",
  },
  {
    icon: ClipboardCheck,
    title: "Testing and handover",
    description:
      "We test every component and walk you through the system before handover.",
  },
  {
    icon: Headset,
    title: "After-sales support",
    description:
      "Support and maintenance stay available 24/7 once your system is live.",
  },
];
