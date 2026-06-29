# Stage0 verification and source classification correction v002

## Source identity

Uploaded source: `cookies, general theo, plain cookie options(2).svg`

Repository raw source:

```text
_ai-conspects/cookies-general-theo-plain-cookie-options/source/cookies-general-theo-plain-cookie-options.svg
```

Uploaded and repository Git blob SHA:

```text
14a0074fbd794b144a4ea3690751bf492582dbc6
```

The repository processed the exact uploaded SVG.

## Structural verification

```text
viewBox: 0 0 12630.325507025664 14103.535390232417
unique embedded images: 90
image uses: 90
canvas text labels: 25
broken embedded images: 0
external/empty image hrefs: 0
dangling <use> references: 0
duplicate embedded-image contents: 0
```

The SVG is complete and the original counts are correct.

## Corrections required in Stage0 classification

The original Stage0 treats every embedded image as normal cookie knowledge. Three sources need special classification:

- `S-001` is an unrelated Stack Overflow fragment about `IEnumerable`/`IQueryable` lazy evaluation. It belongs to another topic and must be marked `excluded-out-of-scope`, not processed as cookie evidence.
- `S-006` is a tiny crop containing only the word `Priority`.
- `S-007` is a tiny crop containing only `Partition Key Site`.

`S-006` and `S-007` are contextual UI labels. They should remain inventoried but be marked `context-only-crop`, not counted as standalone explanatory screenshots.

Correct accounting:

```text
total image uses: 90
normal cookie knowledge sources: 87
context-only crops: 2
excluded unrelated source: 1
unaccounted: 0
```

## Corrected conceptual regions

### R00 — browser UI/context and source hygiene

```text
S-001..S-007
```

- S-001 excluded as unrelated.
- S-002..S-005 browser DevTools context.
- S-006..S-007 context-only label crops.

### R01 — cookie request/response mechanics and core attributes

```text
S-008..S-018
```

### R02 — HTTP/HTTPS transport security

```text
S-019..S-032
```

### R03 — SameSite, Secure, and cross-site request behavior

```text
S-033..S-045
```

### R04 — Priority, partitioned/third-party cookies, HttpOnly, and refresh-token risks

```text
S-046..S-065
```

### R05 — CORS distinction and ASP.NET Core cookie configuration

```text
S-066..S-090
```

## Stage0 verdict

```text
RAW SOURCE: exact match
INVENTORY COUNTS: correct
SOURCE COMPLETENESS: complete
SOURCE CLASSIFICATION: needs correction for S-001/S-006/S-007
REBUILD FROM ANOTHER SVG: not required
STAGE0 CLASSIFICATION UPDATE: required
```
