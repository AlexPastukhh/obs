# Determinism and index safety

## S-013 — Why predictable functions are suitable

**Known limits:** none

### Near-literal normalized transcript

### 4. Why predictable functions are okay

This is okay:

```sql
NormalizedEmail AS LOWER(Email)
```

Because for the same `Email`, the result is always the same:

```text
Email = 'BOB@EXAMPLE.COM'
LOWER(Email) = 'bob@example.com'
```

### Study meaning

A deterministic expression produces a stable key from the same dependency values.

### Recall questions

1. Why is `LOWER(Email)` predictable?
2. What result is shown for the example input?
3. What property makes the expression suitable for index maintenance?


---

## S-014 — A deterministic key remains stable over time

**Known limits:** none

### Near-literal normalized transcript

For the same email value:

```text
Today:
'bob@example.com'

Tomorrow:
'bob@example.com'

Next month:
'bob@example.com'
```

The computed value changes only when `Email` changes.

That means SQL Server can safely maintain the index.

### Study meaning

Passing time alone does not invalidate a deterministic key based only on the row's email value.

### Recall questions

1. What result is shown at all three times?
2. What must change before the computed value changes?
3. Why does this make index maintenance possible?


---

## S-015 — Stable dependency-to-index maintenance flow

**Known limits:** none

### Near-literal normalized transcript

Flow:

```text
Email does not change
=> NormalizedEmail does not change
=> index does not need to change

Email changes
=> NormalizedEmail may change
=> SQL Server updates index during the UPDATE
```

This is exactly what indexes need.

### Study meaning

The engine needs a reliable data-modification event that tells it when a key may need recalculation.

### Recall questions

1. When can the index remain untouched?
2. When may the key need recalculation?
3. Which DML event provides the maintenance trigger?


---

## S-016 — A nondeterministic time-based computed expression

**Known limits:** none

### Near-literal normalized transcript

### 5. Why unpredictable functions are not okay

Compare:

```sql
IsRecent AS
CASE
    WHEN CreatedAt >= DATEADD(day, -7, GETDATE())
        THEN 1
    ELSE 0
END
```

### Study meaning

`GETDATE()` changes independently of row data. Therefore the computed result can change even when no dependency column is modified.

### Recall questions

1. Which nondeterministic function is used?
2. What window does `DATEADD(day, -7, GETDATE())` represent?
3. What values can `IsRecent` return?
4. Why can the result change without DML?


---

## S-017 — January 3 versus January 20 example

**Known limits:** none

### Near-literal normalized transcript

Suppose the row is:

```text
Id = 1
CreatedAt = 2026-01-01
```

On January 3:

```text
GETDATE() = 2026-01-03
IsRecent = 1
```

On January 20:

```text
GETDATE() = 2026-01-20
IsRecent = 0
```

But the row did not change.

### Study meaning

The output changes because the current date changes, not because SQL Server receives a row modification that would trigger index maintenance.

### Recall questions

1. What is the row's CreatedAt value?
2. What is `IsRecent` on January 3?
3. What is it on January 20?
4. Which row column changed between those dates?


---

## S-018 — The impossible index-maintenance problem

**Known limits:** none

### Near-literal normalized transcript

```text
No INSERT.
No UPDATE.
No DELETE.

Only time passed.
```

That creates the impossible index-maintenance problem.

### Study meaning

An index cannot stay correct if its key changes spontaneously without a data-change operation that tells the engine to recompute it.

### Recall questions

1. Which three DML operations did not occur?
2. What changed instead?
3. Why would a stored index key become stale?
4. What rule follows for indexed computed expressions?
