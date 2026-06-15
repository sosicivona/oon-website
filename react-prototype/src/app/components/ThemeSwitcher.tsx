// OON Design System — token source of truth.
// Rule §0: Cool = interactive. Warm = atmosphere. Color in three places only:
//   hero image · status pills · single accent (slate-blue).
// Everything else is ink on paper.

// useState kept for potential future use; Palette/useRef/useEffect no longer needed

export interface ThemeTokens {
  id: string;
  name: string;
  description: string;
  isDark: boolean;
  preview: { bg: string; surface: string; ink: string; muted: string; accent: string };
  vars: Record<string, string>;
  bgGradient: string;        // two faint corner glows only
  heroGradient: string;      // overlay on hero image
  heroImage: string;         // do not change — banner is locked
}

// ── Shared token builder ──────────────────────────────────────────────────────

function dark(): Record<string, string> {
  return {
    // Surfaces & text
    "--bg-base":     "#0C0E15",
    "--bg-surface":  "#15171F",
    "--bg-elevated": "#1C1E27",
    "--ink":         "#ECEAE3",
    "--ink-muted":   "#9A9AA3",
    "--hairline":    "rgba(255,255,255,0.10)",

    // Existing token aliases (so Tailwind bg-background etc. still resolve)
    "--background":        "#0C0E15",
    "--foreground":        "#ECEAE3",
    "--card":              "#15171F",
    "--card-foreground":   "#ECEAE3",
    "--popover":           "#15171F",
    "--popover-foreground":"#ECEAE3",
    "--primary":           "#5566A8",
    "--primary-foreground":"#ECEAE3",
    "--secondary":         "#1C1E27",
    "--secondary-foreground":"#ECEAE3",
    "--muted":             "#1C1E27",
    "--muted-foreground":  "#9A9AA3",
    "--border":            "rgba(255,255,255,0.10)",
    "--input":             "rgba(255,255,255,0.06)",
    "--input-background":  "#1C1E27",
    "--switch-background": "#3A3C48",
    "--destructive":       "#CC3030",
    "--destructive-foreground": "#ECEAE3",

    // Interaction accent — cool slate-blue (§1)
    "--accent":          "#9AA6DC",   // text / links / active nav
    "--accent-fill":     "#5566A8",   // button fills
    "--accent-on-fill":  "#ECEAE3",   // text on filled button
    "--accent-tint":     "rgba(122,140,201,0.08)",
    "--accent-foreground":"#ECEAE3",
    "--ring":            "rgba(122,140,201,0.50)",
    "--accent-ring":     "rgba(122,140,201,0.50)",

    // Glass
    "--glass-bg":     "rgba(12,14,21,0.72)",
    "--glass-border": "rgba(255,255,255,0.10)",

    // Atmosphere — warm glow tokens (§3), used only in bgGradient
    "--glow-warm":   "#E87020",   // top-right corner, ≤10% opacity
    "--glow-violet": "#4428A8",   // bottom-left corner, 6-8% opacity
    "--glow1":       "#E87020",
    "--glow2":       "#4428A8",

    // Status colors (§2) — semantic pills only, never on controls
    "--s-green-text":   "#6FD3A0",
    "--s-green-bg":     "rgba(63,166,110,0.14)",
    "--s-green-border": "rgba(63,166,110,0.40)",
    "--s-amber-text":   "#E0A45E",
    "--s-amber-bg":     "rgba(200,123,42,0.12)",
    "--s-amber-border": "rgba(200,123,42,0.40)",
    "--s-neutral-text": "#9A9AA3",
    "--s-neutral-bg":   "rgba(255,255,255,0.05)",
    "--s-neutral-border":"rgba(255,255,255,0.18)",

    // Legacy neon vars (component fallbacks)
    "--neon-amber": "#E0A45E",
    "--neon-green": "#6FD3A0",
    "--neon-red":   "#D04040",
    "--neon-cyan":  "#9AA6DC",
    "--aurora-orange": "#E87020",
    "--aurora-pink":   "#C03878",
    "--aurora-violet": "#4428A8",
    "--aurora-green":  "#28A870",
    "--aurora-red":    "#D04040",
    "--aurora-glow":   "0 0 24px -8px rgba(85,102,168,0.50)",
  };
}

