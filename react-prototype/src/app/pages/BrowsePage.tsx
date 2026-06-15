import { useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { ItemRow } from "../components/ItemRow";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";
import { StatusBadge } from "../components/StatusBadge";
import { TypeChip } from "../components/TypeChip";
import { ExternalLink, BookOpen, Download } from "lucide-react";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources";
type BrowseMode = "topic" | "period" | "type";

interface BrowsePageProps {
  onNavigate: (page: Page) => void;
  onSelectItem: () => void;
}

const ALL_ITEMS = [
  { id: "pending-1", title: "Communication item pending review", date: "Date pending", type: "Communication item", status: "under-review" as const, excerpt: "Excerpt pending source approval." },
  { id: "pending-2", title: "Source path pending review", date: "Date pending", type: "Source path", status: "under-review" as const, excerpt: "Archive link and provenance details pending verification." },
  { id: "pending-3", title: "Context note pending copy approval", date: "Date pending", type: "Context note", status: "under-review" as const, excerpt: "Context summary pending approved copy and source review." },
  { id: "pending-4", title: "Archive reference pending verification", date: "Date pending", type: "Archive reference", status: "under-review" as const, excerpt: "Holding details will be added from the approved corpus inventory." },
  { id: "pending-5", title: "Translation status pending review", date: "Date pending", type: "Communication item", status: "under-review" as const, excerpt: "Translation status will be shown after verification." },
  { id: "pending-6", title: "OON interpretation placeholder", date: "Date pending", type: "Context note", status: "under-review" as const, excerpt: "Interpretive notes will remain visually separate from source material." },
];

const ITEMS_PER_PAGE = 8;

// No X button — clicking the row again is the only collapse mechanism
function InlineReader({ item, onReadFull }: { item: typeof ALL_ITEMS[0]; onReadFull: () => void }) {
  return (
    <div
      className="border-l border-b overflow-hidden"
      style={{
        borderLeft: "3px solid var(--accent)",
        background: "var(--bg-surface)",  // warm off-white surface, not pure white
        // Hero-card inset edges (left has accent bar, so top+right get the glow)
        boxShadow: [
          "inset 0 1px 0 color-mix(in srgb, var(--accent) 22%, transparent)",
          "inset -1px 0 0 color-mix(in srgb, var(--accent) 10%, transparent)",
        ].join(", "),
      }}
    >
      {/* Reader header — minimal, no close button */}
      <div
        className="flex items-center gap-2 flex-wrap px-5 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <TypeChip label={item.type} />
        <StatusBadge variant={item.status} />
        <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{item.date}</span>
        <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", marginLeft: "auto" }}>
          Click row to collapse
        </span>
      </div>

      <div className="px-5 py-4">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 400,
            color: "var(--foreground)",
            lineHeight: 1.3,
            marginBottom: "0.875rem",
          }}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "0.9375rem",
            lineHeight: 1.8,
            color: "var(--foreground)",
            borderLeft: "3px solid var(--border)",
            paddingLeft: "1rem",
            marginBottom: "1.125rem",
          }}
        >
          {item.excerpt}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onReadFull}
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            style={{
              padding: "0.45rem 1rem",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              borderRadius: "2px",
              fontFamily: "var(--font-sans)",
              boxShadow: "0 0 12px -4px var(--accent)",
            }}
          >
            <BookOpen size={12} /> Open reader shell
          </button>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}
          >
            <ExternalLink size={12} /> Archive link pending verification
          </span>
          <button
            disabled
            className="inline-flex items-center gap-1.5 ml-auto cursor-not-allowed"
            style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}
          >
            <Download size={12} /> Download disabled
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrowsePage({ onNavigate, onSelectItem }: BrowsePageProps) {
  const [mode, setMode] = useState<BrowseMode>("topic");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("oldest");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggleType(type: string) {
    setActiveTypes(p => p.includes(type) ? p.filter(t => t !== type) : [...p, type]);
    setCurrentPage(1);
  }

  let filtered = [...ALL_ITEMS];
  if (activeTypes.length > 0) filtered = filtered.filter(i => activeTypes.includes(i.type));
  filtered.sort((a, b) => sortOrder === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  function toggleExpanded(id: string) {
    setExpandedId(prev => prev === id ? null : id);
  }

  return (
    <div>
      <FilterBar
        mode={mode}
        onModeChange={setMode}
        activeTypes={activeTypes}
        onTypeToggle={toggleType}
        sortOrder={sortOrder}
        onSortChange={o => { setSortOrder(o); setCurrentPage(1); }}
        resultCount={filtered.length}
      />

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        {/* Search */}
        <div className="mb-8">
          <SearchBar onSelectResult={(id) => { setExpandedId(id); }} />
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-16 text-center border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
              No items match these filters
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Try removing one or more active type filters.</p>
            <button onClick={() => setActiveTypes([])} className="mt-4 hover:opacity-70 transition-opacity" style={{ fontSize: "0.875rem", color: "var(--accent)" }}>
              Clear all filters
            </button>
          </div>
        )}

        {/* Item list with inline reader */}
        {filtered.length > 0 && (
          <>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {pageItems.map((item) => (
                <div key={item.id}>
                  <ItemRow
                    title={item.title}
                    date={item.date}
                    type={item.type}
                    status={item.status}
                    onClick={() => toggleExpanded(item.id)}
                    active={expandedId === item.id}
                  />
                  {expandedId === item.id && (
                    <InlineReader
                      item={item}
                      onReadFull={onSelectItem}
                    />
                  )}
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        )}
      </div>
    </div>
  );
}
