# Current Source of Truth - Time

Generated: 2026-06-02 11:59:00 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 core DateTime / DateTimeOffset / Kind / ticks / Unix / JS local display: transcript v001 done
R03 parsing / formatting / standard and custom formats: transcript v001 done
R03 correction: S158 custom-format escaping v002 done
R04 timezone conversion / JSON / model binding / date math / DST: transcript v001 done
R05 invalid / ambiguous local-time policies: transcript v001 done
Final coverage audit: next
```

## R05 boundary decisions

```text
Included in R05:
32 image uses

Pulled into R05 from R04 checked-excluded:
S-019, S-020, S-095, S-166, S-167
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
verify every known image use is processed/corrected/recorded and no candidate-needs-boundary-review remains.
```
