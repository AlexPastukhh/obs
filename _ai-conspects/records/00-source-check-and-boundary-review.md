# Stage0 - records source check and boundary review v001

Generated: 2026-06-22 UTC

## Source/folder naming

```text
Uploaded SVG: records(1).svg
Conspect folder: _ai-conspects/records
```

The technical upload suffix `(1)` is excluded from the conspect name.

## Source form

This SVG contains vector paths and text, but no embedded raster screenshots/images.
The readable source is therefore the original SVG plus rendered canvas/region overviews and the extracted text-label inventory.

## Counts

```text
unique embedded images: 0
image uses on canvas: 0
text labels parsed: 22
vector paths: 12
vector groups: 31
```

## Candidate regions

| Region | Labels | Name | Meaning |
|---|---:|---|---|
| R01 | 6 | record-basics-equality-members-decision | record built-ins, equality/operators, positional properties, methods/private members and record-vs-class decision |
| R02 | 12 | record-class-record-struct-copying-with | record class vs record struct, copying costs, WITH expressions and immutable complex members |
| R03 | 4 | struct-passing-ref-stack-value-objects | passing structs, ref/in/out, stack-vs-heap nuances and value-object guidance |

## Rule

Candidate regions and label ledgers are checklists, not final semantic truth. A transcript pass must re-check the rendered source and nearby/parallel areas before completion.

## Next

Start the transcript/final-coverage pass after this ten-conspect stage0 bundle is committed.

Internal source path: `source/source.svg` (original uploaded filename is recorded above).
