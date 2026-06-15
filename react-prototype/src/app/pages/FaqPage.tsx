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
        question: "Wasn't this resolved by José Luis Jordán Peña?",
        answer: "The Peña authorship claim is one of the most significant events in the history of the dossier. OON treats it as a primary counterpoint that deserves careful source review and documentation, not dismissal. The site separates source material, authorship claims, later commentary, and OON interpretation so readers can examine each layer. A dedicated item in the corpus index covers the Peña claim and its reception. How that claim should be weighed against the wider evidentiary record is a question OON does not answer for you.",
      },
      {
        question: "Is OON claiming the correspondence is authentic?",
        answer: "No. OON does not make or imply authenticity claims. The status labels — Verified, Under Review, Unverified, Partial — describe provenance confirmation, not claims about origin. OON's role is to organize material and document provenance. Readers evaluate the material.",
      },
      {
        question: "Are later communications treated the same as early letters?",
        answer: "No. The corpus has a layered structure: early letters (pre-1970s), later communications, post-1980s accounts, online-era material, and subsequent commentary. OON applies the same provenance methodology to all material, but the source-layer distinctions become more important as you move toward secondary and tertiary accounts. The Read section allows filtering by document type and period.",
      },
    ],
  },
  {
    heading: "Using OON",
    items: [
      {
        question: "What is source text vs translation vs summary vs interpretation?",
        answer: "Source text is the original document in its original language. Translation is a rendered version in another language, always attributed. Summary is a condensed description of the document's content, not a quotation. Analysis is scholarly or editorial commentary on the source. Hypothesis is an interpretive claim about origin, authorship, or meaning. OON interpretation is where OON editors have added contextual framing — always marked as such. These layers are visually distinct throughout the site.",
      },
      {
        question: "Can I read or download the full corpus?",
        answer: "The corpus is held in external archives and institutions. OON does not host original documents. For collections with public digital access, OON links directly. For restricted collections, OON notes the access requirement. Download options in individual item views cover OON-produced summaries and provenance data, not original documents.",
      },
      {
        question: "What are D, NR, GR1, W, H, E references?",
        answer: "These are internal reference codes used in the historical correspondence record to designate letter categories, recipients, and series. They appear in provenance records sourced from institutional archives. OON preserves these codes as they appear in original or cited records. A reference guide is in progress and will appear in the Sources section.",
      },
    ],
  },
  {
    heading: "Scope and editorial stance",
    items: [
      {
        question: "What about scientific claims and predictions?",
        answer: "Several letters make scientific or technical claims. OON documents these as features of the source text. OON does not validate or invalidate scientific claims — that is outside the scope of a documentary archive. Where published analyses of specific claims exist, OON references them as analysis-layer material, clearly attributed.",
      },
      {
        question: "Are Ummites related to Nordics, Tall Whites, Greys, or other described beings?",
        answer: "OON does not catalogue cross-references to typologies from other bodies of reported contact. The UMMO correspondence is treated on its own evidentiary terms. Comparative discussions exist in the analysis literature; OON may reference those as secondary material where they engage directly with the corpus.",
      },
      {
        question: "Why did governments not publicly recognise this?",
        answer: "OON does not document or speculate on government knowledge or response. The site is focused on the documentary record as it exists in archives and published research. Questions about government awareness belong to investigative journalism or political history, not to OON's scope.",
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
