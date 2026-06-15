// §5 hover rule — list rows:
// hover: bg → rgba(255,255,255,0.04) dark / rgba(0,0,0,0.03) light; chevron → --accent
// selected: --bg-elevated + 3px --accent left bar
// expanded: handled by BrowsePage InlineReader
// NO per-component custom hover — same rule every row.

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { TypeChip } from "./TypeChip";

interface ItemRowProps {
  title: string;
  date: string;
  type: string;
  status: "verified" | "under-review" | "unverified" | "translated" | "original" | "partial";
  dense?: boolean;
  onClick?: () => void;
  loading?: boolean;
  active?: boolean;
}

function SkeletonRow() {
  return (
    <div className="py-3.5 flex items-center gap-4" style={{ borderBottom: "1px solid var(--hairline, var(--border))" }}>
      <div className="flex-1">
        <div className="h-3.5 rounded-full w-2/3 mb-2" style={{ background: "var(--bg-elevated, var(--muted))", animation: "pulse 1.5s ease-in-out infinite" }} />
        <div className="h-2.5 rounded-full w-1/3" style={{ background: "var(--bg-elevated, var(--muted))", animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
      <div className="h-4 w-16 rounded-full" style={{ background: "var(--bg-elevated, var(--muted))", animation: "pulse 1.5s ease-in-out infinite" }} />
    </div>
  );
}

/** Corpus item list row showing date, title, TypeChip, and StatusBadge; supports `active` (accent left bar + elevated bg), `dense`, and `loading` (skeleton) states. */
export function ItemRow({ title, date, type, status, dense = false, onClick, loading = false, active = false }: ItemRowProps) {
  const [hovered, setHovered] = useState(false);

  if (loading) return <SkeletonRow />;

  const highlighted = hovered || active;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left flex items-center gap-4"
      style={{
        padding: dense ? "0.625rem 0.75rem" : "0.875rem 0.75rem",
        paddingLeft: "0.75rem",
        borderBottom: `1px solid var(--hairline, var(--border))`,
        // §5: left bar only when active (selected state), not on hover
        borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
        // §5: hover bg — very subtle, no content movement
        background: active
          ? "var(--bg-elevated, var(--secondary))"
          : hovered
            ? "var(--accent-tint, rgba(255,255,255,0.04))"
            : "transparent",
        transition: "background 0.12s, border-color 0.12s",
      }}
    >
      {/* Date */}
      <span style={{ minWidth: "5rem", fontSize: dense ? "0.75rem" : "0.8125rem", color: "var(--ink-muted, var(--muted-foreground))", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
        {date}
      </span>

      {/* Title */}
      <span className="flex-1 min-w-0 truncate" style={{ fontSize: dense ? "0.875rem" : "0.9375rem", color: "var(--ink, var(--foreground))", fontFamily: "var(--font-sans)" }}>
        {title}
      </span>

      {/* Type + Status */}
      <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
        <TypeChip label={type} />
        <StatusBadge variant={status} short />
      </div>

      {/* Chevron → accent on hover (§5) */}
      <ChevronRight size={13} style={{ color: highlighted ? "var(--accent)" : "var(--ink-muted, var(--muted-foreground))", transition: "color 0.12s", flexShrink: 0 }} />
    </button>
  );
}
