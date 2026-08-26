# Knowledge Registry

Source conspect: `_ai-conspects/any in exists/`

Authoritative processed source: `01-final-transcript.md`

Original SVG: `source/any in exists.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| `IN` membership comparison | `sql.subquery-membership-and-existence` | `sql` | [[../_knowledge/sql/subquery-membership-and-existence]] | MAPPED |
| Correlated `EXISTS` relationship check | `sql.subquery-membership-and-existence` | `sql` | [[../_knowledge/sql/subquery-membership-and-existence]] | MAPPED |
| `ANY` / `SOME` and comparison with `ALL` | `sql.subquery-membership-and-existence` | `sql` | [[../_knowledge/sql/subquery-membership-and-existence]] | MAPPED |
| `NOT IN` null semantics and the `NOT EXISTS` anti-join | `sql.subquery-membership-and-existence` | `sql` | [[../_knowledge/sql/subquery-membership-and-existence]] | MAPPED |
| Optimizer, execution-plan, and index guidance | `sql.subquery-membership-and-existence` | `sql` | [[../_knowledge/sql/subquery-membership-and-existence]] | MAPPED |
| Coverage counts, screenshot inventory, audit state, and processing metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- All learning areas remain one unit because they answer one comparative question: how SQL expresses subquery membership, existence, quantified comparison, and absence.
- The `NOT IN` null caveat stays with the comparison model rather than becoming a small standalone unit.
- Performance guidance remains a boundary note inside the unit; the source does not develop query-plan analysis into an independent concept.

## Explicit disposition notes

- The only embedded screenshot and the complete semantic transcript are represented by the five mapped areas.
- There are no native SVG labels and no substantial source claim was excluded.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 5 | Every meaningful transcript area maps to the single knowledge unit. |
| MERGED | 0 | No existing SQL unit was available to extend. |
| NON_LEARNING | 1 | Coverage and processing metadata remain in the workspace. |
| UNRESOLVED | 0 | No meaningful source claim remains unclassified. |
