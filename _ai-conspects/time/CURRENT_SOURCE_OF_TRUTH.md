# Current Source of Truth - Time

Generated: 2026-06-02 09:06:34 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 core DateTime / DateTimeOffset / Kind / ticks / Unix / JS local display: transcript v001 done
P02/R03 parsing and formatting cheat sheets: next
```

## R01 boundary corrections

```text
Pulled into R01 from initial R04 candidates:
S-063, S-064, S-065, S-066, S-067

Reserved from initial P01 into P02/R03:
S-201, S-202, S-203, S-204, S-205, S-206

Checked-not-R01, reserved for R04:
S-068, S-069, S-070, S-071, S-072
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P02 / R03:
parsing / ParseExact / TryParse, standard/custom formats, ISO/RFC/Unix/string formatting cheat sheets
```
