# Current Source of Truth - SQL Server MARS

Generated: 2026-06-13 11:04:52 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
P01 transcript: next
P02 transcript: pending
Final coverage audit: pending
```

## Stage0 inventory

```text
unique embedded images: 26
image uses: 26
text labels: 13
```

## Proposed split

```text
P01 / R01+R02: 16 images
- R01: mars-purpose-connection-reader-command-basics: 8 images
- R02: multiple-readers-batches-transactions-and-interleaving: 8 images
P02 / R03+R04: 10 images
- R03: ef-ado-net-settings-connection-string-and-errors: 8 images
- R04: performance-alternatives-and-practical-guidelines: 2 images
```

## Next pass

```text
P01/R01R02 transcript: MARS purpose/basics + multiple readers/transactions behavior.
```