function light(): Record<string, string> {
  return {
    "--bg-base":     "#F3F0E9",
    "--bg-surface":  "#FBFAF6",
    "--bg-elevated": "#FBFAF6",  // warm off-white, not pure white — prevents cold slab on warm paper
    "--ink":         "#1E1B16",
    "--ink-muted":   "#6B6760",
    "--hairline":    "#E2DDD2",

    "--background":        "#F3F0E9",
    "--foreground":        "#1E1B16",
    "--card":              "#FBFAF6",
    "--card-foreground":   "#1E1B16",
    "--popover":           "#FBFAF6",
    "--popover-foreground":"#1E1B16",
    "--primary":           "#3344A8",   // richer, same hue, less pastel
    "--primary-foreground":"#FBFAF6",
    "--secondary":         "#F8F5EF",  // warm off-white, not pure white — prevents cold slab on warm paper
    "--secondary-foreground":"#1E1B16",
    "--muted":             "#F8F5EF",  // warm off-white, not pure white
    "--muted-foreground":  "#6B6760",
    "--border":            "#E2DDD2",
    "--input":             "transparent",
    "--input-background":  "#F3F0E9",
    "--switch-background": "#B8B0A0",
    "--destructive":       "#B83030",
    "--destructive-foreground": "#FBFAF6",

    "--accent":          "#3344A8",   // richer blue — same hue, lower pastel
    "--accent-fill":     "#3344A8",
    "--accent-on-fill":  "#FBFAF6",
    "--accent-tint":     "rgba(51,68,168,0.07)",
    "--accent-foreground":"#FBFAF6",
    "--ring":            "rgba(51,68,168,0.40)",
    "--accent-ring":     "rgba(51,68,168,0.40)",

    // Near-neutral white glass — image blurs through cleanly without a warm-cream tint.
    // The tint is white, not cream, so no gradient colour appears inside the box.
    "--glass-bg":     "rgba(255,255,255,0.28)",
    "--glass-border": "rgba(51,68,168,0.14)",

    "--glow-warm":   "#C77A2E",
    "--glow-violet": "#B9AEDC",
    "--glow1":       "#C77A2E",
    "--glow2":       "#B9AEDC",

    "--s-green-text":   "#2E7D52",
    "--s-green-bg":     "rgba(46,125,82,0.10)",
    "--s-green-border": "rgba(46,125,82,0.35)",
    "--s-amber-text":   "#92611A",
    "--s-amber-bg":     "rgba(146,97,26,0.10)",
    "--s-amber-border": "rgba(146,97,26,0.35)",
    "--s-neutral-text": "#6B6760",
    "--s-neutral-bg":   "rgba(0,0,0,0.04)",
    "--s-neutral-border":"#E2DDD2",

    "--neon-amber": "#92611A",
    "--neon-green": "#2E7D52",
    "--neon-red":   "#8A2828",
    "--neon-cyan":  "#3344A8",
    "--aurora-orange": "#C77A2E",
    "--aurora-pink":   "#902858",
    "--aurora-violet": "#3820A0",
    "--aurora-green":  "#1E6A40",
    "--aurora-red":    "#8A2828",
    "--aurora-glow":   "0 0 24px -8px rgba(51,68,168,0.40)",
  };
}

// ── Themes ────────────────────────────────────────────────────────────────────

export const THEMES: ThemeTokens[] = [
  {
    id: "meridian",
    name: "Meridian",
    description: "Warm off-white · slate-blue accent",
    isDark: false,
    preview: { bg: "#F3F0E9", surface: "#FBFAF6", ink: "#1E1B16", muted: "#6B6760", accent: "#3344A8" },
    vars: light(),
    // §3: two faint corner glows only — NO full-page diagonal wash
    bgGradient: "radial-gradient(ellipse at 82% 6%, rgba(160,96,0,0.06) 0%, transparent 55%), radial-gradient(ellipse at 10% 92%, rgba(56,32,160,0.04) 0%, transparent 55%)",
    heroGradient: "linear-gradient(to right, rgba(243,240,233,0.88) 0%, rgba(243,240,233,0.60) 52%, transparent 100%)",
    heroImage: "/src/imports/OON_banner_V3.jpg",
  },
  {
    id: "solstice",
    name: "Solstice",
    description: "Deep dark · slate-blue accent",
    isDark: true,
    preview: { bg: "#0C0E15", surface: "#15171F", ink: "#ECEAE3", muted: "#9A9AA3", accent: "#9AA6DC" },
    vars: dark(),
    // Inner-page bgGradient: barely perceptible — just a whisper of warmth.
    // The homepage hero amplifies this locally; other pages keep it almost invisible.
    bgGradient: "radial-gradient(ellipse at 82% 6%, rgba(232,112,32,0.07) 0%, transparent 55%), radial-gradient(ellipse at 10% 92%, rgba(68,40,168,0.05) 0%, transparent 55%)",
    heroGradient: "linear-gradient(to right, rgba(12,14,21,0.85) 0%, rgba(12,14,21,0.55) 52%, transparent 100%)",
    heroImage: "/src/imports/OON_banner_V3.jpg",
  },
];

