# Indexed computed-column maintenance

## S-008 — Unique index on a non-persisted computed column

**Known limits:** none

### Near-literal normalized transcript

### 3. Computed column with an index

```sql
CREATE TABLE Users (
    Id INT IDENTITY PRIMARY KEY,
    Email NVARCHAR(320) NOT NULL,
    NormalizedEmail AS LOWER(Email)
);

CREATE UNIQUE INDEX UX_Users_NormalizedEmail
ON Users (NormalizedEmail);
```

Even if `NormalizedEmail` is not marked `PERSISTED`, the index stores the computed key values.

The base table may not physically store `NormalizedEmail` as a normal column, but the index contains values such as:

```text
bob@example.com   -> row Id 1
alice@example.com -> row Id 2
```

### Study meaning

Base-row persistence and index-key storage are separate. The index must materialize key values so it can search and enforce uniqueness.

### Recall questions

1. What is the index name?
2. Which column is the unique index key?
3. Can the index store keys when the base computed column is not PERSISTED?
4. What two example index entries are shown?


---

## S-009 — Index maintenance during INSERT

**Known limits:** none

### Near-literal normalized transcript

Flow on insert:

```sql
INSERT INTO Users (Email)
VALUES ('BOB@EXAMPLE.COM');
```

SQL Server does this:

1. Receive new `Email` value.
2. Compute `NormalizedEmail = LOWER('BOB@EXAMPLE.COM')`.
3. Check the unique index for `'bob@example.com'`.
4. If no duplicate exists, insert the row.
5. Add `'bob@example.com'` to the index.

### Study meaning

The unique computed index participates in write processing before the insert is accepted.

### Recall questions

1. What normalized key is computed?
2. When is uniqueness checked?
3. What happens if the key already exists?
4. What is added to the index after a successful insert?


---

## S-010 — UPDATE statement that changes an indexed dependency

**Known limits:** none

### Near-literal normalized transcript

Flow on update:

```sql
UPDATE Users
SET Email = 'ALICE@EXAMPLE.COM'
WHERE Id = 1;
```

### Study meaning

Changing `Email` can change the computed index key because `NormalizedEmail` depends on `Email`.

### Recall questions

1. Which row is changed?
2. What new email value is assigned?
3. Why must the computed index be maintained?


---

## S-011 — Detailed computed-index UPDATE maintenance

**Known limits:** none

### Near-literal normalized transcript

SQL Server does this:

1. Find row `Id 1`.
2. Old `Email = 'BOB@EXAMPLE.COM'`.
3. Old index key = `'bob@example.com'`.
4. New `Email = 'ALICE@EXAMPLE.COM'`.
5. New computed key = `'alice@example.com'`.
6. Check the unique index for `'alice@example.com'`.
7. If no duplicate exists:
   - update `Email` in the table;
   - remove old index entry `'bob@example.com'`;
   - add new index entry `'alice@example.com'`.

### Study meaning

The database atomically coordinates base-row modification, uniqueness validation, and replacement of the computed index entry.

### Recall questions

1. What old and new keys are shown?
2. Why is the new key checked before finalizing the update?
3. Which index entry is removed?
4. Which index entry is inserted?


---

## S-012 — Dependency tracking updates the index automatically

**Known limits:** none

### Near-literal normalized transcript

You do not manually tell SQL Server to update the index.

SQL Server knows that the index depends on:

```sql
LOWER(Email)
```

So when `Email` changes, SQL Server maintains the index automatically.

### Study meaning

The computed-column expression records dependencies that the storage engine uses during data modification.

### Recall questions

1. Does application code issue a separate index update?
2. Which expression creates the dependency?
3. What event causes index maintenance?
