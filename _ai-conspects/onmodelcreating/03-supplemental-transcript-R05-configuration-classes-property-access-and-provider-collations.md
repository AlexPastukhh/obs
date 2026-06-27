# Supplemental screenshot transcript — R05: Configuration classes, default property access and provider collation behavior

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Coverage

```text
region: R05
image uses reviewed: 7
unique screenshots represented: 7
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

This region organizes large models with `IEntityTypeConfiguration<T>` and clarifies the default member-access behavior used during and after materialization.

## Entity configuration classes

- `IEntityTypeConfiguration<T>` moves one entity's mapping into a focused class.
- Configurations can be applied explicitly or discovered from an assembly.
- This organization improves maintainability but does not change the resulting model; conventions and explicit configuration still follow normal precedence.

## Default field/property behavior

- EF Core prefers field access during construction/materialization when an eligible backing field is discovered and uses property access when appropriate afterward.
- A field that cannot be found by convention can be bound explicitly.
- `FieldDuringConstruction` is useful when property logic is desirable during normal application updates but undesirable while hydrating database state.
- Later EF access includes change-tracking interactions and updates to already materialized entities, not only user-written property assignments.

## SQL Server string mapping

- `nvarchar` versus `varchar` reflects Unicode model metadata and provider mapping.
- A UTF-8 SQL Server collation changes what a `varchar` column can encode, but EF still needs the non-Unicode/column-type mapping to choose `varchar`.

## Caveats

- Assembly scanning may apply every matching configuration in the assembly; shared base or accidental configuration classes should be reviewed.

## Nearby SVG labels used for orientation

- ientitytypeConfiguration
- configureConventions
- defaults
- !!!!
- default
- default beh dude
- so when set field, its not
- construction/normal ef access
- preferfield
- preferprop
- IsUnicode
- polymorphic queries
- has sequence

## Covered screenshot uses

```text
IU-007, IU-008, IU-051, IU-052, IU-053, IU-054, IU-182
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.
Exact punctuation and provider-specific code remain governed by the recovered screenshots and complete SVG under `source/`.
