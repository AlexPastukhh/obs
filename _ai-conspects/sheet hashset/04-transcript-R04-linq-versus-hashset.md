# Regional transcript — R04: LINQ versus HashSet

Conspect: `sheet hashset`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 12 / 12
unique screenshots represented: 12
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

LINQ set operators and `HashSet<T>` use related concepts but serve different ownership, execution and performance needs.

## Result and ownership

- LINQ returns a new enumerable view and leaves the inputs unchanged.
- `HashSet<T>` methods usually mutate an owned set.
- Use LINQ for declarative transformation pipelines; use a set when membership state is itself the data structure.

## Timing

- LINQ is commonly deferred.
- `HashSet<T>` additions and mutations happen immediately.
- Materializing a LINQ result with `ToHashSet` creates an immediate mutable set.

## Membership and repeated work

- `HashSet<T>.Contains` is designed for repeated membership checks.
- A sequence query may rebuild temporary lookup state on every enumeration.
- When a result will be queried repeatedly, materialization can be cheaper and clearer.

## Duplicates and order

- Both models express uniqueness according to a comparer.
- Neither set semantics nor `HashSet<T>` promises sorted output.
- LINQ often preserves a useful first-seen order in LINQ-to-Objects, but set correctness should not depend on undocumented ordering across providers or implementations.

## Decision guide

- One transformation and immediate enumeration: LINQ is concise.
- Many membership checks or incremental updates: use `HashSet<T>`.
- Need original and result: use LINQ or operate on a clone.
- Need database translation: keep operations in the supported `IQueryable` pipeline.

## Caveats

- Benchmark realistic cardinalities and comparer costs before optimizing.
- Do not convert every sequence to a set when ordering and duplicates are meaningful.

## Covered source units

### Text elements

```text
T-015, T-016, T-017, T-018, T-019, T-020, T-021
```

### Screenshot uses

```text
IU-036, IU-037, IU-038, IU-039, IU-040, IU-041, IU-042, IU-043, IU-044, IU-045, IU-046, IU-047
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
