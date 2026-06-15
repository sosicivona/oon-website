Update the OON / Oyagaa–Oomo Network website design with a focused visual correction pass.

Context:
This React/Figma Make design is now the visual source of truth for the OON website. The current React repo has already gone through a content quarantine pass: unsafe source-like content was moved into `src/content/*` and replaced with generic pending-review placeholders.

Important:
Do not redesign the entire site.
Do not replace the visual system with generic cards.
Do not simplify the Figma visual language.
Do not overwrite the cleaned content architecture conceptually.
Do not reintroduce invented source content.

The site should remain:
- calm;
- archival;
- source-visible;
- reading-first;
- modern;
- non-sensational;
- beautiful but restrained.

The site should not feel:
- sci-fi;
- cultish;
- conspiracy-coded;
- proof-oriented;
- debunking-oriented;
- like a generic dashboard.

Naming:
- Use UMMO for the dossier / subject.
- Use Oyagaa–Oomo Network or OON for the organization.
- Do not use “UMMO/OOMO” in public copy unless explaining naming variants.
- OON is an interface layer over the dossier, not the archive and not the source.

Source-safety rule:
Do not add real UMMO corpus content.
Do not invent archive names.
Do not invent institution names.
Do not invent document IDs.
Do not invent dates.
Do not invent quotes.
Do not invent researcher names.
Do not invent statistics.
Do not invent source-status claims.
Use generic pending-review placeholder language only.

Acceptable placeholder language:
- “Source reference pending review”
- “Source date pending verification”
- “Archive link pending verification”
- “Translation status pending review”
- “Source excerpt pending review”
- “Corpus inventory in progress”
- “Review pending”
- “Related material pending source review”
- “Document text pending review”

Primary design goals:
1. Redesign the Start page so it is easier to scan.
2. Keep the high-friction “first questions” visible on Start, but do not make Start a long FAQ page.
3. Move “Choose a path” higher.
4. Make the theme toggle less visually heavy.
5. Fix visual issues in Read expanded rows and pagination.
6. Add design support for FAQ and About OON as support routes.
7. Keep Style Guide dev-only and out of public navigation.
8. Fix Timeline hover/click target width.
9. Produce a clear Codex/Cursor handoff.

Detailed changes:

1. START PAGE REDESIGN

The Start page should feel like orientation, not documentation.

Current problem:
- too much going on;
- difficult to scan;
- Choose a path appears too far down;
- FAQ is too long / heavy;
- the page does not clearly explain the corpus quickly enough.

New Start structure:

A. Hero / orientation statement
Use a short headline such as:
“Start with orientation, not a verdict.”

Short body:
Explain that the UMMO dossier is large, multilingual, debated, and source-layered. The reader does not need to resolve it before beginning.

B. Compact overview
Add 3–4 concise orientation panels:
- What is the UMMO dossier?
- What is OON?
- How should I read this material?
- Where do the sources live?

Each should be short and easy to scan.

C. First questions
Add a compact section, not a full FAQ, called something like:
- “First questions”
- “Before you read further”
- “The questions most readers ask first”

This section should include only the highest-friction questions that readers bring immediately:

1. What is the UMMO dossier?
2. Why is it still studied?
3. Wasn’t this resolved by José Luis Jordán Peña?
4. Is OON asking me to believe this?
5. Where do the sources live?

Each answer should be short, 2–4 sentences max.

Tone:
- sober;
- careful;
- not defensive;
- not promotional;
- not trying to “prove” the case;
- not hiding skeptical objections.

Important:
The José Luis Jordán Peña question must be visible on Start. It should not dominate the page, but it should not be hidden. Treat it as a major counterpoint that deserves careful source review.

Possible answer direction for Peña:
“The Peña authorship claim is central to the history of the case. OON treats it as a major counterpoint to study, not something to hide. The site separates source material, authorship questions, later commentary, and OON interpretation so readers can follow the layers.”

Do not overclaim.
Do not say Peña fully explains or does not explain everything.
Do not use “debunked” or “proof” framing unless clearly part of a user-facing question.

D. Choose a path
Move this higher on the page, after enough orientation to choose intelligently.

Use three route cards:
- Read
- Timeline
- Sources

These should be clearly clickable and visually distinct from informational panels.

E. Corpus/source layers explanation
Add or preserve a clear visual explanation that OON separates:
- source text;
- translation;
- summary;
- analysis;
- hypothesis;
- OON interpretation.

This should be visually scannable, not a dense paragraph.

F. FAQ teaser
Do not show the full FAQ on Start.
At the bottom, add a small teaser:
“Have questions about authorship, translations, later communications, or source status? Read the full FAQ.”

Include a quiet link/button:
“See full FAQ”

2. FULL FAQ PAGE / SUPPORT ROUTE

Add design support for a dedicated FAQ route, likely `/faq`.

The FAQ page should handle deeper questions that are too heavy for Start:
- Wasn’t this resolved by José Luis Jordán Peña?
- Is OON claiming authenticity?
- What is source text vs translation vs summary vs interpretation?
- Are later communications treated the same as early letters?
- What are D, NR, GR1, W, H, E references?
- Can I read or download the full corpus?
- What about scientific claims and predictions?
- Are Ummites related to Nordics / Tall Whites / Greys?
- Why did governments not publicly recognize this?
- What does Oyagaa–Oomo mean?

