# Supplemental screenshot transcript — R08: TPC polymorphic unions and enum-to-string converter trade-offs

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Coverage

```text
region: R08
image uses reviewed: 14
unique screenshots represented: 14
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

This region completes the TPC comparison and focuses on a subtle consequence of converting enums to strings: SQL comparisons follow provider values, not CLR enum order.

## TPC query shape

- Each concrete table contains inherited and concrete properties.
- A polymorphic base query projects the concrete tables into a common shape and combines them with `UNION ALL`.
- EF uses the projection/discriminator shape to materialize the correct concrete CLR type.
- Concrete TPC queries can target one table without joins, while base queries pay the union cost.

## Practical strategy summary

- TPH generally gives the simplest polymorphic SQL.
- TPT gives normalized tables but typically adds joins.
- TPC duplicates inherited columns and favors concrete queries while making polymorphic queries unions.
- The best choice is workload dependent; schema width alone is not enough to select a strategy.

## Enum-to-string conversion

- Storing an enum as text makes rows more readable and resilient to numeric value changes.
- The provider column becomes textual, so equality is straightforward but ordering and range comparisons are lexicographic under the database collation.
- A CLR predicate such as greater-than can translate to string comparison after conversion, which may not match enum numeric/declaration order.
- Renaming enum members becomes a data migration concern because the stored string is part of the database contract.
- Use string conversion when equality/display readability matters and avoid ordering logic unless an explicit sortable representation is designed.

## Caveats

- Provider collation influences enum-string comparison and sorting.
- Do not assume an enum converter preserves CLR ordering semantics.

## Nearby SVG labels used for orientation

- TPC
- TPT
- queries cost
- ----------------polymorphic----------------
- with this hierarchy
- buisness rules, but you dont want to persist
- cast - its about compiler,
- not runtime
- in c# you have some domain inheritance for
- or if there are some optimisations with it
- and we really dont need to query base type at all or a lot
- there is a lot of nulls with tph, really wide tables
- enum to string conver
- can be good/bad
- when enum to string
- careful with comparisons
- when you ve converted enums
- !!!!

## Covered screenshot uses

```text
IU-148, IU-159, IU-160, IU-161, IU-162, IU-165, IU-175, IU-189, IU-190, IU-191, IU-192, IU-193, IU-194, IU-195
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.
Exact punctuation and provider-specific code remain governed by the recovered screenshots and complete SVG under `source/`.
