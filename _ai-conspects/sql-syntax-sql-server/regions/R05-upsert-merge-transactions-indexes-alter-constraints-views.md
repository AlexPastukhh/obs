# R05 - Upsert / MERGE / transactions / indexes / ALTER / constraints / views

Generated: 2026-06-02 16:03:30 UTC

## 0.1 Area overview / key ideas / reading quality

This is the final SQL Server syntax region.

The road is:

```text
upsert
→ IF EXISTS update/insert path
→ MERGE
→ transactions
→ indexes
→ ALTER TABLE
→ columns
→ constraints
→ views
→ indexed views
```

Key ideas:

```text
1. Upsert means "update existing row, insert if missing".
2. `IF EXISTS` + `UPDATE`/`INSERT` is often clearer than `MERGE`.
3. `MERGE` combines matching source rows to target rows and can run different actions for matched/not-matched cases.
4. Transactions group multiple statements into an atomic unit.
5. Use `TRY...CATCH` with rollback around multi-step transactional work.
6. Indexes speed up reads for matching query patterns but cost writes and storage.
7. `ALTER TABLE` changes schema: add/drop/alter columns and constraints.
8. Constraints encode rules: primary key, foreign key, unique, default, check, nullability.
9. Views are saved query definitions; indexed views physically materialize results under restrictions.
```

Reading quality:

```text
overall: high
included image uses: 31
checked-not-P03 already R04: S-071, S-081, S-109, S-129
```

## 0.2 Coverage / boundary review

Included in R05:

```text
S-082, S-083, S-084, S-085, S-086, S-087, S-088, S-089, S-090, S-091, S-092, S-093, S-094, S-095, S-096, S-097, S-098, S-099, S-100, S-101, S-102, S-103, S-104, S-105, S-106, S-107, S-108, S-130, S-131, S-132, S-133
```

Checked but not included/reprocessed:

```text
S-071, S-081, S-109, S-129
```

Reason: these were already processed by R04 table/DML syntax. They were checked as boundary neighbors only.

## 1. Upsert

Upsert means:

```text
if row exists -> update it
else          -> insert it
```

A simple application-oriented shape:

```sql
IF EXISTS (SELECT 1 FROM dbo.Users WHERE Email = @Email)
BEGIN
    UPDATE dbo.Users
    SET Name = @Name
    WHERE Email = @Email;
END
ELSE
BEGIN
    INSERT INTO dbo.Users (Email, Name)
    VALUES (@Email, @Name);
END
```

This is easy to read and debug.

Use it when:

```text
one target row
simple key/existence predicate
clear business behavior
```

## 2. Upsert concurrency warning

Naive upsert has a race condition:

```text
session A checks row does not exist
session B checks row does not exist
both try INSERT
```

A unique constraint on the key is still required.

For safety:

```text
enforce uniqueness in the database
use transactions/locking where needed
handle duplicate-key errors when concurrent inserts race
```

The syntax block explains the shape, but production correctness depends on constraints and concurrency handling.

## 3. `MERGE`

`MERGE` can combine insert/update/delete logic.

Basic shape:

```sql
MERGE dbo.Target AS target
USING dbo.Source AS source
    ON target.Id = source.Id
WHEN MATCHED THEN
    UPDATE SET target.Name = source.Name
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Id, Name)
    VALUES (source.Id, source.Name)
WHEN NOT MATCHED BY SOURCE THEN
    DELETE;
```

Mental model:

```text
target = table being changed
source = incoming rows
ON     = matching rule
WHEN MATCHED = update existing
WHEN NOT MATCHED BY TARGET = insert missing
WHEN NOT MATCHED BY SOURCE = optional delete rows missing from source
```

## 4. `MERGE` with `OUTPUT`

`MERGE` can return actions and changed rows.

Shape:

```sql
MERGE dbo.Users AS target
USING @Incoming AS source
    ON target.Email = source.Email
WHEN MATCHED THEN
    UPDATE SET Name = source.Name
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Email, Name)
    VALUES (source.Email, source.Name)
OUTPUT
    $action AS MergeAction,
    inserted.Id,
    inserted.Email,
    inserted.Name;
```

`$action` tells whether the row was inserted, updated, or deleted.

Use `OUTPUT` when the caller needs changed IDs, rowversions, or action diagnostics.

## 5. Simpler alternative to `MERGE`

The notes treat the easier path as important:

```text
Sometimes IF EXISTS / UPDATE ELSE INSERT is easier than MERGE.
```

Reasons:

```text
easier to read
easier to debug
easier to add custom branching
less surprising for one-row operations
```

Use `MERGE` when the source/target set-based shape is actually valuable.

## 6. Transactions

Transaction pattern:

```sql
BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE dbo.Accounts
    SET Balance = Balance - @Amount
    WHERE Id = @FromAccountId;

    UPDATE dbo.Accounts
    SET Balance = Balance + @Amount
    WHERE Id = @ToAccountId;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;
```

Meaning:

```text
BEGIN TRANSACTION -> start atomic unit
COMMIT            -> persist all changes
ROLLBACK          -> undo all changes in transaction
```

