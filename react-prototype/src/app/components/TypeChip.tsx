// COLOR RULE: type chips are NEUTRAL — no color.
// The icon (Lucide) identifies the document type visually.
// Color encodes meaning only in StatusBadge (green/amber/red/violet).
// Keeping type chips neutral eliminates the "Christmas tree" effect.

import { Mail, FileText, Mic, FileEdit, Globe, MessageSquare, Scale, Mic2 } from "lucide-react";
import type { ReactNode } from "react";

const TYPE_ICON: Record<string, ReactNode> = {
  "Letter":         <Mail size={9} />,
  "Transcript":     <Mic size={9} />,
  "Interview":      <Mic2 size={9} />,
  "Report":         <FileText size={9} />,
  "Internal note":  <FileEdit size={9} />,
  "Commentary":     <MessageSquare size={9} />,
  "Legal filing":   <Scale size={9} />,
  "Online account": <Globe size={9} />,
};

interface TypeChipProps {
  label: string;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
}

export function TypeChip({ label, selectable = false, selected = false, onToggle }: TypeChipProps) {
  const icon = TYPE_ICON[label];

  // §6: selected filter pill = accent border + accent text; default = neutral outline
  const style: React.CSSProperties = selected ? {
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.2rem 0.55rem",
    fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.02em",
    fontFamily: "var(--font-sans)", borderRadius: "9999px",
    border: "1px solid var(--accent)",
    background: "var(--accent-tint, transparent)",
    color: "var(--accent)",
    cursor: "pointer", transition: "all 0.12s", userSelect: "none", whiteSpace: "nowrap",
  } : {
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.2rem 0.55rem",
    fontSize: "0.6875rem", fontWeight: 400, letterSpacing: "0.02em",
    fontFamily: "var(--font-sans)", borderRadius: "9999px",
    border: "1px solid var(--hairline, var(--border))",
    background: "transparent",
    color: "var(--ink-muted, var(--muted-foreground))",
    cursor: selectable ? "pointer" : "default",
    transition: "all 0.12s", userSelect: "none", whiteSpace: "nowrap",
  };

  if (selectable) return <button style={style} onClick={onToggle}>{icon}{label}</button>;
  return <span style={style}>{icon}{label}</span>;
}

// ── LangTag — square-ish, different from pills, visually distinct ─────────────
interface LangTagProps { code: string; isOriginal?: boolean }
export function LangTag({ code, isOriginal = false }: LangTagProps) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "0.15rem 0.4rem",
      fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.1em",
      fontFamily: "var(--font-sans)", textTransform: "uppercase",
      color: isOriginal ? "var(--aurora-orange)" : "var(--muted-foreground)",
      border: `1px solid ${isOriginal ? "color-mix(in srgb, var(--aurora-orange) 30%, transparent)" : "var(--border)"}`,
      borderRadius: "3px",
      background: isOriginal ? "color-mix(in srgb, var(--aurora-orange) 8%, transparent)" : "transparent",
    }}>
      {code}
    </span>
  );
}

interface TypeChipGroupProps {
  types: string[];
  selectable?: boolean;
  selected?: string[];
  onToggle?: (type: string) => void;
}
export function TypeChipGroup({ types, selectable = false, selected = [], onToggle }: TypeChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {types.map(t => (
        <TypeChip key={t} label={t} selectable={selectable} selected={selected.includes(t)} onToggle={() => onToggle?.(t)} />
      ))}
    </div>
  );
}
