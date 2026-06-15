# OON · Oyagaa–Oomo Network — Handoff Notes

## 1. Overview

OON is an archival reading interface — a structured navigation layer over a primary-source corpus of correspondence, reports, transcripts, and contextual commentary. It presents provenance and enables browsing; it does not host original documents, argue authenticity, or assign verdicts. The site is an interface layer, not an archive itself.

---

## 2. Tech Stack

- **React 18 + Vite 6**
- **TypeScript**
- **Tailwind CSS v4** — no `tailwind.config.js`; all design tokens are declared via `@theme inline` in `src/styles/theme.css`
- **DM Sans** (UI / sans-serif) + **Spectral** (display serif) via Google Fonts — loaded in `src/styles/fonts.css`
- **Lucide React** icons throughout
- **No real routing** — page state is managed via `useState<Page>` in `App.tsx`; the `Page` type is a union of string literals (`"home" | "orientation" | "read" | "item" | "timeline" | "sources" | "style"`)
- **No backend, no CMS, no database** — all data is hardcoded in page files

---

## 3. Development

```bash
pnpm install && pnpm dev
# or: npm install && npm run dev
```

- **Entry point:** `src/app/App.tsx`
- **Styles:** `src/styles/theme.css` (tokens + `.dark` overrides + `@theme inline`) and `src/styles/fonts.css` (Google Fonts imports)

---

## 4. Pages (all in `src/app/pages/`)

| File | Nav label | Description |
|---|---|---|
| `LandingPage.tsx` | *(home)* | Full-viewport hero with banner image, pull-quote preview, corpus stats bar. Entry point. |
| `OrientationPage.tsx` | Start | Orientation prose — definition rows, path tiles, FAQ. All text is placeholder. |
| `BrowsePage.tsx` | Read | Filterable, paginated list of corpus items with inline reader and audio player. |
| `ItemDetailPage.tsx` | Read → item | Detail view for a single document: excerpt, provenance sidebar, DocumentViewer modal, DownloadPanel. |
| `TopicPage.tsx` | Timeline | Chronological timeline of key events, with expandable nodes and related items sidebar. |
| `SourcesPage.tsx` | Sources | Index of holding institutions and reference collections; no navigation to item detail. |
| `StyleReferencePage.tsx` | *(dev only)* | Design proof sheet showing all tokens, components, and status variants. Not in the main nav; accessible via "Style guide" link in the Footer. |

---

## 5. Component Inventory (`src/app/components/`)

