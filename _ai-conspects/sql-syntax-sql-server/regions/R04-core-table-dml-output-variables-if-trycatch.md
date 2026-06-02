# R04 - Core table / DML / OUTPUT / variables / IF / TRY CATCH

Generated: 2026-06-02 15:45:53 UTC

## 0.1 Area overview / key ideas / reading quality

This region is about common SQL Server table definition and DML syntax.

The road is:

```text
SQL Server data types
→ CREATE TABLE
→ identity / uniqueidentifier / rowversion
→ foreign keys and cascade
→ INSERT / UPDATE / DELETE
→ OUTPUT inserted/deleted
→ variables and IF/IF EXISTS
→ @@ROWCOUNT
→ TRY...CATCH / THROW
```

Key ideas:

```text
1. `CREATE TABLE` defines columns, types, constraints, keys, and relationships.
2. SQL Server has specialized types such as `uniqueidentifier`, `datetime2`, `rowversion`, `varbinary`, `nvarchar`, and `decimal`.
3. `uniqueidentifier` stores GUID values; `NEWID()` and `NEWSEQUENTIALID()` generate them differently.
4. Foreign keys enforce relationships and can define cascade actions.
5. `INSERT`, `UPDATE`, and `DELETE` can return affected rows with `OUTPUT`.
6. `INSERTED` and `DELETED` are logical rowsets representing new/old row versions.
7. `@@ROWCOUNT` reports the number of rows affected by the previous statement.
8. `TRY...CATCH` catches T-SQL errors; `ERROR_*` functions expose details.
9. `THROW` is the modern rethrow/raise mechanism.
```

Reading quality:

```text
overall: high
included image uses: 32
```

## 0.2 Coverage / boundary review

Included in R04:

```text
S-071, S-072, S-073, S-074, S-075, S-076, S-077, S-078, S-079, S-080, S-081, S-109, S-110, S-111, S-112, S-113, S-114, S-115, S-116, S-117, S-118, S-119, S-120, S-121, S-122, S-123, S-124, S-125, S-126, S-127, S-128, S-129
```

Checked but not included:

```text
S-024, S-033, S-034, S-070, S-082, S-083, S-108, S-130
```

Reason: P01 neighbors were already processed; P03 neighbors are reserved for MERGE/upsert/DDL-object pass.

## 1. Common SQL Server data types

Common numeric/string/date types:

```text
int
bigint
decimal(p, s)
bit
date
time
datetime2
nvarchar(n)
varchar(n)
```

Other important SQL Server-specific types:

```text
uniqueidentifier
rowversion
varbinary(max)
```

Use `nvarchar` for Unicode text.

Use `datetime2` for modern date/time storage instead of old `datetime` when possible.

Use `decimal(p, s)` for precise numeric values such as money-like quantities where binary floating point is not acceptable.

## 2. `CREATE TABLE`

Basic table:

```sql
CREATE TABLE dbo.Users
(
    Id int IDENTITY(1,1) NOT NULL,
    Name nvarchar(100) NOT NULL,
    Email nvarchar(200) NOT NULL,
    CreatedAt datetime2 NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY (Id)
);
```

Meaning:

```text
schema.table name
column name
data type
NULL / NOT NULL
IDENTITY
constraints
primary key
```

## 3. `uniqueidentifier`, `NEWID()`, and `NEWSEQUENTIALID()`

GUID column:

```sql
Id uniqueidentifier NOT NULL DEFAULT NEWID()
```

`NEWID()` generates a random GUID.

`NEWSEQUENTIALID()` generates a more sequential GUID and can reduce index fragmentation when used as a clustered key.

Typical table:

```sql
CREATE TABLE dbo.Events
(
    Id uniqueidentifier NOT NULL DEFAULT NEWID(),
    Name nvarchar(100) NOT NULL,
    CONSTRAINT PK_Events PRIMARY KEY (Id)
);
```

Important:

```text
NEWSEQUENTIALID() can be used as a DEFAULT constraint, not usually as a normal ad-hoc scalar call.
```

## 4. `rowversion`

`rowversion` is an auto-generated binary value that changes whenever the row is updated.

Example:

```sql
RowVersion rowversion NOT NULL
```

Use it for optimistic concurrency:

```text
client reads row + rowversion
client sends original rowversion back
UPDATE checks Id and RowVersion
if zero rows updated -> conflict
```

Again:

```text
rowversion is not a date/time timestamp.
```

## 5. Foreign keys and cascade

Foreign key:

```sql
CREATE TABLE dbo.Orders
(
    Id int IDENTITY(1,1) NOT NULL,
    UserId int NOT NULL,
    CONSTRAINT PK_Orders PRIMARY KEY (Id),
    CONSTRAINT FK_Orders_Users
        FOREIGN KEY (UserId)
        REFERENCES dbo.Users(Id)
);
```

Cascade delete:

```sql
ON DELETE CASCADE
```

Meaning:

```text
when parent row is deleted, child rows can be automatically deleted
```

Use cascade carefully because it can delete many related rows.

Other actions may include:

```text
NO ACTION
SET NULL
CASCADE
```

depending on relationship and constraints.

## 6. `INSERT`

Basic insert:

```sql
INSERT INTO dbo.Users (Name, Email, CreatedAt)
VALUES (N'Alex', N'alex@example.com', SYSDATETIME());
```

Insert multiple rows:

```sql
INSERT INTO dbo.Users (Name, Email)
VALUES
    (N'Alex', N'a@example.com'),
    (N'Bob', N'b@example.com');
```

