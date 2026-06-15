import { useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { ItemRow } from "../components/ItemRow";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";
import { StatusBadge } from "../components/StatusBadge";
import { TypeChip } from "../components/TypeChip";
import { AudioPlayer } from "../components/AudioPlayer";
import { ExternalLink, BookOpen, Download } from "lucide-react";
import bannerImg from "../../imports/OON_banner_V3.jpg";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources";
type BrowseMode = "topic" | "period" | "type";

interface BrowsePageProps {
  onNavigate: (page: Page) => void;
  onSelectItem: () => void;
}

// ⚠ PLACEHOLDER CONTENT — All 15 items below are invented for layout testing.
// Replace with real corpus data (title, date, type, status, excerpt) before release.
// Remove hasAudio once real audio files exist.
const ALL_ITEMS = [
  { id: "1",  title: "Initial letter to Recipient A",        date: "Jan 1965", type: "Letter",        status: "verified"     as const, hasAudio: false,
    excerpt: "We address you for the first time through this medium. We are aware that what we have to communicate will strain the limits of your current conceptual frameworks, and we ask only that you read carefully and preserve the correspondence." },
  { id: "2",  title: "Report: structural characteristics of correspondence", date: "Mar 1966", type: "Report", status: "under-review" as const, hasAudio: false,
    excerpt: "Analysis of 14 letters received between January 1965 and December 1965. The letters display a consistent internal logic and terminology that resists explanation by standard hoax hypotheses." },
  { id: "3",  title: "Letter detailing correspondent world biology",             date: "Aug 1967", type: "Letter",        status: "verified"     as const, hasAudio: false,
    excerpt: "The atmospheric composition of Planet X differs substantially from that of your planet. Nitrogen comprises approximately 73% of the atmosphere; the remaining fraction includes compounds not detectable by your present instrumentation." },
  { id: "4",  title: "Transcript: public address, Archive B city",                date: "Nov 1968", type: "Transcript",    status: "original"     as const, hasAudio: true,
    excerpt: "Recipient A addresses the gathered researchers: 'What you are about to hear constitutes, in my view, the most significant series of communications in the history of our field. I ask you to suspend judgement until you have read the full sequence.'" },
  { id: "5",  title: "Internal note — scope of correspondence network",      date: "Feb 1969", type: "Internal note", status: "partial"      as const, hasAudio: false,
    excerpt: "Partial record. An internal note circulated among the core research group in 1969 enumerating the known recipients of the correspondence. Several names are redacted in the surviving copy." },
  { id: "6",  title: "Letter on correspondent world social organisation",                   date: "Jun 1969", type: "Letter",        status: "translated"   as const, hasAudio: false,
    excerpt: "Social organisation on Planet X is structured around units of approximately twelve individuals. These units are not familial in the biological sense but rather affiliative, based on a compatibility assessment conducted in early developmental stages." },
  { id: "7",  title: "Report: linguistic analysis of correspondent prefix system",       date: "Dec 1970", type: "Report",        status: "under-review" as const, hasAudio: true,
    excerpt: "The linguistic prefix system appears in 94% of the letters examined. It functions as a kind of provenance marker, indicating the class of entity making an assertion. Its internal consistency across hundreds of letters authored over five years is remarkable." },
  { id: "8",  title: "Letter to Researcher B — technical detail",            date: "Apr 1972", type: "Letter",        status: "verified"     as const, hasAudio: false,
    excerpt: "In this letter the correspondents describe the propulsion system used for interplanetary transit in terms that invoke your concept of electromagnetic fields but extend it significantly. We recommend reading the 1967 biology letter first." },
  { id: "9",  title: "Commentary: regional sighting report",            date: "Jan 1974", type: "Commentary",    status: "unverified"   as const, hasAudio: false,
    excerpt: "This commentary was written by a researcher who was not among the original recipients and who had access only to the photocopied versions. Its claims about the regional sighting are unverified against primary sources." },
  { id: "10", title: "Online account: Researcher C's 1993 disclosure",            date: "1993",     type: "Online account",status: "partial"      as const, hasAudio: true,
    excerpt: "Researcher C's account, published digitally, claims to resolve the question of authorship. The claims have not been independently confirmed. The document is held here as a primary account, not as analysis." },
  { id: "11", title: "Letter — philosophical treatise on consciousness",    date: "Sep 1975", type: "Letter",        status: "translated"   as const, hasAudio: false,
    excerpt: "What you call 'consciousness' we would render more precisely as 'self-referential informational continuity'. The distinction matters: your word implies an experiential substrate; our term does not." },
  { id: "12", title: "Report: handwriting and typeface analysis",           date: "Mar 1978", type: "Report",        status: "verified"     as const, hasAudio: false,
    excerpt: "Examination of 43 letters identified at least three distinct typeface profiles and two handwriting styles in marginalia. The report concludes that the evidence is consistent with both a single-author and multi-author hypothesis." },
  { id: "13", title: "Transcript: recorded interview with Researcher B",            date: "Jul 1981", type: "Interview",     status: "original"     as const, hasAudio: true,
    excerpt: "Researcher B: 'I knew more than I said for many years. I was not ready. And I am not sure, even now, that saying it changes anything fundamental about what the letters are.'" },
  { id: "14", title: "Internal note — list of known recipients",            date: "Apr 1983", type: "Internal note", status: "under-review" as const, hasAudio: false,
    excerpt: "A partial enumeration of recipients compiled from cross-referencing accounts. 47 individuals confirmed; a further 20–30 believed probable based on secondary references in correspondence." },
  { id: "15", title: "Letter: correspondent temporal unit explained",                  date: "Nov 1984", type: "Letter",        status: "verified"     as const, hasAudio: false,
    excerpt: "TAUU is the unit of temporal measurement used in Planet X science. It does not correspond to any fixed astronomical cycle on your world. We use it here simply to convey relative durations: one TAUU is approximately 1.4 of your years." },
];

const ITEMS_PER_PAGE = 8;

// No X button — clicking the row again is the only collapse mechanism
function InlineReader({ item, onReadFull }: { item: typeof ALL_ITEMS[0]; onReadFull: () => void }) {
  return (
    <div
      className="border-l border-b overflow-hidden"
      style={{
        borderLeft: "3px solid var(--accent)",
        background: "var(--bg-surface)",  // warm off-white surface, not pure white
        // Hero-card inset edges (left has accent bar, so top+right get the glow)
        boxShadow: [
          "inset 0 1px 0 color-mix(in srgb, var(--accent) 22%, transparent)",
          "inset -1px 0 0 color-mix(in srgb, var(--accent) 10%, transparent)",
        ].join(", "),
      }}
    >
      {/* Reader header — minimal, no close button */}
      <div
        className="flex items-center gap-2 flex-wrap px-5 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <TypeChip label={item.type} />
        <StatusBadge variant={item.status} />
        <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{item.date}</span>
        <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", marginLeft: "auto" }}>
          Click row to collapse
        </span>
      </div>

      <div className="px-5 py-4">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 400,
            color: "var(--foreground)",
            lineHeight: 1.3,
            marginBottom: "0.875rem",
          }}
        >
          {item.title}
        </h3>

        {/* Audio player if available */}
        {item.hasAudio && (
          <div className="mb-4">
            <AudioPlayer
              title={`Audio: ${item.title}`}
              description="Associated recording — verified against transcript"
              duration={item.type === "Interview" ? "31:22" : item.type === "Transcript" ? "12:47" : "8:04"}
              type={item.type === "Interview" ? "interview" : item.type === "Transcript" ? "phone-call" : "recording"}
            />
          </div>
        )}

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "0.9375rem",
            lineHeight: 1.8,
            color: "var(--foreground)",
            borderLeft: "3px solid var(--border)",
            paddingLeft: "1rem",
            marginBottom: "1.125rem",
          }}
        >
          "{item.excerpt}"
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onReadFull}
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            style={{
              padding: "0.45rem 1rem",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              borderRadius: "2px",
              fontFamily: "var(--font-sans)",
              boxShadow: "0 0 12px -4px var(--accent)",
            }}
          >
            <BookOpen size={12} /> Read full document
          </button>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
            style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}
          >
            <ExternalLink size={12} /> View in archive
          </a>
          <button
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70 ml-auto"
            style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}
          >
            <Download size={12} /> Download
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrowsePage({ onNavigate, onSelectItem }: BrowsePageProps) {
  const [mode, setMode] = useState<BrowseMode>("topic");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("oldest");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggleType(type: string) {
    setActiveTypes(p => p.includes(type) ? p.filter(t => t !== type) : [...p, type]);
    setCurrentPage(1);
  }

  let filtered = [...ALL_ITEMS];
  if (activeTypes.length > 0) filtered = filtered.filter(i => activeTypes.includes(i.type));
  filtered.sort((a, b) => sortOrder === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  function toggleExpanded(id: string) {
    setExpandedId(prev => prev === id ? null : id);
  }

  return (
    <div>
      <FilterBar
        mode={mode}
        onModeChange={setMode}
        activeTypes={activeTypes}
        onTypeToggle={toggleType}
        sortOrder={sortOrder}
        onSortChange={o => { setSortOrder(o); setCurrentPage(1); }}
        resultCount={filtered.length}
      />

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        {/* Search */}
        <div className="mb-8">
          <SearchBar onSelectResult={(id) => { setExpandedId(id); }} />
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-16 text-center border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
              No items match these filters
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Try removing one or more active type filters.</p>
            <button onClick={() => setActiveTypes([])} className="mt-4 hover:opacity-70 transition-opacity" style={{ fontSize: "0.875rem", color: "var(--accent)" }}>
              Clear all filters
            </button>
          </div>
        )}

        {/* Item list with inline reader */}
        {filtered.length > 0 && (
          <>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {pageItems.map((item) => (
                <div key={item.id}>
                  <ItemRow
                    title={item.title}
                    date={item.date}
                    type={item.type}
                    status={item.status}
                    onClick={() => toggleExpanded(item.id)}
                    active={expandedId === item.id}
                  />
                  {expandedId === item.id && (
                    <InlineReader
                      item={item}
                      onReadFull={onSelectItem}
                    />
                  )}
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        )}
      </div>
    </div>
  );
}