# Regional transcript — R02: Mutating and relational set operations

Conspect: `sheet hashset`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 11 / 11
image uses processed: 13 / 13
unique screenshots represented: 13
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`HashSet<T>` exposes in-place algebra operations and relation checks, making it suitable when one reusable mutable set represents the current working state.

## Mutating algebra

- `UnionWith` adds every member from the other sequence.
- `IntersectWith` keeps only members present in both inputs.
- `ExceptWith` removes members found in the other sequence.
- `SymmetricExceptWith` keeps members present in exactly one side.
- These methods mutate the receiver rather than returning a new set.

## Relations

- `IsSubsetOf` and `IsSupersetOf` allow equality between the sets.
- `IsProperSubsetOf` and `IsProperSupersetOf` additionally require a different cardinality.
- `Overlaps` returns whether at least one member is shared.
- `SetEquals` checks set equality regardless of enumeration order or duplicate values in the compared sequence.

## Comparer effects

- The receiver's comparer defines its membership semantics.
- Two sets containing visually similar strings can produce different results when they use case-sensitive versus case-insensitive comparers.
- Normalize comparer choice at aggregate boundaries rather than mixing equality rules accidentally.

## Practical patterns

- Use intersection for allowed/selected permission checks.
- Use difference for additions and removals between old and new selections.
- Use symmetric difference to identify every changed member.
- Clone the original set before a mutating operation when both original and result are needed.

## Caveats

- Mutating methods can surprise callers when the set was passed in from another layer.
- Materialize or document the operation when the other enumerable is expensive or stateful.

## Covered source units

### Text elements

```text
T-002, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013
```

### Screenshot uses

```text
IU-021, IU-022, IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-032, IU-033, IU-034, IU-035
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
