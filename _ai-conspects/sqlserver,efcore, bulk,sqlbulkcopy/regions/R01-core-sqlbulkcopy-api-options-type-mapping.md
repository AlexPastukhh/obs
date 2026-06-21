# R01 - SQL Server / EF Core / SqlBulkCopy core API, options, mappings and type behavior

Conspect: `sqlserver,efcore, bulk,sqlbulkcopy`  
File type: **source-preserving region transcript**  
Stage: **stage-1 / verified region transcript v001**  
Generated: 2026-06-02 15:35:09 UTC

---

## Direction check

Goal:
Convert the SQL Server / EF Core / SqlBulkCopy Excalidraw conspect into source-preserving AI-readable text without losing screenshots.

Now:
Stage0 is committed/ready. R01 is the first transcript pass and covers the main SqlBulkCopy API/options/type-mapping road.

This step:
Process R01: core SqlBulkCopy constructors and lifecycle, source data forms, `WriteToServer`, column mappings, options, identity/null/default/type behavior, internal transaction and error caveats.

Why:
This closes the coherent upper/main API road without mixing it with staging-table/performance/cleanup strategy (R02) or custom `IDataReader`/validation/retry tradeoffs (R03).

Next:
R02+R03 combined boundary review, if coherent, with final coverage audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- SqlBulkCopy as direct SQL Server bulk insert path, separate from EF Core change tracking
- constructors, DestinationTableName, WriteToServer overloads, Close/Dispose lifecycle
- source data shapes: DataTable, DataRow[], IDataReader/DbDataReader-style streams
- ColumnMappings by source/destination name or ordinal
- option flags: TableLock, KeepIdentity, KeepNulls, CheckConstraints, FireTriggers, internal transaction
- C# -> SQL Server type compatibility, null/default/identity behavior and error/failure caveats
```

Key ideas:

- `SqlBulkCopy` loads rows fast into SQL Server; it is not an EF Core update/merge abstraction and does not by itself preserve application invariants.
- The source shape and destination schema must match intentionally. Explicit column mappings are safer than relying on source/destination order.
- Options change database behavior: `TableLock` affects locking/throughput, `KeepIdentity` affects identity values, `KeepNulls` affects defaults, and constraints/triggers are controlled by their own flags.
- Type compatibility, nullable/default values and identity columns should be checked before calling bulk copy when possible.
- Transaction choices matter: internal transaction behavior is different from caller-managed transaction/staging strategy.
- Production-grade failed-row isolation and retry usually belong to staging/custom-reader/validation flows, so those remain pending for R02/R03.

Reading quality:

```text
overall: high for boundary and conceptual content
code punctuation: medium-high; preserved PNGs should be used for exact correction
coverage: 74 R01 image uses closed; 64 R02/R03 image uses remain pending
```

---

## 1. Boundary / ownership

Included in this pass:

```text
R01 sources: 74
source set: core SqlBulkCopy API/options/source-data/type-mapping/internal-transaction road
```

Checked but not included:

```text
R02: staging/performance/cleanup/transaction-log/failed-row handling road
R03: IDataReader/custom reader/validation/retry/tradeoff road
```

Duplicate image-use handling:

```text
No duplicate image uses were detected in stage0 for this conspect.
```

---

## 2. Verified source-preserving transcript

### 2.1 Why SqlBulkCopy / where EF Core stops being the right tool

The first road frames bulk copy as a direct SQL Server loading tool. EF Core is useful for tracked domain changes, but large inserts through normal change tracking can be too slow and may not be the right abstraction. `SqlBulkCopy` is presented as a lower-level, database-oriented operation: it can load many rows quickly, but it does not automatically enforce every application-level invariant or perform update/merge semantics.

### 2.2 Core API shape: constructors, destination table and WriteToServer

The main API screenshots show the lifecycle: construct a `SqlBulkCopy` over a connection / connection string / transaction scenario, set the destination table, optionally set batch/timeout/options/mappings, then call `WriteToServer`. Source data can be provided from table-like or stream-like sources such as `DataTable`, `DataRow[]`, `IDataReader`/`DbDataReader`-style readers. The notes also mark close/dispose as part of the safe lifecycle.

### 2.3 Source data choices

The conspect distinguishes convenient in-memory sources from streaming sources. `DataTable` is straightforward but memory-heavy. Reader-style sources are better for streaming large datasets or projecting data on demand, but the custom reader/validation tradeoff road is deliberately left for R03. The R01 point is that the bulk API accepts multiple source shapes and the source schema must line up with destination columns.

### 2.4 Column mappings

The column mapping road explains that source columns and destination columns can be mapped explicitly by names or ordinals. If mappings are omitted, the API falls back to positional/default behavior, which is risky when source and destination shapes differ. If only part of the data is mapped, unmapped destination columns must be handled by SQL defaults, nullable columns, identity columns, or else the operation can fail.

### 2.5 Type, null, default and identity behavior

Several screenshots cluster around C# to SQL Server type compatibility, nullable values, defaults, identity columns and `KeepIdentity`/`KeepNulls`. The main idea is that bulk copy is not a magical conversion layer. The incoming values must be compatible with destination SQL types, nullability and constraints. Keeping nulls can prevent SQL Server defaults from filling values. Keeping identity can preserve source identity values instead of letting SQL Server generate them.

### 2.6 Bulk copy options

The options road covers flags such as `TableLock`, `KeepIdentity`, `KeepNulls`, `CheckConstraints`, `FireTriggers` and internal transaction behavior. These flags should be read as explicit database-side behavior switches. They can improve performance or preserve desired values, but they can also change locking, constraint checking, trigger behavior and failure semantics.

### 2.7 TableLock and internal transaction notes

The `TableLock` screenshots show it as a performance/concurrency tradeoff rather than a universal recommendation. The internal transaction screenshots note that bulk copy can manage transaction boundaries internally, but production flows often need caller-managed transactions or staging tables. That broader staging and transaction-log strategy is intentionally reserved for R02.

### 2.8 Error behavior

The error-road screenshots emphasize that mapping, type, constraint or row errors can fail the bulk copy operation in a coarse way. R01 records the API-level caveat; R02/R03 should handle the production strategies: staging tables, validation, chunking, failed-row isolation and retry.

---

## 3. Source table

See:

```text
data/R01-sources-stage1-v001.csv
data/R01-sources-stage1-v001.json
audit-assets/R01-source-images/*.png
audit-assets/contact-sheet-R01-core-sqlbulkcopy-api-options-type-mapping-transcript-v001.png
```

Those files preserve every R01 source image use with coordinates, nearest labels, topic, summary, and confidence notes.

---

## 4. Questions / correction hooks

- When exact C# punctuation or overload signatures matter, use the preserved `R01-source-images` PNGs as the correction source.
- Recheck R02 before final coverage for staging, transaction-log, cleanup and failed-row handling.
- Recheck R03 before final coverage for `IDataReader`, custom reader implementation, validation and retry tradeoffs.
