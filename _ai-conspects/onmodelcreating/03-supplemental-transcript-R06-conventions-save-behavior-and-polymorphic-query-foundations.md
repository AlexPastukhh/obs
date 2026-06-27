# Supplemental screenshot transcript — R06: Pre-convention configuration, save behavior and polymorphic-query foundations

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Coverage

```text
region: R06
image uses reviewed: 18
unique screenshots represented: 18
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

This region moves repeated property rules into `ConfigureConventions`, then connects generation/save metadata with the basics of querying inheritance hierarchies.

## ConfigureConventions

- `ConfigureConventions` applies model-wide pre-convention rules before individual entity configuration completes.
- It is useful for recurring mappings such as maximum string length, decimal precision or converters for a CLR type.
- More-specific fluent configuration can override the broad convention.
- Pre-conventions should express stable domain-wide rules rather than hide unrelated provider decisions.

## Before-save behavior examples

- `Save` accepts an explicit value and sends it according to normal property state.
- `Ignore` discards an explicit pre-save value so the database-generated value can win.
- `Throw` rejects an explicit value, which is useful when application assignment would violate the database contract.
- Generation metadata and before/after-save behavior form one configuration matrix and should be audited together.

## Generated identifiers

- When the application or a custom generator owns a key, generation can be disabled or configured explicitly so EF does not expect a database-generated replacement.
- Provider conventions may infer generation for common key shapes, but shadow or unusual mappings can require explicit `ValueGeneratedOnAdd`.

## Polymorphic queries

- A query against the mapped base entity returns rows materialized as their actual mapped derived CLR types.
- The SQL shape depends on the inheritance strategy, but materialization still uses discriminator or table-shape information to create the correct subtype.
- A query against a concrete derived type is not the same as a polymorphic base query.
- Derived properties can be read after type checks, pattern matching or `OfType<T>` filtering; casting changes the compile-time view but does not alter the runtime object.

## Caveats

- Conventions reduce repetition but can make mappings implicit; keep overrides and provider assumptions discoverable.

## Nearby SVG labels used for orientation

- configureConventions
- ientitytypeConfiguration
- defaults
- beforsave
- aftersave
- examples
- value generation
- ignore property
- hasbasetype
- ----------------concrete queries----------------
- polymorphic queries
- ----------------polymorphic----------------
- can we query base type
- and then safely cast it without loosing
- data?
- not runtime
- !!!

## Covered screenshot uses

```text
IU-009, IU-010, IU-104, IU-105, IU-106, IU-107, IU-108, IU-110, IU-111, IU-112, IU-143, IU-150, IU-151, IU-152
IU-153, IU-167, IU-168, IU-169
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.
Exact punctuation and provider-specific code remain governed by the recovered screenshots and complete SVG under `source/`.
