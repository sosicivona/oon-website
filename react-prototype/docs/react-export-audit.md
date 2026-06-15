# React Export Audit

Branch: `react-prototype/figma-make-v3`

Import source: `/Users/sosici/Downloads/OON website cleaned v3.zip`

Import target: `react-prototype/`

## Commands Used

Run from repository root unless noted.

| Step | Command | Result |
|---|---|---|
| Check repository state | `git status --short --branch` | Existing checkout was on another branch with an unrelated untracked `.DS_Store`. |
| Update remote refs | `git fetch origin` | Passed. |
| Move to main | `git checkout main` | Passed; local `main` was up to date with `origin/main`. |
| Create branch | `git checkout -b react-prototype/figma-make-v3` | Passed. |
| Inspect export archive | `unzip -l /Users/sosici/Downloads/OON\ website\ cleaned\ v3.zip` | Passed. |
| Create import folder | `mkdir react-prototype` | Passed. |
| Extract export | `unzip -q /Users/sosici/Downloads/OON\ website\ cleaned\ v3.zip -d react-prototype` | Passed. |
| Check package manager | `pnpm --version` | Passed; pnpm 11.1.3 available. |
| Check npm fallback | `npm --version` | Passed; npm 10.9.8 available. |
| Install dependencies | `pnpm install` | Downloaded dependencies but exited with `ERR_PNPM_IGNORED_BUILDS` until build scripts were approved. |
| Approve package build helpers | `pnpm approve-builds` | Approved `@tailwindcss/oxide` and `esbuild`; postinstall scripts passed. |
| Production build with detected package manager | `pnpm run build` from `react-prototype/` | Passed. |
| Dev server | `pnpm run dev -- --host 127.0.0.1` from `react-prototype/` | Passed; ports 5173 and 5174 were busy, Vite served `http://localhost:5175/`. |
| Dev server response check | `curl -I http://localhost:5175/` | Passed; HTTP 200. |
| Browser sanity check | In-app browser opened `http://localhost:5175/` | Passed; page rendered, no browser warnings or errors captured. |
| Required build validation | `npm run build` from `react-prototype/` | Passed. |

## Stack Audit

| Area | Finding |
|---|---|
| Framework/build tool | Vite 6.3.5 with `@vitejs/plugin-react` and `@tailwindcss/vite`. |
| React version | React 18.3.1 and React DOM 18.3.1 are installed through peer dependency resolution. |
| TypeScript setup | Source files are `.tsx`/`.ts`, but there is no `tsconfig.json` in the export and no explicit typecheck script. Vite transpiles the TSX. |
| Tailwind setup | Tailwind CSS v4.1.12, loaded through the Vite plugin. There is no `tailwind.config.js`; styles import `tw-animate-css` and use CSS variables plus inline styles. |
| Routing approach | No real router in use. `App.tsx` stores `currentPage` in React state and switches pages with conditional rendering. |
| Animation library | Package `motion` is installed, but the visible app uses CSS keyframes, inline `transition` styles, Tailwind transition classes, and `tw-animate-css`; no direct `motion` import was found in non-UI app code. |
| UI libraries | Large shadcn/Radix component folder is present under `src/app/components/ui/`. The actual visible app code outside that folder imports only `react` and `lucide-react`; Radix components appear bundled but mostly unused by the visible prototype. |
| Dependency count | `package.json` declares 55 dependencies, 4 devDependencies, and 2 peerDependencies. Total unique declared packages: 61. |
| Notable heavy or unused libraries | MUI (`@mui/material`, `@mui/icons-material`, Emotion), Recharts, React DnD, React Router, React Slick, React Responsive Masonry, date-fns, canvas-confetti, and Motion appear unused by the visible app. Radix/shadcn dependencies are used by generated UI files, but those files are mostly not imported into the visible pages. |
| True routes vs internal state navigation | Internal state navigation only. The URL stays `/` for Landing, Start, Read, Item detail, Timeline, Sources, FAQ, About, and Style reference. |
| Theme token location | CSS fallback tokens live in `src/styles/theme.css`. Runtime token objects live in `src/app/components/ThemeSwitcher.tsx`. |
| Token duplication | Yes. Theme color values and aliases are duplicated between CSS and runtime JS token objects. Runtime `applyTheme()` writes custom properties imperatively to `document.documentElement`. |
| Animation location | Keyframes live in `src/styles/theme.css`; page/component transitions live inline across pages/components; shadcn animation utility classes live in `src/app/components/ui/*`; `tw-animate-css` is imported in `src/styles/tailwind.css`. |
| Hardcoded content location | Main source-like content is hardcoded in `BrowsePage.tsx`, `ItemDetailPage.tsx`, `TopicPage.tsx`, `SourcesPage.tsx`, `SearchBar.tsx`, and `DownloadPanel.tsx`. Editorial/support copy is hardcoded in `OrientationPage.tsx`, `FaqPage.tsx`, and `AboutPage.tsx`. |
| Asset location | Visual assets and imported handoff notes live in `src/imports/`. This folder is about 53 MB and contains screenshots, banner imagery, imported markdown, and pasted prompt text. |

