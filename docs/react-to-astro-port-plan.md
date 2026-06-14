# React to Astro Port Plan

Date: 2026-06-14
Production base: `sosicivona/oon-website`
Visual reference: `sosicivona/oon-website-react-prototype`

## Decision

Astro is the production base. The React/Figma Make export is a visual and interaction reference only.

Do not copy generated source content, generated archive labels, generated dates, generated document references, generated claims, or generated source-status labels from the React export. Any future React use should be limited to small islands where client-side behavior is necessary.

## Constraints

- Keep the launch navigation as: Start, Read, Timeline, Sources.
- Keep the site static and compatible with GitHub Pages.
- Do not add a backend, database, authentication, private environment variables, or paid hosting dependency.
- Use UMMO for the dossier or subject.
- Use Oyagaa-Oomo Network or OON for the organization.
- Do not use UMMO/OOMO in public copy unless explaining naming variants.
- Keep source text, scan/archive reference, translation, summary, analysis, hypothesis, and OON interpretation separate.
- Use TODO placeholders when source data is missing.

## React Visual Patterns to Preserve

Preserve these patterns as design direction, not as direct code:

- Calm editorial reading-room posture: restrained surfaces, generous line height, hairline dividers, and source-first hierarchy.
- Full-width sticky top navigation with the launch nav only: Start, Read, Timeline, Sources.
- Hero image atmosphere from the OON banner, with legibility overlays and restrained motion only if it remains subtle.
- Sparse landing flow: one strong entry action, then a small set of route choices.
- Section header pattern: small optional kicker, meaningful headline, short standfirst.
- Navigation tile pattern for real routes only: title, short line, clear hover, trailing cue.
- List-row pattern for communication records: title, type, date/status placeholders, and provenance visibility.
- Distinct visual taxonomy for type chips, source-status labels, and filter controls.
- Timeline spine pattern for chronology, using expandable detail only when content is verified and model-backed.
- Source/provenance panels kept near document detail, not buried below interpretation.
- Quiet callout pattern for caveats, boundaries, and interpretation notes.
- Quote/excerpt visual treatment only after a quote or excerpt is source-verified.
- Footer with OON identity, support links, and source-first boundary language.

Avoid copying:

- React prototype generated sample content.
- Internal state-machine navigation.
- Full shadcn/Radix template folder.
- Remote Unsplash source-like imagery.
- Simulated audio/download/document behavior unless a real content need is defined.

## Page Mapping

| React prototype state | Astro production route | Port decision |
|---|---|---|
| Landing | `/` | Preserve visual hierarchy and sparse path selection. Do not copy generated counts or placeholder excerpt. |
| Start / Orientation | `/start-here/` | Map to Start. Preserve definition rows, entry paths, and FAQ pattern. Replace generated placeholders with governed SiteCopy and FAQ entries. |
| Read / Browse | `/read/` | Map to Read. Preserve browse/filter/list-row concepts. Build from CommunicationItem, Topic, ArchiveSource, and filter data later. |
| Item Detail | Future `/read/[slug]/` or `/communications/[slug]/` | Do not implement yet. Plan as a static detail page backed by CommunicationItem. |
| Topic | Future `/topics/[slug]/` or Read topic mode | Do not add to launch nav. Use Topic as a Read browse mode first. |
| Timeline | `/timeline/` | Preserve vertical chronology and event taxonomy. Build from TimelineEvent later. |
| Sources | `/sources/` | Preserve source-index/list-row idea. Build from ArchiveSource only after URLs and status notes are verified. |
| Style Reference | Internal documentation only | Do not make a public route. Convert relevant token decisions into Astro design-token docs/CSS. |

## Static Astro Components

These should become `.astro` components because they can render at build time with no client JavaScript:

- `BaseLayout`
- `Header`
- `Footer`
- `Section`
- `Hero`
- `SectionHeader`
- `NavTile`
- `DefinitionList`
- `LinkRow`
- `ItemRow`
- `TypeChip`
- `SourceStatusLabel`
- `Callout`
- `QuoteBlock`
- `Breadcrumb`
- `Timeline`
- `TimelineEvent`
- `ProvenancePanel`
- `SourceLayerPanel`
- `ArchiveSourceRow`
- `FAQList`
- `GlossaryList`
- `Pagination` if pagination is build-time/static

Keep these components small and content-model driven. If a component needs hardcoded content during early planning, use explicit TODO placeholders instead of source-like sample facts.

## Possible React Islands

Use React islands only when the interaction clearly needs client-side state and cannot be handled cleanly with HTML/CSS or a small Astro script.

Possible future islands:

- Search box with live filtering across local static data.
- Read filter bar with client-side type/topic/source filtering.
- Expandable inline reader for a communication list.
- Timeline node expansion if static details are too dense for plain links.
- Document viewer with page navigation and zoom, only after real scans or reading copies exist.
- Audio player, only after real audio assets and source rights are clear.
- Theme switcher, only if the site supports client-side dark/light switching rather than one static theme.

