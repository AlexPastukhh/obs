# Stage 2 - P02 Procedural SQL and DML Transcript v001

Generated: 2026-06-02 15:45:53 UTC

## Done

- P02 transcript created with two separate region files.
- R03 stored procedures/output params/control flow/rowversion: 23 image uses.
- R04 core table/DML/output/variables/TRY-CATCH: 32 image uses.
- P01 and P03 neighbor screenshots were checked.

## Why combined

The P02 pass is one SQL syntax/procedural area, but it has two semantic regions:

```text
R03: stored procedures / parameters / control flow / rowversion patterns
R04: CREATE TABLE / DML / OUTPUT / variables / @@ROWCOUNT / TRY-CATCH
```

They are kept as separate region files.

## Now

- Apply, review diff, commit P02.

## Next

- P03/R05 upsert/merge + transactions/indexes/ALTER/constraints/views.
