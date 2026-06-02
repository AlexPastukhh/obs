# Current Source of Truth - sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader

Generated: 2026-06-02 15:35:09 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.
A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 source/boundary review: done
R01 core SqlBulkCopy API/options/source-data/type-mapping/internal transaction: transcript v001 done
R02 staging/performance/cleanup/transaction-log/failed-row handling: pending
R03 IDataReader/custom reader/validation/retry/tradeoff: pending
Final coverage audit: pending
```

## Counts

```text
unique embedded images: 138
image uses on canvas: 138
R01 processed image uses: 74
remaining planned image uses: 64
```

## Candidate next step

```text
R02+R03 combined boundary review if coherent; otherwise split staging/performance and custom-reader tail.
Expected remaining: R02 46 + R03 18 = 64 image uses.
```
