# FR01 — Tracking, query materialization, identity resolution, and warm-context reads

Generated: 2026-06-27 UTC

## Coverage boundary

```text
complete source SVG: source/source-complete-v002.svg
source SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
image uses assigned: 32
original uses rechecked: 20
recovered uses reviewed: 12
coverage level: source-level verified semantic transcript
```

## Verified semantic transcript

### Tracking modes and identity maps

A tracking query registers each materialized entity in the `DbContext` identity map and keeps state needed for change detection, original-value comparison, relationship fix-up, and later `SaveChanges`. The cost is client CPU and heap memory; it is not an extra database round-trip by itself. One context can track only one entity instance for a given primary key, which is why attaching or querying a second instance with the same key can create conflicts.

For read-only work, plain `AsNoTracking()` is the cheapest normal default. When a result graph repeats the same database row and object identity inside that one result matters, `AsNoTrackingWithIdentityResolution()` uses a temporary identity map. It avoids duplicate object instances within the materialized graph, but costs more CPU and memory than plain no-tracking and does not keep long-lived tracking after materialization.

### Find, tracked roots, and explicit loading

`Find(key)` first consults the current context's change tracker. If the entity is already tracked, it returns that same instance without querying the database. If the root is already in hand, calling `Find` again is redundant; use explicit `Load` for a missing navigation. Explicitly loading several collections normally performs several queries. This is often useful in a warm unit-of-work context, while a fresh read path may be clearer as one eager query or a projection.

A database query cannot see unsaved in-memory mutations merely because the isolation level is weak. Those changes exist only in the ChangeTracker until SQL is sent. Inside one database transaction, however, later SQL normally sees earlier writes from that same transaction.

### Projections and domain integrity

Projecting directly to DTOs or anonymous shapes is usually the strongest read optimization because it avoids full entity and navigation materialization. A partially initialized domain entity can lie about its invariants and available data. Use projections for partial read models; reserve domain entities for shapes that satisfy the domain contract.

### DbSet properties

Expression-bodied `DbSet<TEntity>` properties that delegate to `Set<TEntity>()` store no backing field and avoid nullable initialization noise. `get; set; = null!` remains valid, but the expression-bodied form makes the behavior explicit.

## Complete use mapping

