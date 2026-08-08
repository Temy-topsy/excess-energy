import { company } from "@/lib/content/company";

/**
 * Contact page content that is copy, not company fact. The company facts
 * (phones, email, areas) stay in company.ts; the questions below are specific
 * to the act of getting in touch, so they live with the contact page. Answers
 * read from company data where a fact is involved, so they never fall out of
 * date.
 */

export interface ContactFaq {
  question: string;
  answer: string;
}

export const contactFaqs: ContactFaq[] = [
  {
    question: "How quickly will you respond?",
    answer:
      "We aim to reply the same day. WhatsApp is usually fastest, and our lines are open around the clock for anything urgent.",
  },
  {
    question: "Which areas do you cover?",
    answer: `We currently install and support systems across ${company.coverageAreas.join(", ")}. Projects beyond these regions are available on request as we expand across Nigeria.`,
  },
  {
    question: "Does a free energy assessment cost anything?",
    answer:
      "No. The assessment is free and there is no obligation. We review how you use energy and recommend a system sized to it, and you decide from there.",
  },
  {
    question: "Do you have an emergency line?",
    answer: `Yes. For urgent issues call our emergency line on ${company.emergency.display}, available ${company.availability}.`,
  },
  {
    question: "What should I include when I get in touch?",
    answer:
      "Your name, a phone number, the service you are interested in, and a sentence on what you need. That is enough for us to come back with the right next step.",
  },
];