## Route And Page Audit

| Visible page/state | How reached | Real URL route? | Hardcoded content? | Placeholder/generated source content? | Safe for public prototype review? |
|---|---|---:|---:|---:|---|
| Landing | Initial app state; logo returns here; hero links to Read/Timeline/Sources | No | Yes | Yes: invented stats, placeholder excerpt, generic verified/source labels | Not as public content. Safe only as clearly internal visual prototype. |
| Start / Orientation | Top nav `Start`, landing CTA, footer | No | Yes | Partly. It includes editorial orientation copy plus unverified claims about scope, dates, origin dispute, external access, and Pena framing | Needs copy verification before public review. |
| Read / Browse | Top nav `Read`, landing link, Start path tile, footer | No | Yes | Yes: 15 invented item records, dates, statuses, excerpts, source-like claims, and simulated audio flags | Not safe without replacing source-like content. |
| Inline reader state | Click any Read row | No | Yes | Yes: uses invented row excerpt, statuses, fake archive link, fake download action, and simulated audio | Not safe without replacing content and disabling fake archive/download affordances. |
| Item detail | Click `Read full document` from an expanded Read row or related timeline item | No | Yes | Yes: invented DOC-0034, provenance, transcript pages, quote, Archive A, dates, language/status labels, audio, related items | Not safe for public review. |
| Document viewer modal | Item detail `Read`, `Read document`, or `Read full document` | No | Yes | Yes: invented transcript pages and metadata | Not safe for public review. |
| Topic / Timeline | Top nav `Timeline`, landing link, Start path tile, footer | No | Yes | Yes: invented events, dates, researchers, places, quotes, stats, Unsplash imagery, captions, and related items | Not safe without replacing timeline dataset. |
| Sources | Top nav `Sources`, landing link, Start path tile, footer | No | Yes | Yes: invented archive names, holding institution descriptions, access notes, and status vocabulary | Not safe without replacing archive list and access claims. |
| FAQ | Start page teaser; footer support links; About bottom nav | No | Yes | Some answers are methodological, but several reference Pena, internal codes, periods, later communications, post-1980s/online-era material, and source handling without verified citations | Needs source/copy review before public release. |
| About OON | Footer support links; FAQ bottom nav | No | Yes | Mostly organizational/methodological copy, but it still makes broad claims about OON behavior and source linking that must match implementation | Safer than source pages, but needs editorial approval. |
| Style reference | Present in `App.tsx` as `style`; not linked in TopNav/Footer in this export | No | Yes | Uses obsolete-looking token names and internal design notes; no corpus records | Keep internal only; remove or gate before public release. |

## Content Safety Audit

All findings below must be treated as visual placeholder content unless verified from real source inventory.

