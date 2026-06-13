# Current Source of Truth - Lock / Monitor

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
unique embedded images: 25
image uses: 25
text labels: 22
```

## Proposed split

```text
P01 / R01+R02: 16 images
- R01: lock-monitor-mutual-exclusion-and-critical-section: 8 images
- R02: monitor-wait-pulse-pulseall-and-condition-signaling: 8 images
P02 / R03+R04: 9 images
- R03: deadlocks-reentrancy-tryenter-timeouts-and-lock-ordering: 8 images
- R04: async-locking-alternatives-and-practical-guidelines: 1 images
```

## Next pass

```text
P01/R01R02 transcript: lock/Monitor mutual exclusion + Wait/Pulse signaling.
```
