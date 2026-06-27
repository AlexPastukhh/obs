# Regional transcript — R03: ValueComparer equality, hashing and snapshots

Conspect: `ef has conversion, value converte,comparer`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 12 / 12
unique screenshots represented: 12
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`ValueComparer<T>` supplies the three operations EF needs for mutable converted values: equality, hash generation and snapshot creation.

## Three functions

- Equality answers whether the current and original values differ.
- Hash generation supports EF internal tracking structures.
- Snapshot creation produces an independent copy of the original value.
- For `List<string>`, `ToList()` creates a new collection while immutable strings can be shared.

## Sequence semantics

- `SequenceEqual` is correct when order and duplicate positions are meaningful.
- Hash values should be combined in the same order when equality is order-sensitive.
- Null handling must be consistent across equality, hash and snapshot functions.

## Set or multiset semantics

- For tags where order is irrelevant and duplicates are irrelevant, compare normalized sets.
- For multiset semantics, sort or count occurrences so duplicate multiplicity remains meaningful.
- The hash must reflect the same semantic model as equality.
- Normalization can use an ordinal or case-insensitive comparer according to domain rules.

## Effect on tracking

- In-place `Add` or `Remove` becomes detectable.
- Replacing the list also remains detectable.
- EF can compare the current value with a deep snapshot rather than the same reference.

## Representative pattern

```csharp
var comparer = new ValueComparer<List<string>>(
    (left, right) => left != null && right != null
        ? left.SequenceEqual(right)
        : left == right,
    value => value == null
        ? 0
        : value.Aggregate(0, (hash, item) =>
            HashCode.Combine(hash, item.GetHashCode())),
    value => value == null ? null! : value.ToList());

builder.Property(e => e.Tags)
    .HasConversion(converter)
    .Metadata.SetValueComparer(comparer);
```

## Caveats

- Equality and hash functions must agree; equal values must produce equal hashes.
- Large mutable collections can make snapshotting and comparison expensive.

## Source labels

- `!!!`
- `so if you want to make sure that ef tracks changes of your primitive collection`
- `you need this setup, the whole collection replacement can be useless`
- `value comparer`

## Covered text elements

```text
T-004, T-011, T-012, T-013
```

## Covered screenshot uses

```text
IU-027, IU-028, IU-029, IU-030, IU-031, IU-032, IU-033, IU-034, IU-035, IU-036, IU-037, IU-038
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
