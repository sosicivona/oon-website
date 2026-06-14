# UI to Content Mapping Audit

Date: 2026-06-14
Production repo: `sosicivona/oon-website`
Visual reference repo: `sosicivona/oon-website-react-prototype`
Source-of-truth sheet inspected: `04 Ummo Website — Corpus Inventory Schema`

## Scope

This is a mapping plan only.

No pages were implemented, redesigned, rewritten, populated with real corpus content, or deployed.

The current Astro site is an older reading-first beta. The React/Figma Make export is a visual reference, not production code. The Google Sheet is the source-of-truth planning/content model for corpus inventory fields and UI visibility.

## Spreadsheet Context Used

The sheet includes these relevant tabs:

- `README`
- `Corpus Inventory`
- `Status Values`
- `UI Mapping`

Important sheet rules:

- Public UI should show plain-language labels first, with canonical references nearby.
- Inherited source-site classifications must not be erased.
- OON status is separate from source-site classification.
- Conflicts and uncertainty should be shown cautiously, not hidden.

Key `Corpus Inventory` fields used for UI mapping:

- `record_id`
- `canonical_reference`
- `reference_family`
- `user_friendly_category`
- `category_explainer`
- `period_label`
- `source_material_type`
- `source_text_status`
- `source_site_primary`
- `source_url_primary`
- `archive_locations`
- `source_site_reference`
- `original_language`
- `translation_languages`
- `translation_status`
- `title_or_short_label`
- `source_date`
- `date_certainty`
- `recipient_or_group`
- `author_attribution_claim`
- `formats_available`
- `facsimile_available`
- `local_reader_status`
- `local_excerpt_status`
- `brief_summary_source`
- `brief_summary_oon`
- `topic_tags`
- `related_references`
- `evidence_candidate`
- `counterargument_tags`
- `source_site_classification`
- `OON_source_status`
- `confidence_level`
- `contamination_risk`
- `publication_status`
- `website_destination`
- `quote_candidate`
- `rights_reuse_status`
- `extraction_status`
- `review_owner`
- `review_date`
- `notes`
- `last_updated`
- `sort_order`
- `display_title_en`
- `display_title_fr`
- `display_title_es`
- `english_summary_status`
- `english_summary_source`
- `english_full_text_status`
- `english_source_url`
- `english_translation_type`
- `english_translation_basis`
- `ai_translation_status`
- `ai_translation_review_status`
- `public_translation_label`
- `translation_content_location`
- `translation_notes`

Status/value fields from `Status Values` should be treated as controlled vocabularies, not improvised UI labels.

## Current Astro Pages

Current public and support pages:

- `/` from `src/pages/index.astro`
- `/start-here/` from `src/pages/start-here.astro`
- `/read/` from `src/pages/read.astro`
- `/timeline/` from `src/pages/timeline.astro`
- `/sources/` from `src/pages/sources.astro`
- `/themes/` from `src/pages/themes.astro`
- `/evidence-questions/` from `src/pages/evidence-questions.astro`
- `/source-continuity/` from `src/pages/source-continuity.astro`
- `/watch/` from `src/pages/watch.astro`
- `/about/` from `src/pages/about.astro`

Launch navigation should remain:

- Start
- Read
- Timeline
- Sources

Support routes can remain outside the launch nav while the content model matures.

## Current Astro Components

Existing components:

- `BaseLayout.astro`
- `Header.astro`
- `Footer.astro`
- `Section.astro`
- `ThemeCard.astro`
- `SourceBadge.astro`

Current CSS:

- `src/styles/global.css`

Current component assessment:

| Existing Astro component | Keep / replace / rename | Reason |
|---|---|---|
| `BaseLayout.astro` | Keep | Good production shell for metadata, header, footer, skip link, and global CSS. |
| `Header.astro` | Keep, refine later | Already has real Astro links and correct launch nav. Later visual work should align it with the Figma Make top nav. |
| `Footer.astro` | Keep, refine later | Useful OON/support footer. Later should use governed support links and source-first boundary language. |
| `Section.astro` | Keep | Good static section primitive. Can absorb the Figma section header pattern. |
| `ThemeCard.astro` | Rename or split | It currently serves both navigational and informational cards. Split into `NavTile.astro` for routes and `InfoPanel.astro` or `DefinitionCard.astro` for non-clickable content. |
| `SourceBadge.astro` | Replace or rename | Current name is too narrow. Replace with `SourceStatusNote.astro`, `SourceBoundaryNote.astro`, or `SourceLayerPanel.astro` depending on use. |

## Missing Figma Make Visual Patterns in Astro

The current Astro beta has a calmer reading-first direction, but it does not yet include many of the Figma Make visual systems:

