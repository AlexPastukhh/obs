# Supplemental screenshot transcript — R04: Value generation, save behavior, indexes, schema, sequences and property access modes

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Coverage

```text
region: R04
image uses reviewed: 61
unique screenshots represented: 61
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

This is the central model-configuration region. It distinguishes model metadata from relational database objects and explains how EF reads, writes and materializes properties.

## Ignoring and configuring model members

- `Ignore` excludes a CLR property or type from the EF model.
- Navigation metadata represents relationships; configuration such as auto-inclusion, field access and access mode is attached to the navigation, not to a database column.
- Many-to-many relationships can remain implicit or use an explicitly configured join table.

## Value-generation metadata

- `ValueGeneratedOnAdd`, `ValueGeneratedOnAddOrUpdate` and `ValueGeneratedNever` describe when EF expects generated values.
- The metadata does not itself create a database default, computed expression, trigger or sequence; provider configuration or migrations must establish the real database behavior.
- Identity keys, created timestamps, computed columns, trigger-updated values and custom generators require different combinations of generation and save behavior.

## Before-save and after-save behavior

- Before-save behavior controls what EF does with an explicitly assigned value before the first database save.
- After-save behavior controls whether a generated property may be modified and sent after the row already exists.
- `Save`, `Ignore` and `Throw` encode whether an explicit value is accepted, discarded or rejected.
- These settings are advanced metadata and should match the actual database contract; otherwise changes may be silently omitted or commands may conflict with generated columns.

## Precision, Unicode and provider storage

- `HasPrecision` configures decimal precision/scale and provider-supported temporal precision.
- `IsUnicode(false)` tells a relational provider that a string is non-Unicode; on SQL Server this normally maps toward `varchar` rather than `nvarchar`.
- A UTF-8 collation can make `varchar` Unicode-capable, but encoding and collation still need to agree with the data domain.

## Schemas and default schema

- A schema is a namespace for relational objects such as tables, sequences and functions.
- A model default schema provides the fallback, while individual tables or objects can override it.
- `HasDefaultSchema` does not itself move an existing production object; migrations must express the required database change.

## Database functions

- `HasDbFunction` maps a CLR method to a database function so LINQ translation can emit the corresponding SQL call.
- The CLR method is generally a translation marker rather than code intended to execute in normal client evaluation.
- Name, schema, nullability and custom translation must match the provider-side function.

## Property access modes

- `Field` always accesses the backing field; `Property` always invokes the getter/setter.
- `FieldDuringConstruction` uses the field during materialization and the property later.
- `PreferField` and `PreferProperty` select the preferred member with fallback when needed.
- Use field access when setters contain domain side effects that must not run during materialization, and property access when the property contract must always participate.
- Read-only wrapper collections and private setters are common reasons to configure fields explicitly.

## Delete behaviors

- `Cascade` and `SetNull` request database cascade-like actions when the provider and relationship permit them.
- Client-side variants perform tracked-graph fixup but do not require the database to cascade for rows not loaded into the context.
- `Restrict` and `NoAction` rely on constraint enforcement and differ by provider timing/DDL semantics.
- Delete behavior must be selected together with FK nullability, requiredness and the expected disconnected/deletion workflow.

## Identity and sequences

- Identity is tied to a table column; a sequence is an independent database object.
- Two tables can consume the same sequence, producing a shared number stream across types.
- A sequence can also be used as a default SQL expression or through HiLo.
- Use sequences when a shared allocator or pre-insert strategy is intentional; do not treat them as gap-free business numbers.

## Indexes and database names

- `HasDatabaseName` names the database index object, whereas `HasColumnName` names a column.
- Navigation configuration is not column configuration because a navigation is a relationship member.
- Indexes, uniqueness, filters and included columns are relational performance/constraint concerns that should be named deliberately when migrations or operational tooling depend on stable names.

## Caveats

- Generation flags and save behavior are metadata; they must agree with the actual provider-generated mechanism.
- Provider-specific SQL Server examples should be reviewed when porting the model to another database.

## Nearby SVG labels used for orientation

- ignore property
- entity.Navigation
- only if a key
- join table
- many to many
- ientitytypeConfiguration
- value generation
- an automatic generatedonadd
- added entity, can we even update it?
- Savebehavior, can we mutate
- examples
- hasprecision
- IsUnicode
- hasdatabasename
- unicode
- has sequence
- has dbfunction
- !!!!
- set schema,setdefault schema
- computed
- default
- so when set field, its not
- default beh dude
- field
- setter has buisness logic
- prop
- readonly wrapper collection
- fieldDuringConstruciton
- preferfield
- always need prop logic

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-006, IU-011, IU-012, IU-013, IU-014, IU-015, IU-016, IU-017, IU-018, IU-019
IU-020, IU-021, IU-022, IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-030, IU-031, IU-032, IU-033
IU-034, IU-035, IU-036, IU-037, IU-038, IU-039, IU-040, IU-041, IU-042, IU-043, IU-044, IU-045, IU-046, IU-047
IU-048, IU-049, IU-050, IU-055, IU-056, IU-057, IU-058, IU-059, IU-060, IU-061, IU-062, IU-063, IU-097, IU-098
IU-099, IU-100, IU-101, IU-102, IU-197
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.
Exact punctuation and provider-specific code remain governed by the recovered screenshots and complete SVG under `source/`.
