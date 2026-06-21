# R02+R03 - staging / performance / cleanup / failed rows / IDataReader tradeoffs

Conspect: `sqlserver,efcore, bulk,sqlbulkcopy`  
File type: **source-preserving combined region transcript**  
Stage: **stage-2 / final coverage transcript v001**  
Generated: 2026-06-02 16:05:00 UTC

---

## Direction check

Goal:
Convert the SQL Server / EF Core / SqlBulkCopy conspect into source-preserving AI-readable text without losing screenshots.

Now:
R01 core SqlBulkCopy API/options/type-mapping road is done. This pass closes the remaining production strategy and custom-reader tail.

This step:
Process R02/R03 together: staging tables, performance, cleanup, transaction-log concerns, failed-row handling, plus `IDataReader`/custom reader validation and retry tradeoffs.

Why:
R01 explains how `SqlBulkCopy` works. R02/R03 explain when direct bulk insert is not enough and how to design safer import flows around staging, validation, cleanup and streaming sources.

Next:
Review cached diff and commit. After that, this conspect is complete by image-use coverage.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- staging tables vs writing directly into final tables
- TableLock / BatchSize / indexes / triggers / transaction-log pressure / large-file streaming
- heap staging, shared staging table, temporary table, import id / one-import-at-a-time flows
- cleanup strategies: drop table, delete successful rows, batch cleanup, cleanup inside/outside transaction
- failed-row handling: keep failed rows, move errors to separate table/path, isolate bad rows
- IDataReader/custom reader/DbDataReader streaming and why validation/retry/error response become harder
```

Key ideas:

- A staging table gives you a controlled place to validate, transform, dedupe, merge/upsert and isolate bad rows before touching final tables.
- Throughput depends on several interacting choices: batch size, locks, indexes, triggers, constraints, transaction boundaries and log pressure.
- Heap staging can be faster for raw loading; indexes can be built after load when that fits the workflow.
- Cleanup must match the import shape: one shared staging table with an import identifier, temporary tables, drop-table cleanup, delete-successful-rows, or move-failed-rows.
- `IDataReader`/`DbDataReader` and custom readers reduce memory and enable streaming, but they make validation, retry and error reporting harder because the data is often processed in one pass.
- Custom reader complexity is not always worth it for small/medium imports. Choose the simplest source shape that satisfies memory, validation and retry requirements.

Reading quality:

```text
overall: high for boundary and conceptual content
code/SQL punctuation: medium-high; preserved PNGs should be used for exact correction
coverage: final pass closes 64 image uses; remaining unclosed image uses = 0
```

---

## 1. Boundary / ownership

Included in this pass:

```text
R02 sources: 46
R03 sources: 18
Total newly closed: 64
```

Previously closed:

```text
R01 sources: 74
```

Duplicate image-use handling:

```text
No duplicate image uses were detected in stage0 for this conspect.
```

---

## 2. Verified source-preserving transcript

### 2.1 Why staging tables appear after the core API

The R02 road starts from the production problem that direct `SqlBulkCopy` into a final table is often too blunt. Staging tables let the import land quickly, then validation, cleanup, transformation, deduplication, merge/upsert and error isolation can happen in controlled SQL steps. This is the bridge between the fast API from R01 and a production-safe import workflow.

### 2.2 Performance checklist: locks, batches, indexes, triggers and log pressure

The performance screenshots group `TableLock`, `BatchSize`, index management, trigger/constraint behavior and transaction-log pressure. The key point is that performance is a system property, not one option. Table locks can help bulk throughput but reduce concurrency. Large batches reduce overhead but increase rollback/log impact. Indexes and triggers can make loading slower. Very large files may need streaming/chunking to keep memory and log growth controlled.

### 2.3 Heap/staging schema and index strategy

The staging screenshots show heap staging as a common raw-load strategy: insert fast first, then add/build indexes or run validation/merge steps after the bulk load. This area separates the loading shape from the final production schema. It also records that staging can include auxiliary columns such as import id, status, error text or validation markers.

### 2.4 Transaction and recommended flow

The transaction-flow screenshots show that import design must decide what belongs inside the transaction and what should be done outside it. Some workflows import into staging, validate, then merge into final tables inside a transaction. Other cleanup or diagnostic steps may intentionally happen outside the critical transaction. The archive records this as a boundary point rather than prescribing one universal transaction shape.

### 2.5 Failed-row handling

The failed-row road explains why production imports need ways to identify and keep bad rows. Possible patterns include keeping failed rows in staging, deleting successful rows, moving error rows to a separate table/path, and storing error information for later review. This is a major reason to prefer staging over direct final-table insertion when the source is messy.

### 2.6 Cleanup strategies

The cleanup screenshots cover shared staging tables, one-import-at-a-time/import-id flows, temporary tables, dropping staging tables, batch cleanup and index cleanup. The high-level choice is between cheap cleanup and auditability. Dropping a temp table is simple; keeping a shared staging table with import id and error status supports diagnostics and partial success handling.

### 2.7 IDataReader / DbDataReader / custom reader streaming

The R03 road shows reader-style sources: `IDataReader`, `DbDataReader`, custom CSV readers and database-to-database reads. These are useful for streaming and for avoiding a large `DataTable` in memory. They also fit cases where rows are already coming from another database or a forward-only parser.

### 2.8 Validation, retry and one-pass tradeoffs

The custom-reader screenshots emphasize the cost of one-pass processing. Validation and error responses become harder because you may not have a full materialized dataset. Retry behavior is harder because a stream may not be rewindable. Extra logic in the reader can make the import pipeline harder to test and reason about. This is why the notes say custom readers are not always faster or better for small/medium imports.

### 2.9 Choosing the import architecture

The final takeaway is a choice tree:

```text
small/simple import -> DataTable or straightforward source may be enough
large file / memory pressure -> reader/streaming source may help
messy source / validation / partial failures -> staging table is usually safer
upsert/merge/final-table invariants -> staging + SQL validation/merge flow
need detailed failed-row reporting -> keep/move failed rows rather than direct final-table load
```

---

## 3. Final coverage audit

```text
total image uses: 138
R01 processed: 74
R02 processed: 46
R03 processed: 18
remaining unclosed image uses: 0
```

Final verdict:

```text
SQL Server / EF Core / SqlBulkCopy conspect complete by image-use coverage.
```

---

## 4. Source table

See:

```text
data/R02R03-sources-stage2-v001.csv
data/R02R03-sources-stage2-v001.json
data/R02R03-boundary-review-stage2-v001.*
data/final-coverage-audit-stage2-v001.*
audit-assets/R02R03-source-images/*.png
audit-assets/contact-sheet-R02R03-final-coverage-v001.png
```

Those files preserve every R02/R03 source image use with coordinates, nearest labels, topic, summary and confidence notes.

---

## 5. Questions / correction hooks

- Recheck exact SQL/C# punctuation against preserved PNGs before using code literally.
- If this becomes implementation guidance, split future polish into two code-exact subpasses: `staging/merge/cleanup` and `IDataReader/custom reader`.
- If exact failed-row isolation matters, derive a concrete production flow from the preserved source images rather than relying only on this conceptual transcript.
