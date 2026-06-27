# Supplemental screenshot transcript — R07: Inheritance strategies, query costs, casting and value converters

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Coverage

```text
region: R07
image uses reviewed: 26
unique screenshots represented: 26
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

This region compares TPH, TPT and TPC using both polymorphic and concrete queries, then explains how value converters change provider representation without changing the CLR type.

## Table-per-hierarchy (TPH)

- TPH stores a hierarchy in one table with a discriminator and nullable columns for derived-only properties.
- Polymorphic queries are usually simple and efficient because they read one table.
- Concrete-type queries filter by discriminator.
- TPH is the common default and is attractive for frequent base-type queries, but very wide hierarchies can accumulate many null columns.

## Table-per-type (TPT)

- TPT stores base properties in the base table and derived properties in separate tables linked by the same key.
- Polymorphic and concrete queries require joins to assemble a complete object.
- TPT provides normalized tables and a clear relational layout but often has the highest query cost for deep or frequently queried hierarchies.

## Table-per-concrete-type (TPC)

- TPC stores all inherited properties in each concrete table and does not use a base table for concrete rows.
- Concrete queries can avoid joins, while base-type polymorphic queries combine concrete tables, typically with `UNION ALL`.
- TPC is useful when concrete-type queries dominate and duplicated columns are acceptable.

## Choosing a strategy

- Choose based on real query shapes, hierarchy depth, write behavior and schema constraints rather than conceptual elegance alone.
- TPH is generally the baseline for polymorphic reads; TPC can be considered when base queries are rare and TPH becomes excessively sparse/wide.
- TPT should be justified by relational requirements and measured because joins compound as the hierarchy grows.

## Casting and runtime objects

- Materialized derived objects keep their derived state even when referenced through a base variable.
- A cast changes what members the compiler allows; it does not remove or recreate properties on the runtime object.
- Use type checks, pattern matching or `OfType<T>` when a query or code path genuinely depends on a subtype.

## Value converters

- A converter has a model-to-provider expression and a provider-to-model expression.
- Built-in converters cover common transformations; a custom converter is appropriate when the storage contract is domain specific.
- Date/time formatting into text is usually inferior to a native temporal column unless a legacy schema requires textual storage.
- Column type/length must match the converted provider representation.

## Caveats

- Conversion does not automatically supply a matching comparer for mutable or structurally compared model types.
- Inheritance performance claims must be validated with generated SQL and representative data.

## Nearby SVG labels used for orientation

- aftersave
- beforsave
- examples
- hasbasetype
- remove inheritance
- strategies, pros cons
- when to use what
- TPH
- TPT
- queries cost
- TPC
- ----------------polymorphic----------------
- ----------------concrete queries----------------
- cast - its about compiler,
- not runtime
- !!!
- or if there are some optimisations with it
- and we really dont need to query base type at all or a lot
- there is a lot of nulls with tph, really wide tables
- custom converters
- careful with comparisons
- enum to string conver
- when you ve converted enums
- !!!!
- convertions

## Covered screenshot uses

```text
IU-109, IU-144, IU-145, IU-146, IU-147, IU-149, IU-154, IU-155, IU-156, IU-157, IU-158, IU-163, IU-164, IU-166
IU-170, IU-171, IU-172, IU-173, IU-174, IU-183, IU-184, IU-185, IU-186, IU-187, IU-188, IU-196
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.
Exact punctuation and provider-specific code remain governed by the recovered screenshots and complete SVG under `source/`.
