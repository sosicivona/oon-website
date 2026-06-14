# Phase 1 Delta and IA Comparison

Branch compared: `origin/main` -> `architecture/beta-navigation-pages`

This report is documentation only. It does not change UI code, routes, public copy, dependencies, or package files.

## 1. Exact Git Delta

| File | Change type | What changed | Category | Needs human review? |
|---|---|---|---|---|
| `docs/current-site-ia-and-content-audit.md` | Added | Added a detailed audit of current routes, navigation, links, public copy, page roles, layout defects, and cleanup plan. | audit/documentation | No |
| `docs/reader-journey-and-ia.md` | Added | Added repo guardrail document for launch IA: nav by reader intent, Topics inside Read, Timeline first-class, Sources as verification layer, FAQ as support. | audit/documentation | No |
| `src/components/Footer.astro` | Modified | Footer moved from one flat link list to Primary and Support groups; Topics and Questions & Cases removed from footer. | footer/nav cleanup | No |
| `src/components/Header.astro` | Modified | Top nav simplified to Start, Read, Timeline, Sources; full-width header band now wraps constrained inner content. | footer/nav cleanup; layout/CSS fix | No |
| `src/components/ThemeCard.astro` | Modified | Card component now applies separate classes for navigational vs informational cards. | card affordance change | No |
| `src/pages/about.astro` | Modified | About page copy lightly aligned in earlier IA work; page remains support/about route. | IA route/page addition | Yes |
| `src/pages/evidence-questions.astro` | Modified | Renamed posture toward Questions & Cases; removed object-model cards and Future backlog section in Phase 1 cleanup. | public scaffold removal | Yes |
| `src/pages/index.astro` | Modified | Homepage path cards updated; preview browse cards made inert; OON cards now point to `/sources/#public-channels`; scaffold lede removed from Source Continuity. | link/routing fix; public scaffold removal | Yes |
| `src/pages/read.astro` | Modified | Read reframed around source material; removed Reader page anatomy section; removed Essential documents and Search later cards; By topic/period made inert. | IA route/page addition; link/routing fix; public scaffold removal | Yes |
| `src/pages/source-continuity.astro` | Modified | Methodology support page clarified and linked back to Sources in earlier IA work. | IA route/page addition | Yes |
| `src/pages/sources.astro` | Added | Added main Sources / Archives route; later cleanup removed "Link to be verified" strings, removed future reading-copy subsection, and added `#public-channels`. | IA route/page addition; link/routing fix; public scaffold removal | Yes |
| `src/pages/start-here.astro` | Modified | Start page strengthened as orientation route; Phase 1 fixed several card destinations and made two cards inert. | IA route/page addition; link/routing fix | Yes |
| `src/pages/themes.astro` | Modified | Route shifted visibly toward Topics as a support/read-browse route; removed "not a final launch navigation item" scaffold sentence. | public scaffold removal | Yes |
| `src/pages/timeline.astro` | Added | Added Timeline route with high-level cautious phases. | IA route/page addition | Yes |
| `src/pages/watch.astro` | Modified | Removed "Link to be verified before public release" strings from public cards. | public scaffold removal | No |
| `src/styles/global.css` | Modified | Added full-width header support, scoped hero H1 sizing, footer group styling, and linked/static card affordance styling. | layout/CSS fix; footer/nav cleanup; card affordance change | No |

No removed files were detected.

## 2. Commit-by-Commit Delta

| Commit | Message | Files touched | Intended purpose | Scope status |
|---|---|---|---|---|
| `582143d` | Clarify beta navigation architecture | `src/components/Footer.astro`; `src/components/Header.astro`; `src/pages/about.astro`; `src/pages/evidence-questions.astro`; `src/pages/index.astro`; `src/pages/read.astro`; `src/pages/source-continuity.astro`; `src/pages/sources.astro`; `src/pages/start-here.astro`; `src/pages/themes.astro`; `src/pages/watch.astro` | Initial architecture cleanup: add Sources route, update nav/footer, clarify Start/Read/Sources/Source Continuity. | expected |
| `6dff71e` | Merge remote-tracking branch 'origin/main' into architecture/beta-navigation-pages | No direct file list in merge summary | Bring latest `main` into the architecture branch. | acceptable |
| `46a54f7` | Align beta IA with vocabulary docs | `src/pages/read.astro`; `src/pages/source-continuity.astro`; `src/pages/sources.astro`; `src/pages/start-here.astro` | Align visible IA with vocabulary/governance docs. | expected |
| `e74c245` | Clarify beta reader journey IA | `docs/reader-journey-and-ia.md`; `src/components/Footer.astro`; `src/components/Header.astro`; `src/pages/evidence-questions.astro`; `src/pages/index.astro`; `src/pages/read.astro`; `src/pages/sources.astro`; `src/pages/start-here.astro`; `src/pages/themes.astro`; `src/pages/timeline.astro` | Add Timeline, simplify top nav, move Topics inside Read, add reader journey doc. | expected |
| `4dfe756` | Add current site IA and content audit | `docs/current-site-ia-and-content-audit.md` | Documentation-only audit of current IA, links, copy, and layout defects. | expected |
| `a282a95` | Clean up beta IA links and scaffolding | `src/components/Footer.astro`; `src/components/Header.astro`; `src/components/ThemeCard.astro`; `src/pages/evidence-questions.astro`; `src/pages/index.astro`; `src/pages/read.astro`; `src/pages/sources.astro`; `src/pages/start-here.astro`; `src/pages/themes.astro`; `src/pages/watch.astro`; `src/styles/global.css` | Phase 1 cleanup: link fixes, scaffold-string removal, card affordance split, header/footer/hero CSS fixes. | expected |