| File | Content found | Why risky | Recommended treatment |
|---|---|---|---|
| `src/app/pages/LandingPage.tsx` | Stats `380+`, `1950-1993`, `14`, plus placeholder source excerpt and `Verified` label | Presents unverifiable corpus size, period, institution count, and source status on first impression | Needs source verification |
| `src/app/pages/BrowsePage.tsx` | `ALL_ITEMS` array with 15 item titles, dates from 1965-1984, statuses, excerpts, `Recipient A`, `Researcher B/C`, `Planet X`, `TAUU`, statistics like `73%`, `94%`, `47`, `20-30` | Looks like real archive inventory and quoted/transcribed source material, but comments say it is invented | Move to copy inventory |
| `src/app/pages/BrowsePage.tsx` | Inline reader actions: `View in archive`, `Download`, `Associated recording - verified against transcript` | Gives users false confidence that real archive/audio/download links exist | Replace with generic placeholder |
| `src/app/components/SearchBar.tsx` | Mock results: `Letter from Oomo leadership, March 1987`, `Internal report on network structure`, `Transcript: public address, Auckland`, statuses | Search appears to return real corpus records; uses `Oomo` wording for dossier content instead of UMMO | Replace with generic placeholder |
| `src/app/pages/ItemDetailPage.tsx` | `PROVENANCE` with `August 1967`, `Verified source`, `Spanish`, `English - French`, `DOC-0034`, `Archive A` | Fabricated provenance fields can undermine source credibility | Needs source verification |
| `src/app/pages/ItemDetailPage.tsx` | `DOCUMENT_PAGES` with invented transcript text attributed to DOC-0034 and signed `UMMO` | This is source text simulation and can be mistaken for real primary material | Remove before launch |
| `src/app/pages/ItemDetailPage.tsx` | Detail title, excerpt, quote block, interpretation paragraph, Archive A link, related items | Mixes source text, summary, and OON interpretation around invented data | Move to copy inventory |
| `src/app/pages/ItemDetailPage.tsx` | Unsplash typewriter image and captions about 1978 expert analysis/typewriter profile | Implies a real expert analysis and visual match | Needs source verification |
| `src/app/pages/ItemDetailPage.tsx` | Associated audio: `Recipient A reads letter aloud, recorded 1968`, `Private recording, Barcelona research group` | Invented audio/source provenance | Remove before launch |
| `src/app/components/DownloadPanel.tsx` | Theme bundles with counts/sizes; full dossier copy with `380+ primary documents across 14 institutional sources`; generated date; downloadable placeholder files | Downloads create fake corpus artifacts on the user's machine | Remove before launch |
| `src/app/pages/TopicPage.tsx` | `TIMELINE_EVENTS` dates, event titles, Madrid/Torrejon references, researchers, pull quotes, detail paragraphs, recipient counts, `1993 disclosure` | Full invented historical chronology can read as real dossier context | Move to copy inventory |
| `src/app/pages/TopicPage.tsx` | Unsplash image URLs and captions such as `Archive A`, `Archive B`, `National Library`, typewriter analysis, observatory references | Implies real source images and institutions | Needs source verification |
| `src/app/pages/TopicPage.tsx` | FAQ answers about timeline completeness, gaps, source links, and why timeline ends in 1993 | Makes historical and archive-status claims without verified source data | Needs source verification |
| `src/app/pages/SourcesPage.tsx` | Archive list: `Archive A`, `Archive B`, `National Library`, `Reference Archive (USA)`, `Reference Collection (UK)`, `Research Network (private)`, `Institutional Collection`, `Digital Archive` | Invented holding institutions and access claims are high-risk for a source-first site | Remove before launch |
| `src/app/pages/SourcesPage.tsx` | Access note says OON can provide a reference letter and contact via address on file | Operational claim may be false | Needs source verification |
| `src/app/pages/OrientationPage.tsx` | Claims about corpus dates, Spain, 1990s, external archives, cited archives, and public/restricted access | Some may be true in broad terms, but no verified citations are attached | Needs source verification |
| `src/app/pages/OrientationPage.tsx` | Pena authorship framing and first-question answers | Sensitive historical framing must be source-checked and carefully worded | Move to copy inventory |
| `src/app/pages/FaqPage.tsx` | Pena, internal reference codes (`D`, `NR`, `GR1`, `W`, `H`, `E`), early/later communications, post-1980s accounts, online-era material | Reads like factual editorial guidance without linked source basis | Move to copy inventory |
| `src/app/pages/AboutPage.tsx` | OON claims every item links back to holding institution and that layers are always visible | This is not yet true while content is fake and routes/downloads are placeholders | Needs source verification |
| `src/imports/pasted_text/oon-website-design-update.md` | Contains instruction text about `UMMO/OOMO`, Pena, placeholder content, and public copy rules | Imported prompt/reference text should not ship as public site content or be treated as source content | Remove before launch |
| `src/imports/OON-design-system-handoff.md` | Lists examples of generated risky names such as CIFE Madrid, Fundacion Anomalia, MUFON, Fortean Archive, Grupo UMMO, UMMO-0034, and a sample quote | Useful internal warning, but unsafe if surfaced publicly as source context | Keep internal or move to project docs |

## Maintainability Audit

