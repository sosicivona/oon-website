import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

/** Minimal page navigation: plain-text page numbers (active = accent colour), text prev/next arrows — no box borders. */
export function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const baseBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "1.75rem",
    height: "1.75rem",
    fontSize: "0.8125rem",
    fontFamily: "var(--font-sans)",
    background: "transparent",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    transition: "opacity 0.12s",
    padding: "0 0.25rem",
  };

  return (
    <div className="flex items-center justify-between pt-6">
      {totalItems && itemsPerPage ? (
        <p style={{ fontSize: "0.75rem", color: "var(--ink-muted, var(--muted-foreground))" }}>
          {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}–
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </p>
      ) : <div />}

      <div className="flex items-center gap-0.5">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:opacity-70 disabled:opacity-25"
          style={{ ...baseBtn, color: "var(--ink-muted, var(--muted-foreground))", gap: "0.2rem" }}
        >
          <ChevronLeft size={13} />
          <span style={{ fontSize: "0.75rem" }}>Prev</span>
        </button>

        <div style={{ width: "0.75rem" }} />

        {/* Page numbers — no boxes */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e-${i}`} style={{ ...baseBtn, color: "var(--ink-muted, var(--muted-foreground))", cursor: "default", letterSpacing: "0.05em" }}>
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className="hover:opacity-70"
              style={{
                ...baseBtn,
                // Active: accent colour + slight weight; inactive: muted
                color: p === currentPage ? "var(--accent-fill, var(--accent))" : "var(--ink-muted, var(--muted-foreground))",
                fontWeight: p === currentPage ? 600 : 400,
                // Underline only on active — no filled box
                borderBottom: p === currentPage ? `2px solid var(--accent-fill, var(--accent))` : "2px solid transparent",
              }}
            >
              {p}
            </button>
          )
        )}

        <div style={{ width: "0.75rem" }} />

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="hover:opacity-70 disabled:opacity-25"
          style={{ ...baseBtn, color: "var(--ink-muted, var(--muted-foreground))", gap: "0.2rem" }}
        >
          <span style={{ fontSize: "0.75rem" }}>Next</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
