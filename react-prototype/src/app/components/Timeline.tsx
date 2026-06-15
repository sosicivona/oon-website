import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { SourceQuote } from "./SourceQuote";

// relatedItems: actual clickable corpus items shown in expanded panel.
// documentCount / relatedTypes / sourceLabel / sourceUrl are deprecated —
// the external archive link is handled in ItemDetailPage, not here.
export type TimelineStatus = "verified" | "under-review" | "unverified" | "translated" | "original" | "partial";

export interface TimelineRelatedItem {
  id: string;
  title: string;
  date: string;
  type: string;
  status: TimelineStatus;
}

export interface TimelineEvent {
  date: string;
  type: string;
  title: string;
  description: string;
  eventCategory: "communication" | "action" | "publication" | "legal" | "response";
  image?: { url: string; alt: string; caption?: string };
  pullQuote?: string;
  detail?: string;
  // Clickable items shown inside the expanded panel
  relatedItems?: TimelineRelatedItem[];
  // Legacy — kept for type safety but no longer displayed
  documentCount?: number;
  relatedTypes?: string[];
  sourceLabel?: string;
  sourceUrl?: string;
}

// §7: default dot = dim; hover/active = fills --accent (slate-blue).
// Category only controls the pill label color (atmospheric, not interactive).
// Dot color uses --ink-muted by default; accent on hover.
const PILL_COLORS: Record<string, string> = {
  communication: "var(--accent)",
  action:        "var(--ink-muted, var(--muted-foreground))",
  publication:   "var(--accent)",
  legal:         "var(--ink-muted, var(--muted-foreground))",
  response:      "var(--ink-muted, var(--muted-foreground))",
};

// Alias for dot default color (dim)
const DOT_COLORS: Record<string, string> = {
  communication: "var(--ink-muted, var(--muted-foreground))",
  action:        "var(--ink-muted, var(--muted-foreground))",
  publication:   "var(--ink-muted, var(--muted-foreground))",
  legal:         "var(--ink-muted, var(--muted-foreground))",
  response:      "var(--ink-muted, var(--muted-foreground))",
};

interface TimelineProps {
  events: TimelineEvent[];
  onSelectItem?: (id: string) => void;
}

/** Vertical timeline: clickable nodes expand to show image, pull-quote, detail, and clickable related document rows. No external archive links here — those live in the item detail view. */
export function Timeline({ events, onSelectItem }: TimelineProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ol className="flex flex-col">
      {events.map((event, i) => {
        const dotColor = DOT_COLORS[event.eventCategory] ?? "var(--neon-amber)";
        const pillColor = PILL_COLORS[event.eventCategory] ?? "var(--neon-amber)";
        const isOpen = openIndex === i;
        const isLast = i === events.length - 1;

        return (
          <TimelineNode
            key={i}
            event={event}
            dotColor={dotColor}
            pillColor={pillColor}
            isOpen={isOpen}
            isLast={isLast}
            onToggle={() => setOpenIndex(isOpen ? null : i)}
            onSelectItem={onSelectItem}
          />
        );
      })}
    </ol>
  );
}

// ── Related documents list ─────────────────────────────────────────────────────
// Handles 1-to-many: shows up to MAX_VISIBLE inline, collapses the rest behind a toggle.
// Events may have many related documents; this avoids overwhelming the expanded card.

const MAX_VISIBLE = 3;

function RelatedDocItem({ item, onSelectItem }: { item: TimelineRelatedItem; onSelectItem?: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onSelectItem?.(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left flex items-center gap-3 py-2 transition-all"
      style={{
        borderBottom: "1px solid var(--hairline, var(--border))",
        background: hovered ? "var(--accent-tint, rgba(51,68,168,0.05))" : "transparent",
        // Show left accent bar on hover — clear affordance that this is clickable
        borderLeft: hovered ? "2px solid var(--accent)" : "2px solid transparent",
        paddingLeft: hovered ? "0.5rem" : "0",
        transition: "background 0.12s, border-color 0.12s, padding 0.12s",
      }}
    >
      <span style={{ fontSize: "0.6875rem", color: "var(--ink-muted, var(--muted-foreground))", minWidth: "4rem", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
        {item.date}
      </span>
      <span className="flex-1 min-w-0 truncate" style={{ fontSize: "0.8125rem", color: hovered ? "var(--ink, var(--foreground))" : "var(--ink-muted, var(--muted-foreground))" }}>
        {item.title}
      </span>
      <BookOpen size={11} style={{ color: hovered ? "var(--accent)" : "var(--muted-foreground)", flexShrink: 0, transition: "color 0.12s" }} />
    </button>
  );
}

function RelatedDocsList({ items, onSelectItem }: { items: TimelineRelatedItem[]; onSelectItem?: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, MAX_VISIBLE);
  const overflow = items.length - MAX_VISIBLE;

  return (
    <div style={{ borderTop: "1px solid var(--hairline, var(--border))", paddingTop: "0.625rem" }}>
      <p style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted, var(--muted-foreground))", marginBottom: "0.375rem" }}>
        Related documents · {items.length}
      </p>
      {visible.map(item => (
        <RelatedDocItem key={item.id} item={item} onSelectItem={onSelectItem} />
      ))}
      {overflow > 0 && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="w-full text-left py-2 inline-flex items-center gap-1.5 transition-opacity hover:opacity-75"
          style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 500 }}
        >
          Show {overflow} more document{overflow !== 1 ? "s" : ""} ↓
        </button>
      )}
      {expanded && items.length > MAX_VISIBLE && (
        <button
          onClick={() => setExpanded(false)}
          className="w-full text-left py-2 transition-opacity hover:opacity-75"
          style={{ fontSize: "0.75rem", color: "var(--ink-muted, var(--muted-foreground))" }}
        >
          Show fewer ↑
        </button>
      )}
    </div>
  );
}