## 3. Current IA Tree Extracted from Code

### `/`

Sections:

- Hero
- `#begin`: Begin / Choose your first path.
- `#themes`: Inside Read / Topics are a browse mode.
- `#evidence`: Questions & Cases / Questions stay visible.
- `#source-continuity`: Source Continuity / The source chain matters.
- `#watch`: Watch OON / Video can orient; reading remains central.
- `#sources`: Sources / Archives / Where the reading points back.

Links:

- Start hero CTA -> `/start-here/`
- Start card -> `/start-here/`
- Read card -> `/read/`
- Timeline card -> `/timeline/`
- Sources card -> `/sources/`
- Open Questions & Cases -> `/evidence-questions/`
- Read the source-continuity note -> `/source-continuity/`
- OON YouTube card -> `/sources/#public-channels`
- OON on X card -> `/sources/#public-channels`
- Open Sources -> `/sources/`

Intentionally inert cards:

- By topic
- By period
- By type

### `/start-here/`

Sections:

- Start / Begin with the shape of the dossier.
- Entry paths / Choose the question you are actually asking.
- `#faq`: FAQ preview / High-friction questions belong in context.

Links:

- Why is it still studied? -> `/start-here/#faq`
- What does OON do? -> `/about/`
- How can I begin? -> `/read/`
- What is not being claimed? -> `/start-here/#faq`
- Understand the arc -> `/timeline/`
- Enter the material -> `/read/`
- Trace sources -> `/sources/`

Intentionally inert cards:

- What is this?
- Where next?
- FAQ preview cards

### `/read/`

Sections:

- Read / Enter the source material.
- Browse modes / Start small, then widen.
- Corpus types / Different materials need visible labels.

Links:

- Read the source-continuity note -> `/source-continuity/`
- Source path -> `/sources/`

Intentionally inert cards:

- By topic
- By period
- By type
- Corpus type cards: Letters, Reports, Phone calls, NR communications, GR1 communications, Later accounts / tweets, Archive notes, OON commentary

### `/timeline/`

Sections:

- Timeline / The chronological skeleton.

Links:

- No page-specific content links.

Intentionally inert cards:

- Early correspondence and calls
- Receiver networks and circulation
- Archive growth
- Peña authorship crisis
- Research and classification period
- NR, GR1, and later communications
- Twitter and source-account period
- OON public orientation
- Current disclosure-context relevance

### `/sources/`

Sections:

- Sources / Archives / Where the reading points back.
- `#public-channels`: Public OON channels / Where discussion continues.
- Source-status language / Archive access is not the same as assessment.

Links:

- Source Continuity card -> `/source-continuity/`
- Read the source-continuity note -> `/source-continuity/`

Intentionally inert cards:

- UMMO-Ciencias
- Ummo-Sciences FR
- Ummo-Sciences EN
- UmmoWiki
- OON public channels

### `/source-continuity/`

Sections:

- Source Continuity / Make the source chain visible.

Links:

- Back to Sources -> `/sources/`

Intentionally inert cards:

- Recognized source account
- Archive record
- Translation status
- Analysis boundary

### `/themes/`

Sections:

- Topics / A browse mode inside Read.

Links:

- No page-specific content links.

Intentionally inert cards:

- Identity and appearance
- Culture and social structure
- Humanity and Earth
- Science and technology
- Philosophy and social organization
- Other civilizations

### `/evidence-questions/`

Sections:

- Questions & Cases / Open questions come after source review.

Links:

- No page-specific content links.

