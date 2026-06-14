# Content Model Plan

Date: 2026-06-14
Production base: Astro
Content posture: source-first, cautious, non-sensational

## Core Rules

- Use UMMO for the dossier or subject.
- Use Oyagaa-Oomo Network or OON for the organization.
- Do not use UMMO/OOMO in public copy unless explaining naming variants.
- Do not invent archive institutions, document IDs, dates, quotes, claims, source links, translation status, or source-status values.
- Keep source text, scan/archive reference, translation, summary, analysis, hypothesis, and OON interpretation separate.
- Use TODO placeholders when source data is missing.
- Use website slugs for routing. Do not treat slugs as source document IDs.
- Do not publish a content entry until its source-safety fields have been reviewed.

## Shared Field Conventions

Recommended common fields:

- `slug`: website routing slug. Required for routable content.
- `title`: public or editorial title. Required.
- `description`: short plain-language description. Optional unless used in a listing.
- `visibility`: draft, internal, or public. Required.
- `reviewState`: editorial workflow state. Required. Values must be approved by governance before public use.
- `sourceSafetyNotes`: internal notes about missing or unresolved source checks. Required for source-related content.
- `lastReviewed`: internal review date. Optional. Do not use as a source date.

Recommended TODO placeholders:

- `TODO: Add primary document reference.`
- `TODO: Verify archive URL.`
- `TODO: Confirm translation status.`
- `TODO: Add source date only after verification.`
- `TODO: Add source text only after verification.`
- `TODO: Add summary only after source review.`
- `TODO: Add OON interpretation only after source and analysis boundaries are clear.`

## CommunicationItem

### Purpose

Represents one communication, source record, reading copy, or source-adjacent item that a reader may browse or open from Read.

This type must make provenance and source boundaries visible before interpretation.

### Proposed fields

Required:

- `slug`
- `title`
- `materialType`
- `visibility`
- `reviewState`
- `sourceDate`
- `sourceDateStatus`
- `sourceReference`
- `archiveSourceRefs`
- `sourceStatus`
- `language`
- `translationStatus`
- `sourceText`
- `translation`
- `summary`
- `analysis`
- `hypothesis`
- `oonInterpretation`
- `sourceSafetyNotes`

Optional:

- `subtitle`
- `topics`
- `timelineEvents`
- `relatedItems`
- `scanReference`
- `externalArchiveUrl`
- `readingCopyUrl`
- `audioReference`
- `rightsNotes`
- `editorialNotes`

### Source-safety notes

- `sourceText` must contain only verified source text or a TODO.
- `translation` must be separate from source text and must include translation status.
- `summary`, `analysis`, `hypothesis`, and `oonInterpretation` must never be merged.
- `sourceDate` must not be guessed.
- `sourceReference` must not be invented.
- `sourceStatus` and `translationStatus` must use approved governance values only.

### Example placeholder entry

```yaml
slug: placeholder-communication
title: "Placeholder communication item"
materialType: "TODO: Select approved material type."
visibility: "draft"
reviewState: "TODO: Select approved review state."
sourceDate: "TODO: Add source date only after verification."
sourceDateStatus: "TODO: Confirm date status."
sourceReference: "TODO: Add primary document reference."
archiveSourceRefs:
  - "TODO: Link to verified ArchiveSource entry."
sourceStatus: "TODO: Select approved source-status value."
language: "TODO: Confirm original language."
translationStatus: "TODO: Confirm translation status."
sourceText: "TODO: Add source text only after verification."
translation: "TODO: Add translation only after verification."
summary: "TODO: Add summary only after source review."
analysis: "TODO: Add analysis only after source review."
hypothesis: "TODO: Add hypothesis only if clearly labeled."
oonInterpretation: "TODO: Add OON interpretation only after boundaries are clear."
sourceSafetyNotes:
  - "TODO: Verify archive URL."
```

### What must never be invented

- Source document IDs or references.
- Archive names or URLs.
- Source dates or chronology.
- Source text or quotes.
- Translation status.
- Source-status values.
- Relationships to other communications.
- Claims about origin, authorship, prediction, science, or historical context.

## Topic

### Purpose

Represents a browse theme or subject thread inside Read. Topics help readers follow repeated subjects across communication items without turning interpretation into source fact.

Topics are not launch top navigation items.

### Proposed fields

Required:

