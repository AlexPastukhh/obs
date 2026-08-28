# SQL Server stored-procedure contracts and result channels

Knowledge ID: `sql-server.stored-procedure-contracts-and-result-channels`

Topic: `sql-server`

A stored procedure is a named database program executed on the server. It can provide a stable database-side API, an `EXECUTE` permission boundary without direct table access, multi-step work close to the data, fewer round trips for a multi-command operation, and a shared contract for legacy systems or several applications.

Wrapping SQL in a procedure does not make it automatically faster. A parameterized query and a procedure can receive similar plans; indexes, query shape, data volume, parameter behavior, locking, and plan quality still dominate. Procedures also add database-specific code, versioned deployment, testing, composition limits, and the risk of splitting business rules between application and database layers.

Representative T-SQL contract:

```sql
CREATE OR ALTER PROCEDURE dbo.GetUserById
    @Id int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, Name, Email
    FROM dbo.Users
    WHERE Id = @Id;
END
```

## Three distinct return mechanisms

A result set returns rows from `SELECT` and is consumed through a reader, EF Core raw-SQL query, Dapper query, or another row materializer.

An output parameter is declared in the procedure contract and assigned explicitly:

```sql
CREATE OR ALTER PROCEDURE dbo.CreateUser
    @Name nvarchar(100),
    @Email nvarchar(200),
    @NewId int OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Users(Name, Email)
    VALUES (@Name, @Email);

    SET @NewId = CONVERT(int, SCOPE_IDENTITY());
END
```

A procedure `RETURN` value is an integer status code:

```sql
RETURN 0;
```

It is neither a row set nor an output parameter. One procedure can use all three channels, but each needs a clear role. Output values are read after command completion and, when a reader was used, after that reader is closed or disposed.

## Generated values and row-count messages

`SCOPE_IDENTITY()` returns the last identity inserted in the current scope. It avoids the cross-scope trigger hazard of `@@IDENTITY`:

```sql
SET @NewId = CONVERT(int, SCOPE_IDENTITY());
```

A generated key, computed value, or row version can instead be returned as a result column. The client/ORM contract must agree on which channel carries each value.

`SET NOCOUNT ON` suppresses extra "N rows affected" messages from individual statements, which keeps multi-statement result behavior clearer. It does not replace a deliberate concurrency signal: when a caller must know whether the intended row matched, the procedure still needs a truthful result column, output parameter, return value, or other mapped success result.

## What should be recallable

- Which database API, permission, round-trip, and shared-contract needs can justify a stored procedure?
- Why does procedure packaging not guarantee a better execution plan?
- How do a result set, output parameter, and integer `RETURN` code differ?
- Why is `SCOPE_IDENTITY()` safer than `@@IDENTITY` around triggers?
- What does `SET NOCOUNT ON` suppress, and what concurrency responsibility remains?

## Sources

- Workspace: `_ai-conspects/stored procedures/`
- Authoritative processed source: `01-final-transcript.md`, sections 1-5
- Identical regional copy: `regions/R01R02R03R04R05-stored-procedures-corrected-final-v002.md`
- Original SVG: `source/stored procedures.svg`

