# R03 - Stored procedures / output params / control flow / rowversion

Generated: 2026-06-02 15:45:53 UTC

## 0.1 Area overview / key ideas / reading quality

This region is about procedural T-SQL and stored-procedure style code.

The road is:

```text
BEGIN / END
→ IF / ELSE
→ DECLARE
→ SET / SELECT assignment
→ stored procedures
→ procedure parameters
→ OUTPUT parameters
→ return codes / result sets / rows affected
→ rowversion-oriented update patterns
```

Key ideas:

```text
1. `BEGIN ... END` groups multiple statements into one procedural block.
2. `IF ... ELSE` controls branching.
3. `DECLARE` creates local variables scoped to the current batch/procedure.
4. `SET` assigns one variable; `SELECT` can assign from queries and can assign multiple variables.
5. Stored procedures encapsulate reusable SQL logic.
6. Parameters can be input or `OUTPUT`.
7. `OUTPUT` parameters must be marked both in the procedure definition and when calling the procedure.
8. `rowversion` is a binary concurrency token, not a date/time.
9. Procedures can return data via result sets, output parameters, return codes, and rows affected.
```

Reading quality:

```text
overall: high
included image uses: 23
```

## 0.2 Coverage / boundary review

Included in R03:

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023
```

Checked but not included in P02/R03:

```text
S-024, S-033, S-034, S-070, S-082, S-083, S-108, S-130
```

Reason: P01 neighbors were already processed, and P03 neighbors are reserved for MERGE/upsert/DDL-object pass.

## 1. `BEGIN ... END`

`BEGIN ... END` groups multiple statements.

Without a block, an `IF` controls only one statement.

Pattern:

```sql
IF @IsActive = 1
BEGIN
    UPDATE dbo.Users
    SET LastSeenAt = SYSDATETIME()
    WHERE Id = @UserId;

    INSERT INTO dbo.AuditLog(UserId, Message)
    VALUES (@UserId, N'User touched');
END
```

Use it for:

```text
IF/ELSE branches
stored procedure bodies
TRY/CATCH blocks
multi-statement control flow
```

## 2. `IF`, `ELSE`, and `IF EXISTS`

Basic branching:

```sql
IF @Count > 0
BEGIN
    SELECT N'Has rows' AS Message;
END
ELSE
BEGIN
    SELECT N'No rows' AS Message;
END
```

Existence check:

```sql
IF EXISTS (SELECT 1 FROM dbo.Users WHERE Email = @Email)
BEGIN
    SELECT N'Already exists' AS Message;
END
```

`IF EXISTS` is often preferable to `COUNT(*) > 0` when only existence matters.

## 3. `DECLARE`

Local variables:

```sql
DECLARE @UserId int;
DECLARE @Name nvarchar(100);
DECLARE @Now datetime2 = SYSDATETIME();
```

Variables are scoped to the current batch/procedure.

Because `GO` starts a new batch, a variable declared before `GO` does not exist after `GO`.

## 4. `SET` vs `SELECT` assignment

`SET` assigns one variable:

```sql
SET @Name = N'Alex';
```

`SELECT` can assign from a query:

```sql
SELECT @Name = Name
FROM dbo.Users
WHERE Id = @UserId;
```

`SELECT` can assign multiple variables:

```sql
SELECT
    @Name = Name,
    @Email = Email
FROM dbo.Users
WHERE Id = @UserId;
```

Important behavior difference:

```text
SET is clearer for simple assignment.
SELECT is common when assigning from a query.
If SELECT returns multiple rows, the final assigned value may be the last row processed, which is unsafe unless the query is guaranteed to be single-row.
```

## 5. Stored procedures

Create procedure:

```sql
CREATE PROCEDURE dbo.GetUserById
    @UserId int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, Name, Email
    FROM dbo.Users
    WHERE Id = @UserId;