### `/watch/`

Sections:

- Watch / Watch OON explain the case.

Links:

- No page-specific content links.

Intentionally inert cards:

- OON YouTube
- OON on X

### `/about/`

Sections:

- About / A human network for source-first study.

Links:

- No page-specific content links.

Intentionally inert cards:

- Read carefully
- Compare sources
- Leave questions open

### Global Header

Links:

- Brand -> `/`
- Start -> `/start-here/`
- Read -> `/read/`
- Timeline -> `/timeline/`
- Sources -> `/sources/`

### Global Footer

Primary links:

- Start -> `/start-here/`
- Read -> `/read/`
- Timeline -> `/timeline/`
- Sources -> `/sources/`

Support links:

- About OON -> `/about/`
- FAQ -> `/start-here/#faq`
- Source Continuity -> `/source-continuity/`
- Watch / Public Channels -> `/watch/`

## 4. Target IA Tree

Top nav:

- Start -> `/start-here/`
- Read -> `/read/`
- Timeline -> `/timeline/`
- Sources -> `/sources/`

Homepage:

- Purpose: curiosity hook
- Dominant action: Start
- Secondary actions: Read, Timeline, Sources
- Should not duplicate the full Start page

Start:

- Purpose: orientation
- Includes: what this is, what OON is, how to enter the material, FAQ preview

Read:

- Purpose: enter source material
- Includes: browse by topic, by period, by type, essential documents later
- Should not expose internal “reader page anatomy” or future feature language

Timeline:

- Purpose: chronological story

Sources:

- Purpose: verification layer and archive paths

FAQ:

- Purpose: high-friction questions
- Can currently be anchor or future route

About:

- Purpose: OON identity and role

Source Continuity:

- Purpose: methodology support

Watch:

- Purpose: public videos/channels support

Questions & Cases:

- Purpose: future research/support layer
- Should not be prominent until it has real content

## 5. Current vs Target Comparison

| Area | Current state | Target state | Gap | Severity | Recommended next action |
|---|---|---|---|---|---|
| Top navigation | Start, Read, Timeline, Sources | Same | None | okay | Keep. |
| Homepage | Has curiosity hero and Start CTA, but also previews Topics, Questions & Cases, Source Continuity, Watch, and Sources. | Curiosity hook with dominant Start and secondary Read/Timeline/Sources; should not duplicate Start. | Homepage still tries to preview too many support layers. | high | In Phase 2, reduce homepage to hero + clear primary paths; consider moving support previews lower or removing. |
| Start page | Orients reader and includes FAQ preview; still includes IA-rationale language and a card mentioning "future search". | Orientation: what this is, OON role, how to enter, FAQ preview. | Function is close, but public copy still partly sounds like planning language. | medium | Copy hierarchy pass; remove remaining future-search language when allowed. |
| Read page | Main material entry route; removed Reader page anatomy and future feature cards. Browse modes and corpus types are visible. | Enter source material; browse by topic/period/type; essential docs later, without internal future language. | Meets structure target; still lacks actual source-material object pattern. | medium | Next product-object pass: add communication/source-trail module when ready. |
| Timeline page | New route with high-level phase cards. | Chronological story. | Structurally aligned, but visually reads as generic cards and may need editorial review. | medium | Later replace with timeline visual and review sensitive phase labels. |
| Sources page | Verification route; archive cards, public channels anchor, source-status section. | Verification layer and archive paths. | Mostly aligned; no real external links yet. | low | Add verified links later; keep as current verification hub. |
| Footer | Primary and Support groups; Topics and Questions & Cases removed. | Primary plus support grouping. | Aligned. | okay | Keep. |
| FAQ | Anchor in Start page. | Anchor or future route. | Acceptable temporary implementation. | okay | Keep until enough FAQ content exists for route. |
| About | Support page, thin but clear. | OON identity and role. | Page role aligned; content thin. | low | Expand later with real OON identity content. |
| Watch | Support page with inert YouTube/X cards; homepage OON cards point to Sources public channels. | Public videos/channels support. | Role aligned but no verified links. | low | Add verified public channel links when approved. |
| Questions & Cases | Route remains accessible by homepage CTA; now almost empty after scaffold removal. | Future research/support layer, not prominent until real content. | Still prominent from homepage despite lack of content. | high | Remove homepage CTA or downgrade section until real content exists. |
| Topics/themes route | Public route exists, not in nav/footer; linked nowhere after cleanup except direct URL. | Browse mode inside Read, not top nav at launch. | Route is effectively deferred; content remains provisional. | medium | Keep route hidden or replace with Read anchor later. |
| Source Continuity | Methodology support page; linked from homepage, Read, Sources, footer. | Methodology support. | Role aligned, but homepage prominence may be high. | low | Keep; consider moving lower in homepage cleanup. |

