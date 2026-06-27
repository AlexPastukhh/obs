# FR02 — Entity materialization, constructors, Attach, and detached graphs

Generated: 2026-06-27 UTC

## Coverage boundary

```text
complete source SVG: source/source-complete-v002.svg
source SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
image uses assigned: 8
original uses rechecked: 8
recovered uses reviewed: 0
coverage level: source-level verified semantic transcript
```

## Verified semantic transcript

### Materialization and constructors

EF Core creates entity instances from database rows and fills mapped members. It may call a parameterized constructor when parameters can be bound, or a parameterless constructor followed by member assignment. It does not promise to replay normal application creation behavior. Constructors used by persisted entities must therefore avoid service calls, database access, reliance on populated navigations, or other side effects. Local validation of constructor arguments and establishment of the object's own invariants are appropriate.

### Attach and entity state

`Attach(entity)` tells the context that an existing entity should be tracked, normally as `Unchanged`. It does not mean "insert this entity." After attachment, selected properties can be marked modified or normal change detection can observe mutations. `Update` is broader and can mark an entire graph modified, which is often unsafe for disconnected input.

When a detached graph contains references to existing entities, attach those existing nodes explicitly so EF does not mistake them for new inserts. For selective updates, attach a stub/entity with its key and mark only intended properties as modified. A tracked instance remains owned by that `DbContext`; do not try to track a second instance with the same key in the same context.

### Shadow properties

A shadow property exists in EF metadata without a corresponding CLR property. Query it with `EF.Property<T>(entity, "Name")` and configure it in the model. This is useful for persistence-only concerns such as soft-delete flags, but hidden state should not obscure important domain behavior.

## Complete use mapping

| Use | Source set | Image | Coverage | Semantic role |
|---|---|---|---|---|
| `S-001` | `original-incomplete-svg-set` | `OLD-946177ff27` | `verified-semantic-transcript-final-v002` | EF materialization and constructor behavior: mapped constructors may run, but business side effects must not be assumed. |
| `S-011` | `original-incomplete-svg-set` | `OLD-8a232da430` | `verified-semantic-transcript-final-v002` | Querying a shadow property through EF.Property without exposing it on the CLR entity. |
| `S-014` | `original-incomplete-svg-set` | `OLD-5e335b4ef1` | `verified-semantic-transcript-final-v002` | Attach an existing detached entity as Unchanged, then mark only selected properties modified. |
| `S-018` | `original-incomplete-svg-set` | `OLD-31d62e0a78` | `verified-semantic-transcript-final-v002` | Attach overloads and the fact that the entity remains tracked by the current DbContext. |
| `S-019` | `original-incomplete-svg-set` | `OLD-4538d60710` | `verified-semantic-transcript-final-v002` | Safe constructor guidance for EF materialization: parameterless is not mandatory, but constructors must be side-effect free. |
| `S-020` | `original-incomplete-svg-set` | `OLD-1b74640858` | `verified-semantic-transcript-final-v002` | Attach semantics: existing entity, no insert, initial Unchanged state, then explicit modification. |
| `S-021` | `original-incomplete-svg-set` | `OLD-bc91d60828` | `verified-semantic-transcript-final-v002` | A safe value-object constructor that validates only its own arguments and maintains local invariants. |
| `S-027` | `original-incomplete-svg-set` | `OLD-e42dcdf323` | `verified-semantic-transcript-final-v002` | Constructor anti-patterns: service calls, database access, navigation assumptions, and side effects during materialization. |

## Candidate and boundary checks

- Every listed use is present in `data/full-use-coverage-v002.csv` and has exactly one primary final region.
- Duplicate placements are linked to a reviewed primary use by identical Excalidraw `fileId`.
- Exact code punctuation remains recoverable from the preserved PNG and complete SVG.
- No label-only assumption closes an image: the image itself was reviewed or explicitly excluded.

## Region status

```text
assigned uses: 8
unresolved uses: 0
unmapped uses: 0
```