END;
```

Execute:

```sql
EXEC dbo.GetUserById @UserId = 1;
```

Procedures are useful for:

```text
reusable database logic
controlled permissions via EXECUTE grants
multi-statement operations
encapsulating update/read patterns
```

## 6. Procedure parameters

Input parameter:

```sql
CREATE PROCEDURE dbo.SearchUsers
    @Name nvarchar(100)
AS
BEGIN
    SELECT *
    FROM dbo.Users
    WHERE Name LIKE @Name + N'%';
END;
```

Call:

```sql
EXEC dbo.SearchUsers @Name = N'A';
```

Parameters make stored procedures reusable and safer than concatenating dynamic SQL.

## 7. `OUTPUT` parameters

Definition:

```sql
CREATE PROCEDURE dbo.CreateUser
    @Name nvarchar(100),
    @NewUserId int OUTPUT
AS
BEGIN
    INSERT INTO dbo.Users(Name)
    VALUES (@Name);

    SET @NewUserId = SCOPE_IDENTITY();
END;
```

Call:

```sql
DECLARE @Id int;

EXEC dbo.CreateUser
    @Name = N'Alex',
    @NewUserId = @Id OUTPUT;

SELECT @Id AS NewUserId;
```

Important:

```text
OUTPUT must appear in the procedure parameter definition.
OUTPUT must also appear at the call site.
```

## 8. Result set vs output parameter vs return code

Stored procedures can communicate in several ways.

Result set:

```sql
SELECT Id, Name
FROM dbo.Users
WHERE Id = @UserId;
```

Output parameter:

```sql
SET @TotalCount = @Count;
```

Return code:

```sql
RETURN 0;
```

Rows affected:

```text
client can read rows affected
@@ROWCOUNT can be used inside T-SQL immediately after a statement
```

Practical rule:

```text
Use result sets for data tables.
Use output parameters for scalar values the caller needs.
Use return codes for status only, not large data.
```

## 9. `rowversion`

`rowversion` is a binary value SQL Server changes automatically when the row is updated.

Example column:

```sql
RowVersion rowversion NOT NULL
```

It is often used for optimistic concurrency:

```sql
UPDATE dbo.Users
SET Name = @Name
WHERE Id = @Id
  AND RowVersion = @OriginalRowVersion;
```

Then check whether the update happened:

```sql
IF @@ROWCOUNT = 0
BEGIN
    THROW 50001, 'Concurrency conflict', 1;
END
```

Important:

```text
rowversion is not a timestamp/date.
Do not treat it as a time value.
It is a database-generated binary concurrency token.
```

## 10. Updating and returning new rowversion

A common pattern is to update a row and return the new rowversion.

Using `OUTPUT`:

```sql
DECLARE @Updated table (NewRowVersion varbinary(8));

UPDATE dbo.Users
SET Name = @Name
OUTPUT inserted.RowVersion INTO @Updated
WHERE Id = @Id
  AND RowVersion = @OriginalRowVersion;

SELECT NewRowVersion FROM @Updated;
```

This connects to R04's `OUTPUT inserted/deleted` material, but the stored-procedure/concurrency-owner idea belongs here.

## 11. Evidence table

| Source group | What it supports |
|---|---|
| S-001-S003 | `BEGIN/END`, procedural blocks, IF/ELSE, variables near stored procedure examples. |
| S-004-S010 | Stored procedure creation/execution, parameters, result sets, output parameter call shapes. |
| S-011-S018 | Output params, return values/result choices, rowversion and concurrency-style update examples. |
| S-019-S023 | SET/SELECT assignment, variable behavior, procedure/result patterns. |

## 12. Open questions / follow-up hooks

- R04 owns common `CREATE TABLE`, DML, `OUTPUT`, `INSERTED`/`DELETED`, `@@ROWCOUNT`, `TRY...CATCH`.
- P03/R05 owns `MERGE`/upsert, transactions, indexes, constraints, views.
