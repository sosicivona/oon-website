# Current Site IA and Content Audit

Date: 2026-06-13
Branch audited: `architecture/beta-navigation-pages`

## 1. Current Route Tree

| Route path | Page title | Major sections in order | Current role classification |
|---|---|---|---|
| `/` | Oyagaa-Oomo Network \| Reading the UMMO/OOMO dossier | Hero; Begin; Inside Read; Questions & Cases; Source Continuity; Watch OON; Sources / Archives | Primary, but currently overloaded |
| `/start-here/` | Start Here \| Oyagaa-Oomo Network | Start; Entry paths; FAQ preview | Primary entry page |
| `/read/` | Read \| Oyagaa-Oomo Network | Read; Browse modes; Corpus types | Reading/material page |
| `/timeline/` | Timeline \| Oyagaa-Oomo Network | Timeline | Timeline/story page |
| `/sources/` | Sources \| Oyagaa-Oomo Network | Sources / Archives; Reading copies; Public OON channels; Source-status language | Source verification page |
| `/themes/` | Topics \| Oyagaa-Oomo Network | Topics | Secondary/support route; deferred as a full product surface |
| `/evidence-questions/` | Questions & Cases to Examine \| Oyagaa-Oomo Network | Questions & Cases; Future backlog | FAQ/friction or cases page; currently internal/deferred |
| `/source-continuity/` | Source Continuity \| Oyagaa-Oomo Network | Source Continuity | Methodology support page |
| `/watch/` | Watch \| Oyagaa-Oomo Network | Watch | Support/public channels page; currently thin |
| `/about/` | About \| Oyagaa-Oomo Network | About | About/network page; currently thin |

Primary routes currently implied by top navigation:

- `/start-here/`
- `/read/`
- `/timeline/`
- `/sources/`

Secondary/support routes currently exposed through footer or homepage modules:

- `/about/`
- `/source-continuity/`
- `/watch/`
- `/evidence-questions/`
- `/themes/`

## 2. Current Navigation and Footer Map

| Visible label | Source page/component | Current target | Expected target | Issue / recommendation |
|---|---|---|---|---|
| Oyagaa-Oomo Network | `Header.astro` | `/` | `/` | Matches expectation. |
| Start | `Header.astro` | `/start-here/` | `/start-here/` | Matches simplified IA. |
| Read | `Header.astro` | `/read/` | `/read/` | Matches simplified IA. |
| Timeline | `Header.astro` | `/timeline/` | `/timeline/` | Matches simplified IA. |
| Sources | `Header.astro` | `/sources/` | `/sources/` | Matches simplified IA. |
| About OON | `Footer.astro` | `/about/` | `/about/` | Matches expectation, but About page is thin. |
| FAQ | `Footer.astro` | `/start-here/#faq` | A dedicated FAQ route or clear FAQ section | Functional, but user may expect a full FAQ page. Good temporary target if the Start FAQ preview remains substantial. |
| Source Continuity | `Footer.astro` | `/source-continuity/` | `/source-continuity/` | Matches support-page expectation. |
| Watch / Public Channels | `Footer.astro` | `/watch/` | `/watch/` or `/sources/#public-channels` | Reasonable, but Watch page duplicates public-channel language and is very thin. |
| Questions & Cases | `Footer.astro` | `/evidence-questions/` | `/evidence-questions/` or a later FAQ/cases route | Label is better than Evidence & Questions, but page is currently more schema than user-facing content. |
| Topics | `Footer.astro` | `/themes/` | `/read/` topic mode or `/themes/` if kept as support route | Destination is acceptable for support, but route still feels deferred/scaffolded. |
| Timeline | `Footer.astro` | `/timeline/` | `/timeline/` | Matches expectation. |
| Read | `Footer.astro` | `/read/` | `/read/` | Matches expectation. |
| Sources | `Footer.astro` | `/sources/` | `/sources/` | Matches expectation. |
| Start | Homepage hero CTA | `/start-here/` | `/start-here/` | Matches expectation. |
| Open Questions & Cases | Homepage text link | `/evidence-questions/` | `/evidence-questions/` | Destination matches, but the section may be too abstract for homepage prominence. |
| Read the source-continuity note | Homepage text link | `/source-continuity/` | `/source-continuity/` | Correct destination, but methodology appears very high in the homepage flow. |
| OON YouTube | Homepage card | `/watch/` | `/watch/` or verified YouTube URL later | Makes sense as temporary route, but the card title suggests a channel while it links to a generic Watch page. |
| OON on X | Homepage card | `/watch/` | `/watch/` or verified X/public channel URL later | Same issue: title suggests X but target is Watch. Consider routing both through Sources/Public Channels until verified. |
| Open Sources | Homepage text link | `/sources/` | `/sources/` | Matches expectation. |

