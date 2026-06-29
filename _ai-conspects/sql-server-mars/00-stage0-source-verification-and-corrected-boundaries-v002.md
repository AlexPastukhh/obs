# Stage0 verification and corrected semantic split v002

## Source identity

Uploaded source: `SQL SERVER MARS(2).svg`

Repository raw source:

```text
_ai-conspects/sql-server-mars/source/sql-server-mars.svg
```

Git blob SHA of the uploaded SVG:

```text
87a5ecbc991f2021f439469806258729d698fed9
```

Git blob SHA in the repository:

```text
87a5ecbc991f2021f439469806258729d698fed9
```

The repository processed the exact uploaded SVG.

## Structural verification

```text
viewBox: 0 0 6102.784400549073 5059.125443024153
unique embedded images: 26
image uses: 26
canvas text labels: 13
broken embedded images: 0
external/empty image hrefs: 0
dangling <use> references: 0
duplicate embedded-image contents: 0
```

The original Stage0 inventory counts are correct. The source is complete.

## Problem in the original Stage0

The original four-region split follows source order too mechanically. Its descriptions do not match the actual content of several sources:

- original R02 mixes object-graph construction, connection-string setup, and SELECT/FETCH material;
- original R03 is described as EF/ADO.NET settings and errors, but most of its images are SELECT/FETCH/RECEIVE yield points and savepoint/transaction behavior;
- transaction/savepoint material needs its own region;
- object-graph buffering/interleaving needs a clearer region.

This is a semantic-boundary correction, not a source replacement.

## Corrected regions

### R01 — MARS execution model, buffering, and object-graph construction

```text
S-001..S-010
```

Topics:

- what MARS practically allows;
- without-MARS buffering;
- multiple active readers;
- interleaved—not parallel—progress;
- split-query object-graph construction;
- roots/posts/contributors correlation.

### R02 — enabling MARS in SQL Server / EF Core

```text
S-011..S-012
```

Topics:

- `MultipleActiveResultSets=True`;
- SQL Server provider scope;
- Windows/SQL authentication connection strings;
- EF Core caveat about savepoints.

### R03 — SQL statements that yield rows under MARS

```text
S-013..S-019
```

Topics:

- SELECT;
- FETCH;
- RECEIVE;
- why row/message-returning phases are interleaving points.

### R04 — transactions, savepoints, and interleaving constraints

```text
S-020..S-024
```

Topics:

- EF Core does not create savepoints when MARS is enabled;
- multiple active requests make rollback-to-savepoint semantics unsafe;
- MARS is not parallel transactions;
- interleaving is constrained.

### R05 — when MARS is unattractive

```text
S-025..S-026
```

Topics:

- MARS does not fix CPU, query-plan, network, materialization, tracking, or lock bottlenecks;
- one request can still block useful progress;
- one MARS connection is not a thread-safe substitute for separate connections;
- savepoint cost.

## Stage0 verdict

```text
RAW SOURCE: exact match
INVENTORY: correct
SOURCE COMPLETENESS: complete
ORIGINAL SEMANTIC SPLIT: needs correction
REBUILD FROM ANOTHER SVG: not required
```
