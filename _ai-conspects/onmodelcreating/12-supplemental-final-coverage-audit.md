# Supplemental screenshot-layer final coverage audit

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Result

```text
unique embedded screenshots: 220 / 220
screenshot uses on canvas: 220 / 220
duplicate screenshot placements: 0
remaining unclosed screenshot uses: 0
```

## Region closure

| Region | Source uses | Processed | Remaining | Transcript |
|---|---:|---:|---:|---|
| R01 | 14 | 14 | 0 | `03-supplemental-transcript-R01-collations-hilo-and-value-generation-orientation.md` |
| R02 | 21 | 21 | 0 | `03-supplemental-transcript-R02-many-to-many-join-entities-utf8-collations-and-hilo.md` |
| R03 | 40 | 40 | 0 | `03-supplemental-transcript-R03-defaults-computed-values-triggers-join-tables-and-backing-fields.md` |
| R04 | 61 | 61 | 0 | `03-supplemental-transcript-R04-value-generation-save-behavior-indexes-schema-sequences-and-access-modes.md` |
| R05 | 7 | 7 | 0 | `03-supplemental-transcript-R05-configuration-classes-property-access-and-provider-collations.md` |
| R06 | 18 | 18 | 0 | `03-supplemental-transcript-R06-conventions-save-behavior-and-polymorphic-query-foundations.md` |
| R07 | 26 | 26 | 0 | `03-supplemental-transcript-R07-tph-tpt-tpc-query-costs-casting-and-value-converters.md` |
| R08 | 14 | 14 | 0 | `03-supplemental-transcript-R08-tpc-polymorphic-union-and-enum-string-converter-tradeoffs.md` |
| R09 | 19 | 19 | 0 | `03-supplemental-transcript-R09-inheritance-mapping-control-discovery-and-configuration-application.md` |

## Validation

- Every `IU-*` identifier occurs exactly once in the closed ledger.
- Every source use is assigned to one closed regional transcript.
- Region totals sum to 220.
- The source contains no duplicate screenshot placements.
- No screenshot use remains pending.