Main issue: support links are technically valid, but several labels imply concrete destinations while the target pages are currently explanatory scaffolds.

## 3. Clickable Card Map

| Visible card / CTA | Description | Source page | Current destination | Does the link make sense? | Suggested correction |
|---|---|---|---|---|---|
| Start | Orientation to dossier, corpus, OON role, next steps | `/` | `/start-here/` | Yes | Keep. |
| Read | Enter through one communication, topic, period, or source path | `/` | `/read/` | Yes | Keep. |
| Timeline | High-level arc before detail | `/` | `/timeline/` | Yes | Keep. |
| Sources | Archive paths, channels, source-status notes | `/` | `/sources/` | Yes | Keep. |
| By topic | Provisional pathways for repeated subjects | `/` | `/themes/` | Mostly | Consider linking to an anchor inside `/read/` once Read has a real topic-mode module. |
| By period | Chronological way into material | `/` | `/timeline/` | Yes | Keep, but label may imply a period browser rather than story timeline. |
| By type | Materials stay labeled | `/` | `/read/` | Weak | If it links to Read, it should jump to a specific type section or become non-clickable. |
| Open Questions & Cases | Opens cases/support page | `/` | `/evidence-questions/` | Yes, but page is deferred | Keep only if page becomes public-facing. |
| Read the source-continuity note | Methodology note | `/` | `/source-continuity/` | Yes | Keep but lower prominence on homepage. |
| OON YouTube | Public videos/explainers | `/` | `/watch/` | Partly | Either keep as Watch route or route through Sources/Public Channels until external link is verified. |
| OON on X | Public updates/threads | `/` | `/watch/` | Weak | Better target is `/sources/` Public OON channels, or a future verified channel link. |
| Open Sources | Archive/source page | `/` | `/sources/` | Yes | Keep. |
| What is this? | Explanation of dossier | `/start-here/` | `/read/` | Weak | A user may expect this to expand or stay on Start. Consider non-clickable card or link to a glossary/orientation section. |
| Why is it still studied? | Research continuity rationale | `/start-here/` | `/timeline/` | Reasonable | Keep if Timeline includes this question context. |
| What does OON do? | OON role | `/start-here/` | `/sources/` | Weak | Expected destination is `/about/`, not Sources. |
| How can I begin? | Starting through communication/topic/period/source path | `/start-here/` | `/read/` | Yes | Keep. |
| What is not being claimed? | Boundary statement | `/start-here/` | `/evidence-questions/` | Weak | Expected destination is FAQ, About, or Source Continuity. |
| Where next? | Summary of route choices | `/start-here/` | `/timeline/` | Weak | Should not privilege Timeline; consider non-clickable or link to a route chooser. |
| Understand the arc | Timeline path | `/start-here/` | `/timeline/` | Yes | Keep. |
| Enter the material | Read path | `/start-here/` | `/read/` | Yes | Keep. |
| Trace sources | Sources path | `/start-here/` | `/sources/` | Yes | Keep. |
| By topic | Topic browse mode | `/read/` | `/themes/` | Mostly | Keep as support route until topic browser exists. |
| By period | Period browse mode | `/read/` | `/timeline/` | Partly | Timeline is a story route, not yet a period filter. Consider a future `/read/#period` anchor. |
| Source path | Verification route | `/read/` | `/sources/` | Yes | Keep. |
| Source Continuity | Methodology note | `/sources/` | `/source-continuity/` | Yes | Keep. |

Non-clickable cards that look interactive because they share `.theme-card` styling:

- Read page: By type, Essential documents, Search later, corpus type cards.
- Sources page: archive ecosystem cards, reading copy cards, OON public channels.
- Topics page: all topic cards.
- Timeline page: all phase cards.
- About page: all principle cards.

Recommendation: visually distinguish non-clickable informational cards from navigational cards.

## 4. Public Copy Inventory

Classification legend:

- Keep: works for public launch.
- Rewrite: usable concept, but language/hierarchy should change.
- Remove: not needed in public UI.
- Internal/scaffold text exposed publicly: sounds like implementation planning.
- Needs human editorial review: may be sensitive, strategic, or claim-adjacent.

