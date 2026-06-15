import { SectionHeader } from "../components/SectionHeader";
import { LinkRow } from "../components/LinkRow";
import { DefinitionList } from "../components/DefinitionList";
import { SourceQuote } from "../components/SourceQuote";
import { useState } from "react";
import bannerImg from "../../imports/OON_banner_V3.jpg";

// ⚠ PLACEHOLDER CONTENT — Archive names and descriptions below are invented.
// Replace with real holding institutions, access information, and URLs before release.
const ARCHIVES = [
  {
    name: "Archive A",
    type: "Primary archive",
    description: "Holds the largest verified collection of original correspondence. Digital facsimile access available on request.",
  },
  {
    name: "Archive B",
    type: "Primary archive",
    description: "Secondary collection of photocopied letters and recipient correspondence from the 1968–1975 period.",
  },
  {
    name: "National Library",
    type: "Institutional",
    description: "Holds several published analyses and the Researcher C 1993 monograph. Catalogue searchable online.",
  },
  {
    name: "Reference Archive (USA)",
    type: "Reference",
    description: "Holds translated English versions of select letters. Provenance of translations documented separately.",
  },
  {
    name: "Reference Collection (UK)",
    type: "Reference",
    description: "Press clippings, secondary accounts, and investigative correspondence from the 1970s British reception.",
  },
  {
    name: "Research Network (private)",
    type: "Discussion",
    description: "An ongoing research collective. Accessible via application. Primary focus: linguistic and technical analysis.",
  },
  {
    name: "Institutional Collection",
    type: "Institutional",
    description: "Institutional records relevant to the 1968–1969 period. Access via formal request.",
  },
  {
    name: "Digital Archive — correspondence collection",
    type: "Reference",
    description: "Digitised secondary and tertiary material. Reliability varies; provenance must be checked against primary archives.",
  },
];

const STATUS_VOCAB = [
  { term: "Primary archive", description: "An institutional collection holding original or verified facsimile copies of source documents." },
  { term: "Reference", description: "A collection that holds secondary or tertiary material, including translations, analyses, and press records." },
  { term: "Discussion", description: "A research network or community that produces ongoing analysis. Not a holding institution." },
  { term: "Institutional", description: "A formal public institution whose holdings are relevant but not exclusively focused on this corpus." },
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
          OON does not host source material. Every item in the archive links to its holding institution. The list below covers all external archives, reference collections, and research bodies cited in the corpus.
        </p>

        {/* Archive list */}
        <SectionHeader kicker="Archive index" headline="Holding institutions and reference collections" />
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
            standfirst="Each archive or source carries one of four type labels. Here is what each label means."
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
            Several of the primary archives require formal requests or institutional affiliation for access to original documents. OON can provide a reference letter confirming research purpose. Contact the editorial team via the address on file.
          </p>
        </div>
      </div>
    </div>
  );
}