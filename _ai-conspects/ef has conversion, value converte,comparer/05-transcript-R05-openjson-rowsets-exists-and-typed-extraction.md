# Regional transcript — R05: OPENJSON rowsets, EXISTS and typed extraction

Conspect: `ef has conversion, value converte,comparer`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 13 / 13
unique screenshots represented: 13
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The final road explains how SQL Server expands JSON into rows and why `EXISTS` is the natural operator for containment queries.

## Line-by-line containment query

- The outer query returns rows from the entity table.
- `OPENJSON(p.Tags)` emits one row per JSON array element with key, value and type.
- The predicate compares `j.value` to a parameter.
- `EXISTS` stops after the first match and avoids duplicate outer rows.

## WITH clause

- A simple primitive array can use the default `value` column without `WITH`.
- `WITH` is useful for JSON objects, multiple properties and explicit SQL types.
- Typed extraction avoids lexical string comparison for numbers and dates.
- It can also make complex queries clearer and easier to optimize.

## JSON objects and numeric comparisons

- For an array of objects, define columns such as name and level in the `WITH` clause.
- For one JSON object, `OPENJSON` plus `WITH` can extract multiple fields in one pass.
- Map numeric values to numeric SQL types before comparing; do not compare numeric JSON as strings.

## Rule of thumb

- Primitive array contains one string: `OPENJSON` plus `EXISTS` without `WITH` is enough.
- Objects, multiple properties or typed comparisons: use `WITH`.
- Repeated high-volume predicates may justify computed columns, indexes or relational normalization.

## Representative pattern

```sql
SELECT p.*
FROM Posts AS p
WHERE EXISTS
(
    SELECT 1
    FROM OPENJSON(p.Tags) AS j
    WHERE j.[value] = @tag
);
```

## Caveats

- JSON rowset functions can be expensive without selective predicates or extracted indexes.
- Use query plans and measurements before committing to a denormalized JSON design.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-048, IU-049, IU-050, IU-051, IU-052, IU-053, IU-054, IU-055, IU-056, IU-057, IU-058, IU-059, IU-060
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
