import { useState } from "react";
import { Search, X } from "lucide-react";
import { ItemRow } from "./ItemRow";

interface SearchResult {
  id: string;
  title: string;
  date: string;
  type: string;
  status: "verified" | "under-review" | "unverified" | "translated" | "original" | "partial";
}

interface SearchBarProps {
  results?: SearchResult[];
  onSelectResult?: (id: string) => void;
}

const MOCK_RESULTS: SearchResult[] = [
  { id: "1", title: "Letter from Oomo leadership, March 1987", date: "Mar 1987", type: "Letter", status: "verified" },
  { id: "2", title: "Internal report on network structure", date: "Jun 1989", type: "Report", status: "under-review" },
  { id: "3", title: "Transcript: public address, Auckland", date: "Nov 1991", type: "Transcript", status: "original" },
];

export function SearchBar({ onSelectResult }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = query.length > 1
    ? MOCK_RESULTS.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const showResults = focused && query.length > 1;

  return (
    <div className="relative w-full max-w-xl">
      <div
        className="flex items-center gap-2"
        style={{
          borderBottom: `1px solid ${focused ? "var(--accent)" : "var(--hairline, var(--border))"}`,
          background: "transparent",
          padding: "0.5rem 0.25rem",
          transition: "border-color 0.15s",
        }}
      >
        <Search size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search documents, dates, people…"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "0.875rem",
            color: "var(--foreground)",
            fontFamily: "var(--font-sans)",
          }}
        />
        {query && (
          <button onClick={() => setQuery("")} style={{ color: "var(--muted-foreground)" }}>
            <X size={13} />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {showResults && (
        <div
          className="absolute top-full left-0 right-0 mt-0.5 border z-50"
          style={{
            background: "var(--bg-base, var(--background))",
            borderColor: "var(--hairline, var(--border))",
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          }}
        >
          {filtered.length > 0 ? (
            <>
              <div
                className="px-4 py-2 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{query}"
                </span>
              </div>
              <div className="px-4">
                {filtered.map((r) => (
                  <ItemRow
                    key={r.id}
                    title={r.title}
                    date={r.date}
                    type={r.type}
                    status={r.status}
                    dense
                    onClick={() => onSelectResult?.(r.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center">
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                No results found for "{query}"
              </p>
              <p className="mt-1" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                Try a different term, date, or document type
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
