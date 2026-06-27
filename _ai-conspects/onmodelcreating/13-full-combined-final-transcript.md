# Full combined final transcript — onmodelcreating

Generated: 2026-06-27 02:00:00 UTC

## 01 Source basis and authority

This document is the authoritative semantic transcript for the complete
`onmodelcreating` SVG. It integrates both source layers:

```text
meaningful SVG text elements: 153 / 153
unique embedded screenshots: 220 / 220
screenshot uses on canvas: 220 / 220
duplicate screenshot placements: 0
remaining text elements: 0
remaining screenshot uses: 0
```

The historical `01-final-transcript.md` was generated from an incomplete SVG
with no screenshots. It remains only as a legacy text-layer draft.

## 02 Model-level relational configuration

`OnModelCreating` is where conventions are refined into an explicit EF Core
model. Model-level configuration includes default schema, sequences, mapped
database functions and inheritance strategy. These declarations become model
metadata; migrations then translate supported relational metadata into actual
database objects.

A default schema is a fallback namespace, not an instruction that silently
moves existing tables. A sequence is an independent database allocator and can
be used directly, as a default expression or by HiLo. A mapped database
function connects a CLR method marker to SQL translation.

## 03 Text storage, Unicode and collations

SQL Server string mapping combines two separate choices:

1. the provider type/encoding choice (`nvarchar` versus `varchar`);
2. the collation, which controls comparison, sorting, case and accent rules.

`nvarchar` is the uncomplicated Unicode default. `varchar` is appropriate for
intentionally constrained byte-oriented data and can store Unicode when the
column/database uses a UTF-8 collation. EF still needs model metadata that maps
the property to `varchar`; a UTF-8 collation alone does not force that choice.

Collation can be configured at database, column or query-expression level. A
database default is broad, a column override is part of the persistent model,
and query-level `COLLATE` is an exceptional operation that may interfere with
index use. Collation changes require migration and compatibility planning.

## 04 Property shape, precision and relational naming

`HasPrecision` configures decimal precision/scale and provider-supported
temporal precision. `IsUnicode` influences provider string mapping.
`HasColumnName` names a column; `HasDatabaseName` names an index. These APIs
address different relational objects and should not be treated as aliases.

Indexes express uniqueness and lookup shape. Stable explicit names are useful
when migration scripts, diagnostics or operational procedures refer to the
database object directly.

`Ignore` removes a CLR member or type from the model. Navigation configuration
targets relationship metadata; a navigation is not a scalar column.

## 05 Value generation, defaults, computed values and save behavior

EF Core distinguishes when a value is expected:

- on insert;
- on insert or update;
- never generated.

This metadata tells EF whether to send a value, use a temporary value and
expect a database result. It does not create the database mechanism by itself.

A database default applies when an INSERT omits a column. A default SQL
expression is evaluated by the provider. A computed column is derived from
other columns; it can be virtual/non-persisted or stored/persisted. A trigger
can update a value such as last-modified time for all database writers.
Application code can assign the same value before save, but every write path
must follow the convention.

Before-save and after-save behavior determine whether explicit values are
saved, ignored or rejected. These settings must agree with the database
contract, especially for identity keys, computed columns, rowversion values and
trigger-updated fields.

A custom value generator runs in the application and can supply a value before
the SQL command. It must correctly declare whether generated values are
temporary.

## 06 Relational metadata, functions, schemas, precision and indexes

Schemas namespace database objects. A model default schema can be overridden
per table, sequence or function. Provider migrations remain responsible for
creating or moving real objects.

Mapped database functions allow LINQ expressions to translate into provider
function calls. The CLR method is usually a translation marker. Function name,
schema, nullability and optional custom translation must match the database.

Relational metadata should remain explicit where the database contract matters:
table names, column names, foreign-key names, index names, precision, computed
SQL and collation are independent concerns.

## 07 Backing fields and property access modes

EF Core can read and write through a field or a property:

- `Field` always uses the backing field;
- `Property` always uses the getter/setter;
- `FieldDuringConstruction` uses the field during materialization and the
  property later;
