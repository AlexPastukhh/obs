# Current Source of Truth - Streaming

Generated: 2026-06-01 23:26:17 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.
A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 streaming bytes / stream concept basics: transcript v001 done
R02 reading response stream / payload bytes: transcript v001 done
R03 streaming objects / async iteration / REST API concerns: transcript v001 done
R04 IAsyncEnumerable / NDJSON / FlushAsync: transcript v001 done
R05 SSE / EventSource / writer / heartbeat / reconnect: next
```

## R04 note

```text
R04 includes NDJSON/JSON-array/client-streaming/ResponseHeadersRead/FlushAsync implementation material.
S-110/S-111/S-112/S-113/S-126/S-127/S-128/S-129 were checked and reserved for R05 SSE/EventSource/reconnect road.
```
