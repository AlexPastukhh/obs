# Stage0 - ASP.NET Core / browser WebSockets source check and boundary review v001

Generated: 2026-06-22 UTC

## Direction check

Goal:
Convert `websockets.svg` into source-preserving AI-readable text without losing screenshots or canvas labels.

Now:
This archive creates the source/boundary checkpoint only. No transcript is considered done yet.

This step:
Preserve the source SVG, extract embedded images, inventory image uses and grouped text labels, check duplicate placements, generate contact sheets, propose initial regions, and initialize the coverage ledger.

Why:
Transcript should start only after image/source coverage and region boundaries are explicit.

Next:
Start transcript pass after this combined three-conspect stage0 bundle is reviewed and committed.

## Counts

```text
unique embedded images: 21
image uses on canvas: 21
text labels parsed: 53
duplicate image uses by extracted content: 0
```

## Candidate regions

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 4 | 27 | core protocol, handshake, message processing, close semantics, client/server APIs |
| R02 | 7 | 16 | .NET/browser properties, subprotocols, one-send/one-receive rule, channels, frames |
| R03 | 10 | 10 | browser client behavior, bufferedAmount, auth, cookies/JWT/origin/allowed origins |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Every transcript pass must visually and semantically re-check boundaries before marking a region complete.
```
