# Current Source of Truth - Produces / Consumes / Input Output Formatters / 406 415 / Vary Accept

Generated: 2026-06-13 05:14:03 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 produces / output formatters / Accept negotiation: transcript v001 done
R02 consumes / input formatters / action selection / 415: transcript v001 done
P02/R03R04 status diagnostics and Vary/Accept browser policy: next
```

## P01 boundary decisions

```text
R01 included:
10 image uses

R02 included:
11 image uses

Checked-not-P01 / reserved for P02:
S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-028, S-029, S-030, S-031, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P02 / R03R04:
406/415 diagnostics, StatusCodePages, ProblemDetails,
ReasonPhrases/status-code endpoints, Vary: Accept,
RespectBrowserAcceptHeader, broad browser Accept header policy.
```
