# Full combined final transcript — sheet hashset

Generated: 2026-06-28 02:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 21 / 21
unique embedded screenshots: 47 / 47
screenshot uses on canvas: 47 / 47
repeated screenshot placements retained: 0
visual-semantic regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — HashSet construction, methods and capacity

`HashSet<T>` stores unique values and uses an equality comparer to decide whether an incoming value already belongs to the set.

### Construction

- Create an empty set, initialize it from an existing sequence, or supply an `IEqualityComparer<T>`.
- Choose the comparer when the domain's equality differs from the type's default equality.
- For strings, an ordinal or ordinal-ignore-case comparer usually communicates intent better than culture-sensitive equality.
- Initializing from a sequence removes duplicates as the set is built.

### Core operations

- `Add` returns `true` only when the value was not already present.
- `Contains` tests membership; `Remove` returns whether an existing member was removed.
- `Clear` removes all members, while `Count` reports the number of unique values.
- `TryGetValue` retrieves the stored equal instance, which is useful when the incoming probe is equal but not reference-identical.
- `RemoveWhere` removes every member satisfying a predicate.

### Copying and enumeration

- `CopyTo` transfers members to an array.
- Enumeration order is not a contractual sorting guarantee.
- Do not rely on an observed order for persistent output or tests; sort explicitly when order matters.
- Modifying the set during enumeration invalidates the enumerator.

### Capacity

- `EnsureCapacity` can reduce resizing when the approximate final cardinality is known.
- `TrimExcess` releases unused internal capacity after a large temporary peak.
- Capacity is an implementation/storage concern and is different from `Count`.
- Preallocation helps most when many additions are expected and the set is long-lived or performance-sensitive.

### Caveats

- Mutable values whose hash-relevant fields change after insertion can become effectively unfindable.
- A good comparer must keep `Equals` and `GetHashCode` consistent.

## R02 — Mutating and relational set operations

`HashSet<T>` exposes in-place algebra operations and relation checks, making it suitable when one reusable mutable set represents the current working state.

### Mutating algebra

- `UnionWith` adds every member from the other sequence.
- `IntersectWith` keeps only members present in both inputs.
- `ExceptWith` removes members found in the other sequence.
- `SymmetricExceptWith` keeps members present in exactly one side.
- These methods mutate the receiver rather than returning a new set.

### Relations

- `IsSubsetOf` and `IsSupersetOf` allow equality between the sets.
- `IsProperSubsetOf` and `IsProperSupersetOf` additionally require a different cardinality.
- `Overlaps` returns whether at least one member is shared.
- `SetEquals` checks set equality regardless of enumeration order or duplicate values in the compared sequence.

### Comparer effects

- The receiver's comparer defines its membership semantics.
- Two sets containing visually similar strings can produce different results when they use case-sensitive versus case-insensitive comparers.
- Normalize comparer choice at aggregate boundaries rather than mixing equality rules accidentally.

### Practical patterns

- Use intersection for allowed/selected permission checks.
- Use difference for additions and removals between old and new selections.
- Use symmetric difference to identify every changed member.
- Clone the original set before a mutating operation when both original and result are needed.

### Caveats

- Mutating methods can surprise callers when the set was passed in from another layer.
- Materialize or document the operation when the other enumerable is expensive or stateful.

## R03 — LINQ set operations

LINQ provides non-mutating sequence operators for distinctness and set-style combination. Results are `IEnumerable<T>` pipelines rather than mutable sets.

### Operators

- `Distinct` removes duplicate values from one sequence.
- `Union` produces values appearing in either sequence.
- `Intersect` produces values appearing in both.
- `Except` produces values from the first sequence that do not appear in the second.
- Modern LINQ also offers key-based variants such as `DistinctBy`, `UnionBy`, `IntersectBy` and `ExceptBy`.

### Execution model

- Most LINQ set operators are deferred until enumeration.
- They use internal set-like storage while enumerating but do not expose that storage as a `HashSet<T>`.
- Enumerating the result again can repeat source work unless it is materialized.
- Call `ToHashSet` when the final result needs fast repeated membership checks or mutation.

### Equality

- Overloads accept an equality comparer.
- Key-based operators compare the selected key rather than the entire source value.
- Choose a comparer consistently with downstream membership logic.

### Caveats

- Deferred queries observe their sources when enumerated, not necessarily when declared.
- Provider-backed `IQueryable` support depends on the provider and is not identical to LINQ-to-Objects.

## R04 — LINQ versus HashSet

LINQ set operators and `HashSet<T>` use related concepts but serve different ownership, execution and performance needs.

### Result and ownership

- LINQ returns a new enumerable view and leaves the inputs unchanged.
- `HashSet<T>` methods usually mutate an owned set.
- Use LINQ for declarative transformation pipelines; use a set when membership state is itself the data structure.

### Timing

- LINQ is commonly deferred.
- `HashSet<T>` additions and mutations happen immediately.
- Materializing a LINQ result with `ToHashSet` creates an immediate mutable set.

### Membership and repeated work

- `HashSet<T>.Contains` is designed for repeated membership checks.
- A sequence query may rebuild temporary lookup state on every enumeration.
- When a result will be queried repeatedly, materialization can be cheaper and clearer.

### Duplicates and order

- Both models express uniqueness according to a comparer.
- Neither set semantics nor `HashSet<T>` promises sorted output.
- LINQ often preserves a useful first-seen order in LINQ-to-Objects, but set correctness should not depend on undocumented ordering across providers or implementations.

### Decision guide

- One transformation and immediate enumeration: LINQ is concise.
- Many membership checks or incremental updates: use `HashSet<T>`.
- Need original and result: use LINQ or operate on a clone.
- Need database translation: keep operations in the supported `IQueryable` pipeline.

### Caveats

- Benchmark realistic cardinalities and comparer costs before optimizing.
- Do not convert every sequence to a set when ordering and duplicates are meaningful.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 2 | 20 | 20 | 0 | 0 |
| R02 | 11 | 13 | 13 | 0 | 0 |
| R03 | 1 | 2 | 2 | 0 | 0 |
| R04 | 7 | 12 | 12 | 0 | 0 |

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots remain authoritative for exact source code, browser/runtime
version details and original spelling.
