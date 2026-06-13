# Stage 0 - Boundary Review and Split Plan v001

Generated: 2026-06-13 04:58:17 UTC

## Source

```text
produces, consumes, input output formatters 406 415, vary accept.svg
```

## Extracted inventory

```text
unique embedded images: 44
image uses: 44
text labels: 92
```

## Stage0 rule

This is not a transcript.

The inventory is a checklist only. Region ownership is not final until visual/semantic boundary review.

A region is complete only after:

```text
visual/semantic boundary review
nearby/candidate screenshot check
verified transcript archive
```

## Proposed split

```text
P01 / R01+R02:
Produces / Consumes / output-input formatter negotiation.
R01: 10 images
R02: 11 images

P02 / R03+R04:
406/415 diagnostics + Vary/Accept/browser header tail.
R03: 11 images
R04: 12 images
```

## Regions

### R01 - Produces / output formatters / Accept negotiation

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010
```

Meaning:

```text
[Produces], output formatters, XML/JSON variants, Accept header negotiation,
endpoint response type/media-type selection.
```

Boundary concern:

```text
Check R02 consumes/action-selection examples before closing R01 because both talk about formatter selection.
```

### R02 - Consumes / input formatters / action selection / 415

```text
S-011, S-012, S-013, S-014, S-022, S-023, S-024, S-025, S-026, S-027, S-032
```

Meaning:

```text
[Consumes], input formatters, custom IActionConstraint, action matching,
content type checks, 415 Unsupported Media Type.
```

Boundary concern:

```text
Check R03 406/415 diagnostics before closing R02.
```

### R03 - 406/415 diagnostics / StatusCodePages / ProblemDetails

```text
S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-028, S-029, S-030, S-031
```

Meaning:

```text
StatusCodePages, explicit 406/415 handling, ProblemDetails enrichment,
ReasonPhrases and custom status-code endpoint diagnostics.
```

Boundary concern:

```text
Check R02 consumes screenshots and R04 Vary/Accept screenshots as neighbors.
```

### R04 - Vary: Accept / browser Accept header policy

```text
S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044
```

Meaning:

```text
Vary: Accept, RespectBrowserAcceptHeader, broad browser Accept header,
content negotiation and cache behavior around Accept.
```

Boundary concern:

```text
Check R01 output negotiation as neighbor; do not duplicate basic [Produces]/formatter material.
```

## Important labels noticed

```text
produces attribute
CONSUMES
use consumes
IACTIONCONSTRAINT
what if there is no matching consumes
ADD STATUSCODEPAGES FOR 406/415 ETC
CREATE SOME ENDPOINTS FOR STATUS CODES
set varry accept
broad accept header
respect browser accept header
from browser
```

## Next

Create P01/R01R02 transcript only after reviewing:

```text
contact-sheet-P01-R01R02-produces-consumes-formatters-negotiation.png
contact-sheet-P02-R03R04-status-diagnostics-vary-accept-browser.png
canvas-map-labels-and-image-boxes.png
```