| Use | Source set | Image | Coverage | Semantic role |
|---|---|---|---|---|
| `S-002` | `original-incomplete-svg-set` | `OLD-e64cf87310` | `verified-semantic-transcript-final-v002` | Configure no-tracking as the default for read-heavy paths and opt into tracking for update workflows. |
| `S-005` | `original-incomplete-svg-set` | `OLD-af19e8920a` | `verified-semantic-transcript-final-v002` | DbContext identity map: one tracked instance per primary key and why duplicate tracked instances are dangerous. |
| `S-009` | `original-incomplete-svg-set` | `OLD-1256f47477` | `verified-semantic-transcript-final-v002` | AsNoTrackingWithIdentityResolution for read-only materialization that still needs one object instance per key. |
| `S-012` | `original-incomplete-svg-set` | `OLD-27e0fafb7d` | `verified-semantic-transcript-final-v002` | When Single/Find/Attach produce a tracked entity and how the same DbContext reuses it. |
| `S-016` | `original-incomplete-svg-set` | `OLD-5f5db5c14f` | `verified-semantic-transcript-final-v002` | Project only required fields into DTOs for read paths rather than materializing a full tracked aggregate. |
| `S-023` | `original-incomplete-svg-set` | `OLD-07d0c9bb3c` | `verified-semantic-transcript-final-v002` | Find first checks the change tracker and can return an already tracked instance without a database query. |
| `S-029` | `original-incomplete-svg-set` | `OLD-f5a69d20bc` | `verified-semantic-transcript-final-v002` | When an entity is already tracked, explicit Load is enough; an additional Find is redundant. |
| `S-031` | `original-incomplete-svg-set` | `OLD-0e5b2c9aff` | `verified-semantic-transcript-final-v002` | Find is useful when the key is known and the entity may or may not already be tracked. |
| `S-033` | `original-incomplete-svg-set` | `OLD-05e414e028` | `verified-semantic-transcript-final-v002` | Definition and scope of AsNoTrackingWithIdentityResolution. |
| `S-034` | `original-incomplete-svg-set` | `OLD-be97b0c8b5` | `verified-semantic-transcript-final-v002` | Comparison of tracking, no-tracking, and no-tracking with temporary identity resolution. |
| `S-036` | `original-incomplete-svg-set` | `OLD-75c8a8c2fe` | `verified-semantic-transcript-final-v002` | No-tracking plus identity resolution reuses instances only within the materialized result graph. |
| `S-038` | `original-incomplete-svg-set` | `OLD-2252a4c4af` | `verified-semantic-transcript-final-v002` | Identity resolution matters when joins repeat the same entity row in a result graph. |
| `S-042` | `original-incomplete-svg-set` | `OLD-eb072cdd8b` | `verified-semantic-transcript-final-v002` | Practical choice among tracking modes; identity-resolution mode is useful, not a universal default. |
| `S-043` | `original-incomplete-svg-set` | `OLD-e3704b53e4` | `verified-semantic-transcript-final-v002` | Find plus explicit Load for a known tracked root and conditional navigation loading. |
| `S-044` | `original-incomplete-svg-set` | `OLD-16669395cb` | `verified-semantic-transcript-final-v002` | Why plain AsNoTracking is usually the cheapest default for read-only work. |
| `S-049` | `original-incomplete-svg-set` | `OLD-f79556b4d7` | `verified-semantic-transcript-final-v002` | Projection that repeats the same entity and the value of identity resolution in the materialized result. |
| `S-051` | `original-incomplete-svg-set` | `OLD-a42c0c4aad` | `verified-semantic-transcript-final-v002` | Self-referencing graph materialization and identity resolution across repeated employee rows. |
| `S-056` | `original-incomplete-svg-set` | `OLD-3edaef3497` | `verified-semantic-transcript-final-v002` | Hybrid loading pattern: use tracked root plus explicit Load in warm contexts, Include in cold contexts. |
| `S-058` | `original-incomplete-svg-set` | `OLD-1607e83e8f` | `verified-semantic-transcript-final-v002` | Why the warm-context/cold-context hybrid can avoid redundant root queries. |
| `S-060` | `original-incomplete-svg-set` | `OLD-b074625c29` | `verified-semantic-transcript-final-v002` | The optimization is situational; extra branching may cost more than the saved query. |
| `NU-046` | `recovered-complete-svg-set` | `NIMG-005` | `verified-semantic-transcript-final-v002` | Change-tracking heap-memory overhead: identity map, original values, relationship fix-up and snapshots. |
| `NU-047` | `recovered-complete-svg-set` | `NIMG-131` | `verified-semantic-transcript-final-v002` | CPU overhead during materialization and SaveChanges: key extraction, identity lookup, fix-up and change detection. |
| `NU-048` | `recovered-complete-svg-set` | `NIMG-073` | `verified-semantic-transcript-final-v002` | Clarifies what tracking overhead is not: not stack memory and not inherently an extra database round-trip. |
| `NU-049` | `recovered-complete-svg-set` | `NIMG-112` | `verified-semantic-transcript-final-v002` | Rule of thumb: AsNoTracking for read-only work; tracking when loaded entities will be modified and saved. |
| `NU-040` | `recovered-complete-svg-set` | `NIMG-137` | `verified-semantic-transcript-final-v002` | Separates reading your own uncommitted writes from reading another transaction’s uncommitted writes. |
| `NU-165` | `recovered-complete-svg-set` | `NIMG-101` | `verified-semantic-transcript-final-v002` | Nullable-warning context for DbSet properties and the expression-bodied Set<TEntity>() pattern. |
| `NU-039` | `recovered-complete-svg-set` | `NIMG-181` | `verified-semantic-transcript-final-v002` | Same-transaction example showing that later queries normally see earlier writes before commit. |
| `NU-166` | `recovered-complete-svg-set` | `NIMG-125` | `verified-semantic-transcript-final-v002` | Explains that an expression-bodied DbSet property delegates to DbContext.Set<TEntity>() and stores no field. |
| `NU-050` | `recovered-complete-svg-set` | `NIMG-044` | `verified-semantic-transcript-final-v002` | AsNoTrackingWithIdentityResolution trade-off: fewer duplicate instances than plain no-tracking, but extra client CPU. |
| `NU-051` | `recovered-complete-svg-set` | `NIMG-098` | `verified-semantic-transcript-final-v002` | Identity-resolution work: key lookups, a temporary instance cache and relationship fix-up during materialization. |
| `NU-167` | `recovered-complete-svg-set` | `NIMG-050` | `verified-semantic-transcript-final-v002` | Compares expression-bodied DbSet with get/set = null! and recommends the former as a clear modern default. |
| `NU-052` | `recovered-complete-svg-set` | `NIMG-178` | `verified-semantic-transcript-final-v002` | Temporary identity-map memory profile and why it is usually lighter than full tracking but heavier than plain no-tracking. |

## Candidate and boundary checks

- Every listed use is present in `data/full-use-coverage-v002.csv` and has exactly one primary final region.
- Duplicate placements are linked to a reviewed primary use by identical Excalidraw `fileId`.
- Exact code punctuation remains recoverable from the preserved PNG and complete SVG.
- No label-only assumption closes an image: the image itself was reviewed or explicitly excluded.

## Region status

```text
assigned uses: 32
unresolved uses: 0
unmapped uses: 0
```
