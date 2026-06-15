# OON · Oyagaa–Oomo Network — Design System Handoff

**For:** Figma Make refinement pass (visual + interaction only — do not change IA, routes, or page structure)
**Posture:** Calm, archival, source-serious. Reading-first. Not sci-fi, not a dashboard.

---

## 0. The one rule that governs everything

> **Cool = interactive. Warm = source-status and atmosphere. Color appears in only three places: the hero image, status pills, and the single interaction accent. Everything else is ink on paper.**

This is the rule that kills the "Christmas tree." If a thing is clickable, it is cool slate-blue. If a thing describes a source's status, it is a warm/green/gray pill. If a thing is neither, it has no color.

---

## 1. Accent decision (locked)

The interaction accent is a **muted slate-blue**, *not* electric blue, *not* orange.

- Orange was reading as a *warning* — wrong tone for a calm cosmological archive — and it was colliding with the amber "under review / partial" status, so orange meant both "click me" and "caution" at once.
- The blue disliked earlier was *electric* (over-saturated, cyber). This one is desaturated and reads scholarly.

**To switch to warm ochre instead:** change only `--accent-*` tokens in §2 to the ochre values noted in the comments. Nothing else moves.

---

## 2. Color tokens (full dark + light parity)

Build both themes from this table. Dark = "Solstice", Light = "Meridian".

### Surfaces & text

| Token | Dark (Solstice) | Light (Meridian) | Use |
|---|---|---|---|
| `--bg-base` | `#0C0E15` | `#F3F0E9` | Page background (flat) |
| `--bg-surface` | `#15171F` | `#FBFAF6` | Cards, panels, search field |
| `--bg-elevated` | `#1C1E27` | `#FFFFFF` | Expanded/selected rows, raised panels |
| `--ink` | `#ECEAE3` | `#1E1B16` | Primary text |
| `--ink-muted` | `#9A9AA3` | `#6B6760` | Dates, captions, secondary text |
| `--hairline` | `rgba(255,255,255,0.10)` | `#E2DDD2` | Dividers, chip borders |

### Interaction accent (cool slate-blue)

| Token | Dark | Light | Use |
|---|---|---|---|
| `--accent` | `#9AA6DC` | `#44559E` | Links, active nav text, selected-row left bar |
| `--accent-fill` | `#5566A8` | `#44559E` | Primary button fill |
| `--accent-on-fill` | `#ECEAE3` | `#FBFAF6` | Text on primary button |
| `--accent-tint` | `rgba(122,140,201,0.08)` | `rgba(68,85,158,0.07)` | Hover wash on secondary buttons / filter pills |
| `--accent-ring` | `rgba(122,140,201,0.50)` | `rgba(68,85,158,0.40)` | Focus ring |

> Ochre alternative (if chosen): `--accent` `#D2812A`/`#A76300`, `--accent-fill` `#D2812A`/`#A76300`, `--accent-on-fill` `#1A1206`.

### Warm — reserved for atmosphere only (never on UI controls)

| Token | Dark | Light | Use |
|---|---|---|---|
| `--glow-warm` | `#E87020` | `#C77A2E` | Faint top-corner ambient glow (≤10% opacity) |
| `--glow-violet` | `#4428A8` | `#B9AEDC` | Faint opposite-corner glow (6–8% opacity) — the whisper of the lost purple |

### Status colors (semantic, low-saturation — pills only)

| Status | Dark text / bg / border | Light text / bg / border |
|---|---|---|
| Verified | `#6FD3A0` / `rgba(63,166,110,0.14)` / `rgba(63,166,110,0.40)` | `#2E7D52` / `rgba(46,125,82,0.10)` / `rgba(46,125,82,0.35)` |
| Under review | `#E0A45E` / `rgba(200,123,42,0.12)` / `rgba(200,123,42,0.40)` | `#92611A` / `rgba(146,97,26,0.10)` / `rgba(146,97,26,0.35)` |
| Partial | same amber family as Under review | same amber family |
| Unverified | `#9A9AA3` / `rgba(255,255,255,0.05)` / `rgba(255,255,255,0.18)` | `#6B6760` / `rgba(0,0,0,0.04)` / `#E2DDD2` |

---

## 3. Atmosphere / backgrounds

1. **Bases are FLAT.** Remove the full-page diagonal orange→violet wash currently on Read / FAQ / detail pages. It is too intense and fights the content.
2. **Ambient = two faint radial glows, not a wash.** One `--glow-warm` radial in the top-right corner at ≤10% opacity; one `--glow-violet` radial in the opposite corner at 6–8%. Both should be *almost invisible* until you compare before/after. Token-driven and image-independent — they survive any banner swap.
3. **Hero image motion stays** — keep the slow background scale / breathing animation, in **both** themes. **Hero sections only** (homepage, Start, maybe one Timeline hero). Do not animate backgrounds on content pages.
4. **Homepage hero fix:** reduce or remove the **chromatic-aberration / RGB edge-fringing** on the craft/vessel edges. It currently reads as a rendering glitch. Keep the image; lose the rainbow fringe.
5. **Overlay rules so one image works in both themes:** dark theme = image + 60–72% dark overlay; light theme = image + 45–60% cream overlay.

---

## 4. Buttons (four tiers)

