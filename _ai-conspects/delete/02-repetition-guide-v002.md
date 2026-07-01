# SQL DELETE duplicate cleanup — repetition guide v002

## Core mental model

```text
outer row p
    delete it only when
    an earlier row exists
    with the same email
```

The survivor criterion is:

```sql
MIN(id) per email group
```

The `<` predicate encodes “an earlier row exists.”

## Comparisons

| Predicate | Meaning | Safety |
|---|---|---|
| `earlier.id < p.id` | an older duplicate exists | correct for keeping minimum ID |
| `earlier.id = p.id` | the row matches itself | can target every row |
| `earlier.id > p.id` | a later duplicate exists | would remove earlier rows and tend to keep maximum ID |

## Exercises

1. Rewrite the query using a CTE and `ROW_NUMBER()`.
2. Keep the latest row instead of the earliest row.
3. Handle null emails as one duplicate group.
4. Compare the EXISTS solution with a window-function solution.
5. Add a safe unique index after cleanup.
6. Design a preview query that shows survivor ID beside each deleted row.
7. Explain how case-insensitive collation changes duplicate grouping.
8. Create a test table and verify the delete inside a rolled-back transaction.
