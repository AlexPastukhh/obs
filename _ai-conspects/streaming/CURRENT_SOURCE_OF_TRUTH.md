# Current Source of Truth - Streaming

Generated: 2026-06-01 22:55:38 UTC

## Policy

Inventory/ledger is a checklist, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 streaming bytes / stream concept basics: transcript v001 done
R02 reading response stream / payload bytes: transcript v001 done
R03 streaming objects / async iteration / REST API concerns: transcript v001 done
R04 IAsyncEnumerable / NDJSON / FlushAsync: next
```

## R03 note

```text
S-024/S-025/S-026/S-027 were pulled from UNSPLIT into R03 by semantic review because they continue the REST-friendly streaming endpoint concerns tail.
S-084 was checked but left for R04 because it starts NDJSON streaming controller implementation.
S-090/S-015 duplicate visible code snippet placements are both recorded.
```