- `slug`
- `title`
- `visibility`
- `reviewState`
- `description`
- `scopeNote`
- `sourceBoundary`
- `relatedCommunicationItems`
- `sourceSafetyNotes`

Optional:

- `parentTopic`
- `relatedTopics`
- `timelineEvents`
- `glossaryTerms`
- `readingPathIntro`
- `oonInterpretation`

### Source-safety notes

- Topic descriptions must not imply the corpus proves the topic.
- Topic pages should distinguish "source material mentions" from OON interpretation.
- Related item lists must be generated from verified relationships or kept as TODO.

### Example placeholder entry

```yaml
slug: placeholder-topic
title: "Placeholder topic"
visibility: "draft"
reviewState: "TODO: Select approved review state."
description: "TODO: Add topic description only after source review."
scopeNote: "TODO: Define what belongs in this topic and what does not."
sourceBoundary: "TODO: Explain how source mentions, summary, and interpretation stay separate."
relatedCommunicationItems:
  - "TODO: Link verified CommunicationItem slug."
sourceSafetyNotes:
  - "TODO: Verify that each related item actually belongs to this topic."
```

### What must never be invented

- Topic relationships to documents.
- Claims that a topic is central, proven, repeated, or resolved without source review.
- Source dates or sequences.
- Quotes or paraphrases from communications.
- OON conclusions.

## TimelineEvent

### Purpose

Represents one chronology entry used on Timeline or in a topic thread.

TimelineEvent should show the arc of the dossier without resolving authorship, origin, or interpretation questions.

### Proposed fields

Required:

- `slug`
- `title`
- `eventType`
- `visibility`
- `reviewState`
- `dateDisplay`
- `dateStatus`
- `summary`
- `sourceReferences`
- `sourceSafetyNotes`

Optional:

- `sortDate`
- `dateRange`
- `relatedCommunicationItems`
- `relatedTopics`
- `archiveSourceRefs`
- `analysis`
- `oonInterpretation`
- `media`

### Source-safety notes

- `dateDisplay` can be a TODO until verified.
- `sortDate` must not be guessed for convenience.
- The event title should not create a historical claim that is not source-backed.
- `analysis` and `oonInterpretation` must stay separate from `summary`.

### Example placeholder entry

```yaml
slug: placeholder-timeline-event
title: "Placeholder timeline event"
eventType: "TODO: Select approved event type."
visibility: "draft"
reviewState: "TODO: Select approved review state."
dateDisplay: "TODO: Add event date only after verification."
dateStatus: "TODO: Confirm chronology status."
summary: "TODO: Add neutral event summary only after source review."
sourceReferences:
  - "TODO: Add source reference."
sourceSafetyNotes:
  - "TODO: Verify source chain for this chronology entry."
```

### What must never be invented

- Dates, ranges, or ordering.
- Event categories that imply certainty.
- Historical context.
- Researcher actions or archive events.
- Links between timeline events and communications.
- Quotes or statistics.

## ArchiveSource

### Purpose

Represents an external archive, repository, source account, public channel, or reference location that OON points back to.

ArchiveSource must make clear that OON is not the archive.

### Proposed fields

Required:

- `slug`
- `name`
- `visibility`
- `reviewState`
- `sourceType`
- `url`
- `urlStatus`
- `description`
- `accessNotes`
- `sourceSafetyNotes`

Optional:

- `language`
- `countryOrRegion`
- `contactMethod`
- `relatedCommunicationItems`
- `rightsNotes`
- `citationGuidance`
- `lastAccessChecked`

### Source-safety notes

- Archive institution names must be verified before public use.
- URLs must be verified before public use.
- Access notes must not promise access, endorsement, or affiliation unless confirmed.
- Do not imply OON owns, controls, certifies, or replaces the archive.

### Example placeholder entry

```yaml
slug: placeholder-archive-source
name: "TODO: Add verified archive or source name."
visibility: "draft"
reviewState: "TODO: Select approved review state."
sourceType: "TODO: Select approved source type."
url: "TODO: Verify archive URL."
urlStatus: "TODO: Confirm URL status."
description: "TODO: Add description only after verification."
accessNotes: "TODO: Confirm access notes."
sourceSafetyNotes:
  - "TODO: Confirm that OON may link to this source."
```

### What must never be invented

- Archive names.
- URLs.
- Institutional descriptions.
- Access requirements.
- Holdings.
- Relationships to documents.
- Endorsement by archives or researchers.

