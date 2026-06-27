# Legacy text-only transcript — onmodelcreating

> **Status: incomplete and superseded for completeness.**
>
> This document was generated from an incomplete SVG that contained 153 text
> elements and no embedded screenshots. It is retained only as a historical
> text-layer summary. It is **not** the final transcript and must not be used as
> proof that the whole conspect was processed.
>
> The recovered SVG contains 220 screenshots whose code, examples, tables and
> explanations were absent from the original source. A new combined transcript
> must be produced from the complete SVG, all 153 text elements and all 220
> screenshot uses.

Generated from incomplete source: 2026-06-22 00:00:00 UTC  
Recovery status corrected: 2026-06-27 00:15:00 UTC

## What this legacy document covers

Only the text layer that survived in the incomplete SVG:

- model-level configuration;
- schemas, sequences and DbFunctions;
- backing fields and property access modes;
- collations and Unicode notes;
- value generation, defaults and computed values;
- many-to-many labels and delete behavior labels;
- inheritance-strategy labels;
- conventions and configuration-class labels.

## What this legacy document does not reliably cover

The 220 recovered screenshots may contain details that were absent from the
text layer, including:

- exact code and API calls;
- configuration combinations;
- diagrams and relationships between examples;
- tables, generated SQL and migration details;
- warnings, caveats and version-specific behavior;
- examples whose only surviving text was a short caption.

## Legacy structured summary

### Model-level configuration

Default schema, sequences, database functions and
`ConfigureConventions` / `IEntityTypeConfiguration` organization.

### Fields and access modes

Backing fields, `PreferField`, `PreferProperty`,
`FieldDuringConstruction`, readonly collection wrappers and
business-logic setters.

### Relational types and collation

`nvarchar` versus `varchar`, UTF-8 collations, `IsUnicode`, precision
and database naming.

### Value generation

`ValueGeneratedOnAdd`, `OnAddOrUpdate`, `Never`, defaults, computed
columns, custom generators, triggers, HiLo and before/after save behavior.

### Relationships

Many-to-many labels, implicit/explicit join tables, custom join entities
and delete-behavior labels.

### Inheritance

TPH, TPT and TPC labels, polymorphic-query notes and performance labels.

### Indexes and metadata

Index labels, database names, precision and property/navigation metadata.

## Source-preserving text sample

The original text ledger remains in `data/text-elements.*`.

- `T-001` has sequence
- `T-002` has dbfunction
- `T-003` set schema,setdefault schema
- `T-004` persisted,
- `T-005` nonpersisted
- `T-006` computed
- `T-007` default
- `T-008` field
- `T-009` prop
- `T-010` fieldDuringConstruciton
- `T-011` construction/normal ef access
- `T-012` preferfield
- `T-013` preferprop
- `T-014` always need prop logic
- `T-015` readonly wrapper collection
- `T-016` setter has buisness logic
- `T-017` !!!configuring collation
- `T-018` nvarchar vs varchar
- `T-019` with utf8 collation
- `T-020` varchar
- `T-021` with utf8 collation
- `T-022` collations
- `T-023` when to use nvarchar
- `T-024` unicode
- `T-025` when to use varchar
- `T-026` no repeated function generate calls
- `T-027` !!!
- `T-028` many to many
- `T-029` join table
- `T-030` ientitytypeConfiguration

## Required replacement

The next processing pass must create a new final combined transcript from:

```text
153 text elements
220 recovered screenshots
R01–R09 supplemental regions
```

Until that replacement exists, this conspect is incomplete.