- Dark/light token parity from the React prototype.
- Single cool slate-blue interaction accent.
- Clear distinction between type chips, source-status labels, and filter controls.
- Read list rows with date/reference/title/type/status/action structure.
- Inline/expandable source detail treatment for a selected item.
- Source/provenance panel near reader detail.
- Link-row pattern for source/archive rows.
- Timeline spine with dot, event type, date, title, and expandable detail.
- FAQ accordion.
- Definition list rows for glossary/orientation material.
- Breadcrumb pattern.
- Callout pattern for caveats and interpretation boundaries.
- Quote/excerpt block that is visually distinct from summary or analysis.
- Filter bar with browse mode, type filters, sort, and result count.
- Language availability tags or controls.
- Neutral type chips with icon support.
- Status/source labels tied to controlled field values.
- Dedicated internal style reference as documentation, not a public page.

## Figma Make Components to Port as Static Astro

These should be ported as static `.astro` components first:

| Figma Make component | Astro component target | Sheet/content fields |
|---|---|---|
| `TopNav` | Existing `Header.astro` | SiteCopy/nav config only. Keep Start, Read, Timeline, Sources. |
| `Footer` | Existing `Footer.astro` | SiteCopy/support links. Do not include source claims. |
| `PageShell` | Existing `BaseLayout.astro` + `Section.astro` | Page metadata and static slots. |
| `SectionHeader` | Fold into `Section.astro` or create `SectionHeader.astro` | SiteCopy headings and ledes. |
| `NavTile` | `NavTile.astro` | SiteCopy route title, route description, href. |
| `DefinitionList` | `DefinitionList.astro` | GlossaryTerm or SiteCopy; category explainers from `category_explainer` only when reviewed. |
| `LinkRow` | `ArchiveSourceRow.astro` | `source_site_primary`, `source_url_primary`, `archive_locations`, `source_site_classification`, URL status fields. |
| `ItemRow` | `CommunicationItemRow.astro` | `display_title_en`, `canonical_reference`, `user_friendly_category`, `source_date`, `date_certainty`, `translation_languages`, `publication_status`. |
| `StatusBadge` | `SourceStatusLabel.astro` | `source_text_status`, `translation_status`, `OON_source_status`, `publication_status`, `local_excerpt_status`; only approved vocab values. |
| `TypeChip` | `TypeChip.astro` | `user_friendly_category`, `source_material_type`, `topic_tags`; type chips stay neutral. |
| `Breadcrumb` | `Breadcrumb.astro` | Route hierarchy and current page title. |
| `Callout` | `BoundaryCallout.astro` | SiteCopy, `notes`, source-safety warnings, interpretation boundaries. |
| `QuoteBlock` | `ExcerptBlock.astro` | `quote_candidate`, `local_excerpt_status`, `rights_reuse_status`; only after review. |
| `Timeline` | `TimelineSpine.astro` | `period_label`, `source_date`, `date_certainty`, `website_destination`, `topic_tags`, reviewed timeline event records. |
| `Accordion` | `FAQAccordion.astro` or HTML `details` component | FAQ content; no corpus facts unless source-linked. |
| `FilterBar` visual pattern | `ReadFilterSummary.astro` initially | `user_friendly_category`, `period_label`, `source_material_type`, `translation_languages`, `topic_tags`. |

## Components That May Later Become React Islands

Only use React islands for client-side state that materially improves the reading experience.

| Possible island | Use only when | Sheet/content fields |
|---|---|---|
| Search | There is enough approved content to search locally. | `display_title_en`, `canonical_reference`, `topic_tags`, `brief_summary_oon`, `user_friendly_category`. |
| Read filter bar | Filtering static lists becomes useful. | `user_friendly_category`, `period_label`, `source_material_type`, `translation_languages`, `publication_status`, `website_destination`. |
| Inline reader expansion | Readers need preview panels without leaving `/read/`. | `brief_summary_oon`, `source_url_primary`, `formats_available`, `facsimile_available`, review/status fields. |
| Timeline expansion | The timeline needs open/close panels with source-linked detail. | Timeline records plus `date_certainty`, `sourceReferences`, `related_references`. |
| Document viewer | Real scans or approved reading copies exist. | `facsimile_available`, `formats_available`, `translation_content_location`, `rights_reuse_status`. |
| Audio player | Real audio assets and rights are confirmed. | Future audio fields, `formats_available`, rights/status fields. |
| Theme switcher | Dark/light runtime switching is approved. | Theme token state only, not corpus data. |

## UI Element to Spreadsheet Field Mapping

### Home Hero

Purpose:

- Orient the visitor.
- Route to Start or Read without overloading them with corpus detail.

Fields:

