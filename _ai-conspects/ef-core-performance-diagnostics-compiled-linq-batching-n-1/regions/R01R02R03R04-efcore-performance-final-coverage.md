# Stage1 final coverage transcript - ef-core-performance-diagnostics-compiled-linq-batching-n-1

Generated: 2026-06-13 09:35:00 UTC

## Scope

- Conspect: EF Core performance: diagnostics, compiled LINQ, batching, N+1
- Regions: R01+R02+R03+R04
- Image uses closed: 25
- Text labels closed: 26
- Remaining unclosed image uses: 0
- Remaining unclosed text labels: 0

## Boundary review

Stage0 inventory was treated as a checklist only. The transcript pass keeps the visual/semantic roads from the contact sheets, closes all image uses and text labels, and records that no source placements remain open.

## Transcript

### R01 Query shape, conditions, fixed-shape examples

The first road distinguishes dynamic query shape from fixed query shape. EF Core can cache/compile a query shape, but if the expression tree changes per call, cache reuse drops.

Canvas labels emphasize “if and compiled queries”, “condition as parameter”, and “in fixed shape”: optional conditions should usually be expressed as parameters inside a stable expression shape when the goal is reuse.

The point is not “never branch”; it is “avoid generating a different LINQ expression shape for every parameter combination when the query is hot.”

### R02 Compiled query decision rules and hot paths

Compiled queries are presented as an optimization for hot paths, not a default style for all EF Core code.

Good candidates are stable, frequently executed queries where EF query compilation overhead is material compared with the rest of the request.

Bad candidates are cold queries, many optional filters, dynamic shapes, or application-level code where readability and maintainability matter more than removing a small infrastructure cost.

The region explicitly separates “hot”, “not hot”, “when good”, “when bad”, and “inside infrastructure / library code”.

### R03 Compiled query execution and infrastructure costs

The compiled-query execution road shows that compiled LINQ removes/lowers EF query compilation overhead, but it does not remove database I/O.

Labels such as “without compiled linq”, “Compiled query for async i/o”, and “compiled query exec hit db” make the boundary clear: execution still hits the database, and async I/O is still real I/O.

The strong emphasis marker indicates the common trap: compiled queries are not a cure for slow SQL, bad indexes, chatty access, or unnecessary round trips.

### R04 Diagnostics, N+1, batching

The diagnostics region points to slow-query detection and query-count awareness. The first step is to observe generated SQL, timings, and number of database calls.

The N+1 road explains the classic trap: iterating over IQueryable or lazy-loaded navigation patterns can cause a database call per item. The canvas labels spell this out as “iterate over IQueryable” and “we call db on each item”.

Batching is the opposite pressure: reduce excessive round trips and tune batch size where the provider/framework supports it. The label maxbatchsize is preserved as an explicit configuration clue.

Compiled queries, N+1 avoidance, and batching are separate optimizations: choose based on measured bottleneck.

## Limitations

Semantic transcript; exact code punctuation should be checked against preserved source screenshots if needed.

## Closure

All source placements from the stage0 ledger are closed in `data/image-review-ledger-v001.*`. The final coverage audit records zero remaining image uses and zero remaining text labels.
