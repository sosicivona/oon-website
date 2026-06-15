// ⚠ DEV TOOL — This page is a design proof sheet, not a product page.
// Remove from production: gate it behind an env var or remove the route from App.tsx before release.
// Accessible via "Style guide" link in the Footer.
import bannerImg from "../../imports/OON_banner_V3.jpg";
import { StatusBadge } from "../components/StatusBadge";
import { TypeChip } from "../components/TypeChip";
import { AudioPlayer } from "../components/AudioPlayer";

// ── Token data — matches theme.css exactly ────────────────────────────────────
const TOKENS = [
  { name: "--aurora-space",  dark: "#060608", light: "#18140C", role: "Deep space / near-black bg" },
  { name: "--aurora-amber",  dark: "#D87808", light: "#9A5800", role: "City-light warm glow" },
  { name: "--aurora-teal",   dark: "#1A7080", light: "#1A5868", role: "Deep ocean blue-green" },
  { name: "--aurora-violet", dark: "#887098", light: "#504080", role: "Atmospheric rim / violet" },
  { name: "--aurora-sand",   dark: "#C8A060", light: "#8A6A30", role: "Continental ochre / land" },
  { name: "--aurora-green",  dark: "#28A870", light: "#1E6A40", role: "Verified status" },
  { name: "--aurora-red",    dark: "#D04040", light: "#8A2828", role: "Unverified status" },
];

const AURORA_WASH_DARK = `
  radial-gradient(ellipse at 18% 30%, rgba(216,120,8,0.22) 0%, transparent 50%),
  radial-gradient(ellipse at 78% 62%, rgba(26,112,128,0.18) 0%, transparent 48%),
  radial-gradient(ellipse at 52% 48%, rgba(136,112,152,0.11) 0%, transparent 44%)
`.trim();

const AURORA_WASH_LIGHT = `
  radial-gradient(ellipse at 18% 30%, rgba(154,88,0,0.11) 0%, transparent 50%),
  radial-gradient(ellipse at 78% 62%, rgba(26,88,104,0.09) 0%, transparent 48%),
  radial-gradient(ellipse at 52% 48%, rgba(80,64,128,0.06) 0%, transparent 44%)
`.trim();

const STATUS_VARIANTS = ["verified", "under-review", "partial", "unverified", "translated", "original"] as const;
const TYPE_LABELS = ["Letter", "Transcript", "Interview", "Report", "Internal note", "Commentary", "Legal filing", "Online account"];

// ── Section components ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.75rem" }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "var(--border)", margin: "1.5rem 0" }} />;
}

