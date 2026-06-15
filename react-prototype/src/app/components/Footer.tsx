// §8: Style Guide removed from public footer — it is a dev tool only.
// FAQ and About added as support links.
// Nav labels match top nav exactly: Start · Read · Timeline · Sources

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources" | "faq" | "about" | "style";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

/** Site footer with brand description, nav links (matching top nav), and support links (FAQ, About). Style guide excluded from public navigation. */
export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: "var(--hairline, var(--border))", background: "color-mix(in srgb, var(--card) 88%, transparent)", backdropFilter: "blur(8px)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 500, color: "var(--ink, var(--foreground))" }}>
            Oyagaa–Oomo Network
          </p>
          <p style={{ fontSize: "0.8125rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.7, maxWidth: "36ch" }}>
            A structured reading layer over the UMMO corpus. Source-visible, layer-aware, non-positional.
          </p>
        </div>

        {/* Nav + support links */}
        <div className="flex flex-col gap-6">
          {/* Primary nav — matches top nav exactly */}
          <div>
            <p className="mb-2.5 uppercase tracking-widest" style={{ fontSize: "0.5625rem", fontWeight: 700, color: "var(--ink-muted, var(--muted-foreground))", letterSpacing: "0.12em" }}>
              Navigate
            </p>
            <ul className="flex flex-col gap-1.5">
              {([
                { label: "Start",     page: "orientation" as Page },
                { label: "Read",      page: "read"        as Page },
                { label: "Timeline",  page: "timeline"    as Page },
                { label: "Sources",   page: "sources"     as Page },
              ]).map(({ label, page }) => (
                <li key={page}>
                  <button onClick={() => onNavigate(page)} className="transition-opacity hover:opacity-70 text-left" style={{ fontSize: "0.8125rem", color: "var(--ink, var(--foreground))" }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <p className="mb-2.5 uppercase tracking-widest" style={{ fontSize: "0.5625rem", fontWeight: 700, color: "var(--ink-muted, var(--muted-foreground))", letterSpacing: "0.12em" }}>
              About
            </p>
            <ul className="flex flex-col gap-1.5">
              {([
                { label: "FAQ",       page: "faq"   as Page },
                { label: "About OON", page: "about" as Page },
              ]).map(({ label, page }) => (
                <li key={page}>
                  <button onClick={() => onNavigate(page)} className="transition-opacity hover:opacity-70 text-left" style={{ fontSize: "0.8125rem", color: "var(--ink, var(--foreground))" }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "var(--hairline, var(--border))" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <p style={{ fontSize: "0.75rem", color: "var(--ink-muted, var(--muted-foreground))" }}>
            All source material belongs to its original archives. Provenance is always cited.
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--ink-muted, var(--muted-foreground))" }}>OON · 2024</p>
        </div>
      </div>
    </footer>
  );
}
