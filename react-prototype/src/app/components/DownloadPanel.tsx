import { FileText, Archive, BookOpen } from "lucide-react";

interface DownloadPanelProps {
  documentTitle: string;
  documentContent: string;
  documentRef: string;
}

function DisabledDownloadButton({
  label, detail, format, icon,
}: {
  label: string; detail: string; format: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      disabled
      className="w-full flex items-center gap-4 text-left py-3 px-4 border cursor-not-allowed"
      style={{
        borderColor: "var(--border)",
        background: "var(--card)",
        borderRadius: "2px",
        opacity: 0.78,
      }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: "2.25rem", height: "2.25rem",
          background: "var(--secondary)",
          color: "var(--muted-foreground)",
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.3 }}>
          {label}
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.1rem" }}>
          {detail}
        </p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p style={{ fontSize: "0.625rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.1rem" }}>{format}</p>
      </div>
    </button>
  );
}

/** Sidebar download panel shell. Real exports stay disabled until source and rights review is complete. */
export function DownloadPanel({ documentRef }: DownloadPanelProps) {
  return (
    <div>
      <p
        className="uppercase tracking-widest mb-4"
        style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}
      >
        Downloads
      </p>

      <div className="flex flex-col gap-2">
        <DisabledDownloadButton
          label="This item"
          detail={`${documentRef} · disabled pending source and rights review`}
          format="TXT"
          icon={<FileText size={14} />}
        />

        <DisabledDownloadButton
          label="Topic bundle"
          detail="Disabled pending approved inventory"
          format="ZIP"
          icon={<BookOpen size={14} />}
        />

        <DisabledDownloadButton
          label="Dossier export shell"
          detail="Disabled pending source and rights review"
          format="ZIP"
          icon={<Archive size={14} />}
        />
      </div>

      <p className="mt-3" style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
        Downloads will be added only after source verification, rights review, and approved copy are complete.
      </p>
    </div>
  );
}
