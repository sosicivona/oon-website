# OON — Design Delta Handoff
**For:** Codex / Cursor implementation  
**Date:** June 2026  
**Status:** Final — ready for implementation

---

## A. Change Log

| # | Change | File(s) |
|---|--------|---------|
| 1 | Start page fully restructured with shallow hero band + glass path tiles | `OrientationPage.tsx` |
| 2 | Page transitions (200ms cross-fade) on navigation | `App.tsx` |
| 3 | Orientation boxes demoted to flat definition-list style (no fills) | `OrientationPage.tsx` |
| 4 | "Choose a path" tiles elevated with glass treatment + textured background | `OrientationPage.tsx` |
| 5 | Hero band on Start page (~40svh) with background image + drift animation | `OrientationPage.tsx` |
| 6 | Peña question (#3 in First Questions) — deliberately visible | `OrientationPage.tsx` |
| 7 | FAQ page added at route `/faq` — not in top nav | `FaqPage.tsx` (new) |
| 8 | About OON page added at route `/about` — not in top nav | `AboutPage.tsx` (new) |
| 9 | Theme toggle: compact icon + text, no border, no sliding pill | `ThemeSwitcher.tsx` |
| 10 | Read expanded row (InlineReader): `var(--bg-surface)` bg + box-shadow treatment | `BrowsePage.tsx` |
| 11 | AudioPlayer: transparent bg — inherits container | `AudioPlayer.tsx` |
| 12 | Pagination: borderless, accent underline on active page number | `Pagination.tsx` |
| 13 | Timeline sidebar ("Items in this thread") removed entirely | `TopicPage.tsx` |
| 14 | Timeline expanded: external link + count + chips → `RelatedDocsList` (clickable items) | `Timeline.tsx` |
| 15 | Timeline expanded card: box-shadow treatment (35% edges + faint glow) | `Timeline.tsx` |
| 16 | Timeline: 5-document collapsible example on "Network expansion" event | `TopicPage.tsx` |
| 17 | Style Guide removed from public footer | `Footer.tsx` |
| 18 | Footer: nav labels match top nav; FAQ + About OON support links added | `Footer.tsx` |
| 19 | Hero glass card: single `<div>`, inset `box-shadow` border (no wrapper — backdropfilter fix) | `LandingPage.tsx` |
| 20 | Hero glass: `--glass-bg` = white 28% light / dark 72% (neutral, no colour cast) | `ThemeSwitcher.tsx`, `theme.css` |
| 21 | Hero: orange blob at 78%/35% removed (overlaid right Earth globe) | `LandingPage.tsx` |
| 22 | Hero light: nothing placed behind glass — `backdrop-filter` shows image only | `LandingPage.tsx` |
| 23 | bgGradient (inner pages): max 7%/5% opacity — near-invisible atmospheric haze | `ThemeSwitcher.tsx` |
| 24 | Scroll arrow: `bounce-down` keyframe (was double-translating X, looked off-centre) | `theme.css`, `LandingPage.tsx` |
| 25 | Search bar: transparent bg, underline-only focus border | `SearchBar.tsx` |
| 26 | Sort select: transparent bg, bottom border only | `FilterBar.tsx` |
| 27 | NavTile: 28% accent inset edges on hover + faint glow | `NavTile.tsx` |
| 28 | LinkRow (Sources): accent-tint hover bg, bleeds to container edges | `LinkRow.tsx` |
| 29 | Sources access note panel: 14% accent inset edges | `SourcesPage.tsx` |
| 30 | Timeline related doc rows: accent-tint hover + 2px left bar (click affordance) | `Timeline.tsx` |
| 31 | `Page` type union updated across all files | `App.tsx`, `TopNav.tsx`, etc. |
| 32 | Light theme tokens: `--bg-elevated`, `--secondary`, `--muted` → warm off-white (not pure white) | `ThemeSwitcher.tsx`, `theme.css` |
| 33 | InlineReader panel background: `var(--secondary)` → `var(--bg-surface)` (warm surface) | `BrowsePage.tsx` |

---

## B. Pages

| Page | Route key | Current state |
|------|-----------|---------------|
| Landing | `home` | Hero glass panel, gradient border (inset shadow), scroll fix |
| **Start** | `orientation` | Shallow hero band + differentiated box treatments (flat orientation / glass path tiles) |
| Read | `read` | Expanded row bg + box treatment; search/sort bg fixed; audio bg fixed |
| Read → Item | `item` | Unchanged |
| **Timeline** | `timeline` | Sidebar removed; related docs in expanded nodes; card box treatment |
| Sources | `sources` | LinkRow hover fixed; access note panel box treatment |
| **FAQ** | `faq` | New page |
| **About OON** | `about` | New page |
| Style Guide | `style` | Dev-only — remove from `App.tsx` before public release |

---

## C. Affected Components

| Component | File | What changed |
|-----------|------|--------------|
| `App` | `App.tsx` | Page transition (200ms cross-fade); activeTheme passed to OrientationPage |
| `LandingPage` | `pages/LandingPage.tsx` | Hero glass panel architecture; no wrapper; dark-only local gradient |
| `OrientationPage` | `pages/OrientationPage.tsx` | **Major refactor:** shallow hero band; flat orientation rows; glass PathTile; textured background |
| `FaqPage` | `pages/FaqPage.tsx` | **New file** |
| `AboutPage` | `pages/AboutPage.tsx` | **New file** |
| `BrowsePage` + `InlineReader` | `pages/BrowsePage.tsx` | Expanded row bg (`--bg-surface`); box treatment; light theme warm off-white fix |
| `Timeline` | `components/Timeline.tsx` | `RelatedDocsList`; expanded card box treatment |
| `TopicPage` | `pages/TopicPage.tsx` | Sidebar removed; 5-doc example on "Network expansion" |
| `SourcesPage` | `pages/SourcesPage.tsx` | Access note panel box treatment |
| `ThemeSwitcher` | `components/ThemeSwitcher.tsx` | Toggle; bgGradient values; `--glass-bg` tokens |
| `NavTile` | `components/NavTile.tsx` | Inset-edge hover glow |
| `LinkRow` | `components/LinkRow.tsx` | Accent-tint hover; negative-margin edge bleed |
| `AudioPlayer` | `components/AudioPlayer.tsx` | Transparent bg |
| `Pagination` | `components/Pagination.tsx` | Borderless; accent underline on active |
| `SearchBar` | `components/SearchBar.tsx` | Transparent bg |
| `FilterBar` | `components/FilterBar.tsx` | Transparent sort select |
| `Footer` | `components/Footer.tsx` | Style Guide removed; FAQ + About added |
| `TopNav` | `components/TopNav.tsx` | `Page` type updated |

---

## D. Implementation Rules

### 1. Start Page — Hero Band + Box Differentiation

**NEW: The Start page now has THREE distinct visual zones:**

#### A. Shallow Hero Band (~40svh)
- Reuses homepage background image (`OON_banner_V3.jpg`) with slow drift animation
- Heavy overlay for legibility: dark 70% / light 55%
- Faint atmospheric glow at top corners (warm orange + violet) — dark mode only
- Soft gradient fade (10rem height) into flat reading surface below
- Content overlaps the band (negative margin) and sits on top with proper z-index

**Critical:** The band creates atmosphere and carries continuity from the homepage, but text MUST remain fully legible.

#### B. Orientation (4 boxes) — DEMOTED
- **Treatment:** Flat definition-list style with hairline separators
- **NO:** Surface fills, cards, shadows, or glow
- **YES:** Simple question/answer rows, ink-on-paper, quiet and recessive
- These are explanatory — they should NOT compete with the path tiles below

#### C. "Choose a Path" (3 tiles) — ELEVATED
- **Treatment:** Full glass effect from homepage hero
- **Background:** Textured band behind tiles (faint radial gradient) so `backdrop-filter: blur()` has something to blur
- **Glass recipe:**
  - `background: var(--glass-bg)` (dark 72% / light 28%)
  - `backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);`
  - `border-radius: 5px`
  - Inset edge highlights (cool accent, not warm amber — these are interactive)
  - Outer glow intensifies on hover
  - Subtle lift on hover (`translateY(-2px)`)

**Why the textured background matters:** `backdrop-filter: blur()` only produces a glass effect when there's a textured/animated background behind it. On flat color it renders as a plain box. The faint radial gradient provides just enough texture for the blur to work.

**Color rule:** Path tiles use **cool accent** (slate-blue) for edges/glow because they're interactive. Warm amber is reserved for atmospheric elements only.

---

### 2. Page Transitions

**200ms cross-fade** on all navigation:
- Trigger: `setPageTransition(true)` → wait 200ms → change page → reset transition
- Effect: `opacity: 0` during transition, `opacity: 1` normal state
- Applied to `<main>` wrapper
- Makes home→Start feel continuous, not a cold cut

---

### 3. Hero glass card — `LandingPage.tsx`

**Single `<div>`, no wrapper.** The previous approach used a wrapper div with a `background: linear-gradient(blue...)` to show a coloured border via 1px padding. Problem: CSS `backdrop-filter: blur()` blurs the parent's background as part of its "backdrop", so the blue gradient showed through the glass as a tint inside the panel.

**Fix:** `inset box-shadow` layers on the panel itself. They live on the element's surface, not behind it — `backdrop-filter` cannot pick them up.

**Border values:**
```
Dark (Solstice):
  inset 0  1px 0 rgba(232,112,32,0.65)   ← top edge, amber
  inset 1px 0  0 rgba(232,112,32,0.65)   ← left edge, amber
  inset 0 -1px 0 rgba(255,255,255,0.06)  ← bottom, near-invisible
  inset -1px 0 0 rgba(255,255,255,0.06)  ← right, near-invisible
  0 0 20px -4px  rgba(232,112,32,0.28)   ← tight outer glow
  0 0 60px -16px rgba(232,112,32,0.18)   ← diffuse halo
  0 0 30px -10px rgba(68,40,168,0.12)    ← violet secondary

Light (Meridian):
  inset 0  1px 0 rgba(51,68,168,0.75)    ← top edge, blue
  inset 1px 0  0 rgba(51,68,168,0.75)    ← left edge, blue
  inset 0 -1px 0 rgba(185,174,220,0.14)  ← bottom, faint lavender
  inset -1px 0 0 rgba(185,174,220,0.14)  ← right, faint lavender
  0 0 18px -3px  rgba(51,68,168,0.38)    ← tight outer glow
  0 0 60px -14px rgba(51,68,168,0.22)    ← diffuse halo
  0 0 32px -10px rgba(185,174,220,0.25)  ← lavender secondary
```

**Colour principle — temperature contrast:**  
Dark background → warm amber border (warm on cool = visible).  
Light background → cool blue border (cool on warm = visible).  
Amber on cream background fails — same temperature family, no contrast.

**Light theme: nothing behind the glass.**  
No local gradient, no mouse glow, nothing coloured. `backdrop-filter` blurs only the banner image. The panel stays visually clean.

**Dark theme: one violet gradient, bottom-left only.**  
`radial-gradient(ellipse at 12% 75%, rgba(68,40,168,0.14) 0%, transparent 50%)`

---

### 4. `--glass-bg` token

| Theme | Value | Why |
|-------|-------|-----|
| Solstice dark | `rgba(12,14,21,0.72)` | 72% dark neutral — image blurs through as frosted glass |
| Meridian light | `rgba(255,255,255,0.28)` | 28% white neutral — no colour cast; image blurs through cleanly |

**Use white, not cream, on light.** A warm-cream tint is in the same temperature family as the background and appears as a colour wash inside the panel, not as glass.

---

### 5. bgGradient — inner pages

`ThemeSwitcher.bgGradient` is rendered as a `position:fixed; z-index:0` div by `App.tsx`. It is always present on every page.

**Maximum opacity: 7% for the warm stop, 5% for the violet stop.** At this level it is a barely perceptible atmospheric haze — not a visible gradient. Do not raise these values. Inner pages must look clean; only the hero section adds visible colour behind its content.

---

### 6. Hover rule

**One token for all interactive surfaces:** `var(--accent-tint)` background on hover. This is a single, barely-there accent tint (`rgba(accent, 0.05–0.08)`). It reads in both themes without being heavy.

**Left accent bars are for active/selected states only** — except one deliberate exception:

| Surface | Default | Hover | Active / Selected |
|---------|---------|-------|-------------------|
| `ItemRow` | transparent | `--accent-tint` bg | 3px `--accent` left bar + `--secondary` bg |
| `NavTile` / `PathTile` | glass bg + inset edges | `--accent-tint` bg + stronger inset edges + faint glow + lift | — |
| `LinkRow` (Sources) | transparent | `--accent-tint` bg + negative-margin bleed | — |
| Timeline `RelatedDocItem` | transparent | `--accent-tint` bg + **2px left bar** *(exception — see below)* | — |
| Primary button | `--accent-fill` | opacity 0.85 | — |
| All other buttons | any | opacity 0.80 min | — |

**Exception — `RelatedDocItem` left bar on hover:**  
These rows are small and sit inside an already-expanded card with no other visual container to orient the user. The 2px left bar on hover provides the click affordance that would otherwise be absent. This is not a selected state — it disappears when the cursor leaves.

---

### 7. InlineReader (Read page)

- **Background:** `var(--bg-surface)` — warm off-white in light (`#FBFAF6`), elevated dark in dark (`#15171F`). This ensures the panel reads as warm paper in light theme, not a cold white slab.
- **AudioPlayer inside:** `background: transparent` — inherits from the InlineReader panel. Do not set a background on AudioPlayer; it causes a white-on-cream clash in light mode.
- **Left border:** `3px solid var(--accent)` (the primary signal that this row is expanded and selected).
- **Top + right edges:** `inset box-shadow` at 22% / 10% accent opacity.

---

### 8. Light theme token fixes — warm off-white surfaces

**Problem:** Pure white (`#FFFFFF`) tokens in light theme created cold slabs on the warm cream paper base (`#F3F0E9`), breaking visual continuity.

**Fix:** All white tokens replaced with warm off-white values:

| Token | Old (pure white) | New (warm off-white) | Usage |
|-------|------------------|---------------------|--------|
| `--bg-elevated` | `#FFFFFF` | `#FBFAF6` | Elevated surfaces (popovers, dropdowns) |
| `--secondary` | `#FFFFFF` | `#F8F5EF` | Secondary surfaces, active row highlights |
| `--muted` | `#FFFFFF` | `#F8F5EF` | Muted backgrounds |

**Critical:** `--bg-surface` remains `#FBFAF6` (lightest warm surface). `--bg-elevated`, `--secondary`, and `--muted` are now set to `#F8F5EF` (slightly warmer than surface) to prevent pure white clash.

**Dark theme is unaffected** — all dark theme tokens remain unchanged.

Files updated: `ThemeSwitcher.tsx` (runtime theme application), `theme.css` (CSS defaults)

---

### 9. Timeline — related documents

- Component: `RelatedDocsList` (inside `Timeline.tsx`, not exported separately).
- **0 items:** nothing rendered.
- **1–3 items:** all shown inline.
- **4+ items:** first 3 shown + "Show N more ↓" toggle button. "Show fewer ↑" collapses.
- Each row is `RelatedDocItem`: on hover, shows `--accent-tint` bg + 2px left accent bar + colour shift on title and icon.
- The external archive link was removed from the timeline expanded card — it belongs in the item detail sidebar provenance panel.

---

### 10. Start page structure

Section order (do not reorder):
1. **Hero band** (~40svh) — background image + atmospheric overlay
2. **Hero / orientation statement** — "Start with orientation, not a verdict."
3. **Orientation** — 2×2 flat definition-list rows (What is UMMO / What is OON / How to read / Where are sources)
4. **Choose a path** — 3 glass tiles matching nav exactly: **Read · Timeline · Sources** (on textured background band)
5. **First Questions** — expand/collapse (`CompactQ` component, NOT the Accordion component)
6. **Source layers** — numbered row list
7. **FAQ teaser** → links to `/faq`

**The Peña question is #3 in First Questions. Do not move or hide it.**  
The five FAQ tiles use browse-mode language (By topic / By period / By type). Do NOT show those on Start — they are internal to the Read page filters.

---

### 11. New routes — FAQ and About

Both routes are NOT in the top nav. They are accessible from:
- **FAQ** (`/faq`): Start page teaser + Footer "FAQ" link
- **About OON** (`/about`): Footer "About OON" link

Route keys in the `Page` union: `"faq"` and `"about"`. Both exist in `App.tsx`, `TopNav.tsx`, and `Footer.tsx`.

---

## E. Source-Safety

✅ No real UMMO corpus content added in any pass.  
✅ No invented institution names, document IDs, researcher names, dates, or quotes.  
✅ Start / FAQ / About copy is organisational and methodological — describes OON's approach, not the corpus.  
✅ Peña question names the counterpoint but invents no claims.  
✅ All placeholder content is marked `// ⚠ PLACEHOLDER` in page files.

---

## F. Removed / Do Not Reimplement

| What | Why it was removed |
|------|-------------------|
| Full-card treatment on Orientation boxes | Demoted to flat definition-list style — these should recede, not compete with path tiles |
| Hero gradient-border wrapper div | `backdrop-filter` blurred it and showed the colour inside the glass. Replaced with inset `box-shadow`. |
| Orange hero gradient blob at 78%/35% | Sat directly on the right Earth globe in the banner image. |
| Mouse-reactive glow on Meridian (light) | Nothing coloured can go behind the light glass — it would show through. |
| `--glass-bg` as warm cream `rgba(251,250,246,0.78)` | Cream tint created a colour wash inside the panel. Now white at 28%. |
| "Items in this thread" sidebar on Timeline | Related docs now live inside each expanded node via `RelatedDocsList`. |
| External archive link inside Timeline expanded | Belongs in the item detail sidebar provenance panel. |
| Timeline: document count ("3 docs") + type chips | Replaced with actual clickable `RelatedDocItem` rows. |
| Theme toggle sliding pill + border | Compact icon + text only; no border, no background. |
| Strong bgGradient on inner pages | Was 26%/20% — too heavy, competed with content. Now 7%/5%. |
| White `var(--card)` bg on AudioPlayer | Clashed with cream bg in light mode. Now transparent. |
| Global `button:hover { opacity }` CSS rule | Conflicted with Tailwind hover classes (double-opacity). Removed. Hover managed per-component. |
| Full-perimeter colored border on PathTile | Glass treatment uses inset box-shadow (hero pattern), not border |
| Left accent bar on PathTile hover | Reserved for active/selected only. Hover uses inset-edge glow + lift instead. |
| Pure white tokens (`#FFFFFF`) in light theme | Created cold slabs on warm cream paper. Replaced with warm off-white: `--bg-elevated` → `#FBFAF6`, `--secondary`/`--muted` → `#F8F5EF` |

---

## G. Known Risks for Codex

| Risk | Detail |
|------|--------|
| **Page router is `useState`** | Switching to React Router requires threading `onNavigate` as route pushes everywhere. No clean escape hatch. |
| **Corpus data is hardcoded** | All items/events are in page files. Needs a data layer (`src/content/*` or API) before scaling. |
| **`applyTheme()` is imperative DOM mutation** | Sets CSS vars on `document.documentElement`. Breaks SSR (Next.js, Remix). Client-side only. |
| **Banner image is a Vite asset import** | `import bannerImg from "../../imports/OON_banner_V3.jpg"` in both `LandingPage.tsx` and `OrientationPage.tsx`. If the file moves, these imports break silently. |
| **Aurora bgGradient is `position:fixed; z-index:0`** | Any new modal or overlay must use `z-index` > 0. DocumentViewer uses `z-[100]` — correct. |
| **AudioPlayer is fully simulated** | No real `<audio>` element. Timer-driven fake playback. Replacing it requires adding `src`, `currentTime`, and event listeners. |
| **DownloadPanel bundles are stubs** | Generates placeholder `.txt` files. Real bundles need a backend or static file generation step. |
| **StyleReferencePage is dev-only** | Accessible at route `"style"` via footer "Style guide" link. Must be removed or env-gated before public release. |
| **Backdrop-filter requires textured background** | If flat color is placed behind glass tiles on Start page, the blur effect disappears and they look like plain boxes. The radial gradient background band is load-bearing. |