### `/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: The UMMO/OOMO dossier | Keep | Clear. |
| H1: For sixty years, letters have arrived from a civilization claiming to come from another world. | Needs human editorial review | Strong and readable, but also a major claim-forward first impression. |
| Hero subcopy: They asked to be read, doubted, compared, and thought about freely. | Rewrite | Good posture, but "they asked" attributes intent. |
| Section eyebrow: Begin | Keep | Simple. |
| Title: Choose your first path. | Keep | Clear user action. |
| Lede: Start with the shape of the dossier... | Keep | Strong IA framing. |
| Card titles: Start, Read, Timeline, Sources | Keep | Match nav. |
| Section eyebrow: Inside Read | Keep | Explains IA decision. |
| Title: Topics are a browse mode. | Rewrite | Good internally, but sounds like product taxonomy rather than public value. |
| Lede: Topics help readers... | Keep | Clear. |
| Card: By topic / By period / By type | Rewrite | These are browse modes, but current cards do not yet provide real browse behavior. |
| Section eyebrow: Questions & Cases | Keep | Good label. |
| Title: Questions stay visible. | Rewrite | Vague black headline; should say what the section helps the reader do. |
| Status card labels: Source located, Chronology under review, Assessment pending | Rewrite | Useful model, but "pending" and process labels may feel scaffolded. |
| Section eyebrow: Source Continuity | Keep | Good support label. |
| Title: The source chain matters. | Rewrite | True but abstract. |
| Lede: Each future reader page... | Internal/scaffold text exposed publicly | "future reader page" is implementation language. |
| Section eyebrow: Watch OON | Keep | Clear. |
| Title: Video can orient; reading remains central. | Keep | Good posture. |
| Cards: OON YouTube, OON on X | Rewrite | Link behavior and source/channel status need clarity. |
| Section eyebrow: Sources / Archives | Keep | Clear. |
| Title: Where the reading points back. | Keep | Strong. |

### `/start-here/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: Start | Keep | Matches nav. |
| Title: Begin with the shape of the dossier. | Keep | Clear. |
| Lede defining dossier/corpus/OON | Keep | Useful orientation. |
| What is this? | Keep | Good newcomer question. |
| Why is it still studied? | Keep | Important high-friction question. |
| What does OON do? | Keep | Good. Link target should change. |
| How can I begin? | Keep | Good. |
| What is not being claimed? | Keep | Good boundary-setting. Link target should change. |
| Where next? | Rewrite | Useful idea but currently vague and links to Timeline only. |
| Eyebrow: Entry paths | Keep | Good. |
| Title: Choose the question you are actually asking. | Rewrite | Interesting, but may sound editorially sharp; consider gentler wording. |
| Lede about launch navigation and internal structure | Internal/scaffold text exposed publicly | This is IA rationale, not public copy. |
| FAQ preview | Keep | Good support concept. |
| High-friction questions belong in context. | Rewrite | Internal framing. |
| Peña authorship FAQ answer | Needs human editorial review | Important and careful, but prominent placement and wording need a human pass. |

### `/read/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: Read | Keep | Clear. |
| Title: Enter the source material. | Keep | Good shift away from only letters. |
| Lede: The archive record is large... | Keep | Clear. |
| SourceBadge explanation | Keep | Required governance language. |
| Eyebrow: Reader page anatomy | Internal/scaffold text exposed publicly | Sounds like a build note. |
| "Every future reader page..." | Internal/scaffold text exposed publicly | Explicitly future-facing implementation language. |
| Reader steps: Source location, Date/status, Language/status, etc. | Keep / rewrite | Useful as requirements, but should become a UI module or example, not raw planning list. |
| Eyebrow: Browse modes | Keep | Good, but public label may be "Ways to read." |
| Title: Start small, then widen. | Rewrite | Nice idea but abstract. |
| Essential documents | Internal/scaffold text exposed publicly | Future curated path with no content yet. |
| Search later | Internal/scaffold text exposed publicly | Future feature exposed publicly. |
| Corpus types section | Keep | Important, but currently only labels. |

### `/timeline/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: Timeline | Keep | Clear. |
| Title: The chronological skeleton. | Rewrite | Accurate internally, but public title should be warmer/more concrete. |
| Lede about not resolving authorship/origin | Keep | Good boundary. |
| Timeline phase labels | Keep / needs review | Useful categories. |
| Peña authorship crisis item | Needs human editorial review | Sensitive, should remain careful and maybe live in FAQ/context rather than timeline card language. |
| Current disclosure-context relevance | Needs human editorial review | Could sound speculative or strategic; needs careful positioning. |

