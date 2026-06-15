import { ExternalLink } from "lucide-react";

interface QuoteBlockProps {
  text: string;
  attribution: string;
  date?: string;
  source?: string;
  sourceUrl?: string;
}

/** Display-serif italic blockquote with attribution, optional date, and an optional source link (rendered as an anchor if `sourceUrl` is provided). */
export function QuoteBlock({ text, attribution, date, source, sourceUrl }: QuoteBlockProps) {
  return (
    <blockquote
      style={{
        borderLeft: "3px solid var(--border)",
        paddingLeft: "1.375rem",
        margin: "1.5rem 0",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.0625rem",
          fontStyle: "italic",
          lineHeight: 1.7,
          color: "var(--foreground)",
          marginBottom: "0.75rem",
        }}
      >
        "{text}"
      </p>
      <footer className="flex items-center gap-2 flex-wrap">
        <cite
          style={{
            fontSize: "0.75rem",
            fontStyle: "normal",
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-sans)",
          }}
        >
          — {attribution}
          {date && <span>, {date}</span>}
        </cite>
        {source && (
          <>
            <span style={{ color: "var(--border)", fontSize: "0.75rem" }}>·</span>
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
                style={{ fontSize: "0.75rem", color: "var(--accent)" }}
              >
                {source} <ExternalLink size={10} />
              </a>
            ) : (
              <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{source}</span>
            )}
          </>
        )}
      </footer>
    </blockquote>
  );
}
