import { SectionHeader } from "../components/SectionHeader";
import { LinkRow } from "../components/LinkRow";
import { DefinitionList } from "../components/DefinitionList";
import { useState } from "react";
import bannerImg from "../../imports/OON_banner_V3.jpg";

const ARCHIVES = [
  {
    name: "Archive source pending verification",
    type: "Archive reference",
    description: "Holding details will be added from the approved corpus inventory.",
  },
  {
    name: "Source path pending review",
    type: "Source path",
    description: "External archive URL, access note, and rights status pending verification.",
  },
  {
    name: "Translation source pending verification",
    type: "Translation reference",
    description: "Translation attribution and source relationship pending review.",
  },
  {
    name: "Context source pending approval",
    type: "Context reference",
    description: "Secondary or editorial context will remain separate from source material.",
  },
];

const STATUS_VOCAB = [
  { term: "Archive reference", description: "A pending row for an external holding location. No institution name is shown until verified." },
  { term: "Source path", description: "A pending path from an OON item back to source material or an external archive." },
  { term: "Translation reference", description: "A pending attribution path for translation material." },
  { term: "Context reference", description: "A pending row for analysis, summary, or OON interpretation sources." },
];

export function SourcesPage() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div style={{ position: "relative" }}>
      {/* ── ATMOSPHERIC PLANET (behind header only, fades before list) ────── */}
      {/* Faint planet behind page HEADER only, clear of the archive list for legibility */}
      <div
        style={{
          position: "absolute",
          top: "-5vh",
          left: "-12%",
          width: "40vw",
          height: "50vh",
          pointerEvents: "none",
          zIndex: 0,
          opacity: imgLoaded ? (isDark ? 0.08 : 0.05) : 0,
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
            objectPosition: "35% 55%", // Crop to show left planet/curve
            filter: "blur(4px)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── CONTENT (sits above atmospheric layer) ──────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-20" style={{ position: "relative", zIndex: 1 }}>
        <p
          className="uppercase tracking-widest mb-3"
          style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--accent)", letterSpacing: "0.12em" }}
        >
          Sources
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
          External archives and sources
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", lineHeight: 1.75, marginBottom: "3rem", maxWidth: "58ch" }}>
          OON does not act as the archive or source. This page will list external source paths after archive names, URLs, and access notes are verified.
        </p>

        {/* Archive list */}
        <SectionHeader kicker="Archive index" headline="Source paths pending review" />
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {ARCHIVES.map((archive) => (
            <LinkRow
              key={archive.name}
              name={archive.name}
              type={archive.type}
              description={archive.description}
            />
          ))}
        </div>

        {/* Status vocabulary */}
        <div className="mt-14">
          <SectionHeader
            kicker="Vocabulary"
            headline="Type label definitions"
            standfirst="Each pending source row carries a neutral type label until approved inventory data is available."
          />
          <DefinitionList items={STATUS_VOCAB} />
        </div>

        {/* Access note */}
        <div
          className="p-5 mt-12"
          style={{
            background: "var(--bg-surface, var(--card))",
            // Hero-card inset edges for box character
            boxShadow: [
              "inset 0 1px 0 color-mix(in srgb, var(--accent) 18%, transparent)",
              "inset 1px 0 0 color-mix(in srgb, var(--accent) 18%, transparent)",
            ].join(", "),
          }}
        >
          <p
            className="uppercase tracking-widest mb-2"
            style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}
          >
            Access note
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--foreground)", lineHeight: 1.75 }}>
            Archive access notes will be added after source and rights review. Until then, source rows remain placeholders and do not represent verified institutions or available links.
          </p>
        </div>
      </div>
    </div>
  );
}
