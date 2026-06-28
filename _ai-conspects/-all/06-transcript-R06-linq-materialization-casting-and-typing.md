# Regional transcript — R06: LINQ materialization, casting and typing

Conspect: `-all`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Materialization executes a query and stores its results; casting operators control how non-generic or mixed-type sequences are interpreted.

## Materialization

- `ToList` and `ToArray` enumerate immediately and store all results.
- `ToDictionary` requires unique keys and throws on duplicates.
- `ToLookup` permits several values per key and materializes an immutable-style lookup.
- `ToHashSet` materializes unique membership with a chosen comparer.
- Materialize when a stable snapshot, repeated enumeration or collection-specific behavior is needed.

## Deferred versus immediate execution

- Most query operators are deferred and re-evaluate the source on each enumeration.
- Materialization freezes the observed values at that moment.
- Avoid accidental repeated database or network-backed query execution.

## Cast and OfType

- `Cast<T>` requires every element to be castable and throws when one is not.
- `OfType<T>` filters out elements that are not compatible with `T`.
- Use `OfType<T>` for intentionally mixed sequences; use `Cast<T>` when heterogeneous values indicate invalid state.

## AsEnumerable and typing boundaries

- `AsEnumerable` exposes an `IEnumerable<T>` view and can switch later operators from provider translation to LINQ-to-Objects.
- This boundary can be useful, but it can also move filtering or projection from the database into memory.
- Preserve `IQueryable` until all provider-translatable filtering, ordering and paging are applied.

## Caveats

- Materializing too early increases memory usage and can transfer unnecessary data.
- Dictionary keys and set members must use consistent equality semantics.

## Covered source units

### Text elements

```text
(none; this region is screenshot-only)
```

### Screenshot uses

```text
IU-001, IU-002
```

Exact code and original wording remain available in the SVG and closed ledgers.
