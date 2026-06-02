# Stage 0 - Time Boundary Review and Split Plan v001

Generated: 2026-06-02 08:43:41 UTC

## Done

- Parsed uploaded Excalidraw SVG.
- Extracted embedded PNG sources.
- Built image-use inventory and label inventory.
- Created first boundary/split plan.
- Created contact sheets and canvas map.

## Why this is not transcript yet

This SVG is medium-large:

```text
unique embedded images: 206
image uses on canvas: 206
text labels parsed: 107
```

A blind transcript would risk losing/misassigning screenshots. Stage0 is only inventory/checklist and split plan.

## Size policy for this conspect

```text
Default pass size: 50-80 image uses.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only when explicitly requested or when splitting breaks one cohesive road.
Inventory/ledger is not source of truth.
Transcript ownership is decided by visual/semantic boundary review.
```

## Proposed passes

| Pass | Count | Meaning |
|---|---:|---|
| P01-R01-core-types-offset-ticks-unix-js | 59 | Core DateTime/DateTimeOffset choices, Kind/offset basics, comparing, ticks, Unix time, JS local formatting. |
| P02-R03-parsing-formatting-cheat-sheets | 58 | Parsing/ParseExact/TryParse, standard/custom formats, ISO/RFC/Unix/string formatting cheat sheets. |
| P03-R04-timezones-conversion-json-model-binding-dst | 57 | TimeZoneInfo, UTC/local conversion, JSON/model binding, date math pitfalls, user local time, DST. |
| P04-R05-invalid-ambiguous-time-policies | 32 | Invalid/ambiguous local times, DST gaps/folds, timezone policy helpers. |

## Subregion counts

```text
R04-timezones-converting-date-math-dst: 57
R01-core-types-offset-ticks-unix-js: 59
R05-invalid-ambiguous-time-policies: 32
R03-parsing-formatting-cheat-sheets: 58
```

## Pass counts

```text
P01-R01-core-types-offset-ticks-unix-js: 59
P02-R03-parsing-formatting-cheat-sheets: 58
P03-R04-timezones-conversion-json-model-binding-dst: 57
P04-R05-invalid-ambiguous-time-policies: 32
```

## Contact sheets

```text
audit-assets/contact-sheet-all-candidates-stage0.png
audit-assets/contact-sheet-P01-R01-core-types-offset-ticks-unix-js.png
audit-assets/contact-sheet-P02-R03-parsing-formatting-cheat-sheets.png
audit-assets/contact-sheet-P03-R04-timezones-conversion-json-model-binding-dst.png
audit-assets/contact-sheet-P04-R05-invalid-ambiguous-time-policies.png
audit-assets/canvas-map-labels-and-image-boxes.png
```

## Next

Start with P01/R01 transcript only after local boundary recheck:

```text
R01: core DateTime / DateTimeOffset choices, offset/Kind basics, comparing, ticks, Unix time, JS/local formatting.
```
