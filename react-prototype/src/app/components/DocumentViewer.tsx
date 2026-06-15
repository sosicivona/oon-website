import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";

interface DocumentPage {
  text: string;
}

interface DocumentViewerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  date: string;
  reference: string;
  pages: DocumentPage[];
  onDownload?: () => void;
}

/** Full-screen modal document reader with zoom controls, page-by-page navigation, keyboard shortcuts (Esc / arrow keys), and an optional download action. */
export function DocumentViewer({ open, onClose, title, date, reference, pages, onDownload }: DocumentViewerProps) {
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!open) { setPage(0); setZoom(1); }
  }, [open]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight" && page < pages.length - 1) setPage(p => p + 1);
    if (e.key === "ArrowLeft" && page > 0) setPage(p => p - 1);
  }, [open, onClose, page, pages.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(10,10,9,0.88)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 h-12 flex-shrink-0 border-b"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            style={{
              fontSize: "0.8125rem",
              fontFamily: "var(--font-sans)",
              color: "var(--foreground)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "28rem",
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", flexShrink: 0 }}>
            {date} · {reference}
          </span>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Zoom */}
          <button
            onClick={() => setZoom(z => Math.max(0.7, z - 0.15))}
            className="w-8 h-8 flex items-center justify-center border transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            title="Zoom out"
          >
            <ZoomOut size={13} />
          </button>
          <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", minWidth: "2.5rem", textAlign: "center" }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(1.6, z + 0.15))}
            className="w-8 h-8 flex items-center justify-center border transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            title="Zoom in"
          >
            <ZoomIn size={13} />
          </button>

          <div className="w-px h-5 mx-2" style={{ background: "var(--border)" }} />

          {/* Download */}
          {onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3 h-7 border transition-opacity hover:opacity-70"
              style={{ borderColor: "var(--accent)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 500 }}
            >
              <Download size={11} />
              Download
            </button>
          )}

          <div className="w-px h-5 mx-2" style={{ background: "var(--border)" }} />

          {/* Close */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
            title="Close (Esc)"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Document area */}
      <div className="flex-1 overflow-auto flex flex-col items-center py-10 px-4" style={{ background: "#3A3832" }}>
        {/* Page */}
        <div
          style={{
            width: `${Math.min(44 * zoom, 90)}rem`,
            maxWidth: "90vw",
            background: "#FDFCF8",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25)",
            padding: `${4 * zoom}rem ${5 * zoom}rem`,
            position: "relative",
            minHeight: "54rem",
            transition: "width 0.15s",
          }}
        >
          {/* Document header */}
          <div
            className="mb-8 pb-6"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
          >
            <p
              style={{
                fontSize: `${0.625 * zoom}rem`,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#888",
                marginBottom: "0.5rem",
              }}
            >
              {reference} · {date}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: `${1.25 * zoom}rem`,
                fontWeight: 500,
                color: "#1A1714",
                lineHeight: 1.3,
              }}
            >
              {title}
            </p>
          </div>

          {/* Body */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: `${1 * zoom}rem`,
              lineHeight: 1.9,
              color: "#1C1916",
              whiteSpace: "pre-wrap",
            }}
          >
            {pages[page]?.text}
          </div>

          {/* Page number */}
          <div
            className="absolute bottom-6 right-8"
            style={{ fontSize: `${0.7 * zoom}rem`, color: "#AAAAAA" }}
          >
            {page + 1} / {pages.length}
          </div>
        </div>
      </div>

      {/* Pagination bar */}
      <div
        className="flex items-center justify-center gap-4 h-12 flex-shrink-0 border-t"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="flex items-center gap-1.5 px-3 h-7 border transition-opacity hover:opacity-70 disabled:opacity-30"
          style={{ borderColor: "var(--border)", color: "var(--foreground)", fontSize: "0.75rem" }}
        >
          <ChevronLeft size={13} /> Previous
        </button>

        <div className="flex gap-1">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: i === page ? "1.5rem" : "0.375rem",
                height: "0.375rem",
                borderRadius: "2px",
                background: i === page ? "var(--accent)" : "var(--border)",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))}
          disabled={page === pages.length - 1}
          className="flex items-center gap-1.5 px-3 h-7 border transition-opacity hover:opacity-70 disabled:opacity-30"
          style={{ borderColor: "var(--border)", color: "var(--foreground)", fontSize: "0.75rem" }}
        >
          Next <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