- Usually SiteCopy, not direct corpus rows.
- If showing corpus-derived counts, quotes, or examples later, require `publication_status`, `quote_candidate`, `local_excerpt_status`, `rights_reuse_status`, and source review.

Do not populate until source review:

- Corpus counts.
- Quotes/excerpts.
- "Featured" communication references.
- Archive claims.
- Any date range or historical claim derived from corpus rows.

### Start Orientation Page

Purpose:

- Explain what the site is, what the corpus is, and how to begin.

Fields:

- SiteCopy for page headings and explanatory text.
- FAQ for high-friction questions.
- GlossaryTerm for terms such as dossier, corpus, source text, translation, analysis, hypothesis, OON interpretation.
- `user_friendly_category` and `category_explainer` for material-type explanations once reviewed.

Do not populate until source review:

- Specific document examples.
- Claims about why the dossier matters.
- Researcher names or authorship discussions unless governed and sourced.

### Read List Rows / Cards

Purpose:

- Let readers scan source records without confusing provenance, translation, and interpretation.

Fields:

- `display_title_en` as main title when approved.
- `title_or_short_label` as fallback only if display title is not ready.
- `canonical_reference` as secondary reference.
- `user_friendly_category` as primary type label.
- `category_explainer` as tooltip/detail text.
- `source_date` plus `date_certainty`.
- `translation_languages`.
- `translation_status`.
- `formats_available`.
- `facsimile_available`.
- `local_reader_status`.
- `publication_status`.
- `website_destination`.

Do not populate until source review:

- `brief_summary_oon` on card front.
- `quote_candidate`.
- "Read onsite" action if `local_reader_status` is not approved.
- "View scan" action if `facsimile_available` is not verified.
- Any status label not in `Status Values`.

### Source / Provenance Panel

Purpose:

- Show where the item points back, what language layer is being read, and what remains unresolved.

Fields:

- `canonical_reference`
- `reference_family`
- `category_explainer`
- `source_site_primary`
- `source_url_primary`
- `archive_locations`
- `source_site_reference`
- `source_site_classification`
- `original_language`
- `translation_languages`
- `translation_status`
- `english_translation_type`
- `english_translation_basis`
- `public_translation_label`
- `source_text_status`
- `OON_source_status`
- `confidence_level`
- `contamination_risk`
- `notes`

Do not populate until source review:

- Archive links.
- Translation claims.
- OON source assessment.
- Confidence and contamination labels on public-facing pages.
- Anything that reads as provenance certainty when the sheet says uncertain, unknown, pending, or not assessed.

### Timeline Spine

Purpose:

- Show chronology without resolving origin, authorship, or interpretation questions.

Fields:

- `period_label`
- `source_date`
- `date_certainty`
- `canonical_reference`
- `display_title_en`
- `user_friendly_category`
- `topic_tags`
- `related_references`
- `website_destination`
- `publication_status`
- `notes`

Do not populate until source review:

- Exact dates when `date_certainty` is uncertain.
- Timeline ordering when `sort_order` or reviewed timeline data is not stable.
- Event summaries that imply historical certainty.
- Pull quotes.
- Counts or relationship claims.

### Sources Rows

Purpose:

- Show source/archive paths and external references without implying OON ownership or endorsement.

Fields:

- `source_site_primary`
- `source_url_primary`
- `archive_locations`
- `source_site_reference`
- `source_site_classification`
- `formats_available`
- `facsimile_available`
- `source_url_primary` verification status from editorial review or URL status fields.

Do not populate until source review:

- Archive descriptions.
- Access notes.
- Claims about holdings.
- "Primary" or "official" labels unless governance approves them.
- External links that have not been verified.

### FAQ Accordion

Purpose:

- Handle high-friction questions in context.

Fields:

- FAQ model entries.
- Related `canonical_reference`, `topic_tags`, `counterargument_tags`, `sourceSafetyNotes` only when source-linked.
- `OON_source_status`, `confidence_level`, and `contamination_risk` may inform internal drafting, but should not become public claims by default.

Do not populate until source review:

- Answers about authorship, origin, predictions, science claims, or sensitive topics.
- Researcher motives.
- Any source claim not backed by source references.

### Type Chips

Purpose:

- Identify material type or topic without implying source status.

Fields:

- `user_friendly_category`
- `source_material_type`
- `topic_tags`

Rules:

- Neutral visual treatment.
- No semantic status color.
- If selectable in filters, selected state may use interaction accent.

Do not populate until source review:

- Topic chips derived from unreviewed `topic_tags`.
- Any chip label not aligned with controlled vocabulary or editorial taxonomy.

### Status / Source Labels

Purpose:

- Show the source or workflow state without blending it with material type.

Fields:

