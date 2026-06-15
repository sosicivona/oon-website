import { SectionHeader } from "../components/SectionHeader";
import { Timeline, type TimelineEvent } from "../components/Timeline";
import { Breadcrumb } from "../components/Breadcrumb";
import { TypeChipGroup } from "../components/TypeChip";
import { Accordion } from "../components/Accordion";
import { useState } from "react";
import bannerImg from "../../imports/OON_banner_V3.jpg";
import { THEMES } from "../components/ThemeSwitcher";

type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources";

interface TopicPageProps {
  onNavigate: (page: Page) => void;
  onSelectItem: (id?: string) => void;
}

// ⚠ PLACEHOLDER CONTENT — All 7 timeline events below are invented for layout testing.
// Replace with real corpus events (date, type, description, source links) before release.
// Image URLs are Unsplash placeholders — replace with contextually appropriate licensed images.
const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: "Jan 1965",
    type: "First contact",
    title: "Correspondence begins with Recipient A",
    description: "The first letter is received in Madrid. Recipient A distributes copies to a small circle of researchers.",
    eventCategory: "communication",
    image: {
      url: "https://images.unsplash.com/photo-1561812938-f6e60cbf95e3?w=800&h=400&fit=crop&auto=format",
      alt: "Close-up of handwritten text on paper",
      caption: "Handwritten annotations found in early correspondence copies, Archive A",
    },
    pullQuote: "This document describes, in terms comprehensible to contemporary science, certain physical and biological characteristics of the correspondent's world of origin.",
    detail: "The letter arrived at Recipient A's Madrid address with no return address and a postmark that researchers have since been unable to definitively place. Recipient A, who ran a small discussion group, initially shared it with six colleagues. Within months, copies had spread to over forty researchers across Spain.",
    relatedItems: [
      { id: "1", title: "Initial letter to Recipient A", date: "Jan 1965", type: "Letter", status: "verified" as const },
    ],
  },
  {
    date: "Aug 1967",
    type: "Technical letter",
    title: "Planet X planetary biology described in detail",
    description: "The first letter to include measurable physical quantities — atmospheric composition, temperature range, morphological characteristics.",
    eventCategory: "communication",
    image: {
      url: "https://images.unsplash.com/photo-1592860475958-6d6dd04b34b4?w=800&h=400&fit=crop&auto=format",
      alt: "White observatory dome on a hilltop",
      caption: "The Torrejón observatory, referenced in multiple letters as a known landmark",
    },
    pullQuote: "Nitrogen comprises approximately 73% of the atmosphere; the remaining fraction includes compounds that do not occur in concentrations sufficient for detection by your present instrumentation.",
    detail: "Several researchers have noted the precision of the atmospheric composition figures in this letter, which predates mainstream scientific consensus on certain planetary atmospheric ratios by several years. This observation has been used both to support and to critique the authenticity of the correspondence sequence.",
    relatedItems: [
      { id: "2", title: "Letter detailing correspondent world biology", date: "Aug 1967", type: "Letter", status: "verified" as const },
    ],
  },
  {
    date: "1968–1970",
    type: "Network expansion",
    title: "Recipient list grows to approximately 100 individuals",
    description: "Correspondence spreads to researchers in France, Germany, and the United Kingdom.",
    eventCategory: "action",
    image: {
      url: "https://images.unsplash.com/photo-1637597384611-0c33cef6ec03?w=800&h=400&fit=crop&auto=format",
      alt: "A pile of old envelopes stacked on top of each other",
      caption: "Representative sample of correspondence envelopes, Archive B collection",
    },
    pullQuote: "The network grew faster than any of us anticipated. By 1969 we were receiving copies from people we had never contacted directly.",
    detail: "The mechanism of distribution is not fully understood. Recipients reported receiving letters directly — not copies passed through intermediaries — yet the address lists implied by the distribution were never found. Several researchers formed the first informal UMMO study group during this period.",
    // ⚠ PLACEHOLDER — 5-document example showing the 1-to-many RelatedDocsList pattern.
    // First 3 show inline; "Show 2 more" collapses the rest. Replace with real corpus items.
    relatedItems: [
      { id: "10", title: "Letter to Researcher Group — Northern Europe contacts", date: "Mar 1968", type: "Letter", status: "under-review" as const },
      { id: "11", title: "Internal note — distribution method, second wave", date: "Sep 1968", type: "Internal note", status: "partial" as const },
      { id: "12", title: "Letter to new recipients — introduction sequence", date: "Feb 1969", type: "Letter", status: "verified" as const },
      { id: "13", title: "Letter: philosophical structure of correspondent language", date: "Jun 1969", type: "Letter", status: "translated" as const },
      { id: "14", title: "Internal note — study group formation, first meeting notes", date: "Nov 1969", type: "Internal note", status: "unverified" as const },
    ],
  },
  {
    date: "Dec 1970",
    type: "Academic interest",
    title: "First published linguistic analysis of the correspondent prefix system",
    description: "A researcher publishes analysis of the internal linguistic consistency of the correspondence.",
    eventCategory: "publication",
    image: {
      url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop&auto=format",
      alt: "Library reading room with warm lighting and tall bookshelves",
      caption: "The National Library reading room, where the first published analysis was circulated among researchers",
    },
    pullQuote: "The internal consistency of the linguistic prefix system is of a kind that would require sustained effort to fabricate across so many documents and recipients.",
    detail: "The linguistic analysis noted that the correspondent language system, used across hundreds of letters sent to different recipients who had no contact with each other, maintained perfect internal consistency. Critics argued this proved a single organised author; supporters argued it suggested authentic systematic communication. The debate was not resolved.",
  },
  {
    date: "Jun 1978",
    type: "Expert analysis",
    title: "Handwriting and typeface analysis commissioned",
    description: "An independent report attempts to establish whether the letters originate from one or multiple authors.",
    eventCategory: "legal",
    image: {
      url: "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&h=400&fit=crop&auto=format",
      alt: "Black typewriter with paper inserted",
      caption: "A model typewriter consistent with the mechanical profile identified in the analysis",
    },
    pullQuote: "We cannot conclude with certainty that all letters were produced by the same machine, nor that they were produced by different machines. The evidence admits both interpretations.",
    detail: "The commissioned report examined 43 letters and identified at least three distinct typeface profiles, suggesting either multiple typewriters or a single machine serviced or modified over time. The report was inconclusive and became itself a document of contention among researchers.",
  },
  {
    date: "Jul 1981",
    type: "Key interview",
    title: "Recorded interview with Researcher B",
    description: "The first recorded interview in which Researcher B discusses their knowledge of the correspondence sequence.",
    eventCategory: "response",
    image: {
      url: "https://images.unsplash.com/photo-1620334003852-dfb12c3be77b?w=800&h=400&fit=crop&auto=format",
      alt: "Vintage brown radio receiver",
      caption: "Period radio equipment of the kind used in the communications research community of the 1970s–80s",
    },
    pullQuote: "I knew more than I said for many years. I was not ready to say it, and I am not sure it would have been believed.",
    detail: "The Researcher B interview is the pivotal document of the later period. Researcher B, a psychologist, made claims in this interview that have since divided researchers sharply. They are treated as a key witness by some and as an unreliable narrator by others. The transcript is held at Archive A; the original recording has not been located.",
  },
  {
    date: "1993",
    type: "Disclosure",
    title: "Researcher C publishes account of the dossier's origins",
    description: "The account is widely circulated in the research community. Its claims remain disputed.",
    eventCategory: "publication",
    image: {
      url: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=800&h=400&fit=crop&auto=format",
      alt: "Brown paper and a black pen",
      caption: "Representative correspondence paper from the late period of the dossier, 1988–1993",
    },
    pullQuote: "Whatever the origin of these letters, they constitute one of the most sustained and internally consistent hoaxes or contacts of the twentieth century.",
    detail: "The Researcher C account was published as an online document — one of the earliest significant uses of digital distribution in correspondence research — and reached a far wider audience than previous analyses. Its claims about the dossier's authorship have not been independently confirmed. The document is classified here as Online account, Partial record.",
  },
];

