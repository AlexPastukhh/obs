# Knowledge Registry

Source conspect: `_ai-conspects/FLAT FLATMAP/`

Authoritative processed source: `05-full-combined-final-transcript.md`

Original SVG: `source/FLAT FLATMAP.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| R01 — `flat` depth, eligible values, shallow-copy behavior, and caveats | `javascript.array-flat` | `javascript` | [[../_knowledge/javascript/array-flat]] | MAPPED |
| R02 — `flatMap` callback contract and one-level limit | `javascript.array-flatmap` | `javascript` | [[../_knowledge/javascript/array-flatmap]] | MAPPED |
| R03 — step-by-step expansion, text splitting, and combinations | `javascript.array-flatmap` | `javascript` | [[../_knowledge/javascript/array-flatmap]] | MAPPED |
| R04 — `reduce`, loops, and selection trade-offs | `javascript.array-flatmap` | `javascript` | [[../_knowledge/javascript/array-flatmap]] | MAPPED |
| Coverage ledgers, inventories, audit state, and archive instructions | — | — | — | NON_LEARNING |

## Boundary decisions

- `flat` and `flatMap` remain separate because explicit depth flattening and callback-driven one-to-many transformation are independently reviewable models.
- R02–R04 combine into one `flatMap` unit; examples and alternatives do not become standalone files.

## Explicit disposition notes

- All four regions, eight screenshots, and three text elements are mapped.
- No substantial source statement was excluded.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 4 | Every learning region maps to one of two units. |
| MERGED | 0 | No semantic duplicate existed. |
| NON_LEARNING | 1 | Processing and audit data remain in the workspace. |
| UNRESOLVED | 0 | No meaningful claim remains unclassified. |
