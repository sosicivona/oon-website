import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { ReactNode } from "react";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources" | "faq" | "about" | "style";

interface TopNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  darkMode?: boolean;
  themeSwitcher?: ReactNode;
}

// Browse is merged into Read — clicking Read takes you to the filter+list experience
const navLinks: { label: string; page: Page }[] = [
  { label: "Start",    page: "orientation" },
  { label: "Read",     page: "read" },
  { label: "Timeline", page: "timeline" },
  { label: "Sources",  page: "sources" },
];

/** Sticky top navigation bar with logo, four nav links, and a theme-switcher slot; collapses to a hamburger menu on mobile. */
export function TopNav({ currentPage, onNavigate, themeSwitcher }: TopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--card) 80%, transparent)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
    >
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between gap-4">
        <button
          onClick={() => { onNavigate("home"); setMobileOpen(false); }}
          className="tracking-tight transition-opacity hover:opacity-70 flex-shrink-0"
          style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 500, color: "var(--foreground)" }}
        >
          Oyagaa–Oomo Network
        </button>

        <nav className="hidden md:flex items-center gap-6 flex-1 justify-end">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="flex-shrink-0 transition-colors"
              style={{
                fontSize: "0.8125rem",
                fontFamily: "var(--font-sans)",
                // §5: active = accent text + underline; inactive = ink-muted → ink on hover
                color: currentPage === page ? "var(--accent)" : "var(--ink-muted, var(--muted-foreground))",
                fontWeight: currentPage === page ? 500 : 400,
                letterSpacing: "0.01em",
                textDecoration: currentPage === page ? "underline var(--accent)" : "none",
                textUnderlineOffset: "3px",
              }}
            >
              {label}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-1 pl-3 border-l flex-shrink-0" style={{ borderColor: "var(--border)" }}>
            {themeSwitcher}
          </div>
        </nav>

        <button className="md:hidden p-1" style={{ color: "var(--muted-foreground)" }} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--card) 92%, transparent)", backdropFilter: "blur(12px)" }}>
          {navLinks.map(({ label, page }) => (
            <button key={page} onClick={() => { onNavigate(page); setMobileOpen(false); }} className="text-left" style={{ fontSize: "0.9375rem", color: currentPage === page ? "var(--accent)" : "var(--foreground)" }}>
              {label}
            </button>
          ))}
          <div className="pt-1 border-t" style={{ borderColor: "var(--border)" }}>{themeSwitcher}</div>
        </nav>
      )}
    </header>
  );
}
