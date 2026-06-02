# Stage 0 - Authentication / OIDC / Flows / Handlers / Forwarding / Auth Events Boundary Review v001

Generated: 2026-06-02 00:10:40 UTC

## Done

- Parsed uploaded Excalidraw SVG.
- Extracted embedded PNG sources.
- Built image-use inventory and label inventory.
- Created first boundary/split plan.
- Proposed larger combined passes, roughly 70-105 image uses each.

## Why this is not transcript yet

This SVG is large:

```text
unique embedded images: 324
image uses on canvas: 325
text labels parsed: 142
```

A blind transcript would risk losing/misassigning screenshots. Stage0 is only inventory/checklist and split plan.

## Size policy for this conspect

```text
Target pass size: ~70-105 image uses.
If a pass is too mixed visually, split before transcript.
Inventory/ledger is not source of truth.
Transcript ownership is decided by visual/semantic boundary review.
```

## Proposed combined passes

| Pass | Count | Meaning |
|---|---:|---|
| P01-R01-base-auth-and-forwarding | 81 | base auth middleware + authentication service + scheme/handler providers + forwarding/challenge/forbid basics |
| P02-R02-cookie-core-and-events | 104 | cookie authentication core, ticket store, refresh, sign-in/sign-out, cookie events, redirect/sliding expiration |
| P03-R03A-jwt-handler-pipeline | 70 | JWT bearer handler pipeline, token lookup, validation, events |
| P04-R03B-R04-oidc-and-outcomes-tail | 70 | JWT outcomes/failure/challenge/forbid + OIDC/PKCE flow and sign-in bridge |

## Subregion counts

```text
R01A-base-middleware-auth-service-handlers: 35
R01B-forwarding-challenge-forbid-basics: 46
R02A-cookie-core-ticketstore-refresh-signinout: 50
R02B-cookie-events-sliding-redirects: 54
R03A-jwt-handler-pipeline-events: 70
R03B-jwt-outcomes-failure-challenge-forbid: 43
R04-oidc-flow-pkce-signin-challenge: 27
```

## Contact sheets

```text
audit-assets/contact-sheet-all-candidates-stage0.png
audit-assets/contact-sheet-P01-R01-base-auth-and-forwarding.png
audit-assets/contact-sheet-P02-R02-cookie-core-and-events.png
audit-assets/contact-sheet-P03-R03A-jwt-handler-pipeline.png
audit-assets/contact-sheet-P04-R03B-R04-oidc-and-outcomes-tail.png
```

## Next

Start with P01/R01 combined transcript only after local boundary recheck:

```text
R01 combined: base auth middleware + AuthenticationService + scheme/handler providers + forwarding/challenge/forbid basics.
```