| File | What it renders | Pages that use it | Interactive state? |
|---|---|---|---|
| `TopNav.tsx` | Sticky header with logo, nav links (Start / Read / Timeline / Sources), theme switcher slot. Collapses to hamburger on mobile. | App.tsx (global) | `mobileOpen` |
| `Footer.tsx` | Footer with brand description, nav links, "Style guide" dev link, copyright. | App.tsx (global) | None |
| `PageShell.tsx` | Thin `position:relative; z-index:1` wrapper for inner pages, so aurora wash shows through. | App.tsx (all inner pages) | None |
| `ThemeSwitcher.tsx` | Toggle pill (Dark / Light) that calls `applyTheme()` and notifies App. Exports `applyTheme` and `THEMES`. | TopNav (via App.tsx) | None (stateless; App owns theme) |
| `Breadcrumb.tsx` | Chevron-separated breadcrumb trail; last item is non-clickable. | ItemDetailPage, TopicPage | None |
| `Hero.tsx` | Kicker + headline + standfirst + single CTA button with optional gradient wash. | *(defined, not currently used on live pages — LandingPage implements its own hero)* | None |
| `SectionHeader.tsx` | Kicker (uppercase), `<h2>` headline, optional standfirst paragraph. | TopicPage, SourcesPage | None |
| `NavTile.tsx` | Bordered button tile with title, description, animated arrow. Used for navigation choices. | *(defined; OrientationPage uses its own inline tile pattern)* | `hovered` |
| `FilterBar.tsx` | Sticky bar above Browse list: mode segmented control (topic/period/type), filter toggle with type chips, sort dropdown, result count. | BrowsePage | `filtersExpanded` |
| `ItemRow.tsx` | Single corpus item row: date, title, TypeChip, StatusBadge, chevron. Supports `dense`, `active`, `loading` (skeleton) states. | BrowsePage, ItemDetailPage, TopicPage | `hovered` |
| `Pagination.tsx` | Prev/next buttons + page number buttons with ellipsis. Returns `null` if `totalPages <= 1`. | BrowsePage | None |
| `Accordion.tsx` | Expand/collapse FAQ list. Supports `multiOpen`. | TopicPage, OrientationPage | `openIndexes: Set<number>` |
| `Callout.tsx` | Left-bordered callout box in three variants: `note` (blue), `caveat` (amber), `boundary` (red). | ItemDetailPage | None |
| `QuoteBlock.tsx` | `<blockquote>` with display-serif italic text, attribution, date, optional source link. | ItemDetailPage | None |
| `AudioPlayer.tsx` | Simulated audio player (no real audio src) with waveform animation, progress bar, play/pause/skip/mute controls. | BrowsePage (InlineReader), ItemDetailPage | `playing`, `progress`, `muted`, `elapsed` |
| `DocumentViewer.tsx` | Full-screen modal document reader with zoom, page pagination, keyboard navigation (Esc / ←/→), and download button. | ItemDetailPage | `page`, `zoom` |
| `DownloadPanel.tsx` | Download sidebar section: individual document TXT, themed bundle picker, full-dossier ZIP. Bundles are placeholder. | ItemDetailPage | `themeOpen`, `selectedTheme`, `themeState` |
| `Timeline.tsx` | Vertical timeline with expandable nodes; each node shows dot, spine, type pill, title, description, and an expanded panel with image/pull-quote/source link. | TopicPage | `openIndex` |
| `SearchBar.tsx` | Client-side search over item titles. Results appear as a dropdown. | BrowsePage | `query`, `results`, `open` |
| `StatusBadge.tsx` | Pill badge for document status: verified / under-review / unverified / partial / translated / original. Uses `--s-green-*` / `--s-amber-*` / `--s-neutral-*` vars. | ItemRow, ItemDetailPage, BrowsePage (InlineReader) | None |
| `TypeChip.tsx` | Small type label chip (Letter, Report, etc.). Optional `selectable` + `selected` state for FilterBar. | FilterBar, ItemRow, ItemDetailPage, TopicPage | Optional `selected` (when `selectable`) |
| `DefinitionList.tsx` | `<dl>` term/description list. | SourcesPage | None |
| `LinkRow.tsx` | Archive row with name, type label, description. | SourcesPage | None |

---

## 6. Theme System

The app supports two themes, toggled by **ThemeSwitcher**:

| Theme | ID | Character |
|---|---|---|
| **Solstice** | `solstice` | Deep dark — `#0C0E15` base, slate-blue accent `#9AA6DC` / fill `#5566A8` |
| **Meridian** | `meridian` | Warm off-white — `#F3F0E9` base, richer slate-blue `#3344A8` |

**How switching works:**
`applyTheme(theme: ThemeTokens)` in `ThemeSwitcher.tsx` iterates `theme.vars` and calls `document.documentElement.style.setProperty(k, v)` for every CSS custom property. It also sets `--bg-gradient`, `--aurora-wash`, and `--hero-gradient`. The `isDark` flag controls whether `App.tsx` adds the `.dark` class to the root wrapper `<div>`.

**Key CSS variables:**

| Variable | Purpose |
|---|---|
| `--bg-base` | Page background colour |
| `--bg-surface` | Card and raised-surface background |
| `--bg-elevated` | Elevated surfaces (e.g. active row, inline reader) |
| `--ink` | Primary text colour |
| `--ink-muted` | Secondary / de-emphasised text |
| `--accent` | Interactive accent — cool slate-blue. Used on links, active nav, focus rings, icon highlights. |
| `--accent-fill` | Filled button background (slightly richer than `--accent`) |
| `--glow-warm` | Warm amber — used only in the aurora atmosphere gradient, never on interactive elements |
| `--glow-violet` | Violet — used only in the aurora atmosphere gradient, never on interactive elements |
| `--s-green-*` | Status pill colours for "verified" / "original" states (`-text`, `-bg`, `-border`) |
| `--s-amber-*` | Status pill colours for "under-review" / "partial" / "translated" states |
| `--s-neutral-*` | Status pill colours for "unverified" state |

The `.dark` block in `theme.css` provides CSS-only fallback values. At runtime, ThemeSwitcher JS overrides them imperatively. The `@theme inline` block in `theme.css` maps the CSS vars to Tailwind utility classes (`bg-background`, `text-foreground`, etc.).

---

## 7. ⚠ Placeholder Content (Must Replace Before Release)