Prefer static Astro first. Add an island only after the content model and user need are clear.

## Dependencies Not to Carry Over

Do not carry over generated dependencies from the React export by default:

- `react-router`, because Astro pages provide real file-based routes.
- `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`.
- Full Radix/shadcn generated primitive set.
- `recharts`.
- `react-dnd` and `react-dnd-html5-backend`.
- `react-slick`.
- `react-responsive-masonry`.
- `canvas-confetti`.
- `next-themes`.
- `react-hook-form`.
- `react-day-picker`.
- `input-otp`.
- `vaul`.
- `cmdk`.
- `sonner`.
- `motion`, unless a specific, accessible interaction requires it.

Possible later additions, only with a specific need:

- `@astrojs/react` for selected React islands.
- A small icon solution if needed. Prefer inline SVG or a minimal icon import pattern instead of a large UI framework.
- Tailwind CSS if the project decides it improves maintainability. The current Astro repo can also continue with plain global CSS.

## Design Token Source

Create one Astro-side source of truth for design tokens, most likely `src/styles/global.css` or a dedicated `src/styles/tokens.css` imported once by `global.css`.

Use the React design handoff as guidance:

- Light theme, "Meridian": warm paper base, ink text, muted secondary text, hairline dividers.
- Dark theme, "Solstice": deep base, light ink, muted secondary text, subtle dividers.
- One cool slate-blue interaction accent.
- Warm colors reserved for atmosphere and status treatment, not primary controls.
- Status label colors reserved for source-status labels only.
- Type chips remain neutral.
- Filter controls use the interaction accent because they are controls.
- Focus ring uses the accent ring token.
- Background atmosphere should be faint radial glows, not a saturated page-wide wash.

Recommended token groups:

- Surface: `--bg-base`, `--bg-surface`, `--bg-elevated`.
- Text: `--ink`, `--ink-muted`.
- Lines: `--hairline`.
- Accent: `--accent`, `--accent-fill`, `--accent-on-fill`, `--accent-tint`, `--accent-ring`.
- Atmosphere: `--glow-warm`, `--glow-violet`.
- Status label styling: token names only until approved source-status values exist.
- Type scale: display, page title, section title, body, caption, eyebrow.
- Spacing: page gutter, section padding, row padding, grid gap.
- Radius: keep small, generally 2px to 4px.

Do not keep duplicate token definitions in page files, component files, and theme switcher code. The Astro CSS token file should own the values.

## Content Source Approach

Astro should eventually read content from structured Markdown, JSON, or Astro content collections.

Recommended direction:

- Start with schema files and placeholder entries in `src/content` or `content`.
- Keep content separate from components.
- Use slugs for website routing, not source document IDs.
- Keep source references in dedicated fields, not in titles or prose.
- Require TODO placeholders for missing source dates, archive links, translation status, and source references.
- Validate content before public release with a source-safety checklist.

## Phased Implementation Order

### Phase 1: Planning Documents

- Add this port plan.
- Add the shared content model plan.
- Do not change public pages yet.

### Phase 2: Token Consolidation

- Compare current `src/styles/global.css` with the React design handoff.
- Define one Astro token source.
- Preserve the current working Astro scaffold.
- Do not change public copy while consolidating tokens.

### Phase 3: Component Inventory

- Create static Astro component names and responsibilities.
- Map existing components to planned components.
- Separate navigational components from informational components so non-clickable cards do not look like routes.

### Phase 4: Content Schema Draft

- Add content collections or JSON schemas for CommunicationItem, Topic, TimelineEvent, ArchiveSource, FAQ, GlossaryTerm, and SiteCopy.
- Use generic placeholder entries only.
- Add validation notes for source-safety fields.

### Phase 5: Launch Route Rebuild

- Rebuild the launch routes in this order: Start, Read, Timeline, Sources, then Home.
- Keep launch nav unchanged.
- Use placeholder content only where source data is not ready.
- Do not add item-detail or topic-detail routes until the model is stable.

### Phase 6: Optional Interaction Islands

- Add React only for specific behaviors that static Astro cannot comfortably handle.
- Start with search or filters if the content volume justifies it.
- Keep islands small and isolated.

### Phase 7: Source-Verified Content Integration

- Add real UMMO content only after source references, archive paths, translation status, and interpretation boundaries are verified.
- Review content changes separately from visual/code changes.
- Keep every source claim traceable.

## Open Decisions

- Whether to use Tailwind CSS or continue with plain Astro CSS.
- Whether dark/light theme switching is needed for launch.
- Final route pattern for communication detail pages.
- Whether Topic becomes a route, a Read filter, or both.
- Approved source-status vocabulary and review workflow.
- Where structured content should live: Astro content collections, JSON files, or Markdown files with frontmatter.