- `PreferField` and `PreferProperty` choose a preferred member with fallback.

Field access is useful when a setter performs domain actions that must not run
while hydrating database state. Property access is appropriate when the public
contract or validation must always participate.

Read-only collection wrappers can expose aggregate state without giving callers
the mutable backing collection. EF can bind a collection navigation to a
private field, and `HasField` is available when conventions cannot discover it.
Access mode belongs to property or navigation metadata and should be selected
to preserve both persistence and domain invariants.

## 08 Relationships, many-to-many and delete behavior

Convention-based many-to-many skip navigations are sufficient when the join
table contains only the relationship keys. Explicit shared join configuration
is useful when table/column/constraint names must be controlled. A dedicated
CLR join entity is justified when the relationship has payload, methods,
validation, lifecycle or direct navigations.

Delete behavior combines database actions and tracked-client behavior:

- `Cascade` and `SetNull` request database cascade-like effects when valid;
- client variants affect tracked dependents without guaranteeing behavior for
  unloaded rows;
- `Restrict` and `NoAction` rely on constraint enforcement and provider timing.

The correct choice depends on FK nullability, relationship requiredness,
disconnected workflows and whether dependents are loaded.

## 09 Identity, sequences and HiLo

SQL Server identity is tied to a table column and usually produces its final
value during insert. A sequence is a separate database object and can allocate
numbers across multiple tables.

HiLo reserves a high range value from a sequence and allocates low values in
memory. This provides keys before insert and amortizes database round trips
across many entities. It is useful for large batches and graphs that need early
keys. Gaps are expected and shared sequences interleave values across entity
types, so neither sequences nor HiLo should be used as gap-free business
numbering.

## 10 Inheritance mapping and polymorphic queries

A mapped base query is polymorphic: EF materializes the actual derived CLR type
for each row. The SQL shape depends on the selected inheritance strategy.

### TPH

Table-per-hierarchy stores the complete hierarchy in one table with a
discriminator and nullable derived columns. It normally gives the simplest
polymorphic query and is EF Core's common default.

### TPT

Table-per-type stores base and derived properties in separate joined tables.
The schema is normalized, but polymorphic and concrete queries can require
multiple joins and should be performance tested.

### TPC

Table-per-concrete-type stores inherited columns in each concrete table.
Concrete queries can target one table; base queries combine tables, commonly
with `UNION ALL`. TPC is attractive when concrete reads dominate and duplicated
columns are acceptable.

### Mapping control

`HasBaseType` explicitly controls the EF model hierarchy.
`HasBaseType((Type?)null)` can detach a type from mapped inheritance while CLR
inheritance remains for code reuse. This is appropriate when domain inheritance
does not match persistence boundaries.

Casting a base reference changes compile-time member access but does not change
the runtime object's subtype or erase its derived values. Use type tests,
pattern matching or `OfType<T>` to express subtype-dependent logic safely.

## 11 Value converters

A value converter defines model-to-provider and provider-to-model expressions.
Built-in converters cover common cases; custom converters handle deliberate
storage contracts.

Converting `DateTime` to formatted text is normally inferior to a native
temporal column unless a legacy schema requires it. The provider column type and
length must fit the converted representation.

Enum-to-string conversion improves readability and avoids dependence on numeric
enum values, but the provider now compares strings. Equality is natural;
ordering and range predicates become lexicographic under the database
collation and may not match CLR enum order. Renaming an enum member becomes a
data migration.

## 12 Configuration organization and model discovery

`IEntityTypeConfiguration<T>` keeps one entity mapping in a focused class.
Configurations can be applied explicitly or discovered from an assembly.
Assembly scanning applies every matching configuration and can introduce
unexpected entity types if the assembly contains accidental or overly broad
configuration classes.

`ConfigureConventions` applies model-wide pre-convention rules such as maximum
length, precision or converters for a CLR type. More-specific entity/property
configuration can override the convention.