| Issue | Evidence | Why it matters |
|---|---|---|
| Manual state-machine routing | `App.tsx` uses `useState<Page>` and conditional rendering for every page | No URLs, no back/forward behavior, no direct links to item detail, no GitHub Pages route structure. |
| Page types duplicated | Each page/component repeats its own `type Page = ...` union | Adding or renaming a page requires edits across many files. |
| Item detail is not data-driven | `onSelectItem={() => navigate("item")}` ignores the selected item id | Every Read row and related timeline item opens the same DOC-0034 detail page. |
| Theme tokens duplicated | `src/styles/theme.css` and `ThemeSwitcher.tsx` both define token values | Future design changes can drift between CSS fallback and runtime-applied tokens. |
| Runtime theme mutation | `applyTheme()` writes CSS vars directly to `document.documentElement` | Works for this client-only Vite prototype, but complicates SSR or static pre-rendering migration. |
| Hardcoded data in pages | Arrays live inside page files (`ALL_ITEMS`, `PROVENANCE`, `DOCUMENT_PAGES`, `TIMELINE_EVENTS`, `ARCHIVES`, FAQ arrays) | Real corpus population would require editing UI code instead of content files. |
| Large component/page files | `OrientationPage.tsx` 375 lines, `Timeline.tsx` 344 lines, `TopicPage.tsx` 267 lines, `ThemeSwitcher.tsx` 271 lines, `LandingPage.tsx` 270 lines | Harder for a non-developer to review and harder to safely separate content, design, and behavior. |
| Large imported assets | `src/imports` is about 53 MB and includes many screenshots plus repeated images | Heavy prototype assets can bloat the repo and distract from the actual site assets. |
| Unused dependencies | Visible app code outside `components/ui` directly imports only `react` and `lucide-react`, while package.json includes 55 dependencies | More install weight, security surface, and maintenance noise than the prototype currently needs. |
| Generated UI library included wholesale | Full shadcn/Radix UI folder is present even though visible app mostly uses custom components | Future maintainers may not know which UI layer is canonical. |
| Accessibility gaps | Many interactive controls are plain buttons with icon/text but no consistent focus styling; modal and state navigation are custom | Needs keyboard/focus review before public or stakeholder testing. |
| Mobile risks | Complex inline grid layouts, sticky filter bar, large glass hero, fixed atmospheric imagery, and document modal need real small-screen QA | The audit only confirmed a desktop render; mobile behavior remains unverified. |
| Fake downloads | `DownloadPanel` creates downloadable placeholder files | Users could mistake generated text files for official OON/corpus artifacts. |
| External placeholder imagery | Unsplash URLs are embedded in item detail and timeline | Requires licensing/context review and likely replacement. |

## Diff Verification

| File | Change | Reason |
|---|---|---|
| `.gitignore` | Added `.DS_Store` ignore rule | Prevent local macOS metadata from being committed. |
| `react-prototype/` | Added extracted Figma Make React/Vite export from `OON website cleaned v3.zip` | Preserve the export in an isolated prototype folder without touching the Astro/root site. |
| `react-prototype/pnpm-lock.yaml` | Added lockfile generated by `pnpm install` | Record installed dependency resolution for the prototype. |
| `react-prototype/docs/react-export-audit.md` | Added this audit document | Document stack, pages, content risks, maintainability risks, validation, and recommendation. |

No Astro implementation files were modified.

## Build Validation

Required command:

```bash
npm run build
```

Run location: `react-prototype/`

Result: passed.

Warnings: none from `npm run build`.

Errors: none.

Build output directory: `react-prototype/dist/`.

Output summary:

| File | Size |
|---|---:|
| `dist/index.html` | 0.79 kB |
| `dist/assets/OON_banner_V3-Z5I7Cwqv.jpg` | 935.31 kB |
| `dist/assets/index-DWl1KQT7.css` | 95.25 kB |
| `dist/assets/index-CSmx-bhp.js` | 286.43 kB |

Additional install/build notes:

- `pnpm install` initially exited with `ERR_PNPM_IGNORED_BUILDS`.
- `pnpm approve-builds` approved `@tailwindcss/oxide` and `esbuild`, after which builds passed.
- `pnpm` prints a warning that the `pnpm` field in `package.json` is no longer read by pnpm 11.1.3.
- `pnpm install` warned that `recharts@2.15.2` is deprecated.

## Recommendation

Recommendation: **B. Use React as visual reference and port design to Astro.**

Reasons based on the actual code:

1. The prototype has no true routes; all navigation is internal React state, which works for a visual prototype but is a poor fit for a public source-first site that needs shareable static URLs.
2. The source-like content is deeply hardcoded into page/component files and includes many invented records, dates, quotes, institutions, statuses, and downloads.
3. The dependency set is much heavier than the visible app requires, while the intended project direction is a simple static GitHub Pages site with content separated from presentation.
