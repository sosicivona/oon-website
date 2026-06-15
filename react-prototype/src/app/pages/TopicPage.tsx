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

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: "Date pending",
    type: "Review step",
    title: "Sequence point pending review",
    description: "This timeline position will be populated from the approved corpus inventory.",
    eventCategory: "communication",
    detail: "Date, source path, and event description pending source verification.",
  },
  {
    date: "Date pending",
    type: "Source path",
    title: "Source continuity point pending review",
    description: "This node demonstrates how a reviewed source event will expand in place.",
    eventCategory: "communication",
    detail: "Related item links and excerpts are withheld until approved source records are available.",
  },
  {
    date: "Date pending",
    type: "Context point",
    title: "Context note pending copy approval",
    description: "This position is reserved for reviewed context, not generated chronology.",
    eventCategory: "action",
    detail: "Context copy will come from the approved copy workflow or remain a TODO placeholder.",
  },
  {
    date: "Date pending",
    type: "Archive reference",
    title: "Archive reference pending verification",
    description: "This node marks where an external source trail may appear once verified.",
    eventCategory: "publication",
    detail: "Archive names, URLs, captions, and holding details are pending verification.",
  },
];

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
              { label: "Timeline pending review" },
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
            Timeline pending source review
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: "58ch", marginBottom: "1.25rem" }}>
            This page preserves the V3 timeline structure while source dates, event labels, related items, and archive paths are reviewed.
          </p>
          <TypeChipGroup types={["Communication item", "Source path", "Context note", "Archive reference"]} />
        </div>

        {/* Single-column timeline — sidebar removed.
            Related documents per event live inside each expanded node. */}
        <div className="max-w-2xl">
          <SectionHeader
            kicker="Chronology"
            headline="Sequence shell"
            standfirst="Click any node to preview the timeline interaction. Source records are intentionally withheld until approved."
          />
          <Timeline events={TIMELINE_EVENTS} onSelectItem={onSelectItem} />
        </div>

        {/* FAQ */}
        <div className="mt-16 pt-10" style={{ borderTop: "1px solid var(--border)" }}>
          <SectionHeader
            kicker="Questions about this timeline"
            headline="Frequently asked"
            standfirst="Common questions about how this shell should be read before source data is populated."
          />
          <Accordion
            multiOpen
            items={[
              {
                question: "What does each dot colour represent?",
                answer: "Dot colour indicates interface category only. Final category labels will be populated from the approved corpus inventory.",
              },
              {
                question: "Can I read the original source documents for each event?",
                answer: "Not yet. Source links remain pending until archive paths, rights notes, and copy have been reviewed.",
              },
              {
                question: "Is this timeline complete?",
                answer: "No completeness claim is made in this prototype. The timeline is a visual shell.",
              },
              {
                question: "Where will final dates come from?",
                answer: "Dates will come from the approved corpus inventory or remain marked as pending.",
              },
              {
                question: "Can I filter the timeline by event type?",
                answer: "Not yet. Timeline filtering should wait until source categories and page-level copy are approved.",
              },
              {
                question: "How should I read the expanded panels?",
                answer: "Expanded panels demonstrate the interaction pattern only. Quotes, images, related records, and source links are intentionally absent until verified material is available.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