Types enter the model through `DbSet<T>`, relationship/navigation discovery,
explicit `Entity<T>`, configuration application and shared-type entity
configuration. A navigation or scanned configuration can unexpectedly add a
derived entity and change inheritance discovery, so the final model should be
inspected when mapping results are surprising.

## 13 Remaining model notes and cross-cutting rules

- Generated-value configuration, provider DDL and save behavior must describe
  the same real database contract.
- Conventions reduce repetition but should not hide critical provider choices.
- CLR inheritance, aggregate boundaries and relational inheritance are related
  but independent design decisions.
- Exact generated SQL and query cost should be measured against representative
  data.
- Provider-specific SQL Server behavior must be reviewed before moving the
  model to another database.

## 14 Regional source map

### R01 — Collations, HiLo and value-generation orientation

This region establishes two independent model-building concerns: how text comparison/storage rules are chosen for SQL Server, and why HiLo can reduce database round trips when generating numeric keys.

Coverage: `14` screenshot uses, `14` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R01-collations-hilo-and-value-generation-orientation.md`.

### R02 — Many-to-many variants, join entities, UTF-8 collations and HiLo setup

This region expands text storage choices and then shows the progression from an implicit many-to-many join table to explicitly configured or CLR-backed join entities.

Coverage: `21` screenshot uses, `21` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R02-many-to-many-join-entities-utf8-collations-and-hilo.md`.

### R03 — Defaults, computed values, triggers, join-table naming and backing fields

This region connects provider-generated values with EF Core metadata and covers exact relational naming, custom generators, trigger-based updates and field-backed navigation mappings.

Coverage: `40` screenshot uses, `40` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R03-defaults-computed-values-triggers-join-tables-and-backing-fields.md`.

### R04 — Value generation, save behavior, indexes, schema, sequences and property access modes

This is the central model-configuration region. It distinguishes model metadata from relational database objects and explains how EF reads, writes and materializes properties.

Coverage: `61` screenshot uses, `61` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R04-value-generation-save-behavior-indexes-schema-sequences-and-access-modes.md`.

### R05 — Configuration classes, default property access and provider collation behavior

This region organizes large models with `IEntityTypeConfiguration<T>` and clarifies the default member-access behavior used during and after materialization.

Coverage: `7` screenshot uses, `7` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R05-configuration-classes-property-access-and-provider-collations.md`.

### R06 — Pre-convention configuration, save behavior and polymorphic-query foundations

This region moves repeated property rules into `ConfigureConventions`, then connects generation/save metadata with the basics of querying inheritance hierarchies.

Coverage: `18` screenshot uses, `18` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R06-conventions-save-behavior-and-polymorphic-query-foundations.md`.

### R07 — Inheritance strategies, query costs, casting and value converters

This region compares TPH, TPT and TPC using both polymorphic and concrete queries, then explains how value converters change provider representation without changing the CLR type.

Coverage: `26` screenshot uses, `26` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R07-tph-tpt-tpc-query-costs-casting-and-value-converters.md`.

### R08 — TPC polymorphic unions and enum-to-string converter trade-offs

This region completes the TPC comparison and focuses on a subtle consequence of converting enums to strings: SQL comparisons follow provider values, not CLR enum order.

Coverage: `14` screenshot uses, `14` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R08-tpc-polymorphic-union-and-enum-string-converter-tradeoffs.md`.

### R09 — Inheritance mapping control, discovery and applying configurations

This region explains how EF discovers hierarchies and relationships, how to detach a CLR type from mapped inheritance, and how configuration discovery can accidentally bring a type into the model.

Coverage: `19` screenshot uses, `19` unique screenshots, `0` duplicates, `0` remaining. Detailed transcript: `03-supplemental-transcript-R09-inheritance-mapping-control-discovery-and-configuration-application.md`.

## 15 Exactness note

This transcript records the integrated semantic meaning of the complete source.
The recovered SVG and extracted screenshots under `source/` remain
authoritative for exact code punctuation, provider-specific SQL and
version-sensitive API spelling.