function ThemeColumn({ isDark }: { isDark: boolean }) {
  const bg   = isDark ? "#060608" : "#EDEAE3";
  const card = isDark ? "#12100A" : "#F5F2EB";
  const text = isDark ? "#F5E0A8" : "#18150E";
  const muted = isDark ? "#8A6A3A" : "#7A7060";
  const border = isDark ? "rgba(245,224,168,0.10)" : "rgba(24,21,14,0.10)";
  const accent = isDark ? "#D87808" : "#9A5800";
  const wash  = isDark ? AURORA_WASH_DARK : AURORA_WASH_LIGHT;
  const glowAmbient = isDark
    ? "0 0 28px -6px rgba(216,120,8,0.55), 0 0 60px -20px rgba(136,112,152,0.30)"
    : "0 0 28px -6px rgba(154,88,0,0.42), 0 0 60px -20px rgba(80,64,128,0.22)";

  return (
    <div style={{ background: bg, color: text, padding: "1.5rem", flex: 1, minWidth: 0, fontFamily: "var(--font-sans)" }}>

      {/* Theme label */}
      <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: "1rem" }}>
        {isDark ? "Solstice · Dark" : "Meridian · Light"}
      </p>

      {/* Banner + swatches side by side */}
      <SectionLabel>A. Banner source + extracted palette</SectionLabel>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
        <img src={bannerImg} alt="OON banner" style={{ width: "10rem", height: "5rem", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", alignContent: "flex-start" }}>
          {TOKENS.map(t => (
            <div key={t.name} title={`${t.name}: ${isDark ? t.dark : t.light}`} style={{ width: "2rem", height: "2rem", borderRadius: "2px", background: isDark ? t.dark : t.light, border: `1px solid ${border}`, position: "relative", cursor: "default" }} />
          ))}
        </div>
      </div>

      {/* Named token list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "1rem" }}>
        {TOKENS.map(t => (
          <div key={t.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.6875rem" }}>
            <div style={{ width: "1rem", height: "1rem", borderRadius: "2px", background: isDark ? t.dark : t.light, border: `1px solid ${border}`, flexShrink: 0 }} />
            <code style={{ color: accent, fontSize: "0.625rem", fontFamily: "monospace" }}>{t.name}</code>
            <span style={{ color: muted }}>{isDark ? t.dark : t.light}</span>
            <span style={{ color: muted, opacity: 0.6 }}>· {t.role}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Aurora wash preview */}
      <SectionLabel>B. Aurora gradient wash</SectionLabel>
      <div style={{ height: "5rem", borderRadius: "2px", background: bg, backgroundImage: wash, border: `1px solid ${border}`, marginBottom: "0.5rem", position: "relative" }}>
        <span style={{ position: "absolute", bottom: "0.5rem", left: "0.75rem", fontSize: "0.625rem", color: muted }}>amber ← · → teal · violet blend center</span>
      </div>

      <Divider />

      {/* Aurora glow */}
      <SectionLabel>C. Aurora glow (applied to accent buttons + nav tiles on hover)</SectionLabel>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.5rem" }}>
        <button style={{ padding: "0.5rem 1.25rem", background: accent, color: isDark ? "#060608" : "#FAFAF5", fontSize: "0.8125rem", fontWeight: 600, borderRadius: "2px", border: "none", cursor: "default", boxShadow: glowAmbient }}>
          Enter the archive →
        </button>
        <span style={{ fontSize: "0.75rem", color: muted }}>← soft amber + violet bloom</span>
      </div>

      <Divider />

      {/* Status pills */}
      <SectionLabel>D. Status pills — semantic color only, never type-tag pills</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
        {STATUS_VARIANTS.map(v => (
          <StatusBadge key={v} variant={v} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
        {STATUS_VARIANTS.map(v => (
          <StatusBadge key={v + "-short"} variant={v} short />
        ))}
      </div>

      <Divider />

      {/* Type chips — neutral */}
      <SectionLabel>E. Type-tag pills — neutral, icon differentiates, no color competition</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
        {TYPE_LABELS.map(l => <TypeChip key={l} label={l} />)}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {["Letter", "Report", "Interview"].map(l => <TypeChip key={l + "-sel"} label={l} selectable selected />)}
        <span style={{ fontSize: "0.75rem", color: muted, alignSelf: "center" }}>← selected state</span>
      </div>

      <Divider />

      {/* Buttons */}
      <SectionLabel>F. Button states</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
        <button style={{ padding: "0.55rem 1.25rem", background: accent, color: isDark ? "#060608" : "#FAFAF5", fontSize: "0.8125rem", fontWeight: 600, borderRadius: "2px", border: "none", cursor: "default" }}>Primary</button>
        <button style={{ padding: "0.55rem 1.25rem", background: "transparent", color: text, fontSize: "0.8125rem", fontWeight: 400, borderRadius: "2px", border: `1px solid ${border}`, cursor: "default" }}>Secondary</button>
        <button style={{ padding: "0.55rem 1.25rem", background: "transparent", color: accent, fontSize: "0.8125rem", fontWeight: 500, borderRadius: "2px", border: `1px solid ${accent}`, cursor: "default" }}>Outline accent</button>
        <button style={{ padding: "0.55rem 1.25rem", background: "transparent", color: muted, fontSize: "0.8125rem", fontWeight: 400, border: "none", cursor: "default" }}>Ghost</button>
      </div>

      <Divider />

      {/* Audio player */}
      <SectionLabel>G. Audio player (always aurora-amber, human-communication group)</SectionLabel>
      <div style={{ maxWidth: "20rem" }}>
        <AudioPlayer title="Sample — recorded interview, 1981" duration="4:22" type="interview" />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function StyleReferencePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-20">
      <div className="mb-6">
        <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.25rem" }}>
          OON Design System · Style Reference
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 400, color: "var(--foreground)", marginBottom: "0.5rem" }}>
          Aurora palette proof sheet
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", maxWidth: "60ch" }}>
          All color tokens extracted from <strong style={{ color: "var(--foreground)" }}>OON_banner_V3.jpg</strong>.
          Dark and light share identical token names — only the hex values differ.
          The aurora wash gradient is applied as <code style={{ fontSize: "0.8em" }}>body &#123; background-image: var(--aurora-wash) &#125;</code> across all pages.
        </p>
      </div>

      {/* Pages that use aurora wash */}
      <div className="mb-6 border p-4" style={{ borderColor: "var(--border)", background: "var(--card)", fontSize: "0.8125rem" }}>
        <p style={{ fontWeight: 500, color: "var(--foreground)", marginBottom: "0.5rem" }}>D. Pages using aurora wash (confirmed)</p>
        <ul style={{ color: "var(--muted-foreground)", lineHeight: 2 }}>
          <li>✓ <strong>Home</strong> — banner hero image + aurora wash overlay + animated glow blobs</li>
          <li>✓ <strong>Start (Orientation)</strong> — aurora wash via body background-image, fixed</li>
          <li>✓ <strong>Read (Browse)</strong> — aurora wash via body background-image, fixed</li>
          <li>✓ <strong>Timeline</strong> — aurora wash via body background-image, fixed</li>
          <li>✓ <strong>Sources</strong> — aurora wash via body background-image, fixed</li>
          <li>✓ <strong>Document reader (Item detail)</strong> — aurora wash via body background-image, fixed</li>
          <li>✓ Both themes use the <strong>same token names</strong>: <code>--aurora-amber</code>, <code>--aurora-teal</code>, <code>--aurora-violet</code>, etc. Only hex values differ.</li>
        </ul>
      </div>

      {/* Side-by-side dark / light */}
      <div style={{ display: "flex", gap: 0, border: "1px solid var(--border)" }}>
        <ThemeColumn isDark={true} />
        <div style={{ width: "1px", background: "var(--border)", flexShrink: 0 }} />
        <ThemeColumn isDark={false} />
      </div>
    </div>
  );
}
