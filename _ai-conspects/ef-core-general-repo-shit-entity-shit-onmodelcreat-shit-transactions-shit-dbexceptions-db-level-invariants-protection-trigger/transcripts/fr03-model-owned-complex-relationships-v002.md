# FR03 — Model configuration, owned/complex values, keys, and aggregate relationships

Generated: 2026-06-27 UTC

## Coverage boundary

```text
complete source SVG: source/source-complete-v002.svg
source SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
image uses assigned: 16
original uses rechecked: 13
recovered uses reviewed: 3
coverage level: source-level verified semantic transcript
```

## Verified semantic transcript

### Owned and complex value objects

Owned or complex values can map multiple columns into one domain concept such as `FullName` or `Money`. Optionality must be configured deliberately. When every mapped column is null, EF may represent the value as absent; when the value exists, mapped columns reconstruct it. Configure column names, lengths, requiredness, precision, and concurrency behavior at the component-property level.

A multi-column value object is not naturally handled by a one-column value converter or a wrapper such as `Maybe<T>`. Map the component explicitly and expose domain-friendly optionality around it. If the component is required, enforce that in both EF configuration and the database. If it is optional, nullable component columns and navigation/complex-property optionality must agree.

### Keys and relationships

Primary keys identify rows. Alternate keys represent additional unique identifiers and can be foreign-key targets. A unique index enforces uniqueness without necessarily introducing principal-key semantics. Composite keys and indexes model uniqueness over several columns.

Before modeling a relationship, decide whether an identity is meaningful only inside an aggregate or globally. Aggregate-local children normally use a relationship owned by the root. References to another aggregate usually store that aggregate's identifier and map an ordinary relationship. Optional child entities, owned values, and external aggregate references are different modeling choices even if all can use nullable columns.

### Correlated nullability and model-level rules

Rules such as "first name and last name are either both present or both absent" require an explicit database predicate; nullable CLR annotations alone do not enforce the database invariant. Model configuration should name columns and constraints clearly so later provider-error mapping can identify the violated rule.

## Complete use mapping

| Use | Source set | Image | Coverage | Semantic role |
|---|---|---|---|---|
| `S-017` | `original-incomplete-svg-set` | `OLD-5152f87def` | `verified-semantic-transcript-final-v002` | Optional owned FullName mapping with nullable component columns. |
| `S-025` | `original-incomplete-svg-set` | `OLD-354939e8d7` | `verified-semantic-transcript-final-v002` | Optional owned/value-object materialization behavior and all-null column handling in EF Core. |
| `S-026` | `original-incomplete-svg-set` | `OLD-3945d0f1d7` | `verified-semantic-transcript-final-v002` | Explicit configuration for an optional owned FullName navigation and nullable owned columns. |
| `S-039` | `original-incomplete-svg-set` | `OLD-9f752fd7b7` | `verified-semantic-transcript-final-v002` | Nullable value object inside an aggregate: domain representation and optional FullName semantics. |
| `S-041` | `original-incomplete-svg-set` | `OLD-9be28189df` | `verified-semantic-transcript-final-v002` | EF configuration for an optional owned FullName value object. |
| `S-045` | `original-incomplete-svg-set` | `OLD-3945d0f1d7` | `covered-as-duplicate-placement via `S-026`` | Alternative explicit mapping for optional owned FullName columns. |
| `S-046` | `original-incomplete-svg-set` | `OLD-dfe76f5f7c` | `verified-semantic-transcript-final-v002` | DDD distinction between an optional child entity inside an aggregate and a reference to another aggregate. |
| `S-048` | `original-incomplete-svg-set` | `OLD-8d6946160e` | `verified-semantic-transcript-final-v002` | EF relationship mapping for child entities and references to other aggregates. |
| `S-050` | `original-incomplete-svg-set` | `OLD-deb7e62c3f` | `verified-semantic-transcript-final-v002` | DDD identity rule: decide whether identity is aggregate-local or globally meaningful before modeling a relationship. |
| `S-053` | `original-incomplete-svg-set` | `OLD-2e1caff84a` | `verified-semantic-transcript-final-v002` | EF Core complex-type mapping for a multi-column Money value with optionality/concurrency configuration. |
| `S-055` | `original-incomplete-svg-set` | `OLD-064840baae` | `verified-semantic-transcript-final-v002` | How an optional complex/owned Money value is represented when every mapped column is null. |
| `S-057` | `original-incomplete-svg-set` | `OLD-548433edd7` | `verified-semantic-transcript-final-v002` | Materializing a non-null multi-column Money value object. |
| `S-059` | `original-incomplete-svg-set` | `OLD-685f8e9fda` | `verified-semantic-transcript-final-v002` | Why a wrapper such as Maybe<Money> is not naturally mapped by EF conversion for a multi-column value object. |
| `NU-093` | `recovered-complete-svg-set` | `NIMG-161` | `verified-semantic-transcript-final-v002` | Complete EF model used by the invariant and error-handling examples: User, Order, status, dates, total, and rowversion. |
| `NU-094` | `recovered-complete-svg-set` | `NIMG-160` | `verified-semantic-transcript-final-v002` | Model configuration for unique email, required columns, rowversion, and row-level check constraints. |
| `NU-095` | `recovered-complete-svg-set` | `NIMG-089` | `verified-semantic-transcript-final-v002` | Additional model configuration for composite uniqueness and date/amount checks. |

## Candidate and boundary checks

- Every listed use is present in `data/full-use-coverage-v002.csv` and has exactly one primary final region.
- Duplicate placements are linked to a reviewed primary use by identical Excalidraw `fileId`.
- Exact code punctuation remains recoverable from the preserved PNG and complete SVG.
- No label-only assumption closes an image: the image itself was reviewed or explicitly excluded.

## Region status

```text
assigned uses: 16
unresolved uses: 0
unmapped uses: 0
```
