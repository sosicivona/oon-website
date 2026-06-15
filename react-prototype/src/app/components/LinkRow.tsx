// Sources page archive row. Hover uses accent-tint (not secondary/white which clashes on cream bg).
// Negative left/right margin bleeds the hover bg to the full container edge.

import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface LinkRowProps {
  name: string;
  type: string;
  url?: string;
  description?: string;
}

const PILL_COLORS: Record<string, string> = {
  "Primary archive": "var(--accent)",
  "Reference":       "var(--muted-foreground)",
  "Discussion":      "var(--muted-foreground)",
  "Institutional":   "var(--muted-foreground)",
};

/** Sources page archive/institution row with name, type pill, description, and external link. */
export function LinkRow({ name, type, url, description }: LinkRowProps) {
  const [hovered, setHovered] = useState(false);
  const pillColor = PILL_COLORS[type] ?? "var(--muted-foreground)";

  return (
    <div
      className="flex items-center gap-4 py-3.5 transition-colors"
      style={{
        borderBottom: "1px solid var(--hairline, var(--border))",
        // Accent-tint hover — visible in both themes without clashing
        background: hovered ? "var(--accent-tint, rgba(51,68,168,0.05))" : "transparent",
        // Bleed the hover bg past the container's left/right padding
        marginLeft: hovered ? "-1.5rem" : "0",
        marginRight: hovered ? "-1.5rem" : "0",
        paddingLeft: hovered ? "1.5rem" : "0",
        paddingRight: hovered ? "1.5rem" : "0",
        transition: "background 0.12s, margin 0.12s, padding 0.12s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--ink, var(--foreground))", fontWeight: 500 }}>
            {name}
          </span>
          <span style={{
            fontSize: "0.6875rem", fontWeight: 400, letterSpacing: "0.03em",
            padding: "0.15rem 0.5rem",
            border: "1px solid var(--hairline, var(--border))",
            color: pillColor,
          }}>
            {type}
          </span>
        </div>
        {description && (
          <p className="mt-0.5" style={{ fontSize: "0.8125rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.5 }}>
            {description}
          </p>
        )}
      </div>
      {url && (
        <a
          href={url} target="_blank" rel="noopener noreferrer"
          className="flex-shrink-0 transition-colors hover:opacity-70"
          style={{ color: hovered ? "var(--accent)" : "var(--muted-foreground)" }}
          title={`Open ${name} in new tab`}
        >
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
