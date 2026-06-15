Design a component library and key page layouts for a calm, editorial, reading-first web
interface that helps people explore a large archive of mixed primary-source material.

Product context (generic):
The site is an "intelligibility layer" on top of a big collection of historical documents
of several kinds — letters, reports, transcripts of calls, internal notes, later online
posts/accounts, and contextual commentary. The real archives live elsewhere; this site
helps people enter the material, browse it by topic / time period / type, follow a thread
across items, and trace every item back to its original source. The tone is neutral and
non-judgmental — it presents material and provenance, it does not argue a verdict. Think
of a cross between a museum reading room, a well-made documentary archive, and a clean
digital library.

Design direction:
- Editorial and typographic. A serif display face for headlines, a clean sans for body
  and UI. Generous line-height and reading measure.
- Warm, paper-like light background; restrained palette with one accent; full dark-mode
  variant.
- Flat and quiet: thin hairline dividers, subtle borders, minimal shadow, no gradients.
- Source transparency is a first-class visual idea: provenance, status, and "where this
  points back to" should always be visible, never buried.
- Critically: do NOT use one repeated card for everything. Each kind of content should
  have a visually distinct component so the eye instantly knows what it is and whether it
  can be clicked.

Design these components, each with default + hover/active + (where relevant) empty and
dark-mode states:

NAVIGATION & CHROME
1. Top navigation bar — wordmark/brand left, 4–5 primary links right, full-bleed band,
   sticky variant. Mobile menu.
2. Footer — brand + short description, one grouped set of secondary links, no duplication
   of the top nav.
3. Breadcrumb — small, plain, for parent/child pages (e.g. "Section / Subsection").

ENTRY & WAYFINDING
4. Hero / landing intro — a large editorial headline, a short standfirst, one dominant
   primary call-to-action, optional muted background image with a legible overlay. Must
   center and adapt cleanly across viewport widths without clipping the headline.
5. Section header pattern — an OPTIONAL small kicker/eyebrow, a plain large headline that
   states what the section is, and an optional one-line standfirst. The headline (not the
   kicker) carries the meaning.
6. Navigation tile — the ONE bordered, clearly-tappable card. Bold title, one short line,
   trailing arrow, obvious hover. Used only for things that route somewhere. Lay out in
   rows of up to three, equal height.

CONTENT COMPONENTS (these must look different from the nav tile and from each other)
7. Definition list — a set of term + description pairs with hairline dividers and NO boxes,
   for labels/taxonomies that are not links (e.g. material types, principles, status
   vocabulary). Stacked and two-column variants.
8. Link row — a list row for an external source/archive or channel: name, a small type
   pill (e.g. "Primary archive", "Reference", "Discussion"), trailing external-link icon.
   Rows separated by hairlines. Distinct from a tile because it's a row, not a block.
9. Item row — a row representing a single source document in a list: title, date, a
   type tag, a source-status badge, optional chevron. This is the workhorse for browsing
   real material. Include a loading/skeleton state and a dense vs comfortable variant.
10. Timeline / chronology — a single vertical spine with nodes down it in chronological
    order. Each node: a colored dot (color = event type), a small event-type pill, a
    date/period label, a title, one line of description. Must read as time, not as a grid.
11. Accordion (FAQ / Q&A) — full-width question rows with a chevron that expand to reveal
    an answer; hairline dividers; one-open and multi-open variants.
12. Callout / note block — a quiet boxed aside for context notes, caveats, or
    "interpretation boundary" notes, visually separated from primary source text.
13. Quote / excerpt block — for showing a short passage of source text with attribution
    and a link back to the full item.

STATUS, TAGS & FILTERS
14. Status badge / pill — small labels for provenance/processing state, e.g. "Verified
    source", "Under review", "Unverified", "Original language", "Translated". Provide a
    color-coded set that also works without relying on color alone.
15. Type/category chip — small chips for material type and topic tags; selectable variant.
16. Filter / browse bar — a segmented control to switch browse mode (by topic / by period
    / by type), plus filter chips and a sort control. Sticky variant. Mobile collapse.
17. Search — a search input with placeholder, a results list built from item rows, result
    count, and a "no results" empty state.
18. Pagination / load-more.

KEY PAGE LAYOUTS (assemble from the components above)
19. Landing / home — hero + one primary CTA + a slim row of navigation tiles. Deliberately
    sparse; it is a hook, not a copy of the whole site.
20. Orientation page — "what this is", "how to enter the material", and a small FAQ
    accordion.
21. Browse page — the filter/browse bar + a list of item rows (the main reading surface).
22. Item / reader detail page — the most important layout. For a single source document:
    title, date, type, source-status badge, language/translation status, a clear
    "view in original archive" link, a context-note callout, the document body/excerpt,
    an interpretation-boundary note kept visually separate from the source text, and a
    "related items" list at the bottom. Keep provenance visible at the top throughout.
23. Topic / thread page — a topic intro, a short timeline of when the topic appears, and
    a list of related item rows.
24. Source/archive index page — a list of external archives as link rows with type pills.
25. Empty / placeholder states for any list before content exists.

Deliver a cohesive design system: type scale, color tokens (light + dark), spacing scale,
and the components and pages above, all sharing one visual language. Prioritize legibility,
calm hierarchy, clear clickable-vs-inert affordances, and always-visible provenance.