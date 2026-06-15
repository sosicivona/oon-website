import { ExternalLink } from "lucide-react";

interface SourceQuoteProps {
  /** Actual passage text in serif. MUST be bracketed placeholder until verified corpus passage supplied. */
  passage: string;
  /** Document or item reference from approved inventory */
  documentId?: string;
  /** Date or period from approved inventory */
  date?: string;
  /** Source status badge from approved inventory */
  sourceStatus?: string;
  /** Link to full item detail or archive */
  linkTo?: () => void;
  /** Translation attribution from approved inventory */
  translationNote?: string;
  /** Visual variant — standard block or epigraph (centered, larger) */
  variant?: "block" | "epigraph";
}

/**
 * SourceQuote — Reusable excerpt block for corpus passages.
 * Distinct from OON's own text: serif passage, attribution, source status, link back.
 * 
 * CONTENT SAFETY: Until real verified corpus passages with provenance are supplied,
 * use bracketed placeholders like "[Passage excerpt to be added — awaiting verification]".
 * Do NOT invent quotes. Every quote shows its source and links back.
 */
export function SourceQuote({
  passage,
  documentId,
  date,
  sourceStatus,
  linkTo,
  translationNote,
  variant = "block",
}: SourceQuoteProps) {
  const isEpigraph = variant === "epigraph";

  return (
    <div
      style={{
        maxWidth: isEpigraph ? "42rem" : "56rem",
        margin: isEpigraph ? "0 auto" : "0",
        textAlign: isEpigraph ? "center" : "left",
      }}
    >
      {/* Passage — serif, distinct voice */}
      <blockquote
        style={{
          fontFamily: "var(--font-display)",
          fontSize: isEpigraph ? "1.125rem" : "1rem",
          lineHeight: 1.7,
          color: "var(--ink, var(--foreground))",
          fontStyle: isEpigraph ? "italic" : "normal",
          margin: 0,
          paddingLeft: isEpigraph ? 0 : "1.5rem",
          borderLeft: isEpigraph ? "none" : "3px solid var(--hairline, var(--border))",
        }}
      >
        "{passage}"
      </blockquote>

      {/* Attribution + metadata */}
      <div
        style={{
          marginTop: "0.875rem",
          display: "flex",
          flexDirection: isEpigraph ? "column" : "row",
          alignItems: isEpigraph ? "center" : "flex-start",
          gap: "0.5rem",
          flexWrap: "wrap",
          fontSize: "0.8125rem",
          color: "var(--ink-muted, var(--muted-foreground))",
        }}
      >
        {/* Document ID + Date */}
        {(documentId || date) && (
          <span style={{ fontWeight: 500 }}>
            {documentId && <span>{documentId}</span>}
            {documentId && date && <span> · </span>}
            {date && <span>{date}</span>}
          </span>
        )}

        {/* Source status badge */}
        {sourceStatus && (
          <span
            style={{
              padding: "0.125rem 0.5rem",
              borderRadius: "3px",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              background: "var(--s-neutral-bg)",
              color: "var(--s-neutral-text)",
              border: "1px solid var(--s-neutral-border)",
            }}
          >
            {sourceStatus}
          </span>
        )}

        {/* Link to full item */}
        {linkTo && (
          <button
            onClick={linkTo}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              color: "var(--accent)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              background: "transparent",
              border: "none",
              padding: 0,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View full document <ExternalLink size={12} />
          </button>
        )}

        {/* Translation note */}
        {translationNote && (
          <span style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--ink-muted)" }}>
            {translationNote}
          </span>
        )}
      </div>
    </div>
  );
}
