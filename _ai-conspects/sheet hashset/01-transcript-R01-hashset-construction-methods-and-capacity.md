# Regional transcript — R01: HashSet construction, methods and capacity

Conspect: `sheet hashset`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 20 / 20
unique screenshots represented: 20
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`HashSet<T>` stores unique values and uses an equality comparer to decide whether an incoming value already belongs to the set.

## Construction

- Create an empty set, initialize it from an existing sequence, or supply an `IEqualityComparer<T>`.
- Choose the comparer when the domain's equality differs from the type's default equality.
- For strings, an ordinal or ordinal-ignore-case comparer usually communicates intent better than culture-sensitive equality.
- Initializing from a sequence removes duplicates as the set is built.

## Core operations

- `Add` returns `true` only when the value was not already present.
- `Contains` tests membership; `Remove` returns whether an existing member was removed.
- `Clear` removes all members, while `Count` reports the number of unique values.
- `TryGetValue` retrieves the stored equal instance, which is useful when the incoming probe is equal but not reference-identical.
- `RemoveWhere` removes every member satisfying a predicate.

## Copying and enumeration

- `CopyTo` transfers members to an array.
- Enumeration order is not a contractual sorting guarantee.
- Do not rely on an observed order for persistent output or tests; sort explicitly when order matters.
- Modifying the set during enumeration invalidates the enumerator.

## Capacity

- `EnsureCapacity` can reduce resizing when the approximate final cardinality is known.
- `TrimExcess` releases unused internal capacity after a large temporary peak.
- Capacity is an implementation/storage concern and is different from `Count`.
- Preallocation helps most when many additions are expected and the set is long-lived or performance-sensitive.

## Caveats

- Mutable values whose hash-relevant fields change after insertion can become effectively unfindable.
- A good comparer must keep `Equals` and `GetHashCode` consistent.

## Covered source units

### Text elements

```text
T-001, T-003
```

### Screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013
IU-014, IU-015, IU-016, IU-017, IU-018, IU-019, IU-020
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