## FAQ

### Purpose

Represents a careful answer to a reader question, especially high-friction questions that need context before interpretation.

FAQ entries should reduce confusion without becoming proof, debunking, recruitment, or disclosure framing.

### Proposed fields

Required:

- `slug`
- `question`
- `answer`
- `visibility`
- `reviewState`
- `category`
- `sourceBoundary`
- `sourceSafetyNotes`

Optional:

- `relatedCommunicationItems`
- `relatedTopics`
- `relatedGlossaryTerms`
- `relatedArchiveSources`
- `furtherReading`
- `editorialNotes`

### Source-safety notes

- Answers should use cautious language.
- If an answer references source material, it must link to verified CommunicationItem or ArchiveSource entries.
- High-risk topics require extra review before public use.
- Do not answer beyond what the source model supports.

### Example placeholder entry

```yaml
slug: placeholder-faq
question: "Placeholder reader question?"
answer: "TODO: Add answer after editorial and source review."
visibility: "draft"
reviewState: "TODO: Select approved review state."
category: "TODO: Select approved FAQ category."
sourceBoundary: "TODO: Note whether this answer is orientation, summary, analysis, or OON interpretation."
sourceSafetyNotes:
  - "TODO: Confirm whether this answer needs source references."
```

### What must never be invented

- Answers to historical or source claims.
- Names, dates, archive links, or document references.
- Claims about what the corpus proves.
- Sensitive-topic conclusions.
- Researcher motives or intentions.

## GlossaryTerm

### Purpose

Defines vocabulary used across the site so readers can distinguish terms such as dossier, corpus, source text, translation, analysis, hypothesis, and OON interpretation.

### Proposed fields

Required:

- `slug`
- `term`
- `definition`
- `visibility`
- `reviewState`
- `usageNote`
- `sourceSafetyNotes`

Optional:

- `publicLabel`
- `relatedTerms`
- `avoidLanguage`
- `examples`
- `editorialNotes`

### Source-safety notes

- Glossary definitions should define site usage, not make source claims.
- Terms related to source status must align with governance.
- Naming variant explanations must be careful and should not normalize UMMO/OOMO in ordinary public copy.

### Example placeholder entry

```yaml
slug: placeholder-glossary-term
term: "Placeholder term"
definition: "TODO: Add definition after editorial review."
visibility: "draft"
reviewState: "TODO: Select approved review state."
usageNote: "TODO: Explain how this term should be used on the site."
sourceSafetyNotes:
  - "TODO: Confirm this term does not imply an unsupported source claim."
```

### What must never be invented

- Historical meanings of terms.
- Etymologies.
- Translations.
- Source-language explanations.
- Relationships between terms and specific documents.
- Authority claims about disputed vocabulary.

## SiteCopy

### Purpose

Stores reusable public copy for route labels, section headings, helper text, metadata, empty states, and interface labels.

SiteCopy keeps public wording separate from components so copy can be reviewed without touching layout code.

### Proposed fields

Required:

- `key`
- `text`
- `usage`
- `visibility`
- `reviewState`
- `sourceSafetyNotes`

Optional:

- `description`
- `route`
- `component`
- `toneNote`
- `maxLength`
- `alternatives`
- `editorialNotes`

### Source-safety notes

- SiteCopy should avoid factual claims unless backed by content records.
- UI labels can be generic, but source-status labels must come from approved governance.
- Route labels must preserve launch nav: Start, Read, Timeline, Sources.

### Example placeholder entry

```yaml
key: "placeholder.section.heading"
text: "TODO: Add public heading after editorial review."
usage: "Placeholder use location."
visibility: "draft"
reviewState: "TODO: Select approved review state."
sourceSafetyNotes:
  - "TODO: Confirm this copy contains no unsupported source claim."
```

### What must never be invented

- Public claims about UMMO source material.
- Statistics.
- Dates.
- Archive names.
- Source-status labels.
- Quotes or paraphrases.
- Proof, debunking, or disclosure language.

## Suggested Build Order for Content Modeling

1. Define approved vocabulary for `visibility`, `reviewState`, material types, event types, and source-status values.
2. Create schemas with TODO-friendly validation.
3. Add one generic placeholder entry per content type.
4. Build static Astro components against placeholders only.
5. Add source review checklist before any real UMMO content enters the repo.
6. Add real content in small, reviewable batches after verification.