The FAQ should be accessible from:
- Start page teaser;
- Footer;
- possibly contextual links from Sources.

Do not add FAQ to top nav unless absolutely necessary.
Top nav should remain:
- Start
- Read
- Timeline
- Sources

3. ABOUT OON SUPPORT ROUTE

Add design support for About OON as a support route, likely `/about`.

About OON should explain:
- what OON is;
- what OON is not;
- why the site exists;
- how it handles source material;
- how it separates source text, translation, summary, analysis, hypothesis, and interpretation.

About does not need to be in top nav for now.
It should be accessible from:
- Footer;
- Start page “What is OON?” section if appropriate;
- possibly Sources.

4. THEME TOGGLE

Current issue:
The dark/light toggle feels too visually heavy.

Revise it so it is quieter:
- compact;
- accessible;
- not visually dominant;
- does not compete with primary page actions;
- aligned with the top nav.

Possible styles:
- small icon toggle;
- compact Dark / Light pill;
- subtle segmented control;
- quiet text + icon.

Preserve both dark and light themes.

5. READ EXPANDED ROW

Current issue:
When a Read item is expanded, the background is too white / too clashing.

Fix:
- remove pure white expanded panel backgrounds;
- use theme-aware elevated surfaces;
- ensure the expanded row harmonizes in both dark and light modes;
- keep visual hierarchy clear;
- preserve the inline reader behavior.

Use design tokens conceptually:
- base surface;
- elevated surface;
- hairline border;
- muted text;
- accent only for actions.

6. PAGINATION / BOTTOM NAV BUTTONS

Current issue:
Pagination/navigation buttons have hardcoded black/white states and poor contrast, especially in dark mode where the active number is hard to see.

Fix:
- make previous/next/active/disabled states theme-aware;
- use consistent accent or strong ink treatment;
- no hardcoded black/white mismatch;
- ensure active page number is readable in both dark and light modes;
- preserve accessibility contrast.

7. TIMELINE RELATED ITEM HOVER

Current issue:
Hover/click target under Timeline related items does not cover the full row width.

Fix:
- hover background should span the full row/card width;
- clickable area should match visual hover area;
- preserve current timeline visual structure.

8. STYLE GUIDE / STYLE REFERENCE

The Style Guide / Style Reference is useful for handoff but should not appear as a public page.

Design requirement:
- keep Style Guide as dev/handoff only;
- do not show it in public footer or public navigation;
- if there is a design for it, label it clearly as “Development / handoff only.”

9. BUTTON / ACTION COLOR CONSISTENCY

Review button hierarchy in both themes.

Rules:
- Primary action should be consistent and theme-aware.
- Secondary actions should be quieter.
- Do not use orange/warm tones for primary controls.
- Warm colors are reserved for atmosphere or status.
- Cool muted slate-blue can remain the interaction accent if it works.
- If light theme primary blue feels too light, darken it slightly, but do not make it electric.

10. DOCUMENTATION / HANDOFF DELIVERABLES

Produce a clear handoff for Codex/Cursor.

Create or update a handoff document, ideally:
`FIGMA_CHANGELOG.md`
or
`OON-design-delta-handoff.md`

The handoff must include:

A. Change log
List what changed:
- Start page structure;
- First Questions section;
- FAQ moved/reduced;
- Choose a path repositioned;
- theme toggle;
- Read expanded row;
- pagination/button states;
- About OON support route;
- FAQ support route;
- Style Guide removed from public navigation;
- Timeline hover width.

B. Affected pages
List every page affected:
- Home, if changed;
- Start;
- Read;
- Timeline;
- Sources, if changed;
- FAQ;
- About;
- Style Guide / dev-only reference.

C. Affected components
List affected components, for example:
- TopNav / ThemeSwitcher;
- OrientationPage / Start page;
- NavTile;
- Accordion / FAQ;
- ItemRow / InlineReader;
- Pagination;
- Timeline / RelatedItem row;
- Footer;
- StyleReferencePage.

D. Implementation notes for Codex/Cursor
For each change, state:
- what file/component likely needs editing;
- whether the change is layout, CSS/token, copy, behavior, or route support;
- whether the change should preserve existing `src/content/*`;
- whether any content file needs a new entry or field.

E. Source-safety notes
Confirm:
- no real UMMO corpus content was added;
- no fake source-like content was added;
- all source-like content remains generic pending-review placeholder;
- no invented archive names, dates, quotes, document IDs, or statistics were introduced.

F. Visual references
Export updated screenshots for:
- Start page dark;
- Start page light;
- First Questions section;
- FAQ page dark/light;
- Read expanded row dark/light;
- pagination states dark/light;
- Timeline hover state;
- About OON if designed.

G. Figma node list
Provide the updated Figma node links for the changed frames.

11. CODE EXPORT GUIDANCE

Do not produce a full app overwrite unless explicitly requested.

Preferred output:
- updated screenshots;
- updated Figma node links;
- design delta handoff;
- optionally updated component code snippets only for the affected components.

If generating code:
- preserve the existing React/Vite structure;
- do not undo `src/content/*`;
- do not reintroduce hardcoded fake corpus data;
- do not delete the content quarantine structure;
- do not convert to Astro;
- do not change routing yet unless specifically asked.

Goal:
Give Codex/Cursor enough precise information to patch the current cleaned React branch without replacing the whole repo.