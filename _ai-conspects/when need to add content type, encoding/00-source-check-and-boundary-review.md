# Stage0 - when need to add content type, encoding source check and boundary review v001

Generated: 2026-06-22 UTC

## Direction check

Goal:
Convert the uploaded `when need to add content type, encoding.svg` Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots or canvas labels.

Now:
This archive creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse the SVG, extract embedded images, inventory image uses and text labels, create contact sheets, propose region boundaries, and initialize the coverage ledger.

Why:
Transcript should begin only after visual/semantic boundary review. The ledger is a checklist, not source of truth.

Next:
Start a verified transcript pass after applying this archive. Preferred candidate: `R01+R02 full pass = 17 image uses`.

---

## Counts

```text
embedded symbols: 17
unique embedded images: 17
image uses on canvas: 17
text labels parsed: 0
duplicate image-use groups: 0
```

## Candidate regions

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 7 | 0 | when HttpContent sets Content-Type automatically and when ByteArrayContent/StreamContent require manual media type |
| R02 | 10 | 0 | charset vs compression Content-Encoding, StringContent/JsonContent behavior, and interoperability guidance |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual and semantic boundaries before marking coverage done.
```
