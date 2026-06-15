// §2 + §6: Status is the ONLY place semantic color appears on rows.
// Colors come from CSS vars set per-theme in ThemeSwitcher.
// "Translated" is demoted to neutral (§6: drop the stray purple pill).
// No hover on status pills — they are labels, not controls.

type StatusVariant = "verified" | "under-review" | "unverified" | "translated" | "original" | "partial";

const STATUS_CONFIG: Record<StatusVariant, {
  label: string;
  symbol: string;
  textVar: string;
  bgVar: string;
  borderVar: string;
}> = {
  "verified": {
    label: "Verified",
    symbol: "✓",
    textVar:   "var(--s-green-text)",
    bgVar:     "var(--s-green-bg)",
    borderVar: "var(--s-green-border)",
  },
  "under-review": {
    label: "Under review",
    symbol: "◐",
    textVar:   "var(--s-amber-text)",
    bgVar:     "var(--s-amber-bg)",
    borderVar: "var(--s-amber-border)",
  },
  "partial": {
    label: "Partial",
    symbol: "◑",
    textVar:   "var(--s-amber-text)",
    bgVar:     "var(--s-amber-bg)",
    borderVar: "var(--s-amber-border)",
  },
  "unverified": {
    label: "Unverified",
    symbol: "○",
    textVar:   "var(--s-neutral-text)",
    bgVar:     "var(--s-neutral-bg)",
    borderVar: "var(--s-neutral-border)",
  },
  // §6: Translated demoted to neutral — no purple stray color
  "translated": {
    label: "Translated",
    symbol: "↗",
    textVar:   "var(--s-neutral-text)",
    bgVar:     "var(--s-neutral-bg)",
    borderVar: "var(--s-neutral-border)",
  },
  "original": {
    label: "Original",
    symbol: "—",
    textVar:   "var(--s-neutral-text)",
    bgVar:     "var(--s-neutral-bg)",
    borderVar: "var(--s-neutral-border)",
  },
};

interface StatusBadgeProps {
  variant: StatusVariant;
  short?: boolean;
}

export function StatusBadge({ variant, short = false }: StatusBadgeProps) {
  const c = STATUS_CONFIG[variant];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: short ? "0.15rem 0.5rem" : "0.2rem 0.625rem",
        fontSize: "0.6875rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        fontFamily: "var(--font-sans)",
        color: c.textVar,
        background: c.bgVar,
        border: `1px solid ${c.borderVar}`,
        borderRadius: "9999px",
        whiteSpace: "nowrap",
        // No cursor, no hover — this is a label (§6)
        userSelect: "none",
      }}
    >
      <span aria-hidden style={{ fontSize: "0.6rem" }}>{c.symbol}</span>
      {short ? c.label.split(" ")[0] : c.label}
    </span>
  );
}
