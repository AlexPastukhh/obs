# Regional transcript — R03: LINQ set operations

Conspect: `sheet hashset`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

LINQ provides non-mutating sequence operators for distinctness and set-style combination. Results are `IEnumerable<T>` pipelines rather than mutable sets.

## Operators

- `Distinct` removes duplicate values from one sequence.
- `Union` produces values appearing in either sequence.
- `Intersect` produces values appearing in both.
- `Except` produces values from the first sequence that do not appear in the second.
- Modern LINQ also offers key-based variants such as `DistinctBy`, `UnionBy`, `IntersectBy` and `ExceptBy`.

## Execution model

- Most LINQ set operators are deferred until enumeration.
- They use internal set-like storage while enumerating but do not expose that storage as a `HashSet<T>`.
- Enumerating the result again can repeat source work unless it is materialized.
- Call `ToHashSet` when the final result needs fast repeated membership checks or mutation.

## Equality

- Overloads accept an equality comparer.
- Key-based operators compare the selected key rather than the entire source value.
- Choose a comparer consistently with downstream membership logic.

## Caveats

- Deferred queries observe their sources when enumerated, not necessarily when declared.
- Provider-backed `IQueryable` support depends on the provider and is not identical to LINQ-to-Objects.

## Covered source units

### Text elements

```text
T-014
```

### Screenshot uses

```text
IU-030, IU-031
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
