import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface NavTileProps {
  title: string;
  description: string;
  onClick: () => void;
}

/** Navigation tile — hover is accent-tint bg only (like LinkRow). Box character from inset edges (like hero card). */
export function NavTile({ title, description, onClick }: NavTileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left"
      style={{
        padding: "1.25rem 1.375rem",
        // Hover: accent-tint bg ONLY — same as LinkRow (Sources)
        background: hovered ? "var(--accent-tint, rgba(51,68,168,0.05))" : "var(--bg-surface, var(--card))",
        display: "flex", flexDirection: "column", minHeight: "6.5rem",
        // Box character: hero-card inset edges (top+left) — NOT a border
        boxShadow: [
          "inset 0 1px 0 color-mix(in srgb, var(--accent) 28%, transparent)",
          "inset 1px 0 0 color-mix(in srgb, var(--accent) 28%, transparent)",
        ].join(", "),
        transition: "background 0.12s",
      }}
    >
      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", fontWeight: 500, color: "var(--ink, var(--foreground))", lineHeight: 1.3, marginBottom: "0.4rem" }}>
        {title}
      </p>
      <p className="flex-1" style={{ fontSize: "0.8125rem", color: "var(--ink-muted, var(--muted-foreground))", lineHeight: 1.6 }}>
        {description}
      </p>
      <div className="flex justify-end mt-3">
        <ArrowRight size={14} style={{
          color: hovered ? "var(--accent)" : "var(--muted-foreground)",
          transition: "color 0.12s, transform 0.15s",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
        }} />
      </div>
    </button>
  );
}