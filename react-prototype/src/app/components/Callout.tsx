interface CalloutProps {
  variant?: "note" | "caveat" | "boundary";
  label?: string;
  children: React.ReactNode;
  className?: string;
}

const CALLOUT_CONFIG = {
  note: {
    label: "Context note",
    borderColor: "rgba(43,74,123,0.3)",
    background: "rgba(43,74,123,0.05)",
    labelColor: "#2B4A7B",
  },
  caveat: {
    label: "Caveat",
    borderColor: "rgba(123,106,40,0.3)",
    background: "rgba(123,106,40,0.05)",
    labelColor: "#7B6A28",
  },
  boundary: {
    label: "Interpretation boundary",
    borderColor: "rgba(184,64,64,0.2)",
    background: "rgba(184,64,64,0.04)",
    labelColor: "#9B3030",
  },
};

/** Left-bordered callout box in three semantic variants — `note` (blue), `caveat` (amber), `boundary` (red) — with an auto-labelled header and slotted child content. */
export function Callout({ variant = "note", label, children, className }: CalloutProps) {
  const config = CALLOUT_CONFIG[variant];
  return (
    <div
      style={{
        borderLeft: `3px solid ${config.borderColor}`,
        background: config.background,
        padding: "0.875rem 1.125rem",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <p
        className="mb-1.5 uppercase tracking-widest"
        style={{
          fontSize: "0.625rem",
          fontWeight: 600,
          color: config.labelColor,
          letterSpacing: "0.1em",
        }}
      >
        {label ?? config.label}
      </p>
      <div style={{ fontSize: "0.875rem", color: "var(--foreground)", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}
