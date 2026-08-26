# Knowledge Registry

Source conspect: `_ai-conspects/js sorting/`

Authoritative processed source: `01-final-transcript.md`

Original SVG: `source/js sorting.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| R01 — `localeCompare`, comparator result, reusable collator, and applicability | `javascript.intl-collator` | `javascript` | [[../_knowledge/javascript/intl-collator]] | MAPPED |
| R02 — sensitivity, numeric ordering, punctuation, case, and locale options | `javascript.intl-collator` | `javascript` | [[../_knowledge/javascript/intl-collator]] | MAPPED |
| R03 — sort ordering versus search equivalence and practical presets | `javascript.collation-sort-vs-search` | `javascript` | [[../_knowledge/javascript/collation-sort-vs-search]] | MAPPED |
| Final practical checklist | both units above | `javascript` | [[../_knowledge/javascript/intl-collator]]; [[../_knowledge/javascript/collation-sort-vs-search]] | MAPPED |
| Coverage counts, image/text inventory, audit state, and processing metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- R01 and R02 form one unit because the options only become independently useful within the `Intl.Collator` comparison model.
- R03 remains separate because choosing ordering versus equivalence behavior is an independent decision that can be recalled and reviewed on its own.
- Common presets and examples stay with the decision model rather than becoming separate units.
- The existing `javascript.set-vs-array` unit mentions sorting but does not duplicate locale-aware comparison knowledge.

## Explicit disposition notes

- All 13 screenshots and all six native SVG labels are represented by R01–R03 and the checklist mappings.
- No substantial transcript statement was excluded as disputed, erroneous, or outside the selected boundaries.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 4 | All semantic regions and the final checklist are traceable to two units. |
| MERGED | 0 | No existing semantic duplicate was available to extend. |
| NON_LEARNING | 1 | Coverage and processing metadata remain in the workspace. |
| UNRESOLVED | 0 | No meaningful source claim remains unclassified. |
