# Current Source of Truth - EF Core SQL query and command APIs

Updated: 2026-07-04 UTC

## Policy

Screenshots in the corrected SVG are the primary source.

The authoritative readable layer is a complete semantic transcript. It preserves all material API categories,
tracking behavior, parameterization rules, dynamic-SQL constraints, transaction requirements, and set-based
DML limitations without retaining OCR artifacts.

## Verified source

```text
repository source: source/source-complete-v002.svg
SHA-256: 6cd7d851e1faf6da4ebadbdd509713f7a552b5b52769d44c084ccc10da70ab8d
Git blob: 38a2d5583e5fda228cfcb9e511297aaf0c86a989
unique embedded images: 51
image uses: 52
duplicate placement: 1
SVG text nodes: 19
Stage0 rebuild required: no
```

## Authoritative transcript

```text
regions/full-semantic-transcript-v001.md
image-use coverage: 52 / 52
SVG text-node review: 19 / 19
```

The transcript covers `FromSql`, `FromSqlRaw`, interpolated SQL, `Database.SqlQuery<T>`, immediate
`ExecuteSql` commands, parameterization, safe dynamic SQL, entity tracking, non-entity projections,
`ExecuteUpdateAsync`, `ExecuteDeleteAsync`, `SetProperty`, stale tracked state, transactions, and domain
logic boundaries.

The older `regions/full-svg-reconciliation-v002.md` remains a secondary regional overview. It is superseded
as the authoritative study transcript.

## Repetition material

```text
QUESTIONS.md
```

## Closure

```text
corrected source SVG verified
semantic content coverage complete
authoritative semantic transcript present
question bank present
known mojibake or OCR placeholders: none
```
