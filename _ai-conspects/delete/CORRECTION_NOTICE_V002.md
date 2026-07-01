# Critical correction notice — delete

The previous active transcript did not preserve the screenshot predicate.

Incorrect old reconstruction:

```sql
p2.id = p.id
```

Authoritative source:

```sql
id < p.id
```

This changes the query from “delete later duplicates” to a self-matching predicate that can target every row.

All active transcript paths in this archive are replaced with the corrected source-preserving version.
