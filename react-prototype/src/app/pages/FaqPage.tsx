// FAQ — full dedicated page. Not in top nav; accessible from Start teaser, Footer, and contextual links.
// Deeper questions too heavy for Start.
// Source-safety: answers are editorial/methodological only — no corpus content, no invented facts.

import { ArrowRight } from "lucide-react";
import { Accordion } from "../components/Accordion";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources" | "faq" | "about" | "style";

interface FaqPageProps {
  onNavigate: (page: Page) => void;
}

const FAQ_SECTIONS = [
  {
    heading: "Authorship and origin",
    items: [
      {
        question: "How will authorship questions be handled?",
        answer: "Authorship questions will be handled only with approved copy and source paths. This prototype does not publish claims, counterclaims, or conclusions.",
      },
      {
        question: "Is OON claiming the correspondence is authentic?",
        answer: "No. OON is intended as a navigation and provenance layer. Status language will be finalized after source review.",
      },
      {
        question: "Are all materials treated the same way?",
        answer: "No final classification is shown in this prototype. Future records should distinguish source material, translation, summary, analysis, hypothesis, and OON interpretation.",
      },
    ],
  },
  {
    heading: "Using OON",
    items: [
      {
        question: "What is source text vs translation vs summary vs interpretation?",
        answer: "These are editorial layers that must remain visually distinct. Final definitions should come from the approved copy workflow.",
      },
      {
        question: "Can I download source material?",
        answer: "No download is available in this prototype. Download behavior is disabled pending source verification, rights review, and approved copy.",
      },
      {
        question: "How will reference codes be handled?",
        answer: "Reference codes will be displayed only after they are sourced from the approved corpus inventory. Until then, item references remain pending.",
      },
    ],
  },
  {
    heading: "Scope and editorial stance",
    items: [
      {
        question: "What about scientific claims and predictions?",
        answer: "Source claims will be documented as source material only after verification. OON interpretation must remain visually separate.",
      },
      {
        question: "Will OON compare the dossier to unrelated typologies?",
        answer: "This prototype does not add comparative claims. Any future comparison would need explicit source and editorial review.",
      },
      {
        question: "Why did governments not publicly recognise this?",
        answer: "OON does not speculate on government knowledge or response. This prototype contains no source-backed government claims.",
      },
      {
        question: "What does Oyagaa–Oomo mean?",
        answer: "Oyagaa–Oomo is the name the organization chose for this project. It is not a term from the original correspondence. OON does not decode it publicly — naming decisions are internal and editorial.",
      },
    ],
  },
];

export function FaqPage({ onNavigate }: FaqPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>
          FAQ
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink, var(--foreground))", marginBottom: "1rem" }}>
          Frequently asked questions
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.7, maxWidth: "52ch" }}>
          Questions that require more space than the Start page allows. If your question is not here, contact OON via the address on file.
        </p>
        <button
          onClick={() => onNavigate("orientation")}
          className="inline-flex items-center gap-1.5 mt-4 transition-opacity hover:opacity-70"
          style={{ fontSize: "0.8125rem", color: "var(--ink-muted, var(--muted-foreground))", textDecoration: "underline var(--hairline, var(--border))", textUnderlineOffset: "3px" }}
        >
          ← Back to Start
        </button>
      </div>

      {/* FAQ sections */}
      {FAQ_SECTIONS.map((section, i) => (
        <div key={section.heading} style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted, var(--muted-foreground))", marginBottom: "1rem" }}>
            {section.heading}
          </p>
          <Accordion items={section.items} multiOpen />
        </div>
      ))}

      {/* Bottom nav */}
      <div className="flex flex-wrap gap-4 pt-8" style={{ borderTop: "1px solid var(--hairline, var(--border))" }}>
        {([
          { label: "Start", page: "orientation" as Page },
          { label: "Read", page: "read" as Page },
          { label: "Sources", page: "sources" as Page },
          { label: "About OON", page: "about" as Page },
        ]).map(({ label, page }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-75"
            style={{ fontSize: "0.8125rem", color: "var(--accent)", fontWeight: 500 }}
          >
            {label} <ArrowRight size={11} />
          </button>
        ))}
      </div>
    </div>
  );
}
