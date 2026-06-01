# Current Source of Truth - Streaming

Generated: 2026-06-01 23:36:11 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.
A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 streaming bytes / stream concept basics: transcript v001 done
R02 reading response stream / payload bytes: transcript v001 done
R03 streaming objects / async iteration / REST API concerns: transcript v001 done
R04 IAsyncEnumerable / NDJSON / FlushAsync: transcript v003 coverage correction done
R05 SSE / EventSource / writer / heartbeat / reconnect: next
```

## R04 v003 note

```text
R05 boundary precheck found an R04-owned manual-writing/FlushAsync tail in the R05 coordinate band.
S-163/S-165 were added to R04.
S-166-S176 were recorded as duplicate image uses of already-transcribed R04 material.
R05 should now continue with SSE/EventSource-specific sources only.
```
