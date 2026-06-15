// About OON — support route. Not in top nav; accessible from Footer, Start, and Sources.
// Explains what OON is and is not, why it exists, and how it handles source material.
// Source-safety: no corpus content; answers are organizational and methodological only.

import { ArrowRight } from "lucide-react";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources" | "faq" | "about" | "style";

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const WHAT_OON_IS = [
  { term: "A reading interface",     body: "OON is a structured navigation layer over a large body of primary-source material. It provides browsing, provenance tracking, and reading paths." },
  { term: "Source-visible",          body: "Every item in OON links back to its holding institution. OON does not host original documents. Provenance is always cited." },
  { term: "Layer-aware",             body: "OON separates source text, translation, summary, analysis, hypothesis, and OON interpretation. These layers are visually distinct throughout the site." },
  { term: "Non-positional",          body: "OON does not argue a verdict on the origin of the UMMO correspondence. It presents material, documents provenance, and leaves evaluation to the reader." },
];

const WHAT_OON_IS_NOT = [
  { term: "An archive",              body: "OON does not hold original documents. Original material is held in external institutions." },
  { term: "An advocacy site",        body: "OON is not promoting any hypothesis about the origin, nature, or meaning of the UMMO correspondence." },
  { term: "A debunking site",        body: "OON is not trying to disprove any claim. Counterpoints are documented as source material, not arguments." },
  { term: "A research body",         body: "OON does not conduct independent research. It indexes and structures existing documented material." },
];

const LAYERS = [
  { n: "1", label: "Source text",        note: "The original document. Primary evidence." },
  { n: "2", label: "Translation",        note: "A rendered version in another language. Always attributed." },
  { n: "3", label: "Summary",            note: "Condensed description of document content. Not a quotation." },
  { n: "4", label: "Analysis",           note: "Scholarly or editorial commentary on the source." },
  { n: "5", label: "Hypothesis",         note: "An interpretive claim about origin, authorship, or meaning." },
  { n: "6", label: "OON interpretation", note: "Contextual framing added by OON editors. Always marked." },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">

      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>
          About
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink, var(--foreground))", marginBottom: "1.25rem" }}>
          About Oyagaa–Oomo Network
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.75, maxWidth: "54ch" }}>
          OON is a structured reading interface over the UMMO dossier. It is not an archive, not an advocacy project, and not a research body. It is a navigation layer — source-visible, layer-aware, and non-positional.
        </p>
      </div>

      {/* What OON is */}
      <section style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted, var(--muted-foreground))", marginBottom: "1rem" }}>
          What OON is
        </p>
        <dl style={{ borderTop: "1px solid var(--hairline, var(--border))" }}>
          {WHAT_OON_IS.map(({ term, body }) => (
            <div key={term} className="grid gap-4 py-3.5" style={{ gridTemplateColumns: "10rem 1fr", borderBottom: "1px solid var(--hairline, var(--border))" }}>
              <dt style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink, var(--foreground))", paddingTop: "0.05rem" }}>{term}</dt>
              <dd style={{ fontSize: "0.875rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.7 }}>{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* What OON is not */}
      <section style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted, var(--muted-foreground))", marginBottom: "1rem" }}>
          What OON is not
        </p>
        <dl style={{ borderTop: "1px solid var(--hairline, var(--border))" }}>
          {WHAT_OON_IS_NOT.map(({ term, body }) => (
            <div key={term} className="grid gap-4 py-3.5" style={{ gridTemplateColumns: "10rem 1fr", borderBottom: "1px solid var(--hairline, var(--border))" }}>
              <dt style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink, var(--foreground))", paddingTop: "0.05rem" }}>{term}</dt>
              <dd style={{ fontSize: "0.875rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.7 }}>{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The six layers */}
      <section style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted, var(--muted-foreground))", marginBottom: "0.75rem" }}>
          How OON separates the layers
        </p>
        <p style={{ fontSize: "0.875rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.7, maxWidth: "52ch", marginBottom: "1.25rem" }}>
          Every item in OON is placed in one of six layers. The layer is always visible in the item's header, sidebar, and document view. You always know what you are reading.
        </p>
        <div style={{ borderTop: "1px solid var(--hairline, var(--border))" }}>
          {LAYERS.map(({ n, label, note }) => (
            <div key={label} className="grid gap-4 py-3" style={{ gridTemplateColumns: "1.5rem 9rem 1fr", alignItems: "start", borderBottom: "1px solid var(--hairline, var(--border))" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--accent)", paddingTop: "0.1rem" }}>{n}</span>
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink, var(--foreground))" }}>{label}</span>
              <span style={{ fontSize: "0.8125rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.6 }}>{note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <div className="flex flex-wrap gap-4 pt-8" style={{ borderTop: "1px solid var(--hairline, var(--border))" }}>
        {([
          { label: "Start", page: "orientation" as Page },
          { label: "FAQ", page: "faq" as Page },
          { label: "Sources", page: "sources" as Page },
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
