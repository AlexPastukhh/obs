# Current Source of Truth - Produces / Consumes / Input Output Formatters / 406 415 / Vary Accept

Generated: 2026-06-13 04:58:17 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
P01/R01R02 produces-consumes formatter negotiation: next
P02/R03R04 status diagnostics and Vary/Accept browser policy: pending
```

## Stage0 inventory

```text
unique embedded images: 44
image uses: 44
text labels: 92
```

## Proposed split

```text
R01 produces/output formatters/Accept negotiation: 10 image uses
R02 consumes/input formatters/action selection/415: 11 image uses
R03 406/415 diagnostics/StatusCodePages/ProblemDetails: 11 image uses
R04 Vary Accept/browser Accept header policy: 12 image uses
```

## Next pass

```text
P01 / R01R02:
[Produces], output formatters, Accept negotiation,
[Consumes], input formatters, IActionConstraint, action selection, 415.
```
