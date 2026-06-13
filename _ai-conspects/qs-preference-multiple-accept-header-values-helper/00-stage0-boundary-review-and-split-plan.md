# Stage 0 - Boundary Review and Split Plan v001

Generated: 2026-06-13 08:09:52 UTC

## Source

```text
QS PREFERENCE WITH MULTIPLE ACCEPT HEADER VALUES HELPER.svg
```

## Extracted inventory

```text
unique embedded images: 30
image uses: 30
text labels: 196
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
P01 / R01+R02: 15 images
- R01: accept-header-negotiation-result-and-supported-types: 9 images
- R02: tryselect-parsing-candidates-and-matching: 6 images
P02 / R03+R04: 15 images
- R03: winner-ordering-buildresult-and-hateoas-primary-type: 7 images
- R04: controller-integration-edge-cases-and-tests: 8 images
```

## Regions

### R01 - accept-header-negotiation-result-and-supported-types

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009
```

Meaning:

```text
Accept header negotiation contract, supported representations/media types, q values, specificity and server preference mental model.
```

Boundary concern:

```text
Check neighbor contact sheets before closing; Stage0 ownership is provisional.
```

### R02 - tryselect-parsing-candidates-and-matching

```text
S-010, S-011, S-012, S-013, S-014, S-015
```

Meaning:

```text
TrySelect flow: missing Accept fallback, parsing, invalid syntax, q=0 filtering, candidate list and supported match creation.
```

Boundary concern:

```text
Check neighbor contact sheets before closing; Stage0 ownership is provisional.
```

### R03 - winner-ordering-buildresult-and-hateoas-primary-type

```text
S-016, S-017, S-018, S-019, S-020, S-021, S-022
```

Meaning:

```text
Winner ordering by q/specificity/server preference/header index, BuildResult, primary media type derivation and HATEOAS include-links flag.
```

Boundary concern:

```text
Check neighbor contact sheets before closing; Stage0 ownership is provisional.
```

### R04 - controller-integration-edge-cases-and-tests

```text
S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030
```

Meaning:

```text
Controller/output integration, edge cases, examples and tests around multiple Accept values and selected representation.
```

Boundary concern:

```text
Check neighbor contact sheets before closing; Stage0 ownership is provisional.
```


## Important labels / text noticed

```text
!!!
in controller
using Microsoft.Net.Http.Headers;
using Microsoft.Extensions.Primitives;
public static class AcceptHeaderSelectionHelper
{
// Define server preference order (first = most preferred when q ties)
// Put the variants you support here in the exact preference order you want.
private static readonly string[] SupportedByPreference =
{
"application/vnd.marvin.author.full.hateoas+json",
"application/vnd.marvin.author.full+json",
"application/vnd.marvin.author.friendly.hateoas+json",
"application/vnd.marvin.author.friendly+json",
"application/json",
"application/*",
"*/*"
};
public sealed record NegotiationResult(
string MediaType,
string PrimaryMediaType,  // e.g. vnd.marvin.author.full / vnd.marvin.author.friendly / application
bool IncludeLinks          // true if hateoas requested
);
/// <summary>
/// Picks the best matching media type from Accept header using:
/// 1) q weight (descending)
/// 2) specificity (exact > type/* > */*)
/// 3) server preference order (SupportedByPreference)
/// 4) header order as a final tie-breaker (stable by index)
/// </summary>
public static bool TrySelect(
StringValues acceptHeader,
out NegotiationResult? result)
{
result = null;
// Missing Accept => treat as */* (client accepts anything)
if (StringValues.IsNullOrEmpty(acceptHeader))
{
// choose your default representation here
var defaultMt = "application/vnd.marvin.author.friendly+json";
```

## Next

P01/R01R02 transcript: Accept negotiation contract + TrySelect parsing/matching flow.

Review these first:

```text
contact-sheet-all-candidates-stage0.png
contact-sheet-P01-*.png
contact-sheet-P02-*.png
canvas-map-labels-and-image-boxes.png
```