// RELATED_ITEMS sidebar removed — related documents now live inside each expanded timeline node.
// See relatedItems field on each TimelineEvent in TIMELINE_EVENTS above.

export function TopicPage({ onNavigate, onSelectItem }: TopicPageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  // Get current theme from document to match atmosphere treatment
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div style={{ position: "relative" }}>
      {/* ── ATMOSPHERIC PLANET (outer gutter, opposite spine) ────────────── */}
      {/* Scaled + cropped hero image so ONE planet sits in far right margin, 
          never behind text column. Very low opacity, fades before reaching content. */}
      <div
        style={{
          position: "fixed",
          top: "20vh",
          right: "-10%",
          width: "35vw",
          height: "70vh",
          pointerEvents: "none",
          zIndex: 0,
          opacity: imgLoaded ? (isDark ? 0.10 : 0.06) : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <img
          src={bannerImg}
          alt=""
          aria-hidden
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "65% 45%", // Crop to show right planet/sphere
            filter: "blur(3px)",
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 80%)",
          }}
        />
      </div>

      {/* ── CONTENT (sits above atmospheric layer) ──────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20" style={{ position: "relative", zIndex: 1 }}>
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Topics", onClick: () => onNavigate("read") },
              { label: "The correspondence sequence" },
            ]}
          />
        </div>

        {/* Topic intro */}
        <div className="mb-10" style={{ paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
          <p
            className="uppercase tracking-widest mb-3"
            style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--accent)", letterSpacing: "0.12em" }}
          >
            Topic thread
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--foreground)",
              letterSpacing: "-0.015em",
              marginBottom: "1rem",
            }}
          >
            The correspondence sequence, 1965–1993
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: "58ch", marginBottom: "1.25rem" }}>
            The core correspondence sequence spans three decades and involves multiple recipients across several countries. This thread traces the primary sequence — not secondary analysis — from first contact to the 1993 disclosure period.
          </p>
          <TypeChipGroup types={["Letter", "Report", "Transcript", "Online account", "Commentary"]} />
        </div>

        {/* Single-column timeline — sidebar removed.
            Related documents per event live inside each expanded node. */}
        <div className="max-w-2xl">
          <SectionHeader
            kicker="Chronology"
            headline="When events appear"
            standfirst="Click any node to expand context and access related source records."
          />
          <Timeline events={TIMELINE_EVENTS} onSelectItem={onSelectItem} />
        </div>

        {/* FAQ */}
        <div className="mt-16 pt-10" style={{ borderTop: "1px solid var(--border)" }}>
          <SectionHeader
            kicker="Questions about this timeline"
            headline="Frequently asked"
            standfirst="Common questions about how to read the timeline and what it covers."
          />
          <Accordion
            multiOpen
            items={[
              {
                question: "What does each dot colour represent?",
                answer: "Dot colour indicates event category: amber dots are direct communications (letters received or sent), darker dots are organisational actions, teal dots mark publications and academic analysis, and muted dots indicate responses or disclosures from within the research community.",
              },
              {
                question: "Can I read the original source documents for each event?",
                answer: "Yes. Click any timeline node to expand it — the expanded panel includes a source link labelled with the holding institution. That link points to the external archive where the original or a facsimile is held. OON does not host source documents.",
              },
              {
                question: "Is this timeline complete?",
                answer: "No. The timeline covers the core documented events in the primary correspondence sequence. There are known gaps — particularly in the 1971–1977 period — where correspondence appears to have occurred but surviving copies have not been located in accessible archives. Known gaps are noted in the source index.",
              },
              {
                question: "Why does the timeline end in 1993?",
                answer: "1993 marks the last significant primary-source event in the documented correspondence sequence: Researcher C's disclosure account. Post-1993 material exists but is almost entirely secondary analysis and commentary, which is categorised separately and not included in this primary-sequence timeline.",
              },
              {
                question: "Can I filter the timeline by event type?",
                answer: "Not yet — timeline filtering is on the development roadmap. For now, use the Read section with type filters to browse documents by category, then cross-reference dates with the timeline nodes.",
              },
              {
                question: "How should I read the expanded panels?",
                answer: "Each expanded node shows: a contextual photograph (representative, not necessarily of the event itself), a pull quote from the associated document, a longer interpretive note, the related document types, and a direct source link. The pull quote is from the primary source; the interpretive note is OON editorial commentary and is marked as such.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}