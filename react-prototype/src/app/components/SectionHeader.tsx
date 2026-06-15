interface SectionHeaderProps {
  kicker?: string;
  headline: string;
  standfirst?: string;
  center?: boolean;
}

/** Section heading block with optional uppercase kicker, display-serif `<h2>` headline, and optional standfirst; supports centered layout via `center` prop. */
export function SectionHeader({ kicker, headline, standfirst, center = false }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""}`}>
      {kicker && (
        <p
          className="uppercase tracking-widest mb-3"
          style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--accent)", letterSpacing: "0.12em" }}
        >
          {kicker}
        </p>
      )}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 400,
          lineHeight: 1.25,
          color: "var(--foreground)",
          letterSpacing: "-0.01em",
        }}
      >
        {headline}
      </h2>
      {standfirst && (
        <p
          className="mt-3"
          style={{
            fontSize: "0.9375rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.65,
            maxWidth: center ? "52ch" : "60ch",
            margin: center ? "0.75rem auto 0" : "0.75rem 0 0",
          }}
        >
          {standfirst}
        </p>
      )}
    </div>
  );
}