### `/sources/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: Sources / Archives | Keep | Clear. |
| Title: Where the reading points back. | Keep | Strong. |
| Lede about canonical repositories | Keep | Good. |
| Archive cards with "Link to be verified before public release" | Internal/scaffold text exposed publicly | Correct as repo note, but too prominent for public launch. |
| Eyebrow: Reading copies | Rewrite | Useful concept, but may confuse before copies exist. |
| "OON may later provide..." | Internal/scaffold text exposed publicly | Future plan. |
| Public OON channels card | Rewrite | Needs concrete public channel object or remain support copy. |
| Source-status language section | Keep / rewrite | Important, but abstract. |

### `/themes/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: Topics | Keep | Good. |
| Title: A browse mode inside Read. | Internal/scaffold text exposed publicly | IA note, not public title. |
| "This route supports Read; it is not a final launch navigation item." | Internal/scaffold text exposed publicly | Should not be visible on public site. |
| Provisional pathway cards | Rewrite | Useful caution, but repeated "provisional pathway" feels scaffolded. |

### `/evidence-questions/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: Questions & Cases | Keep | Good. |
| Title: Open questions come after source review. | Keep / rewrite | Good posture, but could be more user-facing. |
| Object-model cards: Item, Claim, Source status, etc. | Internal/scaffold text exposed publicly | This is content model/spec language. |
| Future backlog | Internal/scaffold text exposed publicly | Should not be public as-is. |
| Public health/geopolitical/forecast/economic categories | Needs human editorial review | Even generic categories may invite sensitive interpretations before content governance is ready. |

### `/source-continuity/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: Source Continuity | Keep | Good support label. |
| Title: Make the source chain visible. | Keep | Clear. |
| Lede about later communications/source-chain relevance | Keep | Good caution. |
| Recognized source account card | Keep | Required concept. |
| Archive record / Translation status / Analysis boundary | Keep | Useful methodology content. |

### `/watch/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: Watch | Keep | Clear. |
| Title: Watch OON explain the case. | Rewrite | Slightly too authoritative. Could be "Watch public OON orientation." |
| Lede: Video can orient... | Keep | Good. |
| Link to be verified before public release | Internal/scaffold text exposed publicly | Should be replaced before public launch. |

### `/about/`

| Text item | Classification | Notes |
|---|---|---|
| Eyebrow: About | Keep | Clear. |
| Title: A human network for source-first study. | Keep | Good. |
| Lede about OON | Keep | Useful. |
| Read carefully / Compare sources / Leave questions open | Keep | Good principles, but page is thin. |

## 5. Page Role Audit

| Page | User problem solved | Purpose clear? | Too text-heavy? | Real content or future content? | Should remain public at launch? | Role category |
|---|---|---|---|---|---|---|
| `/` | Gives an entry point and preview of site paths | Partly | Yes, because it previews too many support concepts | Mostly structure preview | Yes, but should be simplified | Primary entry page |
| `/start-here/` | Orients newcomers | Yes | Moderately | Mix of real orientation and IA explanation | Yes | Primary entry page |
| `/read/` | Explains how to enter source material | Partly | Yes | Mostly future structure, no actual material yet | Yes, but should show at least one material object pattern | Reading/material page |
| `/timeline/` | Gives chronological skeleton | Yes | Moderately | Real structure, no detailed sourced content | Yes | Timeline/story page |
| `/sources/` | Explains verification/source layer | Yes | Yes | Mix of archive ecosystem and future reading-copy plan | Yes | Source verification page |
| `/themes/` | Supports topic browsing | Partly | No, but repetitive | Future browse taxonomy | Maybe support route, not primary | Internal/deferred page or Reading/material support page |
| `/evidence-questions/` | Explains cases/object model | Partly | Yes | Mostly schema/future backlog | Not as-is | Internal/deferred page or FAQ/friction page |
| `/source-continuity/` | Explains source-status methodology | Yes | No | Real methodology | Yes as support page | Methodology support page |
| `/watch/` | Points to public/video channels | Partly | No | Future links, no verified destination | Yes only as support route | About/network or support/public channels page |
| `/about/` | Explains OON | Yes | No | Real but thin | Yes | About/network page |

## 6. Layout and Responsive Defects

Likely causes in code:

- Top navigation background not stretching full width:
  - `.site-header` in `src/styles/global.css` sets `width: min(calc(100% - 2rem), 74rem)` and `margin: 0 auto`.
  - Because the header itself owns the background, the background only spans the constrained header width. A full-width wrapper or body-level header band would be needed later.

