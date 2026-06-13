# Current Source of Truth - Produces / Consumes / Input Output Formatters / 406 415 / Vary Accept

Generated: 2026-06-13 05:25:22 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 produces / output formatters / Accept negotiation: transcript v001 done
R02 consumes / input formatters / action selection / 415: transcript v001 done
R03 406/415 diagnostics / StatusCodePages / ProblemDetails: transcript v001 done
R04 Vary: Accept / browser Accept header policy: transcript v001 done
Final coverage audit: next
```

## Coverage after Stage2

```text
total image uses: 44
processed-in-r01-v001: 10
processed-in-r02-v001: 11
processed-in-r03-v001: 11
processed-in-r04-v001: 12
pending/problem rows before final audit: 0
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
Final coverage audit:
verify all 44 image uses are processed,
no candidate/reserved/pending/unreviewed rows remain,
record coverage-complete or concrete problems.
```
