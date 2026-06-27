# Supplemental screenshot transcript — R01: Collations, HiLo and value-generation orientation

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Coverage

```text
region: R01
image uses reviewed: 14
unique screenshots represented: 14
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

This region establishes two independent model-building concerns: how text comparison/storage rules are chosen for SQL Server, and why HiLo can reduce database round trips when generating numeric keys.

## Collation levels

- SQL Server collation can be selected at database, column or expression/query level.
- A database default is the broad fallback. A column override is useful when one property needs different comparison or storage semantics.
- An expression-level `COLLATE` is a query tool and can affect index use, so it should not replace a deliberate storage model.
- A UTF-8 collation is relevant to `varchar`; the property still needs non-Unicode storage metadata such as `IsUnicode(false)` or a provider column type.
- Changing the database collation is operationally different from configuring one column and normally belongs in a controlled migration.

## Why UTF-8 is not a universal replacement

- `nvarchar` remains the straightforward Unicode choice and uses UTF-16 storage on SQL Server.
- `varchar` with a UTF-8 collation can store Unicode while remaining byte-oriented, but storage savings depend on the actual character distribution.
- Collation also controls comparison, sorting and case/accent sensitivity; it is not merely an encoding switch.

## HiLo purpose and trade-offs

- HiLo reserves a high-value range from the database and allocates low values in memory.
- One database range fetch can serve many inserts, reducing key-allocation round trips and making keys available before insert.
- Gaps are expected after process termination or unused reservations; HiLo is not a gap-free numbering system.
- HiLo is most useful for large insert batches, parent/child graphs that benefit from early keys, and applications that intentionally choose a key-generation strategy.
- It is unnecessary when ordinary identity generation is adequate and the application does not need client-side keys before saving.

## Caveats

- Collation decisions belong to the data model and migration plan, not to ad hoc query fixes.
- HiLo optimizes allocation; it does not change identity semantics into business numbering.

## Nearby SVG labels used for orientation

- !!!
- !!!configuring collation
- with utf8 collation
- 1!!!
- when is it approap
- optimisation
- benefits of hilo
- usage
- setup
- no repeated function generate calls
- nvarchar vs varchar
- is it internal
- dedicated class
- hidden vs

## Covered screenshot uses

```text
IU-067, IU-068, IU-069, IU-070, IU-117, IU-121, IU-122, IU-123, IU-124, IU-125, IU-126, IU-127, IU-128, IU-141
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.
Exact punctuation and provider-specific code remain governed by the recovered screenshots and complete SVG under `source/`.
