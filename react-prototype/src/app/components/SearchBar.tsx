import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSelectResult?: (id: string) => void;
}

export function SearchBar({ onSelectResult: _onSelectResult }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

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
          placeholder="Search reviewed records..."
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
          <div className="px-4 py-6 text-center">
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              Search will become available as reviewed records are added.
            </p>
            <p className="mt-1" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
              Query held: "{query}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