- `source_text_status`
- `translation_status`
- `OON_source_status`
- `confidence_level`
- `contamination_risk`
- `publication_status`
- `local_reader_status`
- `local_excerpt_status`
- `rights_reuse_status`
- `extraction_status`
- `english_full_text_status`
- `ai_translation_review_status`
- `public_translation_label`

Rules:

- Use controlled values from `Status Values`.
- Separate internal workflow labels from public labels.
- Do not display research confidence as belief or proof.
- Do not overload item cards with all statuses.

Do not populate until source review:

- Public status labels for contested source questions.
- Confidence labels.
- Contamination risk labels.
- Any label that could look like proof of origin.

### Nav Tiles

Purpose:

- Route readers to stable pages.

Fields:

- SiteCopy route labels and route descriptions.
- `website_destination` may help future grouping, but should not directly create nav labels.

Rules:

- Use only for real links.
- Non-clickable information should use a different component.

### Theme Tokens

Purpose:

- Provide one design-token source for the Astro site.

Fields:

- No spreadsheet fields.
- Uses visual design decisions from the React prototype.

Port from React:

- `--bg-base`
- `--bg-surface`
- `--bg-elevated`
- `--ink`
- `--ink-muted`
- `--hairline`
- `--accent`
- `--accent-fill`
- `--accent-on-fill`
- `--accent-tint`
- `--accent-ring`
- `--glow-warm`
- `--glow-violet`

Do not keep:

- Multiple token sources across CSS, components, and style-reference pages.
- Saturated page-wide washes.
- Warm colors on interactive controls.

## UI Elements That Must Wait for Source Review

Do not populate these until the relevant sheet fields are reviewed and approved:

- Any source quote or excerpt.
- Any full source text.
- Any translation text.
- Any source date with unresolved `date_certainty`.
- Any archive/source URL.
- Any "view scan" action.
- Any "read onsite" action.
- Any OON source-status or confidence label.
- Any claim summary in `brief_summary_oon`.
- Any evidence/counterargument label.
- Any timeline event that implies historical certainty.
- Any homepage corpus statistic or featured item.
- Any source/provenance statement not backed by sheet fields.

## Keep / Replace / Rename Summary

Keep:

- `BaseLayout.astro`
- `Header.astro`
- `Footer.astro`
- `Section.astro`

Replace or split:

- `ThemeCard.astro` into:
  - `NavTile.astro` for real routes.
  - `InfoPanel.astro` or `DefinitionCard.astro` for static explanation.

Rename or replace:

- `SourceBadge.astro` into one or more of:
  - `SourceStatusNote.astro`
  - `SourceBoundaryNote.astro`
  - `SourceLayerPanel.astro`
  - `ProvenancePanel.astro`

Add later:

- `CommunicationItemRow.astro`
- `ArchiveSourceRow.astro`
- `TypeChip.astro`
- `SourceStatusLabel.astro`
- `FAQAccordion.astro`
- `DefinitionList.astro`
- `TimelineSpine.astro`
- `TimelineEvent.astro`
- `ExcerptBlock.astro`
- `BoundaryCallout.astro`
- `Breadcrumb.astro`

## Phased Port Order

### Phase 1: Component Semantics

- Split navigational tiles from informational cards.
- Keep existing pages visually stable.
- Do not add real corpus content.

### Phase 2: Theme Tokens

- Consolidate Astro tokens in one CSS source.
- Bring over the React token logic: paper/ink surfaces, slate-blue accent, subtle hairlines, neutral chips, status-only semantic colors.
- Keep public copy unchanged.

### Phase 3: Static Visual Components

- Add static Astro versions of NavTile, DefinitionList, TypeChip, SourceStatusLabel, ArchiveSourceRow, CommunicationItemRow, BoundaryCallout, and ExcerptBlock.
- Use generic placeholders or existing beta copy only.

### Phase 4: Spreadsheet-Backed Content Shape

- Draft content schemas against the sheet fields.
- Map `Corpus Inventory` rows to internal content objects.
- Keep `publication_status`, `local_reader_status`, `rights_reuse_status`, and review fields as publishing gates.

### Phase 5: Page-by-Page Visual Port

- Start page: orientation definitions and FAQ pattern.
- Read page: list row pattern and browse/filter structure.
- Timeline page: static timeline spine.
- Sources page: source rows and source-status explanation.
- Home page: hero and route-choice pattern.

### Phase 6: Optional Islands

- Add React islands only if needed for search, filtering, expansion, document viewing, audio, or theme switching.
- Keep islands small and backed by approved static data.

### Phase 7: Source-Reviewed Content

- Add real UMMO corpus content only in small reviewed batches.
- Keep source text, translation, summary, analysis, hypothesis, and OON interpretation separate in UI and data.
- Never use the React prototype's generated content as source material.
