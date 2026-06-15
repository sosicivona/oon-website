import { useState } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { TypeChip } from "../components/TypeChip";
import { Callout } from "../components/Callout";
import { ItemRow } from "../components/ItemRow";
import { Breadcrumb } from "../components/Breadcrumb";
import { DocumentViewer } from "../components/DocumentViewer";
import { DownloadPanel } from "../components/DownloadPanel";
import bannerImg from "../../imports/OON_banner_V3.jpg";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources";

interface ItemDetailPageProps {
  onNavigate: (page: Page) => void;
}

const PROVENANCE = [
  { term: "Date",          value: "Date pending review" },
  { term: "Type",          value: "Communication item" },
  { term: "Status",        value: "Source path pending review" },
  { term: "Original lang", value: "Language pending review" },
  { term: "Translations",  value: "Translation status pending review" },
  { term: "Pages",         value: "Pagination pending review" },
  { term: "Reference",     value: "Reference pending review" },
  { term: "Held at",       value: "Archive link pending verification" },
];

const DOCUMENT_PAGES = [
  { text: `Source text pending approval\n\nThis reader shell will display approved source material after the item has been matched to the corpus inventory and reviewed for publication.` },
  { text: `Metadata pending review\n\nArchive path, language status, pagination, transcription status, and rights notes will be added only after source verification.` },
];

const DOC_TEXT = DOCUMENT_PAGES.map(p => p.text).join("\n\n---\n\n");

const RELATED = [
  { id: "r1", title: "Related communication item pending review", date: "Date pending", type: "Communication item", status: "under-review" as const },
  { id: "r2", title: "Related source path pending verification", date: "Date pending", type: "Source path", status: "under-review" as const },
  { id: "r3", title: "Related context note pending copy approval", date: "Date pending", type: "Context note", status: "under-review" as const },
];

export function ItemDetailPage({ onNavigate }: ItemDetailPageProps) {
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <>
      <DocumentViewer
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        title="Communication item pending review"
        date="Date pending review"
        reference="Reference pending review"
        pages={DOCUMENT_PAGES}
      />

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[
            { label: "Browse", onClick: () => onNavigate("read") },
            { label: "Communication item" },
            { label: "Pending review" },
          ]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,16rem)] gap-10 items-start">

          {/* ── MAIN: reading experience ──────────────────────────────────── */}
          <div>
            {/* Tags + title */}
            <div className="mb-8 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <TypeChip label="Communication item" />
                <StatusBadge variant="under-review" />
                <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginLeft: "0.25rem" }}>
                  Metadata pending review
                </span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, lineHeight: 1.2, color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                Communication item pending review
              </h1>
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                Source path pending verification
              </p>
            </div>

            {/* Context note */}
            <Callout variant="note">
              <p>This detail view is a visual shell. Source text, metadata, summaries, and interpretation will be added only after the item has an approved source path.</p>
            </Callout>

            {/* Document image */}
            <div className="mt-8 mb-6 overflow-hidden border" style={{ borderColor: "var(--border)" }}>
              <div className="relative" style={{ height: "13rem" }}>
                <img
                  src={bannerImg}
                  alt="OON visual system image treatment"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-4">
                  <p style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5, maxWidth: "42ch" }}>
                    Image treatment placeholder; no source facsimile is attached.
                  </p>
                  <button
                    onClick={() => setViewerOpen(true)}
                    className="flex items-center gap-1.5 flex-shrink-0 hover:opacity-90 transition-opacity"
                    style={{ fontSize: "0.75rem", fontWeight: 500, color: "white", padding: "0.35rem 0.75rem", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", backdropFilter: "blur(8px)", borderRadius: "2px" }}
                  >
                    <BookOpen size={11} /> Read
                  </button>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <p className="uppercase tracking-widest mb-3" style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
              Excerpt
            </p>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", lineHeight: 1.85, color: "var(--foreground)", maxWidth: "66ch" }}>
              <p className="mb-4">
                Excerpt pending source approval.
              </p>
              <p className="mb-4">
                The approved corpus inventory will determine whether source text, translation, summary, or only an external archive path appears here.
              </p>
            </div>

            <button onClick={() => setViewerOpen(true)} className="mt-2 mb-6 inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ fontSize: "0.8125rem", color: "var(--accent)", fontWeight: 500 }}>
              <BookOpen size={13} /> Open reader shell
            </button>

            {/* Interpretation boundary */}
            <div className="mt-8">
              <Callout variant="boundary">
                <p>The following section is reserved for OON interpretation and will remain visually separate from source material.</p>
              </Callout>
            </div>
            <div className="mt-5" style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--muted-foreground)", maxWidth: "66ch" }}>
              <p>Interpretation pending approved source path and editorial review.</p>
            </div>

            {/* Related items */}
            <div className="mt-12">
              <p className="uppercase tracking-widest mb-4" style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
                Related items
              </p>
              <div style={{ borderTop: "1px solid var(--border)" }}>
                {RELATED.map(item => (
                  <ItemRow key={item.id} title={item.title} date={item.date} type={item.type} status={item.status} onClick={() => {}} />
                ))}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR: action panel ─────────────────────────────────────── */}
          <aside className="min-w-0">
            <div className="sticky top-20 flex flex-col gap-0 border overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--card)" }}>

              {/* 1. Primary action */}
              <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <button
                  onClick={() => setViewerOpen(true)}
                  className="w-full flex items-center justify-center gap-2 transition-all hover:opacity-85"
                  style={{ padding: "0.65rem", background: "var(--accent)", color: "var(--accent-foreground)", fontSize: "0.875rem", fontWeight: 500, borderRadius: "2px", boxShadow: "0 0 16px -6px var(--accent)" }}
                >
                  <BookOpen size={14} /> Open reader shell
                </button>
                <span className="mt-2 w-full flex items-center justify-center gap-1.5" style={{ padding: "0.5rem", fontSize: "0.8125rem", color: "var(--muted-foreground)", border: "1px solid var(--border)", borderRadius: "2px", marginTop: "0.5rem", textDecoration: "none" }}>
                  <ExternalLink size={12} /> Archive link pending verification
                </span>
              </div>

              {/* 2. Provenance */}
              <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <p className="uppercase tracking-widest mb-3" style={{ fontSize: "0.5625rem", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
                  Provenance
                </p>
                <dl>
                  {PROVENANCE.map(({ term, value }) => (
                    <div key={term} className="flex gap-2 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                      <dt style={{ fontSize: "0.625rem", fontWeight: 500, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", minWidth: "5rem", paddingTop: "0.1rem", flexShrink: 0 }}>
                        {term}
                      </dt>
                      <dd style={{ fontSize: "0.75rem", color: "var(--foreground)", lineHeight: 1.5, wordBreak: "break-word", overflowWrap: "anywhere" }}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* 3. Downloads */}
              <div className="p-4">
                <DownloadPanel
                  documentTitle="Communication item pending review"
                  documentContent={DOC_TEXT}
                  documentRef="Reference pending review"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