| Tier | Default | Hover | Focus | Use |
|---|---|---|---|---|
| **Primary** | `--accent-fill` bg, `--accent-on-fill` text | fill lightens ~8% | `--accent-ring` 2px | One per view: "Enter the archive", "Read full document" |
| **Secondary** | transparent, `--hairline` border, `--ink` text | bg → `--accent-tint`, border → `--accent` | `--accent-ring` 2px | "What is this?", "View in archive" (as button) |
| **Tertiary** | text + icon, `--ink-muted` | text → `--ink`, icon → `--accent` | `--accent-ring` 2px | "Download", inline "View in archive" |
| **Ghost / icon** | bare icon, `--ink-muted` | icon → `--ink` | `--accent-ring` 2px | Chevrons, audio transport controls |

**Change now:** the current primary buttons use electric `#5B8CFF` → use `--accent-fill`. The audio **play** button is currently orange → it is a control, so it uses `--accent` (or stays neutral ink). Warm is not allowed on controls.

---

## 5. ONE hover rule per interaction type

The "special hover on some items, simple on others" problem is Make improvising a different hover per component. Replace all of it with this single table. Every instance of a given type uses the same hover. No exceptions.

| Type | Hover |
|---|---|
| List row | bg → `rgba(255,255,255,0.04)` (dark) / `rgba(0,0,0,0.03)` (light); chevron → `--accent` |
| Nav item | text `--ink-muted` → `--ink`. Active item = `--accent` text + 2px `--accent` underline (never an outlined pill) |
| Link | `--accent` always; underline appears on hover |
| Primary button | fill lightens ~8% |
| Secondary / tertiary button | bg → `--accent-tint`; border/icon → `--accent` |
| Filter pill | bg → `--accent-tint`. Selected = `--accent` border + `--accent` text + check icon |
| Timeline node | dot fills `--accent`; spine segment brightens; chevron appears |
| Status pill / type chip | **no hover** — these are labels, not controls (see §6) |

---

## 6. The three-pill taxonomy (the confusion fix)

There are three pill-shaped things and they are currently indistinguishable. Make them obey different rules so the user can tell them apart by affordance.

| | **Type chip** | **Status pill** | **Filter pill** |
|---|---|---|---|
| Where | On rows + detail header | On rows + detail header | Filter bar only |
| Means | Document type (Letter, Report…) | Source status (Verified, Partial…) | A toggle control |
| Color | **Neutral always** — `--ink-muted` text, `--hairline` border, transparent bg. Icon carries the type. | **Semantic** — §2 status colors | Default neutral outline; **selected** = `--accent` |
| Interactive? | No | No | **Yes** — hovers and toggles |
| Hover | none | none | `--accent-tint`; selected = accent fill/border + check |

**Rule of thumb:** *in the filter bar it toggles; on a row it is a label.* Same shape, different behavior, and that difference is the whole point.

**Also:** drop the purple "Translated" pill. Translation is a third metadata axis — show it as a neutral chip ("Translated · EN·FR") or fold it into the provenance panel. Removing it kills a stray color.

---

## 7. Interaction states (rows, timeline, nav)

**Read list row:** `default` → `hover` (§5) → `selected` (`--bg-elevated` + 3px `--accent` left bar) → `expanded` (panel with audio player, excerpt, action buttons). Four states, one logic, every row.

**Timeline node:** `default` (hollow dot on dim spine) → `hover/active` (dot fills `--accent`, spine segment brightens, chevron appears) → `expanded` (image + quote + source link).

**Nav active marker:** quiet `--accent` text + underline. Never a filled or outlined blue pill.

---

## 8. Icon system

- One outline set (e.g. Tabler / Lucide), **one weight**, ~16–20px inline.
- Icons **inherit text color** — never their own color. (Type chip icons are muted; action icons take `--accent` on hover.)
- Type: Letter = mail · Report = file-text · Transcript = microphone · Online account = globe · Internal note = note · Commentary = message.
- Status: Verified = check · Under review = half-circle · Partial = half-circle · Unverified = circle.
- Action: Read = book · Archive = external-link · Download = download · Play = player-play.

---

## 9. Focus / accessibility

Every interactive element gets a visible keyboard focus ring: 2px `--accent-ring`, offset 2px. This is currently undefined and is required.

---

## 10. Content safety (critical — do not skip)

Everything Make has generated as **names, IDs, dates, institutions, researchers, and quotes is invented placeholder content and must not be published.** This includes (non-exhaustive): "CIFE Madrid", "Fundación Anomalía", "MUFON", "Fortean Archive", "Grupo UMMO", document IDs like "UMMO-0034", and the quote *"We have been observing your civilisation…"*.

For a site whose entire credibility rests on tracing real sources, fabricated provenance is the one thing that can discredit it. Treat all such content as **visual placeholder only.** Replace with generic labels (Archive source, Communication item, Document reference, Verified / Under review / Unverified) or with real corpus data before any public release. Make may design structure; it may not author source content.

---

## 11. Do NOT

- Redesign the IA, add pages, or rename routes.
- Invent archive names, IDs, dates, or quotes (§10).
- Use full-page saturated gradients (§3).
- Use orange/warm on any interactive control (§0, §4).
- Give different components custom one-off hovers (§5).
- Reintroduce the purple translation pill or any fourth accent color (§6).

---

## Naming note

Dossier / planet = **UMMO**. Network / brand = **Oyagaa–Oomo Network (OON)**. Never write "UMMO/OOMO". Beings = Ummites (exonym) / Oomomen (self-name).
