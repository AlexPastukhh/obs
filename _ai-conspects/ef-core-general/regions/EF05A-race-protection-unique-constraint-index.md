# EF05A - Race protection with UNIQUE constraint/index

Conspect: `ef-core-general`  
File type: **source-preserving region transcript**  
Stage: **11 / verified transcript v001**  
Generated: 2026-06-02 00:07:27 UTC

---

## Done

- Stage10 combined boundary review defined EF05/EF06.
- This file completes EF05A transcript.
- `S-012/S-013/S-011` are processed as race protection with UNIQUE constraint/index.

## Now

- Review this archive diff.
- Commit if transcript and boundary decisions look correct.

## Next

- EF05B transcript.
- Meaning: owned FullName / optional mapping / CHECK constraint.
- Sources: `S-004, S-005, S-002, S-003, S-019`.

## Later

- EF05C: optional value objects / complex types.
- EF06A/EF06B/EF06C: concurrency, transactions, exceptions/retry.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
- TOCTOU race when checking if an email is available before insert
- why application-level pre-checks do not guarantee uniqueness under parallel requests
- UNIQUE constraints/indexes as database-level invariant protection
- EF Core mapping for an owned Email value and unique index on the Email column

Key ideas:
- Two parallel requests can both observe that an email is free before either insert commits.
- A database UNIQUE constraint/index is the authoritative guard that physically prevents duplicate email rows.
- When a duplicate insert happens, the database rejects the operation, for example PostgreSQL error 23505 UNIQUE_VIOLATION.
- For an owned Email value object mapped to an Email column, the model can add a unique index over that column.
- Application pre-checks can improve UX, but DB-level constraints protect the invariant.

Reading quality:

```text
Overall: high.
All EF05A source images are readable.
Confidence: high for source transcript and boundary decision.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-012, S-013, S-011
```

Pending in parent EF05:
```text
EF05B -> S-004, S-005, S-002, S-003, S-019
EF05C -> S-014, S-015, S-016, S-017, S-018, S-020, S-021, S-022, S-023
```

Pending sibling EF06:
```text
EF06A -> S-047, S-048
EF06B -> S-049, S-050, S-051, S-052
EF06C -> S-062, S-063, S-064, S-065, S-061
```

Boundary decision:
```text
EF05A covers uniqueness/race-protection only.
It does not process owned FullName/complex type details or transaction/exception details.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| EF05A-S001 | S-012 | IU-012 | `62853cad31` | `verified-from-source-image` | no | why pre-check isEmailAvailable does not protect from race |
| EF05A-S002 | S-013 | IU-013 | `0f7c82eb0b` | `verified-from-source-image` | no | what UNIQUE constraint/index does |
| EF05A-S003 | S-011 | IU-011 | `3dc7a29628` | `verified-from-source-image` | no | EF Core mapping: owned Email value and unique email index |

---

## 2. Verified source transcript

### EF05A-S001 / S-012 - `62853cad31`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05a-toctou-race-email-availability-check`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: why pre-check isEmailAvailable does not protect from race

#### Visible text

```text
1. Почему проверка «isEmailAvailable()» не спасёт от гонки

• Сценарий TOCTOU:
    i. Запрос A: сервер читает — email свободен.
    ii. Запрос B: сервер читает — email свободен.
    iii. A выполняет INSERT.
    iv. B выполняет INSERT.
```

#### Notes

Full source image visually checked. Russian text preserved.

---

### EF05A-S002 / S-013 - `0f7c82eb0b`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05a-unique-constraint-semantics`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: what UNIQUE constraint/index does

#### Visible text

```text
2. Что делает UNIQUE CONSTRAINT/INDEX

• UNIQUE ограничение в СУБД — это механизм, который гарантирует, что в столбце (или наборе столбцов) не будет двух строк с одинаковым значением.
• При попытке вставить вторую строку с тем же значением СУБД отклоняет операцию и возвращает ошибку (например, в PostgreSQL — error code 23505 UNIQUE_VIOLATION).
• Следовательно: в корректной реляционной БД с включённым уникальным ограничением физически получить две строки с одинаковым email нельзя.
```

#### Notes

Full source image visually checked. Russian text preserved.

---

### EF05A-S003 / S-011 - `3dc7a29628`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05a-efcore-owned-email-unique-index`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF Core mapping: owned Email value and unique email index

#### Visible code

```csharp
cb.OwnsOne(c=>c.Email,eb=>
{
    eb.Property(e=>e.Value)
        .HasColumnName("Email")
        .HasMaxLength(100)
        .IsRequired();
});

// Add this line for unique email constraint
cb.HasIndex("Email").IsUnique();
```

#### Notes

Full source image visually checked. Code preserved as visible source.

---

## 3. Cleaned source notes

- A pre-insert availability check is vulnerable to TOCTOU: two parallel requests can both read that an email is free.
- If both requests then insert, the application-level check alone does not serialize the invariant.
- A UNIQUE constraint/index in the database guarantees that two rows cannot have the same value in the constrained column or column set.
- On duplicate insert, the database rejects the operation and returns an error such as PostgreSQL 23505 UNIQUE_VIOLATION.
- For an owned `Email` value mapped to the `Email` column, the model adds `cb.HasIndex("Email").IsUnique();` to enforce uniqueness.
- The app may still do an `isEmailAvailable()` pre-check for UX, but it must rely on the database constraint for correctness under concurrency.

---

## 4. Minimal interpretation

EF05A explains why uniqueness must be protected at the database level. A read-before-write check can race: two requests can both see the email as available before either insert is committed. The database UNIQUE constraint/index is the final authority that prevents duplicate rows. EF Core mapping then expresses this invariant by mapping the owned Email value to an `Email` column and adding a unique index over that column.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| `isEmailAvailable()` style pre-check can race under two parallel requests | EF05A-S001 | high |
| A UNIQUE constraint/index guarantees no two rows have the same constrained value | EF05A-S002 | high |
| Duplicate insert is rejected by the DB, e.g. PostgreSQL 23505 UNIQUE_VIOLATION | EF05A-S002 | high |
| EF mapping can map owned Email.Value to the Email column | EF05A-S003 | high |
| EF mapping can add a unique index for Email | EF05A-S003 | high |

---

## 6. Question hooks

- Why does `isEmailAvailable()` not protect against a race?
- What is a TOCTOU race in the email availability example?
- What does a UNIQUE constraint/index guarantee?
- What database error can PostgreSQL return for a unique violation?
- How can EF Core map an owned Email value to an Email column?
- Where is the unique index added in the EF mapping?
- Why can a UX pre-check still be useful even if it is not sufficient for correctness?

---

## 7. Open review issues

- EF05B and EF05C remain candidate-only until transcript passes.
- EF06 remains candidate-only until transcript passes.
- If later sources show exception-handling for unique violations, cross-reference EF05A rather than duplicating the uniqueness rationale.
