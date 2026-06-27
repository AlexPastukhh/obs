# Supplemental screenshot transcript — R03: Defaults, computed values, triggers, join-table naming and backing fields

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Coverage

```text
region: R03
image uses reviewed: 40
unique screenshots represented: 40
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

This region connects provider-generated values with EF Core metadata and covers exact relational naming, custom generators, trigger-based updates and field-backed navigation mappings.

## Default and computed values

- A default value applies when an INSERT omits the column; an explicit application value normally wins.
- A default SQL expression is evaluated by the database and is useful for values such as creation timestamps.
- A computed column is derived from other columns. A non-persisted computed column is calculated when read; a persisted/stored column is materialized physically by the database.
- Computed-column persistence affects storage, indexing possibilities and update cost, but EF Core still treats the result as database generated.

## Custom value generators

- A custom `ValueGenerator` is appropriate when the application can deterministically create a value before the command is sent.
- The generator must state whether values are temporary and must be registered for the intended property.
- Custom generators are different from database defaults and triggers: generated values exist in memory immediately and need no post-save retrieval unless the database can replace them.

## Last-modified strategies

- Application code can assign a timestamp before saving; this is simple but requires every write path to follow the rule.
- A database trigger centralizes the rule and covers writers outside EF Core, but EF must be configured to expect a generated value and the provider must return or reload it correctly.
- Rowversion is the SQL Server-native optimistic concurrency token; it is not a general-purpose human timestamp.

## HiLo mechanics

- The database sequence advances once per reserved block rather than once per inserted row.
- The application combines the high value with an in-memory low counter.
- Multiple entities can share a sequence; gaps and non-contiguous numbers are normal.

## Join-table relational names

- Fluent configuration can independently control the join table name, foreign-key column names and constraint names.
- Changing a CLR property name is not the same operation as renaming a SQL column.
- A normal explicit many-to-many mapping is often sufficient; a join CLR type becomes useful when payload and behavior are part of the model.

## Backing fields and collection navigations

- A collection navigation can be backed by a private field while exposing a read-only wrapper.
- When convention cannot discover the intended field, `HasField` or navigation metadata can bind it explicitly.
- Field access prevents EF from invoking domain methods or returning collection wrappers during materialization, while property access deliberately uses the public contract.

## Caveats

- Computed SQL, trigger syntax and generated-value retrieval are provider specific.
- Field-backed mappings should preserve aggregate invariants without hiding required persistence behavior from EF Core.

## Nearby SVG labels used for orientation

- computed
- nonpersisted
- computed values
- unicode
- when to use varchar
- has sequence
- persisted,
- when to use nvarchar
- !!!!
- IsUnicode
- dont need it
- custom value generators
- an automatic generatedonadd
- only if a key
- Hilo
- database trigger for last modified
- setup
- usage
- Fk names
- configuring custom jointable name
- (not needed can do auto)
- value generated on add
- hasdefaultvalue
- manually set wins
- explicit many to many config
- if cant find, can do navigation.hasfield
- map property, can set access mode
- readonly wrapper collection
- always need prop logic
- explicit configurations

## Covered screenshot uses

```text
IU-005, IU-071, IU-072, IU-073, IU-074, IU-075, IU-076, IU-077, IU-078, IU-086, IU-087, IU-088, IU-089, IU-090
IU-091, IU-092, IU-093, IU-094, IU-095, IU-096, IU-113, IU-114, IU-115, IU-116, IU-129, IU-130, IU-131, IU-132
IU-133, IU-142, IU-176, IU-177, IU-178, IU-179, IU-180, IU-181, IU-217, IU-218, IU-219, IU-220
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.
Exact punctuation and provider-specific code remain governed by the recovered screenshots and complete SVG under `source/`.
