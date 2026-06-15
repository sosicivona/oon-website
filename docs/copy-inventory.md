# React Copy Inventory

This inventory tracks visible React prototype copy after the content-safety cleanup. The prototype preserves the V3 visual shell while avoiding generated corpus/source content.

| Page | Component | Current copy | Copy type | Source risk | Approved source? | Recommended action | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Hero eyebrow | The UMMO dossier | Public copy | approved | Approved Copy Register: Locked | keep | Implemented from approved source. |
| Home | Hero headline | For sixty years, a body of communications has circulated from a source claiming to come from a planet called UMMO. | Public copy | approved | Approved Copy Register: Locked | keep | Implemented from approved source. |
| Home | Hero subhead | Letters, reports, archives, contradictions, and unanswered questions remain. Our network helps readers enter the material, follow the threads, and trace each path back to its sources. | Public copy | approved | Approved Copy Register: Locked | keep | Implemented from approved source. |
| Home | Stats row | Pending / record inventory / source paths / copy approval | Placeholder | placeholder | No | replace with approved copy | Replaces generated numbers. |
| Home | Source excerpt panel | Excerpt pending source approval. | Placeholder | placeholder | No | needs source review | Replaces generated quote-like copy. |
| Start | Hero and overview | This page will orient readers once approved Start copy and verified source paths are available. | Placeholder | placeholder | No | needs copy chat | Keeps page shell without final copy. |
| Start | First questions | Approved orientation copy is pending. | Placeholder | placeholder | No | needs copy chat | Authorship and source questions are neutralized. |
| Browse | Item rows | Communication item pending review; Source path pending review; Context note pending copy approval | Placeholder | safe shell | No | needs source review | No document IDs, dates, names, or source claims. |
| Browse | Inline reader | Excerpt pending source approval. | Placeholder | placeholder | No | needs source review | No quote marks around generated source text. |
| Browse | Actions | Open reader shell; Archive link pending verification; Download disabled | Placeholder / disabled affordance | safe shell | No | keep | Fake archive/download actions removed. |
| Item detail | Title and metadata | Communication item pending review; Source path pending verification | Placeholder | safe shell | No | needs source review | No fake document ID or archive name. |
| Item detail | Reader modal | Source text pending approval | Placeholder | placeholder | No | needs source review | Generated transcript removed. |
| Item detail | Interpretation boundary | Interpretation pending approved source path and editorial review. | Placeholder | placeholder | No | needs copy chat | Preserves visual source/interpretation separation. |
| Item detail | Download panel | Disabled pending source and rights review | Disabled placeholder | safe shell | No | keep | Fake local file generation removed. |
| Topic | Timeline heading | Timeline pending source review | Placeholder | placeholder | No | needs copy chat | No final chronology claims. |
| Topic | Timeline nodes | Date pending; Sequence point pending review | Placeholder | safe shell | No | needs source review | Generated dates, quotes, images, and related items removed. |
| Sources | Source rows | Archive source pending verification; Source path pending review | Placeholder | safe shell | No | needs source review | Invented archive names and access claims removed. |
| FAQ | Authorship/source questions | Authorship questions will be handled only with approved copy and source paths. | Provisional methodology | needs source | No | needs copy chat | Safe as prototype copy, but not final public copy. |
| About | Project posture | OON is a structured reading interface over the UMMO dossier. | Provisional methodology | needs source | Partly aligned with project rules | needs copy chat | Avoids claims that every item already links to sources. |
| Search | Search empty state | Search will become available as reviewed records are added. | Placeholder | safe shell | No | keep | Mock results removed. |
| Style reference | Audio sample | Sample audio shell | Placeholder | safe shell | No | keep | Removes invented recording/date. |

## Remaining Copy Work

- Replace Start page copy through a dedicated copy approval pass.
- Populate Browse, Item Detail, Timeline, and Sources from the reviewed corpus inventory only.
- Decide final public labels for Sources / Archives.
- Confirm whether FAQ and About remain public before source population, or keep them as provisional internal routes.
- Enable search and downloads only after reviewed records, source paths, and rights rules exist.
