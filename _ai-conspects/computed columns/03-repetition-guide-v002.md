# SQL Server computed columns — repetition guide v002

Generated: 2026-07-01

## Core distinctions

| Form | Base-row result stored? | Evaluated/maintained when |
|---|---:|---|
| non-persisted computed column | not necessarily | when query needs the value |
| `PERSISTED` computed column | yes | on insert/update of dependencies |
| index on computed column | index key is stored | on insert/update of dependencies |

## High-value questions

1. What does SQL Server store for a non-persisted computed column?
2. What exactly changes when `PERSISTED` is added?
3. How can a non-persisted computed column still have stored index keys?
4. Trace the unique-index insert sequence for `BOB@EXAMPLE.COM`.
5. Trace the update from `BOB@EXAMPLE.COM` to `ALICE@EXAMPLE.COM`.
6. Why does `LOWER(Email)` remain stable as time passes?
7. Why can `GETDATE()` make an index key stale without DML?
8. What additional real-world SQL Server requirements may apply to indexed computed columns besides determinism?

## SQL reconstruction prompts

1. Recreate the non-persisted `Users` table.
2. Add `PERSISTED`.
3. Create `UX_Users_NormalizedEmail`.
4. Insert an email and predict the computed key.
5. Update the email and list every table/index maintenance step.
6. Write the `IsRecent` computed expression and explain why it is unsuitable as a stable indexed key.

## Misconceptions to reject

- A computed column is always physically stored.
- `PERSISTED` means application code must write the computed value.
- A non-persisted computed column cannot be indexed.
- SQL Server needs a separate manual command to update the index.
- Time-based expressions stay index-safe because the row itself did not change.