- Hero text not centering or adapting well on large screens:
  - `.hero-beta-content` uses a large constrained width and left-aligned content with `padding: 8rem 0 5rem`.
  - There is no centered text panel or responsive max-height handling.

- Hero line breaks/cutoff and excessive H1 sizes:
  - Global `h1` uses `font-size: clamp(3.4rem, 11vw, 6.75rem)` and `max-width: 12ch`.
  - The `11vw` scaling is too aggressive for laptop-height windows and can produce oversized multi-line headlines.

- Inconsistent content max-width:
  - `.section-inner`, `.hero-beta-content`, `.site-header`, and `.site-footer` all use similar but separate width rules.
  - `.section-heading` and `.section-lede` use separate max-widths, which can create uneven rhythm.

- Repeated page pattern makes every section feel the same:
  - `Section.astro` always renders eyebrow, h2, lede, then slot.
  - Most pages use `Section` plus `ThemeCard`, so pages share the same hierarchy even when their job is different.

- Card grid alignment issues:
  - `.card-grid` switches from one column to two columns at `44rem`, then three columns at `68rem`.
  - Cards with very different text lengths create uneven heights and scanning rhythm.
  - `.card-grid.compact` becomes three columns at `44rem`, which may be tight for medium screens.

- Footer overload:
  - `Footer.astro` lists nine links in one flex-wrapped nav without grouping.
  - Support, primary, methodology, and deferred routes appear at the same visual level.

- Clickable vs non-clickable card ambiguity:
  - `ThemeCard.astro` renders either `<a>` or `<article>`, but both share the same `.theme-card` styling.
  - Users cannot easily distinguish route cards from informational cards.

- Tiny orange eyebrow acting as the real title:
  - `.eyebrow` is visually small but often carries the clearest section label.
  - The larger black headline is sometimes abstract, such as "Questions stay visible" or "The source chain matters."

## 7. Recommended Cleanup Plan

### Phase 1 — IA/link cleanup

- Fix misleading card links:
  - Start page "What does OON do?" should point to `/about/`, not `/sources/`.
  - Start page "What is not being claimed?" should point to FAQ/Source Continuity, not Questions & Cases.
  - Start page "Where next?" should not point only to Timeline.
  - Homepage "OON on X" should not point generically to Watch unless Watch becomes a public-channel hub.
- Classify public vs support/internal pages:
  - Public launch: `/`, `/start-here/`, `/read/`, `/timeline/`, `/sources/`, `/about/`.
  - Support: `/source-continuity/`, `/watch/`.
  - Deferred/internal until rewritten: `/themes/`, `/evidence-questions/`.
- Remove internal/deferred routes from footer prominence.
- Simplify footer grouping:
  - Primary: Start, Read, Timeline, Sources.
  - Support: About OON, Source Continuity, Watch/Public Channels.
  - Deferred links should not appear until public-facing.

### Phase 2 — public copy hierarchy

- Reduce three-level section titles:
  - Eyebrow should classify section type, not carry the main meaning.
  - Black headings should become the actual public section titles.
  - Ledes should be shorter and less explanatory.
- Replace internal scaffold wording:
  - Remove "future reader page", "future curated path", "Search later", "Link to be verified before public release", "Future backlog", and "not a final launch navigation item" from public UI.
- Convert abstract headings into concrete user promises:
  - "Questions stay visible" could become "Examine questions without forcing a verdict."
  - "The source chain matters" could become "See how a text points back to sources."
  - "Start small, then widen" could become "Browse by topic, period, type, or source path."
- Keep sensitive FAQ language, but give it a human editorial review before launch.

### Phase 3 — visual/product objects

- Communication item card:
  - A repeatable card for a letter, report, call, later communication, archive note, or commentary item.
- Source trail module:
  - Shows archive/source path, source status, translation status, and OON interpretation boundary.
- Timeline visual:
  - Replace plain cards with a chronological component and event-type labels.
- FAQ accordion:
  - Handles high-friction questions without making them top navigation.
- Topic/browse mode component:
  - Supports topic browsing inside Read without making Topics a top-level launch route.
- Local reading copy/download affordance:
  - Later pattern for curated reading copies or downloadable study versions that point back to source paths.

## 8. No Code Changes

This audit is documentation only.

No Astro pages, components, CSS, package files, routes, or visual design were changed as part of this audit.