## 6. Link Map After Cleanup

| Visible label | Source page/component | Current target | Target exists? | Aligned with target? | Notes |
|---|---|---|---|---|---|
| Oyagaa-Oomo Network | `Header.astro` | `/` | Yes | Yes | Brand home link. |
| Start | `Header.astro` | `/start-here/` | Yes | Yes | Primary nav. |
| Read | `Header.astro` | `/read/` | Yes | Yes | Primary nav. |
| Timeline | `Header.astro` | `/timeline/` | Yes | Yes | Primary nav. |
| Sources | `Header.astro` | `/sources/` | Yes | Yes | Primary nav. |
| Start | `Footer.astro` Primary | `/start-here/` | Yes | Yes | Primary footer. |
| Read | `Footer.astro` Primary | `/read/` | Yes | Yes | Primary footer. |
| Timeline | `Footer.astro` Primary | `/timeline/` | Yes | Yes | Primary footer. |
| Sources | `Footer.astro` Primary | `/sources/` | Yes | Yes | Primary footer. |
| About OON | `Footer.astro` Support | `/about/` | Yes | Yes | Support footer. |
| FAQ | `Footer.astro` Support | `/start-here/#faq` | Yes | Yes | Anchor target exists. |
| Source Continuity | `Footer.astro` Support | `/source-continuity/` | Yes | Yes | Support footer. |
| Watch / Public Channels | `Footer.astro` Support | `/watch/` | Yes | Mostly | Watch exists, though public channels also live under `/sources/#public-channels`. |
| Start | Homepage hero CTA | `/start-here/` | Yes | Yes | Dominant homepage action. |
| Start | Homepage card | `/start-here/` | Yes | Yes | Secondary path. |
| Read | Homepage card | `/read/` | Yes | Yes | Secondary path. |
| Timeline | Homepage card | `/timeline/` | Yes | Yes | Secondary path. |
| Sources | Homepage card | `/sources/` | Yes | Yes | Secondary path. |
| Open Questions & Cases | Homepage text link | `/evidence-questions/` | Yes | Needs review | Route exists but is now thin/deferred. |
| Read the source-continuity note | Homepage text link | `/source-continuity/` | Yes | Yes | Support/methodology page. |
| OON YouTube | Homepage card | `/sources/#public-channels` | Yes | Yes | Now routes to public channels section. |
| OON on X | Homepage card | `/sources/#public-channels` | Yes | Yes | Now routes to public channels section. |
| Open Sources | Homepage text link | `/sources/` | Yes | Yes | Verification route. |
| Why is it still studied? | `/start-here/` card | `/start-here/#faq` | Yes | Yes | FAQ anchor target exists. |
| What does OON do? | `/start-here/` card | `/about/` | Yes | Yes | About route exists. |
| How can I begin? | `/start-here/` card | `/read/` | Yes | Yes | Read route exists. |
| What is not being claimed? | `/start-here/` card | `/start-here/#faq` | Yes | Yes | FAQ anchor target exists. |
| Understand the arc | `/start-here/` card | `/timeline/` | Yes | Yes | Timeline route exists. |
| Enter the material | `/start-here/` card | `/read/` | Yes | Yes | Read route exists. |
| Trace sources | `/start-here/` card | `/sources/` | Yes | Yes | Sources route exists. |
| Read the source-continuity note | `/read/` text link | `/source-continuity/` | Yes | Yes | Methodology support. |
| Source path | `/read/` card | `/sources/` | Yes | Yes | Verification route. |
| Source Continuity | `/sources/` card | `/source-continuity/` | Yes | Yes | Methodology support. |
| Read the source-continuity note | `/sources/` text link | `/source-continuity/` | Yes | Yes | Methodology support. |
| Back to Sources | `/source-continuity/` text link | `/sources/` | Yes | Yes | Return link. |

No dead links or empty hrefs were found in the current route map.

Intentionally inert cards after cleanup:

- Homepage: By topic, By period, By type.
- Start: What is this?, Where next?, FAQ preview cards.
- Read: By topic, By period, By type, corpus type cards.
- Timeline: all phase cards.
- Sources: archive cards and OON public channels card.
- Source Continuity: all methodology cards.
- Topics: all topic cards.
- Watch: OON YouTube, OON on X.
- About: all principle cards.

## 7. Public Scaffold Check

Search terms checked:

