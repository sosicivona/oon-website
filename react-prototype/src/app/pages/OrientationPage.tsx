import { ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import bannerImg from "../../imports/OON_banner_V3.jpg";
import { THEMES } from "../components/ThemeSwitcher";

// Glass tile for "Choose a path" — reuses homepage hero glass recipe, tinted to cool accent (interactive).
// CRITICAL: backdrop-filter needs textured background — placed behind the "Choose a path" band below.
function PathTile({ page, nav, body, onNavigate, activeTheme }: { page: Page; nav: string; body: string; onNavigate: (p: Page) => void; activeTheme: string }) {
  const [hovered, setHovered] = useState(false);
  const theme = THEMES.find(t => t.id === activeTheme) ?? THEMES[0];
  
  return (
    <button
      onClick={() => onNavigate(page)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-left"
      style={{
        // Hero glass recipe — backdrop-filter produces glass effect against textured background
        background: "var(--glass-bg, rgba(12,14,21,0.72))",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        padding: "1.75rem 1.5rem",
        display: "flex", flexDirection: "column", gap: "0.875rem",
        borderRadius: "5px",
        minHeight: "11rem",
        // Glass edges + glow (cool accent for interactive, not warm amber)
        boxShadow: theme.isDark
          ? [
              "inset 0 1px 0 rgba(154,166,220,0.65)",
              "inset 1px 0 0 rgba(154,166,220,0.65)",
              "inset 0 -1px 0 rgba(255,255,255,0.06)",
              "inset -1px 0 0 rgba(255,255,255,0.06)",
              hovered ? "0 0 24px -4px rgba(154,166,220,0.35)" : "0 0 20px -4px rgba(154,166,220,0.22)",
              hovered ? "0 0 60px -12px rgba(154,166,220,0.22)" : "0 0 60px -16px rgba(154,166,220,0.14)",
            ].join(", ")
          : [
              "inset 0 1px 0 rgba(51,68,168,0.75)",
              "inset 1px 0 0 rgba(51,68,168,0.75)",
              "inset 0 -1px 0 rgba(185,174,220,0.14)",
              "inset -1px 0 0 rgba(185,174,220,0.14)",
              hovered ? "0 0 20px -3px rgba(51,68,168,0.45)" : "0 0 18px -3px rgba(51,68,168,0.32)",
              hovered ? "0 0 60px -10px rgba(51,68,168,0.28)" : "0 0 60px -14px rgba(51,68,168,0.18)",
            ].join(", "),
        transition: "box-shadow 0.18s ease",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 500, color: "var(--ink, var(--foreground))", lineHeight: 1.2 }}>
        {nav}
      </p>
      <p style={{ fontSize: "0.875rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.65, flex: 1 }}>
        {body}
      </p>
      <span style={{ fontSize: "0.875rem", color: "var(--accent)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "0.25rem" }}>
        {nav} <ArrowRight size={14} style={{ transition: "transform 0.15s", transform: hovered ? "translateX(4px)" : "none" }} />
      </span>
    </button>
  );
}

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources" | "faq" | "about" | "style";

interface OrientationPageProps {
  onNavigate: (page: Page) => void;
  activeTheme: string;
}

// ── A. Compact overview panels ─────────────────────────────────────────────────
const OVERVIEW = [
  {
    q: "What is the UMMO dossier?",
    a: "A large corpus of correspondence attributed to an extraterrestrial civilization, received mainly in Spain from the mid-1960s through the 1990s. The letters address scientific, philosophical, and social topics at length. The corpus is unusually consistent in terminology and structure. Its origin is disputed.",
  },
  {
    q: "What is OON?",
    a: "Oyagaa–Oomo Network is a structured reading layer over the corpus. OON does not host original documents, does not argue for any verdict on the material's origin, and does not represent any institutional position. It is a navigation and provenance interface.",
  },
  {
    q: "How should I read this material?",
    a: "Start with one thread, not the whole corpus. OON separates source text, translation, summary, analysis, and interpretation so you can follow the layers yourself. You do not need to resolve the case before you begin reading.",
  },
  {
    q: "Where do the sources live?",
    a: "Original documents are held in external archives and institutions, not on this site. OON links to holding institutions where access is available. Access varies — some collections are publicly accessible; others require a formal request. The Sources section lists all cited archives.",
  },
];

// ── C. First Questions ─────────────────────────────────────────────────────────
// These are the highest-friction questions readers arrive with immediately.
// Peña question (#3) must remain visible; tone is sober and non-defensive throughout.
const FIRST_QUESTIONS = [
  {
    q: "What is the UMMO dossier?",
    a: "A large corpus of letters, transcripts, and related documents attributed to an extraterrestrial source. The material spans several decades, multiple languages, and a wide range of topics. Scale, internal consistency, and disputed origin are the defining features.",
  },
  {
    q: "Why is it still studied?",
    a: "The correspondence is unusual in scale, consistency, and cross-linguistic spread. Researchers in linguistics, history of ideas, science studies, and documentary investigation continue to engage with it for different reasons. The question of origin has not been settled to the satisfaction of all parties.",
  },
  {
    q: "Wasn't this resolved by José Luis Jordán Peña?",
    a: "The Peña authorship claim is central to the history of the case and deserves careful source review. OON treats it as a major counterpoint to study, not something to hide or dismiss. The site separates source material, authorship questions, later commentary, and OON interpretation so readers can follow the layers and evaluate the claim directly.",
  },
  {
    q: "Is OON asking me to believe this?",
    a: "No. OON presents material and provenance. It does not argue a verdict on origin. The status labels — Verified, Under Review, Unverified — describe provenance confirmation, not authenticity claims. You read; you evaluate.",
  },
  {
    q: "Where do the sources live?",
    a: "Original documents are held in external archives. OON links to holding institutions. The Sources section lists all cited archives and their access status.",
  },
];

// ── E. Source layer labels ─────────────────────────────────────────────────────
const LAYERS = [
  { label: "Source text",      note: "The original document, in its original language." },
  { label: "Translation",      note: "A rendered version in another language. Always attributed." },
  { label: "Summary",          note: "A condensed description of the document's content." },
  { label: "Analysis",         note: "Scholarly or editorial commentary on the source." },
  { label: "Hypothesis",       note: "An interpretive claim about origin, authorship, or meaning." },
  { label: "OON interpretation", note: "Where OON editors have added contextual framing. Always marked." },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em",
      textTransform: "uppercase", color: "var(--ink-muted, var(--muted-foreground))",
      marginBottom: "1rem",
    }}>
      {children}
    </p>
  );
}

function CompactQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--hairline, var(--border))" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between text-left py-3.5 gap-4 transition-opacity hover:opacity-80"
      >
        <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink, var(--foreground))", lineHeight: 1.4 }}>
          {q}
        </span>
        <span style={{ color: "var(--accent)", fontSize: "0.75rem", flexShrink: 0, paddingTop: "0.15rem", fontWeight: 600 }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p style={{
          fontSize: "0.875rem", color: "var(--ink-muted, var(--muted-foreground))",
          lineHeight: 1.7, paddingBottom: "1rem", maxWidth: "62ch",
        }}>
          {a}
        </p>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function OrientationPage({ onNavigate, activeTheme }: OrientationPageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const theme = THEMES.find(t => t.id === activeTheme) ?? THEMES[0];
  
  return (
    <div style={{ position: "relative" }}>
      
      {/* ── SHALLOW HERO BAND (~40svh) — carries atmosphere from homepage ── */}
      <div style={{
        position: "relative",
        height: "40svh",
        minHeight: "280px",
        maxHeight: "420px",
        overflow: "hidden",
        marginBottom: "-8rem", // Pull content up to overlap and fade into band
      }}>
        {/* Background image — same slow drift as homepage */}
        <img
          src={bannerImg}
          alt=""
          aria-hidden
          onLoad={() => setImgLoaded(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.8s",
            animation: "hero-drift 20s ease-in-out alternate infinite",
          }}
        />
        
        {/* Heavy overlay for legibility (dark ~70% / light ~55%) */}
        <div style={{
          position: "absolute", inset: 0,
          background: theme.isDark ? "rgba(10,12,19,0.70)" : "rgba(243,240,233,0.55)",
        }} />
        
        {/* Atmospheric depth — faint warm+violet glow at top corners (echoes hero) */}
        {theme.isDark && (
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: [
              "radial-gradient(ellipse at 85% 15%, rgba(232,112,32,0.08) 0%, transparent 45%)",
              "radial-gradient(ellipse at 15% 10%, rgba(68,40,168,0.06) 0%, transparent 48%)",
            ].join(", "),
          }} />
        )}
        
        {/* Soft gradient fade to flat reading surface */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "10rem",
          background: theme.isDark
            ? "linear-gradient(to bottom, transparent 0%, rgba(21,23,31,0.5) 50%, rgba(21,23,31,1) 100%)"
            : "linear-gradient(to bottom, transparent 0%, rgba(251,250,246,0.5) 50%, rgba(251,250,246,1) 100%)",
        }} />
      </div>

      {/* ── CONTENT (overlaps band, fades into flat reading surface) ── */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-24" style={{ position: "relative", zIndex: 1 }}>

        {/* ── A. Hero / orientation statement ──────────────────────────────── */}
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem",
          }}>
            Start · Oyagaa–Oomo Network
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.875rem, 5vw, 2.75rem)",
            fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--ink, var(--foreground))",
            marginBottom: "1.25rem",
          }}>
            Start with orientation, not a verdict.
          </h1>
          <p style={{
            fontSize: "1rem", color: "var(--ink-muted, var(--muted-foreground))",
            lineHeight: 1.75, maxWidth: "54ch",
          }}>
            The UMMO dossier is large, multilingual, and disputed. OON helps you navigate the layers — source, translation, analysis, interpretation — without requiring you to resolve anything before you begin.
          </p>
        </div>

        {/* ── B. Orientation — DEMOTED to flat definition-list rows ─────────── */}
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionLabel>Orientation</SectionLabel>
          {/* Quiet, flat, ink-on-paper — no box fill, just hairline separators */}
          <div>
            {OVERVIEW.map(({ q, a }, i) => (
              <div
                key={q}
                style={{
                  paddingTop: i === 0 ? "0" : "1.125rem",
                  paddingBottom: "1.125rem",
                  borderBottom: i < OVERVIEW.length - 1 ? "1px solid var(--hairline, var(--border))" : "none",
                }}
              >
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink, var(--foreground))", marginBottom: "0.4rem", lineHeight: 1.35 }}>
                  {q}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.65, maxWidth: "62ch" }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── C. Choose a path — ELEVATED with glass treatment ────────────── */}
        {/* Background texture for glass to blur against */}
        <div style={{
          position: "relative",
          marginBottom: "3.5rem",
          // Faint textured background behind the glass tiles (subtle slice of hero atmosphere)
          background: theme.isDark
            ? "radial-gradient(ellipse at 50% 30%, rgba(68,40,168,0.04) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 50% 30%, rgba(185,174,220,0.06) 0%, transparent 65%)",
          padding: "2rem 0",
          margin: "0 -1.5rem 3.5rem -1.5rem",
        }}>
          <div className="max-w-3xl mx-auto px-6">
            <SectionLabel>Choose a path</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {([
                { page: "read" as Page,     nav: "Read",     body: "Browse source records by type, period, or topic. Expand any row to read an excerpt." },
                { page: "timeline" as Page, nav: "Timeline", body: "Follow the key events in sequence. Click any node to expand context and source links." },
                { page: "sources" as Page,  nav: "Sources",  body: "Index of holding institutions and reference collections cited in the corpus." },
              ]).map(path => (
                <PathTile key={path.page} page={path.page} nav={path.nav} body={path.body} onNavigate={onNavigate} activeTheme={activeTheme} />
              ))}
            </div>
          </div>
        </div>

        {/* ── D. First Questions ────────────────────────────────────────────── */}
        {/* Compact — not a full FAQ. Highest-friction questions only. */}
        {/* Peña question (#3) is present and not buried. */}
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionLabel>First questions</SectionLabel>
          <div style={{ borderTop: "1px solid var(--hairline, var(--border))" }}>
            {FIRST_QUESTIONS.map(fq => (
              <CompactQ key={fq.q} q={fq.q} a={fq.a} />
            ))}
          </div>
        </div>

        {/* ── E. Source layers ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionLabel>How OON separates the layers</SectionLabel>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.7, marginBottom: "1.25rem", maxWidth: "52ch" }}>
            OON distinguishes six layers in how it presents material. Each layer is visually marked so you always know what you are reading.
          </p>
          <div style={{ borderTop: "1px solid var(--hairline, var(--border))" }}>
            {LAYERS.map(({ label, note }, i) => (
              <div
                key={label}
                className="grid gap-4 py-3"
                style={{ gridTemplateColumns: "10rem 1fr", borderBottom: "1px solid var(--hairline, var(--border))" }}
              >
                <div className="flex items-center gap-2">
                  <span style={{
                    fontSize: "0.5625rem", fontWeight: 700, color: "var(--ink-muted, var(--muted-foreground))",
                    background: "var(--bg-elevated, var(--secondary))", padding: "0.1rem 0.35rem",
                    borderRadius: "2px", letterSpacing: "0.05em",
                    minWidth: "1.25rem", textAlign: "center",
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink, var(--foreground))" }}>
                    {label}
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.6 }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── F. FAQ teaser ────────────────────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid var(--hairline, var(--border))",
            paddingTop: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
            alignItems: "flex-start",
          }}
        >
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.65, maxWidth: "52ch" }}>
            Have questions about authorship, translations, later communications, or source status?
          </p>
          <button
            onClick={() => onNavigate("faq")}
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-75"
            style={{ fontSize: "0.8125rem", color: "var(--accent)", fontWeight: 500, textDecoration: "underline var(--hairline, var(--border))", textUnderlineOffset: "3px" }}
          >
            See the full FAQ <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}