Insert from select:

```sql
INSERT INTO dbo.ArchiveUsers (Id, Name, Email)
SELECT Id, Name, Email
FROM dbo.Users
WHERE IsDeleted = 1;
```

## 7. `UPDATE`

Basic update:

```sql
UPDATE dbo.Users
SET Name = N'New name'
WHERE Id = @Id;
```

Important:

```text
Always think about WHERE.
Without WHERE, UPDATE affects all rows in the table.
```

Update with multiple columns:

```sql
UPDATE dbo.Users
SET
    Name = @Name,
    Email = @Email
WHERE Id = @Id;
```

## 8. `DELETE`

Basic delete:

```sql
DELETE FROM dbo.Users
WHERE Id = @Id;
```

Important:

```text
Without WHERE, DELETE removes all rows from the table.
```

Often prefer soft delete in application schemas:

```sql
UPDATE dbo.Users
SET IsDeleted = 1
WHERE Id = @Id;
```

when permanent physical deletion is not desired.

## 9. `OUTPUT inserted` / `OUTPUT deleted`

The `OUTPUT` clause returns values affected by DML.

Insert:

```sql
INSERT INTO dbo.Users (Name)
OUTPUT inserted.Id, inserted.Name
VALUES (N'Alex');
```

Update:

```sql
UPDATE dbo.Users
SET Name = N'Alex Updated'
OUTPUT deleted.Name AS OldName, inserted.Name AS NewName
WHERE Id = @Id;
```

Delete:

```sql
DELETE FROM dbo.Users
OUTPUT deleted.Id, deleted.Name
WHERE Id = @Id;
```

Mental model:

```text
inserted = new row version
deleted  = old row version
```

For `INSERT`, only `inserted` exists.

For `DELETE`, only `deleted` exists.

For `UPDATE`, both exist:

```text
deleted  -> old values
inserted -> new values
```

## 10. `OUTPUT INTO`

Store changed rows in a table variable:

```sql
DECLARE @Changed table
(
    Id int,
    OldName nvarchar(100),
    NewName nvarchar(100)
);

UPDATE dbo.Users
SET Name = @Name
OUTPUT deleted.Id, deleted.Name, inserted.Name
INTO @Changed
WHERE Id = @Id;

SELECT * FROM @Changed;
```

Use this when you need to:

```text
audit changed rows
return generated IDs
return new rowversion
compare old/new values
drive follow-up logic
```

## 11. Variables and table variables

Scalar variable:

```sql
DECLARE @UserId int = 1;
DECLARE @Name nvarchar(100);
```

Table variable:

```sql
DECLARE @Changed table
(
    Id int,
    OldValue nvarchar(100),
    NewValue nvarchar(100)
);
```

Table variables are useful for capturing `OUTPUT INTO` rows in small/local procedural logic.

## 12. `@@ROWCOUNT`

`@@ROWCOUNT` returns the number of rows affected by the previous statement.

Example:

```sql
UPDATE dbo.Users
SET Name = @Name
WHERE Id = @Id;

IF @@ROWCOUNT = 0
BEGIN
    THROW 50001, 'User not found or concurrency conflict', 1;
END
```

Important:

```text
Read/capture @@ROWCOUNT immediately.
Another statement can change it.
```

Safer:

```sql
DECLARE @Rows int = @@ROWCOUNT;
```

right after the target DML statement.

## 13. `TRY...CATCH`

Basic pattern:

```sql
BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE dbo.Users
    SET Name = @Name
    WHERE Id = @Id;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;
```

Inside `CATCH`, SQL Server exposes error details:

```text
ERROR_NUMBER()
ERROR_MESSAGE()
ERROR_SEVERITY()
ERROR_STATE()
ERROR_LINE()
ERROR_PROCEDURE()
```

Use these for logging/debugging.

## 14. `THROW`

`THROW` raises or rethrows an error.

Rethrow current error:

```sql
THROW;
```

Throw custom error:

```sql
THROW 50001, 'Something went wrong', 1;
```

Notes:

```text
custom error number should be >= 50000
THROW preserves error details better than old RAISERROR patterns when rethrowing
```

## 15. DML safety checklist

Before running DML:

```text
For UPDATE/DELETE, check WHERE.
For important changes, run SELECT with the same predicate first.
For concurrency, check rowversion or expected state.
For caller feedback, use OUTPUT or @@ROWCOUNT.
For multi-step changes, use transaction + TRY/CATCH.
```

## 16. Evidence table

| Source group | What it supports |
|---|---|
| S-071-S081 | SQL Server data types, table creation, GUID/uniqueidentifier, rowversion, foreign keys, cascade. |
| S-109-S113 | DML basics and `INSERT`/`UPDATE`/`DELETE` shape. |
| S-114-S119 | `OUTPUT`, `inserted`, `deleted`, `OUTPUT INTO`, returning affected rows. |
| S-120-S123 | variables, table variables, `@@ROWCOUNT`, IF/IF EXISTS patterns. |
| S-124-S129 | `TRY...CATCH`, `ERROR_*` functions, `THROW`, error handling patterns. |

## 17. Open questions / follow-up hooks

- P03/R05 should handle `MERGE`, upsert alternatives, transactions, indexes, `ALTER TABLE`, constraints, views/indexed views.
- Security grants for procedures/views should reuse R02's role/permission model.
- Rowversion appears in both R03 and R04: R03 owns procedure/concurrency pattern; R04 owns table/type/DML syntax.
