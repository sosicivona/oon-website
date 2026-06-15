interface HeroProps {
  kicker?: string;
  headline: string;
  standfirst: string;
  ctaLabel: string;
  onCta: () => void;
  gradient?: string;
}

/** Full-width section hero with optional kicker, display-serif headline, standfirst, and a single CTA button; accepts an optional radial gradient wash behind the text. */
export function Hero({ kicker, headline, standfirst, ctaLabel, onCta, gradient }: HeroProps) {
  return (
    <section className="relative pt-16 pb-14 max-w-3xl overflow-hidden">
      {/* Gradient wash behind text */}
      {gradient && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-4rem -8rem",
            background: gradient,
            opacity: 0.18,
            pointerEvents: "none",
            borderRadius: "50%",
            filter: "blur(60px)",
            transition: "background 0.6s",
          }}
        />
      )}

      <div style={{ position: "relative" }}>
        {kicker && (
          <p
            className="uppercase tracking-widest mb-6"
            style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--accent)", letterSpacing: "0.14em" }}
          >
            {kicker}
          </p>
        )}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
            marginBottom: "1.5rem",
          }}
        >
          {headline}
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.7,
            maxWidth: "58ch",
            marginBottom: "2rem",
          }}
        >
          {standfirst}
        </p>
        <button
          onClick={onCta}
          className="inline-flex items-center gap-2 transition-all hover:opacity-85 active:scale-95"
          style={{
            padding: "0.7rem 1.5rem",
            background: "var(--accent-fill, var(--accent))",
            color: "var(--accent-on-fill, var(--accent-foreground))",
            fontSize: "0.875rem",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.03em",
            fontWeight: 500,
            borderRadius: "2px",
            boxShadow: "none",
          }}
        >
          {ctaLabel}
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}