Use transactions when multiple statements must succeed/fail together.

## 7. `@@TRANCOUNT`

`@@TRANCOUNT` tells how many active transactions are open in the current session.

Inside catch blocks:

```sql
IF @@TRANCOUNT > 0
    ROLLBACK TRANSACTION;
```

This avoids trying to rollback when there is no active transaction.

## 8. Indexes

Indexes help SQL Server find rows faster.

Basic nonclustered index:

```sql
CREATE INDEX IX_Users_Email
ON dbo.Users (Email);
```

Unique index:

```sql
CREATE UNIQUE INDEX UX_Users_Email
ON dbo.Users (Email);
```

Composite index:

```sql
CREATE INDEX IX_Orders_UserId_CreatedAt
ON dbo.Orders (UserId, CreatedAt);
```

Practical rule:

```text
create indexes for real query predicates, joins, sorting, and uniqueness needs
```

Tradeoff:

```text
faster reads
slower writes
more storage
maintenance cost
```

## 9. Clustered vs nonclustered

Conceptual distinction:

```text
clustered index    -> data physically organized by key order
nonclustered index -> separate lookup structure pointing to rows
```

A table usually has one clustered index.

Primary keys often create an index, but primary key and clustered index are not the same concept.

## 10. `ALTER TABLE`

Add column:

```sql
ALTER TABLE dbo.Users
ADD IsActive bit NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1;
```

Drop column:

```sql
ALTER TABLE dbo.Users
DROP COLUMN MiddleName;
```

Alter column:

```sql
ALTER TABLE dbo.Users
ALTER COLUMN Name nvarchar(200) NOT NULL;
```

Be careful:

```text
ALTER COLUMN can fail if existing data violates the new type/nullability/length.
DROP COLUMN can break dependent objects/code.
```

## 11. Constraints

Primary key:

```sql
ALTER TABLE dbo.Users
ADD CONSTRAINT PK_Users PRIMARY KEY (Id);
```

Foreign key:

```sql
ALTER TABLE dbo.Orders
ADD CONSTRAINT FK_Orders_Users
FOREIGN KEY (UserId) REFERENCES dbo.Users(Id);
```

Unique constraint:

```sql
ALTER TABLE dbo.Users
ADD CONSTRAINT UQ_Users_Email UNIQUE (Email);
```

Default constraint:

```sql
ALTER TABLE dbo.Users
ADD CONSTRAINT DF_Users_CreatedAt
DEFAULT SYSDATETIME() FOR CreatedAt;
```

Check constraint:

```sql
ALTER TABLE dbo.Products
ADD CONSTRAINT CK_Products_Price_Positive
CHECK (Price >= 0);
```

## 12. Add / drop constraints

Drop constraint:

```sql
ALTER TABLE dbo.Users
DROP CONSTRAINT UQ_Users_Email;
```

Common note:

```text
You drop constraints by constraint name.
```

So consistent naming matters:

```text
PK_Table
FK_Child_Parent
UQ_Table_Column
DF_Table_Column
CK_Table_Rule
```

## 13. Views

A view is a saved SELECT definition.

Create view:

```sql
CREATE VIEW dbo.ActiveUsers
AS
SELECT Id, Name, Email
FROM dbo.Users
WHERE IsActive = 1;
```

Use:

```sql
SELECT *
FROM dbo.ActiveUsers;
```

Views are useful for:

```text
reusable query shape
security boundary
simplifying joins
presenting a stable read model
```

A normal view is not necessarily stored as data. It is usually expanded into the query plan.

## 14. Indexed views

An indexed view physically materializes the view result through an index.

Basic idea:

```text
normal view   -> saved query definition
indexed view  -> saved query + materialized indexed result
```

Indexed views have restrictions and maintenance costs.

Use only when:

```text
query benefit is real
data changes are not too expensive
requirements/restrictions are understood
```

The notes position indexed views as a specialized performance tool, not the default view mechanism.

## 15. DDL safety checklist

Before applying DDL:

```text
Check existing data.
Check dependencies.
Name constraints explicitly.
Run migrations in a controlled environment.
Understand locks/table size.
Back up important data.
```

For schema changes:

```text
add nullable column first if needed
backfill data
then make NOT NULL or add stricter constraint
```

This avoids failing on existing rows.

## 16. Evidence table

| Source group | What it supports |
|---|---|
| S-082-S088 | Upsert, `IF EXISTS` approach, and `MERGE` basics. |
| S-089-S098 | `MERGE` actions, `OUTPUT`, matched/not matched behavior, concurrency notes. |
| S-099-S108 | Transactions, commit/rollback, TRY/CATCH with transaction handling, indexes. |
| S-130-S133 | `ALTER TABLE`, columns, constraints, views and indexed views tail. |
| S-071/S081/S109/S129 | Checked during P03; already processed in R04 as table/DML syntax. |

## 17. Open questions / follow-up hooks

- Final coverage audit should verify all 133 image uses after R01/R02/R03/R04/R05.
- Production upsert correctness depends on unique constraints and concurrency handling, not only syntax.
- Indexed views should be treated as a specialized optimization, not a default abstraction.
