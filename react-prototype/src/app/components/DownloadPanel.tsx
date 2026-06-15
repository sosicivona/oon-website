import { useState } from "react";
import { Download, FileText, Archive, BookOpen, ChevronDown, Check, Loader } from "lucide-react";

interface DownloadItem {
  id: string;
  label: string;
  detail: string;
  size: string;
  format: string;
  content: string;
  filename: string;
}

interface DownloadPanelProps {
  documentTitle: string;
  documentContent: string;
  documentRef: string;
}

const THEMES_BUNDLES = [
  { id: "correspondence", label: "Correspondence sequence", count: 47, size: "3.2 MB" },
  { id: "biology", label: "Biology & science letters", count: 12, size: "0.9 MB" },
  { id: "philosophy", label: "Philosophy & cosmology", count: 19, size: "1.4 MB" },
  { id: "technical", label: "Technical & language analysis", count: 8, size: "0.7 MB" },
];

function triggerDownload(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function DownloadButton({
  label, detail, size, format, icon, onDownload,
}: {
  label: string; detail: string; size: string; format: string;
  icon: React.ReactNode; onDownload: () => void;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function handleClick() {
    setState("loading");
    setTimeout(() => {
      onDownload();
      setState("done");
      setTimeout(() => setState("idle"), 2500);
    }, 600);
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === "loading"}
      className="w-full flex items-center gap-4 text-left transition-colors hover:opacity-80 py-3 px-4 border"
      style={{
        borderColor: state === "done" ? "rgba(46,122,80,0.4)" : "var(--border)",
        background: state === "done" ? "rgba(46,122,80,0.05)" : "var(--card)",
        borderRadius: "2px",
      }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: "2.25rem", height: "2.25rem",
          background: state === "done" ? "rgba(46,122,80,0.12)" : "var(--secondary)",
          color: state === "done" ? "#2E7A50" : "var(--muted-foreground)",
        }}
      >
        {state === "loading" ? <Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> :
          state === "done" ? <Check size={14} /> : icon}
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.3 }}>
          {state === "done" ? "Downloaded" : label}
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.1rem" }}>
          {detail}
        </p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{size}</p>
        <p style={{ fontSize: "0.625rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.1rem" }}>{format}</p>
      </div>
    </button>
  );
}

/** Sidebar download panel offering the current document as TXT, a themed topic-bundle picker, and a full-dossier download; bundle content is placeholder stub text. */
export function DownloadPanel({ documentTitle, documentContent, documentRef }: DownloadPanelProps) {
  const [themeOpen, setThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<typeof THEMES_BUNDLES[0] | null>(null);
  const [themeState, setThemeState] = useState<"idle" | "loading" | "done">("idle");

  function downloadTheme(bundle: typeof THEMES_BUNDLES[0]) {
    setSelectedTheme(bundle);
    setThemeState("loading");
    setTimeout(() => {
      triggerDownload(
        `OON Archive Bundle: ${bundle.label}\n${"=".repeat(48)}\n\nThis bundle contains ${bundle.count} documents from the OON archive.\nPlease refer to the original source archives for full facsimiles.\n\n[Placeholder — full bundle would contain individual document files]`,
        `OON-bundle-${bundle.id}.txt`
      );
      setThemeState("done");
      setTimeout(() => { setThemeState("idle"); setThemeOpen(false); }, 2000);
    }, 700);
  }

  const dossierContent = `OON ARCHIVE — FULL DOSSIER\n${"=".repeat(48)}\nOyagaa–Oomo Network · Complete correspondence archive\nGenerated: ${new Date().toDateString()}\n\nThis export contains the full index of 380+ primary documents across 14 institutional sources.\nAll material belongs to its original archives. Provenance is always cited.\n\n[Placeholder — full dossier would contain indexed document metadata and excerpts]`;

  return (
    <div>
      <p
        className="uppercase tracking-widest mb-4"
        style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}
      >
        Downloads
      </p>

      <div className="flex flex-col gap-2">
        {/* This document */}
        <DownloadButton
          label="This document"
          detail={`${documentRef} · English translation`}
          size="48 KB"
          format="TXT"
          icon={<FileText size={14} />}
          onDownload={() => triggerDownload(
            `${documentTitle}\n${documentRef}\n${"─".repeat(48)}\n\n${documentContent}`,
            `OON-${documentRef.replace(/\s/g, "-")}.txt`
          )}
        />

        {/* Theme bundle */}
        <div>
          <button
            onClick={() => setThemeOpen(!themeOpen)}
            className="w-full flex items-center gap-4 text-left transition-colors hover:opacity-80 py-3 px-4 border"
            style={{ borderColor: "var(--border)", background: "var(--card)", borderRadius: "2px" }}
          >
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: "2.25rem", height: "2.25rem", background: "var(--secondary)", color: "var(--muted-foreground)" }}>
              <BookOpen size={14} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.3 }}>
                By theme
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.1rem" }}>
                {selectedTheme ? selectedTheme.label : "Choose a topic bundle"}
              </p>
            </div>
            <ChevronDown size={13} style={{ color: "var(--muted-foreground)", transition: "transform 0.15s", transform: themeOpen ? "rotate(180deg)" : "none", flexShrink: 0 }} />
          </button>

          {themeOpen && (
            <div className="border border-t-0" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              {THEMES_BUNDLES.map((bundle, i) => (
                <button
                  key={bundle.id}
                  onClick={() => downloadTheme(bundle)}
                  disabled={themeState === "loading"}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:opacity-80"
                  style={{
                    borderBottom: i < THEMES_BUNDLES.length - 1 ? "1px solid var(--border)" : "none",
                    background: selectedTheme?.id === bundle.id && themeState === "done" ? "rgba(46,122,80,0.05)" : "transparent",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.8125rem", color: "var(--foreground)" }}>{bundle.label}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginLeft: "0.5rem" }}>
                      {bundle.count} docs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>{bundle.size}</span>
                    {selectedTheme?.id === bundle.id && themeState === "loading" && (
                      <Loader size={11} style={{ color: "var(--accent)", animation: "spin 1s linear infinite" }} />
                    )}
                    {selectedTheme?.id === bundle.id && themeState === "done" && (
                      <Check size={11} style={{ color: "#2E7A50" }} />
                    )}
                    {!(selectedTheme?.id === bundle.id && themeState !== "idle") && (
                      <Download size={11} style={{ color: "var(--muted-foreground)" }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Full dossier */}
        <DownloadButton
          label="Full dossier"
          detail="380+ documents · complete index"
          size="14.8 MB"
          format="ZIP"
          icon={<Archive size={14} />}
          onDownload={() => triggerDownload(dossierContent, "OON-full-dossier.txt")}
        />
      </div>

      <p className="mt-3" style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
        Exports contain transcriptions and metadata. Facsimile images belong to their holding institutions and are not included.
      </p>
    </div>
  );
}
