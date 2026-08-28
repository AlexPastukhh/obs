# Knowledge Registry

Source workspace: `_ai-conspects/returning-iqueryable-problems-when-returning-ienumerable-without-tolist-async-enumerable-problems-yield/`

Authoritative processed sources: `regions/RIQ01-iqueryable-public-api-leaky-abstraction.md`, `regions/RIQ02-ienumerable-tolist-materialization-boundary.md`, `regions/RIQ03-multiple-enumeration-hazards.md`, `regions/RIQ04-async-enumerable-repeated-enumeration.md`, and `regions/RIQ05-yield-iterator-cleanup-finally.md`

Original SVG: `assets/raw/returning-iqueryable-ienumerable-async-yield.svg`

Evidence and coverage: `03-stage3-final-closure-audit.md`; 44 of 44 image uses are processed with no missing, duplicate, extra, unreviewed, or candidate-only items.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| RIQ01 provider-translated `IQueryable` versus in-memory `IEnumerable` and provider-supported expression subset | `ef-core` | `ef-core.iqueryable-repository-and-resource-boundaries` | `../_knowledge/ef-core/iqueryable-repository-and-resource-boundaries.md` | MAPPED |
| RIQ01 public `IQueryable`/expression-tree abstraction leak, runtime failures and project-size boundary | `ef-core` | `ef-core.iqueryable-repository-and-resource-boundaries` | `../_knowledge/ef-core/iqueryable-repository-and-resource-boundaries.md` | MAPPED |
| RIQ01 plain-value filter API, internal query composition, `AsEnumerable` limitation and contract/LSP concern | `ef-core` | `ef-core.iqueryable-repository-and-resource-boundaries` | `../_knowledge/ef-core/iqueryable-repository-and-resource-boundaries.md` | MAPPED |
| RIQ02/RIQ04A synchronous materialized collection versus deferred recipe, lazy execution, pre/post-materialization LINQ boundary and replay of the original sequence | `dotnet` | `dotnet.deferred-enumeration-replay-and-materialization` | `../_knowledge/dotnet/deferred-enumeration-replay-and-materialization.md` | MAPPED |
| RIQ02 `Any` plus `foreach`, fresh enumerators, `ToList` snapshot and intentional-deferred-return criteria | `dotnet` | `dotnet.deferred-enumeration-replay-and-materialization` | `../_knowledge/dotnet/deferred-enumeration-replay-and-materialization.md` | MAPPED |
| RIQ02/RIQ03 deferred query escaping `DbContext` lifetime, hidden execution and in-boundary materialization | `ef-core` | `ef-core.iqueryable-repository-and-resource-boundaries` | `../_knowledge/ef-core/iqueryable-repository-and-resource-boundaries.md` | MAPPED |
| RIQ03 enumeration operations, repeated queries/expensive work/side effects and changing results | `dotnet` | `dotnet.deferred-enumeration-replay-and-materialization` | `../_knowledge/dotnet/deferred-enumeration-replay-and-materialization.md` | MAPPED |
| RIQ03 partial enumeration, restart behavior, delayed exceptions and materialize-on-reuse guidance | `dotnet` | `dotnet.deferred-enumeration-replay-and-materialization` | `../_knowledge/dotnet/deferred-enumeration-replay-and-materialization.md` | MAPPED |
| RIQ04 deferred async-iterator execution, `await foreach`/`ToListAsync` replay and repeated I/O | `dotnet` | `dotnet.async-enumerable-replay-and-single-use-streams` | `../_knowledge/dotnet/async-enumerable-replay-and-single-use-streams.md` | MAPPED |
| RIQ04 stream-backed single-use behavior and materialize-once reuse boundary | `dotnet` | `dotnet.async-enumerable-replay-and-single-use-streams` | `../_knowledge/dotnet/async-enumerable-replay-and-single-use-streams.md` | MAPPED |
| RIQ05 forbidden `yield return` in `finally`, early disposal and synchronous cleanup example | `dotnet` | `dotnet.iterator-disposal-and-finally-cleanup` | `../_knowledge/dotnet/iterator-disposal-and-finally-cleanup.md` | MAPPED |
| RIQ05 async-iterator cleanup analogy and shape-dependent await-in-finally caveat | `dotnet` | `dotnet.iterator-disposal-and-finally-cleanup` | `../_knowledge/dotnet/iterator-disposal-and-finally-cleanup.md` | MAPPED |
| Stage metadata, image inventory and audit bookkeeping | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Provider/repository/resource-lifetime concerns stay under EF Core because their failure mode depends on provider translation and `DbContext` lifetime.
- General synchronous replay and materialization are one .NET unit even though the source splits them across two regions; they form one execution model.
- Async replay remains separate because repeated enumeration can repeat asynchronous I/O and some stream-backed sources are effectively single-use.
- Iterator disposal/finally rules remain separate from replay because they describe cleanup during one enumeration rather than the cost of starting another.

| Status | Count |
|---|---:|
| MAPPED | 12 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
