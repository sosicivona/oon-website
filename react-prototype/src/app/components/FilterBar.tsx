import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { TypeChip } from "./TypeChip";

type BrowseMode = "topic" | "period" | "type";

interface FilterBarProps {
  mode: BrowseMode;
  onModeChange: (mode: BrowseMode) => void;
  activeTypes: string[];
  onTypeToggle: (type: string) => void;
  sortOrder: "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
  resultCount: number;
}

const ALL_TYPES = ["Communication item", "Source path", "Context note", "Archive reference"];

/** Sticky filter bar for the Browse page: mode segmented control (topic/period/type), collapsible type-chip filter panel, sort dropdown, and result count. */
export function FilterBar({
  mode, onModeChange, activeTypes, onTypeToggle, sortOrder, onSortChange, resultCount
}: FilterBarProps) {
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  return (
    <div
      className="sticky top-12 z-40 border-b"
      style={{ background: "color-mix(in srgb, var(--background) 82%, transparent)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderColor: "var(--border)" }}
    >
      {/* Mode + Sort row */}
      <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center gap-4 flex-wrap">
        {/* Segmented control */}
        <div
          className="flex items-center border"
          style={{ borderColor: "var(--border)", borderRadius: "2px" }}
        >
          {(["topic", "period", "type"] as BrowseMode[]).map((m, i) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className="capitalize transition-colors"
              style={{
                padding: "0.35rem 0.875rem",
                fontSize: "0.75rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                background: mode === m ? "var(--accent-fill, var(--accent))" : "transparent",
                color: mode === m ? "var(--accent-on-fill, var(--primary-foreground))" : "var(--ink-muted, var(--muted-foreground))",
                borderRight: i < 2 ? `1px solid var(--border)` : "none",
                letterSpacing: "0.02em",
              }}
            >
              By {m}
            </button>
          ))}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          <SlidersHorizontal size={12} />
          Filter
          {activeTypes.length > 0 && (
            <span
              style={{
                padding: "0.1rem 0.4rem",
                fontSize: "0.625rem",
                background: "var(--accent)",
                color: "var(--accent-foreground)",
                borderRadius: "2px",
                fontWeight: 600,
              }}
            >
              {activeTypes.length}
            </span>
          )}
          <ChevronDown
            size={11}
            style={{ transform: filtersExpanded ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}
          />
        </button>

        <div className="flex-1" />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Sort:</span>
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as "newest" | "oldest")}
            className="border"
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.5rem",
              background: "transparent",
              color: "var(--ink, var(--foreground))",
              border: "none",
              borderBottom: "1px solid var(--hairline, var(--border))",
              fontFamily: "var(--font-sans)",
            }}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {/* Result count */}
        <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
          {resultCount} item{resultCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filter chips */}
      {filtersExpanded && (
        <div
          className="border-t max-w-5xl mx-auto px-6 py-2.5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", marginRight: "0.25rem" }}>
              Type:
            </span>
            {ALL_TYPES.map((t) => (
              <TypeChip
                key={t}
                label={t}
                selectable
                selected={activeTypes.includes(t)}
                onToggle={() => onTypeToggle(t)}
              />
            ))}
            {activeTypes.length > 0 && (
              <button
                onClick={() => { [...activeTypes].forEach(onTypeToggle); }}
                style={{ fontSize: "0.6875rem", color: "var(--accent)", marginLeft: "0.5rem" }}
                className="hover:opacity-70 transition-opacity"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