- `future`
- `later`
- `placeholder`
- `to be verified`
- `search later`
- `future curated path`
- `future reader page`
- `reader page anatomy`
- `not a final launch`
- `reserved for source-chain review`

### Public-facing occurrences in `src`

| File | Line/context | Public-facing or docs-only? | Notes |
|---|---|---|---|
| `src/pages/index.astro` | `By type` card: "Letters, reports, calls, later communications..." | Public-facing | Acceptable domain language; not scaffold language. |
| `src/pages/read.astro` | `By type` card: "letters, reports, calls, later communications..." | Public-facing | Acceptable domain language; not scaffold language. |
| `src/pages/read.astro` | `NR communications`: "Later communication-chain material..." | Public-facing | Acceptable domain/source-continuity language. |
| `src/pages/read.astro` | `GR1 communications`: "Later communication-chain material..." | Public-facing | Acceptable domain/source-continuity language. |
| `src/pages/read.astro` | `Later accounts / tweets` card | Public-facing | Acceptable material-type label. |
| `src/pages/start-here.astro` | "later communications" in Why is it still studied? card | Public-facing | Acceptable domain language. |
| `src/pages/start-here.astro` | "essential documents, or future search" in Enter the material card | Public-facing | Needs review. This survived because the Phase 1 instruction explicitly said to keep this card unchanged. |
| `src/pages/start-here.astro` | FAQ answer mentions "later communications" | Public-facing | Acceptable domain language. |
| `src/pages/timeline.astro` | `NR, GR1, and later communications` | Public-facing | Acceptable timeline/domain language. |
| `src/pages/timeline.astro` | "Later communication-chain material..." | Public-facing | Acceptable source-continuity language. |
| `src/pages/timeline.astro` | "Later public-account material..." | Public-facing | Acceptable source-continuity language. |
| `src/pages/source-continuity.astro` | "Some later communications or accounts..." | Public-facing | Acceptable methodology language. |
| `src/pages/source-continuity.astro` | "later communication chain" | Public-facing | Acceptable methodology language. |
| `src/components/SourceBadge.astro` | default explanation: "later UMMO/OOMO communication chain..." | Public-facing when component renders | Required source-status language; acceptable. |

Removed public scaffold strings:

- `Reader page anatomy`
- `Every future reader page...`
- `Search later`
- `Essential documents` card on `/read/`
- `Link to be verified before public release`
- `Links to be verified before public release`
- `OON may later provide...`
- `This route supports Read; it is not a final launch navigation item.`
- `Future backlog`
- `reserved for source-chain review`

### Docs-only occurrences

| File | Line/context | Public-facing or docs-only? | Notes |
|---|---|---|---|
| `docs/implementation-plan.md` | Multiple references to future phases, placeholder content, and TODO placeholders | Docs-only | Acceptable planning language. |
| `docs/reader-journey-and-ia.md` | Future topic browser, later reading copies/downloads, later accounts/tweets | Docs-only | Acceptable IA/governance language. |
| `docs/content-governance.md` | Future governance decisions, future backlog, future Essential Documents spotlight | Docs-only | Acceptable governance language. |
| `docs/vocabulary-and-ia.md` | Future reader pages and implementation framing | Docs-only | Acceptable, but could be updated later after cleanup. |
| `docs/current-site-ia-and-content-audit.md` | References to scaffold strings and future language as audit findings | Docs-only | Expected because this audit documents those issues. |
| `docs/misuse-and-false-attribution.md` | "later identification" language | Docs-only | Governance language; acceptable. |
| `docs/oon-narrative-arc.md` | later communications | Docs-only | Narrative/governance language; acceptable. |

No public occurrences were found for:

- `placeholder`
- `to be verified`
- `search later`
- `future curated path`
- `future reader page`
- `reader page anatomy`
- `not a final launch`
- `reserved for source-chain review`

## 8. Final Merge Readiness Verdict

Verdict: **Needs small cleanup before visual review**

Reasons:

1. The intended IA is mostly implemented: top nav, footer grouping, Sources, Timeline, Start, and Read now align with the target tree.
2. Phase 1 mechanical cleanup succeeded: misleading links were fixed, inert cards are no longer rendered as navigational cards, and the specified scaffold strings were removed.
3. The homepage still points to `Questions & Cases`, a route that is intentionally future/support-oriented and currently has almost no substantive content. This is the main remaining IA mismatch before visual review.

Exact next action:

- Do a tiny IA cleanup pass that either removes/downgrades the homepage `Questions & Cases` CTA and section, or makes it clearly non-primary until the route has real content. Also remove the remaining public phrase "future search" from the Start page if Phase 2 copy cleanup is approved.