All invented content is marked with `[Placeholder: ...]` text or `// ⚠ PLACEHOLDER` comments in the source.

### `BrowsePage.tsx` — `ALL_ITEMS` array
15 invented document items, each with `id`, `title`, `date`, `type`, `status`, `hasAudio`, and `excerpt`. All titles, dates, excerpts, and status values are fabricated for layout testing.

### `ItemDetailPage.tsx`
- **`PROVENANCE`** — 8 metadata rows (date, type, status, language, translations, pages, reference number, holding institution) are all invented.
- **`DOCUMENT_PAGES`** — 4 pages of transcribed letter text (DOC-0034) are invented placeholder prose.
- **`RELATED`** — 3 related item entries are invented cross-references.

### `TopicPage.tsx`
- **`TIMELINE_EVENTS`** — 7 timeline events (dates, titles, descriptions, pull-quotes, detail paragraphs, Unsplash image URLs). All are invented for layout testing. Image URLs are Unsplash placeholders — replace with contextually appropriate licensed images.
- **`RELATED_ITEMS`** — 5 related item entries are invented.

### `SourcesPage.tsx` — `ARCHIVES` array
8 archive entries (name, type, description) are invented holding institution names and descriptions.

### `OrientationPage.tsx`
- **`WHAT_ROWS`** — 4 definition rows; all `body` values are literal `[Placeholder: ...]` strings.
- **`OON_ADDS`** — 3 rows; all `body` values are `[Placeholder: ...]` strings.
- **`PATHS`** — 3 navigation tiles; all `body` values are `[Placeholder: ...]` strings.
- **`FAQ`** — 5 FAQ entries; all `answer` values are `[Placeholder ...]` strings.
- Orientation page headline and standfirst are `[Placeholder ...]` inline in JSX.
- "Why is it still studied?" section — three inline definition rows are all `[Placeholder: ...]`.

### `LandingPage.tsx`
- Pull-quote block text: `"[Placeholder excerpt from a source document — short, representative.]"` — inline in JSX, marked with `{/* ⚠ PLACEHOLDER */}` comment.
- Stats bar figures (`380+`, `1950–1993`, `14`) are invented.

---

## 8. Known Risks for Cursor / Codex

- **Page router is a single `useState`** — switching to React Router requires threading `navigate` as props through all pages, or lifting to context. All `onNavigate` and `onSelectItem` props would need to become route pushes.
- **All corpus data is hardcoded in page files** — `ALL_ITEMS`, `TIMELINE_EVENTS`, `ARCHIVES`, etc. need extraction to a shared data layer (or CMS/API) before the app can scale.
- **`applyTheme` applies CSS vars imperatively to `document.documentElement`** — this will break in any SSR context (Next.js, Remix). The `.dark` CSS class block is a fallback only; the JS call is authoritative at runtime.
- **The banner image (`src/imports/OON_banner_V3.jpg`) is imported as a Vite asset** (`import bannerImg from "../../imports/OON_banner_V3.jpg"`). If the file moves, the import path in `LandingPage.tsx` must be updated manually.
- **Aurora atmosphere is a `position:fixed` div in `App.tsx`** (z-index 0). Any modal or overlay with a lower z-index will appear beneath it. `DocumentViewer.tsx` uses `z-[100]` and is unaffected, but take care with any new modal added at lower z-index values.
- **`body` background-color is set via `@apply bg-background` (Tailwind)** — dark mode CSS vars are applied by ThemeSwitcher JS, not the `.dark` CSS block, so the `.dark` block is a fallback only. Do not rely on the CSS `.dark` block for dark-mode correctness.
- **`StyleReferencePage` is a dev tool** reachable via "Style guide" in the Footer (`Footer.tsx` → `onNavigate("style")`). Remove or gate it behind an env var before public release.
- **`AudioPlayer` simulates playback** — there is no real audio source. The `duration` prop is display-only; the progress bar increments on a timer. Real audio integration requires adding an `<audio>` element and connecting `src`, `currentTime`, `duration`, and event listeners.
- **`DownloadPanel` bundle downloads are placeholders** — the "By theme" and "Full dossier" downloads generate stub `.txt` files with `[Placeholder]` content. Real bundle generation requires a data layer.

---

## 9. Build Notes

```bash
pnpm build
# output: dist/
```

Vite produces a fully static client-side bundle. There is no server-side rendering. The app is purely client-side and can be deployed to any static host (Netlify, Vercel static, S3 + CloudFront, GitHub Pages, etc.).
