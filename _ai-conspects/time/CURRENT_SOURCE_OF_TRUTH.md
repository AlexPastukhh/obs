# Current Source of Truth - Time

Generated: 2026-06-02 12:09:04 UTC

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
Final coverage audit: done
```

## Final audit verdict

```text
total image uses: 206
covered image uses: 206
problem image uses: 0
verdict: coverage-complete
```

## Closure note

```text
The time conspect is complete unless later manual review finds a concrete transcript-quality issue or a specific misassigned image.
```

## Current split policy for future conspects

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```
