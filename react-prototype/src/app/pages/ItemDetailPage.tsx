import { useState } from "react";
import { ExternalLink, BookOpen, ChevronRight } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { TypeChip } from "../components/TypeChip";
import { Callout } from "../components/Callout";
import { QuoteBlock } from "../components/QuoteBlock";
import { ItemRow } from "../components/ItemRow";
import { Breadcrumb } from "../components/Breadcrumb";
import { DocumentViewer } from "../components/DocumentViewer";
import { DownloadPanel } from "../components/DownloadPanel";
import { AudioPlayer } from "../components/AudioPlayer";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources";

interface ItemDetailPageProps {
  onNavigate: (page: Page) => void;
}

// ⚠ PLACEHOLDER CONTENT — All provenance fields below are invented.
// Replace with real document metadata (date, reference, holding institution, etc.) before release.
const PROVENANCE = [
  { term: "Date",          value: "August 1967" },
  { term: "Type",          value: "Letter (typewritten)" },
  { term: "Status",        value: "Verified source" },
  { term: "Original lang", value: "Spanish" },
  { term: "Translations",  value: "English · French" },
  { term: "Pages",         value: "4 pp., single-sided" },
  { term: "Reference",     value: "DOC-0034" },
  { term: "Held at",       value: "Archive A" },
];

// ⚠ PLACEHOLDER CONTENT — Document text below is invented for layout testing.
// Replace with real transcribed source text (or link to external viewer) before release.
const DOCUMENT_PAGES = [
  { text: `DOC-0034 — Page 1 of 4\nAugust 1967\n\nDear Recipient A,\n\nWe address you once more through this medium. We are aware that our previous communications have been shared among a number of your colleagues, and we consider this to be in keeping with our purpose. We do not wish these texts to remain with one reader.\n\nThe purpose of this letter is to describe, in terms that can be understood by reference to your current scientific knowledge, certain physical and biological features of Planet X — the world from which we originate.\n\nWe wish to make clear from the outset that our descriptions should be understood as approximations. The concepts available in your language do not always correspond precisely to what we seek to convey. Where we are unable to find an adequate equivalent, we will note this explicitly.` },
  { text: `DOC-0034 — Page 2 of 4\n\nATMOSPHERIC COMPOSITION\n\nThe atmospheric composition of Planet X differs substantially from that of your planet. Nitrogen comprises approximately 73% of the atmosphere; the remaining fraction includes compounds that do not occur in concentrations sufficient for detection by your present instrumentation. The surface temperature range, across the inhabitable equatorial band, spans a median of 9 degrees by your Celsius measure.\n\nThese conditions have remained stable, within a narrow range of variation, for a period corresponding to approximately 800,000 of your years. The stability is not accidental. We do not propose to elaborate on this point in the present communication.` },
  { text: `DOC-0034 — Page 3 of 4\n\nBIOLOGICAL CHARACTERISTICS\n\nBiological adaptation to this environment over many thousands of Planet X years has produced the morphological characteristics described in our previous communication.\n\nWe note that the term "biological" is used here in the broadest sense, encompassing the full range of somatic organisation, and not in the narrower sense in which it is employed in your academic literature. The distinction is not trivial. What your science treats as separate categories — the organic and the inorganic, the conscious and the non-conscious — are understood differently in the framework we apply.` },
  { text: `DOC-0034 — Page 4 of 4\n\nCLOSING REMARKS\n\nWe are aware that many of your colleagues will question the authenticity of these communications. We consider this response to be rational given your current epistemic situation, and we do not object to it.\n\nWe ask only that the material be preserved and considered carefully. Whether it is believed is a separate matter from whether it is retained.\n\nFuture communications will address questions of social organisation on Planet X, the history of our awareness of your world, and the nature of the network through which these letters are transmitted.\n\nWe will write again.\n\n— UMMO` },
];

const DOC_TEXT = DOCUMENT_PAGES.map(p => p.text).join("\n\n" + "─".repeat(48) + "\n\n");

// ⚠ PLACEHOLDER CONTENT — Related items are invented. Replace with real corpus cross-references.
const RELATED = [
  { id: "r1", title: "First letter to Recipient A: initial contact", date: "Jan 1965", type: "Letter", status: "verified" as const },
  { id: "r2", title: "Follow-up: biological characteristics of Planet X", date: "Dec 1967", type: "Letter", status: "verified" as const },
  { id: "r3", title: "Report: linguistic analysis of correspondent prefix system", date: "Dec 1970", type: "Report", status: "under-review" as const },
];

