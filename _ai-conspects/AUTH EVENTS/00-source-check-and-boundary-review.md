# Stage0 - AUTH EVENTS source check and boundary review v001

Generated: 2026-06-22 UTC

## Direction check

Goal:
Convert the uploaded `AUTH EVENTS.svg` Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots or canvas labels.

Now:
This archive creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse the SVG, extract embedded images, inventory image uses and text labels, create contact sheets, propose a whole-sheet region, and initialize the coverage ledger.

Why:
This is a small conspect, so the preferred transcript unit is the complete sheet. The ledger is a checklist, not source of truth; the transcript pass must still verify visual and semantic boundaries.

Next:
Start a verified transcript pass after applying this archive. Preferred candidate: `R01 full pass = 6 image uses + 38 text labels`.

---

## Counts

```text
embedded symbols: 6
unique embedded images: 6
image uses on canvas: 6
text labels parsed: 38
duplicate image-use groups: 0
```

## Candidate region

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 6 | 38 | ASP.NET Core authentication and cookie events, challenge/forbid/redirect customization, principal validation, sliding expiration, and ProblemDetails responses |

## Important rule

```text
Stage0 region assignment is checklist only, not source of truth.
The transcript pass must visually and semantically re-check every image use and nearby label before closing coverage.
```