// ── Timeline node ─────────────────────────────────────────────────────────────

function TimelineNode({ event, dotColor, pillColor, isOpen, isLast, onToggle, onSelectItem }: {
  event: TimelineEvent;
  dotColor: string;
  pillColor: string;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
  onSelectItem?: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  // Dot size: 10px collapsed, 14px open
  const DOT_SIZE = isOpen ? "0.875rem" : "0.625rem";
  const DOT_LEFT = "0.4375rem"; // center of a 15px column

  return (
    <li
      className="relative flex gap-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Dot + spine column ──────────────────────────────────────── */}
      <div className="relative flex-shrink-0" style={{ width: "2.5rem", paddingTop: "0.6rem" }}>
        {/* Spine: above this dot (connects from previous item) */}
        {true && (
          <div style={{
            position: "absolute",
            top: 0, bottom: "50%",
            left: DOT_LEFT,
            width: "1px",
            background: "var(--border)",
          }} />
        )}

        {/* Spine: below dot — brightens to --accent on hover/open (§7) */}
        {!isLast && (
          <div style={{
            position: "absolute",
            top: "50%", bottom: 0,
            left: DOT_LEFT,
            width: "1px",
            background: (hovered || isOpen)
              ? "linear-gradient(to bottom, var(--accent), transparent)"
              : "var(--hairline, var(--border))",
            transition: "background 0.25s",
            zIndex: 1,
          }} />
        )}

        {/* Dot — fills --accent on hover/open (§7), dim by default */}
        <button
          onClick={onToggle}
          aria-label={isOpen ? "Collapse" : "Expand"}
          style={{
            position: "relative",
            zIndex: 2,
            width: "1.5rem",
            height: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: "50%",
            background: (hovered || isOpen) ? "var(--accent)" : "var(--ink-muted, var(--muted-foreground))",
            transition: "width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s",
            boxShadow: (hovered || isOpen)
              ? "0 0 0 4px var(--accent-tint, rgba(122,140,201,0.15)), 0 0 10px var(--accent-tint)"
              : "none",
          }} />
        </button>
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 pb-10">
        {/* Clickable header — no border/background treatment, just cursor */}
        <button
          onClick={onToggle}
          className="w-full text-left"
          style={{ paddingTop: "0.35rem" }}
        >
          {/* Type pill + date + chevron */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap pr-2">
            <span style={{
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: pillColor,
              background: `color-mix(in srgb, ${pillColor} 10%, transparent)`,
              border: `1px solid color-mix(in srgb, ${pillColor} 28%, transparent)`,
              padding: "0.15rem 0.5rem",
              borderRadius: "9999px",
            }}>
              {event.type}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>
              {event.date}
            </span>
            <ChevronDown
              size={12}
              style={{
                color: "var(--muted-foreground)",
                marginLeft: "auto",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                flexShrink: 0,
                opacity: hovered || isOpen ? 1 : 0.5,
                transition: "transform 0.2s, opacity 0.15s",
              }}
            />
          </div>

          {/* Title */}
          <p style={{
            fontSize: "0.9375rem",
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            color: (hovered || isOpen) ? "var(--foreground)" : "var(--foreground)",
            lineHeight: 1.3,
            marginBottom: "0.3rem",
            opacity: hovered || isOpen ? 1 : 0.85,
            transition: "opacity 0.15s",
          }}>
            {event.title}
          </p>
          <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            {event.description}
          </p>
        </button>

        {/* Expanded panel */}
        {isOpen && (
          <div className="mt-4 overflow-hidden" style={{
            background: "var(--bg-surface, var(--card))",
            borderRadius: "2px",
            // Hero-card inset edges (stronger for card-level emphasis)
            boxShadow: [
              "inset 0 1px 0 color-mix(in srgb, var(--accent) 35%, transparent)",
              "inset 1px 0 0 color-mix(in srgb, var(--accent) 35%, transparent)",
            ].join(", "),
          }}>
            {event.image && (
              <div className="relative" style={{ height: "10rem", overflow: "hidden" }}>
                <img src={event.image.url} alt={event.image.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                {event.image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2" style={{ background: "rgba(0,0,0,0.55)" }}>
                    <p style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.82)" }}>{event.image.caption}</p>
                  </div>
                )}
              </div>
            )}

            <div className="p-4">
              {event.pullQuote && (
                <blockquote className="mb-4 pl-3" style={{ borderLeft: "3px solid var(--accent)" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--foreground)" }}>
                    "{event.pullQuote}"
                  </p>
                </blockquote>
              )}

              {event.detail && (
                <p className="mb-4" style={{ fontSize: "0.8125rem", lineHeight: 1.75, color: "var(--muted-foreground)" }}>
                  {event.detail}
                </p>
              )}

              {/* Related documents — 1-to-many, collapsible if > 3 */}
              {event.relatedItems && event.relatedItems.length > 0 && (
                <RelatedDocsList items={event.relatedItems} onSelectItem={onSelectItem} />
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}