# Stage0 - pointers source check and boundary review v001

Generated: 2026-06-22 UTC

## Direction check

Goal:
Convert the uploaded `pointers.svg` Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots or canvas labels.

Now:
This archive creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse the SVG, extract embedded images, inventory image uses and text labels, create contact sheets, propose a whole-sheet region, and initialize the coverage ledger.

Why:
This is a small conspect, so the preferred transcript unit is the complete sheet. The ledger is a checklist, not source of truth; the transcript pass must still verify visual and semantic boundaries.

Next:
Start a verified transcript pass after applying this archive. Preferred candidate: `R01 full pass = 9 image uses`.

---

## Counts

```text
embedded symbols: 9
unique embedded images: 9
image uses on canvas: 9
text labels parsed: 0
duplicate image-use groups: 0
```

## Candidate region

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 9 | 0 | C# unsafe pointers, fixed/pinning, stackalloc, pointer dereferencing and arithmetic, and interop-oriented memory access |

## Important rule

```text
Stage0 region assignment is checklist only, not source of truth.
The transcript pass must visually and semantically re-check every image use and nearby label before closing coverage.
```
