# Current Source of Truth - Time

Generated: 2026-06-02 09:24:19 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 core DateTime / DateTimeOffset / Kind / ticks / Unix / JS local display: transcript v001 done
R03 parsing / formatting / standard and custom formats: transcript v001 done
P03/R04 timezone conversion / JSON / model binding / date math / DST: next
```

## R03 boundary decisions

```text
Pulled into R03 from R01 reserved bucket:
S-201, S-202, S-203, S-204, S-205, S-206

Checked-not-R03, reserved for R04:
S-068, S-069
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P03 / R04:
TimeZoneInfo, UTC/local conversion, JSON/model binding, date math pitfalls, user local time, DST
```
