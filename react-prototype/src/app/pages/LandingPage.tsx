import { useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { THEMES } from "../components/ThemeSwitcher";
import bannerImg from "../../imports/OON_banner_V3.jpg";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources";

interface LandingPageProps {
  onNavigate: (page: Page) => void;
  heroGradient?: string;
  activeTheme?: string;
}

export function LandingPage({ onNavigate, activeTheme = "solstice" }: LandingPageProps) {
  const theme = THEMES.find(t => t.id === activeTheme) ?? THEMES[0];
  const p = theme.preview;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  }

  return (
    <div>
      {/* ── HERO (full viewport) ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{
          height: "100svh",
          minHeight: "580px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          paddingTop: "env(safe-area-inset-top, 0)",
        }}
      >
        {/* Background image — slow drift (both themes) */}
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

        {/* Theme-appropriate darkening overlay.
            Light mode is slightly less opaque so the image + gradients show through more. */}
        <div style={{
          position: "absolute", inset: 0,
          background: theme.isDark ? "rgba(10,12,19,0.58)" : "rgba(243,240,233,0.48)",
        }} />

        {/* Hero-local atmospheric depth — dark only.
            DARK: violet glow at bottom-left only. The orange blob that was at 78% (top-right)
            sat directly on the right planet globe and was removed — too much orange on the image.
            LIGHT: NO gradient here at all. The glass panel must show pure blurred image with zero
            colour injected through it. All colour on light comes from the border gradient + box-shadow
            outside the glass, not from anything showing through the panel interior. */}
        {theme.isDark && (
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            // Violet only — bottom-left depth, does not overlay the globe imagery
            background: "radial-gradient(ellipse at 12% 75%, rgba(68,40,168,0.14) 0%, transparent 50%)",
          }} />
        )}

        {/* Mouse-reactive glow — dark only; removed from light to keep glass clear */}
        {theme.isDark && (
        <div aria-hidden style={{
          position: "absolute", width: "35vw", height: "35vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${p.accent}0C 0%, transparent 70%)`,
          top: `${-10 + mousePos.y * 18}%`, right: `${-5 + (1 - mousePos.x) * 18}%`,
          pointerEvents: "none",
          transition: "top 1.2s ease, right 1.2s ease",
        }} />
        )}{/* end dark-only mouse glow */}

        {/* Glass hero panel */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 w-full flex flex-col items-center sm:items-start justify-center" style={{ flex: 1 }}>
          {/*
            Single div for both themes. Border is created via INSET box-shadow (not a wrapper gradient div).
            This means nothing coloured sits behind the glass, so backdrop-filter cannot pick it up.

            Dark:  inset amber edges (top+left strong, bottom+right faint) + outer amber glow
            Light: inset blue edges  (top+left strong, bottom+right faint lavender) + outer blue glow

            The gradient-border-wrapper technique was removed because:
            backdrop-filter blurs its parent element's background too,
            causing the blue wrapper gradient to appear as a tint inside the glass.
          */}
          <div style={{
            maxWidth: "36rem", width: "100%",
            background: "var(--glass-bg, rgba(12,14,21,0.72))",
            backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
            padding: "clamp(1.75rem, 4vw, 3rem)",
            borderRadius: "5px",
            boxShadow: theme.isDark
              // Dark: amber top+left edges, near-invisible bottom+right, outer amber+violet glow
              ? [
                  "inset 0 1px 0 rgba(232,112,32,0.65)",
                  "inset 1px 0 0 rgba(232,112,32,0.65)",
                  "inset 0 -1px 0 rgba(255,255,255,0.06)",
                  "inset -1px 0 0 rgba(255,255,255,0.06)",
                  "0 0 20px -4px rgba(232,112,32,0.28)",
                  "0 0 60px -16px rgba(232,112,32,0.18)",
                  "0 0 30px -10px rgba(68,40,168,0.12)",
                ].join(", ")
              // Light: blue top+left edges, faint lavender bottom+right, outer blue+lavender glow
              : [
                  "inset 0 1px 0 rgba(51,68,168,0.75)",
                  "inset 1px 0 0 rgba(51,68,168,0.75)",
                  "inset 0 -1px 0 rgba(185,174,220,0.14)",
                  "inset -1px 0 0 rgba(185,174,220,0.14)",
                  "0 0 18px -3px rgba(51,68,168,0.38)",
                  "0 0 60px -14px rgba(51,68,168,0.22)",
                  "0 0 32px -10px rgba(185,174,220,0.25)",
                ].join(", "),
          }}>
            {/* Eyebrow */}
            <p style={{
              fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "var(--accent)",
              marginBottom: "1rem",
            }}>
              Oyagaa–Oomo Network
            </p>

            {/* Headline */}
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.875rem, 5vw, 3.25rem)",
              fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
              color: "var(--ink, var(--foreground))",
              marginBottom: "1rem",
            }}>
              Begin with the shape of the dossier.
            </h1>

            {/* One placeholder line */}
            <p style={{
              fontSize: "0.9375rem", color: "var(--ink-muted, var(--muted-foreground))",
              lineHeight: 1.65, marginBottom: "2rem",
            }}>
              A structured reading layer over a large collection of primary-source material.
            </p>

            {/* ONE primary CTA */}
            <button
              onClick={() => onNavigate("orientation")}
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-80 active:scale-95"
              style={{
                padding: "0.7rem 1.5rem",
                background: "var(--accent-fill, var(--accent))",
                color: "var(--accent-on-fill, #fff)",
                fontSize: "0.875rem", fontWeight: 500,
                borderRadius: "2px", fontFamily: "var(--font-sans)",
                marginBottom: "1.25rem",
              }}
            >
              Start here <ArrowRight size={14} />
            </button>

            {/* Quiet secondary text links — Read · Timeline · Sources */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {([
                { label: "Read", page: "read" as Page },
                { label: "Timeline", page: "timeline" as Page },
                { label: "Sources", page: "sources" as Page },
              ]).map(({ label, page }, i) => (
                <span key={page} className="flex items-center gap-4">
                  {i > 0 && (
                    <span style={{ color: "var(--ink-muted, var(--muted-foreground))", opacity: 0.4, fontSize: "0.75rem" }}>·</span>
                  )}
                  <button
                    onClick={() => onNavigate(page)}
                    className="transition-opacity hover:opacity-80"
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--ink-muted, var(--muted-foreground))",
                      textDecoration: "underline var(--hairline, var(--border))",
                      textUnderlineOffset: "3px",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {label}
                  </button>
                </span>
              ))}
            </div>
          </div>{/* end glass panel */}
        </div>{/* end centering wrapper */}

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "4.5rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem",
          color: "rgba(255,255,255,0.50)", pointerEvents: "none",
        }}>
          <span style={{ fontSize: "0.5625rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Scroll
          </span>
          <ChevronDown size={18} style={{ animation: "bounce-down 1.8s ease-in-out infinite", strokeWidth: 1.5 }} />
        </div>

        {/* Stats bar — corpus quick facts */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "var(--glass-bg, rgba(0,0,0,0.30))",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid var(--glass-border, rgba(255,255,255,0.08))",
        }}>
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center flex-wrap gap-x-8 gap-y-1">
            {[
              { n: "380+", label: "source records" },
              { n: "1950–1993", label: "primary period" },
              { n: "14", label: "institutions" },
            ].map(({ n, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink, var(--foreground))" }}>{n}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--ink-muted, var(--muted-foreground))" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHORT MATERIAL PREVIEW ───────────────────────────────────────── */}
      {/* A deliberate taste — one excerpt, anchored with a hairline, tight spacing */}
      <div
        className="max-w-5xl mx-auto px-6 pt-10 pb-12"
        style={{ borderTop: "1px solid var(--hairline, var(--border))" }}
      >
        <div className="border-l-2 pl-6" style={{ borderColor: "var(--accent)", maxWidth: "52ch" }}>
          {/* ⚠ PLACEHOLDER — replace with a real representative source excerpt */}
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "1.0625rem", lineHeight: 1.7,
            color: "var(--ink-muted, var(--muted-foreground))",
            marginBottom: "0.625rem",
          }}>
            "[Placeholder excerpt from a source document — short, representative.]"
          </p>
          <p style={{ fontSize: "0.6875rem", color: "var(--ink-muted, var(--muted-foreground))", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Communication item · Source record · Verified
          </p>
        </div>
      </div>
    </div>
  );
}