/** Imperatively applies all CSS custom property vars from `theme.vars` to `document.documentElement`, plus `--bg-gradient`, `--aurora-wash`, and `--hero-gradient`. */
export function applyTheme(theme: ThemeTokens) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.style.setProperty("--bg-gradient", theme.bgGradient);
  root.style.setProperty("--aurora-wash", theme.bgGradient);
  root.style.setProperty("--hero-gradient", theme.heroGradient);
}

// ── Mini preview ──────────────────────────────────────────────────────────────

function MiniPreview({ theme, active }: { theme: ThemeTokens; active: boolean }) {
  const p = theme.preview;
  return (
    <div style={{ background: p.bg, borderRadius: "4px", overflow: "hidden", height: "5rem", position: "relative", border: active ? `2px solid ${p.accent}` : `2px solid ${p.surface}`, boxShadow: active ? `0 0 12px ${p.accent}44` : "none", transition: "border-color 0.15s, box-shadow 0.2s" }}>
      <div style={{ height: "2px", background: `linear-gradient(90deg, ${p.accent}, ${p.accent}44)` }} />
      <div style={{ position: "absolute", top: 5, right: 5, width: 22, height: 22, borderRadius: "50%", background: `radial-gradient(circle at 40% 40%, rgba(232,112,32,0.35) 0%, transparent 70%)` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 8px", borderBottom: `1px solid ${p.ink}14` }}>
        <div style={{ width: 26, height: 3, background: p.ink, borderRadius: 1, opacity: 0.7 }} />
        <div style={{ flex: 1 }} />
        {[0, 1, 2].map(i => <div key={i} style={{ width: 9, height: 3, background: p.muted, borderRadius: 1, opacity: 0.45 }} />)}
      </div>
      <div style={{ padding: "5px 8px" }}>
        <div style={{ width: "60%", height: 4, background: p.ink, borderRadius: 1, marginBottom: 3, opacity: 0.8 }} />
        <div style={{ width: "80%", height: 3, background: p.muted, borderRadius: 1, opacity: 0.4 }} />
      </div>
    </div>
  );
}

// ── Theme toggle pill ─────────────────────────────────────────────────────────
// Simple two-state pill: Dark ↔ Light. One tap to switch, no dropdown needed.

interface ThemeSwitcherProps {
  activeTheme: string;
  onThemeChange: (id: string) => void;
}

/** Toggle pill that switches between Solstice (dark) and Meridian (light) themes by calling `applyTheme` and notifying the parent via `onThemeChange`. */
export function ThemeSwitcher({ activeTheme, onThemeChange }: ThemeSwitcherProps) {
  function toggle() {
    const next = activeTheme === "solstice" ? "meridian" : "solstice";
    const t = THEMES.find(t => t.id === next)!;
    applyTheme(t);
    onThemeChange(next);
  }

  const isDark = activeTheme === "solstice";

  // §4: compact, non-dominant toggle — small icon + short text, no sliding pill
  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="hover:opacity-60 transition-opacity"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.2rem 0.5rem",
        border: "none",
        borderRadius: "3px",
        background: "transparent",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "0.6875rem",
        fontWeight: 500,
        color: "var(--ink-muted, var(--muted-foreground))",
        userSelect: "none",
        letterSpacing: "0.02em",
      }}
    >
      <span style={{ fontSize: "0.75rem", lineHeight: 1 }}>{isDark ? "☀" : "◑"}</span>
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}