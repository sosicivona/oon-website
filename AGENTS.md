# Codex Instructions

This repository will become the public Oyagaa-Oomo Network website for the OOMO/UMMO dossier. The project is intentionally being built step by step so every change is understandable, reviewable, and safe.

## Working Style

- Ivona is a UX designer, not a developer. Explain technical decisions in plain language.
- Work in small, clear steps. Prefer focused changes over broad rewrites.
- Before making large technical decisions, explain the plan and wait for approval.
- Do not build, scaffold, install, or deploy new systems unless explicitly asked.
- Do not use destructive Git commands.
- Do not force-push.
- Do not delete files unless explicitly asked.
- Prefer small pull requests with a clear purpose.
- Keep content, design, and code changes separate when practical.

## Technical Direction

The intended future direction is:

- Static website
- GitHub Pages hosting
- Astro + Tailwind CSS
- Markdown or JSON content
- No backend
- No database
- No authentication
- No paid hosting dependency

When implementing future code, keep GitHub Pages compatibility in mind. Avoid features that require server-side rendering, private environment variables, databases, authentication, or paid hosting unless the project direction changes explicitly.

## Visual Direction

Once visual direction exists, preserve it carefully. Do not replace established design patterns, typography, spacing, color, or interaction style without explaining why. Future visual work should feel modern, calm, credible, source-first, and non-sensational.

Avoid:

- Sensational UFO aesthetics
- Cultish or recruitment-like language
- Fear-based disclosure framing
- Vague mysticism
- Overly decorative effects that weaken credibility

## Source and Claim Handling

This project must not ask visitors to believe. It should help skeptical but curious visitors examine source material carefully.

Do not invent:

- Quotes
- References
- Dates
- Archive links
- Document IDs
- Translations
- Claims
- Historical context
- Relationships between documents

When source data is missing, use a clear TODO placeholder instead of guessing.

Examples:

- `TODO: Add primary document reference.`
- `TODO: Verify archive URL.`
- `TODO: Confirm translation status.`
- `TODO: Add source date only after verification.`

Separate these layers clearly:

- Source text
- Scan or archive reference
- Translation
- Summary
- Analysis
- Hypothesis
- OON interpretation

Use cautious language such as:

- "the documents state..."
- "the corpus describes..."
- "according to the source material..."
- "OON interprets this as..."
- "this remains an open question..."

Avoid proof language unless a claim is directly and narrowly supported by a verified source.