export function ItemDetailPage({ onNavigate }: ItemDetailPageProps) {
  const [viewerOpen, setViewerOpen] = useState(false);

  function downloadDoc() {
    const blob = new Blob([`Letter DOC-0034\n${"─".repeat(48)}\n\n${DOC_TEXT}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "OON-DOC-0034.txt"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <DocumentViewer
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        title="Letter detailing correspondent world biology and atmospheric conditions"
        date="August 1967"
        reference="DOC-0034"
        pages={DOCUMENT_PAGES}
        onDownload={downloadDoc}
      />

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[
            { label: "Browse", onClick: () => onNavigate("read") },
            { label: "Letters" },
            { label: "1967" },
            { label: "DOC-0034" },
          ]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,16rem)] gap-10 items-start">

          {/* ── MAIN: reading experience ──────────────────────────────────── */}
          <div>
            {/* Tags + title */}
            <div className="mb-8 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <TypeChip label="Letter" />
                <StatusBadge variant="verified" />
                <StatusBadge variant="translated" />
                <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginLeft: "0.25rem" }}>
                  Spanish · English · French
                </span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 400, lineHeight: 1.2, color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                Letter detailing correspondent world biology and atmospheric conditions
              </h1>
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                Received August 1967 · Archive A · DOC-0034
              </p>
            </div>

            {/* Context note */}
            <Callout variant="note">
              <p>This document describes, in terms comprehensible to contemporary science, certain physical and biological characteristics of the correspondent's world of origin. It is the first communication to describe the biology and atmospheric composition of Planet X in technical terms. The claims are presented as source material; OON does not evaluate their veracity.</p>
            </Callout>

            {/* Document image */}
            <div className="mt-8 mb-6 overflow-hidden border" style={{ borderColor: "var(--border)" }}>
              <div className="relative" style={{ height: "13rem" }}>
                <img
                  src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=900&h=400&fit=crop&auto=format"
                  alt="Typewriter consistent with the mechanical profile of UMMO-series letters"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-4">
                  <p style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5, maxWidth: "42ch" }}>
                    Typewriter consistent with the mechanical profile in the 1978 expert analysis
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
              Excerpt · English translation
            </p>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", lineHeight: 1.85, color: "var(--foreground)", maxWidth: "66ch" }}>
              <p className="mb-4">
                The atmospheric composition of Planet X differs substantially from that of your planet. Nitrogen comprises approximately 73% of the atmosphere; the remaining fraction includes compounds that do not occur in concentrations sufficient for detection by your present instrumentation.
              </p>
              <p className="mb-4">
                Biological adaptation to this environment over many thousands of Planet X years has produced the morphological characteristics described in our previous communication. We note that the term "biological" is used here in the broadest sense, encompassing the full range of somatic organisation.
              </p>
            </div>

            <button onClick={() => setViewerOpen(true)} className="mt-2 mb-6 inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ fontSize: "0.8125rem", color: "var(--accent)", fontWeight: 500 }}>
              <BookOpen size={13} /> Read full document · 4 pages →
            </button>

            <QuoteBlock
              text="The term 'biological' is used here in the broadest sense, encompassing the full range of somatic organisation, and not in the narrower sense in which it is employed in your academic literature."
              attribution="Letter DOC-0034"
              date="August 1967"
              source="Archive A"
            />

            {/* Interpretation boundary */}
            <div className="mt-8">
              <Callout variant="boundary">
                <p>The following section contains interpretive commentary by OON editors, separated from the source text above. Interpretations are provisional.</p>
              </Callout>
            </div>
            <div className="mt-5" style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--muted-foreground)", maxWidth: "66ch" }}>
              <p>This letter marks a shift in register: where previous letters addressed cosmological topics, DOC-0034 moves into empirical description of measurable quantities. Researchers have noted the precision of the atmospheric composition figures, which predates certain scientific consensus points by several years.</p>
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
                  <BookOpen size={14} /> Read document
                </button>
                <a href="#" className="mt-2 w-full flex items-center justify-center gap-1.5 hover:opacity-70 transition-opacity" style={{ padding: "0.5rem", fontSize: "0.8125rem", color: "var(--muted-foreground)", border: "1px solid var(--border)", borderRadius: "2px", marginTop: "0.5rem", textDecoration: "none" }}>
                  <ExternalLink size={12} /> View in archive (Archive A)
                </a>
              </div>

              {/* 2. Associated audio */}
              <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <p className="uppercase tracking-widest mb-3" style={{ fontSize: "0.5625rem", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
                  Associated audio
                </p>
                <AudioPlayer
                  title="Recipient A reads letter aloud, recorded 1968"
                  description="Private recording, Barcelona research group"
                  duration="8:34"
                  type="recording"
                />
              </div>

              {/* 3. Provenance */}
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

              {/* 4. Downloads */}
              <div className="p-4">
                <DownloadPanel
                  documentTitle="Letter DOC-0034"
                  documentContent={DOC_TEXT}
                  documentRef="DOC-0034"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
